-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Rate Limiting Infrastructure
-- ═══════════════════════════════════════════════════════════════

-- Simple rate limit table: bucket per identifier + endpoint
CREATE TABLE IF NOT EXISTS rate_limits (
  id bigserial PRIMARY KEY,
  identifier text NOT NULL,        -- IP address or user_id
  endpoint text NOT NULL,           -- e.g. 'create-payment', 'get-document-url'
  window_start timestamptz NOT NULL DEFAULT now(),
  request_count int NOT NULL DEFAULT 1,
  UNIQUE(identifier, endpoint, window_start)
);

CREATE INDEX IF NOT EXISTS rate_limits_lookup_idx
  ON rate_limits(identifier, endpoint, window_start DESC);

-- Cleanup function: remove old rate limit entries (>1 hour)
CREATE OR REPLACE FUNCTION cleanup_rate_limits() RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits WHERE window_start < now() - interval '1 hour';
END;
$$ LANGUAGE plpgsql;

-- RLS — only service_role touches this table
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- No policies = no user access. Only service_role (bypasses RLS) can write/read.

-- Check function: returns TRUE if request is allowed, FALSE if rate limited
-- Window: 1 minute, rolling
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier text,
  p_endpoint text,
  p_max_requests int DEFAULT 10
) RETURNS boolean AS $$
DECLARE
  current_count int;
  current_window timestamptz;
BEGIN
  -- Round to nearest minute for window
  current_window := date_trunc('minute', now());

  -- Try insert or increment
  INSERT INTO rate_limits (identifier, endpoint, window_start, request_count)
  VALUES (p_identifier, p_endpoint, current_window, 1)
  ON CONFLICT (identifier, endpoint, window_start)
  DO UPDATE SET request_count = rate_limits.request_count + 1
  RETURNING request_count INTO current_count;

  -- Cleanup old entries occasionally (every ~10th request)
  IF random() < 0.1 THEN
    PERFORM cleanup_rate_limits();
  END IF;

  RETURN current_count <= p_max_requests;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

SELECT 'rate_limits table and check_rate_limit function created' AS result;
