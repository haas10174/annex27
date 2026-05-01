"""Generator voor sector-landingpages — een keer draaien om saas/it/overheid/bouw aan te maken."""
import json, os, html

BASE = os.path.dirname(os.path.abspath(__file__))

# Sectorspecifieke data — content gevalideerd door Lead Auditor (Raoul)
SECTORS = {
    "saas": {
        "slug": "saas",
        "name": "SaaS",
        "long_name": "SaaS & Cloud",
        "title": "ISO 27001 + SOC 2 Gap-analyse voor SaaS-bedrijven | Annex27",
        "meta_description": "ISO 27001 én SOC 2 in één gap-analyse voor Nederlandse en Belgische SaaS. Multi-tenant isolatie, secure SDLC, customer-data audit. €795 incl. Lead Auditor review.",
        "keywords": "ISO 27001 SaaS, SOC 2 SaaS, ISO 27001 cloud, multi-tenant security, ISO 27017, ISO 27018, secure SDLC, vendor security review, ISO 27001 startup, SaaS compliance Nederland",
        "eyebrow": "SaaS-specifiek · ISO 27001 + SOC 2 + ISO 27017/27018",
        "h1_main": "Klanten vragen jullie ISO 27001-rapport.",
        "h1_accent": "En SOC 2. En een pentest. Eén traject.",
        "lead": "Begin met een gratis SaaS-quickscan in 5 minuten. Geen audit-met-cloudvraagje — vragen die multi-tenant isolatie, customer-data segregation, secret rotation, secure SDLC en third-party-vendor-risk's expliciet toetsen. Direct mapped op ISO 27001:2022 + ISO 27017 (cloud) + ISO 27018 (privacy in cloud) + SOC 2 Trust Service Criteria.",
        "card_eyebrow": "Volledige SaaS gap-analyse",
        "card_bullets": [
            "93 ISO 27002-controls + 14 SaaS-deltas (cloud, multi-tenant, secure SDLC)",
            "Cross-mapping ISO 27001 ↔ SOC 2 (CC1-CC9 + Availability/Confidentiality)",
            "Customer-data isolatie + tenant-boundary review",
            "CI/CD-pipeline security gates + secret-rotation procedure",
            "Vendor-risk-register (sub-processors, DPA's, BAA's)",
            "Persoonlijke review door Lead Auditor (DNV/IRCA)"
        ],
        "card_foot": "Marktconform: SaaS-compliance consultancy €15k–€40k. Voor B2B SaaS, FinTech, HR-tech, MarTech, DevTools, AI-SaaS, vertical SaaS.",
        "compare_miss_title": "Generieke ISO 27001-audit",
        "compare_miss": [
            "Multi-tenant: alleen \"datasegregatie aanwezig\", geen tenant-boundary-test",
            "SDLC: code-review als ja/nee, geen toetsing van CI/CD security gates",
            "Secrets: \"vault aanwezig\", geen rotatie-frequentie of break-glass-procedure",
            "Pentest: jaarlijks vinkje, geen koppeling aan release-cycle",
            "Sub-processors: lijst, geen risico-classificatie of SLA-monitoring",
            "Logging: aanwezig, geen retention/SIEM-correlatie voor security events",
            "Backup: bestaat, geen Recovery Time/Point Objective getest"
        ],
        "compare_cover_title": "Onze SaaS-gap-analyse (ISO + SOC 2 + ISO 27017/18)",
        "compare_cover": [
            "Tenant-isolation review met voorbeelden van data-leak-scenario's (§5.23/§8.20)",
            "Secure SDLC met CI/CD security-gates: SAST/DAST/SCA/IaC-scan (§8.25-§8.28)",
            "Secret management: rotatie ≤90 dagen, just-in-time admin, break-glass-log (§5.17/§8.5)",
            "Pentest gekoppeld aan release-frequentie + vulnerability SLA per CVSS-score (§8.8/§8.29)",
            "Sub-processor risk register met tier-classificatie + jaarlijkse evidence-review (§5.19-§5.23)",
            "Audit-logging: events gedefinieerd, retention ≥1jr, SIEM-correlatie (§8.15-§8.16)",
            "DR/BCP getest: RTO/RPO per service, jaarlijkse failover-oefening (§5.30/§8.13/§8.14)",
            "Customer-data deletion: contractuele 30-dagen garantie + cryptographic erasure (§5.34/§7.10)",
            "Cloud-shared-responsibility matrix (§5.23/§8.32) met per-control eigenaarschap"
        ],
        "cat_label": "De vragenset",
        "cat_h2": "Eerst de quickscan, dan de echte SaaS-toets",
        "cat_lead": "De gratis quickscan geeft een indicatie binnen 5 minuten. De volledige gap-analyse toetst alle 93 ISO 27002-controls plus 14 SaaS-specifieke deltas, met bewijsvoering per claim. Iedere vraag mappt op de ISO 27002:2022-control én ISO 27017/27018-paragraaf én SOC 2 TSC criterion — direct bruikbaar voor enterprise security questionnaires.",
        "cat_grid": [
            {"n": "1", "h": "Cloud governance", "p": "Cloud-shared-responsibility matrix (CSP vs jullie), data-residency, BCP-strategie en incident-coördinatie met cloud-leverancier."},
            {"n": "2", "h": "Identity &amp; Access", "p": "SSO/SAML/SCIM, MFA voor staff én customers, just-in-time admin, RBAC-rolmodel met least-privilege en jaarlijkse access-review."},
            {"n": "3", "h": "Customer-data isolation", "p": "Multi-tenant boundary review, tenant-aware encryption keys, anti-IDOR-checks, automated data-leakage tests in CI."},
            {"n": "4", "h": "Secure SDLC", "p": "Code review verplicht, SAST/DAST/SCA/IaC-scanning in CI, security-champions per team, vulnerability-SLA per CVSS-score."},
            {"n": "5", "h": "Vendor &amp; supply-chain", "p": "Sub-processor register, DPA + sub-processor-clause, jaarlijkse evidence-review (SOC 2/ISO 27001-rapporten van leveranciers)."},
            {"n": "6", "h": "Operations &amp; SRE", "p": "Logging + SIEM-correlatie, RTO/RPO per service, jaarlijkse DR-test, change-management gekoppeld aan release-cyclus."}
        ],
        "norms_intro": "Iedere bevinding verwijst naar de exacte ISO 27001/27002-control én ISO 27017 (cloud) of ISO 27018 (privacy) of SOC 2 Trust Service Criterion — direct bruikbaar voor enterprise security questionnaires.",
        "norms_pills": ["ISO/IEC 27001:2022", "ISO/IEC 27002:2022", "ISO/IEC 27017 (cloud)", "ISO/IEC 27018 (privacy in cloud)", "SOC 2 (TSC)", "AVG / GDPR", "NIS2 (digitale dienst)"],
        "audience_label": "Voor wie",
        "audience_h2": "Welke SaaS-bedrijven?",
        "audience_lead": "Ontworpen voor Nederlandse en Belgische B2B SaaS — startup tot scale-up. Voor Series-C+ kan dit traject de basis vormen voor SOC 2 Type II met externe attestation.",
        "audience_tiles": ["B2B SaaS", "FinTech / RegTech", "HR-tech", "MarTech", "DevTools", "AI / ML-SaaS", "Vertical SaaS", "DataOps"],
        "faq": [
            ("Wat is het verschil tussen deze gap-analyse en een SOC 2-audit?", "Onze gap-analyse is geen formele attestation — het is de voorbereiding. We scoren je tegen ISO 27001:2022 + SOC 2 Trust Service Criteria zodat je weet wat een externe auditor zou vinden. De officiële SOC 2 Type II attestation moet je daarna door een AICPA-licensed CPA-firm laten uitvoeren (€20k-€60k). Ons werk reduceert die scope en kosten dramatisch."),
            ("Voor welke SaaS-bedrijven is dit geschikt?", "B2B SaaS met enterprise-klanten die ISO 27001 of SOC 2 vragen, FinTech onder MiCA/DORA, HR-tech met persoonsgegevens-verwerking, AI-SaaS onder de EU AI Act, en alle SaaS die multi-tenant data verwerkt. Niet voor pure consumer-apps zonder enterprise-pijp."),
            ("Welke normen worden gedekt?", "ISO/IEC 27001:2022 (managementsysteem), ISO/IEC 27002:2022 (controls), ISO/IEC 27017 (cloud-specifiek), ISO/IEC 27018 (privacy-in-cloud), SOC 2 Trust Service Criteria (CC + A + C), AVG/GDPR, NIS2 voor digitale-dienst-aanbieders."),
            ("Wat krijg ik voor €795?", "De volledige SaaS-gap-analyse (93 + 14 vragen), een rapport met scores per ISO 27002:2022-categorie, ISO 27017/27018-mapping én SOC 2-criterion-mapping per bevinding, geprioriteerde remediatie-acties, een vendor-risk-register-template, en een persoonlijke review door gecertificeerd Lead Auditor (DNV/IRCA).")
        ],
        "audience_string": "B2B SaaS, FinTech, HR-tech, MarTech, DevTools, AI-SaaS, vertical SaaS",
        "service_description": "Volledige ISO 27001:2022 + ISO 27017 + ISO 27018 + SOC 2 gap-analyse op maat voor SaaS-bedrijven. 107 vragen waaronder 14 SaaS-specifieke (multi-tenant, secure SDLC, vendor-risk). Reviewed door gecertificeerd Lead Auditor.",
        # Hero accent palette
        "palette": {
            "bg": "#0F1117",          # deep slate
            "bg_warm": "#0F172A",
            "accent": "#8B5CF6",      # violet
            "accent_hover": "#7C3AED",
            "accent_light": "#EDE9FE",
            "coral": "#22D3EE",       # cyan accent
            "coral_hover": "#06B6D4",
            "coral_light": "#CFFAFE",
            "pine": "#0B1020",
            "text_primary_warm": "#F8FAFC",
            "text_secondary_warm": "#CBD5E1",
            "page_bg": "#FAFAFA",     # light section bg
            "page_text_primary": "#0F172A",
            "page_text_secondary": "#475569",
            "page_text_muted": "#94A3B8",
            "page_border": "#E5E7EB",
            "page_border_light": "#F1F5F9",
            "page_surface": "#FFFFFF",
            "page_warm": "#F1F5F9",
            "warning": "#D97706",
            "danger": "#B91C1C"
        }
    },
    "it": {
        "slug": "it",
        "name": "IT-dienstverlener / MSP",
        "long_name": "IT-dienstverleners & MSPs",
        "title": "ISO 27001 Gap-analyse voor IT-dienstverleners en MSP's | Annex27",
        "meta_description": "ISO 27001 voor MSP's en IT-bureaus: cross-tenant boundaries, privileged access, RMM/PSA-tooling. €795 incl. Lead Auditor review. Klanten vragen het — u levert het zonder consultancy-tarief.",
        "keywords": "ISO 27001 MSP, ISO 27001 IT-bureau, MSP security, RMM security, multi-tenant MSP, MSSP audit, ISO 27001 hosting, IT-dienstverlener compliance",
        "eyebrow": "Voor IT-bureaus, MSP's, MSSP's & hosting",
        "h1_main": "Uw klanten verwachten ISO 27001.",
        "h1_accent": "Wij leveren de audit waar zij gerust mee zijn.",
        "lead": "Begin met een gratis IT-quickscan. Geen ISO-audit met een vraagje over multi-tenant — een echte test op cross-tenant data-segregation, RMM/PSA-tooling-security, privileged access (PAM/JIT), endpoint-deployment-hygiene en supply-chain-risico's van EDR/MDR-leveranciers. Voor MSP's, MSSP's, ICT-dienstverleners, hosting-partijen en software-houses.",
        "card_eyebrow": "Volledige IT-/MSP gap-analyse",
        "card_bullets": [
            "93 ISO 27002-controls + 14 IT/MSP-deltas",
            "Cross-tenant boundary review (klant A mag niet bij klant B)",
            "Privileged Access Management (PAM) + just-in-time engineer access",
            "RMM/PSA/EDR supply-chain risk-register",
            "Customer-ticket-data classification + retention policy",
            "Persoonlijke review door Lead Auditor (DNV/IRCA)"
        ],
        "card_foot": "Marktconform: IT-compliance consultancy €10k–€25k. Voor MSP's, MSSP's, ICT-dienstverleners, hosting-providers, cloud-resellers, software-houses.",
        "compare_miss_title": "Generieke ISO 27001-audit",
        "compare_miss": [
            "Multi-tenant: \"datasegregatie ja\", geen test van service-engineer-tooling",
            "Privileged access: er is een admin-account, geen PAM/JIT/break-glass-log",
            "RMM/MDM-tooling: aanwezig, geen vendor-supply-chain-risk-classification",
            "Klant-tickets: opgeslagen, geen data-classification of retention-beleid",
            "Endpoint deployment: gestandaardiseerd, geen drift-detection",
            "Engineer-onboarding: NDA, geen privileged-access-onboarding flow",
            "Customer-data-recovery: ja, geen scope-isolation per klant"
        ],
        "compare_cover_title": "Onze IT/MSP gap-analyse (ISO + supply-chain + tenant-boundary)",
        "compare_cover": [
            "Cross-tenant test: poging tot data-leak van klant A naar engineer-tooling klant B (§5.23)",
            "PAM/JIT: alle privileged access tijdsgebonden, gelogd en goedgekeurd (§5.15/§8.2/§8.5)",
            "RMM/PSA/EDR: vendor-tier-classification + jaarlijkse evidence-review (§5.19-§5.23)",
            "Customer-ticket-data classified op gevoeligheid + retention per klant-DPA (§5.12/§5.13)",
            "Endpoint-baseline + drift-detection + auto-remediatie (§8.1/§8.9)",
            "Engineer-onboarding: training + privileged-access-grant + offboarding (§6.1-§6.5)",
            "Per-klant scope-isolatie in DR-procedure: geen bulk-restore over tenants (§5.30/§8.13)",
            "Sub-processor-management: BAA's, DPA's, SOC 2-rapporten, jaarlijkse review (§5.21-§5.23)",
            "Customer-side incident-coördinatie: notification SLA + forensics-bewaring (§5.24-§5.27)"
        ],
        "cat_label": "De vragenset",
        "cat_h2": "De vragen die klanten al stellen",
        "cat_lead": "Vendor-security-questionnaires van enterprise-klanten richten zich op cross-tenant-boundaries, privileged access en supply-chain. Onze gap-analyse beantwoordt exact die vragen — zodat u na review een verdedigbare audit-status heeft i.p.v. een algemene ISO-vinkje.",
        "cat_grid": [
            {"n": "1", "h": "Multi-tenant boundary", "p": "Cross-tenant data-segregation getest, tenant-aware tooling-restrictions, audit-trail per klant gescheiden."},
            {"n": "2", "h": "Privileged Access (PAM)", "p": "Just-in-time admin, alle privileged sessies opgenomen, break-glass-procedure met directie-goedkeuring."},
            {"n": "3", "h": "RMM / PSA / EDR-tooling", "p": "Vendor-tier-classification, supply-chain attack-resilience, jaarlijkse evidence-review (SOC 2/ISO 27001-rapporten leveranciers)."},
            {"n": "4", "h": "Customer-ticket data", "p": "Classification per gevoeligheidsniveau, retention per klant-contract, ge-redacted in logs en exports."},
            {"n": "5", "h": "Endpoint deployment", "p": "Hardening-baseline, drift-detection, auto-remediatie, MDM/EDR-monitoring met afwijkings-alerting."},
            {"n": "6", "h": "Customer incident-management", "p": "SLA voor notification, forensische bewaring, customer-side coordination, root-cause delivery template."}
        ],
        "norms_intro": "Iedere bevinding verwijst naar de exacte ISO 27001/27002-control plus relevante supply-chain-norm — bruikbaar voor vendor-security-questionnaires en customer-DPA-bijlagen.",
        "norms_pills": ["ISO/IEC 27001:2022", "ISO/IEC 27002:2022", "ISO/IEC 27017 (cloud-services)", "NEN 7510 (zorg-MSP)", "AVG / GDPR", "NIS2 (managed services)"],
        "audience_label": "Voor wie",
        "audience_h2": "Welke IT-dienstverleners?",
        "audience_lead": "Ontworpen voor Nederlandse en Belgische IT-bureaus die enterprise-klanten bedienen. Met focus op multi-tenant operations en supply-chain risk.",
        "audience_tiles": ["MSP", "MSSP", "ICT-dienstverlener", "Hosting-provider", "Cloud reseller", "Software-house", "DevOps consultancy", "Detacheerder"],
        "faq": [
            ("Wij doen al ISO 27001 — waarom dit?", "Een gewone ISO-audit toetst je managementsysteem maar niet specifiek je multi-tenant operations. Klanten met een ISO 27001-vereiste lezen jouw rapport en willen weten: hoe scheidt jij data? Hoe werkt jullie privileged access? Hoe gaan jullie om met RMM-supply-chain? Onze gap-analyse maakt die antwoorden auditeerbaar."),
            ("Voor welke IT-bedrijven is dit geschikt?", "MSP's, MSSP's, ICT-dienstverleners, hosting-providers, cloud-resellers, software-houses, DevOps-consultancies, IT-detacheerders. Beste fit: bedrijven met enterprise-klanten die SOC 2 of ISO 27001-evidence vragen."),
            ("Welke normen worden gedekt?", "ISO/IEC 27001:2022 (managementsysteem), ISO/IEC 27002:2022 (controls), ISO/IEC 27017 (cloud-services), AVG/GDPR, en NIS2 voor managed-service-providers die als belangrijke entiteit kwalificeren. Voor zorg-MSP's mappen we ook NEN 7510."),
            ("Wat krijg ik voor €795?", "De volledige IT/MSP-gap-analyse (107 vragen), een rapport met scores per ISO 27002:2022-categorie, multi-tenant + supply-chain mapping per bevinding, een RMM/PSA-vendor-risk-register-template, en een persoonlijke review door gecertificeerd Lead Auditor (DNV/IRCA).")
        ],
        "audience_string": "MSP's, MSSP's, ICT-dienstverleners, hosting-providers, cloud-resellers, software-houses",
        "service_description": "Volledige ISO 27001:2022 gap-analyse op maat voor IT-dienstverleners en MSP's. 107 vragen waaronder 14 IT/MSP-specifieke (multi-tenant, PAM, RMM-supply-chain). Reviewed door gecertificeerd Lead Auditor.",
        "palette": {
            "bg": "#0F172A",
            "bg_warm": "#1E293B",
            "accent": "#0EA5E9",          # sky blue
            "accent_hover": "#0284C7",
            "accent_light": "#E0F2FE",
            "coral": "#FBBF24",           # amber
            "coral_hover": "#F59E0B",
            "coral_light": "#FEF3C7",
            "pine": "#0F172A",
            "text_primary_warm": "#F1F5F9",
            "text_secondary_warm": "#CBD5E1",
            "page_bg": "#FAFAFA",
            "page_text_primary": "#0F172A",
            "page_text_secondary": "#475569",
            "page_text_muted": "#94A3B8",
            "page_border": "#E5E7EB",
            "page_border_light": "#F1F5F9",
            "page_surface": "#FFFFFF",
            "page_warm": "#F1F5F9",
            "warning": "#D97706",
            "danger": "#B91C1C"
        }
    },
    "overheid": {
        "slug": "overheid",
        "name": "Overheid",
        "long_name": "Gemeenten & Overheid",
        "title": "ISO 27001 + BIO Gap-analyse voor gemeenten en overheid | Annex27",
        "meta_description": "ISO 27001 + BIO 1.04 gap-analyse voor gemeenten, provincies en overheidsinstellingen. ENSIA-ready, IBD-koppeling, Thema-uitwerkingen. €795 incl. Lead Auditor review.",
        "keywords": "BIO gap-analyse, BIO 1.04, ISO 27001 gemeente, ISO 27001 overheid, ENSIA, IBD, BIO Thema-uitwerkingen, BIO informatiebeveiliging overheid",
        "eyebrow": "Overheidsspecifiek · BIO 1.04 + ENSIA + Thema-uitwerkingen",
        "h1_main": "BIO en ISO 27001 in één gap-analyse.",
        "h1_accent": "ENSIA-ready, getoetst door een Lead Auditor.",
        "lead": "Begin met een gratis overheids-quickscan. Geen ISO-audit zonder BIO-context — vragen die de Baseline Informatiebeveiliging Overheid (BIO 1.04) en Thema-uitwerkingen expliciet toetsen. Inclusief ENSIA-rapportage-koppeling, IBD-meldplicht, Verbonden organisaties, DigiD/eHerkenning-aansluiting en AVG art. 6 lid 1e.",
        "card_eyebrow": "Volledige overheids-gap",
        "card_bullets": [
            "93 ISO 27002-controls + BIO 1.04 + Thema-uitwerkingen mapping",
            "ENSIA-vragenlijst-koppeling per control",
            "IBD-meldplicht-procedure (24u/72u/30 dagen)",
            "DigiD/eHerkenning-aansluitvoorwaarden + audit-trail",
            "Verbonden organisaties (gemeenschappelijke regelingen, GR's)",
            "Persoonlijke review door Lead Auditor (DNV/IRCA)"
        ],
        "card_foot": "Marktconform: overheids-compliance consultancy €15k–€50k. Voor gemeenten, provincies, waterschappen, GGD, omgevingsdiensten, onderwijsinstellingen.",
        "compare_miss_title": "Generieke ISO 27001-audit",
        "compare_miss": [
            "Geen mapping op BIO-thema's (BIO 1.04 vereist die expliciet)",
            "Geen ENSIA-koppeling — collegevoorstel kan niet zonder",
            "Datalek-meldplicht: AP, géén verwijzing naar IBD-meldplicht",
            "Verbonden organisaties (GR's, gemeenschappelijke regelingen) niet getoetst",
            "DigiD/eHerkenning: aansluiting bestaat, geen evidence-flow",
            "Aanbestedingsvereisten (Aanbestedingswet 2012, BIO als gunningseis) niet meegenomen",
            "Cloud-onder-overheidscontracten: geen specifieke toetsing op data-locatie / soevereiniteit"
        ],
        "compare_cover_title": "Onze overheids-gap (ISO + BIO + Thema-uitwerkingen + ENSIA)",
        "compare_cover": [
            "Per ISO 27002-control de exacte BIO 1.04-paragraaf + Thema-uitwerking",
            "ENSIA-vragenlijst gekoppeld aan elke control voor directe rapportage-export",
            "IBD-meldplicht: classificatie incidenten + meldtermijn (24u/72u/30 dagen)",
            "Verbonden organisaties: zelfevaluatie + DPA-vereisten in GR's",
            "DigiD/eHerkenning: audit-trail-bewaring 18 maanden + jaarlijks ATR-rapport",
            "Aanbestedingseis: BIO-evidence als aanbieder en als opdrachtgever",
            "Cloud-onder-overheid: data-locatie-eisen, EU-only, sleutelbeheer",
            "Cybersecurity Maatregelen voor de Overheid (CMO) waar relevant",
            "Privacy-impact: AVG art. 6 lid 1e (publieke taak) + DPIA-template"
        ],
        "cat_label": "De vragenset",
        "cat_h2": "Eerst de quickscan, dan de echte BIO-toets",
        "cat_lead": "De gratis quickscan geeft binnen 5 minuten een indicatie. De volledige gap-analyse toetst alle 93 ISO 27002-controls plus de BIO 1.04 + Thema-uitwerkingen-mapping. Iedere bevinding mappt op de exacte ISO 27002:2022-control, BIO-paragraaf én ENSIA-vraag — direct bruikbaar voor collegevoorstel, ENSIA-rapportage of toezicht.",
        "cat_grid": [
            {"n": "1", "h": "Bestuurlijk &amp; ENSIA", "p": "Collegevoorstel, jaarlijkse ENSIA-rapportage, in-control-statement, koppeling aan integraal toezicht."},
            {"n": "2", "h": "BIO Thema-uitwerkingen", "p": "Per cluster BIO-uitwerking (toegang, beveiligd softwareontwikkelingsproces, applicatie-beveiliging, communicatie)."},
            {"n": "3", "h": "Verbonden organisaties", "p": "Gemeenschappelijke regelingen (GR), verbonden partijen, regionale samenwerking — DPA + zelfevaluatie."},
            {"n": "4", "h": "DigiD / eHerkenning", "p": "Aansluitvoorwaarden, audit-trail-bewaring, jaarlijks Audit Tabel Resultaten (ATR)."},
            {"n": "5", "h": "Incident-management", "p": "IBD-meldplicht (24u/72u/30dagen), AP-meldplicht, klassikale oefening, RACI-incident-rol."},
            {"n": "6", "h": "Aanbesteding", "p": "BIO als gunningseis bij ICT-aanbestedingen, leveranciers-zelfevaluatie, exit-clausule, data-overdracht."}
        ],
        "norms_intro": "Iedere bevinding verwijst naar de exacte ISO 27001/27002-control én BIO 1.04-paragraaf én relevante Thema-uitwerking — direct bruikbaar voor ENSIA-rapportage en in-control-statement.",
        "norms_pills": ["ISO/IEC 27001:2022", "BIO 1.04", "BIO Thema-uitwerkingen", "ENSIA", "AVG art. 6 lid 1e", "NIS2 (essentiële entiteit)"],
        "audience_label": "Voor wie",
        "audience_h2": "Welke overheidsinstellingen?",
        "audience_lead": "Ontworpen voor Nederlandse decentrale overheid en publieke instellingen. Voor ministeries en uitvoeringsorganisaties bestaan aparte enterprise-trajecten.",
        "audience_tiles": ["Gemeenten", "Provincies", "Waterschappen", "GGD", "Omgevingsdienst", "Onderwijsinstelling", "Veiligheidsregio", "Verbonden organisatie / GR"],
        "faq": [
            ("Wat is het verschil met ENSIA?", "ENSIA is een rapportage-systematiek waarmee gemeenten zelfevaluaties doen tegen BIO + DigiD + Suwinet + BAG/BRP. Onze gap-analyse helpt jullie de evidence per ENSIA-vraag onderbouwen — als voorbereiding op de jaarlijkse ENSIA-rapportage en het in-control-statement. Niet vervangend; aanvullend en versnellend."),
            ("Voor welke overheden is dit geschikt?", "Gemeenten, provincies, waterschappen, omgevingsdiensten, GGD's, Veiligheidsregio's, onderwijsinstellingen, gemeenschappelijke regelingen, verbonden organisaties. Voor ministeries en grote uitvoeringsorganisaties is een enterprise-traject geschikter."),
            ("Welke normen worden gedekt?", "ISO/IEC 27001:2022 (managementsysteem), ISO/IEC 27002:2022 (controls), Baseline Informatiebeveiliging Overheid (BIO 1.04), BIO Thema-uitwerkingen, AVG/GDPR (art. 6 lid 1e: publieke taak), NIS2 voor essentiële entiteiten. Mapping op ENSIA-vragenlijst inbegrepen."),
            ("Wat krijg ik voor €795?", "De volledige overheids-gap-analyse (BIO + ISO 27001 + Thema-uitwerkingen), een rapport met BIO-paragraaf-mapping én ENSIA-koppeling per bevinding, geprioriteerde remediatie-acties, en een persoonlijke review door gecertificeerd Lead Auditor (DNV/IRCA).")
        ],
        "audience_string": "Gemeenten, provincies, waterschappen, GGD, omgevingsdiensten, onderwijsinstellingen",
        "service_description": "Volledige BIO 1.04 + ISO 27001:2022 gap-analyse op maat voor decentrale overheid. ENSIA-koppeling, BIO Thema-uitwerkingen, IBD-meldplicht. Reviewed door gecertificeerd Lead Auditor.",
        "palette": {
            "bg": "#0E1A2C",
            "bg_warm": "#0E1A2C",
            "accent": "#1E40AF",          # navy
            "accent_hover": "#1E3A8A",
            "accent_light": "#DBEAFE",
            "coral": "#EAB308",           # gold
            "coral_hover": "#CA8A04",
            "coral_light": "#FEF9C3",
            "pine": "#0B1220",
            "text_primary_warm": "#F8FAFC",
            "text_secondary_warm": "#CBD5E1",
            "page_bg": "#F8FAFC",
            "page_text_primary": "#0F172A",
            "page_text_secondary": "#334155",
            "page_text_muted": "#64748B",
            "page_border": "#E2E8F0",
            "page_border_light": "#F1F5F9",
            "page_surface": "#FFFFFF",
            "page_warm": "#EFF6FF",
            "warning": "#D97706",
            "danger": "#B91C1C"
        }
    },
    "bouw": {
        "slug": "bouw",
        "name": "Bouw & Techniek",
        "long_name": "Bouw & Techniek",
        "title": "ISO 27001 Gap-analyse voor bouw, installatie en techniek | Annex27",
        "meta_description": "ISO 27001 voor bouwbedrijven en installateurs: BIM-bestanden, drone-data, OT/IoT op bouwplaats, ketensamenwerking. €795 incl. Lead Auditor review.",
        "keywords": "ISO 27001 bouw, ISO 27001 installateur, BIM security, drone-data classification, OT security, IoT bouwplaats, ketensamenwerking informatiebeveiliging, BREEAM data",
        "eyebrow": "Bouw &amp; techniek · BIM + OT-security + drone-data",
        "h1_main": "Aanbestedingen vragen ISO 27001.",
        "h1_accent": "Geen audit-met-bouwvraagje — een echte toets.",
        "lead": "Begin met een gratis bouw-quickscan. Geen generieke audit met een vraagje over BIM — vragen die de bouwspecifieke realiteit toetsen: BIM-toegangsmodel, drone-data classificatie, OT/IoT op bouwplaats, ketensamenwerking met principal-architects, BREEAM/LEED-datastromen en aanbestedings-vertrouwelijkheid. Voor bouwbedrijven, installateurs, infra en MEP.",
        "card_eyebrow": "Volledige bouw-gap",
        "card_bullets": [
            "93 ISO 27002-controls + 12 bouw-deltas (BIM, OT, drone, keten)",
            "BIM-rolmodel: toegangsrechten per discipline, IFC-protectie",
            "OT/IoT-security op bouwplaats: cameras, sensoren, smart locks",
            "Drone-data classificatie + GDPR-conforme bewaring",
            "Onderaannemer-keten: NDA + DPA + evidence-flow",
            "Persoonlijke review door Lead Auditor (DNV/IRCA)"
        ],
        "card_foot": "Marktconform: bouw-compliance consultancy €8k–€20k. Voor bouwbedrijven, installateurs (E/W/B), architectenbureaus, infra-bouw, MEP-aannemers, BIM-consultants.",
        "compare_miss_title": "Generieke ISO 27001-audit",
        "compare_miss": [
            "BIM-bestanden: \"opgeslagen op netwerkschijf\", geen rolmodel per discipline",
            "Drone-data: bestaat, geen classificatie of GDPR-bewaartermijn",
            "OT-security bouwplaats: \"netwerk gescheiden\", geen device-inventaris of patching",
            "Onderaannemer-keten: NDA, geen evidence-flow voor security-eisen",
            "Tender-vertrouwelijkheid: confidentialiteit-clausule, geen technische controle",
            "BREEAM/LEED-datastromen: bestaan, geen data-classification",
            "Smart locks / camera-systemen op site: niet in asset-register"
        ],
        "compare_cover_title": "Onze bouw-gap (ISO + BIM + OT + keten)",
        "compare_cover": [
            "BIM-rolmodel met discipline-rechten (architect/constructeur/MEP) en IFC-bestand-isolatie (§5.15-§5.18)",
            "Drone-data: classificatie + retention + verwijdering volgens AVG (§5.12-§5.13/§5.34)",
            "OT-security: device-inventaris bouwplaats, network-segmentation, patching-baseline (§7.x/§8.1/§8.9)",
            "Smart locks / cameras: in asset-register, change-management, log-monitoring (§7.4/§8.16)",
            "Onderaannemer: NDA + DPA + jaarlijkse security-evidence-review (§5.19-§5.23)",
            "Tender-vertrouwelijkheid: technische controle (DLP) + clean-desk + bewaring 7 jaar (§7.7/§8.12)",
            "BREEAM/LEED-data: classification, externe-deling-beleid, retention per project (§5.12/§5.14)",
            "Aanbestedingsrecht: vertrouwelijkheid Aw 2012 art. 1.10 + Boek 2 BW (§5.32)",
            "NIS2 voor energie/infra: koppeling aan Sectorale CSIRT (§5.24-§5.27)"
        ],
        "cat_label": "De vragenset",
        "cat_h2": "Bouw-realiteit, niet kantoor-realiteit",
        "cat_lead": "De gratis quickscan geeft binnen 5 minuten een indicatie. De volledige gap-analyse toetst alle 93 ISO 27002-controls plus 12 bouw-specifieke deltas, met bewijsvoering per claim. Iedere bevinding mappt op ISO 27002:2022 én op de bouwsector-context.",
        "cat_grid": [
            {"n": "1", "h": "BIM &amp; ontwerp-data", "p": "Rolmodel per discipline, IFC-bestand-isolatie, version-control, externe-deling-beleid voor opdrachtgevers en onderaannemers."},
            {"n": "2", "h": "OT &amp; IoT op site", "p": "Camerasystemen, smart locks, sensoren, IoT-deurbellen — device-inventaris, network-segmentation, patching, log-monitoring."},
            {"n": "3", "h": "Drone-data &amp; surveying", "p": "Classificatie van luchtfoto's en 3D-scans, GDPR-conforme bewaring, deling met opdrachtgever, vernietiging na project."},
            {"n": "4", "h": "Onderaannemer-keten", "p": "NDA + DPA + minimaal-vereiste-controles, evidence-review, exit-clausule, data-overdracht na project-einde."},
            {"n": "5", "h": "Tender &amp; aanbesteding", "p": "Vertrouwelijkheid bid-data (Aw 2012), DLP, clean-desk-beleid, bewaring contractdocumenten 7 jaar."},
            {"n": "6", "h": "BREEAM / LEED / Lean", "p": "Data-classification, externe-deling-beleid, retention per project, energie- en CO2-rapportage-data-stromen."}
        ],
        "norms_intro": "Iedere bevinding verwijst naar de exacte ISO 27001/27002-control plus relevante bouw-context — direct bruikbaar voor aanbestedingen, BREEAM-evidence en ketensamenwerking.",
        "norms_pills": ["ISO/IEC 27001:2022", "ISO/IEC 27002:2022", "ISO/IEC 27019 (energie)", "Aanbestedingswet 2012", "AVG / GDPR", "NIS2 (energie/transport)"],
        "audience_label": "Voor wie",
        "audience_h2": "Welke bouw-bedrijven?",
        "audience_lead": "Ontworpen voor Nederlandse en Belgische bouw, installatie en techniek-bedrijven. Met focus op BIM-georiënteerde organisaties en OT-rijke bouwplaatsen.",
        "audience_tiles": ["Bouwbedrijf", "Installateur (E/W/B)", "MEP-aannemer", "Architectenbureau", "Infra-bouw", "BIM-consultant", "Bouwlogistiek", "Smart-building"],
        "faq": [
            ("Wij doen gewoon kantoorwerk — waarom bouw-specifiek?", "Bouw heeft data-categorieën die kantoorwerk niet heeft: BIM-bestanden (multi-discipline rolmodel), drone-data (GDPR-classificatie), OT op bouwplaats (cameras, smart locks), aanbestedings-vertrouwelijkheid. Een generieke ISO-audit toetst die niet — dan koopt u een onvolledig oordeel dat aanbestedingen niet beantwoordt."),
            ("Voor welke bouw-bedrijven is dit geschikt?", "Bouwbedrijven (algemeen + utiliteit), installateurs (elektro/werktuigbouw/bouwkundig), MEP-aannemers, architectenbureaus, infra-bouw, BIM-consultants, bouwlogistiek, smart-building-aanbieders. Niet voor alleen-grondverzet zonder digitalisering."),
            ("Welke normen worden gedekt?", "ISO/IEC 27001:2022 (managementsysteem), ISO/IEC 27002:2022 (controls), ISO/IEC 27019 (energie/utility waar relevant), Aanbestedingswet 2012 (vertrouwelijkheid), AVG/GDPR (drone-data), NIS2 voor essentiële sectoren energie/transport."),
            ("Wat krijg ik voor €795?", "De volledige bouw-gap-analyse (105 vragen), een rapport met BIM/OT/drone/keten-context per bevinding, geprioriteerde remediatie-acties, een onderaannemer-DPA-template, en een persoonlijke review door gecertificeerd Lead Auditor (DNV/IRCA).")
        ],
        "audience_string": "Bouwbedrijven, installateurs, MEP-aannemers, architectenbureaus, infra-bouw, BIM-consultants",
        "service_description": "Volledige ISO 27001:2022 gap-analyse op maat voor bouw en techniek. 105 vragen waaronder 12 bouw-specifieke (BIM, OT, drone-data, keten). Reviewed door gecertificeerd Lead Auditor.",
        "palette": {
            "bg": "#1C1410",
            "bg_warm": "#1C1410",
            "accent": "#B45309",          # bronze
            "accent_hover": "#92400E",
            "accent_light": "#FEF3C7",
            "coral": "#FB923C",           # warm orange
            "coral_hover": "#EA580C",
            "coral_light": "#FED7AA",
            "pine": "#150F0B",
            "text_primary_warm": "#FAFAF7",
            "text_secondary_warm": "#D6D3D1",
            "page_bg": "#FAF8F5",
            "page_text_primary": "#1C1917",
            "page_text_secondary": "#44403C",
            "page_text_muted": "#78716C",
            "page_border": "#E7E5E4",
            "page_border_light": "#F5F5F4",
            "page_surface": "#FFFFFF",
            "page_warm": "#FAF6EE",
            "warning": "#D97706",
            "danger": "#B91C1C"
        }
    }
}


