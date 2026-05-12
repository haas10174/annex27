# BIO 2.0 — ISO 27001:2023 / 27002:2022 Mapping

**Versie document:** 2.0 (herzien op basis van officiële BIO2-publicatie)
**Datum:** 2026-05-13
**Doelgroep:** Leveranciers aan Nederlandse overheidsorganisaties (Rijk, gemeenten, provincies, waterschappen, ZBO's) die BIO2-conformiteit moeten aantonen via hun ISO 27001-implementatie.

**Bron:** Baseline Informatiebeveiliging Overheid 2 (BIO2), versie 1.3 definitief (09-01-2026). Uitgegeven door het **Centrum Informatiebeveiliging en Privacybescherming (CIP)** in opdracht van het **Ministerie van BZK** (stelselverantwoordelijk). Vastgesteld door het Overheidsbreed Beleidsoverleg Digitale Overheid (OBDO) op 24-09-2025; v1.3 bevat de aanpassingen vanwege BIO2 als wetgeving onder de Cyberbeveiligingswet (Cbw). Beschikbaar via cip-overheid.nl.

---

## 1. Wat is BIO 2.0

BIO2 is het normenkader voor informatiebeveiliging binnen alle Nederlandse overheidsentiteiten en bestaat uit twee delen:

- **Deel 1 — BIO2-kader**, gestructureerd volgens **NEN-EN-ISO/IEC 27001:2023**. Beschrijft procesinrichting (ISMS), risicomanagement, Verklaring van Toepasselijkheid (VvT), governance, transparantie, toezicht, leveranciers.
- **Deel 2 — BIO-overheidsmaatregelen**, gestructureerd volgens **NEN-EN-ISO/IEC 27002:2022**. 93 controlfamilies, met per familie nul, één of meerdere overheidsmaatregelen die de ISO-beheersmaatregel aanvullen.

BIO2 vervangt de twee ISO-normen **niet** maar vult ze aan. Daar waar BIO2 zelf niets voorschrijft, gelden de ISO-normen onverkort. ISO 27001 is verplicht voor de inrichting van het managementsysteem. Forum Standaardisatie heeft ISO 27001 en 27002 op de pas-toe-of-leg-uit-lijst geplaatst voor de publieke sector.

### Verschillen met BIO 1.04

Belangrijke wijzigingen voor leveranciers die nog op BIO 1.04 georiënteerd zijn:

- BIO2 sluit aan op **ISO 27001:2023 / 27002:2022** (waarin de hernieuwde 93-controls-structuur is opgenomen), in plaats van de oudere ISO 27002:2013.
- De **maatregelnummering** is veranderd: BIO-overheidsmaatregel 5.01.01 verwijst naar ISO 27002:2022 beheersmaatregel 5.1 (eerste drie cijfers = ISO-nummer, vierde cijfer = uniek volgnummer).
- BIO2 v1.3 markeert overheidsmaatregelen die **buiten de Cbw-reikwijdte** vallen grijs. Voor die maatregelen geldt verplichtende zelfregulering per OBDO-besluit.

### Risicomanagement zonder vaste niveaus

BIO2 schrijft een risicomanagementmethodiek voor (BIO2 § 6) die minimaal omvat:

1. een **quickscan** om te bepalen of het basisniveau toereikend is of dat aanvullende maatregelen noodzakelijk zijn
2. een methode voor een **volledige risicoanalyse**
3. een **risicoregister** met tijdelijk geaccepteerde risico's
4. een proces voor de **opvolging van risico's**

De entiteit kiest zelf hulpmiddelen zoals NEN-ISO/IEC 27005, het NIST Cybersecurity Framework of SP 800-30.

---

## 2. Cyberbeveiligingswet (Cbw) als context

BIO2 v1.3 is afgestemd op de Cyberbeveiligingswet (Cbw), de Nederlandse implementatie van de NIS2-richtlijn. Voor de sector 'Overheid' regelt de Cbw o.a.:

- **Verplichting BIO**: toepassen van BIO2 is via de Cbw verplicht voor entiteiten in de sector 'Overheid'. Voor overheidsentiteiten die niet onder de Cbw vallen, geldt BIO2 als verplichtende zelfregulering per OBDO-besluit.
- **Verantwoordelijkheid bestuurder**: het treffen van passende en evenredige technische, operationele en organisatorische maatregelen, het goedkeuren van te nemen maatregelen, en het toezien op de uitvoering.
- **Opleidingsplicht** voor bestuurders en werknemers.
- **Meldplicht** voor significante incidenten binnen de wettelijke termijnen (zie BIO2 5.24.07).
- **Toezicht** op de sector 'Overheid' wordt uitgeoefend door de Rijksinspectie Digitale Infrastructuur (**RDI**).

Voor BIO-maatregelen buiten Cbw-reikwijdte (grijs gemarkeerd in BIO2) blijft verplichtende zelfregulering gelden.

---

## 3. Mapping per controlfamilie

Hieronder per ISO 27002:2022-familie de aanvullende BIO-overheidsmaatregelen, met verwijzing naar het Annex27-beleidsdocument. Beheersmaatregelen waarvoor in BIO2 expliciet staat *"Geen overheidsmaatregel, zie inleiding deel 2"*, vereisen toepassing van de ISO 27002:2022-implementatierichtlijn zelf.

### 3.1 Organisatorische beheersmaatregelen (5.x)

| BIO-overheidsmaatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|
| **5.01.01 / 5.01.02** | Informatiebeveiligingsbeleid | 02-informatiebeveiligingsbeleid | Vastgesteld door bestuur. Verplichte onderdelen: strategische uitgangspunten, organisatie IB-functie, verantwoordelijkheden voor ketens/OT/privacybescherming/BCM, betrouwbaarheidseisen, evaluatiefrequentie, bevordering bewustzijn. Minimaal jaarlijks herzien. |
| **5.02.01 / 5.02.02** | Rollen en verantwoordelijkheden + CISO | 04-rollen-verantwoordelijkheden | Bestuur legt rollen en samenhang (IB, OT, BCM) vast. **CISO aangewezen** met bevoegdheid onafhankelijk en zelfstandig te adviseren en rapporteren aan bestuur. |
| **5.04.01** | Managementverantwoordelijkheden | werkinstructies/A5-organisatorisch | Regelmatige scholing bestuur en werknemers over cyberbeveiligingsrisico's. Bestuurders tonen aan voldoende kennis te hebben. |
| **5.05.01** | Contact met instanties | 26-register-wettelijke-vereisten | Overzicht van welke functionarissen met welke (overheids)instanties en toezichthouders formele contacten hebben over informatiebeveiliging. Ten minste jaarlijks geactualiseerd. |
| **5.08.01** | IB in projectmanagement | werkinstructies/A5 | Bij nieuwe en significant gewijzigde informatiesystemen: expliciete risicoafweging op basis van vastgestelde methodiek. |
| **5.09.01** | Inventaris bedrijfsmiddelen | 11-assetregister-en-classificatie | Inventaris incl. OT, cloud-omgevingen, bedrijfsmiddelen niet onder controle van entiteit, externe verbindingen. Periodiek gecontroleerd. |
| **5.10.02 / 5.10.03** | Aanvaardbaar gebruik | werkinstructies/A5 | Gedragsregels voor extern personeel/vrijwilligers contractueel vastgelegd. Alle medewerkers aantoonbaar gewezen op gedragsregels. |
| **5.12.01** | Classificatie | 11-assetregister-en-classificatie | Classificatie via vastgestelde impactclassificatiemethodiek, onderdeel van de risicomanagementmethodiek. |
| **5.14.01 / 5.14.02 / 5.14.03 / 5.14.04 / 5.14.05** | Overdracht van informatie | 32-netwerk-communicatie | Internetfacing-systemen + e-mail voldoen aan **verplichte beveiligingsstandaarden Forum Standaardisatie**, gestuurd via **internet.nl**-metingen. **OV-certificaten** voor openbaar webverkeer met gevoelige gegevens; OV of PKIo voor intern. AdES Baseline Profiles voor elektronische handtekeningen. Actuele registratie internetfacing-systemen/IP-adressen/API's. Publieke websites bekend in **Register Internetdomeinen Overheid (RIO)**, halfjaarlijks geactualiseerd. |
| **5.15.01** | Toegangsbeheersing | 12-toegangsbeleid | Toegang tot vertrouwde zone alleen vanaf geauthentiseerde apparatuur óf vanuit programmatuur in veilige schil. |
| **5.16.01 / 5.16.02** | Beheer identiteiten | 12-toegangsbeleid | Sluitende formele registratie- en afmeldprocedure. Groepsaccounts niet toegestaan tenzij gemotiveerd, vastgelegd en met CISO afgestemd. |
| **5.17.01 / 5.17.02 / 5.17.03** | Authenticatie en MFA | 13-wachtwoordbeleid | **MFA verplicht** voor: primair aanloggen digitale werkomgeving, accounts voor internet-bereikbare voorzieningen, beheerrechten-accounts, en overige bij risicoanalyse-uitkomst. Twee vormen: wachtwoordloos (passkey/hardware-token) of wachtwoord + tweede factor. Indien MFA niet mogelijk: **mitigerende maatregelen** in overleg met CISO. Wachtwoordmanager verplicht aangeboden. Wachtwoordeisen geautomatiseerd afgedwongen. |
| **5.18.01 / 5.18.02** | Toegangsrechten | werkinstructies/A8 | Maken/wijzigen accounts met bijzondere rechten gemonitord; ongeautoriseerde wijziging = incident. Minimaal jaarlijks beoordeling toegangsrechten. |
| **5.19.01 / 5.20.01-06 / 5.21.02-05 / 5.22.01-02** | Leveranciersrelaties | 23-leveranciersbeleid + 24-leverancier-assessment + 35-vendor-onboarding-checklist | IB-eisen in inkoopeisen op basis van risicoafweging. Eisen contractueel opnemen. Algemene voorwaarden leveranciers waar mogelijk uitsluiten. Leverancier toont opzet/bestaan/werking aan via onafhankelijke onderzoeken, jaarlijks. Recht op externe audit contractueel. Transparantie over kwetsbaarheden en datalekken. Exit-strategie expliciet. Keten van toeleveranciers inzichtelijk. IB-eisen onverkort van toepassing op keten. Beveiliging toeleveringsketens onderdeel risicoanalyse. Jaarlijkse beoordeling leverancier. Actuele registratie van leveranciers en contracten. |
| **5.23.01** | Cloud Service Providers | 23-leveranciersbeleid | Beleid voor inventarisatie/classificatie/selectie/beoordeling/management/beëindiging CSP, minimaal eens per drie jaar herzien. Ontbindingssituaties contractueel. |
| **5.24.01 t/m 5.24.08** | Incident-planning + **CVD** | 19-incident-response + nis2-02-meldingsplicht-procedure | Meldloket voor IB-incidenten, meldprocedure. Proceseigenaar verantwoordelijk voor oplossing en maandelijkse rapportage. Verwijzing naar crisisbeheersing. Incidentprocedure bevat tenminste: melding bij **CSIRT** binnen wettelijke termijn, ontvangst en beoordeling CSIRT-meldingen, kennisgeving betrokkenen. **CVD-procedure** (Coordinated Vulnerability Disclosure) ingericht en gepubliceerd volgens **NCSC-leidraad of NEN-EN-ISO/IEC 29147:2020**; CVD-meldingen onderdeel incidentrapportage. |
| **5.25.02 / 5.26.02** | Beoordeling + reactie incidenten | 19-incident-response | Incidenten via incidentbeheerproces afgedaan. Relevante incidenten gemeld bij in wet- en regelgeving aangewezen toezichthouders. |
| **5.27.01 / 5.27.02** | Leren van incidenten | 19-incident-response | Analyse achterliggende oorzaken, verbeteringen. Analyses breed gedeeld met relevante partners. |
| **5.28.01** | Bewijsmateriaal | 18-logging-monitoring | Bewaartermijn (vermoedelijke) IB-incidenten + analyse-informatie (logging, oplossing, advies): **minimaal drie jaar**. |
| **5.30.01 / 5.30.02** | ICT-gereedheid bedrijfscontinuïteit | 20-bcp | Continuïteitsplannen jaarlijks getest. Proceseigenaar identificeert kritieke systemen, minstens elke drie jaar geactualiseerd. |
| **5.33.01** | Bescherming administratie | 27-data-retention-deletion | Bewaartermijnen per informatie(systeem) vastgelegd, rekening houdend met o.a. **Archiefwet** en privacywetgeving. Praktisch ingeregeld, periodiek getoetst. |
| **5.35.02** | Onafhankelijke beoordeling | 21-interne-audit + 22-management-review | Vastgesteld auditplan, jaarlijks keuzes welke systemen welk soort beveiligingsaudits. |
| **5.36.01** | Naleving beleid + **ICV** | 22-management-review | Rapportage IB onder coördinatie CISO in P&C- en PDCA-cyclus. Resulteert in jaarlijkse **In Control Verklaring (ICV)** of vergelijkbaar instrument. |

> *Beheersmaatregelen 5.03, 5.06, 5.07, 5.11, 5.13, 5.29, 5.31, 5.32, 5.34, 5.37: geen specifieke BIO-overheidsmaatregel — ISO 27002:2022 implementatierichtlijn geldt. Maatregelen 5.21.01 en 5.35.01 zijn in v1.3 vervallen.*

### 3.2 Mensen-beheersmaatregelen (6.x)

| BIO-overheidsmaatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|
| **6.01.01** | Screening | 09-hr-beleid | Vastgesteld screeningsbeleid. Bij indiensttreding en functiewijziging **kan op basis van een risicoafweging een VOG worden gevraagd**. Niet onvoorwaardelijk verplicht; afhankelijk van risicoanalyse en functie. |
| **6.02.01** | Arbeidsvoorwaarden | 09-hr-beleid | Alle medewerkers (intern en extern) bij aanstelling/functiewisseling gewezen op IB-verantwoordelijkheden. Regelingen eenvoudig toegankelijk. |
| **6.03.01 t/m 6.03.04** | Bewustzijn en training | 10-awareness-trainingsplan | Iedereen kent regels en verplichtingen IB. **Training I-bewustzijn binnen drie maanden** na indiensttreding aantoonbaar gevolgd. Management benadrukt belang en stimuleert periodieke herhaling. In bewustwordingsprogramma's ook **gedragsaspecten veilig mobiel werken**. |
| **6.08.01** | Rapportage IB-gebeurtenissen | 19-incident-response | Alle medewerkers (intern en extern) aantoonbaar kennisgenomen van meldingsprocedure IB-incidenten. |

> *Beheersmaatregelen 6.04, 6.05, 6.06, 6.07: geen specifieke BIO-overheidsmaatregel — ISO 27002:2022 implementatierichtlijn geldt.*

### 3.3 Fysieke beheersmaatregelen (7.x)

| BIO-overheidsmaatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|
| **7.01.02** | Beveiligingszones | 15-fysiek-beveiligingsbeleid | Kritieke informatie of systemen nooit via één beveiligde zone bereikbaar. *(7.01.01 in v1.3 vervallen: onvoldoende concreet)* |
| **7.02.01** | Fysieke toegang | werkinstructies/A7-fysiek | Bij concrete beveiligingsrisico's: waarschuwingen volgens onderlinge afspraken aan relevante collega's binnen het beveiligingsdomein van de overheid. |
| **7.07.01** | Clear desk / clear screen | werkinstructies/A7 | Bij chipcardtoken voor systeemtoegang: verwijderen token activeert automatisch toegangsbeveiligingsvergrendeling. |
| **7.10.01 / 7.10.02 / 7.10.03** | Opslagmedia | werkinstructies/A7 | Bij herbruikbare verwijderbare media die entiteit verlaten: bedrijfsgevoelige inhoud **onherstelbaar verwijderd**, controle met verslag. Waar mogelijk producten met **positief inzetadvies van Unit Weerbaarheid NBV/AIVD**. Koeriers/transporteurs voor geclassificeerde informatie: vooraf opgestelde betrouwbaarheidseisen. |

> *Beheersmaatregelen 7.03, 7.04, 7.05, 7.06, 7.08, 7.09, 7.11, 7.12, 7.13, 7.14: geen specifieke BIO-overheidsmaatregel — ISO 27002:2022 implementatierichtlijn geldt.*

### 3.4 Technologische beheersmaatregelen (8.x)

| BIO-overheidsmaatregel | Onderwerp | Annex27 beleidsdocument | Kern-eis |
|---|---|---|---|
| **8.01.01 / 8.01.02** | Eindgebruikersapparatuur | 30-mobile-remote-working | 'Zero footprint' voorkeur; als niet realiseerbaar: toegangsbeveiliging met **versleuteling** + 'wissen op afstand' mogelijk. Apparaat in **patchmanagement + hardening**, **MDM of MAM**, gebruikersovereenkomst getekend. Periodiek getoetst. |
| **8.02.01** | Speciale toegangsrechten | 12-toegangsbeleid | Speciale bevoegdheden minimaal elk kwartaal in opzet/bestaan/werking beoordeeld. |
| **8.03.01 / 8.03.02** | Beperking toegang | 12-toegangsbeleid | Fysiek/logisch isoleren informatie met specifiek belang. Need-to-know voor gebruikers. |
| **8.05.01** | Beveiligde authenticatie (externe leveranciers) | 23-leveranciersbeleid | Voorafgaande risicoafweging bij netwerktoegang externe leveranciers, voorwaarden en duur. Registratie. *(Algemene MFA-eis: zie 5.17, niet 8.05)* |
| **8.07.01 t/m 8.07.04** | Bescherming malware | 17-patch-kwetsbaarheidsbeheer | Downloaden beheerst en beperkt op risico/need-of-use. Voorlichting risico's surfgedrag. Antimalware actueel met updates. Scan op (mail)servers/computers/netwerktoegang/downloads/ontvangen bestanden. |
| **8.08.01 t/m 8.08.05** | Technische kwetsbaarheden | 17-patch-kwetsbaarheidsbeheer | Bij hoge misbruikkans + hoge schade: mitigerende maatregelen **binnen een week**. Expliciete risicoafweging. Jaarlijkse controle technische naleving (kwetsbaarheidsanalyses, pentesten, red-teaming waar mogelijk). Internetfacing-systemen: continue testen waar mogelijk + verplichte pentest bij iedere nieuwe release/major update + minimaal jaarlijks. *(8.08.06 verwijst naar 5.24.08 CVD)* |
| **8.13.01 t/m 8.13.04** | Back-up | 20-bcp | Back-upbeleid met eisen bewaring en bescherming, **specifieke aandacht ransomware** en integriteit. Maximaal dataverlies + maximale hersteltijd op basis risicoafweging. Locatiescheiding voor incident-isolatie. **Herstelprocedure minimaal jaarlijks getest**. |
| **8.15.01 t/m 8.15.06** | Logging | 18-logging-monitoring | Logregel bevat minimaal: Actie, Object, Resultaat, Oorsprong, Actor, Tijdstempel. Geen gegevens die beveiliging kunnen doorbreken. Overzicht gegenereerde logbestanden. **Bewaartermijn risicogericht bepaald**, rekening houdend met scenario langdurige aanwezigheid aanvallers. Oneigenlijk wijzigen/verwijderen = incident. Periodieke onafhankelijke toetsing op ongewijzigd bestaan. |
| **8.16.01 t/m 8.16.04** | Monitoring | 18-logging-monitoring | Nieuwe dreigingen verplicht gedeeld met aangewezen **CERT**. SIEM/SOC-regels wanneer escalatie naar management. **Detectie- en response-oplossing** voor informatieverwerkende omgeving. Actieve netwerkcomponenten met logging + monitoring. |
| **8.18.01 / 8.18.02** | Bevoorrechte hulpprogramma's | 12-toegangsbeleid | Toegang tot systeemhulpmiddelen alleen bevoegd personeel wanneer strikt noodzakelijk. **Gebruik gelogd; logging halfjaar beschikbaar voor onderzoek.** |
| **8.19.01** | Software-installatie | 17-patch-kwetsbaarheidsbeheer | Risico installatie niet-geautoriseerde software door gebruikers beheerst. |
| **8.20.01 / 8.20.02 / 8.21.01 t/m 8.21.04 / 8.22.01** | Netwerkbeveiliging | 32-netwerk-communicatie | Netwerkcomponenten voldoen minimaal aan vertrouwelijkheidsniveau netwerk. Beheerinterfaces gescheiden van gebruikersnetwerk. Maatregelen tegen beschikbaarheidsaanvallen in koppelpunten. Verkeer bewaakt op verdacht verkeer met detectievoorzieningen. Nieuwe dreigingen gedeeld binnen overheid. **Versleuteling draadloze + bedrade transport buiten gecontroleerd gebied**; waar mogelijk encryptiemiddelen met positief NBV/AIVD-advies, anders in overleg met CISO. Gescheiden groepen: gedefinieerd beveiligingsniveau. |
| **8.24.01 / 8.24.02 / 8.24.04 / 8.24.05** | Cryptografie | 16-cryptografiebeleid | Cryptografiebeleid uitgewerkt: wanneer, wie verantwoordelijk (implementatie + sleutelbeheer), registratie, normen Forum Standaardisatie, beschermingsniveau-bepaling, inter-entiteit-afspraken. Cryptografische beheersmaatregelen in inventaris bedrijfsmiddelen. **Sterkte gebaseerd op actuele adviezen NCSC en Unit Weerbaarheid NBV/AIVD** (niet op een eigen algoritme-lijst). Reservecertificaten bij alternatieve leverancier indien risicoafweging dat vereist. |
| **8.27.01** | Veilige systeemarchitectuur | werkinstructies/A8 | **Security by design + security by default** vastgesteld, gedocumenteerd, onderhouden en toegepast voor alle ontwikkelactiviteiten. |
| **8.29.01** | Beveiligingstesten | werkinstructies/A8 | Acceptatietesten via gestructureerde methodieken, waar mogelijk geautomatiseerd, met verslaglegging. |
| **8.30.01** | Uitbestede ontwikkeling | 23-leveranciersbeleid | Interne maatregelen systeemontwikkeling onverkort van toepassing op uitbesteding, aangevuld met uitbestedings-specifieke maatregelen. |
| **8.31.01 / 8.31.02** | Scheiding omgevingen | werkinstructies/A8 | In productieomgeving wordt niet getest (tenzij proceseigenaar vooraf goedkeurt). Significante wijzigingen altijd vooraf getest. |
| **8.32.01 / 8.32.02** | Wijzigingsbeheer | werkinstructies/A8 | Wijzigingsbeheer minimaal: administratie + testresultaten, risicoafweging + rollback-plan, goedkeuringsprocedure. Op basis van algemeen geaccepteerd beheerraamwerk. |

> *Beheersmaatregelen 8.04, 8.06, 8.09, 8.10, 8.11, 8.12, 8.14, 8.17, 8.23, 8.25, 8.26, 8.28, 8.33, 8.34: geen specifieke BIO-overheidsmaatregel — ISO 27002:2022 implementatierichtlijn geldt. Maatregelen 8.24.03 in v1.3 vervallen (indirect beschreven bij 8.24.01).*

---

## 4. Wat dekt een ISO 27001:2023-certificaat?

Een ISO 27001:2023-certificering dekt **het hele ISMS-kader** (BIO2 deel 1) en de basis van **alle 93 beheersmaatregelen** uit Annex A / ISO 27002:2022. BIO2 vult deze beheersmaatregelen aan met circa **80 overheidsmaatregelen** (na verwijderingen in v1.3) op tactisch niveau.

Wat een ISO 27001:2023-certificaat **niet automatisch** dekt:

- De expliciete opname van overheidsmaatregelen in de **Verklaring van Toepasselijkheid (VvT)**.
- Specifieke overheidselementen zoals **In Control Verklaring (ICV)**, **OV-certificaten**, **RIO-registratie**, internet.nl-conformiteit, **CVD-procedure** volgens NCSC-leidraad of ISO 29147, NCSC/NBV-advies voor cryptografie.
- De **Cbw-meldplicht** richting CSIRT (sectoraal), en richting AP voor persoonsgegevens-inbreuken onder de AVG.
- **Bestuurlijke verantwoordelijkheid en opleidingsplicht** zoals geconcretiseerd in BIO2 § 12 en in artikel 24 lid 12 Cbw.

De omvang van het werk om van ISO 27001:2023 naar BIO2-conformiteit te komen hangt af van de huidige inrichting van uw VvT, contractuele afspraken met overheidsklanten, en de mate waarin u eigen meldroutes en CVD heeft ingeregeld.

---

## 5. Voor leveranciers: hoe BIO2-conformiteit aantonen

Bij Nederlandse overheidsaanbestedingen wordt BIO2-conformiteit doorgaans contractueel afgedwongen. Als leverancier moet u kunnen aantonen:

1. **ISO 27001:2023-certificaat** (geaccrediteerd door RvA of equivalent) of bewijs van lopende certificeringstraject — primair bewijs.
2. **Verklaring van Toepasselijkheid** met BIO-overheidsmaatregelen expliciet opgenomen of expliciet uitgesloten met motivering (in bijlage "Uitzonderingen op de VvT").
3. **Gap-rapport BIO** waaruit blijkt welke BIO-overheidsmaatregelen zijn geïmplementeerd en welke nog open staan met plan en tijdslijn.
4. **Verwerkersovereenkomst (DPA)** afgestemd op de overheidsklant (Rijks-model, VNG-model, of klant-specifiek).
5. **CVD-procedure** gepubliceerd op de website conform NCSC-leidraad of ISO 29147.

---

## 6. Quick-check voor uw organisatie

Acht vragen, met letterlijke verwijzing naar de BIO2-maatregel:

| # | Vraag | Verwijzing | Antwoord ja → conform | Antwoord nee → te bouwen |
|---|---|---|---|---|
| 1 | Heeft u een ISO 27001:2023-certificaat (of bent u in pre-audit fase)? | BIO2 § 10 + 4 | ✓ | Begin met gap-analyse |
| 2 | Is uw VvT opgesteld inclusief expliciete BIO-overheidsmaatregelen en bijlage Uitzonderingen? | BIO2 § 7 | ✓ | VvT uitbreiden |
| 3 | Heeft u een CISO formeel aangewezen met bevoegdheid onafhankelijk te rapporteren aan bestuur? | 5.02.02 | ✓ | CISO-functie inrichten |
| 4 | Past u MFA toe op primaire werkomgeving, internet-bereikbare voorzieningen en beheerrechten-accounts? | 5.17.01 | ✓ | MFA uitrollen + mitigatie definiëren |
| 5 | Heeft u een CVD-procedure gepubliceerd volgens NCSC-leidraad of ISO 29147? | 5.24.08 | ✓ | CVD-procedure publiceren |
| 6 | Is uw meldprocedure ingericht om significante incidenten binnen wettelijke termijn aan het CSIRT te melden? | 5.24.07 | ✓ | Meldprocedure aanvullen |
| 7 | Bewaart u (vermoedelijke) IB-incident-informatie en bijbehorende logging minimaal drie jaar? | 5.28.01 | ✓ | Retentie aanpassen |
| 8 | Levert u jaarlijks een In Control Verklaring of vergelijkbaar instrument op? | 5.36.01 | ✓ | ICV-proces opzetten |

---

## 7. Vervolg

Na invulling van deze quick-check ontvangt u een gerichte gap-rapportage waarin per ontbrekende BIO-overheidsmaatregel een concreet implementatieadvies staat. Voor toetsing en signoff kan Annex27 als Lead Auditor optreden tijdens uw pre-audit, voorafgaand aan de officiële certificeringsaudit door een geaccrediteerde CI.

---

*Document opgesteld op basis van Baseline Informatiebeveiliging Overheid 2 (BIO2), versie 1.3 definitief (09-01-2026), uitgegeven door CIP in opdracht van het Ministerie van BZK. Alle verwijzingen naar overheidsmaatregelen volgen de BIO2-nummering. Bij specifieke vragen over toepassing op uw situatie: info@annex27.nl.*
