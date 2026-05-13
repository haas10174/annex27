# NIS2 / Cyberbeveiligingswet — ISO 27001:2023 / 27002:2022 Mapping

**Versie document:** 1.0
**Datum:** 2026-05-13
**Doelgroep:** Essentiële en belangrijke entiteiten onder NIS2 (Richtlijn EU 2022/2555) en de Nederlandse Cyberbeveiligingswet (Cbw) die NIS2-conformiteit willen aantonen via hun ISO 27001-implementatie en/of Annex27 beleidspakket.

**Bronnen:** Richtlijn (EU) 2022/2555 van 14 december 2022 (EUR-Lex CELEX 32022L2555, NL-versie gepubliceerd 27.12.2022); Cyberbeveiligingswet (Cbw), Nederlandse implementatie NIS2; NEN-EN-ISO/IEC 27001:2023; NEN-EN-ISO/IEC 27002:2022.

---

## 1. Wat is NIS2

**NIS2** (Richtlijn EU 2022/2555) vervangt de NIS1-richtlijn (2016/1148) en stelt maatregelen vast voor een hoog gemeenschappelijk niveau van cyberbeveiliging in de Unie. Inwerkingtreding: 16 januari 2023. Toepassing door lidstaten: vanaf 18 oktober 2024.

### Doelstellingen

NIS2 pakt de versnippering van NIS1 aan door:
- een uniform toepassingsgebied (size-cap-regel voor middelgrote en grote ondernemingen);
- minimumharmonisatie van risicobeheersmaatregelen (Art. 21) en rapportageverplichtingen (Art. 23);
- gedifferentieerd toezicht en handhaving (essentieel = proactief, belangrijk = reactief);
- aansprakelijkheid op bestuursniveau (Art. 20).

### Toepassingsgebied: sectoren en omvang

NIS2 onderscheidt twee categorieën (Art. 3):

**Bijlage I — Zeer kritieke sectoren (essentieel tenzij kleiner dan middelgroot bedrijf):**
Energie (elektriciteit, stadsverwarming/-koeling, aardolie, aardgas, waterstof), Vervoer (lucht, spoor, water, weg), Bankwezen, Infrastructuur voor de financiële markt, Gezondheidszorg, Drinkwater, Afvalwater, Digitale infrastructuur (IXP, DNS, TLD, cloud, datacenters, CDN, vertrouwensdiensten, openbare elektronischecommunicatienetwerken), Beheer van ICT-diensten B2B (MSP, MSSP), Overheid (centraal + regionaal), Ruimtevaart.

**Bijlage II — Andere kritieke sectoren (belangrijk tenzij kleiner dan middelgroot bedrijf):**
Post- en koeriersdiensten, Afvalstoffenbeheer, Chemische stoffen, Levensmiddelen, Vervaardiging van medische hulpmiddelen/ICT/elektrische apparatuur/machines/motorvoertuigen/andere transportmiddelen, Digitale aanbieders (onlinemarktplaatsen, zoekmachines, socialenetwerken), Onderzoek.

**Ongeacht omvang** vallen onder NIS2: aanbieders openbare elektronischecommunicatienetwerken/-diensten, gekwalificeerde vertrouwensdienstenleners, TLD-registers, DNS-dienstverleners, overheidsinstanties van centrale overheid, en kritieke entiteiten aangewezen onder CER-richtlijn (2022/2557).

**Niet onder NIS2** vallen: financiële entiteiten voor zover DORA (Verordening 2022/2554) gelijkwaardige eisen oplegt — DORA vervangt NIS2 voor ICT-risicobeheer en incidentrapportage in de financiële sector (Recital 28, Art. 4 lid 1 NIS2).

### Tweedeling toezicht

| Categorie | Toezicht | Geldboete (max) |
|---|---|---|
| **Essentiële entiteiten** | Proactief: inspecties, regelmatige audits, beveiligingsscans | €10 mln of 2% wereldwijde jaaromzet (hoogste) |
| **Belangrijke entiteiten** | Reactief: uitsluitend achteraf, bij bewijs/aanwijzing van inbreuk | €7 mln of 1,4% wereldwijde jaaromzet (hoogste) |

