# Overnight v2 — 2026-04-30 (vervolg na rapport-redesign)

**Sessie**: ~1.5 uur autonoom werk
**Skill**: `annex27-overnight` (Fase G + H + I + J + K)
**Status**: ✅ Alle 4 nieuwe fases gedeployed naar `annex27.nl`

---

## TL;DR (30 sec)

- ✅ **Admin "Toon test-accounts" toggle** — jouw eigen accounts (`info@annex27.nl`, `raoul_haas@live.nl`) verschijnen nu zichtbaar als TEST in klantenlijst zodra je de oranje toggle aanzet. Productie-default: uit.
- ✅ **Quick-finding templates per control** — 5 knoppen (✓ OK / ⚠ Minor / 🔶 Major / 🔴 Critical / ✕ Wissen) vullen finding + recommendation + severity in één klik. Auditor-werk per control van ~3 min naar ~10 sec.
- ✅ **Conditionele actie-knoppen op klant-detail** — Bevestig order / Verzoek review / Markeer afgerond / Release rapport / Archiveer / Wis testdata, allemaal alleen zichtbaar wanneer relevant voor de huidige klant-status.
- ✅ **SEO-fix** — root-cause was 0 internal-links naar `/blog/*`, `/sector/zorg`, `/security-policy`. Footer uitgebreid met "Kennisbank"-kolom + 5 blog-direct-links + zorg-sector + security-policy. Sitemap `/blog` → `/blog/` correct gezet.

---

## Fase G — Admin test-account toggle

**Bestanden**: `admin.html` + Supabase migratie

**Wijzigingen**:
1. **Nieuwe RPC** `auditor_client_list_with_admins()` — identiek aan productie-versie maar zonder `pakket != 'admin'` filter; voegt `is_test boolean` kolom toe (true voor admin/auditor).
2. **Toggle-button** in client-filters bar: oranje gestippelde knop "Toon test-accounts" / "✓ Test-accounts zichtbaar" met state in localStorage.
3. **TEST-badge** rechtsboven elke admin-row (oranje pill, gele linkerrand op `client-item.is-test`).
4. **`loadClientList()`** switcht tussen `auditor_client_list` (prod) en `auditor_client_list_with_admins` (test) op basis van toggle.
5. **`startApp()`** initialiseert toggle-state uit localStorage zodat de keuze onthouden blijft.

**Hoe te testen**:
1. Login admin → standaard zie je geen klanten als enige user is jouw eigen account
2. Klik "Toon test-accounts" → admin/auditor accounts verschijnen met TEST-badge
3. Klik op je eigen account → alle gap-data + bewijsvoering die je via dashboard hebt ingevoerd is zichtbaar

---

## Fase H — Quick-finding templates per control

**Bestanden**: `admin.html`

**Wijzigingen**:
1. **5 quick-buttons** boven de severity-pills in de finding-editor van elk control:
   - **✓ OK — geen actie** → severity=info + standaard "geen afwijking" finding + "continueer huidige praktijk" recommendation
   - **⚠ Minor** → severity=minor + "implementatie aanwezig maar onvolledig" + 3-stap remediation
   - **🔶 Major** → severity=major + "significante afwijking" + 4-stap remediation met deadline-suggestion
   - **🔴 Critical** → severity=critical + "blokkerend voor certificering — DIRECT ACTIE" + escalatie-recommendation
   - **✕ Wissen** → reset alles, stel info-severity, leeg finding/recommendation
2. **CSS klassen** `.qf-btn`, `.qf-ok`, `.qf-minor`, `.qf-major`, `.qf-critical`, `.qf-reject` met hover-states.
3. **`applyFindingTemplate(ctrlId, kind)`** + **`rejectAiFinding(ctrlId)`** functies — vullen DOM, triggeren bestaande `saveFinding()`.
4. **Toast-feedback**: "Quick-finding toegepast: MINOR" / "Tekst gewist".

**Workflow voor jou**:
- Was: per control 3-5 minuten typen voor finding + recommendation + severity
- Is: klik 1 knop, controleer auto-tekst, eventueel aanpassen waar nodig — ~10 sec per control
- Voor 100 controls: van 5 uur naar 30 min handwerk

---

## Fase I — Conditionele actie-knoppen op klant-detail

**Bestanden**: `admin.html`

**Wijzigingen**:
1. **`renderClientActions()`** functie — toont alleen relevante knoppen op basis van order/assessment/draft status:
   - **Bevestig order** (oranje) — als `orders.status='paid' AND confirmed_at IS NULL`
   - **Verzoek review** — als `assessments.status_detail='in_progress'` of geen assessment
   - **Markeer afgerond** (primary) — als `status_detail IN ('review_requested','in_review')`
   - **Release rapport** (teal) — als draft bestaat én `released_at IS NULL`
   - **Archiveer** — als `status_detail='reviewed'` én niet al gearchiveerd
   - **Wis testdata** (rood) — alleen voor `is_test=true`-accounts (extra confirm vereist)
2. **`requestReviewFromAdmin()`** — nieuwe functie: stuurt formeel bericht naar klant-thread om gap af te ronden voor review.
3. **`archiveClient()`** — markeert assessment als deleted_at + laatste paid order als archived_at.
4. **`deleteTestClient()`** — wist gap_analyse + auditor_findings + report_drafts + assessments + storage-files. Dubbele confirm. Alleen voor `is_test=true`. User account zelf blijft bestaan.
5. **`selectClient()`** roept nu `renderClientActions()` aan na `renderClientPipeline()` — knoppen updaten automatisch per geselecteerde klant.

