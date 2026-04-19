# Register van Verwerkingsactiviteiten (RoPA)

**AVG Art. 30 — ISO 27001:2022 A.5.34, A.8.12**

| | |
|---|---|
| **Documentnummer** | ISMS-030 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk (bevat PII-categorieën) |
| **Eigenaar** | [Naam Data Protection Officer / Privacy Officer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ — minimaal jaarlijks] |

---

## 1. Doel

Dit document vormt het **Register van Verwerkingsactiviteiten** (Record of Processing Activities, RoPA) zoals verplicht gesteld door **Artikel 30 van de Algemene Verordening Gegevensbescherming (AVG/GDPR)**. Het register biedt een volledig overzicht van alle persoonsgegevens die [Organisatienaam] verwerkt, waarom, hoe, en met welke waarborgen.

Een bijgewerkt en correct RoPA is:

- **Wettelijk verplicht** voor elke verwerkingsverantwoordelijke met >250 medewerkers, én voor elke organisatie (ongeacht grootte) die structureel persoonsgegevens verwerkt, gevoelige categorieën verwerkt, of risicovolle verwerkingen uitvoert
- **Toonaangevend bewijs** voor toezichthouders (Autoriteit Persoonsgegevens NL, Gegevensbeschermingsautoriteit BE) bij audit of datalek
- **Kernbron** voor DPIA's, inzage-verzoeken (Art. 15), wisselverzoeken (Art. 17), en datalek-meldingen (Art. 33-34)

## 2. Toepassingsgebied

Dit register omvat **alle verwerkingsactiviteiten** waarbij [Organisatienaam] optreedt als:

- **Verwerkingsverantwoordelijke** (controller) — de organisatie bepaalt doel en middelen
- **Verwerker** (processor) — de organisatie verwerkt namens een opdrachtgever, op diens instructie

Separate registers worden bijgehouden voor beide rollen (zie §5 voor controller-register, §6 voor processor-register).

## 3. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| **Directie** | Eindverantwoordelijk voor naleving AVG. Keurt RoPA-beleid jaarlijks goed. |
| **Data Protection Officer / Privacy Officer** | Onderhoudt het register. Toetst nieuwe verwerkingen. Intakegesprek bij significant wijziging. |
| **CISO / IB-verantwoordelijke** | Waarborgt samenhang met ISMS (classificatie, risicobeoordeling, beveiligingsmaatregelen). |
| **Proceseigenaren** | Leveren input per verwerking: doelbinding, betrokkenen, rechtsgrond, bewaartermijn. Melden wijzigingen. |
| **IT-beheer** | Documenteert technische beveiligingsmaatregelen + locaties van opslag (systemen, cloudproviders). |
| **Alle medewerkers** | Signaleren nieuwe verwerkingen of wijzigingen aan proceseigenaar of DPO. |

## 4. Wanneer registreren / bijwerken

Het RoPA wordt bijgewerkt **uiterlijk binnen 30 dagen** na:

- Het starten van een nieuwe verwerkingsactiviteit
- Het wijzigen van doel, rechtsgrond of bewaartermijn
- Toevoegen of wijzigen van een (sub)verwerker
- Toevoegen van een categorie persoonsgegevens of betrokkenen
- Wijziging in overdrachten buiten de EER
- Significant wijziging in beveiligingsmaatregelen

Jaarlijks wordt het volledige register **minimaal één keer integraal beoordeeld** door de DPO, ongeacht of er wijzigingen zijn geweest.

## 5. Register — [Organisatienaam] als verwerkingsverantwoordelijke

Voor **elke verwerkingsactiviteit** worden minimaal de volgende velden bijgehouden conform AVG Art. 30 lid 1:

