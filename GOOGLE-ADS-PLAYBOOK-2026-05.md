# Google Ads Playbook — Annex27
**Datum:** 8 mei 2026 · **Doelgroep:** B2B MKB in NL/BE · **Budget-richtlijn:** €30-150/dag

Dit document is een copy-paste-ready playbook voor het opzetten van Google Ads-campagnes. De tracking-pipeline staat al klaar in `analytics.js` — vul alleen de IDs in zodra het Google Ads-account live is.

---

## 0. Setup-volgorde

### Stap 1 — Google Ads-account aanmaken
1. Ga naar https://ads.google.com en meld aan met een Google-account dat ook beheerder is van GA4 (`G-VWXHXN3KV2`).
2. Kies **Expert mode** (niet Smart-mode) bij setup.
3. Land: Nederland. Tijdzone: Amsterdam. Valuta: EUR.
4. Skip de eerste-campagne-wizard.

### Stap 2 — Account-instellingen
- Tools → Linked accounts → koppel **Google Analytics 4** (`G-VWXHXN3KV2`) en **Search Console** (zodra DNS-TXT actief is).
- Tools → Conversions → maak 3 conversion-actions aan:
  - `quickscan_completed` (count: one, value: 0, primary)
  - `lead_submitted` (count: one, value: €50, primary)
  - `purchase_completed` (count: every, value: from event, primary)
- Note voor elke conversion-action de **conversion-label** (bv `AbCdEfGhIj`).

### Stap 3 — Tracking activeren in code
Open `analytics.js` en vul in:
```js
var GADS_ID = 'AW-1234567890';  // jouw Google Ads-ID
var GADS_CONVERSIONS = {
  quickscan_completed: 'AbCdEfGhIj',
  lead_submitted: 'KlMnOpQrSt',
  purchase_completed: 'UvWxYzAbCd'
};
```
Deploy. Test met **Google Tag Assistant** Chrome-extensie of de events binnenkomen.

### Stap 4 — Negative-keywords-list aanmaken
Tools → Shared library → Negative keyword lists → Create list "Annex27 brand-defense":
- gratis, free
- cursus, opleiding, training
- vacature, baan, werk, sollicitatie
- student, scriptie, thesis
- wikipedia, definitie
- klacht, fraude, scam
- kpn, vodafone, ziggo (telco-noise)

Pas deze list toe op alle non-brand-campaigns.

---

## 1. Campagne-overzicht

| # | Naam | Type | Match | Budget/dag | Doel |
|---|------|------|-------|------------|------|
| C1 | Brand defense | Search | Exact | €5-10 | Voorkom dat concurrenten op "annex27" bieden |
| C2 | ISO 27001 hoofdkeywords | Search | Phrase + Exact | €30-50 | Lead gen op `iso 27001 mkb`, `iso 27001 kosten` |
| C3 | NIS2 | Search | Phrase + Exact | €25-40 | NIS2-piek + Cyberbeveiligingswet 1 juli 2026 |
| C4 | België deadline | Search | Phrase | €15-25 | BE 18-april-deadline urgency |
| C5 | Sector — SaaS | Search | Phrase | €20-30 | `iso 27001 saas` + `vanta alternatief` |
| C6 | Sector — Zorg | Search | Phrase | €15-25 | `nen 7510` + zorg-specifieke kw's |
| C7 | Vergelijking | Search | Phrase | €15-25 | `iso 27001 zelf doen`, `vanta vs ...` |

**Totaal advies eerste maand:** start met C1 + C2 (€35-60/dag, ~€1.000-1.800/maand). Schaal C3-C7 op zodra Quality Score van C2 geoptimaliseerd is.

---

## 2. Per campagne details

### C1 — Brand defense

**Doel:** voorkom dat concurrenten op je brand-name bieden + capture voor branded search.

**Budget:** €5-10/dag (low waste, bijna 100% conversie).

**Bidding:** Maximize conversions of CPC handmatig €0.50-1.50.

