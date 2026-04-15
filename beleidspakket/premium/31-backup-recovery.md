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
