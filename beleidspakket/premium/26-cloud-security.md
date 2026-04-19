# Cloud Security Beleid

**ISO 27001:2022 — A.5.23 (nieuw in 2022)**

| | |
|---|---|
| **Documentnummer** | ISMS-026 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / IT-beheer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft de beveiligingseisen voor het gebruik van clouddiensten door [Organisatienaam]. Het definieert verantwoordelijkheden conform het shared responsibility model en waarborgt dat cloudgebruik in lijn is met het ISMS.

## 2. Toepassingsgebied

Alle clouddiensten die worden gebruikt door [Organisatienaam], inclusief:
- Infrastructure as a Service (IaaS): AWS, Azure, GCP
- Platform as a Service (PaaS): databases, app hosting
- Software as a Service (SaaS): Microsoft 365, CRM, boekhouding, projectmanagement
- Storage as a Service: OneDrive, SharePoint, Google Drive

## 3. Goedkeuring van clouddiensten

### 3.1 Selectiecriteria

Nieuwe clouddiensten worden beoordeeld op:

| Criterium | Minimale eis |
|---|---|
| Datalocatie | Verwerking en opslag binnen EU/EER |
| Certificering | ISO 27001 of SOC 2 Type II (voorkeur) |
| Encryptie in transit | TLS 1.2+ |
| Encryptie at rest | AES-256 of equivalent |
| MFA-ondersteuning | Verplicht beschikbaar |
| Logging en audit trail | Toegangs- en activiteitenlogging beschikbaar |
| SLA beschikbaarheid | Minimaal 99.5% voor bedrijfskritieke diensten |
| Verwerkersovereenkomst | AVG-conforme verwerkersovereenkomst beschikbaar |
| Exit-strategie | Data-export mogelijkheid in open formaat |
| Subverwerkers | Transparante lijst, melding bij wijzigingen |

### 3.2 Goedkeuringsproces

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Aanvraag door medewerker/afdeling | Aanvrager |
| 2 | Beoordeling tegen selectiecriteria | CISO |
| 3 | Leveranciersbeoordeling (bij categorie Kritiek/Hoog) | CISO |
| 4 | Verwerkersovereenkomst afsluiten (bij persoonsgegevens) | CISO / Juridisch |
| 5 | Goedkeuring en opname in goedgekeurde diensten-register | CISO |
| 6 | Configuratie conform beveiligingseisen | IT-beheer |

### 3.3 Niet-goedgekeurde clouddiensten (Shadow IT)

- Het gebruik van niet-goedgekeurde clouddiensten voor bedrijfsinformatie is verboden
- IT-beheer monitort op shadow IT via netwerk- en endpointmonitoring
- Bij ontdekking: dienst blokkeren, medewerker informeren, gegevens migreren naar goedgekeurd alternatief

