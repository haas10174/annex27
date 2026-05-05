# NIS2 Entiteitsclassificatie — Essentieel vs. Belangrijk

**Hulpdocument bij Art. 2 + Annex I + Annex II NIS2-richtlijn (EU) 2022/2555**

| | |
|---|---|
| **Documentnummer** | NIS2-004 |
| **Versie** | 1.0 |
| **Classificatie** | Intern — referentiedocument |
| **Eigenaar** | [CISO / Compliance Officer] |
| **Datum** | [DD-MM-JJJJ] |

---

## 1. Doel

NIS2 maakt onderscheid tussen **essentiële entiteiten** (zwaarder regime, actief toezicht) en **belangrijke entiteiten** (lichter regime, ex-post toezicht). Welke van de twee voor uw organisatie van toepassing is, hangt af van **(a) sector**, **(b) bedrijfsgrootte** en **(c) een aantal specifieke uitzonderingen**.

Dit document helpt [Organisatienaam] zichzelf te classificeren en die classificatie gedocumenteerd vast te leggen — vereist voor de bestuursverklaring (NIS2-001) en voor alle meldingen aan de bevoegde instantie.

## 2. Zelf-classificatie in drie stappen

### Stap 1 — Valt u onder NIS2?

NIS2 is van toepassing op uw organisatie als beide gelden:

1. U bent actief in een **NIS2-sector** (zie sectie 3 hieronder), én
2. U voldoet aan de **bedrijfsgrootte-criteria** (≥50 medewerkers OF ≥€10M jaaromzet, behoudens uitzonderingen)

**Uitzondering — micro/klein bedrijf in kritische sector:** ook organisaties onder de drempel kunnen onder NIS2 vallen als zij aanbieder zijn van openbare elektronische communicatie, vertrouwensdiensten, top-level domain registratie, DNS, of als enige aanbieder van een essentiële dienst in de lidstaat.

### Stap 2 — Bent u essentieel of belangrijk?

| Sector-categorie | Drempel | Classificatie |
|---|---|---|
| Annex I sectoren (zie 3.1) | ≥250 medewerkers OF ≥€50M jaaromzet én balans ≥€43M | **Essentieel** |
| Annex I sectoren | 50-249 medewerkers OF €10M-€50M omzet | **Belangrijk** |
| Annex II sectoren (zie 3.2) | ≥50 medewerkers OF ≥€10M omzet | **Belangrijk** |
| Specifieke aanbieders (DNS, TLD, vertrouwensdiensten etc.) | Geen drempel | **Essentieel** |

### Stap 3 — Documenteer uw besluit

Vul onderstaande tabel in en voeg het toe aan NIS2-001 (Bestuursverklaring):

| Vraag | Antwoord |
|---|---|
| Welke NIS2-sector(en)? | [in te vullen] |
| Annex I of II? | [I / II] |
| Aantal medewerkers (FTE) | [getal] |
| Jaaromzet (€) | [bedrag] |
| Jaarbalans (€) | [bedrag] |
| Toegepaste classificatie | **[Essentieel / Belangrijk]** |
| Datum van classificatie | [DD-MM-JJJJ] |
| Verantwoordelijk voor heroverweging | [Naam — minimaal jaarlijks] |

## 3. NIS2-sectoren

### 3.1 Annex I — Zeer kritische sectoren (essentieel-default)

- **Energie** — elektriciteit, district heating/cooling, olie, gas, waterstof
- **Transport** — luchtvaart, spoor, water, weg
- **Bank** — kredietinstellingen
- **Financiële infrastructuur** — handelsplatforms, centrale tegenpartijen
- **Gezondheidszorg** — zorgaanbieders, EU-referentielaboratoria, geneesmiddelenfabrikanten, productie van medische hulpmiddelen die kritiek zijn tijdens een volksgezondheidscrisis
- **Drinkwater** — leveranciers en distributeurs
- **Afvalwater** — operators
- **Digitale infrastructuur** — IXP's, DNS-aanbieders, TLD's, cloud computing-services, datacenter-services, content delivery networks, vertrouwensdiensten, openbare elektronische communicatienetwerken/-diensten
- **ICT service management** — managed service providers, managed security service providers
- **Overheidsdiensten** — centrale en regionale overheid
- **Ruimtevaart** — exploitanten van grondinfrastructuur in eigendom van of beheerd door lidstaten of private partijen, voor zover ondersteuning van ruimtegerelateerde diensten

