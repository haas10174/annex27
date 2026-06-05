# Cloud- en leveranciersbeoordeling overheid (BIO + CLOUD Act-toets)

**BIO 2.0 §5.19-5.22 / AVG art. 28 + 46 / Bzk-handreiking Cloud**

| | |
|---|---|
| **Documentnummer** | ISMS-055 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam Inkoop + CISO] |
| **Goedgekeurd door** | [Naam Directie / College van B&W] |
| **Reviewcyclus** | Jaarlijks + bij elke nieuwe cloud-leverancier |

---

## 1. Doel

Overheidsinstanties moeten bij het inschakelen van cloud- en ICT-leveranciers meer dan alleen AVG-conformiteit aantonen. BIO 2.0 stelt aanvullende eisen aan leveranciersbeoordeling, en de risico's van wetgeving buiten de EU (zoals de Amerikaanse CLOUD Act) moeten expliciet gewogen worden. Deze procedure structureert die beoordeling.

## 2. Reikwijdte

Iedere leverancier die voor [Organisatienaam]:
- Persoonsgegevens van burgers of medewerkers verwerkt
- Toegang heeft tot systemen die BBN2- of BBN3-informatie bevatten
- Cloud- of SaaS-diensten levert
- Beheer- of onderhoudswerk uitvoert op kritieke ICT-systemen

## 3. Vier-stappen-toets

### Stap 1 &mdash; AVG-conformiteit

| Toets | Acceptatiecriterium |
|---|---|
| Heeft de leverancier een AVG-conforme verwerkersovereenkomst? | Ja, met clausules conform ISMS-042 |
| Worden persoonsgegevens uitsluitend binnen de EER verwerkt? | Ja, of doorgifte op grondslag art. 45-46 |
| Is een actueel sub-processors-register beschikbaar? | Ja, publiek of op verzoek |
| Heeft de leverancier een FG of vergelijkbaar aanspreekpunt? | Ja, contactgegevens vermeld |

### Stap 2 &mdash; BIO 2.0-conformiteit

| Toets | Acceptatiecriterium |
|---|---|
| Welke BBN-classificatie heeft de informatie? | BBN1 / BBN2 / BBN3 vastgesteld |
| Welke BIO-maatregelen worden door leverancier ingevuld? | Per maatregel duidelijk vastgelegd |
| Heeft leverancier een onafhankelijke audit (ISO 27001 / NEN 7510 / SOC 2 type 2)? | Ja, niet ouder dan 18 maanden |
| Levert leverancier compliance-rapporten op aanvraag? | Ja, jaarlijks of bij verzoek |
| Wordt logging beschikbaar gesteld voor toetsing door [Organisatienaam]? | Ja, conform ISMS-049 |

### Stap 3 &mdash; CLOUD Act / extraterritoriale wetgeving

Veel cloud-diensten zijn dochterondernemingen van Amerikaanse moedermaatschappijen. Onder de Amerikaanse CLOUD Act kan een rechtshandhavingsinstantie in de VS data opvragen, zelfs als die data fysiek in Europa staat. Voor BBN2 en BBN3 informatie is dit een serieus risico.

| Toets | Acceptatiecriterium |
|---|---|
| Is de leverancier een Amerikaanse onderneming of dochter daarvan? | Indien ja, hoge alertheid |
| Worden encryptiesleutels door [Organisatienaam] beheerd (BYOK of HYOK)? | Ja, indien BBN3 |
| Is een Europese alternatief beschikbaar tegen redelijke kosten? | Onderzocht, beargumenteerd |
| Heeft leverancier transparantierapport over dwangverzoeken? | Ja, publiek beschikbaar |
| Bevat het contract een waarschuwingsplicht bij data-aanvragen, voor zover juridisch toegestaan? | Ja, of expliciet onderbouwd waarom niet |

