"""Add Annex27 wordmark watermark (top-right) to all PDFs in .tmp_pdfs/.
Uses reportlab to draw the watermark, pypdf to merge it on every page.
"""
import os, io
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor, Color
from pypdf import PdfReader, PdfWriter

ROOT = Path(r'C:\Users\raoul\Documents\annex27\.tmp_pdfs')

PAGE_W, PAGE_H = A4  # 595.27 x 841.89 pt

def make_watermark_pdf() -> bytes:
    """Single-page A4 PDF with the 'annex27' wordmark in top-right corner."""
    buf = io.BytesIO()
    c = canvas.Canvas(buf, pagesize=A4)
    # Position: top-right corner, 1.2cm margin
    margin = 34  # ~1.2cm in pt
    y = PAGE_H - 28
    # 'annex' in dark slate, '27' in teal — same as homepage style
    c.setFont('Helvetica-Bold', 13)
    c.setFillColor(Color(0.06, 0.09, 0.16, alpha=0.55))  # #0F172A 55% opacity
    annex_w = c.stringWidth('annex', 'Helvetica-Bold', 13)
    twentyseven_w = c.stringWidth('27', 'Helvetica-Bold', 13)
    total_w = annex_w + twentyseven_w
    x_start = PAGE_W - margin - total_w
    c.drawString(x_start, y, 'annex')
    # '27' in teal accent
    c.setFillColor(Color(0.078, 0.722, 0.651, alpha=0.85))  # #14B8A6 85% opacity
    c.drawString(x_start + annex_w, y, '27')
    # subtle teal underline (3pt thick top-of-page accent like favicon)
    c.setStrokeColor(Color(0.078, 0.722, 0.651, alpha=0.18))
    c.setLineWidth(2)
    c.line(PAGE_W - margin - 60, y - 4, PAGE_W - margin, y - 4)
    c.save()
    return buf.getvalue()

def watermark_pdf(in_path: Path, out_path: Path, wm_bytes: bytes):
    src = PdfReader(str(in_path))
    wm = PdfReader(io.BytesIO(wm_bytes)).pages[0]
    writer = PdfWriter()
    for page in src.pages:
        page.merge_page(wm)
        writer.add_page(page)
    # Preserve metadata
    if src.metadata:
        writer.add_metadata(src.metadata)
    with open(out_path, 'wb') as f:
        writer.write(f)

wm_bytes = make_watermark_pdf()
print(f'Watermark PDF: {len(wm_bytes)} bytes')

count = 0
for sub in ['basispakket', 'premium', 'werkinstructies']:
    src_dir = ROOT / sub
    if not src_dir.exists(): continue
    for pdf in sorted(src_dir.glob('*.pdf')):
        # Overwrite in place (we only have generated PDFs here, source md is untouched)
        watermark_pdf(pdf, pdf, wm_bytes)
        count += 1
        if count % 10 == 0: print(f'  …{count} done')

print(f'\nWatermarked {count} PDFs.')