### 3.2 Annex II — Andere kritische sectoren (belangrijk-default)

- **Postdiensten en koeriersdiensten**
- **Afvalbeheer**
- **Vervaardiging, productie en distributie van chemicaliën**
- **Productie, verwerking en distributie van levensmiddelen**
- **Vervaardiging** — medische hulpmiddelen, computer-/elektronica-/optische producten, elektrische apparatuur, machines, motorvoertuigen, andere transportmiddelen
- **Digitale aanbieders** — online marketplaces, online zoekmachines, sociale netwerk-platforms
- **Onderzoek** — onderzoeksorganisaties

## 4. Verschil in regime tussen essentieel en belangrijk

| Aspect | Essentieel | Belangrijk |
|---|---|---|
| **Toezicht** | Proactief — toezichthouder kan zelf inspecteren, audits gelasten, certificering eisen | Reactief — toezichthouder grijpt in na vermoeden van overtreding |
| **Registratieplicht** | Ja — verplicht in nationaal register | Ja — verplicht in nationaal register |
| **Boetes** | Tot €10 miljoen of 2% wereldomzet (hoogste van beide) | Tot €7 miljoen of 1,4% wereldomzet (hoogste van beide) |
| **Bestuursaansprakelijkheid Art. 20** | Ja — incl. tijdelijk verbod op bestuursfunctie bij grove nalatigheid | Ja — incl. tijdelijk verbod op bestuursfunctie bij grove nalatigheid |
| **Meldingsplicht Art. 23** | Identiek — 24h vroege waarschuwing / 72h melding / 30d eindrapport | Identiek |
| **Audit-frequentie** | Door toezichthouder bepaald, kan jaarlijks | Op aangeven, doorgaans event-driven |

## 5. Uitzonderingen en bijzonderheden

### 5.1 Concern-vraag

NIS2 wordt **per entiteit** toegepast, niet per concern. Een holding kan dus onder NIS2 vallen terwijl een dochter eronder valt — en vice versa. Documenteer per juridische entiteit.

### 5.2 EU-vestiging vs. dienstverlening

Als [Organisatienaam] geen vestiging in de EU heeft maar wel een EU-markt bedient (bv. cloud-aanbieder met klanten in NL/BE), moet u een **vertegenwoordiger in de EU** aanwijzen.

### 5.3 Sector-specifieke wetgeving "lex specialis"

Als er sectorspecifieke EU-wetgeving is met **gelijkwaardige of strengere** beveiligingseisen (bv. DORA voor banken, eIDAS voor vertrouwensdiensten), gelden die in plaats van NIS2 voor de overlappende delen. NIS2 blijft van toepassing voor alles wat niet door de sector-wetgeving is gedekt.

### 5.4 Overheidsinstellingen

Lidstaten mogen overheidsinstellingen op centraal/regionaal niveau aanwijzen als NIS2-pligtig. Voor [Nederland / België — invullen] is dit op [datum] vastgelegd in [naam wet].

## 6. Heroverwegingsmoment

[Organisatienaam] herziet zijn classificatie:

- **Jaarlijks** — bij het opstellen van de jaarrekening (medewerkers/omzet kunnen drempel kruisen)
- **Bij sector-wijziging** — uitbreiding naar nieuwe markt of dienst
- **Bij overname/fusie** — combinatie kan tot andere classificatie leiden
- **Bij wijziging NIS2 of nationale uitvoeringswet** — bv. uitbreiding van Annex I/II

Uitkomst van heroverweging wordt vastgelegd in de bestuursverklaring NIS2-001.

---

## Gerelateerde documenten

- NIS2-001 — Bestuursverklaring & directiebesluit Art. 21
- NIS2-002 — Meldingsplicht-procedure
- NIS2-003 — Art. 21 ↔ ISO 27001 mapping
- ISMS-023 — Context van de organisatie en belanghebbenden (raakvlak met NIS2-stakeholders)
