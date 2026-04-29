# Security Audit — annex27.nl
**Datum**: 2026-04-30
**Scope**: Productie-paden, HTTP-headers, RLS-policies (read-only audit)
**Uitgevoerd door**: Claude Code (Sonnet) tijdens overnight-werksessie

---

## TL;DR

🟢 **Productie**: alle gevoelige paden geblokkeerd, geen source-maps, security-headers exemplary
🟢 **RLS-policies**: alle tabellen netjes gescopt op `auth.uid() = user_id`, admin-checks via server-controlled `app_metadata`
🟡 **Twee aandachtspunten**: `invoices` mist user-SELECT policy, `assessments` mist user-INSERT/UPDATE policy — beide waarschijnlijk OK omdat ze via edge functions met service_role lopen, maar verifieer

---

## 1. Productie-pad scan

Geteste URL's op `https://annex27.nl`:

| Pad | HTTP | Beoordeling |
|---|---|---|
| `/.git/HEAD` | 403 | ✅ geblokkeerd |
| `/.git/config` | 403 | ✅ geblokkeerd |
| `/.env` | 403 | ✅ geblokkeerd |
| `/deploy.sh` | 403 | ✅ FTP-creds beschermd |
| `/_waitlist.sql` | 403 | ✅ schema verborgen |
| `/SETUP-ALL-IN-ONE.sql` | 403 | ✅ schema verborgen |
| `/_migrate_sector_field.sql` | 403 | ✅ migraties verborgen |
| `/.htaccess` | 403 | ✅ config verborgen |
| `/beleidspakket/01-isms-scope.docx` | 403 | ✅ alleen via signed URL |
| `/docs/` | 403 | ✅ directory listing geblokkeerd |
| `/.well-known/security.txt` | 200 | ✅ disclosure beschikbaar |
| `/security-policy` | 200 | ✅ policy-pagina werkt |
| `/sector/zorg` | 200 | ✅ landing live |
| `/404.html` | 301 → /404 | ✅ clean URL redirect |

Conclusie: **geen lekken**.

## 2. Source-maps in productie HTML

Gechecked op `/`, `/dashboard`, `/admin`, `/portal`, `/gap-analyse`:
- **Resultaat**: geen `sourceMappingURL` references gevonden → developer-tools tonen geen leesbare unminified bron.

## 3. HTTP Security Headers (op `/`)

| Header | Waarde | Score |
|---|---|---|
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | A+ (2 jaar + preload-eligible) |
| `X-Frame-Options` | `DENY` | A+ (clickjack-bestendig) |
| `X-Content-Type-Options` | `nosniff` | A+ |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | A+ |
| `Permissions-Policy` | `accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()` | A+ (alle browser-features denied) |
| `Cross-Origin-Opener-Policy` | `same-origin` | A+ |
| `Cross-Origin-Resource-Policy` | `same-origin` | A+ |
| `Content-Security-Policy` | strict allowlist (jsdelivr, Supabase, Mollie, GA, Nominatim) | B+ |

CSP-aandachtspunt: `'unsafe-inline'` voor zowel `script-src` als `style-src` is nodig vanwege inline JS/CSS in HTML. Voor A-rating: nonces toevoegen — significante refactor (alle inline `<script>` blocks aanpassen). Niet kritiek.

**Mogelijke verbetering**: voeg `Cross-Origin-Embedder-Policy: require-corp` toe voor SharedArrayBuffer-isolation. Niet kritiek voor MKB-site.

## 4. Storage bucket policies (`evidence`, `reports`, `documents`, `rag-corpus`)

Eerder gecontroleerd (`storage.objects` policies):

| Bucket | Klant kan | Admin/auditor kan |
|---|---|---|
| `evidence` | Eigen folder upload/SELECT/UPDATE/DELETE | SELECT alle + DELETE alle |
| `reports` | (niets direct) | ALL |
| `documents` | (alleen via signed URL via edge function) | n/a |
| `rag-corpus` | (interne corpus) | n/a |

✅ Alle policies enforce `(storage.foldername(name))[1] = (auth.uid())::text` — klant A kan niet in folder van klant B uploaden of lezen.

## 5. Row-Level Security per tabel

Alle 13 onderzochte tabellen hebben RLS aan (`rls_enabled: true`).

| Tabel | User-policies | Admin-policies | Beoordeling |
|---|---|---|---|
| `gap_analyse` | SELECT/INSERT/UPDATE/DELETE op eigen `user_id` | (niet expliciet, valt onder service_role/admin via JWT) | 🟢 |
| `assessments` | SELECT op eigen | (geen INSERT/UPDATE policy zichtbaar) | 🟡 zie issue 1 |
| `auditor_findings` | SELECT eigen | ALL via `app_metadata.role='auditor'` of `pakket='admin'` | 🟢 |
| `checklist_progress` | CRUD op eigen | n.v.t. | 🟢 |
| `document_access_log` | SELECT eigen | n.v.t. | 🟢 |
| `orders` | SELECT op `user_id` OR `email` (fallback voor pre-account) | SELECT all + UPDATE all | 🟢 (email-fallback acceptable) |
| `invoices` | (geen user-policy) | INSERT + SELECT + UPDATE | 🟡 zie issue 2 |
| `messages` | SELECT eigen, INSERT eigen met `sender_role='client'`-check, UPDATE eigen | (geen aparte admin-policy zichtbaar — admin gebruikt service_role of valt onder auditor-rol) | 🟢 sender-role validatie sterk |
| `report_drafts` | SELECT eigen `status='released'` | ALL | 🟢 (klant ziet alleen vrijgegeven) |
| `reports` | SELECT eigen `released_at IS NOT NULL` | ALL | 🟢 |
| `vat_validation_cache` | `false` (geen anon access) | service_role-only | 🟢 |
| `waitlist` | INSERT met validatie (lengte naam/email + product enum) | SELECT + UPDATE | 🟢 — anon INSERT is beveiligd met length-checks |
| `rate_limits` | (geen policy zichtbaar — vermoedelijk service_role-only) | n.v.t. | 🟡 verifieer |

