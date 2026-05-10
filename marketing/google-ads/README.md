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

## Daarna

Wacht 24-48u voor Google de nieuwe set heeft "geleerd". Daarna:
- Check **Zoektermen-rapport** — staan er rare matches? Voeg ze toe als negatief
- Pauzeer keywords met >50 vertoningen en 0 klikken in 14 dagen
- Verhoog max-CPC voor keywords met goede CTR maar lage vertoningen
