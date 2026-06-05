# NIS2 supply chain due diligence

**NIS2 art. 21 lid 2 sub d / Cyberbeveiligingswet (Cbw) / Belgische NIS2-omzettingswet / ISO 27001 A.5.19-A.5.22**

| | |
|---|---|
| **Documentnummer** | ISMS-058 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam Inkoop + CISO] |
| **Goedgekeurd door** | [Naam Bestuur] |
| **Reviewcyclus** | Jaarlijks + bij elke nieuwe kritieke leverancier |

---

## 1. Doel

NIS2 verplicht essentiele en belangrijke entiteiten om de cyberbeveiliging van hun toeleveringsketen actief te beoordelen en te monitoren. Dit gaat verder dan een standaard verwerkersovereenkomst en bovenop de leveranciersbeoordeling uit ISO 27001. Deze procedure beschrijft hoe [Organisatienaam] de NIS2-specifieke supply chain due diligence uitvoert.

## 2. Reikwijdte

Alle leveranciers en partners die:

- Onderdeel zijn van de **kritieke toeleveringsketen** van [Organisatienaam]
- Toegang hebben tot productie-systemen, klantdata of intern beheer
- Diensten leveren waarvan een storing de continuiteit van [Organisatienaam] direct bedreigt
- Cloud, SaaS, beheerd ICT-onderhoud of vergelijkbare digitale diensten leveren

Niet in scope: kantoorartikelen-leveranciers, schoonmaak zonder ICT-toegang, kleine commodity-services.

## 3. Vier pijlers van de NIS2-toets

| Pijler | Inhoud |
|---|---|
| **1. Kwetsbaarheidsbeoordeling van de leverancier** | Hoe gevoelig is de leverancier zelf voor incidenten? |
| **2. Kwaliteit van security-praktijken** | Welke maatregelen heeft de leverancier zelf getroffen? |
| **3. Wijze waarop kwetsbaarheden worden behandeld** | Hoe snel en transparant gaat de leverancier om met eigen security-issues? |
| **4. Toeleveringsketen van de leverancier zelf** | Vierde-partij-risico: wie levert aan onze leverancier? |

Deze pijlers zijn niet vrijblijvend; in de motivering bij elke leverancier moet zichtbaar zijn dat ze gewogen zijn.

## 4. Risicoclassificatie leverancier

| Klasse | Voorbeelden | Diepte due diligence |
|---|---|---|
| **Kritiek** | Hoofdcloud, ERP, EPD, betaalsysteem | Volledige toets + jaarlijkse audit + on-site review eventueel |
| **Hoog** | Identity-provider, sleutelbeheer, monitoring-tooling | Volledige toets + jaarlijkse update |
| **Gemiddeld** | Specifieke SaaS-tools, gespecialiseerde aanbieders | Standaard-toets + tweejaarlijkse update |
| **Laag** | Marketingtools, single-use services | Korte risico-check + ad-hoc heroverweging |

Classificatie is gebaseerd op gecombineerde score van impact (van uitval) en gevoeligheid (van data).

## 5. Due diligence-vragenlijst

Voor klasse Kritiek en Hoog wordt minimaal deze vragenlijst gebruikt (samenvatting):

**A. Organisatie en governance**
- Heeft de leverancier een aangewezen CISO en FG?
- Is het management aantoonbaar betrokken bij cyberbeveiliging (board-rapportage)?
- Welke certificeringen (ISO 27001, SOC 2 type 2, NEN 7510, BIO) heeft de leverancier?
- Hoe oud zijn de auditrapporten?

**B. Technische maatregelen**
- MFA verplicht voor alle administratieve accounts? Zo ja, welk type (FIDO2, app, SMS)?
- Encryptie at-rest en in-transit op alle systemen?
- Welke logging wordt bewaard en hoe lang?
- Hoe vaak en hoe diep pentesten?

**C. Incident response**
- Hoe wordt detectie georganiseerd (SOC, SIEM, managed)?
- Wat is de mediane tijd tot detectie en tot containment?
- Hoe wordt de klant geinformeerd bij een incident? Binnen welke termijn?
- Is er een directe contactpersoon voor crisis-momenten 24/7?

**D. Sub-verwerkers en vierde partij**
- Heeft de leverancier een actueel sub-processors-register?
- Welke landen verwerken sub-processors gegevens (incl. doorgifte buiten EER)?
- Hoe beoordeelt de leverancier zijn eigen toeleveringsketen?
- Wijzigingen sub-processors: hoe vooraf gemeld?