**Keywords (alle als exact match):**
- `[annex27]`
- `[annex 27]`
- `[annex27.nl]`
- `[annex 27 iso 27001]`
- `[annex27 review]`
- `[annex27 ervaringen]`

**Ad-group: Brand**

Headlines (15 max, drie tegelijk getoond):
1. Annex27 — ISO 27001 voor MKB
2. Officiële Annex27 site
3. ISO 27001 vanaf €795
4. Lead Auditor review inbegrepen
5. NIS2-ready voor 1 juli 2026
6. KBO-conform NL & BE
7. Gap-analyse in 30 minuten
8. Persoonlijke ISO-begeleiding
9. Geen abonnement, eenmalig
10. AI-versnelling, audit-ready
11. DNV/IRCA-gecertificeerd
12. Direct quickscan starten
13. Trust & Security pagina
14. Customer-evidence-validatie
15. Bekijk pakketten Annex27

Descriptions (4 max, twee tegelijk getoond):
1. Annex27 helpt MKB in Nederland en België met ISO 27001 + NIS2. Eenmalig betalen, persoonlijke Lead Auditor.
2. Gap-analyse vanaf €795 met DNV-gecertificeerde Lead Auditor review. Geen abonnement, audit-ready binnen 48u.
3. Specifiek gebouwd voor het Benelux-MKB. NIS2, BIO, NEN 7510, AVG standaard inbegrepen. Direct starten.
4. Vergeleken met consultancy 80% goedkoper. Vergeleken met Vanta/Drata: persoonlijke auditor, geen abonnement.

Final URL: `https://annex27.nl`

**Sitelink-extensies (per campagne, ook hieronder herbruiken):**
- "Werkwijze" → /werkwijze
- "Pakketten" → /bestellen
- "FAQ" → /faq
- "Trust & Security" → /trust

**Callout-extensies:**
- "DNV/IRCA-gecertificeerd"
- "NL+BE wetgeving standaard"
- "Eenmalig betalen"
- "48u Lead Auditor review"

---

### C2 — ISO 27001 hoofdkeywords

**Doel:** primary lead-generation. Highest-volume keywords.

**Budget:** €30-50/dag start, schaal naar €80 als CPA < €100.

**Bidding:** Target CPA = €100 (target cost per quickscan-completed). Switch naar Maximize Conversions zodra 30+ conversies/maand.

**Ad-group 2A — ISO 27001 algemeen**

Keywords (phrase + exact):
- `"iso 27001"` (phrase)
- `[iso 27001]` (exact)
- `"iso 27001 nederland"`
- `"iso 27001 mkb"`
- `[iso 27001 mkb]`
- `"iso 27001 implementatie"`
- `"iso 27001 certificering"`
- `[iso 27001 certificering]`

Final URL: `/iso-27001-nederland`

Headlines:
1. ISO 27001 voor het MKB in NL
2. Gap-analyse vanaf €795
3. Lead Auditor review inbegrepen
4. Klaar voor 1 juli 2026
5. NIS2 + BIO + AVG inbegrepen
6. DNV-gecertificeerde aanpak
7. Geen abonnement, eenmalig
8. 30-minuten quickscan
9. AI versnelt, mens valideert
10. Concrete next steps in 48u
11. KvK-conform factureren
12. Vergelijk met €15.000+ consultancy
13. Audit-ready rapport
14. Direct starten zonder account
15. Annex27 — gespecialiseerd MKB

Descriptions:
1. Volledige ISO 27001-certificeringsroute voor MKB. Gap-analyse, beleidspakket, pre-audit. Eenmalig betalen.
2. Door DNV/IRCA-gecertificeerde Lead Auditor gevalideerd. NL/BE-wetgeving inbegrepen. Geen verborgen kosten.
3. Bespaar 80% vs traditionele consultancy. AI-versnelling, audit-ready rapport binnen 48u na evidence-upload.
4. Quickscan in 5 min — direct inzicht in compliance-status. Geen account nodig, geen verplichtingen.

**Ad-group 2B — Kosten en prijzen**

