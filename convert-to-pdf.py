import markdown
import os
import subprocess

BASE = r"C:\Users\raoul\Documents\annex27\beleidspakket"
OUT = r"C:\Users\raoul\Documents\annex27\beleidspakket\pdf"

CSS = """
<style>
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Sora', sans-serif;
    color: #1E293B;
    line-height: 1.7;
    padding: 48px 56px;
    max-width: 900px;
    margin: 0 auto;
  }
  h1 {
    font-size: 1.6rem;
    font-weight: 700;
    color: #0F172A;
    margin-bottom: 8px;
    padding-bottom: 12px;
    border-bottom: 3px solid #0D9488;
  }
  h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: #0F172A;
    margin-top: 32px;
    margin-bottom: 12px;
  }
  h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #0D9488;
    margin-top: 24px;
    margin-bottom: 8px;
  }
  p { margin-bottom: 12px; font-size: 0.9rem; color: #475569; }
  strong { color: #0F172A; }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 0.82rem;
  }
  th {
    background: #0F172A;
    color: white;
    padding: 10px 12px;
    text-align: left;
    font-weight: 600;
  }
  td {
    padding: 8px 12px;
    border-bottom: 1px solid #E2E8F0;
    color: #475569;
  }
  tr:nth-child(even) td { background: #F8FAFC; }
  tr:hover td { background: #F0FDFA; }
  ul, ol { margin: 12px 0 12px 24px; font-size: 0.9rem; color: #475569; }
  li { margin-bottom: 4px; }
  code {
    background: #F1F5F9;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.82rem;
    color: #0D9488;
  }
  pre {
    background: #0F172A;
    color: #E2E8F0;
    padding: 20px;
    border-radius: 8px;
    margin: 16px 0;
    font-size: 0.8rem;
    overflow-x: auto;
  }
  pre code { background: none; color: inherit; padding: 0; }
  hr {
    border: none;
    border-top: 1px solid #E2E8F0;
    margin: 24px 0;
  }
  .header-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid #E2E8F0;
  }
  .logo {
    font-size: 1.2rem;
    font-weight: 700;
    color: #0F172A;
  }
  .logo span { color: #0D9488; }
  .doc-meta {
    font-size: 0.72rem;
    color: #94A3B8;
    text-align: right;
  }
  @media print {
    body { padding: 24px 32px; }
    h1 { font-size: 1.4rem; }
  }
</style>
"""

def md_to_html(md_content, filename):
    html_body = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    return f"""<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>{filename}</title>
{CSS}
</head>
<body>
<div class="header-bar">
  <div class="logo">annex<span>27</span></div>
  <div class="doc-meta">ISO 27001:2022 Beleidspakket<br/>annex27.nl</div>
</div>
{html_body}
</body>
</html>"""

def process_dir(subdir):
    src = os.path.join(BASE, subdir)
    dst = os.path.join(OUT, subdir)
    os.makedirs(dst, exist_ok=True)

    for f in sorted(os.listdir(src)):
        if not f.endswith('.md'):
            continue
        with open(os.path.join(src, f), 'r', encoding='utf-8') as fh:
            content = fh.read()

        html = md_to_html(content, f.replace('.md', ''))
        html_path = os.path.join(dst, f.replace('.md', '.html'))
        with open(html_path, 'w', encoding='utf-8') as fh:
            fh.write(html)
        print(f"  Created: {html_path}")

# Also handle catalogus
cat_path = os.path.join(BASE, "beleidspakket-catalogus.md")
if os.path.exists(cat_path):
    os.makedirs(OUT, exist_ok=True)
    with open(cat_path, 'r', encoding='utf-8') as fh:
        content = fh.read()
    html = md_to_html(content, "beleidspakket-catalogus")
    html_path = os.path.join(OUT, "beleidspakket-catalogus.html")
    with open(html_path, 'w', encoding='utf-8') as fh:
        fh.write(html)
    print(f"  Created: {html_path}")

print("\nConverting basispakket...")
process_dir("basispakket")

print("\nConverting premium...")
process_dir("premium")

print("\nConverting werkinstructies...")
process_dir("werkinstructies")

print(f"\nDone! HTML files are in: {OUT}")
print("Open them in your browser and use Ctrl+P > Save as PDF to create PDFs.")
print("Or open the folder below to see all files:")
