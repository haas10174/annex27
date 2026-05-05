// Supabase Edge Function: lead-mail-confirm
// Verstuurt bevestigingsmail aan een quickscan-lead nadat submitLead() de waitlist
// heeft gevuld. Publieke endpoint, geen JWT vereist — daarom rate-limited en
// gevalideerd tegen het bestaan van de lead in de waitlist-tabel.
//
// Body: { email, naam, bedrijf, sector_label?, score? }
// Response: { ok: true } of { error }
//
// Deploy: supabase functions deploy lead-mail-confirm --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { SMTPClient } from 'https://deno.land/x/denomailer@1.6.0/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];
function cors(origin: string | null) {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Headers': 'apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

function clientIp(req: Request): string {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return req.headers.get('cf-connecting-ip') || 'unknown';
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]!));
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body.email || '').trim().toLowerCase();
    const naam = String(body.naam || '').trim().slice(0, 200);
    const bedrijf = String(body.bedrijf || '').trim().slice(0, 200);
    const sectorLabel = String(body.sector_label || body.sectorLabel || '').trim().slice(0, 100);
    const score = String(body.score || '').trim().slice(0, 10);

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return new Response(JSON.stringify({ error: 'Ongeldig e-mailadres' }), { status: 400, headers });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Rate-limit: 3 mails per uur per email, 10 per uur per IP
    const ip = clientIp(req);
    const { data: emailOk } = await supabase.rpc('check_rate_limit', {
      p_identifier: `mail:${email}`, p_endpoint: 'lead-mail-confirm', p_max_requests: 3,
    });
    const { data: ipOk } = await supabase.rpc('check_rate_limit', {
      p_identifier: `ip:${ip}`, p_endpoint: 'lead-mail-confirm', p_max_requests: 10,
    });
    if (emailOk === false || ipOk === false) {
      return new Response(JSON.stringify({ error: 'Te veel verzoeken. Probeer over een uur opnieuw.' }), { status: 429, headers });
    }

    // Verifieer dat lead recent in waitlist is gezet (laatste 5 min) — voorkomt arbitrary mail-blast
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { data: recent } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .gte('created_at', fiveMinAgo)
      .limit(1);
    if (!recent || recent.length === 0) {
      return new Response(JSON.stringify({ error: 'Geen recente quickscan-lead gevonden voor dit adres' }), { status: 404, headers });
    }

    // SMTP config
    const host = Deno.env.get('HOSTNET_SMTP_HOST');
    const port = parseInt(Deno.env.get('HOSTNET_SMTP_PORT') || '465', 10);
    const smtpUser = Deno.env.get('HOSTNET_SMTP_USER');
    const smtpPass = Deno.env.get('HOSTNET_SMTP_PASS');
    if (!host || !smtpUser || !smtpPass) {
      return new Response(JSON.stringify({ error: 'SMTP secrets niet geconfigureerd' }), { status: 500, headers });
    }

    const subject = 'Uw quickscan-resultaat is bewaard — Annex27';
    const greeting = naam ? `Beste ${naam},` : 'Beste,';
    const sectorLine = sectorLabel ? `\nSector: ${sectorLabel}` : '';
    const scoreLine = score ? `\nScore: ${score}%` : '';

    const text =
`${greeting}

Bedankt voor het invullen van de Annex27 quickscan. Uw resultaat is bewaard.${sectorLine}${scoreLine}

Volgende stap — een rapport door een Lead Auditor:
Met de volledige gap-analyse (€795) krijgt u een rapport dat alle 93 Annex A-controls en 7 ISMS-clausules dekt, inclusief verplichte bewijsvoering. Klaar voor de echte audit.

Bestel direct: https://annex27.nl/bestellen.html?plan=gap

Vragen? Antwoord op deze mail of stuur naar info@annex27.nl.

Met vriendelijke groet,
Raoul Haas — Lead Auditor ISO 27001
Annex27`;

    const html =
`<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;color:#0F172A;line-height:1.55;">
  <p style="margin:0 0 16px;">${escapeHtml(greeting)}</p>
  <p style="margin:0 0 16px;">Bedankt voor het invullen van de Annex27 quickscan. Uw resultaat is bewaard.</p>
  ${sectorLabel || score ? `<p style="margin:0 0 20px;font-size:0.92rem;color:#334155;">${sectorLabel ? `<strong>Sector:</strong> ${escapeHtml(sectorLabel)}<br/>` : ''}${score ? `<strong>Score:</strong> ${escapeHtml(score)}%` : ''}</p>` : ''}
  <div style="background:#F0FDFA;border-left:3px solid #0D9488;padding:14px 18px;margin:0 0 20px;border-radius:6px;">
    <p style="margin:0 0 8px;font-weight:600;color:#0D9488;">Volgende stap — rapport door een Lead Auditor</p>
    <p style="margin:0;font-size:0.92rem;">Met de volledige gap-analyse (€795) krijgt u een rapport dat alle 93 Annex A-controls en 7 ISMS-clausules dekt, inclusief verplichte bewijsvoering. Klaar voor de echte audit.</p>
  </div>
  <p style="margin:0 0 24px;"><a href="https://annex27.nl/bestellen.html?plan=gap" style="display:inline-block;background:#0D9488;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;">Bestel volledige gap-analyse →</a></p>
  <p style="margin:0 0 8px;font-size:0.92rem;">Vragen? Antwoord op deze mail of stuur naar <a href="mailto:info@annex27.nl" style="color:#0D9488;">info@annex27.nl</a>.</p>
  <p style="margin:24px 0 0;font-size:0.88rem;color:#475569;">Met vriendelijke groet,<br/>Raoul Haas — Lead Auditor ISO 27001<br/>Annex27</p>
</div>`;

    const client = new SMTPClient({
      connection: { hostname: host, port, tls: port === 465, auth: { username: smtpUser, password: smtpPass } },
    });
    await client.send({ from: `Annex27 <${smtpUser}>`, to: email, subject, content: text, html });
    await client.close();

    // Log voor audit
    await supabase.from('outbound_mail').insert({
      to_email: email, subject, body_text: text, sent_by: null,
    }).then(() => {}, () => {/* ignore log failures */});

    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (err) {
    console.error('lead-mail-confirm error:', err);
    return new Response(JSON.stringify({ error: 'Mail kon niet verstuurd worden' }), { status: 500, headers });
  }
});