### Issue 1: `assessments` zonder user INSERT/UPDATE policy

**Waarneming**: Klanten kunnen alleen SELECT op eigen assessment, geen INSERT/UPDATE.

**Mogelijke routes**:
- Assessment wordt aangemaakt door `order-confirm` edge function (service_role) — dan OK.
- Status wordt bijgewerkt door admin via auditor-policy — moet expliciet zijn.

**Aanbeveling**: verifieer dat `order-confirm` daadwerkelijk de assessment-row maakt; zo niet → klant kan nooit een assessment hebben. Extra: voeg eventueel een `users update own assessment status_detail` policy toe voor "request review" flow vanuit klant-portal.

### Issue 2: `invoices` zonder user SELECT policy

**Waarneming**: Klant kan eigen invoice-row niet uitlezen via Supabase client.

**Mogelijke routes**:
- `factuur.html` haalt factuur op via signed URL of een edge function met service_role — verifieer.
- Als klant via Supabase direct queryt: zal lege resultset krijgen → factuur onzichtbaar.

**Aanbeveling**: voeg policy toe als klant via Supabase direct moet uitlezen:

```sql
CREATE POLICY "Users can read own invoices"
ON invoices FOR SELECT
USING (auth.uid() = user_id);
```

### Issue 3: `rate_limits` zonder zichtbare policy

`rate_limits` heeft 7 rijen maar geen RLS-policy gevonden in deze scan. Mogelijk gebruikt alleen service_role (edge functions). Verifieer dat anon/authenticated geen access hebben:

```sql
SELECT has_table_privilege('anon', 'public.rate_limits', 'SELECT'),
       has_table_privilege('authenticated', 'public.rate_limits', 'SELECT');
```

## 6. Admin-rol detectie (server-controlled)

Alle admin-checks gebruiken:
```sql
((auth.jwt() -> 'app_metadata' ->> 'pakket') = 'admin')
OR ((auth.jwt() -> 'app_metadata' ->> 'role') = 'auditor')
```

`app_metadata` is **alleen door service_role schrijfbaar** — klant kan dit niet zelf via `auth.updateUser()` aanpassen. ✅ Dit is de juiste manier om RBAC af te dwingen.

## 7. Aanbevelingen — prioriteitsvolgorde

| Pri | Actie | Inspanning | Risk-reductie |
|---|---|---|---|
| 🟡 1 | Voeg user-SELECT policy toe op `invoices` (als klant direct queryt) | Klein | Klant ziet altijd eigen factuur |
| 🟡 2 | Verifieer `assessments` INSERT-flow via edge function | Klein | Voorkomt dangling klant zonder assessment |
| 🟡 3 | Verifieer `rate_limits` privileges voor `anon`/`authenticated` | Klein | Voorkomt rate-limit bypass |
| 🟢 4 | Overweeg CSP-nonces ipv `'unsafe-inline'` (lange-termijn) | Groot (refactor inline scripts) | A-rating CSP, voorkomt XSS-injecties |
| 🟢 5 | Voeg `Cross-Origin-Embedder-Policy: require-corp` toe | Klein | SharedArrayBuffer-isolation, theoretisch |
| 🟢 6 | Setup CSP `report-uri` of `report-to` voor monitoring violations | Middel | Visibility op CSP-blocks |
| 🟢 7 | Roteer Supabase publishable key periodiek (jaarlijks) | Klein | Compromised key wordt automatisch invalided |

## 8. Gewicht — wat dit rapport NIET dekt

- **Edge function broncode** — niet gereviewd (zou aparte sessie zijn). Aanbeveling: vraag de service_role gebruiken in `order-confirm` met explicit `SELECT/INSERT` privileges; nooit klant-controleerbaar input naar service_role direct doorgeven zonder validatie.
- **Mollie webhook signature verification** — eerder genoemd als open item. Niet getest.
- **MFA admin** — eerder gemeld als pending in `project_annex27_open_items`. Niet kritiek voor dit rapport, wel aanbevolen.
- **Pen-test scenario's** — geen actieve exploit-tests gedaan. Aanbeveling: 1× per jaar door externe partij (DNV-Services, Northwave, etc.) of na elke major-release.
- **Dependency-vulnerability scan** (Supabase JS, Leaflet, JSZip versies) — niet uitgevoerd. CDN-versies zijn pinned (`@supabase/supabase-js@2.49.4` met SRI hash, `leaflet@1.9.4`, `jszip@3.10.1`).

---

**Conclusie**: het security-fundament van annex27.nl is **boven gemiddeld** voor een MKB-SaaS. De headers zijn exemplary, RLS-policies zijn netjes gescopt, en gevoelige paden zijn correct geblokkeerd. De drie gele aandachtspunten zijn klein en lossen specifieke edge-cases op.
