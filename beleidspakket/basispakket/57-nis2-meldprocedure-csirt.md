# NIS2-meldprocedure significant incident (CSIRT + bevoegde autoriteit)

**NIS2 art. 23 + Cbw NL / Belgische NIS2-omzettingswet**

| | |
|---|---|
| **Documentnummer** | ISMS-057 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO] |
| **Goedgekeurd door** | [Naam Directie / Bestuur] |
| **Reviewcyclus** | Halfjaarlijks + na elk incident |

---

## 1. Doel

Onder NIS2 zijn essentiele en belangrijke entiteiten verplicht **significante cyberincidenten** te melden bij de bevoegde autoriteit en/of CSIRT, met strikte termijnen:

- **24 uur** &mdash; vroege waarschuwing (early warning)
- **72 uur** &mdash; incidentmelding met bijgewerkte beoordeling
- **1 maand** &mdash; eindrapport

Deze procedure beschrijft wanneer een incident significant is, wie meldt en hoe.

## 2. Wanneer is een incident "significant"?

Een incident is significant indien:

- Het ernstige operationele verstoringen of financiele verliezen veroorzaakt of kan veroorzaken, of
- Het aanzienlijke materiele of immateriele schade veroorzaakt of kan veroorzaken voor andere natuurlijke of rechtspersonen

In de praktijk: ransomware, langdurige uitval van diensten, datadiefstal van substantieel volume, supply chain compromise met directe impact, succesvolle DDoS van substantiele duur.

[Organisatienaam] hanteert daarnaast deze interne classificatie:

| Categorie | Voorbeeld | Meldplicht |
|---|---|---|
| **Minor incident** | Phishing-poging zonder klikken, kortstondige uitval | Intern register |
| **Significant** | Succesvolle phishing met dataverlies, ransomware op subsysteem, DDoS > 4 uur | NIS2-melding |
| **Major** | Ransomware op kritieke systemen, datalek met grote impact, kritieke supply chain compromise | NIS2 + AVG-melding + pers-communicatie |
| **Catastrofaal** | Volledige uitval primaire dienstverlening > 24 uur, verlies > [N]% klantdata | Crisismanagement + nationale escalatie |

## 3. Tijdlijn meldplicht

| Tijd na bewustwording | Actie | Inhoud |
|---|---|---|
| **Bewustwording** | Trigger interne incident-procedure | Activeer crisisteam |
| **Binnen 24 uur** | Early warning aan CSIRT (NL: NCSC of sector-CSIRT, BE: CCB) | Aard incident, vermoedelijk veroorzaakt door criminele/onrechtmatige handelingen, mogelijk grensoverschrijdend effect |
| **Binnen 72 uur** | Incident-melding | Eerste beoordeling, ernst, impact, indicators of compromise |
| **Bij verzoek** | Tussenrapport | Zoals door CSIRT gevraagd |
| **Binnen 1 maand** | Eindrapport | Diepe analyse, hoofdoorzaak, mitigerende maatregelen, lessons learned |

Termijnen gaan in vanaf het moment dat de entiteit zich bewust werd of redelijkerwijs bewust had moeten zijn van het incident.

## 4. Wie meldt?

| Rol | Verantwoordelijkheid |
|---|---|
| **CISO** | Primair verantwoordelijk voor melding aan CSIRT en bevoegde autoriteit |
| **Plaatsvervangend CISO** | Bij afwezigheid CISO, 24/7 stand-by-rol |
| **FG** | Beoordeelt AVG-component, coordineert met CISO |
| **Bestuurder** | Goedkeuring eind-rapport + persoonlijke akkoordverklaring |
| **Communicatie** | Coordineert eventuele publieke communicatie en informatie aan betrokken klanten |
| **Juridisch** | Beoordeelt civiel- en strafrechtelijke aspecten |

## 5. Inhoud van de melding

### Early warning (24 uur)

