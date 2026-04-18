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

const MODEL = 'claude-opus-4-5';
const MAX_EVIDENCE_IMAGES = 12; // limit om token-cost in toom te houden
const MAX_EVIDENCE_BYTES = 4_500_000; // 4.5MB per image (Anthropic limit = 5MB base64)

interface ReportSections {
  executive_summary: string;
  score_summary: string;
  findings_by_category: { [cat: string]: string };
  top_priorities: string[];
  detailed_findings: { control_id: string; status: string; finding: string; recommendation: string }[];
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

    // Fetch gap_analyse answers + findings
    const { data: gapRow } = await sb.from('gap_analyse').select('answers, updated_at').eq('user_id', targetUserId).maybeSingle();
    const answers = gapRow?.answers || {};

    const { data: findings } = await sb.from('auditor_findings').select('control_id, severity, finding, recommendation, reviewed_evidence').eq('user_id', targetUserId);

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

    // Select images (jpg/png) up to MAX_EVIDENCE_IMAGES for visual analysis
    const imageFiles = evidenceFiles.filter(f => /\.(jpe?g|png|webp)$/i.test(f.name) && f.size < MAX_EVIDENCE_BYTES).slice(0, MAX_EVIDENCE_IMAGES);
    const otherFiles = evidenceFiles.filter(f => !/\.(jpe?g|png|webp)$/i.test(f.name));

    // Build multimodal content for Claude
    const contentParts: any[] = [];

    // Add klant context text
    contentParts.push({
      type: 'text',
      text: `**Klantprofiel:**
- Naam: ${klantNaam}
- Bedrijf: ${klantBedrijf}
- Sector: ${klantSector}
- Order: ${order?.plan || 'onbekend'} (€${order?.amount || '?'}, betaald op ${order?.paid_at || '?'})

**Quickscan-antwoorden (30+ vragen):**
\`\`\`json
${JSON.stringify(answers, null, 2)}
\`\`\`

**Eerdere auditor-bevindingen (${findings?.length || 0}):**
\`\`\`json
${JSON.stringify(findings || [], null, 2)}
\`\`\`

**Overige bewijsvoering-bestanden (niet-image, filenames alleen):**
${otherFiles.map(f => `- ${f.name} (${Math.round(f.size/1024)}KB)`).join('\n') || '(geen)'}

**Image-bewijsvoering (${imageFiles.length} afbeeldingen meegezonden voor visuele analyse):**
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

    contentParts.push({
      type: 'text',
      text: `
**Opdracht:**
Stel een gap-analyse rapport op in de persoonlijke toon van een ervaren ISO 27001 Lead Auditor (je bent Raoul Haas). Analyseer de bewijsvoering zorgvuldig, benoem gaps expliciet, geef concrete aanbevelingen.

Geef **ALLEEN JSON** terug (geen markdown-codeblock, geen uitleg buiten de JSON) in exact dit schema:
\`\`\`
{
  "executive_summary": "3-5 zinnen persoonlijke samenvatting — auditor-stijl, geen marketingtaal",
  "score_summary": "Een paragraaf met overall status en sector-vergelijking",
  "findings_by_category": {
    "Governance & beleid": "Analyse + observatie in 2-4 zinnen",
    "Personeel": "...",
    "Fysiek & assets": "...",
    "Technische controls": "...",
    "Operationeel": "..."
  },
  "top_priorities": ["Prioriteit 1: ...", "Prioriteit 2: ...", "Prioriteit 3: ...", "Prioriteit 4: ...", "Prioriteit 5: ..."],
  "detailed_findings": [
    {"control_id": "A.5.1", "status": "gap|ok|critical", "finding": "wat heb je gezien in evidence", "recommendation": "concrete actie"},
    ...
  ],
  "disclosure": "Dit rapport is opgesteld door Lead Auditor Raoul Haas, met AI-geassisteerde analyse van uw bewijsvoering."
}
\`\`\`

Voor \`detailed_findings\`: baseer je alleen op Annex A controls waar je evidence voor zag of waar de klant een antwoord op gaf. Liever 10-15 gefundeerde bevindingen dan 93 oppervlakkige.`
    });

