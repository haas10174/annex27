# Risicobeoordeling & Behandelingsplan

**ISO 27001:2022 — Clause 6.1.2, 6.1.3, 8.2, 8.3**

| | |
|---|---|
| **Documentnummer** | ISMS-005 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit document beschrijft de methodiek die [Organisatienaam] hanteert voor het identificeren, beoordelen en behandelen van informatiebeveiligingsrisico's. Het bevat tevens het risicoregister en het risicobehandelingsplan.

## 2. Methodiek

### 2.1 Risicobeoordeling proces

```
Identificatie → Analyse → Evaluatie → Behandeling → Monitoring
```

1. **Identificatie:** Dreigingen, kwetsbaarheden en mogelijke gevolgen per informatie-asset
2. **Analyse:** Inschatting van waarschijnlijkheid en impact
3. **Evaluatie:** Vergelijking met acceptatiecriteria
4. **Behandeling:** Keuze uit behandelingsopties
5. **Monitoring:** Periodieke herbeoordeling

### 2.2 Waarschijnlijkheid

| Score | Niveau | Beschrijving |
|---|---|---|
| 1 | Zeer laag | Komt minder dan 1x per 5 jaar voor |
| 2 | Laag | Komt minder dan 1x per jaar voor |
| 3 | Midden | Komt 1-3x per jaar voor |
| 4 | Hoog | Komt maandelijks voor |
| 5 | Zeer hoog | Komt wekelijks of vaker voor |

### 2.3 Impact

| Score | Niveau | Vertrouwelijkheid | Integriteit | Beschikbaarheid |
|---|---|---|---|---|
| 1 | Verwaarloosbaar | Geen gevoelige data gelekt | Geen merkbare gevolgen | < 1 uur uitval |
| 2 | Laag | Beperkte interne data gelekt | Kleine fout, snel corrigeerbaar | 1-4 uur uitval |
| 3 | Midden | Persoonsgegevens of klantdata gelekt | Significant onjuiste data | 4-24 uur uitval |
| 4 | Hoog | Grote hoeveelheid gevoelige data gelekt | Verlies van data-integriteit | 1-7 dagen uitval |
| 5 | Zeer hoog | Massaal datalek met juridische gevolgen | Onomkeerbaar dataverlies | > 7 dagen uitval |

### 2.4 Risicomatrix

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" width="100%" style="max-width:640px;display:block;margin:16pt auto;">
  <text x="320" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Risicomatrix: Waarschijnlijkheid × Impact</text>
  <text x="320" y="470" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">IMPACT →</text>
  <text x="18" y="240" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" transform="rotate(-90 18 240)">← WAARSCHIJNLIJKHEID</text>
  <g transform="translate(60, 50)">
    <text x="0" y="30" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">5</text>
    <text x="0" y="110" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">4</text>
    <text x="0" y="190" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">3</text>
    <text x="0" y="270" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">2</text>
    <text x="0" y="350" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">1</text>
    <text x="40" y="400" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">1</text>
    <text x="124" y="400" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">2</text>
    <text x="208" y="400" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">3</text>
    <text x="292" y="400" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">4</text>
    <text x="376" y="400" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">5</text>
    <rect x="16" y="8" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="40" y="38" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">5 (M)</text>
    <rect x="100" y="8" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="124" y="38" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">10 (M)</text>
    <rect x="184" y="8" width="48" height="48" rx="4" fill="#FED7AA"/><text x="208" y="38" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">15 (H)</text>
    <rect x="268" y="8" width="48" height="48" rx="4" fill="#FED7AA"/><text x="292" y="38" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">20 (H)</text>
    <rect x="352" y="8" width="48" height="48" rx="4" fill="#FECACA"/><text x="376" y="38" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">25 (K)</text>
    <rect x="16" y="88" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="40" y="118" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">4 (L)</text>
    <rect x="100" y="88" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="124" y="118" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">8 (M)</text>
    <rect x="184" y="88" width="48" height="48" rx="4" fill="#FED7AA"/><text x="208" y="118" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">12 (H)</text>
    <rect x="268" y="88" width="48" height="48" rx="4" fill="#FED7AA"/><text x="292" y="118" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">16 (H)</text>
    <rect x="352" y="88" width="48" height="48" rx="4" fill="#FED7AA"/><text x="376" y="118" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">20 (H)</text>
    <rect x="16" y="168" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="40" y="198" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">3 (L)</text>
    <rect x="100" y="168" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="124" y="198" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">6 (M)</text>
    <rect x="184" y="168" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="208" y="198" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">9 (M)</text>
    <rect x="268" y="168" width="48" height="48" rx="4" fill="#FED7AA"/><text x="292" y="198" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">12 (H)</text>
    <rect x="352" y="168" width="48" height="48" rx="4" fill="#FED7AA"/><text x="376" y="198" text-anchor="middle" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">15 (H)</text>
    <rect x="16" y="248" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="40" y="278" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">2 (L)</text>
    <rect x="100" y="248" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="124" y="278" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">4 (L)</text>
    <rect x="184" y="248" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="208" y="278" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">6 (M)</text>
    <rect x="268" y="248" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="292" y="278" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">8 (M)</text>
    <rect x="352" y="248" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="376" y="278" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">10 (M)</text>
    <rect x="16" y="328" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="40" y="358" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">1 (L)</text>
    <rect x="100" y="328" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="124" y="358" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">2 (L)</text>
    <rect x="184" y="328" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="208" y="358" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">3 (L)</text>
    <rect x="268" y="328" width="48" height="48" rx="4" fill="#D1FAE5"/><text x="292" y="358" text-anchor="middle" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">4 (L)</text>
    <rect x="352" y="328" width="48" height="48" rx="4" fill="#FEF3C7"/><text x="376" y="358" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">5 (M)</text>
  </g>
  <g transform="translate(470, 60)">
    <rect x="0" y="0" width="16" height="16" rx="3" fill="#D1FAE5"/><text x="24" y="12" fill="#065F46" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">L — Laag (acceptabel)</text>
    <rect x="0" y="28" width="16" height="16" rx="3" fill="#FEF3C7"/><text x="24" y="40" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">M — Midden (overwegen)</text>
    <rect x="0" y="56" width="16" height="16" rx="3" fill="#FED7AA"/><text x="24" y="68" fill="#9A3412" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">H — Hoog (behandeling)</text>
    <rect x="0" y="84" width="16" height="16" rx="3" fill="#FECACA"/><text x="24" y="96" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">K — Kritiek (onmiddellijk)</text>
  </g>
