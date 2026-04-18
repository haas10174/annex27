// Supabase Edge Function: order-confirm
// Admin bevestigt manueel een betaalde order: maakt user (invite mail) + factuur + markeert confirmed_at.
//
// Auth: alleen admin/auditor (Authorization header met JWT).
// Deploy: supabase functions deploy order-confirm

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];
function cors(origin: string | null) {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const PLAN_TO_PAKKET: Record<string, string> = {
  'gap': 'gap',
  'nis2': 'nis2',
  'beleid': 'beleid',
  'preaudit': 'admin',
};
const PAKKET_RANK: Record<string, number> = { 'gap': 1, 'nis2': 2, 'beleid': 3, 'admin': 5 };

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    // Verify caller is admin/auditor
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });

    const supaUser = createClient(
      Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supaUser.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    const role = user.app_metadata?.role;
    const adminPakket = user.app_metadata?.pakket;
    if (role !== 'auditor' && adminPakket !== 'admin') {
      return new Response(JSON.stringify({ error: 'Geen rechten' }), { status: 403, headers });
    }

    const body = await req.json();
    const orderId = String(body.order_id || '').trim();
    if (!orderId) return new Response(JSON.stringify({ error: 'order_id verplicht' }), { status: 400, headers });

    // Service-role client for user-admin operations
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Fetch order
    const { data: order, error: orderErr } = await supabase
      .from('orders').select('*').eq('id', orderId).maybeSingle();
    if (orderErr || !order) return new Response(JSON.stringify({ error: 'Order niet gevonden' }), { status: 404, headers });

    if (order.status !== 'paid') {
      return new Response(JSON.stringify({ error: `Order heeft status "${order.status}", alleen "paid" kan bevestigd worden` }), { status: 400, headers });
    }
    if (order.confirmed_at) {
      return new Response(JSON.stringify({ error: 'Order is al bevestigd' }), { status: 400, headers });
    }

    const email = String(order.email || '').trim().toLowerCase();
    const naam = String(order.naam || '').slice(0, 200);
    const bedrijf = String(order.bedrijf || '').slice(0, 200);
    const pakket = PLAN_TO_PAKKET[order.plan] || 'gap';

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres in order' }), { status: 400, headers });
    }

    // 1. Find or invite user
    const { data: existingUsers } = await supabase.auth.admin.listUsers();
    const existing = existingUsers.users.find((u) => u.email === email);
    let userId: string;

    if (existing) {
      userId = existing.id;
      const cur = existing.app_metadata?.pakket;
      const newPakket = (PAKKET_RANK[pakket] || 0) > (PAKKET_RANK[cur] || 0) ? pakket : cur;
      await supabase.auth.admin.updateUserById(userId, {
        app_metadata: { ...existing.app_metadata, pakket: newPakket },
        user_metadata: { ...existing.user_metadata, naam, bedrijf },
      });
    } else {
      const siteUrl = Deno.env.get('SITE_URL') || 'https://annex27.nl';
      const { data: invited, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: { naam, bedrijf },
        redirectTo: `${siteUrl}/dashboard.html`,
      });
      if (inviteErr || !invited.user) {
        return new Response(JSON.stringify({ error: 'User-invite mislukt: ' + (inviteErr?.message || 'unknown') }), { status: 500, headers });
      }
      userId = invited.user.id;
      await supabase.auth.admin.updateUserById(userId, { app_metadata: { pakket } });
    }

    // 2. Update order — link user_id + confirmed_at
    await supabase.from('orders').update({
      user_id: userId,
      confirmed_at: new Date().toISOString(),
    }).eq('id', orderId);

    // 3. Create invoice if not exists
    let invoiceNumber: string | null = null;
    const { data: existingInv } = await supabase
      .from('invoices').select('invoice_number').eq('payment_id', order.payment_id).maybeSingle();

    if (existingInv) {
      invoiceNumber = existingInv.invoice_number;
    } else {
      const year = new Date().getFullYear();
      const prefix = `${year}-`;
      const { data: last } = await supabase
        .from('invoices').select('invoice_number')
        .like('invoice_number', `${prefix}%`)
        .order('invoice_number', { ascending: false }).limit(1);
      let seq = 1;
      if (last && last[0]) {
        const m = /^(\d{4})-(\d+)$/.exec(last[0].invoice_number);
        if (m) seq = parseInt(m[2], 10) + 1;
      }
      invoiceNumber = `${prefix}${String(seq).padStart(4, '0')}`;

      const btwRegime = 'none'; // Art. 56bis WBTW vrijstelling — flip to 'standard' as soon as BTW-nummer komt
      const totalIncl = parseFloat(order.amount);
      const subtotal = btwRegime === 'none' ? totalIncl : Math.round((totalIncl / 1.21) * 100) / 100;
      const btwAmount = btwRegime === 'none' ? 0 : Math.round((totalIncl - subtotal) * 100) / 100;

      await supabase.from('invoices').insert({
        invoice_number: invoiceNumber,
        order_id: order.id,
        user_id: userId,
        naam, bedrijf, email,
        btw_nummer: String(order.btw_nummer || '').slice(0, 50) || null,
        adres: null,
        product: order.plan,
        omschrijving: null,
        subtotal, btw_amount: btwAmount, total: totalIncl,
        status: 'paid',
        btw_regime: btwRegime,
        payment_method: 'mollie',
        payment_id: order.payment_id,
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      user_id: userId,
      invoice_number: invoiceNumber,
      invited_new_user: !existing,
    }), { headers });
  } catch (err) {
    console.error('order-confirm error:', err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers });
  }
});
