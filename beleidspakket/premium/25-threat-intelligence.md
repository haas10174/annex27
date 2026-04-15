# Threat Intelligence Procedure

**ISO 27001:2022 — A.5.7 (nieuw in 2022)**

| | |
|---|---|
| **Documentnummer** | ISMS-025 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze procedure beschrijft hoe [Organisatienaam] informatie over actuele cyberdreigingen verzamelt, analyseert en gebruikt om proactief beveiligingsmaatregelen te treffen. Threat intelligence voorkomt dat de organisatie verrast wordt door bekende aanvalsmethoden.

## 2. Bronnen

### 2.1 Primaire bronnen

| Bron | Type | Frequentie monitoring | Verantwoordelijke |
|---|---|---|---|
| **NCSC** (Nationaal Cyber Security Centrum) | Waarschuwingen, adviezen, dreigingsbeelden | Dagelijks | CISO |
| **CERT.be** (Belgisch CSIRT) | Waarschuwingen en incidentmeldingen | Dagelijks | CISO |
| **CVE/NVD** (National Vulnerability Database) | Nieuwe kwetsbaarheden | Dagelijks (geautomatiseerd) | IT-beheer |
| **Leveranciers-advisories** | Beveiligingsupdates van gebruikte software | Bij publicatie | IT-beheer |
| **Branche-ISAC** | Sectorspecifieke dreigingsinformatie | Wekelijks | CISO |

### 2.2 Aanvullende bronnen

| Bron | Type |
|---|---|
| ENISA (EU cybersecurity agency) | Dreigingslandschap en best practices |
| MITRE ATT&CK | Aanvalstechnieken en -tactieken |
| OWASP | Webapplicatie-kwetsbaarheden |
| Cybersecurity nieuwsplatforms | Actueel dreigingsnieuws (Bleeping Computer, The Record, Security.nl) |
| Vendor threat reports | Jaarlijkse dreigingsrapporten (CrowdStrike, Mandiant, Microsoft) |

## 3. Proces

### 3.1 Verzamelen

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Abonneren op waarschuwingsdiensten (NCSC, CERT.be, leveranciers) | CISO |
| 2 | RSS-feeds of e-mailnotificaties instellen voor CVE's relevant voor gebruikte technologieën | IT-beheer |
| 3 | Deelnemen aan branche-ISAC of kennisdelingsgroep (indien beschikbaar) | CISO |

### 3.2 Analyseren

Bij ontvangst van een dreigingsmelding:

| Criterium | Vraag |
|---|---|
| Relevantie | Gebruiken wij de getroffen technologie, software of dienst? |
| Impact | Wat is de potentiële impact als deze dreiging ons treft? |
| Waarschijnlijkheid | Wordt de kwetsbaarheid actief uitgebuit? Is er een exploit beschikbaar? |
| Urgentie | Hoe snel moeten wij handelen? |

### 3.3 Handelen

| Urgentie | Actie | Tijdlijn |
|---|---|---|
| **Kritiek** (actieve exploitatie van onze technologie) | Onmiddellijke mitigatie, noodpatching, CISO+directie informeren | Binnen uren |
| **Hoog** (kwetsbaarheid in onze technologie, exploit beschikbaar) | Versneld patchproces activeren | Binnen 48 uur |
| **Midden** (kwetsbaarheid in onze technologie, geen exploit bekend) | Opnemen in regulier patchschema | Conform patchbeleid |
| **Laag** (niet direct relevant maar informatief) | Registreren en monitoren | Geen directe actie |

### 3.4 Registreren

Relevante dreigingsmeldingen worden geregistreerd:

| Datum | Bron | Dreiging / CVE | Relevantie | Urgentie | Actie ondernomen | Status |
|---|---|---|---|---|---|---|
| [Datum] | [Bron] | [Beschrijving] | [Ja/Nee] | [K/H/M/L] | [Actie] | [Open/Afgehandeld] |

## 4. Dreigingslandschap review

| Activiteit | Frequentie |
|---|---|
| Dagelijkse check van NCSC/CERT.be waarschuwingen | Dagelijks |
| Review van relevante CVE's | Wekelijks |
| Update dreigingslandschap voor managementreview | Jaarlijks |
| Evaluatie effectiviteit threat intelligence proces | Jaarlijks |

## 5. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
