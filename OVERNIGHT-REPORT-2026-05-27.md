# Overnight-rapport — 27 mei 2026

## TL;DR
- Hele dag + nacht doorgewerkt aan dashboard-UX, scoring-helderheid, beleidsdocumenten en een autonome veilige nachtronde.
- Vannacht (autonoom): **#132 verificatie-tool** gebouwd, plus **security-, RLS- en SEO-audits** uitgevoerd (read-only). Alles gedeployed.
- **Geen kritieke bevindingen.** Geen DB-wijzigingen, geen secrets aangeraakt. Alles reversibel via git.

---

## Vannacht autonoom gedaan

### #132 — Pakket-toegang verifiëren (admin-preview)
Probleem: jij logt als **admin** in, dus de nav grijst nooit — je kon niet zien hoe een klant met pakket X het dashboard ziet.
Opgelost: admin-only URL-preview. Open het dashboard met `?pakket=gap` (of `nis2`, `beleid`, `beleid_premium`, `iso_nis2_bundle`) en je ziet exact wat die klant ziet — welke nav-items grijzen, welke documenten zichtbaar zijn. Oranje banner bovenin met "Terug naar admin-weergave".
- `dashboard.html` — `loadProfile()`: admin-only override op `userPakket` + `showPakketPreviewBanner()`.
- Read-only/veilig: RLS in de DB blijft de échte autorisatie; dit verandert alleen de client-side weergave.
- **Conclusie #132:** de greying-code (`applyPakketRestrictions()`) wérkt al voor niet-admins; hij greysde bij jou alleen niet omdat admin alles ziet. Test 'm nu met `?pakket=gap`.

### Fase D — Productie-securityscan (read-only)
Alles schoon:
- `/.git/HEAD`, `/.env`, `/.htaccess`, `/deploy.sh` → **403** (geblokkeerd). `/supabase/.temp/...` → 404.
- Geen `sourceMappingURL` in dashboard.html / admin.html / analytics.js.
- `robots.txt`: blokkeert `/dashboard /admin /portal /success /factuur /supabase/` + `*.sql/*.md/*.sh/*.py/*.html$` — nette anti-leak + anti-duplicate.

### Fase E — RLS-policies audit (read-only, geen wijzigingen)
Alle gecontroleerde tabellen hebben RLS **aan** en correcte policies:
- `gap_analyse`, `assessments`, `auditor_findings`, `messages`: klant ziet/bewerkt alleen eigen rijen (`auth.uid() = user_id`) + admin/auditor-override.
- `orders`, `invoices`: klant leest eigen orders; **insert/update alleen admin** (orders komen server-side binnen via webhook — correct).
- `waitlist`: admin read/update + `anon_insert_waitlist` (met CHECK op naam/email-lengte + product-allowlist incl. `quickscan_started`). **Geen publieke SELECT** → leads zijn niet uitleesbaar met de anon-key. ✅
- **Geen kritieke bevindingen. Niets gewijzigd.**

### Fase J — SEO-indexering diagnose (read-only)
- **31/31 sitemap-URLs geven HTTP 200** — alles bereikbaar (incl. de gisteren toegevoegde `/nen-7510`).
- Interne links vanaf homepage OK: `/nen-7510`, `/sector/*`, `/iso-27001-kosten`, `/security-policy`, `/blog/` allemaal gelinkt (blog via `/blog/` in footer).
- **Geen actie nodig.** Voor Search Console: dien de sitemap opnieuw in en monitor "niet geïndexeerd"-meldingen (handmatige stap, alleen jij kunt dat).

---

## Eerder die dag gedaan (gedeployed)
- Gap-module: save&sluit→overzicht, content gecentreerd, herhaalde toelichting weg, geel Lead-Auditor-blok → clean teal, TOC-chips nu uitklapbaar.
- Score-card **leidt nu met audit-readiness** (hoofdgetal); compliance + zelfevaluatie secundair; bij 0 bewijs "nog geen bewijs geüpload". (#140)
- Beleidsdocumenten: **mappings eigen categorie** (#141) + **kapotte tabel-render gefixt** (2/3-koloms breedtes, nowrap alleen voor ID-tabellen) (#142).
- **Org-placeholders** (#143): invul-UI in profiel → `user_metadata` → `document-render.js` vult docs/preview-PDF automatisch.
- Profiel-koppelteken weg, NIS2-prijs overal €595, bundel-pakket-bug gefixt (edge functions herdeployed), admin-overzicht filtert anonieme quickscan-starts, sitemap `/nen-7510`.
- Mail-instellingen (imap/smtp.hostnet.nl) + e-mailhandtekening op `/handtekening`.
- Google Ads: keyword-opschoning begeleid, biedstrategie teruggezet naar Klikken maximaliseren + €5 cap, herindeling-schema (`marketing/google-ads-herindeling-C2.md`).

---

## Wat ik morgen zou doen (prioriteit)
1. **Test #132**: open dashboard met `?pakket=gap` en `?pakket=beleid` — verifieer dat nav grijst en docs verbergen zoals bedoeld. Meld als iets niet klopt.
2. **#131 NIS2-richting kiezen** (wachtte op jou): landingspagina / dashboard-module / los product. Council-advies: NIS2 als speerpunt-ingang, ISO als ruggengraat.
3. **Conversie (#107)**: in GA4 `quickscan_completed` als key-event markeren i.p.v. `quickscan_started` (jouw 30-sec UI-actie).
4. **Bundel-Word-downloads**: de directe Word/PDF-knoppen serveren statische (ongevulde) bestanden; alleen de preview-PDF is placeholder-gevuld. Server-side merge is een aparte feature als je volledig gevulde Word wilt.
5. Grotere openstaande: #71 AI-relevantiecheck bewijs, #96 CMMI 0-5, #62 prijsstructuur-beslissing.

## Veiligheid / reversibiliteit
- Enige code-wijziging vannacht: `dashboard.html` (#132 preview-tool, client-side, admin-only). Gedeployed.
- Geen DDL/DML, geen secrets, geen edge-function-wijzigingen. Auto-commit-hook heeft alles gecommit + gepusht.
- Audits waren puur lezend.
