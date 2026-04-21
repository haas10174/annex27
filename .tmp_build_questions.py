#!/usr/bin/env python3
"""Parse GAP-QUESTIONS-REVIEW.md and emit a drop-in replacement for specificQuestions in dashboard.html."""
import re
import json

with open(r'C:\Users\raoul\Documents\annex27\GAP-QUESTIONS-REVIEW.md', encoding='utf-8') as f:
    content = f.read()

# Split per control (sections start with #### )
# Use a marker that won't clash
sections = re.split(r'\n#### ', '\n' + content)[1:]  # skip anything before first ####

output = {}
stats = {'ok': 0, 'replace': 0, 'weak': 0, 'add': 0, 'skipped': 0}

for sec in sections:
    # Header: ✅/🔄/➕/etc. A.5.3 — Scheiding van taken
    header_match = re.match(r'[^A-Z]*([A-Z]+\.[\w.]+) — (.+?)\n', sec)
    if not header_match:
        stats['skipped'] += 1
        continue
    ctrl_id = header_match.group(1).strip()

    # Verdict
    verdict_match = re.search(r'\*\*Verdict:\*\*\s*`(ok|replace|weak|add)`', sec)
    if not verdict_match:
        stats['skipped'] += 1
        continue
    verdict = verdict_match.group(1)
    stats[verdict] += 1

    # Current questions — grab block after "Huidige vragen" until blank line or next bold section
    cur_block = re.search(
        r'\*\*Huidige vragen \((?:specific|default)\):\*\*\n((?:- \[[^\]]+\] [^\n]+\n?)+)',
        sec,
    )
    current_qs = []
    if cur_block:
        for line in cur_block.group(1).strip().split('\n'):
            m = re.match(r'- \[([^\]]+)\]\s*(.+)', line)
            if m:
                current_qs.append({'q': m.group(2).strip(), 'type': m.group(1).strip()})

    # Replacements: ❌ old\n  → ✅ new
    replacements = []
    for r_match in re.finditer(
        r'❌\s*(.+?)\n\s*→\s*✅\s*(.+?)(?=\n-\s*❌|\n\n|\n---|\Z)',
        sec,
        re.DOTALL,
    ):
        old = re.sub(r'\s+', ' ', r_match.group(1)).strip()
        new = re.sub(r'\s+', ' ', r_match.group(2)).strip()
        replacements.append({'old': old, 'new': new})

    # Additions under ➕ Toevoegen:
    additions = []
    add_block = re.search(r'\*\*➕ Toevoegen:\*\*\n((?:- [^\n]+\n?)+)', sec)
    if add_block:
        for line in add_block.group(1).strip().split('\n'):
            if line.startswith('- '):
                additions.append(line[2:].strip())

    # Build final questions
    if verdict == 'ok':
        final = current_qs[:]
    else:
        final = []
        for q in current_qs:
            replaced = False
            for r in replacements:
                if r['old'].lower() == q['q'].lower():
                    final.append({'q': r['new'], 'type': q['type']})
                    replaced = True
                    break
            if not replaced:
                final.append(q)
        # Append new ones (infer type: default to 'impl' unless hints suggest 'doc' / 'proc' / 'content')
        for a in additions:
            a_lower = a.lower()
            if a_lower.startswith(('is er', 'bestaat', 'is een ', 'heeft u', 'beschrijf')) or 'gedocumenteerd' in a_lower:
                t = 'doc'
            elif 'procedure' in a_lower or 'proces' in a_lower:
                t = 'proc'
            else:
                t = 'impl'
            final.append({'q': a, 'type': t})

    output[ctrl_id] = final

# Emit JS
def js_escape(s):
    return s.replace('\\', '\\\\').replace("'", "\\'")

lines = ['// Auto-gegenereerd uit GAP-QUESTIONS-REVIEW.md (DNV-corpus). Zie .tmp_build_questions.py.']
lines.append('const specificQuestions = {')
def sort_key(kv):
    ctrl = kv[0]
    parts = re.split(r'[.]', ctrl)
    # keep prefix as-is, then ints
    out = [parts[0]]
    for p in parts[1:]:
        out.append(int(p) if p.isdigit() else 99)
    return out

for ctrl_id, qs in sorted(output.items(), key=sort_key):
    lines.append(f"  '{ctrl_id}': [")
    for q in qs:
        lines.append(f"    {{ q: '{js_escape(q['q'])}', type: '{q['type']}' }},")
    lines.append('  ],')
lines.append('};')

output_js = '\n'.join(lines)
with open(r'C:\Users\raoul\Documents\annex27\.tmp_specific_questions.js', 'w', encoding='utf-8') as f:
    f.write(output_js)

print('STATS:', json.dumps(stats))
print('Total controls emitted:', len(output))
print('Written to .tmp_specific_questions.js')
