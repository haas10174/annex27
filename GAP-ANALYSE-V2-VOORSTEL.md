# Gap-analyse v2 — onderzoek + voorstel

*Onderzoeksnotitie voor Raoul, 17 april 2026*

## Huidige staat (v1)

- 13 vragen verspreid over 5 categorieën (org / hr / phys / tech / risk)
- 4-punts antwoordschaal per vraag (vermoedelijk)
- Eindscore percentage + sectorprofiel met benchmark, valkuilen, prioriteiten
- Linear flow (vraag 1 → vraag 13 → resultaat)
- Resultaat-pagina met USP-comparison

**Sterk:** sectorprofielen (SaaS gevalideerd), "auditor-ready" framing, korte doorlooptijd.
**Zwak:** 13 vragen voelt anekdotisch (versus de 93 Annex A controls); geen weging per vraag; geen "waarom" per antwoord; weinig differentiatie tussen MKB-segmenten.

## Concurrentanalyse

### Vanta — vendor security audit / SOC 2-platform
**Output:** continu monitoring dashboard met "X% compliant, Y controls implemented".
**Sterk:** automatic evidence collection via integraties (AWS/GCP/Okta/etc.), live status.
**Zwak:** SOC 2-centric, weinig waarde voor MKB zonder enterprise stack; abonnement €8k+/jaar; geen Lead Auditor in de loop.
**Lessen voor Annex27:** integraties zijn voor MKB overkill, maar het idee van "live status per control" is goud waard. Voor v2: post-rapport een leesbare tracker (geen continu monitoring nu).

### Drata — vergelijkbaar met Vanta
**Output:** SOC 2 + ISO 27001 via templates + audit-prep.
**Sterk:** UI is wizard-achtig, moderne look, sterke enterprise-sales.
**Zwak:** prijsdraagvermogen MKB is laag; cookie-cutter beleid voelt generiek.
**Lessen:** wizard-format voor questionnaire werkt — opbreken in 4-5 sub-stappen ipv 1 lange lijst.

### Secureframe — middenmoter
**Output:** SOC 2 + ISO + HIPAA + PCI compliance dashboard.
**Sterk:** brede compliance-scope.
**Zwak:** zelfde patroon als Vanta — duur abonnement, weinig diepte voor MKB.
**Lessen:** geen.

### Compaas (NL) — MKB-georiënteerd
**Output:** quickscan + ISMS-templates + advies.
**Sterk:** Nederlandstalig, MKB-prijzen.
**Zwak:** geen Lead Auditor review, geen sectorprofiel, statisch rapport.
**Lessen:** zwakke concurrent — Annex27 wint op auditor-credibility en sectorprofielen.

### ISMS.online — UK / EU
**Output:** documentmanagement-platform voor ISMS, jaarabonnement.
**Sterk:** rijke template-library, audit-trail.
**Zwak:** 100% DIY, geen advies, hoge leercurve.
**Lessen:** template-pakket is een goed los product (Beleidspakket €699-1.299 al gepland).

### Conclusie concurrenten
Annex27 zit in een **uniek wit-vlak**: tussen DIY-platformen (Vanta/ISMS.online) en full-service consultants (€15k+). De propositie "auditor-led + AI-augmented voor €349" is verdedigbaar **als de gap-analyse zelf substantieel voelt** — niet als een 13-vragen quiz.

## Aanbevolen methodiek voor v2

### 1. Vraagstructuur: van 13 naar 30-40, in 6 phases
**Probleem v1:** 13 vragen voelt te dun voor "alle 93 controls" claim.
**Oplossing v2:** 30-40 vragen in 6 fases die samen alle 4 Annex A-categorieën dekken (A.5 organisatorisch, A.6 personeel, A.7 fysiek, A.8 technisch) plus de ISMS-clausules (4-10).

| Phase | # Vragen | Doel | Doorlooptijd |
|-------|---------|------|--------------|
| 1. Profiel | 4 | Sector, fte, geografische scope, hoofdproduct | 1 min |
| 2. Governance & beleid (A.5 + Cl.5,6) | 6 | Beleid, scope, risicoproces | 2 min |
| 3. Personeel (A.6) | 4 | Onboarding, training, offboarding | 1 min |
| 4. Fysiek + assets (A.7 + A.8.10-12) | 4 | Toegang kantoor, apparatuur, opslag | 1 min |
| 5. Technische controls (A.8) | 8-10 | MFA, encryptie, logging, change mgmt | 3 min |
| 6. Operationeel (Cl.7,8,9 + A.5.24-30) | 4-6 | Incident response, BC, supplier mgmt | 2 min |

Totaal: ~10 minuten ipv 5 minuten. Acceptabel mits **progress-indicator** ("Stap 3 van 6") en **save-and-resume** (localStorage).