Keywords:
- `"iso 27001 kosten"`
- `[iso 27001 kosten]`
- `"iso 27001 prijs"`
- `"iso 27001 mkb kosten"`
- `"iso 27001 budget"`
- `"goedkoop iso 27001"`

Final URL: `/blog/iso-27001-kosten-mkb`

Headlines (focus op kosten-transparantie):
1. ISO 27001 vanaf €795 eenmalig
2. Wat kost ISO 27001 voor MKB?
3. Volledige kostenbreakdown 2026
4. Geen abonnement, geen verrassingen
5. Vergeleken met Vanta: 5x goedkoper
6. Gap-analyse + beleid: €1.190
7. Pre-audit Review vanaf €1.495
8. Externe audit: €4-12k apart
9. Realistisch budget MKB
10. Bekijk alle pakketten direct

Descriptions:
1. Volledige kostenbreakdown voor ISO 27001 in 2026. Voorbereiding €795-1.190, audit €4-12k. Geen verborgen kosten.
2. Bespaar 50-80% vs consultancy. Eenmalig betalen, geen abonnement, geen per-seat. Direct inzicht in totaalkosten.

**Ad-group 2C — Gap-analyse**

Keywords:
- `"iso 27001 gap analyse"`
- `[iso 27001 gap analyse]`
- `"gap analyse iso 27001"`
- `"iso 27001 nulmeting"`

Final URL: `/gap-analyse`

Headlines:
1. ISO 27001 Gap-analyse € 795
2. Volledige scan in 30 minuten
3. Lead Auditor review inbegrepen
4. Direct concrete actiepunten
5. Bespaar €2.000+ vs consultancy
6. Sector-specifieke vragenlijst
7. Bewijsvoering-portaal inbegrepen
8. AI + Lead Auditor combinatie
9. Audit-ready rapport in 48u
10. Quickscan eerst gratis

---

### C3 — NIS2 (hoogste momentum)

**Doel:** capitaliseer NIS2-piek voor 1 juli 2026.

**Budget:** €25-40/dag, opschaling tot €80 in juni 2026.

**Bidding:** Target CPA €120.

**Ad-group 3A — NIS2 hoofd**

Keywords:
- `"nis2"` (phrase)
- `[nis2]`
- `"nis2 mkb"`
- `[nis2 mkb]`
- `"nis2 nederland"`
- `"nis2 verplichting"`
- `"nis2 wat moet ik doen"`
- `"cyberbeveiligingswet"`

Final URL: `/nis2`

Headlines:
1. NIS2 voor het MKB — Annex27
2. Cyberbeveiligingswet 1 juli 2026
3. NIS2-readiness in 5 minuten
4. 10.000+ NL-orgs direct plichtig
5. NIS2 + ISO 27001 combineren
6. Lead Auditor review inbegrepen
7. Bestuursverklaring + meldplicht
8. Art. 21 mapping naar maatregelen
9. NIS2-pakket vanaf €995
10. Gratis quickscan starten

Descriptions:
1. NIS2 raakt 10.000+ NL-bedrijven direct + 50.000+ via supply-chain. Cyberbeveiligingswet ingang 1 juli 2026.
2. Annex27 NIS2-readiness pakket: Art. 21 mapping, bestuursverklaring, meldingsplicht-templates voor NCSC + CCB.
3. Gespecialiseerd voor NL/BE MKB. Ondersteunt zowel Cbw (NL) als wet 26 april 2024 (BE). Direct starten.

**Ad-group 3B — NIS2 melden**

Keywords:
- `"nis2 melden"`
- `"nis2 meldingsplicht"`
- `"cyberincident melden nis2"`
- `"24 uur nis2"`
- `"ccb melden"`
- `"ncsc melden"`

Final URL: `/blog/nis2-melding-stap-voor-stap`

---

### C4 — België deadline (urgentie)

**Doel:** capitaliseer dat 18 april 2026 voorbij is — paniek-modus.

**Budget:** €15-25/dag tot eind 2026.

**Geo-targeting:** alleen België (Vlaanderen primair).

**Bidding:** Maximize Conversions.

