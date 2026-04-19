// Client-side VAT-rules voor bestellen.html (mirror van supabase/functions/_shared/vat-rules.ts).
// Zie die file voor het autoritatieve model — server-side valideert opnieuw.
(function (root) {
  'use strict';

  var EU_COUNTRIES = {
    AT:1,BE:1,BG:1,CY:1,CZ:1,DE:1,DK:1,EE:1,EL:1,ES:1,FI:1,FR:1,HR:1,HU:1,
    IE:1,IT:1,LT:1,LU:1,LV:1,MT:1,NL:1,PL:1,PT:1,RO:1,SE:1,SI:1,SK:1,XI:1,
  };

  function isEuCountry(c) { return !!EU_COUNTRIES[String(c || '').toUpperCase()]; }

  function determineVatRule(args) {
    var country = String(args.country || '').toUpperCase();
    var sellerCountry = String(args.sellerCountry || 'BE').toUpperCase();
    var customerType = args.customerType || 'b2c';
    var vatValid = args.vatValid;

    if (!EU_COUNTRIES[country]) {
      return {
        rule: 'outside_eu', rate: 0,
        invoiceNote: 'Outside scope of EU VAT',
        shortLabel: 'Buiten EU',
        requiresVatNumber: false,
      };
    }
    if (country === sellerCountry) {
      return {
        rule: 'exempt_56bis', rate: 0,
        invoiceNote: 'Bijzondere vrijstellingsregeling kleine ondernemingen \u2014 Art. 56bis W.BTW (Belgi\u00eb)',
        shortLabel: 'Vrijstelling Art. 56bis',
        requiresVatNumber: false,
      };
    }
    if (customerType === 'b2b' && vatValid === true) {
      return {
        rule: 'reverse_charge', rate: 0,
        invoiceNote: 'BTW verlegd \u2014 Art. 196 Richtlijn 2006/112/EG. BTW-aangifte door afnemer.',
        shortLabel: 'BTW verlegd',
        requiresVatNumber: true,
      };
    }
    return {
      rule: 'exempt_56bis_eu', rate: 0,
      invoiceNote: 'Bijzondere vrijstellingsregeling kleine ondernemingen \u2014 Art. 56bis W.BTW (Belgi\u00eb). Onder EU-B2C-drempel van \u20AC10.000.',
      shortLabel: 'Vrijstelling Art. 56bis',
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
