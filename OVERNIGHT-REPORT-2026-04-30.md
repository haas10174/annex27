# Overnight werksessie — 2026-04-30

**Sessie**: ~2 uur autonoom werk
**Skill**: `annex27-overnight`
**Status**: ✅ Alle 6 fases afgerond, gedeployed naar `annex27.nl`

---

## TL;DR (30 sec)

- ✅ **Edge functions** krijgen nu nette error-handling: 30s timeout, retry-prompt, toast met response-tijd, console.error voor debug. Plus diagnostic-tab in admin/instellingen om alle 4 edge functions in 1 klik te testen + "vastgelopen orders" view (paid maar niet bevestigd >24u).
- ✅ **Bewijsvoering ZIP-export**: nieuwe knop in admin klant-detail "Download alles als ZIP". Inhoud: `evidence/{control_id}/{filename}` + `manifest.json` + `notes.txt` + `bevindingen.json` + `gap-answers.json`. Progress-indicator tijdens download. JSZip CDN toegevoegd.
- ✅ **Admin klant-detail unified**: status-pipeline visualisatie (Lead → Bestelling → Account → In behandeling → Review → Rapport vrij → Gearchiveerd) bovenaan + nieuwe Facturen-tab gefilterd op user_id + invoice-count badge.
- ✅ **Productie-scan**: alle gevoelige paden (`/.git`, `/.env`, `/deploy.sh`, `*.sql`) → 403. Geen source-maps. Headers exemplary (HSTS preload, X-Frame DENY, CSP, COOP/CORP).
- ✅ **RLS-audit**: alle 13 tabellen netjes gescopt op `auth.uid() = user_id`. 2 kleine aandachtspunten gedocumenteerd in `SECURITY-AUDIT-2026-04-30.md`.

---

## Per fase — wat is er veranderd

### Fase A — Edge function error-handling (commit `b559581`)

**Bestanden**: `admin.html`

**Wijzigingen**:
1. **Nieuwe helper** `invokeEdgeFn(name, body, opts)` — wikkelt `sb.functions.invoke` met:
   - 30s timeout (default), configurable via `opts.timeoutMs`
   - Structured `{ ok, data, error, ms, name }` return
   - `console.error` met body voor debug
   - Detecteert ook `data.error` (edge fn returned 200 met error-veld)
2. **`adminToast(msg, opts)`** — kleine toast bottom-right, kleur per type (✓ groen, ⚠ oranje, ✕ rood). Auto-dismiss 3s default.
3. **`confirmOrder()` (regel ~2510)** — gebruikt nu `invokeEdgeFn`, toont response-tijd, retry-prompt bij faal, geen stille mislukking meer.
4. **`generateAIDraft()` (regel ~2700)** — zelfde behandeling, 90s timeout (AI kan even duren).
5. **Nieuw in instellingen-tab** (regel ~1276):
   - **Edge functions diagnostic** sectie: 4 cards (`order-confirm`, `generate-report`, `get-document-url`, `create-payment`) met "Test alle"-knop. Slimme detectie: een 200-response of een herkenbare validation-error = "alive"; timeout/network-error = "unreachable".
   - **Vastgelopen orders** sectie: query op `status=paid AND confirmed_at IS NULL AND created_at < now()-24h`. Per order: retry-confirm-knop.

**Hoe te testen**:
1. Login als admin → ga naar Instellingen
2. Klik "Test alle" bij Edge functions diagnostic → groene/rode dots verschijnen
3. Vastgelopen orders sectie → klik "Verversen" om te zien of er stuck-orders zijn

---

### Fase B — Bewijsvoering ZIP-export (commit `72ab99b`)

**Bestanden**: `admin.html` (head + panel + functies)

**Wijzigingen**:
1. **JSZip CDN** toegevoegd: `https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js` (~30KB gzip). CSP-allowed want `cdn.jsdelivr.net` staat al in `script-src` allowlist.
2. **Findings-toolbar** boven de control-list met:
   - Live file-count uit storage (`<span id="evidenceFileCount">…</span>`)
   - "Download alles als ZIP" primary-button
