# NIS2 Meldingsplicht-procedure

**NIS2-richtlijn (EU) 2022/2555 — Art. 23 (Meldingsplicht significante incidenten)**

| | |
|---|---|
| **Documentnummer** | NIS2-002 |
| **Versie** | 1.0 |
| **Classificatie** | Intern — incident response procedure |
| **Eigenaar** | [Incident Response Coordinator] |
| **Goedgekeurd door** | [Naam directielid IB-portefeuille] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

NIS2 vereist dat **essentiële en belangrijke entiteiten** significante incidenten melden aan de bevoegde instantie binnen strakke termijnen. Deze procedure beschrijft welke incidenten gemeld moeten worden, binnen welke tijden, aan welke instantie, met welke inhoud en wie binnen [Organisatienaam] verantwoordelijk is voor elke stap.

## 2. Wanneer is een incident "significant" volgens NIS2?

Een incident is significant als ten minste één van de volgende criteria geldt (Art. 23 lid 3):

1. Het incident heeft of kan een ernstige operationele verstoring of financiële verlies veroorzaken voor de entiteit
2. Het incident heeft of kan andere natuurlijke personen of rechtspersonen treffen door aanzienlijke materiële of immateriële schade

**Praktische triggers voor [Organisatienaam]:**

| Trigger | Voorbeeld |
|---|---|
| Verlies van vertrouwelijkheid van persoonsgegevens of bedrijfskritische data | Database-leak, ransomware-encryptie van klantgegevens |
| Onbeschikbaarheid van een kerndienst > [X uur] | Productie-uitval, cloud-service onbereikbaar |
| Verlies van integriteit van financiële of operationele data | Manipulatie van orders, ongedetecteerde wijzigingen in productie |
| Onbevoegde toegang met escalatie-rechten | Domein-admin compromis, root-toegang door externe partij |
| Verstoring met gevolg voor andere bedrijven of consumenten | Supply chain attack uitgaand vanaf onze infra |

> **Belangrijk:** ook een vermoeden zonder bevestiging kan al meldingsplichtig zijn. Bij twijfel: melden binnen 24 uur, intrekken/aanvullen kan altijd.

## 3. Tijdlijn meldingsplicht

```
Incident-detectie  →  Vroege waarschuwing (24h)  →  Incident-melding (72h)  →  Eindrapport (30d)
```

### 3.1 Vroege waarschuwing — binnen 24 uur

**Wat:** korte initiële melding aan de bevoegde instantie. Kort houden — alleen wat bekend is.

**Inhoud (verplichte velden):**
- [ ] Identificatie van [Organisatienaam] (KvK / KBO + sector + classificatie essentieel/belangrijk)
- [ ] Tijdstip van detectie
- [ ] Aard van het incident in één zin (bijv. "ransomware-aanval op productie-server")
- [ ] Vermoeden van oorzaak (bekend / onbekend)
- [ ] Vermoeden van grensoverschrijdende impact (ja / nee / onbekend)
- [ ] Contactpersoon + telefoonnummer voor terugkoppeling

### 3.2 Incident-melding — binnen 72 uur

**Wat:** volledige initiële beoordeling. Volgt op de vroege waarschuwing en bevat meer detail.

**Inhoud:**
- [ ] Beschrijving van het incident en de getroffen systemen
- [ ] Reikwijdte (welke diensten, hoeveel klanten/gebruikers, welke data)
- [ ] Initiële indicatie van ernst (low / medium / high / critical)
- [ ] Tot dusver genomen mitigerende maatregelen
- [ ] Tot dusver bekende of vermoede aanvalsindicatoren (IoC's, TTP's)
- [ ] Eerste inschatting van impact op de Confidentialiteit / Integriteit / Beschikbaarheid

### 3.3 Tussenmelding — op verzoek van de bevoegde instantie

Indien een incident langer dan 72 uur duurt of de instantie aanvullende informatie verlangt, moet [Organisatienaam] op verzoek tussenmeldingen verstrekken.

### 3.4 Eindrapport — binnen 1 maand na de incident-melding

**Wat:** definitief rapport van het incident, inclusief root cause en doorgevoerde structurele maatregelen.

**Inhoud:**
- [ ] Volledige beschrijving van het incident en de oorzaak
- [ ] Tijdlijn van detectie tot herstel
- [ ] Werkelijk geleden schade (financieel + reputatie + operationeel)
- [ ] Impact op derden — welke klanten/leveranciers/burgers zijn geraakt en hoe
- [ ] Lessons learned + structurele maatregelen die worden of zijn doorgevoerd
- [ ] Update van het risico-register en het Art. 21-maatregelenpakket waar relevant

## 4. Bevoegde instantie & meldkanaal

| Land | Bevoegde instantie | Meldkanaal |
|---|---|---|
| **Nederland** | Rijksinspectie Digitale Infrastructuur (RDI) | [URL meldportaal in te vullen — RDI publiceert dit] |
| **België** | Centrum voor Cybersecurity België (CCB) — CCB-CSIRT | https://ccb.belgium.be → Notify-form |
| **Beide landen actief** | Eerstelijnsmelding in elk land waar [Organisatienaam] een vestiging heeft | Beide kanalen volgen, kruisverwijzing naar elkaar |