---

## 2. Cyberbeveiligingswet (Cbw) als context

De **Cyberbeveiligingswet (Cbw)** is de Nederlandse implementatie van NIS2 (toepassing vanaf 18 oktober 2024). De Cbw verplicht entiteiten in alle sectoren van Bijlage I en II die aan de omvangsdrempel voldoen, tot het treffen van passende risicobeheersmaatregelen en het naleven van rapportageverplichtingen.

### Nederlandse toezichthouders per sector

| Sector (Bijlage I/II) | Toezichthouder (Cbw) |
|---|---|
| Digitale infrastructuur, Beheer ICT-diensten B2B, Overheid (centraal + regionaal) | **RDI** (Rijksinspectie Digitale Infrastructuur) |
| Bankwezen, Infrastructuur financiële markt | **DNB** (De Nederlandsche Bank) + **AFM** (Autoriteit Financiële Markten) |
| Gezondheidszorg | **IGJ** (Inspectie Gezondheidszorg en Jeugd) |
| Vervoer (lucht, spoor, weg, water) | **ILT** (Inspectie Leefomgeving en Transport) |
| Energie | **ACM** (Autoriteit Consument en Markt) |
| Nucleair (aanvullend) | **ANVS** (Autoriteit Nucleaire Veiligheid en Stralingsbescherming) |
| Persoonsgegevens-inbreuken (alle sectoren) | **AP** (Autoriteit Persoonsgegevens) — parallel aan sectorale toezichthouder |
| Digitale aanbieders (onlinemarktplaatsen, zoekmachines, socialenetwerken) | **CSIRT-DSP** (sectoraal CSIRT Digitale Dienstverleners) |

**NCSC** (Nationaal Cyber Security Centrum) ontvangt meldingen van essentiële entiteiten als nationaal CSIRT. Samenwerking met Europees CSIRT-netwerk en EU-CyCLONe.

### Meldplicht significante incidenten (Art. 23 NIS2)

| Fase | Termijn | Inhoud | Ontvanger |
|---|---|---|---|
| **Vroegtijdige waarschuwing** | Onverwijld, in elk geval **binnen 24 uur** | Kwaadwillige handeling? Grensoverschrijdende gevolgen? | CSIRT / bevoegde autoriteit |
| **Incidentmelding** | Onverwijld, in elk geval **binnen 72 uur** | Update fase 1, initiële beoordeling, ernst + gevolgen, indicatoren voor aantasting | CSIRT / bevoegde autoriteit |
| **Tussentijds verslag** | Op verzoek CSIRT | Updates lopende situatie | CSIRT |
| **Eindverslag** | **Uiterlijk 1 maand** na incidentmelding | Gedetailleerde beschrijving, dreiging/grondoorzaak, mitigerende maatregelen, grensoverschrijdende gevolgen | CSIRT / bevoegde autoriteit |
| **Voortgangsverslag + eindverslag** | Als incident nog gaande op moment eindverslag | Voortgang + eindverslag binnen 1 maand na afhandeling | CSIRT |

**Vertrouwensdiensten**: significante incidenten binnen **24 uur** melden (niet 72 uur). CSIRT antwoordt binnen 24 uur na ontvangst vroegtijdige waarschuwing met eerste feedback (Art. 23 lid 5 NIS2).

Een significant incident is een incident dat ernstige operationele verstoring of financiële verliezen veroorzaakt of kan veroorzaken, dan wel andere personen door aanzienlijke materiële of immateriële schade treft of kan treffen (Art. 23 lid 3 NIS2).

Naast verplichte meldingen kunnen entiteiten op **vrijwillige basis** cyberdreigingen en bijna-incidenten melden (Art. 30 NIS2). Vrijwillige melding leidt niet tot bijkomende verplichtingen.

### Bestuurlijke verantwoordelijkheid en opleidingsplicht (Art. 20 NIS2)