## 4. Shared Responsibility Model

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 400" width="100%" style="max-width:720px;display:block;margin:16pt auto;">
  <text x="360" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Shared Responsibility — wie is verantwoordelijk per laag</text>
  <text x="170" y="50" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">IaaS</text>
  <text x="360" y="50" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">PaaS</text>
  <text x="550" y="50" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">SaaS</text>
  <text x="170" y="66" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">bv. AWS EC2 · Azure VM</text>
  <text x="360" y="66" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">bv. Heroku · App Engine</text>
  <text x="550" y="66" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">bv. M365 · Salesforce</text>
  <rect x="80" y="80" width="180" height="38" rx="4" fill="#FECACA" stroke="#DC2626" stroke-width="1"/>
  <text x="170" y="104" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Data — KLANT</text>
  <rect x="270" y="80" width="180" height="38" rx="4" fill="#FECACA" stroke="#DC2626" stroke-width="1"/>
  <text x="360" y="104" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Data — KLANT</text>
  <rect x="460" y="80" width="180" height="38" rx="4" fill="#FECACA" stroke="#DC2626" stroke-width="1"/>
  <text x="550" y="104" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Data — KLANT</text>
  <rect x="80" y="124" width="180" height="32" rx="4" fill="#FED7AA" stroke="#EA580C" stroke-width="1"/>
  <text x="170" y="144" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Applicatie — KLANT</text>
  <rect x="270" y="124" width="180" height="32" rx="4" fill="#FED7AA" stroke="#EA580C" stroke-width="1"/>
  <text x="360" y="144" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Applicatie — KLANT</text>
  <rect x="460" y="124" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="144" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Applicatie — provider</text>
  <rect x="80" y="162" width="180" height="32" rx="4" fill="#FED7AA" stroke="#EA580C" stroke-width="1"/>
  <text x="170" y="182" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Runtime — KLANT</text>
  <rect x="270" y="162" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="360" y="182" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Runtime — provider</text>
  <rect x="460" y="162" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="182" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Runtime — provider</text>
  <rect x="80" y="200" width="180" height="32" rx="4" fill="#FED7AA" stroke="#EA580C" stroke-width="1"/>
  <text x="170" y="220" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">OS — KLANT</text>
  <rect x="270" y="200" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="360" y="220" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">OS — provider</text>
  <rect x="460" y="200" width="180" height="32" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="220" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">OS — provider</text>
  <rect x="80" y="238" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="170" y="256" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Virtualisatie — provider</text>
  <rect x="270" y="238" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="360" y="256" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Virtualisatie — provider</text>
  <rect x="460" y="238" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="256" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Virtualisatie — provider</text>
  <rect x="80" y="272" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="170" y="290" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Netwerk — provider</text>
  <rect x="270" y="272" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="360" y="290" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Netwerk — provider</text>
  <rect x="460" y="272" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="290" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Netwerk — provider</text>
  <rect x="80" y="306" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="170" y="324" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Hardware — provider</text>
  <rect x="270" y="306" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="360" y="324" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Hardware — provider</text>
  <rect x="460" y="306" width="180" height="28" rx="4" fill="#DBEAFE" stroke="#2563EB" stroke-width="1"/>
  <text x="550" y="324" text-anchor="middle" fill="#1E3A8A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Hardware — provider</text>
  <g transform="translate(30, 365)">
    <rect x="0" y="0" width="14" height="14" rx="2" fill="#FECACA"/>
    <text x="20" y="11" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Altijd klant</text>
    <rect x="130" y="0" width="14" height="14" rx="2" fill="#FED7AA"/>
    <text x="150" y="11" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Klant (IaaS/PaaS)</text>
    <rect x="310" y="0" width="14" height="14" rx="2" fill="#DBEAFE"/>
    <text x="330" y="11" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Provider</text>
  </g>
</svg>

| Beveiligingslaag | IaaS | PaaS | SaaS |
|---|---|---|---|
| Data | **Klant** | **Klant** | **Klant** |
| Applicatie | **Klant** | **Klant** | Provider |
| Middleware / Runtime | **Klant** | Provider | Provider |
| Besturingssysteem | **Klant** | Provider | Provider |
| Virtualisatie | Provider | Provider | Provider |
| Netwerk | Provider | Provider | Provider |
| Fysieke infrastructuur | Provider | Provider | Provider |

**Klant** = [Organisatienaam] is verantwoordelijk

## 5. Configuratie-eisen

### 5.1 Identiteit en toegang

- MFA verplicht voor alle beheeraccounts en gebruikersaccounts
- SSO (Single Sign-On) implementeren waar mogelijk
- Principle of least privilege voor alle accounts
- Geen gedeelde accounts
- Conditional access policies configureren (locatie, apparaat, risico)

### 5.2 Databeveiliging

- Vertrouwelijke data alleen in goedgekeurde cloudopslag
- Encryptie at rest inschakelen (customer-managed keys voor categorie Geheim)
- Geen vertrouwelijke data in publiek toegankelijke opslag (public buckets/shares)
- Data Loss Prevention (DLP) configureren waar beschikbaar
- Externe deling beperken tot goedgekeurde domeinen

### 5.3 Logging en monitoring

- Audit logging inschakelen voor alle clouddiensten
- Logs centraliseren in [SIEM / log management systeem]
- Alerts instellen voor verdachte activiteiten (ongebruikelijke locaties, bulk-downloads, admin-wijzigingen)
- Bewaartermijn: minimaal 12 maanden

### 5.4 Netwerk

- Netwerksegmentatie toepassen (VPC's, subnets)
- Alleen noodzakelijke poorten en protocollen openstellen
- Web Application Firewall (WAF) voor publiek toegankelijke applicaties
- VPN of private endpoints voor beheertoegang

## 6. Register van goedgekeurde clouddiensten

| Dienst | Type | Provider | Dataclassificatie | ISO 27001? | VWO? | Beheerder | Goedgekeurd | Review |
|---|---|---|---|---|---|---|---|---|
| [Microsoft 365] | SaaS | Microsoft | Vertrouwelijk | Ja | Ja | [IT] | [Datum] | [Datum] |
| [AWS] | IaaS | Amazon | Vertrouwelijk | Ja | Ja | [IT] | [Datum] | [Datum] |
| | | | | | | | | |

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
