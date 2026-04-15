-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — COMPLETE SUPABASE SETUP (all-in-one)
-- ═══════════════════════════════════════════════════════════════
-- Run dit bestand eenmaal in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/sql
--
-- Bevat alles in de juiste volgorde:
--   1. Basistabellen: checklist_progress, gap_analyse
--   2. Orders tabel (Mollie webhook)
--   3. Document access log
--   4. Rate limiting infrastructuur
--   5. Messages tabel (secure messaging)
--   6. Assessments tabel (lifecycle)
--   7. Auto-deletion cron job (90 dagen retentie)
--   8. Right-to-be-forgotten RPC
--   9. Auditor findings tabel
--  10. Auditor helper functions
--  11. RLS policies op alles
--  12. Storage policies voor evidence bucket
--
-- Dit bestand is IDEMPOTENT: meerdere keren runnen is veilig.
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. BASISTABELLEN ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS checklist_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  control_id text NOT NULL,
  status text NOT NULL DEFAULT 'none',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, control_id)
);

CREATE TABLE IF NOT EXISTS gap_analyse (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  answers jsonb DEFAULT '{}',
  updated_at timestamptz DEFAULT now()
);

-- ─── 2. ORDERS (Mollie) ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  payment_id text UNIQUE NOT NULL,
  plan text NOT NULL,
  amount numeric(10,2) NOT NULL,
  naam text NOT NULL,
  bedrijf text NOT NULL,
  email text NOT NULL,
  btw_nummer text,
  status text NOT NULL DEFAULT 'pending',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  paid_at timestamptz
);
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- ─── 3. DOCUMENT ACCESS LOG ──────────────────────────────────

CREATE TABLE IF NOT EXISTS document_access_log (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  file text NOT NULL,
  pakket text,
  accessed_at timestamptz DEFAULT now()
);
CREATE INDEX IF NOT EXISTS docaccess_user_idx ON document_access_log(user_id);
CREATE INDEX IF NOT EXISTS docaccess_date_idx ON document_access_log(accessed_at DESC);

-- ─── 4. RATE LIMITS ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rate_limits (
  id bigserial PRIMARY KEY,
  identifier text NOT NULL,
  endpoint text NOT NULL,
  window_start timestamptz NOT NULL DEFAULT now(),
  request_count int NOT NULL DEFAULT 1,
  UNIQUE(identifier, endpoint, window_start)
);
CREATE INDEX IF NOT EXISTS rate_limits_lookup_idx
  ON rate_limits(identifier, endpoint, window_start DESC);

CREATE OR REPLACE FUNCTION cleanup_rate_limits() RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier text,
  p_endpoint text,
  p_max_requests int DEFAULT 10
) RETURNS boolean AS $$
DECLARE
  current_count int;
  current_window timestamptz;
BEGIN
  current_window := date_trunc('minute', now());
  INSERT INTO rate_limits (identifier, endpoint, window_start, request_count)
  VALUES (p_identifier, p_endpoint, current_window, 1)
  ON CONFLICT (identifier, endpoint, window_start)
  DO UPDATE SET request_count = rate_limits.request_count + 1
  RETURNING request_count INTO current_count;
  IF random() < 0.1 THEN PERFORM cleanup_rate_limits(); END IF;
  RETURN current_count <= p_max_requests;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ─── 5. MESSAGES (secure client ↔ auditor messaging) ─────────

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

-- ─── 6. ASSESSMENTS (lifecycle per user) ─────────────────────

CREATE TABLE IF NOT EXISTS assessments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  pakket text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  status_detail text DEFAULT 'in_progress'
    CHECK (status_detail IN ('in_progress', 'review_requested', 'in_review', 'reviewed', 'deleted')),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  review_requested_at timestamptz,
  review_completed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id),
  deletion_scheduled_for timestamptz,
  deleted_at timestamptz
);

-- Migratie als tabel al bestaat maar kolommen missen
ALTER TABLE assessments
  ADD COLUMN IF NOT EXISTS review_requested_at timestamptz,
  ADD COLUMN IF NOT EXISTS review_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS status_detail text DEFAULT 'in_progress';

-- ─── 7. AUDITOR FINDINGS ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS auditor_findings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  control_id text NOT NULL,
  severity text NOT NULL DEFAULT 'info'
    CHECK (severity IN ('info', 'minor', 'major', 'critical')),
  finding text,
  recommendation text,
  reviewed_evidence boolean DEFAULT false,
  auditor_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, control_id)
);
CREATE INDEX IF NOT EXISTS auditor_findings_user_idx ON auditor_findings(user_id, control_id);

-- ─── 8. RLS INSCHAKELEN OP ALLES ─────────────────────────────

ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE gap_analyse ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_access_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE auditor_findings ENABLE ROW LEVEL SECURITY;

