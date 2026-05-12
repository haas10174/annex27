# BIO 2.0 — ISO 27001:2022 Mapping

**Versie:** 1.0
**Datum:** 2026-05-13
**Doelgroep:** Leveranciers aan Nederlandse overheidsorganisaties (gemeenten, provincies, waterschappen, ZBO's) die BIO-conformiteit moeten aantonen via hun ISO 27001-implementatie.
**Bron:** BIO 2.0 (Forum Standaardisatie, sinds 1 januari 2025) — gebaseerd op NEN-EN-ISO/IEC 27002:2022.

---

## 1. Wat is BIO 2.0?

De Baseline Informatiebeveiliging Overheid (BIO) is sinds 1 januari 2025 in versie 2.0 vastgesteld. Drie kernzaken:

1. **BIO 2.0 is gebaseerd op ISO 27002:2022.** Voor het eerst sluit het Nederlandse overheidsraamwerk 1-op-1 aan op de internationale norm. Alle 93 Annex A-controls uit ISO 27001:2022 zijn ook BIO-controls.
2. **BIO 2.0 bevat geen aparte BBN-niveaus meer.** Eerdere versies werkten met Basisbeveiligingsniveaus (Basis, Verhoogd, Hoog). In 2.0 is dit vervangen door **risico-gebaseerde toepassing per organisatie** met de Risico Analyse Methode Informatiebeveiliging (RAMI).
3. **BIO 2.0 voegt overheidsspecifieke maatregelen toe** bovenop ISO 27002. Vooral rond: politiegegevens (Wpg), grondslagen voor verwerking als overheidstaak, datalek-meldingsplicht naar AP én Inspectie, archiefwet-conformiteit en forensic readiness.

Voor een leverancier die diensten levert aan een gemeente of provincie betekent dit:
- Een ISO 27001:2022-certificering dekt **>90%** van de BIO 2.0-vereisten.
- De resterende ~10% zijn overheidsspecifieke clausules die je als leverancier zelf moet inrichten en aantoonbaar maken in je beleidspakket.
- BIO 2.0 wordt **contractueel afgedwongen** in aanbestedingen via de Algemene Inkoopvoorwaarden Rijk (ARBIT) en gemeentelijke equivalenten.

---

## 2. Mapping ISO 27002:2022 ↔ BIO 2.0

Alle 93 Annex A-controls uit ISO 27001:2022 (= ISO 27002:2022) zijn 1-op-1 BIO 2.0-controls. Hieronder de overheidsspecifieke aanvullingen per controlfamilie.

### A.5 — Organisatorische controls (37 controls)

| ISO 27002:2022 control | Annex27 beleidsdocument | BIO 2.0 aanvulling voor overheid |
|---|---|---|
| A.5.1 Beleid voor informatiebeveiliging | 02-informatiebeveiligingsbeleid | Beleid moet expliciet verwijzen naar Wet politiegegevens (Wpg) indien van toepassing |
| A.5.2 Rollen & verantwoordelijkheden | 04-rollen-verantwoordelijkheden | CISO of FG moet formeel aangewezen zijn; voor gemeenten: BIO-coördinator |
| A.5.7 Threat intelligence | 25-threat-intelligence | Gebruik IBD (Informatiebeveiligingsdienst voor gemeenten) advies-feed |
| A.5.8 Informatiebeveiliging in projectmanagement | werkinstructies/A5-organisatorisch | BIO-toets bij start van elk project met persoonsgegevens of dienstverlening aan burgers |
| A.5.19-A.5.23 Leveranciersrelaties | 23-leveranciersbeleid + 24-leverancier-assessment + 35-vendor-onboarding-checklist | Onderaannemers-keten transparant; sub-processors expliciet in DPA; geen niet-EU-verwerking zonder toestemming |
| A.5.24-A.5.28 Incident management | 19-incident-response + nis2-02-meldingsplicht-procedure | **Dubbele meldingsplicht**: AP (72u datalek) + Inspectie Justitie en Veiligheid (Wpg incidenten); voor NIS2-entiteiten ook CCB/NCSC binnen 24u |
| A.5.29 Continuïteit | 20-bcp | RTO/RPO afgestemd op kritikaliteit publieke dienstverlening (geen onderbreking burger-loket) |
| A.5.31 Wettelijke vereisten | 26-register-wettelijke-vereisten | Register moet bevatten: AVG, Archiefwet, Wpg (indien van toepassing), Wbni-2, sectorspecifieke wetgeving |
| A.5.33 Bescherming van records | basispakket dekt dit + werkinstructies/A5 | **Archiefwet-conformiteit**: bewaartermijnen per categorie publieke records, geautomatiseerde overdracht naar archiefdienst |
| A.5.34 Privacy & PII | 33-avg-privacy + 29-dpia-template + 30-ropa-verwerkingsregister + 31-data-subject-rights | DPIA verplicht bij elke nieuwe verwerking met overheidstaak-grondslag (Art. 6.1.e AVG) |
| A.5.35 Onafhankelijke beoordeling | 21-interne-audit + 22-management-review | Jaarlijkse interne audit + 3-jaarlijkse externe audit door geaccrediteerde CI (zoals voor BIO Self Assessment Tool, BSAT) |

### A.6 — Mensen-controls (8 controls)

| ISO 27002:2022 control | Annex27 beleidsdocument | BIO 2.0 aanvulling voor overheid |
|---|---|---|
| A.6.1 Screening | 09-hr-beleid | **VOG verplicht** voor medewerkers met toegang tot persoonsgegevens van burgers; verzwaard VOG-profiel bij toegang tot Wpg-data |
| A.6.2 Arbeidsvoorwaarden | 09-hr-beleid | Beroepsgeheim conform Ambtenarenwet 2017 (Art. 9) of via contractuele equivalent voor inhuur |
| A.6.3 Bewustzijn & training | 10-awareness-trainingsplan | **Verplichte BIO-baseline-training** voor alle medewerkers (BIO-cursus IBD voor gemeenten); jaarlijkse herhaling |
| A.6.4 Disciplinair proces | 09-hr-beleid | Conform Ambtenarenwet of contractuele bepalingen; meldingsplicht bij integriteitsschendingen aan FG/CISO |
| A.6.5 Beëindiging dienstverband | werkinstructies/A6-personeel | Toegangsintrekking binnen 24u; teruglevering apparatuur met sluitstuk-rapport; geheimhouding blijft levenslang |
| A.6.7 Remote working | 30-mobile-remote-working | **Geen verwerking van persoonsgegevens op buitenlandse netwerken** zonder VPN met EU-only routing |
| A.6.8 Melding ib-events | 19-incident-response | Meldingsroute via FG → DPO → CISO → Bestuurder → toezichthouder |

### A.7 — Fysieke controls (14 controls)

| ISO 27002:2022 control | Annex27 beleidsdocument | BIO 2.0 aanvulling voor overheid |
|---|---|---|
| A.7.1-A.7.4 Fysieke perimeters | 15-fysiek-beveiligingsbeleid + werkinstructies/A7-fysiek | Server-/datacenter-toegang uitsluitend binnen EER; geen Cloud Act-exposure |
| A.7.5 Bescherming tegen fysieke dreigingen | werkinstructies/A7 | Standaard NEN 1010 / NEN 2535 voor datacenter; voor Wpg-data verzwaard regime |
| A.7.9 Beveiligen apparatuur buiten locatie | 30-mobile-remote-working | Volledige schijfencryptie verplicht op alle endpoints met overheidsdata; remote wipe afdwingbaar |
| A.7.10 Opslagmedia | werkinstructies/A7 | Vernietigingsprotocol voor harde schijven: certificaat van vernietiging via SBB-norm of vergelijkbaar |
| A.7.14 Veilig opruimen apparatuur | werkinstructies/A7 | NIST 800-88 wipe-standaard of fysieke vernietiging voor apparatuur met overheidsdata |

### A.8 — Technologische controls (34 controls)

| ISO 27002:2022 control | Annex27 beleidsdocument | BIO 2.0 aanvulling voor overheid |
|---|---|---|
| A.8.1 Eindpunten | 30-mobile-remote-working | MDM verplicht voor alle endpoints met overheidsdata; geen BYOD zonder containerisatie |
| A.8.2 Geprivilegieerde toegangsrechten | werkinstructies/A8-technologisch + 12-toegangsbeleid | Privileged accounts via vault (PAM-oplossing); 4-ogen-principe bij toegang tot Wpg-data |
| A.8.5 Veilige authenticatie | 13-wachtwoordbeleid | **MFA verplicht** voor alle accounts met toegang tot overheidsdata (geen ontheffingen) |
| A.8.8 Vulnerability management | 17-patch-kwetsbaarheidsbeheer | Patch-SLA: critical = 7 dagen, high = 30 dagen; deelname Coordinated Vulnerability Disclosure programma |
| A.8.10 Verwijdering van informatie | 27-data-retention-deletion | Bewaartermijnen conform Archiefwet (publieke records: 7-110 jaar afhankelijk van categorie); auto-deletion-log |
| A.8.12 DLP | 28-dlp | DLP-policy moet detecteren: BSN, Wpg-gegevens, kentekens, geheimstempels |
| A.8.15 Logging | 18-logging-monitoring | Logs minimaal 6 maanden bewaard (audit-bewijs); voor Wpg: 5 jaar; immutable storage |
| A.8.16 Monitoring | 18-logging-monitoring | SOC-monitoring 24/7 voor essentiële NIS2-entiteiten; aansluiting op nationale CERT-feeds |
| A.8.20-A.8.23 Netwerkbeveiliging | 32-netwerk-communicatie | Geen niet-EU-routing van overheidsdata; TLS 1.3 verplicht; certificaat-pinning voor kritieke endpoints |
| A.8.24 Cryptografie | 16-cryptografiebeleid | **Goedgekeurde algoritmen**: AES-256, RSA-2048+, SHA-256+; geen MD5/SHA-1/RC4/3DES; Quantum-Safe Crypto-migratieplan |
| A.8.25-A.8.34 Secure development | 27-secure-development + werkinstructies/A8 | Forum Standaardisatie eisen (Pas-toe-of-leg-uit), open-source-componenten met SBOM, SAST/DAST in CI/CD |

---

## 3. Overheidsspecifieke clausules (BIO-uniek, geen ISO-equivalent)

Vier blokken die BIO 2.0 expliciet toevoegt en die je als leverancier zelf moet kunnen aantonen:

### 3.1 Publiekrechtelijke verwerkingsgrondslag

Voor elke verwerking namens een overheidsinstantie moet je documenteren onder welke AVG-grondslag de verwerking valt:
- Art. 6.1.c — wettelijke verplichting (bv. WOO, Archiefwet)
- Art. 6.1.e — taak van algemeen belang (bv. dienstverlening burgers)
- Voor bijzondere persoonsgegevens (Art. 9 AVG) plus extra grondslag uit UAVG

**Deliverable:** uitbreiding op `30-ropa-verwerkingsregister.md` waarin per verwerking ook de publiekrechtelijke grondslag is geregistreerd.

### 3.2 Dubbele meldingsplicht

Bij een datalek heb je drie meldingen:

| Termijn | Aan wie | Wettelijke basis |
|---|---|---|
| **72 uur** | Autoriteit Persoonsgegevens (AP) | AVG Art. 33 |
| **Onverwijld** | Inspectie Justitie en Veiligheid | Wpg Art. 33b (indien Wpg-data betrokken) |
| **24 uur (vroege waarschuwing) + 72u + 1 maand** | CCB/NCSC | NIS2 Art. 23 (indien essentiële/belangrijke entiteit) |

**Deliverable:** uitbreiding op `nis2-02-meldingsplicht-procedure.md` met flowchart die de meldingsroute bepaalt aan de hand van data-type en NIS2-classificatie.

### 3.3 Archiefwet-conformiteit

Overheidsrecords moeten bewaard worden conform de Archiefwet 1995 (vervangen door Archiefwet 2024 vanaf 1 januari 2027). Concreet:
- Geautomatiseerde overdracht naar archiefdienst na verloop bewaartermijn
- Selectielijsten per overheidslaag (gemeentelijke, provinciale, rijks)
- Vernietigingsprotocol met certificaat

**Deliverable:** uitbreiding op `27-data-retention-deletion.md` met BIO-bewaartermijnen tabel.

### 3.4 Forensic readiness

BIO 2.0 vraagt dat bewijsverzameling reproduceerbaar is na een incident. Concreet:
- Logs zijn tamper-evident (append-only storage of cryptografische hashes)
- Chain-of-custody-procedure bij overhandiging aan opsporingsinstanties
- Geen automatisch verwijderen van logs binnen 6 maanden zonder zwaarwegende reden

**Deliverable:** uitbreiding op `18-logging-monitoring.md` met forensic-readiness-checklist.

---

## 4. Aanbestedings-praktijk

Bij overheidsaanbestedingen worden BIO-eisen contractueel afgedwongen via:

- **ARBIT** (Algemene Rijksvoorwaarden voor IT-opdrachten) — verwijst naar BIO 2.0 als minimum
- **Gemeentelijke inkoopvoorwaarden** — meestal vergelijkbaar, soms strenger
- **Verwerkersovereenkomst (DPA)** — vrijwel altijd op basis van VNG-modelovereenkomst of Rijks-model

Als leverancier moet je dus kunnen aantonen:

1. ISO 27001:2022 certificaat (geaccrediteerd) — primair bewijs
2. BIO-mapping document (dit document) — secundair bewijs
3. Statement of Applicability met BIO-overheidsmaatregelen expliciet — tertiair bewijs
4. DPA-template op basis van VNG-model — operationeel

---

## 5. Quick-check voor uw organisatie

Beantwoord deze 8 vragen om te bepalen of u BIO-ready bent:

| # | Vraag | Antwoord ja → BIO-ready | Antwoord nee → te bouwen |
|---|---|---|---|
| 1 | Heeft u ISO 27001:2022 certificering of bent u in pre-audit fase? | ✓ | Begin met gap-analyse |
| 2 | Bevat uw RoPA per verwerking een publiekrechtelijke grondslag? | ✓ | Uitbreiden conform §3.1 |
| 3 | Is uw meldingsprocedure dual-channel (AP + Inspectie + NCSC)? | ✓ | Uitbreiden conform §3.2 |
| 4 | Heeft u een vernietigingsprotocol met certificaten? | ✓ | Uitbreiden conform §3.3 |
| 5 | Zijn uw logs tamper-evident en minimaal 6 maanden bewaard? | ✓ | Uitbreiden conform §3.4 |
| 6 | Hebben alle medewerkers met overheidsdata een VOG? | ✓ | HR-procedure aanpassen |
| 7 | Is MFA verplicht (geen ontheffingen) voor alle accounts? | ✓ | Technisch afdwingen |
| 8 | Beperkt u verwerking strikt tot EU-only datacenters? | ✓ | Cloud-strategie aanpassen |

---

## 6. Vervolg

Na invulling van deze quick-check ontvangt u een **BIO Gap-rapport** met concrete acties per ontbrekend onderdeel. Voor implementatie hiervan kan Annex27 als Lead Auditor optreden tijdens uw pre-audit, voorafgaand aan de officiële certificeringsaudit door een geaccrediteerde CI.

---

*Document is opgesteld op basis van BIO 2.0 (Forum Standaardisatie, januari 2025) en ISO/IEC 27002:2022. Voor specifieke vragen over toepassing op uw situatie: info@annex27.nl.*