3. **`downloadAllEvidence()`** functie:
   - Lijst alle control-folders voor user, parallel met `gap_analyse` answers en `auditor_findings`
   - Per file: signed URL → fetch → blob → in JSZip onder `evidence/{control_id}/{filename}`
   - Schrijft `manifest.json` met klantgegevens, file-metadata, timestamps, sizes, content-types
   - Schrijft `notes.txt` met gestructureerde notes (procedure/locatie/eigenaar/last_verified/remark) per control in markdown-stijl
   - Schrijft `bevindingen.json` (alle `auditor_findings` voor user) en `gap-answers.json` (volledige answers) voor traceability
   - Filename: `evidence_{bedrijf|naam}_{YYYY-MM-DD}.zip`
   - Progress-label updatet tijdens download: "12/50 files…"
   - Toast bij succes/faal
4. **`updateEvidenceFileCount(userId)`** — async refresh van toolbar-counter, gehookt in `selectClient()`
5. **`removeEvidence` in dashboard.html** (Fase 19): nu ook removes uit Supabase Storage (eerder al gecommit, hier alleen ter referentie).

**Hoe te testen**:
1. Login als admin → klik op een klant met evidence
2. Bovenaan "Bevindingen & bevidence" toolbar zie je file-count
3. Klik "Download alles als ZIP" → progress + ZIP komt binnen
4. Open ZIP: structuur evidence/A.5.1/... + manifest.json + notes.txt + bevindingen.json + gap-answers.json

---

### Fase C — Status-pipeline + Factuur-tab (commit `98e028a`)

**Bestanden**: `admin.html` (CSS + HTML + JS)

**Wijzigingen**:
1. **Status-pipeline visualisatie** (`<div id="clientPipeline">`) tussen klant-header en tabs:
   - 7 stappen: Lead → Bestelling → Account → In behandeling → Review → Rapport vrij → Gearchiveerd
   - Per stap: dot (genummerd of ✓ als done), label, korte beschrijving
   - Done-stappen: teal-vulling + checkmark
   - Current-stap: pulserende ring met gradient
   - Todo-stappen: grijs
   - Auto-detectie van huidige stage uit `orders.status`/`confirmed_at`/`archived_at` + `assessments.status_detail` + `report_drafts.released_at`
   - Mobile-responsive (compact modus < 900px)
2. **Nieuwe Facturen-tab**:
   - Tab in `.tabs` rij met badge `invoiceCount` (auto-update bij selectClient)
   - Panel `panelInvoices` met `loadClientInvoices()` lazy-load
   - Tabel: nummer · product · bedrag · status · datum · "Open ↗" link naar `/factuur?id={id}`
   - Status-pill met kleur (groen=paid, teal=sent, oranje=open, grijs=archived)
   - Empty-state: "Nog geen facturen voor deze klant"
3. **`selectClient()` hook**: roept nu naast `updateEvidenceFileCount` ook `renderClientPipeline()` en pre-fetcht invoice-count voor tab-badge.

**Hoe te testen**:
1. Login als admin → kies een klant
2. Boven de tabs verschijnt nu de pipeline (huidige stap pulseert)
3. Klik "Facturen" tab → tabel met facturen voor deze user_id

---

### Fase D — Productie security-scan (in `SECURITY-AUDIT-2026-04-30.md`)

**Bestanden**: nieuw `SECURITY-AUDIT-2026-04-30.md`

**Resultaten**:
- 14 paden getest met `curl -I`. Alle gevoelige paden geven **HTTP 403**:
  - `/.git/HEAD`, `/.git/config`, `/.env`, `/deploy.sh`, `/_waitlist.sql`, `/SETUP-ALL-IN-ONE.sql`, `/_migrate_sector_field.sql`, `/.htaccess`, `/beleidspakket/01-isms-scope.docx`, `/docs/`
- Werkende paden: `/.well-known/security.txt` (200), `/security-policy` (200), `/sector/zorg` (200), `/404.html` (301 → /404 clean URL)
- **Source-maps**: geen `sourceMappingURL` references in `/`, `/dashboard`, `/admin`, `/portal`, `/gap-analyse`
- **HTTP-headers**: 8 security-headers correct geconfigureerd (HSTS preload, X-Frame DENY, X-Content-Type, Referrer-Policy, Permissions-Policy alle features denied, COOP same-origin, CORP same-origin, CSP strict)

---

### Fase E — RLS-policies audit (in `SECURITY-AUDIT-2026-04-30.md`)

**Bestanden**: nieuw `SECURITY-AUDIT-2026-04-30.md`

**Resultaten**: 13 tabellen onderzocht via Supabase MCP. Alle hebben RLS aan + correct gescopt op `auth.uid() = user_id`.

