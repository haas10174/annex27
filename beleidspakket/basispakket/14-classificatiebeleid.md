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
