# Bewaartermijn patientdossier (zorg)

**WGBO art. 7:454 / AVG art. 5 lid 1 sub e (opslagbeperking) / NEN 7510-2:2024 §5.33**

| | |
|---|---|
| **Documentnummer** | ISMS-051 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam FG / Medisch Manager] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Jaarlijks + bij wetswijziging |

---

## 1. Doel

Deze procedure beschrijft de bewaartermijnen voor patientdossiers en aanverwante gegevens binnen [Organisatienaam], conform de WGBO en AVG. Het verbindt wettelijke verplichtingen met technische uitvoering (markering, verwijdering, gedeeltelijke anonimisering).

## 2. Hoofdregel WGBO

De Wet op de geneeskundige behandelingsovereenkomst (WGBO) verplicht zorgaanbieders het patientdossier **ten minste 20 jaar** te bewaren, te rekenen vanaf:

- het tijdstip van het laatste gegeven dat in het dossier is opgenomen, of
- bij minderjarige patienten: vanaf hun 18e verjaardag

Per 1 januari 2020 is deze termijn verlengd van 15 naar 20 jaar. Voor dossiers afgesloten voor 1 januari 2020 kan de overgangsregeling van toepassing zijn.

## 3. Categorieen en bewaartermijnen

| Categorie | Bewaartermijn | Grondslag |
|---|---|---|
| Patientdossier (regulier) | 20 jaar na laatste handeling of vanaf 18e | WGBO art. 7:454 |
| Patientdossier minderjarige | Tot 20 jaar na 18e verjaardag (max 38 jaar) | WGBO art. 7:454 |
| Patientdossier overleden patient | 20 jaar na overlijden | WGBO + jurisprudentie |
| Beelden (rontgen, MRI, foto's) | Onderdeel van dossier, dezelfde 20 jaar | WGBO + NEN 7510 |
| Laboratoriumuitslagen | Onderdeel van dossier, 20 jaar | WGBO |
| Recepten en medicatie-overzicht | Onderdeel van dossier, 20 jaar | WGBO + KNMP |
| Onderzoeksdossier wetenschap | Volgens onderzoeksprotocol, vaak langer | Onderzoeksvoorschriften |
| Bijzondere wetgeving (genetisch, kerngeneeskundig) | Specifieke termijnen (kan langer zijn dan 20 jaar) | Bijzondere wetten |
| Klachtdossier | 5 jaar na afhandeling | AVG opslagbeperking |
| Toestemmingsverklaringen | Zolang dossier bestaat + 20 jaar | WGBO + AVG bewijslast |

## 4. Uitzonderingen op vernietiging

Niet vernietigen, ook al is de termijn verstreken, indien:

- De patient (of nabestaande) verzoekt om langere bewaring
- Sprake is van een actief klacht- of tuchtdossier
- De zorginstelling betrokken is bij een lopend juridisch onderzoek
- Wetenschappelijk onderzoek of statistiek dit rechtvaardigt (mits geanonimiseerd)
- De zorgverlener kan onderbouwen dat bewaring "uit goed hulpverlenerschap" gerechtvaardigd is (denk aan erfelijke aandoeningen)

Reden voor langere bewaring wordt schriftelijk vastgelegd in het dossier.

## 5. Wanneer wel vernietigen op verzoek?

De patient heeft op grond van AVG art. 17 het recht op vergetelheid en op grond van WGBO art. 7:455 specifiek voor het zorgdossier het recht op vernietiging binnen 3 maanden, behoudens:

- Een ander dan de patient heeft een aanmerkelijk belang bij behoud (bijv. wetenschap, juridische verdediging)
- Bewaring is op grond van wettelijk voorschrift verplicht
- Bewaring is noodzakelijk voor goede hulpverlening aan een ander (familie, nazorg)

De FG beoordeelt het verzoek en informeert de patient binnen 3 maanden met motivering.

## 6. Technische uitvoering

| Stap | Wie | Wanneer |
|---|---|---|
| Markering "te beoordelen voor vernietiging" | Geautomatiseerd bij verloop termijn | Per kwartaal-run |
| Beoordeling op uitzonderingen | Behandelaar of medisch manager | Binnen [N] werkdagen |
| Vrijgave voor vernietiging | FG + medisch manager | Per kwartaal-batch |
| Vernietiging digitaal | IT, gecertificeerde wisprocedure | Per batch |
| Vernietiging fysiek | Gecertificeerde leverancier met verklaring | Per batch |
| Loggen | IT registreert wat is verwijderd (alleen meta, niet inhoud) | Bij elke vernietiging |

Vernietiging is **onomkeerbaar**: backups en logs worden meegenomen in de vernietiging tenzij wettelijk anders vereist.

## 7. Verklaring van vernietiging

Per batch vernietiging stelt [Organisatienaam] een verklaring op met:
- Aantal dossiers
- Datumbereik laatste handelingen
- Reden van vernietiging (wettelijke termijn / verzoek patient)
- Uitvoerder en datum
- Handtekening FG en medisch manager

De verklaring wordt 7 jaar bewaard als verantwoordingsbewijs.

## 8. Verzoeken van patienten

Een patient of nabestaande kan altijd verzoeken om:
- Inzage in eigen dossier (AVG art. 15 + WGBO art. 7:456)
- Kopie van eigen dossier
- Correctie of aanvulling (WGBO art. 7:456 lid 2)
- Vernietiging (WGBO art. 7:455)

Procedure: zie ISMS-031 (Procedure rechten van betrokkenen) en bovenstaande beoordeling van uitzonderingen.

## 9. Overdracht bij beeindiging praktijk

Indien een zorgverlener stopt of de organisatie wijzigt, worden dossiers overgedragen aan een opvolger of bewaard bij een aangewezen partij. Patienten worden geinformeerd, conform KNMG-richtlijnen. De nieuwe houder neemt verantwoordelijkheid voor bewaartermijnen en verzoeken.

## 10. Toezicht

Jaarlijks rapporteert de FG aan de directie:
- Aantal dossiers in bewaring
- Aantal dossiers verlopen termijn (te beoordelen)
- Aantal vernietigd
- Aantal vernietigingsverzoeken (toegekend / afgewezen) met onderbouwing
- Compliance-bevindingen

---

**Bijlagen**
- Bijlage A: Beslisboom vernietiging
- Bijlage B: Verklaring-template per batch
- Bijlage C: Communicatie-template patient (toekennen of afwijzen vernietiging)

**Gerelateerde documenten**
- [[ISMS-027 Data retention & deletion]]
- [[ISMS-031 Procedure rechten van betrokkenen]]
- [[ISMS-040 Datalekprocedure]]
- [[WGBO art. 7:454-457]]
