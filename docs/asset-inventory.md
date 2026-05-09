# Asset Inventory — Annex27

**Doel.** Overzicht van alle externe services waar Annex27 afhankelijk van is, met provider, gebruik, kritikaliteit en de plek waar bijbehorende credentials liggen. Dit register voldoet aan **ISO 27001:2022 control 5.9 (Inventory of information and other associated assets)** en aan **5.16 / 8.24 (Identity & cryptographic key management)**.

**Eigenaar.** Raoul Haas (info@annex27.nl). Verantwoordelijk voor onderhoud, kwartaalreview en rotatie van credentials.

**Reviewfrequentie.** Elk kwartaal (start van Q2/Q3/Q4/Q1), bij elke nieuwe of vervallen service, en altijd na een security-incident.

**Vault.** Credentials staan **niet** in dit bestand. De kolom *Vault-verwijzing* gebruikt `bw://annex27/<service>` als pad-conventie naar de Bitwarden-organisatie "Annex27". Indien Bitwarden niet beschikbaar: zelfde structuur in 1Password of KeePassXC.

**Rotatiebeleid.**
- Hoog-kritiek: minstens 1× per 12 maanden of direct na verdacht voorval.
- Midden-kritiek: minstens 1× per 24 maanden.
- Laag-kritiek: alleen bij voorval.
- Acuut: bij elke vermoede leak (bv. credential in chat of repo) → binnen 24 uur roteren.

---

## Service-register

| Service | Provider | Doel | Regio | Kritikaliteit | Vault-verwijzing | Laatste rotatie | Volgende review |
|---------|----------|------|-------|---------------|------------------|-----------------|-----------------|
| Hostnet | Hostnet (NL) | Webhosting annex27.nl + DNS + info@-mailbox + FTP-deploy | NL | Hoog | bw://annex27/hostnet | — | 2026-08-09 |
| Supabase | Supabase | Database, auth, edge functions, storage | EU (Ierland) | Hoog | bw://annex27/supabase | — | 2026-08-09 |
| Mollie | Mollie | Betalingen iDEAL/Bancontact/cards (live + test API) | EU | Hoog | bw://annex27/mollie | 2026-05-09 (live key) | 2027-05-09 |
| Resend | Resend | Transactionele mail (betalingsbevestiging) | EU (Ierland) | Midden | bw://annex27/resend | 2026-05-09 | 2028-05-09 |
| GitHub | GitHub | Source control haas10174/annex27 + GitHub Pages backup | Globaal | Hoog | bw://annex27/github | — | 2026-08-09 |
| Google Cloud (GA4) | Google | Analytics service-account voor realtime dashboard | Globaal | Laag | bw://annex27/ga4-service-account | **rotatie nodig** (key in chat verschenen 2026-04) | 2026-05-15 |
| Google Ads | Google | Marketing-campagnes ISO 27001 hoofdkeywords | Globaal | Laag | bw://annex27/google-ads | — | 2026-11-09 |
| Anthropic API | Anthropic | LLM voor AI-rapport-generatie (generate-report edge function) | US | Midden | bw://annex27/anthropic | — | 2028-05-09 |
| Partena | Partena | Boekhouding, BTW-aanvraag, KBO 1006.203.170 | BE | Hoog | bw://annex27/partena | — | 2026-08-09 |
| Bank (zakelijk) | Bunq / ING / KBC / etc. | Zakelijke rekening IBAN BE28 7310 7616 8920 | BE | Hoog | bw://annex27/bank | — | 2026-08-09 |
| info@annex27.nl mailbox | Hostnet | Inbox voor klantcommunicatie + Supabase admin | NL | Hoog | bw://annex27/info-mailbox | — | 2026-08-09 |
| Domein-registratie annex27.nl | Hostnet | Domeinnaam | NL | Hoog | bw://annex27/hostnet | — | bij vervaldatum |
| DNV / IRCA Lead Auditor account | DNV | Persoonlijk auditor-certificaat | EU | Hoog | bw://annex27/dnv-irca | — | bij hercertificering |

---

## Toelichting kolommen

- **Kritikaliteit**: impact bij compromittering of uitval.
  - **Hoog**: directe schade aan productie, klantdata of betaalstroom.
  - **Midden**: degradatie van service, herstelbaar binnen uren-dagen.
  - **Laag**: marketing- of analytics-impact, geen klantschade.
- **Laatste rotatie**: laatste keer dat het wachtwoord of API-key is vervangen.
- **Volgende review**: datum waarop dit register gecheckt moet worden voor deze service. Niet automatisch hetzelfde als rotatie — een service mag onaangeraakt blijven, maar de inventarisatie moet kloppen.

---

## Acute taken bij eerste invulling

Markering **rotatie nodig** in de kolom *Laatste rotatie* duidt op een credential die al lekte of in een onveilig kanaal verscheen. Volgorde van afhandeling:

1. GA4 service-account key — private key zat in chat (april 2026). Genereer nieuwe key in Google Cloud Console → IAM → Service Accounts → Keys → delete oude, create nieuwe → vervang `GA4_SERVICE_ACCOUNT_JSON` secret in Supabase.
2. Mollie live-key `live_gH2xaf6...` — verschenen in chat 2026-05-09. Roteren na succesvolle live-test.
3. Resend API key `re_EQSi...` — verschenen in chat 2026-05-09. Roteren na succesvolle mail-test.

Voor elke rotatie: nieuwe key aanmaken vóór oude wordt ingetrokken om downtime te voorkomen.

---

## Wijzigingsproces

Een nieuwe service of provider toevoegen aan deze lijst:

1. Service aanmaken (account, betaalwijze instellen).
2. Credentials direct in vault zetten — niet in chat, e-mail, ticket of repo.
3. Rij toevoegen aan dit document, kolom *Vault-verwijzing* invullen.
4. Pull request maken voor review (1-persoons project: zelf-merge na 24u afkoeling).

Een service verwijderen:

1. Account opzeggen of de access intrekken.
2. Credentials uit vault wissen.
3. Rij in dit document doorhalen met `~~strikethrough~~` en datum + reden in een commentaarregel onder de tabel — niet hard verwijderen, voor audit-trail.

---

## Audit-trail

Wijzigingen aan dit document zijn traceerbaar via `git log docs/asset-inventory.md`. Per kwartaal-review wordt onderaan een regel toegevoegd:

```
## Reviews
- 2026-05-09 — Initiële inventaris opgesteld door Raoul Haas. Acute taken: GA4-key, Mollie live-key en Resend-key roteren na live-test.
```

## Reviews

- **2026-05-09** — Initiële inventaris opgesteld door Raoul Haas. Acute taken: GA4-key, Mollie live-key en Resend-key roteren na live-test (nog niet uitgevoerd).
