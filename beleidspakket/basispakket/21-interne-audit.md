# Interne Audit Procedure

**ISO 27001:2022 — Clause 9.2**

| | |
|---|---|
| **Documentnummer** | ISMS-021 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze procedure beschrijft hoe [Organisatienaam] interne audits van het ISMS plant, uitvoert en rapporteert. Interne audits controleren of het ISMS conform ISO 27001:2022 functioneert en effectief is.

## 2. Eisen (Clause 9.2)

Het interne auditprogramma:
- Wordt gepland met inachtneming van het belang van de betrokken processen en resultaten van voorgaande audits
- Definieert auditcriteria en scope voor elke audit
- Selecteert auditors die objectiviteit en onpartijdigheid waarborgen (auditors auditen niet hun eigen werk)
- Rapporteert resultaten aan het management

## 3. Auditprogramma

### 3.1 Jaarlijks auditprogramma

Alle clausules en relevante Annex A controls worden binnen een cyclus van 12 maanden geauditeerd:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" width="100%" style="max-width:760px;display:block;margin:16pt auto;">
  <text x="380" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Interne audit-kalender (jaarlijkse cyclus)</text>
  <line x1="60" y1="50" x2="700" y2="50" stroke="#CBD5E1" stroke-width="1"/>
  <text x="140" y="42" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="800">Q1</text>
  <text x="300" y="42" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="800">Q2</text>
  <text x="460" y="42" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="800">Q3</text>
  <text x="620" y="42" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="800">Q4</text>
  <line x1="60" y1="45" x2="60" y2="55" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="220" y1="45" x2="220" y2="55" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="380" y1="45" x2="380" y2="55" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="540" y1="45" x2="540" y2="55" stroke="#CBD5E1" stroke-width="1"/>
  <line x1="700" y1="45" x2="700" y2="55" stroke="#CBD5E1" stroke-width="1"/>
  <rect x="70" y="70" width="140" height="54" rx="8" fill="#0F172A"/>
  <text x="140" y="90" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">ISMS Governance</text>
  <text x="140" y="106" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="9">Cl. 4 · 5 · 7.5</text>
  <text x="140" y="118" text-anchor="middle" fill="#14B8A6" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">Scope · beleid · docs</text>
  <rect x="70" y="134" width="140" height="54" rx="8" fill="#0F172A"/>
  <text x="140" y="154" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Risicomanagement</text>
  <text x="140" y="170" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="9">Cl. 6.1 · 8.2 · 8.3</text>
  <text x="140" y="182" text-anchor="middle" fill="#14B8A6" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">Risicobeoordeling</text>
  <rect x="230" y="70" width="140" height="54" rx="8" fill="#0D9488"/>
  <text x="300" y="90" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Personeel</text>
  <text x="300" y="106" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="9">A.6.1–8</text>
  <text x="300" y="118" text-anchor="middle" fill="#E6FFFB" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">Training · NDA's</text>
  <rect x="230" y="134" width="140" height="54" rx="8" fill="#0D9488"/>
  <text x="300" y="154" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Toegang &amp; Auth</text>
  <text x="300" y="170" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="9">A.5.15–18 · 8.2–5</text>
  <text x="300" y="182" text-anchor="middle" fill="#E6FFFB" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">MFA · least priv.</text>
  <rect x="390" y="70" width="140" height="54" rx="8" fill="#D97706"/>
  <text x="460" y="90" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Technische maatr.</text>
  <text x="460" y="106" text-anchor="middle" fill="#FEF3C7" font-family="Inter, Helvetica, Arial" font-size="9">A.8.8 · 15 · 16 · 24</text>
  <text x="460" y="118" text-anchor="middle" fill="#FEF3C7" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">Patch · logs · crypto</text>
  <rect x="390" y="134" width="140" height="54" rx="8" fill="#D97706"/>
  <text x="460" y="154" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Incident &amp; BCM</text>
  <text x="460" y="170" text-anchor="middle" fill="#FEF3C7" font-family="Inter, Helvetica, Arial" font-size="9">A.5.24–30</text>
  <text x="460" y="182" text-anchor="middle" fill="#FEF3C7" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">IRP · BCP · DR-test</text>
  <rect x="550" y="70" width="140" height="54" rx="8" fill="#0F172A"/>
  <text x="620" y="90" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Fysiek &amp; class.</text>
  <text x="620" y="106" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="9">A.7.1–7 · 5.12–13</text>
  <text x="620" y="118" text-anchor="middle" fill="#14B8A6" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">Kantoor · labels</text>
  <rect x="550" y="134" width="140" height="54" rx="8" fill="#0F172A"/>
  <text x="620" y="154" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Review &amp; verbet.</text>
  <text x="620" y="170" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="9">Cl. 9.1 · 9.3 · 10</text>
  <text x="620" y="182" text-anchor="middle" fill="#14B8A6" font-family="Inter, Helvetica, Arial" font-size="8" font-weight="600">KPI · CAPA</text>
  <g transform="translate(60, 230)">
    <rect x="0" y="0" width="20" height="16" rx="3" fill="#0F172A"/>
    <text x="28" y="12" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Governance-vlak (Q1+Q4)</text>
    <rect x="220" y="0" width="20" height="16" rx="3" fill="#0D9488"/>
    <text x="248" y="12" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">People &amp; Access (Q2)</text>
    <rect x="420" y="0" width="20" height="16" rx="3" fill="#D97706"/>
    <text x="448" y="12" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Operationeel (Q3)</text>
  </g>
  <g transform="translate(60, 275)">
    <text x="0" y="0" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Aanvullende audits (ongepland)</text>
    <text x="0" y="22" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">→ Na ernstige incidenten · significant wijzigingen · klachten · vóór externe certificeringsaudit</text>
  </g>
  <g transform="translate(60, 320)">
    <circle cx="8" cy="8" r="6" fill="#10B981"/>
    <text x="24" y="12" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">Doorlooptijd audit: 3–5 werkdagen · Rapportage binnen 2 weken · Voortgang in management review</text>
  </g>