**Aanvullende meldkanalen die parallel kunnen lopen:**

| Aanleiding | Aanvullende melding |
|---|---|
| Datalek met persoonsgegevens | Autoriteit Persoonsgegevens (NL) of Gegevensbeschermingsautoriteit (BE) — binnen 72u |
| Strafbaar feit (bv. ransomware) | Politie / FCCU (BE) — aangifte ondernemen |
| Sectorspecifieke meldplicht | DNB/AFM (financieel), IGJ (zorg), AT (energie) — afhankelijk van sector |

## 5. Rol- en verantwoordelijkheidsverdeling

| Stap | Verantwoordelijk | Backup |
|---|---|---|
| Initiële triage + besluit "is dit significant?" | Incident Response Coordinator | CISO |
| Vroege waarschuwing opstellen + verzenden | CISO | DPO of directielid IB |
| Interne escalatie naar directie | CISO | Incident Response Coordinator |
| Communicatie met bevoegde instantie | CISO + juridisch adviseur | Directielid IB-portefeuille |
| Klant/derde-communicatie | Communicatieverantwoordelijke | DPO |
| Coördinatie eindrapport | Incident Response Coordinator | CISO |

## 6. Praktische checklist eerste 4 uur na detectie

- [ ] Incident-ticket aangemaakt in [tracking-systeem]
- [ ] Initiële containment-maatregelen genomen (segmentatie, accounts blokkeren, backups veiligstellen)
- [ ] Forensische bewaring van logs gestart (geen wijzigingen in lopende systemen tot bewaring)
- [ ] Triage-besluit: meldingsplichtig ja/nee (gedocumenteerd met motivatie)
- [ ] CISO + Incident Response Coordinator gealarmeerd (24/7 contactgegevens in bijlage A)
- [ ] Directielid IB-portefeuille geïnformeerd
- [ ] Klok voor 24-uurstermijn gestart (tijdstip detectie genoteerd)
- [ ] Externe parties (DPO, juridisch, leverancier-CSIRT) waar nodig betrokken
- [ ] Communicatie-houding bepaald: actief informeren of stilzwijgen tot helderheid
- [ ] Cryptolocker / ransomware: GEEN losgeld zonder directiebesluit + politie-overleg

## 7. Documentatie en bewaring

Elk meldingsplichtig incident moet minimaal **5 jaar** bewaard blijven met:

- Volledige meldingen (vroege + incident + eindrapport)
- Communicatie-log met de bevoegde instantie
- Forensische artefacten en logs (gewaarborgde keten)
- Interne incident-evaluatie en lessons learned
- Bestuursbesluit over corrigerende maatregelen

## 8. Test van deze procedure

Deze procedure wordt **minimaal jaarlijks** getest via een tabletop-oefening waarin:

- Een fictief incident wordt gesimuleerd
- De 24h/72h/30d-flow wordt doorlopen tot conceptmelding
- Backup-personen worden getest in primaire rol
- Tijdmetingen worden vastgelegd voor verbetering

Resultaat van de test wordt gerapporteerd in de jaarlijkse management review (ISMS-022).

---

## Bijlage A — 24/7 contactgegevens

| Rol | Naam | Telefoon | E-mail | Backup |
|---|---|---|---|---|
| Incident Response Coordinator | [Naam] | [Mobiel] | [Email] | [Naam backup] |
| CISO / verantwoordelijke IB | [Naam] | [Mobiel] | [Email] | [Naam backup] |
| Directielid IB-portefeuille | [Naam] | [Mobiel] | [Email] | [Naam backup] |
| DPO / Privacy Officer | [Naam] | [Mobiel] | [Email] | [Naam backup] |
| Externe forensische partij | [Bedrijf] | [Hotline] | [Email] | — |
| Externe juridisch adviseur | [Bedrijf] | [Telefoon] | [Email] | — |

## Bijlage B — Sjabloon vroege waarschuwing (24h)

```
Aan: [bevoegde instantie]
Onderwerp: NIS2 vroege waarschuwing — [organisatie] — [referentie]

Geachte heer/mevrouw,

Conform Art. 23 NIS2-richtlijn melden wij hierbij een (vermoedelijk) significant incident.

Organisatie: [Organisatienaam, KvK/KBO]
Sector: [sector]
Classificatie: [essentieel / belangrijk]
Detectietijdstip: [DD-MM-JJJJ HH:MM CET]

Incident in één zin:
[korte omschrijving]

Vermoeden van oorzaak: [bekend / onbekend / nog in onderzoek]
Vermoeden van grensoverschrijdende impact: [ja / nee / onbekend]

Contactpersoon voor terugkoppeling:
[Naam] — [telefoon] — [email]

Een uitgebreidere incident-melding volgt binnen 72 uur conform Art. 23 lid 4.

Met vriendelijke groet,
[Naam] — [functie] — [organisatie]
```

## Bijlage C — Gerelateerde documenten

- NIS2-001 — Bestuursverklaring & directiebesluit Art. 21
- NIS2-003 — Art. 21 ↔ ISO 27001 mapping
- ISMS-019 — Incident response procedure
- ISMS-031 — Data subject rights procedure (raakvlak AVG)
- Werkinstructie A5 — Organisatorische controls (incident-mgmt context)
