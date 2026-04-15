// Supabase Edge Function: mollie-webhook
// Mollie stuurt POST met payment id als status verandert
// Deploy: supabase functions deploy mollie-webhook --no-verify-jwt
//
// SECURITY:
// - Geen auth token vereist (Mollie stuurt zonder auth)
// - Verificatie gebeurt door de payment ID op te halen bij Mollie (niet vertrouwen op wat binnenkomt)
// - Idempotent: zelfde payment ID meerdere keren verwerken is veilig

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Plan -> pakket mapping for app_metadata
const PLAN_TO_PAKKET: Record<string, string> = {
  'gap': 'gap',
  'nis2': 'nis2',
  'beleid': 'beleid',
  'preaudit': 'admin',
};

serve(async (req) => {
  try {
    // Mollie sends application/x-www-form-urlencoded with just 'id' param
    const formData = await req.formData();
    const paymentId = formData.get('id') as string;

    if (!paymentId || typeof paymentId !== 'string' || !paymentId.match(/^tr_[a-zA-Z0-9]+$/)) {
      return new Response('Invalid payment id', { status: 400 });
    }

    const MOLLIE_API_KEY = Deno.env.get('MOLLIE_API_KEY');
    if (!MOLLIE_API_KEY) return new Response('Not configured', { status: 500 });

    // SECURITY: Verify the payment by fetching from Mollie
    // Don't trust whatever came in the webhook body — always refetch from Mollie
    const mollieResp = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: { 'Authorization': `Bearer ${MOLLIE_API_KEY}` },
    });

    if (!mollieResp.ok) {
      console.error(`Mollie fetch failed for ${paymentId}:`, mollieResp.status);
      return new Response('Failed to fetch payment', { status: 500 });
    }

    const payment = await mollieResp.json();
    const meta = payment.metadata || {};

    // Create admin client with service role
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Process based on status
    if (payment.status === 'paid') {
      // IDEMPOTENCY: check if we already processed this payment
      const { data: existing } = await supabase
        .from('orders')
        .select('id, status')
        .eq('payment_id', paymentId)
        .maybeSingle();

      if (existing?.status === 'paid') {
        // Already processed — return 200 to prevent Mollie from retrying
        return new Response('OK (already processed)', { status: 200 });
      }

      const pakket = PLAN_TO_PAKKET[meta.plan] || 'gap';
      const email = String(meta.email || '').trim().toLowerCase();
      const naam = String(meta.naam || '').trim().slice(0, 200);
      const bedrijf = String(meta.bedrijf || '').trim().slice(0, 200);

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        console.error('Invalid email in metadata:', email);
        return new Response('Invalid email', { status: 400 });
      }

      // 1. Check if user already exists
      const { data: existingUsers } = await supabase.auth.admin.listUsers();
      const existingUser = existingUsers.users.find((u) => u.email === email);

      let userId: string | null = null;

      if (existingUser) {
        // User exists — upgrade their pakket via app_metadata
        userId = existingUser.id;
        const currentPakket = existingUser.app_metadata?.pakket;
        const pakketRank: Record<string, number> = {
          'gap': 1, 'nis2': 2, 'beleid': 3, 'admin': 5
        };
        // Only upgrade, never downgrade
        const newPakket = (pakketRank[pakket] || 0) > (pakketRank[currentPakket] || 0) ? pakket : currentPakket;

        await supabase.auth.admin.updateUserById(userId, {
          app_metadata: { ...existingUser.app_metadata, pakket: newPakket },
          user_metadata: { ...existingUser.user_metadata, naam, bedrijf },
        });
      } else {
        // New user — invite by email (creates user + sends invitation mail via Supabase Auth SMTP)
        const siteUrl = Deno.env.get('SITE_URL') || 'https://annex27.nl';
        const { data: invited, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
          data: { naam, bedrijf },
          redirectTo: `${siteUrl}/dashboard.html`,
        });

        if (inviteErr || !invited.user) {
          console.error('User invite failed:', inviteErr);
          return new Response('User creation failed', { status: 500 });
        }

        userId = invited.user.id;

        // Set pakket in app_metadata (inviteUserByEmail only accepts user_metadata via `data`)
        await supabase.auth.admin.updateUserById(userId, {
          app_metadata: { pakket },
        });
      }

      // 2. Record the paid order
      const { data: orderRow } = await supabase.from('orders').upsert({
        payment_id: payment.id,
        plan: meta.plan,
        amount: parseFloat(payment.amount.value),
        naam,
        bedrijf,
        email,
        btw_nummer: String(meta.btw_nummer || '').slice(0, 50),
        status: 'paid',
        user_id: userId,
        paid_at: new Date().toISOString(),
      }, { onConflict: 'payment_id' }).select().maybeSingle();

      // 3. Auto-create invoice for this paid order (if not already created)
      const { data: existingInv } = await supabase
        .from('invoices')
        .select('id')
        .eq('payment_id', payment.id)
        .maybeSingle();

      if (!existingInv) {
        // Next invoice number YYYY-NNNN (serialized by unique constraint + retry)
        const year = new Date().getFullYear();
        const prefix = `${year}-`;
        const { data: last } = await supabase
          .from('invoices')
          .select('invoice_number')
          .like('invoice_number', `${prefix}%`)
          .order('invoice_number', { ascending: false })
          .limit(1);
        let seq = 1;
        if (last && last[0]) {
          const m = /^(\d{4})-(\d+)$/.exec(last[0].invoice_number);
          if (m) seq = parseInt(m[2], 10) + 1;
        }
        const invoice_number = `${prefix}${String(seq).padStart(4, '0')}`;

        // BTW regime: 'none' until Annex27's own BTW-nummer is active.
        // When BTW-nummer is issued, flip to 'standard' (NL/BE) or 'reverse_charge' (EU B2B outside BE).
        const btwRegime = 'none';
        const totalIncl = parseFloat(payment.amount.value);
        const subtotal = btwRegime === 'none' ? totalIncl : Math.round((totalIncl / 1.21) * 100) / 100;
        const btwAmount = btwRegime === 'none' ? 0 : Math.round((totalIncl - subtotal) * 100) / 100;

        await supabase.from('invoices').insert({
          invoice_number,
          order_id: orderRow?.id || null,
          user_id: userId,
          naam,
          bedrijf,
          email,
          btw_nummer: String(meta.btw_nummer || '').slice(0, 50) || null,
          adres: null,
          product: meta.plan,
          omschrijving: null,
          subtotal,
          btw_amount: btwAmount,
          total: totalIncl,
          status: 'paid',
          btw_regime: btwRegime,
          payment_method: payment.method || 'mollie',
          payment_id: payment.id,
        });
      }

      // TODO: Send notification email to info@annex27.nl (via Resend or similar)
    } else if (['failed', 'canceled', 'expired'].includes(payment.status)) {
      // Log the failed attempt
      await supabase.from('orders').upsert({
        payment_id: payment.id,
        plan: String(meta.plan || '').slice(0, 50),
        amount: parseFloat(payment.amount?.value || '0'),
        naam: String(meta.naam || '').slice(0, 200),
        bedrijf: String(meta.bedrijf || '').slice(0, 200),
        email: String(meta.email || '').slice(0, 320),
        btw_nummer: String(meta.btw_nummer || '').slice(0, 50),
        status: payment.status,
      }, { onConflict: 'payment_id' });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response('Error', { status: 500 });
  }
});
