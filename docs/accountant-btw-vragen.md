# BTW-vragen voor mijn accountant

**Datum:** 2026-04-19
**Onderneming:** Annex27 — KBO 1006.203.170
**Huidige status:** Art. 56bis W.BTW (kleine onderneming, vrijstelling)
**Bank:** BE28 7310 7616 8920
**Activiteit:** online ISO 27001 / NIS2 compliance-platform + advies (B2B + B2C, NL/BE + EU)

---

## Aanleiding

Ik zie klanten uit meerdere landen op mijn .nl-site (hoofdzakelijk NL, toenemend BE). Ik wil de webshop zo inrichten dat per klant automatisch de juiste BTW-behandeling en factuurvermelding wordt toegepast. Ik heb de flow inmiddels zo gebouwd:

| Klantsituatie | BTW-behandeling toegepast | Factuurvermelding |
|---|---|---|
| BE particulier / BE bedrijf | 0% (Art. 56bis) | "Bijzondere vrijstellingsregeling kleine ondernemingen — Art. 56bis W.BTW" |
| NL / EU bedrijf mét VIES-valid VAT | 0% verlegd | "BTW verlegd — Art. 196 Richtlijn 2006/112/EG" |
| NL / EU particulier (of bedrijf zonder VAT) | 0% (56bis, onder €10k drempel) | idem 56bis |
| Buiten EU (UK, US, ...) | 0% | "Outside scope of EU VAT" |

Graag valideren + aanvullen waar nodig.

---

## 1. Art. 56bis + intracommunautaire diensten (kern-vraag)

**Context:** Art. 56bis geldt volgens mijn begrip voor *binnenlandse* leveringen. Voor intra-EU B2B-diensten valt de plaats van dienst normaal onder Art. 21 §2 (plaats afnemer) met verlegging.

**Vragen:**

1. Kan ik onder Art. 56bis een intra-EU B2B-dienst verlegd factureren, of moet ik daarvoor *naast* mijn 56bis-status een "gewoon" BE-BTW-nummer aanvragen voor intracommunautaire transacties?
2. Zo ja: welk registratieformulier / welke termijn? Kan ik 56bis behouden voor BE-klanten én ICP doen voor EU-B2B?
3. Als ik géén BE-BTW-nummer registreer, hoe factureer ik dan correct aan een NL-BV die met verlegging in zijn NL-aangifte wil verwerken?

## 2. ICP-aangifte (Intracommunautaire prestaties)

4. Ben ik ICP-aangifte plichtig voor elke B2B EU-dienst (plaats van dienst = afnemer) ook onder 56bis?
5. Zo ja: is dat kwartaal- of maandlisting? Welke drempel triggert maandelijks?
6. Welke data moet ik minimaal per transactie bijhouden? Ik kan alle van deze velden uit mijn order-systeem leveren: klant-BTW-nummer, land, factuurdatum, omschrijving, bedrag excl. BTW, toegepaste BTW-regel.

## 3. €10.000 EU-B2C drempel (afstandsverkopen + elektronische diensten)

7. Ik lever een deels "elektronische dienst" (SaaS-platform + documenten) en deels "consultancy" (review door mij persoonlijk). Valt mijn product volledig onder "elektronische diensten" voor de €10k-drempel, of is een splitsing nodig?
8. Als ik de €10.000 EU-B2C-grens nader: moet ik dan vooraf OSS-registreren of pas bij overschrijding? Termijnen?
9. Hoe meet ik de drempel exact — alle EU-B2C-omzet samen, of per land?

## 4. €25.000 BE-binnenland drempel (Art. 56bis)

10. Wat telt mee voor deze €25k? Alleen BE-klanten, of ook NL/EU-omzet?
11. Als ik overschrijd in jaar N: wanneer vervalt de vrijstelling — direct, of per 1 januari N+1?
12. Moet ik dan alsnog BTW heffen op BE-verkopen gedaan ná de overschrijdingsdatum?

## 5. Verplichte factuur-vermeldingen

**Ik wil één factuurtemplate die 4 scenario's correct afhandelt.** Voor elk scenario heb ik nu een vermelding (zie inleiding). Graag controleren op wettelijke volledigheid — ontbreken er verplichte velden?

