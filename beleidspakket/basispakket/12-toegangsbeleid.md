# Toegangsbeleid

**ISO 27001:2022 — A.5.15, A.5.18, A.8.2, A.8.3, A.8.4, A.8.5**

| | |
|---|---|
| **Documentnummer** | ISMS-012 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid regelt wie toegang krijgt tot welke informatie en systemen, op basis van welke principes, en hoe toegangsrechten worden aangevraagd, verleend, gewijzigd en ingetrokken.

## 2. Principes

| Principe | Beschrijving |
|---|---|
| **Need-to-know** | Toegang wordt alleen verleend tot informatie die noodzakelijk is voor de functie-uitoefening |
| **Least privilege** | Gebruikers krijgen de minimaal benodigde rechten; geen standaard admin-accounts |
| **Scheiding van taken** | Kritieke taken worden verdeeld over meerdere personen om fraude en fouten te voorkomen |
| **Standaard: geen toegang** | Nieuwe accounts hebben standaard geen toegang; rechten worden expliciet toegekend |

## 3. Toegangsrollen

| Rol | Toegangsniveau | Toekenning door |
|---|---|---|
| **Standaard gebruiker** | Toegang tot eigen afdeling en benodigde applicaties | Leidinggevende + IT-beheer |
| **Beheerder** | Uitgebreide rechten voor systeembeheer | CISO + IT-manager |
| **Privileged user** | Root/admin-toegang tot infrastructuur | CISO (met goedkeuring directie) |
| **Extern / leverancier** | Beperkte, tijdgebonden toegang tot specifieke systemen | CISO |
| **Alleen-lezen** | Inzage zonder wijzigingsrechten | Leidinggevende |

## 4. Levenscyclus van toegangsrechten

### 4.1 Aanvragen

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Leidinggevende dient een toegangsverzoek in via [ticketsysteem / formulier / e-mail] | Leidinggevende |
| 2 | Verzoek bevat: naam medewerker, functie, benodigde systemen en rol, reden | Aanvrager |
| 3 | CISO of IT-beheer beoordeelt het verzoek op basis van need-to-know en least privilege | CISO / IT-beheer |
| 4 | Bij goedkeuring: rechten worden toegekend en geregistreerd | IT-beheer |

### 4.2 Wijzigen

- Bij functiewijziging: leidinggevende meldt dit aan IT-beheer
- Oude rechten worden ingetrokken, nieuwe rechten worden toegekend
- Geen cumulatie van rechten uit vorige functies

### 4.3 Intrekken

- Bij uitdiensttreding: alle rechten worden ingetrokken op de laatste werkdag (zie HR-beleid ISMS-009)
- Bij langdurige afwezigheid (>30 dagen): rechten worden tijdelijk opgeschort
- Bij beveiligingsincident: rechten kunnen onmiddellijk worden ingetrokken door CISO of IT-beheer

### 4.4 Periodieke review

| Activiteit | Frequentie | Verantwoordelijke |
|---|---|---|
| Review van gebruikersrechten | Halfjaarlijks | Leidinggevenden + IT-beheer |
| Review van privileged accounts | Kwartaallijks | CISO |
| Review van externe toegang | Kwartaallijks | CISO |
| Controle op inactieve accounts | Maandelijks | IT-beheer |

Inactieve accounts (>90 dagen geen login) worden onderzocht en bij bevestiging van inactiviteit uitgeschakeld.

## 5. Privileged Access Management (A.8.2)

Accounts met verhoogde rechten (admin, root, service accounts) zijn onderworpen aan aanvullende eisen:

- Persoonlijke admin-accounts (geen gedeelde admin-accounts)
- MFA verplicht op alle privileged accounts
- Logging van alle privileged activiteiten
- Tijdgebonden elevated access waar mogelijk (just-in-time)
- Aparte admin-werkstations of jump servers voor beheertaken
- Kwartaallijkse review door CISO

## 6. Externe toegang (leveranciers, partners)

| Eis | Beschrijving |
|---|---|
| Tijdgebonden | Toegang verloopt automatisch na afgesproken periode |
| Minimale rechten | Alleen toegang tot benodigde systemen |
| MFA verplicht | Externe accounts altijd met multi-factor authenticatie |
| Logging | Alle activiteiten van externe accounts worden gelogd |
| Overeenkomst | Verwerkersovereenkomst of NDA vereist voorafgaand aan toegang |
| Goedkeuring | Elk extern account wordt goedgekeurd door CISO |

## 7. Toegang tot broncode (A.8.4)

Indien van toepassing:

- Toegang tot broncode-repositories is beperkt tot ontwikkelaars met een aantoonbare behoefte
- Leestoegang en schrijftoegang worden apart toegekend
- Wijzigingen in broncode worden gereviewed (code review / pull request)
- Productieomgevingen zijn gescheiden van ontwikkel- en testomgevingen

## 8. Registraties

| Registratie | Bewaartermijn |
|---|---|
| Toegangsverzoeken en goedkeuringen | 2 jaar |
| Wijzigingen in toegangsrechten | 2 jaar |
| Resultaten van periodieke reviews | 2 jaar |
| Logging van privileged access | Minimaal 1 jaar |

## 9. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
