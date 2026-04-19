# Netwerk- & Communicatiebeveiligingsbeleid

**ISO 27001:2022 — A.8.20, A.8.21, A.8.22**

| | |
|---|---|
| **Documentnummer** | ISMS-032 |
| **Versie** | 1.0 |
| **Classificatie** | Vertrouwelijk |
| **Eigenaar** | [Naam IT-beheer / CISO] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft de maatregelen voor het beveiligen van het netwerk, netwerkdiensten en de communicatie-infrastructuur van [Organisatienaam].

## 2. Netwerkarchitectuur

### 2.1 Netwerksegmentatie (A.8.22)

Het netwerk is onderverdeeld in de volgende zones:

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 380" width="100%" style="max-width:760px;display:block;margin:16pt auto;">
  <text x="380" y="22" text-anchor="middle" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="13" font-weight="700">Netwerkzones — segmentatie en toegangsbeperkingen</text>
  <text x="90" y="52" text-anchor="middle" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10" font-weight="600">INTERNET</text>
  <circle cx="90" cy="100" r="30" fill="none" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="90" y="106" text-anchor="middle" fill="#94A3B8" font-family="Inter, Helvetica, Arial" font-size="10">untrusted</text>
  <line x1="120" y1="100" x2="200" y2="100" stroke="#DC2626" stroke-width="2"/>
  <text x="160" y="94" text-anchor="middle" fill="#DC2626" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">Edge FW</text>
  <rect x="210" y="70" width="150" height="60" rx="10" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>
  <text x="285" y="92" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">DMZ</text>
  <text x="285" y="108" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="9">Webserver · mail-gateway</text>
  <text x="285" y="122" text-anchor="middle" fill="#78350F" font-family="Inter, Helvetica, Arial" font-size="9">reverse proxy</text>
  <line x1="360" y1="100" x2="430" y2="100" stroke="#DC2626" stroke-width="2"/>
  <text x="395" y="94" text-anchor="middle" fill="#DC2626" font-family="Inter, Helvetica, Arial" font-size="9" font-weight="700">Inner FW</text>
  <rect x="440" y="40" width="150" height="60" rx="10" fill="#E0F2FE" stroke="#0EA5E9" stroke-width="1.5"/>
  <text x="515" y="62" text-anchor="middle" fill="#075985" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Intern netwerk</text>
  <text x="515" y="78" text-anchor="middle" fill="#075985" font-family="Inter, Helvetica, Arial" font-size="9">Werkstations · printers</text>
  <text x="515" y="92" text-anchor="middle" fill="#075985" font-family="Inter, Helvetica, Arial" font-size="9">VoIP · MDM-managed</text>
  <rect x="440" y="110" width="150" height="60" rx="10" fill="#F0FDF4" stroke="#16A34A" stroke-width="1.5"/>
  <text x="515" y="132" text-anchor="middle" fill="#14532D" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Server-netwerk</text>
  <text x="515" y="148" text-anchor="middle" fill="#14532D" font-family="Inter, Helvetica, Arial" font-size="9">Applicatieservers</text>
  <text x="515" y="162" text-anchor="middle" fill="#14532D" font-family="Inter, Helvetica, Arial" font-size="9">databases · fileservers</text>
  <rect x="610" y="75" width="120" height="60" rx="10" fill="#FEE2E2" stroke="#DC2626" stroke-width="1.5"/>
  <text x="670" y="97" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Beheer-net</text>
  <text x="670" y="112" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="9">jump-host</text>
  <text x="670" y="124" text-anchor="middle" fill="#7F1D1D" font-family="Inter, Helvetica, Arial" font-size="9">PAM · bastion</text>
  <line x1="590" y1="115" x2="610" y2="105" stroke="#94A3B8" stroke-width="1.5"/>
  <rect x="210" y="170" width="150" height="60" rx="10" fill="#F3E8FF" stroke="#9333EA" stroke-width="1.5"/>
  <text x="285" y="192" text-anchor="middle" fill="#581C87" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">Gastnetwerk</text>
  <text x="285" y="208" text-anchor="middle" fill="#581C87" font-family="Inter, Helvetica, Arial" font-size="9">Bezoekers · privé-apparaten</text>
  <text x="285" y="222" text-anchor="middle" fill="#581C87" font-family="Inter, Helvetica, Arial" font-size="9">alleen internet-toegang</text>
  <line x1="285" y1="130" x2="285" y2="170" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="320" y="155" fill="#94A3B8" font-family="Inter, Helvetica, Arial" font-size="8" font-style="italic">VLAN</text>
  <rect x="440" y="200" width="150" height="60" rx="10" fill="#F5F5F4" stroke="#78716C" stroke-width="1.5"/>
  <text x="515" y="222" text-anchor="middle" fill="#44403C" font-family="Inter, Helvetica, Arial" font-size="12" font-weight="700">IoT / OT</text>
  <text x="515" y="238" text-anchor="middle" fill="#44403C" font-family="Inter, Helvetica, Arial" font-size="9">Camera's · sensoren</text>
  <text x="515" y="252" text-anchor="middle" fill="#44403C" font-family="Inter, Helvetica, Arial" font-size="9">printers · gebouwbeheer</text>
  <line x1="515" y1="170" x2="515" y2="200" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 3"/>
  <text x="550" y="188" fill="#94A3B8" font-family="Inter, Helvetica, Arial" font-size="8" font-style="italic">geïsoleerd</text>
  <g transform="translate(40, 290)">
    <text x="0" y="0" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Default-deny firewall-beleid</text>
    <text x="0" y="18" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">Alle verkeer geblokkeerd tenzij expliciet toegestaan. Regels documentbased (elke regel heeft owner + reden + review-datum).</text>
    <text x="0" y="40" fill="#0F172A" font-family="Inter, Helvetica, Arial" font-size="11" font-weight="700">Monitoring per zone</text>
    <text x="0" y="58" fill="#64748B" font-family="Inter, Helvetica, Arial" font-size="10">Logs van firewalls centraal verzameld (SIEM). Anomalie-alerts bij verkeer tussen zones dat niet in baseline zit.</text>
  </g>
