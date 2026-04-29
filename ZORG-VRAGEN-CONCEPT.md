# Zorg-gap-analyse — vragenset (concept v1)

Sector: **zorg** | Norm-basis: **ISO/IEC 27001:2022 + NEN 7510-1/-2:2024+A1:2026**
Status: **CONCEPT — wacht op Lead Auditor (Raoul) review voor publicatie**

## Plaatsing in het product

Twee niveaus:

| Tool | Vragen | Plek |
|---|---|---|
| **Quickscan** (`gap-analyse.html`, gratis lead-funnel) | 13 ISO + 2 zorg-light = 15 | Al bijgewerkt, NEN 7510 zichtbaar in resultaat |
| **Echte gap-analyse** (`dashboard.html`, €795 achter login) | Alle 93 Annex A + clausules 4-10 + onderstaande 14 NEN 7510-deltas voor zorg-klanten | Toe te voegen als `zorgSpecificQuestions` map naast bestaande `specificQuestions` |

De 14 onderstaande vragen behoren bij de **echte gap-analyse**, niet bij de quickscan (FAQ houdt quickscan op 10-15 vragen voor productieve lead-conversion).

## 14 zorg-deltavragen

### Governance & beleid (org)

1. **Patiëntenprivacybeleid (gewicht 3)**
   Heeft uw organisatie een schriftelijk vastgelegd informatiebeveiligings- en privacybeleid dat AVG art. 9 (bijzondere persoonsgegevens), WGBO-bewaarplicht en NEN 7510 expliciet adresseert?
   *Controls:* A.5.1, A.5.31 / NEN 7510-2 §5.36

2. **Informatiebeveiligingsfunctionaris (gewicht 3)**
   Is een Informatiebeveiligingsfunctionaris (CISO/FG/IB-officer) aangewezen, en bij organisaties met >500 medewerkers of >10.000 cliënten een formele adviesgroep informatiebeveiliging die periodiek bijeenkomt?
   *Controls:* A.5.2 / NEN 7510-2 §5.2

### Personeel (hr)

3. **Geheimhouding zorgmedewerkers (gewicht 2)**
   Tekenen zorgmedewerkers een geheimhoudingsverklaring die expliciet verwijst naar tuchtrechtelijke verantwoordelijkheid (BIG/Wkkgz) en de bijzondere positie van patiëntgegevens?
   *Controls:* A.6.6 / NEN 7510-2 §6.6

4. **Bewustwording zorg-specifiek (gewicht 3)**
   Krijgen zowel klinisch personeel als ICT-medewerkers periodieke bewustwordingstraining over zorg-specifieke risico's (toegang tot dossiers buiten behandelrelatie, medische apparaten, social engineering, datalek-meldplicht)?
   *Controls:* A.6.3 / NEN 7510-2 §6.3

### Fysiek & assets (phys)

5. **Informatiestromen ketenpartners (gewicht 3)**
   Zijn alle informatiestromen tussen u en ketenpartners (verwijsbrief, labuitslagen, medicatie-overdracht, integratieplatforms zoals Nuts/MedMij/Twiin) inclusief interfaces opgenomen in het asset-register?
   *Controls:* A.5.9 / NEN 7510-2 §5.9

6. **Bewaartermijn medische dossiers (gewicht 3)**
   Worden medische dossiers bewaard en vernietigd conform de WGBO-bewaartermijn (20 jaar of langer indien noodzakelijk), en bestaat er een gedocumenteerd vernietigingsbeleid voor zowel papier als digitaal?
   *Controls:* A.7.10, A.8.10 / NEN 7510-2 §7.10, §8.10

### Technische controls (tech)

7. **Toegang op behandelrelatie + break-glass (gewicht 3)**
   Is toegang tot patiëntdossiers gebaseerd op een actieve behandelrelatie, en bestaat er een gedocumenteerde noodtoegang ('break-glass') met automatische logging en periodieke review?
   *Controls:* A.5.15, A.5.18 / NEN 7510-2 §5.15

8. **Sterke authenticatie zorgverleners (gewicht 3)**
   Authenticeren zorgverleners met ten minste twee factoren waarvan één persoonsgebonden (UZI-pas, DigiD met substantieel/hoog niveau, of vergelijkbaar) bij toegang tot patiëntgegevens?
   *Controls:* A.5.16, A.8.5 / NEN 7510-2 §5.16, §8.5

9. **Toegangslogging dossiers (gewicht 3)**
   Wordt elke toegang tot een patiëntdossier (lezen, wijzigen, exporteren) gelogd met gebruikers-ID, tijdstip, en BSN/dossier-ID, en bestaat er een proces voor periodieke dossier-toegang-audits?
   *Controls:* A.8.15 / NEN 7510-2 §8.15

10. **Encryptie patiëntdata (gewicht 3)**
    Worden patiëntgegevens (BSN, diagnose, behandelplan) versleuteld zowel tijdens transport als bij opslag, met sleutelbeheer onder uw eigen organisatie of een verwerker met passende waarborgen?
    *Controls:* A.8.24 / NEN 7510-2 §8.24

11. **Pseudoniem-registratie kwetsbare zorgontvangers (gewicht 2)**
    Bestaat er een procedure voor pseudoniem- of alias-registratie van VIP's, slachtoffers van misdrijven, beveiligings-/defensiemedewerkers en kinderen, met beperkte toegang tot hun ware identiteit?
    *Controls:* A.5.34 / NEN 7510-2 §5.34

### Operationeel (ops)

12. **Datalek-meldprocedure zorg (gewicht 3)**
    Heeft u een datalek-meldprocedure die binnen 72 uur de Autoriteit Persoonsgegevens informeert, én een meldlijn naar de IGJ (Inspectie Gezondheidszorg en Jeugd) wanneer continuïteit van zorg of patiëntveiligheid in het geding is?
    *Controls:* A.5.24, A.6.8 / NEN 7510-2 §6.8

13. **Verwerkersovereenkomsten zorgketen (gewicht 3)**
    Bevatten verwerkersovereenkomsten met EPD-leveranciers, laboratoria, fabrikanten van medische apparaten en ICT-ketenpartners zorg-specifieke clausules (continuïteit klinisch proces, sub-verwerker patiëntdata, audit-recht, bewijs van ISO 27001 of NEN 7510)?
    *Controls:* A.5.19, A.5.20, A.5.21 / NEN 7510-2 §5.19, §5.21

14. **Back-up + restore EPD/PACS (gewicht 3)**
    Worden back-ups van EPD-, PACS- en RIS-systemen periodiek getest op restore-functionaliteit, met respect voor de wettelijke bewaartermijnen voor medische dossiers?
    *Controls:* A.8.13 / NEN 7510-2 §8.13

## Reviewchecklist Lead Auditor

Vóór live: per vraag toetsen op
- [ ] Auditbaarheid (kan een organisatie het bewijs leveren?)
- [ ] Geen overlap met basisvragen
- [ ] Correcte NEN 7510-2 control-verwijzing
- [ ] Bewoording past bij MKB-zorgcontext (huisartsen, fysio's, kleine GGZ, tandartsen)
- [ ] Niveau-onderscheid 0/2/3/4 zinvol per vraag
- [ ] Eventueel: extra vraag voor specifiek subsegment (PGO/MedMij, telezorg, eHealth)?
