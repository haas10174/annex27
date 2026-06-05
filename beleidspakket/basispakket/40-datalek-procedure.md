# Datalekprocedure en meldformulier

**AVG Artikel 33 en 34 / ISO 27001:2022 — A.5.24, A.5.25, A.5.26**

| | |
|---|---|
| **Documentnummer** | ISMS-040 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Reviewcyclus** | Jaarlijks |

---

## 1. Doel

Deze procedure beschrijft hoe [Organisatienaam] een vermoedelijk of bevestigd datalek detecteert, beoordeelt, intern opvolgt en wanneer nodig meldt aan de Autoriteit Persoonsgegevens (AP) en betrokkenen.

Een datalek is elke inbreuk op de beveiliging die per ongeluk of onrechtmatig leidt tot vernietiging, verlies, wijziging, ongeoorloofde openbaarmaking van of toegang tot persoonsgegevens.

## 2. Reikwijdte

Deze procedure geldt voor alle medewerkers van [Organisatienaam], inclusief inhuur, stagiairs en derden met toegang tot persoonsgegevens.

## 3. Rollen en verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| Iedere medewerker | Vermoeden van datalek direct melden bij FG of helpdesk |
| Helpdesk / IT | Eerste opvang, registratie, betrokken systemen isoleren |
| Functionaris Gegevensbescherming (FG) | Beoordeling, advies risiconiveau, contact AP |
| CISO | Technisch onderzoek, mitigerende maatregelen |
| Directie | Goedkeuring AP-melding en betrokkenen-communicatie |
| Communicatie | Externe berichtgeving bij gemelde datalekken |

## 4. Detectie en interne melding

Een datalek kan ontdekt worden via:
- Logging en SIEM-alerts
- Medewerker meldt verlies van laptop, telefoon of papier
- Klant of partner meldt onbedoelde ontvangst van data
- Externe partij signaleert via meldformulier op privacy-pagina
- Pentest of bug-bounty-rapport

Elke melder gebruikt de interne meldroute: e-mail naar **datalek@[Organisatienaam].nl** of de helpdesk-knop in het portaal. De melder benoemt: wat is gebeurd, wanneer, hoeveel betrokkenen schat hij in, welke systemen.

## 5. Beoordeling binnen 24 uur

Binnen 24 uur na interne melding voert de FG (samen met CISO) deze beoordeling uit. Gebruik onderstaand meldformulier.

### Meldformulier datalek

| Veld | Inhoud |
|---|---|
| **Intern volgnummer** | DL-[JJJJ]-[NN] |
| **Datum ontdekking** | [DD-MM-JJJJ] |
| **Datum incident** | [DD-MM-JJJJ — indien bekend] |
| **Melder** | [Naam + functie] |
| **Korte beschrijving** | [Wat is er gebeurd?] |
| **Type incident** | [ ] Verlies van data <br> [ ] Onbedoelde openbaarmaking <br> [ ] Ongeoorloofde toegang <br> [ ] Vernietiging <br> [ ] Wijziging |
| **Categorieën persoonsgegevens** | [Bijv. NAW, BSN, gezondheid, financieel, bijzonder] |
| **Aantal betrokkenen** | [Schatting + categorie: klanten, medewerkers, leveranciers] |
| **Mogelijke gevolgen** | [Identiteitsfraude, reputatieschade, financieel verlies, fysieke schade] |
| **Reeds genomen maatregelen** | [Wachtwoord-reset, system isolatie, betrokkene geinformeerd] |
| **Risicoclassificatie** | [ ] Laag &middot; [ ] Midden &middot; [ ] Hoog |

## 6. Beslisboom AP-melding

De FG beoordeelt of het lek gemeld moet worden aan de AP. De toets:

1. **Is het waarschijnlijk dat het lek een risico inhoudt voor de rechten en vrijheden van betrokkenen?**
   - **Nee** &rarr; intern registreren in datalekregister, geen AP-melding nodig
   - **Ja** &rarr; binnen 72 uur na ontdekking melden aan AP via [https://datalekken.autoriteitpersoonsgegevens.nl](https://datalekken.autoriteitpersoonsgegevens.nl)

2. **Is het waarschijnlijk dat het lek een hoog risico inhoudt?**
   - **Ja** &rarr; ook betrokkenen informeren zonder onredelijke vertraging
   - **Nee** &rarr; betrokkenen niet noodzakelijk informeren, AP-melding volstaat

De FG beargumenteert de keuze in het datalekregister. De directie tekent voor melding aan AP en betrokkenen.

## 7. AP-melding binnen 72 uur

Indien gemeld, bevat de AP-melding ten minste:
- Aard van de inbreuk, categorieën en aantal betrokkenen
- Naam en contactgegevens van de FG
- Waarschijnlijke gevolgen
- Maatregelen ter beperking en mitigatie

Een vervolgmelding kan, mits gemotiveerd, later worden ingediend.

## 8. Communicatie naar betrokkenen

Bij hoog risico ontvangt elke betrokkene een duidelijke, niet-juridische communicatie met:
- Wat er is gebeurd in begrijpelijke taal
- Welke persoonsgegevens betrokken zijn
- Mogelijke gevolgen en aanbevolen acties (wachtwoord wijzigen, identiteits-monitoring)
- Contactgegevens van de FG voor vragen

## 9. Registratie

Alle datalekken (gemeld en niet-gemeld) worden vastgelegd in het datalekregister van [Organisatienaam], met onderbouwing van de risicobeoordeling. Het register wordt jaarlijks geanalyseerd op patronen door de FG.

## 10. Evaluatie en lessons learned

Binnen 30 dagen na afsluiting volgt een evaluatiegesprek (FG + CISO + betrokken systeemeigenaar). Bevindingen leiden tot aanpassing van procedures, training of techniek. Geregistreerd in het ISMS-improvementregister.

---

**Bijlagen**
- Bijlage A: Beslisboom AP-melding (visueel)
- Bijlage B: Communicatie-template betrokkenen
- Bijlage C: Voorbeeldscenario's en classificatie

**Gerelateerde documenten**
- [[ISMS-019 Incident Response Plan]]
- [[ISMS-041 DPIA Template]]
- [[ISMS-030 Register Verwerkingsactiviteiten]]
