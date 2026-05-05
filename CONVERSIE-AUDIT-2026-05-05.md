# Conversie-audit Annex27 — 5 mei 2026

Doel: identificeer drop-off points in de koper-funnel (homepage → quickscan → bestellen → success → portal). Per pagina top-3 fixes met impact-inschatting.

Methode: heuristische walkthrough als koper, B2B SaaS conversie best-practices, gevoel voor de NL/BE MKB-doelgroep. Geen Lighthouse-meting in deze ronde — die staat als follow-up.

---

## Funnel-overzicht

```
Homepage  →  /gap-analyse  →  /bestellen  →  Mollie  →  /success  →  /portal
   |              |                |                          |
   FAQ      Quickscan-result   Pakketkeuze            Onboarding
   /trust   leadCapture        + BTW/VAT                              
   /werkwijze                  + checkout                              
   /vergelijking                                                     
```

Sterke punten in funnel (na recente upgrades):
- ✅ Hero is helder en niet overladen
- ✅ Werkwijze als landingspagina geeft diepte voor twijfelaars
- ✅ Vergelijking-pagina anchored prijs tegen alternatieven
- ✅ Pioneer-pricing-banner op bestellen (eerlijk + urgentie)
- ✅ Risk-reversal blokken naast pakket-keuze
- ✅ NIS2-deadline banner bovenaan homepage
- ✅ Success.html upgrade met concrete next-steps

Zwakke schakels (na deze ronde):
- ❌ **Geen testimonials of case studies** zichtbaar — biggest gap
- ❌ Pakket-cards op homepage tonen nog generieke kenmerken — mist evidence van resultaat
- ❌ Quickscan-resultaat is sterk maar leidt niet expliciet naar bestelling
- ❌ Mobile niet getest (375px / 768px breakpoints)
- ❌ Geen exit-intent of recovery-mechanisme bij verlaten van bestelpagina

---

## Per pagina — top 3 fixes

### `index.html` (homepage)

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Hero claimt "voor een fractie van de prijs" zonder concreet getal — abstract | Vervang door "Vanaf €795 in plaats van €15.000+ bij consultancy" | high |
| 2 | Geen social proof boven de fold | Logo-wall of citaat van eerste klant tussen hero en werkwijze | high |
| 3 | "Meest gekozen" label op Beleidspakket — hoe weet bezoeker dat? | Vervang door eerlijk anker zoals "Meest gevraagd na de gap" of haal weg | medium |

### `gap-analyse.html` (publieke quickscan)

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Resultaat-pagina heeft "leadSuccess" met "we sturen mail" — maar geen prominent next-step naar bestellen | Voeg primary CTA "Bestel volledige gap-analyse — €795" prominent toe op resultaat-scherm | high |
| 2 | Quickscan vraagt 15 vragen — sommige bezoekers haken af | A/B-test: verkorten naar 8 vragen voor first-impression, of tonen progress-bar duidelijker | medium |
| 3 | Sectorprofiel-output is rijk (valkuilen, controls) maar te tekstueel | Visuele highlights: top-3 valkuilen als kaarten met icoon | medium |

### `bestellen.html` (checkout)

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Pakket-keuze toont prijs+naam+desc maar geen "wat krijgt u concreet?" | Tooltip of expand-pane per pakket met checklist (zie /vergelijking-tabel) | high |
| 2 | BTW-flow is correct maar visueel druk — tip-banner heeft veel tekst | Compactere "Tip: BTW-verlegging EU"-tooltip ipv lange uitleg | medium |
| 3 | Geen exit-intent of save-cart bij verlaten | LocalStorage cart-recover bij terugkeer ("U was bezig met..."), eventueel email-recovery na 1u | medium |

### `success.html` (post-payment)

Recent upgraded — al sterk. Resterende fix:

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Welkomst-email-keten ontbreekt nog (dag 0/2/7/14) | Implementeer #23-extra mail-keten via lead-mail-confirm-pattern | medium |

### `werkwijze.html` (just built)

