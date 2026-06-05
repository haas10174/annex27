# EPD-logging-beleid (zorg)

**NEN 7510-2:2024 §8.15 + NEN 7513 / AVG art. 32 + WGBO art. 7:454**

| | |
|---|---|
| **Documentnummer** | ISMS-049 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam CISO / IT Security Officer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Jaarlijks + bij wijziging EPD-leverancier |

---

## 1. Doel

Toegang tot patientgegevens is wettelijk en normatief altijd traceerbaar. Dit beleid beschrijft welke gebeurtenissen [Organisatienaam] logt in en rondom het EPD, hoe lang en hoe de logs worden beschermd, gecontroleerd en gebruikt.

## 2. Toepassingsgebied

Het EPD en alle systemen die er functioneel mee samenhangen: lab, beeldarchief (PACS), e-Health portaal, patientenportaal, eRecept, dossiernotities, integratie-services (LSP/Vecozo/edifact) en alle administratieve back-office-applicaties met dossier-context.

## 3. Wat wordt minimaal gelogd? (NEN 7513-compliant)

| Categorie | Voorbeelden | Logniveau |
|---|---|---|
| **Toegang** | Inloggen, uitloggen, sessietime-out, geblokkeerd account, MFA-verificatie | Altijd |
| **Dossier-acties** | Openen, sluiten, exporteren, afdrukken, e-mailen, screen-share, kopieren naar klembord | Altijd |
| **Schrijfacties** | Notitie aanmaken, wijzigen, verwijderen, anonimiseren | Altijd |
| **Administratieve handelingen** | Toegangsrechten wijzigen, account aanmaken/sluiten, autorisatie-profiel wijzigen | Altijd |
| **Configuratiewijzigingen** | Templates, formulieren, integratie-instellingen | Altijd |
| **Noodtoegang (break-glass)** | Activering, motivatie, geraadpleegd dossier, beoordeling achteraf | Altijd + meldingsplicht |
| **Datatransport** | Berichten via LSP/Vecozo, edifact-uitwisseling, API-calls externe systemen | Altijd |

Elk logrecord bevat ten minste: actor (gebruiker-ID, naam, rol), tijdstempel UTC + lokale tijdzone, dossier-ID (gehasht of geanonimiseerd), handeling, bronsysteem, IP-adres, werkstation.

## 4. Wat wordt NIET gelogd

- Wachtwoorden in plaintext (alleen hash van resultaat: succes/fail)
- Privacy-content van vrije velden (alleen referentie naar veld-ID)
- Patient-NAW in raw vorm in administratieve logs (gebruik pseudo-identifier)

## 5. Bewaartermijn

| Soort log | Bewaartermijn | Reden |
|---|---|---|
| Toegang en dossier-acties | [20 jaar minimum] | WGBO bewaarplicht patientdossier + audit-spoor over levensduur dossier |
| Administratieve logs (autorisatie, accounts) | 7 jaar | Aansluiting op fiscaal/personeel |
| Noodtoegang | [20 jaar minimum] | Verantwoording per geval |
| Security-incidenten / SIEM-logs | Minimaal 1 jaar | Forensisch onderzoek |

## 6. Bescherming van de logs

- **Read-only en append-only** voor zorgverleners en administratieve gebruikers
- Logs worden **dagelijks** geexporteerd naar een gescheiden log-omgeving (SIEM of Log Management) met aparte access control
- Beheerders die de loginfrastructuur beheren hebben **geen toegang** tot patientgegevens (segregation of duties)
- Logs zijn **encrypted at-rest** en **versleuteld in-transit** (TLS 1.2+)
- Backups van logs zijn onderdeel van het reguliere backupbeleid (ISMS-031), inclusief test-restore minimaal jaarlijks

## 7. Toegang tot logs

| Rol | Toegang | Doel |
|---|---|---|
| **FG** | Lezen, exporteren | Privacy-toezicht, behandeling klachten |
| **CISO / IB-officer** | Lezen, exporteren | Beveiligingsmonitoring, incident response |
| **Bestuurder bij incident** | Op verzoek, gelogde inzage | Crisismanagement |
| **Interne audit / accountant** | Op verzoek, alleen indien onderbouwd doel | Controle |
| **Externe auditor / certificeerder** | Tijdelijke read-only, onder geheimhouding | NEN 7510 certificering |
| **Politie / justitie** | Alleen bij rechtmatig vordering | Wettelijke verplichting |

Elke toegang tot logs wordt zelf ook gelogd (meta-logging).

## 8. Periodieke review en audit

| Frequentie | Onderwerp | Door |
|---|---|---|
| Dagelijks | Geautomatiseerde alerts (uitval, manipulatie-detectie) | SIEM / IT Security |
| Wekelijks | Steekproef autorisatie- en account-wijzigingen | IT Security |
| Maandelijks | Steekproef behandelrelatie + noodtoegang | FG |
| Kwartaal | Trendrapport (volume, type, afwijkingen) | FG + CISO |
| Jaarlijks | Volledige NEN 7513-compliance review | Externe auditor of intern audit |

## 9. Logging bij externe leveranciers

Externe partijen (EPD-leverancier, PACS-leverancier, e-Health platform) die patientgegevens verwerken, leveren conform de verwerkersovereenkomst (ISMS-042) hun logs aan in een formaat dat toetsbaar is door [Organisatienaam]. De FG kan steekproeven of audits uitvoeren.

## 10. Klachten en signalen

Een medewerker, patient of derde die een vermoeden heeft van onrechtmatige toegang, kan hiervan melding doen via **[fg@organisatienaam.nl]**. De FG beoordeelt aan de hand van de logs binnen [N] werkdagen of er sprake is van een datalek (ISMS-040) en informeert de melder over de uitkomst.

---

**Bijlagen**
- Bijlage A: Mapping NEN 7513-velden naar log-records
- Bijlage B: Voorbeeld SIEM-alert-regels (afwijkende toegangspatronen)
- Bijlage C: Jaarlijkse compliance-checklist NEN 7513

**Gerelateerde documenten**
- [[ISMS-018 Logging & monitoring (algemeen)]]
- [[ISMS-048 Behandelrelatie-procedure]]
- [[ISMS-050 Break-glass-procedure]]
- [[NEN 7510-2 §8.15]]
- [[NEN 7513]]