**Bestuursorganen** (= de in NIS2-termen verantwoordelijke "natuurlijke personen") van essentiële en belangrijke entiteiten:
- keuren de cyberbeveiligingsrisicobeheersmaatregelen goed;
- zien toe op de uitvoering ervan;
- **kunnen aansprakelijk worden gesteld** voor inbreuken op Art. 21 en 23 (Art. 32 lid 6 NIS2).

Als ultiem middel bij essentiële entiteiten kan de toezichthouder een **tijdelijk verbod op leidinggevende functies** opleggen aan de CEO of wettelijk vertegenwoordiger (Art. 32 lid 5 NIS2).

Leden van bestuursorganen **moeten opleiding volgen** over cyberbeveiligingsrisico's. Entiteiten worden aangemoedigd werknemers regelmatig te trainen (Art. 20 lid 2 NIS2).

---

## 3. Mapping per Art. 21.2-maatregel naar ISO 27001 Annex A

Alle tien maatregelen uit Art. 21 lid 2 NIS2 worden hieronder gemapt op ISO 27002:2022 / Annex A en op het relevante Annex27 beleidsdocument. NIS2 vereist een **alle-gevaren-benadering** (all-hazards approach) en hanteert als maatstaf de evenredigheid met het risico, de omvang van de entiteit en de stand van de techniek (Art. 21 lid 1 NIS2).

### 3.1 Art. 21.2.a — Beleid risicoanalyse + beveiliging informatiesystemen

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.a** | Beleid inzake risicoanalyse en beveiliging van informatiesystemen | ISO 27001 clausules 4, 5, 6, 7, 8, 9, 10; A.5.1 (IB-beleid) | 02-informatiebeveiligingsbeleid, 03-scope-definitie, 04-rollen-verantwoordelijkheden, 06-doelstellingen-kpi, 07-management-commitment | Formeel vastgesteld IB-beleid, door bestuur goedgekeurd. ISMS-kader met risicomanagementmethodiek (Art. 8 ISO 27001). Alle-gevaren-benadering: fysiek + cyber + supply chain. Minimaal jaarlijkse beoordeling effectiviteit. |
| **Art. 21.2.a (context)** | Risicoregister + VvT | ISO 27001 clausule 6.1.3, A.5.1 | 05-vvt-statement-applicability | Risicoregister bijgehouden. Verklaring van Toepasselijkheid (VvT) met gemotiveerde in-/uitsluiting controls. |

### 3.2 Art. 21.2.b — Incidentenbehandeling

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.b** | Incidentenbehandeling | A.5.24 (planning + voorbereiding), A.5.25 (beoordeling + beslissing), A.5.26 (reactie), A.5.27 (leren), A.5.28 (bewijs), A.5.29 (IB tijdens verstoring), A.5.30 (ICT-gereedheid) | 19-incident-response, nis2-02-meldingsplicht-procedure | Gedocumenteerde incidentrespons-procedure. Rollen en escalatiepaden vastgelegd. Aansluiting op meldplicht-cascade Art. 23 NIS2 (24h/72h/1 maand). Bewijsbewaring en forensisch onderzoek ingeregeld. |
| **Art. 21.2.b (meldroute)** | NIS2-meldplicht significant incident | Art. 23 NIS2 — niet gedekt door ISO 27001 zelf | nis2-02-meldingsplicht-procedure | Expliciete procedure voor vroegtijdige waarschuwing (24h), incidentmelding (72h) en eindverslag (1 maand) richting CSIRT/bevoegde autoriteit. |

### 3.3 Art. 21.2.c — Bedrijfscontinuïteit, back-up, noodvoorzieningenplannen, crisisbeheer

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.c** | Bedrijfscontinuïteit | A.5.29 (IB tijdens verstoring), A.5.30 (ICT-gereedheid voor bedrijfscontinuïteit) | 20-bcp | BCM-plan voor kritieke processen. Jaarlijks testen continuïteitsplannen. RTO/RPO bepaald op basis risicoanalyse. Crisisbeheerstructuur en noodvoorzieningenplannen. |
| **Art. 21.2.c (back-up)** | Back-up en herstel | A.8.13 (informatieback-up), A.8.14 (redundantie) | 31-backup-recovery | Back-upbeleid met locatiescheiding. Herstelprocedure minimaal jaarlijks getest. Specifieke aandacht voor ransomware en integriteitscontrole back-ups. |

