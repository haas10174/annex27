# Asset Register & Inventaris

**ISO 27001:2022 — A.5.9**

| | |
|---|---|
| **Documentnummer** | ISMS-008 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam CISO / Verantwoordelijke] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit document beschrijft het proces voor het identificeren, registreren en beheren van informatie-assets binnen [Organisatienaam]. Een actueel assetregister is de basis voor risicobeoordeling en het toekennen van beveiligingsmaatregelen.

## 2. Definities

| Term | Definitie |
|---|---|
| **Informatie-asset** | Alles wat waarde heeft voor de organisatie in relatie tot informatiebeveiliging |
| **Asset-eigenaar** | De persoon die verantwoordelijk is voor de bescherming en het correcte gebruik van het asset |
| **Classificatie** | Het beveiligingsniveau dat aan het asset is toegekend |

## 3. Assetcategorieën

| Categorie | Voorbeelden |
|---|---|
| **Informatie** | Klantgegevens, financiële data, contracten, intellectueel eigendom, personeelsdossiers |
| **Software** | Bedrijfsapplicaties, besturingssystemen, SaaS-diensten, ontwikkeltools |
| **Hardware** | Servers, werkstations, laptops, mobiele apparaten, netwerkapparatuur |
| **Diensten** | Cloud-diensten, internetverbinding, hosting, e-maildiensten |
| **Mensen** | Medewerkers met specifieke kennis of bevoegdheden |
| **Fysieke locaties** | Kantoren, serverruimtes, archiefruimtes |

## 4. Registratieproces

### 4.1 Identificatie
- Bij ingebruikname van nieuwe systemen, applicaties of diensten wordt het asset geregistreerd
- Jaarlijks wordt een volledige inventarisatie uitgevoerd
- Leidinggevenden zijn verantwoordelijk voor het melden van nieuwe assets binnen hun afdeling

### 4.2 Registratie
Elk asset wordt vastgelegd met de volgende gegevens:

| Veld | Beschrijving |
|---|---|
| Asset-ID | Unieke identificatie |
| Naam | Beschrijvende naam |
| Categorie | Informatie / Software / Hardware / Dienst / Fysiek |
| Beschrijving | Korte beschrijving van het asset en doel |
| Eigenaar | Verantwoordelijke persoon of afdeling |
| Locatie | Fysieke of logische locatie |
| Classificatie | Openbaar / Intern / Vertrouwelijk / Geheim |
| Criticiteit | Laag / Midden / Hoog / Kritiek |
| Leverancier | Externe partij (indien van toepassing) |
| Datum registratie | Datum waarop het asset is geregistreerd |
| Status | Actief / In onderhoud / Uitgefaseerd |

## 5. Asset Register

### 5.1 Informatie-assets

| ID | Naam | Beschrijving | Eigenaar | Classificatie | Criticiteit | Locatie | Status |
|---|---|---|---|---|---|---|---|
| I-001 | [Klantdatabase] | [Persoonsgegevens en contracten van klanten] | [Naam] | Vertrouwelijk | Hoog | [CRM / Cloud] | Actief |
| I-002 | [Financiële administratie] | [Boekhouding, facturen, bankgegevens] | [Naam] | Vertrouwelijk | Hoog | [Systeem] | Actief |
| I-003 | [Personeelsdossiers] | [Arbeidsovereenkomsten, beoordelingen, salarissen] | [HR] | Geheim | Hoog | [HR-systeem] | Actief |
| I-004 | | | | | | | |

### 5.2 Software-assets

| ID | Naam | Type | Versie | Leverancier | Eigenaar | Classificatie | Criticiteit | Licentie | Status |
|---|---|---|---|---|---|---|---|---|---|
| S-001 | [Microsoft 365] | SaaS | [Versie] | Microsoft | [IT] | Intern | Kritiek | [Type] | Actief |
| S-002 | [CRM-systeem] | SaaS | [Versie] | [Leverancier] | [Naam] | Vertrouwelijk | Hoog | [Type] | Actief |
| S-003 | | | | | | | | | |

### 5.3 Hardware-assets

| ID | Naam | Type | Serienummer | Locatie | Gebruiker | Eigenaar | Criticiteit | Status |
|---|---|---|---|---|---|---|---|---|
| H-001 | [Server-01] | Server | [SN] | [Serverruimte / Cloud] | N.v.t. | [IT] | Kritiek | Actief |
| H-002 | [Laptop-RH01] | Laptop | [SN] | [Mobiel] | [Naam] | [IT] | Midden | Actief |
| H-003 | | | | | | | | |

### 5.4 Diensten

| ID | Naam | Type | Leverancier | SLA | Eigenaar | Criticiteit | Contract tot | Status |
|---|---|---|---|---|---|---|---|---|
| D-001 | [AWS / Azure] | Cloud hosting | [Provider] | [99.9%] | [IT] | Kritiek | [Datum] | Actief |
| D-002 | [Internetverbinding] | Connectiviteit | [ISP] | [SLA] | [IT] | Kritiek | [Datum] | Actief |
| D-003 | | | | | | | | |

## 6. Eigenaarschap

- Elk asset heeft een aangewezen eigenaar die verantwoordelijk is voor:
  - Het classificeren van het asset
  - Het waarborgen van passende beveiligingsmaatregelen
  - Het melden van wijzigingen aan het CISO
  - Het medewerken aan risicobeoordeling voor het asset
- Bij vertrek van een eigenaar wordt het eigenaarschap overgedragen en geregistreerd

## 7. Actualisering

| Activiteit | Frequentie |
|---|---|
| Volledige inventarisatie | Jaarlijks |
| Controle op wijzigingen | Kwartaallijks |
| Registratie nieuwe assets | Bij ingebruikname |
| Uitfasering verouderde assets | Bij buitengebruikstelling |

## 8. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
