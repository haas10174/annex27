# NIS2 Art. 21 ↔ ISO 27001:2022 Mapping

**Referentiedocument — geen apart beleid, maar koppeling tussen NIS2-eisen en bestaande controls**

| | |
|---|---|
| **Documentnummer** | NIS2-003 |
| **Versie** | 1.0 |
| **Classificatie** | Intern — referentiedocument |
| **Eigenaar** | [CISO] |
| **Datum** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ — bij wijziging ISO of NIS2-richtlijn] |

---

## 1. Doel

NIS2 Art. 21 lid 2 schrijft tien minimale beveiligingsmaatregelen voor. ISO 27001:2022 dekt 9 van de 10 maatregelen volledig af; alleen #10 (bestuursaansprakelijkheid + meldingsplicht) is uniek voor NIS2. Dit document toont **per Art. 21-maatregel welke ISO-controls hem dekken en welke documenten in het beleidspakket de uitvoering beschrijven**.

Gebruik: voor audit-bewijs ("waar laten we zien dat we Art. 21 maatregel X afdekken?") en voor gap-analyse als u nog géén ISO 27001 heeft.

## 2. Mapping-tabel

### Maatregel 1 — Beleid voor risicoanalyse en informatiebeveiliging

**NIS2-eis:** *beleid inzake risicoanalyse en beveiliging van informatiesystemen*

| ISO 27001 referentie | Document |
|---|---|
| Clause 6.1.2 (Risicobeoordeling) | ISMS-005 — Risicobeoordeling |
| Clause 6.1.3 (Risicobehandeling) | ISMS-005 — sectie 5 |
| A.5.1 (Beleid voor informatiebeveiliging) | ISMS-002 — Informatiebeveiligingsbeleid |
| A.5.2 (Rollen en verantwoordelijkheden) | ISMS-004 — Rollen en verantwoordelijkheden |

**Audit-bewijs:** vastgesteld informatiebeveiligingsbeleid, ondertekend door bestuur, jaarlijks gereviewd. Risicobeoordeling met behandelplan en restrisico-acceptatie door risk-owner.

---

### Maatregel 2 — Incidentenbehandeling

**NIS2-eis:** *incidentenbehandeling*

| ISO 27001 referentie | Document |
|---|---|
| A.5.24 (Planning en voorbereiding incidentmanagement) | ISMS-019 — Incident response |
| A.5.25 (Beoordeling en classificatie van incidenten) | ISMS-019 — sectie 4 |
| A.5.26 (Reactie op incidenten) | ISMS-019 — sectie 5 |
| A.5.27 (Lessen uit incidenten) | ISMS-022 — Management review |

**Audit-bewijs:** incident response plan met IR-team, classificatieschema, runbooks, jaarlijkse tabletop-test, incident-log met bevindingen en correctieve maatregelen.

---

### Maatregel 3 — Bedrijfscontinuïteit en backupbeheer

**NIS2-eis:** *bedrijfscontinuïteit, zoals back-upbeheer en uitwijkmogelijkheden, en crisismanagement*

| ISO 27001 referentie | Document |
|---|---|
| A.5.29 (Informatiebeveiliging tijdens verstoring) | ISMS-020 — BCP |
| A.5.30 (ICT-gereedheid voor bedrijfscontinuïteit) | ISMS-020 — sectie 6 |
| A.8.13 (Informatie back-up) | Premium-31 — Backup & recovery |
| A.8.14 (Redundantie) | Premium-31 — sectie 4 |

**Audit-bewijs:** BCP/DRP met RTO/RPO per kritiek systeem, backup-procedures incl. retentie, jaarlijkse restore-test, crisis-team met opvolgingsmatrix.

---

### Maatregel 4 — Beveiliging van de toeleveringsketen

**NIS2-eis:** *beveiliging van de toeleveringsketen, inclusief beveiliging in de relatie tussen entiteit en haar leveranciers*

| ISO 27001 referentie | Document |
|---|---|
| A.5.19 (Informatiebeveiliging in leveranciersrelaties) | Premium-23 — Leveranciersbeleid |
| A.5.20 (Aanpakken van beveiliging in leveranciersovereenkomsten) | Premium-23 — sectie 5 |
| A.5.21 (Beheer informatiebeveiliging in ICT-toeleveringsketen) | Premium-23 + Premium-25 (Threat intelligence) |
| A.5.22 (Toezicht, beoordeling en wijziging leveranciersdiensten) | Premium-24 — Leverancier assessment |
| A.5.23 (Cloud-diensten) | Premium-26 — Cloud security |

