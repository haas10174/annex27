"""Review gap-analyse questions tegen DNV-corpus via Claude Opus.
Batcht per categorie, gebruikt prompt caching voor corpus-context.
Output: GAP-QUESTIONS-REVIEW.md
"""
import os, json, sys, urllib.request, urllib.error, time
from pathlib import Path

os.environ.setdefault('PYTHONIOENCODING', 'utf-8')

ANTHROPIC_KEY = os.environ.get('ANTHROPIC_API_KEY', '').strip()
if not ANTHROPIC_KEY: print('ERROR: ANTHROPIC_API_KEY env var missing'); sys.exit(1)

ROOT = Path(r'C:\Users\raoul\Documents\annex27')
with open(ROOT / '.tmp_gap_questions.json', encoding='utf-8') as f:
    data = json.load(f)

with open(ROOT / 'dnv-corpus' / 'DNV-CORPUS.md', encoding='utf-8') as f:
    dnv_corpus = f.read()
with open(ROOT / 'dnv-corpus' / 'DNV-EXAMEN.md', encoding='utf-8') as f:
    dnv_examen = f.read()

print(f'Loaded: {data["total_controls"]} controls, DNV corpus {len(dnv_corpus):,} chars, examen {len(dnv_examen):,} chars')

# Groepeer controls per categorie
by_cat = {}
for cid, info in data['by_control'].items():
    cat = info['cat']
    by_cat.setdefault(cat, []).append((cid, info))
print('Categories:', {k: len(v) for k, v in by_cat.items()})

SYSTEM_STYLE = """Je bent een senior ISO 27001 Lead Auditor, gecertificeerd via DNV. Je taak: kritisch reviewen van gap-analyse vragen die MKB-klanten krijgen voorgeschoteld, tegen de officiële DNV-methodiek (cursusboek + proefexamen meegeleverd als context).

Voor elke control beoordeel je:
1. Dekt de huidige vraagset de kernaspecten die DNV-auditors toetsen?
2. Ontbreken er vragen die DNV specifiek verwacht (bv. uit examenvragen of cursusmateriaal)?
3. Zijn huidige vragen te zwak / dubbelzinnig / generiek?

Verdict per control: "ok" (dekt voldoende) | "add" (voeg vraag toe) | "replace" (vervang een bestaande) | "weak" (huidige zijn te zwak) | "remove" (huidige is overbodig).

Wees kritisch maar niet pietluttig — MKB-gap-analyse moet praktisch blijven (2-5 vragen per control, niet 10).

Geef ALLEEN JSON array terug (geen markdown-codeblock), 1 object per control in de batch:
```
[
  {
    "control_id": "A.5.1",
    "verdict": "ok|add|replace|weak|remove",
    "score": 1-5,
    "reasoning": "1-2 zinnen waarom, met verwijzing naar DNV methodologie",
    "suggestions": {
      "add": ["Nieuwe vraag met concrete tekst", "..."],
      "replace": [{"old": "Huidige vraag", "new": "Verbeterde vraag"}],
      "remove": ["Te schrappen vraag"]
    }
  }
]
```"""

def call_claude(batch_prompt):
    system_blocks = [
        {"type": "text", "text": SYSTEM_STYLE},
        {"type": "text", "text": "\n\n# DNV Training Auditor Lead Auditor cursus (referentie)\n\n" + dnv_corpus, "cache_control": {"type": "ephemeral"}},
        {"type": "text", "text": "\n\n# DNV Proefexamen met auditor-notities\n\n" + dnv_examen, "cache_control": {"type": "ephemeral"}}
    ]
    payload = {
        "model": "claude-opus-4-5",
        "max_tokens": 8000,
        "system": system_blocks,
        "messages": [{"role": "user", "content": batch_prompt}]
    }
    req = urllib.request.Request(
        'https://api.anthropic.com/v1/messages',
        data=json.dumps(payload).encode(),
        headers={
            'x-api-key': ANTHROPIC_KEY,
            'anthropic-version': '2023-06-01',
            'content-type': 'application/json',
            'anthropic-beta': 'prompt-caching-2024-07-31'
        }
    )
    for attempt in range(3):
        try:
            with urllib.request.urlopen(req, timeout=300) as r:
                resp = json.loads(r.read())
                return resp
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')
            if e.code == 429 or e.code == 529:
                print(f'  Rate-limit, retry in {10*(attempt+1)}s')
                time.sleep(10 * (attempt + 1)); continue
            print(f'  HTTP {e.code}: {body[:300]}'); return None
        except Exception as e:
            if attempt < 2: time.sleep(5); continue
            print(f'  ERR: {e}'); return None
    return None