-- ─── 9. POLICIES (drop & recreate voor idempotentie) ─────────

-- checklist_progress
DROP POLICY IF EXISTS "Users can read own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can insert own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can update own checklist progress" ON checklist_progress;
DROP POLICY IF EXISTS "Users can delete own checklist progress" ON checklist_progress;
CREATE POLICY "Users can read own checklist progress" ON checklist_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own checklist progress" ON checklist_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own checklist progress" ON checklist_progress FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own checklist progress" ON checklist_progress FOR DELETE USING (auth.uid() = user_id);

-- gap_analyse
DROP POLICY IF EXISTS "Users can read own gap analyse" ON gap_analyse;
DROP POLICY IF EXISTS "Users can insert own gap analyse" ON gap_analyse;
DROP POLICY IF EXISTS "Users can update own gap analyse" ON gap_analyse;
DROP POLICY IF EXISTS "Users can delete own gap analyse" ON gap_analyse;
CREATE POLICY "Users can read own gap analyse" ON gap_analyse FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own gap analyse" ON gap_analyse FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own gap analyse" ON gap_analyse FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own gap analyse" ON gap_analyse FOR DELETE USING (auth.uid() = user_id);

-- orders
DROP POLICY IF EXISTS "Users can read own orders" ON orders;
CREATE POLICY "Users can read own orders" ON orders FOR SELECT USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- document_access_log
DROP POLICY IF EXISTS "Users can read own access log" ON document_access_log;
CREATE POLICY "Users can read own access log" ON document_access_log FOR SELECT USING (auth.uid() = user_id);

-- messages
DROP POLICY IF EXISTS "Users can read own messages" ON messages;
DROP POLICY IF EXISTS "Users can send messages in own thread" ON messages;
DROP POLICY IF EXISTS "Users can mark own messages read" ON messages;
CREATE POLICY "Users can read own messages" ON messages FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can send messages in own thread" ON messages FOR INSERT WITH CHECK (auth.uid() = user_id AND sender_role = 'client');
CREATE POLICY "Users can mark own messages read" ON messages FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- assessments
DROP POLICY IF EXISTS "Users can read own assessment" ON assessments;
CREATE POLICY "Users can read own assessment" ON assessments FOR SELECT USING (auth.uid() = user_id);

-- auditor_findings
DROP POLICY IF EXISTS "Users can read own findings" ON auditor_findings;
DROP POLICY IF EXISTS "Auditors can write findings" ON auditor_findings;
CREATE POLICY "Users can read own findings" ON auditor_findings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Auditors can write findings" ON auditor_findings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND (raw_app_meta_data->>'role' = 'auditor' OR raw_app_meta_data->>'pakket' = 'admin')
    )
  );

-- ─── 10. STORAGE POLICIES (evidence bucket) ──────────────────
-- Let op: bucket 'evidence' moet handmatig aangemaakt zijn via Dashboard

