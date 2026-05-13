// ═════════════════════════════════════════════════════════════════
// Dual scoring v1 — zelfevaluatie + audit-readiness
// ═════════════════════════════════════════════════════════════════
//
// Doel: in plaats van één score (huidige "compliance over scope"-getal),
// twee scores tonen:
//
//   1. ZELFEVALUATIE = wat de klant claimt (huidige score, gebaseerd op
//      gapAnswers['ctrlId_qi'] = 4/3/2/0/'nvt')
//
//   2. AUDIT-READINESS = wat een Lead Auditor zou geven op basis van
//      het AANGELEVERDE BEWIJS:
//        audit_readiness = zelf_score × evidence_factor
//      waar evidence_factor = optelling van drie ingrediënten per control:
//        a) bestand geüpload  → +0.4
//        b) toelichting ≥ 50 woorden → +0.3
//        c) alle meta-velden ingevuld (procedure, location, owner, last_verified) → +0.3
//      Max evidence_factor = 1.0
//
// LATER (v2) wordt deze factor uitgebreid met een relevance_score 0-1
// van de Mistral-edge-function 'evaluate-evidence', waardoor irrelevant
// bewijs (foto van lunchmenu voor A.5.1) niet meetelt.
//
// Integratie:
//   - Inladen na gap-questions-v2.js en vóór dashboard.html-code
//   - Exposed op window: window.A27Scoring = { ...methods... }
//   - Gebruik in dashboard renderDashboard() en gap-analyse view
//
// Geen breaking changes: bestaande scoring werkt onveranderd door.
// Dual scoring is een UITBREIDING die naast de huidige score wordt getoond.
//
// ─────────────────────────────────────────────────────────────────

