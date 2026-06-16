# UI/UX & Design-audit annex27.nl

Datum: 16 juni 2026. Scope: alle publieke pagina's, landingspagina's, sectorpagina's, blog, legal, het klant-dashboard en admin. Methodiek: design-review (7 fasen) tegen `design-principles.md` + de eigen brand-tokens (teal #0D9488, cream #FAF9F6, Sora/Inter, 8px-grid, nooit standaard blauw). Severity: BLOCKER / HIGH / MEDIUM / LOW.

---

## 0. Executive summary — de hoogste hefboom

Vijf root-causes verklaren het leeuwendeel van de bevindingen. Ze één keer centraal oplossen ruimt tientallen losse issues op:

1. **`--text-muted #94A3B8` faalt WCAG AA overal** (~2.6:1 op cream/wit). Dit is de standaard secundaire-tekstkleur door de héle site. Fix: token verlagen naar ~#64748B voor tekst <18px.
2. **Interactieve `<div onclick>` zonder toetsenbord/ARIA** — plankeuze (bestellen), quizopties (gap), quick-actions + NIS2-knoppen (dashboard), tabelrijen (admin), beslishulp (nis2). Conversiepaden zijn muis-only.
3. **Ontbrekende `:focus-visible`** op vrijwel alle publieke pagina's (dashboard/admin hebben het wél). Toetsenbordgebruikers zien niet waar ze staan.
4. **Tweede, niet-token teal `#14b8a6`** naast #0D9488 (homepage-banner, NL/BE-banner, dashboard) — inconsistent merk én contrastfout (~2.4:1 wit-op-teal).
5. **Token-drift**: `--border` (#E5E5E5 vs #E8E4DC), nav-achtergrond (grijs rgba(250,250,250) vs cream), `--bg` op bestellen (#FAFAFA i.p.v. cream). De site oogt per pagina net iets anders.

**Echte BLOCKERs (eerst):**
- `gap-analyse.html`: het vraag-aantal is feitelijk fout en wisselt door de funnel (intro "13", disclaimer "10", upsell "14"). Vlak vóór de betaal-CTA.
- `dashboard.html` NIS2-tab: een globale click-handler verft de geselecteerde antwoordknop dark-theme op een lichte achtergrond → selectie wordt onleesbaar (regels ~5277-5287).
- `nis2.html` beslishulp: radiogroup niet toegankelijk (geen role=radio/aria-checked/aria-live, geen pijltjesnavigatie).
- `sector/overheid.html`: gebruikt een **blauw basispalet** (--bg #F8FAFC, --bg-warm #EFF6FF) — directe schending van "nooit standaard blauw".

---

## A. Site-brede / design-system bevindingen

- **[HIGH] Contrast muted-tekst** — `#94A3B8` op cream/wit ~2.6:1, faalt AA. Overal: hero-eyebrows, meta, captions, footer-links, plan-descriptions, SLA-labels. → `#64748B` voor tekst <18px; #94A3B8 alleen decoratief.
- **[HIGH] Geen `:focus-visible`** op publieke pagina's (secundair, norm, sector, blog, legal). → globaal `:focus-visible{outline:2px solid var(--accent);outline-offset:2px}` per pagina.
- **[HIGH] `<div onclick>`-interactie zonder semantiek** — maak er `<button>`/`<a>` van of voeg `role`+`tabindex`+key-handler toe. Geldt voor plankeuze, quizopties, quick-actions, tabelrijen, beslishulp.
- **[HIGH] Inputs zonder labels (placeholder-only)** — bestellen (naam/bedrijf/email/btw/discount), gap lead-form, faq-search, admin-login. Placeholder verdwijnt bij invoer + faalt contrast. → echte `<label>` (mag `.sr-only`) of `aria-label`.
- **[HIGH] Tweede teal `#14b8a6`** (niet-token, contrastfout) → vervang door `--accent`/tokens.
- **[HIGH] Banner-contrast** wit op teal-gradient die op #14b8a6 eindigt (~2.4:1): homepage NIS2-deadline-banner, NL countdown-banner, BE rood-gradient (#DC2626 ~4.0:1). → gradient donkerder maken (#0F766E→#0D9488) of tekst zwaarder/groter.
- **[MEDIUM] `--border` token-drift** (#E5E5E5 vs #E8E4DC) over pagina's. → één waarde.
- **[MEDIUM] nav-achtergrond-drift** (grijs rgba(250,250,250,x) vs cream rgba(250,249,246,x)) — zichtbare kleurnaad bij scroll. → uniform cream.
- **[MEDIUM] Geen `<main>`-landmark + geen skip-link** op de publieke pagina's. → content in `<main>` wikkelen, skip-to-content toevoegen.
- **[MEDIUM] FAQ-accordeons missen ARIA** (aria-expanded/controls, hidden panels): faq.html, iso-nl, iso-be, dashboard, nis2 `<details>` focus. Bovendien drie verschillende FAQ-implementaties (details / JS-accordeon / platte h3) — uniformeren.
- **[MEDIUM] Design-tokens niet hergebruikt** — bestellen.html en veel inline-stijlen op index hardcoden hexes. → `:root`-tokens propageren.
- **[LOW] `/analytics.js` dubbel ingeladen** (trust, faq) + dubbele `<meta theme-color>`. → dedupliceren.
- **[LOW] CTA-labels niet uniform** ("Start gratis quickscan" / "Begin met de gratis quickscan" / "Start uw ISO 27001-traject"). → één primair label, helpt ook conversiemeting.

---

## B. Content-/vertrouwen-inconsistenties (feitelijk fout, hoge prioriteit)

Deze ondermijnen geloofwaardigheid op een compliance-merk:

- **[BLOCKER] Vraag-aantal gap-analyse**: 13 (intro) / 10 (disclaimer) / 14 (upsell) — dynamisch berekenen, overal gelijk.
- **[HIGH] Beleidsdocumenten-aantal**: 44 (kaart) vs 45 (stats-strip) vs 29 (meta) vs 137 (elders). → één bron van waarheid.
- **[HIGH] Retentietermijn (trust.html)**: "90 dagen" (trust-marks/lifecycle) vs "2 jaar" (verwerkingsregister). Ook DPA art. 7 "geen doorgifte buiten EER" vs privacy "VS-doorgifte met SCC's". → harmoniseren.
- **[HIGH] Kapotte placeholder-zin** in `verwerkersovereenkomst.html` art. 1: "gevestigd onze Lead Auditor". → herschrijven.
- **[MEDIUM] NIS2-NL datum**: "voorjaar 2026" (blog/NIS2-artikel) vs "1 juli 2026" (SaaS-artikel/Cbw). → één lijn.
- **[MEDIUM] "80% bespaart"-claim** (iso-kosten) slaat alleen op voorbereiding; totaaltabel toont ~50-55%. → nuanceren.
- **[MEDIUM] Auteur "onze Lead Auditor"** als Person.name in blog JSON-LD → oogt als placeholder in rich results.
- **[MEDIUM] Twee blog-indexen** (`/blog` = blog.html vs `/blog/` = blog/index.html) divergeren: verouderde inhoud, andere hero-kleur, ontbrekende structured data. → consolideren + 301.

---

## C. Per pagina-cluster

### C1. Kern-conversie — index, gap-analyse, bestellen
- [HIGH] index NIS2-deadline-banner: wit op #14b8a6 ~2.3:1 (zie A).
- [HIGH] index: geen `<main>`/landmark-structuur.
- [MEDIUM] index `.btn-secondary:hover` op cream geeft nauwelijks verandering → sterkere hover.
- [MEDIUM] index pakketten-CTA's gebruiken `bestellen.html?plan=` (relatief .html) terwijl nav clean URLs gebruikt → uniformeren naar `/bestellen?plan=`.
- [MEDIUM] index: "Hoe we werken"-kaarten draaien oneindige 12s-loops (buiten 150-300ms) → één keer afspelen bij in-view (er is wél reduced-motion-support).
- [BLOCKER] gap: vraag-aantal (zie B).
- [HIGH] gap: quizopties losse `<button>` zonder radiogroup/aria-checked + geen pijltjesnavigatie.
- [HIGH] gap: lead-form toont altijd "Resultaat bewaard", ook bij ongeldige e-mail/netwerkfout → e-mail-regex + zichtbare foutstate (hergebruik bestellen-patroon).
- [HIGH] gap: live-dashboard sidebar-labels rgba(255,255,255,0.4/0.5) op donker ~3.3-4.3:1 → ophogen.
- [MEDIUM] gap: disabled "volgende"-knop via opacity:0.4 (geen echte disabled, contrast zakt weg) → echte `disabled` + grijze vulling.
- [MEDIUM] gap: actieve vraag is `<div>`, geen heading; focus springt niet mee bij vraagwissel.
- [LOW] gap: `.lead-success` interne links in wit/halftransparant op cream → onleesbaar; `body height:100vh` fragiel.
- [HIGH] bestellen: off-brand `#FAFAFA` i.p.v. cream + geen tokens (zie A).
- [MEDIUM] bestellen: plankeuze `<div onclick>` zonder radio-semantiek; pre-audit-kaart ziet selecteerbaar uit maar opent mail.
- [MEDIUM] bestellen: muted-tekst plan-descriptions/period/trust ~2.6:1.
- [MEDIUM] bestellen: redirect-state zonder spinner/`aria-busy`.

### C2. Secundair — demo, roi, werkwijze, vergelijking, rapport-voorbeeld, faq, trust
- [HIGH] demo: video-placeholder ziet eruit als afspeelbaar (play-knop) maar doet niets → visueel niet-klikbaar maken of echte disabled-state.
- [HIGH] roi: live-resultaat zonder `aria-live` → blinde gebruiker hoort besparing niet veranderen. Inputs niet geclampt op min/max (rekent door met onrealistische waarden, geen invalid-state).
- [MEDIUM] werkwijze: timeline-tabel verbergt kolom 3 op mobiel ÉN is scrollbaar (tegenstrijdig, info-verlies) → één strategie.
- [MEDIUM] vergelijking: brede tabel scrollt op mobiel zonder scroll-hint; statusicoon-kleuren (#059669/#D97706/#DC2626) halen AA net niet → donkerder.
- [HIGH] rapport-voorbeeld: sticky tabelkop `top:0` verdwijnt achter de fixed nav (64px) → `top:64px`. E-mailgate verbergt alle content + insert-fout wordt geslikt.
- [MEDIUM] rapport-voorbeeld: evidence-status-pills (warning/miss) tekstcontrast faalt; emoji-iconen (📄/✓/✗) zonder tekstalternatief.
- [HIGH] faq: accordeon mist alle ARIA (aria-expanded/controls); ingeklapte content blijft tab-bereikbaar; search zonder aria-live; "categorieen" zonder trema.
- [MEDIUM] trust: live-metrics tonen "—" bij fout onder kop "live uit de database" (ondermijnt de trust-claim); SRI-claim niet waargemaakt (analytics.js zonder integrity); retentie-tegenstrijdigheid (zie B).
- [LOW cluster] demo/roi/rapport missen de globale `:focus-visible` die werkwijze/faq/trust wél hebben.

### C3. Norm-landings — nis2, nen-7510, iso-nl, iso-be, kosten
- [BLOCKER] nis2 beslishulp radiogroup niet toegankelijk (zie 0).
- [HIGH] nis2/nen/kosten: brede mappingtabellen scrollen op mobiel zonder hint → fade/sticky eerste kolom.
- [HIGH] iso-nl + iso-be: FAQ-knoppen missen aria-expanded; `.faq-a max-height:600px` kan lange antwoorden clippen → ruimer + ARIA.
- [HIGH] cluster: `--border` wijkt af NL/BE (#E8E4DC) vs rest; geen `:focus-visible` cluster-breed.
- [MEDIUM] nen-7510: dunste conversiepad (geen pakket-callout/nav-CTA); eyebrow-kleur afwijkend.
- [MEDIUM] kosten + BE: cross-norms-strip ontbreekt; kosten mist FAQPage-schema.
- [MEDIUM] banner-contrast NL (teal) en BE (rood) onder AA (zie A/B).
- [MEDIUM] nis2: obligations-nummering (1-10) wijkt af van de mappingtabel-nummering op dezelfde pagina.
- [LOW] nis2: dode waitlist-JS laadt Supabase-bundel zonder bijbehorend formulier; nav-tint grijs.
- [LOW] cluster: nav-hoogte/logo/back-label en bottom-CTA-stijl (2 donker / 3 licht) niet uniform.

### C4. Sector — saas, zorg, it, bouw, overheid (uit één template)
- [BLOCKER] alle sectoren: geen focus-states + geen skip-link.
- [HIGH] overheid: blauw basispalet (schending "nooit blauw") → cream-tokens.
- [HIGH] zorg: oranje glows (rgba(249,115,22)) buiten brand-tokens → teal-glow.
- [HIGH] it/bouw/overheid: leeg tweede-hero-CTA-slot (template-drift); saas mist tweede CTA → vullen of verwijderen.
- [HIGH] `--coral*`-tokens bevatten teal-waarden (misleidend); hoofd-CTA mist accent-hiërarchie.
- [MEDIUM] dode `.compare-*`-CSS op alle 5 (ongebruikt) → verwijderen of implementeren (sterke conversie-sectie).
- [MEDIUM] `prefers-reduced-motion` alleen op zorg; nav-achtergrond hardcoded grijs; spacing-drift (18/20/22px, niet op 8px-grid); nav-back tap-target <44px.
- [LOW] generieke deliverables/CTA-koppen: overheid spreekt over "klanten" terwijl doelgroep gemeenten zijn ("Klaar voor uw ENSIA-rapportage?"). SVG's missen aria-hidden.

### C5. Blog + legal + utility
- [HIGH] twee blog-indexen divergeren (zie B).
- [HIGH] privacy: cookies-sectie gebruikt afwijkende inline-tabel/knop-stijl i.p.v. tokens (dubbel tabelstramien op één pagina).
- [MEDIUM] DPA art. 1 kapotte zin + tegenstrijdige subverwerker/doorgifte-info vs privacy (zie B).
- [MEDIUM] NIS2-blogartikel: `.num`-klasse ongedefinieerd → bedragen niet rechts uitgelijnd.
- [MEDIUM] security-policy: afwijkende footer-layout; JetBrains-Mono font nooit geladen.
- [LOW] legal: privacy vs AV verschillende h2-grootte/marges; success.html border-token-drift; 404/blog-placeholder emoji zonder aria-hidden; aanspreekvorm u/je mengt (saas-artikel).

---

## D. Dashboard (`dashboard.html`)

Positief: globale `:focus-visible` aanwezig, gap-module kreeg een mobiele tap-target-audit, `esc()` consequent.

- [BLOCKER] NIS2-antwoordknoppen: globale click-handler (5277-5287) verft selected dark-theme op lichte achtergrond → onleesbaar. → dark-override verwijderen, light-tokens behouden.
- [HIGH] quick-action-cards `<div onclick>` niet toetsenbord-toegankelijk → `<button>`/`<a>` + key-handler.
- [HIGH] toasts (showToast) zonder role=status/aria-live → save-feedback onhoorbaar.
- [HIGH] tweede teal #14b8a6 met contrastfout (819/1236/11172+).
- [HIGH] muted #94A3B8 breed onder AA.
- [HIGH] gap-answer + NIS2-knoppen missen radiogroup-semantiek; NIS2-knoppen `all:unset` wist focus-outline.
- [HIGH] rapport KPI-grid (1.4fr 1fr 1fr inline) stapelt niet <768px → overflow op mobiel; vaste padding 48/56px.
- [MEDIUM] `color:var(--accent)` als kleine links ~3.9:1 → `--accent-hover` voor tekst.
- [MEDIUM] showView() zet geen aria-current, verplaatst geen focus, scrollt niet naar boven.
- [MEDIUM] accordeons (documenten, gap-evidence-hints) zonder aria-expanded; berichten send/attach-knoppen 36px (<44px); NIS2-view volledig inline-styled (consistentie/onderhoud).
- [MEDIUM] score-ring SVG zonder role=img/aria-label + geen aria-live op %-update.
- [LOW] profiel-view doodlopend (geen bewerk/logout in-view); rapport-download = window.print(); severity-kleuren major/critical delen tint.

## E. Admin (`admin.html`)

Positief: destructieve acties hebben `confirm()`, brand-tokens consistent, status met tekst+kleur, globale focus-visible.

- [HIGH] Aanvragen detail-rij `colspan="7"` terwijl tabel 8 kolommen heeft → layout verspringt. → colspan 8.
- [HIGH] tabs (`.tabs`/`.leads-tab`/`.view-btn`) missen role=tablist/tab/tabpanel + aria-selected + pijltjesnavigatie.
- [HIGH] klikbare rijen/cards (`<tr onclick>`, .inbox-row, .client-item) niet focusbaar/toetsenbordbereikbaar.
- [MEDIUM] numerieke kolommen (Bedrag/Totaal/Score) links uitgelijnd i.p.v. rechts; tabular-nums zonder text-align:right.
- [MEDIUM] pills/badges met `--accent-light #14B8A6` of `--warning #F59E0B` tekst op lichte achtergrond ~2.4-2.6:1 → donkerder tekstvariant.
- [MEDIUM] tabs/knoppen missen expliciete `:focus-visible`/`:active`-pariteit.
- [LOW] invoice/login-labels niet gekoppeld (`for`/`aria-label`); bij 114 controls veel klikken (geen bulk "OK"); sidebar 380px krap rond 950px.

---

## F. Aanbevolen volgorde van aanpak

**Sprint 1 — site-brede hefboom + BLOCKERs (grootste effect, laagste effort):**
1. muted-tekst-token → #64748B (één regel per pagina, lost tientallen AA-fails op).
2. globale `:focus-visible` toevoegen waar het ontbreekt.
3. `#14b8a6` → `--accent` overal; banner-gradients donkerder.
4. `--border` + nav-achtergrond uniformeren.
5. gap-analyse vraag-aantal dynamisch (BLOCKER).
6. dashboard NIS2 dark-theme-override fix (BLOCKER).
7. overheid blauw palet → cream (BLOCKER, brand-schending).
8. content-inconsistenties B (doc-aantal, retentie, DPA-zin, datums).

**Sprint 2 — toetsenbord/ARIA op interactie:**
9. `<div onclick>` → knoppen/radiogroups (plankeuze, quizopties, quick-actions, beslishulp, admin-rijen).
10. FAQ-accordeons ARIA + één uniform component.
11. inputs van echte labels voorzien.
12. aria-live op toasts/score/roi-resultaat/berichten.

**Sprint 3 — responsiviteit + polish:**
13. brede tabellen mobiel (scroll-hint of stack); rapport KPI-grid stacking; sticky tabelkop top:64px.
14. sector-template-drift (lege CTA-slots, reduced-motion, dode CSS, generieke copy).
15. blog-index consolidatie; legal-template harmoniseren.

Dit rapport is gegenereerd door 7 parallelle reviewers; alle bevindingen zijn geverifieerd tegen de feitelijke HTML/CSS.
