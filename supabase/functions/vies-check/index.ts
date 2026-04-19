// Supabase Edge Function: vies-check
// Valideert een EU BTW-nummer via de VIES REST-API (EU-commissie) + caching.
// Deploy: supabase functions deploy vies-check --no-verify-jwt
//
// INPUT  : POST { vat_number: "BE0123456789" } of { country_code: "BE", vat_number: "0123456789" }
// OUTPUT : { valid, country_code, vat_number, company_name, company_address, checked_at, cached }
//
// Cache: 7 dagen in public.vat_validation_cache (service-role).
// VIES kan traag/intermittent zijn; bij fout returnen we {valid:null, error} zodat de flow kan doorgaan.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];

function cors(origin: string | null): Record<string, string> {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

const EU_COUNTRIES = new Set([
  'AT','BE','BG','CY','CZ','DE','DK','EE','EL','ES','FI','FR','HR','HU',
  'IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK',
  // NB: GR = EL in VIES. XI (Noord-Ierland) blijft via VIES geldig.
  'XI',
]);

// Basis-format-checks per land (bovengrens, niet uitputtend — VIES doet definitieve check)
const COUNTRY_PATTERNS: Record<string, RegExp> = {
  AT: /^U\d{8}$/i,
  BE: /^[01]\d{9}$/,
  BG: /^\d{9,10}$/,
  CY: /^\d{8}[A-Z]$/i,
  CZ: /^\d{8,10}$/,
  DE: /^\d{9}$/,
  DK: /^\d{8}$/,
  EE: /^\d{9}$/,
  EL: /^\d{9}$/,
  ES: /^[A-Z0-9]\d{7}[A-Z0-9]$/i,
  FI: /^\d{8}$/,
  FR: /^[A-HJ-NP-Z0-9]{2}\d{9}$/i,
  HR: /^\d{11}$/,
  HU: /^\d{8}$/,
  IE: /^\d[A-Z0-9+*]\d{5}[A-Z]{1,2}$/i,
  IT: /^\d{11}$/,
  LT: /^(\d{9}|\d{12})$/,
  LU: /^\d{8}$/,
  LV: /^\d{11}$/,
  MT: /^\d{8}$/,
  NL: /^\d{9}B\d{2}$/i,
  PL: /^\d{10}$/,
  PT: /^\d{9}$/,
  RO: /^\d{2,10}$/,
  SE: /^\d{12}$/,
  SI: /^\d{8}$/,
  SK: /^\d{10}$/,
  XI: /^\d{9}(\d{3})?$/,
};

// Normaliseer: strip spaces/dots/dashes, uppercase, split in country+nummer
function normalize(input: { country_code?: string; vat_number?: string }): { country: string; number: string } | null {
  let raw = String(input.vat_number ?? '').replace(/[\s.\-]/g, '').toUpperCase();
  let country = String(input.country_code ?? '').trim().toUpperCase();

  if (!country && raw.length >= 3 && /^[A-Z]{2}/.test(raw)) {
    country = raw.slice(0, 2);
    raw = raw.slice(2);
  }
  if (raw.length >= 3 && raw.slice(0, 2) === country) {
    raw = raw.slice(2);
  }
  if (!country || !raw) return null;
  return { country, number: raw };
}

function structurallyValid(country: string, number: string): boolean {
  const pat = COUNTRY_PATTERNS[country];
  return pat ? pat.test(number) : EU_COUNTRIES.has(country);
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const norm = normalize({ country_code: body.country_code, vat_number: body.vat_number });
    if (!norm) {
      return new Response(JSON.stringify({ valid: false, error: 'Geen BTW-nummer opgegeven' }), { status: 400, headers });
    }
    const { country, number } = norm;

    if (!EU_COUNTRIES.has(country)) {
      return new Response(JSON.stringify({
        valid: false,
        country_code: country,
        vat_number: number,
        error: 'Land niet in EU-VIES',
      }), { status: 200, headers });
    }

    if (!structurallyValid(country, number)) {
      return new Response(JSON.stringify({
        valid: false,
        country_code: country,
        vat_number: number,
        error: 'BTW-nummer heeft niet het juiste formaat voor dit land',
      }), { status: 200, headers });
    }

    const fullVat = `${country}${number}`;
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    // 1) Cache-lookup
    const { data: cached } = await supabase
      .from('vat_validation_cache')
      .select('*')
      .eq('vat_number', fullVat)
      .gt('expires_at', new Date().toISOString())
      .order('checked_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (cached) {
      return new Response(JSON.stringify({
        valid: cached.valid,
        country_code: cached.country_code,
        vat_number: fullVat,
        company_name: cached.company_name,
        company_address: cached.company_address,
        checked_at: cached.checked_at,
        cached: true,
      }), { status: 200, headers });
    }

    // 2) Call VIES REST
    let viesValid = false;
    let companyName: string | null = null;
    let companyAddress: string | null = null;
    let viesError: string | null = null;

    try {
      const viesResp = await fetch('https://ec.europa.eu/taxation_customs/vies/rest-api/check-vat-number', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ countryCode: country, vatNumber: number }),
        signal: AbortSignal.timeout(8000),
      });

      if (viesResp.ok) {
        const data = await viesResp.json();
        viesValid = !!data.valid;
        companyName = (data.name && data.name !== '---') ? String(data.name).slice(0, 255) : null;
        companyAddress = (data.address && data.address !== '---') ? String(data.address).slice(0, 500) : null;
      } else {
        viesError = `VIES HTTP ${viesResp.status}`;
      }
    } catch (e) {
      viesError = `VIES unreachable: ${e instanceof Error ? e.message : String(e)}`;
    }

    // 3) Cache result (ook negatieve, korter TTL)
    if (!viesError) {
      await supabase.from('vat_validation_cache').upsert({
        vat_number: fullVat,
        valid: viesValid,
        country_code: country,
        company_name: companyName,
        company_address: companyAddress,
        checked_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + (viesValid ? 7 : 1) * 24 * 3600 * 1000).toISOString(),
        source: 'vies',
      }, { onConflict: 'vat_number' });
    }

    return new Response(JSON.stringify({
      valid: viesError ? null : viesValid,
      country_code: country,
      vat_number: fullVat,
      company_name: companyName,
      company_address: companyAddress,
      checked_at: new Date().toISOString(),
      cached: false,
      error: viesError,
    }), { status: 200, headers });
  } catch (err) {
    console.error('vies-check error:', err);
    return new Response(JSON.stringify({ valid: null, error: String(err instanceof Error ? err.message : err) }), { status: 500, headers });
  }
});
