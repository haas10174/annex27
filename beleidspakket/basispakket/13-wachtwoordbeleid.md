# Wachtwoord- & Authenticatiebeleid

**ISO 27001:2022 — A.5.17, A.8.5**

| | |
|---|---|
| **Documentnummer** | ISMS-013 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft de eisen aan wachtwoorden en authenticatiemechanismen binnen [Organisatienaam], gebaseerd op actuele best practices en NIST SP 800-63B richtlijnen.

## 2. Wachtwoordeisen

### 2.1 Sterkte

| Eis | Standaard accounts | Privileged / admin accounts |
|---|---|---|
| Minimale lengte | 12 tekens | 16 tekens |
| Complexiteit | Minimaal 3 van 4 categorieën (hoofdletter, kleine letter, cijfer, speciaal teken) | Alle 4 categorieën |
| Maximale leeftijd | Geen verplichte periodieke wijziging* | Geen verplichte periodieke wijziging* |
| Hergebruik | Laatste 10 wachtwoorden mogen niet hergebruikt worden | Laatste 15 |
| Vergrendeling | Na 5 foutieve pogingen: 15 minuten vergrendeld | Na 3 pogingen: vergrendeld tot handmatige reset |

*Conform NIST SP 800-63B: periodieke wachtwoordwijziging wordt niet meer aanbevolen. Wachtwoorden worden wél gewijzigd bij vermoeden van compromittatie.

### 2.2 Verboden wachtwoorden

- Wachtwoorden die voorkomen op lijsten van veelgebruikte/gelekte wachtwoorden
- Wachtwoorden die de organisatienaam, gebruikersnaam of geboortedatum bevatten
- Wachtwoorden die eerder bij een datalek zijn blootgesteld

### 2.3 Wachtwoordmanager

- Het gebruik van een door [Organisatienaam] goedgekeurde wachtwoordmanager is **verplicht**
- Goedgekeurde wachtwoordmanagers: [Bitwarden / 1Password / KeePass / etc.]
- De master-wachtwoord van de wachtwoordmanager voldoet aan de eisen voor privileged accounts

## 3. Multi-Factor Authenticatie (MFA)

### 3.1 Verplichte MFA

MFA is **verplicht** voor:

| Systeem / Situatie | MFA vereist |
|---|---|
| E-mail en kantoorautomatisering (Microsoft 365 / Google Workspace) | Ja |
| VPN en remote access | Ja |
| Cloud-beheerconsoles (AWS, Azure, GCP) | Ja |
| Privileged / admin accounts | Ja |
| Toegang tot vertrouwelijke of geheime informatie | Ja |
| Externe toegang door leveranciers | Ja |
| Bedrijfskritische applicaties ([CRM / ERP / etc.]) | Ja |

### 3.2 Toegestane MFA-methoden

| Methode | Acceptabel | Opmerking |
|---|---|---|
| Authenticator-app (TOTP) | Ja (aanbevolen) | Microsoft Authenticator, Google Authenticator, Authy |
| Hardware-token (FIDO2/WebAuthn) | Ja (sterkst) | YubiKey of vergelijkbaar |
| Push-notificatie | Ja | Met number-matching |
| SMS-verificatie | Nee | Kwetsbaar voor SIM-swapping; alleen als noodoplossing |
| E-mailverificatie | Nee | Onvoldoende beveiliging |

## 4. Service accounts en technische accounts

- Service accounts gebruiken unieke, sterke wachtwoorden (minimaal 24 tekens, willekeurig gegenereerd)
- Wachtwoorden van service accounts worden opgeslagen in een beveiligd wachtwoordkluissysteem
- Service accounts hebben geen interactieve logintoegang
- Service accounts worden jaarlijks gereviewed op noodzakelijkheid

## 5. Initiële wachtwoorden en wachtwoordherstel

- Initiële wachtwoorden zijn uniek en tijdelijk; wijziging bij eerste login is verplicht
- Wachtwoordherstel gaat via een beveiligd self-service portaal met MFA-verificatie
- Helpdesk-medewerkers verifiëren de identiteit van de aanvrager via een tweede kanaal voordat een wachtwoord wordt gereset
- Tijdelijke wachtwoorden verlopen na maximaal 24 uur

## 6. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| Medewerkers | Naleven van dit beleid, geheimhouding wachtwoorden, gebruik van wachtwoordmanager |
| IT-beheer | Technische afdwinging (lengtebeleid, MFA, vergrendeling), beheer wachtwoordkluizen |
| CISO | Monitoring naleving, review beleid, evaluatie incidenten m.b.t. authenticatie |

## 7. Incidenten

Bij vermoeden van gecompromitteerde inloggegevens:

1. Wijzig onmiddellijk het wachtwoord
2. Meld het bij [IT-helpdesk / CISO]
3. Controleer recente accountactiviteit
4. CISO beoordeelt of verdere actie nodig is (bijv. sessies beëindigen, breder onderzoek)

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
