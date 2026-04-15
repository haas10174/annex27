-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Supabase Row Level Security (RLS) Setup
-- ═══════════════════════════════════════════════════════════════
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/sql
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. RLS INSCHAKELEN OP ALLE TABELLEN ──────────────────────

ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE gap_analyse ENABLE ROW LEVEL SECURITY;

-- ─── 2. POLICIES VOOR checklist_progress ──────────────────────
-- Users kunnen alleen hun eigen checklist data lezen

CREATE POLICY "Users can read own checklist progress"
  ON checklist_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users kunnen alleen hun eigen checklist data aanmaken/updaten

CREATE POLICY "Users can insert own checklist progress"
  ON checklist_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own checklist progress"
  ON checklist_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users kunnen alleen hun eigen data verwijderen

CREATE POLICY "Users can delete own checklist progress"
  ON checklist_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- ─── 3. POLICIES VOOR gap_analyse ─────────────────────────────
-- Users kunnen alleen hun eigen gap-analyse data lezen

CREATE POLICY "Users can read own gap analyse"
  ON gap_analyse
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own gap analyse"
  ON gap_analyse
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own gap analyse"
  ON gap_analyse
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own gap analyse"
  ON gap_analyse
  FOR DELETE
  USING (auth.uid() = user_id);

-- ─── 4. STORAGE POLICIES VOOR evidence BUCKET ────────────────
-- Users kunnen alleen uploaden naar hun eigen map (user_id prefix)

CREATE POLICY "Users can upload own evidence"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read own evidence"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own evidence"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own evidence"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'evidence'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

-- ─── 5. VERIFICATIE ───────────────────────────────────────────
-- Check of RLS is ingeschakeld (moet TRUE zijn voor beide tabellen)

SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename IN ('checklist_progress', 'gap_analyse');