</svg>

*Score = Waarschijnlijkheid × Impact · L = 1-4 · M = 5-10 · H = 11-19 · K = 20-25*

### 2.5 Risicobereidheid (Risk Appetite)

| Risiconiveau | Score | Behandeling |
|---|---|---|
| Laag (1-4) | Acceptabel | Geen aanvullende maatregelen vereist. Monitoring. |
| Midden (5-10) | Aandacht | Behandeling overwegen. Beslissing door CISO. |
| Hoog (11-16) | Behandeling vereist | Maatregelen verplicht. Goedkeuring CISO. |
| Kritiek (17-25) | Onmiddellijke actie | Escalatie naar directie. Onmiddellijke maatregelen. |

### 2.6 Behandelingsopties

| Optie | Beschrijving | Voorbeeld |
|---|---|---|
| **Mitigeren** | Maatregelen implementeren om waarschijnlijkheid of impact te verlagen | Implementatie MFA, encryptie |
| **Overdragen** | Risico overdragen aan een derde partij | Cyberverzekering, outsourcing |
| **Vermijden** | Activiteit die het risico veroorzaakt stopzetten | Dienst uitfaseren |
| **Accepteren** | Risico bewust accepteren (binnen risk appetite) | Directie tekent af |

## 3. Risicoregister

| ID | Asset / Proces | Dreiging | Kwetsbaarheid | W | I | Score | Niveau | Behandeling | Maatregel | Eigenaar | Deadline | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| R-001 | [Asset] | [Dreiging] | [Kwetsbaarheid] | [1-5] | [1-5] | [WxI] | [L/M/H/K] | [Mitigeren/Overdragen/Vermijden/Accepteren] | [Beschrijving maatregel] | [Naam] | [Datum] | [Open/In behandeling/Afgerond] |
| R-002 | | | | | | | | | | | | |
| R-003 | | | | | | | | | | | | |

**Voorbeelden ter inspiratie:**

| ID | Asset / Proces | Dreiging | Kwetsbaarheid | W | I | Score | Niveau | Behandeling | Maatregel |
|---|---|---|---|---|---|---|---|---|---|
| R-001 | E-mailsysteem | Phishing | Onvoldoende bewustwording | 4 | 3 | 12 | H | Mitigeren | Awareness training + e-mailfiltering |
| R-002 | Klantdatabase | Ransomware | Ontbrekende offline backups | 3 | 5 | 15 | H | Mitigeren | Offline backup + incident response |
| R-003 | Werkstations | Diefstal | Geen schijfversleuteling | 2 | 4 | 8 | M | Mitigeren | BitLocker/FileVault activeren |
| R-004 | Cloud-omgeving | Ongeautoriseerde toegang | Geen MFA | 3 | 4 | 12 | H | Mitigeren | MFA verplichten |
| R-005 | Bedrijfscontinuïteit | Langdurige uitval | Geen getest BCP | 2 | 5 | 10 | M | Mitigeren | BCP opstellen en testen |

## 4. Frequentie

| Activiteit | Frequentie |
|---|---|
| Volledige risicobeoordeling | Minimaal jaarlijks |
| Herbeoordeling na incident | Binnen 2 weken na significant incident |
| Herbeoordeling na wijziging | Bij significante wijzigingen in scope, technologie of organisatie |
| Monitoring restrisico's | Kwartaallijks |
| Rapportage aan directie | Bij managementreview (minimaal jaarlijks) |

## 5. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
