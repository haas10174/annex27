// Shared mail-helper voor edge functions, gebruikt Resend HTTP API.
// Vereist secret RESEND_API_KEY in Supabase Edge Function secrets.
//
// Verzendadres: info@annex27.nl (vereist DNS-verificatie van annex27.nl in Resend dashboard).

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const FROM_ADDRESS = 'Annex27 <info@annex27.nl>';
const REPLY_TO = 'info@annex27.nl';
const PORTAL_URL = 'https://annex27.nl/portal';

const PLAN_LABELS: Record<string, string> = {
  'gap': 'Gap-analyse',
  'nis2': 'NIS2 Readiness',
  'beleid': 'Beleidspakket',
  'preaudit': 'Pre-audit Review',
};

interface SendArgs {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

interface ResendResponse {
  id?: string;
  message?: string;
  name?: string;
}

async function sendViaResend(args: SendArgs): Promise<{ ok: true; id: string } | { ok: false; error: string }> {
  const apiKey = Deno.env.get('RESEND_API_KEY');
  if (!apiKey) return { ok: false, error: 'RESEND_API_KEY niet geconfigureerd' };

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [args.to],
      subject: args.subject,
      html: args.html,
      text: args.text,
      reply_to: args.replyTo || REPLY_TO,
    }),
  });

  const body = (await resp.json().catch(() => ({}))) as ResendResponse;
  if (!resp.ok || !body.id) {
    return { ok: false, error: body.message || `Resend HTTP ${resp.status}` };
  }
  return { ok: true, id: body.id };
}

interface PaymentConfirmationArgs {
  orderId: string;
  email: string;
  naam: string;
  bedrijf: string;
  plan: string;
  amount: number;
  invoiceNumber: string | null;
  invitedNewUser: boolean;
}

