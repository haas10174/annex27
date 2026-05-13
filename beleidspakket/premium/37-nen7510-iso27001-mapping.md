# NEN 7510 — ISO 27001:2023 / 27002:2022 Mapping

**Versie document:** 1.0
**Datum:** 2026-05-13
**Doelgroep:** Zorginstellingen (ziekenhuizen, GGZ, huisartsenposten, revalidatiecentra) en leveranciers van zorg-IT (EPD-leveranciers, hostingproviders, zorgserviceproviders) die NEN 7510-conformiteit moeten aantonen naast of op basis van hun ISO 27001-implementatie.

**Bronnen:** NEN 7510-1:2024, NEN 7510-2:2024+A1:2026, NCS 7510:2025. Uitgegeven door NEN (Stichting Koninklijk Nederlands Normalisatie Instituut). Vastgesteld door normcommissie 303006 'Informatievoorziening in de zorg'.

---

## 1. Wat is NEN 7510

NEN 7510 is het Nederlandse normenkader voor informatiebeveiliging in de zorg. Het bestaat uit twee delen:

- **NEN 7510-1:2024 — Managementsysteem.** Bevat de eisen (geformuleerd met 'moeten') voor het inrichten, implementeren, in stand houden en continu verbeteren van een ISMS. De structuur is identiek aan **NEN-EN-ISO/IEC 27001:2023**: hoofdstukken 4 t/m 10 zijn opgenomen, aangevuld met bijlage A met zorgspecifieke beheersmaatregelen (HLT-codes).
- **NEN 7510-2:2024+A1:2026 — Beheersmaatregelen.** Gebaseerd op **NEN-EN-ISO/IEC 27002:2022**, aangevuld met zorgspecifieke beheersmaatregelen en implementatierichtlijnen gebaseerd op ISO 27799:2025. Per beheersmaatregel staat in de linkerkolom de generieke ISO-maatregel en in de rechterkolom de zorgspecifieke aanvulling.

### De vier controlfamilies

NEN 7510-2 volgt de structuur van ISO 27002:2022:

| Familie | Hoofdstuk | Aantal controls (incl. HLT) |
|---|---|---|
| Organisatorische beheersmaatregelen | 5.x | 37 (incl. 6 HLT) |
| Mensgerichte beheersmaatregelen | 6.x | 9 (incl. 1 HLT) |
| Fysieke beheersmaatregelen | 7.x | 14 |
| Technologische beheersmaatregelen | 8.x | 35 (incl. 1 HLT) |

### Relatie met NEN 7512 en NEN 7513

NEN 7510 is niet de enige zorgnorm voor informatiebeveiliging:

- **NEN 7512** — beveiliging van gegevensuitwisseling *tussen* partijen die niet in hetzelfde beveiligingsdomein zitten. Uitwisseling via netwerken zoals het LSP (Landelijk Schakelpunt) en VZVZ-diensten valt hieronder.
- **NEN 7513** — logging van persoonlijke gezondheidsinformatie. Specificeert een gemeenschappelijk kader voor toegangs-, zoek- en uitwisselingsgebeurtenissen in zorginformatiesystemen. NEN 7513 werkt de logeisen uit bijlage A van NEN 7510-1 en beheersmaatregel 8.15 van NEN 7510-2 uit; het bevat ook eisen over bewaartermijnen van logbestanden en onweerlegbaarheid van logregels.

### Certificering via NCS 7510

