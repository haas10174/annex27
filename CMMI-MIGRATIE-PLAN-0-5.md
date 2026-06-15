# Migratieplan: CMMI 0-4 → 0-5 (taak #96)

Status: **plan ter beslissing**, nog niet uitgevoerd. Datum: 16 juni 2026.

## Eerst de eerlijke vraag: moeten we dit wel doen?

De huidige schaal is al **0-4 met vijf niveaus** (0 Niet aanwezig, 1 Gepland/Initieel, 2 In ontwikkeling/Deels, 3 Geïmplementeerd/Grotendeels, 4 Geoptimaliseerd/Volledig). Dat dekt het hele spectrum en mapt schoon op ISO-volwassenheid.

De volledige CMMI-standaard heeft zes niveaus (0-5), waarbij het verschil tussen niveau 4 ("Kwantitatief beheerd", met metrics gestuurd) en niveau 5 ("Optimaliserend", continu verbeterend) subtiel is. Voor een MKB-zelfevaluatie is dat onderscheid in de praktijk nauwelijks betrouwbaar in te vullen door de klant zelf.

**Afweging:**
- *Voor:* "CMMI 0-5" is een herkenbare term; auditors en volwassenheidsmodellen gebruiken die schaal. Iets meer geloofwaardigheid.
- *Tegen:* hoge inspanning (7 bestanden + edge-functions + een eenmalige migratie van live klantdata), reële kans op inconsistente scores tijdens de overgang, en meer granulariteit dan de doelgroep kan onderscheiden. Gaat ook licht in tegen je net uitgesproken simplificatie-lijn.

**Mijn advies:** doe geen volledige numerieke migratie. Twee betere opties:
- **Optie A (aanbevolen, laag risico):** label-alignment zonder de cijfers te wijzigen. Behoud 0-4 intern, maar zet de labels expliciet in CMMI-terminologie (Niveau 0 t/m 4). Geen datamigratie, geen scorebreuk. Klaar in één pass.
- **Optie B (volledig 0-5, hoog risico):** alleen doen als je echt het zesde niveau wilt. Vereist het hele onderstaande stappenplan inclusief datamigratie.

Hieronder het volledige plan voor Optie B, zodat je een geïnformeerde keuze kunt maken.

---

## Raakpunten (volledige 0-5 migratie)

| Bestand | Wat | Wijziging |
|---|---|---|
| `scoring-v2.js:105` | `maxScore += 4` | → `+= 5` (max per vraag) |
| `dashboard.html:4824-4828` | `NIS2_CMMI_OPTIONS` | nieuw niveau 4 invoegen, oud 4→5 |
| `dashboard.html:6448` | gap-antwoordopties (Geoptimaliseerd=4) | optie 5 toevoegen + herlabelen |
| `dashboard.html:4308` | adminFillFromMode 'optimized' = score 4 | → 5 |
| `admin.html:5019` | `scoreMap {'4':3,...}` | herzien naar 0-5 |
| `admin.html:5077-5078` | label-maps in review-view | niveau 5 toevoegen |
| `generate-report/index.ts:126-131,228` | `cmmiLabel` + legenda | niveau 5 toevoegen, edge redeploy |
| `generate-findings-draft/index.ts:94-99` | `cmmiLabel` | niveau 5 toevoegen, edge redeploy |
| `mock-evidence.js:277` | testdata "0-4" | naar 0-5 |
| `gap-questions-v2.js` / `nis2-questions.js` | CMMI-schaalreferenties | tekst bijwerken |

## CMMI 0-5 labelvoorstel (NL)

- 0 — Onvolledig (niet aanwezig)
- 1 — Initieel (ad hoc, ongedocumenteerd)
- 2 — Beheerd (gepland, deels uitgevoerd)
- 3 — Gedefinieerd (gedocumenteerd, geïmplementeerd)
- 4 — Kwantitatief beheerd (gemeten met metrics) ← NIEUW niveau
- 5 — Optimaliserend (continu verbeterd) ← was 4

## Datamigratie (het risico-onderdeel)

Bestaande antwoorden staan op 0-4 in localStorage én in Postgres (`checklist_progress` / gap-answers). Zodra `maxScore` naar 5 gaat, betekent een opgeslagen "4" ineens 4/5 = 80% in plaats van 100%. Zonder migratie kelderen alle bestaande klantscores.

**Strategie:** eenmalige remap van opgeslagen waarden **oud 4 → nieuw 5** (de andere niveaus 0-3 blijven gelijk; niveau 4 is een nieuw, nog leeg niveau). Concreet:
1. Postgres-migratie (SQL `UPDATE ... SET value='5' WHERE value='4'`) op de antwoord-tabel, met backup vooraf.
2. Client-side eenmalige migratie van `localStorage` antwoorden bij eerstvolgende dashboard-load (versie-vlag zodat het maar één keer draait).
3. Pas daarna de UI/scoring naar 0-5 deployen, zodat data en schaal tegelijk omklappen (geen tussenstaat met verkeerde percentages).

## Uitvoervolgorde (Optie B)

1. Backup van de antwoord-tabel.
2. Data-migratie 4→5 (Postgres + localStorage-vlag).
3. Code: scoring-v2, dashboard, admin, mock-evidence, vragenbestanden.
4. Edge-functions: generate-report + generate-findings-draft (label + legenda), redeploy.
5. Verifiëren: bestaande testklant houdt zelfde percentage; nieuwe niveau-4/5 keuzes werken; rapport toont correcte labels.
6. Deploy site.

## Verificatie-checklist

- [ ] Bestaande klant: zelfevaluatie-% identiek vóór en na (binnen afronding).
- [ ] Nieuw niveau 4 en 5 selecteerbaar en correct gescoord.
- [ ] Rapport-PDF en findings-draft tonen de 0-5 labels + legenda.
- [ ] Geen control toont >100% of een negatieve sprong.

---

**Beslissing nodig van Raoul:** Optie A (label-alignment, laag risico) of Optie B (volledige 0-5 met datamigratie)? Bij A ben ik snel klaar; bij B voer ik bovenstaande stappen in volgorde uit.
