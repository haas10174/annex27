-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Secure Document Storage Setup
-- ═══════════════════════════════════════════════════════════════
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. STORAGE BUCKET AANMAKEN ──────────────────────────────
-- LET OP: Dit moet via Supabase Dashboard > Storage, NIET via SQL!
--
-- Stappen:
-- 1. Ga naar: https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/storage/buckets
-- 2. Klik "New bucket"
-- 3. Naam: policies
-- 4. Public: UIT (private bucket!)
-- 5. File size limit: 50 MB (of naar wens)
-- 6. Allowed MIME types: application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
-- 7. Klik "Create"

-- ─── 2. RLS POLICIES VOOR POLICIES BUCKET ────────────────────
-- Geen directe toegang voor users — alleen service_role (via Edge Function)
-- kan bij de bestanden. Dus GEEN policies nodig die SELECT toestaan voor users.

-- Alleen service_role kan uploaden (via dashboard of CLI)
-- Niemand anders heeft toegang, alleen via signed URLs uit Edge Function

-- Deze policy blokkeert expliciet alle user-level toegang tot de bucket:
-- (Is al standaard als bucket private is, maar voor de zekerheid)

-- NO policies for INSERT/SELECT/UPDATE/DELETE on policies bucket objects
-- Dit zorgt ervoor dat ALLEEN service_role kan werken met deze bestanden

-- ─── 3. DOCUMENT ACCESS LOG TABEL ────────────────────────────
-- Voor audit trail — zien wie welk document heeft gedownload

CREATE TABLE IF NOT EXISTS document_access_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  file text NOT NULL,
  pakket text,
  accessed_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS docaccess_user_idx ON document_access_log(user_id);
CREATE INDEX IF NOT EXISTS docaccess_file_idx ON document_access_log(file);
CREATE INDEX IF NOT EXISTS docaccess_date_idx ON document_access_log(accessed_at DESC);

ALTER TABLE document_access_log ENABLE ROW LEVEL SECURITY;

-- Users kunnen alleen eigen access log zien
CREATE POLICY "Users can read own access log"
  ON document_access_log FOR SELECT
  USING (auth.uid() = user_id);

-- Geen INSERT policy voor users — alleen service_role (via Edge Function)
-- logt downloads

-- ─── 4. VERIFICATIE ──────────────────────────────────────────
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'document_access_log';
