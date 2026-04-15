/* Annex27 — GA4 voor admin/portal/dashboard pagina's
 * Privacy-safe: strips klantdata uit URL + page_title.
 * Geen cookie-banner (interne tool).
 */
(function () {
  'use strict';

  var GA_ID = 'G-VWXHXN3KV2';

  // Generic page titles per context — nooit klantnamen sturen
  var host = location.pathname.toLowerCase();
  var genericTitle = 'Other';
  if (host.indexOf('admin') !== -1) genericTitle = 'Admin Dashboard';
  else if (host.indexOf('dashboard') !== -1) genericTitle = 'Client Dashboard';
  else if (host.indexOf('portal') !== -1) genericTitle = 'Client Portal';
  else if (host.indexOf('factuur') !== -1) genericTitle = 'Factuur';

  // Clean path (strip query + hash)
  var cleanPath = location.pathname.split('?')[0].split('#')[0];
  var cleanLocation = location.origin + cleanPath;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  // Consent: alleen analytics, altijd denied voor advertenties
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: false,       // handmatig, met sanitized params
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  // Handmatige page_view met geschoonde waarden
  gtag('event', 'page_view', {
    page_title: genericTitle,
    page_location: cleanLocation,
    page_path: cleanPath
  });

  // Event-helper (zelfde API als publieke analytics.js)
  window.annex27Track = function (name, params) {
    try {
      // Scrub eventuele klantdata uit params
      var safe = {};
      if (params) {
        for (var k in params) {
          if (!params.hasOwnProperty(k)) continue;
          var v = params[k];
          // Geen emails, namen, user_ids doorlaten
          if (typeof v === 'string' && (k.match(/email|name|user|client|klant/i))) continue;
          safe[k] = v;
        }
      }
      gtag('event', name, safe);
    } catch (e) {}
  };
})();