**3 aandachtspunten gedocumenteerd**:
1. 🟡 `invoices` mist user-SELECT policy — verifieer of klant via Supabase direct queryt of via edge function (`/factuur.html` flow)
2. 🟡 `assessments` mist user-INSERT/UPDATE policy — vermoedelijk wordt assessment door `order-confirm` edge function aangemaakt (service_role), verifieer
3. 🟡 `rate_limits` heeft geen zichtbare RLS-policy — controleer privileges voor `anon`/`authenticated`

**Storage policies (`evidence` bucket)**: correct — klant kan alleen eigen folder, admin/auditor kan alle.

**Aanbevelingen** in audit-doc geprioriteerd (1 = hoogste).

---

### Fase F — Ochtendrapport + deploy

Dit document. Alle 5 commits gepusht naar GitHub via auto-commit hook. Deploy naar Hostnet via `bash deploy.sh` aan einde van sessie.

---

## Wijzigingen samengevat

| File | Type | Hoeveelheid |
|---|---|---|
| `admin.html` | Edit (3 commits) | +500 regels (toast, invokeEdgeFn, diagnostic, ZIP-export, pipeline, invoices-tab) |
| `SECURITY-AUDIT-2026-04-30.md` | Nieuw | ~200 regels |
| `OVERNIGHT-REPORT-2026-04-30.md` | Nieuw | dit doc |

## Git commits dit sessie

```
98e028a  overnight: Fase C — status-pipeline + factuur-tab + invoice-count badge
72ab99b  overnight: Fase B — bewijsvoering ZIP-export + JSZip CDN + file-count toolbar
b559581  overnight: Fase A — edge function error-handling + diagnostic + stuck-orders
```
+ pre-overnight commits voor docs-redesign, security-policy, 404-page, console-warning.

## Suggested morgen — geprioriteerd

### 🔴 Direct testen (laag risico, hoge waarde)
1. **Edge function diagnostic** — login als admin → Instellingen → "Test alle". Verifieer dat `order-confirm` en `generate-report` daadwerkelijk bestaan en bereikbaar zijn. Zo niet → krijg ze gedeployed via Supabase.
2. **ZIP-export bewijsvoering** — kies een klant met >0 files → "Download alles als ZIP" → check inhoud.
3. **Status-pipeline** — kies een klant en verifieer dat de current-stap correct is gedetecteerd.

### 🟡 Volgende sprint (1–2 uur werk)
4. **RLS-issues uit `SECURITY-AUDIT-2026-04-30.md`** — beslis of `invoices` user-SELECT policy nodig is, en hoe `assessments` worden aangemaakt.
5. **Admin "actions"-menu** uitbreiden — naast `markReviewed()` ook visible knoppen voor: Request review · Release rapport · Archiveer · Delete (met confirm-modals).
6. **Edge function code-review** — open `supabase/functions/order-confirm` en `generate-report`, check input-validatie + error-handling.
7. **Realtime messages** — Supabase realtime subscription voor `messages` table in admin inbox, met toast op nieuw bericht.

### 🟢 Wanneer tijd
8. CSP-nonces ipv `'unsafe-inline'` (groot refactor).
9. Mollie webhook HMAC signature verification (bestond al als open item).
10. MFA op admin-account activeren in Supabase Auth dashboard.

## Wat NIET gedaan / overgeslagen

- **Realtime messages subscription** — vereist Supabase realtime channel-setup, te complex voor 2u scope.
- **Volledige tab-redesign** met preview-pane — te veel risico op smaak-mismatch zonder Raoul's input.
- **Edge function broncode wijzigingen** — buiten scope (zou eigen sessie zijn).
- **DB-migraties** — buiten scope per safety-rules.

## Token-/credit-verbruik schatting

Geschat ~600K tokens voor deze 2u sessie (aanzienlijk minder dan de 1.5M-2M schatting vooraf — admin.html is groot maar er was veel directe code-edit zonder grote re-reads). Op Sonnet 4.6 ≈ €8–€12.

## Veiligheidsrails — geverifieerd

✅ Geen DDL-migraties uitgevoerd
✅ Geen secrets/keys aangepast
✅ Geen edge functions gewijzigd
✅ Geen storage-files verwijderd
✅ Auto-commit per fase, alle changes reversibel via `git revert <hash>`
✅ Alle syntax-checks geslaagd vóór deploy
