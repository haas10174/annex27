# Cyberbeveiligingswet (Cbw) — corpus en interpretatie (concept)

> **Status**: concept-werkdocument. De Cbw is op het moment van schrijven niet officieel in werking en de tekst kan tot publicatie in het Staatsblad nog wijzigen. Dit document is een **werkversie** voor intern gebruik bij Annex27, gebaseerd op het wetsvoorstel, de memorie van toelichting en publiek beschikbare commentaren. Geen juridisch advies.
>
> **Bronnen**:
> - Wetsvoorstel "Cyberbeveiligingswet" (Tweede Kamer)
> - Memorie van toelichting (TK-stukken)
> - NIS2-richtlijn (EU) 2022/2555 (zie `nis2-corpus.md`)
> - Conceptregelgeving Ministerie van Justitie en Veiligheid
> - NCSC, RDI en sectorale toezichthouders (publieke factsheets)
> - AcICT-advies (College ICT-toetsing)
>
> **Bedoeld gebruik in Annex27**: aanvullend op `nis2-corpus.md`, specifiek voor Nederlandse implementatie-eisen. Citaten in beleidsdocumenten verwijzen naar dit corpus + officiele bronnen.
>
> **Laatste update werkversie**: [datum invullen bij elke iteratie]

---

## Achtergrond

De Cbw zet richtlijn (EU) 2022/2555 (NIS2) om in Nederlands recht. De omzettingstermijn (17 oktober 2024) is door Nederland niet gehaald; de wet doorloopt nog parlementaire behandeling. Tot inwerkingtreding van de Cbw geldt voor essentiele en belangrijke entiteiten geen formele NIS2-meldplicht in Nederland, maar wordt verwacht dat organisaties zich proactief voorbereiden.

De Cbw verzelfstandigt en verbreedt de oude Wet beveiliging netwerk- en informatiesystemen (Wbni, 2018).

## Verhouding tot andere wetgeving

| Wet | Verhouding met Cbw |
|---|---|
| Wbni (2018) | Vervangen / opgenomen in Cbw |
| AVG | Blijft van kracht; AP blijft toezichthouder op datalekken |
| Wpg (Wet politiegegevens) | Sectorale aanvulling |
| Wbni / Cyber Resilience Act (CRA) | Productgericht; Cbw is organisatie-gericht |
| BIO 2.0 | Voor overheden; technische invulling vaak parallel |
| AI Act | Productrisico-gericht, los van Cbw |

## Reikwijdte (Cbw + NIS2)

### Essentiele entiteiten (Cbw, in lijn met NIS2 bijlage I)

| Sector | Voorbeelden |
|---|---|
| Energie | Elektriciteit, gas, olie, waterstof, district heating |
| Vervoer | Lucht, spoor, water, weg |
| Bankwezen | Kredietinstellingen |
| Infrastructuur financiele markt | Handelsplatformen, centrale tegenpartijen |
| Gezondheidszorg | Zorgaanbieders, EU referentielaboratoria, fabrikanten kritieke medische hulpmiddelen |
| Drinkwater | Drinkwaterbedrijven |
| Afvalwater | Riolering en zuivering |
| Digitale infrastructuur | IXP, DNS, TLD-registries, datacenter, content delivery, vertrouwensdienstverleners, openbare elektronische communicatie |
| Beheer van ICT-diensten (B2B) | Managed service providers, managed security service providers |
| Overheid | Centraal, regionaal, lokaal (uitgewerkt per Cbw + lagere regelgeving) |
| Ruimtevaart | Operatoren van grondinfrastructuur |

### Belangrijke entiteiten (Cbw, NIS2 bijlage II)

