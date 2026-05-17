# Cold email sequence voor MKB-CISO's

Verstuur vanaf `info@annex27.nl` via Instantly.ai of Lemlist.
Vooraf: SPF/DKIM/DMARC checken voor annex27.nl-domein (zie Hostnet).

**Volume-richtlijn**: max 100 mails per dag per inbox. Bij 4 inboxen rotatie kan dat naar 400/dag.

**AVG-compliance**: B2B legitimate interest (Art. 6(1)(f)) is OK mits:
- Ontvanger is B2B-professional in relevante functie
- Onderwerp matcht hun functie
- Opt-out in elke mail (P.S. regel)
- Direct verwijderen op verzoek

---

## EMAIL 1 — Initial outreach

**Subject A/B test variants:**
- `[Bedrijfsnaam] en NIS2 op 1 juli 2026`
- `Korte vraag over NIS2 bij [Bedrijfsnaam]`
- `[Voornaam], 3 minuten over compliance`

**Body** (personalisatie-velden tussen `{{...}}`):

```
Beste {{voornaam}},

{{bedrijfsnaam}} valt waarschijnlijk onder NIS2 — uw bedrijfsgrootte en
sector ({{sector}}) plaatsen u onder de "belangrijke entiteiten".
De Nederlandse Cyberbeveiligingswet treedt 1 juli in werking. Boetes
lopen op tot €7M of 1,4% wereldwijde omzet, plus persoonlijke
bestuurdersaansprakelijkheid.

Wat de meeste MKB-bedrijven onderschatten: 90% van wat NIS2 vraagt
zit ook in ISO 27001. Met een gap-analyse weet u in 30 minuten precies
wat u al heeft en wat de remediatie-prioriteiten zijn.

Vrijblijvend: gratis 3-minuten quickscan op annex27.nl/gap-analyse.
Direct beeld van uw status, geen sales-call, geen registratie.

Of liever 15 min telefonisch sparren? Stuur me een tijdslot terug.

Met vriendelijke groet,

{{afzender}}
Annex27 · IRCA-gecertificeerd
annex27.nl · info@annex27.nl

P.S. Niet relevant? Antwoord met "verwijder" en ik haal u uit de lijst.
```

---

## EMAIL 2 — Follow-up 1 (verstuur na 3 dagen)

**Subject**: `Re: NIS2 — kort vraagje`

**Body**:

```
Beste {{voornaam}},

Korte vervolgvraag op mijn eerdere bericht: weet uw directie al dat zij
persoonlijk aansprakelijk wordt voor NIS2-compliance vanaf 1 juli?
Veel bestuurders ontdekken dit pas bij de eerste audit-vraag.

Voor {{sector}}-bedrijven van uw omvang is de pre-audit-check meestal
binnen 6 weken te doen. Eerst gap-analyse (€795), dan beleidspakket
(€395), dan klaar voor certificering door BSI/LRQA/TÜV.

Quickscan blijft beschikbaar: annex27.nl/gap-analyse.

Met vriendelijke groet,
{{afzender}}
```

---

## EMAIL 3 — Final value-drop (verstuur na 7 dagen)

**Subject**: `Laatste — NIS2-checklist {{sector}}`

**Body**:

```
Beste {{voornaam}},

Laatste bericht. Bijgevoegd: NIS2-checklist specifiek voor
{{sector}}-bedrijven van 50-500 fte. Geen email-vereist,
direct beschikbaar op annex27.nl/nis2 (sectie "Stap 2: verplichtingen").

Als NIS2 op uw radar staat en u wilt sparren met een IRCA-gecertificeerde
Lead Auditor, weet u me te vinden.

Met vriendelijke groet,
{{afzender}}
```

---

## Sequence-instellingen in Instantly/Lemlist

- **Dag 1**: Email 1
- **Dag 4**: Email 2 (3 dagen na mail 1)
- **Dag 11**: Email 3 (7 dagen na mail 2)
- **Daarna**: STOP — lead naar "cold" status. Geen 4e mail.

**Reply detection**: zodra ontvanger antwoordt, sequence direct stoppen.

**Open-tracking**: AAN. Hoge opens zonder reply = bewust ignored. Lage opens = mail komt niet aan (deliverability-probleem checken).

**Bounce-handling**: hard bounce = direct verwijderen uit lijst en markeren als invalid email. Soft bounce = na 2x verwijderen.

---

## Verwachte resultaten

| Metric | Realistisch |
|---|---|
| Open rate | 30-45% |
| Reply rate | 3-8% |
| Positieve reply | 1-3% |
| Demo/call booked | 0,5-1,5% |
| Klant binnen 90 dagen | 0,1-0,3% |

Bij 100 mails/dag = 1-3 mensen die zinvol terug-mailen = realistisch 1 klant per ~500-1000 mails.