### 3.4 Art. 21.2.d — Beveiliging toeleveringsketen

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.d** | Supply chain security (directe leveranciers/dienstverleners) | A.5.19 (IB in leveranciersrelaties), A.5.20 (IB in overeenkomsten), A.5.21 (IB in ICT-toeleveringsketen), A.5.22 (monitoring/review/wijzigingsbeheer leveranciers), A.5.23 (IB voor cloudgebruik) | 23-leveranciersbeleid, 24-leverancier-assessment, 35-vendor-onboarding-checklist | IB-eisen contractueel verankerd bij alle directe leveranciers. Risicobeoordeling toeleveringsketen, incl. kwetsbaarheden directe leverancier (Art. 21 lid 3 NIS2). Keten van toeleveranciers inzichtelijk. Jaarlijkse leveranciersbeoordeling. |
| **Art. 21.2.d (cloud)** | Cloud Service Providers | A.5.23 | 26-cloud-security | CSP-beleid: selectie, beoordeling, exit-strategie. Transparantie over subverwerkers. |

**NIS2-specifiek** (niet één-op-één in ISO 27002): Art. 21 lid 3 NIS2 verplicht bij toeleveringsketen-beoordeling rekening te houden met de uitkomsten van gecoördineerde Unie-beveiligingsrisicobeoordelingen van kritieke toeleveringsketens (Art. 22 NIS2 / samenwerkingsgroep + Commissie + Enisa). Dit is een EU-coördinatiemechanisme dat buiten de scope van ISO 27002 valt.

### 3.5 Art. 21.2.e — Beveiliging bij verwerving, ontwikkeling en onderhoud + CVD

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.e** | Veilige verwerving/ontwikkeling/onderhoud systemen | A.8.25 (veilige ontwikkelingslevenscyclus), A.8.26 (beveiligingseisen applicaties), A.8.27 (veilige systeemarchitectuur), A.8.28 (veilig coderen), A.8.29 (beveiligingstesten), A.8.30 (uitbestede ontwikkeling), A.8.31 (scheiding omgevingen), A.8.32 (wijzigingsbeheer), A.8.33 (testomgeving), A.8.34 (bescherming informatiesystemen tijdens audit) | 29-change-management, werkinstructies/A8-technologisch | Security by design + security by default. Gestructureerde acceptatietesten. Uitbestede ontwikkeling onder zelfde eisen als intern. Wijzigingsbeheer inclusief risicoafweging en rollback-plan. |
| **Art. 21.2.e (CVD)** | Gecoördineerde bekendmaking kwetsbaarheden | Art. 12 NIS2 (ISO/IEC 29147:2020, ISO/IEC 30111) — aanvullend op ISO 27002 | nis2-02-meldingsplicht-procedure | CVD-procedure ingericht en gepubliceerd (NCSC-leidraad of ISO 29147). Kwetsbaarheidsmeldingen tijdig verwerkt. CSIRT als nationaal coördinator (Art. 12 NIS2). CVD-meldingen onderdeel incidentrapportage. |

**NIS2-specifiek**: De verplichting tot publicatie van een CVD-procedure en aansluiting op de nationale CSIRT-coördinator vloeit direct voort uit Art. 12 en Recitals 58-63 NIS2 en is niet als expliciete verplichting opgenomen in ISO 27002:2022.

### 3.6 Art. 21.2.f — Beleid en procedures voor beoordeling effectiviteit risicobeheermaatregelen

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.f** | Effectiviteitsbeoordeling | ISO 27001 clausule 9 (prestatie-evaluatie): 9.1 monitoring/meting, 9.2 interne audit, 9.3 directiebeoordeling | 21-interne-audit, 22-management-review | Auditplan vastgesteld. Interne audits periodiek uitgevoerd. Management review inclusief KPI's en verbeteracties. Doelstellingen met meetbare indicatoren. |