**E. Continuiteit en exit**
- RTO en RPO?
- Backup-strategie en test-restore-frequentie?
- Hoe wordt data overgedragen of vernietigd bij contractbeeindiging?
- Welke vendor lock-in-risico's zijn er?

**F. Personele beveiliging**
- Achtergrondchecks bij personeel met toegang tot klantdata?
- Hoe vaak awareness-training bij de leverancier zelf?
- Geheimhouding bij personeel: hoe geborgd?

**G. Compliance**
- Hoe gaat de leverancier om met NIS2-verplichtingen voor eigen organisatie?
- Welke meldplichten gelden voor hun sector?
- Hoe wordt naleving aangetoond aan klanten?

## 6. Beslissingsproces

| Stap | Actor | Doorlooptijd |
|---|---|---|
| Identificeren leverancier-kandidaat | Inkoop / business-eigenaar | T0 |
| Classificeren risico-klasse | CISO + business-eigenaar | T0 + 5 werkdagen |
| Aanvraag due diligence-vragenlijst | Inkoop | T0 + 7 werkdagen |
| Beoordeling antwoorden | CISO + FG + Juridisch | T0 + 14 werkdagen |
| Eventuele follow-up vragen of audit | CISO | T0 + 21 werkdagen |
| Eindbeslissing en motivatie | Inkoop + CISO + (Bestuur bij kritiek) | T0 + 28 werkdagen |
| Vastlegging in leveranciersregister | Inkoop | T0 + 30 werkdagen |
| Contractondertekening + verwerkersovereenkomst (ISMS-042) | Juridisch + Inkoop | T0 + 35 werkdagen |
| Periodieke heroverweging | CISO | Volgens klasse |

## 7. Lopende monitoring

Voor klasse Kritiek en Hoog vindt continue monitoring plaats:

- Threat intelligence-feeds toetsen of de leverancier in een incident betrokken raakt
- Publieke disclosures van CVE's op door leverancier gebruikte componenten
- Wijzigingen in eigendomsstructuur, bestuur, financiele gezondheid
- Sub-processor-aanpassingen volgens contract-clausule

Bij significante signalen wordt een ad-hoc heroverweging opgestart.

## 8. Contract-clausules NIS2

Standaard NIS2-clausules in elk contract met klasse Hoog of Kritiek:

- Verplichting tot melding van significante cyberincidenten binnen 24 uur
- Recht op periodieke audit door [Organisatienaam] of haar agent
- Verplichting tot updates verstrekken bij wijziging beveiligings-context
- Doorlegging van NIS2-relevante eisen aan eigen sub-verwerkers
- Recht op opzegging bij persistent niet-naleven

## 9. Lokale + transnationale risico's

Geopolitieke ontwikkelingen kunnen extra wegen, bijvoorbeeld:

- Leveranciers uit landen onder Europese restricties (Russische federatie, Wit-Rusland)
- Amerikaanse aanbieders met CLOUD Act-risico (zie ISMS-055 voor overheid-context)
- Aanbieders met aanzienlijke belangen in landen met afwijkende rule of law

Deze risico's worden in pijler 1 expliciet meegenomen.

## 10. Rapportage aan bestuur

Halfjaarlijks levert de CISO een rapport aan het bestuur (NIS2 art. 20) over:

- Aantal leveranciers per klasse
- Aantal nieuwe / vervangen / opgezegde leveranciers
- Significante bevindingen uit due diligence
- Lopende issues en hun mitigerende maatregelen
- Voorstellen voor procedure-verbetering

---

**Bijlagen**
- Bijlage A: Standaard NIS2-due-diligence-vragenlijst
- Bijlage B: Risicoclassificatie-matrix met scoring-criteria
- Bijlage C: Standaard NIS2-clausules voor contracten
- Bijlage D: Monitoring-checklist (threat intel + heroverweging-triggers)

**Gerelateerde documenten**
- [[ISMS-023 Leveranciersbeleid]]
- [[ISMS-024 Leveranciersbeoordeling]]
- [[ISMS-042 Verwerkersovereenkomst]]
- [[ISMS-055 Cloud- en leveranciersbeoordeling overheid]]
- [[38 NIS2 ↔ ISO 27001-mapping]]
- [[NIS2 art. 21 lid 2 sub d]]
