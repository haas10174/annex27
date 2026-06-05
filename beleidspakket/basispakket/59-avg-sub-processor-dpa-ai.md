# AVG sub-processor DPA — AI-rapportgeneratie (Anthropic-context)

**AVG art. 28 + 44-46 / ISO 27001:2022 — A.5.19, A.5.21, A.5.31**

| | |
|---|---|
| **Documentnummer** | ISMS-059 |
| **Versie** | 1.0 |
| **Classificatie** | Intern + samenvatting publiek (sub-processors register) |
| **Eigenaar** | [Naam FG + CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Halfjaarlijks + bij wijziging AI-leverancier of -model |

---

## 1. Doel

Annex27 gebruikt voor het automatisch opstellen van gap-rapport-concepten een AI-model van Anthropic PBC (Claude). Dit document beschrijft:

- Welke gegevens naar Anthropic gaan
- Op welke grondslag dit gebeurt
- Hoe doorgifte buiten de EER is geregeld
- Welke mitigerende maatregelen Annex27 zelf treft

Dit document is een **beleidsdocument, geen contract** met Anthropic. De juridische verwerkersovereenkomst loopt via Anthropic's standaard DPA + Standard Contractual Clauses.

## 2. Annex27 als verwerkingsverantwoordelijke

Annex27 is verwerkingsverantwoordelijke voor de persoonsgegevens van haar klanten. Anthropic treedt op als sub-processor. De keten:

```
Klant van Annex27          (verwerkingsverantwoordelijke voor eigen data)
       |
       v
Annex27 (Haas Audits / Annex27)   (verwerker namens klant)
       |
       v
Anthropic PBC                     (sub-processor namens Annex27)
```

## 3. Welke gegevens gaan naar Anthropic?

| Categorie | Bevat | Voorbeeld |
|---|---|---|
| **Gap-antwoorden** | Score per ISO-control + toelichting | "A.5.1: score 3, toelichting: beleid is goedgekeurd op 2025-03-01" |
| **Sectorprofiel** | Sector + organisatiegrootte (indicatief) | "SaaS, 15-50 medewerkers" |
| **Bewijsvoering meta** | Type bewijs (bestand, toelichting, eigenaar, datum laatste review) | "Document: security_policy.pdf, eigenaar: CISO" |
| **Bewijsvoering toelichting (vrij tekstveld)** | Vrije tekst geschreven door klant | "Wij hebben dit beleid in 2024 geformaliseerd na een datalek-incident" |

**Wat gaat NIET naar Anthropic:**

- NAW-gegevens van klant of medewerkers
- E-mailadressen of telefoonnummers
- Geuploade bestanden zelf (alleen meta-data over upload)
- Patient- of burger-gegevens
- Financiele gegevens
- IP-adressen, useragents
- Authenticatie-tokens

## 4. Grondslag verwerking (klant naar Annex27)

De klant geeft Annex27 toegang tot bovenstaande data op basis van **uitvoering overeenkomst** (artikel 6 lid 1 sub b AVG). In de algemene voorwaarden van Annex27 is vermeld dat AI-ondersteuning onderdeel is van de rapportgeneratie. De klant kan AI-rapportgeneratie uitschakelen (handmatige rapportgeneratie); in dat geval gaat geen data naar Anthropic.

## 5. Grondslag doorgifte buiten EER

Anthropic verwerkt gegevens op infrastructuur in de **Verenigde Staten**. Voor doorgifte buiten de EER hanteert Annex27 de volgende stapeling:

| Laag | Inhoud |
|---|---|
| **1. Standard Contractual Clauses** | Anthropic standaard DPA bevat SCC's (EU 2021/914) als basis voor doorgifte |
| **2. Aanvullende technische maatregelen** | Annex27 minimaliseert data (zie sectie 3), pseudonimiseert waar mogelijk |
| **3. Aanvullende contractuele maatregelen** | Anthropic verklaart geen training op klantdata, gebruik alleen voor inference |
| **4. Aanvullende organisatorische maatregelen** | Annex27 logt alle AI-calls + heeft opt-out per klant |

## 6. Anthropic's verklaringen

Conform Anthropic's commercieel beleid (per 2025):

| Onderwerp | Anthropic-positie |
|---|---|
| **Training op klantdata** | Niet voor commerciele klanten zonder expliciete opt-in |
| **Data-bewaring** | Standaard 30 dagen voor abuse-detectie, daarna geanonimiseerde aggregatie |
| **Zero data retention (ZDR)** | Beschikbaar voor enterprise-klanten op aanvraag |
| **SOC 2 type 2** | Behaald + jaarlijks gerefresht |
| **ISO 27001** | Niet (per huidige informatie); SOC 2 als equivalent |
| **HIPAA** | Beschikbaar onder BAA voor specifieke use cases |
| **Doorgifte buiten EER** | VS-infrastructuur primair; SCC + DPA standaard |

Annex27 review deze posities halfjaarlijks via Anthropic's trust-center en publieke verklaringen.

## 7. Mitigerende maatregelen Annex27

| Maatregel | Inhoud |
|---|---|
| **Data-minimalisatie** | Alleen scores, sector, toelichting; geen NAW |
| **Pseudonimisatie** | Klant-ID is intern, niet gekoppeld aan persoon |
| **Opt-out** | Klant kan AI-generatie uitschakelen in dashboard |
| **Audit log** | Elke AI-call wordt gelogd met timestamp, klant-ID, model, token-count |
| **Tijdige verwijdering** | Annex27 stuurt geen historische data; alleen actuele gap-antwoorden per rapport |
| **Klanttransparantie** | Sub-processors-register publiek toegankelijk |
| **Alternatief** | Bij contract-conflict beschikbaar: handmatige rapportgeneratie zonder AI |

## 8. Klantcommunicatie

In de privacyverklaring van Annex27 staat een specifieke sectie over AI-ondersteuning. Klanten kunnen op verzoek:
- Een kopie van Anthropic's DPA + SCC ontvangen
- AI-rapportgeneratie uitschakelen voor hun account
- Een Data Subject Access Request indienen voor data die Anthropic in het 30-dagen abuse-detection window bewaart

## 9. Bewaring en wissing

| Type data | Bewaartermijn bij Anthropic | Bewaartermijn bij Annex27 |
|---|---|---|
| API-request input | 30 dagen voor abuse-detection (commercieel default) | Niet bewaard buiten Annex27's eigen database |
| API-response output | Niet permanent | Bewaard als rapport-concept in klant-dashboard |
| Audit-log Anthropic-zijde | Beperkt, ZDR mogelijk op aanvraag | N.v.t. |
| Audit-log Annex27-zijde | 90 dagen | 90 dagen |

## 10. Heroverweging-triggers

Annex27 heroverweegt deze sub-processor-relatie bij:

- Wijziging Anthropic-beleid over training of bewaring
- Nieuwe Europese jurisprudentie over US-cloud-doorgifte
- Vervanging EU-Trans-Atlantic Data Privacy Framework
- Significante security-incident bij Anthropic
- Beschikbaarheid van vergelijkbaar EU-gehost model (bv. Mistral, Pleias)

## 11. Wat als klant niet akkoord is met VS-doorgifte?

Annex27 biedt twee escape-routes:

1. **AI-uit**: gap-rapport wordt door Lead Auditor handmatig opgesteld. Levertijd: 5-7 werkdagen i.p.v. 48 uur.
2. **EU-only alternatief** (op de roadmap): wanneer een EU-gehost model met vergelijkbare kwaliteit beschikbaar komt, schakelt Annex27 op klantverzoek over.

---

**Bijlagen**
- Bijlage A: Lijst van Anthropic-DPA-clausules (samenvatting)
- Bijlage B: Voorbeeld API-payload (geanonimiseerd) voor transparantie
- Bijlage C: Opt-out-procedure stap voor stap

**Gerelateerde documenten**
- [[ISMS-042 Verwerkersovereenkomst (uitgaand)]]
- [[ISMS-044 Sub-processors register]]
- [[ISMS-043 Privacyverklaring (extern)]]
- [[ISMS-058 NIS2 supply chain due diligence]]
- [[Anthropic DPA + SCC]]
