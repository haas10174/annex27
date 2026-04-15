/* Annex27 — Google Analytics 4 + Consent Mode v2 + cookie banner
 * Alles AVG-proof: default consent = denied, GA4 pas actief na opt-in.
 * Gebruik: <script src="/analytics.js"></script> in <head> van publieke pagina's.
 */
(function () {
  'use strict';

  var GA_ID = 'G-VWXHXN3KV2';
  var CONSENT_KEY = 'annex27_consent_v1';

  // 1. dataLayer + gtag stub (MUST run before any gtag event)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };

  // 2. Consent Mode v2 — default denied voor EER bezoekers
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
  });

  // 3. Lees eerdere keuze
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch (e) {}
  if (saved && saved.accepted) {
    gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted'
    });
  }

  // 4. Laad gtag.js (async) — Consent Mode bepaalt of er data verstuurd wordt
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: true
  });

  // 5. Event-helper
  window.annex27Track = function (name, params) {
    try { gtag('event', name, params || {}); } catch (e) {}
  };

  // 6. Auto-tracking via data-attributes + outbound/mailto/tel
  function attrsToParams(el) {
    var params = {};
    for (var i = 0; i < el.attributes.length; i++) {
      var a = el.attributes[i];
      if (a.name.indexOf('data-ga-') === 0 && a.name !== 'data-ga-event') {
        params[a.name.substring(8).replace(/-/g, '_')] = a.value;
      }
    }
    return params;
  }

  function onClickDelegate(e) {
    // 1) Any element with data-ga-event fires that event
    var trigger = e.target.closest('[data-ga-event]');
    if (trigger) {
      window.annex27Track(trigger.getAttribute('data-ga-event'), attrsToParams(trigger));
      return;
    }
    // 2) Anchor defaults
    var a = e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('mailto:') === 0) {
      window.annex27Track('email_click', { link_text: (a.textContent || '').trim().slice(0, 50) });
    } else if (href.indexOf('tel:') === 0) {
      window.annex27Track('phone_click', {});
    } else if (a.hostname && a.hostname !== location.hostname && a.hostname !== '') {
      window.annex27Track('outbound_click', { link_domain: a.hostname, link_url: href });
    }
  }

  // 7. Scroll depth (25/50/75/100%)
  var scrollMarks = [25, 50, 75, 100];
  var scrollFired = {};
  function onScroll() {
    var sh = document.documentElement.scrollHeight - window.innerHeight;
    if (sh <= 0) return;
    var pct = Math.round((window.pageYOffset / sh) * 100);
    for (var i = 0; i < scrollMarks.length; i++) {
      var m = scrollMarks[i];
      if (pct >= m && !scrollFired[m]) {
        scrollFired[m] = true;
        window.annex27Track('scroll_depth', { percent: m });
      }
    }
  }

  function bind() {
    document.addEventListener('click', onClickDelegate, true);
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bind);
  } else {
    bind();
  }

  // 8. Cookie banner — alleen tonen als nog geen keuze
  if (saved) return;

  function buildBanner() {
    var banner = document.createElement('div');
    banner.id = 'a27-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-instellingen');
    banner.innerHTML =
      '<style>' +
      '#a27-cookie-banner{position:fixed;bottom:16px;left:16px;right:16px;max-width:520px;margin:0 auto;' +
      'background:#1a1f2e;color:#e8ecf1;border:1px solid rgba(255,255,255,0.12);border-radius:12px;' +
      'padding:18px 20px;font-family:Inter,-apple-system,system-ui,sans-serif;font-size:0.88rem;' +
      'line-height:1.55;box-shadow:0 20px 40px rgba(0,0,0,0.4);z-index:99999;}' +
      '#a27-cookie-banner h3{font-family:Sora,Inter,sans-serif;font-size:0.95rem;font-weight:700;margin:0 0 6px;color:#fff;}' +
      '#a27-cookie-banner p{margin:0 0 12px;color:#b8c1cc;}' +
      '#a27-cookie-banner a{color:#14b8a6;text-decoration:underline;}' +
      '#a27-cookie-banner .a27-btns{display:flex;gap:8px;flex-wrap:wrap;}' +
      '#a27-cookie-banner button{font-family:inherit;font-size:0.84rem;font-weight:600;border-radius:8px;' +
      'padding:9px 16px;cursor:pointer;border:1px solid transparent;transition:all .15s;}' +
      '#a27-cookie-banner .a27-accept{background:#0d9488;color:#fff;border-color:#0d9488;}' +
      '#a27-cookie-banner .a27-accept:hover{background:#14b8a6;}' +
      '#a27-cookie-banner .a27-reject{background:transparent;color:#e8ecf1;border-color:rgba(255,255,255,0.2);}' +
      '#a27-cookie-banner .a27-reject:hover{border-color:rgba(255,255,255,0.4);}' +
      '@media (max-width:520px){#a27-cookie-banner{left:8px;right:8px;bottom:8px;padding:14px 16px;}}' +
      '</style>' +
      '<h3>Cookies &amp; privacy</h3>' +
      '<p>Wij gebruiken alleen analytische cookies (Google Analytics, geanonimiseerd) om de site te verbeteren. Geen tracking voor advertenties zonder uw toestemming. <a href="/trust">Meer lezen</a>.</p>' +
      '<div class="a27-btns">' +
      '<button class="a27-accept" type="button">Accepteren</button>' +
      '<button class="a27-reject" type="button">Alleen noodzakelijke</button>' +
      '</div>';
    return banner;
  }

  function storeChoice(accepted) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        accepted: accepted,
        timestamp: new Date().toISOString()
      }));
    } catch (e) {}
  }

  function hideBanner() {
    var el = document.getElementById('a27-cookie-banner');
    if (el) el.parentNode.removeChild(el);
  }

  function mount() {
    if (document.getElementById('a27-cookie-banner')) return;
    var b = buildBanner();
    document.body.appendChild(b);
    b.querySelector('.a27-accept').addEventListener('click', function () {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        analytics_storage: 'granted'
      });
      storeChoice(true);
      hideBanner();
    });
    b.querySelector('.a27-reject').addEventListener('click', function () {
      storeChoice(false);
      hideBanner();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
