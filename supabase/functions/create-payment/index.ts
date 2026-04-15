// Supabase Edge Function: create-payment
// Creates a Mollie payment and returns the checkout URL
// Deploy: supabase functions deploy create-payment --no-verify-jwt
// Set secret: supabase secrets set MOLLIE_API_KEY=test_xxxxx

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = [
  'https://annex27.nl',
  'https://www.annex27.nl',
];

function corsHeaders(origin: string | null): Record<string, string> {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const PRODUCTS: Record<string, { name: string; price: number; period: string }> = {
  'gap':             { name: 'Gap-analyse',            price: 349,  period: 'eenmalig' },
  'nis2':            { name: 'NIS2 Readiness',         price: 499,  period: 'eenmalig' },
  'beleid':          { name: 'Beleidspakket',          price: 699,  period: 'eenmalig' },
  'preaudit':        { name: 'Pre-audit Review',       price: 1850, period: 'eenmalig' },
};

// Input validation
const MAX_NAAM_LENGTH = 200;
const MAX_BEDRIJF_LENGTH = 200;
const MAX_EMAIL_LENGTH = 320;
const MAX_BTW_LENGTH = 50;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const BTW_RE = /^[A-Z]{0,2}[0-9A-Z.\-\s]{0,50}$/i;

function sanitize(s: unknown, max: number): string {
  return String(s ?? '').trim().slice(0, max);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  // SECURITY: Origin check
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers });
  }

  try {
    // SECURITY: Rate limiting (5 payment attempts per minute per IP)
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: allowed } = await supabaseAdmin.rpc('check_rate_limit', {
      p_identifier: ip,
      p_endpoint: 'create-payment',
      p_max_requests: 5,
    });

    if (allowed === false) {
      return new Response(JSON.stringify({ error: 'Te veel aanvragen. Probeer over een minuut opnieuw.' }), {
        status: 429, headers: { ...headers, 'Retry-After': '60' }
      });
    }

    const body = await req.json();

    // Honeypot check (extra server-side line of defense)
    if (body.website_url) {
      // Bot detected — return fake success without actually creating payment
      return new Response(JSON.stringify({ checkoutUrl: 'https://annex27.nl/success.html', paymentId: 'blocked' }), { status: 200, headers });
    }

    const plan = sanitize(body.plan, 50);
    const naam = sanitize(body.naam, MAX_NAAM_LENGTH);
    const bedrijf = sanitize(body.bedrijf, MAX_BEDRIJF_LENGTH);
    const email = sanitize(body.email, MAX_EMAIL_LENGTH).toLowerCase();
    const btwNummer = sanitize(body.btw_nummer, MAX_BTW_LENGTH);

    // Validation
    if (!plan || !PRODUCTS[plan]) {
      return new Response(JSON.stringify({ error: 'Ongeldig pakket' }), { status: 400, headers });
    }
    if (!naam || !bedrijf || !email) {
      return new Response(JSON.stringify({ error: 'Verplichte velden ontbreken' }), { status: 400, headers });
    }
    if (!EMAIL_RE.test(email)) {
      return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres' }), { status: 400, headers });
    }
    if (btwNummer && !BTW_RE.test(btwNummer)) {
      return new Response(JSON.stringify({ error: 'Ongeldig BTW-nummer' }), { status: 400, headers });
    }

    const product = PRODUCTS[plan];
    const MOLLIE_API_KEY = Deno.env.get('MOLLIE_API_KEY');
    if (!MOLLIE_API_KEY) {
      return new Response(JSON.stringify({ error: 'Mollie niet geconfigureerd' }), { status: 500, headers });
    }

    // Calculate total incl. BTW
    const btwRate = 0.21;
    const btwAmount = Math.round(product.price * btwRate * 100) / 100;
    const total = Math.round((product.price + btwAmount) * 100) / 100;

    const siteUrl = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const molliePayment: Record<string, unknown> = {
      amount: {
        currency: 'EUR',
        value: total.toFixed(2),
      },
      description: `Annex27 - ${product.name}`,
      redirectUrl: `${siteUrl}/success.html?plan=${encodeURIComponent(plan)}`,
      webhookUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mollie-webhook`,
      metadata: {
        plan,
        naam,
        bedrijf,
        email,
        btw_nummer: btwNummer,
      },
    };

    const mollieResp = await fetch('https://api.mollie.com/v2/payments', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MOLLIE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(molliePayment),
    });

    if (!mollieResp.ok) {
      const errText = await mollieResp.text();
      console.error('Mollie error:', errText);
      return new Response(JSON.stringify({ error: 'Betaling kon niet worden aangemaakt' }), { status: 500, headers });
    }

    const payment = await mollieResp.json();
    const checkoutUrl = payment._links?.checkout?.href;

    if (!checkoutUrl) {
      return new Response(JSON.stringify({ error: 'Geen checkout URL ontvangen' }), { status: 500, headers });
    }

    // Log pending order
    await supabaseAdmin.from('orders').upsert({
      payment_id: payment.id,
      plan,
      amount: total,
      naam,
      bedrijf,
      email,
      btw_nummer: btwNummer,
      status: 'pending',
    }, { onConflict: 'payment_id' });

    return new Response(JSON.stringify({
      checkoutUrl,
      paymentId: payment.id,
    }), { status: 200, headers });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers });
  }
});