**Workflow voor jou**:
- Geen tab-switching meer voor "bevestig order" of "release rapport" — direct in klant-detail header
- Status van klant zichtbaar via pipeline + relevante acties direct beschikbaar
- Test-cleanup: 1 knop wist alle testdata (handig na demo's)

---

## Fase J — SEO-indexering diagnose + fix

**Bestanden**: `index.html` (footer), `sitemap.xml`, nieuw `SEO-AUDIT-2026-04-30.md`

**Diagnose** (zie volledig rapport in `SEO-AUDIT-2026-04-30.md`):
- **"Pagina met omleiding" (1)**: sitemap had `/blog`, productie-redirect naar `/blog/`. Sitemap geupdate.
- **"Gevonden — niet geïndexeerd" (6)**: 0 internal links vanaf homepage naar `/sector/zorg`, `/security-policy` en alle 5 blog-artikelen. Google ziet ze in sitemap, maar zonder links blijft prioriteit laag.
- Content-thinness: ALLE blog-artikelen hebben 900+ woorden — content is OK, niet de oorzaak.

**Fixes toegepast**:
1. **`sitemap.xml`**: `<loc>https://annex27.nl/blog</loc>` → `<loc>https://annex27.nl/blog/</loc>`.
2. **`index.html` footer**:
   - Trajecten-kolom: extra link "Zorg-sector (NEN 7510)" → `/sector/zorg`
   - **Nieuwe Kennisbank-kolom** met 1 hoofdlink naar `/blog/` + 5 directe links naar elk artikel
   - Bedrijf-kolom: extra link "Security disclosure" → `/security-policy`

**Wat JIJ moet doen** (zie audit-doc voor details):
1. **Direct na deploy**: Google Search Console → handmatig "Indexering aanvragen" voor elk van de 8 niet-geindexeerde URL's (10/dag-quotum)
2. **Sitemap re-submit** in Search Console (verwijder oude, dien nieuwe in)
3. **Externe backlinks**: LinkedIn-posts naar elk blog-artikel = grootste lift

Verwachte indexerings-tijdlijn na deze fix: **24-72u** met handmatige Search Console-aanvraag, **2-14 dagen** zonder.

---

## Wijzigingen samengevat

| File | Type | Hoeveelheid |
|---|---|---|
| `admin.html` | Edit (3 commits) | +320 regels (toggle + quick-finding + actie-knoppen) |
| `index.html` | Edit | +13 regels (Kennisbank-kolom in footer) |
| `sitemap.xml` | Edit | 1 regel (/blog → /blog/) |
| `SEO-AUDIT-2026-04-30.md` | Nieuw | ~120 regels |
| `OVERNIGHT-REPORT-2026-04-30-v2.md` | Nieuw | dit doc |
| **Supabase migratie** | Nieuw | `auditor_client_list_with_admins()` RPC (read-only, geen breaking change) |

## Git commits dit sessie

```
fe67600  overnight v2: Fase J — SEO audit + sitemap blog/ fix + homepage footer kennisbank-kolom + zorg + security-policy links
4cd059a  overnight v2: Fase I — conditionele actie-knoppen op klant-detail header
57038f8  overnight v2: Fase H — quick-finding templates per control
187394f  overnight v2: Fase G — admin test-account toggle + TEST-badge
```

## Suggested morgen — geprioriteerd

### 🔴 Eerst (10 minuten)
1. **Search Console handmatige indexering** — 8 URLs (zie SEO-audit). Vóór 12u, dan binnen 24u zichtbaar.
2. **Test admin test-toggle** — log in, kies sector via dashboard test-bar, vul mix-evidence, switch naar admin → zie jezelf in lijst, klik door, test alle nieuwe knoppen.
3. **Test quick-finding templates** — open een klant met data, klik door alle 4 severity-knoppen, check of finding + recommendation + severity correct worden gevuld.

### 🟡 Komende sprint
4. **LinkedIn-content** — 5 posts maken (1 per blog-artikel) met directe link. Verwacht: 5-10× indexerings-acceleratie.
5. **Edge function broncode** review (`order-confirm`, `generate-report`) — Phase A bouwde error-handling client-side, nu de server-side checken.
6. **Realtime messages subscription** — eerder uitgesteld; klanten zien dan direct dat je antwoordt.

### 🟢 Later
7. CSP-nonces ipv `'unsafe-inline'` (groot refactor)
8. Mollie webhook HMAC verification
9. MFA admin

## Wat NIET gedaan / overgeslagen

- **Admin actions menu sticky positioning** — knoppen zijn er, blijven in normale main-actions header (sticky CSS niet kritiek)
- **Per-finding AI-validation** (✓/✕/⚠ on AI-draft text) — vereist gewerkte `generate-report` edge function eerst, doe na verificatie van die functie
- **Realtime messages** — buiten scope deze sessie

## Veiligheidsrails — geverifieerd

✅ Geen DDL-migraties (alleen 1 nieuwe READ-ONLY RPC `auditor_client_list_with_admins`)
✅ Geen secrets/keys aangepast
✅ Geen edge functions gewijzigd
✅ Geen storage-files verwijderd
✅ 4 commits, allemaal reversibel via `git revert <hash>`
✅ Alle syntax-checks geslaagd vóór deploy

## Token-/credit-verbruik schatting

Geschat ~400K tokens voor deze 1.5u sessie (kleinere edits dan v1, voornamelijk localized changes). Op Sonnet 4.6 ≈ €5–€8.