function escapeHtml(s: string): string {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildPaymentEmail(args: PaymentConfirmationArgs): { subject: string; html: string; text: string } {
  const planLabel = PLAN_LABELS[args.plan] || args.plan;
  const amountFormatted = new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR' }).format(args.amount);
  const safeNaam = escapeHtml(args.naam);
  const safeBedrijf = escapeHtml(args.bedrijf);
  const invoiceLine = args.invoiceNumber
    ? `<tr><td style="padding:8px 0;color:#64748b;">Factuurnummer</td><td style="padding:8px 0;color:#0f172a;font-weight:600;text-align:right;">${escapeHtml(args.invoiceNumber)}</td></tr>`
    : '';

  const newUserBlock = args.invitedNewUser
    ? `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#475569;">U ontvangt apart een mail met een persoonlijke link om uw wachtwoord in te stellen. Daarna kunt u via onderstaande knop inloggen op het portaal.</p>`
    : `<p style="margin:16px 0 0;font-size:14px;line-height:1.6;color:#475569;">U kunt direct inloggen op het portaal met uw bestaande wachtwoord.</p>`;

  const subject = `Betaling ontvangen — ${planLabel}${args.invoiceNumber ? ` (factuur ${args.invoiceNumber})` : ''}`;

  const html = `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,sans-serif;color:#0f172a;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#F8FAFC;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #E2E8F0;">
        <tr><td style="padding:32px 32px 0;">
          <div style="display:inline-block;padding:6px 12px;background:#CCFBF1;color:#0F766E;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;border-radius:999px;">Betaling ontvangen</div>
          <h1 style="margin:18px 0 8px;font-size:24px;line-height:1.25;color:#0f172a;letter-spacing:-0.02em;">Welkom bij Annex27, ${safeNaam}.</h1>
          <p style="margin:0;font-size:15px;line-height:1.65;color:#475569;">We hebben uw betaling voor <strong style="color:#0f172a;">${escapeHtml(planLabel)}</strong> ontvangen. Hieronder de details van uw bestelling.</p>
        </td></tr>
        <tr><td style="padding:28px 32px 0;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="border-top:1px solid #E2E8F0;border-bottom:1px solid #E2E8F0;font-size:14px;">
            <tr><td style="padding:8px 0;color:#64748b;">Pakket</td><td style="padding:8px 0;color:#0f172a;font-weight:600;text-align:right;">${escapeHtml(planLabel)}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Organisatie</td><td style="padding:8px 0;color:#0f172a;font-weight:600;text-align:right;">${safeBedrijf}</td></tr>
            <tr><td style="padding:8px 0;color:#64748b;">Bedrag</td><td style="padding:8px 0;color:#0f172a;font-weight:600;text-align:right;">${amountFormatted}</td></tr>
            ${invoiceLine}
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px 0;">
          <a href="${PORTAL_URL}" style="display:inline-block;padding:14px 24px;background:#0D9488;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:700;font-size:15px;">Open portaal &rarr;</a>
          ${newUserBlock}
        </td></tr>
        <tr><td style="padding:32px 32px 0;">
          <h2 style="margin:0 0 8px;font-size:16px;line-height:1.3;color:#0f172a;letter-spacing:-0.01em;">Wat er nu gebeurt</h2>
          <ol style="margin:0;padding:0 0 0 20px;font-size:14px;line-height:1.7;color:#475569;">
            <li>U start in het dashboard met uw gap-analyse op basis van de 93 Annex A-controls.</li>
            <li>U uploadt evidence en vult toelichting in. Voortgang wordt continu opgeslagen.</li>
            <li>Binnen 48 uur na afronding reviewt Lead Auditor Raoul Haas uw werk persoonlijk en ontvangt u uw signed-off rapport.</li>
          </ol>
        </td></tr>
        <tr><td style="padding:24px 32px 32px;">
          <p style="margin:0;font-size:13px;line-height:1.65;color:#94a3b8;">Vragen? Beantwoord deze mail of stuur direct een bericht naar <a href="mailto:info@annex27.nl" style="color:#0D9488;text-decoration:none;">info@annex27.nl</a>.</p>
        </td></tr>
        <tr><td style="padding:18px 32px;background:#F8FAFC;border-top:1px solid #E2E8F0;">
          <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">Annex27 &middot; KBO 1006.203.170 &middot; <a href="https://annex27.nl" style="color:#94a3b8;text-decoration:underline;">annex27.nl</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `Welkom bij Annex27, ${args.naam}.

We hebben uw betaling voor ${planLabel} ontvangen.

Bestelling
- Pakket: ${planLabel}
- Organisatie: ${args.bedrijf}
- Bedrag: ${amountFormatted}${args.invoiceNumber ? `\n- Factuurnummer: ${args.invoiceNumber}` : ''}

Open uw portaal: ${PORTAL_URL}

${args.invitedNewUser
    ? 'U ontvangt apart een mail met een persoonlijke link om uw wachtwoord in te stellen.'
    : 'U kunt direct inloggen met uw bestaande wachtwoord.'}

Wat er nu gebeurt
1. U start in het dashboard met uw gap-analyse op basis van de 93 Annex A-controls.
2. U uploadt evidence en vult toelichting in. Voortgang wordt continu opgeslagen.
3. Binnen 48 uur na afronding reviewt Lead Auditor Raoul Haas uw werk en ontvangt u uw signed-off rapport.

Vragen? Beantwoord deze mail of stuur naar info@annex27.nl.

Annex27 — KBO 1006.203.170 — annex27.nl
`;

  return { subject, html, text };
}

export async function sendPaymentConfirmation(
  supabase: SupabaseClient,
  args: PaymentConfirmationArgs,
): Promise<{ ok: true; id: string; alreadySent: boolean } | { ok: false; error: string }> {
  // Idempotency: re-fetch om race-conditions te voorkomen
  const { data: order } = await supabase
    .from('orders')
    .select('confirmation_email_sent_at')
    .eq('id', args.orderId)
    .maybeSingle();

  if (order?.confirmation_email_sent_at) {
    return { ok: true, id: 'noop', alreadySent: true };
  }

  const { subject, html, text } = buildPaymentEmail(args);
  const result = await sendViaResend({ to: args.email, subject, html, text });

  if (!result.ok) return { ok: false, error: result.error };

  // Markeer als verstuurd zodat retries niet dubbel sturen
  await supabase
    .from('orders')
    .update({ confirmation_email_sent_at: new Date().toISOString() })
    .eq('id', args.orderId);

  return { ok: true, id: result.id, alreadySent: false };
}
