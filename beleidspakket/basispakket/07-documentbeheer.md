# Documentbeheerprocedure

**ISO 27001:2022 — Clause 7.5**

| | |
|---|---|
| **Documentnummer** | ISMS-007 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze procedure beschrijft hoe gedocumenteerde informatie binnen het ISMS van [Organisatienaam] wordt aangemaakt, goedgekeurd, gedistribueerd, gewijzigd, gearchiveerd en vernietigd. Correct documentbeheer is een voorwaarde voor certificering en voorkomt dat verouderde of ongeautoriseerde documenten in omloop zijn.

## 2. Toepassingsgebied

Alle gedocumenteerde informatie die onderdeel uitmaakt van het ISMS, waaronder:

- Beleids- en proceduredocumenten
- Registraties en logboeken (auditlogs, incidentregistraties, notulen)
- Formulieren en templates
- Externe documenten die relevant zijn voor het ISMS (normen, wetteksten, contracten)

## 3. Documentstructuur

### 3.1 Hiërarchie

| Niveau | Type | Beschrijving | Voorbeeld |
|---|---|---|---|
| 1 | Beleid | Overkoepelende principes en uitgangspunten, goedgekeurd door directie | Informatiebeveiligingsbeleid |
| 2 | Procedure | Beschrijft hoe een proces wordt uitgevoerd (wie, wat, wanneer) | Incident Response Plan |
| 3 | Werkinstructie | Gedetailleerde stap-voor-stap instructies | Handleiding MFA-configuratie |
| 4 | Registratie | Bewijs van uitgevoerde activiteiten | Auditrapport, incidentlog |

### 3.2 Documentnummering

Elk ISMS-document krijgt een uniek nummer:

```
ISMS-[NNN]
```

- ISMS = vaste prefix
- NNN = volgnummer (001 t/m 999)

### 3.3 Verplichte metadata

Elk document bevat minimaal:

| Veld | Beschrijving |
|---|---|
| Documentnummer | Unieke identificatie |
| Versie | Major.Minor (bijv. 1.0, 1.1, 2.0) |
| Classificatie | Openbaar / Intern / Vertrouwelijk / Geheim |
| Eigenaar | Verantwoordelijke voor inhoud en actualiteit |
| Goedgekeurd door | Naam en functie van goedkeurder |
| Datum goedkeuring | Datum waarop huidige versie is goedgekeurd |
| Volgende review | Uiterlijke datum voor herbeoordeling |

## 4. Levenscyclus van documenten

### 4.1 Aanmaken

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Behoefte identificeren (nieuw beleid, procedure of registratie) | CISO / Proceseigenaar |
| 2 | Document opstellen volgens template en metadata-eisen | Auteur |
| 3 | Documentnummer toekennen | CISO |

### 4.2 Review en goedkeuring

| Documentniveau | Reviewer | Goedkeurder |
|---|---|---|
| Beleid (niveau 1) | CISO | Directie |
| Procedure (niveau 2) | Proceseigenaar | CISO |
| Werkinstructie (niveau 3) | Teamleider | Proceseigenaar |
| Registratie (niveau 4) | N.v.t. | N.v.t. (wordt vastgelegd) |

### 4.3 Distributie en beschikbaarheid

- Goedgekeurde documenten worden gepubliceerd op [documentmanagementsysteem / SharePoint / intranet / Annex27 platform]
- Medewerkers worden geïnformeerd over nieuwe of gewijzigde documenten via [e-mail / Teams / intranet]
- Verouderde versies worden verwijderd uit circulatie of duidelijk gemarkeerd als "VERVALLEN"
- Externe partijen ontvangen documenten uitsluitend na goedkeuring door de CISO

### 4.4 Wijzigen

| Stap | Actie |
|---|---|
| 1 | Wijzigingsvoorstel indienen bij documenteigenaar |
| 2 | Wijziging doorvoeren in het document |
| 3 | Versienummer ophogen (minor wijziging: 1.0 → 1.1, major: 1.x → 2.0) |
| 4 | Versiebeheer-tabel bijwerken met beschrijving van de wijziging |
| 5 | Review en goedkeuring doorlopen (zelfde procedure als nieuw document) |
| 6 | Vorige versie archiveren, nieuwe versie publiceren |

### 4.5 Archiveren

- Vervallen versies worden gearchiveerd en bewaard voor minimaal **3 jaar** (of langer indien wettelijk vereist)
- Gearchiveerde documenten zijn alleen toegankelijk voor de CISO en auditors
- Archief is beschermd tegen ongeautoriseerde wijziging of verwijdering

### 4.6 Vernietigen

- Documenten worden vernietigd na afloop van de bewaartermijn
- Vertrouwelijke en geheime documenten worden veilig vernietigd (digitaal: permanent verwijderen; fysiek: versnipperen)
- Vernietiging wordt geregistreerd

## 5. Beheer van externe documenten

Externe documenten die relevant zijn voor het ISMS (bijv. normen, wetteksten, contracten) worden:

- Geregistreerd in de documentenlijst
- Periodiek gecontroleerd op actualiteit
- Beschikbaar gesteld aan relevante medewerkers

## 6. Documentenregister

| Nr | Documentnaam | Versie | Eigenaar | Goedgekeurd | Volgende review | Classificatie | Locatie |
|---|---|---|---|---|---|---|---|
| ISMS-001 | ISMS Scope Document | 1.0 | [Naam] | [Datum] | [Datum] | Intern | [Locatie] |
| ISMS-002 | Informatiebeveiligingsbeleid | 1.0 | [Naam] | [Datum] | [Datum] | Intern | [Locatie] |
| ... | ... | ... | ... | ... | ... | ... | ... |

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
