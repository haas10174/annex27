-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Security Features: Auto-deletion, Secure Messaging,
-- Right-to-be-Forgotten
-- ═══════════════════════════════════════════════════════════════
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. SECURE MESSAGES TABEL ────────────────────────────────
-- Bidirectionele messaging tussen klant en Lead Auditor
-- Binnen het portaal, met optionele file attachments

CREATE TABLE IF NOT EXISTS messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id uuid NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_role text NOT NULL CHECK (sender_role IN ('client', 'auditor')),
  subject text,
  body text NOT NULL,
  attachment_path text,
  attachment_name text,
  attachment_size_bytes bigint,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS messages_thread_idx ON messages(thread_id, created_at);
CREATE INDEX IF NOT EXISTS messages_user_idx ON messages(user_id, created_at DESC);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users kunnen eigen thread lezen (per-project silo)
CREATE POLICY "Users can read own messages"
  ON messages FOR SELECT USING (auth.uid() = user_id);

-- Users kunnen alleen als 'client' posten in eigen thread
CREATE POLICY "Users can send messages in own thread"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = user_id AND sender_role = 'client');

-- Users kunnen eigen berichten markeren als gelezen
CREATE POLICY "Users can mark own messages read"
  ON messages FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ─── 2. TRAJECT/PROJECT ISOLATIE ─────────────────────────────
-- Elke user krijgt eigen workspace, alleen zichtbaar voor henzelf
-- (impliciet door RLS op alle tabellen, geen aparte tabel nodig)

-- Assessment_status tabel voor trajectlifecycle
CREATE TABLE IF NOT EXISTS assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  pakket text NOT NULL,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'deletion_scheduled', 'deleted')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  deletion_scheduled_for timestamptz,
  deleted_at timestamptz
);

ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own assessment"
  ON assessments FOR SELECT USING (auth.uid() = user_id);

-- Alleen service_role kan schrijven (via webhook of cron)

-- ─── 3. AUTO-DELETION CRON ───────────────────────────────────
-- pg_cron schedule: elke dag om 02:00 UTC oude data wissen
-- Vereist: pg_cron extensie geactiveerd in Supabase (beschikbaar op alle tiers)

CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Cleanup function: wist klantdata 90 dagen na voltooiing traject
CREATE OR REPLACE FUNCTION cleanup_expired_assessments()
RETURNS TABLE(deleted_user_id uuid) AS $$
DECLARE
  v_user_id uuid;
BEGIN
  -- Vind assessments die >90 dagen geleden voltooid zijn
  FOR v_user_id IN
    SELECT a.user_id
    FROM assessments a
    WHERE a.status = 'completed'
      AND a.completed_at < (now() - interval '90 days')
      AND a.deleted_at IS NULL
  LOOP
    -- Wis gap-analyse antwoorden
    DELETE FROM gap_analyse WHERE user_id = v_user_id;

    -- Wis checklist progress
    DELETE FROM checklist_progress WHERE user_id = v_user_id;

    -- Wis messages
    DELETE FROM messages WHERE user_id = v_user_id;

    -- Wis document access logs (> 90 dagen oud)
    DELETE FROM document_access_log WHERE user_id = v_user_id;

    -- Markeer assessment als verwijderd (bewaren voor audit trail)
    UPDATE assessments
      SET deleted_at = now(), status = 'deleted'
      WHERE user_id = v_user_id;

    -- Return voor logging
    deleted_user_id := v_user_id;
    RETURN NEXT;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule: dagelijks om 02:00 UTC
SELECT cron.schedule(
  'annex27-auto-delete-assessments',
  '0 2 * * *',
  $$SELECT cleanup_expired_assessments();$$
);

-- ─── 4. RIGHT TO BE FORGOTTEN ─────────────────────────────────
-- Function die een user kan aanroepen om ALLE data direct te wissen
-- Client-side: user klikt "Verwijder mijn data" → call RPC

CREATE OR REPLACE FUNCTION request_data_deletion()
RETURNS TABLE(status text, message text) AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN QUERY SELECT 'error'::text, 'Niet ingelogd'::text;
    RETURN;
  END IF;

  -- Wis alle data van deze user
  DELETE FROM gap_analyse WHERE user_id = v_user_id;
  DELETE FROM checklist_progress WHERE user_id = v_user_id;
  DELETE FROM messages WHERE user_id = v_user_id;
  DELETE FROM document_access_log WHERE user_id = v_user_id;

  -- Markeer assessment als verwijderd
  UPDATE assessments
    SET deleted_at = now(), status = 'deleted'
    WHERE user_id = v_user_id;

  -- Note: storage objects moeten via Edge Function worden verwijderd
  -- (SQL heeft geen directe access tot storage)

  RETURN QUERY SELECT 'success'::text, 'Uw data is gewist. U wordt uitgelogd.'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Policy: alleen ingelogde user kan deze functie aanroepen voor eigen data
REVOKE ALL ON FUNCTION request_data_deletion() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION request_data_deletion() TO authenticated;

-- ─── 5. EVIDENCE UPLOADS BUCKET ──────────────────────────────
-- Voor klant-geüploade evidence + message attachments
-- LET OP: Bucket aanmaken via Supabase Dashboard, niet via SQL

-- Stappen (manually):
-- 1. Dashboard → Storage → New bucket
-- 2. Naam: evidence (bestaat al)
-- 3. Public: UIT
-- 4. File size: 50 MB
-- 5. MIME types: pdf, docx, xlsx, png, jpg

-- Storage RLS policy: users alleen eigen uploads
-- (Al bestaande policies van supabase-policies-setup.sql dekken dit)

-- ─── 6. VERIFICATIE ──────────────────────────────────────────
SELECT
  'messages' AS tabel,
  (SELECT count(*) FROM pg_tables WHERE tablename = 'messages' AND rowsecurity = true) AS rls_enabled
UNION ALL
SELECT
  'assessments' AS tabel,
  (SELECT count(*) FROM pg_tables WHERE tablename = 'assessments' AND rowsecurity = true) AS rls_enabled
UNION ALL
SELECT
  'pg_cron scheduled' AS tabel,
  (SELECT count(*)::bigint FROM cron.job WHERE jobname = 'annex27-auto-delete-assessments') AS rls_enabled;
