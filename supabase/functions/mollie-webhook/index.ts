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
    // NEW FLOW (admin-confirm): webhook only records the payment status.
    // No user-invite, no invoice creation — that happens manually via the
    // order-confirm edge function triggered from the admin "Bevestigen" button.
    if (payment.status === 'paid') {
      const email = String(meta.email || '').trim().toLowerCase();
      const naam = String(meta.naam || '').trim().slice(0, 200);
      const bedrijf = String(meta.bedrijf || '').trim().slice(0, 200);

      if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        console.error('Invalid email in metadata:', email);
        return new Response('Invalid email', { status: 400 });
      }

      // Idempotent upsert — markeer betaald, laat confirmed_at op null voor admin-bevestiging
      await supabase.from('orders').upsert({
        payment_id: payment.id,
        plan: String(meta.plan || '').slice(0, 50),
        amount: parseFloat(payment.amount.value),
        naam,
        bedrijf,
        email,
        btw_nummer: String(meta.btw_nummer || '').slice(0, 50),
        status: 'paid',
        paid_at: new Date().toISOString(),
        // confirmed_at stays null — admin must confirm manually
      }, { onConflict: 'payment_id' });
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
