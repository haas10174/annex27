# Werkinstructies — A.8 Technologische maatregelen

---

## A.8.1 — Gebruikersapparatuur (endpoint devices)


**Wat:**
 Beveiligingseisen voor laptops, telefoons, tablets.

**Doen:**
 Versleuteling, schermvergrendeling, antimalware, MDM, automatische updates (ISMS-030).

**Bewijs:**
 MDM-rapportage, encryptie-status, updatestatus per apparaat.

---

## A.8.2 — Geprivilegieerde toegangsrechten


**Wat:**
 Admin-rechten beperken en controleren.

**Doen:**
 Persoonlijke admin-accounts, MFA verplicht, logging, kwartaallijkse review (ISMS-012).

**Bewijs:**
 Overzicht privileged accounts, MFA-status, review-rapporten, audit logs.

---

## A.8.3 — Beperking van toegang tot informatie


**Wat:**
 Toegang tot data beperken op basis van classificatie en autorisatie.

**Doen:**
 Maprechten configureren, need-to-know toepassen, geen open shares.

**Bewijs:**
 Rechtenmatrix per systeem, configuratie-screenshots, periodieke review.

---

## A.8.4 — Toegang tot broncode


**Wat:**
 Broncode beschermen tegen ongeautoriseerde toegang.

**Doen:**
 Repository-toegang beperken, code reviews verplichten, productie gescheiden van ontwikkeling.

**Bewijs:**
 Repository-toegangslijst, branch protection rules, code review logs.

---

## A.8.5 — Beveiligde authenticatie


**Wat:**
 Authenticatiemechanismen beschermen tegen aanvallen.

**Doen:**
 MFA, accountvergrendeling na mislukte pogingen, geen standaardwachtwoorden (ISMS-013).

**Bewijs:**
 MFA-configuratie, lockout-beleid, geen default credentials.

---

## A.8.6 — Capaciteitsbeheer


**Wat:**
 Systeemcapaciteit monitoren en plannen.

**Doen:**
 Monitoring van CPU, geheugen, opslag en bandbreedte. Alerts bij drempelwaarden.

**Bewijs:**
 Monitoring-dashboards, capaciteitsplannen, alert-configuratie.

---

## A.8.7 — Bescherming tegen malware


**Wat:**
 Systemen beschermen tegen virussen, ransomware en andere malware.

**Doen:**
 EDR/antimalware op alle endpoints, automatische updates, scan van e-mailbijlagen.

**Bewijs:**
 EDR-rapportage, dekkingsoverzicht, scan-resultaten.

---

## A.8.8 — Beheer van technische kwetsbaarheden


**Wat:**
 Kwetsbaarheden identificeren en verhelpen.

**Doen:**
 Maandelijkse scans, patchdeadlines per CVSS-score, noodpatching bij actieve exploitatie (ISMS-017).

**Bewijs:**
 Scan-rapporten, patchlogboek, CVSS-beoordeling per kwetsbaarheid.

---

## A.8.9 — Configuratiebeheer (nieuw 2022)


**Wat:**
 Beveiligde configuraties vaststellen en handhaven.

**Doen:**
 Baselines definiëren (hardening), configuratiewijzigingen via change management, geen standaardinstellingen.

**Bewijs:**
 Configuratie-baselines, hardening-checklists, wijzigingslogboek.

---

## A.8.10 — Verwijdering van informatie (nieuw 2022)


**Wat:**
 Informatie verwijderen wanneer niet langer nodig.

**Doen:**
 Retentiebeleid naleven, veilige verwijdering per classificatieniveau (ISMS-027).

**Bewijs:**
 Retentiebeleid, vernietigingsregistratie, opschoningsrapporten.

---

## A.8.11 — Datamaskering


**Wat:**
 Gegevens maskeren wanneer volledig inzicht niet nodig is.

**Doen:**
 Testomgevingen met gemaskeerde data, geen productiedata in test/dev. Anonimisering waar mogelijk.

**Bewijs:**
 Maskeringsbeleid, bewijs dat testomgevingen geen echte persoonsgegevens bevatten.

---

