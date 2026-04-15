# Secure Development Policy

**ISO 27001:2022 — A.8.25, A.8.26, A.8.27, A.8.28**

| | |
|---|---|
| **Documentnummer** | ISMS-039 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Lead Developer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid waarborgt dat informatiebeveiliging is geïntegreerd in de volledige levenscyclus van softwareontwikkeling bij [Organisatienaam]. Het geldt voor zowel interne ontwikkeling als uitbestede ontwikkeling.

## 2. Toepassingsgebied

- Alle intern ontwikkelde software en applicaties
- Configuratie en aanpassing van standaardsoftware
- Uitbestede ontwikkelingsprojecten
- API-ontwikkeling en -integraties
- Websites en webapplicaties

**Niet van toepassing als [Organisatienaam] geen software ontwikkelt.** In dat geval wordt deze control als "niet van toepassing" opgenomen in de SoA met als onderbouwing dat de organisatie geen ontwikkelactiviteiten uitvoert.

## 3. Secure Development Lifecycle (A.8.25)

### 3.1 Fasen

| Fase | Beveiligingsactiviteiten |
|---|---|
| **Requirements** | Beveiligingseisen identificeren (authenticatie, autorisatie, encryptie, logging, input-validatie) |
| **Design** | Threat modeling, architectuurreview, security design patterns toepassen |
| **Ontwikkeling** | Secure coding guidelines volgen, geen hardcoded credentials, dependency scanning |
| **Testing** | SAST, DAST, dependency scanning, handmatige code review, penetratietest (bij kritieke apps) |
| **Deployment** | Configuratie hardening, secrets management, deployment-checklist |
| **Onderhoud** | Patch management, kwetsbaarheidsmonitoring, security updates |

### 3.2 Beveiligingseisen (A.8.26)

Elke applicatie voldoet minimaal aan:

| Categorie | Eisen |
|---|---|
| **Authenticatie** | Sterke authenticatie, MFA voor beheer en gevoelige functies, geen standaard credentials |
| **Autorisatie** | Rolgebaseerde toegangscontrole (RBAC), least privilege, server-side enforcement |
| **Input-validatie** | Alle invoer valideren server-side, whitelisting boven blacklisting |
| **Output-encoding** | Context-aware output encoding (HTML, JavaScript, SQL, URL) |
| **Sessiebeheer** | Veilige sessie-tokens, time-out, invalidatie bij logout |
| **Cryptografie** | TLS 1.2+ voor transport, AES-256 voor opslag, geen eigen crypto implementeren |
| **Foutafhandeling** | Geen gevoelige informatie in foutmeldingen, gestructureerde logging |
| **Logging** | Authenticatie-events, autorisatie-failures, transacties loggen (geen PII in logs) |

### 3.3 OWASP Top 10 als baseline

Alle webapplicaties worden getoetst aan de OWASP Top 10:

| # | Kwetsbaarheid | Preventieve maatregel |
|---|---|---|
| A01 | Broken Access Control | RBAC, server-side validatie, deny by default |
| A02 | Cryptographic Failures | TLS, AES-256, geen hardcoded keys |
| A03 | Injection | Parameterized queries, input-validatie, ORM |
| A04 | Insecure Design | Threat modeling, security requirements |
| A05 | Security Misconfiguration | Hardening checklists, geen default credentials |
| A06 | Vulnerable Components | Dependency scanning, automatische updates |
| A07 | Authentication Failures | MFA, sterke wachtwoorden, rate limiting |
| A08 | Software and Data Integrity | Code signing, dependency verification |
| A09 | Logging and Monitoring Failures | Centraal loggen, alerting |
| A10 | Server-Side Request Forgery | Input-validatie, network segmentatie |

## 4. Secure Coding Guidelines (A.8.28)

| Regel | Beschrijving |
|---|---|
| Geen hardcoded credentials | Wachtwoorden, API-keys en tokens in een secrets manager, nooit in broncode |
| Dependency management | Alleen goedgekeurde libraries, regelmatig scannen op kwetsbaarheden (Dependabot, Snyk) |
| Code review verplicht | Elke wijziging wordt gereviewed door minimaal 1 andere ontwikkelaar via pull request |
| Branch protection | Main/production branch is beschermd: geen directe push, verplichte review |
| Foutafhandeling | Catch exceptions, log details server-side, toon generieke foutmelding aan gebruiker |
| Geen debug in productie | Debug-mode, verbose logging en test-accounts worden verwijderd voor productie-deployment |

## 5. Omgevingsscheiding (A.8.31)

| Omgeving | Doel | Data | Toegang |
|---|---|---|---|
| **Ontwikkeling** | Bouwen en experimenteren | Synthetische of gemaskeerde data | Ontwikkelaars |
| **Test / Staging** | Testen en acceptatie | Gemaskeerde data (geen productiedata) | Ontwikkelaars + testers |
| **Productie** | Live dienstverlening | Echte data | Beperkt: alleen via deployment pipeline |

Productiedata wordt **nooit** gekopieerd naar ontwikkel- of testomgevingen zonder maskering.

## 6. Beveiligingstesting (A.8.29)

| Testtype | Wanneer | Door wie | Frequentie |
|---|---|---|---|
| **SAST** (Static Analysis) | Tijdens ontwikkeling (CI/CD) | Automatisch (SonarQube, Semgrep) | Bij elke commit |
| **Dependency scanning** | Tijdens ontwikkeling (CI/CD) | Automatisch (Dependabot, Snyk) | Dagelijks |
| **DAST** (Dynamic Analysis) | Na deployment op staging | Automatisch (OWASP ZAP) | Bij elke release |
| **Code review** | Vóór merge naar main | Ontwikkelaar (peer) | Bij elke pull request |
| **Penetratietest** | Na major release of jaarlijks | Externe partij | Jaarlijks (kritieke apps) |

## 7. Uitbestede ontwikkeling (A.8.30)

Bij uitbestede ontwikkeling gelden aanvullende eisen:

| Eis | Beschrijving |
|---|---|
| Contractuele beveiligingseisen | Secure coding guidelines, testverplichtingen, code-eigendom |
| Code-eigendom | Broncode is eigendom van [Organisatienaam] |
| Code review | [Organisatienaam] behoudt het recht om code te reviewen |
| Testresultaten | Leverancier levert SAST/DAST-resultaten bij oplevering |
| Auditrecht | Recht om beveiligingsaudits uit te voeren op de ontwikkelomgeving |
| Geheimhouding | NDA verplicht voor alle betrokken ontwikkelaars |

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
