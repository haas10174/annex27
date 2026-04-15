# Patch- & Kwetsbaarheidsbeheer

**ISO 27001:2022 — A.8.8**

| | |
|---|---|
| **Documentnummer** | ISMS-017 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam IT-beheer / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit document beschrijft het proces voor het identificeren, beoordelen en verhelpen van technische kwetsbaarheden in de systemen en applicaties van [Organisatienaam].

## 2. Scope

- Alle servers, werkstations en netwerkapparatuur in eigendom of beheer van [Organisatienaam]
- Alle software en applicaties (inclusief SaaS-diensten waar configuratie mogelijk is)
- Mobiele apparaten die zakelijk worden gebruikt

## 3. Kwetsbaarheidsidentificatie

| Methode | Frequentie | Verantwoordelijke |
|---|---|---|
| Automatische vulnerability scanning (intern netwerk) | Maandelijks | IT-beheer |
| Externe vulnerability scan (perimeter) | Kwartaallijks | IT-beheer / externe partij |
| Monitoren van leveranciers-advisories en CVE-databases | Doorlopend | IT-beheer |
| Monitoren van NCSC-waarschuwingen | Doorlopend | CISO |
| Penetratietest (optioneel / aanbevolen) | Jaarlijks | Externe partij |

## 4. Beoordeling en prioritering

Kwetsbaarheden worden beoordeeld op basis van CVSS-score (Common Vulnerability Scoring System):

| CVSS-score | Ernst | Patchdeadline | Escalatie |
|---|---|---|---|
| 9.0 - 10.0 | Kritiek | Binnen 48 uur | Onmiddellijk CISO informeren |
| 7.0 - 8.9 | Hoog | Binnen 14 dagen | CISO informeren |
| 4.0 - 6.9 | Midden | Binnen 30 dagen | Opnemen in regulier patchschema |
| 0.1 - 3.9 | Laag | Binnen 90 dagen | Opnemen in regulier patchschema |

Bij de beoordeling wordt rekening gehouden met:
- Is de kwetsbaarheid actief uitgebuit (zero-day)?
- Is het getroffen systeem extern bereikbaar?
- Bevat het systeem vertrouwelijke of geheime informatie?
- Zijn er compenserende maatregelen (mitigations) beschikbaar?

## 5. Patchproces

### 5.1 Reguliere patches

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Beschikbare patches identificeren | IT-beheer |
| 2 | Impact en afhankelijkheden beoordelen | IT-beheer |
| 3 | Testen op testomgeving (indien beschikbaar) | IT-beheer |
| 4 | Patch plannen (bij voorkeur buiten werktijd) | IT-beheer |
| 5 | Patch uitvoeren met rollback-plan | IT-beheer |
| 6 | Verificatie: controleren of patch succesvol is geïnstalleerd | IT-beheer |
| 7 | Documentatie in patch-logboek | IT-beheer |

### 5.2 Noodpatches (kritieke kwetsbaarheden)

Bij CVSS 9.0+ of actieve exploitatie:

| Stap | Actie | Deadline |
|---|---|---|
| 1 | CISO wordt geïnformeerd | Binnen 1 uur na ontdekking |
| 2 | Beoordeling: is compenserende maatregel mogelijk? | Binnen 4 uur |
| 3 | Indien compenserende maatregel: implementeren als tussenoplossing | Binnen 4 uur |
| 4 | Patch testen (verkort testproces) | Binnen 24 uur |
| 5 | Patch uitrollen op productie | Binnen 48 uur |
| 6 | Verificatie en documentatie | Binnen 72 uur |

### 5.3 Wanneer patchen niet mogelijk is

Als een patch niet direct kan worden geïnstalleerd (compatibiliteit, beschikbaarheid):

1. Risicoacceptatie aanvragen bij CISO (midden) of directie (hoog/kritiek)
2. Compenserende maatregelen implementeren (netwerksegmentatie, monitoring, access control)
3. Herevaluatie plannen binnen 30 dagen
4. Documenteren in risicoregister

## 6. Patchlogboek

| Datum | Systeem | Kwetsbaarheid / CVE | CVSS | Patch toegepast | Resultaat | Uitgevoerd door |
|---|---|---|---|---|---|---|
| [Datum] | [Systeem] | [CVE-nummer] | [Score] | [Ja/Nee/Compenserend] | [Succesvol/Mislukt] | [Naam] |

## 7. KPI's

| KPI | Doel |
|---|---|
| Kritieke patches binnen 48 uur | 100% |
| Hoge patches binnen 14 dagen | ≥ 95% |
| Gemiddelde patch-tijd (midden) | < 30 dagen |
| Percentage systemen gescand per maand | 100% |
| Percentage ongepatchte kritieke kwetsbaarheden | 0% |

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
