# Edge functions deployen — 2 opties

Edge functions worden gemaakt door Claude maar moeten door jou gedeployed worden (Claude heeft geen Supabase-token).

## Optie A — Personal Access Token (aanbevolen, eenmalig)

Genereer eenmalig een Personal Access Token. Daarna kan Claude `npx supabase functions deploy` zelfstandig uitvoeren als jij het commando approve.

### Stappen

1. Open https://supabase.com/dashboard/account/tokens
2. Klik **Generate new token**. Geef naam: `annex27-claude-deploy`. Scope: `all` (Supabase access tokens kennen geen granular scopes).
3. Kopieer de token (begint met `sbp_...`).
4. Plak in PowerShell (eenmalig per shell-sessie):

   ```powershell
   $env:SUPABASE_ACCESS_TOKEN = "sbp_xxxxxxxxxxxxxxxx"
   ```

   Of permanent voor je gebruiker (zodat alle terminals het weten):

   ```powershell
   [Environment]::SetEnvironmentVariable("SUPABASE_ACCESS_TOKEN", "sbp_xxxxxxxxxxxxxxxx", "User")
   ```

   Herstart daarna je terminal/Claude Code.

5. Test:

   ```bash
   npx supabase functions list --project-ref tvqhxhoohzdzekcfzjuv
   ```

   Lijst van edge functions = ✅. Auth-fout = token niet zichtbaar.

### Wat Claude daarna kan

- `npx supabase functions deploy generate-report --project-ref tvqhxhoohzdzekcfzjuv` (PDF-fix)
- `npx supabase functions deploy generate-findings-draft --project-ref tvqhxhoohzdzekcfzjuv` (AI-draft pipeline)
- `npx supabase db push --project-ref tvqhxhoohzdzekcfzjuv` (migraties)

### Beveiligingsnoot

- Token = volledige toegang tot je Supabase account (alle projecten). Bewaar dus veilig — niet committen.
- Roteren: zelfde dashboard, **Revoke**. Nieuwe token genereren en env-var updaten.

---

## Optie B — Browser login (interactief)

Run zelf in PowerShell:

```bash
cd C:\Users\raoul\Documents\annex27
npx supabase login
```

Dit opent een browser → klik **Authorize**. Token wordt opgeslagen in `%USERPROFILE%\.supabase\access-token`.

Daarna kan Claude ook commando's runnen (zelfde access-token-file).

Nadeel: na uitloggen of token-vervaldatum moet je opnieuw inloggen.

---

## Migratie uitvoeren

Naast edge functions moet er ook een DB-migratie draaien voor de nieuwe tabel `auditor_findings_draft`:

```bash
npx supabase db push --project-ref tvqhxhoohzdzekcfzjuv
```

Of via Supabase Studio → SQL Editor → plak de inhoud van `supabase/migrations/20260515_auditor_findings_draft.sql` → Run.

---

## Status van pending deployments (per 2026-05-15)

| Wat | Bestand | Status |
|---|---|---|
| PDF-input in rapport-AI | `supabase/functions/generate-report/index.ts` | code klaar, **deploy nodig** |
| AI-draft pipeline | `supabase/functions/generate-findings-draft/index.ts` | code klaar, **deploy nodig** |
| Tabel auditor_findings_draft | `supabase/migrations/20260515_auditor_findings_draft.sql` | code klaar, **migratie nodig** |
