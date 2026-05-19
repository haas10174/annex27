// Supabase Edge Function: generate-findings-draft
// Genereert PER CONTROL een AI-concept-bevinding op basis van alle klant-input
// + alle geuploade evidence (images native, PDF native, DOCX/XLSX/TXT/MD/CSV tekst).
//
// Flow:
//   1. Auth: admin/auditor JWT
//   2. Body: { user_id, only_pending?: bool, dry_run?: bool }
//   3. Fetch klant: gap_analyse.answers + gap_control_notes + evidence-storage tree
//   4. Filter relevante controls (heeft antwoord OF evidence OF toelichting)
//   5. Per control: build multimodal prompt + Claude call (parallel batch van 10)
//   6. Upsert in auditor_findings_draft (unique user_id+control_id)
//   7. Return summary { total, generated, skipped, failed, controls: [...] }
//
// Secrets: ANTHROPIC_API_KEY
// Deploy: npx supabase functions deploy generate-findings-draft --project-ref tvqhxhoohzdzekcfzjuv

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
// DOCX en XLSX via JSZip + handmatige XML-regex extractie. Mammoth/sheetjs bundles
// faalden op Deno Deploy (node-specifieke deps); JSZip is Deno-vriendelijk.
import JSZip from 'https://esm.sh/jszip@3.10.1';

// Extract text uit DOCX (Open Office XML). Pakt alle <w:t>-elementen uit word/document.xml.
async function extractDocxText(buf: ArrayBuffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  const docFile = zip.file('word/document.xml');
  if (!docFile) return '';
  const xml = await docFile.async('text');
  const out: string[] = [];
  const re = /<w:t[^>]*>([\s\S]*?)<\/w:t>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) {
    if (m[1]) out.push(m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"));
  }
  return out.join(' ');
}

// Extract text uit XLSX. Joinpt sharedStrings + alle sheets als CSV per sheet.
async function extractXlsxText(buf: ArrayBuffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  const sharedFile = zip.file('xl/sharedStrings.xml');
  const shared: string[] = [];
  if (sharedFile) {
    const sxml = await sharedFile.async('text');
    const re = /<t[^>]*>([\s\S]*?)<\/t>/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(sxml)) !== null) shared.push(m[1] || '');
  }
  const sheetNames = Object.keys(zip.files).filter(n => /^xl\/worksheets\/sheet\d+\.xml$/i.test(n)).sort();
  const blocks: string[] = [];
  for (const sn of sheetNames) {
    const sheetXml = await zip.file(sn)!.async('text');
    const rows = sheetXml.split(/<\/row>/);
    const sheetCsv: string[] = [];
    for (const row of rows) {
      const cells = row.match(/<c[^>]*>[\s\S]*?<\/c>/g) || [];
      const vals = cells.map(c => {
        const isShared = /\bt="s"/.test(c);
        const vMatch = c.match(/<v[^>]*>([\s\S]*?)<\/v>/);
        if (!vMatch) return '';
        if (isShared) {
          const idx = parseInt(vMatch[1], 10);
          return shared[idx] || '';
        }
        return vMatch[1];
      });
      if (vals.some(v => v)) sheetCsv.push(vals.join(','));
    }
    if (sheetCsv.length) blocks.push(`[Sheet ${sn.replace(/^xl\/worksheets\//, '').replace(/\.xml$/, '')}]\n${sheetCsv.join('\n')}`);
  }
  return blocks.join('\n\n');
}

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

const MODEL = 'claude-opus-4-5';
const CONCURRENCY = 18;             // max parallel Claude calls (Opus tier-1 = 50 RPM, blijf onder)
const MAX_PDF_BYTES = 25_000_000;   // 25MB per PDF
const MAX_IMAGE_BYTES = 4_500_000;  // 4.5MB per image
const MAX_TEXT_BYTES = 500_000;     // 500KB per text-extract (raw of uit docx/xlsx)
const MAX_PDFS_PER_CTRL = 4;
const MAX_IMAGES_PER_CTRL = 6;
const MAX_TEXT_FILES_PER_CTRL = 4;

