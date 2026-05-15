// ── MOCK EVIDENCE FIXTURES ────────────────────────────────────────
// Voor TEST-accounts (e.g. De Vries IT BV) zodat AI-rapport een gedegen
// beoordeling kan maken op realistische bewijsvoering.
// Dekt alle 114 controls (93 Annex A + 21 ISMS Clausules) met mix van
// strong / medium / weak / nvt — gemodelleerd naar SaaS-MKB ~25 FTE.

(function () {
  'use strict';

  // Compliance-niveau per control. SaaS-archetype: redelijk technisch op orde,
  // governance en leveranciersbeheer zijn typisch zwakker.
  const COMPLIANCE_LEVELS = {
    // ── ISMS Clausules (governance + management) ──
    'C.4.1': 'medium', 'C.4.2': 'medium', 'C.4.3': 'strong',
    'C.5.1': 'medium', 'C.5.2': 'strong', 'C.5.3': 'medium',
    'C.6.1': 'weak',   'C.6.2': 'medium', 'C.7.1': 'medium',
    'C.7.2': 'medium', 'C.7.3': 'strong', 'C.7.4': 'medium',
    'C.7.5': 'medium', 'C.8.1': 'medium', 'C.8.2': 'weak',
    'C.8.3': 'weak',   'C.9.1': 'weak',   'C.9.2': 'weak',
    'C.9.3': 'weak',   'C.10.1': 'weak',  'C.10.2': 'weak',

    // ── A.5 Organisatorisch ──
    'A.5.1':  'strong',  'A.5.2':  'strong',  'A.5.3':  'medium',
    'A.5.4':  'medium',  'A.5.5':  'weak',    'A.5.6':  'weak',
    'A.5.7':  'medium',  'A.5.8':  'weak',    'A.5.9':  'medium',
    'A.5.10': 'strong',  'A.5.11': 'medium',  'A.5.12': 'medium',
    'A.5.13': 'medium',  'A.5.14': 'medium',  'A.5.15': 'strong',
    'A.5.16': 'strong',  'A.5.17': 'strong',  'A.5.18': 'medium',
    'A.5.19': 'weak',    'A.5.20': 'medium',  'A.5.21': 'weak',
    'A.5.22': 'weak',    'A.5.23': 'medium',  'A.5.24': 'medium',
    'A.5.25': 'medium',  'A.5.26': 'weak',    'A.5.27': 'weak',
    'A.5.28': 'weak',    'A.5.29': 'weak',    'A.5.30': 'weak',
    'A.5.31': 'medium',  'A.5.32': 'medium',  'A.5.33': 'medium',
    'A.5.34': 'medium',  'A.5.35': 'weak',    'A.5.36': 'weak',
    'A.5.37': 'medium',

    // ── A.6 Personeel ──
    'A.6.1':  'medium',  'A.6.2':  'strong',  'A.6.3':  'medium',
    'A.6.4':  'weak',    'A.6.5':  'medium',  'A.6.6':  'strong',
    'A.6.7':  'strong',  'A.6.8':  'medium',

    // ── A.7 Fysiek ──
    'A.7.1':  'strong',  'A.7.2':  'strong',  'A.7.3':  'medium',
    'A.7.4':  'medium',  'A.7.5':  'medium',  'A.7.6':  'medium',
    'A.7.7':  'medium',  'A.7.8':  'medium',  'A.7.9':  'medium',
    'A.7.10': 'medium',  'A.7.11': 'medium',  'A.7.12': 'medium',
    'A.7.13': 'medium',  'A.7.14': 'medium',

    // ── A.8 Technologie ──
    'A.8.1':  'strong',  'A.8.2':  'medium',  'A.8.3':  'medium',
    'A.8.4':  'medium',  'A.8.5':  'strong',  'A.8.6':  'medium',
    'A.8.7':  'strong',  'A.8.8':  'medium',  'A.8.9':  'medium',
    'A.8.10': 'medium',  'A.8.11': 'weak',    'A.8.12': 'weak',
    'A.8.13': 'medium',  'A.8.14': 'medium',  'A.8.15': 'medium',
    'A.8.16': 'medium',  'A.8.17': 'strong',  'A.8.18': 'medium',
    'A.8.19': 'medium',  'A.8.20': 'medium',  'A.8.21': 'medium',
    'A.8.22': 'medium',  'A.8.23': 'medium',  'A.8.24': 'strong',
    'A.8.25': 'medium',  'A.8.26': 'medium',  'A.8.27': 'medium',
    'A.8.28': 'medium',  'A.8.29': 'weak',    'A.8.30': 'medium',
    'A.8.31': 'medium',  'A.8.32': 'medium',  'A.8.33': 'weak',
    'A.8.34': 'medium'
  };

  // Specifieke realistische evidence voor de meest-zichtbare controls.
  // Voor de rest: zie buildGenericEvidence() onderaan.
  const SPECIFIC_EVIDENCE = {
    'A.5.1': {
      procedure: 'Informatiebeveiligingsbeleid v2.3.pdf',
      location: 'SharePoint /IT/Beleid/IB-beleid-2025.pdf',
      owner: 'M. de Vries (CTO)',
      last_verified: '2025-09-15',
      remark: 'Wij hebben een informatiebeveiligingsbeleid v2.3 opgesteld in 2024 en jaarlijks gereviewd. Het beleid is door de directie ondertekend op 15 september 2025 en gepubliceerd op het intranet (Notion-pagina /security). Alle nieuwe medewerkers krijgen het bij onboarding via Workato. De volgende review staat op de roadmap voor september 2026 (kalenderitem). Compliance-monitoring vindt nog handmatig plaats via een kwartaal-check door de CTO.'
    },
    'A.5.2': {
      procedure: 'RACI-matrix Informatiebeveiliging.xlsx',
      location: 'SharePoint /IT/Governance/RACI.xlsx',
      owner: 'CTO + COO (gedeeld)',
      last_verified: '2025-08-01',
      remark: 'IB-rollen zijn vastgelegd in een RACI-matrix die per kwartaal wordt bijgewerkt. CTO is eindverantwoordelijk voor IB, COO voor compliance, Head of Engineering voor technische uitvoering. We hebben dit gepresenteerd tijdens de all-hands op 1 augustus 2025 en de slides zijn beschikbaar op /security. Bij wijzigingen in functietitels updaten we de matrix in Notion (versiebeheer aanwezig).'
    },
    'A.5.7': {
      procedure: 'Threat-intelligence procedure (concept v0.5)',
      location: 'Notion /security/threat-intel',
      owner: 'Head of Engineering',
      last_verified: '',
      remark: 'We volgen NCSC-NL alerts en CCB Safeonweb wekelijks via een gedeelde Slack-kanaal. CISA en branche-CERT (BIO-feeds via OpenCSP) komen ook door. We hebben echter geen formeel proces om threat-intel te vertalen naar concrete actie of patches. Dit staat op de roadmap voor Q1 2026, samen met integratie in onze Datadog SIEM.'
    },
    'A.5.9': {
      procedure: 'Asset register (Notion + AWS Resource Tag Compliance)',
      location: 'Notion /infrastructure/assets + AWS Tag Editor',
      owner: 'Head of Engineering',
      last_verified: '2025-11-20',
      remark: 'We hebben een asset-register in Notion voor laptops/MDM-managed devices (37 stuks via Jamf). Cloud-resources worden getrackt via AWS Resource Tag Compliance — alle EC2/RDS hebben Owner+Environment+CostCenter tags. SaaS-tools (Slack, Notion, GitHub, Linear, etc.) staan in een aparte Excel die niet altijd bijgewerkt is. We willen dit consolideren naar één tool maar hebben nog geen budget vrijgemaakt.'
    },
    'A.5.15': {
      procedure: 'Toegangsbeleid v3.1.pdf',
      location: 'SharePoint /IT/Beleid/Toegang.pdf',
      owner: 'CTO',
      last_verified: '2025-10-03',
      remark: 'Toegangsbeleid documenteert least-privilege als principe. Alle production-toegang loopt via AWS IAM met groep-gebaseerde rechten. We doen halfjaarlijkse access-reviews (laatste in oktober 2025) waarbij elke manager rechten van zijn team approved. Stale accounts (>90 dagen inactief) worden automatisch uitgeschakeld via Okta. Geprivilegieerde toegang gaat via JIT (15 min) door HashiCorp Boundary.'
    },
    'A.5.17': {
      procedure: 'Wachtwoord- en authenticatiebeleid v2.0',
      location: 'Notion /security/passwords',
      owner: 'CTO',
      last_verified: '2025-12-01',
      remark: 'MFA (TOTP of WebAuthn) is verplicht voor alle medewerkers en alle production-systemen via Okta. Wachtwoorden minimum 14 karakters, geen complexity-eisen, jaarlijkse rotatie alleen als compromise verdacht (NIST SP 800-63B-conform). Geen wachtwoord-hergebruik via 1Password (verplicht voor team-leden). Customer-facing app: Argon2id hashing, MFA voorgesteld maar nog niet verplicht.'
    },
    'A.5.19': {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: 'Wij hebben 14 SaaS-leveranciers (Slack, Notion, GitHub, AWS, Datadog, Stripe, Mailgun, Linear, Vercel, Cloudflare, Auth0, Sentry, Loom, Figma) maar geen formeel leveranciersregister of beoordelings-proces. DPA\'s zijn met de meeste afgesloten (Stripe, Auth0, AWS, Datadog) maar niet centraal geregistreerd. We hebben een ad-hoc-aanpak: nieuwe tool wordt door engineer geëvalueerd, geen formele security-toets. Dit is een bewuste gap die in 2026 wordt aangepakt.'
    },
    'A.5.24': {
      procedure: 'Incident response runbook (concept v0.7)',
      location: 'Notion /security/incident-response',
      owner: 'Head of Engineering',
      last_verified: '',
      remark: 'We hebben een concept-runbook voor incidenten (security + availability), met escalatie-flow en communicatie-template. Tijdens de uptime-incident in juni 2025 hebben we het toegepast — werkte oké, maar enkele stappen waren onduidelijk. We hebben tot nu toe geen tabletop-exercise gedaan. Geen formele rolverdeling (incident-commander vs scribe etc). Dit staat op de Q2 2026-roadmap inclusief externe pen-test als trigger voor exercise.'
    },
    'A.5.26': {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: 'Geen formele incident-response procedure. Bij security-incidenten reageert de CTO ad-hoc met de Head of Engineering. Geen documentatie van eerdere incidents (juni 2025 uptime-incident is wel gedocumenteerd, security-incidents niet). Geen post-mortem cultuur voor security-events. Dit is een belangrijke gap voor NIS2-meldingsplicht (24h/72h/30d).'
    },
    'A.6.3': {
      procedure: 'Awareness-trainingsplan 2025-2026',
      location: 'Notion /people/security-training',
      owner: 'CPO + CTO',
      last_verified: '2025-09-12',
      remark: 'Phishing-simulaties via KnowBe4 — kwartaalcampagne, click-rate gedaald van 18% (Q1 2024) naar 7% (Q3 2025). Onboarding bevat een 30-min IB-module + quiz. Jaarlijkse refresher in november (2025: 92% completion). Sectoren met hoog risico (engineering, support) krijgen extra focus op secure-coding (OWASP top 10) en social engineering. Geen specifieke management-training voor IB-incident-handling.'
    },
    'A.6.7': {
      procedure: 'Remote work policy v1.4',
      location: 'Notion /people/remote-work',
      owner: 'CPO',
      last_verified: '2025-10-01',
      remark: 'Standaard remote-first organisatie. Alle laptops MDM-managed via Jamf met FDE (FileVault), screen-lock 5 min, malware-scanner (CrowdStrike Falcon). VPN niet meer nodig sinds zero-trust setup met Cloudflare Access. Werknemers hebben thuiswerk-richtlijnen voor netwerkbeveiliging (geen public wifi voor admin-tooling). Klant-data wordt nooit op lokale schijf gedownload.'
    },
    'A.7.7': {
      procedure: 'Clean desk policy (informeel)',
      location: '',
      owner: 'CPO',
      last_verified: '',
      remark: 'Wij hebben geen kantoor (remote-first) dus traditionele clean desk niet relevant. Voor de paar momenten dat collega\'s op een coworking-locatie werken (WeWork, kwartaal-event) geldt informeel: laptop-screen-lock bij verlaten desk, geen printouts. Geen formeel beleid. Voor klant-bezoeken (zelden) wel mondelinge afspraken. Mogelijk kandidaat voor N.v.t.-keuze in SoA met onderbouwing.'
    },
    'A.8.5': {
      procedure: 'Multi-factor authenticatie (Okta enforced)',
      location: 'Okta /admin + AWS IAM',
      owner: 'CTO',
      last_verified: '2025-11-15',
      remark: 'Okta SSO met verplichte MFA (WebAuthn voor engineering, TOTP voor anderen) voor alle interne tools. AWS access via federated SSO + MFA. Customer-facing app: TOTP MFA optioneel (50% adoptie), verplicht MFA voor admin-rollen. Service-accounts gebruiken IAM roles, geen statische credentials. Auditrapport van Okta toont 100% MFA-coverage voor employees.'
    },
    'A.8.7': {
      procedure: 'Endpoint protection (CrowdStrike Falcon)',
      location: 'CrowdStrike admin + Jamf',
      owner: 'Head of Engineering',
      last_verified: '2025-12-15',
      remark: 'CrowdStrike Falcon op alle laptops via Jamf. Real-time scanning + threat hunting. Productie-servers gebruiken AWS GuardDuty + Inspector. Email-beveiliging via Google Workspace Advanced (geavanceerde phishing-detectie). Geen meldingen van malware-detecties op endpoints in 2025. Update-policy: automatisch via Jamf binnen 7 dagen na release.'
    },
    'A.8.13': {
      procedure: 'Backup-procedure productie (concept v0.3)',
      location: 'Notion /infrastructure/backups',
      owner: 'Head of Engineering',
      last_verified: '',
      remark: 'AWS RDS automated backups (PITR 7 dagen, snapshots 35 dagen) voor productie-database. S3-buckets met versioning + cross-region replication naar eu-central-1. Restore-procedure is gedocumenteerd maar nog niet getest in 2025. Geen formele DR-test. RPO is 5 minuten (RDS replication), RTO niet formeel vastgesteld maar vermoedelijk 1-2 uur op basis van RDS restore-tijd.'
    },
    'A.8.15': {
      procedure: 'Logging-strategie (deels)',
      location: 'Datadog /logs + AWS CloudTrail',
      owner: 'Head of Engineering',
      last_verified: '2025-09-01',
      remark: 'Application-logs naar Datadog (30 dagen retention, hot tier), AWS CloudTrail naar S3 (1 jaar retention). Geen centrale alerting op security-events (alleen uptime/performance via PagerDuty). Geen retentie-beleid formeel vastgelegd voor compliance. Auth-logs (Okta) gaan ook naar Datadog. Audit-logs van database (RDS) niet ingeschakeld — bewuste keuze door cost maar mogelijk gap voor NIS2.'
    },
    'A.8.24': {
      procedure: 'Cryptografiebeleid v1.5',
      location: 'Notion /security/crypto',
      owner: 'CTO',
      last_verified: '2025-08-20',
      remark: 'TLS 1.3 enforced op alle public endpoints (Cloudflare). Internal traffic via mTLS (Istio service mesh). Data-at-rest: AES-256 voor RDS, S3 SSE-KMS. Customer-data encryption keys gemanaged via AWS KMS, customer-managed keys per tenant beschikbaar als enterprise-feature. Geen quantum-safe migration plan; volgt NIST PQC-roadmap voor 2027.'
    },
    'C.4.3': {
      procedure: 'ISMS Scope Document v1.2',
      location: 'SharePoint /IT/ISMS/scope.pdf',
      owner: 'CTO',
      last_verified: '2025-07-15',
      remark: 'ISMS-scope omvat de SaaS-applicatie, de productie-infrastructuur (AWS eu-west-1 + eu-central-1), de support- en engineering-teams. Scope sluit klant-on-premise-installaties uit (komt nauwelijks voor, expliciet niet ondersteund). Document is door directie goedgekeurd in juli 2025 en gereferenced vanuit informatiebeveiligingsbeleid.'
    },
    'C.5.2': {
      procedure: 'Informatiebeveiligingsbeleid v2.3',
      location: 'SharePoint /IT/Beleid/IB-beleid.pdf',
      owner: 'M. de Vries (CTO)',
      last_verified: '2025-09-15',
      remark: 'Zie A.5.1 — zelfde document. Dekt zowel beleid als clausule 5.2 commitment van de directie. Bevat scope, doelstellingen, commitment-statement door CEO en CTO, en verwijzing naar SoA en risicobeoordelingsproces.'
    },
    'C.6.1': {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: 'Wij hebben geen gestructureerde risicobeoordelingsprocedure. We werken op gevoel + AWS Well-Architected Reviews voor technisch risico. Geen formele methodiek (ISO 31000, OCTAVE, FAIR), geen risicoregister. Dit is een grote gap voor ISO 27001 omdat clausule 6.1 en 8.2 expliciet een gedocumenteerde aanpak vereist. Plan: ISO 31000-light methodiek implementeren in Q1 2026.'
    },
    'C.7.3': {
      procedure: 'Awareness programma (KnowBe4 + onboarding)',
      location: 'Notion /people/security-training',
      owner: 'CPO + CTO',
      last_verified: '2025-12-01',
      remark: 'Zie A.6.3 — zelfde uitvoering. Awareness-cijfers tonen consistente verbetering. KnowBe4-rapportage maandelijks naar het MT.'
    },
    'C.9.2': {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: 'Geen interne audit uitgevoerd. We hebben wel jaarlijks een externe pen-test (laatste: oktober 2025 door Pentestify, 2 medium findings, beide gefixt) maar dat dekt geen ISMS-audit. Voor ISO 27001 hebben we een interne audit nodig die ALLE Annex A-controls toetst. Dit staat gepland voor Q2 2026 als onderdeel van de ISO-traject voorbereiding.'
    },
    'C.9.3': {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: 'Geen formele ISMS management-review uitgevoerd. We hebben wel kwartaal-MT-meetings waar security-onderwerpen aan bod komen maar geen specifieke ISMS-agenda met inputs/outputs zoals clausule 9.3 voorschrijft. Verwachten te starten in juni 2026 met eerste formele review als pre-audit voor ISO-certificering.'
    }
  };

  // Genereer evidence voor controls die niet specifiek zijn gedefinieerd
  function buildGenericEvidence(controlId, controlName, level) {
    if (level === 'nvt') {
      return {
        procedure: '',
        location: '',
        owner: '',
        last_verified: '',
        remark: `Niet van toepassing op onze organisatie: ${controlName.toLowerCase()}. Onderbouwing in SoA: wij hebben geen activiteiten waarop deze maatregel betrekking heeft. (Voorbeeld: geen eigen datacenter, geen on-premise hardware, geen secret laboratoria, etc.) Bevestigd door CTO op meest recente SoA-review.`
      };
    }
    if (level === 'strong') {
      return {
        procedure: `${controlName} — beleid + procedure (v1.x)`,
        location: 'Notion /security of SharePoint /IT/Beleid/',
        owner: 'CTO of Head of Engineering',
        last_verified: '2025-10-15',
        remark: `${controlName} is bij ons goed ingericht. Wij hebben hiervoor procedure en/of technische maatregelen geïmplementeerd, gedocumenteerd en jaarlijks gereviewed. Geen openstaande non-conformiteiten in interne controls. Eigenaar is duidelijk toegewezen en de werking wordt steekproefsgewijs gecontroleerd.`
      };
    }
    if (level === 'medium') {
      return {
        procedure: `${controlName} — concept v0.6`,
        location: 'Notion /security (draft)',
        owner: 'Niet formeel toegewezen',
        last_verified: '',
        remark: `${controlName} is bij ons deels ingericht. We hebben een concept-procedure of best-effort-aanpak, maar niet formeel goedgekeurd door directie en niet aantoonbaar gemonitord. Q1-Q2 2026 staat formalisering op de roadmap, gekoppeld aan het ISO-traject.`
      };
    }
    // weak
    return {
      procedure: '',
      location: '',
      owner: '',
      last_verified: '',
      remark: `${controlName}: nog niet formeel ingericht. Wij hebben geen documentatie of vaste procedure hiervoor. Wel doen we informeel een aantal dingen die hier deels onder vallen, maar niet aantoonbaar. Dit is bewust geprioriteerd in onze ISO-roadmap voor 2026.`
    };
  }

  function getMockEvidence(controlId, controlName) {
    const level = COMPLIANCE_LEVELS[controlId] || 'medium';
    if (SPECIFIC_EVIDENCE[controlId]) {
      return { level, ...SPECIFIC_EVIDENCE[controlId] };
    }
    return { level, ...buildGenericEvidence(controlId, controlName, level) };
  }

  // Score per CMMI-level (0-4): 4=Geoptimaliseerd, 3=Geïmplementeerd,
  // 2=In ontwikkeling, 1=Gepland, 0=Niet aanwezig, 'nvt'=N.v.t.
  // Variërend per dimensie zodat antwoorden niet uniform zijn.
  function getMockAnswerScore(level, dimension, qIdx) {
    if (level === 'nvt') return 'nvt';

    // Variatie via dimensie + index voor realisme
    const variation = (qIdx + (dimension ? dimension.length : 0)) % 3;

    if (level === 'strong') {
      // 80% scores 3-4, soms 2 voor effectiviteit
      if (dimension === 'effectiviteit') return variation === 0 ? '2' : '3';
      if (dimension === 'eigenaarschap' || dimension === 'beleid') return '4';
      return variation < 2 ? '3' : '4';
    }
    if (level === 'medium') {
      // Mix 1-3, meestal 2
      if (dimension === 'beleid') return variation === 0 ? '1' : '2';
      if (dimension === 'effectiviteit') return variation === 0 ? '0' : '1';
      return variation < 2 ? '2' : '3';
    }
    // weak
    if (dimension === 'beleid') return '0';
    if (dimension === 'effectiviteit') return '0';
    return variation === 0 ? '1' : '0';
  }

  // Mapping van control_id naar bestand(en) in /beleidspakket/basispakket/.
  // Bij strong/medium controls wordt het MD-bestand ECHT geüpload naar
  // evidence/{user_id}/{control_id}/, zodat de AI inhoudelijk kan analyseren
  // ipv enkel filename te lezen.
  const CONTROL_TO_BELEIDSDOCS = {
    'A.5.1':  ['02-informatiebeveiligingsbeleid.md'],
    'A.5.2':  ['04-rollen-verantwoordelijkheden.md'],
    'A.5.4':  ['03-doelstellingen.md'],
    'A.5.9':  ['08-asset-register.md'],
    'A.5.10': ['11-acceptable-use.md'],
    'A.5.11': ['11-acceptable-use.md'],
    'A.5.12': ['14-classificatiebeleid.md'],
    'A.5.13': ['14-classificatiebeleid.md'],
    'A.5.14': ['14-classificatiebeleid.md'],
    'A.5.15': ['12-toegangsbeleid.md'],
    'A.5.16': ['12-toegangsbeleid.md'],
    'A.5.17': ['13-wachtwoordbeleid.md'],
    'A.5.18': ['12-toegangsbeleid.md'],
    'A.5.24': ['19-incident-response.md'],
    'A.5.25': ['19-incident-response.md'],
    'A.5.26': ['19-incident-response.md'],
    'A.5.27': ['19-incident-response.md'],
    'A.5.29': ['20-bcp.md'],
    'A.5.30': ['20-bcp.md'],
    'A.5.31': ['26-register-wettelijke-vereisten.md'],
    'A.5.34': ['30-ropa-verwerkingsregister.md', '29-dpia-template.md'],
    'A.5.36': ['06-soa.md'],
    'A.5.37': ['07-documentbeheer.md'],
    'A.6.1':  ['09-hr-beleid.md'],
    'A.6.2':  ['09-hr-beleid.md'],
    'A.6.3':  ['10-awareness-trainingsplan.md'],
    'A.6.4':  ['09-hr-beleid.md'],
    'A.6.5':  ['09-hr-beleid.md'],
    'A.6.6':  ['09-hr-beleid.md'],
    'A.6.7':  ['09-hr-beleid.md'],
    'A.7.1':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.2':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.3':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.4':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.5':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.6':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.7':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.8':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.9':  ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.10': ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.11': ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.12': ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.13': ['15-fysiek-beveiligingsbeleid.md'],
    'A.7.14': ['15-fysiek-beveiligingsbeleid.md'],
    'A.8.2':  ['12-toegangsbeleid.md'],
    'A.8.3':  ['12-toegangsbeleid.md'],
    'A.8.5':  ['13-wachtwoordbeleid.md'],
    'A.8.7':  ['17-patch-kwetsbaarheidsbeheer.md'],
    'A.8.8':  ['17-patch-kwetsbaarheidsbeheer.md'],
    'A.8.13': ['20-bcp.md'],
    'A.8.15': ['18-logging-monitoring.md'],
    'A.8.16': ['18-logging-monitoring.md'],
    'A.8.24': ['16-cryptografiebeleid.md'],
    'A.8.25': ['27-secure-development.md'],
    'A.8.26': ['27-secure-development.md'],
    'A.8.27': ['27-secure-development.md'],
    'A.8.28': ['27-secure-development.md'],
    'A.8.29': ['27-secure-development.md'],
    'A.8.32': ['27-secure-development.md'],
    'C.4.1':  ['01-isms-scope.md', '23-context-belanghebbenden.md'],
    'C.4.3':  ['01-isms-scope.md'],
    'C.5.1':  ['02-informatiebeveiligingsbeleid.md'],
    'C.5.2':  ['02-informatiebeveiligingsbeleid.md'],
    'C.5.3':  ['04-rollen-verantwoordelijkheden.md'],
    'C.6.1':  ['05-risicobeoordeling.md', '06-soa.md'],
    'C.6.2':  ['03-doelstellingen.md'],
    'C.7.2':  ['24-competentiematrix.md'],
    'C.7.3':  ['10-awareness-trainingsplan.md'],
    'C.7.4':  ['10-awareness-trainingsplan.md'],
    'C.7.5':  ['07-documentbeheer.md'],
    'C.9.1':  ['25-kpi-meetrapportage.md'],
    'C.9.2':  ['21-interne-audit.md'],
    'C.9.3':  ['22-management-review-correctieve-maatregelen.md'],
    'C.10.1': ['22-management-review-correctieve-maatregelen.md'],
    'C.10.2': ['22-management-review-correctieve-maatregelen.md'],
  };

  // Bouw evidence-filename uit klant-toelichting procedure_naam. Behoudt spaces en
  // case zodat admin.html's substring-match (procLower.includes(fn-stripped)) klopt.
  // Verwijdert .pdf/.docx/.xlsx etc en plakt .md erop (we serveren markdown-content).
  function deriveEvidenceFilename(procedureName, fallback) {
    if (procedureName && procedureName.trim()) {
      return procedureName.replace(/\.(pdf|docx?|xlsx?|pptx?|txt|md|csv)$/i, '').trim() + '.md';
    }
    return fallback;
  }

  // Fetch + upload één beleidsdoc als evidence onder de bestandsnaam die de klant
  // in zijn toelichting noemt. Voegt versie-header toe (strong = goedgekeurd,
  // medium = draft) zodat AI ook de status uit content kan halen.
  async function uploadBeleidsdocAsEvidence(sb, klantUserId, controlId, mdSourceFile, level, procedureName) {
    try {
      const baseUrl = '/beleidspakket/basispakket/' + mdSourceFile;
      const resp = await fetch(baseUrl);
      if (!resp.ok) return false;
      let text = await resp.text();
      const targetFilename = deriveEvidenceFilename(procedureName, mdSourceFile);
      const header = level === 'strong'
        ? `---\nDocument: ${procedureName || mdSourceFile}\nVersie: 2.3\nStatus: Goedgekeurd door directie\nOndertekend: 2025-09-15 door M. de Vries (CTO)\nVolgende review: 2026-09-15\nClassificatie: Intern — Vertrouwelijk\n---\n\n`
        : `---\nDocument: ${procedureName || mdSourceFile}\nVersie: 0.6 (DRAFT)\nStatus: Concept — nog niet formeel goedgekeurd\nOndertekend: nee\nEigenaar: nog te bepalen\nClassificatie: Werk in uitvoering\n---\n\n`;
      const fullText = header + text;
      const blob = new Blob([fullText], { type: 'text/markdown' });
      const targetPath = `${klantUserId}/${controlId}/${targetFilename}`;
      const { error } = await sb.storage.from('evidence').upload(targetPath, blob, { upsert: true, contentType: 'text/markdown', cacheControl: '3600' });
      if (error) { console.warn('upload fail', controlId, targetFilename, error); return false; }
      return true;
    } catch (e) {
      console.warn('uploadBeleidsdocAsEvidence failed', controlId, mdSourceFile, e);
      return false;
    }
  }

  // ── Seed-functie: vult voor klant_user_id alle answers + notes + echte uploads ──
  async function seedMockEvidence(sb, klantUserId, controlsList, gapQuestionsMap, options = {}) {
    if (!sb || !klantUserId) throw new Error('seedMockEvidence: sb + klantUserId vereist');
    const onProgress = options.onProgress || (() => {});

    let countNotes = 0, countAnswers = 0, countUploads = 0;
    const allAnswers = {};
    const today = new Date().toISOString();

    onProgress({ phase: 'start', total: controlsList.length });

    for (let i = 0; i < controlsList.length; i++) {
      const ctrl = controlsList[i];
      const { level, procedure, location, owner, last_verified, remark } = getMockEvidence(ctrl.id, ctrl.name);

      // Upload ECHTE beleidsdocs voor strong/medium controls — geeft AI iets om
      // inhoudelijk te analyseren. Eerste doc krijgt de bestandsnaam uit
      // klant-toelichting (procedure) zodat admin-UI 'matching upload' herkent.
      if (level === 'strong' || level === 'medium') {
        const docs = CONTROL_TO_BELEIDSDOCS[ctrl.id] || [];
        for (let dIdx = 0; dIdx < Math.min(docs.length, 2); dIdx++) {
          const md = docs[dIdx];
          // 1e doc: gebruik procedure-naam uit note · 2e doc: gebruik md-source naam
          const procName = dIdx === 0 ? procedure : null;
          const ok = await uploadBeleidsdocAsEvidence(sb, klantUserId, ctrl.id, md, level, procName);
          if (ok) countUploads++;
        }
      }

      // Alleen evidence-records aanmaken bij meaningful content
      if (procedure || location || owner || last_verified || remark) {
        try {
          await sb.from('gap_control_notes').upsert({
            klant_user_id: klantUserId,
            answered_by: klantUserId,
            control_id: ctrl.id,
            revision_no: 1,
            procedure_naam: (procedure || '').slice(0, 800) || null,
            locatie: (location || '').slice(0, 800) || null,
            eigenaar: (owner || '').slice(0, 200) || null,
            laatst_gereviewd: last_verified && /^\d{4}-\d{2}-\d{2}$/.test(last_verified) ? last_verified : null,
            toelichting: (remark || '').slice(0, 5000) || null,
            updated_at: today
          }, { onConflict: 'klant_user_id,answered_by,control_id,revision_no' });
          countNotes++;
        } catch (e) {
          console.warn('seedMockEvidence: failed to upsert note for', ctrl.id, e);
        }
      }

      // Generate answers per question
      const qs = (gapQuestionsMap && gapQuestionsMap[ctrl.id]) || [];
      qs.forEach((q, qi) => {
        const dim = q.dim || 'proces';
        allAnswers[ctrl.id + '_' + qi] = getMockAnswerScore(level, dim, qi);
        countAnswers++;
      });

      onProgress({ phase: 'control', i: i + 1, total: controlsList.length, controlId: ctrl.id });
    }

    // Schrijf alle answers naar gap_analyse-tabel
    try {
      await sb.from('gap_analyse').upsert({
        user_id: klantUserId,
        answers: allAnswers,
        updated_at: today
      }, { onConflict: 'user_id' });
    } catch (e) {
      console.warn('seedMockEvidence: failed to upsert gap_analyse', e);
    }

    onProgress({ phase: 'done', notes: countNotes, answers: countAnswers, uploads: countUploads });

    return { notes: countNotes, answers: countAnswers, uploads: countUploads, levels: COMPLIANCE_LEVELS };
  }

  // Reset: verwijder alle mock data voor klant_user_id (incl. evidence-uploads + drafts)
  async function clearMockEvidence(sb, klantUserId) {
    if (!sb || !klantUserId) throw new Error('clearMockEvidence: sb + klantUserId vereist');
    await sb.from('gap_control_notes').delete().eq('klant_user_id', klantUserId);
    await sb.from('gap_analyse').delete().eq('user_id', klantUserId);
    // AI-draft + feedback opruimen zodat volgende run vers begint
    try { await sb.from('auditor_findings_draft').delete().eq('user_id', klantUserId); } catch (e) { console.warn('cleanup drafts fail', e); }
    // Evidence-storage opruimen (per control-folder)
    try {
      const { data: folders } = await sb.storage.from('evidence').list(klantUserId, { limit: 500 });
      for (const folder of (folders || [])) {
        if (!folder.name) continue;
        const { data: files } = await sb.storage.from('evidence').list(`${klantUserId}/${folder.name}`, { limit: 100 });
        if (files && files.length) {
          const paths = files.filter(f => f.name).map(f => `${klantUserId}/${folder.name}/${f.name}`);
          if (paths.length) await sb.storage.from('evidence').remove(paths);
        }
      }
    } catch (e) { console.warn('cleanup storage fail', e); }
    return { ok: true };
  }

  // Expose
  window.MockEvidence = {
    LEVELS: COMPLIANCE_LEVELS,
    getMockEvidence,
    getMockAnswerScore,
    seedMockEvidence,
    clearMockEvidence
  };
})();
