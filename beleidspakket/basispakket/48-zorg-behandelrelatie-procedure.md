# Behandelrelatie-procedure (zorg)

**AVG art. 9 + WGBO art. 7:457 / NEN 7510-2:2024 §5.15 + §8.15**

| | |
|---|---|
| **Documentnummer** | ISMS-048 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam FG / Medisch Manager] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Jaarlijks + bij wetswijziging |

---

## 1. Doel

Deze procedure beschrijft hoe [Organisatienaam] borgt dat toegang tot patientgegevens uitsluitend plaatsvindt door zorgverleners met een actieve behandelrelatie tot de patient, of via een gerechtvaardigde uitzondering (waarneming, noodtoegang). Het is een wettelijke vereiste op grond van WGBO en AVG en een controleerbare maatregel onder NEN 7510-2 §5.15.

## 2. Reikwijdte

Alle systemen die patientgegevens bevatten: EPD, beeldarchieven (PACS), labsystemen, e-Health portalen, agenda-applicaties met klinische context, formulieren-systemen en geintegreerde berichtenuitwisseling (LSP, ZorgMail, edifact).

## 3. Definities

| Term | Betekenis |
|---|---|
| **Behandelrelatie** | Een zorgverlener heeft of had directe betrokkenheid bij de behandeling, diagnose of zorg van de patient |
| **Waarnemer** | Zorgverlener die tijdelijk de behandelrelatie overneemt (vakantie, dienst, doorverwijzing) |
| **Noodtoegang** | Toegang zonder vooraf vastgestelde behandelrelatie, alleen bij acute noodzaak (zie break-glass) |
| **Steekproef** | Periodieke controle achteraf op rechtmatigheid van toegang |

## 4. Technische maatregelen

| Maatregel | Inhoud |
|---|---|
| **Behandelrelatie-flag in EPD** | Per dossier wordt geregistreerd welke zorgverlener(s) een lopende behandelrelatie hebben |
| **Toegangsfilter** | Bij openen van een dossier toetst het EPD of de actor een actieve relatie heeft |
| **Waarnemer-functionaliteit** | Tijdelijke overname met einddatum + reden |
| **Noodtoegang via break-glass** | Verplicht motivatie-veld + automatische audit-melding (zie ISMS-050) |
| **Logging** | Elke opening van een dossier wordt geregistreerd met actor, datum/tijd, dossier-ID, reden indien noodtoegang |

## 5. Organisatorische maatregelen

| Maatregel | Inhoud |
|---|---|
| **Functieprofielen** | Per functie is vastgelegd op welke patientencategorieen toegang relevant is |
| **Onboarding** | Bij indiensttreding wordt het toegangsprofiel geactiveerd na ondertekening geheimhoudingsverklaring |
| **Periodieke review** | Halfjaarlijks: zijn de behandelrelaties en functieprofielen actueel? |
| **Steekproeven** | Maandelijks: minimaal [N] willekeurige toegang-events worden door FG/IB-officer beoordeeld |
| **Awareness** | Bij training wordt de regel ingeprent: geen toegang zonder behandelrelatie of break-glass |

## 6. Beslisboom toegang tot een dossier

1. **Heeft u een actieve behandelrelatie?** &rarr; Open dossier, log automatisch
2. **Bent u waarnemer voor de behandelaar?** &rarr; Open dossier onder waarnemer-rol, log automatisch
3. **Heeft de patient toestemming gegeven voor inzage door deze zorgverlener?** &rarr; Open dossier, vermeld toestemming in dossiernotitie
4. **Is er sprake van acute noodsituatie (geen behandelrelatie, geen toestemming, levensbedreigend)?** &rarr; Gebruik break-glass, motiveer toegang (zie ISMS-050)
5. **Geen van bovenstaande?** &rarr; Geen toegang. Eventueel intern doorverwijzen.

## 7. Logging en review

Elke toegang wordt minimaal [aantal] jaar bewaard met:
- Actor (gebruikers-ID, naam, functie)
- Patient-ID (pseudoniem indien mogelijk)
- Datum en tijd
- Type handeling (lezen, schrijven, exporteren, afdrukken)
- Reden bij noodtoegang
- Bron-systeem en locatie (IP, werkstation)

Logging is read-only en append-only voor zorgverleners. Beheerderstoegang is gescheiden van zorgverleningsrollen (segregation of duties, NEN 7510-2 §5.3).

## 8. Datalekrisico

Toegang zonder behandelrelatie is een datalek-categorie zoals omschreven in ISMS-040 (Datalekprocedure). Bij vermoeden of constatering: meldt direct bij FG, ook als nog niet zeker is of er bewust misbruik plaatsvond.

## 9. Communicatie met patient

Patienten hebben op grond van AVG art. 15 en WGBO art. 7:456 recht op inzage in wie hun dossier heeft geraadpleegd. [Organisatienaam] biedt deze inzage op verzoek aan via [patient-portaal of HR-procedure]. Een inzageverzoek wordt binnen een maand afgehandeld.

## 10. Toezicht door FG

De FG controleert minimaal jaarlijks:
- Aantal noodtoegang-events en patroon (ongebruikelijke pieken)
- Resultaat van maandelijkse steekproeven
- Klachten en signalen van patienten of medewerkers
- Naleving door externe leveranciers met dossier-toegang

Resultaat wordt verwerkt in jaarlijkse FG-rapportage aan directie.

---

**Bijlagen**
- Bijlage A: Functieprofielen met toegangsmatrix
- Bijlage B: Voorbeeldsteekproef-rapportage
- Bijlage C: Patient-inzage-template

**Gerelateerde documenten**
- [[ISMS-049 EPD-logging-beleid]]
- [[ISMS-050 Break-glass-procedure]]
- [[ISMS-040 Datalekprocedure]]
- [[NEN 7510-2 §5.15 + §8.15]]