const cmmiLabel: Record<string, string> = {
  '0': 'Niet / Nee',
  '1': 'Beperkt / Gepland',
  '2': 'Deels / In ontwikkeling',
  '3': 'Grotendeels / Geïmplementeerd',
  '4': 'Volledig / Ja / Geoptimaliseerd',
  'nvt': 'Niet van toepassing',
};

// Chunked base64 (spread-trick faalt > ~120KB)
function bufToB64(buf: ArrayBuffer): string {
  const bytes = new Uint8Array(buf);
  const chunk = 0x8000;
  let bin = '';
  for (let i = 0; i < bytes.length; i += chunk) bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  return btoa(bin);
}

interface EvidenceFile { name: string; path: string; size: number; }
interface ControlContext {
  control_id: string;
  sub_answers: { q_index: number; value: string; label: string }[];
  avg_score: number | null;
  all_nvt: boolean;
  claimed: boolean;
  note: { procedure_naam?: string; locatie?: string; eigenaar?: string; laatst_gereviewd?: string; toelichting?: string } | null;
  evidence: EvidenceFile[];
}

interface DraftFinding {
  control_id: string;
  severity: 'observation' | 'minor' | 'major' | 'critical';
  finding: string;
  recommendation: string;
  evidence_cited: string[];
  evidence_assessment: string;
  confidence: number;
  reasoning: string;
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const headers = { ...cors(origin), 'Content-Type': 'application/json' };
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors(origin) });
  if (req.method !== 'POST') return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });

    const supaUser = createClient(
      Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user: adminUser } } = await supaUser.auth.getUser();
    if (!adminUser) return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    const role = adminUser.app_metadata?.role;
    const pkt = adminUser.app_metadata?.pakket;
    if (role !== 'auditor' && pkt !== 'admin') {
      return new Response(JSON.stringify({ error: 'Geen rechten' }), { status: 403, headers });
    }

    const body = await req.json().catch(() => ({}));
    const targetUserId = String(body.user_id || '').trim();
    const onlyPending = body.only_pending !== false; // default: skip controls die al een draft hebben
    const dryRun = body.dry_run === true;
    // Chunking om gateway-timeout te vermijden (60s limit). UI loopt door tot more=false.
    const offset = Math.max(0, parseInt(String(body.offset || 0), 10) || 0);
    const limit = Math.min(40, Math.max(1, parseInt(String(body.limit || 20), 10) || 20));
    if (!targetUserId) return new Response(JSON.stringify({ error: 'user_id verplicht' }), { status: 400, headers });

    const ANTHROPIC_KEY = Deno.env.get('ANTHROPIC_API_KEY');
    if (!ANTHROPIC_KEY) return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY niet geconfigureerd' }), { status: 500, headers });

    const sb = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // ── Klant data ──
    const { data: { user: klant }, error: userErr } = await sb.auth.admin.getUserById(targetUserId);
    if (userErr || !klant) return new Response(JSON.stringify({ error: 'Klant niet gevonden' }), { status: 404, headers });
    const klantSector = klant.user_metadata?.sector || klant.user_metadata?.sectorLabel || 'Algemeen';
    const klantBedrijf = klant.user_metadata?.bedrijf || '';

    // ── Gap-antwoorden ──
    const { data: gapRow } = await sb.from('gap_analyse').select('answers').eq('user_id', targetUserId).maybeSingle();
    const rawAnswers: Record<string, any> = gapRow?.answers || {};

    // ── Notes (gestructureerd) ──
    const { data: notesRows } = await sb.from('gap_control_notes')
      .select('control_id, procedure_naam, locatie, eigenaar, laatst_gereviewd, toelichting')
      .eq('klant_user_id', targetUserId);
    const notesMap: Record<string, ControlContext['note']> = {};
    for (const n of (notesRows || [])) notesMap[n.control_id] = n;

    // ── Bestaande drafts (om te skippen indien onlyPending) ──
    const { data: existingDrafts } = await sb.from('auditor_findings_draft')
      .select('control_id, status').eq('user_id', targetUserId);
    const existingSet = new Set<string>((existingDrafts || []).filter(d => d.status === 'pending' || d.status === 'accepted').map(d => d.control_id));

    // ── Learning few-shot: pak recent geaccepteerde/aangepaste feedback voor deze controls ──
    // Per control max 2 voorbeelden, gesorteerd op recency. We groeperen op control_id zodat
    // generateDraftForControl ze direct kan opzoeken.
    const { data: feedbackRows } = await sb.from('auditor_feedback')
      .select('control_id, final_severity, final_finding, final_recommendation, action, klant_sector, created_at')
      .in('action', ['accepted', 'edited'])
      .order('created_at', { ascending: false })
      .limit(200);
    const fewShotByControl: Record<string, any[]> = {};
    for (const f of (feedbackRows || [])) {
      if (!fewShotByControl[f.control_id]) fewShotByControl[f.control_id] = [];
      if (fewShotByControl[f.control_id].length < 2) fewShotByControl[f.control_id].push(f);
    }

    // ── Bouw controlMap uit answers ──
    const controlMap: Record<string, ControlContext> = {};
    for (const [key, raw] of Object.entries(rawAnswers)) {
      const value = String(raw);
      if (key.startsWith('evidence_notes_')) continue;
      const m = key.match(/^([A-C]\.\d+\.?\d*)_(\d+)$/);
      if (!m) continue;
      const ctrlId = m[1];
      const qIdx = parseInt(m[2], 10);
      if (!controlMap[ctrlId]) {
        controlMap[ctrlId] = { control_id: ctrlId, sub_answers: [], avg_score: null, all_nvt: false, claimed: false, note: null, evidence: [] };
      }
      controlMap[ctrlId].sub_answers.push({ q_index: qIdx, value, label: cmmiLabel[value] || value });
    }
    for (const c of Object.values(controlMap)) {
      const num = c.sub_answers.filter(s => s.value !== 'nvt').map(s => parseInt(s.value, 10)).filter(n => !isNaN(n));
      c.avg_score = num.length ? Math.round((num.reduce((a, b) => a + b, 0) / num.length) * 10) / 10 : null;
      c.all_nvt = c.sub_answers.length > 0 && c.sub_answers.every(s => s.value === 'nvt');
      c.claimed = num.length ? Math.max(...num) >= 2 : false;
      c.note = notesMap[c.control_id] || null;
    }
    // Voeg controls toe die alleen note hebben (geen antwoorden) — kan voorkomen
    for (const ctrlId of Object.keys(notesMap)) {
      if (!controlMap[ctrlId]) {
        controlMap[ctrlId] = { control_id: ctrlId, sub_answers: [], avg_score: null, all_nvt: false, claimed: false, note: notesMap[ctrlId], evidence: [] };
      }
    }

    // ── Evidence per control ──
    const { data: ctrlFolders } = await sb.storage.from('evidence').list(targetUserId, { limit: 200 });
    for (const folder of (ctrlFolders || [])) {
      if (!folder.name) continue;
      const ctrlId = folder.name;
      const { data: files } = await sb.storage.from('evidence').list(`${targetUserId}/${ctrlId}`, { limit: 30 });
      if (!files) continue;
      const list: EvidenceFile[] = [];
      for (const f of files) {
        if (!f.name || f.id === null) continue;
        list.push({ name: f.name, path: `${targetUserId}/${ctrlId}/${f.name}`, size: (f as any).metadata?.size || 0 });
      }
      if (!controlMap[ctrlId]) {
        controlMap[ctrlId] = { control_id: ctrlId, sub_answers: [], avg_score: null, all_nvt: false, claimed: false, note: null, evidence: [] };
      }
      controlMap[ctrlId].evidence = list;
    }

    // ── Filter actieve controls ──
    const allActive = Object.values(controlMap).filter(c => {
      if (c.all_nvt) return false;
      const hasAnswer = c.sub_answers.length > 0 && !c.all_nvt;
      const hasEvidence = c.evidence.length > 0;
      const hasNote = !!(c.note && (c.note.procedure_naam || c.note.toelichting || c.note.locatie));
      return hasAnswer || hasEvidence || hasNote;
    }).filter(c => onlyPending ? !existingSet.has(c.control_id) : true)
      .sort((a, b) => a.control_id.localeCompare(b.control_id, undefined, { numeric: true }));
    // Chunking: process slechts `limit` controls per request om gateway-timeout (60s) te vermijden.
    // UI roept in lus opnieuw aan met opgehoogde `offset` tot more=false.
    const activeControls = allActive.slice(offset, offset + limit);
    const totalActive = allActive.length;
    const more = offset + limit < totalActive;

    if (dryRun) {
      return new Response(JSON.stringify({
        dry_run: true,
        total_klant_controls: Object.keys(controlMap).length,
        active_controls: totalActive,
        chunk_size: activeControls.length,
        offset,
        more,
        controls_preview: activeControls.slice(0, 20).map(c => ({
          control_id: c.control_id,
          sub_answers: c.sub_answers.length,
          evidence_files: c.evidence.length,
          has_note: !!c.note,
        })),
      }), { headers });
    }

    // ── Genereer drafts parallel ──
    const results: DraftFinding[] = [];
    const failures: { control_id: string; error: string }[] = [];

    async function processOne(ctrl: ControlContext): Promise<void> {
      try {
        const fewShot = fewShotByControl[ctrl.control_id] || [];
        const draft = await generateDraftForControl(ctrl, klantSector, klantBedrijf, sb, ANTHROPIC_KEY, fewShot);
        results.push(draft);
      } catch (e) {
        failures.push({ control_id: ctrl.control_id, error: String(e?.message || e) });
      }
    }

    for (let i = 0; i < activeControls.length; i += CONCURRENCY) {
      const batch = activeControls.slice(i, i + CONCURRENCY);
      await Promise.all(batch.map(processOne));
    }

    // ── Upsert results ──
    if (results.length) {
      const rows = results.map(r => ({
        user_id: targetUserId,
        control_id: r.control_id,
        severity: r.severity,
        finding: r.finding,
        recommendation: r.recommendation,
        evidence_cited: r.evidence_cited,
        evidence_assessment: r.evidence_assessment,
        confidence: r.confidence,
        reasoning: r.reasoning,
        model_version: MODEL,
        status: 'pending',
      }));
      const { error: upErr } = await sb.from('auditor_findings_draft').upsert(rows, { onConflict: 'user_id,control_id' });
      if (upErr) console.warn('upsert error', upErr);
    }

    return new Response(JSON.stringify({
      ok: true,
      total: totalActive,
      processed: activeControls.length,
      generated: results.length,
      failed: failures.length,
      failures: failures.slice(0, 20),
      offset,
      next_offset: offset + activeControls.length,
      more,
    }), { headers });
  } catch (e) {
    console.error('generate-findings-draft error', e);
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500, headers: { ...cors(req.headers.get('origin')), 'Content-Type': 'application/json' } });
  }
});

