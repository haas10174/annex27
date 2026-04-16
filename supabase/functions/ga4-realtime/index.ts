// Supabase Edge Function: ga4-realtime
// Returns active users + top pages from GA4 Data API (Realtime).
// Auth: OAuth2 service-account JWT bearer (cached 50 min).
//
// Secrets required:
//   GA4_PROPERTY_ID          numeric property ID (e.g. 503123456)
//   GA4_SERVICE_ACCOUNT_JSON full JSON from GCP service-account key file
//
// Deploy: supabase functions deploy ga4-realtime --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];
function cors(origin: string | null) {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Vary': 'Origin',
  };
}

// Cache access token in module scope (cold start resets it; OK for serverless)
let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.expiresAt > now + 60) return cachedToken.token;

  const raw = Deno.env.get('GA4_SERVICE_ACCOUNT_JSON');
  if (!raw) throw new Error('GA4_SERVICE_ACCOUNT_JSON secret not set');
  const sa = JSON.parse(raw);

  const header = { alg: 'RS256', typ: 'JWT', kid: sa.private_key_id };
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/analytics.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  };
  const enc = (s: string) => btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const headerB64 = enc(JSON.stringify(header));
  const claimB64 = enc(JSON.stringify(claim));
  const signingInput = `${headerB64}.${claimB64}`;

  // Import RSA private key from PEM
  const pem = String(sa.private_key).replace(/-----[^-]+-----|\s+/g, '');
  const der = Uint8Array.from(atob(pem), c => c.charCodeAt(0));
  const key = await crypto.subtle.importKey(
    'pkcs8', der, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']
  );
  const sigBuf = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(signingInput));
  const sigB64 = enc(String.fromCharCode(...new Uint8Array(sigBuf)));
  const jwt = `${signingInput}.${sigB64}`;

  const tokenResp = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  if (!tokenResp.ok) throw new Error('Token exchange failed: ' + (await tokenResp.text()));
  const tokenData = await tokenResp.json();
  cachedToken = { token: tokenData.access_token, expiresAt: now + (tokenData.expires_in || 3600) };
  return cachedToken.token;
}

async function realtime(propertyId: string, accessToken: string) {
  const url = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runRealtimeReport`;
  const body = {
    metrics: [{ name: 'activeUsers' }],
    dimensions: [{ name: 'country' }, { name: 'unifiedScreenName' }],
    limit: 10,
  };
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error('GA4 API error: ' + (await r.text()));
  return r.json();
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });

  try {
    const propertyId = Deno.env.get('GA4_PROPERTY_ID');
    if (!propertyId) return new Response(JSON.stringify({ error: 'GA4_PROPERTY_ID not set' }), { status: 500, headers });

    const token = await getAccessToken();
    const data = await realtime(propertyId, token);

    const activeUsers = parseInt(data.rows?.[0]?.metricValues?.[0]?.value || '0', 10);
    const byCountry: Record<string, number> = {};
    const byPage: Record<string, number> = {};
    (data.rows || []).forEach((row: any) => {
      const country = row.dimensionValues?.[0]?.value || 'Unknown';
      const page = row.dimensionValues?.[1]?.value || '/';
      const v = parseInt(row.metricValues?.[0]?.value || '0', 10);
      byCountry[country] = (byCountry[country] || 0) + v;
      byPage[page] = (byPage[page] || 0) + v;
    });

    return new Response(JSON.stringify({
      activeUsers,
      byCountry: Object.entries(byCountry).map(([k, v]) => ({ key: k, value: v })).sort((a, b) => b.value - a.value),
      byPage: Object.entries(byPage).map(([k, v]) => ({ key: k, value: v })).sort((a, b) => b.value - a.value),
      ts: new Date().toISOString(),
    }), { headers });
  } catch (err) {
    console.error('ga4-realtime error:', err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers });
  }
});
