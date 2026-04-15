# Logging & Monitoring Beleid

**ISO 27001:2022 — A.8.15, A.8.16**

| | |
|---|---|
| **Documentnummer** | ISMS-018 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam IT-beheer / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft welke activiteiten worden gelogd, hoe logs worden beschermd en bewaard, en hoe monitoring wordt ingezet om beveiligingsincidenten tijdig te detecteren.

## 2. Wat wordt gelogd

### 2.1 Verplichte loggebeurtenissen

| Categorie | Gebeurtenissen |
|---|---|
| **Authenticatie** | Succesvolle en mislukte inlogpogingen, wachtwoordwijzigingen, MFA-gebeurtenissen, accountvergrendelingen |
| **Autorisatie** | Toekenning en intrekking van rechten, privilege-escalatie, toegang tot vertrouwelijke data |
| **Systeembeheer** | Configuratiewijzigingen, installatie/verwijdering software, service starts/stops, backup-activiteiten |
| **Dataverwerking** | Toegang tot bestanden met classificatie Vertrouwelijk of Geheim, export van data, bulkdownloads |
| **Netwerk** | Firewall-events (blokkades), VPN-verbindingen, ongebruikelijke verkeerpatronen |
| **E-mail** | Inkomende/uitgaande e-mail met bijlagen (metadata), geblokkeerde phishing |
| **Fysieke toegang** | Badge-events (in/uit), toegang tot zone 3 en 4 |

### 2.2 Minimale logvelden

Elke logentry bevat minimaal:

| Veld | Beschrijving |
|---|---|
| Tijdstip | Datum en tijd (UTC of met tijdzone), gesynchroniseerd via NTP |
| Bron | Systeem of applicatie die de entry genereert |
| Actor | Gebruikersnaam, service account of IP-adres |
| Actie | Wat is er gedaan (login, wijziging, toegang, etc.) |
| Object | Waarop is de actie uitgevoerd (bestand, account, systeem) |
| Resultaat | Succes of falen |

## 3. Logbescherming

| Maatregel | Beschrijving |
|---|---|
| **Integriteit** | Logs worden beschermd tegen wijziging en verwijdering; bij voorkeur opgeslagen op een apart, write-once systeem |
| **Toegang** | Alleen CISO en aangewezen IT-beheerders hebben leestoegang tot logs |
| **Scheiding** | Beheerders kunnen hun eigen logentries niet wijzigen of verwijderen |
| **Encryptie** | Logs die buiten het netwerk worden verstuurd (naar SIEM/cloud) zijn versleuteld in transit |
| **Kloksynchronisatie** | Alle systemen zijn gesynchroniseerd via NTP (maximale afwijking: 1 seconde) |

## 4. Bewaartermijnen

| Logtype | Bewaartermijn |
|---|---|
| Authenticatie- en autorisatielogs | 12 maanden |
| Systeembeheer- en configuratielogs | 12 maanden |
| Netwerk- en firewalllogs | 6 maanden |
| Toegang tot vertrouwelijke data | 24 maanden |
| Fysieke toegangslogs | 12 maanden |
| Incidentgerelateerde logs | Tot 3 jaar na afsluiting incident |

Na afloop van de bewaartermijn worden logs veilig verwijderd.

## 5. Monitoring (A.8.16)

### 5.1 Wat wordt gemonitord

| Scenario | Detectiemethode | Actie bij detectie |
|---|---|---|
| Meerdere mislukte inlogpogingen (>5 in 10 min) | Automatisch alert | Account vergrendelen, IT-beheer informeren |
| Inlogpoging buiten werktijd vanuit onbekend IP | Automatisch alert | CISO informeren, onderzoeken |
| Privilege-escalatie zonder goedkeuring | Automatisch alert | Onmiddellijk onderzoeken, account blokkeren |
| Bulk-download of -export van data | Automatisch alert | CISO informeren |
| Malware-detectie | Endpoint protection alert | Systeem isoleren, incident response starten |
| Ongebruikelijke uitgaande netwerkverkeer | Firewall / IDS alert | Onderzoeken, mogelijk incident |
| Wijziging aan beveiligingsconfiguratie | Logmonitoring | Verifiëren of change management is gevolgd |

### 5.2 Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| IT-beheer | Dagelijks review van kritieke alerts, beheer van log-infrastructuur |
| CISO | Wekelijks review van monitoringrapportage, escalatie van afwijkingen |
| Directie | Ontvangen van kwartaalrapportage over monitoring-bevindingen |

### 5.3 Tools

| Doel | Tool / Oplossing |
|---|---|
| Centraal logbeheer | [SIEM / Azure Sentinel / Splunk / ELK Stack / etc.] |
| Endpoint detectie | [EDR-oplossing: CrowdStrike / Defender / SentinelOne / etc.] |
| Netwerkmonitoring | [Firewall logging / IDS/IPS] |
| Alerting | [E-mail / Teams / PagerDuty / etc.] |

## 6. Review en verbetering

- Logbeleid wordt jaarlijks geëvalueerd op volledigheid en effectiviteit
- Na elk significant beveiligingsincident wordt beoordeeld of de logging voldoende was voor detectie en forensisch onderzoek
- Bevindingen worden meegenomen in de managementreview

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
