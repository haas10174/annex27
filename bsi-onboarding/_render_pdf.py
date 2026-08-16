"""Render de BSI-onboarding markdown-docs naar PDF in Annex27-huisstijl.
Hergebruikt de CSS/aanpak van .tmp_md_to_pdf.py (beleidspakket-pipeline).
"""
import os
from pathlib import Path
os.environ.setdefault('PYTHONIOENCODING', 'utf-8')
from markdown_pdf import MarkdownPdf, Section

BASE = Path(r'C:\Users\raoul\Documents\annex27\bsi-onboarding')

CSS = """
@page { size: A4; margin: 2cm 2cm 2.2cm 2cm; }
body { font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-size: 10.5pt; line-height: 1.55; color: #0F172A; }
h1 { font-size: 22pt; color: #0F766E; margin: 0 0 14pt 0; padding-bottom: 8pt; border-bottom: 2px solid #0D9488; }
h2 { font-size: 14pt; color: #0F172A; margin: 18pt 0 8pt 0; padding-bottom: 4pt; border-bottom: 1px solid #E2E8F0; }
h3 { font-size: 12pt; color: #0F172A; margin: 14pt 0 6pt 0; font-weight: 600; }
h4 { font-size: 11pt; color: #334155; margin: 12pt 0 4pt 0; font-weight: 600; }
p { margin: 0 0 8pt 0; }
ul, ol { margin: 0 0 10pt 0; padding-left: 22pt; }
li { margin-bottom: 3pt; }
code { font-family: 'Consolas', 'Courier New', monospace; background: #F1F5F9; padding: 1pt 4pt; border-radius: 3pt; font-size: 9.5pt; color: #0F172A; }
pre { background: #F8FAFC; padding: 10pt 12pt; border-radius: 6pt; border-left: 3px solid #0D9488; font-size: 9pt; margin: 10pt 0; }
pre code { background: transparent; padding: 0; }
table { border-collapse: collapse; width: 100%; margin: 10pt 0; font-size: 9pt; }
th, td { border: 1px solid #E2E8F0; padding: 6pt 8pt; text-align: left; vertical-align: top; }
th { background: #F0FBF9; font-weight: 600; color: #0F172A; }
blockquote { border-left: 3px solid #0D9488; padding-left: 12pt; margin: 10pt 0; color: #475569; background: #F0FBF9; padding-top: 6pt; padding-bottom: 6pt; }
hr { border: none; border-top: 1px solid #E2E8F0; margin: 16pt 0; }
a { color: #0F766E; text-decoration: none; }
strong { font-weight: 600; color: #0F172A; }
"""

DOCS = [
    ('onboarding-checklist.md', 'Annex27 - BSI Onboarding Checklist'),
    ('isms-en-scheiding.md',    'Annex27 - Informatiebeveiliging en scheiding BSI-auditwerk'),
]

for md_name, title in DOCS:
    md_path = BASE / md_name
    out_path = BASE / (md_path.stem + '.pdf')
    content = md_path.read_text(encoding='utf-8')
    content += f"\n\n---\n\n*Annex27 · KBO 1006.203.170 · vertrouwelijk intern document · {md_path.stem}*\n"
    pdf = MarkdownPdf(toc_level=2, optimize=True)
    pdf.add_section(Section(content, paper_size='A4'), user_css=CSS)
    pdf.meta['title'] = title
    pdf.meta['author'] = 'Annex27'
    pdf.meta['subject'] = 'BSI onboarding & informatiebeveiliging'
    pdf.meta['creator'] = 'Annex27 · annex27.nl'
    pdf.save(str(out_path))
    print(f'OK  {out_path.name}  ({out_path.stat().st_size} bytes)')
