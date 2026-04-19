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

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" width="100%" style="max-width:640px;display:block;margin:16pt auto;">
  <defs>
    <marker id="arrDoc" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#94A3B8"/>
    </marker>
  </defs>
  <text x="320" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Documentstructuur — 4 niveaus van abstract naar concreet</text>
  <rect x="180" y="40" width="280" height="50" rx="10" fill="#0F172A"/>
  <text x="320" y="62" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Niveau 1 — BELEID</text>
  <text x="320" y="80" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="10">wat wordt er geregeld · directie-goedgekeurd</text>
  <line x1="320" y1="90" x2="320" y2="118" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrDoc)"/>
  <rect x="150" y="122" width="340" height="50" rx="10" fill="#0D9488"/>
  <text x="320" y="144" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Niveau 2 — PROCEDURE</text>
  <text x="320" y="162" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="10">hoe wordt het gedaan · wie · wanneer</text>
  <line x1="320" y1="172" x2="320" y2="200" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrDoc)"/>
  <rect x="120" y="204" width="400" height="50" rx="10" fill="#F59E0B"/>
  <text x="320" y="226" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Niveau 3 — WERKINSTRUCTIE</text>
  <text x="320" y="244" text-anchor="middle" fill="#FEF3C7" font-family="Inter, Helvetica, Arial" font-size="10">stap-voor-stap · screenshots · tooling-specifiek</text>
  <line x1="320" y1="254" x2="320" y2="282" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrDoc)"/>
  <rect x="90" y="286" width="460" height="50" rx="10" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
  <text x="320" y="308" text-anchor="middle" fill="#075985" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Niveau 4 — REGISTRATIE</text>
  <text x="320" y="326" text-anchor="middle" fill="#075985" font-family="Inter, Helvetica, Arial" font-size="10">bewijs van uitvoering · auditrapporten · logs · notulen</text>
</svg>

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
