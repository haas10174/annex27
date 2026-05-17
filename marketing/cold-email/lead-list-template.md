# Lead-lijst template voor cold email-campagne

## Google Sheet structuur

Maak een nieuwe Google Sheet met deze kolommen:

| Kolom | Type | Voorbeeld | Bron |
|---|---|---|---|
| A. Bedrijfsnaam | tekst | Voorbeeld B.V. | KvK / LinkedIn |
| B. Sector | dropdown | SaaS / Zorg / IT-MSP / Overheid / Bouw / Finance | SBI-code KvK |
| C. FTE | nummer | 75 | KvK / LinkedIn |
| D. Omzet | nummer | 12000000 | KvK jaarverslag |
| E. Plaats | tekst | Utrecht | KvK |
| F. Decision-maker voornaam | tekst | Mark | LinkedIn |
| G. Decision-maker achternaam | tekst | de Vries | LinkedIn |
| H. Functietitel | tekst | CISO | LinkedIn |
| I. Email | email | m.devries@bedrijf.nl | Hunter.io / Apollo |
| J. LinkedIn URL | URL | linkedin.com/in/mdevries | LinkedIn |
| K. Bron | dropdown | KvK / LinkedIn / Apollo / Hunter | — |
| L. Status | dropdown | pending / sent / opened / replied / qualified / closed / unsubscribed | — |
| M. Verzonddatum mail 1 | datum | 2026-05-18 | — |
| N. Verzonddatum mail 2 | datum | =M2+3 | formule |
| O. Verzonddatum mail 3 | datum | =M2+10 | formule |
| P. Notes | tekst | "Net NIS2-blogpost gepubliceerd" | — |
| Q. Geverifieerd | checkbox | TRUE | email-verificatie |

## Targeting-criteria

**Direct NIS2-plichtig (priority A)**:
- ≥50 fte OR >€10M omzet
- Sector valt onder Annex I (essentieel) of Annex II (belangrijk) van NIS2
- Vestiging in NL of BE

**Indirect via supply chain (priority B)**:
- IT-leveranciers / SaaS-bedrijven die enterprise-klanten hebben
- Audit-vraag in pijplijn binnen 12 maanden

## Sectoren met hoogste fit

| Sector | NIS2-status | SBI-code | Annex27-fit |
|---|---|---|---|
| Cloud services | Essentieel | 62.01, 63.11 | Zeer hoog |
| IT-dienstverlening | Belangrijk | 62.09 | Hoog |
| SaaS-bedrijven | Belangrijk | 62.01 | Hoog |
| Zorginstellingen | Essentieel | 86.* | Hoog (ook NEN 7510) |
| Datacenters | Essentieel | 63.11 | Hoog |
| Telecom | Essentieel | 61.* | Medium |
| Banken | Essentieel | 64.* | Medium (DORA-overlap) |
| Verzekeraars | Essentieel | 65.* | Medium |
| Energie | Essentieel | 35.* | Medium |
| Voedselproductie | Belangrijk | 10.* | Medium |
| Vervoer/logistiek | Essentieel | 49.*, 52.* | Medium |

## Bronnen om 100 leads te bouwen

### Optie 1 — KvK Handelsregister (gratis)
1. Ga naar kvk.nl/zoeken
2. Filter SBI-code uit lijst hierboven
3. Filter aantal personeelsleden 50-500
4. Filter provincies (begin met Noord-Holland, Zuid-Holland, Utrecht, Brabant)
5. Export resultaten naar Excel (max 50 per keer)

Verwacht: 25-50 leads per uur handmatig werk.

### Optie 2 — LinkedIn Sales Navigator (€80/mnd)
1. Filter Account: bedrijfsgrootte 51-200 + 201-500, branche, land NL/BE
2. Lead-filter: functietitel "CISO", "Chief Information Security Officer", "Information Security Manager", "Compliance Officer", "IT Manager"
3. Save searches voor latere automation
4. Export max 25 leads per dag (LinkedIn-limiet)

Verwacht: 200-500 leads per maand.

### Optie 3 — Apollo.io (€50/mnd voor 1000 emails)
1. Filter persona's: CISO + Info Sec + IT Director + Compliance
2. Filter bedrijven: 51-500 fte, NIS2-sectoren, NL+BE
3. Apollo verifieert emails automatisch (95% accuracy)
4. Export naar CSV
5. Importeer in Instantly.ai

Verwacht: 100 leads in 2 uur werk.

### Optie 4 — Hunter.io (€34/mnd voor 500 zoekopdrachten)
Use case: je hebt bedrijfsnamen uit KvK, maar geen emails.
1. Voer domein in (bv. bedrijf.nl)
2. Hunter zoekt automatisch alle bekende email-patronen
3. Filter op functietitels
4. Export

Verwacht: aanvulling op KvK-leads.

## Verificatie vóór verzenden

1. Email-syntax check (Instantly/Lemlist doet dit automatisch)
2. MX-record check (idem)
3. Bounce-test op een paar leads voordat je hele lijst stuurt
4. NIET versturen vanaf nieuwe inbox zonder 2-weken warming-period

## Wat NIET doen

- ❌ Lijst kopen van derden (vaak verouderd, AVG-risico)
- ❌ Personalisatie overslaan (template-mail = direct in spam)
- ❌ Meer dan 100 mails/dag per inbox (deliverability crash)
- ❌ Mails sturen naar info@... (generieke inboxen worden genegeerd)
- ❌ Volgen op weekend/avond (lijkt automated)
