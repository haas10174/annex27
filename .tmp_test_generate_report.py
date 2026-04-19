"""Test generate-report edge function end-to-end.

Strategy:
  1. Create dedicated test-admin user via service-role admin API with known password
  2. Sign in via password grant → access_token
  3. Call generate-report with that JWT + target user_id
  4. Report usage, cost, sections + insert status
  5. Delete test-admin user at the end
"""
import os, json, sys, urllib.request, urllib.error, re, time
from pathlib import Path

os.environ.setdefault('PYTHONIOENCODING', 'utf-8')
os.environ.setdefault('PYTHONUTF8', '1')

env = {}
for line in open(Path(__file__).parent / '.env', encoding='utf-8'):
    line = line.strip()
    if '=' in line and not line.startswith('#'):
        k, v = line.split('=', 1); env[k.strip()] = v.strip().strip('"')

URL = env['SUPABASE_URL']
KEY = env['SUPABASE_SERVICE_ROLE_KEY']

TEST_EMAIL = f'test-admin-{int(time.time())}@annex27.test'
TEST_PASSWORD = 'Test-Report-Gen-2026!XyZ'
TARGET_USER = 'f346a1ba-1160-4c84-8c67-9f5091bc91e6'  # raoul@live.nl (has gap data)

admin_headers = {
    'apikey': KEY,
    'Authorization': f'Bearer {KEY}',
    'Content-Type': 'application/json',
}

print(f'[1/4] Test-admin user aanmaken: {TEST_EMAIL}')
create_body = {
    'email': TEST_EMAIL,
    'password': TEST_PASSWORD,
    'email_confirm': True,  # skip confirmation
    'app_metadata': {'pakket': 'admin', 'role': 'auditor'},
    'user_metadata': {'naam': 'Test Admin (auto)'}
}
req = urllib.request.Request(f'{URL}/auth/v1/admin/users', data=json.dumps(create_body).encode(), method='POST', headers=admin_headers)
try:
    with urllib.request.urlopen(req, timeout=15) as r:
        created = json.loads(r.read())
        test_user_id = created.get('id')
        print(f'  ok: test_user_id={test_user_id}')
except urllib.error.HTTPError as e:
    print(f'  FAIL {e.code}: {e.read().decode()[:300]}'); sys.exit(1)

print(f'[2/4] Inloggen met password grant...')
signin_body = {'email': TEST_EMAIL, 'password': TEST_PASSWORD}
req = urllib.request.Request(
    f'{URL}/auth/v1/token?grant_type=password',
    data=json.dumps(signin_body).encode(),
    method='POST',
    headers={'apikey': KEY, 'Content-Type': 'application/json'}
)
try:
    with urllib.request.urlopen(req, timeout=15) as r:
        session = json.loads(r.read())
        access_token = session.get('access_token')
        if not access_token:
            print(f'  FAIL: no token, keys={list(session.keys())}'); sys.exit(1)
        print(f'  access_token ok ({len(access_token)} chars)')
except urllib.error.HTTPError as e:
    print(f'  FAIL {e.code}: {e.read().decode()[:300]}'); sys.exit(1)

print(f'[3/4] generate-report aanroepen met target={TARGET_USER}...')
gen_req = urllib.request.Request(
    f'{URL}/functions/v1/generate-report',
    data=json.dumps({'user_id': TARGET_USER}).encode(),
    method='POST',
    headers={
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json',
    }
)
try:
    with urllib.request.urlopen(gen_req, timeout=240) as r:
        out = json.loads(r.read())
        print(f'\n  ✓ SUCCESS')
        print(f'  draft_id: {out.get("draft_id")}')
        print(f'  meta: {json.dumps(out.get("meta", {}), indent=2)}')
        sections = out.get('sections', {})
        if sections:
            print(f'\n  --- sections preview ---')
            print(f'  executive_summary: {sections.get("executive_summary", "")[:200]}...')
            print(f'  score_summary: {sections.get("score_summary", "")[:200]}...')
            print(f'  top_priorities ({len(sections.get("top_priorities", []))}):')
            for p in sections.get('top_priorities', [])[:3]:
                print(f'    - {p[:120]}')
            print(f'  detailed_findings count: {len(sections.get("detailed_findings", []))}')
except urllib.error.HTTPError as e:
    err = e.read().decode()[:800]
    print(f'  FAIL {e.code}:\n{err}')
except Exception as e:
    print(f'  EXC: {e}')

# 4. Cleanup: delete test user
print(f'\n[4/4] Test-user verwijderen...')
del_req = urllib.request.Request(
    f'{URL}/auth/v1/admin/users/{test_user_id}',
    method='DELETE',
    headers=admin_headers
)
try:
    with urllib.request.urlopen(del_req, timeout=15) as r:
        print(f'  ✓ deleted')
except urllib.error.HTTPError as e:
    print(f'  cleanup failed (non-fatal) {e.code}: {e.read().decode()[:200]}')