| Sector | Voorbeelden |
|---|---|
| Post- en koeriersdiensten | Pakket- en briefpost |
| Afvalstoffenbeheer | Inzameling, behandeling |
| Chemische stoffen | Productie, distributie |
| Levensmiddelen | Productie, verwerking, distributie |
| Vervaardiging | Medische hulpmiddelen, ICT-componenten, machines, motorvoertuigen, transport |
| Digitale aanbieders | Online marktplaatsen, zoekmachines, sociale netwerken |
| Onderzoek | Onderzoeksorganisaties |

### Drempels (NIS2 art. 2 + 3, geinterpreteerd voor Cbw)

| Type | Criterium |
|---|---|
| Middelgrote onderneming | 50-249 medewerkers OF jaaromzet 10-50 mln EUR + balans 10-43 mln EUR |
| Grote onderneming | >= 250 medewerkers OF jaaromzet > 50 mln EUR + balans > 43 mln EUR |

Voor essentiele sectoren ligt de standaarddrempel bij grote ondernemingen. Voor belangrijke sectoren bij middelgrote ondernemingen. Lidstaten kunnen aanvullende criteria stellen (bv. unieke leverancier, kritieke afhankelijkheid). Nederland gebruikt deze ruimte deels.

## Kernverplichtingen onder Cbw

### Risicobeheersmaatregelen (Cbw, omzetting NIS2 art. 21)

Tien hoofdcategorieen:

1. Beleid voor risico-analyse en informatiesysteembeveiliging
2. Incidentbehandeling
3. Bedrijfscontinuiteit, back-up en crisismanagement
4. Toeleveringsketenbeveiliging
5. Beveiliging bij verwerving, ontwikkeling en onderhoud van systemen
6. Beleid en procedures voor effectiviteitsbeoordeling
7. Basishygiene cyberbeveiliging en training
8. Beleid en procedures voor cryptografie en encryptie
9. HR-beveiliging, toegangsbeleid en assetmanagement
10. Multi-factor authentication, secure communications, beveiligde noodcommunicatie

### Meldplichten (Cbw, omzetting NIS2 art. 23)

- 24 uur: vroege waarschuwing
- 72 uur: incident-melding
- 1 maand: eindrapport
- Indien klantimpact: ook informeren van betrokken klanten zonder onredelijke vertraging

### Bestuursverantwoordelijkheid (Cbw, omzetting NIS2 art. 20)

- Bestuur keurt cybermaatregelen goed en houdt toezicht
- Persoonlijke aansprakelijkheid bij nalatigheid
- Verplichte opleiding voor bestuur
- Toezien op opleiding van medewerkers

### Registratie (Cbw, omzetting NIS2 art. 27)

Entiteiten moeten zichzelf registreren bij de bevoegde autoriteit. Registratiegegevens: naam, adres, sector, contactgegevens 24/7, bijbehorende lidstaten waar diensten worden verleend.

## Toezicht (Cbw)

| Sector | Vermoedelijk bevoegde autoriteit (op basis van wetsvoorstel) |
|---|---|
| Energie | Minister EZK / Autoriteit Consument & Markt |
| Vervoer | Inspectie Leefomgeving en Transport |
| Bankwezen, financiele markt | De Nederlandsche Bank + AFM |
| Gezondheidszorg | Minister VWS + IGJ |
| Drinkwater + afvalwater | Inspectie Leefomgeving en Transport |
| Digitale infrastructuur + ICT-diensten | Rijksinspectie Digitale Infrastructuur (RDI) |
| Overheid | Minister Binnenlandse Zaken |
| Ruimtevaart | Minister EZK |
| Digitale aanbieders | Rijksinspectie Digitale Infrastructuur (RDI) |
| Onderzoek | Minister OCW |

De toezichthouders mogen uitvoeren: audits, inspectie ter plaatse, opvragen documenten, opleggen aanwijzingen, bestuurlijke boete, en in laatste instantie tijdelijke schorsing van leidinggevenden of (voor essentiele entiteiten) certificeringen.

## Sancties

