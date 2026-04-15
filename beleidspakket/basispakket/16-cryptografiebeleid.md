# Cryptografiebeleid

**ISO 27001:2022 — A.8.24**

| | |
|---|---|
| **Documentnummer** | ISMS-016 |
| **Versie** | 1.0 |
| **Classificatie** | Intern |
| **Eigenaar** | [Naam CISO / IT-beheer] |
| **Goedgekeurd door** | [Naam Directie] |
| **Datum goedkeuring** | [DD-MM-JJJJ] |
| **Volgende review** | [DD-MM-JJJJ] |

---

## 1. Doel

Dit beleid beschrijft wanneer en hoe cryptografie (versleuteling) wordt ingezet om de vertrouwelijkheid, integriteit en authenticiteit van informatie te beschermen.

## 2. Wanneer wordt encryptie toegepast

| Situatie | Encryptie vereist | Minimale standaard |
|---|---|---|
| **Data in transit** — e-mail met vertrouwelijke bijlagen | Ja | TLS 1.2+ / S/MIME / PGP |
| **Data in transit** — webverkeer | Ja | HTTPS (TLS 1.2+) |
| **Data in transit** — VPN | Ja | IPSec of WireGuard |
| **Data at rest** — laptops en werkstations | Ja | BitLocker (Windows) / FileVault (Mac) |
| **Data at rest** — servers en databases | Ja (vertrouwelijk+) | AES-256 |
| **Data at rest** — backups | Ja | AES-256 |
| **Data at rest** — mobiele apparaten | Ja | Native device encryption |
| **Data at rest** — USB / externe media | Ja (vertrouwelijk+) | BitLocker To Go / VeraCrypt |
| **Data at rest** — cloud-opslag | Ja | Provider-side encryption + eventueel client-side |
| **Wachtwoorden** | Ja | Bcrypt / Argon2 (hashing, niet encryptie) |

## 3. Cryptografische standaarden

| Toepassing | Minimale standaard | Aanbevolen |
|---|---|---|
| Symmetrische encryptie | AES-128 | AES-256 |
| Asymmetrische encryptie | RSA-2048 | RSA-4096 of ECC P-256+ |
| Hashfuncties | SHA-256 | SHA-384 / SHA-512 |
| TLS-versie | TLS 1.2 | TLS 1.3 |
| Wachtwoord-hashing | Bcrypt (cost 12+) | Argon2id |
| Digitale handtekeningen | RSA-2048 + SHA-256 | ECDSA P-256 + SHA-256 |

**Verboden algoritmes:** MD5, SHA-1, DES, 3DES, RC4, TLS 1.0/1.1, SSL.

## 4. Sleutelbeheer

### 4.1 Generatie
- Cryptografische sleutels worden gegenereerd met een cryptografisch veilige random number generator (CSPRNG)
- Sleutellengtes voldoen aan de minimale standaarden in sectie 3

### 4.2 Opslag
- Privésleutels worden opgeslagen in een beveiligd sleutelmanagementsysteem (HSM, key vault, of wachtwoordkluis)
- Sleutels worden nooit opgeslagen in broncode, configuratiebestanden of e-mails
- Toegang tot sleutels is beperkt tot geautoriseerd personeel

### 4.3 Rotatie
| Sleuteltype | Rotatiefrequentie |
|---|---|
| TLS-certificaten | Jaarlijks (of bij verlopen) |
| Encryptiesleutels (data at rest) | Jaarlijks |
| API-sleutels en tokens | Bij vermoeden van compromittatie, anders jaarlijks |
| SSH-sleutels | Jaarlijks |

### 4.4 Intrekking en vernietiging
- Gecompromitteerde sleutels worden onmiddellijk ingetrokken
- Verlopen of vervangen sleutels worden veilig vernietigd
- Certificaatintrekking geschiedt via CRL of OCSP

## 5. Verantwoordelijkheden

| Rol | Verantwoordelijkheid |
|---|---|
| IT-beheer | Implementatie en beheer van encryptie-oplossingen, sleutelbeheer |
| CISO | Beleidseigenaar, toezicht op naleving, evaluatie van cryptografische standaarden |
| Ontwikkelaars | Toepassen van goedgekeurde cryptografische bibliotheken, geen eigen implementaties |
| Alle medewerkers | Activeren van device-encryptie, gebruik van beveiligde kanalen |

## 6. Versiebeheer

| Versie | Datum | Wijziging | Auteur |
|---|---|---|---|
| 1.0 | [DD-MM-JJJJ] | Initiële versie | [Naam] |
