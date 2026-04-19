# Backup & Recovery Beleid

**ISO 27001:2022 — A.8.13**

| | |
|---|---|
| **Documentnummer** | ISMS-031 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam IT-beheer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid waarborgt dat bedrijfskritieke informatie en systemen tijdig kunnen worden hersteld na dataverlies, corruptie, ransomware of andere calamiteiten.

## 2. Backupschema

### 2.1 Overzicht

| Systeem / Data | Backup-type | Frequentie | Retentie | Locatie | RPO |
|---|---|---|---|---|---|
| [E-mail / Microsoft 365] | Cloud-native + aanvullende backup | Dagelijks | 90 dagen | [Cloud backup-provider] | 24 uur |
| [Klantdatabase / CRM] | Volledige + incrementeel | Dagelijks volledig, uurlijks incrementeel | 30 dagen dagelijks, 12 maanden maandelijks | [Cloud + off-site] | 1 uur |
| [Fileserver / SharePoint] | Incrementeel | Continu / uurlijks | 30 dagen | [Cloud] | 1 uur |
| [ERP / boekhouding] | Volledige | Dagelijks | 90 dagen dagelijks, 7 jaar jaarlijks | [Cloud + off-site] | 24 uur |
| [Servers / configuraties] | Image + configuratie-export | Wekelijks volledig, dagelijks config | 30 dagen | [Cloud + off-site] | 24 uur |
| [Databases] | Volledige + transactielog | Dagelijks volledig, 15-min transactielogs | 30 dagen | [Cloud] | 15 minuten |

### 2.2 Backup-typen

| Type | Beschrijving |
|---|---|
| **Volledig** | Complete kopie van alle data |
| **Incrementeel** | Alleen data die is gewijzigd sinds de laatste backup (volledig of incrementeel) |
| **Differentieel** | Alleen data die is gewijzigd sinds de laatste volledige backup |
| **Transactielog** | Continue registratie van databasetransacties voor point-in-time recovery |

## 3. Beveiligingseisen

| Eis | Beschrijving |
|---|---|
| **Encryptie** | Backups zijn versleuteld, zowel in transit (TLS 1.2+) als at rest (AES-256) |
| **Toegang** | Alleen IT-beheer en CISO hebben toegang tot backup-systemen en -data |
| **Scheiding** | Backups worden opgeslagen op een andere locatie dan de productieomgeving |
| **Immutability** | Kritieke backups zijn onwijzigbaar (immutable) voor minimaal [7/14/30] dagen — bescherming tegen ransomware |
| **Monitoring** | Backup-processen worden gemonitord; mislukte backups genereren een alert |
| **Air-gap** | Minimaal één kopie is offline of logisch gescheiden van het netwerk (air-gapped) |

## 4. 3-2-1 Regel

[Organisatienaam] hanteert de 3-2-1 backup-strategie:

