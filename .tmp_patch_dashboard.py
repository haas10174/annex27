#!/usr/bin/env python3
"""Replace the specificQuestions object in dashboard.html with the generated DNV version."""
import re
from pathlib import Path

DASH = Path(r'C:\Users\raoul\Documents\annex27\dashboard.html')
NEW_QS = Path(r'C:\Users\raoul\Documents\annex27\.tmp_specific_questions.js')

html = DASH.read_text(encoding='utf-8')

# Read the generated JS but strip the comment header + extract just the object body
new = NEW_QS.read_text(encoding='utf-8')
# Find the "const specificQuestions = {" and the matching terminating "};"
m = re.search(r'const specificQuestions = \{(.*?)\n\};', new, re.DOTALL)
assert m, 'could not find specificQuestions in generated JS'
new_body = m.group(1)  # inner contents

# Replace in dashboard.html
# Old block starts at "// Override with specific deep questions for key controls" and ends at the };
pat = re.compile(
    r'// Override with specific deep questions for key controls\n'
    r'.*?'
    r'const specificQuestions = \{.*?\n\};',
    re.DOTALL,
)

replacement = (
    '// Override with specific deep questions for key controls\n'
    '// Auto-gegenereerd uit GAP-QUESTIONS-REVIEW.md (DNV-corpus) — 114 controls, '
    '78 replace + 13 weak + 3 add + 20 ok.\n'
    'const specificQuestions = {'
    + new_body
    + '\n};'
)

new_html, count = pat.subn(replacement, html)
assert count == 1, f'expected 1 replacement, got {count}'

DASH.write_text(new_html, encoding='utf-8')
print(f'Replaced specificQuestions; wrote {len(new_html)} bytes to dashboard.html')
