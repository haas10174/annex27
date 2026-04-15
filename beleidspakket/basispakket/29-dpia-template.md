# Data Protection Impact Assessment (DPIA) Template

**AVG Artikel 35 / ISO 27001:2022 — A.5.34**

| | |
|---|---|
| **Documentnummer** | ISMS-041 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam CISO / FG / Privacyverantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |

---

## 1. Identificatie

| | |
|---|---|
| **Naam van de verwerking** | [Beschrijf de verwerking, bijv. "Implementatie nieuw HR-systeem"] |
| **Verantwoordelijke afdeling** | [Afdeling] |
| **Projecteigenaar** | [Naam + functie] |
| **DPIA uitgevoerd door** | [Naam + functie] |
| **Datum uitvoering** | [DD-MM-JJJJ] |
| **Functionaris Gegevensbescherming geraadpleegd** | [Ja/Nee/N.v.t. — naam FG indien ja] |

---

## 2. Wanneer is een DPIA verplicht?

Een DPIA is verplicht wanneer een verwerking **waarschijnlijk een hoog risico** inhoudt voor de rechten en vrijheden van betrokkenen. Dit is in ieder geval het geval bij:

- [ ] Systematische en uitgebreide beoordeling van persoonlijke aspecten (profilering)
- [ ] Grootschalige verwerking van bijzondere categorieën persoonsgegevens
- [ ] Stelselmatige en grootschalige monitoring van openbaar toegankelijke ruimten
- [ ] Gebruik van nieuwe technologieën
- [ ] Geautomatiseerde besluitvorming met rechtsgevolgen
- [ ] Grootschalige verwerking van gegevens over kinderen
- [ ] Verwerking die kan leiden tot uitsluiting of discriminatie

**Conclusie:** Een DPIA is [wel/niet] verplicht voor deze verwerking.

---

## 3. Beschrijving van de verwerking

### 3.1 Doel van de verwerking

| | |
|---|---|
| **Wat is het doel?** | [Beschrijf waarom deze verwerking noodzakelijk is] |
| **Welk probleem lost het op?** | [Beschrijf het achterliggende bedrijfsdoel] |

### 3.2 Welke persoonsgegevens worden verwerkt?

| Categorie | Specifieke gegevens | Bijzondere categorie? |
|---|---|---|
| Identificatiegegevens | [Naam, adres, geboortedatum, BSN] | [Ja/Nee] |
| Contactgegevens | [E-mail, telefoon, adres] | Nee |
| Financiële gegevens | [Bankrekeningnummer, salaris, schulden] | Nee |
| Werkgerelateerd | [Functie, beoordelingen, verzuim] | Nee |
| Gezondheidsgegevens | [Medische informatie, arbeidsongeschiktheid] | Ja — bijzonder |
| Locatiegegevens | [GPS, IP-adres, badge-registratie] | Nee |
| Gedragsgegevens | [Browsegeschiedenis, app-gebruik, klikgedrag] | Nee |
| Biometrische gegevens | [Vingerafdruk, gezichtsherkenning] | Ja — bijzonder |
| [Overige] | [Beschrijf] | [Ja/Nee] |

### 3.3 Wie zijn de betrokkenen?

| Categorie betrokkenen | Geschat aantal | Kwetsbare groep? |
|---|---|---|
| [Medewerkers] | [Aantal] | [Ja/Nee] |
| [Klanten] | [Aantal] | [Ja/Nee] |
| [Sollicitanten] | [Aantal] | [Ja/Nee] |
| [Kinderen] | [Aantal] | Ja |
| [Overige] | [Aantal] | [Ja/Nee] |

### 3.4 Hoe worden de gegevens verzameld?

- [ ] Direct van de betrokkene (formulier, interview, registratie)
- [ ] Via een derde partij (leverancier, overheid, openbare bron)
- [ ] Automatisch gegenereerd (logging, tracking, sensoren)
- [ ] Overige: [beschrijf]

### 3.5 Hoe worden de gegevens verwerkt?

| Aspect | Beschrijving |
|---|---|
| **Verwerkingsactiviteiten** | [Verzamelen, opslaan, analyseren, delen, verwijderen — beschrijf de flow] |
| **Opslaglocatie** | [Server, cloud, land/regio] |
| **Bewaartermijn** | [Hoe lang, op basis van welk beleid] |
| **Wie heeft toegang?** | [Welke rollen/afdelingen] |
| **Wordt data gedeeld met derden?** | [Ja/Nee — met wie, waarvoor, op welke grondslag] |
| **Doorgifte buiten EU/EER?** | [Ja/Nee — naar welk land, welke waarborg] |

### 3.6 Rechtsgrondslag (Artikel 6 AVG)

- [ ] **Toestemming** — betrokkene heeft expliciet toestemming gegeven
- [ ] **Uitvoering overeenkomst** — noodzakelijk voor het uitvoeren van een contract
- [ ] **Wettelijke verplichting** — noodzakelijk om te voldoen aan een wettelijke plicht
- [ ] **Vitaal belang** — noodzakelijk om het leven van iemand te beschermen
- [ ] **Algemeen belang** — noodzakelijk voor een taak van algemeen belang
- [ ] **Gerechtvaardigd belang** — noodzakelijk voor een gerechtvaardigd belang van de organisatie

**Toelichting:** [Onderbouw waarom deze grondslag van toepassing is]

Bij **bijzondere categorieën** (Art. 9): aanvullende grondslag:
- [ ] Uitdrukkelijke toestemming
- [ ] Arbeidsrecht
- [ ] Volksgezondheid
- [ ] Overige: [beschrijf]