Sterk gepositioneerd. Klein puntje:

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Geen "ik twijfel nog"-CTA naar contact/intake | Toevoegen ondersection "Twijfelt u nog? Mail Lead Auditor Raoul direct" | low |

### `vergelijking.html` (just built)

Sterk. Mogelijk follow-up:

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Geen sticky CTA bij scroll | Floating "Start quickscan" knop wanneer tabel uit beeld scrollt | low |

### `dashboard.html` (klant-portaal)

| # | Issue | Fix | Impact |
|---|---|---|---|
| 1 | Eerste-keer ervaring: 93 controls = wall, kan ontmoedigen | Tour/onboarding-walkthrough op eerste login (5 stappen, dismissible) | high |
| 2 | Voortgang is per control, geen "globaal X% klaar" | Top-progress-bar met percentage + ETA "nog ±2 sessies van 1 uur" | medium |
| 3 | Geen reminder-systeem als klant 7 dagen niets doet | Cron + welkomst-mail-keten (#23-extra) raakt hier ook | medium |

---

## Cross-cutting issues

### Mobile responsive
Niet getest in deze ronde. Verdacht:
- Hero op homepage + nav: nieuwe NIS2-banner kan met fixed nav overlap geven onder 640px
- Pakket-cards op bestellen.html: pioneer-banner + risk-reversal-grid (2-col) moet op mobiel naar 1-col
- Vergelijking-tabel: zet `overflow-x: auto` (al gedaan, maar test of dat lekker scrollt)

**Action:** Lighthouse-run + Browser-devtools test op alle kernpagina's bij 375px / 768px / 1440px.

### Performance / Core Web Vitals
Niet gemeten. Heuristisch:
- Google Fonts: voorgeladen via preconnect ✅
- Geen lazy-loading op hero-images zichtbaar — check
- Inline CSS is enorm (homepage > 1500 regels in `<style>`) — overweeg externe CSS voor cache, of accepteer als trade-off voor render-snelheid op cold-cache

**Action:** Lighthouse + WebPageTest run, fix top-2 LCP/CLS issues.

### Trust signals & social proof — STRUCTUREEL ZWAKSTE
Geen klant-logo's, geen testimonials, geen case studies. Voor een MKB-koper is dit de #1 reden tot weg-klikken. Concrete pad:

1. Vraag huidige test-klanten of pre-launch klanten om citaat (anoniem als nodig)
2. Maak case-study template (1-pager: aanleiding / aanpak / resultaat)
3. Component-library: testimonial-card, logo-strip, counter (#X gap-rapporten gegenereerd)
4. Plaatsing: hero homepage, bestellen.html boven pakket-keuze, sectorpagina's

Dit is **#20** op de backlog en de hoogste prioriteit voor go-live readiness.

---

## Top-5 prioritering voor go-live

| # | Actie | Effort | Impact | Status |
|---|---|---|---|---|
| 1 | **Social proof toevoegen** (testimonials + counter + case-study) | medium | very high | #20 pending |
| 2 | **Hero prijs-anker concretiseren** ("Vanaf €795 vs €15K consultancy") | low | high | quick fix |
| 3 | **Quickscan-resultaat → bestellen CTA prominenter** | low | high | quick fix |
| 4 | **Mobile audit + fixes** (375px / 768px) | medium | high | nieuw |
| 5 | **Welkomst-email-keten** (dag 0/2/7/14) | medium | medium | #23-extra |

Met deze 5 staat de site voor MKB-conversie meetbaar sterker. Items 2 en 3 kan ik direct uitvoeren — items 1, 4, 5 vereisen klant-input (testimonials), test-tooling (Lighthouse) of email-infra.

---

## Niet-blokkerend voor go-live

- A/B test infra (later)
- Live-chat / support widget (later — eerst klanten hebben)
- Exit-intent popups (controversieel, later)
- Multi-language (NL+BE met Vlaamse nuance is realistisch genoeg, EN later)

---

*Audit uitgevoerd door Claude (geautomatiseerd) op basis van code-walkthrough. Validatie door Raoul + handmatige browser-test aanbevolen vóór go-live.*
