# Leveranciersbeleid

**ISO 27001:2022 — A.5.19, A.5.20, A.5.21, A.5.22**

| | |
|---|---|
| **Documentnummer** | ISMS-023 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft hoe [Organisatienaam] informatiebeveiligingsrisico's beheert in relaties met leveranciers, dienstverleners en andere externe partijen die toegang hebben tot informatie of systemen.

## 2. Toepassingsgebied

Alle externe partijen die:
- Toegang hebben tot informatie of informatiesystemen van [Organisatienaam]
- Persoonsgegevens verwerken namens [Organisatienaam]
- ICT-diensten leveren (hosting, SaaS, managed services, ontwikkeling)
- Fysiek toegang hebben tot locaties met gevoelige informatie

## 3. Leveranciersclassificatie

| Categorie | Beschrijving | Voorbeeld | Beoordelingsfrequentie |
|---|---|---|---|
| **Kritiek** | Directe toegang tot vertrouwelijke data of bedrijfskritieke systemen | Cloud-hostingprovider, SaaS-kernplatform, managed IT | Jaarlijks + bij wijzigingen |
| **Hoog** | Toegang tot interne systemen of persoonsgegevens | Salarisverwerker, CRM-provider, extern IT-personeel | Jaarlijks |
| **Midden** | Beperkte toegang of indirecte impact | Kantoorautomatisering, communicatietools, printerleverancier | Tweejaarlijks |
| **Laag** | Geen toegang tot informatie of systemen | Kantoorbenodigdheden, schoonmaak (zonder toegang tot beveiligde zones) | Bij contractverlenging |

## 4. Selectie van leveranciers

Voorafgaand aan het aangaan van een relatie met een nieuwe leverancier (categorie Kritiek of Hoog):

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Beveiligingsbeoordeling uitvoeren (ISMS-024) | CISO |
| 2 | Controleren op ISO 27001 certificering of vergelijkbaar | CISO |
| 3 | Beoordelen van leveranciers privacy- en beveiligingsbeleid | CISO |
| 4 | Verwerkersovereenkomst (AVG) afsluiten indien persoonsgegevens betrokken | Juridisch / CISO |
| 5 | Beveiligingseisen opnemen in contract | CISO + Inkoop |

## 5. Contractuele beveiligingseisen (A.5.20)

Contracten met leveranciers van categorie Kritiek en Hoog bevatten minimaal:

| Eis | Beschrijving |
|---|---|
| Vertrouwelijkheidsclausule | Geheimhouding van alle verstrekte informatie |
| Beveiligingseisen | Verplichte beveiligingsmaatregelen (encryptie, toegangscontrole, logging) |
| Incidentmelding | Verplichting om beveiligingsincidenten binnen 24 uur te melden |
| Auditrecht | Recht om audits uit te voeren of auditrapporten op te vragen |
| Subverwerkers | Toestemming vereist voor inschakeling van sub-leveranciers |
| Datalocatie | Gegevens worden verwerkt en opgeslagen binnen de EU/EER |
| Exit-regeling | Procedure voor teruggave of vernietiging van data bij beëindiging |
| Aansprakelijkheid | Aansprakelijkheid bij beveiligingsincidenten of dataverlies |

## 6. Monitoring van leveranciers (A.5.22)

| Activiteit | Frequentie | Methode |
|---|---|---|
| Review van SLA-prestaties | Kwartaallijks | SLA-rapportage |
| Controleren van beveiligingscertificeringen | Jaarlijks | Opvragen certificaat / SOC2-rapport |
| Beoordelen van incidenten bij leverancier | Bij voorval | Incidentrapportage leverancier |
| Hernieuwde beveiligingsbeoordeling | Conform classificatie (sectie 3) | Assessment template (ISMS-024) |
| Controleren op gewijzigde subverwerkers | Jaarlijks | Leverancierscommunicatie |

## 7. ICT-toeleveringsketen (A.5.21)

Voor leveranciers in de ICT-keten (hosting, software, managed services):

- Beoordeel risico's in de toeleveringsketen (cascade-risico)
- Verifieer of de leverancier eigen leveranciers beoordeelt
- Eis transparantie over subverwerkers en hun locaties
- Beoordeel de afhankelijkheid: wat als deze leverancier uitvalt?

## 8. Leveranciersregister

| ID | Leverancier | Dienst | Categorie | ISO 27001? | Contract tot | VWO? | Laatste beoordeling | Volgende beoordeling | Status |
|---|---|---|---|---|---|---|---|---|---|
| L-001 | [Naam] | [Dienst] | [K/H/M/L] | [Ja/Nee] | [Datum] | [Ja/Nee] | [Datum] | [Datum] | [Actief] |
| L-002 | | | | | | | | | |

*VWO = Verwerkersovereenkomst*

## 9. Beëindiging leveranciersrelatie

Bij beëindiging van een leveranciersrelatie:

| Stap | Actie |
|---|---|
| 1 | Verifieer dat alle data is teruggegeven of vernietigd (met bewijsstuk) |
| 2 | Trek alle toegangsrechten van de leverancier in |
| 3 | Deactiveer leveranciersaccounts |
| 4 | Archiveer contractdocumentatie |
| 5 | Update het leveranciersregister |

## 10. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
