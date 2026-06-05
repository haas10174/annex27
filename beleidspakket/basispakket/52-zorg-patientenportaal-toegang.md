# Patientenportaal toegangsbeleid (zorg)

**AVG art. 12-22 / WGBO art. 7:456 / Wabvpz / NEN 7510-2:2024 §5.18**

| | |
|---|---|
| **Documentnummer** | ISMS-052 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam FG / IT-manager] |
| **Goedgekeurd door** | [Naam Directie] |
| **Reviewcyclus** | Jaarlijks + bij wijziging portaal-leverancier |

---

## 1. Doel

Patienten hebben sinds de Wet aanvullende bepalingen verwerking persoonsgegevens in de zorg (Wabvpz, 2020) recht op elektronische inzage in eigen dossier. Dit beleid beschrijft hoe [Organisatienaam] dat technisch en organisatorisch invult zonder informatieveiligheid in gevaar te brengen.

## 2. Functionaliteit

Het patientenportaal biedt patienten:

| Functie | Onderdeel |
|---|---|
| Inzage in eigen dossier | Notities, lab-uitslagen, beelden (afhankelijk van type) |
| Recept- en medicatie-overzicht | Actuele en historische recepten |
| Afspraken-overzicht | Komende en historische consulten |
| Berichten met behandelaar | Asynchroon, geen acute zorg |
| Vragenlijsten en PROMs | Voor afspraak invullen |
| Verzoek tot dossiercorrectie of vernietiging | Doorzetten naar FG-procedure |
| Inzage in toegangslog | Wie heeft mijn dossier geraadpleegd? (NEN 7513-conform) |

## 3. Authenticatie

| Niveau | Inzet |
|---|---|
| **DigiD met SMS of app** | Standaard voor inzage |
| **DigiD Hoog** | Vereist voor downloaden volledig dossier of correctieverzoek |
| **eHerkenning of itsme** | Voor patienten zonder DigiD (BE-context) |
| **MFA verplicht** | Voor administratieve handelingen door patient (correctie, vernietiging, datadeling) |

Geen toegang via wachtwoord-only of e-mail + SMS, behoudens noodgevallen.

## 4. Identiteits- en accountkoppeling

| Stap | Wanneer | Hoe |
|---|---|---|
| Account aanmaken | Bij eerste DigiD-login | Automatisch gekoppeld aan BSN in EPD |
| Verificatie identiteit | Bij DigiD-authenticatie | DigiD-logius levert pseudoniem + BSN |
| Account-koppeling fysieke patient | Bij intake of eerste login | Eventueel handmatige verificatie balie |
| Wachtwoord-reset | Via DigiD, niet via e-mail | Voorkomt account-takeover |
| Account bevriezen | Op verzoek patient of bij vermoeden misbruik | Direct, met meldplicht FG |

## 5. Welke gegevens zichtbaar?

Niet alle dossier-onderdelen zijn standaard inzichtelijk. Per dataveld is bepaald:

| Type gegeven | Standaard zichtbaar voor patient? | Toelichting |
|---|---|---|
| Notities behandelaar | Ja, na embargo-periode (richtwaarde 7 dagen) | Behandelaar krijgt tijd om context te plaatsen |
| Labuitslagen | Ja, na vrijgave door behandelaar | Voorkomt zorgen over onvolledig beeld |
| Beelden (rontgen, scans) | Niet standaard, op verzoek | Vergt context bij interpretatie |
| Werknotities, hypothesen | Nee | Niet bedoeld voor patient |
| Gegevens derde (familielid in dossier) | Nee, tenzij anonimiseerbaar | AVG art. 15 lid 4 |
| Tuchtklacht-informatie | Nee | Onderdeel ander dossier |

Beslissingen worden vastgelegd in een veld-mapping-document, jaarlijks gereviewd.

## 6. Embargo en herstel

Behandelaar kan vrijgave van een nieuwe notitie tijdelijk uitstellen (embargo, max [N] dagen) als hij of zij de context eerst persoonlijk wil bespreken. Het embargo is gelogd en zichtbaar voor de patient (datum vrijgave).

## 7. Berichtenfunctie

| Onderdeel | Inhoud |
|---|---|
| Doel | Niet-acute vragen en korte updates |
| Niet bedoeld voor | Spoedeisende zorg, second opinion, ingewikkelde klachten |
| Reactietermijn | [N] werkdagen, vastgelegd in algemene voorwaarden portaal |
| Tone of voice | Empathisch, geen medisch jargon zonder uitleg |
| Bewaring | Berichten zijn onderdeel van dossier en vallen onder WGBO-bewaartermijn |
| Bescherming | TLS 1.2+, geen e-mail-doorsturen zonder versleuteling |

## 8. Toegang door derde (vertegenwoordiging)

| Situatie | Procedure |
|---|---|
| Ouders van minderjarige tot 12 jaar | Automatische toegang voor wettelijk vertegenwoordiger |
| Minderjarige 12-15 jaar | Gedeelde toegang ouder + kind, met inspraak kind |
| Minderjarige 16+ | Eigen toegang, ouder geen toegang zonder toestemming |
| Wilsonbekwame meerderjarige | Toegang via wettelijk vertegenwoordiger (curator, mentor, gemachtigde) |
| Mantelzorger | Alleen met expliciete schriftelijke machtiging van patient |
| Overleden patient | Inzage door nabestaanden via aparte procedure, beoordeeld per geval |

Elke afwijking wordt vastgelegd in een toegangsregister gekoppeld aan het dossier.

## 9. Logging en transparantie

Conform NEN 7513 en ISMS-049 logt het portaal alle toegangs- en mutatie-events. De patient kan zelf zijn of haar toegangslog inzien (wie heeft mijn dossier geopend en wanneer). Dit verlaagt klachten en versterkt vertrouwen.

## 10. Beveiligingsincidenten

Bij vermoeden van compromittering (gestolen DigiD, ongebruikelijke toegang vanuit ander land), wordt het account direct bevroren, de patient geinformeerd via een onafhankelijk kanaal (sms, telefoon) en gestart met datalek-onderzoek (ISMS-040).

## 11. Externe leverancier

Het patientenportaal wordt geleverd door **[Naam leverancier]**. Verwerkersovereenkomst is afgesloten conform ISMS-042. De leverancier:

- Verwerkt persoonsgegevens uitsluitend binnen de EER
- Levert minimaal kwartaal een security-rapport (penetratietest-summary, patch-status)
- Heeft jaarlijkse externe audit conform NEN 7510 of vergelijkbaar
- Meldt incidenten binnen 24 uur

## 12. Toezicht door FG

Jaarlijks rapporteert de FG aan de directie:
- Aantal portaal-accounts (actief, geinactiveerd)
- Aantal correctie- en vernietigingsverzoeken via portaal
- Aantal toegangs- of berichten-klachten
- Resultaat externe security-audit leverancier
- Uitkomsten steekproeven op terechte toegang

---

**Bijlagen**
- Bijlage A: Veld-mapping (welk dossier-veld is wanneer zichtbaar?)
- Bijlage B: Vertegenwoordigings-procedure
- Bijlage C: Voorbeeld-tekst voor patient over portaal-gebruik

**Gerelateerde documenten**
- [[ISMS-048 Behandelrelatie-procedure]]
- [[ISMS-049 EPD-logging-beleid]]
- [[ISMS-031 Procedure rechten van betrokkenen]]
- [[ISMS-042 Verwerkersovereenkomst]]
- [[NEN 7510-2 §5.18]]
- [[Wabvpz]]
