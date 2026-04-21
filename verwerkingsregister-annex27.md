# Verwerkingsregister Annex27 (AVG Art. 30)

**Versie:** 1.0
**Datum:** 2026-04-22
**Eigenaar:** Annex27 (KBO 1006.203.170, BTW BE1006.203.170)
**Contact:** info@annex27.nl

Dit register beschrijft de persoonsgegevens-verwerkingen van Annex27 zelf, conform artikel 30 AVG. Annex27 treedt op in twee rollen:

- **Verwerkingsverantwoordelijke** voor eigen website-bezoekers, leads, kopers en account-houders.
- **Verwerker** voor klanten die het Annex27-platform gebruiken om hun eigen ISO 27001-dossier op te bouwen (conform de [Verwerkersovereenkomst](https://annex27.nl/verwerkersovereenkomst)).

---

## Deel A — Verwerkingen waar Annex27 verwerkingsverantwoordelijke is

### A1. Website-bezoekers (analytics)

| Veld | Inhoud |
|---|---|
| Doel | Meten sitegebruik + conversie voor productverbetering en marketing |
| Grondslag | Toestemming (art. 6 lid 1 sub a) — Consent Mode v2 banner |
| Betrokkenen | Bezoekers annex27.nl / annex27.be |
| Categorieën persoonsgegevens | IP (geanonimiseerd), pseudonieme device-ID, paginaweergaven, referrer, user-agent |
| Ontvangers | Google LLC (GA4) — verwerker, DPA actief |
| Doorgifte buiten EER | VS (Google) — SCC + aanvullende maatregelen |
| Bewaartermijn | 14 maanden (GA4 default), consent-cookie 12 maanden |
| Beveiliging | IP-anonimisering, cookieless bij weigering, eigen cookie-banner met opt-in |

### A2. Waitlist / leads

| Veld | Inhoud |
|---|---|
| Doel | Contact opnemen over productlancering en relevante updates |
| Grondslag | Toestemming (art. 6 lid 1 sub a) |
| Betrokkenen | Personen die zich aanmelden op de waitlist |
| Categorieën persoonsgegevens | E-mailadres, optioneel naam en bedrijfsnaam |
| Ontvangers | Supabase (hosting) — verwerker, DPA actief |
| Doorgifte buiten EER | Nee (Supabase EU-region) |
| Bewaartermijn | 12 maanden na laatste interactie of tot uitschrijving |
| Beveiliging | RLS, TLS 1.2+, AES-256 at rest |

### A3. Kopers (orders + facturen)

| Veld | Inhoud |
|---|---|
| Doel | Uitvoering overeenkomst, facturatie, wettelijke bewaarplicht |
| Grondslag | Overeenkomst (art. 6 lid 1 sub b) + wettelijke verplichting (art. 6 lid 1 sub c — BE BTW-wet, fiscale bewaarplicht) |
| Betrokkenen | Kopers (natuurlijke personen of contactpersoon rechtspersoon) |
| Categorieën persoonsgegevens | Naam, factuuradres, e-mail, BTW-nummer, ordergegevens, betaalreferenties |
| Ontvangers | Mollie (betaalverwerker), Supabase (hosting), boekhouder (op verzoek) |
| Doorgifte buiten EER | Nee (Mollie NL, Supabase EU) |
| Bewaartermijn | 7 jaar na einde boekjaar (fiscale bewaarplicht BE) |
| Beveiliging | RLS, TLS, AES-256, MFA op admin-accounts |

### A4. Platform-accounts

| Veld | Inhoud |
|---|---|
| Doel | Authenticatie en toegang tot dashboard, gap-analyse, rapporten |
| Grondslag | Overeenkomst (art. 6 lid 1 sub b) |
| Betrokkenen | Geregistreerde gebruikers |
| Categorieën persoonsgegevens | E-mail, gehasht wachtwoord (bcrypt), sessietokens, last-login, IP van login |
| Ontvangers | Supabase (hosting + Auth) |
| Doorgifte buiten EER | Nee |
| Bewaartermijn | Tot verwijderingsverzoek + 30 dagen soft-delete |
| Beveiliging | Wachtwoord-hashing, optionele MFA, rate-limiting, audit-log toegang documenten |

### A5. Contact- en responsible-disclosure-mails

| Veld | Inhoud |
|---|---|
| Doel | Beantwoorden vragen, afhandelen security-meldingen |
| Grondslag | Gerechtvaardigd belang (art. 6 lid 1 sub f) |
| Betrokkenen | Iedereen die e-mailt naar info@ / security@annex27.nl |
| Categorieën persoonsgegevens | E-mail, naam, inhoud van correspondentie |
| Ontvangers | E-mailprovider (Hostnet / Microsoft 365) |
| Doorgifte buiten EER | Afhankelijk provider (zie subverwerkerslijst) |
| Bewaartermijn | 24 maanden, langer indien relevant voor afhandeling incident |
| Beveiliging | TLS, MFA-afgedwongen mailbox |

---

## Deel B — Verwerkingen waar Annex27 verwerker is (namens klant)

Bij gebruik van het platform kunnen klanten persoonsgegevens uploaden (bv. in evidence-documenten of assessment-antwoorden) van hun eigen personeel, leveranciers of klanten. In die context treedt Annex27 op als verwerker conform de [Verwerkersovereenkomst](https://annex27.nl/verwerkersovereenkomst).

### B1. Evidence-uploads

| Veld | Inhoud |
|---|---|
| Doel | Klant in staat stellen auditbewijs te centraliseren voor ISO 27001-traject |
| Grondslag | Bepaald door klant (verwerkingsverantwoordelijke) |
| Categorieën | Afhankelijk van klant — kan NAW, functies, contactgegevens bevatten |
| Bewaartermijn | Conform klant-instructie, default 2 jaar na contract-einde, dan veilig verwijderd |
| Beveiliging | Private bucket, RLS op klant-ID, toegangslog per download |

### B2. Assessment-antwoorden + AI-gegenereerde rapporten

| Veld | Inhoud |
|---|---|
| Doel | Gap-analyse uitvoeren en rapport genereren |
| Grondslag | Bepaald door klant |
| Verwerker-keten | Anthropic (AI-provider, DPA actief, EU-data-residency waar beschikbaar) |
| Bewaartermijn | Tot klant verwijdert of contract eindigt |
| Beveiliging | Prompts worden niet gebruikt voor training (contractueel vastgelegd met Anthropic) |

---

## Subverwerkers

Volledige en actuele lijst in [Verwerkersovereenkomst bijlage B](https://annex27.nl/verwerkersovereenkomst). Samenvatting:

| Subverwerker | Doel | Locatie | DPA |
|---|---|---|---|
| Supabase Inc. | DB + Auth + Storage + Edge Functions | EU (eu-west) | Ja |
| Mollie B.V. | Betaalverwerking | Nederland | Ja |
| Hostnet B.V. | Webhosting statische site + mail | Nederland | Ja |
| Anthropic PBC | AI-inferentie (rapport-generatie) | EU/VS (SCC) | Ja |
| Google LLC | Analytics (GA4, alleen bij consent) | EU/VS (SCC) | Ja |

---

## Algemene beveiligingsmaatregelen (art. 30 lid 1 sub g)

### Technisch
- TLS 1.2+ voor alle transport
- AES-256 at-rest encryptie (Supabase standaard)
- Row-Level Security op alle tabellen met klant- of persoonsgegevens
- Private storage buckets, signed URLs met korte levensduur
- MFA-verplicht op admin- en auditor-accounts
- Wekelijkse offsite backup (GitHub private repo, immutable via git history)
- Restore-procedure gedocumenteerd, per kwartaal getest
- Rate-limiting op publieke endpoints
- Audit-log op alle document-toegang

### Organisatorisch
- Toegang op least-privilege basis
- Geheimhoudingsverklaring met alle subverwerkers
- Incident-respons-procedure met 72-uur meldtermijn bij datalek (art. 33 AVG)
- Data-subject-rights-procedure (inzage, rectificatie, verwijdering, dataportabiliteit)
- Jaarlijkse review van dit register

---

## Rechten van betrokkenen

Betrokkenen kunnen via info@annex27.nl beroep doen op hun rechten:
- Inzage (art. 15)
- Rectificatie (art. 16)
- Verwijdering (art. 17)
- Beperking (art. 18)
- Dataportabiliteit (art. 20)
- Bezwaar (art. 21)

Wij reageren binnen 30 dagen. Klacht indienen kan bij:
- **NL:** Autoriteit Persoonsgegevens — autoriteitpersoonsgegevens.nl
- **BE:** Gegevensbeschermingsautoriteit — gegevensbeschermingsautoriteit.be

---

## Wijzigingshistorie

| Versie | Datum | Wijziging |
|---|---|---|
| 1.0 | 2026-04-22 | Eerste publicatie — initieel register bij productlancering |
