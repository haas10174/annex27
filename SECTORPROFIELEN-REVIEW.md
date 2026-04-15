# Sectorprofielen Review — Annex27

**Doel:** Deze profielen zijn de basis voor de gap-analyse output (quickscan + dashboard + PDF rapport). Alleen het **SaaS-profiel** is door jou gevalideerd. De andere 5 zijn door mij ingevuld op basis van algemene kennis en moeten door jou als Lead Auditor worden aangescherpt.

**Hoe te reviewen:** Loop per sector door de 4 secties (valkuilen, acties, frameworks, benchmark). Markeer per item:
- ✅ Klopt
- ⚠️ Klopt maar niet scherp genoeg — aanpassen
- ❌ Niet relevant / vervang met X
- ➕ Ontbreekt — toevoegen

---

## 1. SaaS & Cloud ✅ GEVALIDEERD (niet meer nodig)

*Door Raoul bevestigd op 2026-04-11.*

**Benchmark:** 38% · **Relevant:** 88+/93 controls · **N/A:** 5

---

## 2. IT-dienstverlener / MSP

**Benchmark:** 41% · **Relevant:** 90+/93 controls · **N/A:** 3

### Valkuilen (top 5 bij audits)
1. Scheiding klantomgevingen: onvoldoende isolatie tussen klantdata en -systemen
2. Incident response: geen formeel proces voor het melden van incidenten aan klanten
3. Toegangsbeheer: te brede rechten op klantinfrastructuur, gedeelde accounts
4. Business continuity: geen getest continuiteitsplan voor eigen dienstverlening
5. Documentatie: SLA's bevatten geen informatiebeveiligingseisen

### Geprioriteerde acties (certificeringsvolgorde)
1. Stel ISMS-scope op inclusief alle klantdiensten (Clause 4.3)
2. Voer risicobeoordeling uit met focus op klantdata en -systemen (Clause 6.1.2)
3. Implementeer strikte access control per klantomgeving (A.5.15–A.5.18)
4. Documenteer incident response inclusief klantnotificatie procedure (A.5.24–A.5.28)
5. Stel business continuity plan op en test minimaal jaarlijks (A.5.29–A.5.30)
6. Breng eigen leveranciersketen in kaart en stel eisen op (A.5.19–A.5.22)
7. Implementeer netwerksegmentatie per klant (A.8.22)
8. Stel onboarding/offboarding procedure op voor medewerkers met klanttoegang (A.6.1–A.6.5)

### Frameworks
- ISO 27001 · AVG/GDPR · NIS2 · SOC 2

### Vragen voor jou
- Klopt de benchmark van 41%? (ik schatte hoger dan SaaS omdat MSPs vaak meer ervaring hebben)
- Zie je in praktijk nog andere veelvoorkomende valkuilen?
- Ontbreken er sector-specifieke frameworks? (ISAE 3402? TISAX?)

---

## 3. Zorg & Medisch

**Benchmark:** 35% · **Relevant:** 91+/93 controls · **N/A:** 2

### Valkuilen (top 5 bij audits)
1. Toegang tot patientdossiers: onvoldoende logging en controle op wie wat inziet
2. Verwerkersovereenkomsten: niet op orde met leveranciers van zorgsystemen (EPD, labsystemen)
3. Mobile devices: onbeveiligde tablets en smartphones in klinische omgevingen
4. Awareness: medisch personeel onvoldoende getraind in informatiebeveiliging en phishing
5. Classificatie: geen onderscheid tussen patiëntgegevens en reguliere bedrijfsdata

### Geprioriteerde acties
1. Breng alle verwerkingen van bijzondere persoonsgegevens in kaart (AVG Art. 9)
2. Stel ISMS-scope op met nadruk op patientgegevens en zorgsystemen (Clause 4.3)
3. Voer risicobeoordeling uit specifiek voor medische informatiesystemen (Clause 6.1.2)
4. Implementeer logging op alle toegang tot patientdossiers (A.8.15)
5. Controleer en update alle verwerkersovereenkomsten met zorgsysteem-leveranciers (A.5.19–A.5.22)
6. Voer structurele awareness training uit gericht op medisch personeel (A.6.3)
7. Stel mobile device policy op voor klinische omgevingen (A.8.1)
8. Classificeer alle informatie met onderscheid patient/bedrijfsdata (A.5.12–A.5.13)

### Frameworks
- ISO 27001 · NEN 7510 · AVG/GDPR · NIS2

### Vragen voor jou
- NEN 7510:2024 is recent geupdate — klopt het dat dit standaard moet worden meegenomen?
- Hoe groot is het verschil tussen zorginstelling (ziekenhuis) en medtech leverancier in jouw ervaring?
- Zou er een aparte sub-sector moeten zijn voor medtech vs. zorginstellingen?

---

## 4. Overheid & Semi-overheid

**Benchmark:** 44% · **Relevant:** 91+/93 controls · **N/A:** 2

### Valkuilen (top 5 bij audits)
1. Classificatie: overheidsinformatie niet geclassificeerd volgens BIO-richtlijnen
2. Leveranciersmanagement: geen informatiebeveiligingseisen opgenomen in aanbestedingen
3. Logging: onvoldoende audit trails op gevoelige verwerkingen en toegang
4. Continuiteit: geen getest uitwijkplan voor kritieke dienstverlening
5. Bewustzijn: medewerkers niet periodiek getraind op informatiebeveiliging en social engineering