Maximale boetes conform NIS2:
- Essentiele entiteiten: 10 miljoen EUR of 2% wereldwijde omzet, hoogste van de twee
- Belangrijke entiteiten: 7 miljoen EUR of 1,4% wereldwijde omzet, hoogste van de twee

Plus bestuurdersaansprakelijkheid bij nalatigheid (NIS2 art. 32).

## Verhouding tot AVG-meldplicht

Bij een cyberincident met persoonsgegevens:
- AVG-datalekmelding bij Autoriteit Persoonsgegevens (72 uur)
- Cbw-incidentmelding bij sectorale autoriteit + CSIRT (24/72 uur/1 mnd)

Beide trajecten lopen parallel, vereisen eigen rapportage, en kunnen leiden tot afzonderlijke boetes. Coordinatie tussen FG en CISO is essentieel (zie `ISMS-054 Dubbele meldplicht`).

## Verschil met Wbni (oude regime)

| Onderwerp | Wbni (2018) | Cbw (concept) |
|---|---|---|
| Sectoren | Beperkt (energie, vervoer, water, gezondheid, financien, digitaal) | Uitgebreid (18 sectoren) |
| Doelgroep | Aanbieders essentiele diensten (AED) + digitale dienstverleners | Essentiele + belangrijke entiteiten |
| Bestuursverantwoordelijkheid | Beperkt | Expliciet, persoonlijke aansprakelijkheid |
| Sancties | Lager | Aanzienlijk verhoogd |
| Meldtermijn | 24/72 uur | 24 uur + 72 uur + 1 mnd |
| Toezicht | Sectoraal | Sectoraal + uniforme bevoegdheden |
| Toepasselijkheid via grootte-drempel | Beperkt | Volgens NIS2-drempels |

## Praktische gevolgen voor MKB (interpretatie Annex27)

| Onderwerp | Praktische lijn |
|---|---|
| Val ik onder Cbw? | Check sector + grootte-drempel. Bij twijfel: registreren in twijfel is veiliger dan niet registreren |
| Wanneer maatregelen? | Zodra de Cbw in werking treedt + overgangsperiode. Verstandig om nu al maatregelen te treffen |
| Hoe NIS2-readiness aantonen? | Gap-analyse op ISO 27001 + NIS2-mapping (zie Annex27 gap-rapport) + Bestuursverklaring (ISMS-056) |
| Wat doe ik als klein bedrijf met grote klant onder Cbw? | Verwacht dat zij Cbw-vragenlijsten doorzetten via supply chain due diligence (NIS2 art. 21 lid 2 sub d) |
| Hoe verhouden zich Cbw en ISO 27001? | ISO 27001 dekt 80-90% van Cbw-maatregelen. Aanvullend nodig: meldplichten, bestuursverklaring, registratie |

## Status van dit document

Dit corpus wordt bijgewerkt bij:
- Publicatie van Cbw in Staatsblad
- Wijziging in lagere regelgeving (Besluit Cbw, ministeriele regelingen)
- Jurisprudentie of guidance van toezichthouders
- Wijziging NIS2-richtlijn zelf

Voor de **definitieve juridische tekst** raadpleeg altijd:
- [wetten.overheid.nl](https://wetten.overheid.nl) (na publicatie)
- [zoek.officielebekendmakingen.nl](https://zoek.officielebekendmakingen.nl)
- [eur-lex.europa.eu/eli/dir/2022/2555/oj](https://eur-lex.europa.eu/eli/dir/2022/2555/oj) (NIS2 zelf)

---

## Open vragen / nog uit te werken in dit corpus

- Definitieve drempels voor unieke en kritieke leverancier (Nederland-specifiek)
- Toezicht-mandaat per sector (afhankelijk van AMvB)
- Praktische verhouding tussen CSIRT-DSP en sectorale toezichthouder bij meldingen
- Overgangsregime tussen Wbni en Cbw voor reeds-AED-gedefinieerde organisaties
- Specifieke positie van overheidsentiteiten onder Cbw + BIO
