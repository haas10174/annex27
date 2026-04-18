# Gap-analyse vragen — kwaliteitsreview tegen DNV-methodiek

**Datum:** door Claude Opus 4.5 · **Gereviewde controls:** 114 · **Totale cost:** $5.16

*Gebaseerd op DNV Training Auditor Lead Auditor ISMS ISO 27001:2022 (Rev.7) cursusboek + proefexamen + eigen aantekeningen van Raoul Haas.*

---

## Samenvatting verdicts

- **replace**: 78 controls
- **ok**: 20 controls
- **weak**: 13 controls
- **add**: 3 controls

---

## Details per categorie

### Organisatorisch

#### ✅ A.5.1 — Beleid voor informatiebeveiliging

**Verdict:** `ok` (score 4/5) — Vraagset dekt de kernpunten die DNV toetst: formele goedkeuring door directie, periodieke review en communicatie, en inhoudelijke volledigheid (scope/doelstellingen/verantwoordelijkheden). Dit sluit aan bij DNV-cursusmateriaal over ISMS-beleid als topmanagement-verantwoordelijkheid (clausule 5.2).

**Huidige vragen (specific):**
- [doc] Is er een formeel informatiebeveiligingsbeleid dat is goedgekeurd door de directie?
- [impl] Wordt het beleid minimaal jaarlijks gereviewed en gecommuniceerd aan alle medewerkers?
- [content] Bevat het beleid duidelijke verwijzingen naar de ISMS-scope, doelstellingen en verantwoordelijkheden?

---

#### ➕ A.5.2 — Rollen en verantwoordelijkheden

**Verdict:** `add` (score 3/5) — DNV-methodologie vraagt ook naar communicatie van rollen aan betrokkenen en bewijs dat medewerkers hun verantwoordelijkheden kennen. Huidige vragen focussen alleen op documentatie (RACI), niet op effectieve communicatie en begrip.

**Huidige vragen (specific):**
- [doc] Zijn alle informatiebeveiligingsrollen (CISO, IT-beheer, management) formeel vastgelegd?
- [impl] Is er een RACI-matrix die verantwoordelijkheden per proces beschrijft?

**➕ Toevoegen:**
- Worden informatiebeveiligingsverantwoordelijkheden actief gecommuniceerd aan alle betrokken medewerkers en begrijpen zij deze?

---

#### 🔄 A.5.3 — Scheiding van taken

**Verdict:** `replace` (score 2/5) — Default-vragen zijn te generiek. DNV toetst specifiek op conflicterende taken (bv. goedkeuren en uitvoeren van betalingen, ontwikkelen en vrijgeven van code). Examenvragen focussen op concrete voorbeelden van functiescheiding.

**Huidige vragen (default):**
- [doc] Is scheiding van taken formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt scheiding van taken actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is scheiding van taken formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn kritieke taken (zoals goedkeuren/uitvoeren, ontwikkelen/vrijgeven) expliciet gescheiden en gedocumenteerd?
- ❌ Wordt scheiding van taken actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt periodiek gecontroleerd dat geen medewerker conflicterende rechten heeft (bijv. via access review)?

---

#### 🔄 A.5.4 — Managementverantwoordelijkheden

**Verdict:** `replace` (score 2/5) — DNV-cursus benadrukt dat management betrokkenheid moet aantonen via concrete acties: middelen toewijzen, beleid onderschrijven, voorbeeldgedrag. Default-vragen missen deze specificiteit zoals gevraagd in proefexamen vraag 2.2.

**Huidige vragen (default):**
- [doc] Is managementverantwoordelijkheden formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt managementverantwoordelijkheden actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is managementverantwoordelijkheden formeel gedocumenteerd en goedgekeurd?
  → ✅ Heeft het management formeel het informatiebeveiligingsbeleid onderschreven en worden hiervoor adequate middelen toegewezen?
- ❌ Wordt managementverantwoordelijkheden actief toegepast en periodiek geëvalueerd?
  → ✅ Toont het management actieve betrokkenheid bij informatiebeveiliging (bijv. aanwezigheid bij awareness-sessies, behandeling in MT-vergaderingen)?

---

#### 🔄 A.5.5 — Contact met autoriteiten

**Verdict:** `replace` (score 2/5) — DNV verwacht concrete contactgegevens en procedures voor specifieke autoriteiten (NCSC, AP, politie). Default-vragen zijn te vaag voor een MKB gap-analyse.

**Huidige vragen (default):**
- [doc] Is contact met autoriteiten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt contact met autoriteiten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is contact met autoriteiten formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een actuele contactlijst met relevante autoriteiten (AP, NCSC, politie) en is duidelijk wanneer contact opgenomen moet worden?
- ❌ Wordt contact met autoriteiten actief toegepast en periodiek geëvalueerd?
  → ✅ Weten de verantwoordelijke medewerkers welke autoriteiten te benaderen bij een datalek of cyberincident?

---

#### 🔄 A.5.6 — Contact met speciale belangengroepen

**Verdict:** `replace` (score 2/5) — DNV-cursusmateriaal noemt expliciet brancheverenigingen, ISAC's en security communities. Default-vragen geven geen richting voor MKB om te bepalen wat 'speciale belangengroepen' zijn.

**Huidige vragen (default):**
- [doc] Is contact met speciale belangengroepen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt contact met speciale belangengroepen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is contact met speciale belangengroepen formeel gedocumenteerd en goedgekeurd?
  → ✅ Heeft de organisatie contact met relevante security-communities of brancheverenigingen (bijv. branche-ISAC, DTC)?
- ❌ Wordt contact met speciale belangengroepen actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt informatie uit deze netwerken actief gebruikt voor het verbeteren van de beveiliging?

---

#### ✅ A.5.7 — Threat intelligence

**Verdict:** `ok` (score 4/5) — Vraagset dekt de DNV-kernpunten: actieve verzameling van threat intelligence, beoordeling op relevantie, en koppeling naar maatregelen. Dit is een nieuwe control in 2022 die goed wordt afgedekt.

**Huidige vragen (specific):**
- [impl] Wordt er actief threat intelligence verzameld (NCSC, CVE-databases, leveranciers)?
- [proc] Is er een proces om dreigingsmeldingen te beoordelen op relevantie voor uw organisatie?
- [impl] Worden relevante dreigingen geregistreerd en worden maatregelen geïnitieerd?

---

#### 🔄 A.5.8 — IB in projectmanagement

**Verdict:** `replace` (score 2/5) — DNV toetst of IB-eisen worden meegenomen in projectfasering (initiation, planning, execution). Default-vragen missen concrete toetsing van projectmethodiek-integratie.

**Huidige vragen (default):**
- [doc] Is ib in projectmanagement formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ib in projectmanagement actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is ib in projectmanagement formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden informatiebeveiligingseisen standaard meegenomen in projectinitiatie en -planning (bijv. via checklist of gate review)?
- ❌ Wordt ib in projectmanagement actief toegepast en periodiek geëvalueerd?
  → ✅ Is er bewijs dat recente projecten een IB-risicobeoordeling hebben ondergaan voordat ze in productie gingen?

---

#### ✅ A.5.9 — Inventarisatie van assets

**Verdict:** `ok` (score 4/5) — Vraagset dekt DNV-kernpunten: actueel register, eigenaarschap per asset, periodieke actualisering. Dit sluit aan bij de cursus over asset management als basis voor risicobeoordeling.

**Huidige vragen (specific):**
- [doc] Is er een actueel register van alle informatie-assets (hardware, software, data, diensten)?
- [impl] Heeft elk asset een aangewezen eigenaar?
- [proc] Wordt het register minimaal jaarlijks geactualiseerd?

---

#### 🔄 A.5.10 — Acceptabel gebruik

**Verdict:** `replace` (score 2/5) — DNV verwacht een Acceptable Use Policy met concrete gedragsregels (privégebruik, social media, BYOD). Default-vragen zijn te abstract voor praktische gap-analyse.

**Huidige vragen (default):**
- [doc] Is acceptabel gebruik formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt acceptabel gebruik actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is acceptabel gebruik formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een Acceptable Use Policy die regels stelt voor privégebruik van bedrijfsmiddelen, social media en BYOD?
- ❌ Wordt acceptabel gebruik actief toegepast en periodiek geëvalueerd?
  → ✅ Ondertekenen medewerkers de AUP en worden overtredingen geregistreerd en opgevolgd?

---

#### 🔄 A.5.11 — Teruggave van assets

**Verdict:** `replace` (score 2/5) — DNV toetst op offboarding-procedure inclusief toegangsintrekking en fysieke teruggave. Default-vragen missen de link met HR-processen die in cursusmateriaal wordt benadrukt.

**Huidige vragen (default):**
- [doc] Is teruggave van assets formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt teruggave van assets actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is teruggave van assets formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een offboarding-checklist die teruggave van bedrijfsmiddelen (laptop, toegangspas, tokens) afdwingt?
- ❌ Wordt teruggave van assets actief toegepast en periodiek geëvalueerd?
  → ✅ Worden toegangsrechten direct bij uitdiensttreding ingetrokken en wordt dit gelogd?

---

#### 🔄 A.5.12 — Classificatie van informatie

**Verdict:** `replace` (score 2/5) — DNV verwacht classificatieschema met concrete niveaus (bijv. openbaar/intern/vertrouwelijk/geheim) en criteria. Default-vragen geven geen handvatten voor praktische invulling.

**Huidige vragen (default):**
- [doc] Is classificatie van informatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt classificatie van informatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is classificatie van informatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een classificatieschema met minimaal 3 niveaus (bijv. openbaar, intern, vertrouwelijk) en duidelijke criteria?
- ❌ Wordt classificatie van informatie actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt informatie daadwerkelijk geclassificeerd bij creatie en wordt dit periodiek gecontroleerd?

---

#### 🔄 A.5.13 — Labeling van informatie

**Verdict:** `replace` (score 2/5) — DNV toetst of labeling consistent wordt toegepast (visueel en in metadata). Default-vragen missen de praktische uitwerking van labeling-methoden.

**Huidige vragen (default):**
- [doc] Is labeling van informatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt labeling van informatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is labeling van informatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een procedure voor het labelen van documenten en e-mails conform het classificatieschema?
- ❌ Wordt labeling van informatie actief toegepast en periodiek geëvalueerd?
  → ✅ Worden vertrouwelijke documenten daadwerkelijk gemarkeerd (bijv. watermerk, header/footer, metadata)?

---

#### 🔄 A.5.14 — Informatieoverdracht

**Verdict:** `replace` (score 2/5) — DNV verwacht regels voor veilige overdracht (encryptie, geautoriseerde kanalen). Default-vragen missen de technische en procedurele aspecten uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is informatieoverdracht formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt informatieoverdracht actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is informatieoverdracht formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn er regels voor veilige overdracht van vertrouwelijke informatie (bijv. verplichte encryptie, goedgekeurde bestandsuitwisselingsdiensten)?
- ❌ Wordt informatieoverdracht actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt gecontroleerd dat medewerkers geen vertrouwelijke informatie via onbeveiligde kanalen versturen (bijv. privé-email)?