all_reviews = {}
total_cost = 0.0
for cat, items in by_cat.items():
    print(f'\n=== Batch: {cat} ({len(items)} controls) ===')
    batch_content = f"Review de volgende {len(items)} controls uit categorie '{cat}'. Geef per control een JSON-object in een array:\n\n"
    for cid, info in items:
        qs_txt = '\n'.join(f"    - [{q.get('type','?')}] {q['q']}" for q in info['questions'])
        batch_content += f"### {cid} — {info['name']}\n  Huidige vragen ({info['source']}):\n{qs_txt}\n\n"

    resp = call_claude(batch_content)
    if not resp:
        print(f'  Batch {cat} mislukt'); continue

    text = resp['content'][0]['text']
    # Parse JSON array
    start = text.find('[')
    end = text.rfind(']') + 1
    try:
        reviews = json.loads(text[start:end])
    except Exception as e:
        print(f'  JSON parse failed: {e}')
        with open(ROOT / f'.tmp_batch_{cat.replace(" ","_")}_raw.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        continue

    usage = resp.get('usage', {})
    inp = usage.get('input_tokens', 0)
    cc = usage.get('cache_creation_input_tokens', 0)
    cr = usage.get('cache_read_input_tokens', 0)
    out = usage.get('output_tokens', 0)
    cost = (inp*15 + cc*18.75 + cr*1.5 + out*75) / 1000000
    total_cost += cost
    print(f'  {len(reviews)} reviews, tokens: in={inp} cache_create={cc} cache_read={cr} out={out}, cost=${cost:.3f}')

    for rev in reviews:
        all_reviews[rev['control_id']] = rev

# Write markdown report
print(f'\nTotal reviews: {len(all_reviews)}. Total cost: ${total_cost:.2f}')
md = ROOT / 'GAP-QUESTIONS-REVIEW.md'
with open(md, 'w', encoding='utf-8') as f:
    f.write('# Gap-analyse vragen — kwaliteitsreview tegen DNV-methodiek\n\n')
    f.write(f'**Datum:** door Claude Opus 4.5 · **Gereviewde controls:** {len(all_reviews)} · **Totale cost:** ${total_cost:.2f}\n\n')
    f.write('*Gebaseerd op DNV Training Auditor Lead Auditor ISMS ISO 27001:2022 (Rev.7) cursusboek + proefexamen + eigen aantekeningen van Raoul Haas.*\n\n---\n\n')

    # Summary stats
    verdict_counts = {}
    for r in all_reviews.values():
        v = r.get('verdict', '?')
        verdict_counts[v] = verdict_counts.get(v, 0) + 1
    f.write('## Samenvatting verdicts\n\n')
    for v, n in sorted(verdict_counts.items(), key=lambda x: -x[1]):
        f.write(f'- **{v}**: {n} controls\n')
    f.write('\n---\n\n')

    # Group by category
    f.write('## Details per categorie\n\n')
    for cat, items in by_cat.items():
        f.write(f'### {cat}\n\n')
        for cid, info in items:
            rev = all_reviews.get(cid)
            if not rev:
                f.write(f'#### {cid} — {info["name"]}\n❌ Geen review\n\n')
                continue
            verdict = rev.get('verdict', '?')
            score = rev.get('score', '?')
            reasoning = rev.get('reasoning', '')
            icon = {'ok':'✅', 'add':'➕', 'replace':'🔄', 'weak':'⚠️', 'remove':'➖'}.get(verdict, '❔')
            f.write(f'#### {icon} {cid} — {info["name"]}\n\n')
            f.write(f'**Verdict:** `{verdict}` (score {score}/5) — {reasoning}\n\n')
            f.write(f'**Huidige vragen ({info["source"]}):**\n')
            for q in info['questions']:
                f.write(f'- [{q.get("type","?")}] {q["q"]}\n')
            f.write('\n')
            sug = rev.get('suggestions', {})
            if sug.get('add'):
                f.write('**➕ Toevoegen:**\n')
                for s in sug['add']: f.write(f'- {s}\n')
                f.write('\n')
            if sug.get('replace'):
                f.write('**🔄 Vervangen:**\n')
                for s in sug['replace']:
                    if isinstance(s, dict): f.write(f'- ❌ {s.get("old","?")}\n  → ✅ {s.get("new","?")}\n')
                    else: f.write(f'- {s}\n')
                f.write('\n')
            if sug.get('remove'):
                f.write('**➖ Schrappen:**\n')
                for s in sug['remove']: f.write(f'- {s}\n')
                f.write('\n')
            f.write('---\n\n')

print(f'WRITTEN: {md}')