**Ad-group 4A — NIS2 BE**

Keywords:
- `"nis2 belgië"`
- `"nis2 belgie"`
- `"nis2 ccb"`
- `"ccb compliance"`
- `"iso 27001 belgië"`
- `[iso 27001 belgie]`

Final URL: `/iso-27001-belgie`

Headlines:
1. ISO 27001 voor België na NIS2
2. Deadline 18 april verstreken?
3. Start nu uw conformity-traject
4. CCB compliance in 30 min check
5. Boetes tot €10M of 2% omzet
6. KBO-conform, BTW-verlegging
7. Lead Auditor uit Benelux
8. Gap-analyse vanaf €795
9. NL + FR-talig support
10. Direct quickscan voor BE-MKB

Descriptions:
1. NIS2-deadline van 18 april 2026 verstreken? Start binnen 30 dagen een conformity-traject om schade te beperken.
2. CCB hanteert tot eind 2026 een ramp-up-benadering. Annex27 levert NIS2-pakket vanaf €995 met BE-specifieke meldingen.

---

### C5 — Sector SaaS

**Doel:** SaaS-startups en scale-ups die enterprise-deals voorbereiden.

**Budget:** €20-30/dag.

**Ad-group 5A — SaaS algemeen**

Keywords:
- `"iso 27001 saas"`
- `[iso 27001 saas]`
- `"saas iso 27001"`
- `"iso 27001 startup"`
- `"iso 27001 scale up"`

Final URL: `/sector/saas`

Headlines:
1. ISO 27001 voor SaaS startups
2. Vanta-alternatief uit Benelux
3. Gap-analyse vanaf €795
4. SOC 2-fundament inbegrepen
5. Multi-tenant + secret rotation
6. Enterprise-questionnaires klaar
7. AWS/GCP-best-practices check
8. Lead Auditor uit Benelux
9. Geen $7.500/jaar abonnement
10. SaaS-specifieke vragenlijst

**Ad-group 5B — Vanta alternatief**

Keywords:
- `"vanta alternatief"`
- `"vanta nederland"`
- `"vanta vs"`
- `"drata alternatief"`
- `"compliance platform europe"`

Final URL: `/vergelijking`

Headlines:
1. Vanta-alternatief Nederland
2. €795 vs €7.500/jaar abonnement
3. Persoonlijke Lead Auditor
4. EU data-residency standaard
5. Eenmalig betalen, geen lock-in
6. NL/BE wetgeving inbegrepen
7. Geen US-templates te vertalen
8. Vergelijk Annex27 vs Vanta
9. Hetzelfde resultaat, 90% goedkoper
10. Bekijk vergelijkingstabel

---

### C6 — Sector Zorg

**Doel:** zorgaanbieders die NEN 7510:2024 transition voor 20 februari 2027 moeten halen.

**Budget:** €15-25/dag.

**Ad-group 6A — NEN 7510**

Keywords:
- `"nen 7510"`
- `[nen 7510]`
- `"nen 7510 certificering"`
- `"nen 7510 2024"`
- `"nen 7510 overgang"`
- `"informatiebeveiliging zorg"`

Final URL: `/sector/zorg`

Headlines:
1. NEN 7510:2024 voor zorginstellingen
2. Overgangsdeadline 20 feb 2027
3. NEN 7510 + ISO 27001 traject
4. WGBO + AVG art. 9 inbegrepen
5. EPD-logging + behandelrelatie
6. Gap-analyse vanaf €795
7. Zorgspecifieke vragenlijst
8. Lead Auditor met zorgervaring
9. Direct quickscan voor zorg
10. NEN 7510:2024 transition-pakket

---

### C7 — Vergelijking / DIY

**Doel:** klanten die overwegen het zelf te doen of consultancy in te huren.

**Budget:** €15-25/dag.

**Ad-group 7A — Zelf doen**

Keywords:
- `"iso 27001 zelf doen"`
- `[iso 27001 zelf doen]`
- `"iso 27001 zelf"`
- `"iso 27001 in eigen beheer"`
- `"iso 27001 diy"`

