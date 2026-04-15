# Business Continuity Plan

**ISO 27001:2022 — A.5.29, A.5.30**

| | |
|---|---|
| **Documentnummer** | ISMS-020 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit plan beschrijft hoe [Organisatienaam] de continuïteit van kritieke bedrijfsprocessen en informatiesystemen waarborgt bij een verstoring, calamiteit of crisis.

## 2. Scope

Dit plan is van toepassing op alle bedrijfskritieke processen en systemen zoals geïdentificeerd in de Business Impact Analyse (sectie 3).

## 3. Business Impact Analyse

### 3.1 Kritieke processen

| Proces | Eigenaar | Maximale uitvalduur (MTPD) | RPO | RTO | Impact bij uitval |
|---|---|---|---|---|---|
| [Kernproces 1, bijv. klantdienstverlening] | [Naam] | [bijv. 8 uur] | [bijv. 4 uur] | [bijv. 4 uur] | [Beschrijf impact] |
| [Kernproces 2, bijv. facturatie] | [Naam] | [bijv. 24 uur] | [bijv. 24 uur] | [bijv. 8 uur] | [Beschrijf impact] |
| [Kernproces 3, bijv. e-mailcommunicatie] | [Naam] | [bijv. 4 uur] | [bijv. 1 uur] | [bijv. 2 uur] | [Beschrijf impact] |
| [Kernproces 4] | | | | | |

**Definities:**
- **MTPD (Maximum Tolerable Period of Disruption):** Maximale periode dat een proces uitgevallen mag zijn
- **RPO (Recovery Point Objective):** Maximaal acceptabel dataverlies (in tijd)
- **RTO (Recovery Time Objective):** Streeftijd voor herstel van het proces

### 3.2 Kritieke systemen

| Systeem | Ondersteunt proces | RPO | RTO | Backup-methode | Uitwijklocatie |
|---|---|---|---|---|---|
| [E-mail/Microsoft 365] | Communicatie | [1 uur] | [2 uur] | [Cloud-native] | [Cloud] |
| [CRM-systeem] | Klantdienstverlening | [4 uur] | [4 uur] | [Dagelijkse backup] | [Cloud] |
| [ERP / boekhoudsysteem] | Facturatie | [24 uur] | [8 uur] | [Dagelijkse backup] | [Cloud] |
| [Fileserver / SharePoint] | Documentbeheer | [4 uur] | [4 uur] | [Continue replicatie] | [Cloud] |

## 4. Preventieve maatregelen

| Maatregel | Status | Verantwoordelijke |
|---|---|---|
| Dagelijkse geautomatiseerde backups | [Actief/Gepland] | IT-beheer |
| Off-site / cloud backup opslag | [Actief/Gepland] | IT-beheer |
| Redundante internetverbinding | [Actief/Gepland] | IT-beheer |
| UPS voor kritieke apparatuur | [Actief/Gepland] | Facilitair |
| Cyberverzekering | [Actief/Gepland] | Directie |
| Noodstroomvoorziening (indien van toepassing) | [Actief/Gepland/N.v.t.] | Facilitair |

## 5. Herstelscenario's

### 5.1 Scenario: Ransomware-aanval

| Stap | Actie | Verantwoordelijke | Tijdlijn |
|---|---|---|---|
| 1 | Getroffen systemen isoleren van het netwerk | IT-beheer | Onmiddellijk |
| 2 | Incident Response Plan activeren (ISMS-019) | CISO | < 1 uur |
| 3 | Omvang vaststellen: welke systemen/data zijn versleuteld | IT-beheer | < 4 uur |
| 4 | Backups controleren op integriteit en beschikbaarheid | IT-beheer | < 4 uur |
| 5 | Schone systemen opbouwen vanuit betrouwbare bron | IT-beheer | Conform RTO |
| 6 | Data herstellen vanuit backup | IT-beheer | Conform RPO/RTO |
| 7 | Verhoogde monitoring instellen | IT-beheer | Na herstel |
| 8 | Communicatie naar klanten/partners indien nodig | Directie / CISO | Na beoordeling |

**Belangrijk:** Er wordt geen losgeld betaald zonder expliciete goedkeuring van directie en overleg met politie en juridisch adviseur.

### 5.2 Scenario: Uitval cloud-dienstverlener

| Stap | Actie |
|---|---|
| 1 | Status controleren bij cloud-provider (statuspage, support) |
| 2 | Medewerkers informeren, alternatieve werkmethoden activeren |
| 3 | Beoordelen of overstap naar backup-omgeving nodig is |
| 4 | Indien langdurig (>RTO): uitwijkprocedure activeren |
| 5 | Na herstel: data-integriteit controleren |

### 5.3 Scenario: Brand of fysieke schade aan kantoor

| Stap | Actie |
|---|---|
| 1 | Veiligheid medewerkers waarborgen (ontruiming) |
| 2 | Hulpdiensten inschakelen |
| 3 | Thuiswerken activeren voor alle medewerkers |
| 4 | Schade inventariseren |
| 5 | Verzekering inschakelen |
| 6 | Tijdelijke werklocatie regelen indien nodig |

## 6. Communicatie tijdens calamiteit

| Doelgroep | Communicatiekanaal | Verantwoordelijke | Wanneer |
|---|---|---|---|
| Medewerkers | [Telefoon / WhatsApp-groep / Teams] | Directie | Binnen 1 uur |
| Klanten | E-mail / telefoon | Directie / Accountmanagement | Binnen 4 uur (bij impact op dienstverlening) |
| Leveranciers | E-mail / telefoon | CISO | Indien relevant |
| Toezichthouders (AP, NCSC) | Officiële meldkanalen | CISO | Conform meldplicht |
| Media (indien nodig) | Via directie | Directie | Na interne afstemming |

## 7. Testen en oefenen

| Test | Frequentie | Beschrijving |
|---|---|---|
| Backup-hersteltest | Halfjaarlijks | Daadwerkelijk herstellen van data uit backup, controleren op integriteit |
| Tabletop-oefening | Jaarlijks | Scenariobespreking met management en IT |
| Volledige failover-test | Jaarlijks (aanbevolen) | Overschakelen naar uitwijkomgeving |
| Contactlijst verificatie | Halfjaarlijks | Controleer of alle noodcontacten bereikbaar zijn |

Testresultaten worden gedocumenteerd en besproken in de managementreview.

## 8. Noodcontacten

| Functie | Naam | Telefoon | E-mail |
|---|---|---|---|
| Directie | [Naam] | [Nummer] | [E-mail] |
| CISO | [Naam] | [Nummer] | [E-mail] |
| IT-beheer (primair) | [Naam] | [Nummer] | [E-mail] |
| IT-beheer (backup) | [Naam] | [Nummer] | [E-mail] |
| Cloud-provider support | [Provider] | [Nummer] | [E-mail] |
| Verzekering | [Maatschappij] | [Nummer] | [Polisnummer] |
| Externe IT-partner | [Bedrijf] | [Nummer] | [E-mail] |

## 9. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
