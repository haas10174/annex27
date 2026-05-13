-- ════════════════════════════════════════════════════════════════
-- Migration: evidence-tabel uitbreiden met relevance-velden voor Mistral AI
-- ════════════════════════════════════════════════════════════════
-- Datum: 2026-05-13
-- Auteur: Raoul Haas (via Claude Code assistant)
-- Doel: voorbereiden voor automatische relevantie-toets op bewijs-uploads
-- Edge function: evaluate-evidence (Mistral AI EU-hosted)
--
-- Idempotent: gebruikt IF NOT EXISTS zodat hertes geen errors gooit.
-- Reversible: zie ROLLBACK-script onderaan in comment.
--
-- Uitvoering via Supabase SQL Editor of CLI:
--   supabase db push (als migratie-file)
-- of via Studio: SQL Editor > Run.

-- ─── 1. KOLOMMEN TOEVOEGEN ──────────────────────────────────────

ALTER TABLE evidence
  ADD COLUMN IF NOT EXISTS relevance_score numeric(3,2)
    CHECK (relevance_score IS NULL OR (relevance_score >= 0 AND relevance_score <= 1));

ALTER TABLE evidence
  ADD COLUMN IF NOT EXISTS relevance_reasoning text;

ALTER TABLE evidence
  ADD COLUMN IF NOT EXISTS relevance_concerns jsonb;

ALTER TABLE evidence
  ADD COLUMN IF NOT EXISTS relevance_model text;

ALTER TABLE evidence
  ADD COLUMN IF NOT EXISTS relevance_evaluated_at timestamptz;

-- ─── 2. INDEX OP RELEVANCE_SCORE VOOR DASHBOARD-QUERIES ────────

CREATE INDEX IF NOT EXISTS idx_evidence_relevance_score
  ON evidence (relevance_score)
  WHERE relevance_score IS NOT NULL;

-- ─── 3. KOMMENTAREN VOOR DOCUMENTATIE ──────────────────────────

COMMENT ON COLUMN evidence.relevance_score IS
  'Mistral AI relevance-classificatie: 0.0 = niet relevant, 1.0 = duidelijk relevant. NULL = nog niet beoordeeld.';

COMMENT ON COLUMN evidence.relevance_reasoning IS
  'Korte motivering (max 500 chars) van de relevance_score, in NL. Getoond aan klant en Lead Auditor.';

COMMENT ON COLUMN evidence.relevance_concerns IS
  'JSON-array van specifieke twijfels, max 5 items van max 200 chars elk. Bijv. ["tekst gaat over MFA, niet over A.5.1"].';

COMMENT ON COLUMN evidence.relevance_model IS
  'Mistral model-naam (bv. "mistral-small-latest") of "fallback-error" / "fallback-min-length" bij niet-beschikbaarheid.';

COMMENT ON COLUMN evidence.relevance_evaluated_at IS
  'Tijdstip van laatste relevance-toets. NULL = nog niet beoordeeld.';

-- ─── 4. RLS-POLICY: KLANT MAG EIGEN RELEVANCE-VELDEN ZIEN ──────
-- (RLS-policy zal bestaande select-policy moeten herzien zodat klant alleen eigen evidence ziet)
-- Aanname: er is al een RLS-policy "evidence_select_own" die check op user_id = auth.uid().
-- Geen wijziging nodig - klant kan alle kolommen van eigen evidence-rijen lezen.

-- ─── 5. VIEW VOOR AUDIT-READINESS PER KLANT (handig voor admin) ─

CREATE OR REPLACE VIEW vw_klant_audit_readiness AS
SELECT
  user_id,
  control_id,
  count(*)                                                 AS evidence_count,
  count(*) FILTER (WHERE relevance_score >= 0.7)           AS strong_relevance,
  count(*) FILTER (WHERE relevance_score >= 0.4 AND relevance_score < 0.7) AS medium_relevance,
  count(*) FILTER (WHERE relevance_score < 0.4)            AS weak_relevance,
  avg(relevance_score)                                     AS avg_relevance,
  max(relevance_evaluated_at)                              AS last_evaluated
FROM evidence
WHERE relevance_score IS NOT NULL
GROUP BY user_id, control_id;

COMMENT ON VIEW vw_klant_audit_readiness IS
  'Per (klant, control) een snapshot van relevance-distributie. Gebruikt door admin Lead Auditor-overzicht.';

-- ════════════════════════════════════════════════════════════════
-- ROLLBACK (als nodig - uitcommentariëren en uitvoeren):
-- ════════════════════════════════════════════════════════════════
-- DROP VIEW IF EXISTS vw_klant_audit_readiness;
-- DROP INDEX IF EXISTS idx_evidence_relevance_score;
-- ALTER TABLE evidence DROP COLUMN IF EXISTS relevance_evaluated_at;
-- ALTER TABLE evidence DROP COLUMN IF EXISTS relevance_model;
-- ALTER TABLE evidence DROP COLUMN IF EXISTS relevance_concerns;
-- ALTER TABLE evidence DROP COLUMN IF EXISTS relevance_reasoning;
-- ALTER TABLE evidence DROP COLUMN IF EXISTS relevance_score;
