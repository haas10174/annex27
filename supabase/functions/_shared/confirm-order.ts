// Shared logic: bevestig een betaalde order — invite user, koppel order, maak factuur.
// Aangeroepen vanuit:
//   - order-confirm (handmatig door admin)
//   - mollie-webhook (auto na status=paid)
// Idempotent: mag meerdere keren met dezelfde orderId gedraaid worden.

import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { sendPaymentConfirmation } from './send-mail.ts';

const PLAN_TO_PAKKET: Record<string, string> = {
  'gap': 'gap',
  'nis2': 'nis2',
  'iso_nis2_bundle': 'iso_nis2_bundle',
  'beleid': 'beleid',
  'preaudit': 'admin',
};
// Rank bepaalt welk pakket behouden blijft als een klant meerdere keren koopt (hoogste wint).
// Bundle staat boven los gap/nis2/beleid omdat het die toegang allemaal omvat (zie userAccess() in dashboard).
const PAKKET_RANK: Record<string, number> = { 'gap': 1, 'nis2': 2, 'beleid': 3, 'iso_nis2_bundle': 4, 'admin': 5 };

export type ConfirmResult =
  | { ok: true; user_id: string; invoice_number: string | null; invited_new_user: boolean; already_confirmed: boolean }
  | { ok: false; error: string; status: number };

