// Supabase Edge Function: mail-poll
// Pollt Hostnet IMAP, fetcht ongelezen mails en slaat ze op in `inbound_mail`.
// Trigger via pg_cron elke 5 min OF handmatig vanuit admin "Vernieuwen".
//
// Secrets required:
//   HOSTNET_IMAP_HOST   bv. "mail.cz69laf6z.service.one"
//   HOSTNET_IMAP_PORT   bv. "993"
//   HOSTNET_IMAP_USER   bv. "info@annex27.nl"
//   HOSTNET_IMAP_PASS   wachtwoord
//
// Deploy: supabase functions deploy mail-poll --no-verify-jwt

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

// Minimal IMAP client over TLS (FETCH UNSEEN headers + body)
async function fetchUnseen(host: string, port: number, user: string, pass: string) {
  const conn = await Deno.connectTls({ hostname: host, port });
  const dec = new TextDecoder();
  const enc = new TextEncoder();
  const buf = new Uint8Array(64 * 1024);
  let leftover = '';

  async function readUntil(predicate: (line: string) => boolean): Promise<string[]> {
    const lines: string[] = [];
    while (true) {
      const n = await conn.read(buf);
      if (!n) break;
      leftover += dec.decode(buf.subarray(0, n));
      const parts = leftover.split('\r\n');
      leftover = parts.pop() || '';
      for (const line of parts) {
        lines.push(line);
        if (predicate(line)) return lines;
      }
    }
    return lines;
  }

  async function send(tag: string, cmd: string) {
    await conn.write(enc(`${tag} ${cmd}\r\n`));
    return readUntil((l) => l.startsWith(tag + ' OK') || l.startsWith(tag + ' BAD') || l.startsWith(tag + ' NO'));
  }

  // Greeting
  await readUntil((l) => l.startsWith('* OK'));
  // LOGIN
  const loginRes = await send('a1', `LOGIN ${user} "${pass.replace(/"/g, '\\"')}"`);
  if (!loginRes.some((l) => l.startsWith('a1 OK'))) throw new Error('IMAP LOGIN failed');
  // SELECT INBOX
  await send('a2', 'SELECT INBOX');
  // SEARCH UNSEEN
  const searchLines = await send('a3', 'SEARCH UNSEEN');
  const idsLine = searchLines.find((l) => l.startsWith('* SEARCH'));
  const ids = idsLine ? idsLine.replace('* SEARCH', '').trim().split(/\s+/).filter(Boolean) : [];

  const messages: { uid: string; raw: string }[] = [];
  for (const id of ids.slice(0, 25)) {
    // FETCH RFC822
    await conn.write(enc(`a4-${id} FETCH ${id} (BODY.PEEK[])\r\n`));
    let bodyAcc = '';
    let inBody = false;
    let bodyLength = 0;
    while (true) {
      const n = await conn.read(buf);
      if (!n) break;
      const chunk = dec.decode(buf.subarray(0, n));
      bodyAcc += chunk;
      if (!inBody) {
        const m = bodyAcc.match(/\{(\d+)\}\r\n/);
        if (m) {
          bodyLength = parseInt(m[1], 10);
          const startIdx = bodyAcc.indexOf(m[0]) + m[0].length;
          bodyAcc = bodyAcc.substring(startIdx);
          inBody = true;
        }
      }
      if (inBody && bodyAcc.length >= bodyLength) {
        const body = bodyAcc.substring(0, bodyLength);
        messages.push({ uid: id, raw: body });
        // Wait for trailing OK
        const tail = bodyAcc.substring(bodyLength);
        if (tail.includes('OK')) break;
        // continue reading until OK
      }
      if (bodyAcc.includes(`a4-${id} OK`)) break;
    }
  }

  // LOGOUT
  await send('a9', 'LOGOUT');
  conn.close();
  return messages;
}

function parseSimpleMime(raw: string) {
  const headerEnd = raw.indexOf('\r\n\r\n');
  const headerBlock = headerEnd >= 0 ? raw.slice(0, headerEnd) : raw;
  const body = headerEnd >= 0 ? raw.slice(headerEnd + 4) : '';
  const headers: Record<string, string> = {};
  const lines = headerBlock.split(/\r?\n/);
  let lastKey = '';
  for (const l of lines) {
    if (/^\s/.test(l) && lastKey) { headers[lastKey] += ' ' + l.trim(); continue; }
    const m = l.match(/^([A-Za-z-]+):\s*(.*)$/);
    if (m) { lastKey = m[1].toLowerCase(); headers[lastKey] = m[2]; }
  }
  const fromRaw = headers['from'] || '';
  const m = /^\s*(?:"?([^"<]*)"?\s*)?<?([^>\s]+@[^>\s]+)>?/.exec(fromRaw);
  return {
    messageId: headers['message-id'] || null,
    from: { name: (m?.[1] || '').trim(), email: (m?.[2] || fromRaw).trim().toLowerCase() },
    subject: headers['subject'] || '',
    date: headers['date'] || null,
    bodyText: body.slice(0, 200_000),
  };
}

serve(async (req) => {
  if (req.method !== 'POST' && req.method !== 'GET') return new Response('Method not allowed', { status: 405 });
  try {
    const host = Deno.env.get('HOSTNET_IMAP_HOST');
    const port = parseInt(Deno.env.get('HOSTNET_IMAP_PORT') || '993', 10);
    const user = Deno.env.get('HOSTNET_IMAP_USER');
    const pass = Deno.env.get('HOSTNET_IMAP_PASS');
    if (!host || !user || !pass) {
      return new Response(JSON.stringify({ error: 'IMAP secrets not configured' }), { status: 500 });
    }

    const messages = await fetchUnseen(host, port, user, pass);
    if (messages.length === 0) return new Response(JSON.stringify({ inserted: 0 }), { headers: { 'Content-Type': 'application/json' } });

    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    let inserted = 0;
    for (const m of messages) {
      const parsed = parseSimpleMime(m.raw);
      if (!parsed.from.email) continue;
      const { error } = await supabase.from('inbound_mail').upsert({
        message_id: parsed.messageId,
        from_email: parsed.from.email,
        from_name: parsed.from.name || null,
        subject: parsed.subject.slice(0, 500),
        body_text: parsed.bodyText,
        body_html: '',
        attachments: [],
        raw: { source: 'hostnet-imap', uid: m.uid },
      }, { onConflict: 'message_id' });
      if (!error) inserted++;
    }
    return new Response(JSON.stringify({ inserted, total: messages.length }), { headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('mail-poll error:', err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
