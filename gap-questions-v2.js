// ═════════════════════════════════════════════════════════════════
// GAP QUESTIONS LIBRARY v2 — control-specifiek + categorie-fallback
// ═════════════════════════════════════════════════════════════════
//
// 5 dimensies (op CMMI-schaal 0-4):
//   - beleid:        is er een vastgesteld document/regel?
//   - proces:        is er een werkende workflow?
//   - techniek:      is het technisch afgedwongen of gemonitord?
//   - eigenaarschap: is iemand verantwoordelijk + bevoegd?
//   - effectiviteit: wordt gemeten of het werkt?
//
// LAAG 1 — gapQuestionsV2 (specifiek per control, geschreven door Lead Auditor)
//   25 cruciale controls volledig uitgewerkt. Verwerkt vakkennis ISO 27001:2022 + DNV.
//
// LAAG 2 — categoryFallback (per Annex A categorie + ISMS-clausule)
//   Voor controls die nog niet in laag 1 staan, gebruik categorie-specifieke vragen
//   die rijker zijn dan de v1 generieke 2-vragen-template.
//
// LAAG 3 — v1 fallback (allerlaatste vangnet)
//   Als noch laag 1 noch laag 2 matcht, val terug op v1 generieke vragen.

const gapQuestionsV2 = {

  // ═════════════════════════════════════════════════════════════
  // A.5 ORGANISATORISCHE CONTROLS — cruciale subset uitgewerkt
  // ═════════════════════════════════════════════════════════════

  'A.5.1': {
    name: 'Beleid voor informatiebeveiliging',
    questions: [
      { dim: 'beleid', q: 'Is er een vastgesteld informatiebeveiligingsbeleid (PDF/intranet) met scope, doelstellingen en commitment?' },
      { dim: 'eigenaarschap', q: 'Is het beleid formeel ondertekend door de directie of een statutair bestuurder met datum?' },
      { dim: 'proces', q: 'Is het beleid actief gecommuniceerd naar alle medewerkers (onboarding, intranet, jaarlijkse herinnering)?' },
      { dim: 'effectiviteit', q: 'Wordt het beleid minimaal jaarlijks gereviewed en bij wijzigingen herzien (versiehistorie of review-log zichtbaar)?' },
      { dim: 'effectiviteit', q: 'Worden afwijkingen van het beleid gedetecteerd, gemeld en geregistreerd (compliance-monitoring)?' },
    ]
  },
  'A.5.2': {
    name: 'Rollen en verantwoordelijkheden voor informatiebeveiliging',
    questions: [
      { dim: 'beleid', q: 'Is er een RACI-matrix of soortgelijk document waarin IB-rollen formeel zijn vastgelegd?' },
      { dim: 'eigenaarschap', q: 'Is een specifieke persoon (CISO, IB-coördinator) eindverantwoordelijk voor informatiebeveiliging?' },
      { dim: 'proces', q: 'Worden IB-rollen behandeld in onboarding en periodieke awareness-sessies?' },
      { dim: 'effectiviteit', q: 'Worden conflicterende rollen (4-ogen-principe) actief vermeden in kritieke processen?' },
    ]
  },
  'A.5.3': {
    name: 'Functiescheiding',
    questions: [
      { dim: 'beleid', q: 'Is er een overzicht van conflicterende functiecombinaties (segregation of duties matrix)?' },
      { dim: 'techniek', q: 'Worden conflicterende rechten technisch geblokkeerd in kritieke systemen (ERP, finance, IAM)?' },
      { dim: 'proces', q: 'Wordt het 4-ogen-principe toegepast bij financiële transacties of toegangstoekenning?' },
      { dim: 'effectiviteit', q: 'Wordt minimaal halfjaarlijks gecontroleerd of geen medewerker overlappende rechten heeft?' },
    ]
  },
  'A.5.7': {
    name: 'Threat intelligence',
    questions: [
      { dim: 'proces', q: 'Wordt structureel informatie verzameld over actuele dreigingen (NCSC-NL, CCB-BE, vendor-feeds, ISAC, branche-CERT)?' },
      { dim: 'eigenaarschap', q: 'Is er een persoon/team verantwoordelijk voor het filteren en beoordelen van threat intelligence?' },
      { dim: 'proces', q: 'Worden relevante dreigingen vertaald naar concrete actie (ticket, patch, awareness-campagne)?' },
      { dim: 'techniek', q: 'Worden Indicators of Compromise (IoC\'s) automatisch geladen in detectie-tooling (SIEM, EDR, firewall)?' },
      { dim: 'effectiviteit', q: 'Kunt u een voorbeeld tonen waar threat intelligence heeft geleid tot een preventieve maatregel in de afgelopen 12 maanden?' },
    ]
  },
  'A.5.9': {
    name: 'Inventarisatie van informatie en andere bedrijfsmiddelen',
    questions: [
      { dim: 'beleid', q: 'Is er een asset register waarin alle informatie-assets, hardware, software en cloud-diensten staan?' },
      { dim: 'eigenaarschap', q: 'Heeft elk asset een aangewezen eigenaar (geen "IT in het algemeen")?' },
      { dim: 'proces', q: 'Wordt het register minimaal jaarlijks gereviewd (datum-stempel zichtbaar)?' },
      { dim: 'techniek', q: 'Wordt nieuw asset automatisch toegevoegd via MDM/CMDB-koppeling, of handmatig?' },
      { dim: 'effectiviteit', q: 'Wordt het verschil tussen werkelijk aanwezige en geregistreerde assets gemeten (drift-rate)?' },
    ]
  },
  'A.5.15': {
    name: 'Toegangsbeleid',
    questions: [
      { dim: 'beleid', q: 'Is er een toegangsbeleid dat need-to-know en least-privilege als principes vastlegt?' },
      { dim: 'proces', q: 'Is er een formele aanvraag- en goedkeuringsworkflow voor nieuwe toegangsrechten (geen ad-hoc toekenning)?' },
      { dim: 'proces', q: 'Worden toegangsrechten minimaal halfjaarlijks gereviewed (access review) door manager of asset-eigenaar?' },
      { dim: 'techniek', q: 'Wordt least-privilege technisch afgedwongen via groep-gebaseerde rechten of conditional access?' },
      { dim: 'eigenaarschap', q: 'Is er per kritiek systeem een access-owner aangewezen die rechten goedkeurt?' },
      { dim: 'effectiviteit', q: 'Wordt het aantal "stale accounts" (>90 dagen inactief) gemeten en opgelost?' },
    ]
  },
  'A.5.17': {
    name: 'Authenticatie-informatie',
    questions: [
      { dim: 'beleid', q: 'Is er een wachtwoordbeleid met minimum-eisen (lengte, complexiteit, hergebruik)?' },
      { dim: 'techniek', q: 'Wordt het wachtwoordbeleid technisch afgedwongen op alle bedrijfssystemen?' },
      { dim: 'techniek', q: 'Is MFA verplicht voor alle accounts met toegang tot bedrijfsdata (technisch afgedwongen)?' },
      { dim: 'proces', q: 'Is er een procedure voor reset van vergeten wachtwoorden met identiteitsverificatie?' },
    ]
  },
  'A.5.18': {
    name: 'Toegangsrechten',
    questions: [
      { dim: 'beleid', q: 'Is vastgelegd hoe toegangsrechten worden aangevraagd, goedgekeurd, toegekend en ingetrokken (joiner-mover-leaver)?' },
      { dim: 'proces', q: 'Worden rechten ingetrokken binnen 24 uur bij uitdiensttreding of functiewijziging?' },
      { dim: 'proces', q: 'Worden toegangsrechten minimaal halfjaarlijks gereviewd door manager of asset-eigenaar?' },
      { dim: 'techniek', q: 'Wordt de joiner-mover-leaver-flow ondersteund door IAM-tooling (geen ad-hoc spreadsheet)?' },
      { dim: 'effectiviteit', q: 'Wordt het aantal accounts met overbodige rechten gemeten en omlaag gebracht?' },
    ]
  },
  'A.5.19': {
    name: 'Informatiebeveiliging in leveranciersrelaties',
    questions: [
      { dim: 'beleid', q: 'Is er een leveranciersbeleid met risicoclassificatie-criteria?' },
      { dim: 'proces', q: 'Wordt elke nieuwe leverancier vooraf beoordeeld op IB-risico (due diligence)?' },
      { dim: 'eigenaarschap', q: 'Is er een leveranciersregister met per leverancier een verantwoordelijke binnen de organisatie?' },
      { dim: 'effectiviteit', q: 'Worden kritieke leveranciers minimaal jaarlijks geëvalueerd op naleving en performance?' },
    ]
  },
  'A.5.23': {
    name: 'Beveiliging in cloud-diensten',
    questions: [
      { dim: 'beleid', q: 'Is er een cloud-beleid dat selectie-criteria, datalocatie-eisen en exit-strategieën vastlegt?' },
      { dim: 'proces', q: 'Worden cloud-diensten formeel goedgekeurd voordat ze in productie gaan (Shadow IT-controle)?' },
      { dim: 'techniek', q: 'Is data-encryptie at-rest en in-transit afgedwongen voor alle cloud-diensten met bedrijfsdata?' },
      { dim: 'eigenaarschap', q: 'Is er per cloud-dienst een verantwoordelijke binnen de organisatie aangewezen?' },
      { dim: 'effectiviteit', q: 'Worden SLA\'s en datalocatie-clausules periodiek geverifieerd in de DPA?' },
    ]
  },
  'A.5.24': {
    name: 'Planning en voorbereiding incidentmanagement',
    questions: [
      { dim: 'beleid', q: 'Is er een vastgesteld Incident Response Plan met scope, classificatieschema en escalatie-flow?' },
      { dim: 'eigenaarschap', q: 'Is er een Incident Response Coordinator + 24/7 backup met telefoon-/mailgegevens vastgelegd?' },
      { dim: 'proces', q: 'Zijn runbooks aanwezig voor de meest waarschijnlijke incident-types (ransomware, datalek, DDoS, account-compromis)?' },
      { dim: 'proces', q: 'Wordt het IR-plan minimaal jaarlijks getest via een tabletop-oefening (notulen + lessons learned)?' },
      { dim: 'techniek', q: 'Is er een centraal incident-ticketsysteem waar alle stappen, beslissingen en bewijsstukken in worden vastgelegd?' },
      { dim: 'effectiviteit', q: 'Worden Mean Time To Detect (MTTD) en Mean Time To Respond (MTTR) gemeten en geëvalueerd?' },
    ]
  },
  'A.5.29': {
    name: 'Informatiebeveiliging tijdens verstoring',
    questions: [
      { dim: 'beleid', q: 'Is er een Business Continuity Plan (BCP) met scope, kritieke processen en herstel-eisen?' },
      { dim: 'proces', q: 'Zijn RTO en RPO per kritiek proces vastgelegd op basis van een Business Impact Analysis (BIA)?' },
      { dim: 'proces', q: 'Wordt het BCP minimaal jaarlijks getest via een oefening (full of partial)?' },
      { dim: 'eigenaarschap', q: 'Is een crisis-team aangewezen met heldere rolverdeling en escalatie?' },
    ]
  },
  'A.5.31': {
    name: 'Wettelijke, statutaire, regelgevende en contractuele eisen',
    questions: [
      { dim: 'beleid', q: 'Is er een register van toepasselijke wetgeving (AVG, NIS2, sectorspecifiek)?' },
      { dim: 'eigenaarschap', q: 'Is een persoon verantwoordelijk voor het bijhouden van wijzigingen in wetgeving?' },
      { dim: 'effectiviteit', q: 'Wordt minimaal jaarlijks getoetst of de organisatie nog voldoet aan alle relevante eisen?' },
      { dim: 'proces', q: 'Worden wetswijzigingen actief vertaald naar bijstelling van beleid en procedures?' },
    ]
  },
  'A.5.34': {
    name: 'Privacy en bescherming van persoonsgegevens (PII)',
    questions: [
      { dim: 'beleid', q: 'Is er een privacy-beleid dat verwerkingsdoeleinden, rechtsgronden en betrokken rechten beschrijft?' },
      { dim: 'beleid', q: 'Is er een verwerkingsregister (RoPA, AVG Art. 30) dat actueel wordt gehouden?' },
      { dim: 'proces', q: 'Is er een DPIA-procedure die wordt gevolgd voor hoge-risico verwerkingen (AVG Art. 35)?' },
      { dim: 'proces', q: 'Is er een procedure voor verzoeken van betrokkenen (inzage, rectificatie, verwijdering)?' },
      { dim: 'eigenaarschap', q: 'Is er een aanspreekpunt voor privacy (DPO of privacy-coördinator) bekend bij de organisatie en de toezichthouder?' },
    ]
  },
  'A.5.35': {
    name: 'Onafhankelijke beoordeling van informatiebeveiliging',
    questions: [
      { dim: 'proces', q: 'Wordt het ISMS minimaal jaarlijks onafhankelijk beoordeeld (interne audit of externe partij)?' },
      { dim: 'beleid', q: 'Is een audit-jaarplan vastgesteld dat de scope per audit beschrijft?' },
      { dim: 'eigenaarschap', q: 'Voert een auditor die onafhankelijk is van het audit-object de beoordeling uit?' },
      { dim: 'effectiviteit', q: 'Worden audit-bevindingen geregistreerd, geprioriteerd en opgevolgd tot afsluiting?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // A.6 PERSONEELS-CONTROLS
  // ═════════════════════════════════════════════════════════════

  'A.6.1': {
    name: 'Screening',
    questions: [
      { dim: 'beleid', q: 'Is er een screening-procedure voor nieuwe medewerkers (VOG/uittreksel, referentiecheck)?' },
      { dim: 'proces', q: 'Worden screening-resultaten vastgelegd in het personeelsdossier?' },
      { dim: 'eigenaarschap', q: 'Is HR verantwoordelijk voor uitvoering en archivering van screening?' },
      { dim: 'beleid', q: 'Worden zwaardere screenings toegepast bij functies met privileged access?' },
    ]
  },
  'A.6.3': {
    name: 'Bewustzijn, opleiding en training',
    questions: [
      { dim: 'beleid', q: 'Is er een awareness/training-plan met doelgroepen, frequentie en onderwerpen?' },
      { dim: 'proces', q: 'Krijgt elke nieuwe medewerker een security-onboarding (binnen 30 dagen na indiensttreding)?' },
      { dim: 'proces', q: 'Volgen alle medewerkers minimaal jaarlijks een refresher-training of awareness-module?' },
      { dim: 'proces', q: 'Krijgt het bestuur een aparte cybersecurity-training (NIS2 Art. 20 verplichting)?' },
      { dim: 'techniek', q: 'Worden phishing-simulaties uitgevoerd en wordt de klikratio gemeten (en gerapporteerd)?' },
      { dim: 'effectiviteit', q: 'Worden de awareness-resultaten gerapporteerd in de management review en leiden ze tot bijstelling?' },
    ]
  },
  'A.6.5': {
    name: 'Verantwoordelijkheden bij beëindiging of wijziging dienstverband',
    questions: [
      { dim: 'beleid', q: 'Is er een offboarding-procedure die alle stappen beschrijft (toegang, assets, knowhow-overdracht)?' },
      { dim: 'proces', q: 'Worden toegangsrechten ingetrokken op de laatste werkdag (geen vertraging)?' },
      { dim: 'proces', q: 'Worden bedrijfs-assets (laptop, telefoon, badge) op de laatste werkdag geretourneerd en geregistreerd?' },
      { dim: 'effectiviteit', q: 'Wordt periodiek gecontroleerd dat geen "ghost accounts" van ex-medewerkers bestaan?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // A.7 FYSIEKE CONTROLS
  // ═════════════════════════════════════════════════════════════

  'A.7.1': {
    name: 'Fysieke beveiligingsperimeter',
    questions: [
      { dim: 'beleid', q: 'Is er een definitie van fysieke beveiligingszones (publiek, intern, kritiek)?' },
      { dim: 'techniek', q: 'Worden zones afgedwongen via toegangscontrole (badge, code, biometrie)?' },
      { dim: 'proces', q: 'Worden bezoekers begeleid en geregistreerd?' },
      { dim: 'effectiviteit', q: 'Wordt fysieke toegang gelogd en periodiek gereviewed op afwijkingen?' },
    ]
  },
  'A.7.4': {
    name: 'Fysieke beveiliging van werkruimten',
    questions: [
      { dim: 'beleid', q: 'Is er een clear-desk en clear-screen-beleid?' },
      { dim: 'techniek', q: 'Worden schermen automatisch vergrendeld na inactiviteit?' },
      { dim: 'proces', q: 'Worden gevoelige documenten geshredderd of in beveiligde containers verzameld?' },
      { dim: 'effectiviteit', q: 'Wordt naleving van clear-desk periodiek visueel gecontroleerd?' },
    ]
  },
  'A.7.7': {
    name: 'Clear desk en clear screen',
    questions: [
      { dim: 'beleid', q: 'Is er een clear-desk en clear-screen-beleid (PDF of intranet) dat medewerkers kennen?' },
      { dim: 'techniek', q: 'Worden schermen automatisch vergrendeld na max. 10 minuten inactiviteit?' },
      { dim: 'proces', q: 'Wordt het beleid behandeld in de awareness-training?' },
      { dim: 'effectiviteit', q: 'Worden steekproefcontroles op clear-desk uitgevoerd en gerapporteerd?' },
    ]
  },
  'A.7.10': {
    name: 'Opslagmedia',
    questions: [
      { dim: 'beleid', q: 'Is er een beleid voor het gebruik van USB-sticks, externe schijven en andere opslagmedia?' },
      { dim: 'techniek', q: 'Wordt USB-toegang technisch beperkt (alleen geautoriseerde devices) of geblokkeerd?' },
      { dim: 'proces', q: 'Is er een procedure voor veilige verwijdering/vernietiging van opslagmedia?' },
      { dim: 'effectiviteit', q: 'Wordt media-gebruik gelogd of gemonitord in DLP-tooling?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // A.8 TECHNOLOGISCHE CONTROLS
  // ═════════════════════════════════════════════════════════════

  'A.8.2': {
    name: 'Geprivilegieerde toegangsrechten',
    questions: [
      { dim: 'beleid', q: 'Is een aparte procedure voor geprivilegieerde accounts (admin, root, owner) vastgelegd?' },
      { dim: 'techniek', q: 'Worden admin-handelingen vanuit een aparte account uitgevoerd, niet vanuit de dagelijkse werkaccount?' },
      { dim: 'techniek', q: 'Is MFA verplicht voor alle geprivilegieerde accounts zonder ontheffing?' },
      { dim: 'proces', q: 'Worden alle geprivilegieerde sessies gelogd en periodiek gereviewd?' },
      { dim: 'effectiviteit', q: 'Wordt het aantal geprivilegieerde accounts geminimaliseerd (just-enough-access)?' },
    ]
  },
  'A.8.5': {
    name: 'Veilige authenticatie',
    questions: [
      { dim: 'beleid', q: 'Is er een wachtwoordbeleid met eisen aan lengte (≥12), complexiteit en hergebruik?' },
      { dim: 'techniek', q: 'Is multifactorauthenticatie verplicht voor alle accounts met toegang tot bedrijfsdata?' },
      { dim: 'techniek', q: 'Is MFA óók verplicht voor privileged/admin-accounts (geen ontheffingen)?' },
      { dim: 'techniek', q: 'Worden wachtwoorden technisch afgedwongen op systeemniveau?' },
      { dim: 'proces', q: 'Wordt aanbevolen of verplicht een wachtwoordmanager te gebruiken?' },
      { dim: 'effectiviteit', q: 'Wordt MFA-coverage gemeten (% accounts met MFA) en op 100% gebracht?' },
    ]
  },
  'A.8.7': {
    name: 'Bescherming tegen malware',
    questions: [
      { dim: 'techniek', q: 'Is endpoint-bescherming (EDR/anti-malware) actief op alle laptops, desktops en servers?' },
      { dim: 'proces', q: 'Worden malware-detecties automatisch gerapporteerd aan een SOC of IR-coordinator?' },
      { dim: 'effectiviteit', q: 'Wordt de coverage van endpoint-bescherming periodiek gecontroleerd (% systemen)?' },
      { dim: 'beleid', q: 'Is er een procedure voor het isoleren en analyseren van malware-incidenten?' },
    ]
  },
  'A.8.8': {
    name: 'Beheer van technische kwetsbaarheden',
    questions: [
      { dim: 'beleid', q: 'Is er een patch-beleid met SLA per kwetsbaarheidsniveau (critical/high/medium/low)?' },
      { dim: 'techniek', q: 'Worden vulnerability-scans periodiek uitgevoerd op alle systemen?' },
      { dim: 'proces', q: 'Worden gevonden kwetsbaarheden geregistreerd in een register met owner en deadline?' },
      { dim: 'effectiviteit', q: 'Wordt de SLA-naleving van patch-deadlines gemeten en gerapporteerd?' },
    ]
  },
  'A.8.13': {
    name: 'Informatie back-up',
    questions: [
      { dim: 'beleid', q: 'Is er een backup-beleid met retentie-eisen, frequentie per data-type en eigenaar?' },
      { dim: 'techniek', q: 'Worden backups versleuteld bewaard (at-rest encryption op backup-target)?' },
      { dim: 'techniek', q: 'Voldoet de backup-strategie aan 3-2-1 (3 kopieën, 2 media, 1 offsite/immutable)?' },
      { dim: 'proces', q: 'Wordt minimaal jaarlijks een restore-test uitgevoerd en gedocumenteerd?' },
      { dim: 'techniek', q: 'Zijn backups beschermd tegen ransomware (immutable storage, air-gap, write-once)?' },
      { dim: 'effectiviteit', q: 'Wordt RPO (Recovery Point Objective) per kritiek systeem gemeten en gehaald?' },
    ]
  },
  'A.8.15': {
    name: 'Logging',
    questions: [
      { dim: 'beleid', q: 'Is er een logging-beleid dat per systeemklasse beschrijft welke events worden gelogd?' },
      { dim: 'techniek', q: 'Worden authenticatie, autorisatie-wijzigingen en privileged acties van alle kritieke systemen gelogd?' },
      { dim: 'techniek', q: 'Zijn logs append-only of in een aparte storage zodat ze niet door aanvallers kunnen worden gewijzigd?' },
      { dim: 'proces', q: 'Worden logs minimaal 6 maanden bewaard (of langer indien wettelijk vereist)?' },
      { dim: 'effectiviteit', q: 'Wordt periodiek getoetst of de gelogde events compleet zijn (geen gaten)?' },
    ]
  },
  'A.8.16': {
    name: 'Monitoringactiviteiten',
    questions: [
      { dim: 'techniek', q: 'Is er centrale logging/SIEM voor alle kritieke systemen?' },
      { dim: 'proces', q: 'Worden security-alerts 24/7 gemonitord (eigen SOC of MSSP)?' },
      { dim: 'beleid', q: 'Is er een retention-beleid voor logs (minimaal 6-12 maanden)?' },
      { dim: 'effectiviteit', q: 'Worden de meest voorkomende false positives geanalyseerd en weggewerkt?' },
    ]
  },
  'A.8.24': {
    name: 'Gebruik van cryptografie',
    questions: [
      { dim: 'beleid', q: 'Is er een cryptografiebeleid met goedgekeurde algoritmen (AES-256, RSA-2048+) en verboden zwakke algoritmen?' },
      { dim: 'techniek', q: 'Wordt at-rest encryptie afgedwongen op alle data-stores met persoonsgegevens of bedrijfskritieke data?' },
      { dim: 'techniek', q: 'Wordt in-transit encryptie afgedwongen via TLS 1.2+ op alle externe communicatie?' },
      { dim: 'proces', q: 'Is er een sleutelbeheer-procedure (generatie, rotatie, intrekking, escrow)?' },
      { dim: 'eigenaarschap', q: 'Is er een proces voor certificate lifecycle (renewal vóór expiry)?' },
      { dim: 'effectiviteit', q: 'Worden cryptografische zwakheden (zwakke ciphers, expired certs) actief gescand en opgelost?' },
    ]
  },
  'A.8.28': {
    name: 'Veilige codering',
    questions: [
      { dim: 'beleid', q: 'Zijn er secure coding-richtlijnen voor de gebruikte talen/frameworks?' },
      { dim: 'techniek', q: 'Worden code-reviews verplicht uitgevoerd vóór merge naar main/production?' },
      { dim: 'techniek', q: 'Wordt SAST (static application security testing) automatisch uitgevoerd in CI/CD?' },
      { dim: 'proces', q: 'Krijgen ontwikkelaars periodiek security-training (OWASP top 10, secure design)?' },
    ]
  },
  'A.8.32': {
    name: 'Wijzigingsbeheer',
    questions: [
      { dim: 'beleid', q: 'Is een change management-procedure vastgelegd met categorieën (standaard, normaal, emergency)?' },
      { dim: 'proces', q: 'Wordt elke productie-wijziging vooraf goedgekeurd door een Change Advisory Board of equivalent?' },
      { dim: 'techniek', q: 'Worden changes geregistreerd in een ticketsysteem dat audit-trail biedt?' },
      { dim: 'proces', q: 'Is er een rollback-procedure voor elke risicovolle change?' },
      { dim: 'effectiviteit', q: 'Wordt het percentage failed changes gemeten en gerapporteerd?' },
    ]
  },
};

// ═════════════════════════════════════════════════════════════════
// LAAG 2 — categorie-fallbacks
// Voor controls die nog niet expliciet zijn uitgewerkt, gebruik deze
// rijkere set die past bij de categorie. Geen meer 2 generieke vragen.
// ═════════════════════════════════════════════════════════════════

const categoryFallback = {
  // A.5 — organisatorisch
  'A.5': (ctrl) => [
    { dim: 'beleid', q: `Is er een vastgesteld document of regelset voor "${ctrl.name.toLowerCase()}" (PDF of intranet)?` },
    { dim: 'eigenaarschap', q: `Is een specifieke persoon of rol verantwoordelijk voor de uitvoering van deze control?` },
    { dim: 'proces', q: `Is er een procedure die beschrijft hoe ${ctrl.name.toLowerCase()} in de praktijk wordt toegepast?` },
    { dim: 'effectiviteit', q: `Wordt de werking van deze control periodiek gemeten of geëvalueerd?` },
  ],
  // A.6 — personeel
  'A.6': (ctrl) => [
    { dim: 'beleid', q: `Is "${ctrl.name.toLowerCase()}" formeel vastgelegd in HR-beleid of arbeidsvoorwaarden?` },
    { dim: 'proces', q: `Wordt deze maatregel toegepast bij indiensttreding én bij wijzigingen in dienstverband?` },
    { dim: 'eigenaarschap', q: `Is HR of de manager verantwoordelijk voor uitvoering en archivering?` },
    { dim: 'effectiviteit', q: `Wordt naleving van deze HR-maatregel periodiek gecontroleerd?` },
  ],
  // A.7 — fysiek
  'A.7': (ctrl) => [
    { dim: 'beleid', q: `Is "${ctrl.name.toLowerCase()}" vastgelegd in een fysiek beveiligingsbeleid?` },
    { dim: 'techniek', q: `Wordt de maatregel technisch ondersteund (badge, camera, slot, sensor)?` },
    { dim: 'proces', q: `Is er een procedure voor uitzonderingsgevallen en bezoekers?` },
    { dim: 'effectiviteit', q: `Worden incidenten of overtredingen gelogd en periodiek gereviewed?` },
  ],
  // A.8 — technologisch
  'A.8': (ctrl) => [
    { dim: 'beleid', q: `Is er beleid dat "${ctrl.name.toLowerCase()}" verplicht stelt (PDF of intranet)?` },
    { dim: 'techniek', q: `Wordt deze maatregel technisch afgedwongen (configuratie, tooling, monitoring)?` },
    { dim: 'eigenaarschap', q: `Is er een team of persoon verantwoordelijk voor configuratie en onderhoud?` },
    { dim: 'proces', q: `Is er een wijzigingsprocedure die de maatregel beschermt tegen drift?` },
    { dim: 'effectiviteit', q: `Wordt de werking gemonitord en gerapporteerd in een SOC/dashboard?` },
  ],
  // C — ISMS-clausules (4-10 in ISO 27001:2022)
  'C': (ctrl) => [
    { dim: 'beleid', q: `Is "${ctrl.name.toLowerCase()}" gedocumenteerd als onderdeel van het ISMS?` },
    { dim: 'eigenaarschap', q: `Is er bestuurlijke betrokkenheid en aanwijsbare verantwoordelijkheid voor deze clausule?` },
    { dim: 'proces', q: `Is er een procedure die beschrijft hoe deze clausule wordt uitgevoerd?` },
    { dim: 'effectiviteit', q: `Wordt deze clausule meegenomen in de management review (ISMS-022)?` },
  ],
};

// ═════════════════════════════════════════════════════════════════
// PUBLIC API
// ═════════════════════════════════════════════════════════════════

function getGapQuestionsForControl(controlId, controlName) {
  // Laag 1 — expliciet uitgewerkt
  const explicit = gapQuestionsV2[controlId];
  if (explicit && Array.isArray(explicit.questions) && explicit.questions.length > 0) {
    return explicit.questions.map(qq => ({ q: qq.q, type: qq.dim, v2: true, source: 'explicit' }));
  }

  // Laag 2 — categorie-fallback (rijker dan v1)
  const cat = (controlId.match(/^([A-C])\.\d/)?.[1]) || '';
  const catKey = controlId.startsWith('A.5') ? 'A.5'
              : controlId.startsWith('A.6') ? 'A.6'
              : controlId.startsWith('A.7') ? 'A.7'
              : controlId.startsWith('A.8') ? 'A.8'
              : controlId.startsWith('C') ? 'C'
              : null;
  if (catKey && categoryFallback[catKey]) {
    return categoryFallback[catKey]({ id: controlId, name: controlName || controlId })
      .map(qq => ({ q: qq.q, type: qq.dim, v2: true, source: 'category' }));
  }

  // Laag 3 — v1 fallback (laatste vangnet)
  const lower = (controlName || '').toLowerCase();
  return [
    { q: `Is ${lower} formeel gedocumenteerd en goedgekeurd?`, type: 'beleid', v2: false, source: 'v1' },
    { q: `Wordt ${lower} actief toegepast en periodiek geëvalueerd?`, type: 'proces', v2: false, source: 'v1' }
  ];
}

function v2CoverageList() {
  return Object.keys(gapQuestionsV2);
}

function v2CoverageStats(controlList) {
  const explicit = v2CoverageList();
  const total = (controlList || []).length;
  const covered = explicit.filter(id => (controlList || []).some(c => c.id === id)).length;
  return { total, explicit: covered, fallbackCategory: total - covered, percent: total ? Math.round((covered / total) * 100) : 0 };
}

if (typeof window !== 'undefined') {
  window.gapQuestionsV2 = gapQuestionsV2;
  window.categoryFallback = categoryFallback;
  window.getGapQuestionsForControl = getGapQuestionsForControl;
  window.v2CoverageList = v2CoverageList;
  window.v2CoverageStats = v2CoverageStats;
}