## A.8.12 — Preventie van gegevenslekken (nieuw 2022)


**Wat:**
 Ongeautoriseerde extractie van data voorkomen.

**Doen:**
 DLP-regels op e-mail, endpoints en cloud. USB-beperking. Monitoring bij uitdiensttreding (ISMS-028).

**Bewijs:**
 DLP-configuratie, alert-logboek, USB-beleid.

---

## A.8.13 — Back-up van informatie


**Wat:**
 Regelmatige backups met hersteltesten.

**Doen:**
 3-2-1 strategie, encryptie, immutable backups, halfjaarlijkse hersteltest (ISMS-031).

**Bewijs:**
 Backup-schema, testresultaten, retentie-overzicht.

---

## A.8.14 — Redundantie van informatieverwerkende faciliteiten


**Wat:**
 Kritieke systemen redundant opzetten.

**Doen:**
 Redundante servers, redundante internetverbinding, failover voor bedrijfskritieke applicaties.

**Bewijs:**
 Architectuuroverzicht met redundantie, failover-testresultaten.

---

## A.8.15 — Logging


**Wat:**
 Relevante gebeurtenissen loggen.

**Doen:**
 Authenticatie, autorisatie, configuratiewijzigingen, datatoegang loggen. Logs beschermen (ISMS-018).

**Bewijs:**
 Logconfiguratie per systeem, logbewaartermijnen, toegangscontrole op logs.

---

## A.8.16 — Monitoringactiviteiten


**Wat:**
 Logs en systemen actief monitoren op afwijkingen.

**Doen:**
 SIEM of centrale logging, alerts configureren, dagelijks review van kritieke alerts (ISMS-018).

**Bewijs:**
 Monitoring-configuratie, alert-regels, response-logboek.

---

## A.8.17 — Kloksynchronisatie


**Wat:**
 Alle systemen dezelfde tijd gebruiken.

**Doen:**
 NTP configureren op alle servers en netwerkapparatuur. Maximale afwijking: 1 seconde.

**Bewijs:**
 NTP-configuratie, tijdsynchronisatie-status.

---

## A.8.18 — Gebruik van geprivilegieerde hulpprogramma's


**Wat:**
 Systeemtools die beveiligingsmaatregelen kunnen omzeilen beperken.

**Doen:**
 Alleen geautoriseerde beheerders, logging van gebruik, geen onnodige tools op werkstations.

**Bewijs:**
 Overzicht van beschikbare hulpprogramma's, toegangsbeperking, gebruikslogging.

---

## A.8.19 — Installatie van software op operationele systemen


**Wat:**
 Software-installatie controleren.

**Doen:**
 Alleen goedgekeurde software, geen zelfinstallatie door eindgebruikers, whitelist-benadering.

**Bewijs:**
 Goedgekeurde softwarelijst, installatiebeperkingen (GPO/MDM), wijzigingslogboek.

---

## A.8.20 — Netwerkbeveiliging


**Wat:**
 Netwerk beschermen tegen dreigingen.

**Doen:**
 Firewall, IDS/IPS, netwerksegmentatie, monitoring (ISMS-032).

**Bewijs:**
 Firewall-configuratie, IDS/IPS-rapportage, netwerktopologie.

---

## A.8.21 — Beveiliging van netwerkdiensten


**Wat:**
 Netwerkdiensten (DNS, e-mail, web) beveiligen.

**Doen:**
 TLS verplicht, SPF/DKIM/DMARC, DNSSEC, WAF voor webapplicaties.

**Bewijs:**
 Configuratie per dienst, SSL-test resultaten, e-mail authenticatie records.

---

## A.8.22 — Segmentatie van netwerken


**Wat:**
 Netwerk opdelen in zones.

**Doen:**
 VLAN's, firewall-regels tussen zones, gastnetwerk gescheiden, beheernetwerk apart (ISMS-032).

**Bewijs:**
 Netwerktopologie, VLAN-overzicht, firewallregels tussen zones.

---

## A.8.23 — Webfiltering


**Wat:**
 Toegang tot schadelijke of ongepaste websites blokkeren.

