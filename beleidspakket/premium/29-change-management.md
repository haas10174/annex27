# Change Management Procedure

**ISO 27001:2022 — A.8.32**

| | |
|---|---|
| **Documentnummer** | ISMS-029 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam IT-beheer / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze procedure waarborgt dat wijzigingen aan informatiesystemen, infrastructuur en configuraties gecontroleerd worden doorgevoerd om risico's voor beschikbaarheid, integriteit en vertrouwelijkheid te minimaliseren.

## 2. Scope

- Wijzigingen aan servers, netwerkapparatuur en infrastructuur
- Software-installaties, -updates en -upgrades
- Configuratiewijzigingen aan beveiligingssystemen (firewall, EDR, IAM)
- Wijzigingen aan cloudomgevingen
- Database-aanpassingen
- Wijzigingen aan ISMS-gerelateerde processen

**Buiten scope:** Standaard patches binnen het reguliere patchproces (ISMS-017), tenzij het een major upgrade betreft.

## 3. Classificatie van wijzigingen

| Type | Beschrijving | Goedkeuring door | Doorlooptijd |
|---|---|---|---|
| **Standaard** | Routine, laag risico, eerder succesvol uitgevoerd (bijv. gebruikersaccount aanmaken) | IT-beheer | Zelfde dag |
| **Normaal** | Geplande wijziging met beperkt risico | CISO of IT-manager | Minimaal 3 werkdagen |
| **Significant** | Grote impact, veel systemen of gebruikers betrokken | CISO + Directie | Minimaal 5 werkdagen |
| **Nood** | Onmiddellijke actie vereist om een incident of kritieke kwetsbaarheid op te lossen | CISO (achteraf bevestiging directie) | Onmiddellijk |

## 4. Change Management Proces

### 4.1 Normaal en significant

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | **Aanvraag:** Change request indienen met beschrijving, reden, risico-inschatting en rollback-plan | Aanvrager |
| 2 | **Beoordeling:** Impact- en risicoanalyse, afhankelijkheden identificeren | IT-beheer + CISO |
| 3 | **Goedkeuring:** Formele goedkeuring door bevoegde rol (zie sectie 3) | Goedkeurder |
| 4 | **Planning:** Datum, tijdstip, betrokkenen, communicatie naar gebruikers | IT-beheer |
| 5 | **Testen:** Wijziging testen op testomgeving (indien beschikbaar) | IT-beheer |
| 6 | **Uitvoering:** Wijziging doorvoeren, bij voorkeur buiten piekuren | IT-beheer |
| 7 | **Verificatie:** Controleren of de wijziging succesvol is en geen bijwerkingen heeft | IT-beheer |
| 8 | **Documentatie:** Vastleggen in het change log | IT-beheer |

### 4.2 Noodwijzigingen

| Stap | Actie |
|---|---|
| 1 | Mondelinge goedkeuring van CISO (of IT-manager bij afwezigheid) |
| 2 | Wijziging uitvoeren met minimaal 1 persoon als getuige |
| 3 | Achteraf: change request alsnog documenteren binnen 24 uur |
| 4 | Achteraf: formele goedkeuring door CISO/directie |
| 5 | Evaluatie: was de noodprocedure gerechtvaardigd? |

## 5. Change Request Formulier

| Veld | Invullen |
|---|---|
| **Change ID** | CHG-[JJJJ]-[NNN] |
| **Datum aanvraag** | [DD-MM-JJJJ] |
| **Aanvrager** | [Naam + functie] |
| **Type** | [Standaard / Normaal / Significant / Nood] |
| **Beschrijving** | [Wat wordt gewijzigd en waarom] |
| **Betrokken systemen** | [Lijst van systemen] |
| **Risico-inschatting** | [Laag / Midden / Hoog] |
| **Impact bij mislukking** | [Beschrijf] |
| **Rollback-plan** | [Hoe wordt de wijziging teruggedraaid als het misgaat] |
| **Geplande datum/tijd** | [DD-MM-JJJJ HH:MM] |
| **Geschatte downtime** | [Duur] |
| **Communicatie nodig** | [Ja/Nee — naar wie] |
| **Goedgekeurd door** | [Naam + datum] |
| **Uitgevoerd door** | [Naam + datum] |
| **Resultaat** | [Succesvol / Mislukt / Rollback uitgevoerd] |
| **Opmerkingen** | [Eventuele bijzonderheden] |

## 6. Change Log

| ID | Datum | Beschrijving | Type | Systemen | Risico | Uitgevoerd door | Goedgekeurd door | Resultaat |
|---|---|---|---|---|---|---|---|---|
| CHG-2026-001 | [Datum] | [Beschrijving] | [Type] | [Systemen] | [L/M/H] | [Naam] | [Naam] | [Succes/Mislukt] |

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