### 2. Scoring: van flat naar gewogen + maturity
**v1 probleem:** alle vragen tellen even zwaar; flat percentage zegt niks over zwaartepunt.
**v2 voorstel:** elke vraag krijgt:
- **Gewicht 1-3** (hoe zwaar voor certificering)
- **Antwoord-rubric**: Niet aanwezig (0) → Ad-hoc (1) → Gedocumenteerd (2) → Geïmplementeerd (3) → Gemeten + verbeterd (4) — dit is het CMMI-maturity-model dat ISO-auditors zelf gebruiken
- **Score per categorie** = gewogen gemiddelde * 25 (om %-output te krijgen)

Zo krijgen MKB's geen "70%" terwijl ze beleid missen — dat is het type valstrik dat hun rapport ongeloofwaardig maakt voor enterprise-prospects.

### 3. Layout: van linear list naar kaart-flow

**Huidige UX:** alle 13 vragen in één scroll-pagina.
**Probleem:** voelt als een formulier, niet als een assessment.

**Voorstel v2:** card-based, één vraag per scherm met:
- Vraag groot, duidelijk
- Antwoorden als grote kaart-buttons (Niet aanwezig / Ad-hoc / Gedocumenteerd / Geïmplementeerd / Gemeten)
- "?" tooltip per antwoord met voorbeeld ("Ad-hoc = informeel, niet vastgelegd in een document")
- Voortgangsbalk bovenaan
- Terug-button beschikbaar
- Inline opslag (localStorage), opnieuw beginnen na refresh

Inspiratie: Typeform, Calendly. Niet: Google Forms.

### 4. Output: drie outputs ipv één
**v1:** één resultaten-pagina.
**v2:**
- **Direct na invullen:** dashboard-style overzicht (5-10 sec) met categorie-scores + 1 alinea sector-context
- **Na lead-capture (gratis):** PDF "Quickscan-rapport" met top-3 acties + benchmark — geanonimiseerd voor lead-gating
- **Na betaling (€349):** volledig rapport met alle 93 controls, evidence-prompts, prioriteiten, persoonlijke review-call

Dit creëert een natuurlijke ladder en versterkt de waarde-perceptie van het volledige pakket.

### 5. Sector-aware diepgang
**v1:** 4 sectoren met zelfde 13 vragen + sector-specifieke valkuilen achteraf.
**v2 idee:** 3-4 vragen per sector zijn unieke "diepvragen" (bv. SaaS: hoe scheid je klantomgevingen? MSP: hoe verifieer je toegang van ex-klanten?).

Risico: meer onderhoud per sector. Verstandig om eerst v2-basis live te krijgen, dan per kwartaal 1 sector verdiepen.

### 6. Wegwerken van "anekdotisch" gevoel
**v1 zwak:** sommige vragen lijken bij elkaar gegrabbeld.
**v2 fix:** elke vraag expliciet gemapt aan 1-3 Annex A controls + zichtbaar in de output ("Vraag 7 → A.8.7 Bescherming tegen malware"). Dit verhoogt het gevoel van "echt gestructureerd".

## Roadmap voor v2

| Fase | Wat | Effort | Risico |
|------|-----|--------|--------|
| **Pilot** | Bouw v2 questionnaire structure (30 vragen, weging, maturity-rubric) — alleen SaaS-sector | M | Laag — bestaand UI hergebruiken |
| **A/B test** | v1 vs v2 op nieuwe bezoekers, meet completion-rate + downstream bestelling | S | Laag |
| **Rollout** | Andere sectoren overzetten | M | Sectorprofielen valideren |
| **Lead-PDF** | Auto-generated geanonimiseerd lead-rapport | M | Risico van "te veel weggeven" |

## Antwoord op je advisera-vraag

**Mijn analyse:** Advisera (€500-€1500 toolkit) is **goed maar generiek-EN**. Voor MKB Benelux is from-scratch **beter passend** omdat:
1. Hun controls zijn UK/US-georiënteerd (geen NIS2-Belgisch, geen NEN-7510)
2. Hun templates zijn taalkundig Engels — vertaaltax + cultuurtax voor MKB-NL/BE
3. Hun scoring is statisch — geen sector-aware logica

**Slimme stap:** koop hun toolkit (~€800), gebruik als **kwaliteitsbenchmark** (welke documenten verwachten audit-instanties te zien, welke detail-diepte). Repliceer dan zelf met **NL/BE + sector-context**. Dit is wat Annex27 al doet, maar je kunt benchmarken om gaten te vinden.

Wil je dat ik dit aankoop-en-vergelijk-traject als concrete actie inplan? Dan kunnen we per kwartaal 5-10 templates verbeteren.

## Concrete next steps (geen code, eerst input van jou)

1. **v2-pilot starten?** ja/nee — als ja, ik bouw eerst de "wizard"-flow met 30 vragen voor SaaS
2. **Maturity-scoring** (5-punts) ipv huidige schaal? ja/nee
3. **Lead-PDF** automatisch generen na quickscan (gratis)? ja/nee — zo ja, voor welke segmenten
4. **Advisera benchmark-aankoop**? ja/nee/later

Geef je input dan kan ik per item executeren.