### 3.7 Art. 21.2.g — Cyberhygiëne + opleiding cyberbeveiliging

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.g** | Cyberhygiëne basispraktijken | A.8.8 (technische kwetsbaarheden), A.8.7 (bescherming tegen malware), A.8.1 (eindgebruikersapparatuur) | 17-patch-kwetsbaarheidsbeheer | Software-updates, hardware-updates, wachtwoordbeleid, beheer nieuwe installaties, beperking beheerrechten, back-ups (Recital 49 NIS2). Antimalware actueel. |
| **Art. 21.2.g (opleiding)** | Opleiding cyberbeveiliging | A.6.3 (bewustzijn, opleiding en training IB), A.6.5 (verantwoordelijkheden na beëindiging), A.6.8 (rapportage IB-gebeurtenissen) | 10-awareness-trainingsplan, 09-hr-beleid | Aantoonbare training voor alle medewerkers (intern + extern). Bestuurders verplicht opleiding cyberbeveiligingsrisico's (Art. 20 lid 2 NIS2). Periodieke herhaling. |

### 3.8 Art. 21.2.h — Cryptografie en encryptie

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.h** | Beleid en procedures gebruik cryptografie + encryptie | A.8.24 (gebruik cryptografie) | 16-cryptografiebeleid, 14-encryptie-beleid | Cryptografiebeleid: wanneer, wie verantwoordelijk, sleutelbeheer. Sterkte gebaseerd op actuele NCSC-adviezen. Versleuteling van gegevens in rust en transport. End-to-end encryptie waar van toepassing (Recitals 92-100 NIS2). |

### 3.9 Art. 21.2.i — Beveiligingsaspecten personeel + toegangsbeleid + beheer activa

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.i (personeel)** | HR-beveiliging | A.6.1 (screening), A.6.2 (arbeidsvoorwaarden), A.6.4 (disciplinaire procedure), A.6.5 (verantwoordelijkheden na beëindiging), A.6.6 (vertrouwelijkheid), A.6.7 (remote working) | 09-hr-beleid | Screeningsbeleid. IB-verantwoordelijkheden vastgelegd in arbeidsvoorwaarden. Exit-procedure met intrekking toegangsrechten. |
| **Art. 21.2.i (toegang)** | Toegangsbeleid | A.5.15 (toegangsbeheersing), A.5.16 (identiteitsbeheer), A.5.17 (authenticatie-informatie), A.5.18 (toegangsrechten), A.8.2 (speciale toegangsrechten), A.8.3 (beperking toegang informatie), A.8.4 (toegang broncode), A.8.5 (beveiligde authenticatie) | 12-toegangsbeleid, 13-wachtwoordbeleid | Need-to-know principe. Minimale bevoegdheden. Formele toegangsverstrekkings- en intrekkingsprocedure. Periodieke beoordeling toegangsrechten. |
| **Art. 21.2.i (activa)** | Beheer bedrijfsmiddelen | A.5.9 (inventaris activa), A.5.10 (aanvaardbaar gebruik), A.5.11 (teruggave activa), A.5.12 (classificatie), A.5.13 (labeling), A.5.14 (informatieoverdracht) | 11-assetregister-en-classificatie | Actueel assetregister inclusief cloud-omgevingen. Classificatie op basis risicoanalyse. |

### 3.10 Art. 21.2.j — MFA, beveiligde communicatie, noodcommunicatie