**Doen:**
 DNS-filtering of webproxy, blokkeer categorieën (malware, phishing, adult, gambling).

**Bewijs:**
 Filterconfiguratie, geblokkeerde categorieën, uitzonderingenlijst.

---

## A.8.24 — Gebruik van cryptografie


**Wat:**
 Encryptie toepassen waar nodig.

**Doen:**
 Data in transit (TLS 1.2+), data at rest (AES-256), sleutelbeheer (ISMS-016).

**Bewijs:**
 Cryptografiebeleid, encryptie-configuratie per systeem, sleutelbeheer procedure.

---

## A.8.25 — Levenscyclus van veilige ontwikkeling


**Wat:**
 Beveiliging integreren in de softwareontwikkelcyclus.

**Doen:**
 Security requirements bij design, code reviews, security testing, gescheiden omgevingen.

**Bewijs:**
 Secure SDLC-beleid, security requirements per project, testresultaten.

---

## A.8.26 — Beveiligingseisen voor applicaties


**Wat:**
 Beveiligingseisen definiëren bij ontwikkeling of aanschaf.

**Doen:**
 OWASP Top 10 als baseline, input-validatie, output-encoding, authenticatie-eisen.

**Bewijs:**
 Security requirements document, OWASP-checklist, pentest-resultaten.

---

## A.8.27 — Veilige systeemarchitectuur en technische principes


**Wat:**
 Beveiligingsprincipes toepassen in architectuur.

**Doen:**
 Defense in depth, least privilege, fail secure, security by design.

**Bewijs:**
 Architectuurdocumenten met beveiligingslaag, design reviews.

---

## A.8.28 — Veilig coderen


**Wat:**
 Beveiligde codeerpraktijken toepassen.

**Doen:**
 OWASP coding guidelines, geen hardcoded credentials, dependency scanning, peer review.

**Bewijs:**
 Coding guidelines, SAST/DAST scan resultaten, code review logs.

---

## A.8.29 — Beveiligingstesten in ontwikkeling en acceptatie


**Wat:**
 Security testen voordat software in productie gaat.

**Doen:**
 SAST, DAST, dependency scanning, penetratietests voor kritieke applicaties.

**Bewijs:**
 Testplannen, scan-resultaten, pentest-rapporten, acceptatiecriteria.

---

## A.8.30 — Uitbestede ontwikkeling


**Wat:**
 Beveiligingseisen stellen aan extern ontwikkelde software.

**Doen:**
 Beveiligingsclausules in contract, code ownership, recht op audit, veilige overdracht.

**Bewijs:**
 Contract met beveiligingseisen, code reviews van opgeleverde software.

---

## A.8.31 — Scheiding van ontwikkel-, test- en productieomgevingen


**Wat:**
 DTAP-omgevingen gescheiden houden.

**Doen:**
 Aparte omgevingen, geen productiedata in test/dev, gescheiden toegangsrechten.

**Bewijs:**
 Omgevingsoverzicht, toegangsmatrix per omgeving, datamaskering in test.

---

## A.8.32 — Wijzigingsbeheer


**Wat:**
 Wijzigingen aan systemen gecontroleerd doorvoeren.

**Doen:**
 Change management procedure: aanvraag, beoordeling, goedkeuring, uitvoering, verificatie (ISMS-029).

**Bewijs:**
 Change log, goedgekeurde change requests, rollback-plannen.

---

## A.8.33 — Testinformatie


**Wat:**
 Testdata beschermen.

**Doen:**
 Geen echte persoonsgegevens in testomgevingen. Gebruik gemaskeerde of synthetische data.

**Bewijs:**
 Testdatabeleid, bewijs van maskering, geen productiedata in test.

---

## A.8.34 — Bescherming van informatiesystemen tijdens audittesten


**Wat:**
 Audits en pentests veilig uitvoeren zonder productierisico.

**Doen:**
 Pentests plannen buiten piekuren, scope afbakenen, noodcontacten beschikbaar, rollback-plan.

**Bewijs:**
 Pentest-opdracht met scope en regels, communicatie naar IT-beheer, testrapportage.