**Audit-bewijs:** leveranciersregister met risico-classificatie, verwerkersovereenkomsten, jaarlijkse assessments van kritieke leveranciers, sub-verwerker overzicht, contractuele beveiligingseisen.

---

### Maatregel 5 — Beveiliging bij verwerving, ontwikkeling en onderhoud

**NIS2-eis:** *beveiliging bij verwerving, ontwikkeling en onderhoud van netwerk- en informatiesystemen, met inbegrip van het melden, registreren en aanpakken van kwetsbaarheden*

| ISO 27001 referentie | Document |
|---|---|
| A.8.25 (Veilige ontwikkellevenscyclus) | ISMS-027 — Secure development |
| A.8.26 (Toepassings-beveiligingseisen) | ISMS-027 — sectie 4 |
| A.8.27 (Veilige systeemarchitectuur) | ISMS-027 — sectie 5 |
| A.8.28 (Veilige codering) | ISMS-027 — sectie 6 |
| A.8.29 (Beveiligingstesten) | ISMS-027 + Patch & vulnerability mgmt |
| A.8.30 (Uitbestede ontwikkeling) | ISMS-027 + Premium-23 |
| A.8.8 (Beheer van technische kwetsbaarheden) | ISMS-017 — Patch & kwetsbaarheidsbeheer |

**Audit-bewijs:** SDLC-document, CI/CD met security-gates, scan-resultaten, kwetsbaarhedenregister met SLA's, pentestrapporten, change-management-records.

---

### Maatregel 6 — Beleid en procedures voor effectiviteitsbeoordeling

**NIS2-eis:** *beleid en procedures om de doeltreffendheid van risicobeheermaatregelen op het gebied van cyberbeveiliging te beoordelen*

| ISO 27001 referentie | Document |
|---|---|
| Clause 9.1 (Monitoring, meting, analyse en evaluatie) | ISMS-025 — KPI/meet-rapportage |
| Clause 9.2 (Interne audit) | ISMS-021 — Interne audit |
| Clause 9.3 (Management review) | ISMS-022 — Management review |
| A.5.36 (Naleving van beleid, regels en standaarden) | ISMS-021 + ISMS-022 |

**Audit-bewijs:** KPI-dashboard, internal audit programma + rapporten, management review-notulen met besluiten, correctieve maatregelen-register.

---

### Maatregel 7 — Basishygiëne en cyberbeveiligingstraining

**NIS2-eis:** *basishygiëne op het gebied van cyberbeveiliging en opleiding op het gebied van cyberbeveiliging*

| ISO 27001 referentie | Document |
|---|---|
| A.6.3 (Bewustzijn, opleiding en training) | ISMS-010 — Awareness/training plan |
| A.6.1 (Screening) | ISMS-009 — HR-beleid |
| A.6.2 (Arbeidsvoorwaarden) | ISMS-009 — sectie 4 |

**Audit-bewijs:** awareness-plan met doelgroep + frequentie + onderwerpen, deelname-records, evaluatie van effectiviteit (bijv. phishing-simulatie scores), aparte training voor bestuur (Art. 20 NIS2).

---

### Maatregel 8 — Beleid en procedures over cryptografie en encryptie

**NIS2-eis:** *beleid en procedures inzake het gebruik van cryptografie en, in voorkomend geval, encryptie*

| ISO 27001 referentie | Document |
|---|---|
| A.8.24 (Gebruik van cryptografie) | ISMS-016 — Cryptografiebeleid |

**Audit-bewijs:** cryptografiebeleid met algoritmekeuze + sleutelbeheer, evidence van encryptie at-rest (volume/database) en in-transit (TLS-versie + cipher suites), key-management procedure, certificaat-beheer.

---

### Maatregel 9 — Beveiliging van menselijke hulpbronnen, toegangsbeleid en assetbeheer

**NIS2-eis:** *beveiliging van menselijke hulpbronnen, toegangsbeleid en activabeheer*

