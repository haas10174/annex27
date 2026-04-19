// Shared VAT-rules voor edge functions.
// Bepaalt welke BTW-regel van toepassing is en welke factuurvermelding.
//
// Uitgangspunten (2026):
// - Verkoper: BE, Art. 56bis (kleine onderneming, < €25k BE-omzet) → binnenlands vrijgesteld.
// - EU B2C onder €10k drempel (goederen + elektronische diensten) → plaats van dienst = oorsprong (BE) → 56bis.
// - EU B2B met geldig VIES-nummer → BTW verlegd naar afnemer (art. 196 Richtlijn 2006/112/EG).
// - Buiten EU → buiten BTW-scope.
//
// BELANGRIJK: dit zijn de regels zolang verkoper onder de drempels blijft. Zodra de €25k BE of €10k EU-B2C
// overschreden wordt, moeten hier extra regels bij (BE 21% binnenland, OSS-heffing per land).

export type VatRuleKey =
  | 'exempt_56bis'       // BE binnenlands — Art. 56bis
  | 'reverse_charge'     // EU B2B met VIES-valid VAT
  | 'exempt_56bis_eu'    // EU B2C of B2B zonder VAT — 56bis (onder €10k drempel)
  | 'outside_eu';        // Niet-EU

export interface VatRule {
  rule: VatRuleKey;
  rate: number;            // 0-1 (bv. 0.21 = 21%)
  invoiceNote: string;     // wettelijke vermelding op factuur
  shortLabel: string;      // UI-label ("Vrijstelling 56bis", "BTW verlegd", ...)
  requiresVatNumber: boolean;
}

export interface VatComputation extends VatRule {
  subtotal: number;
  vatAmount: number;
  total: number;
}

const EU_COUNTRIES = new Set([
  'AT','BE','BG','CY','CZ','DE','DK','EE','EL','ES','FI','FR','HR','HU',
  'IE','IT','LT','LU','LV','MT','NL','PL','PT','RO','SE','SI','SK','XI',
]);

export function isEuCountry(country: string): boolean {
  return EU_COUNTRIES.has((country || '').toUpperCase());
}

export function determineVatRule(args: {
  country: string;
  customerType: 'b2c' | 'b2b';
  vatValid: boolean | null;
  sellerCountry?: string;
}): VatRule {
  const country = (args.country || '').toUpperCase();
  const sellerCountry = (args.sellerCountry || 'BE').toUpperCase();
  const customerType = args.customerType || 'b2c';

  if (!EU_COUNTRIES.has(country)) {
    return {
      rule: 'outside_eu',
      rate: 0,
      invoiceNote: 'Outside scope of EU VAT',
      shortLabel: 'Buiten EU',
      requiresVatNumber: false,
    };
  }

  if (country === sellerCountry) {
    return {
      rule: 'exempt_56bis',
      rate: 0,
      invoiceNote: 'Bijzondere vrijstellingsregeling kleine ondernemingen — Art. 56bis W.BTW (België)',
      shortLabel: 'Vrijstelling Art. 56bis',
      requiresVatNumber: false,
    };
  }

  if (customerType === 'b2b' && args.vatValid === true) {
    return {
      rule: 'reverse_charge',
      rate: 0,
      invoiceNote: 'BTW verlegd — Art. 196 Richtlijn 2006/112/EG. BTW-aangifte door afnemer.',
      shortLabel: 'BTW verlegd',
      requiresVatNumber: true,
    };
  }

  return {
    rule: 'exempt_56bis_eu',
    rate: 0,
    invoiceNote: 'Bijzondere vrijstellingsregeling kleine ondernemingen — Art. 56bis W.BTW (België). Onder EU-B2C-drempel van €10.000.',
    shortLabel: 'Vrijstelling Art. 56bis',
    requiresVatNumber: false,
  };
}

export function computeVat(args: {
  country: string;
  customerType: 'b2c' | 'b2b';
  vatValid: boolean | null;
  subtotal: number;
  sellerCountry?: string;
}): VatComputation {
  const rule = determineVatRule(args);
  const subtotal = Math.round(args.subtotal * 100) / 100;
  const vatAmount = Math.round(subtotal * rule.rate * 100) / 100;
  const total = Math.round((subtotal + vatAmount) * 100) / 100;
  return { ...rule, subtotal, vatAmount, total };
}