| NIS2-maatregel | Onderwerp | ISO 27002 / Annex A | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|---|
| **Art. 21.2.j (MFA)** | Multifactorauthenticatie / continue authenticatie | A.5.17 (authenticatie-informatie), A.8.5 (beveiligde authenticatie) | 12-toegangsbeleid, 13-wachtwoordbeleid | MFA verplicht voor primaire werkomgeving, internet-bereikbare voorzieningen, beheeraccounts. Bij MFA niet mogelijk: mitigerende maatregelen gedocumenteerd. |
| **Art. 21.2.j (communicatie)** | Beveiligde spraak-/video-/tekstcommunicatie | A.8.24 (cryptografie), A.5.14 (informatieoverdracht) | 16-cryptografiebeleid, 34-communicatiebeleid | Versleutelde communicatiekanalen voor gevoelige informatie. End-to-end encryptie waar van toepassing. |
| **Art. 21.2.j (nood)** | Beveiligde noodcommunicatiesystemen | A.5.29 (IB tijdens verstoring), A.5.30 | 20-bcp, 34-communicatiebeleid | Alternatieve communicatiekanalen vastgelegd in BCP. Getest als onderdeel continuïteitsoefening. |

**NIS2-specifiek**: Art. 21.2.j benoemt expliciet "continue authenticatie" als optie naast MFA. Continue authenticatie (gedragsbiometrie, contextanalyse) is in ISO 27002:2022 niet als afzonderlijke maatregel uitgewerkt — dit is een NIS2-eigen eis die aanvullende implementatiegids vereist.

---

## 4. Wat dekt een ISO 27001:2023-certificaat

Een geaccrediteerd ISO 27001:2023-certificaat dekt het volledige ISMS-kader (clausules 4-10) en de basis van alle 93 Annex A-controls. Daarmee is een substantieel deel van Art. 21 NIS2 geborgd.

### Delta-analyse: wat ISO 27001 niet automatisch dekt

| NIS2-eis | Grondslag | Niet gedekt door ISO 27001 zelf |
|---|---|---|
| **Meldplicht significante incidenten** (24h/72h/1 maand) | Art. 23 NIS2 | ISO 27001 vereist incidentbeheer maar schrijft geen externe meldtermijnen voor naar overheidsinstanties. Expliciete NIS2-meldprocedure richting CSIRT/bevoegde autoriteit vereist. |
| **Bestuurlijke aansprakelijkheid + opleidingsplicht** | Art. 20 NIS2 | ISO 27001 vereist "top management commitment" maar stelt geen wettelijke persoonlijke aansprakelijkheid en geen expliciete bestuursopleiding verplicht. Aparte bestuursverklaring + aantoonbare opleiding nodig. |
| **CVD-procedure (publicatie + CSIRT-koppeling)** | Art. 12 + Art. 21.2.e NIS2 | ISO 27002:2022 A.8.8 behandelt kwetsbaarheidsbeheer intern; publicatie als externe CVD-procedure met CSIRT-coördinatie is geen ISO 27001-eis. |
| **Gecoördineerde toeleveringsketen-risicobeoordeling** | Art. 21 lid 3 + Art. 22 NIS2 | ISO 27002 A.5.21 behandelt ICT-supply-chain; rekening houden met EU-niveau gecoördineerde risicobeoordelingen (samenwerkingsgroep/Enisa) is NIS2-specifiek. |
| **Continue authenticatie** | Art. 21.2.j NIS2 | MFA wordt gedekt door A.8.5; "continue authenticatie" als separate techniek is geen afzonderlijke ISO 27002-control. |
| **Noodcommunicatiesystemen** | Art. 21.2.j NIS2 | BCP-vereisten (A.5.30) dekken continuïteit maar niet expliciet beveiligde noodcommunicatiesystemen als zelfstandige verplichting. |
| **Vrijwillige dreiging-/bijna-incident-melding** | Art. 30 NIS2 | Buiten scope ISO 27001. Procedure voor vrijwillige melding bij CSIRT aanvullend in te richten. |
| **Registratieplicht bij bevoegde autoriteit** | Art. 27 NIS2 | Administratieve verplichting (naam, adres, IP-bereiken, lidstaten van dienstverlening); geen ISMS-element. |

### Bestuurlijke aansprakelijkheid nader