</svg>

| Periode | Auditonderwerp | Clausules / Controls | Auditor |
|---|---|---|---|
| Q1 | ISMS Governance & Documentatie | Clause 4, 5, 7.5 | [Naam] |
| Q1 | Risicomanagement | Clause 6.1, 8.2, 8.3 | [Naam] |
| Q2 | Personeel & Bewustwording | A.6.1-A.6.8, trainingsregistratie | [Naam] |
| Q2 | Toegang & Authenticatie | A.5.15-A.5.18, A.8.2-A.8.5 | [Naam] |
| Q3 | Technische maatregelen | A.8.8, A.8.15, A.8.16, A.8.24 | [Naam] |
| Q3 | Incidentmanagement & Continuïteit | A.5.24-A.5.30 | [Naam] |
| Q4 | Fysieke beveiliging & Classificatie | A.7.1-A.7.7, A.5.12-A.5.13 | [Naam] |
| Q4 | Prestatiemonitoring & Verbetering | Clause 9.1, 9.3, 10.1, 10.2 | [Naam] |

### 3.2 Aanvullende audits

Ongeplande audits worden uitgevoerd na:
- Ernstige beveiligingsincidenten
- Significante organisatiewijzigingen
- Bevindingen die directe opvolging vereisen

## 4. Auditproces

### 4.1 Voorbereiding

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Auditscope en -criteria vaststellen | CISO |
| 2 | Auditor(s) aanwijzen (onafhankelijk van geauditeerd gebied) | CISO |
| 3 | Auditchecklist opstellen op basis van clausules/controls | Auditor |
| 4 | Betrokken medewerkers informeren over planning | CISO |
| 5 | Relevante documentatie opvragen | Auditor |

### 4.2 Uitvoering

| Methode | Beschrijving |
|---|---|
| Documentreview | Controleer of beleid, procedures en registraties actueel en volledig zijn |
| Interviews | Bespreek met medewerkers of zij het beleid kennen en naleven |
| Observatie | Controleer of praktijk overeenkomt met beleid (bijv. clean desk, schermvergrendeling) |
| Technische controle | Controleer configuraties, toegangsrechten, patchstatus, logs |
| Steekproef | Neem willekeurige samples van registraties (bijv. toegangsverzoeken, incidentmeldingen) |

### 4.3 Bevindingen classificeren

| Classificatie | Beschrijving | Actie vereist |
|---|---|---|
| **Major non-conformiteit** | Systeemfalen: een clausule-eis wordt niet nageleefd of een control ontbreekt volledig | Correctieve maatregel met deadline, escalatie naar directie |
| **Minor non-conformiteit** | Gedeeltelijke naleving of incidenteel falen | Correctieve maatregel met deadline |
| **Observatie** | Geen non-conformiteit, maar verbetermogelijkheid geïdentificeerd | Aanbeveling, geen verplichte actie |
| **Sterk punt** | Goede praktijk die uitstijgt boven de norm-eis | Documenteren en delen |

## 5. Rapportage

### 5.1 Auditrapport

Elk auditrapport bevat:

| Onderdeel | Inhoud |
|---|---|
| Auditscope | Welke clausules/controls zijn geauditeerd |
| Auditcriteria | Tegen welke eisen is getoetst |
| Auditdatum en -duur | Wanneer en hoe lang |
| Auditor(s) | Wie heeft de audit uitgevoerd |
| Methoden | Documentreview, interviews, observatie, technisch |
| Bevindingen | Non-conformiteiten, observaties, sterke punten |
| Conclusie | Algehele beoordeling van het geauditeerde gebied |
| Correctieve maatregelen | Vereiste acties met eigenaar en deadline |

### 5.2 Rapportage aan management

- Auditresultaten worden gerapporteerd aan de CISO en directie
- Samenvattende resultaten worden besproken in de managementreview
- Trend-analyse: vergelijking met voorgaande audits

## 6. Opvolging

- Eigenaren van non-conformiteiten voeren correctieve maatregelen uit binnen de deadline
- CISO verifieert de effectiviteit van de correctieve maatregelen
- Onopgeloste non-conformiteiten worden geëscaleerd naar directie

## 7. Auditchecklist (template)

| # | Clausule / Control | Eis | Bevinding | Bewijs | Classificatie |
|---|---|---|---|---|---|
| 1 | Clause 4.3 | ISMS scope is gedocumenteerd | | | |
| 2 | A.5.1 | Informatiebeveiligingsbeleid is goedgekeurd en gecommuniceerd | | | |
| 3 | A.5.17 | Wachtwoordbeleid wordt nageleefd | | | |
| 4 | Clause 6.1.2 | Risicobeoordeling is uitgevoerd in afgelopen 12 maanden | | | |
| ... | ... | ... | | | |

## 8. Registraties

| Registratie | Bewaartermijn |
|---|---|
| Auditprogramma | 3 jaar |
| Auditrapporten | 3 jaar |
| Correctieve maatregelen en opvolging | 3 jaar |
| Auditchecklists | 3 jaar |

## 9. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
