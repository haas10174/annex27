// Client-side VAT-rules (mirror van supabase/functions/_shared/vat-rules.ts).
// 2026-04-22: Annex27 heeft standaard BTW-regime (BE 21%), geen 56bis-vrijstelling meer.
(function (root) {
  'use strict';

  var EU_COUNTRIES = {
    AT:1,BE:1,BG:1,CY:1,CZ:1,DE:1,DK:1,EE:1,EL:1,ES:1,FI:1,FR:1,HR:1,HU:1,
    IE:1,IT:1,LT:1,LU:1,LV:1,MT:1,NL:1,PL:1,PT:1,RO:1,SE:1,SI:1,SK:1,XI:1,
  };

  var STANDARD_RATE_BE = 0.21;

  function isEuCountry(c) { return !!EU_COUNTRIES[String(c || '').toUpperCase()]; }

  function determineVatRule(args) {
    var country = String(args.country || '').toUpperCase();
    var sellerCountry = String(args.sellerCountry || 'BE').toUpperCase();
    var customerType = args.customerType || 'b2c';
    var vatValid = args.vatValid;

    // Buiten EU → outside scope
    if (!EU_COUNTRIES[country]) {
      return {
        rule: 'outside_eu', rate: 0,
        invoiceNote: 'Outside scope of EU VAT',
        shortLabel: 'Buiten EU',
        requiresVatNumber: false,
      };
    }
    // EU B2B met geldig VIES-nummer + niet BE (eigen land) → BTW verlegd
    if (country !== sellerCountry && customerType === 'b2b' && vatValid === true) {
      return {
        rule: 'reverse_charge', rate: 0,
        invoiceNote: 'BTW verlegd \u2014 Art. 196 Richtlijn 2006/112/EG. BTW-aangifte door afnemer.',
        shortLabel: 'BTW verlegd',
        requiresVatNumber: true,
      };
    }
    // Alle andere gevallen (BE binnenland, EU B2C, EU B2B zonder valid VAT) → BE 21%
    return {
      rule: 'standard_be', rate: STANDARD_RATE_BE,
      invoiceNote: 'BTW 21% (BE).',
      shortLabel: 'BTW 21%',
      requiresVatNumber: false,
    };
  }

  function computeVat(args) {
    var r = determineVatRule(args);
    var subtotal = Math.round((args.subtotal || 0) * 100) / 100;
    var vatAmount = Math.round(subtotal * r.rate * 100) / 100;
    var total = Math.round((subtotal + vatAmount) * 100) / 100;
    return Object.assign({}, r, { subtotal: subtotal, vatAmount: vatAmount, total: total });
  }

  root.Annex27VAT = {
    isEuCountry: isEuCountry,
    determineVatRule: determineVatRule,
    computeVat: computeVat,
  };
})(typeof window !== 'undefined' ? window : this);