NEN 7510-conformiteit wordt gecertificeerd via het **NCS 7510:2025-certificatieschema** door geaccrediteerde certificatie-instellingen (CI's). De CI's worden geaccrediteerd door de **Raad voor Accreditatie (RvA)**. NCS 7510:2025 vervangt NCS 7510:2018 en is gebaseerd op NEN-EN-ISO/IEC 27006-1:2024.

NCS 7510 onderscheidt twee clusters:

- **Cluster Z** — zorginstellingen (rechtspersonen die bedrijfsmatig zorg verlenen, inclusief solistisch werkende zorgverleners).
- **Cluster B** — beheerders van persoonlijke gezondheidsinformatie die geen zorginstelling zijn (medische laboratoria, hostingproviders, EPD-leveranciers, zorgserviceproviders, gemeenten).

**Belangrijk:** Een NEN 7510-certificaat omvat ISO 27001. Wanneer een organisatie gecertificeerd is volgens NEN 7510-1, hoeft voor ISO 27001-conformiteit geen aparte certificering te worden behaald. Omgekeerd geldt: toevoegen van NEN 7510 aan een bestaande ISO 27001-certificering is mogelijk via een speciale uitbreidingsaudit (NCS 7510:2025 § 9.6.4.1).

---

## 2. Wgbo, AVG en overige wettelijke context

NEN 7510-1 (bijlage C) erkent expliciet dat invoering en naleving van de norm voortvloeien uit wetgeving. De relevante wettelijke verplichtingen voor informatiebeveiliging in de zorg zijn:

### Wet op de geneeskundige behandelingsovereenkomst (Wgbo)

- **Dossierplicht** (Wgbo art. 7:454 BW): de hulpverlener is verplicht een dossier in te richten met de gegevens betreffende de gezondheid van de patiënt en de uitgevoerde verrichtingen.
- **Bewaartermijn** (Wgbo art. 7:454 lid 3 BW): het dossier moet worden bewaard gedurende **20 jaar** na de laatste wijziging, of zoveel langer als redelijkerwijs voortvloeit uit de zorg van een goed hulpverlener. Deze termijn is significant langer dan de generieke ISO 27001-benadering voor documentbewaring.
- **Geheimhoudingsplicht** (Wgbo art. 7:457 BW): de hulpverlener is verplicht tot geheimhouding tegenover derden. Deze plicht geldt ook voor functionarissen die in dienstbetrekking werkzaam zijn bij de hulpverlener.

### Wet BIG (Beroepen in de Individuele Gezondheidszorg)

- **Beroepsgeheim** (Wet BIG art. 88): beroepsbeoefenaren met een BIG-registratie (artsen, verpleegkundigen, apothekers, fysiotherapeuten e.a.) zijn gehouden aan het beroepsgeheim. Schending kan leiden tot tuchtrechtelijke en strafrechtelijke gevolgen. NEN 7510-2 § 6.6 vereist dat al het personeel met toegang tot persoonlijke gezondheidsinformatie formeel tot vertrouwelijkheid wordt verplicht.

### AVG art. 9 — Bijzondere persoonsgegevens

Gezondheidsgegevens zijn **bijzondere persoonsgegevens** in de zin van art. 9 AVG. Verwerking is alleen toegestaan op basis van een wettelijke uitzondering (art. 9 lid 2 AVG), zoals het verlenen van medische zorg (art. 9 lid 2 sub h) of toestemming van de betrokkene. De Autoriteit Persoonsgegevens verwijst op haar website naar NEN 7510 als invulling van art. 32 AVG (passende technische en organisatorische maatregelen) voor de zorgsector.

### Wet gebruik BSN in de zorg (Wbsn-z)

Zorgaanbieders zijn verplicht het **Burgerservicenummer (BSN)** te gebruiken voor de unieke identificatie van patiënten. Dit vloeit voort uit NEN 7510-2 beheersmaatregel 5.39 (HLT): elke zorgontvanger moet op unieke wijze binnen het systeem kunnen worden geïdentificeerd. Het BSN mag uitsluitend door daartoe bevoegde partijen worden verwerkt.

### Wet elektronische gegevensuitwisseling in de zorg (Wegiz)

De Wegiz verplicht zorgaanbieders tot elektronische gegevensuitwisseling voor aangewezen zorgprocessen (o.a. Medicatieoverdracht, Basisgegevensset Zorg). Beveiliging van deze uitwisseling valt onder NEN 7512. De Wegiz is direct relevant voor de implementatie van NEN 7510-2 § 5.14 (overdragen van informatie) en verwijzingen naar NEN 7512.

### Wet aanvullende bepalingen verwerking persoonsgegevens in de zorg (Wabvpz)

De Wabvpz verplicht zorgaanbieders een elektronisch uitwisselingssysteem te beveiligen conform NEN 7510. Art. 3 van het Besluit elektronische gegevensverwerking door zorgaanbieders (Begz) noemt de NEN 7510-reeks expliciet als de manier waarop een elektronisch uitwisselingssysteem veilig en zorgvuldig kan worden gebruikt.

### Wet kwaliteit, klachten en geschillen zorg (Wkkgz)

Verplichting tot goede, veilige en doelmatige zorg. Informatiebeveiligingsincidenten die de patiëntveiligheid raken vallen onder de meldplicht calamiteiten (art. 11 Wkkgz).

### Wzd (Wet zorg en dwang) / Wvggz (Wet verplichte ggz)

Voor gedwongen zorg gelden aanvullende vertrouwelijkheidseisen voor de bijzonder gevoelige categorieën geestelijke gezondheidsinformatie.

### Toezicht

- **Inspectie Gezondheidszorg en Jeugd (IGJ)**: toetst of zorgaanbieders aantoonbaar een werkend ISMS hebben. De IGJ gebruikt NEN 7510-1 en NEN 7510-2 bij het Toetsingskader Digitale Zorg.
- **Autoriteit Persoonsgegevens (AP)**: toezicht op naleving van de AVG. De AP verwijst naar NEN 7510 voor de zorgsector.
- **Z-CERT**: het Computer Emergency Response Team voor de zorgsector. Deelname aan Z-CERT is relevant voor informatie-uitwisseling over dreigingen (NEN 7510-2 § 5.7).

---

## 3. Mapping per controlfamilie

Hieronder per ISO 27002:2022-familie de zorgspecifieke aanvullingen uit NEN 7510-2, met verwijzing naar het Annex27-beleidsdocument. Beheersmaatregelen waarvoor NEN 7510-2 geen zorgspecifieke aanvulling heeft, vereisen toepassing van de generieke ISO 27002:2022-implementatierichtlijn. Dit wordt per sectie aangegeven.

### 3.1 Organisatorische beheersmaatregelen (5.x)

| NEN 7510-2-maatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis (zorgspecifiek) |
|---|---|---|---|
| **5.2 + zorgspecifiek** | Rollen en verantwoordelijkheden IB | 04-rollen-verantwoordelijkheden | Ten minste één persoon formeel verantwoordelijk voor IB. Grotere organisaties (>500 medewerkers of >10.000 cliënten) behoren een adviesgroep voor IB te hebben met vertegenwoordigers van clinici, ICT en management. Topmanagement is eindverantwoordelijk. |
| **5.3 zorgspecifiek** | Functiescheiding | 04-rollen-verantwoordelijkheden | Veel zorgprofessionals wisselen voortdurend van rol (arts superviseert en behandelt tegelijk). Conflicterende functies zover mogelijk scheiden; resterende conflicten en mitigerende maatregelen vastleggen. |
| **5.7 zorgspecifiek** | Dreigingsinformatie | 25-threat-intelligence | Rekening houden met specifieke dreigingen voor medische apparaten (beperkingen op patching/updates vanwege klinische veiligheid), verouderde hardware/software in zorginstellingen, complexe asset-inventarisatie. Aansluiting bij **Z-CERT** overwegen voor sectorale dreigingsinformatie. |
| **5.8 zorgspecifiek** | IB in projectmanagement | werkinstructies/A5-organisatorisch | Veiligheid en privacy ook integraal onderdeel van projectbeheer. Patiëntveiligheidsrisico's expliciet meenemen in risicoafweging bij nieuw of gewijzigd zorginformatiesysteem. |
| **5.9 + zorgspecifiek** | Inventarisatie bedrijfsmiddelen | 11-assetregister-en-classificatie | Alle informatiestromen (zowel binnen als tussen organisaties) en de interfaces daarvan (waaronder integratieplatforms) opnemen in de inventarisatie. Speciale aandacht voor medische apparaten die gegevens registreren, verwerken of rapporteren. |
| **5.11 + zorgspecifiek** | Retourneren bedrijfsmiddelen | 09-hr-beleid | Schriftelijke bevestiging vereist dat alle bedrijfsmiddelen (incl. informatie op privé-apparatuur en cloudopslag) zijn geretourneerd of veilig verwijderd bij einde dienstverband of functiewisseling. |
| **5.12 + zorgspecifiek** | Classificatie | 11-assetregister-en-classificatie | **Persoonlijke gezondheidsinformatie uniform als vertrouwelijk classificeren.** Binnen persoonlijke gezondheidsinformatie kan differentiatie noodzakelijk zijn (soa, geestelijke gezondheid, genetische gegevens). Bijzondere aandacht voor biometrische en genetische gegevens. |
| **5.13 zorgspecifiek** | Labelen van informatie | 11-assetregister-en-classificatie | Gebruikers van zorginformatiesystemen behoren te weten wanneer zij toegang hebben tot persoonlijke gezondheidsinformatie. Aanduiding bijv. bij opstarten of inloggen. |
| **5.14 + zorgspecifiek** | Overdracht van informatie | 32-netwerk-communicatie | Voordat overdracht plaatsvindt regels, procedures en overeenkomsten vaststellen. Persoonlijke gezondheidsinformatie via e-mail of instant messaging beveiligen of helemaal niet via onbeveiligde kanalen uitwisselen. Beveiliging van uitwisseling uitgewerkt in **NEN 7512**. |
| **5.15 + zorgspecifiek** | Toegangsbeveiliging | 12-toegangsbeleid | **Op rollen gebaseerde toegangsbeveiliging (RBAC) voor persoonlijke gezondheidsinformatie.** Toegang beperken tot behandelteamleden, activiteiten namens de zorgontvanger, en specifiek benodigde gegevens. "Break-the-glass" procedure voor noodtoegang met logging. Beheersmodellen passend bij professionele, ethische en juridische eisen. |
| **5.16 zorgspecifiek** | Identiteitsbeheer | 12-toegangsbeleid | Identiteitsbeheer afgestemd op zorgspecifieke authenticatiemiddelen. Zie ook Wbsn-z: gebruik BSN voor unieke patiëntidentificatie. |
| **5.18 zorgspecifiek** | Toegangsrechten | 12-toegangsbeleid | Speciale aandacht bij grote aantallen kortdurend toeganghebbend personeel (studenten, stagiairs, vervangers, uitzendkrachten). Transacties die pas later worden afgetekend (bijv. medische transcripties) meenemen bij ontwerp van verwijderprocedures. Onmiddellijke beëindiging bij verhoogd risico bij ontslag. |
| **5.19 + zorgspecifiek** | Leveranciersbeveiliging | 23-leveranciersbeleid + 24-leverancier-assessment | Risico's externe toegang beoordelen en passende maatregelen implementeren. Alle persoonlijke gezondheidsinformatie waartoe leveranciers toegang kunnen hebben (incl. cloud, support, training, testen) versleutelen. Voor medische apparaten waar versleuteling niet mogelijk is: compenserende maatregelen op basis van risicobeoordeling. Rechten zorgontvangers beschermen ook als leverancier in ander rechtsgebied zit. |
| **5.21 zorgspecifiek** | ICT-toeleveringsketen | 23-leveranciersbeleid | Voor medische apparaten die gegevens registreren, verwerken of rapporteren: fabrikanten behoren MDS2 (Manufacturer Disclosure Statement for Medical Device Security), configuratie-eisen, kwetsbaarheidsanalyses en SBOM (Software Bill of Materials) te leveren. |
| **5.24 zorgspecifiek** | Incidentbeheer planning | 19-incident-response | IB-incidenten niet los beoordelen van andere incidenten. Inbraak kan leiden tot hardware-diefstal (vertrouwelijkheidsbreuk); brand kan ICT-misbruik verhullen; systeem-misbruik kan klinische gevolgen hebben. Alle incident-typen opnemen in incidentbeheerproces. |
| **5.25 zorgspecifiek** | Beoordeling IB-gebeurtenissen | 19-incident-response | In categorisering en prioritering rekening houden met: zijn klinische activiteiten beïnvloed? Was persoonlijke gezondheidsinformatie betrokken? Waren medische apparaten betrokken? |
| **5.30 zorgspecifiek** | ICT-continuïteit | 20-bcp | Processen en systemen vitaal voor zorgverlening identificeren. Noodprocedures voor uitval opnemen in continuïteitsplanning, inclusief werken met papieren formulieren. Regelmatige getrapte testen (desktop t/m volledige oefening). Veiligheid van zorgontvangers afhankelijk van gegevenstoegang meenemen in planning. Bij uitval vastgelegde gegevens na herstel controleren op juistheid en volledigheid. |
| **5.34 zorgspecifiek** | Privacy en persoonsgegevens | 33-avg-privacy | Toegang tot persoonlijke gezondheidsinformatie alleen bij legitieme noodzaak. Aparte toegangsrestricties mogelijk voor gevoelige categorieën (soa, GGZ, contraceptie, zwangerschap). Zorgontvangers kunnen specificeren welke registraties toegankelijk zijn. VIP-/alias-registraties voor bijzonder gevoelige personen. Elke toegang inclusief noodtoegang loggen; onbevoegde pogingen of verdachte patronen direct signaleren. |
| **5.35 zorgspecifiek** | Onafhankelijke beoordeling | 21-interne-audit | Bij beoordeling gebruik maken van reviewers met begrip van gezondheidszorgsector vanwege onderlinge afhankelijkheden tussen klinische veiligheid en informatiebeveiliging. |
| **5.36 zorgspecifiek** | Naleving beleid | 22-management-review | Auditprogramma van 12 tot 18 maanden dekking alle elementen NEN 7510, alle risicogebieden en alle geïmplementeerde beheersmaatregelen. Getrapt kader: zelfaudit door proceseigenaren, interne audit, externe audit. |
| **5.38 HLT** | Analyse en specificatie IB-eisen | werkinstructies/A5-organisatorisch | IB-eisen opnemen in eisen voor nieuwe of gewijzigde zorginformatiesystemen. Patiëntveiligheidsrisico's meenemen. Vroegtijdig integreren in ontwerpstadium. |
| **5.39 HLT** | Unieke identificatie zorgontvangers | 12-toegangsbeleid | Beleid en processen die waarborgen dat elke zorgontvanger **uniek wordt geïdentificeerd** (BSN conform Wbsn-z). Dubbele registraties moeten samengevoegd kunnen worden. In noodsituaties ontstane meervoudige registraties zorgvuldig samenvoegen. |
| **5.40 HLT** | Validatie getoonde/geprinte gegevens | werkinstructies/A8-technologisch | Zorginformatiesystemen tonen bij geprinte of getoonde gegevens altijd informatie waarmee de zorgontvanger op wie de gegevens betrekking hebben, kan worden geïdentificeerd. Pagineringscontrole ("pagina 3 van 5"). |
| **5.41 HLT** | Openbaar beschikbare gezondheidsinformatie | 02-informatiebeveiligingsbeleid | Openbaar beschikbare gezondheidsinformatie (bijsluiters, diagnose-informatie) beschermd, bewaard en beheerd gedurende volledige levenscyclus. Integriteit en herkomst controleerbaar. Volledig audittraject van wijzigingen. |
| **5.42 HLT** | Communicatie in noodsituaties | 20-bcp | **Noodcommunicatiekanalen** die werken zonder ICT van de organisatie: plannen, implementeren, onderhouden en testen. Voorbeelden: mobiele communicatie, papieren formulieren voor laboratoriumaanvragen. |
| **5.43 HLT** | Incidenten extern melden | 19-incident-response | Meldverplichtingen inventariseren (IGJ calamiteitenmeldplicht, AP meldplicht datalekken, Z-CERT). Verantwoordelijken per melding aanwijzen. Topmanagement altijd informeren bij externe melding. |

> *Beheersmaatregelen 5.1, 5.4, 5.5, 5.6, 5.10, 5.17, 5.20, 5.22, 5.23, 5.26, 5.27, 5.28, 5.29, 5.31, 5.32, 5.33, 5.37: geen specifieke NEN 7510-zorgaanvulling — ISO 27002:2022 implementatierichtlijn geldt.*

### 3.2 Mensgerichte beheersmaatregelen (6.x)

| NEN 7510-2-maatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis (zorgspecifiek) |
|---|---|---|---|
| **6.1 zorgspecifiek** | Screening | 09-hr-beleid | Screeningsbeleid omvat minimaal: verificatie identiteit, actueel adres en eerdere dienstverbanden. Verificatie toepasselijke BIG-kwalificaties en licentie/accreditatie. Indien van toepassing: controle strafblad. Alle controles regelmatig herhalen. |
| **6.2 + zorgspecifiek** | Arbeidsovereenkomst | 09-hr-beleid | In functiebeschrijvingen de beveiligingsrollen en verantwoordelijkheden vermelden die van toepassing zijn op verwerking van persoonlijke gezondheidsinformatie. Geldt ook voor tijdelijk personeel: vervangers, stagiairs, studenten, oproepkrachten, vrijwilligers. Plicht tot melden van beveiligingsschendingen opnemen. |
| **6.3 zorgspecifiek** | Bewustwording en training | 10-awareness-trainingsplan | Bewustzijn, opleiding en training omvatten regelmatige toetsen. Bijzondere aandacht voor **social engineering** in de zorg: imitatie van clinici, familieleden van patiënten, politie of schoolmedewerkers. Direct melden van pogingen tot social engineering stimuleren. |
| **6.4 zorgspecifiek** | Disciplinaire procedure | 09-hr-beleid | Voor ernstige overtredingen: externe melding overwegen bij beroepsregistratie-instantie (BIG-register, tuchtcollege) of academische instelling (stagiairs). |
| **6.5 zorgspecifiek** | Verantwoordelijkheden na dienstverband | 09-hr-beleid | Clinici in opleidingsprogramma's met functieroulatie: elke functieverandering verwerken als beëindiging voor wat betreft toegangsrechten die niet langer noodzakelijk zijn. |
| **6.6 + zorgspecifiek** | Geheimhoudingsovereenkomsten | 09-hr-beleid | **Al het personeel met toegang tot persoonlijke gezondheidsinformatie formeel tot vertrouwelijkheid verplichten.** Formele verbintenis via ondertekende overeenkomst of beroepscode (Wgbo-geheimhoudingsplicht, Wet BIG art. 88). |
| **6.8 zorgspecifiek** | Melden IB-gebeurtenissen | 19-incident-response | Vroeg melden stimuleren zonder angst voor beschuldigingen; anoniem melden overwegen. Zorgontvanger informeren als niet-beschikbaarheid of integriteitsverlies van gezondheidsinformatie negatieve gevolgen voor zorgverlening heeft gehad. Zorgontvanger altijd informeren bij ongepaste openbaarmaking van persoonlijke gezondheidsinformatie. |
| **6.9 HLT** | Managementtraining | 10-awareness-trainingsplan | Management passende training geven voor hun IB-rollen en verantwoordelijkheden. Hiaatanalyse per functie uitvoeren. Herhalen bij managementwisseling. **Crisismanagementsimuaties** (ransomware, datalekken) opnemen in managementtraining. |

> *Beheersmaatregelen 6.7: geen specifieke NEN 7510-zorgaanvulling — ISO 27002:2022 implementatierichtlijn geldt.*

### 3.3 Fysieke beheersmaatregelen (7.x)

| NEN 7510-2-maatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis (zorgspecifiek) |
|---|---|---|---|
| **7.1 zorgspecifiek** | Fysieke beveiligingszones | 15-fysiek-beveiligingsbeleid | Zorgontvangers zijn aanwezig in operationele zones. Beveiliging werkstations mag niet volledig afhangen van buitensluiten van zorgontvangers. Rekening houden met niet-rationeel gedrag (kinderen, psychiatrische patiënten, verwarde personen). ICT-apparatuur van zorgontvangers die zelf niet voor beveiliging kunnen zorgen, beschermen. |
| **7.2 zorgspecifiek** | Fysieke toegangsbeveiliging | 15-fysiek-beveiligingsbeleid | Extra voorzorgsmaatregelen in zones waar persoonlijke gezondheidsinformatie zichtbaar is op schermen. Schermen met patiëntgegevens zo plaatsen dat deze niet leesbaar zijn voor andere bezoekers of wachtenden. |
| **7.6 zorgspecifiek** | Werken in beveiligde zones | werkinstructies/A7-fysiek | Time-out en automatisch uitloggen correct configureren. In specifieke klinische gebieden (OK, IC) kunnen time-outs noodgedwongen uitgeschakeld zijn: passende procedures vereist om ongeautoriseerd gebruik te voorkomen. |
| **7.8 zorgspecifiek** | Plaatsen en beschermen apparatuur | 15-fysiek-beveiligingsbeleid | Medische apparaten die gegevens registreren, verwerken of rapporteren hebben speciale overwegingen m.b.t. elektromagnetische emissies. Blootstelling minimaliseren bij plaatsing. |
| **7.9 zorgspecifiek** | Bedrijfsmiddelen buiten terrein | 30-mobile-remote-working | Autorisatie vereist voor gebruik van medische apparaten buiten het terrein. Geldt ook voor ambulancepersoneel en therapeuten die structureel op locatie werken, en voor apparaten die door zorgontvangers worden gebruikt. |
| **7.10 + zorgspecifiek** | Opslagmedia | werkinstructies/A7-fysiek | **Alle persoonlijke gezondheidsinformatie op verwijderbare media (USB, SD, SIM) versleutelen.** Ingebouwde opslag in printers, kopieerapparaten en medische apparaten meenemen in beleid voor onderhoud, reparatie en verwijdering. |
| **7.11 zorgspecifiek** | Nutsvoorzieningen | 15-fysiek-beveiligingsbeleid | Noodstroomvoorzieningen voor medische en ICT-apparatuur; rekening houden met spanningsvariaties bij omschakeling. Regelmatig testen van noodstroomvoorzieningen. Aanvullende UPS-noodvoeding voor kritieke apparatuur. |
| **7.12 zorgspecifiek** | Beveiligen bekabeling | 15-fysiek-beveiligingsbeleid | Ongeautoriseerde toegang via netwerkstopcontacten in publiek toegankelijke zones voorkomen: ongebruikte poorten uitschakelen, ongeautoriseerde apparaatverbindingen detecteren. Bescherming stopcontacten tegen beschadiging door kinderen op kinderziekenhuisafdelingen. |
| **7.13 zorgspecifiek** | Onderhoud apparatuur | werkinstructies/A7-fysiek | Veiligheid van zorgontvangers meenemen bij onderhoud. Onderhoudsplan met risicobeoordeling schriftelijk goedkeuren door topmanagement vóór uitvoering. Speciale zorg bij onderhoud op afstand of door derden. |
| **7.14 zorgspecifiek** | Veilig verwijderen apparatuur | werkinstructies/A7-fysiek | Vrijwel alle digitale apparatuur — inclusief medische apparaten, printers en netwerkapparatuur — kan (gezondheids)informatie bevatten in niet-vluchtige opslag. Verwijderingsprotocollen voor medische hulpmiddelen omvatten ontsmetting én verwijdering van opslagmedia. |

> *Beheersmaatregelen 7.3, 7.4, 7.5, 7.7: geen specifieke NEN 7510-zorgaanvulling — ISO 27002:2022 implementatierichtlijn geldt.*

### 3.4 Technologische beheersmaatregelen (8.x)

| NEN 7510-2-maatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis (zorgspecifiek) |
|---|---|---|---|
| **8.5 + zorgspecifiek** | Beveiligde authenticatie | 13-wachtwoordbeleid | **Minimaal tweefactorauthenticatie (2FA) voor alle systemen die persoonlijke gezondheidsinformatie verwerken.** Speciale aandacht voor authenticatie van zorgontvangers die toegang hebben tot hun eigen gegevens (rekening houdend met aandoeningen en beperkingen). Gevolmachtigden van zorgontvangers meenemen. |
| **8.6 zorgspecifiek** | Capaciteitsbeheer | werkinstructies/A8-technologisch | Snel toenemend aandeel medische apparaten op het netwerk (IoT) meenemen in capaciteitsbeheer. Ook patiëntentertainmentsystemen en gastnetwerken. |
| **8.10 zorgspecifiek** | Wissen van informatie | 27-data-retention-deletion | Rekening houden met informatie op apparaten die niet door de organisatie worden beheerd (BYOD). |
| **8.13 + zorgspecifiek** | Back-up | 31-backup-recovery | **Back-ups van persoonlijke gezondheidsinformatie versleutelen.** Offline opslag of onveranderlijke back-uptechniek overwegen als maatregel tegen ransomware. |
| **8.15 zorgspecifiek** | Logging | 18-logging-monitoring | Logeisen voor toegang tot patiëntdossiers conform **NEN 7513**: onweerlegbare vastlegging van toegangs- en uitwisselingsgebeurtenissen, met minimale en maximale bewaartermijnen per logtype. |
| **8.18 zorgspecifiek** | Speciale systeemhulpmiddelen | 12-toegangsbeleid | Professionals uit verschillende disciplines (ICT en medisch) kunnen overlappende verantwoordelijkheden hebben voor specifieke apparatuur. Beleid en procedures hiermee in overeenstemming brengen. |
| **8.19 zorgspecifiek** | Software-installatie | 17-patch-kwetsbaarheidsbeheer | Gecertificeerde medische software kan verbieden dat beveiligingspatches worden uitgevoerd. Bekende kwetsbaarheden in zulke systemen en de compenserende maatregelen registreren. |
| **8.21 zorgspecifiek** | Beveiliging netwerkdiensten | 32-netwerk-communicatie | Uitval van netwerkdiensten heeft directe klinische impact. Continuïteitsplanning (5.30 / 5.42) meenemen. |
| **8.23 zorgspecifiek** | Webfilters | werkinstructies/A8-technologisch | Beleid voor het voorkomen van onjuiste blokkering van voor de gezondheidszorg relevante content (anatomische termen, afbeeldingen van verwondingen, drugsgebruik in medische context). Fout-positieven onmiddellijk beoordelen. |
| **8.26 zorgspecifiek** | Toepassingsbeveiligingseisen | werkinstructies/A8-technologisch | Persoonlijke gezondheidsinformatie kan verborgen zitten in betalingsinformatie of vergoedingsgegevens. Metadata van communicatie over patiënten kan PGI bevatten. Expliciet identificeren en beveiligen. |
| **8.29 zorgspecifiek** | Beveiligingstesten | werkinstructies/A8-technologisch | Acceptatiecriteria voor nieuwe zorginformatiesystemen definiëren. **Klinische gebruikers betrekken** bij testen van klinisch relevante systeemfuncties. |
| **8.31 zorgspecifiek** | Scheiding omgevingen | werkinstructies/A8-technologisch | Ontwikkel-, test- en trainingsomgevingen voor zorginformatiesystemen scheiden van productieomgevingen. **Geen echte persoonlijke gezondheidsinformatie als testgegevens** gebruiken. |
| **8.32 zorgspecifiek** | Wijzigingsbeheer | 29-change-management | Ongepaste wijzigingen aan verwerking van persoonlijke gezondheidsinformatie kunnen nadelige gevolgen hebben voor zorgverlening en patiëntveiligheid. Risico's expliciet registreren, beoordelen en beheersen in het wijzigingsproces. |
| **8.33 zorgspecifiek** | Testgegevens | werkinstructies/A8-technologisch | Geen daadwerkelijke persoonlijke gezondheidsinformatie als testgegevens. Testgegevens moeten wel realistisch zijn (zie ook 8.11 maskeren van gegevens). |
| **8.35 HLT** | Zero trust-beginselen | 12-toegangsbeleid + 32-netwerk-communicatie | Netwerksegmenten zo klein mogelijk houden. Toegang van het ene netwerksegment naar het andere alleen na wederzijdse authenticatie van beide segmenten. |

> *Beheersmaatregelen 8.1, 8.2, 8.3, 8.4, 8.7, 8.8, 8.9, 8.11, 8.12, 8.14, 8.16, 8.17, 8.20, 8.22, 8.24, 8.25, 8.27, 8.28, 8.30, 8.34: geen specifieke NEN 7510-zorgaanvulling — ISO 27002:2022 implementatierichtlijn geldt.*

---

## 4. Wat dekt een ISO 27001:2023-certificaat?

Een ISO 27001:2023-certificering dekt het **hele ISMS-kader** en de basis van alle 93 beheersmaatregelen uit Annex A / ISO 27002:2022. NEN 7510 vult dit aan op drie niveaus.

### Wat ISO 27001:2023 wel dekt

- Alle ISMS-processen: context (hfst. 4), leiderschap (hfst. 5), planning (hfst. 6), ondersteuning (hfst. 7), uitvoering (hfst. 8), evaluatie (hfst. 9), verbetering (hfst. 10).
- De generieke inhoud van alle 93 beheersmaatregelen inclusief implementatierichtlijnen uit ISO 27002:2022.
- Risicobeoordeling en risicobehandeling met Verklaring van Toepasselijkheid.

### Wat ISO 27001:2023 niet automatisch dekt

| Delta | NEN 7510-referentie |
|---|---|
| **Zorgspecifieke risicoanalyse**: patiëntveiligheidsrisico's als onderdeel van de risicobeoordelingsmethodiek | NEN 7510-1 § 6.1.2 + NEN 7510-2 § 5.38 HLT |
| **Bewaartermijn patiëntdossier 20 jaar** (Wgbo art. 7:454 BW) als expliciete eis in dataretenties en registratiebescherming | NEN 7510-2 § 5.33 + Wgbo |
| **NEN 7513-logeisen** voor toegang tot patiëntdossier: onweerlegbaarheid, specifieke bewaartermijnen per logtype, toegang door patiënt zelf via portaal loggen | NEN 7510-2 § 8.15 zorgspecifiek |
| **NEN 7512-eisen** voor gegevensuitwisseling: beveiliging van uitwisseling tussen partijen in verschillende beveiligingsdomeinen | NEN 7510-1 § 0.1.5 |
| **Tweefactorauthenticatie verplicht** voor alle systemen met persoonlijke gezondheidsinformatie | NEN 7510-1 bijlage A / 8.5 zorgspecifiek |
| **Versleuteling van back-ups** van persoonlijke gezondheidsinformatie | NEN 7510-1 bijlage A / 8.13 zorgspecifiek |
| **Versleuteling van verwijderbare media** met persoonlijke gezondheidsinformatie | NEN 7510-1 bijlage A / 7.10 zorgspecifiek |
| **Unieke identificatie zorgontvangers** (BSN-verplichting, Wbsn-z) | NEN 7510-1 bijlage A 5.39 HLT |
| **Break-the-glass** noodtoegangsprocedure met logging | NEN 7510-2 § 5.15 zorgspecifiek |
| **Noodcommunicatie** zonder ICT van de organisatie (5.42 HLT) | NEN 7510-1 bijlage A 5.42 HLT |
| **SBOM en MDS2** voor medische apparaten in de ICT-toeleveringsketen | NEN 7510-2 § 5.21 zorgspecifiek |
| **Zero trust-beginselen** voor netwerksegmenten in zorgomgevingen | NEN 7510-1 bijlage A 8.35 HLT |
| **NCS 7510-certificering** door geaccrediteerde CI voor zorgspecifieke conformiteitsbeoordeling | NCS 7510:2025 |
| **IGJ-toetsing** via Toetsingskader Digitale Zorg, meldplicht calamiteiten (Wkkgz), **AP-meldplicht** datalekken met gezondheidsgegevens | Wettelijk, niet via ISO 27001 |

---

## 5. Voor zorginstellingen en leveranciers: hoe NEN 7510-conformiteit aantonen

### Zorginstellingen (cluster Z)

Buitenlandse zorginstellingen komen niet in aanmerking voor een NEN 7510-certificaat. Het toepassingsgebied van de certificering moet altijd ten minste één primair gezondheidszorgproces omvatten.

1. **NEN 7510-certificaat** (geaccrediteerd door RvA via NCS 7510:2025) — primair bewijs van conformiteit. Een NEN 7510-certificaat impliceert automatisch ISO 27001-conformiteit.
2. **Verklaring van Toepasselijkheid** met alle zorgspecifieke beheersmaatregelen uit bijlage A van NEN 7510-1 opgenomen of gemotiveerd uitgesloten. Bij gecombineerde toetsing NEN 7510-1 + ISO 27001 worden twee afzonderlijke certificaten afgegeven.
3. **NEN 7513-implementatie** voor logging van toegang tot elektronische cliëntdossiers (incl. bewaartermijnen), aan te tonen via configuratiedocumentatie van het EPD/HIS-systeem.
4. **NEN 7512-conformiteit** voor elke gegevensuitwisseling met externe partijen via gezondheidsinformatienetwerken (VZVZ, LSP, ZorgMail, Wegiz-koppelingen).
5. **Calamiteitenregistratie** en meldprocedures IGJ en AP: aantonen dat IB-incidenten met patiëntveiligheidsimpact geregistreerd en gemeld worden.

### Leveranciers van zorg-IT (cluster B)

Cluster B-organisaties komen in aanmerking voor een NEN 7510-certificaat als zij aantonen dat zij een rechtmatigheid hebben voor verwerking van persoonlijke gezondheidsinformatie (conform AVG) en dat hun VvT zorgspecifieke beheersmaatregelen bevat die voortvloeien uit de risicobeoordeling.

1. **NEN 7510-certificaat of ISO 27001-certificaat met aantoonbare NEN 7510-gap-aanpak** — bij EPD-leveranciers en hostingproviders voor zorg is het NEN 7510-certificaat steeds vaker contractuele eis.
2. **Verwerkersovereenkomst (DPA)** afgestemd op de zorginstelling als verwerkingsverantwoordelijke (AVG art. 28), inclusief rechten van de zorginstelling op audits en sub-verwerkersbeheer.
3. **MDS2 en SBOM** voor medische hulpmiddelen (5.21 NEN 7510-2): fabrikanten leveren bij elk product een Manufacturer Disclosure Statement for Medical Device Security.
4. **VvT met zorgspecifieke maatregelen**: minimaal 2FA (8.5), versleuteling back-ups (8.13), versleuteling verwijderbare media (7.10), NEN 7513-compliant logging (8.15).
5. **Gap-rapport NEN 7510** waaruit blijkt welke zorgspecifieke maatregelen zijn geïmplementeerd en welke nog open staan.

---

## 6. Quick-check voor uw organisatie

Acht vragen met verwijzing naar de NEN 7510-maatregel:

| # | Vraag | Verwijzing | Antwoord ja → conform | Antwoord nee → te bouwen |
|---|---|---|---|---|
| 1 | Is er ten minste één persoon formeel verantwoordelijk aangewezen voor informatiebeveiliging, met rapportagelijn naar topmanagement? | NEN 7510-2 § 5.2 zorgspecifiek | Conform | FG/CISO-rol inrichten met expliciete verantwoordelijkheid |
| 2 | Is tweefactorauthenticatie geïmplementeerd voor alle systemen die persoonlijke gezondheidsinformatie verwerken? | NEN 7510-1 bijlage A / 8.5 | Conform | 2FA-uitrol plannen; compenserende maatregelen definiëren waar 2FA niet mogelijk is |
| 3 | Worden back-ups van persoonlijke gezondheidsinformatie versleuteld opgeslagen, met ransomware-bestendige back-upstrategie (offline/immutable)? | NEN 7510-1 bijlage A / 8.13 | Conform | Versleuteld back-upbeleid implementeren |
| 4 | Is de bewaartermijn voor patiëntdossiers op 20 jaar ingesteld conform de Wgbo, en zijn retentieprocedures hierop ingericht? | NEN 7510-2 § 5.33 + Wgbo art. 7:454 | Conform | Data-retentiebeleid aanpassen aan wettelijke bewaartermijn |
| 5 | Voldoet de logging van toegang tot patiëntdossiers aan NEN 7513 (onweerlegbaar, correct bewaard, inclusief toegang via patiëntportaal)? | NEN 7510-2 § 8.15 + NEN 7513 | Conform | NEN 7513-gap-analyse uitvoeren en EPD-logging aanpassen |
| 6 | Is een noodcommunicatieplan aanwezig voor zorgverlening bij volledige ICT-uitval (zonder afhankelijkheid van organisatie-ICT)? | NEN 7510-1 bijlage A 5.42 HLT | Conform | Noodcommunicatieplan schrijven, implementeren en testen |
| 7 | Is een break-the-glass procedure ingericht voor noodtoegang tot patiëntdossiers, met automatische logging van elke noodtoegang? | NEN 7510-2 § 5.15 zorgspecifiek | Conform | Noodtoegangsprocedure inrichten met verplichte logging en nacontrole |
| 8 | Bent u gecertificeerd of in certificeringstraject voor NEN 7510-1 via een door RvA geaccrediteerde CI (NCS 7510:2025)? | NCS 7510:2025 | Conform | Gap-analyse NEN 7510 uitvoeren; certificeringstraject starten bij geaccrediteerde CI |

---

## 7. Vervolg

Na invulling van deze quick-check ontvangt u een gerichte gap-rapportage waarin per ontbrekende zorgmaatregel een concreet implementatieadvies staat, inclusief koppeling aan uw bestaande Annex27-beleidsdocumenten. Voor organisaties die al ISO 27001-gecertificeerd zijn, kan Annex27 als Lead Auditor de uitbreidingsaudit NEN 7510 begeleiden (NCS 7510:2025 § 9.6.4.1), zodat het NEN 7510-certificaat aan het bestaande ISO 27001-certificaat wordt toegevoegd zonder duplicering van het auditwerk.

Voor zorginstellingen die nog geen ISMS hebben en direct via NEN 7510 willen certificeren: het NEN 7510-certificaat omvat automatisch ISO 27001-conformiteit. U hoeft beide normen dus niet afzonderlijk te certificeren.

---

*Document opgesteld op basis van NEN 7510-1:2024, NEN 7510-2:2024+A1:2026 en NCS 7510:2025, uitgegeven door NEN (Stichting Koninklijk Nederlands Normalisatie Instituut). Vastgesteld door normcommissie 303006 'Informatievoorziening in de zorg'. Alle verwijzingen naar zorgspecifieke beheersmaatregelen volgen de NEN 7510-nummering. Bij specifieke vragen over toepassing op uw situatie: info@annex27.nl.*
