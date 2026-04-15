# Fysiek Beveiligingsbeleid

**ISO 27001:2022 — A.7.1, A.7.2, A.7.3, A.7.4, A.7.7**

| | |
|---|---|
| **Documentnummer** | ISMS-015 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam Facilitair / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft de maatregelen voor fysieke beveiliging van locaties, apparatuur en informatie van [Organisatienaam]. Fysieke beveiliging beschermt tegen ongeautoriseerde toegang, diefstal, schade en omgevingsdreigingen.

## 2. Beveiligingszones

| Zone | Beschrijving | Toegang | Voorbeelden |
|---|---|---|---|
| **Zone 1 — Openbaar** | Toegankelijk voor bezoekers en publiek | Onbeperkt | Receptie, wachtruimte, parkeerplaats |
| **Zone 2 — Beperkt** | Algemene kantoorruimte, alleen medewerkers en begeleide bezoekers | Badge / sleutel | Kantoorvloeren, vergaderruimtes |
| **Zone 3 — Beveiligd** | Ruimtes met gevoelige informatie of apparatuur | Badge + registratie | IT-werkruimtes, archiefruimtes |
| **Zone 4 — Hoog beveiligd** | Kritieke infrastructuur | Badge + PIN/biometrie + logboek | Serverruimte, kluisruimte |

## 3. Fysieke toegangsbeveiliging (A.7.1, A.7.2)

### 3.1 Toegangscontrole medewerkers

- Toegang tot zone 2+ vereist een persoonlijke bedrijfsbadge of sleutel
- Badges zijn persoonlijk en niet-overdraagbaar
- Verlies van een badge wordt onmiddellijk gemeld; de badge wordt direct gedeactiveerd
- Tailgating (meeliften door een deur) is niet toegestaan

### 3.2 Bezoekers

| Stap | Actie |
|---|---|
| 1 | Bezoekers melden zich bij de receptie en worden geregistreerd (naam, bedrijf, contactpersoon, tijdstip) |
| 2 | Bezoekers ontvangen een zichtbaar bezoekerspas |
| 3 | Bezoekers worden te allen tijde begeleid in zone 2+ |
| 4 | Bezoekers hebben geen onbegeleide toegang tot zone 3 of 4 |
| 5 | Bij vertrek wordt de bezoekerspas ingeleverd en het tijdstip geregistreerd |

### 3.3 Serverruimte / Zone 4

- Toegang uitsluitend voor geautoriseerd IT-personeel
- Toegang wordt gelogd (badge + tijdstip)
- Bezoekers (bijv. onderhoudstechnici) alleen onder begeleiding en na goedkeuring CISO
- Deur is voorzien van automatische sluiting

## 4. Beveiliging van kantoren en faciliteiten (A.7.3)

- Buitendeuren en ramen zijn voorzien van adequate sloten
- Alarmsysteem is actief buiten werktijd
- Waardevolle apparatuur (servers, netwerkapparatuur) staat in afsluitbare ruimtes
- Brandblussers en rookmelders zijn aanwezig en periodiek geïnspecteerd

## 5. Monitoring (A.7.4)

| Maatregel | Locatie | Bewaarperiode beelden |
|---|---|---|
| Camerabewaking (indien aanwezig) | Entree, serverruimte, parkeerplaats | [30 dagen] conform AVG |
| Toegangslogging (badge) | Alle zones 2+ | Minimaal 1 jaar |
| Inbraakdetectie / alarmsysteem | Pand | Meldingen: 1 jaar |

Camerabewaking geschiedt conform de AVG: medewerkers en bezoekers worden geïnformeerd via borden bij de ingang.

## 6. Clean Desk & Clear Screen (A.7.7)

### 6.1 Clean desk

- Vertrouwelijke documenten worden aan het einde van de werkdag opgeborgen in een afsluitbare kast of lade
- Vergaderruimtes worden na gebruik gecontroleerd op achtergelaten documenten of whiteboardnotities
- Vertrouwelijke prints worden direct opgehaald bij de printer
- Prullenbakken bij werkplekken bevatten geen vertrouwelijke documenten (gebruik versnipperaar)

### 6.2 Clear screen

- Werkstations worden vergrendeld bij het verlaten van de werkplek, ook bij korte afwezigheid
- Automatische schermvergrendeling is ingesteld op maximaal 5 minuten inactiviteit
- Schermen zijn zo gepositioneerd dat onbevoegden niet mee kunnen lezen (privacy-screens waar nodig)

## 7. Bescherming van apparatuur

- Laptops worden niet onbeheerd achtergelaten in publieke ruimtes
- Apparatuur die buiten het pand wordt gebruikt, wordt beveiligd met encryptie (BitLocker / FileVault)
- Defecte opslagmedia (harde schijven, USB) worden veilig vernietigd voordat ze worden afgevoerd

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
