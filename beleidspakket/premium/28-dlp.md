# Data Leakage Prevention Richtlijn

**ISO 27001:2022 — A.8.12 (nieuw in 2022)**

| | |
|---|---|
| **Documentnummer** | ISMS-028 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / IT-beheer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze richtlijn beschrijft de maatregelen die [Organisatienaam] treft om ongeautoriseerde openbaarmaking, extractie of verlies van vertrouwelijke informatie te voorkomen.

## 2. Risicoscenario's

| Scenario | Kanaal | Voorbeeld |
|---|---|---|
| Onbedoeld delen | E-mail | Vertrouwelijk document naar verkeerde ontvanger |
| Ongeautoriseerde upload | Cloud | Bedrijfsdata naar privé-cloudopslag |
| Fysiek verlies | Apparaat | Verloren laptop of USB-stick met klantdata |
| Kwaadwillig lekken | Divers | Medewerker kopieert data vóór vertrek |
| Social engineering | Telefoon/e-mail | Informatie vrijgeven na phishing of pretexting |
| Onbeveiligde overdracht | Bestandsdeling | Vertrouwelijk document via WeTransfer of WhatsApp |

## 3. Preventieve maatregelen

### 3.1 Technisch

| Maatregel | Beschrijving | Prioriteit |
|---|---|---|
| **E-mail DLP** | Regels die vertrouwelijke informatie detecteren in uitgaande e-mail (BSN, creditcard, labels) en blokkeren/waarschuwen | Hoog |
| **Endpoint DLP** | Controle op kopiëren naar USB, externe schijven en niet-goedgekeurde cloud | Hoog |
| **Cloud DLP** | Monitoring en blokkering van delen van vertrouwelijke bestanden buiten de organisatie | Hoog |
| **Schijfversleuteling** | BitLocker/FileVault op alle endpoints om data te beschermen bij verlies/diefstal | Verplicht |
| **USB-beperking** | Blokkeren of beperken van USB-opslagapparaten op werkstations | Midden |
| **Watermarking** | Digitale watermerken op vertrouwelijke documenten (optioneel) | Laag |
| **Screen capture beperking** | Beperking op screenshots van vertrouwelijke applicaties (waar technisch mogelijk) | Laag |

### 3.2 Organisatorisch

| Maatregel | Beschrijving |
|---|---|
| **Classificatiebeleid** | Informatie correct classificeren zodat DLP-regels kunnen werken (ISMS-014) |
| **Acceptable Use Policy** | Regels voor gebruik van IT-middelen en dataverwerking (ISMS-011) |
| **Awareness training** | Medewerkers trainen op risico's van datalekken en correcte omgang met data |
| **Offboarding proces** | Toegang intrekken en data controleren bij uitdiensttreding (ISMS-009) |
| **Need-to-know principe** | Toegang beperken tot wie het echt nodig heeft |

### 3.3 Bij uitdiensttreding (verhoogd risico)

| Maatregel | Timing |
|---|---|
| Monitoring van dataverkeer verhogen (downloads, e-mail bijlagen, USB) | Vanaf opzegging tot vertrek |
| Cloud-deellinks reviewen | Op laatste werkdag |
| Verifiëren dat geen bedrijfsdata op privéapparaten staat | Op laatste werkdag |
| Wachtwoorden van gedeelde accounts wijzigen | Op laatste werkdag |

## 4. Detectie en respons

### 4.1 DLP-alerts

| Alert | Ernst | Actie |
|---|---|---|
| Vertrouwelijk document gedetecteerd in uitgaande e-mail | Midden | Automatisch blokkeren + notificatie aan medewerker en CISO |
| Bulk-download van vertrouwelijke bestanden | Hoog | Alert naar CISO, onderzoek starten |
| Data kopiëren naar USB | Midden | Blokkeren (of loggen + alert) |
| Delen met extern domein via cloud | Midden | Blokkeren + notificatie |
| Verdacht patroon bij medewerker in opzegperiode | Hoog | CISO informeren, verhoogde monitoring |

### 4.2 Bij bevestigd datalek

Activeer het Incident Response Plan (ISMS-019). Beoordeel of meldplicht AP/NCSC van toepassing is.

## 5. Uitzonderingen

Uitzonderingen op DLP-regels (bijv. voor het delen van informatie met auditors of juridische partijen) worden:
- Aangevraagd bij de CISO
- Schriftelijk goedgekeurd met reden
- Tijdgebonden
- Geregistreerd

## 6. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
