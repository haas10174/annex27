# Privacyverklaring-update — 13 mei 2026

**Aanleiding:** introductie van automatische relevantie-toets op bewijs-uploads via Mistral AI (EU-hosted).

**Toe te voegen aan annex27.nl/privacy** in sectie "Verwerkers en sub-processors":

---

## Geautomatiseerde relevantie-toets op bewijs-uploads

Wanneer u in uw dashboard een bewijs uploadt (bijvoorbeeld een procedure, screenshot, log of foto) ter onderbouwing van een ISO 27001-, NIS2- of BIO-control, voert Annex27 daarop een **geautomatiseerde relevantie-toets** uit. Deze toets beoordeelt of de inhoud van uw upload onderwerp-matig aansluit bij de gestelde vraag, en kent een score tussen 0 en 1 toe. Deze score wordt zichtbaar in uw dashboard naast uw zelf-evaluatie en helpt de Lead Auditor bij prioritering tijdens de pre-audit.

**Verwerker voor deze functie:** Mistral AI SAS (Parijs, Frankrijk). De toets wordt uitgevoerd op EU-grondgebied via het Europese endpoint van Mistral. Er vindt geen doorgifte naar derde landen plaats.

**Welke gegevens worden verwerkt:** geëxtraheerde tekst uit het door u geüploade bestand, de bijbehorende control-naam en vraag, en optioneel uw toelichting bij de upload.

**Bewaartermijn bij Mistral AI:** 0 dagen. De API-call is stateless en data wordt niet voor training gebruikt (Mistral "no-train"-garantie).

**Grondslag (AVG):** artikel 6 lid 1 sub b - uitvoering van de overeenkomst tussen u en Annex27. Het gebruik van de relevantie-toets is een onderdeel van de dienstverlening die u afneemt.

**Bezwaar:** u kunt te allen tijde aangeven dat u liever zonder geautomatiseerde toets werkt. Stuur een e-mail naar info@annex27.nl met het verzoek "geen automatische relevantie-toets". De Lead Auditor doet dan handmatig de inhoudelijke beoordeling, zonder verschil in eindresultaat.

---

## Verwerkingsregister-aanpassing (intern)

Aan het Register van Verwerkingsactiviteiten (Art. 30 AVG) toevoegen:

| Veld | Inhoud |
|---|---|
| Verwerkingsdoel | Geautomatiseerde relevantie-toets op klant-bewijs-uploads, ter ondersteuning van de Lead Auditor pre-audit |
| Categorieën betrokkenen | Klanten van Annex27 (zakelijk + zzp), in beperkte gevallen medewerkers wier naam in geüpload bewijs voorkomt |
| Categorieën gegevens | Geëxtraheerde tekst uit upload (kan incidenteel persoonsgegevens bevatten), control-context, klant-toelichting |
| Ontvangers | Mistral AI SAS (verwerker), Annex27 (verwerkingsverantwoordelijke) |
| Doorgiften naar derde landen | Nee, EU-hosted endpoint |
| Bewaartermijn | Mistral: stateless, 0 dagen. Annex27: relevance-score wordt 7 jaar bewaard ten behoeve van auditverdediging |
| Beveiligingsmaatregelen | TLS in transit, Bearer-token-authenticatie, no-train-flag op API-call, encryptie at rest in Supabase |

## DPA-aanpassing klant (later op te pakken)

Toe te voegen aan de Annex27 verwerkersovereenkomst, in de sub-processor-lijst:

| Sub-processor | Land | Functie | Datum toegevoegd |
|---|---|---|---|
| Mistral AI SAS | Frankrijk (EU) | Geautomatiseerde relevantie-toets op bewijs-uploads | 2026-05-13 |

Bestaande klanten dienen geïnformeerd te worden van deze sub-processor-toevoeging (Art. 28 lid 2 AVG - voorafgaande toestemming of bezwaarmogelijkheid).

## Mistral-contract (later op te pakken)

Action items voor commerciële DPA met Mistral AI SAS:

1. Mistral Business / Enterprise plan kiezen waarin "no-train" + "EU-data-residency" expliciet contractueel zijn vastgelegd
2. Mistral DPA aanvragen via legal@mistral.ai of via console.mistral.ai - billing/contracts
3. Geconsolideerde verwerkersovereenkomst tekenen
4. Datum + ondertekenaar opnemen in Annex27 vendor-register