- Korte beschrijving van het incident
- Vermoeden of het incident veroorzaakt is door criminele of onrechtmatige handelingen
- Inschatting of het grensoverschrijdend effect kan hebben
- Contactgegevens CISO + plaatsvervanger

### Incident-melding (72 uur)

Bovenop early warning:
- Eerste beoordeling van ernst en impact
- Indicators of compromise (indien beschikbaar en deelbaar)
- Maatregelen die zijn genomen of voorgenomen
- Inschatting van potentiele grensoverschrijdende effecten

### Eindrapport (1 maand)

- Gedetailleerde beschrijving van het incident
- Type dreiging of hoofdoorzaak
- Toegepaste en aanbevolen mitigerende maatregelen
- Eventueel transnationaal effect

## 6. Coordinatie met andere meldingen

Een significant incident kan parallelle meldverplichtingen activeren:

- **AVG datalek &rarr; AP** (binnen 72 uur)
- **eIDAS-incident &rarr; toezichthouder** (indien van toepassing)
- **Sector-specifieke melding** (bv. financiele toezichthouders, energieautoriteit)

Zie ISMS-054 (Dubbele meldplicht overheid) voor uitgewerkt voorbeeld. Voor andere sectoren wordt per sector een specifieke matrix opgesteld.

## 7. Praktische uitvoering

| Stap | Wie | Hoeverwacht binnen |
|---|---|---|
| Detectie via SIEM, helpdesk of externe melding | IT / SOC | T0 |
| Eerste triage | CISO / SOC-lead | T0 + 1 uur |
| Activering crisisteam | CISO | T0 + 2 uur |
| Beslissing significant ja/nee | CISO + bestuur | T0 + 4 uur |
| Early warning opstellen + versturen | CISO | T0 + 24 uur |
| Forensische analyse, scope-bepaling | SOC + externe forensische partner | doorlopend |
| 72-uur-melding | CISO | T0 + 72 uur |
| Communicatie naar klanten en pers (indien nodig) | Communicatie + bestuur | Na afstemming CSIRT |
| Eindrapport | CISO + FG | T0 + 1 maand |
| Lessons learned + CAPA | Crisisteam + bestuur | T0 + 6 weken |

## 8. Externe partners

Voorafgaand aan een incident heeft [Organisatienaam] gecontracteerd met:

- **Forensische partner** voor incident-onderzoek (SLA: respons binnen [N] uur)
- **Juridische partner** voor crisis-counsel
- **Communicatie-partner** voor reputatiemanagement
- **Verzekeraar** met cyberverzekering-clausules

Contactgegevens in 24/7-bereikbare crisis-contactlijst, separaat opgeslagen buiten kantoornetwerk.

## 9. Oefenen

Minstens tweemaal per jaar voert [Organisatienaam] een crisis-oefening uit:

- Tabletop-oefening met directie en CISO (1x per jaar)
- Volledige technische simulatie inclusief tijdsdruk (1x per jaar)

Oefeningen toetsen specifiek de 24-uurs en 72-uurs termijn en de rolverdeling.

## 10. Documentatie en transparantie

Elk significant incident, gemeld of niet-gemeld, wordt vastgelegd in het **NIS2-incidentregister** met onderbouwing van de classificatie. Het register wordt jaarlijks geanalyseerd op trends en gedeeld met het bestuur (in geanonimiseerde vorm met de medewerkers in awareness-trainingen).

---

**Bijlagen**
- Bijlage A: Sjabloon Early Warning
- Bijlage B: Sjabloon Incident-melding
- Bijlage C: Sjabloon Eindrapport
- Bijlage D: 24/7-crisiscontactlijst
- Bijlage E: Beslisboom significant incident

**Gerelateerde documenten**
- [[ISMS-019 Incident response plan]]
- [[ISMS-040 Datalekprocedure]]
- [[ISMS-054 Dubbele meldplicht (overheid)]]
- [[ISMS-056 NIS2-bestuursverklaring]]
- [[38 NIS2 ↔ ISO 27001-mapping]]
- [[NIS2 art. 23]]