Art. 20 NIS2 maakt "natuurlijke personen" — de leden van het bestuursorgaan — persoonlijk aansprakelijk voor inbreuken op Art. 21 en 23. Art. 32 lid 5 NIS2 staat als ultiem middel bij essentiële entiteiten een tijdelijk verbod op leidinggevende functies toe voor de CEO of wettelijk vertegenwoordiger. ISO 27001:2023 vereist leiderschap en betrokkenheid van het topmanagement (clausule 5.1) maar legt geen persoonlijke wettelijke aansprakelijkheid op. Bestuurders dienen dit verschil te begrijpen als onderdeel van hun verplichte opleiding (Art. 20 lid 2 NIS2).

---

## 5. Voor essentiële en belangrijke entiteiten: hoe NIS2/Cbw-conformiteit aantonen

NIS2 schrijft geen verplichte certificering voor maar erkent Europese cyberbeveiligingscertificeringsregelingen (Art. 24 NIS2, Verordening 2019/881). Een ISO 27001:2023-certificaat is het sterkste beschikbare bewijsmiddel voor het voldoen aan Art. 21, aangevuld met NIS2-specifieke dossiers.

### Stap 1 — ISO 27001:2023-certificaat als primair bewijs Art. 21

Een geaccrediteerd ISO 27001:2023-certificaat aantonen dat de ISMS-processen (risicoanalyse, beleidsvaststelling, controles, interne audit, management review) systematisch zijn ingericht conform Art. 21.2.a en Art. 21.2.f NIS2.

### Stap 2 — NIS2-specifieke aanvullende dossiers

| Dossier | NIS2-grondslag | Annex27 document |
|---|---|---|
| **Meldingsplicht-procedure** (24h/72h/1 maand, contactgegevens CSIRT/toezichthouder) | Art. 23 NIS2 | nis2-02-meldingsplicht-procedure |
| **Bestuursverklaring** (goedkeuring maatregelen, toezicht uitvoering, opleiding bestuur aantoonbaar) | Art. 20 NIS2 | nis2-01-bestuursverklaring |
| **CVD-procedure** (gepubliceerd op website conform NCSC-leidraad of ISO 29147) | Art. 12 + Art. 21.2.e NIS2 | nis2-02-meldingsplicht-procedure (bijlage) |
| **Supply-chain-register** (directe leveranciers, IB-eisen contractueel, kwetsbaarheden toeleveranciers) | Art. 21.2.d + Art. 21 lid 3 NIS2 | 23-leveranciersbeleid + 24-leverancier-assessment |
| **VvT (Verklaring van Toepasselijkheid)** (alle 93 Annex A-controls gemotiveerd in-/uitgesloten, NIS2-delta expliciet) | Art. 21.2.a + ISO 27001 clausule 6.1.3 | 05-vvt-statement-applicability |
| **RoPA (Register verwerkingsactiviteiten)** (bij persoonsgegevens-inbreuk: aansluiting op AP-meldplicht AVG Art. 33 + Art. 35 NIS2) | Art. 35 NIS2 + AVG Art. 33 | 30-ropa-verwerkingsregister |
| **Registratie bij bevoegde autoriteit** (naam, adres, IP-bereiken, sector, lidstaten — uiterlijk 17 april 2025) | Art. 3 lid 3-4 + Art. 27 NIS2 | Administratief — buiten beleidspakket |
| **Bewijs bestuursopleiding** (aantoonbare opleiding leden bestuursorgaan) | Art. 20 lid 2 NIS2 | 10-awareness-trainingsplan (uitbreiding bestuurssessie) |

### Stap 3 — Aantonen bij toezichthouder (RDI, DNB, IGJ, ILT, ACM, AP)

Toezichthouders hanteren gedifferentieerd toezicht:
- **Essentiële entiteiten**: proactief toezicht — bij inspectie of regelmatige audit alle dossiers uit stap 1 en 2 gereed houden.
- **Belangrijke entiteiten**: reactief toezicht — dossiers aantoonbaar aanwezig, beschikbaar op verzoek.

Bij persoonsgegevens-inbreuken: melding aan sectorale toezichthouder + parallel aan AP. Geen dubbele geldboete voor dezelfde gedraging indien AVG-boete al opgelegd (Art. 35 NIS2).

---

## 6. Quick-check essentiële en belangrijke entiteiten

