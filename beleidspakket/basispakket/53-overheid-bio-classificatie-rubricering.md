# BIO-classificatie en rubricering (overheid)

**BIO 2.0 (Baseline Informatiebeveiliging Overheid) / VIR-BI 2013 / ISO 27001:2022 — A.5.12, A.5.13**

| | |
|---|---|
| **Documentnummer** | ISMS-053 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Informatiebeveiligingsfunctionaris] |
| **Goedgekeurd door** | [Naam Directie / College van B&W] |
| **Reviewcyclus** | Jaarlijks + bij wijziging BIO |

---

## 1. Doel

Deze procedure beschrijft hoe [Organisatienaam] persoons- en bedrijfsinformatie classificeert en rubriceert conform de Baseline Informatiebeveiliging Overheid (BIO 2.0) en het Voorschrift Informatiebeveiliging Rijksdienst Bijzondere Informatie (VIR-BI). Het bepaalt welke beveiligingsmaatregelen verplicht zijn per categorie.

## 2. Reikwijdte

Alle informatie in [Organisatienaam], digitaal en fysiek, met inbegrip van:
- Bestuurlijke documenten (collegebesluiten, raadsstukken, beleidsnota's)
- Burger- en bedrijfsdossiers (BRP, KVK, leveranciersregister)
- Zaakdossiers en archief
- Personeelsdossiers
- Communicatie met andere overheden, ketenpartners en burgers
- Concept-documenten en interne werkbestanden

## 3. BIO-classificatie (BBN)

BIO 2.0 hanteert drie Beveiligings-Basisniveaus (BBN):

| BBN | Toepassing | Hoofdkenmerken |
|---|---|---|
| **BBN1** | Standaard openbare en interne informatie | Basismaatregelen, lagere risico's |
| **BBN2** | Persoonsgegevens, gevoelige bedrijfsinformatie | Verhoogde maatregelen, AVG-impact |
| **BBN3** | Bijzondere persoonsgegevens, strafrechtelijke gegevens, kritieke infrastructuur | Strengste maatregelen, mogelijke NIS2-overlap |

Naast BBN gelden waarderingen voor BIV (Beschikbaarheid, Integriteit, Vertrouwelijkheid). Per BBN bepaalt het classificatie-besluit welke specifieke maatregelen verplicht zijn (zie BIO 2.0 hoofdstuk 5 t/m 8).

## 4. VIR-BI rubricering (voor Rijksinformatie)

Voor Rijksdiensten en organisaties die met Rijksinformatie werken, gelden naast BIO de VIR-BI-rubriceringen:

| Rubricering | Wat | Wie ziet het |
|---|---|---|
| **Departementaal vertrouwelijk** | Beleidsstukken in voorbereidingsfase | Beperkt tot betrokkenen |
| **Staatsgeheim Confidentieel** | Gevoelige overheidsinformatie | Geautoriseerde personen met clearance |
| **Staatsgeheim Geheim** | Hoogste gevoeligheid | Strikt vooraf bepaalde personen |
| **Staatsgeheim Zeer Geheim** | Maximaal gevoelig | Uitsluitend op need-to-know basis |

Voor organisaties die niet onder VIR-BI vallen (gemeenten, provincies, ZBO's) zijn alleen BIO en de eigen rubriceringsprotocollen relevant.

## 5. Classificatie-besluit en eigenaarschap

| Rol | Verantwoordelijkheid |
|---|---|
| **Informatie-eigenaar** | Stelt classificatie vast bij creatie van informatie |
| **CISO / IB-officer** | Adviseert, toetst, escaleert bij twijfel |
| **FG** | Beoordeelt classificatie bij persoonsgegevens |
| **Archivaris** | Borgt classificatie bij overdracht naar archief |

De informatie-eigenaar wordt formeel benoemd per processen-categorie. Bij twijfel valt de classificatie uit op de **hogere** waardering.

## 6. Classificatie aanbrengen (technisch en visueel)

| Drager | Hoe wordt classificatie zichtbaar gemaakt |
|---|---|
| Word, PowerPoint, PDF | Header/footer met BBN-label en rubricering |
| E-mail | Subject-prefix `[BBN2]` of `[Dep.Vertrouwelijk]` |
| Fysiek dossier | Label op map + stempel op document |
| Database-records | Veld `classificatie` met BBN + rubricering |
| SharePoint / DMS | Metadata-veld + automatische toegangssturing |
| Logboek / audit | Classificatie wordt mee-gelogd bij toegang |

## 7. Beveiligingsmaatregelen per classificatie

Beknopte mapping op enkele kerngebieden:

| Maatregel | BBN1 | BBN2 | BBN3 |
|---|---|---|---|
| Encryptie at-rest | Aanbevolen | Verplicht | Verplicht + sleutelbeheer HSM |
| Encryptie in-transit | TLS 1.2+ | TLS 1.2+ | TLS 1.3 + perfect forward secrecy |
| MFA | Aanbevolen voor admin | Verplicht voor alle gebruikers | Verplicht + sterke factor (FIDO2, smartcard) |
| Logging-detail | Standaard | Uitgebreid + alerting | Volledig + onafhankelijke log-omgeving |
| Bewaring na vernietiging | Standaard | Veilig wissen | Gegarandeerde wisprocedure (DoD-stijl) |
| Toegang door derden | Verwerkersovereenkomst | VWO + DPIA | Strikte beperking + clearance |
| Vervoer fysiek | Standaard koerier | Vertrouwelijke koerier | Persoonlijke geleide door geautoriseerde |

Voor de volledige mapping per BBN: zie BIO 2.0 hoofdstuk 5-8.

## 8. Herclassificatie

Informatie kan herwaardering vereisen:
- **Verlaging** mogelijk indien gevoeligheid verdwenen is (bijv. publicatie raadsbesluit). Formeel besluit nodig.
- **Verhoging** verplicht zodra gevoeligere context ontstaat (bijv. raakvlakken kritieke infrastructuur, koppeling met persoonsgegevens).
- Beslissingen worden vastgelegd in het informatie-eigenaar-register.

## 9. Awareness en training

Bij indiensttreding ontvangt elke medewerker met toegang tot informatie een BIO-classificatie-instructie (1 uur, e-learning + handout). Jaarlijks volgt een refresh met focus op gemaakte fouten van het afgelopen jaar.

## 10. Toezicht en rapportage

| Frequentie | Inhoud | Door |
|---|---|---|
| Per kwartaal | Steekproef classificaties van nieuwe informatie | CISO + FG |
| Halfjaarlijks | Mis-classificatie-incidenten + remediatie | CISO |
| Jaarlijks | BIO-volwassenheidsrapportage aan directie | CISO |
| Bij elke verandering | Update van classificatie-procedure | Informatie-eigenaren |

---

**Bijlagen**
- Bijlage A: Classificatie-template per document-type
- Bijlage B: Beslisboom classificatie (BBN1/2/3)
- Bijlage C: Voorbeelden van correcte en onjuiste classificatie

**Gerelateerde documenten**
- [[ISMS-014 Classificatiebeleid (algemeen)]]
- [[ISMS-040 Datalekprocedure]]
- [[36 BIO 2.0 ↔ ISO 27001-mapping]]
- [[VIR-BI 2013]]