---

#### ✅ A.5.15 — Toegangsbeveiliging

**Verdict:** `ok` (score 4/5) — Vraagset dekt DNV-kernpunten: need-to-know/least privilege beleid, formeel aanvraag-/goedkeuringsproces, periodieke review. Dit zijn de kernelementen uit de cursus over toegangsbeheer.

**Huidige vragen (specific):**
- [doc] Is er een formeel toegangsbeleid op basis van need-to-know en least privilege?
- [proc] Worden toegangsrechten formeel aangevraagd, goedgekeurd en geregistreerd?
- [impl] Worden toegangsrechten periodiek gereviewed (minimaal halfjaarlijks)?

---

#### 🔄 A.5.16 — Identiteitsbeheer

**Verdict:** `replace` (score 2/5) — DNV toetst op lifecycle van identiteiten (aanmaken, wijzigen, verwijderen) en unieke identificatie. Default-vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is identiteitsbeheer formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt identiteitsbeheer actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is identiteitsbeheer formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een proces voor het aanmaken, wijzigen en verwijderen van gebruikersaccounts met unieke identificatie per persoon?
- ❌ Wordt identiteitsbeheer actief toegepast en periodiek geëvalueerd?
  → ✅ Worden inactieve accounts periodiek geïdentificeerd en opgeschoond (bijv. na 90 dagen geen login)?

---

#### ✅ A.5.17 — Authenticatie-informatie

**Verdict:** `ok` (score 4/5) — Vraagset dekt de DNV-kernpunten goed: wachtwoordbeleid met MFA, implementatie op kritieke systemen, en wachtwoordmanager. Dit sluit aan bij de cursus over authenticatie-eisen.

**Huidige vragen (specific):**
- [doc] Is er een wachtwoordbeleid met eisen aan lengte, complexiteit en MFA?
- [impl] Is MFA geïmplementeerd op alle bedrijfskritieke applicaties?
- [impl] Wordt het gebruik van een wachtwoordmanager verplicht gesteld?

---

#### ⚠️ A.5.18 — Toegangsrechten

**Verdict:** `weak` (score 2/5) — A.5.18 overlapt met A.5.15 maar focust op provisioning/deprovisioning. Default-vragen zijn identiek aan A.5.15 en missen de specifieke focus op tijdige toekenning en intrekking.

**Huidige vragen (default):**
- [doc] Is toegangsrechten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt toegangsrechten actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden toegangsrechten tijdig ingetrokken bij functiewijziging of uitdiensttreding (bijv. binnen 24 uur)?

**🔄 Vervangen:**
- ❌ Is toegangsrechten formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een procedure voor het tijdig provisionen en deprovisioneren van toegangsrechten bij in-, door- en uitstroom?

---

#### 🔄 A.5.19 — IB in leveranciersrelaties

**Verdict:** `replace` (score 2/5) — DNV verwacht risicobeoordeling van leveranciers en contractuele IB-eisen. Default-vragen missen de link met leveranciersrisicomanagement uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is ib in leveranciersrelaties formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ib in leveranciersrelaties actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is ib in leveranciersrelaties formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden leveranciers die toegang hebben tot bedrijfsinformatie beoordeeld op informatiebeveiligingsrisico's?
- ❌ Wordt ib in leveranciersrelaties actief toegepast en periodiek geëvalueerd?
  → ✅ Is er een register van kritieke leveranciers en worden hun beveiligingsmaatregelen periodiek geëvalueerd?

---

#### 🔄 A.5.20 — IB in leveranciersovereenkomsten

**Verdict:** `replace` (score 2/5) — DNV toetst op specifieke contractclausules (verwerkersovereenkomst, audit-recht, incident-notificatie). Default-vragen missen deze concrete eisen.

**Huidige vragen (default):**
- [doc] Is ib in leveranciersovereenkomsten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ib in leveranciersovereenkomsten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is ib in leveranciersovereenkomsten formeel gedocumenteerd en goedgekeurd?
  → ✅ Bevatten leverancierscontracten clausules over geheimhouding, verwerkersovereenkomst (indien van toepassing), en audit-recht?
- ❌ Wordt ib in leveranciersovereenkomsten actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn er afspraken over incidentmelding door leveranciers en worden deze nageleefd?

---

#### 🔄 A.5.21 — ICT-toeleveringsketen

**Verdict:** `replace` (score 2/5) — DNV vraagt naar supply chain risico's en doorlevering. Default-vragen missen de ketenaspecten die in het cursusmateriaal worden benadrukt.

**Huidige vragen (default):**
- [doc] Is ict-toeleveringsketen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ict-toeleveringsketen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is ict-toeleveringsketen formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er inzicht in de ICT-toeleveringsketen en worden risico's van subleveranciers beoordeeld?
- ❌ Wordt ict-toeleveringsketen actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn er eisen aan leveranciers over het doorgeven van beveiligingseisen aan hun subleveranciers?

---

#### 🔄 A.5.22 — Monitoring leveranciersdiensten

**Verdict:** `replace` (score 2/5) — DNV verwacht monitoring van SLA's en beveiligingsrapportages van leveranciers. Default-vragen missen concrete monitoring-aspecten.

**Huidige vragen (default):**
- [doc] Is monitoring leveranciersdiensten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt monitoring leveranciersdiensten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is monitoring leveranciersdiensten formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden beveiligingsaspecten van leveranciersdiensten actief gemonitord (bijv. via SLA-rapportages, audits)?
- ❌ Wordt monitoring leveranciersdiensten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden wijzigingen in leveranciersdiensten beoordeeld op beveiligingsimpact voordat ze worden geaccepteerd?

---

#### ✅ A.5.23 — Clouddiensten beveiliging

**Verdict:** `ok` (score 4/5) — Vraagset dekt DNV-kernpunten: beleid/selectiecriteria, voorkomen shadow IT, datalocatie en verwerkersovereenkomsten. Dit is een nieuwe control in 2022 die goed wordt behandeld.

**Huidige vragen (specific):**
- [doc] Is er een beleid voor het gebruik van clouddiensten met selectiecriteria?
- [impl] Worden alleen goedgekeurde clouddiensten gebruikt (geen shadow IT)?
- [proc] Is de datalocatie (EU/EER) gewaarborgd en zijn verwerkersovereenkomsten afgesloten?

---

#### ✅ A.5.24 — Incidentmanagement planning

**Verdict:** `ok` (score 4/5) — Vraagset dekt de DNV-kernpunten: gedocumenteerd plan, meldprocedure bekend bij medewerkers, periodieke tests. Dit sluit aan bij de cursus over incidentmanagement planning.

**Huidige vragen (specific):**
- [doc] Is er een gedocumenteerd incident response plan met duidelijke escalatieprocedure?
- [impl] Weten alle medewerkers hoe en waar zij beveiligingsincidenten moeten melden?
- [proc] Wordt het incident response plan minimaal jaarlijks getest (tabletop of simulatie)?

---

#### 🔄 A.5.25 — Beoordeling IB-gebeurtenissen

**Verdict:** `replace` (score 2/5) — DNV toetst op triageproces: hoe wordt bepaald of een gebeurtenis een incident is? Default-vragen missen dit onderscheid uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is beoordeling ib-gebeurtenissen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beoordeling ib-gebeurtenissen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beoordeling ib-gebeurtenissen formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een triageproces om te bepalen of een beveiligingsgebeurtenis een incident is dat verdere actie vereist?
- ❌ Wordt beoordeling ib-gebeurtenissen actief toegepast en periodiek geëvalueerd?
  → ✅ Worden alle beveiligingsmeldingen geregistreerd en beoordeeld, ook als ze geen incident blijken te zijn?

---

#### 🔄 A.5.26 — Respons op incidenten

**Verdict:** `replace` (score 2/5) — DNV verwacht concrete responsacties: containment, eradicatie, herstel. Default-vragen missen de fasen van incident response uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is respons op incidenten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt respons op incidenten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is respons op incidenten formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn er procedures voor containment, eradicatie en herstel bij beveiligingsincidenten?
- ❌ Wordt respons op incidenten actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn rollen en verantwoordelijkheden tijdens een incident duidelijk (wie doet wat, wie beslist)?

---

#### 🔄 A.5.27 — Leren van incidenten

**Verdict:** `replace` (score 2/5) — DNV toetst op root cause analyse en doorvoering van verbeteringen. Default-vragen missen de feedbackloop uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is leren van incidenten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt leren van incidenten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is leren van incidenten formeel gedocumenteerd en goedgekeurd?
  → ✅ Wordt na elk significant incident een root cause analyse uitgevoerd?
- ❌ Wordt leren van incidenten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden lessons learned vastgelegd en leiden deze tot concrete verbeteringen in procedures of maatregelen?

---

#### 🔄 A.5.28 — Verzameling van bewijsmateriaal

**Verdict:** `replace` (score 2/5) — DNV verwacht forensic readiness: chain of custody, bewijsbehoud. Default-vragen missen de juridische aspecten uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is verzameling van bewijsmateriaal formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt verzameling van bewijsmateriaal actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is verzameling van bewijsmateriaal formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een procedure voor het veiligstellen van digitaal bewijsmateriaal bij incidenten (forensic readiness)?
- ❌ Wordt verzameling van bewijsmateriaal actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt de chain of custody gewaarborgd bij het verzamelen en bewaren van bewijsmateriaal?

---

#### ✅ A.5.29 — IB tijdens verstoring

**Verdict:** `ok` (score 4/5) — Vraagset dekt DNV-kernpunten: BCP met RPO/RTO, backup-hersteltests, uitwijkprocedure. Dit sluit goed aan bij de cursus over bedrijfscontinuïteit.

**Huidige vragen (specific):**
- [doc] Is er een business continuity plan met RPO/RTO per kritiek systeem?
- [impl] Worden backup-hersteltesten periodiek uitgevoerd en gedocumenteerd?
- [proc] Is er een uitwijkprocedure voor het geval de primaire locatie of systemen uitvallen?

---

#### ⚠️ A.5.30 — ICT-gereedheid bedrijfscontinuïteit

**Verdict:** `weak` (score 2/5) — A.5.30 overlapt met A.5.29 maar focust specifiek op ICT-infrastructuur gereedheid. Default-vragen zijn te generiek en onderscheiden zich niet van A.5.29.

**Huidige vragen (default):**
- [doc] Is ict-gereedheid bedrijfscontinuïteit formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ict-gereedheid bedrijfscontinuïteit actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Zijn er redundante ICT-systemen of fail-over mogelijkheden voor bedrijfskritieke toepassingen?

