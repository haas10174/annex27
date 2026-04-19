// Supabase Edge Function: create-payment
// Creates a Mollie payment and returns the checkout URL
// Deploy: supabase functions deploy create-payment --no-verify-jwt
// Set secret: supabase secrets set MOLLIE_API_KEY=test_xxxxx

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { computeVat, isEuCountry } from '../_shared/vat-rules.ts';

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
  'gap':             { name: 'Gap-analyse',            price: 795,  period: 'eenmalig' },
  'nis2':            { name: 'NIS2 Readiness',         price: 995,  period: 'eenmalig' },
  'beleid':          { name: 'Beleidspakket',          price: 795,  period: 'eenmalig' },
  'preaudit':        { name: 'Pre-audit Review',       price: 1495, period: 'eenmalig' },
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

function normalizeCountry(c: string): string {
  const up = c.toUpperCase().trim();
  if (!up) return 'NL';
  // Sentinel "XX" = non-EU
  if (up === 'XX' || up === 'NON_EU') return 'XX';
  return up;
}

async function viesCheck(
  countryCode: string,
  vatNumberRaw: string,
  supabase: ReturnType<typeof createClient>,
): Promise<{ valid: boolean | null; company_name: string | null }> {
  try {
    const cleaned = vatNumberRaw.replace(/[\s.\-]/g, '').toUpperCase();
    let country = countryCode;
    let number = cleaned;
    if (/^[A-Z]{2}/.test(cleaned)) {
      country = cleaned.slice(0, 2);
      number = cleaned.slice(2);
    } else if (cleaned.startsWith(countryCode)) {
      number = cleaned.slice(countryCode.length);
    }
    const fullVat = `${country}${number}`;

    // Cache-lookup
    const { data: cached } = await supabase
      .from('vat_validation_cache')
      .select('valid, company_name')
      .eq('vat_number', fullVat)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();
    if (cached) return { valid: !!cached.valid, company_name: cached.company_name };

    // Live VIES
    const viesResp = await fetch('https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ countryCode: country, vatNumber: number }),
      signal: AbortSignal.timeout(8000),
    });
    if (!viesResp.ok) return { valid: null, company_name: null };
    const data = await viesResp.json();
    const valid = !!data.valid;
    const companyName = (data.name && data.name !== '---') ? String(data.name).slice(0, 255) : null;
    const companyAddress = (data.address && data.address !== '---') ? String(data.address).slice(0, 500) : null;

    await supabase.from('vat_validation_cache').upsert({
      vat_number: fullVat,
      valid,
      country_code: country,
      company_name: companyName,
      company_address: companyAddress,
      checked_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + (valid ? 7 : 1) * 24 * 3600 * 1000).toISOString(),
      source: 'vies',
    }, { onConflict: 'vat_number' });

    return { valid, company_name: companyName };
  } catch {
    return { valid: null, company_name: null };
  }
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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: allowed } = await supabaseAdmin.rpc('check_rate_limit', {
      p_identifier: ip,
      p_endpoint: 'create-payment',
      p_max_requests: 5,
    });

    if (allowed === false) {
      return new Response(JSON.stringify({ error: 'Te veel aanvragen. Probeer over een minuut opnieuw.' }), {
        status: 429, headers: { ...headers, 'Retry-After': '60' },
      });
    }

    const body = await req.json();

    // Honeypot check (extra server-side line of defense)
    if (body.website_url) {
      return new Response(JSON.stringify({ checkoutUrl: 'https://annex27.nl/success', paymentId: 'blocked' }), { status: 200, headers });
    }

    const plan = sanitize(body.plan, 50);
    const naam = sanitize(body.naam, MAX_NAAM_LENGTH);
    const bedrijf = sanitize(body.bedrijf, MAX_BEDRIJF_LENGTH);
    const email = sanitize(body.email, MAX_EMAIL_LENGTH).toLowerCase();
    const btwNummer = sanitize(body.btw_nummer, MAX_BTW_LENGTH);
    const countryInput = normalizeCountry(sanitize(body.country, 4));
    const customerTypeInput = sanitize(body.customer_type, 10).toLowerCase();
    const customerType: 'b2c' | 'b2b' = customerTypeInput === 'b2c' ? 'b2c' : 'b2b';

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

    // VIES-check alleen bij B2B + VAT-nummer + EU-land
    let vatValid: boolean | null = null;
    let vatValidatedAt: string | null = null;
    if (customerType === 'b2b' && btwNummer && isEuCountry(countryInput)) {
      const res = await viesCheck(countryInput, btwNummer, supabaseAdmin);
      vatValid = res.valid;
      if (vatValid !== null) vatValidatedAt = new Date().toISOString();
    }

    // Bereken BTW-regel en bedragen server-side (autoritatief)
    const vat = computeVat({
      country: countryInput,
      customerType,
      vatValid,
      subtotal: product.price,
    });

    const siteUrl = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
    const molliePayment: Record<string, unknown> = {
      amount: {
        currency: 'EUR',
        value: vat.total.toFixed(2),
      },
      description: `Annex27 - ${product.name}`,
      redirectUrl: `${siteUrl}/success?plan=${encodeURIComponent(plan)}&value=${vat.total}`,
      webhookUrl: `${Deno.env.get('SUPABASE_URL')}/functions/v1/mollie-webhook`,
      metadata: {
        plan,
        naam,
        bedrijf,
        email,
        btw_nummer: btwNummer,
        country: countryInput,
        customer_type: customerType,
        vat_valid: vatValid,
        vat_rule_applied: vat.rule,
        vat_rate: vat.rate,
        subtotal: vat.subtotal,
        vat_amount: vat.vatAmount,
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

    // Log pending order met alle BTW-velden
    await supabaseAdmin.from('orders').upsert({
      payment_id: payment.id,
      plan,
      amount: vat.total,
      subtotal: vat.subtotal,
      vat_amount: vat.vatAmount,
      vat_rate: vat.rate,
      vat_rule_applied: vat.rule,
      vat_valid: vatValid,
      vat_validated_at: vatValidatedAt,
      country: countryInput,
      customer_type: customerType,
      naam,
      bedrijf,
      email,
      btw_nummer: btwNummer,
      status: 'pending',
    }, { onConflict: 'payment_id' });

    return new Response(JSON.stringify({
      checkoutUrl,
      paymentId: payment.id,
      total: vat.total,
      vatRule: vat.rule,
    }), { status: 200, headers });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers });
  }
});
