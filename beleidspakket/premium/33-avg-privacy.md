# Data Protection / AVG Beleid

**ISO 27001:2022 — A.5.34**

| | |
|---|---|
| **Documentnummer** | ISMS-033 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / FG / Privacyverantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft hoe [Organisatienaam] persoonsgegevens beschermt conform de Algemene Verordening Gegevensbescherming (AVG/GDPR) en hoe privacy is geïntegreerd in het ISMS.

## 2. Beginselen (Artikel 5 AVG)

| Beginsel | Beschrijving | Hoe wij dit waarborgen |
|---|---|---|
| **Rechtmatigheid** | Persoonsgegevens worden verwerkt op basis van een geldige grondslag | Register van verwerkingsactiviteiten met grondslag per verwerking |
| **Doelbinding** | Gegevens worden alleen verwerkt voor het doel waarvoor ze zijn verzameld | Doelomschrijving per verwerking; geen hergebruik zonder grondslag |
| **Dataminimalisatie** | Alleen de noodzakelijke gegevens worden verwerkt | Periodieke review: verwerken wij meer dan nodig? |
| **Juistheid** | Gegevens zijn actueel en correct | Processen voor correctie op verzoek van betrokkene |
| **Opslagbeperking** | Gegevens worden niet langer bewaard dan nodig | Retentiebeleid (ISMS-027) |
| **Integriteit en vertrouwelijkheid** | Passende beveiliging tegen ongeautoriseerde toegang, verlies of vernietiging | ISMS-maatregelen (encryptie, toegangscontrole, logging) |
| **Verantwoordingsplicht** | De organisatie kan aantonen dat zij voldoet | Documentatie, audits, registers |

## 3. Register van verwerkingsactiviteiten (Artikel 30)

| # | Verwerking | Doel | Categorieën betrokkenen | Categorieën gegevens | Grondslag | Bewaartermijn | Verwerker | Doorgifte buiten EU? |
|---|---|---|---|---|---|---|---|---|
| 1 | [Salarisadministratie] | [Uitvoering arbeidsovereenkomst] | [Medewerkers] | [NAW, BSN, salaris, bankgegevens] | [Overeenkomst] | [7 jaar] | [Salarisprovider] | [Nee] |
| 2 | [Klantbeheer / CRM] | [Uitvoering overeenkomst, relatiebeheer] | [Klanten, contactpersonen] | [NAW, e-mail, telefoon, functie] | [Overeenkomst / Gerechtvaardigd belang] | [Duur relatie + 2 jaar] | [CRM-provider] | [Nee] |
| 3 | [Sollicitatieprocedure] | [Werving en selectie] | [Sollicitanten] | [NAW, CV, motivatiebrief] | [Toestemming] | [4 weken / 1 jaar] | [Geen] | [Nee] |
| 4 | [Website analytics] | [Websiteoptimalisatie] | [Websitebezoekers] | [IP-adres, gedragsdata] | [Toestemming] | [26 maanden] | [Analytics-provider] | [Te beoordelen] |
| 5 | | | | | | | | |

## 4. Rechten van betrokkenen

| Recht | Beschrijving | Reactietermijn | Verantwoordelijke |
|---|---|---|---|
| **Inzage** (Art. 15) | Betrokkene mag inzage vragen in eigen persoonsgegevens | 1 maand | CISO / FG |
| **Rectificatie** (Art. 16) | Onjuiste gegevens laten corrigeren | 1 maand | CISO / dataeigenaar |
| **Verwijdering** (Art. 17) | Gegevens laten verwijderen ("recht op vergetelheid") | 1 maand | CISO / IT-beheer |
| **Beperking** (Art. 18) | Verwerking tijdelijk stoppen | 1 maand | CISO |
| **Dataportabiliteit** (Art. 20) | Gegevens ontvangen in machineleesbaar formaat | 1 maand | IT-beheer |
| **Bezwaar** (Art. 21) | Bezwaar maken tegen verwerking op basis van gerechtvaardigd belang | 1 maand | CISO / FG |

### 4.1 Proces bij verzoek

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Verzoek ontvangen en registreren | CISO / FG |
| 2 | Identiteit van verzoeker verifiëren | CISO |
| 3 | Beoordelen of het verzoek geldig is en of uitzonderingen gelden | CISO / Juridisch |
| 4 | Verzoek uitvoeren binnen 1 maand | CISO + IT-beheer |
| 5 | Betrokkene informeren over resultaat | CISO |
| 6 | Registreren in verzoeksregister | CISO |

## 5. Verwerkersovereenkomsten (Artikel 28)

Wanneer [Organisatienaam] een verwerker inschakelt die persoonsgegevens verwerkt:

- Een verwerkersovereenkomst (VWO) is **verplicht** vóór aanvang van de verwerking
- De VWO bevat minimaal: onderwerp, duur, aard en doel, type gegevens, categorieën betrokkenen, verplichtingen verwerker
- Verwerkers worden beoordeeld op beveiligingsniveau (zie ISMS-023 en ISMS-024)
- Register van verwerkers wordt bijgehouden

## 6. Data Protection Impact Assessment (DPIA)

Een DPIA is verplicht bij verwerkingen met een **hoog risico**, waaronder:

- Grootschalige verwerking van bijzondere persoonsgegevens
- Systematische monitoring van openbaar toegankelijke ruimtes
- Profilering met rechtsgevolgen
- Nieuwe technologieën met onbekend risico

### 6.1 DPIA-proces

| Stap | Actie |
|---|---|
| 1 | Beschrijving van de verwerking, doel en noodzaak |
| 2 | Beoordeling van de risico's voor betrokkenen |
| 3 | Identificatie van maatregelen om risico's te mitigeren |
| 4 | Documentatie en goedkeuring door CISO/FG |
| 5 | Indien hoog restrisico: voorafgaande raadpleging AP |

## 7. Datalekprocedure

Verwezen wordt naar het Incident Response Plan (ISMS-019). Aanvullend voor datalekken:

| Actie | Termijn |
|---|---|
| Melding aan Autoriteit Persoonsgegevens | Binnen 72 uur na ontdekking |
| Melding aan betrokkenen (bij hoog risico) | Zo spoedig mogelijk |
| Registratie in datalekregister | Onmiddellijk |

### 7.1 Datalekregister

| # | Datum ontdekking | Beschrijving | Categorieën betrokkenen | Aantal betrokkenen | Gemeld aan AP | Gemeld aan betrokkenen | Maatregelen | Status |
|---|---|---|---|---|---|---|---|---|
| 1 | [Datum] | [Beschrijving] | [Categorie] | [Aantal] | [Ja/Nee + datum] | [Ja/Nee + datum] | [Maatregelen] | [Open/Afgesloten] |

## 8. Privacy by Design en by Default

Bij de ontwikkeling of aanschaf van nieuwe systemen en processen:

- **Privacy by Design:** Privacybescherming wordt vanaf het begin meegenomen in het ontwerp
- **Privacy by Default:** Standaardinstellingen zijn zo privacyvriendelijk mogelijk (minimale dataverzameling, beperkte toegang)
- CISO/FG wordt betrokken bij de ontwerpfase

## 9. Functionaris Gegevensbescherming (FG/DPO)

| | |
|---|---|
| Aangesteld | [Ja / Nee / Niet verplicht] |
| Naam | [Naam of "extern via [bedrijf]"] |
| Contactgegevens | [E-mail / telefoon] |

Een FG is verplicht als [Organisatienaam] op grote schaal bijzondere persoonsgegevens verwerkt of systematische monitoring uitvoert.

## 10. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