(function (window) {
  'use strict';

  // ── HELPERS ────────────────────────────────────────────────────

  function countWords(str) {
    if (!str || typeof str !== 'string') return 0;
    return str.trim().split(/\s+/).filter(Boolean).length;
  }

  function hasFiles(evidenceForCtrl) {
    return !!(evidenceForCtrl && Array.isArray(evidenceForCtrl.files) && evidenceForCtrl.files.length > 0);
  }

  function metaFieldsComplete(evidenceForCtrl) {
    if (!evidenceForCtrl || !evidenceForCtrl.note_fields) return false;
    const nf = evidenceForCtrl.note_fields;
    const required = ['procedure', 'location', 'owner', 'last_verified'];
    return required.every(k => nf[k] && String(nf[k]).trim().length >= 2);
  }

  function toelichtingPassesMinimum(evidenceForCtrl) {
    if (!evidenceForCtrl) return false;
    // We accepteren toelichting in note (raw) OF in note_fields.remark
    const total = String(evidenceForCtrl.note || '') + ' ' + String((evidenceForCtrl.note_fields || {}).remark || '');
    return countWords(total) >= 50;
  }

  // ── EVIDENCE FACTOR ────────────────────────────────────────────

  /**
   * Bereken de evidence-completeness-factor per control.
   * Schaal 0.0 - 1.0. Bestand + toelichting + meta = volledig.
   *
   * @param {string} ctrlId           - control-id (bv. 'A.5.1' of 'C.4.1')
   * @param {object} evidenceData     - globale evidenceData-object (per ctrlId)
   * @returns {object} { factor, components, missing }
   */
  function calculateEvidenceFactor(ctrlId, evidenceData) {
    const ev = (evidenceData || {})[ctrlId];
    const components = {
      file: hasFiles(ev) ? 0.4 : 0,
      toelichting: toelichtingPassesMinimum(ev) ? 0.3 : 0,
      meta: metaFieldsComplete(ev) ? 0.3 : 0,
    };
    const factor = +(components.file + components.toelichting + components.meta).toFixed(2);
    const missing = [];
    if (!components.file) missing.push('bestand');
    if (!components.toelichting) missing.push('toelichting (≥50 woorden)');
    if (!components.meta) missing.push('meta-velden (procedure/locatie/eigenaar/datum)');
    return { factor, components, missing };
  }

  // ── SELF SCORE PER CONTROL ─────────────────────────────────────

  /**
   * Som van vraag-scores / max-mogelijk * 100.
   * Onbeantwoorde vragen tellen mee als 0 (in lijn met huidige engine).
   *
   * @param {string} ctrlId
   * @param {object} gapQuestions    - { ctrlId: [{q,type},...] }
   * @param {object} gapAnswers      - { 'ctrlId_qi': '4'|'3'|'2'|'0'|'nvt' }
   * @returns {object} { selfPct, totalScore, maxScore, answered, total }
   */
  function calculateSelfScore(ctrlId, gapQuestions, gapAnswers) {
    const qs = (gapQuestions || {})[ctrlId] || [];
    let totalScore = 0;
    let maxScore = 0;
    let answered = 0;
    qs.forEach((_, qi) => {
      const val = (gapAnswers || {})[ctrlId + '_' + qi];
      maxScore += 4;
      if (val !== undefined && val !== 'nvt') {
        totalScore += parseInt(val, 10) || 0;
        answered++;
      }
    });
    const selfPct = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
    return { selfPct, totalScore, maxScore, answered, total: qs.length };
  }

  // ── AUDIT READINESS PER CONTROL ────────────────────────────────

  /**
   * Audit-readiness = zelf-evaluatie × evidence-factor.
   *
   * @returns {object} {
   *   selfPct,           // 0-100 (wat klant claimt)
   *   evidenceFactor,    // 0-1   (mate waarin bewijs is aangeleverd)
   *   readinessPct,      // 0-100 (selfPct × evidenceFactor)
   *   components,        // { file, toelichting, meta }
   *   missing,           // ['bestand', ...]
   *   selfScore,         // raw points
   *   maxScore           // raw max points
   * }
   */
  function calculateControlReadiness(ctrlId, gapQuestions, gapAnswers, evidenceData) {
    const self = calculateSelfScore(ctrlId, gapQuestions, gapAnswers);
    const ev = calculateEvidenceFactor(ctrlId, evidenceData);
    return {
      selfPct: self.selfPct,
      selfScore: self.totalScore,
      maxScore: self.maxScore,
      evidenceFactor: ev.factor,
      readinessPct: Math.round(self.selfPct * ev.factor),
      components: ev.components,
      missing: ev.missing,
      answered: self.answered,
      total: self.total,
    };
  }

  // ── DASHBOARD-LEVEL TOTALS ─────────────────────────────────────

  /**
   * Som van alle controls naar één algemene zelf-score + één algemene audit-readiness.
   *
   * @param {string[]} controlIds    - alle controls in scope
   * @param {object} gapQuestions
   * @param {object} gapAnswers
   * @param {object} evidenceData
   * @returns {object} { selfPct, readinessPct, totals }
   */
  function calculateDashboardTotals(controlIds, gapQuestions, gapAnswers, evidenceData) {
    let selfPointsSum = 0;
    let maxPointsSum = 0;
    let readinessPointsSum = 0;
    let perCtrl = {};

    (controlIds || []).forEach(ctrlId => {
      const r = calculateControlReadiness(ctrlId, gapQuestions, gapAnswers, evidenceData);
      perCtrl[ctrlId] = r;
      selfPointsSum += r.selfScore;
      maxPointsSum += r.maxScore;
      // Voor readiness gewogen we ook gewogen naar maxScore:
      // readinessPoints = selfScore × evidenceFactor
      readinessPointsSum += r.selfScore * r.evidenceFactor;
    });

    const selfPct = maxPointsSum > 0 ? Math.round((selfPointsSum / maxPointsSum) * 100) : 0;
    const readinessPct = maxPointsSum > 0 ? Math.round((readinessPointsSum / maxPointsSum) * 100) : 0;

    return { selfPct, readinessPct, totals: { selfPointsSum, readinessPointsSum, maxPointsSum }, perCtrl };
  }

  // ── UI HELPERS (optioneel — verstrekt klare HTML-strings) ──────

  /**
   * Genereer een tooltip-tekst die aan klant uitlegt waarom audit-readiness lager is dan zelf-evaluatie.
   * Gebruik in dashboard ring of cat-bars.
   */
  function readinessExplanation(controlResult) {
    const r = controlResult;
    if (!r) return '';
    if (r.readinessPct >= r.selfPct) {
      return 'Audit-readiness gelijk aan zelfevaluatie - bewijs sluit goed aan.';
    }
    const missing = (r.missing || []).join(', ');
    return `Zelfevaluatie: ${r.selfPct}% — Audit-readiness: ${r.readinessPct}%.` +
           (missing ? ` Ontbreekt: ${missing}.` : '');
  }

  /**
   * Cluster van twee getallen voor dashboard-ring/cat-bar/etc.
   * Genereer twee waarden voor inline-display.
   */
  function dualScoreDisplay(selfPct, readinessPct) {
    return {
      primary: { label: 'Zelfevaluatie', value: selfPct + '%' },
      secondary: { label: 'Audit-readiness', value: readinessPct + '%' },
      diff: selfPct - readinessPct, // positief = overclaim, 0 = match, negatief = onmogelijk
    };
  }

  // ── PUBLIC API ─────────────────────────────────────────────────

  window.A27Scoring = {
    calculateEvidenceFactor,
    calculateSelfScore,
    calculateControlReadiness,
    calculateDashboardTotals,
    readinessExplanation,
    dualScoreDisplay,
    // Constants
    EVIDENCE_WEIGHTS: { file: 0.4, toelichting: 0.3, meta: 0.3 },
    TOELICHTING_MIN_WORDS: 50,
    META_FIELDS_REQUIRED: ['procedure', 'location', 'owner', 'last_verified'],
  };

})(typeof window !== 'undefined' ? window : globalThis);
