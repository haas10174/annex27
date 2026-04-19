# Classificatiebeleid

**ISO 27001:2022 — A.5.12, A.5.13**

| | |
|---|---|
| **Documentnummer** | ISMS-014 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid definieert de classificatieniveaus voor informatie binnen [Organisatienaam] en beschrijft hoe informatie per niveau moet worden behandeld, gelabeld, opgeslagen, gedeeld en vernietigd.

## 2. Classificatieniveaus

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 340" width="100%" style="max-width:640px;display:block;margin:16pt auto;">
  <text x="320" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Informatieclassificatie — 4 niveaus (pyramide van gevoeligheid)</text>
  <polygon points="80,280 560,280 470,240 170,240" fill="#10B981"/>
  <text x="320" y="266" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">OPENBAAR</text>
  <polygon points="170,240 470,240 400,200 240,200" fill="#F59E0B"/>
  <text x="320" y="226" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">INTERN</text>
  <polygon points="240,200 400,200 360,160 280,160" fill="#EA580C"/>
  <text x="320" y="186" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">VERTROUWELIJK</text>
  <polygon points="280,160 360,160 340,120 300,120" fill="#DC2626"/>
  <text x="320" y="146" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="700">GEHEIM</text>
  <text x="580" y="146" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">← ernstige schade</text>
  <text x="580" y="186" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">← schade aan business</text>
  <text x="580" y="226" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">← ongewenst openbaar</text>
  <text x="580" y="266" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">← publiek toegankelijk</text>
  <line x1="560" y1="150" x2="560" y2="270" stroke="#CBD5E1" stroke-width="1"/>
  <g transform="translate(30, 300)">
    <text x="0" y="0" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="700">Indicatieve maatregelen per niveau</text>
    <text x="0" y="16" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">• Geheim: E2E-encryptie · 2-persoonsregel · dedicated systeem · audit per toegang</text>
    <text x="0" y="30" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">• Vertrouwelijk: encryptie at-rest + transit · MFA · access-review per 3 mnd</text>
  </g>
</svg>

| Niveau | Kleurcode | Beschrijving | Voorbeelden |
|---|---|---|---|
| **Openbaar** | Groen | Informatie die vrij beschikbaar is of mag zijn voor het publiek | Website-inhoud, marketingmateriaal, persberichten |
| **Intern** | Geel | Informatie die bedoeld is voor interne medewerkers; openbaarmaking is ongewenst maar niet schadelijk | Interne nieuwsbrieven, procedures, organogrammen, vergadernotulen |
| **Vertrouwelijk** | Oranje | Informatie waarvan openbaarmaking schade kan toebrengen aan de organisatie, klanten of partners | Klantgegevens, contracten, financiële rapporten, persoonsgegevens, projectplannen |
| **Geheim** | Rood | Informatie waarvan openbaarmaking ernstige schade kan toebrengen | Wachtwoorden, encryptiesleutels, strategische plannen, M&A-informatie, medische dossiers |

## 3. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| **Informatie-eigenaar** | Classificeert de informatie bij aanmaak of ontvangst |
| **Gebruiker** | Behandelt informatie conform het classificatieniveau |
| **CISO** | Bewaakt naleving, adviseert over classificatie bij twijfel |
| **IT-beheer** | Implementeert technische maatregelen per classificatieniveau |

## 4. Behandeling per classificatieniveau

### 4.1 Opslag

| | Openbaar | Intern | Vertrouwelijk | Geheim |
|---|---|---|---|---|
| Onbeveiligde opslagmedia | Toegestaan | Niet aanbevolen | Verboden | Verboden |
| Bedrijfsnetwerk / cloud (goedgekeurd) | Toegestaan | Toegestaan | Toegestaan | Toegestaan (met encryptie) |
| Privéapparatuur | Toegestaan | Verboden | Verboden | Verboden |
| USB / externe media | Toegestaan | Niet aanbevolen | Alleen met encryptie | Verboden |
| Encryptie at rest | Niet vereist | Niet vereist | Vereist | Vereist |

### 4.2 Verzending / delen

| | Openbaar | Intern | Vertrouwelijk | Geheim |
|---|---|---|---|---|
| Onbeveiligde e-mail | Toegestaan | Toegestaan | Verboden | Verboden |
| Beveiligde e-mail (versleuteld / beveiligde link) | Toegestaan | Toegestaan | Toegestaan | Toegestaan |
| Goedgekeurde samenwerkingsplatformen | Toegestaan | Toegestaan | Toegestaan | Met extra toestemming CISO |
| Publieke filesharing (WeTransfer, Google Drive privé) | Toegestaan | Verboden | Verboden | Verboden |
| Printen | Toegestaan | Toegestaan | Met direct ophalen | Alleen op beveiligde printer |

### 4.3 Vernietiging

| | Openbaar | Intern | Vertrouwelijk | Geheim |
|---|---|---|---|---|
| Digitaal: normaal verwijderen | Toegestaan | Toegestaan | Verboden | Verboden |
| Digitaal: permanent wissen | N.v.t. | N.v.t. | Vereist | Vereist |
| Papier: recycling | Toegestaan | Toegestaan | Verboden | Verboden |
| Papier: versnipperen (DIN 66399 P-3+) | N.v.t. | N.v.t. | Vereist | Vereist (P-5+) |

## 5. Labeling (A.5.13)

### 5.1 Digitale documenten

- Classificatieniveau wordt vermeld in de koptekst of metadata van het document
- E-mails met vertrouwelijke of geheime informatie bevatten het classificatieniveau in het onderwerp: `[VERTROUWELIJK]` of `[GEHEIM]`
- Bestanden worden opgeslagen in mappen die overeenkomen met het classificatieniveau

### 5.2 Fysieke documenten

- Classificatieniveau wordt vermeld op de eerste pagina (rechtsboven)
- Vertrouwelijke en geheime documenten worden in afgesloten kasten bewaard
- Bij verzending: in verzegelde envelop met classificatielabel

### 5.3 Systemen

- Systemen die vertrouwelijke of geheime informatie verwerken worden als zodanig geregistreerd in het Asset Register (ISMS-008)

## 6. Herclassificatie

- Informatie wordt herclassificeerd wanneer de gevoeligheid wijzigt (bijv. na publicatie van eerder vertrouwelijke informatie)
- Herclassificatie wordt uitgevoerd door de informatie-eigenaar
- Verlaging van classificatie vereist goedkeuring van de CISO

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
