-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Auditor Dashboard Infrastructure
-- ═══════════════════════════════════════════════════════════════
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. ASSESSMENT STATUS UITBREIDEN ─────────────────────────

ALTER TABLE assessments
  ADD COLUMN IF NOT EXISTS review_requested_at timestamptz,
  ADD COLUMN IF NOT EXISTS review_completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS reviewed_by uuid REFERENCES auth.users(id),
  ADD COLUMN IF NOT EXISTS status_detail text DEFAULT 'in_progress'
    CHECK (status_detail IN ('in_progress', 'review_requested', 'in_review', 'reviewed', 'deleted'));

-- ─── 2. AUDITOR FINDINGS TABEL ───────────────────────────────
-- Per klant per control: auditor's bevinding + aanbeveling
-- Staat centraal in het rapport dat de klant ontvangt

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

ALTER TABLE auditor_findings ENABLE ROW LEVEL SECURITY;

-- Klant kan eigen findings lezen (verschijnt in rapport)
CREATE POLICY "Users can read own findings"
  ON auditor_findings FOR SELECT USING (auth.uid() = user_id);

-- Alleen auditor-role users kunnen findings schrijven
CREATE POLICY "Auditors can write findings"
  ON auditor_findings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE id = auth.uid()
        AND (raw_app_meta_data->>'role' = 'auditor' OR raw_app_meta_data->>'pakket' = 'admin')
    )
  );

-- ─── 3. AUDITOR HELPER FUNCTION: get_user_summary ────────────
-- Dashboard van auditor gebruikt dit om alle klanten te zien

CREATE OR REPLACE FUNCTION auditor_client_list()
RETURNS TABLE(
  user_id uuid,
  email text,
  naam text,
  bedrijf text,
  pakket text,
  sector text,
  status text,
  review_requested_at timestamptz,
  controls_answered bigint,
  total_controls bigint,
  unread_messages bigint,
  last_activity timestamptz
) AS $$
BEGIN
  -- Alleen toegestaan voor auditor/admin
  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
      AND (raw_app_meta_data->>'role' = 'auditor' OR raw_app_meta_data->>'pakket' = 'admin')
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions';
  END IF;

  RETURN QUERY
  SELECT
    u.id AS user_id,
    u.email::text,
    (u.raw_user_meta_data->>'naam')::text AS naam,
    (u.raw_user_meta_data->>'bedrijf')::text AS bedrijf,
    (u.raw_app_meta_data->>'pakket')::text AS pakket,
    NULL::text AS sector, -- sector is client-side in localStorage
    COALESCE(a.status_detail, 'in_progress')::text AS status,
    a.review_requested_at,
    (SELECT count(*) FROM gap_analyse g WHERE g.user_id = u.id)::bigint AS controls_answered,
    93::bigint AS total_controls,
    (SELECT count(*) FROM messages m
      WHERE m.user_id = u.id
        AND m.sender_role = 'client'
        AND m.is_read = false)::bigint AS unread_messages,
    GREATEST(
      COALESCE(a.started_at, u.created_at),
      COALESCE((SELECT max(created_at) FROM messages WHERE user_id = u.id), u.created_at),
      COALESCE((SELECT max(updated_at) FROM gap_analyse WHERE user_id = u.id), u.created_at)
    ) AS last_activity
  FROM auth.users u
  LEFT JOIN assessments a ON a.user_id = u.id
  WHERE (u.raw_app_meta_data->>'pakket') IS NOT NULL
    AND (u.raw_app_meta_data->>'pakket') != 'admin'
  ORDER BY last_activity DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

REVOKE ALL ON FUNCTION auditor_client_list() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION auditor_client_list() TO authenticated;

-- ─── 4. REVIEW REQUEST FUNCTIE ───────────────────────────────
-- Klant kan "Klaar voor review" klikken in dashboard

CREATE OR REPLACE FUNCTION request_review()
RETURNS TABLE(status text, message text) AS $$
DECLARE
  v_user_id uuid := auth.uid();
BEGIN
  IF v_user_id IS NULL THEN
    RETURN QUERY SELECT 'error'::text, 'Niet ingelogd'::text;
    RETURN;
  END IF;

  -- Insert or update assessment record
  INSERT INTO assessments (user_id, pakket, status, status_detail, review_requested_at)
  VALUES (v_user_id, 'gap', 'active', 'review_requested', now())
  ON CONFLICT (user_id) DO UPDATE
    SET status_detail = 'review_requested',
        review_requested_at = now();

  -- Insert system message naar auditor (via thread)
  INSERT INTO messages (thread_id, user_id, sender_role, body)
  VALUES (v_user_id, v_user_id, 'client', '[Systeem] Assessment klaar voor review. Gelieve de bevindingen te beoordelen.');

  RETURN QUERY SELECT 'success'::text, 'Uw verzoek is ontvangen. De Lead Auditor krijgt een notificatie en reageert binnen 48 uur.'::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION request_review() TO authenticated;

-- ─── 5. AUDITOR ROLE TOEKENNEN ───────────────────────────────
-- Na deployment: zet jezelf als auditor via Supabase Dashboard
--
-- Dashboard → Authentication → Users → [jouw user]
-- → "User Metadata" (app_metadata section, via SQL):
--
-- UPDATE auth.users
--   SET raw_app_meta_data = raw_app_meta_data || '{"role": "auditor", "pakket": "admin"}'::jsonb
--   WHERE email = 'JOUW_EMAIL@voorbeeld.nl';

-- ─── 6. VERIFICATIE ──────────────────────────────────────────
SELECT
  (SELECT count(*) FROM pg_tables WHERE tablename = 'auditor_findings' AND rowsecurity = true) AS findings_rls,
  (SELECT count(*) FROM pg_proc WHERE proname = 'auditor_client_list') AS has_client_list_fn,
  (SELECT count(*) FROM pg_proc WHERE proname = 'request_review') AS has_review_request_fn;