**🔄 Vervangen:**
- ❌ Is ict-gereedheid bedrijfscontinuïteit formeel gedocumenteerd en goedgekeurd?
  → ✅ Is de ICT-infrastructuur ingericht om bedrijfscontinuïteitsdoelen (RPO/RTO) te halen (bijv. redundantie, disaster recovery site)?

---

#### 🔄 A.5.31 — Wettelijke vereisten

**Verdict:** `replace` (score 2/5) — DNV verwacht identificatie van relevante wet- en regelgeving (AVG, NIS2, sectorspecifiek). Default-vragen missen concrete wettelijke kaders.

**Huidige vragen (default):**
- [doc] Is wettelijke vereisten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt wettelijke vereisten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is wettelijke vereisten formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een register van relevante wet- en regelgeving (bijv. AVG, NIS2, sectorspecifieke wetgeving) en wordt naleving getoetst?
- ❌ Wordt wettelijke vereisten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden wijzigingen in wet- en regelgeving actief gevolgd en geïmplementeerd?

---

#### 🔄 A.5.32 — Intellectuele eigendomsrechten

**Verdict:** `replace` (score 2/5) — DNV toetst op licentieregisters en voorkomen van illegale software. Default-vragen missen deze praktische aspecten.

**Huidige vragen (default):**
- [doc] Is intellectuele eigendomsrechten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt intellectuele eigendomsrechten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is intellectuele eigendomsrechten formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een register van softwarelicenties en wordt gecontroleerd dat alleen legaal gelicentieerde software wordt gebruikt?
- ❌ Wordt intellectuele eigendomsrechten actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt periodiek gecontroleerd op ongeautoriseerde software (bijv. via software asset management)?

---

#### 🔄 A.5.33 — Bescherming van registraties

**Verdict:** `replace` (score 2/5) — DNV verwacht retentiebeleid en bescherming tegen ongeautoriseerde wijziging/vernietiging. Default-vragen missen deze concrete eisen.

**Huidige vragen (default):**
- [doc] Is bescherming van registraties formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt bescherming van registraties actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is bescherming van registraties formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een retentiebeleid dat aangeeft hoe lang verschillende soorten registraties bewaard moeten worden?
- ❌ Wordt bescherming van registraties actief toegepast en periodiek geëvalueerd?
  → ✅ Worden registraties beschermd tegen ongeautoriseerde wijziging of vroegtijdige vernietiging?

---

#### 🔄 A.5.34 — Privacy en PII

**Verdict:** `replace` (score 2/5) — DNV toetst op AVG-compliance: verwerkingsregister, privacy by design, rechten betrokkenen. Default-vragen zijn te generiek voor dit kritieke onderwerp.

**Huidige vragen (default):**
- [doc] Is privacy en pii formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt privacy en pii actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is privacy en pii formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een verwerkingsregister conform AVG en worden persoonsgegevens alleen verwerkt met geldige grondslag?
- ❌ Wordt privacy en pii actief toegepast en periodiek geëvalueerd?
  → ✅ Kunnen betrokkenen hun AVG-rechten (inzage, correctie, verwijdering) uitoefenen en is hier een procedure voor?

---

#### 🔄 A.5.35 — Onafhankelijke beoordeling IB

**Verdict:** `replace` (score 2/5) — DNV verwacht periodieke onafhankelijke reviews (intern of extern). Default-vragen specificeren niet wat 'onafhankelijk' inhoudt.

**Huidige vragen (default):**
- [doc] Is onafhankelijke beoordeling ib formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt onafhankelijke beoordeling ib actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is onafhankelijke beoordeling ib formeel gedocumenteerd en goedgekeurd?
  → ✅ Wordt het ISMS periodiek onafhankelijk beoordeeld (bijv. door interne audit of externe partij die niet bij implementatie betrokken was)?
- ❌ Wordt onafhankelijke beoordeling ib actief toegepast en periodiek geëvalueerd?
  → ✅ Worden bevindingen uit onafhankelijke beoordelingen aantoonbaar opgevolgd en afgesloten?

---

#### 🔄 A.5.36 — Naleving beleid en normen

**Verdict:** `replace` (score 2/5) — DNV toetst op actieve controle van naleving door managers. Default-vragen missen de verantwoordelijkheid van management uit het cursusmateriaal.

**Huidige vragen (default):**
- [doc] Is naleving beleid en normen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt naleving beleid en normen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is naleving beleid en normen formeel gedocumenteerd en goedgekeurd?
  → ✅ Controleren managers binnen hun verantwoordelijkheidsgebied actief de naleving van informatiebeveiligingsbeleid?
- ❌ Wordt naleving beleid en normen actief toegepast en periodiek geëvalueerd?
  → ✅ Worden nalevingscontroles gedocumenteerd en worden afwijkingen gecorrigeerd?

---

#### 🔄 A.5.37 — Gedocumenteerde procedures

**Verdict:** `replace` (score 2/5) — DNV verwacht operationele procedures voor kritieke activiteiten. Default-vragen zijn meta (vraagt of procedures gedocumenteerd zijn) in plaats van inhoudelijk.

**Huidige vragen (default):**
- [doc] Is gedocumenteerde procedures formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt gedocumenteerde procedures actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is gedocumenteerde procedures formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn er gedocumenteerde operationele procedures voor kritieke IB-activiteiten (bijv. backup, patching, toegangsbeheer)?
- ❌ Wordt gedocumenteerde procedures actief toegepast en periodiek geëvalueerd?
  → ✅ Worden operationele procedures periodiek gereviewed en bijgewerkt bij wijzigingen in systemen of processen?

---

### Personeel

#### ✅ A.6.1 — Screening

**Verdict:** `ok` (score 4/5) — Vragen dekken de kernaspecten van screening: verificatie van identiteit/diploma/VOG en proportionaliteit t.o.v. toegangsniveau. DNV-cursusmateriaal (p.23-24) benoemt screening als mensgerichte beheersmaatregel waarbij achtergrondcontrole en proportionaliteit centraal staan. Voor MKB voldoende.

**Huidige vragen (specific):**
- [proc] Worden medewerkers gescreend bij indiensttreding (identiteit, diploma, VOG)?
- [impl] Is de screening proportioneel aan het niveau van toegang tot informatie?

---

#### 🔄 A.6.2 — Arbeidsvoorwaarden

**Verdict:** `replace` (score 2/5) — Default vragen zijn te generiek. DNV-materiaal benadrukt dat arbeidsovereenkomsten expliciet informatiebeveiligingsverantwoordelijkheden moeten bevatten, inclusief verplichtingen na beëindiging. Proefexamen toont dat auditors specifiek zoeken naar beveiligingsclausules in contracten.

**Huidige vragen (default):**
- [doc] Is arbeidsvoorwaarden formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt arbeidsvoorwaarden actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is arbeidsvoorwaarden formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Bevatten arbeidsovereenkomsten expliciete clausules over informatiebeveiligingsverantwoordelijkheden?
- ❌ [impl] Wordt arbeidsvoorwaarden actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Worden medewerkers bij indiensttreding geïnformeerd over hun IB-verantwoordelijkheden en tekenen zij hiervoor?

---

#### ➕ A.6.3 — Bewustwording en training

**Verdict:** `add` (score 3/5) — Huidige vragen focussen op awareness-activiteiten maar missen de DNV-kerneis: evaluatie van effectiviteit. Proefexamen vraag 4.3 toont expliciet dat 'tevredenheid meten' onvoldoende is - competentie/effectiviteit moet worden geëvalueerd. Dit is een veelvoorkomende audit-afwijking.

**Huidige vragen (specific):**
- [impl] Ontvangen alle medewerkers jaarlijks een verplichte awareness-training?
- [impl] Worden phishing-simulaties uitgevoerd (minimaal 2x per jaar)?
- [proc] Wordt het deelnamepercentage en de toetsscore bijgehouden?

**➕ Toevoegen:**
- [impl] Wordt de effectiviteit van trainingen geëvalueerd (niet alleen tevredenheid, maar ook begrip/gedragsverandering)?

---

#### 🔄 A.6.4 — Disciplinair proces

**Verdict:** `replace` (score 2/5) — Default vragen zijn te generiek. DNV-cursusmateriaal specificeert dat disciplinaire processen moeten aansluiten op informatiebeveiligingsschendingen en dat medewerkers hiervan op de hoogte moeten zijn. Het proces moet proportioneel en gedocumenteerd zijn.

**Huidige vragen (default):**
- [doc] Is disciplinair proces formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt disciplinair proces actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is disciplinair proces formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Is er een gedocumenteerd disciplinair proces dat specifiek ingaat op schendingen van informatiebeveiligingsbeleid?
- ❌ [impl] Wordt disciplinair proces actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Zijn medewerkers aantoonbaar geïnformeerd over de consequenties van IB-schendingen?

---

#### 🔄 A.6.5 — Verantwoordelijkheden bij beëindiging

**Verdict:** `replace` (score 2/5) — Default vragen missen concrete auditable aspecten. DNV-materiaal en ISO 27002 benadrukken: intrekken toegangsrechten, retourneren bedrijfsmiddelen, overdracht van kennis, en voortdurende geheimhoudingsplicht. Case study GetRich Bank toont risico's bij ontbreken van exit-procedures.

**Huidige vragen (default):**
- [doc] Is verantwoordelijkheden bij beëindiging formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt verantwoordelijkheden bij beëindiging actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is verantwoordelijkheden bij beëindiging formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Is er een off-boarding checklist met IB-aspecten (toegang intrekken, bedrijfsmiddelen retourneren, kennisoverdracht)?
- ❌ [impl] Wordt verantwoordelijkheden bij beëindiging actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Wordt bij vertrek van medewerkers aantoonbaar toegang ingetrokken binnen 24 uur?

---

#### 🔄 A.6.6 — Geheimhoudingsovereenkomsten

**Verdict:** `replace` (score 2/5) — Default vragen zijn te generiek. DNV-cursusmateriaal (p.23-24) noemt NDA's/geheimhoudingsovereenkomsten expliciet. Auditors zoeken naar: scope van geheimhouding, duur (ook na dienstverband), en dat externe partijen ook NDA's tekenen.

**Huidige vragen (default):**
- [doc] Is geheimhoudingsovereenkomsten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt geheimhoudingsovereenkomsten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is geheimhoudingsovereenkomsten formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Zijn er NDA's die ook gelden na beëindiging dienstverband en voor toegang door derden?
- ❌ [impl] Wordt geheimhoudingsovereenkomsten actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Tekenen alle medewerkers en relevante externe partijen een NDA voordat zij toegang krijgen tot vertrouwelijke informatie?

---

#### 🔄 A.6.7 — Werken op afstand

**Verdict:** `replace` (score 2/5) — Default vragen missen concrete beveiligingsaspecten. DNV-materiaal benoemt werken op afstand als nieuwe control in 2022 versie. Auditors zoeken naar: beveiligde verbindingen, fysieke beveiliging thuiswerkplek, en beleid voor gebruik van eigen apparatuur (BYOD).

