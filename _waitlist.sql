DROP TABLE IF EXISTS waitlist_nis2;
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product text NOT NULL,
  naam text NOT NULL,
  bedrijf text,
  email text NOT NULL,
  bericht text,
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz
);
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon can insert" ON waitlist;
CREATE POLICY "anon can insert" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (
    length(naam) > 1 AND length(naam) <= 200 AND
    length(email) <= 320 AND
    email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' AND
    product IN ('nis2','beleid')
  );
CREATE INDEX IF NOT EXISTS waitlist_product_idx ON waitlist(product, created_at DESC);