### Geprioriteerde acties
1. Classificeer alle informatie volgens BIO-richtlijnen (BBN1/BBN2/BBN3)
2. Stel ISMS-scope op afgestemd op BIO-verplichtingen (Clause 4.3)
3. Voer risicobeoordeling uit per informatiesysteem (Clause 6.1.2)
4. Neem informatiebeveiligingseisen op in alle aanbestedingen (A.5.19)
5. Implementeer audit logging op alle gevoelige verwerkingen (A.8.15–A.8.16)
6. Stel uitwijkplan op en test minimaal jaarlijks (A.5.29–A.5.30)
7. Voer periodieke awareness training uit voor alle medewerkers (A.6.3)
8. Stel clean desk en clear screen beleid op en handhaaf (A.7.7)

### Frameworks
- ISO 27001 · BIO · AVG/GDPR · NIS2

### Vragen voor jou
- Klopt de benchmark van 44%? (hogere inschatting omdat overheden vaak al BIO-compliant zijn)
- BIO is NL-specifiek. Hebben BE semi-overheden een eigen equivalent (bijv. CCB framework)?
- Zouden gemeenten vs. ZBO's vs. uitvoeringsorganisaties anders benaderd moeten worden?

---

## 5. Bouw & Techniek

**Benchmark:** 28% · **Relevant:** 85+/93 controls · **N/A:** 8

### Valkuilen (top 5 bij audits)
1. Projectlocaties: geen beveiliging van gevoelige informatie op bouwplaatsen
2. Onderaannemers: geen informatiebeveiligingseisen in contracten en werkafspraken
3. Mobile devices: onbeveiligde tablets en laptops op locatie zonder encryptie
4. Documentbeheer: projectdocumentatie niet geclassificeerd of beschermd
5. Toegangsbeheer: projectmedewerkers houden toegang na projectafsluiting

### Geprioriteerde acties
1. Stel informatiebeveiligingsbeleid op, goedgekeurd door directie (A.5.1)
2. Voer risicobeoordeling uit gericht op projectinformatie en locaties (Clause 6.1.2)
3. Classificeer projectinformatie en stel toegangsbeleid op (A.5.12, A.5.15)
4. Neem informatiebeveiligingseisen op in alle onderaannemerscontracten (A.5.19–A.5.22)
5. Beveilig mobiele apparaten op projectlocaties met encryptie en MDM (A.8.1)
6. Implementeer clean desk beleid voor kantoor en keten (A.7.7)
7. Stel onboarding/offboarding procedure op voor projectmedewerkers (A.6.1–A.6.5)
8. Voer basis awareness training uit voor kantoor- en bouwplaatspersoneel (A.6.3)

### Frameworks
- ISO 27001 · AVG/GDPR

### Vragen voor jou
- Benchmark 28% — is dit realistisch? (ik verwacht laag vanwege beginnende sector)
- N/A = 8 (A.7.12, A.7.14, A.8.4, A.8.25–A.8.28, A.8.30). Kloppen deze als uitsluitbaar?
- In jouw ervaring: certificeren bouwbedrijven vooral voor aanbestedingen, of ook intrinsiek?
- Missen we hier een framework? (bijv. NEN-EN-ISO 19650 voor BIM, of specifieke infrabeveiliging?)

---

## 6. Scale-up / Overig

**Benchmark:** 36% · **Relevant:** 87+/93 controls · **N/A:** 6

### Valkuilen (top 5 bij audits)
1. Documentatie: beleid en procedures ontbreken of zijn verouderd
2. Groei zonder governance: processen en toegangsrechten schalen niet mee met de organisatie
3. Toegangsbeheer: ad-hoc rechten zonder formeel toekennings- en intrekkingsproces
4. Supplier management: geen overzicht van leveranciers en verwerkersovereenkomsten
5. Incident response: geen gedocumenteerd plan, geen verantwoordelijke aangewezen

### Geprioriteerde acties
1. Stel ISMS-scope vast afgestemd op uw organisatie (Clause 4.3)
2. Voer een formele risicobeoordeling uit (Clause 6.1.2)
3. Documenteer informatiebeveiligingsbeleid en laat goedkeuren (A.5.1)
4. Formaliseer toegangsbeheerprocedures met least-privilege principe (A.5.15–A.5.18)
5. Breng leveranciers in kaart en stel verwerkersovereenkomsten op (A.5.19–A.5.22)
6. Implementeer basismaatregelen: MFA, encryptie, patching (A.8.5, A.8.24, A.8.8)
7. Stel incident response plan op met verantwoordelijkheden (A.5.24–A.5.28)
8. Voer awareness training uit voor alle medewerkers (A.6.3)

### Frameworks
- ISO 27001 · AVG/GDPR

### Vragen voor jou
- Is deze categorie te generiek? Zou je liever aparte profielen voor fintech / retail / logistiek maken?
- Moet hier SOC 2 worden toegevoegd voor scale-ups die richting enterprise willen?

---

## Algemene vragen

1. **Weging:** nu zijn alle controls gelijk gewogen — klopt dat voor alle sectoren, of zou je toch bepaalde categorieën zwaarder willen wegen per sector?

2. **Benchmark-waardes:** deze zijn nu een educated guess. Als je ze liever weghaalt tot we echte data hebben, zeg het.

3. **Tijdlijn-claims:** het SaaS-profiel heeft expliciet "geen tijdlijn beloven". Moeten we dit voor alle sectoren doorvoeren of per sector differentieren?

4. **NIS2 classificatie:** welke sectoren vallen automatisch onder NIS2 (essentieel/belangrijk)? Zouden we dit automatisch kunnen tonen op basis van sector + bedrijfsgrootte?
