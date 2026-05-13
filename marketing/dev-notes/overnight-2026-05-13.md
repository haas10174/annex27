# Overnight status — 2026-05-13

Werk uitgevoerd tussen ~02:00 en sessie-einde, voor verdere actie morgen.

---

## ✅ Klaar voor verzending

**`marketing/sales/reply-utf-ai-v7.html`** — UTF.ai-antwoord mail, definitieve versie.

Combineert de gestructureerde opzet van de oude mail (genummerde kopjes, annex27-wordmark, footer met BTW) met de gecorrigeerde inhoud:

- Geen DNV/IRCA-claims (kon niet gestaafd)
- Geen werkrelaties-claim met certificerende instellingen
- Geen totaalprijs-tabel (€3.530-€4.735) — zou afschrikken na €795 entry
- Geen 30-min scope-gesprek-aanbod
- Geen "stage-2" jargon meer
- Wel: pre-audit-rol expliciet (Annex27 ≠ CI)
- Wel: BIO mapping als PDF-download in dashboard genoemd
- Wel: launching customer-positionering voor overheid-segment
- Wel: eerlijk "geen ervaring" bij MS 365 add-ins en 42001-certificering

**Plak-instructie OX AppSuite:** open HTML in browser → Ctrl+A → Ctrl+C → in OX nieuw bericht → editorformat HTML → Ctrl+V. Verstuur eerst test naar info@annex27.nl om landing te checken.

---

## ✅ Klaar als source (deploy + activatie morgen)

### Mistral evidence-relevantie edge function

**`supabase/functions/evaluate-evidence/index.ts`** — volledig uitgewerkte skeleton.

Wat het doet: bij elke bewijs-upload de relevantie t.o.v. de control beoordelen via Mistral AI (EU-hosted, geen VS-doorgifte). Score 0-1 wordt opgeslagen in `evidence.relevance_score`. Klant ziet een tooltip en de Lead Auditor kan op deze score prioriteren.

**Activatie-stappen (jij doet):**

