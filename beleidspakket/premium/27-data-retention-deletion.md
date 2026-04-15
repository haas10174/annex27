# Data Retention & Deletion Beleid

**ISO 27001:2022 — A.8.10 (nieuw in 2022)**

| | |
|---|---|
| **Documentnummer** | ISMS-027 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft hoe lang informatie wordt bewaard en hoe informatie veilig wordt verwijderd wanneer deze niet langer nodig is. Correcte dataretentie beschermt tegen onnodig risico en waarborgt naleving van de AVG.

## 2. Principe

Informatie wordt niet langer bewaard dan noodzakelijk voor het doel waarvoor het is verzameld, tenzij wettelijke bewaartermijnen een langere periode vereisen.

## 3. Bewaartermijnen

### 3.1 Bedrijfsinformatie

| Informatiecategorie | Bewaartermijn | Wettelijke grondslag |
|---|---|---|
| Financiële administratie (facturen, boekhouding) | 7 jaar | Fiscale bewaarplicht |
| Contracten en overeenkomsten | Looptijd + 5 jaar | Verjaringstermijn |
| Offertes (geaccepteerd) | Looptijd contract + 2 jaar | Bedrijfsbelang |
| Offertes (niet geaccepteerd) | 1 jaar | Bedrijfsbelang |
| Correspondentie met klanten | 5 jaar na laatste contact | Bedrijfsbelang |
| Projectdocumentatie | 5 jaar na afronding | Bedrijfsbelang |
| Notulen directievergaderingen | 7 jaar | Governance |
| ISMS-documentatie en registraties | 3 jaar na vervanging/afsluiting | ISO 27001 |

### 3.2 Persoonsgegevens

| Categorie | Bewaartermijn | Grondslag |
|---|---|---|
| Personeelsdossiers | Duur dienstverband + 2 jaar | Arbeidsrecht |
| Salarisadministratie | 7 jaar | Fiscale bewaarplicht |
| Sollicitatiegegevens (afgewezen) | 4 weken (of 1 jaar met toestemming) | AVG |
| Klantgegevens (actieve klant) | Duur relatie + 2 jaar | Uitvoering overeenkomst |
| Klantgegevens (inactieve klant) | 2 jaar na laatste interactie | Gerechtvaardigd belang |
| Websitebezoekersdata (cookies/analytics) | 26 maanden | AVG / ePrivacy |
| Camerabeelden | 30 dagen | AVG |
| Toegangslogboek (badge) | 1 jaar | Gerechtvaardigd belang |

### 3.3 IT en beveiliging

| Categorie | Bewaartermijn |
|---|---|
| Systeemlogbestanden | 12 maanden |
| Beveiligingsincident-dossiers | 3 jaar na afsluiting |
| Auditrapportages | 3 jaar |
| Backups | [30 / 60 / 90] dagen rollend |
| E-mailarchief (zakelijk) | 5 jaar |

## 4. Verwijderingsprocedure

### 4.1 Digitale informatie

| Classificatie | Verwijderingsmethode |
|---|---|
| Openbaar / Intern | Standaard verwijderen (prullenbak legen) |
| Vertrouwelijk | Permanent wissen (secure delete / overwrite) |
| Geheim | Cryptografische wissing (crypto-shredding) of fysieke vernietiging van de drager |

### 4.2 Fysieke informatie

| Classificatie | Verwijderingsmethode |
|---|---|
| Openbaar / Intern | Recycling |
| Vertrouwelijk | Versnipperen (DIN 66399, minimaal P-3) |
| Geheim | Versnipperen (DIN 66399, minimaal P-5) of professionele vernietigingsdienst |

### 4.3 Hardware en opslagmedia

| Type | Verwijderingsmethode |
|---|---|
| Harde schijven (HDD) | Degaussing of fysieke vernietiging |
| Solid State Drives (SSD) | Cryptografische wissing of fysieke vernietiging |
| USB-sticks / SD-kaarten | Cryptografische wissing of fysieke vernietiging |
| Mobiele apparaten | Factory reset na verwijdering bedrijfsaccount |
| Printers met intern geheugen | Geheugen wissen bij buitengebruikstelling |

## 5. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| Informatie-eigenaar | Bewaakt dat bewaartermijnen worden nageleefd voor eigen informatie |
| IT-beheer | Uitvoeren van technische verwijdering, beheer van backup-retentie |
| HR | Bewaakt bewaartermijnen voor personeelsdossiers |
| CISO | Toezicht op naleving, review van dit beleid |

## 6. Periodieke opschoning

| Activiteit | Frequentie | Verantwoordelijke |
|---|---|---|
| Review van opgeslagen data tegen bewaartermijnen | Halfjaarlijks | Informatie-eigenaren + CISO |
| Opschonen van verlopen backups | Automatisch (conform retentiebeleid) | IT-beheer |
| Controle op verlopen personeelsdossiers | Kwartaallijks | HR |
| Vernietiging van afgeschreven hardware | Bij buitengebruikstelling | IT-beheer |

## 7. Registratie van vernietiging

Bij vernietiging van vertrouwelijke of geheime informatie wordt geregistreerd:

| Datum | Beschrijving | Classificatie | Methode | Uitgevoerd door | Getuige |
|---|---|---|---|---|---|
| [Datum] | [Wat is vernietigd] | [V/G] | [Methode] | [Naam] | [Naam] |

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
