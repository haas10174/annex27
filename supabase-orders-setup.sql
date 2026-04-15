-- ═══════════════════════════════════════════════════════════════
-- ANNEX27 — Orders tabel voor Mollie betalingen
-- ═══════════════════════════════════════════════════════════════
-- Voer dit uit in Supabase Dashboard > SQL Editor
-- https://supabase.com/dashboard/project/tvqhxhoohzdzekcfzjuv/sql
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. TABEL AANMAKEN ────────────────────────────────────────

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

-- Index op email voor snelle lookup
CREATE INDEX IF NOT EXISTS orders_email_idx ON orders(email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- ─── 2. RLS INSCHAKELEN ───────────────────────────────────────

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Alleen de service_role (webhook) mag orders aanmaken/updaten
-- Users kunnen hun eigen orders zien (als ze gekoppeld zijn via user_id)

CREATE POLICY "Users can read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id OR auth.jwt() ->> 'email' = email);

-- Service role heeft impliciete toegang (bypass RLS)
-- Geen INSERT/UPDATE policies voor gewone users — alleen webhook mag dit

-- ─── 3. VERIFICATIE ───────────────────────────────────────────

SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'orders';