- **3** kopieën van data (productie + 2 backups)
- **2** verschillende opslagmedia of -locaties
- **1** kopie off-site of in de cloud

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" width="100%" style="max-width:720px;display:block;margin:16pt auto;">
  <defs>
    <marker id="arrBkp" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="#0D9488"/>
    </marker>
  </defs>
  <rect x="40" y="60" width="160" height="120" rx="12" fill="#0D9488"/>
  <text x="120" y="88" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">PRODUCTIE</text>
  <text x="120" y="110" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="11">Live data</text>
  <text x="120" y="148" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="28" font-weight="800">1</text>
  <text x="120" y="170" text-anchor="middle" fill="#CCFBF1" font-family="Inter, Helvetica, Arial" font-size="9">Origineel</text>
  <line x1="200" y1="120" x2="260" y2="120" stroke="#0D9488" stroke-width="2" marker-end="url(#arrBkp)"/>
  <rect x="260" y="30" width="180" height="100" rx="12" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
  <text x="350" y="58" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">BACKUP 1</text>
  <text x="350" y="78" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">Lokaal/on-site</text>
  <text x="350" y="108" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="24" font-weight="800">2</text>
  <text x="350" y="124" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">Snel herstel</text>
  <rect x="260" y="140" width="180" height="100" rx="12" fill="#FFFFFF" stroke="#0D9488" stroke-width="2"/>
  <text x="350" y="168" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">BACKUP 2</text>
  <text x="350" y="188" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">Immutable / air-gap</text>
  <text x="350" y="218" text-anchor="middle" fill="#0D9488" font-family="Inter, Helvetica, Arial" font-size="24" font-weight="800">3</text>
  <text x="350" y="234" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="9">Ransomware-proof</text>
  <line x1="440" y1="180" x2="500" y2="180" stroke="#0D9488" stroke-width="2" marker-end="url(#arrBkp)"/>
  <rect x="500" y="120" width="180" height="120" rx="12" fill="#0F172A"/>
  <text x="590" y="150" text-anchor="middle" fill="#FFFFFF" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">OFF-SITE</text>
  <text x="590" y="170" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="10">Cloud / andere locatie</text>
  <text x="590" y="205" text-anchor="middle" fill="#14B8A6" font-family="Inter, Helvetica, Arial" font-size="24" font-weight="800">1</text>
  <text x="590" y="222" text-anchor="middle" fill="#CBD5E1" font-family="Inter, Helvetica, Arial" font-size="9">Disaster recovery</text>
  <text x="360" y="288" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="15" font-weight="800">3 kopieën · 2 media · 1 off-site</text>
  <text x="360" y="308" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">Herstel-test minimaal jaarlijks · RTO en RPO gedocumenteerd per systeem</text>
</svg>

## 5. Herstelproces

### 5.1 Herstelprocedure

| Stap | Actie | Verantwoordelijke |
|---|---|---|
| 1 | Vaststellen welke data/systemen moeten worden hersteld | CISO + IT-beheer |
| 2 | Bepalen van het herstelpunt (welke backup, welk tijdstip) | IT-beheer |
| 3 | Herstel uitvoeren op testomgeving (indien tijd dit toelaat) | IT-beheer |
| 4 | Verificatie: data-integriteit controleren na herstel | IT-beheer |
| 5 | Herstel naar productie (indien test succesvol) | IT-beheer |
| 6 | Gebruikers informeren | CISO |
| 7 | Documentatie: vastleggen wat is hersteld, van welk punt, en eventueel dataverlies | IT-beheer |

### 5.2 Hersteltijden (RTO)

| Prioriteit | Systemen | RTO |
|---|---|---|
| Kritiek | E-mail, kernbedrijfsapplicatie, authenticatie | < 4 uur |
| Hoog | CRM, fileserver, boekhouding | < 8 uur |
| Midden | Secundaire applicaties, projecttools | < 24 uur |
| Laag | Archieven, historische data | < 72 uur |

## 6. Testen

| Test | Frequentie | Beschrijving |
|---|---|---|
| Backup-verificatie | Dagelijks (geautomatiseerd) | Controleer of backup succesvol is afgerond en de juiste grootte heeft |
| Bestandsherstel-test | Maandelijks | Willekeurig bestand terughalen en integriteit controleren |
| Volledig systeemherstel-test | Halfjaarlijks | Volledig systeem herstellen op testomgeving, RTO meten |
| Ransomware-scenario test | Jaarlijks | Simulatie: productie onbeschikbaar, herstel vanuit immutable backup |

### 6.1 Testregistratie

| Datum | Testtype | Systeem | Backup-datum hersteld | RTO behaald | Data-integriteit OK | Uitgevoerd door | Opmerkingen |
|---|---|---|---|---|---|---|---|
| [Datum] | [Type] | [Systeem] | [Datum] | [Ja/Nee] | [Ja/Nee] | [Naam] | |

## 7. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| IT-beheer | Configuratie, uitvoering, monitoring en testen van backups |
| CISO | Toezicht op naleving, review testresultaten, beleidseigenaar |
| Directie | Goedkeuren van backup-strategie en budget |

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