| # | Veld | Toelichting |
|---|---|---|
| 1 | **Naam verwerking** | Korte, unieke naam (bijv. "HR-administratie medewerkers") |
| 2 | **Proceseigenaar** | Naam + functie (verantwoordelijke binnen de organisatie) |
| 3 | **Doel van de verwerking** | Specifiek, welbepaald, gerechtvaardigd (niet "algemeen ondernemersdoel") |
| 4 | **Rechtsgrond (Art. 6 AVG)** | Toestemming / Overeenkomst / Wettelijke verplichting / Vitaal belang / Openbaar belang / Gerechtvaardigd belang |
| 5 | **Rechtsgrond bijzondere categorieën (Art. 9)** | Indien van toepassing: uitdrukkelijke toestemming, arbeidsrecht, vitaal belang etc. |
| 6 | **Categorieën betrokkenen** | Medewerkers / Klanten / Leveranciers / Kandidaten / Websitebezoekers / Minderjarigen |
| 7 | **Categorieën persoonsgegevens** | Identificerend (naam, BSN), contact (e-mail, telefoon), financieel (IBAN), biometrisch, gezondheid, strafrechtelijk, etc. |
| 8 | **Ontvangers** | Interne afdelingen + externe partijen (leveranciers, overheden) |
| 9 | **Overdrachten buiten EER** | Land + passende waarborgen (Adequaatheidsbesluit / SCC / BCR) |
| 10 | **Bewaartermijn** | Concrete termijn + rechtsgrond (wettelijk, contractueel, belang) |
| 11 | **Technische maatregelen** | Encryptie, pseudonimisering, access control, logging |
| 12 | **Organisatorische maatregelen** | Beleid, training, autorisatiematrix, DPA's |
| 13 | **DPIA uitgevoerd?** | Ja/Nee + datum + koppeling naar DPIA-document |
| 14 | **Datum laatste review** | DD-MM-JJJJ |

### 5.1 Sjabloon-entry (vul aan per verwerking)

| Veld | Voorbeeld: HR-administratie medewerkers |
|---|---|
| Proceseigenaar | [Naam HR-manager] |
| Doel | Uitvoering arbeidsovereenkomst, loonadministratie, opleidingen, verzuimregistratie |
| Rechtsgrond (Art. 6) | Art. 6(1)(b) uitvoering overeenkomst + Art. 6(1)(c) wettelijke verplichting (belastingrecht, sociale zekerheid) |
| Rechtsgrond bijzonder (Art. 9) | Art. 9(2)(b) arbeidsrecht — voor eventuele gezondheids-/verzuimgegevens |
| Betrokkenen | Medewerkers (vast + flex) + sollicitanten |
| Persoonsgegevens | Naam, adres, BSN, contactgegevens, loongegevens, IBAN, functie, verzuimdata, beoordelingen |
| Ontvangers | HR-afdeling, direct leidinggevenden (beperkt), salarisadministratie (extern), Belastingdienst, UWV, pensioenfonds |
| Overdrachten buiten EER | Geen. [Of: specifieke provider + SCC-basis + land] |
| Bewaartermijn | Arbeidsovereenkomst + 7 jaar (fiscaal) · sollicitatiegegevens 4 weken (2 jaar met toestemming) · verzuim 2 jaar na afronding |
| Technische maatregelen | Encryptie at-rest, MFA op HRM-systeem, audit-logs, rol-gebaseerde toegang |
| Organisatorische maatregelen | DPA met salarisadministrateur, functiescheiding, awareness-training, clean-desk-beleid |
| DPIA | Niet vereist (standaardverwerking arbeidsrecht) |
| Laatste review | [DD-MM-JJJJ] |

### 5.2 Typische verwerkingen die in RoPA thuishoren

Voor een MKB-organisatie zijn dit de verwerkingen die vrijwel altijd in het register horen. Voeg toe wat van toepassing is:

- HR-administratie medewerkers
- Werving &amp; selectie kandidaten
- Klantadministratie (CRM)
- Facturatie &amp; debiteurenbeheer
- Leveranciers-/crediteurenadministratie
- Nieuwsbrief / marketing communicatie
- Website-tracking (cookies, analytics)
- Camerabewaking (indien aanwezig)
- Toegangscontrole gebouw (badges, logs)
- Helpdesk / klantenservice tickets
- Training &amp; certificeringsregistratie medewerkers
- Incident-management (log gegevens betrokken personen)
- Verzuim / BHV-registratie

