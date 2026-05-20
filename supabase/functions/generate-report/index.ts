// Supabase Edge Function: generate-report
// Genereert AI-draft gap-analyse rapport voor een klant met Claude Opus 4.7 (multimodal).
// Admin-triggered vanuit admin.html (Klant > Rapport tab > "Genereer AI-draft").
//
// Flow:
//   1. Auth admin via JWT (Authorization header)
//   2. Fetch klant data: profile, gap_analyse.answers, auditor_findings, evidence-bestanden
//   3. Bouw multimodal prompt: systeem (auditor-stijl) + user (klant-data + evidence-images)
//   4. Call Anthropic Messages API met claude-opus-4-5 (multimodal)
//   5. Parse response → sections JSON
//   6. Insert in report_drafts (status='draft')
//   7. Return draft_id + preview
//
// Secrets vereist: ANTHROPIC_API_KEY
// Deploy: via Supabase Management API (CLI is Device-Guard geblokkeerd)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];
function cors(origin: string | null) {
  const o = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': o,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

// Sonnet 4.5 ipv Opus voor rapport-narratief: 3x sneller, ~5x goedkoper, vergelijkbare schrijfkwaliteit
// voor narrative-secties (exec summary, score-narrative). De diepe analyse zit al in auditor_findings
// die 1-op-1 worden overgenomen — daar is geen Opus voor nodig in deze stap.
const MODEL = 'claude-sonnet-4-5';
const MAX_EVIDENCE_IMAGES = 12; // limit om token-cost in toom te houden
const MAX_EVIDENCE_PDFS = 6;    // limit PDF-documenten (Claude leest tot 100p/32MB per doc)
const MAX_EVIDENCE_BYTES = 4_500_000; // 4.5MB per image (Anthropic limit = 5MB base64)
const MAX_PDF_BYTES = 25_000_000; // 25MB per PDF (ruim onder Anthropic 32MB)

// Chunked base64 encoder voor grote buffers (spread-trick faalt > ~120KB).
function bufToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  let bin = '';
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

interface ReportSections {
  executive_summary: string;
  score_summary: string;
  findings_by_category: { [cat: string]: string };
  top_priorities: string[];
  detailed_findings: {
    control_id: string;
    status: string;
    finding: string;
    recommendation: string;
    evidence_referenced?: string[];   // filenames die in evidence-folder van klant stonden
    klant_quote?: string;              // letterlijk citaat uit klant-toelichting (max 200 tekens)
  }[];
  disclosure: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    // Auth
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });

    const supaUser = createClient(
      Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user: adminUser } } = await supaUser.auth.getUser();
    if (!adminUser) return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    const role = adminUser.app_metadata?.role;
    const adminPakket = adminUser.app_metadata?.pakket;
    if (role !== 'auditor' && adminPakket !== 'admin') {
      return new Response(JSON.stringify({ error: 'Geen rechten' }), { status: 403, headers });
    }

    const body = await req.json();
    const targetUserId = String(body.user_id || '').trim();
    if (!targetUserId) return new Response(JSON.stringify({ error: 'user_id verplicht' }), { status: 400, headers });

    const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_KEY) return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY niet geconfigureerd' }), { status: 500, headers });

    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // Fetch klant profile (from auth.users metadata)
    const { data: { user: klant }, error: userErr } = await sb.auth.admin.getUserById(targetUserId);
    if (userErr || !klant) return new Response(JSON.stringify({ error: 'Klant niet gevonden' }), { status: 404, headers });

    const klantNaam = klant.user_metadata?.naam || klant.email || 'Klant';
    const klantBedrijf = klant.user_metadata?.bedrijf || '';
    const klantSector = klant.user_metadata?.sector || klant.user_metadata?.sectorLabel || 'Algemeen';

    // Fetch gap_analyse answers (PAID dashboard gap-analyse — NIET de publieke quickscan)
    // Data-structuur: { "A.5.1_0": "3", "A.5.1_1": "2", "A.5.2_0": "4", ..., "evidence_notes_A.5.1": "..." }
    const { data: gapRow } = await sb.from('gap_analyse').select('answers, updated_at').eq('user_id', targetUserId).maybeSingle();
    const rawAnswers: Record<string, any> = gapRow?.answers || {};

    const { data: findings } = await sb.from('auditor_findings').select('control_id, severity, finding, recommendation, reviewed_evidence').eq('user_id', targetUserId);

    // Herstructureren: group per control_id, compute CMMI-avg + status
    interface CtrlAnalysis {
      control_id: string;
      sub_answers: { q_index: number; value: string; label: string }[];
      avg_score: number | null;  // gemiddeld CMMI (0-4), null als alleen nvt
      all_nvt: boolean;
      claimed: boolean;  // waar voor >=1 sub-antwoord >=2 (in ontwikkeling of hoger)
      max_claimed: number;
      note: string;
    }
    // Unified label-set: combineert CMMI (procesmaturiteit) en boolean (binaire feiten) in één lezing.
    // De klant kiest per vraag-type een van beide schalen; rapport-LLM mag passend taalgebruik kiezen.
    const cmmiLabel: Record<string, string> = {
      '0': 'Niet / Nee',
      '1': 'Beperkt / Gepland',
      '2': 'Deels / In ontwikkeling',
      '3': 'Grotendeels / Geïmplementeerd',
      '4': 'Volledig / Ja / Geoptimaliseerd',
      'nvt': 'Niet van toepassing'
    };
    const controlMap: Record<string, CtrlAnalysis> = {};
    const evNotesMap: Record<string, string> = {};
    for (const [key, raw] of Object.entries(rawAnswers)) {
      const value = String(raw);
      if (key.startsWith('evidence_notes_')) { evNotesMap[key.replace('evidence_notes_', '')] = value; continue; }
      // key format: A.5.1_0 → control_id=A.5.1, sub=0
      const m = key.match(/^([A-C]\.\d+\.?\d*)_(\d+)$/);
      if (!m) continue;
      const ctrlId = m[1];
      const qIdx = parseInt(m[2], 10);
      if (!controlMap[ctrlId]) {
        controlMap[ctrlId] = { control_id: ctrlId, sub_answers: [], avg_score: null, all_nvt: false, claimed: false, max_claimed: 0, note: '' };
      }
      controlMap[ctrlId].sub_answers.push({ q_index: qIdx, value, label: cmmiLabel[value] || value });
    }
    // Post-process: avg_score, claimed, note
    for (const c of Object.values(controlMap)) {
      const numeric = c.sub_answers.filter(s => s.value !== 'nvt').map(s => parseInt(s.value, 10)).filter(n => !isNaN(n));
      c.avg_score = numeric.length ? Math.round((numeric.reduce((a, b) => a + b, 0) / numeric.length) * 10) / 10 : null;
      c.all_nvt = c.sub_answers.length > 0 && c.sub_answers.every(s => s.value === 'nvt');
      c.max_claimed = numeric.length ? Math.max(...numeric) : 0;
      c.claimed = c.max_claimed >= 2;
      c.note = evNotesMap[c.control_id] || '';
    }

    // Fetch most recent order for this user
    const { data: order } = await sb.from('orders').select('id, plan, amount, paid_at').eq('user_id', targetUserId).order('created_at', { ascending: false }).limit(1).maybeSingle();

    // List evidence files for user (storage bucket 'evidence', path pattern: <user_id>/<control_id>/<file>)
    const { data: evidenceList } = await sb.storage.from('evidence').list(targetUserId, { limit: 100 });
    const evidenceFiles: { path: string; name: string; size: number }[] = [];
    if (evidenceList) {
      for (const ctrlFolder of evidenceList) {
        if (!ctrlFolder.name) continue;
        const { data: filesInCtrl } = await sb.storage.from('evidence').list(`${targetUserId}/${ctrlFolder.name}`, { limit: 20 });
        if (filesInCtrl) {
          for (const f of filesInCtrl) {
            if (!f.name || f.id === null) continue; // skip subdirs
            evidenceFiles.push({ path: `${targetUserId}/${ctrlFolder.name}/${f.name}`, name: f.name, size: (f as any).metadata?.size || 0 });
          }
        }
      }
    }

    // OPTIM: generate-report skipt de visuele/document-input van evidence omdat die al
    // is gelezen door generate-findings-draft tijdens de bevindingen-fase. De auditor heeft
    // die analyse gevalideerd en de uitkomsten staan in auditor_findings (input hier).
    // Het rapport heeft daarmee genoeg aan: klant-profiel + bevindingen + evidence-filenames + corpus.
    // Reduceert prompt van ~150K tokens naar ~30K → geen gateway timeout meer.
    const imageFiles: typeof evidenceFiles = [];
    const pdfFiles: typeof evidenceFiles = [];
    const otherFiles = evidenceFiles;

    // Build multimodal content for Claude
    const contentParts: any[] = [];

    // Per-control evidence mapping (filenames op folder-basis: evidence/<user_id>/<control_id>/<file>)
    const evidencePerControl: Record<string, string[]> = {};
    for (const f of evidenceFiles) {
      const ctrl = f.path.split('/')[1] || 'onbekend';
      if (!evidencePerControl[ctrl]) evidencePerControl[ctrl] = [];
      evidencePerControl[ctrl].push(f.name);
    }

    // Build per-control human-readable summary
    const ctrlList = Object.values(controlMap).sort((a, b) => a.control_id.localeCompare(b.control_id, undefined, { numeric: true }));
    const ctrlSummary = ctrlList.length ? ctrlList.map(c => {
      const subs = c.sub_answers.map(s => `Q${s.q_index + 1}=${s.value}(${s.label})`).join(', ');
      const ev = evidencePerControl[c.control_id] || [];
      const evStr = ev.length ? `\n  Evidence (${ev.length}): ${ev.slice(0, 5).join(', ')}${ev.length > 5 ? '...' : ''}` : '\n  Evidence: geen aangeleverd';
      const noteStr = c.note ? `\n  Klant-toelichting: "${c.note.slice(0, 300)}"` : '';
      const statusTag = c.all_nvt ? '[N.v.t.]' : !c.claimed ? '[GEEN BASIS]' : c.avg_score && c.avg_score >= 3 ? '[OK]' : '[GAP]';
      return `${c.control_id} ${statusTag} avg=${c.avg_score ?? 'n.v.t.'} max=${c.max_claimed}\n  Sub-vragen: ${subs}${evStr}${noteStr}`;
    }).join('\n\n') : '(Geen ingevulde antwoorden in gap-analyse gevonden)';

    // Add klant context text (gap-analyse uit klant-dashboard, niet quickscan)
    contentParts.push({
      type: 'text',
      text: `**Klantprofiel:**
- Naam: ${klantNaam}
- Bedrijf: ${klantBedrijf}
- Sector: ${klantSector}
- Order: ${order?.plan || 'onbekend'} (€${order?.amount || '?'}, betaald op ${order?.paid_at || '?'})
- Gap-analyse laatst bijgewerkt: ${gapRow?.updated_at || 'onbekend'}

**Gap-analyse resultaten per Annex A control** (gescoord op CMMI-schaal 0-4, ingevuld door klant in dashboard):

Legenda status-tags:
- \`[OK]\` — gemiddelde claim ≥3 (geïmplementeerd of geoptimaliseerd)
- \`[GAP]\` — gemiddelde claim 2 of lager (in ontwikkeling / gepland / niet aanwezig)
- \`[GEEN BASIS]\` — klant claimde niets boven niveau 1 (geen maatregel in praktijk)
- \`[N.v.t.]\` — klant heeft control expliciet uitgezonderd

Schaal per sub-vraag (klant kiest tussen ja/nee voor binaire feiten of CMMI voor procesmaturiteit):
\`0\`=Niet / Nee · \`1\`=Beperkt / Gepland · \`2\`=Deels / In ontwikkeling · \`3\`=Grotendeels / Geïmplementeerd · \`4\`=Volledig / Ja / Geoptimaliseerd · \`nvt\`=Niet van toepassing

Bij rapport-formulering: gebruik passend taalgebruik per vraag. Voor "is er een beleid" past "Ja, aanwezig" / "Nee, ontbreekt"; voor "wordt periodiek gemeten" past "geoptimaliseerd" / "in ontwikkeling".

\`\`\`
${ctrlSummary}
\`\`\`

**Auditor-bevindingen — door Lead Auditor al beoordeeld (${findings?.length || 0}):**
> Deze bevindingen zijn HANDMATIG GEVALIDEERD door Lead Auditor. Neem ZE ALLEMAAL 1-op-1 over in \`detailed_findings\` (zelfde control_id, status afgeleid van severity, finding-tekst en recommendation LETTERLIJK overnemen). NIET filteren, NIET inkorten, NIET herformuleren — Lead Auditor heeft hierop gesignoffd, jij respecteert die beslissing. Severity-mapping: 'critical' → status='critical'; 'major' → status='gap'; 'minor' of 'info' → status='ok'.

${findings && findings.length ? findings.map((f: any) => {
  const evNote = f.reviewed_evidence ? ` [evidence beoordeeld: ${String(f.reviewed_evidence).slice(0, 200)}]` : '';
  const recNote = f.recommendation ? `\n  Aanbeveling: ${String(f.recommendation).slice(0, 400)}` : '';
  return `- ${f.control_id} [severity=${f.severity}]: ${f.finding}${recNote}${evNote}`;
}).join('\n') : '(geen — baseer detailed_findings volledig op gap-antwoorden + evidence-analyse)'}

**Overige bewijsvoering-bestanden (geen image/PDF — filename-only, inhoud niet ingelezen):**
${otherFiles.map(f => `- ${f.name} (${Math.round(f.size/1024)}KB)`).join('\n') || '(geen)'}

**Image-bewijsvoering** (${imageFiles.length} afbeeldingen meegestuurd voor visuele analyse, zie hieronder):
**PDF-bewijsvoering** (${pdfFiles.length} PDF-documenten meegestuurd — Claude leest layout, tabellen, datums, handtekening-zones; zie hieronder):
`
    });

    // Download + include each image as base64
    for (const img of imageFiles) {
      try {
        const { data: blob } = await sb.storage.from('evidence').download(img.path);
        if (!blob) continue;
        const buf = await blob.arrayBuffer();
        const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
        const mediaType = img.name.match(/\.png$/i) ? 'image/png' : img.name.match(/\.webp$/i) ? 'image/webp' : 'image/jpeg';
        contentParts.push({ type: 'text', text: `\n*Evidence-bestand: ${img.name} (pad: ${img.path})*` });
        contentParts.push({ type: 'image', source: { type: 'base64', media_type: mediaType, data: b64 } });
      } catch (e) {
        console.warn('Failed to attach image:', img.path, e);
      }
    }

    // Download + include each PDF as document (Claude native PDF-input)
    for (const pdf of pdfFiles) {
      try {
        const { data: blob } = await sb.storage.from('evidence').download(pdf.path);
        if (!blob) continue;
        const buf = await blob.arrayBuffer();
        const b64 = bufToB64(buf);
        contentParts.push({ type: 'text', text: `\n*PDF-bestand: ${pdf.name} (pad: ${pdf.path}, ${Math.round(pdf.size/1024)}KB)*` });
        contentParts.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b64 } });
      } catch (e) {
        console.warn('Failed to attach PDF:', pdf.path, e);
      }
    }

    contentParts.push({
      type: 'text',
      text: `
**Opdracht:**
Stel de narrative-secties op van een volwaardig gap-analyse rapport (target: 12-15 PDF-pagina's totaal incl. detailed findings). Schrijf in de toon van een ervaren ISO 27001 Lead Auditor — substantieel maar overzichtelijk, met bullet-lists waar passend, niet 1 lap tekst.

⚠️ **BELANGRIJK**: \`detailed_findings\` (individuele control-bevindingen, ~70 stuks) worden NIET door jou gegenereerd — die worden lokaal samengesteld uit \`auditor_findings\` (1-op-1, geen LLM-tussenkomst). Concentreer je uitsluitend op de narrative-secties hieronder.

Geef **ALLEEN JSON** terug (geen markdown-codeblock, geen uitleg buiten de JSON) in exact dit schema:
\`\`\`
{
  "executive_summary": "8-12 zinnen substantieel: (1) wie is de klant + scope, (2) wat is beoordeeld + methodologie, (3) overall maturity-oordeel met getal/range, (4) 3-4 zwaartepunten uit bevindingen, (5) waar staat de klant t.o.v. certificering-readiness, (6) advies vervolgstap. Auditor-stijl, geen marketing.",
  "scope_methodology": "6-10 zinnen: scope (welke locaties/processen/IT-assets), audit-type (gap-analyse pre-certification), referenties (ISO/IEC 27001:2022 + Annex A controls + relevante clausules 4-10), sample-based assessment-methode, evidence-bronnen (klant-zelfassessment + uploads + bewijsstukken), beperkingen (geen verificatie ter plaatse, point-in-time). Maak helder dat dit geen geaccrediteerde certificatie-audit is.",
  "score_summary": "8-12 zinnen + bullets indien zinnig: overall % met interpretatie, sector-mediaan-vergelijking met richting (boven/onder), volwassenheids-niveau (Initial/Managed/Defined/etc.), verdeling critical/major/minor/observation, sterke gebieden (specifieke control-IDs), zwakke gebieden (specifieke control-IDs).",
  "findings_by_category": {
    "Governance & beleid (A.5)": "5-8 zinnen analyse + bullet-list met 3-5 kern-observaties (gebaseerd op A.5-bevindingen). Patronen, geen losse details.",
    "Personeel (A.6)": "5-8 zinnen + bullets, A.6-bevindingen",
    "Fysiek & assets (A.7)": "5-8 zinnen + bullets, A.7-bevindingen",
    "Technische controls (A.8)": "5-8 zinnen + bullets, A.8-bevindingen",
    "Operationeel (Clausules 4-10)": "5-8 zinnen + bullets, ISMS-clausule bevindingen + cross-control thema's"
  },
  "top_priorities": ["Prioriteit 1: actie-statement", "Prioriteit 2: ...", "Prioriteit 3: ...", "Prioriteit 4: ...", "Prioriteit 5: ...", "Prioriteit 6: ...", "Prioriteit 7: ..."],
  "lead_auditor_opinion": "6-9 zinnen Lead Auditor verdict — persoonlijk, eerlijk. Welke kant gaat het op (gunstig/lastig pad richting certificering), wat zou je adviseren als deze klant morgen een Stage 1-audit zou ondergaan, wat is het grootste risico op afkeuring, wat is het belangrijkste verbeterpunt. Schrijf alsof je naast de klant zit.",
  "conclusion": "5-7 zinnen afsluiting: samenvatting van de positie, realistisch pad naar Stage 1/Stage 2 certificering, geschatte doorlooptijd voor remediatie (in maanden, niet uren), aanbevolen vervolgstap (intern, pre-audit, certificatie).",
  "disclosure": "Dit rapport is opgesteld door Lead Auditor, met AI-geassisteerde analyse van uw bewijsvoering. (1 zin, formeel)"
}
\`\`\`

**Schrijfstijl-vereisten:**
- Gebruik **bullet-lists** binnen secties waar het de leesbaarheid verbetert. Markdown: \`- item\` per regel. Lead-zin → bullets → afsluitende zin.
- Refereer naar specifieke control-IDs (bv. "Op A.5.30 en A.5.32 ontbreekt..."). Geen generieke uitspraken.
- Top-prioriteiten: kies uit critical/major bevindingen hierboven, formuleer als concrete actie-statement.
- Geen losse \`detailed_findings\`-array in je response — die slaan we over.
- Schrijf in vloeiend Nederlands, "u"-vorm, persoonlijk maar professioneel.`
    });

    // DNV-CORPUS is intentioneel UITGESCHAKELD — veroorzaakte WORKER_RESOURCE_LIMIT op Supabase
    // Edge Functions (2s CPU-budget). De auditor-bevindingen zijn al methodologie-conform; het
    // rapport hoeft enkel geformatteerd te worden. DNV-stijl-cues staan ingebakken in systemStyle.
    // Re-enabling vereist een herontwerp (DB-cached corpus, of move naar background-worker).

    const systemStyle = `Je bent onze Lead Auditor, ervaren ISO 27001 Lead Auditor gecertificeerd via DNV. Je stijl: direct, bewijsgericht, geen consultancy-jargon. Je schrijft in vloeiend Nederlands met concrete voorbeelden. Je benoemt gaps expliciet maar constructief.

DNV-methodiek (kort): steekproefneming · evidence-gebaseerde conclusies · scheiding tussen observatie en aanbeveling · severity-classificatie IRCA-conform (Critical NC, Major NC, Minor NC, Observation/OFI) · scope-disclaimer expliciet. Doel: klant klaarstomen voor een formele certificeringsaudit bij een geaccrediteerde instelling (DNV, BSI, LRQA, TÜV).

Belangrijk:
- Nooit verzinnen wat er in evidence staat — alleen rapporteren wat je werkelijk ziet/leest.
- Bij ontbrekende evidence: markeer expliciet als "geen evidence aangeleverd".
- Houd toon persoonlijk: gebruik "u" (niet "je") naar klant toe, en schrijf alsof je naast ze zit.
- Lengte: executive summary 3-5 zinnen, findings per categorie 2-4 zinnen.
- **detailed_findings**: neem ELKE auditor-bevinding 1-op-1 over (severity + finding-tekst + recommendation). Filter ze NIET, beperk NIET tot 10-15. Alle door Lead Auditor gevalideerde bevindingen horen in het rapport.
- Severity-mapping naar status veld: \`critical\` → \`critical\` · \`major\` → \`gap\` · \`minor\`/\`info\` → \`ok\` (lichte observation/OFI) — maar de finding-tekst en recommendation 1-op-1 van auditor.`;

    const systemBlocks: any[] = [{ type: 'text', text: systemStyle }];

    // AbortController zodat we falen-fast bij Anthropic-trage respons (i.p.v. WORKER_RESOURCE_LIMIT)
    // 90s is voldoende sinds detailed_findings lokaal worden samengesteld (geen LLM-overhead)
    const controller = new AbortController();
    const abortTimer = setTimeout(() => controller.abort(), 90000);

    // Call Anthropic
    let anthropicResp: Response;
    try {
      anthropicResp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': ANTHROPIC_KEY,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          max_tokens: 3000, // findings worden lokaal gegenereerd; LLM hoeft alleen narrative te schrijven
          system: systemBlocks,
          messages: [{ role: 'user', content: contentParts }]
        }),
        signal: controller.signal
      });
    } catch (e) {
      clearTimeout(abortTimer);
      if ((e as any).name === 'AbortError') {
        return new Response(JSON.stringify({ error: 'Anthropic-call duurde >90s — server-side timeout. Probeer opnieuw of split het rapport per categorie.' }), { status: 504, headers });
      }
      throw e;
    }
    clearTimeout(abortTimer);

    if (!anthropicResp.ok) {
      const errText = await anthropicResp.text();
      console.error('Anthropic error:', anthropicResp.status, errText);
      // Herken specifieke errors en geef helder bericht zodat UI-toast info heeft
      let userMessage = `Anthropic API ${anthropicResp.status}`;
      if (/credit balance is too low/i.test(errText)) {
        userMessage = 'Anthropic-tegoed op — laad bij op https://console.anthropic.com/settings/billing';
      } else if (/prompt is too long|context.*too.*long|maximum context length/i.test(errText)) {
        userMessage = 'Prompt te lang — te veel bevindingen + evidence in 1 call. Reduceer evidence (PDFs) of split het rapport.';
      } else if (anthropicResp.status === 429) {
        userMessage = 'Anthropic rate-limit — wacht 60s en probeer opnieuw.';
      } else if (anthropicResp.status === 401 || anthropicResp.status === 403) {
        userMessage = 'Anthropic API-key ongeldig — check secret ANTHROPIC_API_KEY in Supabase.';
      }
      return new Response(JSON.stringify({ error: userMessage, detail: errText.slice(0, 500), anthropic_status: anthropicResp.status }), { status: 502, headers });
    }

    const anthropicData = await anthropicResp.json();
    const rawText = anthropicData.content?.[0]?.text || '';

    // Parse JSON from response — alleen narrative-secties, detailed_findings stellen we lokaal samen
    let sections: ReportSections;
    try {
      const start = rawText.indexOf('{');
      const end = rawText.lastIndexOf('}') + 1;
      sections = JSON.parse(rawText.slice(start, end));
    } catch (e) {
      return new Response(JSON.stringify({ error: 'JSON-parse mislukt', raw: rawText.slice(0, 1000) }), { status: 500, headers });
    }

    // Lokaal samenstellen van detailed_findings uit auditor_findings (geen LLM-tussenkomst).
    // Bespaart ~70% van de prompt-tokens, ~50% wall-clock, en garandeert dat bevindingen letterlijk overkomen.
    const sevToStatus: Record<string, string> = {
      critical: 'critical',
      major: 'gap',
      minor: 'ok',
      info: 'ok',
      observation: 'ok'
    };
    sections.detailed_findings = (findings || []).map((f: any) => {
      const ctrlId = String(f.control_id || '');
      const ev = evidencePerControl[ctrlId] || [];
      const ctrl = controlMap[ctrlId];
      const klantQuote = ctrl?.note ? String(ctrl.note).slice(0, 200) : '';
      return {
        control_id: ctrlId,
        status: sevToStatus[String(f.severity || '').toLowerCase()] || 'ok',
        finding: String(f.finding || ''),
        recommendation: String(f.recommendation || ''),
        evidence_referenced: ev,
        klant_quote: klantQuote
      };
    }).sort((a, b) => a.control_id.localeCompare(b.control_id, undefined, { numeric: true }));

    const usage = anthropicData.usage || {};
    const inputTokens = usage.input_tokens || 0;
    const cacheCreate = usage.cache_creation_input_tokens || 0;
    const cacheRead = usage.cache_read_input_tokens || 0;
    const outputTokens = usage.output_tokens || 0;
    // Opus 4.5 pricing: input $15/M · cache-create $18.75/M · cache-read $1.50/M · output $75/M
    const costUsd = Math.round(
      ((inputTokens * 15 + cacheCreate * 18.75 + cacheRead * 1.5 + outputTokens * 75) / 1000000) * 10000
    ) / 10000;
    console.log(`Usage: in=${inputTokens} cache_create=${cacheCreate} cache_read=${cacheRead} out=${outputTokens} cost=$${costUsd}`);

    // Insert draft
    const { data: inserted, error: insErr } = await sb.from('report_drafts').insert({
      user_id: targetUserId,
      order_id: order?.id || null,
      status: 'draft',
      sections,
      model: MODEL,
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      cost_usd: costUsd,
      generated_by: adminUser.id
    }).select('id').maybeSingle();

    if (insErr) {
      return new Response(JSON.stringify({ error: 'DB-insert mislukt: ' + insErr.message }), { status: 500, headers });
    }

    return new Response(JSON.stringify({
      ok: true,
      draft_id: inserted?.id,
      sections,
      meta: {
        model: MODEL,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        cost_usd: costUsd,
        evidence_images_used: imageFiles.length,
        evidence_pdfs_used: pdfFiles.length,
        evidence_files_total: evidenceFiles.length
      }
    }), { headers });

  } catch (err) {
    console.error('generate-report error:', err);
    return new Response(JSON.stringify({ error: String((err as Error).message || err) }), { status: 500, headers });
  }
});
