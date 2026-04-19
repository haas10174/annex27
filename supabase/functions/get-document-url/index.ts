// Supabase Edge Function: get-document-url
// Generates a signed URL for policy document download.
// Deploy: supabase functions deploy get-document-url

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

// Pakket -> document access mapping
const ACCESS_RULES: Record<string, { basispakket: boolean; premium: boolean; werkinstructies: boolean }> = {
  'gap':             { basispakket: false, premium: false, werkinstructies: false },
  'readiness':       { basispakket: true,  premium: false, werkinstructies: true  },
  'beleid':          { basispakket: true,  premium: true,  werkinstructies: true  },
  'admin':           { basispakket: true,  premium: true,  werkinstructies: true  },
};

// Strict file path validation
const FILE_PATH_RE = /^(basispakket|premium|werkinstructies)\/[a-zA-Z0-9][a-zA-Z0-9\-_.]{0,80}\.(docx|pdf|xlsx)$/;

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
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });
    }

    // Verify user token
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    }

    // Admin client for rate limit + signed URL
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // SECURITY: Rate limiting (30 downloads per minute per user)
    const { data: allowed } = await supabaseAdmin.rpc('check_rate_limit', {
      p_identifier: user.id,
      p_endpoint: 'get-document-url',
      p_max_requests: 30,
    });

    if (allowed === false) {
      return new Response(JSON.stringify({ error: 'Te veel downloads. Probeer over een minuut opnieuw.' }), {
        status: 429, headers: { ...headers, 'Retry-After': '60' }
      });
    }

    // Parse + validate input
    const body = await req.json();
    const file = String(body.file ?? '').trim();

    if (!file || !FILE_PATH_RE.test(file)) {
      return new Response(JSON.stringify({ error: 'Ongeldig bestandspad' }), { status: 400, headers });
    }

    // SECURITY: pakket from app_metadata ONLY (user-controlled metadata is ignored)
    const pakket = user.app_metadata?.pakket || 'gap';
    const access = ACCESS_RULES[pakket] || ACCESS_RULES.gap;

    let hasAccess = false;
    if (file.startsWith('basispakket/') && access.basispakket) hasAccess = true;
    else if (file.startsWith('premium/') && access.premium) hasAccess = true;
    else if (file.startsWith('werkinstructies/') && access.werkinstructies) hasAccess = true;

    if (!hasAccess) {
      return new Response(JSON.stringify({
        error: 'Geen toegang - upgrade uw pakket',
        pakket,
      }), { status: 403, headers });
    }

    // Generate signed URL (60 seconds) — force attachment download with original filename
    const downloadName = file.split('/').pop() || 'document';
    const { data, error } = await supabaseAdmin.storage
      .from('documents')
      .createSignedUrl(file, 60, { download: downloadName });

    if (error || !data?.signedUrl) {
      console.error('Signed URL error:', error);
      return new Response(JSON.stringify({ error: 'Document niet beschikbaar' }), { status: 404, headers });
    }

    // Log access (non-blocking — ignore errors)
    supabaseAdmin.from('document_access_log').insert({
      user_id: user.id,
      email: user.email,
      file,
      pakket,
    }).then(() => {}, (e) => console.error('Log insert failed:', e));

    return new Response(JSON.stringify({
      url: data.signedUrl,
      expiresIn: 60,
    }), { status: 200, headers });
  } catch (err) {
    console.error('Error:', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers });
  }
});
