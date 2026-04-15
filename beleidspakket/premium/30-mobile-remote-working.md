# Mobile Device & Remote Working Policy

**ISO 27001:2022 — A.8.1**

| | |
|---|---|
| **Documentnummer** | ISMS-030 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / IT-beheer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft de beveiligingseisen voor het gebruik van mobiele apparaten en voor het werken op afstand (thuiswerken, onderweg, bij klanten).

## 2. Toepassingsgebied

- Alle bedrijfslaptops, -tablets en -telefoons
- Privéapparaten die zakelijk worden gebruikt (BYOD)
- Alle vormen van werken buiten de kantoorlocatie

## 3. Mobiele apparaten

### 3.1 Bedrijfsapparaten

| Eis | Beschrijving |
|---|---|
| Registratie | Elk apparaat wordt geregistreerd in het asset register (ISMS-008) |
| Versleuteling | Schijfversleuteling verplicht (BitLocker / FileVault / native device encryption) |
| Schermvergrendeling | Automatisch na maximaal 5 minuten inactiviteit |
| Authenticatie | PIN (minimaal 6 cijfers), wachtwoord of biometrie |
| Updates | Besturingssysteem en applicaties up-to-date houden; automatische updates ingeschakeld |
| Antimalware | Endpoint protection actief en up-to-date |
| Remote wipe | Mogelijkheid tot wissen op afstand bij verlies of diefstal |
| MDM | Apparaat beheerd via Mobile Device Management waar mogelijk |

### 3.2 BYOD (Bring Your Own Device)

| Eis | Beschrijving |
|---|---|
| Goedkeuring | BYOD alleen na schriftelijke goedkeuring door CISO |
| Scheiding | Zakelijke data gescheiden van privédata (containerisatie of apart werkprofiel) |
| Minimale eisen | Recente OS-versie, schermvergrendeling, versleuteling |
| Wissen bij vertrek | Bedrijfsdata wordt gewist bij beëindiging dienstverband |
| Geen opslag | Vertrouwelijke data niet lokaal opslaan op privéapparaat |
| MFA | Toegang tot bedrijfssystemen uitsluitend via MFA |

### 3.3 Verlies of diefstal

Bij verlies of diefstal van een apparaat met bedrijfsinformatie:

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Onmiddellijk melden bij IT-beheer en CISO | Medewerker |
| 2 | Remote wipe uitvoeren | IT-beheer |
| 3 | Wachtwoorden wijzigen van accounts die op het apparaat actief waren | IT-beheer + medewerker |
| 4 | Beoordelen of er sprake is van een datalek (meldplicht AP) | CISO |
| 5 | Registreren als beveiligingsincident | CISO |
| 6 | Aangifte bij politie (bij diefstal) | Medewerker |

## 4. Werken op afstand

### 4.1 Beveiligingseisen thuiswerkplek

| Eis | Beschrijving |
|---|---|
| Netwerkverbinding | Beveiligd Wi-Fi-netwerk (WPA2/WPA3) met sterk wachtwoord; openbare netwerken alleen via VPN |
| VPN | Verplicht bij toegang tot bedrijfssystemen buiten kantoor |
| Fysieke beveiliging | Werkplek niet zichtbaar voor huisgenoten of bezoekers bij vertrouwelijke informatie |
| Vergrendeling | Werkstation vergrendelen bij verlaten werkplek, ook thuis |
| Printen | Vertrouwelijke documenten bij voorkeur niet thuis printen; indien nodig: versnipperen na gebruik |
| Gesprekken | Vertrouwelijke gesprekken niet voeren in openbare ruimtes of bij open ramen |

### 4.2 Werken onderweg of bij klanten

| Eis | Beschrijving |
|---|---|
| Schouder-surfen | Privacy-screen gebruiken in openbare ruimtes (trein, vliegtuig, horeca) |
| Openbaar Wi-Fi | Alleen verbinden via VPN; nooit direct inloggen op bedrijfssystemen |
| Apparaat onbeheerd | Laptop nooit onbeheerd achterlaten (auto, hotelkamer zonder kluis, vergaderruimte) |
| Fysieke documenten | Geen vertrouwelijke documenten achterlaten bij klant of onderweg |

### 4.3 Gebruik van cloud en samenwerkingstools

- Uitsluitend goedgekeurde tools gebruiken voor zakelijke communicatie en bestandsdeling
- Geen bedrijfsinformatie via privé-e-mail, WhatsApp (privé) of niet-goedgekeurde clouddiensten
- Videobellen: gebruik zakelijke tools (Teams/Zoom zakelijk) met wachtruimte en vergadercode

## 5. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| Medewerker | Naleven van dit beleid, melden van verlies/diefstal, beveiligen van thuiswerkplek |
| IT-beheer | Configuratie en beheer van apparaten, MDM, VPN, remote wipe |
| Leidinggevende | Toezicht op naleving binnen het team |
| CISO | Beleidseigenaar, toezicht, beoordeling incidenten |

## 6. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
