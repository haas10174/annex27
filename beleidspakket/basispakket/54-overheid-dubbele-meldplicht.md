# Dubbele meldplicht: datalek + cyberincident (overheid)

**AVG art. 33-34 + Wet beveiliging netwerk- en informatiesystemen (Wbni) + Cyberbeveiligingswet (Cbw) / BIO 2.0**

| | |
|---|---|
| **Documentnummer** | ISMS-054 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO + FG] |
| **Goedgekeurd door** | [Naam Directie / College van B&W] |
| **Reviewcyclus** | Halfjaarlijks |

---

## 1. Doel

Overheidsinstellingen hebben bij een ICT-incident vaak meerdere meldverplichtingen tegelijk:

- **AVG datalek** &rarr; Autoriteit Persoonsgegevens (binnen 72 uur)
- **Wbni / Cbw cyberincident** &rarr; CSIRT-DSP en NCSC / Computer Security Incident Response Team (binnen 24 uur initiele melding, 72 uur vervolgmelding)
- **Specifieke sector** &rarr; toezichthouder van de sector (BZK, Belastingdienst, IVD, etc.)

Deze procedure maakt expliciet wie wat meldt, in welke volgorde en met welke informatie.

## 2. Reikwijdte

Alle ICT-incidenten binnen [Organisatienaam], inclusief gemeentelijke ketenpartners, gemeenschappelijke regelingen, samenwerkingsverbanden en uitbestede partijen die diensten voor [Organisatienaam] leveren.

## 3. Definities

| Term | Betekenis |
|---|---|
| **Datalek** | Inbreuk op beveiliging die leidt tot vernietiging, verlies, wijziging of openbaarmaking van persoonsgegevens (AVG art. 4 lid 12) |
| **Cyberincident** | Een gebeurtenis die negatieve gevolgen heeft of kan hebben voor de beschikbaarheid, integriteit of vertrouwelijkheid van een ICT-systeem of -dienst |
| **Significant incident (Cbw)** | Een cyberincident met aanzienlijke gevolgen voor de continuiteit of integriteit van een essentiele of belangrijke entiteit |
| **CSIRT** | Computer Security Incident Response Team. Voor de meeste overheden is dit CSIRT-DSP, voor andere sectoren een andere CSIRT |

## 4. Beslisboom: welke meldingen zijn nodig?

1. **Zijn persoonsgegevens betrokken?** &rarr; Datalek-traject AVG (FG)
2. **Is er sprake van een cyberincident dat de beschikbaarheid, integriteit of vertrouwelijkheid raakt?** &rarr; Wbni/Cbw-traject (CSIRT)
3. **Beide ja?** &rarr; Beide trajecten parallel, met afstemming tussen FG en CISO

Een ransomware-aanval op een gemeentelijk systeem met burgers' BSN is bijna altijd **beide**: meldplichtig bij AP en bij CSIRT.

## 5. Tijdlijn en wie

| Tijd na ontdekking | Actie | Wie |
|---|---|---|
| **Onmiddellijk** | Intern incident-protocol activeren, systeem isoleren | IT/Security |
| **Binnen 1 uur** | Eerste assessment, classificatie incident | CISO + FG |
| **Binnen 4 uur** | Beslissing: melden bij CSIRT? Melden bij AP? | CISO + FG + Directie |
| **Binnen 24 uur** | Initiele melding CSIRT (Wbni/Cbw) | CISO via CSIRT-portaal |
| **Binnen 72 uur** | AP-melding (AVG datalek) | FG via datalekken.autoriteitpersoonsgegevens.nl |
| **Binnen 72 uur** | Vervolgmelding CSIRT met verrijkte info | CISO |
| **Binnen 1 maand** | Eindrapport CSIRT, eventueel betrokkenen informeren | CISO + FG + Communicatie |
| **Doorlopend** | Logboek incident-respons | Incident-coordinator |

## 6. Wie meldt wat, en aan wie?

| Melding | Verantwoordelijke | Aan wie | Kanaal |
|---|---|---|---|
| AVG datalek | FG | Autoriteit Persoonsgegevens | datalekken.autoriteitpersoonsgegevens.nl |
| Wbni/Cbw incident | CISO | CSIRT-DSP / NCSC | CSIRT-portaal of beveiligde mail |
| Sector-toezichthouder | Bestuurder + CISO | BZK / IVD / Belastingdienst | Per sector vastgesteld |
| Burgemeester of college | Directie | College van B&W | Interne escalatie |
| Pers en publiek | Communicatie | Algemeen publiek | Geconsulteerd na CSIRT-overleg |
| Betrokken burgers | FG + Communicatie | Direct getroffen burgers | Persoonlijk (brief, mail, telefonisch) |

## 7. Wat staat er minimaal in de melding?

### AVG-melding aan AP

- Aard van de inbreuk (wat is gebeurd)
- Categorieen en aantal betrokkenen
- Waarschijnlijke gevolgen
- Genomen of voorgestelde maatregelen
- Naam en contactgegevens FG

### Cbw-melding aan CSIRT

- Aard van het incident
- Omvang en betrokken systemen
- Geschatte impact op dienstverlening
- Vermoedelijke oorzaak (indien bekend)
- Genomen mitigerende maatregelen
- Contactgegevens CISO en plaatsvervanger

## 8. Coordinatie FG en CISO

FG en CISO werken in een incident als duo:

| Onderwerp | FG-rol | CISO-rol |
|---|---|---|
| Beoordeling persoonsgegevens betrokken | Primair | Adviseert technisch |
| Beoordeling technische impact | Adviseert | Primair |
| AP-melding | Doet | Levert info aan |
| CSIRT-melding | Levert info aan | Doet |
| Communicatie naar betrokken burgers | Co-leidt met Communicatie | Levert technische info |
| Communicatie naar collega-overheden | Adviseert | Co-leidt met directie |

Beide rapporteren rechtstreeks aan de directie tijdens een lopend incident.

## 9. Documentatie

Elk incident wordt vastgelegd in het **gezamenlijk incidentregister** met:
- Tijdlijn van ontdekking tot afsluiting
- Welke meldingen wanneer en door wie zijn gedaan
- Reden waarom een bepaalde melding wel/niet is gedaan
- Lessons learned en CAPA-acties

Bewaartermijn: minimaal 7 jaar, langer indien strafrechtelijk onderzoek aan de orde is.

## 10. Oefenen

Elk kwartaal voert [Organisatienaam] een tabletop-oefening uit met een fictief scenario waarbij zowel AVG- als Cbw-melding aan de orde komt. Doel: routine, snelheid en samenwerking tussen FG, CISO, IT, communicatie en bestuur. Resultaten worden teruggekoppeld aan de directie.

---

**Bijlagen**
- Bijlage A: Incident-classificatie-matrix (BBN x impact x scope)
- Bijlage B: Voorbeeld AP-melding en CSIRT-melding
- Bijlage C: Contactenlijst (CSIRT, AP, sectortoezichthouders, persvoorlichting)

**Gerelateerde documenten**
- [[ISMS-019 Incident response plan]]
- [[ISMS-040 Datalekprocedure]]
- [[ISMS-053 BIO-classificatie en rubricering]]
- [[Wbni / Cbw]]
- [[BIO 2.0 hoofdstuk 6]]
