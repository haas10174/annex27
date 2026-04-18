"""Proefexamen DNV — transcribeer inclusief handgeschreven aantekeningen.
Apart script omdat content-type anders is (vragen + handgeschreven).
"""
import os, json, base64, time, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import pillow_heif
import urllib.request, urllib.error

pillow_heif.register_heif_opener()
ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
if not ANTHROPIC_KEY: print("ERROR: ANTHROPIC_API_KEY env var not set"); sys.exit(1)

SRC = Path(r"C:\Users\raoul\Downloads\proefexamen\proefexamen")
WORK = Path(r"C:\Users\raoul\Documents\annex27\dnv-corpus") / "proefexamen"
WORK.mkdir(exist_ok=True, parents=True)
JPG_TMP = WORK / "jpg"; JPG_TMP.mkdir(exist_ok=True)
OUT_JSON = WORK / "json"; OUT_JSON.mkdir(exist_ok=True)

print("[1/3] HEIC → JPG + downsize...")
files_src = sorted([f for f in SRC.iterdir() if f.suffix.lower() in ('.heic','.jpg','.jpeg','.png')])
for f in files_src:
    dest = JPG_TMP / (f.stem + ".jpg")
    if dest.exists(): continue
    try:
        img = Image.open(f).convert("RGB")
        img.thumbnail((1800, 1800), Image.Resampling.LANCZOS)
        img.save(dest, "JPEG", quality=88, optimize=True)
    except Exception as e:
        print(f"  SKIP {f.name}: {e}")
print(f"  Converted: {len(list(JPG_TMP.glob('*.jpg')))}")

PROMPT = """Analyseer deze pagina uit het DNV PROEFEXAMEN voor Training Auditor / Lead Auditor ISMS ISO 27001:2022. Bevat waarschijnlijk examenvragen + handgeschreven aantekeningen van de cursist (Raoul Haas).

Geef ALLEEN JSON terug in dit format:
{
  "type": "examenvraag | antwoord | handgeschreven-notitie | mix | cover | leeg",
  "vraag_nummer": "nummer als zichtbaar, anders empty string",
  "vraag_tekst": "volledige vraag-tekst woord-voor-woord",
  "antwoord_opties": ["a) ...", "b) ...", ...],
  "correct_antwoord": "indien aangeduid/gemarkeerd (A/B/C/D) of empty",
  "handgeschreven_notities": "transcribeer alle handgeschreven tekst letterlijk — dit geeft inzicht in hoe Raoul denkt als auditor",
  "context": "onderwerp/thema — bv. 'documenteren van auditbevindingen' of 'classificatie van non-conformities'"
}

Belangrijk voor handgeschreven: probeer zo nauwkeurig mogelijk te lezen ook als het slordig is. Bij echt onleesbaar: schrijf '[onleesbaar]' op die plek. Onderscheid gedrukte tekst van handgeschreven."""

def transcribe(jpg_path):
    out = OUT_JSON / (jpg_path.stem + ".json")
    if out.exists(): return "skip"
    try:
        with open(jpg_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        payload = {
            "model": "claude-sonnet-4-5",
            "max_tokens": 3000,
            "messages": [{"role":"user","content":[
                {"type":"image","source":{"type":"base64","media_type":"image/jpeg","data":b64}},
                {"type":"text","text":PROMPT}
            ]}]
        }
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=json.dumps(payload).encode(),
            headers={"x-api-key":ANTHROPIC_KEY,"anthropic-version":"2023-06-01","content-type":"application/json"}
        )
        for attempt in range(4):
            try:
                with urllib.request.urlopen(req, timeout=180) as r:
                    data = json.loads(r.read())
                    text = data["content"][0]["text"]
                    start = text.find("{"); end = text.rfind("}") + 1
                    parsed = json.loads(text[start:end]) if start >= 0 else {"raw": text}
                    parsed["_source"] = jpg_path.name
                    parsed["_input_tokens"] = data.get("usage",{}).get("input_tokens",0)
                    parsed["_output_tokens"] = data.get("usage",{}).get("output_tokens",0)
                    with open(out,"w",encoding="utf-8") as f: json.dump(parsed,f,ensure_ascii=False,indent=2)
                    return "ok"
            except urllib.error.HTTPError as e:
                if e.code in (429, 529) and attempt < 3: time.sleep(5*(attempt+1)); continue
                return f"HTTP {e.code}"
            except Exception as e:
                if attempt < 3: time.sleep(3); continue
                return f"ERR: {e}"
    except Exception as e:
        return f"FAIL: {e}"
    return "maxretry"

print("[2/3] Transcribing proefexamen (parallel=5)...")
jpgs = sorted(JPG_TMP.glob("*.jpg"))
print(f"  Total: {len(jpgs)}")
results = {"ok":0,"skip":0,"err":0}
with ThreadPoolExecutor(max_workers=5) as ex:
    futs = {ex.submit(transcribe,j):j for j in jpgs}
    done = 0
    for fut in as_completed(futs):
        done += 1
        r = fut.result()
        if r == "ok": results["ok"] += 1
        elif r == "skip": results["skip"] += 1
        else: results["err"] += 1; print(f"  ERR {futs[fut].name}: {r[:120]}")
        if done % 10 == 0: print(f"  {done}/{len(jpgs)} (ok={results['ok']} skip={results['skip']} err={results['err']})")
print(f"  Final: {results}")

print("[3/3] Aggregating into DNV-EXAMEN.md...")
jsons = sorted(OUT_JSON.glob("*.json"))
total_in = 0; total_out = 0
chunks = []
for j in jsons:
    try: d = json.loads(j.read_text(encoding="utf-8"))
    except: continue
    total_in += d.get("_input_tokens",0); total_out += d.get("_output_tokens",0)
    if d.get("type") == "leeg": continue
    chunks.append(d)

out_md = Path(r"C:\Users\raoul\Documents\annex27\dnv-corpus") / "DNV-EXAMEN.md"
with open(out_md,"w",encoding="utf-8") as f:
    f.write("# DNV Proefexamen + Handgeschreven Notities (Raoul Haas)\n\n")
    f.write(f"*Getranscribeerd uit {len(chunks)} pagina's van het officiele DNV-proefexamen, inclusief persoonlijke aantekeningen.*\n\n")
    f.write(f"**Token-usage**: {total_in:,} input + {total_out:,} output. Kost: **${(total_in*3+total_out*15)/1000000:.2f}**.\n\n---\n\n")
    for c in chunks:
        f.write(f"## {c.get('_source','?')}\n\n")
        if c.get('type'): f.write(f"**Type**: {c['type']}\n\n")
        if c.get('vraag_nummer'): f.write(f"**Vraag {c['vraag_nummer']}**\n\n")
        if c.get('context'): f.write(f"*Context:* {c['context']}\n\n")
        if c.get('vraag_tekst'): f.write(f"### Vraag\n{c['vraag_tekst']}\n\n")
        if c.get('antwoord_opties'):
            f.write("### Opties\n")
            for o in c['antwoord_opties']: f.write(f"- {o}\n")
            f.write("\n")
        if c.get('correct_antwoord'): f.write(f"**Correct antwoord:** {c['correct_antwoord']}\n\n")
        if c.get('handgeschreven_notities'):
            f.write(f"### 📝 Handgeschreven notitie (Raoul)\n> {c['handgeschreven_notities']}\n\n")
        f.write("---\n\n")

print(f"WRITTEN: {out_md}")
print(f"Pages: {len(chunks)} · Tokens: {total_in:,} in + {total_out:,} out · Cost: ${(total_in*3+total_out*15)/1000000:.2f}")
