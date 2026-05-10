# Gap-vragen editorial review v2

**Datum:** 2026-05-11
**Onderwerp:** Review van `gap-questions-v2.js` op dim-correctheid en dekking
**Reviewer:** Lead Auditor (verwerkt door automatisering, ter validatie door Raoul)

---

## Methode

Per vraag in Laag 1 (`gapQuestionsV2`) is gekeken naar de toegewezen dimensie:

| dim | Definitie | Goede indicator |
|---|---|---|
| **beleid** | Is er een vastgesteld document of regel? | Bestaan van PDF/intranet, ondertekend stuk |
| **proces** | Is er een werkende workflow? | Periodieke uitvoering, runbook, RACI in actie |
| **techniek** | Is het technisch afgedwongen of gemonitord? | Configuratie, tooling, automatische blokkade |
| **eigenaarschap** | Is iemand verantwoordelijk en bevoegd? | Naam-en-rol toegewezen, escalatiepad |
| **effectiviteit** | Wordt gemeten of het werkt? | KPI, dashboard, audit-bewijs |

**Belangrijkste leidende vraag:** "Meet deze vraag of de control werkt, of meet hij of de control bestaat?" Alleen het eerste is `effectiviteit`. Een vraag als "wordt jaarlijks gereviewd" is een proces-activiteit (bestaan), geen effectiviteits-meting.

---

## Doorgevoerde dim-correcties

| Control | Vraag | Was | Naar | Reden |
|---|---|---|---|---|
| A.5.1 | "Wordt het beleid minimaal jaarlijks gereviewed…" | effectiviteit | proces | Review-activiteit is een proces, niet een effectiviteitsmeting |
| A.5.2 | "Worden conflicterende rollen actief vermeden in kritieke processen?" | effectiviteit | proces | Vermijden van conflicten is procesuitvoering |
| A.5.3 | "Wordt minimaal halfjaarlijks gecontroleerd of geen medewerker overlappende rechten heeft?" | effectiviteit | proces | Periodieke controle = procesritme, geen meting van of de control werkt |
| A.5.17 | "Wordt MFA verplicht aangeboden voor alle accounts…" | proces | techniek | MFA is een technische maatregel; verplicht aanbieden vereist technisch afdwingen |
| A.5.17 | "Is er een procedure voor reset van vergeten wachtwoorden…" | eigenaarschap | proces | Procedure beschrijven is per definitie proces |
| A.5.31 | "Wordt minimaal jaarlijks getoetst of de organisatie nog voldoet…" | effectiviteit | proces | Jaarlijkse toetsing = proces, geen effectiviteitsmeting |

## Aanvullingen (Laag 1)

Zes controls die voorheen via de Laag-2 categorie-fallback liepen, zijn nu expliciet uitgewerkt:

| Control | Naam | Aantal vragen | Reden |
|---|---|---|---|
| **A.5.18** | Toegangsrechten | 5 | Joiner-mover-leaver is een centrale control voor DNV-audits, fallback was te generiek |
| **A.5.34** | Privacy en bescherming van persoonsgegevens (PII) | 5 | AVG-koppeling vereist concrete vragen over RoPA + DPIA + DSR-procedure |
| **A.5.35** | Onafhankelijke beoordeling van informatiebeveiliging | 4 | Onafhankelijkheid is een specifieke eis (auditor mag niet eigen werk reviewen) |
| **A.8.2** | Geprivilegieerde toegangsrechten | 5 | Privileged access wordt door DNV bijna altijd uitgevraagd; aparte vragen nodig |
| **A.8.15** | Logging | 5 | Tamper-evident logs en retention zijn aparte aandachtspunten |
| **A.8.32** | Wijzigingsbeheer | 5 | CAB-flow + rollback + failed-change-rate zijn typische audit-checks |

**Coverage:** Laag 1 dekt nu 31 expliciete controls (was 25). De resterende 62+ controls van Annex A vallen op de Laag-2 categorie-fallback, die per categorie (A.5/A.6/A.7/A.8) een rijkere set vragen genereert dan de v1-fallback.

## Bevindingen die niet zijn gewijzigd (debatable)

Sommige dim-toewijzingen blijven debat-waardig en zijn niet aangepast omdat de huidige keus verdedigbaar is:

- **A.5.1 Q2 (eigenaarschap)** — "Is het beleid formeel ondertekend door de directie?". Ondertekening is zowel beleid-vastlegging als eigenaarschap-aanwijzing. Behouden als `eigenaarschap`.
- **A.7.1 Q4 (effectiviteit)** — "Wordt fysieke toegang gelogd en periodiek gereviewed op afwijkingen?". De review-op-afwijkingen kant valt onder effectiviteit (meten of de control werkt). Behouden.
- **A.6.1 Q4 (beleid)** — "Worden zwaardere screenings toegepast bij privileged functies?". Borderline beleid/proces; "toegepast" suggereert proces, maar bewijs is dat zo'n beleidsregel bestaat. Behouden.

## Volgende stap (niet meegenomen in deze review-ronde)

- **Vragenset uitbreiden tot 45 controls in Laag 1.** De volgende prioriteit ligt bij A.5.20-A.5.22 (supplier chain), A.7.5 (physical threats), A.8.3 (access restriction), A.8.10 (information deletion), A.8.25 (SDLC), A.8.27 (secure architecture).
- **Sector-deep overlays** (zorg, SaaS, IT, bouw, overheid) zijn al actief via `applySectorDeep()` maar verdienen een eigen review-pass.

---

## Slotwoord

Voor een MKB-gap-analyse zijn 31 expliciet uitgewerkte controls + 4 rijke categorie-fallbacks ruim voldoende om de typische DNV-vragen af te dekken. De resterende ~60 controls krijgen via Laag-2 nog steeds 4 dimensie-gewogen vragen, beter dan de oude v1-template. Een volgende sessie kan dat naar 45-50 explicit uitwerken zonder de Laag-2 fallback te raken.