---

## 4. Noodzakelijkheid en proportionaliteit

| Vraag | Antwoord | Toelichting |
|---|---|---|
| Is de verwerking noodzakelijk voor het beoogde doel? | [Ja/Nee] | [Waarom] |
| Kan het doel ook bereikt worden met minder gegevens? | [Ja/Nee] | [Welke alternatieven zijn overwogen] |
| Worden niet meer gegevens verwerkt dan nodig? | [Ja/Nee] | [Onderbouwing dataminimalisatie] |
| Is de bewaartermijn niet langer dan noodzakelijk? | [Ja/Nee] | [Verwijzing naar retentiebeleid] |
| Worden betrokkenen adequaat geïnformeerd? | [Ja/Nee] | [Via privacyverklaring, bij verzameling] |
| Kunnen betrokkenen hun rechten uitoefenen? | [Ja/Nee] | [Procedure voor inzage, correctie, verwijdering] |

---

## 5. Risicobeoordeling

### 5.1 Geïdentificeerde risico's

| # | Risico | Bron | Impact op betrokkene | Waarschijnlijkheid | Risico-niveau |
|---|---|---|---|---|---|
| R1 | Ongeautoriseerde toegang tot persoonsgegevens | [Hacking, menselijke fout, insider threat] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R2 | Dataverlies of -vernietiging | [Systeemfalen, ransomware, brand] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R3 | Onrechtmatige doorgifte aan derden | [Foutieve verzending, onbevoegde deling] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R4 | Onvoldoende transparantie naar betrokkenen | [Ontbrekende privacyverklaring] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R5 | Niet kunnen voldoen aan rechten van betrokkenen | [Geen proces voor inzage/verwijdering] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R6 | Ongeoorloofde profilering of geautomatiseerde besluitvorming | [Algoritmes zonder menselijke tussenkomst] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] | [Hoog/Midden/Laag] |
| R7 | [Overig risico] | [Bron] | [Impact] | [Waarschijnlijkheid] | [Niveau] |

### 5.2 Risicomatrix

| | Laag impact | Midden impact | Hoog impact |
|---|---|---|---|
| **Hoge waarschijnlijkheid** | Midden | Hoog | Hoog |
| **Midden waarschijnlijkheid** | Laag | Midden | Hoog |
| **Lage waarschijnlijkheid** | Laag | Laag | Midden |

---

## 6. Maatregelen

| # | Risico | Maatregel | Type | Verantwoordelijke | Status |
|---|---|---|---|---|---|
| M1 | R1 — Ongeautoriseerde toegang | Toegangscontrole (RBAC), MFA, logging | Technisch | IT | [Gepland/Geïmplementeerd] |
| M2 | R1 — Ongeautoriseerde toegang | Awareness-training voor medewerkers | Organisatorisch | CISO | [Gepland/Geïmplementeerd] |
| M3 | R2 — Dataverlies | Versleuteling at rest en in transit | Technisch | IT | [Gepland/Geïmplementeerd] |
| M4 | R2 — Dataverlies | Dagelijkse backups met hersteltest | Technisch | IT | [Gepland/Geïmplementeerd] |
| M5 | R3 — Onrechtmatige doorgifte | Verwerkersovereenkomst met alle verwerkers | Juridisch | CISO | [Gepland/Geïmplementeerd] |
| M6 | R4 — Transparantie | Privacyverklaring publiceren en communiceren | Organisatorisch | CISO | [Gepland/Geïmplementeerd] |
| M7 | R5 — Rechten betrokkenen | Procedure voor verzoeken implementeren | Organisatorisch | CISO | [Gepland/Geïmplementeerd] |
| M8 | [Risico] | [Maatregel] | [Type] | [Naam] | [Status] |

---

## 7. Restrisico-beoordeling

| # | Risico | Niveau vóór maatregelen | Maatregelen | Niveau na maatregelen | Acceptabel? |
|---|---|---|---|---|---|
| R1 | Ongeautoriseerde toegang | Hoog | M1, M2 | [Laag/Midden] | [Ja/Nee] |
| R2 | Dataverlies | Hoog | M3, M4 | [Laag/Midden] | [Ja/Nee] |
| R3 | Onrechtmatige doorgifte | Midden | M5 | [Laag] | [Ja/Nee] |
| R4 | Transparantie | Midden | M6 | [Laag] | [Ja/Nee] |
| R5 | Rechten betrokkenen | Midden | M7 | [Laag] | [Ja/Nee] |

**Indien restrisico HOOG blijft:** Voorafgaande raadpleging van de Autoriteit Persoonsgegevens is verplicht (Artikel 36 AVG).

---

## 8. Conclusie en advies

| | |
|---|---|
| **Algehele risicobeoordeling** | [Laag / Midden / Hoog] |
| **Advies** | [Verwerking kan doorgaan / Verwerking kan doorgaan mits maatregelen geïmplementeerd / Verwerking wordt afgeraden / Voorafgaande raadpleging AP vereist] |
| **Voorwaarden** | [Beschrijf eventuele voorwaarden] |
| **Herevaluatie nodig bij** | [Beschrijf triggers voor herevaluatie: wijziging scope, technologie, datavolume] |

---

## 9. Goedkeuring

| | Naam | Functie | Datum | Handtekening |
|---|---|---|---|---|
| DPIA uitgevoerd door | [Naam] | [CISO / Privacy Officer] | [Datum] | |
| FG geraadpleegd | [Naam] | [FG / DPO] | [Datum] | |
| Goedgekeurd door | [Naam] | [Directie / Bestuurder] | [Datum] | |

---

## 10. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
