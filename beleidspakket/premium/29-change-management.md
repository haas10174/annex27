# Change Management Procedure

**ISO 27001:2022 — A.8.32**

| | |
|---|---|
| **Documentnummer** | ISMS-029 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam IT-beheer / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Deze procedure waarborgt dat wijzigingen aan informatiesystemen, infrastructuur en configuraties gecontroleerd worden doorgevoerd om risico's voor beschikbaarheid, integriteit en vertrouwelijkheid te minimaliseren.

## 2. Scope

- Wijzigingen aan servers, netwerkapparatuur en infrastructuur
- Software-installaties, -updates en -upgrades
- Configuratiewijzigingen aan beveiligingssystemen (firewall, EDR, IAM)
- Wijzigingen aan cloudomgevingen
- Database-aanpassingen
- Wijzigingen aan ISMS-gerelateerde processen

**Buiten scope:** Standaard patches binnen het reguliere patchproces (ISMS-017), tenzij het een major upgrade betreft.

## 3. Classificatie van wijzigingen

| Type | Beschrijving | Goedkeuring door | Doorlooptijd |
|---|---|---|---|
| **Standaard** | Routine, laag risico, eerder succesvol uitgevoerd (bijv. gebruikersaccount aanmaken) | IT-beheer | Zelfde dag |
| **Normaal** | Geplande wijziging met beperkt risico | CISO of IT-manager | Minimaal 3 werkdagen |
| **Significant** | Grote impact, veel systemen of gebruikers betrokken | CISO + Directie | Minimaal 5 werkdagen |
| **Nood** | Onmiddellijke actie vereist om een incident of kritieke kwetsbaarheid op te lossen | CISO (achteraf bevestiging directie) | Onmiddellijk |

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 440" width="100%" style="max-width:760px;display:block;margin:16pt auto;">
  <defs>
    <marker id="arrChg" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#94A3B8"/>
    </marker>
  </defs>
  <rect x="280" y="10" width="200" height="54" rx="10" fill="#0F172A"/>
  <text x="380" y="34" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Change Request</text>
  <text x="380" y="52" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="10">reden · risico · rollback</text>
  <polygon points="380,80 460,130 380,180 300,130" fill="#0D9488"/>
  <text x="380" y="128" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Classificatie</text>
  <text x="380" y="144" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="9">impact · urgentie</text>
  <line x1="380" y1="64" x2="380" y2="78" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <line x1="300" y1="130" x2="180" y2="130" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <text x="240" y="124" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9" font-style="italic">Laag risico</text>
  <rect x="30" y="200" width="150" height="80" rx="8" fill="#ECFDF5" stroke="#10B981" stroke-width="1.5"/>
  <text x="105" y="225" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">STANDAARD</text>
  <text x="105" y="243" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="9">Routine · goedgekeurd</text>
  <text x="105" y="257" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="9">template</text>
  <text x="105" y="273" text-anchor="middle" fill="#10B981" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">IT-beheer · zelfde dag</text>
  <line x1="360" y1="180" x2="290" y2="200" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <rect x="210" y="200" width="150" height="80" rx="8" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="285" y="225" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">NORMAAL</text>
  <text x="285" y="243" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="9">Geplande wijziging</text>
  <text x="285" y="257" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="9">beperkt risico</text>
  <text x="285" y="273" text-anchor="middle" fill="#D97706" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">CISO · ≥3 dagen</text>
  <line x1="400" y1="180" x2="470" y2="200" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <rect x="400" y="200" width="150" height="80" rx="8" fill="#FED7AA" stroke="#EA580C" stroke-width="1.5"/>
  <text x="475" y="225" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">SIGNIFICANT</text>
  <text x="475" y="243" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="9">Grote impact · meerdere</text>
  <text x="475" y="257" text-anchor="middle" fill="#7C2D12" font-family="Inter, Helvetica, Arial" font-size="9">systemen</text>
  <text x="475" y="273" text-anchor="middle" fill="#EA580C" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">CISO + Directie · ≥5 dg</text>
  <line x1="460" y1="130" x2="580" y2="130" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <text x="520" y="124" text-anchor="middle" fill="#DC2626" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">INCIDENT</text>
  <rect x="580" y="200" width="150" height="80" rx="8" fill="#FECACA" stroke="#DC2626" stroke-width="1.5"/>
  <text x="655" y="225" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">NOOD</text>
  <text x="655" y="243" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="9">Onmiddellijke actie</text>
  <text x="655" y="257" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="9">bij CVE / incident</text>
  <text x="655" y="273" text-anchor="middle" fill="#DC2626" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">CISO · direct</text>
  <line x1="600" y1="130" x2="655" y2="200" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <line x1="105" y1="280" x2="105" y2="310" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="285" y1="280" x2="285" y2="310" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="475" y1="280" x2="475" y2="310" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="655" y1="280" x2="655" y2="310" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="105" y1="310" x2="655" y2="310" stroke="#94A3B8" stroke-width="1.5"/>
  <line x1="380" y1="310" x2="380" y2="340" stroke="#94A3B8" stroke-width="1.5" marker-end="url(#arrChg)"/>
  <rect x="260" y="344" width="240" height="54" rx="10" fill="#0D9488"/>
  <text x="380" y="370" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Uitvoering · verificatie · documentatie</text>
  <text x="380" y="388" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="9">Change log + rollback bij falen + post-implementation review</text>
  <text x="380" y="420" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">Nood-wijzigingen worden achteraf binnen 24u formeel gedocumenteerd</text>
