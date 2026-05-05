// Supabase Edge Function: order-confirm
// Admin bevestigt manueel een betaalde order. Logica gedeeld met mollie-webhook
// via _shared/confirm-order.ts (zelfde flow: invite → koppel order → maak factuur).
//
// Auth: alleen admin/auditor (Authorization header met JWT).
// Deploy: supabase functions deploy order-confirm

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { confirmOrder } from '../_shared/confirm-order.ts';

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

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
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

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const result = await confirmOrder(supabase, orderId);
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), { status: result.status, headers });
    }

    return new Response(JSON.stringify({
      ok: true,
      user_id: result.user_id,
      invoice_number: result.invoice_number,
      invited_new_user: result.invited_new_user,
      already_confirmed: result.already_confirmed,
    }), { headers });
  } catch (err) {
    console.error('order-confirm error:', err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers });
  }
});
