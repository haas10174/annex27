// ═════════════════════════════════════════════════════════════════
// Supabase Edge Function: evaluate-evidence
// ═════════════════════════════════════════════════════════════════
//
// Doel: bij elke bewijs-upload de RELEVANTIE van het bestand t.o.v. de
// gekoppelde control beoordelen via een LLM, en de score 0-1 opslaan in
// de evidence-tabel. Wordt gebruikt door de dashboard-audit-readiness-formule.
//
// Provider: Mistral AI (EU-hosted) - europe-west endpoint, GDPR-conform.
// Geen sub-processor-DPA-impact richting OpenAI/Anthropic-VS.
//
// Input:
//   {
//     evidence_id: uuid,         // id uit evidence-tabel
//     control_id:  string,       // bv. "A.5.1" of "C.4.1"
//     control_naam: string,      // bv. "Informatiebeveiligingsbeleid"
//     vraag: string,             // de vraag die werd gesteld bij upload
//     evidence_text: string,     // geëxtraheerde tekst uit bestand (PDF/DOCX/PNG)
//     evidence_meta?: {          // optionele meta voor context
//       filename?: string,
//       mime_type?: string,
//       toelichting?: string,    // klant-toelichting bij upload
//     }
//   }
//
// Output:
//   {
//     relevance_score: number,   // 0.0 tot 1.0
//     reasoning: string,         // 1-2 zin motivering voor klant
//     concerns: string[],        // 0-3 bullets met specifieke twijfels
//     model: string,             // gebruikte model-naam
//   }
//
// Vereiste env-vars:
//   - MISTRAL_API_KEY  (in Supabase Secrets te zetten)
//   - SUPABASE_URL
//   - SUPABASE_SERVICE_ROLE_KEY
//
// Status: SKELETON, niet getest. Deploy pas na:
//   1) MISTRAL_API_KEY in Supabase Secrets
//   2) Evidence-tabel met kolommen: relevance_score (numeric), relevance_reasoning (text),
//      relevance_concerns (jsonb), relevance_evaluated_at (timestamptz)
//   3) Privacyverklaring annex27.nl bijgewerkt (Mistral als sub-processor genoemd)

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';

const ALLOWED_ORIGINS = ['https://annex27.nl', 'https://www.annex27.nl'];
const MISTRAL_API = 'https://api.mistral.ai/v1/chat/completions';
const MISTRAL_MODEL = 'mistral-small-latest'; // ~€0.001 per call, voldoende voor relevance classificatie
const MAX_TEXT_LENGTH = 8000; // ~2000 tokens, ruim voor classificatie

function corsHeaders(origin: string | null) {
  const allowOrigin = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin',
  };
}

interface EvaluateInput {
  evidence_id: string;
  control_id: string;
  control_naam: string;
  vraag: string;
  evidence_text: string;
  evidence_meta?: {
    filename?: string;
    mime_type?: string;
    toelichting?: string;
  };
}

interface EvaluationResult {
  relevance_score: number;
  reasoning: string;
  concerns: string[];
  model: string;
}

function buildPrompt(input: EvaluateInput): { system: string; user: string } {
  const system = `Je bent een ISO 27001 / NIS2 / BIO audit-assistent. Je beoordeelt of een geüpload bewijs RELEVANT is voor een gestelde control en vraag.

Je geeft GEEN inhoudelijk oordeel of het bewijs "goed" of "fout" is - alleen of het over het juiste onderwerp gaat. De Lead Auditor doet de inhoudelijke beoordeling.

Geef ALTIJD een JSON-respons met exact deze structuur:
{
  "relevance_score": 0.0,
  "reasoning": "korte uitleg, maximaal 2 zinnen",
  "concerns": ["specifieke twijfel 1", "specifieke twijfel 2"]
}

relevance_score schaal:
  0.0 - 0.2 = niet relevant, bewijs gaat duidelijk over iets anders
  0.3 - 0.4 = grotendeels niet relevant, mogelijk een klein verband
  0.5      = onduidelijk, bewijs is te kort/vaag/algemeen om te beoordelen
  0.6 - 0.7 = grotendeels relevant, mogelijk niet volledig op punt
  0.8 - 1.0 = duidelijk relevant voor de gestelde control en vraag

Schrijf reasoning en concerns in het Nederlands.`;

  const truncatedText = input.evidence_text.length > MAX_TEXT_LENGTH
    ? input.evidence_text.slice(0, MAX_TEXT_LENGTH) + '\n[... tekst afgekapt voor analyse ...]'
    : input.evidence_text;

  const user = `Control: ${input.control_id} - ${input.control_naam}
Vraag: ${input.vraag}

${input.evidence_meta?.toelichting ? `Klant-toelichting bij de upload:\n${input.evidence_meta.toelichting}\n\n` : ''}Bestandsnaam: ${input.evidence_meta?.filename || '(onbekend)'}
Bestandstype: ${input.evidence_meta?.mime_type || '(onbekend)'}

Geëxtraheerde tekst uit het bestand:
---
${truncatedText}
---

Beoordeel of dit bewijs relevant is voor bovenstaande control en vraag. Geef alleen JSON terug, geen prefix of toelichting.`;

  return { system, user };
}

