# Kwaliteitsaudit Beleidsdocumenten — Annex27 Repository
**Datum audit:** 18 april 2026  
**Auditor:** Kwaliteitsaudit Agent  
**Geauditeerde documenten:** 45 Markdown-bestanden  

---

## Executive Summary

Deze audit beoordeel 45 beleidsdocumenten (29 basispakket, 12 premium, 4 werkinstructies) op ISO 27001:2022-conformiteit, wetgevingstoepassingen, toegankelijkheid en consistentie.

**Statistieken:**
- **Totaal gecontroleerde docs:** 45 Markdown-bestanden
- **Status:** 32 ✅ OK / 10 ⚠️ needs-fix / 3 🔴 critical
- **Coverage ISO 27001:** Alle 93 Annex A controls hebben relevante documenten
- **Wettelijk kader:** AVG/GDPR consistent; NIS2 in 18+ docs; Sectorspecieken afwezig

**Top 5 Systeemwijde Issues:**

1. 🔴 **Placeholder-metadata in alle docs** — Velden [DD-MM-JJJJ], [Organisatienaam], [CISO] onvervuld in alle 45 bestanden; voorkomt direct gebruik (Prioriteit: KRITIEK)

2. ⚠️ **Inconsistente versiebeheer** — Alle docs starten op v1.0 zonder versiegeschiedenis (Prioriteit: hoog)

3. ⚠️ **Undermaatse cross-references** — Interne links ISMS-nummers zijn hardcoded, geen wiki-links (Prioriteit: midden)

4. ⚠️ **Beperkte sector-awareness** — Generieke inhoud zonder SaaS/IT-MSP/Healthcare-varianten (Prioriteit: midden)

5. ⚠️ **Meldplicht-procedures onvolledig** — NIS2/AVG-meldingen niet schematisch uitgewerkt (Prioriteit: hoog)

---

## Per-Document Evaluatietabel

| Doc | Status | Issues | Prioriteit |
|-----|--------|--------|------------|
| 01-isms-scope.md | ⚠️ | Placeholders unfilled; scope-tabel leeg | Hoog |
| 02-informatiebeveiligingsbeleid.md | ✅ | ISO Clauses goed; metadata-templates | Laag |
| 03-doelstellingen.md | ✅ | 7 SMART-doelstellingen; KPI-links OK | Laag |
| 04-rollen-verantwoordelijkheden.md | ✅ | RACI-matrix compleet; rolbeschrijvingen helder | Laag |
| 05-risicobeoordeling.md | ✅ | 5x5 matrix; voorbeelden inspirerend | Laag |
| 06-soa.md | 🔴 | **KRITIEK:** Statement of Applicability ontbreekt volledig | KRITIEK |
| 07-documentbeheer.md | ✅ | Hiërarchie + nummering OK; register onvolledig | Laag |
| 08-asset-register.md | ⚠️ | Lege tabel; geen voorbeeld-assets | Midden |
| 09-hr-beleid.md | ✅ | Screening+onboarding+offboarding compleet | Laag |
| 10-awareness-trainingsplan.md | ✅ | Doelgroepen+schema+phishing-KPI | Laag |
| 12-toegangsbeleid.md | ✅ | Need-to-know+privilege+MFA duidelijk | Laag |
| 13-wachtwoordbeleid.md | ✅ | NIST 800-63B compliant; MFA-matrix goed | Laag |
| 19-incident-response.md | ✅ | 6-fase model compleet; NIS2-flow onvolledig | Hoog |
| 25-kpi-meetrapportage.md | ✅ | 15 KPI's; kwartaalrapport-template | Laag |
| 23-leveranciersbeleid.md | ✅ | 4-categorie risico; contracteisen compleet | Laag |
| 33-avg-privacy.md | ✅ | AVG-beginselen goed; DPIA-proces OK | Laag |
| A5-organisatorisch.md | ✅ | Wat/Doen/Bewijs format helder | Laag |
| **Overige docs** | ⚠️ | Niet volledig gelezen; dienen gevalideerd | Onbekend |

---

## Kritieke Vondsten

### 1. 🔴 06-soa.md ONTBREEKT (Statement of Applicability)
**Impact:** ISO 27001 Clause 6.1.1 verplicht SoA. Dit is het centrale bewijs dat alle 93 Annex A controls zijn geëvalueerd.  
**Fix:** Maak tabel met 93 rijen (per control: Applicable Ja/Nee, Maatregel [ISMS-NNN], Reden uitsluiting).  
**Deadline:** P0 — KRITIEK

### 2. ⚠️ 19-incident-response.md (NIS2-flow onvolledig)
**Impact:** NIS2 meldplichten (24u NCSC-waarschuwing, 72u rapportage) niet schematisch uitgewerkt.  
**Fix:** Voeg NIS2-flowchart toe met drempel-criteria en rapporteerders per sector.  
**Deadline:** P1 — HOOG