Acht vragen gebaseerd op Art. 20-23 NIS2 en de Cbw:

| # | Vraag | NIS2-grondslag | Ja → conform | Nee → te bouwen |
|---|---|---|---|---|
| 1 | Heeft uw organisatie een ISO 27001:2023-certificaat (of loopt een pre-audit) dat alle relevante systemen dekt? | Art. 21 NIS2 | ✓ | Start gap-analyse: ISMS opzetten of uitbreiden |
| 2 | Is er een gedocumenteerde meldingsprocedure voor significante incidenten richting uw CSIRT/toezichthouder binnen 24h (waarschuwing) en 72h (melding)? | Art. 23 NIS2 | ✓ | nis2-02-meldingsplicht-procedure inrichten |
| 3 | Heeft het bestuursorgaan de cyberbeveiligingsmaatregelen formeel goedgekeurd en volgt het aantoonbaar opleiding over cyberbeveiligingsrisico's? | Art. 20 NIS2 | ✓ | nis2-01-bestuursverklaring + bestuursopleiding |
| 4 | Is een CVD-procedure gepubliceerd (conform NCSC-leidraad of ISO 29147) en gekoppeld aan de nationale CSIRT-coördinator? | Art. 12 + Art. 21.2.e NIS2 | ✓ | CVD-procedure opstellen en publiceren |
| 5 | Zijn directe leveranciers en hun toeleveringsketens beoordeeld op IB-eisen, met contractuele verankering? | Art. 21.2.d + Art. 21 lid 3 NIS2 | ✓ | 23-leveranciersbeleid en 24-leverancier-assessment uitbreiden |
| 6 | Is MFA ingericht voor primaire werkomgeving, internet-bereikbare systemen en beheeraccounts? | Art. 21.2.j NIS2 | ✓ | 12-toegangsbeleid: MFA-eis opnemen, mitigatie documenteren |
| 7 | Is uw organisatie geregistreerd bij de bevoegde autoriteit (naam, adres, IP-bereiken, sector, lidstaten)? | Art. 3 lid 4 + Art. 27 NIS2 | ✓ | Registratie indienen bij RDI, DNB, IGJ, ILT of ACM naar gelang sector |
| 8 | Is er een Verklaring van Toepasselijkheid (VvT) waarin de NIS2-delta (meldplicht, CVD, bestuursaansprakelijkheid) expliciet is opgenomen naast de ISO 27001 Annex A-controls? | Art. 21 NIS2 + ISO 27001 clausule 6.1.3 | ✓ | 05-vvt-statement-applicability aanvullen |

---

## 7. Vervolg

Na invulling van deze quick-check ontvangt u een gerichte gap-rapportage waarin per ontbrekende maatregel een concreet implementatieadvies staat. De gap-analyse onderscheidt drie niveaus:

1. **ISO 27001-certificering ontbreekt of is onvolledig** — fundament nog te bouwen.
2. **ISO 27001 aanwezig maar NIS2-specifieke dossiers ontbreken** — gerichte aanvulling van meldprocedure, bestuursverklaring en CVD-procedure volstaat.
3. **Alle dossiers aanwezig maar niet aantoonbaar getest** — jaarlijkse oefening continuïteitsplan, incidentresponsoefening en meldprocedure-test als prioriteit.

Voor toetsing en signoff kan Annex27 optreden als Lead Auditor bij uw pre-audit, voorafgaand aan de officiële certificeringsaudit door een geaccrediteerde CI, of bij voorbereiding op toezichtsbezoek door RDI, DNB, IGJ, ILT of ACM.

---

*Document opgesteld op basis van Richtlijn (EU) 2022/2555 (EUR-Lex CELEX 32022L2555, NL-versie 27.12.2022), de Cyberbeveiligingswet (Cbw) als Nederlandse implementatie, NEN-EN-ISO/IEC 27001:2023 en NEN-EN-ISO/IEC 27002:2022. Alle verwijzingen naar NIS2-artikelen zijn verifieerbaar via EUR-Lex. Bij specifieke vragen over toepassing op uw situatie: info@annex27.nl.*