| ISO 27001 referentie | Document |
|---|---|
| A.6 (volledige domain) | ISMS-009 — HR-beleid |
| A.5.15-A.5.18 (Toegangsbeleid + identiteit) | ISMS-012 — Toegangsbeleid |
| A.5.9-A.5.13 (Asset management) | ISMS-008 — Asset register |
| A.8.2-A.8.3 (Bevoorrechte toegang + restricties) | ISMS-012 — sectie 6 |

**Audit-bewijs:** HR-beleid incl. screening, indiensttreding/uitdiensttreding-procedures, toegangsmatrix, periodieke access reviews, asset-register met eigenaarschap en classificatie.

---

### Maatregel 10 — Multifactorauthenticatie en versleutelde communicatie + meldingsplicht/bestuursaansprakelijkheid

**NIS2-eis:** *gebruik van oplossingen voor multifactorauthenticatie of continue authenticatie, beveiligde spraak-, video- en tekstcommunicatie* + **uniek aan NIS2**: bestuursaansprakelijkheid (Art. 20) + meldingsplicht (Art. 23)

| Onderdeel | ISO 27001 referentie | Document |
|---|---|---|
| MFA + sterke authenticatie | A.8.5 (Veilige authenticatie) + A.5.17 (Authenticatie-informatie) | ISMS-013 — Wachtwoordbeleid |
| Versleutelde communicatie | A.8.20-A.8.23 (Netwerk-controls) | Premium-32 — Netwerk & communicatie |
| **Bestuursaansprakelijkheid** | **niet in ISO 27001** | **NIS2-001 — Bestuursverklaring** |
| **Meldingsplicht 24h/72h/30d** | **niet in ISO 27001** (alleen "communicatie aan autoriteit" generiek in A.5.5) | **NIS2-002 — Meldingsplicht-procedure** |

**Audit-bewijs technisch:** MFA-uitrol-evidence per systeem, conditional access policies, TLS-config per service, S/MIME of equivalent voor gevoelige mailcommunicatie.

**Audit-bewijs uniek-NIS2:** ondertekend bestuursbesluit (NIS2-001), getest meldingsplicht-procedure (NIS2-002), bewijs dat bestuursleden cybersecurity-training hebben gevolgd.

## 3. Wat NIS2 wél extra eist boven ISO 27001

| Onderwerp | NIS2-extra | Hoe afgedekt |
|---|---|---|
| Bestuursaansprakelijkheid | Art. 20 — bestuur is persoonlijk verantwoordelijk; bestuursleden moeten training volgen | NIS2-001 + getekende verklaring |
| Meldingsplicht 24h/72h/30d | Art. 23 — strakke termijnen aan bevoegde instantie | NIS2-002 |
| Sectorale dimensie | Art. 2 — uitsluitend van toepassing op essentiële/belangrijke entiteiten in opgesomde sectoren | NIS2-004 |
| Cross-border samenwerking | Art. 23 lid 7 — informeren van getroffen lidstaten bij grensoverschrijdende impact | Onderdeel van NIS2-002 |

## 4. Snelle audit-checklist

Loop deze rij langs voor elke Art. 21-maatregel:

- [ ] Is er een formeel beleidsdocument? (papier/digitaal — beide telt)
- [ ] Is het bestuurlijk goedgekeurd?
- [ ] Is het laatst gereviewd binnen het afgelopen jaar?
- [ ] Is er evidence van uitvoering (logs, records, screenshots, audit-rapporten)?
- [ ] Zijn er KPI's voor effectiviteit gedefinieerd en gemeten?
- [ ] Is de scope eenduidig (welke entiteiten/systemen)?
- [ ] Is het document onderdeel van uw documentbeheer (ISMS-007)?

---

## Gerelateerde documenten

- NIS2-001 — Bestuursverklaring & directiebesluit Art. 21
- NIS2-002 — Meldingsplicht-procedure
- NIS2-004 — Classificatie essentiële vs. belangrijke entiteit
- ISMS-002 t/m ISMS-031 — Volledig beleidspakket (basispakket)
- Premium-23 t/m Premium-35 — Premium-uitbreiding
- Werkinstructies A5/A6/A7/A8 — operationele uitwerking per Annex A categorie