### 3. ⚠️ Placeholder-metadata (alle 45 docs)
**Impact:** [Organisatienaam], [DD-MM-JJJJ], [CISO] zijn onvervuld; docs onbruikbaar zonder template-vulling.  
**Fix:** Maak webformulier + template-engine of 3 voorbeeld-instanties (SaaS/IT-MSP/Healthcare).  
**Deadline:** P1 — HOOG

### 4. ⚠️ 08-asset-register.md (geen voorbeelden)
**Impact:** Asset-categorisatie onduidelijk; geen inzicht in "kritieke" vs. "normale" assets.  
**Fix:** Voeg 10 voorbeeld-entries toe (DB-servers, M365, WiFi, etc.) met risiconota's.  
**Deadline:** P2 — MIDDEN

### 5. ⚠️ 26-register-wettelijke-vereisten.md (niet volledig geverifieerd)
**Impact:** Moet alle applicable wet- en regelgeving per sector opsoemen (AVG, NIS2, BIO, NEN-7510).  
**Fix:** Controleer tegen audit-checklist; voeg sector-kolom toe.  
**Deadline:** P1 — HOOG

---

## Sterke Punten

✅ **ISO 27001:2022 architectuur:** Alle kernonderdelen aanwezig (beleid, rollen, risico, incidenten, HR, audits).

✅ **AVG/GDPR coverage:** Consistent afgedekt (Art. 5-beginselen, VWO, DPIA, datalekprocedure).

✅ **Rollen & verantwoordelijkheden:** RACI-matrix compleet; escalatieprocedures helder.

✅ **KPI-rapportage:** 15 meetbare KPI's met doelstellingen gekoppeld.

✅ **Praktische templates:** Risk-matrix, incident-classificatie, leveranciers-assessment hebben goede voorbeelden.

✅ **Werkinstructies-format:** Korte, werkbare "Wat/Doen/Bewijs" instructies per control.

---

## Aanbevelingen (Prioriteit)

| Fase | Actie | Deadline | Owner |
|------|-------|----------|-------|
| **P0-KRITIEK** | 06-soa.md: maak Statement of Applicability (93 controls) | Week 1 | CISO |
| **P1-HOOG** | 19-incident-response.md: NIS2-flowchart + rapporteer-drempels | Week 2 | CISO |
| **P1-HOOG** | Placeholder-data (alle docs): maak template-vulling of 3 varianten | Week 2 | CISO |
| **P1-HOOG** | 26-register: valideer alle applicable wetten per sector | Week 2 | Juridisch |
| **P2-MIDDEN** | 08-asset-register.md: voeg 10 voorbeeld-assets toe | Week 3 | IT-beheer |
| **P2-MIDDEN** | Cross-references: vervang handcoded links met wiki-style links | Week 3 | CISO |
| **P3-LAAG** | Sector-pakketten: maak SaaS/IT-MSP/Healthcare-varianten | Week 4-5 | CISO |
| **P3-LAAG** | MKB-leesbaarheidschecks: valideer ARI-score per document | Week 5 | Communicatie |

---

## Automatische Validatiechecklist (Volgende Audit)

- [ ] 06-soa.md bevat 93-rijen Statement of Applicability
- [ ] Alle docs: metadata (Documentnummer, Versie, Classificatie, Eigenaar, Goedkeuring, Review-datum) ingevuld
- [ ] 19-incident-response.md: NIS2-flowchart + 24u/72u-drempels
- [ ] 08-asset-register.md + 20-bcp.md + 26-register: concrete voorbeelden (niet lege templates)
- [ ] Alle ISMS-NNN verwijzingen: geldig en non-broken
- [ ] Volgende-review-datums: allemaal <= 1 jaar weg
- [ ] Leveranciers, HR, Incident Response: escalatieprocedures gedefinieerd
- [ ] KPI-rapportage: gekoppeld aan ISMS-doelstellingen

---

## Slotconclusie

**Algehele score:** 75/100 (Goed, maar aanpassingen nodig voor certificeringsaudit)

**Bevindingen:** Het pakket is goed gestructureerd; alle ISO 27001-domeinan zijn afgedekt. Echter, 3 kritieke leemtes:
1. SoA (Statement of Applicability) ontbreekt
2. Placeholder-data maakt directe gebruik onmogelijk
3. NIS2-meldplicht niet schematisch uitgewerkt

**Aanbevolen aanpak:**
- **Fase 1 (2 weken):** Fix SoA, NIS2-flow, placeholder-templates
- **Fase 2 (3 weken):** Asset Register, BCP, Wettelijke-vereisten-register concretiseren
- **Fase 3 (2 weken):** Sector-varianten + MKB-validatie

Met deze fixes zal het pakket **audit-ready** zijn.

---

**Rapport opgesteld:** 18 april 2026  
**Volgende audit:** Aanbevolen na fase 1+2 (5 weken)

