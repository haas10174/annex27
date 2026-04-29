-- Migratie: voeg sector-veld toe aan gap_analyse
-- Doel: per klant onthouden welke sector-specifieke vragenset gebruikt moet worden
-- (zorg = ISO 27001 + NEN 7510-deltas; saas/it/overheid/bouw/overig = alleen ISO 27001).

-- Status: voorgesteld door Claude, toepassen via Supabase MCP of dashboard SQL editor.

ALTER TABLE gap_analyse
  ADD COLUMN IF NOT EXISTS sector text;

-- Validatie van toegestane waardes (matcht sectorProfiles in gap-analyse.html / dashboard.html).
ALTER TABLE gap_analyse
  DROP CONSTRAINT IF EXISTS gap_analyse_sector_check;

ALTER TABLE gap_analyse
  ADD CONSTRAINT gap_analyse_sector_check
    CHECK (sector IS NULL OR sector IN ('saas','it','zorg','overheid','bouw','overig'));

-- Index voor snelle filtering bij admin-overzicht en rapport-templates.
CREATE INDEX IF NOT EXISTS idx_gap_analyse_sector ON gap_analyse (sector);

-- Geen RLS-aanpassing nodig: bestaande policies (user reads own row, admin reads all)
-- werken ongewijzigd op alle kolommen inclusief de nieuwe.

COMMENT ON COLUMN gap_analyse.sector IS
  'Sector-keuze voor vragenset-routing: zorg krijgt ISO 27001 + NEN 7510-deltas; overige sectoren alleen ISO 27001. NULL = nog niet gekozen.';