def faq_jsonld(faq):
    """Generate FAQPage schema items."""
    items = []
    for q, a in faq:
        items.append('{"@type":"Question","name":' + json.dumps(q, ensure_ascii=False) +
                     ',"acceptedAnswer":{"@type":"Answer","text":' + json.dumps(a, ensure_ascii=False) + '}}')
    return ',\n      '.join(items)


def render(s):
    p = s["palette"]
    keywords_full = s["keywords"]
    breadcrumb_name = s["long_name"]

    return f"""<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
  <meta name="theme-color" content="#0D9488" />
  <script src="/analytics.js"></script>
  <title>{html.escape(s["title"])}</title>
  <meta name="description" content="{html.escape(s["meta_description"])}" />
  <meta name="keywords" content="{html.escape(keywords_full)}" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://annex27.nl/sector/{s["slug"]}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://annex27.nl/sector/{s["slug"]}" />
  <meta property="og:title" content="{html.escape(s["title"])}" />
  <meta property="og:description" content="{html.escape(s["meta_description"])}" />
  <meta property="og:image" content="https://annex27.nl/og-image.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script type="application/ld+json">
  {{
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {faq_jsonld(s["faq"])}
    ]
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context":"https://schema.org",
    "@type":"Service",
    "serviceType":"ISO 27001 gap-analyse — sector {s["name"]}",
    "name":"{s["long_name"]} gap-analyse",
    "description":{json.dumps(s["service_description"], ensure_ascii=False)},
    "provider":{{"@type":"Organization","name":"Annex27","url":"https://annex27.nl/","@id":"https://annex27.nl/#organization"}},
    "areaServed":[{{"@type":"Country","name":"Netherlands"}},{{"@type":"Country","name":"Belgium"}}],
    "audience":{{"@type":"BusinessAudience","audienceType":{json.dumps(s["audience_string"], ensure_ascii=False)}}},
    "category":"Compliance audit",
    "offers":{{"@type":"Offer","price":"795","priceCurrency":"EUR","priceValidUntil":"2026-12-31","availability":"https://schema.org/InStock","url":"https://annex27.nl/sector/{s["slug"]}"}}
  }}
  </script>
  <script type="application/ld+json">
  {{
    "@context":"https://schema.org",
    "@type":"BreadcrumbList",
    "itemListElement":[
      {{"@type":"ListItem","position":1,"name":"Home","item":"https://annex27.nl/"}},
      {{"@type":"ListItem","position":2,"name":"Sectoren","item":"https://annex27.nl/#sectoren"}},
      {{"@type":"ListItem","position":3,"name":{json.dumps(breadcrumb_name, ensure_ascii=False)},"item":"https://annex27.nl/sector/{s["slug"]}"}}
    ]
  }}
  </script>
  <style>
    *,*::before,*::after{{box-sizing:border-box;margin:0;padding:0;}}
    :root{{
      --bg:{p["page_bg"]};
      --surface:{p["page_surface"]};
      --bg-warm:{p["page_warm"]};
      --border:{p["page_border"]};
      --border-light:{p["page_border_light"]};
      --text-primary:{p["page_text_primary"]};
      --text-secondary:{p["page_text_secondary"]};
      --text-muted:{p["page_text_muted"]};
      --brand:#0D9488;
      --brand-light:#CCFBF1;
      --accent:{p["accent"]};
      --accent-hover:{p["accent_hover"]};
      --accent-light:{p["accent_light"]};
      --coral:{p["coral"]};
      --coral-hover:{p["coral_hover"]};
      --coral-light:{p["coral_light"]};
      --pine:{p["pine"]};
      --warning:{p["warning"]};
      --danger:{p["danger"]};
      --radius:10px;
      --radius-lg:16px;
    }}
    html{{scroll-behavior:smooth;}}
    body{{font-family:'Inter',system-ui,sans-serif;background:var(--bg);color:var(--text-secondary);line-height:1.7;-webkit-font-smoothing:antialiased;}}
    .container{{max-width:1080px;margin:0 auto;padding:0 24px;}}
    nav{{position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(250,250,250,0.92);backdrop-filter:blur(16px);border-bottom:1px solid var(--border-light);height:64px;display:flex;align-items:center;padding:0 5%;}}
    .nav-inner{{display:flex;align-items:center;justify-content:space-between;width:100%;max-width:1120px;margin:0 auto;}}
    .nav-logo{{font-family:'Sora',sans-serif;font-size:1.4rem;font-weight:700;color:var(--text-primary);text-decoration:none;letter-spacing:-0.03em;}}
    .nav-logo span{{color:var(--brand);}}
    .nav-back{{display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary);text-decoration:none;font-weight:500;}}
    .nav-back:hover{{color:var(--text-primary);}}
    .nav-back svg{{width:14px;height:14px;stroke:currentColor;fill:none;stroke-width:2;}}

    .hero{{padding:120px 0 72px;background:linear-gradient(165deg,var(--pine) 0%,{p["bg_warm"]} 60%,{p["pine"]} 100%);color:white;position:relative;overflow:hidden;}}
    .hero::before{{content:'';position:absolute;top:-180px;right:-140px;width:580px;height:580px;background:radial-gradient(circle,{p["accent"]}33 0%,transparent 65%);pointer-events:none;}}
    .hero::after{{content:'';position:absolute;bottom:-220px;left:-140px;width:520px;height:520px;background:radial-gradient(circle,{p["coral"]}28 0%,transparent 65%);pointer-events:none;}}
    .hero .container{{position:relative;z-index:1;}}
    .hero-grid{{display:grid;grid-template-columns:1.4fr 1fr;gap:48px;align-items:center;}}
    .eyebrow{{display:inline-flex;align-items:center;gap:10px;font-size:0.78rem;font-weight:600;color:{p["coral_light"]};text-transform:uppercase;letter-spacing:0.14em;margin-bottom:18px;}}
    .eyebrow::before{{content:'';width:24px;height:1px;background:var(--coral);}}
    .hero h1{{font-family:'Sora',sans-serif;font-size:clamp(2rem,4.4vw,3.2rem);font-weight:700;line-height:1.05;letter-spacing:-0.03em;margin-bottom:18px;color:{p["text_primary_warm"]};}}
    .hero h1 .accent{{color:var(--coral);}}
    .hero p.lead{{font-size:1.08rem;color:{p["text_secondary_warm"]};max-width:560px;margin-bottom:28px;}}
    .hero-cta{{display:flex;gap:14px;flex-wrap:wrap;}}
    .btn-primary{{display:inline-flex;align-items:center;gap:10px;background:var(--coral);color:#0F172A;padding:14px 24px;border-radius:10px;font-weight:700;font-size:0.96rem;text-decoration:none;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 6px 24px {p["coral"]}50;}}
    .btn-primary:hover{{background:var(--coral-hover);transform:translateY(-1px);box-shadow:0 10px 30px {p["coral"]}66;}}
    .btn-ghost{{display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,0.06);color:white;padding:14px 22px;border-radius:10px;font-weight:600;font-size:0.96rem;text-decoration:none;border:1px solid rgba(255,255,255,0.18);transition:background .2s;}}
    .btn-ghost:hover{{background:rgba(255,255,255,0.12);}}

    .hero-card{{background:rgba(255,255,255,0.045);border:1px solid {p["accent"]}38;border-radius:16px;padding:24px;backdrop-filter:blur(8px);box-shadow:0 0 0 1px {p["accent"]}22 inset;}}
    .hero-card-eyebrow{{font-size:0.72rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:{p["accent_light"]};margin-bottom:12px;}}
    .hero-card h3{{font-family:'Sora',sans-serif;color:white;font-size:1.05rem;font-weight:700;margin-bottom:4px;}}
    .hero-card .price{{font-family:'Sora',sans-serif;color:white;font-size:2rem;font-weight:700;margin-bottom:14px;}}
    .hero-card .price small{{font-size:0.78rem;font-weight:500;color:rgba(255,255,255,0.55);}}
    .hero-card ul{{list-style:none;padding:0;margin:0 0 18px;font-size:0.86rem;color:rgba(255,255,255,0.82);}}
    .hero-card ul li{{padding:5px 0;display:flex;gap:8px;align-items:flex-start;}}
    .hero-card ul li::before{{content:'✓';color:{p["coral"]};font-weight:700;flex-shrink:0;}}
    .hero-card a.cta{{display:block;text-align:center;background:var(--coral);color:#0F172A;padding:13px 22px;border-radius:10px;font-weight:700;text-decoration:none;font-size:0.94rem;margin-bottom:8px;transition:background .2s;}}
    .hero-card a.cta:hover{{background:var(--coral-hover);}}
    .hero-card-foot{{margin-top:14px;font-size:0.74rem;color:rgba(255,255,255,0.46);line-height:1.55;}}

    section{{padding:80px 0;}}
    section.alt{{background:var(--surface);border-top:1px solid var(--border-light);border-bottom:1px solid var(--border-light);}}
    .label{{font-size:0.78rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:var(--accent);margin-bottom:12px;}}
    h2.section-title{{font-family:'Sora',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:var(--text-primary);letter-spacing:-0.02em;margin-bottom:14px;}}
    .section-lead{{font-size:1.02rem;line-height:1.75;max-width:680px;margin-bottom:40px;}}

    .compare-grid{{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:24px;}}
    .compare-col{{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:24px;box-shadow:0 1px 3px rgba(0,0,0,0.04);}}
    .compare-col.miss{{border-left:4px solid var(--danger);background:linear-gradient(180deg,#FFF7F4 0%,var(--surface) 35%);}}
    .compare-col.cover{{border-left:4px solid var(--accent);background:linear-gradient(180deg,{p["accent_light"]} 0%,var(--surface) 35%);}}
    .compare-col h3{{font-family:'Sora',sans-serif;font-size:1.05rem;color:var(--text-primary);margin-bottom:14px;}}
    .compare-col ul{{padding-left:18px;font-size:0.92rem;line-height:1.75;}}
    .compare-col ul li{{margin-bottom:8px;}}
    .compare-col.miss ul li::marker{{color:var(--danger);}}
    .compare-col.cover ul li::marker{{color:var(--accent);}}

    .cat-grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px;}}
    .cat{{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;transition:border-color .2s,transform .2s;}}
    .cat:hover{{border-color:var(--accent);transform:translateY(-2px);}}
    .cat-num{{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;background:var(--accent-light);color:var(--accent);font-family:'Sora',sans-serif;font-weight:800;margin-bottom:12px;}}
    .cat h3{{font-family:'Sora',sans-serif;font-size:1rem;color:var(--text-primary);margin-bottom:6px;}}
    .cat p{{font-size:0.88rem;line-height:1.6;}}

    .audience{{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-top:24px;}}
    .aud{{background:var(--surface);border:1px solid var(--border);border-radius:12px;padding:16px;font-size:0.9rem;color:var(--text-primary);font-weight:500;text-align:center;transition:background .2s,border-color .2s;}}
    .aud:hover{{background:var(--coral-light);border-color:var(--coral);}}

    .norm-banner{{background:linear-gradient(135deg,var(--pine) 0%,{p["bg_warm"]} 60%,{p["pine"]} 100%);color:white;padding:28px 32px;border-radius:16px;margin-top:32px;border:1px solid {p["accent"]}38;position:relative;overflow:hidden;}}
    .norm-banner::before{{content:'';position:absolute;top:-80px;right:-80px;width:280px;height:280px;background:radial-gradient(circle,{p["coral"]}28 0%,transparent 70%);}}
    .norm-banner > *{{position:relative;}}
    .norm-banner h3{{font-family:'Sora',sans-serif;font-size:1.1rem;color:white;margin-bottom:10px;}}
    .norm-banner p{{color:rgba(255,255,255,0.78);font-size:0.92rem;line-height:1.65;margin-bottom:14px;}}
    .norm-banner ul{{list-style:none;padding:0;display:flex;gap:8px;flex-wrap:wrap;}}
    .norm-banner li{{background:{p["accent"]}28;color:{p["accent_light"]};padding:5px 12px;border-radius:99px;font-size:0.78rem;font-weight:600;letter-spacing:0.02em;border:1px solid {p["accent"]}3a;}}

    .cta-section{{background:linear-gradient(180deg,var(--bg-warm) 0%,var(--surface) 100%);padding:80px 0;text-align:center;position:relative;overflow:hidden;}}
    .cta-section::before{{content:'';position:absolute;top:-100px;left:50%;transform:translateX(-50%);width:600px;height:300px;background:radial-gradient(ellipse,{p["coral"]}24 0%,transparent 70%);pointer-events:none;}}
    .cta-section .container{{position:relative;}}
    .cta-section h2{{font-family:'Sora',sans-serif;font-size:clamp(1.6rem,3vw,2.2rem);font-weight:700;color:var(--text-primary);letter-spacing:-0.02em;margin-bottom:14px;}}
    .cta-section p{{font-size:1rem;max-width:560px;margin:0 auto 28px;}}
    .cta-row{{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;}}
    .btn-primary-light{{background:var(--coral);color:#0F172A;padding:14px 28px;border-radius:10px;font-weight:700;font-size:0.96rem;text-decoration:none;display:inline-block;transition:background .2s,transform .2s,box-shadow .2s;box-shadow:0 6px 20px {p["coral"]}40;}}
    .btn-primary-light:hover{{background:var(--coral-hover);transform:translateY(-1px);}}
    .btn-ghost-light{{background:transparent;color:var(--text-primary);padding:14px 26px;border-radius:10px;font-weight:600;font-size:0.96rem;text-decoration:none;border:1px solid var(--border);display:inline-block;transition:background .2s,border-color .2s;}}
    .btn-ghost-light:hover{{background:var(--surface);border-color:var(--accent);}}

    .deliver-grid{{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:24px;}}
    .deliver{{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;display:flex;gap:14px;}}
    .deliver-icon{{flex-shrink:0;width:36px;height:36px;border-radius:8px;background:var(--accent-light);color:var(--accent);display:flex;align-items:center;justify-content:center;}}
    .deliver-icon svg{{width:18px;height:18px;stroke:currentColor;fill:none;stroke-width:2;}}
    .deliver h3{{font-family:'Sora',sans-serif;font-size:0.96rem;color:var(--text-primary);margin-bottom:4px;}}
    .deliver p{{font-size:0.86rem;line-height:1.6;}}

    footer{{background:var(--surface);border-top:1px solid var(--border-light);padding:40px 0;font-size:0.84rem;color:var(--text-muted);}}
    footer .container{{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}}
    footer a{{color:var(--text-secondary);text-decoration:none;}}
    footer a:hover{{color:var(--text-primary);}}

    @media (max-width:900px){{
      .hero-grid{{grid-template-columns:1fr;}}
      .compare-grid{{grid-template-columns:1fr;}}
      .cat-grid{{grid-template-columns:1fr;}}
      .audience{{grid-template-columns:repeat(2,1fr);}}
      .deliver-grid{{grid-template-columns:1fr;}}
    }}
  </style>
</head>
<body>

<nav>
  <div class="nav-inner">
    <a href="/" class="nav-logo">annex<span>27</span></a>
    <a href="/" class="nav-back"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg> Terug naar home</a>
  </div>
</nav>

<section class="hero">
  <div class="container">
    <div class="hero-grid">
      <div>
        <div class="eyebrow"><span>{s["eyebrow"]}</span></div>
        <h1>{s["h1_main"]} <span class="accent">{s["h1_accent"]}</span></h1>
        <p class="lead">{s["lead"]}</p>
        <div class="hero-cta">
          <a href="/gap-analyse?sector={s["slug"]}" class="btn-primary">Start gratis quickscan →</a>
          <a href="#vergelijk" class="btn-ghost">Wat is het verschil?</a>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-eyebrow">{s["card_eyebrow"]}</div>
        <div class="price">€795 <small>na de quickscan</small></div>
        <ul>
{chr(10).join(f"          <li>{html.escape(b)}</li>" for b in s["card_bullets"])}
        </ul>
        <a href="/gap-analyse?sector={s["slug"]}" class="cta">Eerst gratis quickscan →</a>
        <div class="hero-card-foot">{s["card_foot"]}</div>
      </div>
    </div>
  </div>
</section>

<section id="vergelijk">
  <div class="container">
    <div class="label">Het verschil</div>
    <h2 class="section-title">Wat een generieke ISO 27001-audit mist in de {s["name"].lower()}</h2>
    <p class="section-lead">ISO 27001 is universeel. Maar de {s["name"].lower()}-context heeft specifieke risico's en regelgeving die een generieke audit niet expliciet toetst — en dan koopt u eigenlijk een onvolledig oordeel.</p>

    <div class="compare-grid">
      <div class="compare-col miss">
        <h3>{s["compare_miss_title"]}</h3>
        <ul>
{chr(10).join(f"          <li>{html.escape(item)}</li>" for item in s["compare_miss"])}
        </ul>
      </div>
      <div class="compare-col cover">
        <h3>{s["compare_cover_title"]}</h3>
        <ul>
{chr(10).join(f"          <li>{item}</li>" for item in s["compare_cover"])}
        </ul>
      </div>
    </div>
  </div>
</section>

<section class="alt">
  <div class="container">
    <div class="label">{s["cat_label"]}</div>
    <h2 class="section-title">{s["cat_h2"]}</h2>
    <p class="section-lead">{s["cat_lead"]}</p>

    <div class="cat-grid">
{chr(10).join(f'      <div class="cat"><div class="cat-num">{c["n"]}</div><h3>{c["h"]}</h3><p>{c["p"]}</p></div>' for c in s["cat_grid"])}
    </div>

    <div class="norm-banner">
      <h3>Direct gemapt op normvereisten</h3>
      <p>{s["norms_intro"]}</p>
      <ul>
{chr(10).join(f"        <li>{html.escape(n)}</li>" for n in s["norms_pills"])}
      </ul>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="label">{s["audience_label"]}</div>
    <h2 class="section-title">{s["audience_h2"]}</h2>
    <p class="section-lead">{s["audience_lead"]}</p>

    <div class="audience">
{chr(10).join(f'      <div class="aud">{html.escape(a)}</div>' for a in s["audience_tiles"])}
    </div>
  </div>
</section>

<section class="alt">
  <div class="container">
    <div class="label">Wat u krijgt</div>
    <h2 class="section-title">Het rapport</h2>
    <p class="section-lead">Geen vinkjeslijst. Een leesbaar rapport dat uw bestuur kan voorleggen aan klanten, toezichthouder of opdrachtgever.</p>

    <div class="deliver-grid">
      <div class="deliver">
        <div class="deliver-icon"><svg viewBox="0 0 24 24"><path d="M12 2v20M2 12h20"/></svg></div>
        <div><h3>Volwassenheidsscore per categorie</h3><p>CMMI 0-4 schaal, gewogen per vraag. Direct vergelijkbaar met benchmark voor uw sector.</p></div>
      </div>
      <div class="deliver">
        <div class="deliver-icon"><svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg></div>
        <div><h3>Norm-mapping per bevinding</h3><p>Verwijzing naar ISO 27002:2022-control én sector-specifieke norm waar relevant.</p></div>
      </div>
      <div class="deliver">
        <div class="deliver-icon"><svg viewBox="0 0 24 24"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg></div>
        <div><h3>Geprioriteerde remediatie</h3><p>Concrete acties met verwijzing naar Annex A én sector-context, inclusief volgorde van uitvoering.</p></div>
      </div>
      <div class="deliver">
        <div class="deliver-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
        <div><h3>Persoonlijke Lead Auditor review</h3><p>Geen AI-rapport zonder oog. Een gecertificeerd Lead Auditor (DNV/IRCA) leest het rapport door en geeft eindoordeel.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="container">
    <h2>Klaar om de audit-conversatie aan te gaan met uw klanten?</h2>
    <p>Begin met de gratis quickscan. Daarna kunt u kiezen of u doorgaat met de volledige gap-analyse — €795 inclusief Lead Auditor review.</p>
    <div class="cta-row">
      <a href="/gap-analyse?sector={s["slug"]}" class="btn-primary-light">Start gratis quickscan →</a>
      <a href="/rapport-voorbeeld" class="btn-ghost-light">Bekijk voorbeeldrapport</a>
    </div>
  </div>
</section>

<footer>
  <div class="container">
    <div>© 2026 Annex27 · ISO 27001 + sector-specifieke compliance voor het MKB</div>
    <div><a href="/privacy">Privacy</a> · <a href="/algemene-voorwaarden">AV</a> · <a href="/verwerkersovereenkomst">Verwerkersovereenkomst</a></div>
  </div>
</footer>

</body>
</html>
"""


for slug, data in SECTORS.items():
    out_path = os.path.join(BASE, f"{slug}.html")
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(render(data))
    print(f"Wrote {out_path} ({os.path.getsize(out_path):,} bytes)")