Final URL: `/blog/iso-27001-zelf-doen-of-uitbesteden`

Headlines:
1. ISO 27001 zelf doen of uitbesteden?
2. Drie paden, 3 kostenniveaus
3. Eerlijke beslisboom voor MKB
4. Hybride: platform + auditor
5. Bespaar 50% vs consultancy
6. Lead Auditor blijft betrokken
7. Geen consultant-uurtarieven
8. Templates inbegrepen
9. Self-paced of begeleid
10. Vergelijk concrete kosten

---

## 3. Algemene best-practices

### Quality Score optimaliseren
- Per ad-group max 5-10 keywords (zo niet, splits)
- Headlines bevatten primary keyword 2-3x
- Final URL relevant (matching landing-page intent)
- Mobile-loadtijd <3s — Annex27 staat al goed
- Sitelinks + callouts altijd ingevuld

### Budget-volgorde
1. Maand 1: alleen C1 + C2 actief. Budget €35-60/dag.
2. Maand 2: voeg C3 + C4 toe. Budget €80-120/dag.
3. Maand 3: voeg C5-C7 toe. Budget €120-180/dag.
4. Maand 4+: optimaliseer Quality Score op high-CPA campaigns, dubbel budget op low-CPA.

### Reporting
- GA4 dashboard: gepauzeerde Audiences (quickscan-completed, lead-submitted, purchase) per campagne.
- Wekelijks: review CPA per campagne. Pauseer ad-groups met CPA > 2× target.
- Maandelijks: search-terms-report — voeg zoektermen die niet relevant zijn toe aan negative keywords list.

### Geo-targeting
- C1, C2, C3, C5, C6, C7 → Nederland + België-Vlaanderen
- C4 → alleen België
- Niet: Wallonië (FR-content nodig, eerst NL/Vlaamse markt)
- Excluded countries: alle landen behalve NL + BE

### Schedule
- Weekdagen 7:00-19:00 +50% bid (B2B intent piek)
- Weekend -30% bid (lager intent)
- Pas dit aan na 2 maanden data

---

## 4. Wat de site al kan

In `analytics.js` is al klaar:
- `annex27TrackConversion(eventKey, params)` — vuurt zowel GA4-event als Google Ads conversion.
- 3 conversion-action keys voorbereid: `quickscan_completed`, `lead_submitted`, `purchase_completed`.
- Vul alleen `GADS_ID` en de 3 conversion-labels in (na account-aanmaak).

Conversion-events worden al gevuurd vanuit:
- `gap-analyse.html` → `quickscan_completed` bij voltooid form
- `success.html` → `purchase_completed` bij Mollie-redirect

Wat nog ontbreekt (kan in 2 minuten):
- Lead-submit form heeft nog geen `lead_submitted` event. Optioneel toevoegen als je losse contact-formulieren bouwt.

---

## 5. Eerste-week checklist

- [ ] Google Ads-account aanmaken
- [ ] GA4 + Search Console linken
- [ ] 3 conversion-actions aanmaken + labels noteren
- [ ] `analytics.js` updaten met `GADS_ID` + labels → deploy
- [ ] Test conversion-tracking met Google Tag Assistant
- [ ] Negative keyword list "Annex27 brand-defense" aanmaken
- [ ] C1 Brand defense campagne live (€5-10/dag)
- [ ] C2 ISO 27001 hoofdkeywords campagne live (€30-50/dag)
- [ ] Wachten 7 dagen op data
- [ ] Eerste optimalisatie-pass (search-terms-report, Quality Score check)

---

**Verwachte resultaten eerste maand met €35-60/dag:**
- Impressions: 8.000-15.000
- Clicks: 200-400 (CTR 2.5-3%)
- Conversies (quickscan_completed): 25-50
- CPA: €40-60 per quickscan
- Lead → klant conversie (uw kant): mikken op 10-15% → 3-7 betalende klanten/maand

Bij eerste deal van €795 betaalt de campagne zichzelf terug binnen 1-2 maanden.