// ─────────────────────────────────────────────────────────────────────────
// Per-control Claude call
// ─────────────────────────────────────────────────────────────────────────
async function generateDraftForControl(
  ctrl: ControlContext,
  sector: string,
  bedrijf: string,
  sb: ReturnType<typeof createClient>,
  apiKey: string,
  fewShot: any[] = [],
): Promise<DraftFinding> {
  // Selecteer evidence
  const images = ctrl.evidence.filter(f => /\.(jpe?g|png|webp)$/i.test(f.name) && f.size < MAX_IMAGE_BYTES).slice(0, MAX_IMAGES_PER_CTRL);
  const pdfs = ctrl.evidence.filter(f => /\.pdf$/i.test(f.name) && f.size < MAX_PDF_BYTES).slice(0, MAX_PDFS_PER_CTRL);
  const docs = ctrl.evidence.filter(f => /\.(txt|md|csv|json|docx|xlsx)$/i.test(f.name)).slice(0, MAX_TEXT_FILES_PER_CTRL);
  const skippedDocs = ctrl.evidence.filter(f => /\.(pptx|doc|xls)$/i.test(f.name));

  // Bouw klant-context tekst
  const subAns = ctrl.sub_answers.map(s => `  Q${s.q_index + 1}: ${s.value} (${s.label})`).join('\n');
  const noteStr = ctrl.note ? `
Klant-toelichting:
- Procedure/document: ${ctrl.note.procedure_naam || '—'}
- Locatie: ${ctrl.note.locatie || '—'}
- Eigenaar: ${ctrl.note.eigenaar || '—'}
- Laatst gereviewd: ${ctrl.note.laatst_gereviewd || '—'}
- Eigen woorden: ${(ctrl.note.toelichting || '').slice(0, 2000)}` : '\nKlant-toelichting: (geen)';

  const contentParts: any[] = [];
  contentParts.push({
    type: 'text',
    text: `Je beoordeelt control ${ctrl.control_id} voor ${bedrijf || 'een organisatie'} (sector: ${sector}).

Klant-antwoorden (CMMI 0-4 schaal):
${subAns || '  (geen — alleen evidence of toelichting beschikbaar)'}
Gemiddelde score: ${ctrl.avg_score ?? 'n.v.t.'}
${noteStr}

Geleverde bewijsstukken: ${ctrl.evidence.length} bestand(en).
${images.length ? `Afbeeldingen (${images.length}): ${images.map(f => f.name).join(', ')}` : ''}
${pdfs.length ? `PDFs (${pdfs.length}): ${pdfs.map(f => f.name).join(', ')}` : ''}
${docs.length ? `Documenten (${docs.length}): ${docs.map(f => f.name).join(', ')}` : ''}

Hieronder volgt de inhoud van de bewijsstukken (afbeeldingen, PDFs als documenten, tekstuele documenten als geëxtraheerde tekst).`,
  });

  // Images → multimodal
  for (const img of images) {
    try {
      const { data: blob } = await sb.storage.from('evidence').download(img.path);
      if (!blob) continue;
      const buf = await blob.arrayBuffer();
      const b64 = bufToB64(buf);
      const media = img.name.match(/\.png$/i) ? 'image/png' : img.name.match(/\.webp$/i) ? 'image/webp' : 'image/jpeg';
      contentParts.push({ type: 'text', text: `\n— Afbeelding: ${img.name} —` });
      contentParts.push({ type: 'image', source: { type: 'base64', media_type: media, data: b64 } });
    } catch (e) { console.warn('img fail', img.path, e); }
  }

  // PDFs → multimodal document
  for (const pdf of pdfs) {
    try {
      const { data: blob } = await sb.storage.from('evidence').download(pdf.path);
      if (!blob) continue;
      const b64 = bufToB64(await blob.arrayBuffer());
      contentParts.push({ type: 'text', text: `\n— PDF: ${pdf.name} —` });
      contentParts.push({ type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: b64 } });
    } catch (e) { console.warn('pdf fail', pdf.path, e); }
  }

  // Tekstuele bestanden inlezen — plain-text direct, docx/xlsx via JSZip-extractie
  for (const doc of docs) {
    try {
      const { data: blob } = await sb.storage.from('evidence').download(doc.path);
      if (!blob) continue;
      let text = '';
      if (/\.docx$/i.test(doc.name)) {
        text = await extractDocxText(await blob.arrayBuffer());
      } else if (/\.xlsx$/i.test(doc.name)) {
        text = await extractXlsxText(await blob.arrayBuffer());
      } else {
        text = await blob.text();
      }
      if (!text) continue;
      if (text.length > MAX_TEXT_BYTES) text = text.slice(0, MAX_TEXT_BYTES) + '\n…(afgekapt)';
      contentParts.push({ type: 'text', text: `\n— Document: ${doc.name} —\n\`\`\`\n${text}\n\`\`\`` });
    } catch (e) { console.warn('doc fail', doc.path, e); }
  }

  // Onverwerkte formaten (docx/xlsx/etc) — alleen filenames noemen
  if (skippedDocs.length) {
    contentParts.push({ type: 'text', text: `\n*Niet-ingelezen bestanden (formaat nog niet ondersteund): ${skippedDocs.map(f => f.name).join(', ')}*` });
  }

  // Output-schema
  contentParts.push({
    type: 'text',
    text: `

**Opdracht:** Beoordeel deze ene control op basis van DRIE GELIJKWAARDIGE bronnen:
1. **Klant-antwoorden** op de sub-vragen (CMMI 0-4 schaal) — wat zegt de klant zelf?
2. **Klant-toelichting** (proces in eigen woorden) — beschrijft de klant een geldig werkend proces?
3. **Geuploade evidence** (PDFs, images, documenten) — formele onderbouwing van het proces.

Geef terug **alleen JSON** (geen markdown-fence) in dit schema:
\`\`\`json
{
  "severity": "observation|minor|major|critical",
  "finding": "Lead-zin (max 25 woorden) over de status van deze control.\\n\\n**Geconstateerd:**\\n- Eerste concrete observatie met versie/datum/scope-detail.\\n- Tweede observatie, bv. ondertekening-status of scope-discrepantie.\\n- Derde observatie indien relevant.\\n\\n**Klant-onderbouwing:** Korte zin met letterlijk citaat tussen aanhalingstekens (max 150 tekens) waar relevant.",
  "recommendation": "Lead-zin met concrete actie.\\n\\n**Concreet uit te voeren:**\\n- Stap 1\\n- Stap 2\\n- Stap 3\\n\\n**Eigenaar + tijdslijn:** wie + wanneer.",
  "evidence_cited": ["filename.pdf"],
  "evidence_assessment": "Korte beoordeling van wat de evidence wel/niet aantoont (max 200 tekens).",
  "confidence": 0.85,
  "reasoning": "1-2 zinnen waarom deze severity. Vermeld expliciet hoe je de drie bronnen tegen elkaar afgewogen hebt."
}
\`\`\`

**Schrijfstijl voor finding/recommendation:**
- **Niet:** één doorlopende paragraaf met "het document X heeft status Y, geen handtekening, geen eigenaar, geen reviewdatum, refereert aan A.B.C, …"
- **Wel:** beknopte lead-zin → bullet-list van observaties → korte klant-onderbouwing met quote.
- Bullets beginnen met `-` (markdown), labels in `**bold**`. Renderer zet om naar opsomming.
- Lead-zin moet stand-alone leesbaar zijn — geen "Het document toont dat..." maar "Beleid niet formeel goedgekeurd door directie."
- Klant-quote tussen "" (aanhalingstekens), max 150 tekens, alleen letterlijk uit toelichting.

**Severity-rubric (IRCA-conform, weegt ALLE drie bronnen):**

| Beeld over alle 3 bronnen | Severity |
|---|---|
| Klant antwoordt Geïmplementeerd/Volledig én toelichting beschrijft werkend proces én evidence ondersteunt | **observation** (OFI — lichte verbetersuggestie) |
| 2 van 3 bronnen sterk, 1 zwak (bv. evidence verouderd of toelichting kort) | **observation** of **minor** afhankelijk van risicobetekenis |
| Aanwezig maar single lapse: verouderde versie / missende review-cycle / scope deels ontbrekend | **minor** |
| 2 of meer bronnen zwak: lage CMMI én concept-status én geen formele ondertekening | **major** |
| Fundamenteel afwezig: CMMI=0, geen toelichting, geen evidence | **critical** |

**Hard-vereisten:**
1. **Weeg de drie bronnen evenwichtig.** Een klant die alle sub-vragen Geïmplementeerd antwoordt + toelichting geeft + relevant document uploadt verdient \`observation\`, niet \`major\` — ook al ontbreekt een specifieke ondertekening-handtekening op pagina 1. De versie-/ondertekening-meta in de PDF-header (bv. "Goedgekeurd door directie, ondertekend 2025-09-15") is **geldige evidence** van ondertekening, niet vereist als image-handtekening.
2. **Antwoorden tellen.** Hoge CMMI-scores (3-4) op alle sub-vragen + onderbouwende toelichting wegen zwaar — ook als evidence ontbreekt, kan severity blijven op \`minor\` (lapse op evidence-vereiste, niet op control zelf).
3. **PDF-inhoud lezen.** Refereer letterlijk aan wat je in de PDF zag: documentnummer, versie, ondertekening-status uit document-control, scope-paragraaf, review-datum.
4. **Klant-quote.** Quote klant-toelichting waar relevant in \`finding\`.
5. **Geen evidence ≠ automatisch major.** Bij ontbrekende evidence maar sterke CMMI + toelichting: minor (bewijsvoering verbeterpunt) ipv major.
6. \`confidence\` hoog (≥0.85) bij coherente 3 bronnen; laag (≤0.5) bij conflicterende signalen tussen bronnen.
7. \`evidence_cited\` bevat exact de bestandsnamen die je raadpleegde (case-sensitive).

Geef ALLEEN JSON terug.`,
  });

  // Few-shot: eerder door Lead Auditor goedgekeurde/aangepaste bevindingen voor dezelfde control
  // wordt aan het systeem-prompt toegevoegd zodat Claude leert van zijn vorige output-correcties.
  let systemPrompt = 'Je bent een ervaren ISO 27001 Lead Auditor (IRCA-gecertificeerd). Je beoordeelt per control de bewijsvoering van een MKB-klant en produceert een concept-bevinding die door een menselijke Lead Auditor wordt nagelezen voordat het rapport vrijgegeven wordt. Wees feitelijk, concreet, en verzin niets dat niet in evidence of klant-input staat.';
  if (fewShot.length > 0) {
    const examples = fewShot.slice(0, 2).map((f: any, i: number) => {
      return `\nVoorbeeld ${i + 1} (eerder door Lead Auditor ${f.action === 'edited' ? 'aangepast' : 'goedgekeurd'} voor ${ctrl.control_id}${f.klant_sector ? ` in sector "${f.klant_sector}"` : ''}):\n- Severity: ${f.final_severity}\n- Finding: ${String(f.final_finding || '').slice(0, 400)}\n- Aanbeveling: ${String(f.final_recommendation || '').slice(0, 300)}`;
    }).join('\n');
    systemPrompt += `\n\n**Stijlreferentie van Lead Auditor** (volg deze schrijfstijl en severity-kalibratie):${examples}`;
  }

  // Claude call. System-prompt als blocks met cache_control op het grote stuk (severity-rubric +
  // few-shot voorbeelden) zodat hetzelfde stuk niet 114x betaald wordt — 90% cost-besparing op
  // herhaling-tokens. Cache TTL = 5 min, dus zinvol bij batch-runs.
  const systemBlocks = [
    { type: 'text', text: systemPrompt, cache_control: { type: 'ephemeral' } },
  ];
  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      max_tokens: 1024,
      system: systemBlocks,
      messages: [{ role: 'user', content: contentParts }],
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`Anthropic API ${resp.status}: ${err.slice(0, 300)}`);
  }

  const json = await resp.json();
  const text = json.content?.[0]?.text || '';

  // Parse JSON (Claude returnt soms met inleiding — strip alles voor eerste { en na laatste })
  let parsed: any;
  const first = text.indexOf('{');
  const last = text.lastIndexOf('}');
  if (first === -1 || last === -1) throw new Error(`Geen JSON in response: ${text.slice(0, 200)}`);
  try {
    parsed = JSON.parse(text.slice(first, last + 1));
  } catch (e) {
    throw new Error(`JSON parse fout: ${String(e).slice(0, 200)}`);
  }

  // Normaliseer
  const sevRaw = String(parsed.severity || 'observation').toLowerCase();
  const sev: DraftFinding['severity'] = ['observation', 'minor', 'major', 'critical'].includes(sevRaw)
    ? sevRaw as DraftFinding['severity']
    : 'observation';

  return {
    control_id: ctrl.control_id,
    severity: sev,
    finding: String(parsed.finding || '').slice(0, 4000),
    recommendation: String(parsed.recommendation || '').slice(0, 2000),
    evidence_cited: Array.isArray(parsed.evidence_cited) ? parsed.evidence_cited.map(String).slice(0, 20) : [],
    evidence_assessment: String(parsed.evidence_assessment || '').slice(0, 600),
    confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0.5)),
    reasoning: String(parsed.reasoning || '').slice(0, 800),
  };
}