</svg>

## 4. Change Management Proces

### 4.1 Normaal en significant

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | **Aanvraag:** Change request indienen met beschrijving, reden, risico-inschatting en rollback-plan | Aanvrager |
| 2 | **Beoordeling:** Impact- en risicoanalyse, afhankelijkheden identificeren | IT-beheer + CISO |
| 3 | **Goedkeuring:** Formele goedkeuring door bevoegde rol (zie sectie 3) | Goedkeurder |
| 4 | **Planning:** Datum, tijdstip, betrokkenen, communicatie naar gebruikers | IT-beheer |
| 5 | **Testen:** Wijziging testen op testomgeving (indien beschikbaar) | IT-beheer |
| 6 | **Uitvoering:** Wijziging doorvoeren, bij voorkeur buiten piekuren | IT-beheer |
| 7 | **Verificatie:** Controleren of de wijziging succesvol is en geen bijwerkingen heeft | IT-beheer |
| 8 | **Documentatie:** Vastleggen in het change log | IT-beheer |

### 4.2 Noodwijzigingen

| Stap | Actie |
|---|---|
| 1 | Mondelinge goedkeuring van CISO (of IT-manager bij afwezigheid) |
| 2 | Wijziging uitvoeren met minimaal 1 persoon als getuige |
| 3 | Achteraf: change request alsnog documenteren binnen 24 uur |
| 4 | Achteraf: formele goedkeuring door CISO/directie |
| 5 | Evaluatie: was de noodprocedure gerechtvaardigd? |

## 5. Change Request Formulier

| Veld | Invullen |
|---|---|
| **Change ID** | CHG-[JJJJ]-[NNN] |
| **Datum aanvraag** | [DD-MM-JJJJ] |
| **Aanvrager** | [Naam + functie] |
| **Type** | [Standaard / Normaal / Significant / Nood] |
| **Beschrijving** | [Wat wordt gewijzigd en waarom] |
| **Betrokken systemen** | [Lijst van systemen] |
| **Risico-inschatting** | [Laag / Midden / Hoog] |
| **Impact bij mislukking** | [Beschrijf] |
| **Rollback-plan** | [Hoe wordt de wijziging teruggedraaid als het misgaat] |
| **Geplande datum/tijd** | [DD-MM-JJJJ HH:MM] |
| **Geschatte downtime** | [Duur] |
| **Communicatie nodig** | [Ja/Nee — naar wie] |
| **Goedgekeurd door** | [Naam + datum] |
| **Uitgevoerd door** | [Naam + datum] |
| **Resultaat** | [Succesvol / Mislukt / Rollback uitgevoerd] |
| **Opmerkingen** | [Eventuele bijzonderheden] |

## 6. Change Log

| ID | Datum | Beschrijving | Type | Systemen | Risico | Uitgevoerd door | Goedgekeurd door | Resultaat |
|---|---|---|---|---|---|---|---|---|
| CHG-2026-001 | [Datum] | [Beschrijving] | [Type] | [Systemen] | [L/M/H] | [Naam] | [Naam] | [Succes/Mislukt] |

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