Voor BBN3 is een Amerikaanse leverancier zonder mitigerende maatregelen (BYOK, juridische opinie) **niet acceptabel** zonder uitdrukkelijk besluit op directie/college-niveau.

### Stap 4 &mdash; Operationele en exit-strategie

| Toets | Acceptatiecriterium |
|---|---|
| Is er een formele SLA met meetbare uptime- en RTO/RPO-doelen? | Ja, passend bij BBN |
| Is er een data-portability-clausule (uitvoer in open formaat)? | Ja, bij contract-einde |
| Is er een exit-plan met overdracht- en vernietigingsclausules? | Ja, getoetst |
| Wat is de financiele gezondheid van de leverancier? | Recente jaarrekening + risicoscan |
| Welke afhankelijkheden ontstaan (vendor lock-in)? | Geinventariseerd, beargumenteerd |

## 4. Beoordelingsproces

1. Inkoop verzamelt informatie via leveranciers-vragenlijst
2. CISO beoordeelt BIO-stappen 2 + 4
3. FG beoordeelt AVG-stap 1 + privacy-aspecten van stap 3
4. Bij twijfel: juridisch advies of DPIA
5. Beslissing in CISO-FG-overleg, geescaleerd naar directie bij BBN3 of CLOUD Act-risico
6. Vastlegging in leveranciersregister inclusief onderbouwing

## 5. Periodieke heroverweging

Leveranciers worden minimaal jaarlijks heroverwogen. Triggers voor extra beoordeling:

- Overname of bestuurswisseling leverancier
- Wijziging in sub-processors
- Materiele wijziging in wetgeving (bv. nieuwe interpretatie CLOUD Act)
- Datalek of significant cyberincident bij leverancier
- Verandering in BBN-classificatie van de informatie

## 6. Open source en hybride oplossingen

Voor BBN3 en gevoelige BBN2 onderzoekt [Organisatienaam] actief open-source of overheidsbrede oplossingen (bv. Common Ground, GovTech-initiatieven). Selectie van proprietary cloud-oplossingen vereist motivering waarom een open of nationale variant niet volstaat.

## 7. Soevereine cloud

Bij keuze voor een soevereine cloud-aanbieder ("EU-only" of "RIO-gecertificeerd") wordt geverifieerd:
- Geen Amerikaanse moedermaatschappij of bestuurlijke zeggenschap
- Personeel met toegang tot data heeft EU-werkverleningsovereenkomst
- Sleutelbeheer is operationeel gescheiden van leveranciers-personeel
- Onafhankelijke audit op deze controles is beschikbaar

## 8. Documentatie

Per leverancier wordt vastgelegd:
- Resultaat van vier-stappen-toets
- BBN-classificatie van betrokken informatie
- Mitigerende maatregelen (BYOK, juridische opinie, alternatieven onderzoek)
- Beslissing en motivering
- Verlenging- of opzeggings-trigger

Bewaartermijn: looptijd contract + 7 jaar.

## 9. Rol FG en CISO

| Onderwerp | FG | CISO |
|---|---|---|
| AVG en doorgifte buiten EER | Primair | Adviseert |
| BIO-maatregelen leverancier | Adviseert | Primair |
| CLOUD Act-risico | Co-leidt | Co-leidt |
| Continuiteit en exit | Adviseert | Primair |
| Eind-advies aan directie | Co-tekent | Co-tekent |

---

**Bijlagen**
- Bijlage A: Vragenlijst voor cloud-leveranciers
- Bijlage B: CLOUD Act-toetsingskader (Bzk-handreiking-stijl)
- Bijlage C: Voorbeelden van acceptabele en niet-acceptabele opzet

**Gerelateerde documenten**
- [[ISMS-023 Leveranciersbeleid]]
- [[ISMS-024 Leveranciersbeoordeling]]
- [[ISMS-042 Verwerkersovereenkomst]]
- [[ISMS-053 BIO-classificatie]]
- [[36 BIO 2.0 ↔ ISO 27001-mapping]]
