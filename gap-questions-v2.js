// ═════════════════════════════════════════════════════════════════
// GAP QUESTIONS LIBRARY v2 — control-specifiek, multi-dimensie
// ═════════════════════════════════════════════════════════════════
//
// V1-probleem: alle 93 controls kregen 2 generieke vragen (doc + impl).
// V2-aanpak: 4-6 control-specifieke vragen per dimensie, afgestemd op
// wat een DNV Lead Auditor concreet zou vragen tijdens een audit.
//
// 5 dimensies (op CMMI-schaal 0-4):
//   - beleid:        is er een vastgesteld document/regel?
//   - proces:        is er een werkende workflow?
//   - techniek:      is het technisch afgedwongen of gemonitord?
//   - eigenaarschap: is iemand verantwoordelijk + bevoegd?
//   - effectiviteit: wordt gemeten of het werkt?
//
// Niet elke control heeft alle 5 dimensies — alleen die relevant zijn.
//
// Status: PILOT — 8 van 93 controls volledig uitgewerkt.
// Voor niet-uitgewerkte controls valt de UI terug op v1 (legacy 2 vragen).

const gapQuestionsV2 = {

  // ═════════════════════════════════════════════════════════════
  // A.5 ORGANISATORISCHE CONTROLS
  // ═════════════════════════════════════════════════════════════

  'A.5.1': {
    name: 'Informatiebeveiligingsbeleid',
    questions: [
      { dim: 'beleid', q: 'Is er een vastgesteld informatiebeveiligingsbeleid (PDF/intranetpagina) met scope, doelstellingen en commitment?' },
      { dim: 'eigenaarschap', q: 'Is het beleid formeel ondertekend door de directie of een statutair bestuurder met datum?' },
      { dim: 'proces', q: 'Is het beleid actief gecommuniceerd naar alle medewerkers (onboarding, intranet, jaarlijkse herinnering)?' },
      { dim: 'effectiviteit', q: 'Wordt het beleid minimaal jaarlijks gereviewed en bij wijzigingen herzien (zichtbaar via versiehistorie of review-log)?' },
      { dim: 'effectiviteit', q: 'Worden afwijkingen van het beleid gedetecteerd, gemeld en geregistreerd (compliance-monitoring)?' },
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

  'A.5.15': {
    name: 'Toegangsbeleid',
    questions: [
      { dim: 'beleid', q: 'Is er een toegangsbeleid dat need-to-know en least-privilege als principes vastlegt?' },
      { dim: 'proces', q: 'Is er een formele aanvraag- en goedkeuringsworkflow voor nieuwe toegangsrechten (geen ad-hoc toekenning)?' },
      { dim: 'proces', q: 'Worden toegangsrechten minimaal halfjaarlijks gereviewed (access review) door manager of asset-eigenaar?' },
      { dim: 'techniek', q: 'Wordt least-privilege technisch afgedwongen via groep-gebaseerde rechten of conditional access (geen "everyone-Admin"-shortcuts)?' },
      { dim: 'eigenaarschap', q: 'Is er per kritiek systeem een access-owner aangewezen die rechten goedkeurt?' },
      { dim: 'effectiviteit', q: 'Wordt het aantal "stale accounts" (>90 dagen inactief) gemeten en opgelost?' },
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

  // ═════════════════════════════════════════════════════════════
  // A.6 PERSONEELS-CONTROLS
  // ═════════════════════════════════════════════════════════════

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

  // ═════════════════════════════════════════════════════════════
  // A.8 TECHNOLOGISCHE CONTROLS
  // ═════════════════════════════════════════════════════════════

  'A.8.5': {
    name: 'Veilige authenticatie',
    questions: [
      { dim: 'beleid', q: 'Is er een wachtwoordbeleid met eisen aan lengte (≥12), complexiteit en hergebruik?' },
      { dim: 'techniek', q: 'Is multifactorauthenticatie verplicht voor alle accounts met toegang tot bedrijfsdata (incl. SaaS, e-mail, VPN)?' },
      { dim: 'techniek', q: 'Is MFA óók verplicht voor privileged/admin-accounts (geen ontheffingen)?' },
      { dim: 'techniek', q: 'Worden wachtwoorden technisch afgedwongen op systeemniveau (geen "vrijwillige" wachtwoordlengte)?' },
      { dim: 'proces', q: 'Wordt aanbevolen of verplicht een wachtwoordmanager (Bitwarden, 1Password, KeePass) te gebruiken?' },
      { dim: 'effectiviteit', q: 'Wordt MFA-coverage gemeten (% accounts met MFA) en op 100% gebracht?' },
    ]
  },

  'A.8.13': {
    name: 'Informatie back-up',
    questions: [
      { dim: 'beleid', q: 'Is er een backup-beleid met retentie-eisen, frequentie per data-type en eigenaar?' },
      { dim: 'techniek', q: 'Worden backups versleuteld bewaard (at-rest encryption op backup-target)?' },
      { dim: 'techniek', q: 'Voldoet de backup-strategie aan 3-2-1 (3 kopieën, 2 media, 1 offsite/immutable)?' },
      { dim: 'proces', q: 'Wordt minimaal jaarlijks een restore-test uitgevoerd en gedocumenteerd (geen "we vertrouwen erop dat het werkt")?' },
      { dim: 'techniek', q: 'Zijn backups beschermd tegen ransomware (immutable storage, air-gap, write-once)?' },
      { dim: 'effectiviteit', q: 'Wordt RPO (Recovery Point Objective) per kritiek systeem gemeten en gehaald?' },
    ]
  },

  'A.8.24': {
    name: 'Gebruik van cryptografie',
    questions: [
      { dim: 'beleid', q: 'Is er een cryptografiebeleid met goedgekeurde algoritmen (AES-256, RSA-2048+, etc.) en verboden zwakke algoritmen?' },
      { dim: 'techniek', q: 'Wordt at-rest encryptie afgedwongen op alle data-stores met persoonsgegevens of bedrijfskritieke data?' },
      { dim: 'techniek', q: 'Wordt in-transit encryptie afgedwongen via TLS 1.2+ op alle externe communicatie (geen TLS 1.0/1.1, geen plain HTTP)?' },
      { dim: 'proces', q: 'Is er een sleutelbeheer-procedure (generatie, rotatie, intrekking, escrow) met bekende verantwoordelijke?' },
      { dim: 'eigenaarschap', q: 'Is er een proces voor certificate lifecycle (renewal vóór expiry, monitoring expiring certs)?' },
      { dim: 'effectiviteit', q: 'Worden cryptografische zwakheden (zwakke ciphers, expired certs) actief gescand en opgelost?' },
    ]
  },

  // ═════════════════════════════════════════════════════════════
  // FALLBACK voor niet-uitgewerkte controls — zelfde 2 generieke
  // vragen als v1 totdat ze uitgewerkt zijn. Triggert v2-formaat
  // zodat de UI consistent blijft.
  // ═════════════════════════════════════════════════════════════
  // Voorbeeld voor controls die nog op v1 staan:
  // 'A.5.2': null (gebruik fallback)
};

// Helper: vraag-set ophalen, met fallback naar v1 voor niet-uitgewerkte controls
function getGapQuestionsForControl(controlId, controlName) {
  const v2 = gapQuestionsV2[controlId];
  if (v2 && Array.isArray(v2.questions) && v2.questions.length > 0) {
    return v2.questions.map((qq, idx) => ({
      q: qq.q,
      type: qq.dim,
      v2: true
    }));
  }
  // Fallback v1 — generieke 2 vragen
  const lower = (controlName || '').toLowerCase();
  return [
    { q: `Is ${lower} formeel gedocumenteerd en goedgekeurd?`, type: 'beleid', v2: false },
    { q: `Wordt ${lower} actief toegepast en periodiek geëvalueerd?`, type: 'proces', v2: false }
  ];
}

// Lijst van controls die in v2 zijn uitgewerkt — voor dashboard-progress-indicator
function v2CoverageList() {
  return Object.keys(gapQuestionsV2).filter(k => gapQuestionsV2[k] !== null);
}

// Globaal beschikbaar maken (geen import-systeem in dashboard.html)
if (typeof window !== 'undefined') {
  window.gapQuestionsV2 = gapQuestionsV2;
  window.getGapQuestionsForControl = getGapQuestionsForControl;
  window.v2CoverageList = v2CoverageList;
}