</svg>

| Zone | Beschrijving | Voorbeelden | Toegangsbeperking |
|---|---|---|---|
| **DMZ** | Publiek toegankelijke diensten | Webserver, e-mailgateway | Sterk beperkt; geen directe toegang tot intern netwerk |
| **Intern netwerk** | Kantoorapparatuur en werkstations | Werkstations, printers, telefonie | Alleen bedrijfsapparaten |
| **Servernetwerk** | Interne servers en databases | Applicatieservers, fileservers, databases | Alleen beheerders + applicatieverkeer |
| **Beheernetwerk** | Netwerkbeheer en systeembeheer | Beheerinterfaces, jump servers | Alleen IT-beheerders met privileged accounts |
| **Gastnetwerk** | Bezoekers en externe apparaten | Gastlaptops, privételefoons | Alleen internettoegang, geen toegang tot intern netwerk |
| **IoT/OT netwerk** | Apparaten zonder volledige beveiliging | Printers, camera's, sensoren | Geïsoleerd van overige netwerken |

### 2.2 Firewall-regels

| Principe | Beschrijving |
|---|---|
| Default deny | Alle verkeer is geblokkeerd tenzij expliciet toegestaan |
| Minst nodige toegang | Alleen noodzakelijke poorten, protocollen en IP-adressen openstellen |
| Geen any-any regels | Geen "allow all" regels in productie |
| Documentatie | Elke firewallregel is gedocumenteerd met reden, eigenaar en reviewdatum |
| Review | Firewallregels worden halfjaarlijks gereviewed; ongebruikte regels worden verwijderd |

## 3. Netwerkbeveiliging (A.8.20)

### 3.1 Technische maatregelen

| Maatregel | Status | Beschrijving |
|---|---|---|
| Firewall (next-gen) | [Actief/Gepland] | Inspectie van netwerkverkeer, IDS/IPS-functionaliteit |
| VPN | [Actief/Gepland] | Versleutelde verbinding voor remote access (IPSec/WireGuard) |
| DNS-filtering | [Actief/Gepland] | Blokkering van bekende malware-domeinen en phishing-sites |
| NAC (Network Access Control) | [Actief/Gepland] | Alleen geautoriseerde apparaten krijgen netwerktoegang |
| Wi-Fi beveiliging | [Actief/Gepland] | WPA3 (of WPA2-Enterprise) met sterke wachtwoorden |
| IDS/IPS | [Actief/Gepland] | Detectie en preventie van inbraakpogingen |
| E-mailgateway | [Actief/Gepland] | Spam-, phishing- en malwarefiltering op inkomende e-mail |

### 3.2 Draadloos netwerk

| Eis | Beschrijving |
|---|---|
| Encryptie | WPA3 of WPA2-Enterprise; WEP en open netwerken zijn verboden |
| Scheiding | Gastnetwerk volledig gescheiden van bedrijfsnetwerk (eigen VLAN, eigen internetuitgang) |
| SSID | Bedrijfsnetwerk-SSID niet uitzenden (hidden) indien mogelijk |
| Authenticatie | Bedrijfsnetwerk: 802.1X of WPA2-Enterprise met individuele credentials |
| Gastnetwerk | Eigen wachtwoord dat periodiek wordt gewijzigd, geen toegang tot interne bronnen |

## 4. Beveiliging van netwerkdiensten (A.8.21)

| Dienst | Beveiligingsmaatregel |
|---|---|
| E-mail | SPF, DKIM, DMARC geconfigureerd; TLS verplicht |
| Webservices | HTTPS verplicht, HSTS ingeschakeld, WAF actief |
| Bestandsoverdracht | SFTP of FTPS; FTP is verboden |
| Remote access | VPN verplicht, MFA verplicht, sessie-time-out |
| DNS | DNSSEC ingeschakeld; DNS-over-HTTPS of DNS-over-TLS |
| Cloud-diensten | Conform Cloud Security Beleid (ISMS-026) |

## 5. Monitoring

| Wat wordt gemonitord | Methode | Alert bij |
|---|---|---|
| Ongebruikelijke verkeerspatronen | Firewall / IDS | Volume-anomalieën, onbekende protocollen |
| Verbindingen naar bekende malware-C2 servers | DNS-filtering / threat intel feeds | Elke detectie |
| Brute-force pogingen op netwerkdiensten | IDS/IPS | >10 pogingen in 5 minuten |
| Ongeautoriseerde apparaten op het netwerk | NAC / DHCP-monitoring | Elk onbekend MAC-adres |
| VPN-verbindingen vanuit ongebruikelijke locaties | VPN-logging | Verbinding buiten NL/BE zonder voorafgaande melding |

## 6. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| IT-beheer | Implementatie, configuratie en beheer van netwerkbeveiliging |
| CISO | Toezicht, beleid, review van firewallregels en monitoring |
| Externe netwerkbeheerder (indien van toepassing) | Uitvoering conform SLA en beveiligingseisen |

## 7. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