export async function confirmOrder(
  supabase: SupabaseClient,
  orderId: string,
  opts: { siteUrl?: string } = {},
): Promise<ConfirmResult> {
  const { data: order, error: orderErr } = await supabase
    .from('orders').select('*').eq('id', orderId).maybeSingle();
  if (orderErr || !order) return { ok: false, error: 'Order niet gevonden', status: 404 };

  if (order.status !== 'paid') {
    return { ok: false, error: `Order heeft status "${order.status}", alleen "paid" kan bevestigd worden`, status: 400 };
  }

  const email = String(order.email || '').trim().toLowerCase();
  const naam = String(order.naam || '').slice(0, 200);
  const bedrijf = String(order.bedrijf || '').slice(0, 200);
  const pakket = PLAN_TO_PAKKET[order.plan] || 'gap';

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return { ok: false, error: 'Ongeldig e-mailadres in order', status: 400 };
  }

  // Idempotency: al bevestigd? Geef bestaande state terug zonder opnieuw uit te nodigen of factuur te maken.
  // Maar als de bevestigings-mail nog niet verstuurd is (oude orders, of eerdere mailfout), alsnog versturen.
  if (order.confirmed_at) {
    const { data: inv } = await supabase
      .from('invoices').select('invoice_number').eq('payment_id', order.payment_id).maybeSingle();
    const invoiceNumberExisting = inv?.invoice_number ?? null;

    if (!order.confirmation_email_sent_at) {
      const mailResult = await sendPaymentConfirmation(supabase, {
        orderId: order.id,
        email,
        naam,
        bedrijf,
        plan: order.plan,
        amount: parseFloat(order.amount),
        invoiceNumber: invoiceNumberExisting,
        invitedNewUser: false,
      });
      if (!mailResult.ok) {
        console.error(`Bevestigings-mail (backfill) mislukt voor order ${order.id}: ${mailResult.error}`);
      }
    }

    return {
      ok: true,
      user_id: order.user_id || '',
      invoice_number: invoiceNumberExisting,
      invited_new_user: false,
      already_confirmed: true,
    };
  }

  // 1. Find or invite user
  const { data: existingUsers } = await supabase.auth.admin.listUsers();
  const existing = existingUsers.users.find((u) => u.email === email);
  let userId: string;
  let invitedNew = false;

  if (existing) {
    userId = existing.id;
    const cur = existing.app_metadata?.pakket;
    const newPakket = (PAKKET_RANK[pakket] || 0) > (PAKKET_RANK[cur] || 0) ? pakket : cur;
    await supabase.auth.admin.updateUserById(userId, {
      app_metadata: { ...existing.app_metadata, pakket: newPakket },
      user_metadata: { ...existing.user_metadata, naam, bedrijf },
    });
  } else {
    const siteUrl = opts.siteUrl || Deno.env.get('SITE_URL') || 'https://annex27.nl';
    const { data: invited, error: inviteErr } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { naam, bedrijf },
      redirectTo: `${siteUrl}/portal`,
    });
    if (inviteErr || !invited.user) {
      return { ok: false, error: 'User-invite mislukt: ' + (inviteErr?.message || 'unknown'), status: 500 };
    }
    userId = invited.user.id;
    invitedNew = true;
    await supabase.auth.admin.updateUserById(userId, { app_metadata: { pakket } });
  }

  // 2. Update order — link user_id + confirmed_at
  await supabase.from('orders').update({
    user_id: userId,
    confirmed_at: new Date().toISOString(),
  }).eq('id', orderId);

  // 3. Create invoice if not exists
  let invoiceNumber: string | null = null;
  const { data: existingInv } = await supabase
    .from('invoices').select('invoice_number').eq('payment_id', order.payment_id).maybeSingle();

  if (existingInv) {
    invoiceNumber = existingInv.invoice_number;
  } else {
    const year = new Date().getFullYear();
    const prefix = `${year}-`;
    const { data: last } = await supabase
      .from('invoices').select('invoice_number')
      .like('invoice_number', `${prefix}%`)
      .order('invoice_number', { ascending: false }).limit(1);
    let seq = 1;
    if (last && last[0]) {
      const m = /^(\d{4})-(\d+)$/.exec(last[0].invoice_number);
      if (m) seq = parseInt(m[2], 10) + 1;
    }
    invoiceNumber = `${prefix}${String(seq).padStart(4, '0')}`;

    const totalIncl = parseFloat(order.amount);
    const vatRuleApplied: string | null = order.vat_rule_applied || null;
    const vatRate: number = typeof order.vat_rate === 'number' ? order.vat_rate
      : (typeof order.vat_rate === 'string' ? parseFloat(order.vat_rate) : 0) || 0;

    let subtotal: number;
    let btwAmount: number;
    if (order.subtotal != null && order.vat_amount != null) {
      subtotal = parseFloat(order.subtotal);
      btwAmount = parseFloat(order.vat_amount);
    } else if (vatRate > 0) {
      subtotal = Math.round((totalIncl / (1 + vatRate)) * 100) / 100;
      btwAmount = Math.round((totalIncl - subtotal) * 100) / 100;
    } else {
      subtotal = totalIncl;
      btwAmount = 0;
    }

    let btwRegime: string;
    if (vatRuleApplied === 'reverse_charge') btwRegime = 'reverse_charge';
    else if (vatRate > 0) btwRegime = 'standard';
    else btwRegime = 'none';

    await supabase.from('invoices').insert({
      invoice_number: invoiceNumber,
      order_id: order.id,
      user_id: userId,
      naam, bedrijf, email,
      btw_nummer: String(order.btw_nummer || '').slice(0, 50) || null,
      adres: null,
      product: order.plan,
      omschrijving: null,
      subtotal, btw_amount: btwAmount, total: totalIncl,
      status: 'paid',
      btw_regime: btwRegime,
      vat_rule_applied: vatRuleApplied,
      vat_rate: vatRate,
      country: order.country || null,
      customer_type: order.customer_type || null,
      payment_method: 'mollie',
      payment_id: order.payment_id,
    });
  }

  // 4. Stuur betalingsbevestigings-mail (idempotent, faalt soft).
  // Faalt deze, log het en ga door — order is correct bevestigd, mail kan handmatig opnieuw.
  const mailResult = await sendPaymentConfirmation(supabase, {
    orderId: order.id,
    email,
    naam,
    bedrijf,
    plan: order.plan,
    amount: parseFloat(order.amount),
    invoiceNumber,
    invitedNewUser: invitedNew,
  });
  if (!mailResult.ok) {
    console.error(`Bevestigings-mail mislukt voor order ${order.id}: ${mailResult.error}`);
  }

  return {
    ok: true,
    user_id: userId,
    invoice_number: invoiceNumber,
    invited_new_user: invitedNew,
    already_confirmed: false,
  };
}
