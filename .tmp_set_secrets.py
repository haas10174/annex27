import json, subprocess, os, sys

PAT = 'sbp_652079fbebd9eef67366018196665e9c45f0c058'
PROJECT_REF = 'tvqhxhoohzdzekcfzjuv'

with open('.tmp_ga4_key.json', 'r', encoding='utf-8') as f:
    sa_raw = f.read().strip()

# Validate JSON
try:
    json.loads(sa_raw)
    print('JSON valid: OK')
except Exception as e:
    print('JSON INVALID:', e)
    sys.exit(1)

body = [
    {"name": "GA4_PROPERTY_ID", "value": "533221889"},
    {"name": "GA4_SERVICE_ACCOUNT_JSON", "value": sa_raw}
]

with open('.tmp_body.json', 'w', encoding='utf-8') as f:
    json.dump(body, f)

result = subprocess.run([
    'curl', '-sS', '-X', 'POST',
    f'https://api.supabase.com/v1/projects/{PROJECT_REF}/secrets',
    '-H', f'Authorization: Bearer {PAT}',
    '-H', 'Content-Type: application/json',
    '--data-binary', '@.tmp_body.json'
], capture_output=True, text=True)

print('HTTP STDOUT:', result.stdout if result.stdout else '(empty)')
print('HTTP STDERR:', result.stderr if result.stderr else '(empty)')
print('Returncode:', result.returncode)

# Cleanup
os.remove('.tmp_body.json')
os.remove('.tmp_ga4_key.json')
print('Cleaned up tmp files: OK')
