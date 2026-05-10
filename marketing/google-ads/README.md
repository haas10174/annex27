# Google Ads bulk-upload — C2

Twee CSV-bestanden klaar om te importeren in Google Ads.

## Upload-stappen

1. Ga naar **Google Ads → Tools (sleutel-icoon) → Bulkacties → Uploads**
2. Klik **+ Nieuwe upload** → kies "Document uploaden"
3. Upload eerst `c2-keywords-add.csv` (positieve keywords)
4. Daarna `c2-negatives-add.csv` (campagne-level negatieven)
5. Bij beide: vink "Verwerken in pre-view" aan, controleer wat Google detecteert, dan **Verzenden**

## Belangrijk: ad-group-naam

In `c2-keywords-add.csv` staat overal `ISO 27001 hoofdkeywords` als ad-group. Heet jouw ad-group anders? Vervang dan via Find & Replace in een teksteditor (Notepad++, VS Code) vóór de upload — anders maakt Google een nieuwe ad-group aan met die naam.

Check de huidige ad-group-naam: in C2 → klik op campagne → in linkerkolom staat "Advertentiegroepen". Kopieer die naam exact.

## Wat zit erin

**c2-keywords-add.csv (36 nieuwe keywords):**
- 10 synoniemen/varianten (ISMS, SoA, quickscan, self-assessment, etc.)
- 7 sectoren (SaaS, IT, cloud, bouw, overheid, financieel, software)
- 4 tool/platform (tool, platform, software, compliance platform mkb)
- 10 NIS2-cross (audit, compliance, art 21, meldingsplicht, etc.)
- 5 exact-match (prijs, kosten, quickscan, gap analyse, nis2 readiness)

**c2-negatives-add.csv (18 negatieven):**
- Cursus/training/opleiding/vacature (carrière-zoekers eruit)
- Andere ISO-normen (9001, 14001, 22301, 27002)
- Wikipedia/definitie/betekenis (research-intent zonder commerciële waarde)
- Gratis/free/zelf doen (geen koopintentie)
- BIO-basisbeveiliging (overheid-norm, andere doelgroep — schrap deze regel als je toch overheid wilt serveren)

## C5 — Aparte campagne voor NEN 7510 (zorg)

Annex27 bedient NEN 7510 via de zorg-gap-analyse. Daarom een **aparte campagne** (niet alleen ad-group in C2): zorg-zoekers verwachten zorg-ad-copy en hebben andere bid-strategie en budget nodig.

**Bestanden:**
- `c5-nen7510-keywords.csv` — 26 zorg-keywords verdeeld over 3 ad-groups (algemeen / sectoren / breed)
- `c5-nen7510-negatives.csv` — 15 campagne-level negatieven (incl. nen-pdf-zoekers die de norm zelf zoeken)

### Stappen om C5 aan te maken in Google Ads

1. **Linker-menu Campagnes → blauwe "+" → Nieuwe campagne**
2. Doel: **Websiteverkeer** (of "Verkoop" als je een conversie-doel hebt op /sector/zorg)
3. Campagne-type: **Zoeknetwerk**
4. Naam: `C5 — NEN 7510 zorg`
5. **Locaties:** Nederland + België (de NEN-norm is NL-origin maar BE-zorg gebruikt 'm ook)
6. **Taal:** Nederlands
7. **Budget:** start met €10-15/dag (zorg-zoekvolume is lager dan ISO 27001 breed)
8. **Bod-strategie:** Klikken maximaliseren, met max-CPC plafond €2,00 (zorg-CPC's lopen op)
9. **Landingspagina (tijdelijk):** `https://annex27.nl/sector/zorg` totdat dedicated /nen-7510-pagina af is

### Daarna keywords + negatieven uploaden

10. Open de net aangemaakte C5 → maak 3 ad-groups aan: `NEN 7510 algemeen`, `NEN 7510 sectoren`, `NEN 7510 breed`
11. Upload `c5-nen7510-keywords.csv` via **Tools → Bulkacties → Uploads**
12. Upload `c5-nen7510-negatives.csv` als tweede upload

### Vervolg: dedicated landingspagina

`/sector/zorg` werkt als tijdelijke bestemming. Voor betere Quality Score later een dedicated `/nen-7510` pagina maken met:
- H1 met "NEN 7510" letterlijk
- Uitleg verschil NEN 7510-1 (norm) / NEN 7510-2 (praktijkrichtlijn) / NCS 7510 (certificeringsschema)
- Mapping naar ISO 27001 (welke 27001-controls dekken al NEN 7510)
- Quickscan-CTA met zorg-variant van de vragenset

## Daarna

Wacht 24-48u voor Google de nieuwe set heeft "geleerd". Daarna:
- Check **Zoektermen-rapport** — staan er rare matches? Voeg ze toe als negatief
- Pauzeer keywords met >50 vertoningen en 0 klikken in 14 dagen
- Verhoog max-CPC voor keywords met goede CTR maar lage vertoningen
