-- Herpositionering okt 2026: offerteaanvragen voor auditdiensten via de bestaande waitlist tabel.
-- Uitvoeren in de Supabase SQL editor VOORDAT de nieuwe homepage live gaat,
-- anders weigert de RLS policy de nieuwe productwaarden en ziet de bezoeker een foutmelding.

DROP POLICY IF EXISTS "anon can insert" ON waitlist;
CREATE POLICY "anon can insert" ON waitlist
  FOR INSERT TO anon
  WITH CHECK (
    length(naam) > 1 AND length(naam) <= 200 AND
    length(email) <= 320 AND
    email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' AND
    product IN ('nis2','beleid','intake','interne-audit','mock-audit','leveranciersaudit','auditpartner','inhuur','advies')
  );