Specifiek:
13. Bij reverse charge: moet ik het BE-BTW-nummer van Annex27 op de factuur vermelden (ook al zit ik onder 56bis)?
14. Bij 56bis-facturen: moet ik mijn KBO-nummer vermelden zonder BE-prefix of expliciet als "Kleine onderneming, niet BTW-geregistreerd"?
15. Bewaarplicht facturen: 7 jaar, klopt dat? Digitaal aanvaardbaar?

## 6. Historische orders onder 56bis (belangrijk!)

**Wat er is gebeurd:** Sinds de webshop live ging heeft de checkout automatisch **21% BTW bovenop de productprijs** opgeteld en doorberekend aan de klant (bv. €795 → €961,95), terwijl de factuur vervolgens aangaf "vrijgesteld van BTW onder Art. 56bis". Er is dus 21% teveel geïnd, zonder dat die BTW is afgedragen aan de fiscus (kon ook niet onder 56bis).

**Huidige stand:** 14 betaalde orders in de DB. Gemiddelde €961,95 → ±€138 teveel per order = ±€1.932 in totaal (nader te specificeren per factuur).

16. Hoe moet ik dit herstellen juridisch en boekhoudkundig?
    - Optie A: 21% terugbetalen aan klanten + creditfactuur + nieuwe factuur (netto)
    - Optie B: corrigeren via creditnota met toelichting
    - Optie C: aangeven als "diversen" en laten zitten (niet aanbevolen?)
17. Als ik terugbetaal: komt dit uit mijn omzet of als aparte retour-transactie?
18. Heb ik hierdoor een aangifte- of meldingsplicht richting FOD Financiën?

*(De nieuwe flow op de site rekent nu géén BTW meer onder 56bis — dit is gefixt per 2026-04-19.)*

## 7. NL BV of splitsing entiteiten — toekomst

Zodra ik de €25k BE-drempel nader of veel NL-klanten krijg, wordt de BTW-situatie ongemakkelijk (BE-BTW op NL-factuur is niet wat NL-klanten willen zien).

19. Zou u het aanraden om te zijner tijd een NL-BV op te richten voor de NL-markt, en de BE-KBO voor BE + EU? Of alles onder BE houden en gewoon OSS/ICP blijven doen?
20. Vanaf welk omzet-niveau wordt het fiscaal voordelig om een NL-BV te overwegen?

## 8. Praktische implementatie webshop

De website logt nu per order deze velden in de orders-tabel (aangemaakt 2026-04-19):

- `country` (ISO 2-letter)
- `customer_type` (b2c / b2b)
- `vat_number` + `vat_validated_at` (VIES)
- `vat_valid` (boolean)
- `vat_rule_applied` (exempt_56bis / exempt_56bis_eu / reverse_charge / outside_eu)
- `vat_rate` + `vat_amount` + `subtotal`

21. Zijn dit de juiste velden voor uw boekhoud-export (CSV/Exact/WinBooks)?
22. Welk exportformaat wilt u kwartaalmatig aangeleverd krijgen?

---

## Bijlage — samenvatting van mijn aannames

Voor een snelle sanity-check, graag aangeven waar mijn aannames fout zitten:

- [ ] Onder 56bis: 0% BTW op álle transacties, ongeacht klantland, zolang ik onder €25k BE-omzet + €10k EU-B2C blijf. ✅ / ❌
- [ ] Voor intra-EU B2B dien ik me sowieso te registreren voor intracommunautaire transacties (ICP-nummer). ✅ / ❌
- [ ] VIES-valideren van het afnemers-BTW-nummer is verplicht om verlegging te mogen toepassen. ✅ / ❌
- [ ] Factuurvermelding "Art. 196 Richtlijn 2006/112/EG" is correct voor verlegging naar een NL-BV. ✅ / ❌
- [ ] Facturen bewaren: 7 jaar, digitaal, inclusief onderliggende VIES-check bewijsvoering. ✅ / ❌

---

**Dank — een half uur gesprek zou voldoende moeten zijn als u punt 1, 2, 3 en 6 vooraf kunt bekijken.**
