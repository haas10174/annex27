// ═════════════════════════════════════════════════════════════════
// NIS2 CONTENT LIBRARY — training-stijl per maatregel
// ═════════════════════════════════════════════════════════════════
//
// Per maatregel een mini-hoofdstuk: wettelijke basis, kernpunten,
// concrete bewijsstukken die een auditor wil zien, mapping naar
// ISO 27001:2022 controls. Plus link-out naar EUR-Lex.
//
// Gebruikt door dashboard.html (NIS2-tab) om de wizard te renderen.

const nis2Content = {

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.a — Risicoanalyse en informatiebeveiligingsbeleid
  // ═══════════════════════════════════════════════════════════
  'N.21.2.a': {
    chapterTitle: 'Risicoanalyse en informatiebeveiligingsbeleid',
    legalRef: 'Art. 21 lid 2 onder a NIS2-richtlijn (EU) 2022/2555',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'De fundering van het hele NIS2-programma. Zonder vastgesteld beleid en gestructureerde risicoanalyse is alles wat erna komt los zand. NIS2 vereist dat u beide aantoonbaar heeft, niet als pro-forma document maar als levend instrument.',
    keyPoints: [
      'Een formeel beleid voor informatiebeveiliging, goedgekeurd door de directie (Art. 20).',
      'Een gestructureerde risicoanalyse-methodiek (kans × impact, behandelplan, eigenaarschap).',
      'Periodieke herziening: minimaal jaarlijks plus bij elke materiële wijziging in dreigingen of organisatie.',
      'Verband met de andere negen maatregelen: het beleid stuurt wat verderop concreet wordt ingericht.'
    ],
    evidenceChecklist: [
      'Beleidsdocument met datum, versie, ondertekening directie.',
      'Risicoregister met tenminste 10 geïdentificeerde risico\'s, classificatie en eigenaar per risico.',
      'Notulen of e-mail van laatste beleidsreview (binnen 12 maanden).',
      'Bewijs van communicatie naar medewerkers (intranet-screenshot, onboarding-materiaal).'
    ],
    isoMapping: ['ISO 27001 clausule 5.1, 5.2, 6.1.2', 'ISO 27002 control A.5.1 (Beleid)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.b — Incidentbehandeling
  // ═══════════════════════════════════════════════════════════
  'N.21.2.b': {
    chapterTitle: 'Incidentbehandeling',
    legalRef: 'Art. 21 lid 2 onder b + Art. 23 NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'De toezichthouder gaat ervan uit dat u incidenten zult krijgen. Vraag is: heeft u een plan, herkent u ze snel genoeg, en kunt u binnen 24 uur formeel reageren? Art. 21.2.b koppelt rechtstreeks aan de meldingsplicht uit Art. 23.',
    keyPoints: [
      'Schriftelijk Incident Response Plan met scope, escalatie-criteria en rolverdeling.',
      'Runbooks voor de meest waarschijnlijke scenario\'s: ransomware, datalek, DDoS, account-compromis.',
      'Een 24/7 bereikbare verantwoordelijke (eigen of via MSSP/SOC).',
      'Meting van Mean Time To Detect (MTTD) en Mean Time To Respond (MTTR) — niet om te showen, om te verbeteren.'
    ],
    evidenceChecklist: [
      'IR-plan PDF (max 12 maanden oud).',
      '2-3 voorbeeld-runbooks (ransomware, datalek minimaal).',
      'Verslag van laatste tabletop-oefening of werkelijk incident in afgelopen jaar.',
      'Ticket-systeem-screenshot waar incident-tickets worden bijgehouden.'
    ],
    isoMapping: ['ISO 27001 clausule 10.1', 'ISO 27002 A.5.24-A.5.28 (Incident-controls)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.c — Bedrijfscontinuïteit
  // ═══════════════════════════════════════════════════════════
  'N.21.2.c': {
    chapterTitle: 'Bedrijfscontinuïteit, back-up en crisismanagement',
    legalRef: 'Art. 21 lid 2 onder c NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'De auditor wil zien dat u kan herstellen. Niet "we hebben back-ups", maar: weet u welke processen kritiek zijn, hoe lang ze uit mogen vallen (RTO), en hoeveel data u mag verliezen (RPO)? En heeft u dat ooit echt getest?',
    keyPoints: [
      'Business Continuity Plan met scope, kritieke processen en herstel-eisen.',
      'Per kritiek proces vastgelegde RTO en RPO op basis van een Business Impact Analysis.',
      'Back-up-strategie minimaal 3-2-1 (3 kopieën, 2 media, 1 offsite/immutable).',
      'Jaarlijkse herstel-test met gedocumenteerd resultaat.'
    ],
    evidenceChecklist: [
      'BCP-document met RTO/RPO per proces.',
      'Back-up-rapport (laatste 30 dagen).',
      'Verslag van laatste restore-test, inclusief duur en resultaat.',
      'Bewijs van immutable storage of air-gap voor ransomware-bescherming.'
    ],
    isoMapping: ['ISO 27002 A.5.29 (Continuity), A.5.30, A.8.13 (Backup), A.8.14'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.d — Supply chain
  // ═══════════════════════════════════════════════════════════
  'N.21.2.d': {
    chapterTitle: 'Supply chain-beveiliging',
    legalRef: 'Art. 21 lid 2 onder d NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Een van de zwaarste NIS2-eisen omdat hij u dwingt voorbij uw eigen grens te kijken. SolarWinds, Kaseya, MOVEit — bijna alle grote 2024-incidenten begonnen bij een leverancier. NIS2 verwacht dat u uw kritieke leveranciers actief beoordeelt en bewaakt.',
    keyPoints: [
      'Actueel leveranciersregister met per leverancier een risico-classificatie.',
      'Contractuele securityseisen (DPA, NDA, audit-recht, datalek-meldingsplicht).',
      'Pre-engagement assessment voor nieuwe leveranciers met toegang tot kritieke data.',
      'Periodieke herbeoordeling: jaarlijks voor kritieke, om de 2-3 jaar voor overige.'
    ],
    evidenceChecklist: [
      'Leveranciersregister met classificatie-kolom.',
      'Voorbeeld-DPA en NDA-template.',
      'Ingevulde assessment-formulieren van 2-3 kritieke leveranciers.',
      'Notulen van laatste leveranciers-review-meeting.'
    ],
    isoMapping: ['ISO 27002 A.5.19-A.5.23 (Supplier-controls)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.e — Veilige ontwikkeling
  // ═══════════════════════════════════════════════════════════
  'N.21.2.e': {
    chapterTitle: 'Veilige aanschaf, ontwikkeling en onderhoud',
    legalRef: 'Art. 21 lid 2 onder e NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Geldt sterker voor entiteiten die zelf software maken (SaaS, productiebedrijven met embedded software, ICT-dienstverleners). Voor pure afnemers: focus op aanschaf-procedure en patch-discipline.',
    keyPoints: [
      'Secure coding-richtlijnen voor de gebruikte talen en frameworks.',
      'Verplichte code-review voor elke productie-deploy.',
      'Vulnerability management op zowel eigen code als externe componenten (SBOM denkbaar).',
      'Patch-SLA per kwetsbaarheid-niveau (critical/high/medium/low).'
    ],
    evidenceChecklist: [
      'Secure coding-document of intern wiki-artikel.',
      'GitHub/GitLab branch-protection-screenshot of code-review-bewijs.',
      'Vulnerability-scan-rapport (laatste 30 dagen).',
      'Patch-register met SLA-tracking.'
    ],
    isoMapping: ['ISO 27002 A.8.8 (Vulnerability mgmt), A.8.25-A.8.31 (Secure development)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.f — Effectiviteitsbeoordeling
  // ═══════════════════════════════════════════════════════════
  'N.21.2.f': {
    chapterTitle: 'Effectiviteitsbeoordeling van maatregelen',
    legalRef: 'Art. 21 lid 2 onder f NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Het verschil tussen "wij hebben beleid" en "wij weten dat ons beleid werkt". NIS2 vraagt actieve monitoring: KPI\'s, interne audits, management review. Dit is waar de meeste MKB-entiteiten zakken bij een eerste audit.',
    keyPoints: [
      'KPI\'s voor security-maatregelen, periodiek gemeten en gerapporteerd aan de directie.',
      'Interne audit op het ISMS of cybersecurity-programma, minimaal jaarlijks.',
      'Management review met agenda-punten conform ISO 27001 clausule 9.3.',
      'Aantoonbare opvolging van findings (geen registratie zonder afsluiting).'
    ],
    evidenceChecklist: [
      'KPI-dashboard of maandelijks security-rapport.',
      'Audit-rapport van laatste interne audit.',
      'Notulen van laatste management review.',
      'CAPA-register (correctieve maatregelen) met status-tracking.'
    ],
    isoMapping: ['ISO 27001 clausule 9.1, 9.2, 9.3, 10.1, 10.2'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.g — Basale cyberhygiëne en training
  // ═══════════════════════════════════════════════════════════
  'N.21.2.g': {
    chapterTitle: 'Cyberhygiëne en awareness-training',
    legalRef: 'Art. 21 lid 2 onder g + Art. 20 lid 2 NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Het zwakste punt blijft de mens. NIS2 verbindt training direct aan bestuursaansprakelijkheid: niet alleen medewerkers moeten getraind worden, ook u als bestuurder (Art. 20.2). Phishing-simulaties zijn de de-facto standaard om effectiviteit te meten.',
    keyPoints: [
      'Awareness-training voor alle medewerkers, minimaal jaarlijks.',
      'Security-onboarding voor nieuwe medewerkers binnen 30 dagen na indiensttreding.',
      'Phishing-simulaties met klikratio-meting en follow-up training.',
      'Bestuurstraining apart (NIS2 Art. 20.2 — zie Annex27 Bestuur-kennispakket).'
    ],
    evidenceChecklist: [
      'Trainingsplan met doelgroepen, frequentie en onderwerpen.',
      'Lijst van afgeronde trainingen (LMS-export of getekende presentielijsten).',
      'Phishing-simulatie-rapport met klikratio.',
      'Getekende kennisverklaring van elke bestuurder.'
    ],
    isoMapping: ['ISO 27002 A.6.3 (Awareness)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.h — Cryptografie
  // ═══════════════════════════════════════════════════════════
  'N.21.2.h': {
    chapterTitle: 'Cryptografie en encryptie',
    legalRef: 'Art. 21 lid 2 onder h NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Encryptie zelf is hygiëne (TLS, AES-256). Wat NIS2 echt verwacht is uw sleutelbeheer: wie genereert sleutels, wanneer worden ze geroteerd, wat doet u bij compromittering, en hoe wordt key-escrow geregeld voor uw kritieke systemen?',
    keyPoints: [
      'Cryptografie-beleid met goedgekeurde algoritmen (geen MD5, SHA-1, RC4, etc).',
      'Encryptie at-rest op alle data-stores met persoonsgegevens of bedrijfskritiek.',
      'Encryptie in-transit (TLS 1.2+, liefst 1.3) afgedwongen op alle externe verbindingen.',
      'Sleutelbeheer-procedure: generatie, opslag, rotatie, intrekking, escrow.'
    ],
    evidenceChecklist: [
      'Cryptografie-beleid.',
      'Configuratie-bewijs encryptie at-rest (Supabase/AWS/Azure-screenshot).',
      'SSLLabs-rapport van publieke endpoints (A+ score).',
      'Sleutelbeheer-procedure + register van actieve sleutels.'
    ],
    isoMapping: ['ISO 27002 A.8.24 (Cryptografie)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.i — HR, toegangsbeleid, asset management
  // ═══════════════════════════════════════════════════════════
  'N.21.2.i': {
    chapterTitle: 'HR, toegangsbeleid en asset management',
    legalRef: 'Art. 21 lid 2 onder i NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Een breed artikel dat drie thema\'s aanstipt. Auditor-aandacht gaat naar joiner-mover-leaver-flow: krijgen nieuwe medewerkers binnen 5 werkdagen toegang, en zijn rechten van vertrokken collega\'s écht binnen 24 uur ingetrokken? Plus: weet u wat u in huis heeft (assets)?',
    keyPoints: [
      'Pre-employment screening (identiteit, diploma, eventueel VOG/uittreksel).',
      'Toegangsrechten ingetrokken binnen 24 uur na uitdiensttreding.',
      'Halfjaarlijkse access review door manager of asset-eigenaar.',
      'Actueel asset-register met eigenaar, classificatie en locatie per asset.'
    ],
    evidenceChecklist: [
      'Screening-procedure HR.',
      'Joiner-mover-leaver-checklist of HR-IT-flow.',
      'Laatste access-review-rapport.',
      'Asset-register (Excel of CMDB-export).'
    ],
    isoMapping: ['ISO 27002 A.5.9 (Asset register), A.5.15-A.5.18 (Access), A.6.1-A.6.8 (HR)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 21.2.j — MFA en beveiligde communicatie
  // ═══════════════════════════════════════════════════════════
  'N.21.2.j': {
    chapterTitle: 'MFA, beveiligde en noodcommunicatie',
    legalRef: 'Art. 21 lid 2 onder j NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'MFA-coverage is in een NIS2-audit nooit "we hebben het optioneel aangezet". Het moet afgedwongen zijn, óók voor admin-accounts, en u moet kunnen aantonen wat de coverage is. Noodcommunicatie is het minst bekende deel: hoe communiceert u als uw primaire mailomgeving down is?',
    keyPoints: [
      'MFA verplicht voor alle accounts met toegang tot bedrijfsdata.',
      'MFA óók voor privileged/admin-accounts, zonder uitzonderingen.',
      'Coverage-meting: percentage accounts met actieve MFA, target 100%.',
      'Noodcommunicatie-kanaal bij uitval primaire systemen (Signal-groep, telefoonlijst, secure messaging).'
    ],
    evidenceChecklist: [
      'IdP-screenshot (Google Workspace, Microsoft 365, Okta) met MFA-policy.',
      'Coverage-rapport: % accounts met MFA.',
      'Documentatie noodcommunicatie-procedure.',
      'Bewijs dat noodkanaal minimaal jaarlijks is getest.'
    ],
    isoMapping: ['ISO 27002 A.8.5 (Veilige authenticatie), A.8.20 (Netwerk)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 20 — Bestuursaansprakelijkheid
  // ═══════════════════════════════════════════════════════════
  'N.20': {
    chapterTitle: 'Bestuursaansprakelijkheid en training',
    legalRef: 'Art. 20 NIS2 — lid 1 (toezicht) en lid 2 (training)',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Het belangrijkste verschil met de oude NIS-richtlijn. Bestuurders zijn persoonlijk verantwoordelijk; bij overtreding kunnen ze tijdelijk verboden worden bestuursfuncties uit te oefenen (Art. 32 lid 5). Dit is geen handtekening op pagina 1 van een beleidsstuk meer.',
    keyPoints: [
      'De directie keurt de Art. 21-maatregelen expliciet goed via een directiebesluit (datum, scope, budget).',
      'Toezicht via minimaal kwartaal-rapportage van de CISO of verantwoordelijke.',
      'Significante incidenten worden binnen 7 werkdagen op directieniveau behandeld.',
      'Alle bestuursleden hebben aantoonbaar cybersecurity-training gevolgd (Art. 20.2).'
    ],
    evidenceChecklist: [
      'Directiebesluit Art. 21-pakket (Annex27 NIS2-001 Bestuursverklaring).',
      'Notulen van de laatste directie-meeting met cybersecurity-agendapunt.',
      'Voor elke bestuurder: getekende kennisverklaring (Annex27 NIS2-007).',
      'Score op de NIS2-toetsvragen voor bestuurders (Annex27 NIS2-006, slagingsgrens 4/5).'
    ],
    isoMapping: ['ISO 27001 clausule 5.1 (Leadership)'],
  },

  // ═══════════════════════════════════════════════════════════
  // Art. 23 — Meldingsplicht
  // ═══════════════════════════════════════════════════════════
  'N.23': {
    chapterTitle: 'Meldingsplicht bij significante incidenten',
    legalRef: 'Art. 23 NIS2',
    eurlex: 'https://eur-lex.europa.eu/eli/dir/2022/2555/oj',
    intro: 'Drie deadlines bij elk significant incident: 24 uur (vroege waarschuwing), 72 uur (meldingsrapport), 1 maand (eindrapport). Aan de toezichthouder, niet aan klanten. Voor NL is dat NCSC of CSIRT-DSP; voor BE is dat CCB. Wie internationale klanten heeft moet beide kennen.',
    keyPoints: [
      'Definitie significant incident bekend (aanzienlijke impact op dienstverlening).',
      'Procedure voor 24-uurs vroege waarschuwing operationeel.',
      'Templates voor 72-uurs meldingsrapport en 1-maand eindrapport beschikbaar.',
      'Minimaal jaarlijks getest via tabletop-oefening.'
    ],
    evidenceChecklist: [
      'Meldingsprocedure met de drie deadlines.',
      'Lijst van toezichthouders en hun meldportalen (CCB, NCSC, CSIRT-DSP).',
      'Templates voor de drie rapporten.',
      'Verslag van laatste tabletop-meldingsoefening.'
    ],
    isoMapping: ['ISO 27002 A.5.5 (Contact toezichthouders), A.5.24-A.5.26 (Incident)'],
  },

};

if (typeof window !== 'undefined') {
  window.nis2Content = nis2Content;
}
