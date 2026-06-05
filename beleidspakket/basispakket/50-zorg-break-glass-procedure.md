# Break-glass-procedure (noodtoegang patientdossier)

**NEN 7510-2:2024 §5.15 zorgspecifiek / AVG art. 9 lid 2 sub c (vitaal belang)**

| | |
|---|---|
| **Documentnummer** | ISMS-050 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam FG / Medisch Manager] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Halfjaarlijks |

---

## 1. Doel

De break-glass-procedure beschrijft hoe een zorgverlener in een acute situatie toegang krijgt tot een patientdossier waarvoor hij of zij geen vooraf vastgestelde behandelrelatie heeft. Het doel is enerzijds zorgcontinuiteit borgen, anderzijds elke gebruik te kunnen verantwoorden.

## 2. Wanneer mag break-glass worden gebruikt?

Uitsluitend bij **acute, vitale noodzaak** waar reguliere toegang niet haalbaar is, bijvoorbeeld:

- Reanimatie of acute behandeling van een patient onbekend bij de actor
- Patient bewusteloos en geen contact met behandelaar mogelijk
- Naar voren halen van actuele medicatie of allergieen tijdens crisis
- Calamiteit waarbij dossierraadpleging onmiddellijk levensbedreiging beperkt

Niet toegestaan voor: nieuwsgierigheid, "het kostte te veel moeite om de regulier autorisatie te krijgen", "ik dacht dat het mocht", administratieve afhandeling.

## 3. Hoe werkt het technisch?

In het EPD is een **break-glass-knop** beschikbaar voor alle geautoriseerde zorgverleners. Activeren betekent:

1. Tijdelijke verruiming van toegangsrechten naar het specifieke patient-dossier
2. Verplicht motiveer-veld (minimaal [N] tekens) waarin de noodsituatie wordt beschreven
3. Categoriekeuze (acute behandeling, calamiteit, onmacht patient, anders)
4. Automatische registratie in een **noodtoegang-logbestand** (separated van regulier toegangslog)
5. Realtime alert naar FG en CISO (e-mail of dashboard-melding)
6. Automatische time-out: na [4 uur] vervalt de verruimde toegang

## 4. Beoordeling achteraf

Binnen **3 werkdagen** beoordeelt de FG, in overleg met de medisch manager of dienstdoende afdelingsmanager, of de noodtoegang gerechtvaardigd was.

| Uitkomst | Gevolg |
|---|---|
| Gerechtvaardigd | Registratie, geen vervolg |
| Mogelijk onjuist | Gesprek met actor + leertraject |
| Duidelijk onjuist | Disciplinair traject + datalek-onderzoek (ISMS-040) |
| Patroon van misbruik | Tijdelijke schorsing toegang, formeel onderzoek, eventueel ontslag, melding AP |

De beoordeling wordt vastgelegd in het noodtoegang-register.

## 5. Communicatie naar patient

Wanneer break-glass-toegang naar achteraf onrechtmatig blijkt, wordt de patient binnen [2 weken] geinformeerd, conform de datalek-procedure. Bij gerechtvaardigde toegang wordt de patient niet actief geinformeerd, tenzij hij of zij een AVG-inzageverzoek indient.

## 6. Toezicht en metrics

De FG rapporteert kwartaalijks aan de directie:

| Indicator | Doel |
|---|---|
| Aantal break-glass-events per periode | Stabiel niveau bewaken |
| Per actor / afdeling | Detecteren van afwijkende patronen |
| Doorlooptijd beoordeling | Binnen 3 werkdagen |
| Aantal achteraf onrechtmatig | Streven naar 0 |
| Awareness-effect | Reductie t.o.v. vorige periode |

## 7. Awareness en training

Bij indiensttreding wordt de break-glass-procedure expliciet uitgelegd, inclusief voorbeelden van wel/niet-toegestane situaties. Bij jaarlijkse awareness-training is dit een vast onderdeel. Daarnaast wordt elke nieuwe medewerker met dossier-toegang verplicht een korte e-learning (5 minuten) afronden voor de toegang wordt vrijgegeven.

## 8. Buitenwerkingstelling

Indien blijkt dat de break-glass-functionaliteit systematisch wordt misbruikt of dat alternatieve toegangsroutes mogelijk zijn (waarneming, doorverwijzing), kan de directie besluiten de functionaliteit tijdelijk in te perken voor specifieke afdelingen of rollen. Dit besluit wordt formeel vastgelegd en gecommuniceerd.

---

**Bijlagen**
- Bijlage A: Voorbeeld-motivaties (acceptabel vs onacceptabel)
- Bijlage B: Beoordelings-checklist FG
- Bijlage C: Communicatie-template patient

**Gerelateerde documenten**
- [[ISMS-048 Behandelrelatie-procedure]]
- [[ISMS-049 EPD-logging-beleid]]
- [[ISMS-040 Datalekprocedure]]
- [[NEN 7510-2 §5.15 zorgspecifiek]]