## 6. Register — [Organisatienaam] als verwerker

Indien [Organisatienaam] persoonsgegevens verwerkt **namens** een opdrachtgever (bijv. SaaS-dienst, consultant, IT-dienstverlener), geldt AVG Art. 30 lid 2 met een iets ander velden-set:

| # | Veld | Toelichting |
|---|---|---|
| 1 | **Opdrachtgever (controller)** | Naam + contactgegevens + DPO-contactpersoon |
| 2 | **Dienst / contract-referentie** | Welke dienst wordt geleverd |
| 3 | **Categorieën verwerkingen** | Wat doen we met de data (hosten, analyseren, archiveren) |
| 4 | **Overdrachten buiten EER** | Land + waarborgen |
| 5 | **Gebruikte (sub)verwerkers** | Derde partijen die u inschakelt — met goedkeuring opdrachtgever |
| 6 | **Technische &amp; organisatorische maatregelen** | Samengevat — gekoppeld aan ISMS |
| 7 | **VWO / DPA** | Datum ondertekening + wijzigingshistorie |

## 7. Documentatie &amp; toegankelijkheid

- Het RoPA wordt onderhouden in [tooling: Excel-workbook / GRC-tool / Notion / wettelijk verplicht maar formaat vrij].
- Toegang tot het register is beperkt tot DPO, directie, CISO en aangewezen proceseigenaren.
- Een **versimpelde publieke samenvatting** (Privacy Statement) wordt op de website gepubliceerd.
- Bij een verzoek van de toezichthouder (AP / GBA) kan het register binnen 24 uur worden aangeleverd.
- Het register wordt minimaal **2 jaar** na beëindiging van een verwerkingsactiviteit bewaard.

## 8. Relatie tot andere documenten

Het RoPA is het centrale referentiedocument en verbindt:

- **DPIA-template** (ISMS-029) — voor verwerkingen met hoog risico
- **AVG &amp; Privacybeleid** (ISMS-033) — publieksgerichte verklaring
- **Leveranciersregister** (A.5.19) — voor processor-relaties
- **Incident Response Plan** (ISMS-019) — bij datalek: welke verwerking is getroffen?
- **Classificatiebeleid** (ISMS-014) — hoe persoonsgegevens zijn gelabeld

## 9. Audit-trail &amp; wijzigingshistorie

Elke mutatie in het register wordt vastgelegd met:

- Datum wijziging
- Wie heeft gewijzigd (auth-user)
- Wat is gewijzigd (veld + voor/na-waarde)
- Reden van de wijziging
- Goedkeurder (indien vereist voor significant wijzigingen)

Mutatie-geschiedenis wordt minimaal **5 jaar** bewaard.

## 10. KPI's en monitoring

| KPI | Doelstelling | Meting |
|---|---|---|
| Volledigheid register | 100% van actieve verwerkingen gedocumenteerd | Jaarlijkse interne audit |
| Review-frequentie | Elke verwerking minimaal 12 maanden geleden gereviewed | Maandelijks overzicht DPO |
| Nieuwe verwerkingen binnen 30 dagen geregistreerd | ≥95% | Steekproef bij audit |
| Tijdigheid datalek-melding (72u) | 100% | Per incident |
| Aantal DPIA's uitgevoerd | Alle hoog-risico-verwerkingen | Jaarlijkse review |

## 11. Ondertekening

| | |
|---|---|
| **Naam Directie** | [Naam] |
| **Handtekening** | ________________________ |
| **Datum** | [DD-MM-JJJJ] |
| **Naam DPO / Privacy Officer** | [Naam] |
| **Handtekening** | ________________________ |
| **Datum** | [DD-MM-JJJJ] |