    // Load DNV RAG-corpus uit Supabase Storage (prompt-cached voor cost-savings)
    let dnvCorpus = '';
    let dnvExamen = '';
    try {
      const [corp, exam] = await Promise.all([
        sb.storage.from('rag-corpus').download('DNV-CORPUS.md'),
        sb.storage.from('rag-corpus').download('DNV-EXAMEN.md'),
      ]);
      if (corp.data) dnvCorpus = await corp.data.text();
      if (exam.data) dnvExamen = await exam.data.text();
    } catch (e) {
      console.warn('RAG-corpus load failed (continuing without):', e);
    }

    const systemStyle = `Je bent Raoul Haas, ervaren ISO 27001 Lead Auditor gecertificeerd via DNV. Je stijl: direct, bewijsgericht, geen consultancy-bullshit. Je schrijft in vloeiend Nederlands met concrete voorbeelden. Je benoemt gaps expliciet maar constructief. Je sluit aan bij de methodiek van DNV Training Auditor/Lead Auditor ISMS ISO 27001:2022 — steekproefneming, evidence-gebaseerde conclusies, scheiding tussen observatie en aanbeveling. Je rapport is bedoeld om de klant klaar te stomen voor een formele certificeringsaudit bij een geaccrediteerde instelling.

Belangrijk:
- Nooit verzinnen wat er in evidence staat — alleen rapporteren wat je werkelijk ziet/leest.
- Bij ontbrekende evidence: markeer expliciet als "geen evidence aangeleverd".
- Houd toon persoonlijk: gebruik "u" (niet "je") naar klant toe, en schrijf alsof je naast ze zit.
- Lengte: executive summary 3-5 zinnen, findings per categorie 2-4 zinnen, detailed_findings beperkt tot 10-15 meest relevante.
- Gebruik terminologie + methodologie zoals beschreven in de DNV-cursus die je hieronder als referentiemateriaal krijgt.`;

    // Structured system-messages met prompt caching voor RAG-corpus (dag-cache)
    const systemBlocks: any[] = [{ type: 'text', text: systemStyle }];
    if (dnvCorpus) {
      systemBlocks.push({
        type: 'text',
        text: '\n\n# DNV Cursus — Training Auditor / Lead Auditor ISMS ISO 27001:2022 (referentiemateriaal voor methodologie + stijl)\n\n' + dnvCorpus,
        cache_control: { type: 'ephemeral' }
      });
    }
    if (dnvExamen) {
      systemBlocks.push({
        type: 'text',
        text: '\n\n# DNV Proefexamen met Raoul\'s eigen aantekeningen (referentiemateriaal voor auditor-denktrant)\n\n' + dnvExamen,
        cache_control: { type: 'ephemeral' }
      });
    }

    // Call Anthropic
    const anthropicResp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 8000,
        system: systemBlocks,
        messages: [{ role: 'user', content: contentParts }]
      })
    });

    if (!anthropicResp.ok) {
      const errText = await anthropicResp.text();
      console.error('Anthropic error:', anthropicResp.status, errText);
      return new Response(JSON.stringify({ error: `Anthropic API ${anthropicResp.status}`, detail: errText.slice(0, 500) }), { status: 502, headers });
    }

    const anthropicData = await anthropicResp.json();
    const rawText = anthropicData.content?.[0]?.text || '';

    // Parse JSON from response
    let sections: ReportSections;
    try {
      const start = rawText.indexOf('{');
      const end = rawText.lastIndexOf('}') + 1;
      sections = JSON.parse(rawText.slice(start, end));
    } catch (e) {
      return new Response(JSON.stringify({ error: 'JSON-parse mislukt', raw: rawText.slice(0, 1000) }), { status: 500, headers });
    }

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
        evidence_files_total: evidenceFiles.length
      }
    }), { headers });

  } catch (err) {
    console.error('generate-report error:', err);
    return new Response(JSON.stringify({ error: String((err as Error).message || err) }), { status: 500, headers });
  }
});