DROP POLICY IF EXISTS "Users can upload own evidence" ON storage.objects;
DROP POLICY IF EXISTS "Users can read own evidence" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own evidence" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own evidence" ON storage.objects;
CREATE POLICY "Users can upload own evidence" ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can read own evidence" ON storage.objects FOR SELECT
  USING (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can update own evidence" ON storage.objects FOR UPDATE
  USING (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Users can delete own evidence" ON storage.objects FOR DELETE
  USING (bucket_id = 'evidence' AND (storage.foldername(name))[1] = auth.uid()::text);

-- ─── 11. AUTO-DELETION (90 dagen retentie) ───────────────────

CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE OR REPLACE FUNCTION cleanup_expired_assessments()
RETURNS TABLE(deleted_user_id uuid) AS $$
DECLARE
  v_user_id uuid;
BEGIN
  FOR v_user_id IN
    SELECT a.user_id FROM assessments a
    WHERE a.status = 'completed'
      AND a.completed_at < (now() - interval '90 days')
      AND a.deleted_at IS NULL
  LOOP
    DELETE FROM gap_analyse WHERE user_id = v_user_id;
    DELETE FROM checklist_progress WHERE user_id = v_user_id;
    DELETE FROM messages WHERE user_id = v_user_id;
    DELETE FROM document_access_log WHERE user_id = v_user_id;
    UPDATE assessments SET deleted_at = now(), status = 'deleted' WHERE user_id = v_user_id;
    deleted_user_id := v_user_id;
    RETURN NEXT;
  END LOOP;
  RETURN;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Schedule cron alleen als hij nog niet bestaat
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'annex27-auto-delete-assessments') THEN
    PERFORM cron.schedule('annex27-auto-delete-assessments', '0 2 * * *', 'SELECT cleanup_expired_assessments();');
  END IF;
END $$;

-- ─── 12. RIGHT TO BE FORGOTTEN ───────────────────────────────

CREATE OR REPLACE FUNCTION request_data_deletion()
RETURNS TABLE(status text, message text) AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN QUERY SELECT 'error'::text, 'Niet ingelogd'::text;
    RETURN;
  END IF;
  DELETE FROM gap_analyse WHERE user_id = v_user_id;
  DELETE FROM checklist_progress WHERE user_id = v_user_id;
  DELETE FROM messages WHERE user_id = v_user_id;
  DELETE FROM document_access_log WHERE user_id = v_user_id;
  UPDATE assessments SET deleted_at = now(), status = 'deleted' WHERE user_id = v_user_id;
  RETURN QUERY SELECT 'success'::text, 'Uw data is gewist.'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION request_data_deletion() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION request_data_deletion() TO authenticated;

-- ─── 13. AUDITOR HELPER FUNCTIONS ────────────────────────────

CREATE OR REPLACE FUNCTION auditor_client_list()
RETURNS TABLE(
  user_id uuid, email text, naam text, bedrijf text, pakket text,
  sector text, status text, review_requested_at timestamptz,
  controls_answered bigint, total_controls bigint,
  unread_messages bigint, last_activity timestamptz
) AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND (raw_app_meta_data->>'role' = 'auditor' OR raw_app_meta_data->>'pakket' = 'admin')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;

  RETURN QUERY
  SELECT
    u.id,
    u.email::text,
    (u.raw_user_meta_data->>'naam')::text,
    (u.raw_user_meta_data->>'bedrijf')::text,
    (u.raw_app_meta_data->>'pakket')::text,
    NULL::text,
    COALESCE(a.status_detail, 'in_progress')::text,
    a.review_requested_at,
    (SELECT count(*) FROM gap_analyse g WHERE g.user_id = u.id)::bigint,
    93::bigint,
    (SELECT count(*) FROM messages m
      WHERE m.user_id = u.id AND m.sender_role = 'client' AND m.is_read = false)::bigint,
    GREATEST(
      COALESCE(a.started_at, u.created_at),
      COALESCE((SELECT max(created_at) FROM messages WHERE user_id = u.id), u.created_at),
      COALESCE((SELECT max(updated_at) FROM gap_analyse WHERE user_id = u.id), u.created_at)
    )
  FROM auth.users u
  LEFT JOIN assessments a ON a.user_id = u.id
  WHERE (u.raw_app_meta_data->>'pakket') IS NOT NULL
    AND (u.raw_app_meta_data->>'pakket') != 'admin'
  ORDER BY 13 DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION auditor_client_list() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auditor_client_list() TO authenticated;

CREATE OR REPLACE FUNCTION request_review()
RETURNS TABLE(status text, message text) AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN QUERY SELECT 'error'::text, 'Niet ingelogd'::text;
    RETURN;
  END IF;

  INSERT INTO assessments (user_id, pakket, status, status_detail, review_requested_at)
  VALUES (v_user_id, 'gap', 'active', 'review_requested', now())
  ON CONFLICT (user_id) DO UPDATE
    SET status_detail = 'review_requested', review_requested_at = now();

  INSERT INTO messages (thread_id, user_id, sender_role, body)
  VALUES (v_user_id, v_user_id, 'client', '[Systeem] Assessment klaar voor review.');

  RETURN QUERY SELECT 'success'::text, 'Uw verzoek is ontvangen. De Lead Auditor reageert binnen 48 uur.'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION request_review() TO authenticated;

-- ─── 14. VERIFICATIE ─────────────────────────────────────────
-- Dit moet alles TRUE tonen en 0 errors

SELECT
  'RLS check' AS test,
  CASE
    WHEN (SELECT count(*) FROM pg_tables
          WHERE tablename IN ('checklist_progress','gap_analyse','orders','messages','assessments','auditor_findings','document_access_log','rate_limits')
          AND rowsecurity = true) = 8
    THEN 'OK — alle 8 tabellen hebben RLS'
    ELSE 'FAIL — niet alle tabellen hebben RLS aan'
  END AS result
UNION ALL
SELECT
  'Functions check' AS test,
  CASE
    WHEN (SELECT count(*) FROM pg_proc
          WHERE proname IN ('check_rate_limit','cleanup_expired_assessments','request_data_deletion','auditor_client_list','request_review')) = 5
    THEN 'OK — alle 5 functies bestaan'
    ELSE 'FAIL — niet alle functies bestaan'
  END AS result
UNION ALL
SELECT
  'Cron check' AS test,
  CASE
    WHEN (SELECT count(*) FROM cron.job WHERE jobname = 'annex27-auto-delete-assessments') = 1
    THEN 'OK — auto-delete cron is gescheduled'
    ELSE 'WAARSCHUWING — cron nog niet gescheduled (kan aan permissies liggen)'
  END AS result;
