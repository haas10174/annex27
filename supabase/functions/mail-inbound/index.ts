// Supabase Edge Function: mail-inbound
// Receives parsed inbound email from Mailgun Routes (multipart/form-data or JSON)
// and stores it in the `inbound_mail` table for admin review.
//
// Deploy: supabase functions deploy mail-inbound --no-verify-jwt
// Set secret: MAILGUN_SIGNING_KEY (HMAC verification)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const MAX_BODY_CHARS = 200_000;

function parseFromHeader(raw: string): { name: string; email: string } {
  const m = /^\s*(?:"?([^"<]*)"?\s*)?<?([^>\s]+@[^>\s]+)>?/.exec(raw || '');
  if (!m) return { name: '', email: (raw || '').trim() };
  return { name: (m[1] || '').trim(), email: (m[2] || '').trim().toLowerCase() };
}

async function verifyMailgunSignature(token: string, timestamp: string, signature: string, signingKey: string): Promise<boolean> {
  if (!token || !timestamp || !signature || !signingKey) return false;
  // HMAC-SHA256 of `${timestamp}${token}` keyed with signing key; hex-compare to signature
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(signingKey), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(timestamp + token));
  const hex = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  // Timing-safe-ish compare
  if (hex.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}

serve(async (req) => {
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405 });

  try {
    const contentType = req.headers.get('content-type') || '';
    let fields: Record<string, string> = {};
    const attachments: Array<{ name: string; size: number; contentType: string }> = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      for (const [k, v] of form.entries()) {
        if (v instanceof File) {
          attachments.push({ name: v.name, size: v.size, contentType: v.type });
        } else {
          fields[k] = String(v);
        }
      }
    } else {
      const json = await req.json().catch(() => ({}));
      fields = json;
    }

    // Mailgun signature verification (recommended)
    const signingKey = Deno.env.get('MAILGUN_SIGNING_KEY');
    if (signingKey) {
      const ok = await verifyMailgunSignature(
        fields['token'] || '',
        fields['timestamp'] || '',
        fields['signature'] || '',
        signingKey
      );
      if (!ok) {
        console.warn('Invalid Mailgun signature');
        return new Response('Invalid signature', { status: 401 });
      }
    }

    const from = parseFromHeader(fields['From'] || fields['from'] || fields['sender'] || '');
    const subject = (fields['Subject'] || fields['subject'] || '').slice(0, 500);
    const bodyText = (fields['body-plain'] || fields['stripped-text'] || '').slice(0, MAX_BODY_CHARS);
    const bodyHtml = (fields['body-html'] || fields['stripped-html'] || '').slice(0, MAX_BODY_CHARS);
    const messageId = (fields['Message-Id'] || fields['message-id'] || '').slice(0, 500) || null;

    if (!from.email) {
      return new Response('Missing sender', { status: 400 });
    }

    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error } = await admin.from('inbound_mail').upsert({
      message_id: messageId,
      from_email: from.email,
      from_name: from.name || null,
      subject,
      body_text: bodyText,
      body_html: bodyHtml,
      attachments,
      raw: { recipient: fields['recipient'] || fields['To'] || null, signatureVerified: !!signingKey },
    }, { onConflict: 'message_id' });

    if (error) {
      console.error('Insert error:', error);
      return new Response('Storage error', { status: 500 });
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('mail-inbound error:', err);
    return new Response('Error', { status: 500 });
  }
});
