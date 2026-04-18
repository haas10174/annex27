"""Convert all 45 beleidspakket .md sources to .pdf using markdown-pdf.
Output mirror structure: basispakket/, premium/, werkinstructies/.
"""
import os, sys, re
from pathlib import Path
os.environ.setdefault('PYTHONIOENCODING', 'utf-8')

from markdown_pdf import MarkdownPdf, Section

ROOT = Path(r'C:\Users\raoul\Documents\annex27\beleidspakket')
OUT = Path(r'C:\Users\raoul\Documents\annex27\.tmp_pdfs')
OUT.mkdir(exist_ok=True)

# Annex27 header CSS — clean professional style
CSS = """
@page { size: A4; margin: 2cm 2cm 2.2cm 2cm; }
body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-size: 10.5pt; line-height: 1.55; color: #0F172A; }
h1 { font-size: 22pt; color: #0D9488; margin: 0 0 14pt 0; padding-bottom: 8pt; border-bottom: 2px solid #0D9488; }
h2 { font-size: 14pt; color: #0F172A; margin: 18pt 0 8pt 0; padding-bottom: 4pt; border-bottom: 1px solid #E2E8F0; }
h3 { font-size: 12pt; color: #0F172A; margin: 14pt 0 6pt 0; font-weight: 600; }
h4 { font-size: 11pt; color: #334155; margin: 12pt 0 4pt 0; font-weight: 600; }
p { margin: 0 0 8pt 0; }
ul, ol { margin: 0 0 10pt 0; padding-left: 22pt; }
li { margin-bottom: 3pt; }
code { font-family: 'Consolas', 'Courier New', monospace; background: #F1F5F9; padding: 1pt 4pt; border-radius: 3pt; font-size: 9.5pt; color: #0F172A; }
pre { background: #F8FAFC; padding: 10pt 12pt; border-radius: 6pt; border-left: 3px solid #0D9488; font-size: 9pt; overflow-x: auto; margin: 10pt 0; }
pre code { background: transparent; padding: 0; }
table { border-collapse: collapse; width: 100%; margin: 10pt 0; font-size: 9.5pt; }
th, td { border: 1px solid #E2E8F0; padding: 6pt 8pt; text-align: left; vertical-align: top; }
th { background: #F8FAFC; font-weight: 600; color: #0F172A; }
blockquote { border-left: 3px solid #0D9488; padding-left: 12pt; margin: 10pt 0; color: #475569; font-style: italic; }
hr { border: none; border-top: 1px solid #E2E8F0; margin: 16pt 0; }
a { color: #0D9488; text-decoration: none; }
strong { font-weight: 600; color: #0F172A; }
.footer { font-size: 8pt; color: #94A3B8; text-align: center; margin-top: 20pt; padding-top: 8pt; border-top: 1px solid #E2E8F0; }
"""

def convert(md_path: Path, out_path: Path):
    with open(md_path, encoding='utf-8') as f:
        content = f.read()

    # Append a footer line
    content += f"\n\n---\n\n*Annex27 · ISO 27001 beleidsdocument · {md_path.stem}*\n"

    pdf = MarkdownPdf(toc_level=2, optimize=True)
    pdf.add_section(Section(content, paper_size='A4'), user_css=CSS)
    pdf.meta['title'] = md_path.stem.replace('-', ' ').title()
    pdf.meta['author'] = 'Annex27'
    pdf.meta['subject'] = 'ISO 27001 beleidsdocument'
    pdf.meta['creator'] = 'Annex27 · annex27.nl'
    pdf.save(str(out_path))
    return out_path.stat().st_size

count = 0
total_bytes = 0
errors = []
for sub in ['basispakket', 'premium', 'werkinstructies']:
    src_dir = ROOT / sub
    if not src_dir.exists(): continue
    out_dir = OUT / sub
    out_dir.mkdir(exist_ok=True)
    for md in sorted(src_dir.glob('*.md')):
        out = out_dir / (md.stem + '.pdf')
        try:
            size = convert(md, out)
            total_bytes += size
            count += 1
            print(f'  {sub}/{md.stem}.pdf  ({size:,} bytes)')
        except Exception as e:
            errors.append((md, str(e)))
            print(f'  ERR {md.stem}: {e}')

print(f'\nDone: {count} PDFs, {total_bytes/1024:.1f} KB total, {len(errors)} errors')
if errors:
    for md, e in errors:
        print(f'  - {md}: {e}')
