"""Upload all 45 generated PDFs to Supabase Storage 'documents' bucket.
Reads service-role key from .env. Idempotent (uses upsert)."""
import os, sys, mimetypes
from pathlib import Path
import urllib.request, urllib.error

os.environ.setdefault('PYTHONIOENCODING', 'utf-8')

ROOT = Path(r'C:\Users\raoul\Documents\annex27')
PDFS = ROOT / '.tmp_pdfs'

# Load .env
env = {}
for line in open(ROOT / '.env', encoding='utf-8'):
    line = line.strip()
    if not line or line.startswith('#') or '=' not in line: continue
    k, v = line.split('=', 1)
    env[k.strip()] = v.strip().strip('"')

URL = env['SUPABASE_URL']
KEY = env['SUPABASE_SERVICE_ROLE_KEY']
BUCKET = 'documents'

print(f'Uploading to {URL}/storage/v1/object/{BUCKET}/...')

count, errors, total = 0, [], 0
for sub in ['basispakket', 'premium', 'werkinstructies']:
    for pdf in sorted((PDFS / sub).glob('*.pdf')):
        rel = f'{sub}/{pdf.name}'
        with open(pdf, 'rb') as f:
            data = f.read()
        url = f'{URL}/storage/v1/object/{BUCKET}/{rel}'
        req = urllib.request.Request(url, data=data, method='POST', headers={
            'Authorization': f'Bearer {KEY}',
            'Content-Type': 'application/pdf',
            'x-upsert': 'true',
            'cache-control': '3600',
        })
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                r.read()
            count += 1
            total += len(data)
            print(f'  ✓ {rel} ({len(data):,} bytes)')
        except urllib.error.HTTPError as e:
            body = e.read().decode('utf-8', errors='replace')[:200]
            errors.append((rel, e.code, body))
            print(f'  ✗ {rel}: HTTP {e.code} {body}')
        except Exception as e:
            errors.append((rel, 'EXC', str(e)))
            print(f'  ✗ {rel}: {e}')

print(f'\nDone: {count} uploaded, {total/1024:.1f} KB total, {len(errors)} errors')
if errors:
    for r, c, b in errors[:5]:
        print(f'  - {r}: {c} {b[:120]}')