**Huidige vragen (default):**
- [doc] Is werken op afstand formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt werken op afstand actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is werken op afstand formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Is er een thuiswerkbeleid dat eisen stelt aan beveiligde verbindingen (VPN) en fysieke beveiliging van de werkplek?
- ❌ [impl] Wordt werken op afstand actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Gebruiken thuiswerkers verplicht een VPN-verbinding voor toegang tot bedrijfssystemen?

---

#### 🔄 A.6.8 — Rapportage IB-gebeurtenissen

**Verdict:** `replace` (score 2/5) — Default vragen zijn te generiek. DNV-proefexamen en cursusmateriaal benadrukken: laagdrempeligheid van melden, bekendheid bij medewerkers, en geen negatieve consequenties voor melders. Case study toont dat incidenten soms niet gemeld worden door gebrek aan procedure.

**Huidige vragen (default):**
- [doc] Is rapportage ib-gebeurtenissen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt rapportage ib-gebeurtenissen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is rapportage ib-gebeurtenissen formeel gedocumenteerd en goedgekeurd?
  → ✅ [doc] Is er een duidelijke procedure voor het melden van IB-incidenten die bekend is bij alle medewerkers?
- ❌ [impl] Wordt rapportage ib-gebeurtenissen actief toegepast en periodiek geëvalueerd?
  → ✅ [impl] Weten medewerkers hoe en bij wie zij een beveiligingsincident moeten melden?

---

### Fysiek

#### ✅ A.7.1 — Fysieke beveiligingsperimeters

**Verdict:** `ok` (score 4/5) — Vragen dekken DNV-kernpunten: gedefinieerde zones, toegangscontrole en bezoekersregistratie. DNV cursusmateriaal benadrukt fysieke beveiligingszones en begeleid bezoek als essentieel.

**Huidige vragen (specific):**
- [impl] Zijn er gedefinieerde beveiligingszones met passende toegangscontrole?
- [proc] Worden bezoekers geregistreerd en begeleid in beveiligde zones?

---

#### ⚠️ A.7.2 — Fysieke toegang

**Verdict:** `weak` (score 2/5) — Default vragen zijn te generiek. DNV-methodiek verwacht specifieke toetsing van toegangsmechanismen (badges, biometrie), autorisatieprocessen en intrekking bij uitdiensttreding.

**Huidige vragen (default):**
- [doc] Is fysieke toegang formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt fysieke toegang actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden toegangsrechten ingetrokken bij uitdiensttreding of functiewijziging?

**🔄 Vervangen:**
- ❌ Wordt fysieke toegang actief toegepast en periodiek geëvalueerd?
  → ✅ Welke fysieke toegangsmechanismen worden gebruikt (badges, codes, biometrie) en hoe wordt autorisatie gevalideerd?

---

#### ⚠️ A.7.3 — Beveiliging kantoren en faciliteiten

**Verdict:** `weak` (score 2/5) — Default vragen missen concrete aspecten die DNV toetst: beveiligde opslag van gevoelige documenten, vergaderruimtes met vertrouwelijke gesprekken, ontvangstruimtes gescheiden van werkruimtes.

**Huidige vragen (default):**
- [doc] Is beveiliging kantoren en faciliteiten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiliging kantoren en faciliteiten actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Zijn vergaderruimtes waar vertrouwelijke informatie besproken wordt adequaat beveiligd tegen afluisteren?

**🔄 Vervangen:**
- ❌ Wordt beveiliging kantoren en faciliteiten actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn werkruimtes met gevoelige informatie fysiek gescheiden van publiek toegankelijke zones?

---

#### ⚠️ A.7.4 — Fysieke beveiligingsmonitoring

**Verdict:** `weak` (score 2/5) — Dit is een nieuwe control in 2022 die DNV specifiek toetst. Default vragen missen concrete monitoring-aspecten zoals CCTV, alarmsystemen en retentie van beelden.

**Huidige vragen (default):**
- [doc] Is fysieke beveiligingsmonitoring formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt fysieke beveiligingsmonitoring actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden beelden van beveiligingscamera's bewaard conform wettelijke eisen en incidentonderzoek-behoeften?

**🔄 Vervangen:**
- ❌ Is fysieke beveiligingsmonitoring formeel gedocumenteerd en goedgekeurd?
  → ✅ Welke fysieke monitoringsystemen zijn geïmplementeerd (CCTV, alarmen, detectie) en worden deze actief gemonitord?

---

#### ⚠️ A.7.5 — Bescherming tegen omgevingsdreigingen

**Verdict:** `weak` (score 2/5) — DNV cursusmateriaal noemt expliciet brand, overstroming, aardbeving en stroomuitval. Default vragen toetsen dit niet concreet.

**Huidige vragen (default):**
- [doc] Is bescherming tegen omgevingsdreigingen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt bescherming tegen omgevingsdreigingen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is bescherming tegen omgevingsdreigingen formeel gedocumenteerd en goedgekeurd?
  → ✅ Welke maatregelen zijn getroffen tegen brand, waterschade, stroomuitval en andere omgevingsdreigingen?

---

#### ⚠️ A.7.6 — Werken in beveiligde zones

