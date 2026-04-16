// Supabase Edge Function: mail-send
// Verstuurt mail via Hostnet SMTP. Auth: alleen admin via Authorization header.
//
// Secrets required:
//   HOSTNET_SMTP_HOST   bv. "mail.cz69laf6z.service.one"
//   HOSTNET_SMTP_PORT   bv. "465"
//   HOSTNET_SMTP_USER   bv. "info@annex27.nl"
//   HOSTNET_SMTP_PASS   wachtwoord
//
// Deploy: supabase functions deploy mail-send

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
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

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    // Verify caller is admin via Supabase JWT
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });
    const supaUser = createClient(
      Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user } } = await supaUser.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    const role = user.app_metadata?.role;
    const pakket = user.app_metadata?.pakket;
    if (role !== 'auditor' && pakket !== 'admin') {
      return new Response(JSON.stringify({ error: 'Geen rechten om mail te versturen' }), { status: 403, headers });
    }

    const body = await req.json();
    const to = String(body.to || '').trim();
    const subject = String(body.subject || '').trim().slice(0, 500);
    const text = String(body.text || '').trim().slice(0, 100_000);
    const html = body.html ? String(body.html).slice(0, 200_000) : undefined;
    const inReplyTo = body.in_reply_to ? String(body.in_reply_to).slice(0, 500) : null;

    if (!to.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres' }), { status: 400, headers });
    if (!subject || !text) return new Response(JSON.stringify({ error: 'Onderwerp en inhoud verplicht' }), { status: 400, headers });

    const host = Deno.env.get('HOSTNET_SMTP_HOST');
    const port = parseInt(Deno.env.get('HOSTNET_SMTP_PORT') || '465', 10);
    const smtpUser = Deno.env.get('HOSTNET_SMTP_USER');
    const smtpPass = Deno.env.get('HOSTNET_SMTP_PASS');
    if (!host || !smtpUser || !smtpPass) return new Response(JSON.stringify({ error: 'SMTP secrets not configured' }), { status: 500, headers });

    const client = new SMTPClient({
      connection: {
        hostname: host,
        port,
        tls: port === 465,
        auth: { username: smtpUser, password: smtpPass },
      },
    });

    const extraHeaders: Record<string, string> = {};
    if (inReplyTo) { extraHeaders['In-Reply-To'] = inReplyTo; extraHeaders['References'] = inReplyTo; }

    await client.send({
      from: `Annex27 <${smtpUser}>`,
      to,
      subject,
      content: text,
      html,
      headers: extraHeaders,
    });
    await client.close();

    // Log outgoing for audit trail
    const supaAdmin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    await supaAdmin.from('outbound_mail').insert({
      to_email: to, subject, body_text: text, in_reply_to: inReplyTo, sent_by: user.id
    });

    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (err) {
    console.error('mail-send error:', err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers });
  }
});