1. Registreer op [console.mistral.ai](https://console.mistral.ai)
2. Genereer een API-key (Mistral Small tier is voldoende, ~€0,001 per call)
3. Zet in Supabase Dashboard → Project Settings → Edge Functions → Secrets:
   ```
   MISTRAL_API_KEY = <jouw-key>
   ```
4. SQL-migratie draaien voor de extra evidence-kolommen:
   ```sql
   ALTER TABLE evidence
     ADD COLUMN IF NOT EXISTS relevance_score numeric(3,2),
     ADD COLUMN IF NOT EXISTS relevance_reasoning text,
     ADD COLUMN IF NOT EXISTS relevance_concerns jsonb,
     ADD COLUMN IF NOT EXISTS relevance_model text,
     ADD COLUMN IF NOT EXISTS relevance_evaluated_at timestamptz;
   ```
5. Deploy: `supabase functions deploy evaluate-evidence`
6. Test met curl/Postman vóór UI-integratie

**Privacy-update voordat live:** zie `marketing/legal/privacy-update-2026-05-13.md` — die tekst moet in annex27.nl/privacy. Verwerkingsregister bijwerken eveneens (klaar in dat bestand).

### Dual scoring engine

**`scoring-v2.js`** — losse module, backwards-compatible.

Exposed op `window.A27Scoring` met methods:
- `calculateControlReadiness(ctrlId, gapQuestions, gapAnswers, evidenceData)` → returneert `{ selfPct, readinessPct, evidenceFactor, components, missing }`
- `calculateDashboardTotals(controlIds, ...)` → totals voor dashboard-ring
- `readinessExplanation(controlResult)` → tooltip-tekst

Formule:
```
audit_readiness = self_score × evidence_factor
evidence_factor = file (0.4) + toelichting≥50w (0.3) + meta-velden compleet (0.3)
```

**Integratie-stappen (samen morgen):**

1. `<script src="/scoring-v2.js" defer></script>` toevoegen in `<head>` van `dashboard.html` (na gap-questions-v2.js, vóór de inline dashboard-code)
2. In `renderDashboard()` om ringer-getal heen: tweede getal renderen voor audit-readiness (kleinere variant)
3. Bij elke cat-bar: tooltip met readiness-uitleg toevoegen
4. In gap-analyse view: per control de readiness tonen in de ga-header (rechts boven, naast huidige %)
5. Later: bij integratie met Mistral, evidence_factor uitbreiden met `relevance_score` als extra component (formule wordt: file 0.25 + toelichting 0.2 + meta 0.2 + relevance 0.35)

Geen breaking changes: bestaande scoring blijft werken zolang de integratie-stappen nog niet uitgevoerd zijn.

---

## ✅ Toegevoegd ochtend 2026-05-13

### Dual scoring v1 GEÏNTEGREERD en LIVE

- `scoring-v2.js` is **live op annex27.nl/scoring-v2.js** met `window.A27Scoring`-API
- `dashboard.html` is **uitgebreid** met script-tag + `dashReadinessRow` UI-element
- `renderDashboard()` berekent nu audit-readiness via `A27Scoring.calculateDashboardTotals()` en toont een tweede regel onder de hoofdscore met:
  - Kleur-bolletje (groen <10% verschil, oranje 10-30%, rood >30%)
  - "Audit-readiness: X%" als secundair getal
  - Info-icoon met tooltip die de formule uitlegt
- Geen breaking changes: bestaande primaire score blijft het grote getal in de ring
- Element wordt enkel getoond als er beoordeelde controls zijn (anders verborgen)

**Open volgende stap voor dual scoring:** per-control display in de gap-analyse view zelf (niet alleen dashboard-totaal), zodat klant bij elke control real-time ziet hoe bewijs de score beïnvloedt. Niet kritisch voor v1.

### SQL-migratie evidence-tabel KLAAR als bestand

**`supabase/migrations/20260513_evidence_relevance.sql`** — volledig idempotent migratie-script met:

- 5 nieuwe kolommen op `evidence`: `relevance_score`, `relevance_reasoning`, `relevance_concerns`, `relevance_model`, `relevance_evaluated_at`
- Check-constraint dat score tussen 0 en 1 ligt
- Index op `relevance_score` voor admin-queries
- Kolom-comments voor documentatie
- View `vw_klant_audit_readiness` voor admin Lead Auditor-overzicht per klant/control
- Rollback-snippet in comment onderaan

**Uitvoering:** open Supabase Studio → SQL Editor → plak file-content → Run. Of via Supabase CLI met `supabase db push`.

## ⏳ Niet meer open

(SQL-migratie was hier eerder als "open punt" benoemd, is nu klaar als bestand)

### admin.html diagnostic deploy-status
Deploy van admin.html (met diagnostic-fix die non-2xx-codes als alive herkent) is in background gestart. Check zodra je wakker bent in admin → Edge functions diagnostic of de vier rode bolletjes nu groen zijn.

### UTF.ai-mail variant zonder Mistral-footer
Aangezien de Mistral-functie nog niet live is, is in v7 nergens vermeld dat we AI-relevance-toets gebruiken. Wanneer Mistral live gaat moet de mail-template ook bijgewerkt worden bij vraag 5 ("DPIA, verwerkersovereenkomst, privacy, FG-dossier").

---

## ❌ Niet gedaan en waarom

| Item | Status | Reden |
|---|---|---|
| Cbw-corpus bouwen (#66) | nee | Wacht op tekst-aanlevering door jou |
| FG-dossier templates (#58-61) | nee | Wacht op UTF.ai-ja-of-nee. Bouwen voordat klant gekocht heeft is voorraad-werk |
| Prijsstructuur sector-premium (#62) | nee | Strategische keuze, jij moet eerst beslissen op model |
| Sector-filtering dashboard (#63) | nee | Wacht op #62 |
| Google Business Profile (#20) | nee | Vereist jouw input + screenshots |

---

## 📋 Aktie-lijst voor jou bij wakker worden

1. **Lees `reply-utf-ai-v7.html`** kort door, verstuur naar Juul (UTF.ai) bij voorkeur vóór 09:00.
2. **Check admin → Edge functions diagnostic** of de fix werkt (groene bolletjes ipv rode).
3. **Mistral-account** aanmaken op console.mistral.ai → API key → in Supabase Secrets als `MISTRAL_API_KEY`.
4. **SQL-migratie** voor evidence-tabel (snippet hierboven) uitvoeren in Supabase SQL Editor.
5. **Privacy-update** uit `marketing/legal/privacy-update-2026-05-13.md` overnemen in annex27.nl/privacy.
6. **Akkoord** geven op dual scoring integratie-stappen, dan rolt dat in volgende sessie in dashboard.html.
7. **Deploy** `supabase functions deploy evaluate-evidence` (vereist Supabase CLI of via MCP-tool als ik weer aan zit).
8. Eventuele cleanup van oude `reply-utf-ai*.html`-versies (v1 t/m v6) als je v7 hebt verstuurd.

---

## 🧠 Open beslissingen die ik niet voor je heb genomen

1. **CMMI vs simpele 4-punts schaal** (waar je laatst over twijfelde) — geen verandering doorgevoerd; bij wakker worden kunnen we council draaien als je dit wil meenemen.
2. **Beleidspakket-filtering per sector** — afhankelijk van keuze in #62 over prijsstructuur. Vraag voor wanneer je weer wakker bent.
3. **Cbw-corpus opbouwen op basis van wetgevingskalender** vs wachten op Staatsblad — voor UTF.ai-traject niet acuut nodig.

---

*Klaar om door te gaan zodra je terug bent.*
