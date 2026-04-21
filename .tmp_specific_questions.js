// Auto-gegenereerd uit GAP-QUESTIONS-REVIEW.md (DNV-corpus). Zie .tmp_build_questions.py.
const specificQuestions = {
  'A.5.1': [
    { q: 'Is er een formeel informatiebeveiligingsbeleid dat is goedgekeurd door de directie?', type: 'doc' },
    { q: 'Wordt het beleid minimaal jaarlijks gereviewed en gecommuniceerd aan alle medewerkers?', type: 'impl' },
    { q: 'Bevat het beleid duidelijke verwijzingen naar de ISMS-scope, doelstellingen en verantwoordelijkheden?', type: 'content' },
  ],
  'A.5.2': [
    { q: 'Zijn alle informatiebeveiligingsrollen (CISO, IT-beheer, management) formeel vastgelegd?', type: 'doc' },
    { q: 'Is er een RACI-matrix die verantwoordelijkheden per proces beschrijft?', type: 'impl' },
    { q: 'Worden informatiebeveiligingsverantwoordelijkheden actief gecommuniceerd aan alle betrokken medewerkers en begrijpen zij deze?', type: 'impl' },
  ],
  'A.5.3': [
    { q: 'Zijn kritieke taken (zoals goedkeuren/uitvoeren, ontwikkelen/vrijgeven) expliciet gescheiden en gedocumenteerd?', type: 'doc' },
    { q: 'Wordt periodiek gecontroleerd dat geen medewerker conflicterende rechten heeft (bijv. via access review)?', type: 'impl' },
  ],
  'A.5.4': [
    { q: 'Heeft het management formeel het informatiebeveiligingsbeleid onderschreven en worden hiervoor adequate middelen toegewezen?', type: 'doc' },
    { q: 'Toont het management actieve betrokkenheid bij informatiebeveiliging (bijv. aanwezigheid bij awareness-sessies, behandeling in MT-vergaderingen)?', type: 'impl' },
  ],
  'A.5.5': [
    { q: 'Is er een actuele contactlijst met relevante autoriteiten (AP, NCSC, politie) en is duidelijk wanneer contact opgenomen moet worden?', type: 'doc' },
    { q: 'Weten de verantwoordelijke medewerkers welke autoriteiten te benaderen bij een datalek of cyberincident?', type: 'impl' },
  ],
  'A.5.6': [
    { q: 'Heeft de organisatie contact met relevante security-communities of brancheverenigingen (bijv. branche-ISAC, DTC)?', type: 'doc' },
    { q: 'Wordt informatie uit deze netwerken actief gebruikt voor het verbeteren van de beveiliging?', type: 'impl' },
  ],
  'A.5.7': [
    { q: 'Wordt er actief threat intelligence verzameld (NCSC, CVE-databases, leveranciers)?', type: 'impl' },
    { q: 'Is er een proces om dreigingsmeldingen te beoordelen op relevantie voor uw organisatie?', type: 'proc' },
    { q: 'Worden relevante dreigingen geregistreerd en worden maatregelen geïnitieerd?', type: 'impl' },
  ],
  'A.5.8': [
    { q: 'Worden informatiebeveiligingseisen standaard meegenomen in projectinitiatie en -planning (bijv. via checklist of gate review)?', type: 'doc' },
    { q: 'Is er bewijs dat recente projecten een IB-risicobeoordeling hebben ondergaan voordat ze in productie gingen?', type: 'impl' },
  ],
  'A.5.9': [
    { q: 'Is er een actueel register van alle informatie-assets (hardware, software, data, diensten)?', type: 'doc' },
    { q: 'Heeft elk asset een aangewezen eigenaar?', type: 'impl' },
    { q: 'Wordt het register minimaal jaarlijks geactualiseerd?', type: 'proc' },
  ],
  'A.5.10': [
    { q: 'Is er een Acceptable Use Policy die regels stelt voor privégebruik van bedrijfsmiddelen, social media en BYOD?', type: 'doc' },
    { q: 'Ondertekenen medewerkers de AUP en worden overtredingen geregistreerd en opgevolgd?', type: 'impl' },
  ],
  'A.5.11': [
    { q: 'Is er een offboarding-checklist die teruggave van bedrijfsmiddelen (laptop, toegangspas, tokens) afdwingt?', type: 'doc' },
    { q: 'Worden toegangsrechten direct bij uitdiensttreding ingetrokken en wordt dit gelogd?', type: 'impl' },
  ],
  'A.5.12': [
    { q: 'Is er een classificatieschema met minimaal 3 niveaus (bijv. openbaar, intern, vertrouwelijk) en duidelijke criteria?', type: 'doc' },
    { q: 'Wordt informatie daadwerkelijk geclassificeerd bij creatie en wordt dit periodiek gecontroleerd?', type: 'impl' },
  ],
  'A.5.13': [
    { q: 'Is er een procedure voor het labelen van documenten en e-mails conform het classificatieschema?', type: 'doc' },
    { q: 'Worden vertrouwelijke documenten daadwerkelijk gemarkeerd (bijv. watermerk, header/footer, metadata)?', type: 'impl' },
  ],
  'A.5.14': [
    { q: 'Zijn er regels voor veilige overdracht van vertrouwelijke informatie (bijv. verplichte encryptie, goedgekeurde bestandsuitwisselingsdiensten)?', type: 'doc' },
    { q: 'Wordt gecontroleerd dat medewerkers geen vertrouwelijke informatie via onbeveiligde kanalen versturen (bijv. privé-email)?', type: 'impl' },
  ],
  'A.5.15': [
    { q: 'Is er een formeel toegangsbeleid op basis van need-to-know en least privilege?', type: 'doc' },
    { q: 'Worden toegangsrechten formeel aangevraagd, goedgekeurd en geregistreerd?', type: 'proc' },
    { q: 'Worden toegangsrechten periodiek gereviewed (minimaal halfjaarlijks)?', type: 'impl' },
  ],
  'A.5.16': [
    { q: 'Is er een proces voor het aanmaken, wijzigen en verwijderen van gebruikersaccounts met unieke identificatie per persoon?', type: 'doc' },
    { q: 'Worden inactieve accounts periodiek geïdentificeerd en opgeschoond (bijv. na 90 dagen geen login)?', type: 'impl' },
  ],
  'A.5.17': [
    { q: 'Is er een wachtwoordbeleid met eisen aan lengte, complexiteit en MFA?', type: 'doc' },
    { q: 'Is MFA geïmplementeerd op alle bedrijfskritieke applicaties?', type: 'impl' },
    { q: 'Wordt het gebruik van een wachtwoordmanager verplicht gesteld?', type: 'impl' },
  ],
  'A.5.18': [
    { q: 'Is er een procedure voor het tijdig provisionen en deprovisioneren van toegangsrechten bij in-, door- en uitstroom?', type: 'doc' },
    { q: 'Wordt toegangsrechten actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Worden toegangsrechten tijdig ingetrokken bij functiewijziging of uitdiensttreding (bijv. binnen 24 uur)?', type: 'impl' },
  ],
  'A.5.19': [
    { q: 'Worden leveranciers die toegang hebben tot bedrijfsinformatie beoordeeld op informatiebeveiligingsrisico\'s?', type: 'doc' },
    { q: 'Is er een register van kritieke leveranciers en worden hun beveiligingsmaatregelen periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.5.20': [
    { q: 'Bevatten leverancierscontracten clausules over geheimhouding, verwerkersovereenkomst (indien van toepassing), en audit-recht?', type: 'doc' },
    { q: 'Zijn er afspraken over incidentmelding door leveranciers en worden deze nageleefd?', type: 'impl' },
  ],
  'A.5.21': [
    { q: 'Is er inzicht in de ICT-toeleveringsketen en worden risico\'s van subleveranciers beoordeeld?', type: 'doc' },
    { q: 'Zijn er eisen aan leveranciers over het doorgeven van beveiligingseisen aan hun subleveranciers?', type: 'impl' },
  ],
  'A.5.22': [
    { q: 'Worden beveiligingsaspecten van leveranciersdiensten actief gemonitord (bijv. via SLA-rapportages, audits)?', type: 'doc' },
    { q: 'Worden wijzigingen in leveranciersdiensten beoordeeld op beveiligingsimpact voordat ze worden geaccepteerd?', type: 'impl' },
  ],
  'A.5.23': [
    { q: 'Is er een beleid voor het gebruik van clouddiensten met selectiecriteria?', type: 'doc' },
    { q: 'Worden alleen goedgekeurde clouddiensten gebruikt (geen shadow IT)?', type: 'impl' },
    { q: 'Is de datalocatie (EU/EER) gewaarborgd en zijn verwerkersovereenkomsten afgesloten?', type: 'proc' },
  ],
  'A.5.24': [
    { q: 'Is er een gedocumenteerd incident response plan met duidelijke escalatieprocedure?', type: 'doc' },
    { q: 'Weten alle medewerkers hoe en waar zij beveiligingsincidenten moeten melden?', type: 'impl' },
    { q: 'Wordt het incident response plan minimaal jaarlijks getest (tabletop of simulatie)?', type: 'proc' },
  ],
  'A.5.25': [
    { q: 'Is er een triageproces om te bepalen of een beveiligingsgebeurtenis een incident is dat verdere actie vereist?', type: 'doc' },
    { q: 'Worden alle beveiligingsmeldingen geregistreerd en beoordeeld, ook als ze geen incident blijken te zijn?', type: 'impl' },
  ],
  'A.5.26': [
    { q: 'Zijn er procedures voor containment, eradicatie en herstel bij beveiligingsincidenten?', type: 'doc' },
    { q: 'Zijn rollen en verantwoordelijkheden tijdens een incident duidelijk (wie doet wat, wie beslist)?', type: 'impl' },
  ],
  'A.5.27': [
    { q: 'Wordt na elk significant incident een root cause analyse uitgevoerd?', type: 'doc' },
    { q: 'Worden lessons learned vastgelegd en leiden deze tot concrete verbeteringen in procedures of maatregelen?', type: 'impl' },
  ],
  'A.5.28': [
    { q: 'Is er een procedure voor het veiligstellen van digitaal bewijsmateriaal bij incidenten (forensic readiness)?', type: 'doc' },
    { q: 'Wordt de chain of custody gewaarborgd bij het verzamelen en bewaren van bewijsmateriaal?', type: 'impl' },
  ],
  'A.5.29': [
    { q: 'Is er een business continuity plan met RPO/RTO per kritiek systeem?', type: 'doc' },
    { q: 'Worden backup-hersteltesten periodiek uitgevoerd en gedocumenteerd?', type: 'impl' },
    { q: 'Is er een uitwijkprocedure voor het geval de primaire locatie of systemen uitvallen?', type: 'proc' },
  ],
  'A.5.30': [
    { q: 'Is de ICT-infrastructuur ingericht om bedrijfscontinuïteitsdoelen (RPO/RTO) te halen (bijv. redundantie, disaster recovery site)?', type: 'doc' },
    { q: 'Wordt ict-gereedheid bedrijfscontinuïteit actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Zijn er redundante ICT-systemen of fail-over mogelijkheden voor bedrijfskritieke toepassingen?', type: 'impl' },
  ],
  'A.5.31': [
    { q: 'Is er een register van relevante wet- en regelgeving (bijv. AVG, NIS2, sectorspecifieke wetgeving) en wordt naleving getoetst?', type: 'doc' },
    { q: 'Worden wijzigingen in wet- en regelgeving actief gevolgd en geïmplementeerd?', type: 'impl' },
  ],
  'A.5.32': [
    { q: 'Is er een register van softwarelicenties en wordt gecontroleerd dat alleen legaal gelicentieerde software wordt gebruikt?', type: 'doc' },
    { q: 'Wordt periodiek gecontroleerd op ongeautoriseerde software (bijv. via software asset management)?', type: 'impl' },
  ],
  'A.5.33': [
    { q: 'Is er een retentiebeleid dat aangeeft hoe lang verschillende soorten registraties bewaard moeten worden?', type: 'doc' },
    { q: 'Worden registraties beschermd tegen ongeautoriseerde wijziging of vroegtijdige vernietiging?', type: 'impl' },
  ],
  'A.5.34': [
    { q: 'Is er een verwerkingsregister conform AVG en worden persoonsgegevens alleen verwerkt met geldige grondslag?', type: 'doc' },
    { q: 'Kunnen betrokkenen hun AVG-rechten (inzage, correctie, verwijdering) uitoefenen en is hier een procedure voor?', type: 'impl' },
  ],
  'A.5.35': [
    { q: 'Wordt het ISMS periodiek onafhankelijk beoordeeld (bijv. door interne audit of externe partij die niet bij implementatie betrokken was)?', type: 'doc' },
    { q: 'Worden bevindingen uit onafhankelijke beoordelingen aantoonbaar opgevolgd en afgesloten?', type: 'impl' },
  ],
  'A.5.36': [
    { q: 'Controleren managers binnen hun verantwoordelijkheidsgebied actief de naleving van informatiebeveiligingsbeleid?', type: 'doc' },
    { q: 'Worden nalevingscontroles gedocumenteerd en worden afwijkingen gecorrigeerd?', type: 'impl' },
  ],
  'A.5.37': [
    { q: 'Zijn er gedocumenteerde operationele procedures voor kritieke IB-activiteiten (bijv. backup, patching, toegangsbeheer)?', type: 'doc' },
    { q: 'Worden operationele procedures periodiek gereviewed en bijgewerkt bij wijzigingen in systemen of processen?', type: 'impl' },
  ],
  'A.6.1': [
    { q: 'Worden medewerkers gescreend bij indiensttreding (identiteit, diploma, VOG)?', type: 'proc' },
    { q: 'Is de screening proportioneel aan het niveau van toegang tot informatie?', type: 'impl' },
  ],
  'A.6.2': [
    { q: 'Is arbeidsvoorwaarden formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt arbeidsvoorwaarden actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.6.3': [
    { q: 'Ontvangen alle medewerkers jaarlijks een verplichte awareness-training?', type: 'impl' },
    { q: 'Worden phishing-simulaties uitgevoerd (minimaal 2x per jaar)?', type: 'impl' },
    { q: 'Wordt het deelnamepercentage en de toetsscore bijgehouden?', type: 'proc' },
    { q: 'Wordt de effectiviteit van trainingen geëvalueerd (niet alleen tevredenheid, maar ook begrip/gedragsverandering)?', type: 'impl' },
  ],
  'A.6.4': [
    { q: 'Is disciplinair proces formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt disciplinair proces actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.6.5': [
    { q: 'Is verantwoordelijkheden bij beëindiging formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt verantwoordelijkheden bij beëindiging actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.6.6': [
    { q: 'Is geheimhoudingsovereenkomsten formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt geheimhoudingsovereenkomsten actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.6.7': [
    { q: 'Is werken op afstand formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt werken op afstand actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.6.8': [
    { q: 'Is rapportage ib-gebeurtenissen formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt rapportage ib-gebeurtenissen actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.7.1': [
    { q: 'Zijn er gedefinieerde beveiligingszones met passende toegangscontrole?', type: 'impl' },
    { q: 'Worden bezoekers geregistreerd en begeleid in beveiligde zones?', type: 'proc' },
  ],
  'A.7.2': [
    { q: 'Is fysieke toegang formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Welke fysieke toegangsmechanismen worden gebruikt (badges, codes, biometrie) en hoe wordt autorisatie gevalideerd?', type: 'impl' },
    { q: 'Worden toegangsrechten ingetrokken bij uitdiensttreding of functiewijziging?', type: 'impl' },
  ],
  'A.7.3': [
    { q: 'Is beveiliging kantoren en faciliteiten formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Zijn werkruimtes met gevoelige informatie fysiek gescheiden van publiek toegankelijke zones?', type: 'impl' },
    { q: 'Zijn vergaderruimtes waar vertrouwelijke informatie besproken wordt adequaat beveiligd tegen afluisteren?', type: 'impl' },
  ],
  'A.7.4': [
    { q: 'Welke fysieke monitoringsystemen zijn geïmplementeerd (CCTV, alarmen, detectie) en worden deze actief gemonitord?', type: 'doc' },
    { q: 'Wordt fysieke beveiligingsmonitoring actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Worden beelden van beveiligingscamera\'s bewaard conform wettelijke eisen en incidentonderzoek-behoeften?', type: 'impl' },
  ],
  'A.7.5': [
    { q: 'Welke maatregelen zijn getroffen tegen brand, waterschade, stroomuitval en andere omgevingsdreigingen?', type: 'doc' },
    { q: 'Wordt bescherming tegen omgevingsdreigingen actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'A.7.6': [
    { q: 'Is werken in beveiligde zones formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Worden activiteiten in beveiligde zones gelogd en wordt extern personeel altijd begeleid?', type: 'impl' },
    { q: 'Gelden er restricties voor elektronische apparatuur (telefoons, camera\'s) in beveiligde zones?', type: 'impl' },
  ],
  'A.7.7': [
    { q: 'Is er een clean desk / clear screen beleid?', type: 'doc' },
    { q: 'Is automatische schermvergrendeling ingesteld op maximaal 5 minuten?', type: 'impl' },
  ],
  'A.7.8': [
    { q: 'Zijn servers en kritieke systemen geplaatst in beveiligde ruimtes met adequate klimaatbeheersing?', type: 'doc' },
    { q: 'Zijn beeldschermen met gevoelige informatie geplaatst zodat ongeautoriseerd meekijken wordt voorkomen?', type: 'impl' },
  ],
  'A.7.9': [
    { q: 'Is er beleid voor het meenemen van laptops en mobiele apparaten buiten kantoor, inclusief encryptie-eisen?', type: 'doc' },
    { q: 'Moeten medewerkers autorisatie verkrijgen voor het meenemen van bedrijfsapparatuur en worden deze geregistreerd?', type: 'impl' },
  ],
  'A.7.10': [
    { q: 'Is opslagmedia formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Hoe worden opslagmedia (USB, externe schijven) beheerd gedurende hun levenscyclus tot aan vernietiging?', type: 'impl' },
    { q: 'Worden verwijderbare opslagmedia versleuteld indien ze gevoelige informatie bevatten?', type: 'impl' },
  ],
  'A.7.11': [
    { q: 'Zijn kritieke systemen aangesloten op noodstroomvoorzieningen (UPS) en worden deze periodiek getest?', type: 'doc' },
    { q: 'Is er redundantie in stroomvoorziening en klimaatbeheersing voor het datacenter of serverruimte?', type: 'impl' },
  ],
  'A.7.12': [
    { q: 'Zijn netwerkkabels beschermd tegen ongeautoriseerde toegang en aftappen?', type: 'doc' },
    { q: 'Zijn stroom- en datakabels gescheiden en is kritieke bekabeling gelabeld voor onderhoudsdoeleinden?', type: 'impl' },
  ],
  'A.7.13': [
    { q: 'Wordt onderhoud aan kritieke apparatuur uitgevoerd volgens een gepland schema en door geautoriseerd personeel?', type: 'doc' },
    { q: 'Worden onderhoudsactiviteiten gelogd, inclusief wie het uitvoerde en welke handelingen zijn verricht?', type: 'impl' },
  ],
  'A.7.14': [
    { q: 'Is er een procedure voor veilige verwijdering van apparatuur inclusief data-sanitatie (wissen of fysieke vernietiging)?', type: 'doc' },
    { q: 'Wordt veilige verwijdering apparatuur actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Wordt verwijdering van data geverifieerd voordat apparatuur wordt afgevoerd of hergebruikt?', type: 'impl' },
  ],
  'A.8.1': [
    { q: 'Is er een beleid voor gebruikersapparatuur dat eisen stelt aan schermvergrendeling, encryptie, en toegestane apparaten (incl. BYOD)?', type: 'doc' },
    { q: 'Worden beveiligingsinstellingen op gebruikersapparatuur (laptops, mobiele devices) technisch afgedwongen en periodiek gecontroleerd?', type: 'impl' },
  ],
  'A.8.2': [
    { q: 'Is er een formeel proces voor toekenning, goedkeuring en logging van geprivilegieerde toegangsrechten (admin/root accounts)?', type: 'doc' },
    { q: 'Wordt geprivilegieerde toegangsrechten actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Worden geprivilegieerde toegangsrechten periodiek (minimaal kwartaallijks) gereviewd en ingetrokken wanneer niet meer nodig?', type: 'impl' },
  ],
  'A.8.3': [
    { q: 'Is toegang tot informatie beperkt volgens het need-to-know principe en role-based access control?', type: 'doc' },
    { q: 'Worden toegangsrechten tot gevoelige informatie minimaal jaarlijks gereviewd op basis van functie/rol?', type: 'impl' },
  ],
  'A.8.4': [
    { q: 'Is toegang tot broncode beperkt tot geautoriseerde ontwikkelaars en wordt dit technisch afgedwongen?', type: 'doc' },
    { q: 'Wordt toegang tot broncode actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Is broncode opgeslagen in een beveiligd versiebeheersysteem met audittrail?', type: 'impl' },
  ],
  'A.8.5': [
    { q: 'Is multi-factor authenticatie (MFA) verplicht voor alle externe toegang en beheerdersaccounts?', type: 'impl' },
    { q: 'Worden accounts automatisch vergrendeld na herhaalde mislukte inlogpogingen?', type: 'impl' },
  ],
  'A.8.6': [
    { q: 'Worden capaciteitsdrempels (disk, CPU, geheugen) gemonitord met alerts bij overschrijding?', type: 'doc' },
    { q: 'Wordt capaciteitsplanning periodiek gereviewd op basis van trends en groeiverwachtingen?', type: 'impl' },
  ],
  'A.8.7': [
    { q: 'Is anti-malware software geïnstalleerd met automatische updates en real-time scanning?', type: 'doc' },
    { q: 'Worden malware-detecties centraal gemonitord en is er een responsproces bij detectie?', type: 'impl' },
    { q: 'Is anti-malware geïnstalleerd op alle endpoints inclusief servers?', type: 'impl' },
  ],
  'A.8.8': [
    { q: 'Worden systemen periodiek gescand op kwetsbaarheden (minimaal maandelijks)?', type: 'impl' },
    { q: 'Worden kritieke patches binnen 48 uur geïnstalleerd?', type: 'proc' },
    { q: 'Is er een proces voor noodpatching bij actief uitgebuite kwetsbaarheden?', type: 'proc' },
  ],
  'A.8.9': [
    { q: 'Zijn er gedocumenteerde hardening baselines voor servers, netwerkapparatuur en endpoints?', type: 'doc' },
    { q: 'Worden configuraties geregistreerd in een CMDB en worden afwijkingen van baselines gedetecteerd?', type: 'impl' },
  ],
  'A.8.10': [
    { q: 'Is er een procedure voor veilige verwijdering van data die certificeerbare wismethoden (NIST 800-88) voorschrijft?', type: 'doc' },
    { q: 'Worden verwijderingen van data op opslagmedia gelogd en geverifieerd voordat apparatuur wordt afgevoerd?', type: 'impl' },
  ],
  'A.8.11': [
    { q: 'Worden productiegegevens geanonimiseerd of gemaskeerd voordat ze in test-/ontwikkelomgevingen worden gebruikt?', type: 'doc' },
    { q: 'Is vastgelegd welke datavelden maskering vereisen en wordt naleving gecontroleerd?', type: 'impl' },
  ],
  'A.8.12': [
    { q: 'Zijn DLP-maatregelen geïmplementeerd om ongeautoriseerde overdracht van gevoelige data te detecteren/blokkeren?', type: 'doc' },
    { q: 'Worden DLP-alerts gemonitord en wordt opvolging gegeven aan gedetecteerde incidenten?', type: 'impl' },
  ],
  'A.8.13': [
    { q: 'Worden dagelijks geautomatiseerde backups gemaakt van alle kritieke data?', type: 'impl' },
    { q: 'Wordt de 3-2-1 backup-strategie gehanteerd (3 kopieën, 2 media, 1 off-site)?', type: 'impl' },
    { q: 'Worden backup-hersteltesten minimaal halfjaarlijks uitgevoerd?', type: 'proc' },
  ],
  'A.8.14': [
    { q: 'Zijn kritieke systemen redundant uitgevoerd met automatische failover of handmatige switchover-procedures?', type: 'doc' },
    { q: 'Worden failover-procedures periodiek getest en zijn recovery time objectives (RTO) gedefinieerd?', type: 'impl' },
  ],
  'A.8.15': [
    { q: 'Worden authenticatie-, autorisatie- en systeemgebeurtenissen gelogd?', type: 'impl' },
    { q: 'Worden logs beschermd tegen wijziging en minimaal 12 maanden bewaard?', type: 'proc' },
    { q: 'Is er centraal logbeheer (SIEM of vergelijkbaar)?', type: 'impl' },
  ],
  'A.8.16': [
    { q: 'Worden netwerk- en systeemactiviteiten real-time gemonitord met alerting bij afwijkingen?', type: 'doc' },
    { q: 'Is er een proces voor opvolging van monitoring-alerts binnen gedefinieerde tijdlijnen?', type: 'impl' },
  ],
  'A.8.17': [
    { q: 'Zijn alle systemen gesynchroniseerd met een betrouwbare tijdsbron (NTP) met gedefinieerde maximale afwijking?', type: 'doc' },
    { q: 'Wordt kloksynchronisatie gemonitord en worden afwijkingen gedetecteerd en gecorrigeerd?', type: 'impl' },
  ],
  'A.8.18': [
    { q: 'Is het gebruik van systeemhulpprogramma\'s (bijv. PowerShell, cmd, registry editors) beperkt tot geautoriseerde beheerders?', type: 'doc' },
    { q: 'Wordt het gebruik van geprivilegieerde hulpprogramma\'s gelogd en gemonitord?', type: 'impl' },
  ],
  'A.8.19': [
    { q: 'Is er een proces voor goedkeuring en installatie van software op productiesystemen?', type: 'doc' },
    { q: 'Wordt ongeautoriseerde software gedetecteerd en verwijderd van operationele systemen?', type: 'impl' },
  ],
  'A.8.20': [
    { q: 'Zijn firewalls en IDS/IPS geïmplementeerd op netwerk-perimeters en tussen netwerksegmenten?', type: 'doc' },
    { q: 'Worden firewall-regels periodiek gereviewd en wordt ongebruikte poorten/diensten geblokkeerd?', type: 'impl' },
  ],
  'A.8.21': [
    { q: 'Zijn beveiligingseisen voor netwerkdiensten (VPN, DNS, DHCP, etc.) gedocumenteerd en geïmplementeerd?', type: 'doc' },
    { q: 'Worden netwerkdiensten periodiek getest op beveiligingsconfiguratie en kwetsbaarheden?', type: 'impl' },
  ],
  'A.8.22': [
    { q: 'Is het netwerk gesegmenteerd met gescheiden zones voor productie, ontwikkeling, DMZ en kantoor?', type: 'doc' },
    { q: 'Wordt verkeer tussen netwerksegmenten gefilterd en gemonitord op basis van het least-privilege principe?', type: 'impl' },
  ],
  'A.8.23': [
    { q: 'Is webfiltering geïmplementeerd om toegang tot schadelijke en niet-zakelijke websites te blokkeren?', type: 'doc' },
    { q: 'Worden geblokkeerde categorieën periodiek gereviewd en wordt bypass-gebruik gemonitord?', type: 'impl' },
  ],
  'A.8.24': [
    { q: 'Worden gegevens versleuteld bij transport (TLS 1.2+) en bij opslag (AES-256)?', type: 'impl' },
    { q: 'Is er een sleutelbeheerproces met periodieke rotatie?', type: 'proc' },
  ],
  'A.8.25': [
    { q: 'Zijn beveiligingseisen geïntegreerd in elke fase van de softwareontwikkellevenscyclus (requirements, design, coding, testing)?', type: 'doc' },
    { q: 'Wordt naleving van secure development practices gecontroleerd via code reviews of audits?', type: 'impl' },
  ],
  'A.8.26': [
    { q: 'Worden beveiligingseisen (authenticatie, autorisatie, input validatie, encryptie) expliciet vastgesteld voor nieuwe applicaties?', type: 'doc' },
    { q: 'Wordt gecontroleerd dat applicaties voldoen aan de vastgestelde beveiligingseisen voordat ze in productie gaan?', type: 'impl' },
  ],
  'A.8.27': [
    { q: 'Zijn secure architecture principes (defense-in-depth, least privilege, fail-secure) toegepast in systeemontwerp?', type: 'doc' },
    { q: 'Worden architectuurwijzigingen beoordeeld op beveiligingsimplicaties voordat ze worden doorgevoerd?', type: 'impl' },
  ],
  'A.8.28': [
    { q: 'Zijn secure coding standaarden (bijv. OWASP) gedocumenteerd en verplicht voor ontwikkelaars?', type: 'doc' },
    { q: 'Worden code reviews of static analysis tools gebruikt om secure coding naleving te controleren?', type: 'impl' },
  ],
  'A.8.29': [
    { q: 'Worden penetratietesten en vulnerability assessments uitgevoerd voor productiegang en periodiek daarna?', type: 'doc' },
    { q: 'Worden bevindingen uit beveiligingstesten geremedieerd binnen gedefinieerde tijdlijnen op basis van risico?', type: 'impl' },
  ],
  'A.8.30': [
    { q: 'Zijn beveiligingseisen contractueel vastgelegd met externe ontwikkelpartijen (incl. secure coding, code review)?', type: 'doc' },
    { q: 'Wordt extern ontwikkelde code getest op beveiligingsfouten voordat het wordt geaccepteerd?', type: 'impl' },
  ],
  'A.8.31': [
    { q: 'Zijn ontwikkel-, test-, acceptatie- en productieomgevingen fysiek of logisch gescheiden?', type: 'doc' },
    { q: 'Is het kopiëren van productiedata naar test-/ontwikkelomgevingen gecontroleerd en worden data geanonimiseerd?', type: 'impl' },
  ],
  'A.8.32': [
    { q: 'Worden wijzigingen aan IT-systemen gecontroleerd doorgevoerd via een change management proces?', type: 'proc' },
    { q: 'Bevat elke change request een risicobeoordeling en rollback-plan?', type: 'proc' },
  ],
  'A.8.33': [
    { q: 'Is er een beleid dat het gebruik van productiedata in testomgevingen verbiedt of anonimisering vereist?', type: 'doc' },
    { q: 'Wordt gecontroleerd dat testdata geen gevoelige informatie bevat of adequaat is gemaskeerd?', type: 'impl' },
  ],
  'A.8.34': [
    { q: 'Zijn richtlijnen opgesteld om impact van audittesten (penetratietesten, scans) op productiesystemen te minimaliseren?', type: 'doc' },
    { q: 'Worden audittesten gepland buiten piekuren en met voorafgaande notificatie aan relevante stakeholders?', type: 'impl' },
  ],
  'C.4.1': [
    { q: 'Is context van de organisatie — interne en externe factoren formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt context van de organisatie — interne en externe factoren actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.4.2': [
    { q: 'Is behoeften en verwachtingen van belanghebbenden formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt behoeften en verwachtingen van belanghebbenden actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Zijn de relevante wet- en regelgeving en contractuele verplichtingen geïdentificeerd als eisen van belanghebbenden?', type: 'impl' },
  ],
  'C.4.3': [
    { q: 'Is scope van het isms formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt scope van het isms actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Indien bepaalde gebieden zijn uitgesloten van de scope, is hiervoor een onderbouwde rechtvaardiging beschikbaar die aantoont dat dit geen invloed heeft op het vermogen informatiebeveiliging te leveren?', type: 'impl' },
  ],
  'C.5.1': [
    { q: 'Is leiderschap en commitment van de directie formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt leiderschap en commitment van de directie actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.5.2': [
    { q: 'Is informatiebeveiligingsbeleid formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt informatiebeveiligingsbeleid actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Is het informatiebeveiligingsbeleid beschikbaar gesteld aan alle medewerkers en relevante externe partijen?', type: 'impl' },
  ],
  'C.5.3': [
    { q: 'Is rollen, verantwoordelijkheden en bevoegdheden formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt rollen, verantwoordelijkheden en bevoegdheden actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.6.1': [
    { q: 'Is risicobeoordeling en risicobehandeling formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt risicobeoordeling en risicobehandeling actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Zijn de criteria voor risico-acceptatie vastgesteld en goedgekeurd door het management?', type: 'impl' },
    { q: 'Worden bij de risicobehandeling de vier opties (beperken, vermijden, overdragen, accepteren) expliciet overwogen?', type: 'impl' },
  ],
  'C.6.2': [
    { q: 'Is informatiebeveiligingsdoelstellingen en planning formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt informatiebeveiligingsdoelstellingen en planning actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.7.1': [
    { q: 'Is middelen voor het isms formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt middelen voor het isms actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.7.2': [
    { q: 'Is competentie van isms-betrokkenen formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt competentie van isms-betrokkenen actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Wordt de effectiviteit van genomen acties (zoals trainingen) om competentie te verkrijgen geëvalueerd?', type: 'impl' },
  ],
  'C.7.3': [
    { q: 'Is bewustwording bij alle medewerkers formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt bewustwording bij alle medewerkers actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.7.4': [
    { q: 'Is communicatie over informatiebeveiliging formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt communicatie over informatiebeveiliging actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.7.5': [
    { q: 'Is gedocumenteerde informatie en documentbeheer formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt gedocumenteerde informatie en documentbeheer actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Is gedocumenteerde informatie van externe oorsprong geïdentificeerd en beheerst?', type: 'doc' },
  ],
  'C.8.1': [
    { q: 'Is operationele planning en beheersing formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt operationele planning en beheersing actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.8.2': [
    { q: 'Is uitvoering risicobeoordeling formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt uitvoering risicobeoordeling actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.8.3': [
    { q: 'Is uitvoering risicobehandeling formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt uitvoering risicobehandeling actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.9.1': [
    { q: 'Is monitoring, meting, analyse en evaluatie formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt monitoring, meting, analyse en evaluatie actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.9.2': [
    { q: 'Is interne audit formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt interne audit actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Zijn auditors onafhankelijk van de geauditeerde activiteiten?', type: 'impl' },
    { q: 'Worden auditresultaten gerapporteerd aan relevant management?', type: 'impl' },
  ],
  'C.9.3': [
    { q: 'Is managementreview formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt managementreview actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
  'C.10.1': [
    { q: 'Is non-conformiteiten en correctieve maatregelen formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt non-conformiteiten en correctieve maatregelen actief toegepast en periodiek geëvalueerd?', type: 'impl' },
    { q: 'Wordt de doeltreffendheid van genomen correctieve maatregelen beoordeeld?', type: 'impl' },
  ],
  'C.10.2': [
    { q: 'Is continue verbetering formeel gedocumenteerd en goedgekeurd?', type: 'doc' },
    { q: 'Wordt continue verbetering actief toegepast en periodiek geëvalueerd?', type: 'impl' },
  ],
};