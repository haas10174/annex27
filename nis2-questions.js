// ═════════════════════════════════════════════════════════════════
// NIS2 READINESS QUESTIONS — 40 vragen op 10 maatregelen + bestuur + meldingsplicht
// ═════════════════════════════════════════════════════════════════
//
// Structuur identiek aan gap-questions-v2.js zodat dashboard-renderer
// kan hergebruiken: per vraag een `dim` (beleid/proces/techniek/eigenaarschap/effectiviteit)
// en een `q` (vraagtekst). Default-render is bool (Ja/Grotendeels/Deels/Nee/N.v.t.) —
// alleen vragen met dim='effectiviteit' krijgen de CMMI-schaal (Geoptimaliseerd ... Niet aanwezig).
//
// Mapping:
//   N.21.2.a t/m N.21.2.j  → NIS2 Art. 21.2 beveiligingsmaatregelen
//   N.20                   → Art. 20 bestuursaansprakelijkheid + training
//   N.23                   → Art. 23 meldingsplicht (24u / 72u / 1 mnd)
//
// Totaal: 40 vragen.

const nis2Questions = {

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.a — Risicoanalyse en informatiebeveiligingsbeleid
  // ═════════════════════════════════════════════════════════════
  'N.21.2.a': {
    name: 'Risicoanalyse en informatiebeveiligingsbeleid',
    questions: [
      { dim: 'beleid',        q: 'Is er een vastgesteld informatiebeveiligingsbeleid dat door de directie is goedgekeurd?' },
      { dim: 'proces',        q: 'Wordt minstens jaarlijks een gestructureerde risicoanalyse uitgevoerd op alle informatiesystemen?' },
      { dim: 'eigenaarschap', q: 'Zijn de geïdentificeerde risico\'s geclassificeerd en is er per risico een behandelplan met eigenaar?' },
      { dim: 'proces',        q: 'Wordt het IB-beleid aantoonbaar herzien bij wijzigingen in de organisatie, dreigingen of regelgeving?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.b — Incidentbehandeling
  // ═════════════════════════════════════════════════════════════
  'N.21.2.b': {
    name: 'Incidentbehandeling',
    questions: [
      { dim: 'beleid', q: 'Is er een Incident Response Plan met escalatie-procedure, rolverdeling en escalatie-flow?' },
      { dim: 'proces', q: 'Zijn er runbooks aanwezig voor de meest waarschijnlijke incident-types (ransomware, datalek, DDoS, account-compromis)?' },
      { dim: 'proces', q: 'Is een 24-uurs vroege-waarschuwing-flow ingericht naar de bevoegde toezichthouder (CCB voor BE, NCSC-NL/CSIRT voor NL)?' },
      { dim: 'effectiviteit', q: 'Worden Mean Time To Detect (MTTD) en Mean Time To Respond (MTTR) periodiek gemeten en geëvalueerd?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.c — Bedrijfscontinuïteit, back-up, crisismanagement
  // ═════════════════════════════════════════════════════════════
  'N.21.2.c': {
    name: 'Bedrijfscontinuïteit en crisismanagement',
    questions: [
      { dim: 'beleid', q: 'Is er een Business Continuity Plan (BCP) inclusief back-up-strategie en crisismanagement-procedure?' },
      { dim: 'proces', q: 'Zijn Recovery Time Objective (RTO) en Recovery Point Objective (RPO) per kritiek proces vastgelegd?' },
      { dim: 'proces', q: 'Wordt het BCP minimaal jaarlijks getest via een oefening of simulatie (full of partial)?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.d — Supply chain security
  // ═════════════════════════════════════════════════════════════
  'N.21.2.d': {
    name: 'Supply chain security',
    questions: [
      { dim: 'beleid', q: 'Heeft u een actueel leveranciers-register met per leverancier een risico-classificatie?' },
      { dim: 'beleid', q: 'Worden cybersecurity-eisen contractueel afgedwongen bij leveranciers (DPA, NDA, audit-recht)?' },
      { dim: 'effectiviteit', q: 'Worden kritieke leveranciers minimaal jaarlijks geëvalueerd op naleving en performance?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.e — Beveiliging bij aanschaf, ontwikkeling, onderhoud
  // ═════════════════════════════════════════════════════════════
  'N.21.2.e': {
    name: 'Veilige aanschaf, ontwikkeling en onderhoud',
    questions: [
      { dim: 'beleid', q: 'Zijn er secure coding-richtlijnen voor de gebruikte talen en frameworks?' },
      { dim: 'techniek', q: 'Is code-review verplicht voor alle wijzigingen die in productie gaan?' },
      { dim: 'proces', q: 'Wordt vulnerability management actief toegepast op zowel eigen als externe componenten?' },
      { dim: 'beleid', q: 'Is een Coordinated Vulnerability Disclosure (CVD) procedure gepubliceerd volgens NCSC-leidraad of NEN-EN-ISO/IEC 29147, met een vast contactpunt voor melders?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.f — Effectiviteitsbeoordeling
  // ═════════════════════════════════════════════════════════════
  'N.21.2.f': {
    name: 'Effectiviteitsbeoordeling van security-maatregelen',
    questions: [
      { dim: 'effectiviteit', q: 'Worden KPI\'s voor security-maatregelen periodiek gemeten en gerapporteerd aan de directie?' },
      { dim: 'effectiviteit', q: 'Wordt een interne audit uitgevoerd op het ISMS of cybersecurity-programma?' },
      { dim: 'effectiviteit', q: 'Vindt minimaal jaarlijks een management review plaats waarin de effectiviteit van maatregelen wordt geëvalueerd?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.g — Basale cyberhygiëne en training
  // ═════════════════════════════════════════════════════════════
  'N.21.2.g': {
    name: 'Cyberhygiëne en awareness-training',
    questions: [
      { dim: 'proces', q: 'Krijgen alle medewerkers minimaal jaarlijks een security-awareness-training?' },
      { dim: 'techniek', q: 'Worden phishing-simulaties uitgevoerd en wordt de klikratio gemeten en gerapporteerd?' },
      { dim: 'proces', q: 'Krijgen nieuwe medewerkers binnen 30 dagen na indiensttreding een security-onboarding?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.h — Cryptografie en encryptie
  // ═════════════════════════════════════════════════════════════
  'N.21.2.h': {
    name: 'Cryptografie en encryptie',
    questions: [
      { dim: 'techniek', q: 'Is encryptie at-rest afgedwongen op alle systemen met persoonsgegevens of bedrijfskritieke data?' },
      { dim: 'techniek', q: 'Is encryptie in-transit afgedwongen voor alle externe communicatie, met cryptografische sterkte conform actueel advies van het NCSC?' },
      { dim: 'proces', q: 'Is er een sleutelbeheer-procedure voor generatie, rotatie en intrekking van cryptografische sleutels?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.i — HR-beveiliging, access control, asset management
  // ═════════════════════════════════════════════════════════════
  'N.21.2.i': {
    name: 'HR, access control en asset management',
    questions: [
      { dim: 'proces', q: 'Worden medewerkers gescreend bij indiensttreding (identiteit, diploma, eventueel VOG/uittreksel)?' },
      { dim: 'proces', q: 'Worden toegangsrechten ingetrokken op de laatste werkdag bij uitdiensttreding?' },
      { dim: 'beleid', q: 'Is er een actueel asset-register met per asset eigenaar, classificatie en locatie?' },
      { dim: 'effectiviteit', q: 'Worden toegangsrechten minimaal halfjaarlijks gereviewed door manager of asset-eigenaar?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 21.2.j — MFA, beveiligde communicatie, noodcommunicatie
  // ═════════════════════════════════════════════════════════════
  'N.21.2.j': {
    name: 'MFA, beveiligde en noodcommunicatie',
    questions: [
      { dim: 'techniek', q: 'Is multi-factor authenticatie afgedwongen voor primair aanloggen op de digitale werkomgeving, voor internet-bereikbare accounts en voor beheerrechten-accounts?' },
      { dim: 'techniek', q: 'Zijn voor accounts waar MFA technisch niet mogelijk is, mitigerende maatregelen gedefinieerd en goedgekeurd door CISO of vergelijkbare functionaris?' },
      { dim: 'proces', q: 'Is een noodcommunicatie-kanaal beschikbaar bij uitval van primaire systemen (alternatieve mailbox, telefoonlijst, secure messaging)?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 20 — Bestuursaansprakelijkheid en training
  // ═════════════════════════════════════════════════════════════
  'N.20': {
    name: 'Bestuursaansprakelijkheid en training',
    questions: [
      { dim: 'eigenaarschap', q: 'Heeft de directie de NIS2 Art. 21-maatregelen formeel goedgekeurd via een gedocumenteerd directiebesluit (datum, scope, budget)?' },
      { dim: 'proces', q: 'Hebben alle bestuursleden aantoonbaar een cybersecurity-training gevolgd (certificaat of getekende kennisverklaring)?' },
      { dim: 'proces', q: 'Wordt cybersecurity periodiek behandeld op directieniveau (notulen, vast agendapunt of separate review)?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // Art. 23 — Meldingsplicht
  // ═════════════════════════════════════════════════════════════
  'N.23': {
    name: 'Meldingsplicht bij significante incidenten',
    questions: [
      { dim: 'proces', q: 'Is een meldingsproces ingericht voor de 24-uurs vroege waarschuwing naar de bevoegde toezichthouder?' },
      { dim: 'beleid', q: 'Zijn templates beschikbaar voor het 72-uurs meldingsrapport en 1-maand eindrapport?' },
      { dim: 'effectiviteit', q: 'Is het meldingsproces minimaal jaarlijks getest via een tabletop-oefening of incident-simulatie?' },
    ]
  },

};

// ═════════════════════════════════════════════════════════════════
// PUBLIC API — zelfde signature als getGapQuestionsForControl
// ═════════════════════════════════════════════════════════════════

function getNis2QuestionsForMaatregel(maatregelId, maatregelName) {
  const explicit = nis2Questions[maatregelId];
  if (explicit && Array.isArray(explicit.questions) && explicit.questions.length > 0) {
    return explicit.questions.map(qq => ({ q: qq.q, type: qq.dim, source: 'nis2', framework: 'NIS2' }));
  }
  // Fallback voor onverwachte ID
  return [
    { q: `Is ${maatregelName || maatregelId} formeel gedocumenteerd?`, type: 'beleid', source: 'nis2-fallback', framework: 'NIS2' },
    { q: `Wordt ${maatregelName || maatregelId} actief toegepast?`, type: 'proces', source: 'nis2-fallback', framework: 'NIS2' }
  ];
}

function nis2MaatregelList() {
  return Object.entries(nis2Questions).map(([id, m]) => ({ id, name: m.name }));
}

if (typeof window !== 'undefined') {
  window.nis2Questions = nis2Questions;
  window.getNis2QuestionsForMaatregel = getNis2QuestionsForMaatregel;
  window.nis2MaatregelList = nis2MaatregelList;
}