async function callMistral(prompt: { system: string; user: string }): Promise<EvaluationResult> {
  const apiKey = Deno.env.get('MISTRAL_API_KEY');
  if (!apiKey) throw new Error('MISTRAL_API_KEY niet geconfigureerd in Supabase Secrets');

  const resp = await fetch(MISTRAL_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MISTRAL_MODEL,
      messages: [
        { role: 'system', content: prompt.system },
        { role: 'user', content: prompt.user },
      ],
      temperature: 0.1, // laag voor consistente classificatie
      max_tokens: 400,
      response_format: { type: 'json_object' },
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`Mistral API ${resp.status}: ${errText.slice(0, 200)}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new Error('Mistral gaf lege response');

  let parsed: any;
  try {
    parsed = JSON.parse(content);
  } catch (e) {
    throw new Error(`Mistral response was geen geldige JSON: ${content.slice(0, 200)}`);
  }

  // Defensief: clamp score binnen 0-1, sanitize types
  const score = Math.max(0, Math.min(1, Number(parsed.relevance_score) || 0));
  const reasoning = String(parsed.reasoning || '').slice(0, 500);
  const concerns = Array.isArray(parsed.concerns)
    ? parsed.concerns.map((c: any) => String(c).slice(0, 200)).slice(0, 5)
    : [];

  return {
    relevance_score: score,
    reasoning,
    concerns,
    model: MISTRAL_MODEL,
  };
}

serve(async (req: Request) => {
  const origin = req.headers.get('origin');
  const headers = { ...corsHeaders(origin), 'Content-Type': 'application/json' };

  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(origin) });
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers });
  }
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Origin not allowed' }), { status: 403, headers });
  }

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Niet ingelogd' }), { status: 401, headers });
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: 'Ongeldige sessie' }), { status: 401, headers });
    }

    const input: EvaluateInput = await req.json();

    // Validatie
    if (!input.evidence_id || !input.control_id || !input.evidence_text) {
      return new Response(
        JSON.stringify({ error: 'evidence_id, control_id en evidence_text zijn verplicht' }),
        { status: 400, headers }
      );
    }
    if (input.evidence_text.length < 20) {
      // Te kort om te classificeren, geef defensieve middenscore
      return new Response(
        JSON.stringify({
          relevance_score: 0.5,
          reasoning: 'Bewijs te kort voor automatische beoordeling, Lead Auditor zal handmatig reviewen.',
          concerns: ['te weinig tekst'],
          model: 'fallback-min-length',
        }),
        { status: 200, headers }
      );
    }

    // Roep Mistral
    const prompt = buildPrompt(input);
    const result = await callMistral(prompt);

    // Sla resultaat op in evidence-tabel (kolommen moeten eerst gemaakt worden via migratie)
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { error: updateError } = await supabaseAdmin
      .from('evidence')
      .update({
        relevance_score: result.relevance_score,
        relevance_reasoning: result.reasoning,
        relevance_concerns: result.concerns,
        relevance_model: result.model,
        relevance_evaluated_at: new Date().toISOString(),
      })
      .eq('id', input.evidence_id);

    if (updateError) {
      console.error('Update evidence failed:', updateError);
      // Niet fataal voor de klant - geef wel het resultaat terug zodat UI kan doorgaan
    }

    return new Response(JSON.stringify(result), { status: 200, headers });

  } catch (err) {
    console.error('evaluate-evidence error:', err);
    return new Response(
      JSON.stringify({
        relevance_score: 0.5,
        reasoning: 'Automatische beoordeling tijdelijk niet beschikbaar, Lead Auditor zal handmatig reviewen.',
        concerns: [],
        model: 'fallback-error',
        error_internal: String(err).slice(0, 200),
      }),
      { status: 200, headers } // 200 zodat UI doorgaat, met fallback-score
    );
  }
});