**Verdict:** `weak` (score 2/5) — DNV verwacht specifieke regels voor werken in beveiligde zones zoals datacenters: geen telefoons, begeleid werken, logboeken. Default vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is werken in beveiligde zones formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt werken in beveiligde zones actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Gelden er restricties voor elektronische apparatuur (telefoons, camera's) in beveiligde zones?

**🔄 Vervangen:**
- ❌ Wordt werken in beveiligde zones actief toegepast en periodiek geëvalueerd?
  → ✅ Worden activiteiten in beveiligde zones gelogd en wordt extern personeel altijd begeleid?

---

#### ✅ A.7.7 — Clear desk en clear screen

**Verdict:** `ok` (score 4/5) — Specifieke vragen over beleid en schermvergrendeling dekken de DNV-kernpunten. De 5-minuten timeout is een concrete, meetbare eis.

**Huidige vragen (specific):**
- [doc] Is er een clean desk / clear screen beleid?
- [impl] Is automatische schermvergrendeling ingesteld op maximaal 5 minuten?

---

#### ⚠️ A.7.8 — Plaatsing apparatuur

**Verdict:** `weak` (score 2/5) — DNV toetst specifiek: servers in beveiligde ruimtes, bescherming tegen meekijken op schermen, plaatsing weg van ramen/publiek. Default vragen missen dit.

**Huidige vragen (default):**
- [doc] Is plaatsing apparatuur formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt plaatsing apparatuur actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is plaatsing apparatuur formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn servers en kritieke systemen geplaatst in beveiligde ruimtes met adequate klimaatbeheersing?
- ❌ Wordt plaatsing apparatuur actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn beeldschermen met gevoelige informatie geplaatst zodat ongeautoriseerd meekijken wordt voorkomen?

---

#### ⚠️ A.7.9 — Beveiliging assets buiten terrein

**Verdict:** `weak` (score 2/5) — DNV examenvragen testen specifiek laptopbeleid, encryptie-eisen en autorisatie voor meenemen apparatuur. Default vragen zijn te generiek voor MKB-context.

**Huidige vragen (default):**
- [doc] Is beveiliging assets buiten terrein formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiliging assets buiten terrein actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beveiliging assets buiten terrein formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er beleid voor het meenemen van laptops en mobiele apparaten buiten kantoor, inclusief encryptie-eisen?
- ❌ Wordt beveiliging assets buiten terrein actief toegepast en periodiek geëvalueerd?
  → ✅ Moeten medewerkers autorisatie verkrijgen voor het meenemen van bedrijfsapparatuur en worden deze geregistreerd?

---

#### ⚠️ A.7.10 — Opslagmedia

**Verdict:** `weak` (score 2/5) — DNV toetst levenscyclus van media: classificatie, veilige opslag, transport en vernietiging. Default vragen dekken dit niet.

**Huidige vragen (default):**
- [doc] Is opslagmedia formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt opslagmedia actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden verwijderbare opslagmedia versleuteld indien ze gevoelige informatie bevatten?

**🔄 Vervangen:**
- ❌ Wordt opslagmedia actief toegepast en periodiek geëvalueerd?
  → ✅ Hoe worden opslagmedia (USB, externe schijven) beheerd gedurende hun levenscyclus tot aan vernietiging?

---

#### ⚠️ A.7.11 — Ondersteunende nutsvoorzieningen

**Verdict:** `weak` (score 2/5) — DNV cursus noemt expliciet UPS, noodstroomaggregaten en periodiek testen. Default vragen missen deze concrete aspecten.

**Huidige vragen (default):**
- [doc] Is ondersteunende nutsvoorzieningen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt ondersteunende nutsvoorzieningen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is ondersteunende nutsvoorzieningen formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn kritieke systemen aangesloten op noodstroomvoorzieningen (UPS) en worden deze periodiek getest?
- ❌ Wordt ondersteunende nutsvoorzieningen actief toegepast en periodiek geëvalueerd?
  → ✅ Is er redundantie in stroomvoorziening en klimaatbeheersing voor het datacenter of serverruimte?

---

#### ⚠️ A.7.12 — Beveiliging bekabeling

**Verdict:** `weak` (score 2/5) — DNV verwacht bescherming tegen aftappen, scheiding van stroom/data kabels, en labeling. Default vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is beveiliging bekabeling formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiliging bekabeling actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beveiliging bekabeling formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn netwerkkabels beschermd tegen ongeautoriseerde toegang en aftappen?
- ❌ Wordt beveiliging bekabeling actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn stroom- en datakabels gescheiden en is kritieke bekabeling gelabeld voor onderhoudsdoeleinden?

---

#### ⚠️ A.7.13 — Onderhoud apparatuur

**Verdict:** `weak` (score 2/5) — DNV toetst onderhoudsschema's, geautoriseerde technici en logging van onderhoud. Default vragen missen deze concrete aspecten.

**Huidige vragen (default):**
- [doc] Is onderhoud apparatuur formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt onderhoud apparatuur actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is onderhoud apparatuur formeel gedocumenteerd en goedgekeurd?
  → ✅ Wordt onderhoud aan kritieke apparatuur uitgevoerd volgens een gepland schema en door geautoriseerd personeel?
- ❌ Wordt onderhoud apparatuur actief toegepast en periodiek geëvalueerd?
  → ✅ Worden onderhoudsactiviteiten gelogd, inclusief wie het uitvoerde en welke handelingen zijn verricht?

---

#### ➕ A.7.14 — Veilige verwijdering apparatuur

**Verdict:** `add` (score 3/5) — Dit is een kritieke control die DNV expliciet toetst in examens (zie auditsituatie 4.1 over laptop verwijdering). Default vragen missen de concrete aspecten van data-sanitatie en verificatie.

**Huidige vragen (default):**
- [doc] Is veilige verwijdering apparatuur formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt veilige verwijdering apparatuur actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Wordt verwijdering van data geverifieerd voordat apparatuur wordt afgevoerd of hergebruikt?

**🔄 Vervangen:**
- ❌ Is veilige verwijdering apparatuur formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een procedure voor veilige verwijdering van apparatuur inclusief data-sanitatie (wissen of fysieke vernietiging)?

---

### Technologie

#### 🔄 A.8.1 — Gebruikersapparatuur

**Verdict:** `replace` (score 2/5) — DNV-methodiek vraagt specifiek naar endpoint device management, BYOD-beleid, en beveiligingsconfiguraties. De generieke vragen missen concrete aspecten zoals automatische schermvergrendeling, encryptie-eisen, en toestaan/blokkeren van USB-apparaten.

**Huidige vragen (default):**
- [doc] Is gebruikersapparatuur formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt gebruikersapparatuur actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is gebruikersapparatuur formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een beleid voor gebruikersapparatuur dat eisen stelt aan schermvergrendeling, encryptie, en toegestane apparaten (incl. BYOD)?
- ❌ Wordt gebruikersapparatuur actief toegepast en periodiek geëvalueerd?
  → ✅ Worden beveiligingsinstellingen op gebruikersapparatuur (laptops, mobiele devices) technisch afgedwongen en periodiek gecontroleerd?

---

#### 🔄 A.8.2 — Geprivilegieerde toegangsrechten

**Verdict:** `replace` (score 2/5) — ISO 27002 en DNV-cursusmateriaal benadrukken just-in-time provisioning, periodieke review van admin-rechten, en logging van privileged access. Generieke vragen dekken dit niet.

**Huidige vragen (default):**
- [doc] Is geprivilegieerde toegangsrechten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt geprivilegieerde toegangsrechten actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden geprivilegieerde toegangsrechten periodiek (minimaal kwartaallijks) gereviewd en ingetrokken wanneer niet meer nodig?

**🔄 Vervangen:**
- ❌ Is geprivilegieerde toegangsrechten formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een formeel proces voor toekenning, goedkeuring en logging van geprivilegieerde toegangsrechten (admin/root accounts)?

---

#### 🔄 A.8.3 — Beperking toegang tot informatie

**Verdict:** `replace` (score 2/5) — DNV toetst need-to-know principe, role-based access control, en technische afdwinging. Huidige vragen zijn te abstract.

**Huidige vragen (default):**
- [doc] Is beperking toegang tot informatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beperking toegang tot informatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beperking toegang tot informatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is toegang tot informatie beperkt volgens het need-to-know principe en role-based access control?
- ❌ Wordt beperking toegang tot informatie actief toegepast en periodiek geëvalueerd?
  → ✅ Worden toegangsrechten tot gevoelige informatie minimaal jaarlijks gereviewd op basis van functie/rol?

---

#### 🔄 A.8.4 — Toegang tot broncode

**Verdict:** `replace` (score 2/5) — GetRich Bank case study toont specifiek risico's rond broncode-beveiliging (crack keys, wachtwoord in lade). DNV verwacht concrete vragen over versiebeheer, toegangsbeperking, en bescherming.

**Huidige vragen (default):**
- [doc] Is toegang tot broncode formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt toegang tot broncode actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Is broncode opgeslagen in een beveiligd versiebeheersysteem met audittrail?

**🔄 Vervangen:**
- ❌ Is toegang tot broncode formeel gedocumenteerd en goedgekeurd?
  → ✅ Is toegang tot broncode beperkt tot geautoriseerde ontwikkelaars en wordt dit technisch afgedwongen?

---

#### ✅ A.8.5 — Beveiligde authenticatie

**Verdict:** `ok` (score 4/5) — Huidige vragen dekken MFA en account lockout, wat DNV-auditors verwachten. Overweeg toevoeging van wachtwoordcomplexiteit.

**Huidige vragen (specific):**
- [impl] Is multi-factor authenticatie (MFA) verplicht voor alle externe toegang en beheerdersaccounts?
- [impl] Worden accounts automatisch vergrendeld na herhaalde mislukte inlogpogingen?

**➕ Toevoegen:**
- Worden wachtwoordeisen (complexiteit, minimale lengte, verlooptermijn) technisch afgedwongen?

---

#### 🔄 A.8.6 — Capaciteitsbeheer

**Verdict:** `replace` (score 2/5) — DNV-cursusmateriaal noemt specifiek monitoring van disk/CPU/memory en alerting bij drempelwaarden. Generieke vragen missen dit.

**Huidige vragen (default):**
- [doc] Is capaciteitsbeheer formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt capaciteitsbeheer actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is capaciteitsbeheer formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden capaciteitsdrempels (disk, CPU, geheugen) gemonitord met alerts bij overschrijding?
- ❌ Wordt capaciteitsbeheer actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt capaciteitsplanning periodiek gereviewd op basis van trends en groeiverwachtingen?

---

#### 🔄 A.8.7 — Bescherming tegen malware

**Verdict:** `replace` (score 2/5) — GetRich Bank case noemt ViréFree Antivirus met automatische updates. DNV verwacht vragen over real-time scanning, update-frequentie, en endpoint coverage.

**Huidige vragen (default):**
- [doc] Is bescherming tegen malware formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt bescherming tegen malware actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Is anti-malware geïnstalleerd op alle endpoints inclusief servers?

**🔄 Vervangen:**
- ❌ Is bescherming tegen malware formeel gedocumenteerd en goedgekeurd?
  → ✅ Is anti-malware software geïnstalleerd met automatische updates en real-time scanning?
- ❌ Wordt bescherming tegen malware actief toegepast en periodiek geëvalueerd?
  → ✅ Worden malware-detecties centraal gemonitord en is er een responsproces bij detectie?

---

#### ✅ A.8.8 — Beheer technische kwetsbaarheden

**Verdict:** `ok` (score 5/5) — Uitstekende specifieke vragen die DNV-methodiek volgen: scanfrequentie, patchtijdlijnen, en noodpatching. Dit is referentiekwaliteit.

**Huidige vragen (specific):**
- [impl] Worden systemen periodiek gescand op kwetsbaarheden (minimaal maandelijks)?
- [proc] Worden kritieke patches binnen 48 uur geïnstalleerd?
- [proc] Is er een proces voor noodpatching bij actief uitgebuite kwetsbaarheden?

---

#### 🔄 A.8.9 — Configuratiebeheer

**Verdict:** `replace` (score 2/5) — DNV toetst hardening baselines, configuration management database (CMDB), en change control. Generieke vragen missen dit.

**Huidige vragen (default):**
- [doc] Is configuratiebeheer formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt configuratiebeheer actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is configuratiebeheer formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn er gedocumenteerde hardening baselines voor servers, netwerkapparatuur en endpoints?
- ❌ Wordt configuratiebeheer actief toegepast en periodiek geëvalueerd?
  → ✅ Worden configuraties geregistreerd in een CMDB en worden afwijkingen van baselines gedetecteerd?

---

#### 🔄 A.8.10 — Verwijdering van informatie

**Verdict:** `replace` (score 2/5) — DNV-examenvraag 4.1 gaat specifiek over secure disposal van IT-apparatuur. Vragen moeten wissen van data en certificering adresseren.

**Huidige vragen (default):**
- [doc] Is verwijdering van informatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt verwijdering van informatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is verwijdering van informatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een procedure voor veilige verwijdering van data die certificeerbare wismethoden (NIST 800-88) voorschrijft?
- ❌ Wordt verwijdering van informatie actief toegepast en periodiek geëvalueerd?
  → ✅ Worden verwijderingen van data op opslagmedia gelogd en geverifieerd voordat apparatuur wordt afgevoerd?

---

#### 🔄 A.8.11 — Datamaskering

**Verdict:** `replace` (score 2/5) — Datamaskering is relevant voor test-/acceptatieomgevingen. DNV verwacht vragen over waar maskering wordt toegepast en hoe.

**Huidige vragen (default):**
- [doc] Is datamaskering formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt datamaskering actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is datamaskering formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden productiegegevens geanonimiseerd of gemaskeerd voordat ze in test-/ontwikkelomgevingen worden gebruikt?
- ❌ Wordt datamaskering actief toegepast en periodiek geëvalueerd?
  → ✅ Is vastgelegd welke datavelden maskering vereisen en wordt naleving gecontroleerd?

---

#### 🔄 A.8.12 — Preventie gegevenslekken

**Verdict:** `replace` (score 2/5) — Data Loss Prevention (DLP) is een nieuwe control in ISO 27001:2022. DNV verwacht specifieke vragen over DLP-tooling en -beleid.

**Huidige vragen (default):**
- [doc] Is preventie gegevenslekken formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt preventie gegevenslekken actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is preventie gegevenslekken formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn DLP-maatregelen geïmplementeerd om ongeautoriseerde overdracht van gevoelige data te detecteren/blokkeren?
- ❌ Wordt preventie gegevenslekken actief toegepast en periodiek geëvalueerd?
  → ✅ Worden DLP-alerts gemonitord en wordt opvolging gegeven aan gedetecteerde incidenten?

---

#### ✅ A.8.13 — Back-up van informatie

**Verdict:** `ok` (score 5/5) — Excellente vragen die 3-2-1 strategie en hersteltesten adresseren. Dit sluit direct aan bij DNV Quiz 4 vraag over A.8.13.

**Huidige vragen (specific):**
- [impl] Worden dagelijks geautomatiseerde backups gemaakt van alle kritieke data?
- [impl] Wordt de 3-2-1 backup-strategie gehanteerd (3 kopieën, 2 media, 1 off-site)?
- [proc] Worden backup-hersteltesten minimaal halfjaarlijks uitgevoerd?

---

#### 🔄 A.8.14 — Redundantie faciliteiten

**Verdict:** `replace` (score 2/5) — Redundantie is kritiek voor beschikbaarheid. GetRich Bank case toont DR-problemen. DNV verwacht vragen over failover en recovery.

**Huidige vragen (default):**
- [doc] Is redundantie faciliteiten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt redundantie faciliteiten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is redundantie faciliteiten formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn kritieke systemen redundant uitgevoerd met automatische failover of handmatige switchover-procedures?
- ❌ Wordt redundantie faciliteiten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden failover-procedures periodiek getest en zijn recovery time objectives (RTO) gedefinieerd?

---

#### ✅ A.8.15 — Logging

**Verdict:** `ok` (score 5/5) — Sterke vragen over log-typen, bescherming, bewaartermijn en SIEM. Sluit aan bij DNV-nadruk op audittrails.

**Huidige vragen (specific):**
- [impl] Worden authenticatie-, autorisatie- en systeemgebeurtenissen gelogd?
- [proc] Worden logs beschermd tegen wijziging en minimaal 12 maanden bewaard?
- [impl] Is er centraal logbeheer (SIEM of vergelijkbaar)?

---

#### 🔄 A.8.16 — Monitoringactiviteiten

**Verdict:** `replace` (score 2/5) — Monitoring is nauw verbonden met logging maar vraagt om real-time alerting en anomalie-detectie. Generieke vragen missen dit.

**Huidige vragen (default):**
- [doc] Is monitoringactiviteiten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt monitoringactiviteiten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is monitoringactiviteiten formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden netwerk- en systeemactiviteiten real-time gemonitord met alerting bij afwijkingen?
- ❌ Wordt monitoringactiviteiten actief toegepast en periodiek geëvalueerd?
  → ✅ Is er een proces voor opvolging van monitoring-alerts binnen gedefinieerde tijdlijnen?

---

#### 🔄 A.8.17 — Kloksynchronisatie

**Verdict:** `replace` (score 2/5) — Kloksynchronisatie is essentieel voor log-correlatie. DNV verwacht vraag over NTP/tijdsbron en tolerantie.

**Huidige vragen (default):**
- [doc] Is kloksynchronisatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt kloksynchronisatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is kloksynchronisatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn alle systemen gesynchroniseerd met een betrouwbare tijdsbron (NTP) met gedefinieerde maximale afwijking?
- ❌ Wordt kloksynchronisatie actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt kloksynchronisatie gemonitord en worden afwijkingen gedetecteerd en gecorrigeerd?

---

#### 🔄 A.8.18 — Geprivilegieerde hulpprogramma's

**Verdict:** `replace` (score 2/5) — Privileged utility programs (systeemtools) vereisen specifieke controle. DNV verwacht vragen over beperking en logging.

**Huidige vragen (default):**
- [doc] Is geprivilegieerde hulpprogramma's formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt geprivilegieerde hulpprogramma's actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is geprivilegieerde hulpprogramma's formeel gedocumenteerd en goedgekeurd?
  → ✅ Is het gebruik van systeemhulpprogramma's (bijv. PowerShell, cmd, registry editors) beperkt tot geautoriseerde beheerders?
- ❌ Wordt geprivilegieerde hulpprogramma's actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt het gebruik van geprivilegieerde hulpprogramma's gelogd en gemonitord?

---

#### 🔄 A.8.19 — Software op operationele systemen

**Verdict:** `replace` (score 2/5) — GetRich Bank case toont risico van crack keys en ongeautoriseerde software. DNV verwacht vragen over software whitelist/blacklist.

**Huidige vragen (default):**
- [doc] Is software op operationele systemen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt software op operationele systemen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is software op operationele systemen formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een proces voor goedkeuring en installatie van software op productiesystemen?
- ❌ Wordt software op operationele systemen actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt ongeautoriseerde software gedetecteerd en verwijderd van operationele systemen?

---

#### 🔄 A.8.20 — Netwerkbeveiliging

**Verdict:** `replace` (score 2/5) — DNV-examensituatie 4.2 gaat over netwerkbeveiliging bij facility management. Vragen moeten firewall, IDS/IPS adresseren.

**Huidige vragen (default):**
- [doc] Is netwerkbeveiliging formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt netwerkbeveiliging actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is netwerkbeveiliging formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn firewalls en IDS/IPS geïmplementeerd op netwerk-perimeters en tussen netwerksegmenten?
- ❌ Wordt netwerkbeveiliging actief toegepast en periodiek geëvalueerd?
  → ✅ Worden firewall-regels periodiek gereviewd en wordt ongebruikte poorten/diensten geblokkeerd?

---

#### 🔄 A.8.21 — Beveiliging netwerkdiensten

**Verdict:** `replace` (score 2/5) — Beveiliging van netwerkdiensten betreft SLA's en beveiligingsconfiguraties van diensten. DNV verwacht specifieke vragen.

**Huidige vragen (default):**
- [doc] Is beveiliging netwerkdiensten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiliging netwerkdiensten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beveiliging netwerkdiensten formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn beveiligingseisen voor netwerkdiensten (VPN, DNS, DHCP, etc.) gedocumenteerd en geïmplementeerd?
- ❌ Wordt beveiliging netwerkdiensten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden netwerkdiensten periodiek getest op beveiligingsconfiguratie en kwetsbaarheden?

---

#### 🔄 A.8.22 — Segmentatie van netwerken

**Verdict:** `replace` (score 2/5) — Netwerksegmentatie is fundamenteel voor defense-in-depth. DNV verwacht vragen over VLAN's en DMZ.

**Huidige vragen (default):**
- [doc] Is segmentatie van netwerken formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt segmentatie van netwerken actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is segmentatie van netwerken formeel gedocumenteerd en goedgekeurd?
  → ✅ Is het netwerk gesegmenteerd met gescheiden zones voor productie, ontwikkeling, DMZ en kantoor?
- ❌ Wordt segmentatie van netwerken actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt verkeer tussen netwerksegmenten gefilterd en gemonitord op basis van het least-privilege principe?

---

#### 🔄 A.8.23 — Webfiltering

**Verdict:** `replace` (score 2/5) — Webfiltering is een nieuwe control in 2022. GetRich Bank case toont risico van ongecontroleerde downloads. DNV verwacht specifieke vragen.

**Huidige vragen (default):**
- [doc] Is webfiltering formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt webfiltering actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is webfiltering formeel gedocumenteerd en goedgekeurd?
  → ✅ Is webfiltering geïmplementeerd om toegang tot schadelijke en niet-zakelijke websites te blokkeren?
- ❌ Wordt webfiltering actief toegepast en periodiek geëvalueerd?
  → ✅ Worden geblokkeerde categorieën periodiek gereviewd en wordt bypass-gebruik gemonitord?

---

#### ✅ A.8.24 — Gebruik van cryptografie

**Verdict:** `ok` (score 4/5) — Goede vragen over encryptie-standaarden en sleutelbeheer. Overweeg toevoeging over cryptografisch beleid.

**Huidige vragen (specific):**
- [impl] Worden gegevens versleuteld bij transport (TLS 1.2+) en bij opslag (AES-256)?
- [proc] Is er een sleutelbeheerproces met periodieke rotatie?

**➕ Toevoegen:**
- Is er een cryptografisch beleid dat goedgekeurde algoritmen en sleutellengtes voorschrijft?

---

#### 🔄 A.8.25 — Veilige ontwikkellevenscyclus

**Verdict:** `replace` (score 2/5) — Secure SDLC is kritiek. DNV verwacht vragen over security requirements in elke fase van de levenscyclus.

**Huidige vragen (default):**
- [doc] Is veilige ontwikkellevenscyclus formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt veilige ontwikkellevenscyclus actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is veilige ontwikkellevenscyclus formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn beveiligingseisen geïntegreerd in elke fase van de softwareontwikkellevenscyclus (requirements, design, coding, testing)?
- ❌ Wordt veilige ontwikkellevenscyclus actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt naleving van secure development practices gecontroleerd via code reviews of audits?

---

#### 🔄 A.8.26 — Beveiligingseisen applicaties

**Verdict:** `replace` (score 2/5) — Application security requirements moeten expliciet worden vastgesteld. DNV verwacht concrete vragen.

**Huidige vragen (default):**
- [doc] Is beveiligingseisen applicaties formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiligingseisen applicaties actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beveiligingseisen applicaties formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden beveiligingseisen (authenticatie, autorisatie, input validatie, encryptie) expliciet vastgesteld voor nieuwe applicaties?
- ❌ Wordt beveiligingseisen applicaties actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt gecontroleerd dat applicaties voldoen aan de vastgestelde beveiligingseisen voordat ze in productie gaan?

---

#### 🔄 A.8.27 — Veilige systeemarchitectuur

**Verdict:** `replace` (score 2/5) — Secure architecture principles zoals defense-in-depth en least privilege moeten worden getoetst.

**Huidige vragen (default):**
- [doc] Is veilige systeemarchitectuur formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt veilige systeemarchitectuur actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is veilige systeemarchitectuur formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn secure architecture principes (defense-in-depth, least privilege, fail-secure) toegepast in systeemontwerp?
- ❌ Wordt veilige systeemarchitectuur actief toegepast en periodiek geëvalueerd?
  → ✅ Worden architectuurwijzigingen beoordeeld op beveiligingsimplicaties voordat ze worden doorgevoerd?

---

#### 🔄 A.8.28 — Veilig coderen

**Verdict:** `replace` (score 2/5) — Secure coding is een nieuwe control. DNV verwacht vragen over coding standards en OWASP.

**Huidige vragen (default):**
- [doc] Is veilig coderen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt veilig coderen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is veilig coderen formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn secure coding standaarden (bijv. OWASP) gedocumenteerd en verplicht voor ontwikkelaars?
- ❌ Wordt veilig coderen actief toegepast en periodiek geëvalueerd?
  → ✅ Worden code reviews of static analysis tools gebruikt om secure coding naleving te controleren?

---

#### 🔄 A.8.29 — Beveiligingstesten

**Verdict:** `replace` (score 2/5) — Security testing moet penetratietesten en vulnerability assessments omvatten. Generieke vragen missen dit.

**Huidige vragen (default):**
- [doc] Is beveiligingstesten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt beveiligingstesten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is beveiligingstesten formeel gedocumenteerd en goedgekeurd?
  → ✅ Worden penetratietesten en vulnerability assessments uitgevoerd voor productiegang en periodiek daarna?
- ❌ Wordt beveiligingstesten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden bevindingen uit beveiligingstesten geremedieerd binnen gedefinieerde tijdlijnen op basis van risico?

---

#### 🔄 A.8.30 — Uitbestede ontwikkeling

**Verdict:** `replace` (score 2/5) — Outsourced development vereist specifieke contractuele en technische controles. DNV verwacht concrete vragen.

**Huidige vragen (default):**
- [doc] Is uitbestede ontwikkeling formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt uitbestede ontwikkeling actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is uitbestede ontwikkeling formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn beveiligingseisen contractueel vastgelegd met externe ontwikkelpartijen (incl. secure coding, code review)?
- ❌ Wordt uitbestede ontwikkeling actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt extern ontwikkelde code getest op beveiligingsfouten voordat het wordt geaccepteerd?

---

#### 🔄 A.8.31 — Scheiding omgevingen

**Verdict:** `replace` (score 2/5) — Scheiding van DTAP-omgevingen is fundamenteel. GetRich Bank case toont risico's van gemengde omgevingen.

**Huidige vragen (default):**
- [doc] Is scheiding omgevingen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt scheiding omgevingen actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is scheiding omgevingen formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn ontwikkel-, test-, acceptatie- en productieomgevingen fysiek of logisch gescheiden?
- ❌ Wordt scheiding omgevingen actief toegepast en periodiek geëvalueerd?
  → ✅ Is het kopiëren van productiedata naar test-/ontwikkelomgevingen gecontroleerd en worden data geanonimiseerd?

---

#### ✅ A.8.32 — Wijzigingsbeheer

**Verdict:** `ok` (score 5/5) — Uitstekende vragen die change management process, risicobeoordeling en rollback-plan adresseren. Sluit aan bij DNV-examensituatie 4.2.

**Huidige vragen (specific):**
- [proc] Worden wijzigingen aan IT-systemen gecontroleerd doorgevoerd via een change management proces?
- [proc] Bevat elke change request een risicobeoordeling en rollback-plan?

---

#### 🔄 A.8.33 — Testinformatie

**Verdict:** `replace` (score 2/5) — Test data protection is belangrijk. DNV verwacht vragen over gebruik van productiedata in testen.

**Huidige vragen (default):**
- [doc] Is testinformatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt testinformatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is testinformatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een beleid dat het gebruik van productiedata in testomgevingen verbiedt of anonimisering vereist?
- ❌ Wordt testinformatie actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt gecontroleerd dat testdata geen gevoelige informatie bevat of adequaat is gemaskeerd?

---

#### 🔄 A.8.34 — Bescherming tijdens audittesten

**Verdict:** `replace` (score 2/5) — Bescherming tijdens audits moet impact op productiesystemen minimaliseren. DNV-auditors kennen dit vanuit eigen praktijk.

**Huidige vragen (default):**
- [doc] Is bescherming tijdens audittesten formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt bescherming tijdens audittesten actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ Is bescherming tijdens audittesten formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn richtlijnen opgesteld om impact van audittesten (penetratietesten, scans) op productiesystemen te minimaliseren?
- ❌ Wordt bescherming tijdens audittesten actief toegepast en periodiek geëvalueerd?
  → ✅ Worden audittesten gepland buiten piekuren en met voorafgaande notificatie aan relevante stakeholders?

---

### ISMS Clausules

#### 🔄 C.4.1 — Context van de organisatie — interne en externe factoren

**Verdict:** `replace` (score 2/5) — DNV toetst expliciet op SWOT-analyse, externe/interne issues die het ISMS beïnvloeden, en de link met risicobeoordeling (zie cursusmateriaal p.29, 51). De huidige vragen zijn te generiek en missen de kernvraag: welke issues zijn geïdentificeerd en hoe beïnvloeden deze het ISMS?

**Huidige vragen (default):**
- [doc] Is context van de organisatie — interne en externe factoren formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt context van de organisatie — interne en externe factoren actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is context van de organisatie — interne en externe factoren formeel gedocumenteerd en goedgekeurd?
  → ✅ Heeft de organisatie gedocumenteerd welke interne en externe factoren (issues) relevant zijn voor haar doel en het bereiken van de beoogde resultaten van het ISMS?
- ❌ [impl] Wordt context van de organisatie — interne en externe factoren actief toegepast en periodiek geëvalueerd?
  → ✅ Worden de geïdentificeerde interne en externe factoren periodiek geëvalueerd en gebruikt als input voor de risicobeoordeling?

---

#### 🔄 C.4.2 — Behoeften en verwachtingen van belanghebbenden

**Verdict:** `replace` (score 2/5) — DNV benadrukt dat belanghebbenden en hun eisen expliciet geïdentificeerd moeten zijn, inclusief wettelijke, contractuele en regelgevende eisen (cursusmateriaal p.26, 29). Huidige vragen missen de vraag naar WIE de belanghebbenden zijn en WAT hun specifieke eisen zijn.

**Huidige vragen (default):**
- [doc] Is behoeften en verwachtingen van belanghebbenden formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt behoeften en verwachtingen van belanghebbenden actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Zijn de relevante wet- en regelgeving en contractuele verplichtingen geïdentificeerd als eisen van belanghebbenden?

**🔄 Vervangen:**
- ❌ [doc] Is behoeften en verwachtingen van belanghebbenden formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn alle relevante belanghebbenden geïdentificeerd en zijn hun eisen met betrekking tot informatiebeveiliging gedocumenteerd?

---

#### 🔄 C.4.3 — Scope van het ISMS

**Verdict:** `replace` (score 2/5) — DNV auditeert de scope zeer grondig: locaties, activiteiten, in/out-of-scope, logische afbakening, en rechtvaardiging van uitsluitingen (cursusmateriaal p.5-6, proefexamen Q3.5). De huidige vragen dekken de kritische aspecten niet.

**Huidige vragen (default):**
- [doc] Is scope van het isms formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt scope van het isms actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Indien bepaalde gebieden zijn uitgesloten van de scope, is hiervoor een onderbouwde rechtvaardiging beschikbaar die aantoont dat dit geen invloed heeft op het vermogen informatiebeveiliging te leveren?

**🔄 Vervangen:**
- ❌ [doc] Is scope van het isms formeel gedocumenteerd en goedgekeurd?
  → ✅ Is de scope van het ISMS gedocumenteerd met vermelding van locaties, afdelingen, processen, technologieën en eventuele uitsluitingen met rechtvaardiging?
- ❌ [impl] Wordt scope van het isms actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt de scope geëvalueerd bij wijzigingen in de organisatie, haar context of bij nieuwe risico's?

---

#### 🔄 C.5.1 — Leiderschap en commitment van de directie

**Verdict:** `replace` (score 2/5) — DNV toetst leiderschap via concreet bewijs: toewijzing van middelen, communicatie van belang, integratie in bedrijfsprocessen (proefexamen Q2.2, cursusmateriaal p.6). Huidige vragen zijn te abstract.

**Huidige vragen (default):**
- [doc] Is leiderschap en commitment van de directie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt leiderschap en commitment van de directie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is leiderschap en commitment van de directie formeel gedocumenteerd en goedgekeurd?
  → ✅ Kan de directie aantonen dat zij leiderschap en betrokkenheid toont, bijvoorbeeld door het beschikbaar stellen van benodigde middelen voor het ISMS?
- ❌ [impl] Wordt leiderschap en commitment van de directie actief toegepast en periodiek geëvalueerd?
  → ✅ Is er bewijs dat de directie het belang van informatiebeveiliging communiceert en ervoor zorgt dat het ISMS de beoogde resultaten behaalt?

---

#### 🔄 C.5.2 — Informatiebeveiligingsbeleid

**Verdict:** `replace` (score 2/5) — DNV toetst of het beleid past bij het doel van de organisatie, doelstellingen bevat of een kader biedt, en gecommuniceerd is aan alle relevante partijen (cursusmateriaal p.7-8, 40). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is informatiebeveiligingsbeleid formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt informatiebeveiligingsbeleid actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Is het informatiebeveiligingsbeleid beschikbaar gesteld aan alle medewerkers en relevante externe partijen?

**🔄 Vervangen:**
- ❌ [doc] Is informatiebeveiligingsbeleid formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een informatiebeveiligingsbeleid dat past bij het doel van de organisatie, een commitment aan continue verbetering bevat en een kader biedt voor het vaststellen van doelstellingen?
- ❌ [impl] Wordt informatiebeveiligingsbeleid actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt het beleid periodiek beoordeeld op geschiktheid en aangepast indien nodig?

---

#### 🔄 C.5.3 — Rollen, verantwoordelijkheden en bevoegdheden

**Verdict:** `replace` (score 3/5) — DNV toetst op expliciete toewijzing van rollen inclusief ISMS-verantwoordelijkheid en rapportagelijnen (proefexamen rollen-oefening, cursusmateriaal p.42-44). Huidige vragen missen de specifieke toets op ISMS-rollen.

**Huidige vragen (default):**
- [doc] Is rollen, verantwoordelijkheden en bevoegdheden formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt rollen, verantwoordelijkheden en bevoegdheden actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is rollen, verantwoordelijkheden en bevoegdheden formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn de rollen en verantwoordelijkheden voor informatiebeveiliging formeel toegewezen, inclusief de verantwoordelijkheid om te rapporteren over de prestaties van het ISMS aan de directie?
- ❌ [impl] Wordt rollen, verantwoordelijkheden en bevoegdheden actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn medewerkers aantoonbaar op de hoogte van hun verantwoordelijkheden op het gebied van informatiebeveiliging?

---

#### 🔄 C.6.1 — Risicobeoordeling en risicobehandeling

**Verdict:** `replace` (score 2/5) — DNV toetst het volledige risicobeoordelingsproces: criteria voor acceptatie, identificatie, analyse (kans x impact), evaluatie, en behandelingsopties (cursusmateriaal p.10, 13-14, 39, proefexamen Q1.4). De huidige vragen zijn veel te generiek voor dit kernproces.

**Huidige vragen (default):**
- [doc] Is risicobeoordeling en risicobehandeling formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt risicobeoordeling en risicobehandeling actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Zijn de criteria voor risico-acceptatie vastgesteld en goedgekeurd door het management?
- Worden bij de risicobehandeling de vier opties (beperken, vermijden, overdragen, accepteren) expliciet overwogen?

**🔄 Vervangen:**
- ❌ [doc] Is risicobeoordeling en risicobehandeling formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een gedocumenteerde methodiek voor risicobeoordeling die criteria voor acceptatie, identificatie van risico's, analyse (waarschijnlijkheid en impact) en evaluatie omvat?
- ❌ [impl] Wordt risicobeoordeling en risicobehandeling actief toegepast en periodiek geëvalueerd?
  → ✅ Worden de resultaten van de risicobeoordeling consistent toegepast en is er een risicobehandelingsplan met geselecteerde maatregelen en eigenaren?

---

#### 🔄 C.6.2 — Informatiebeveiligingsdoelstellingen en planning

**Verdict:** `replace` (score 3/5) — DNV toetst of doelstellingen meetbaar zijn, consistent met beleid, en of er een plan is om ze te bereiken (cursusmateriaal p.17, 66). Huidige vragen missen de SMART-criteria.

**Huidige vragen (default):**
- [doc] Is informatiebeveiligingsdoelstellingen en planning formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt informatiebeveiligingsdoelstellingen en planning actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is informatiebeveiligingsdoelstellingen en planning formeel gedocumenteerd en goedgekeurd?
  → ✅ Zijn informatiebeveiligingsdoelstellingen vastgesteld die meetbaar zijn (indien praktisch), consistent met het beleid en rekening houden met relevante beveiligingseisen en risicobeoordeling?
- ❌ [impl] Wordt informatiebeveiligingsdoelstellingen en planning actief toegepast en periodiek geëvalueerd?
  → ✅ Is vastgelegd wat er gedaan moet worden, welke middelen nodig zijn, wie verantwoordelijk is en wanneer het gereed moet zijn om de doelstellingen te bereiken?

---

#### ✅ C.7.1 — Middelen voor het ISMS

**Verdict:** `ok` (score 4/5) — De huidige vragen dekken de basiseisen adequaat. DNV vraagt naar beschikbaarheid van middelen (cursusmateriaal p.17), maar voor MKB is verdere detaillering niet essentieel.

**Huidige vragen (default):**
- [doc] Is middelen voor het isms formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt middelen voor het isms actief toegepast en periodiek geëvalueerd?

---

#### 🔄 C.7.2 — Competentie van ISMS-betrokkenen

**Verdict:** `replace` (score 2/5) — DNV toetst specifiek op: bepalen van benodigde competentie, bewijs van competentie, en evaluatie van effectiviteit van genomen acties zoals training (proefexamen Q4.3 over trainingsevaluatie, cursusmateriaal p.18). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is competentie van isms-betrokkenen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt competentie van isms-betrokkenen actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Wordt de effectiviteit van genomen acties (zoals trainingen) om competentie te verkrijgen geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is competentie van isms-betrokkenen formeel gedocumenteerd en goedgekeurd?
  → ✅ Is de benodigde competentie vastgesteld voor personen die werkzaamheden verrichten die de informatiebeveiligingsprestaties beïnvloeden?
- ❌ [impl] Wordt competentie van isms-betrokkenen actief toegepast en periodiek geëvalueerd?
  → ✅ Is er gedocumenteerd bewijs (zoals diploma's, certificaten, beoordelingen) van de competentie van ISMS-betrokkenen?

---

#### 🔄 C.7.3 — Bewustwording bij alle medewerkers

**Verdict:** `replace` (score 3/5) — DNV toetst of medewerkers bewust zijn van het beleid, hun bijdrage aan het ISMS, en de gevolgen van niet-naleving (cursusmateriaal p.21, A.6.3). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is bewustwording bij alle medewerkers formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt bewustwording bij alle medewerkers actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is bewustwording bij alle medewerkers formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een bewustwordingsprogramma dat ervoor zorgt dat medewerkers bekend zijn met het informatiebeveiligingsbeleid en hun bijdrage aan de effectiviteit van het ISMS?
- ❌ [impl] Wordt bewustwording bij alle medewerkers actief toegepast en periodiek geëvalueerd?
  → ✅ Zijn medewerkers aantoonbaar op de hoogte van de gevolgen van het niet naleven van ISMS-eisen?

---

#### 🔄 C.7.4 — Communicatie over informatiebeveiliging

**Verdict:** `replace` (score 3/5) — DNV toetst op het 5W-model: wat, wanneer, met wie, door wie, en via welke processen wordt gecommuniceerd (cursusmateriaal p.66). Huidige vragen zijn te vaag.

**Huidige vragen (default):**
- [doc] Is communicatie over informatiebeveiliging formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt communicatie over informatiebeveiliging actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is communicatie over informatiebeveiliging formeel gedocumenteerd en goedgekeurd?
  → ✅ Is vastgesteld waarover, wanneer, met wie en door wie over informatiebeveiliging wordt gecommuniceerd, zowel intern als extern?
- ❌ [impl] Wordt communicatie over informatiebeveiliging actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt de communicatie over informatiebeveiliging daadwerkelijk uitgevoerd conform het vastgestelde proces?

---

#### 🔄 C.7.5 — Gedocumenteerde informatie en documentbeheer

**Verdict:** `replace` (score 2/5) — DNV toetst op versiebeheer, goedkeuring, beschikbaarheid, bescherming en bewaartermijnen (cursusmateriaal p.66, 7.5.1-7.5.3). Huidige vragen dekken deze specifieke eisen niet.

**Huidige vragen (default):**
- [doc] Is gedocumenteerde informatie en documentbeheer formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt gedocumenteerde informatie en documentbeheer actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Is gedocumenteerde informatie van externe oorsprong geïdentificeerd en beheerst?

**🔄 Vervangen:**
- ❌ [doc] Is gedocumenteerde informatie en documentbeheer formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een proces voor het creëren, actualiseren en beheren van gedocumenteerde informatie, inclusief identificatie, goedkeuring en versiebeheer?
- ❌ [impl] Wordt gedocumenteerde informatie en documentbeheer actief toegepast en periodiek geëvalueerd?
  → ✅ Is gedocumenteerde informatie beschikbaar waar en wanneer nodig, adequaat beschermd en worden bewaartermijnen en vernietiging beheerst?

---

#### ✅ C.8.1 — Operationele planning en beheersing

**Verdict:** `ok` (score 4/5) — De huidige vragen dekken de basiseisen. DNV toetst op planning en beheersing van processen om aan eisen te voldoen, wat de huidige vragen redelijk adresseren.

**Huidige vragen (default):**
- [doc] Is operationele planning en beheersing formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt operationele planning en beheersing actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Worden uitbestede processen beheerst?

---

#### 🔄 C.8.2 — Uitvoering risicobeoordeling

**Verdict:** `replace` (score 2/5) — DNV toetst of risicobeoordeling op geplande intervallen wordt uitgevoerd én bij significante wijzigingen, met bewaring van resultaten (cursusmateriaal p.6, 84). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is uitvoering risicobeoordeling formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt uitvoering risicobeoordeling actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is uitvoering risicobeoordeling formeel gedocumenteerd en goedgekeurd?
  → ✅ Wordt risicobeoordeling uitgevoerd op geplande intervallen of bij significante wijzigingen, conform de in 6.1.2 vastgestelde criteria?
- ❌ [impl] Wordt uitvoering risicobeoordeling actief toegepast en periodiek geëvalueerd?
  → ✅ Worden de resultaten van risicobeoordelingen als gedocumenteerde informatie bewaard?

---

#### 🔄 C.8.3 — Uitvoering risicobehandeling

**Verdict:** `replace` (score 3/5) — DNV toetst op implementatie van het risicobehandelingsplan en bewaring van resultaten (cursusmateriaal p.10, 84). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is uitvoering risicobehandeling formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt uitvoering risicobehandeling actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is uitvoering risicobehandeling formeel gedocumenteerd en goedgekeurd?
  → ✅ Wordt het risicobehandelingsplan geïmplementeerd en worden de resultaten als gedocumenteerde informatie bewaard?
- ❌ [impl] Wordt uitvoering risicobehandeling actief toegepast en periodiek geëvalueerd?
  → ✅ Is er bewijs dat de geselecteerde beheersmaatregelen daadwerkelijk zijn geïmplementeerd en effectief werken?

---

#### 🔄 C.9.1 — Monitoring, meting, analyse en evaluatie

**Verdict:** `replace` (score 2/5) — DNV toetst specifiek op: wat gemeten moet worden, methoden, wanneer en door wie, en bewaring van resultaten (cursusmateriaal p.6, 66). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is monitoring, meting, analyse en evaluatie formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt monitoring, meting, analyse en evaluatie actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is monitoring, meting, analyse en evaluatie formeel gedocumenteerd en goedgekeurd?
  → ✅ Is vastgesteld wat gemonitord en gemeten moet worden (inclusief informatiebeveiligingsprocessen en beheersmaatregelen), en met welke methoden?
- ❌ [impl] Wordt monitoring, meting, analyse en evaluatie actief toegepast en periodiek geëvalueerd?
  → ✅ Worden de resultaten van monitoring en meting geanalyseerd, geëvalueerd en als gedocumenteerde informatie bewaard?

---

#### 🔄 C.9.2 — Interne audit

**Verdict:** `replace` (score 2/5) — DNV toetst uitgebreid op intern auditprogramma: frequentie, methoden, onafhankelijkheid, rapportage aan management, en follow-up (cursusmateriaal p.6, 32, proefexamen Q1.1). Huidige vragen zijn veel te generiek.

**Huidige vragen (default):**
- [doc] Is interne audit formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt interne audit actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Zijn auditors onafhankelijk van de geauditeerde activiteiten?
- Worden auditresultaten gerapporteerd aan relevant management?

**🔄 Vervangen:**
- ❌ [doc] Is interne audit formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een intern auditprogramma met geplande intervallen, dat rekening houdt met de status en het belang van de te auditeren processen en resultaten van eerdere audits?
- ❌ [impl] Wordt interne audit actief toegepast en periodiek geëvalueerd?
  → ✅ Worden interne audits uitgevoerd conform het programma, met objectieve en onpartijdige auditors, en worden resultaten gedocumenteerd en gerapporteerd?

---

#### 🔄 C.9.3 — Managementreview

**Verdict:** `replace` (score 2/5) — DNV toetst op specifieke input (status acties, wijzigingen, prestaties, auditresultaten, verbetermogelijkheden) en output (besluiten over verbetering) van de management review (cursusmateriaal p.6, 66, handgeschreven notities). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is managementreview formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt managementreview actief toegepast en periodiek geëvalueerd?

**🔄 Vervangen:**
- ❌ [doc] Is managementreview formeel gedocumenteerd en goedgekeurd?
  → ✅ Voert de directie op geplande intervallen een management review uit van het ISMS, met alle vereiste inputs (status van acties, wijzigingen in issues en eisen, prestatie-informatie, auditresultaten, verbetermogelijkheden)?
- ❌ [impl] Wordt managementreview actief toegepast en periodiek geëvalueerd?
  → ✅ Worden de resultaten van de management review (besluiten over verbeteringsmogelijkheden en wijzigingen aan het ISMS) als gedocumenteerde informatie bewaard?

---

#### 🔄 C.10.1 — Non-conformiteiten en correctieve maatregelen

**Verdict:** `replace` (score 2/5) — DNV toetst het volledige correctieve actieproces: reageren, evalueren van oorzaak, implementeren, beoordelen effectiviteit, en indien nodig wijzigen van het ISMS (proefexamen Q3.2, cursusmateriaal p.19, 110). Huidige vragen zijn te generiek.

**Huidige vragen (default):**
- [doc] Is non-conformiteiten en correctieve maatregelen formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt non-conformiteiten en correctieve maatregelen actief toegepast en periodiek geëvalueerd?

**➕ Toevoegen:**
- Wordt de doeltreffendheid van genomen correctieve maatregelen beoordeeld?

**🔄 Vervangen:**
- ❌ [doc] Is non-conformiteiten en correctieve maatregelen formeel gedocumenteerd en goedgekeurd?
  → ✅ Is er een proces waarbij bij een afwijking wordt gereageerd, de oorzaak wordt geëvalueerd, actie wordt ondernomen om herhaling te voorkomen, en de effectiviteit wordt beoordeeld?
- ❌ [impl] Wordt non-conformiteiten en correctieve maatregelen actief toegepast en periodiek geëvalueerd?
  → ✅ Wordt gedocumenteerde informatie bewaard over de aard van afwijkingen, genomen acties en de resultaten van correctieve maatregelen?

---

#### ✅ C.10.2 — Continue verbetering

**Verdict:** `ok` (score 4/5) — De huidige vragen dekken de basiseisen voor continue verbetering. DNV toetst of de organisatie de geschiktheid, toereikendheid en effectiviteit van het ISMS continu verbetert, wat de huidige vragen adequaat adresseren voor MKB.

**Huidige vragen (default):**
- [doc] Is continue verbetering formeel gedocumenteerd en goedgekeurd?
- [impl] Wordt continue verbetering actief toegepast en periodiek geëvalueerd?

---

