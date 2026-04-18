"""DNV cursus OCR+transcriptie via Claude Sonnet Vision.
Reads HEIC+JPG fotos → downsizes → batches through Anthropic API → aggregates to DNV-CORPUS.md.
Usage: set ANTHROPIC_API_KEY env var, run.
"""
import os, json, base64, time, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor, as_completed
from PIL import Image
import pillow_heif
import urllib.request, urllib.error

pillow_heif.register_heif_opener()

ANTHROPIC_KEY = os.environ.get("ANTHROPIC_API_KEY", "").strip()
if not ANTHROPIC_KEY:
    print("ERROR: ANTHROPIC_API_KEY env var not set"); sys.exit(1)

SRC = Path(r"C:\Users\raoul\Downloads\Dnv cursus\Dnv cursus")
WORK = Path(r"C:\Users\raoul\Documents\annex27\dnv-corpus")
WORK.mkdir(exist_ok=True, parents=True)
JPG_TMP = WORK / "jpg"; JPG_TMP.mkdir(exist_ok=True)
OUT_JSON = WORK / "json"; OUT_JSON.mkdir(exist_ok=True)

print(f"Source: {SRC}")
print(f"Output: {WORK}")

# Step 1: HEIC→JPG + downsize all to <=1600px long-edge, quality 85
print("\n[1/3] Converting + downsizing images...")
files_src = sorted([f for f in SRC.iterdir() if f.suffix.lower() in ('.heic', '.jpg', '.jpeg')])
converted = 0
for f in files_src:
    dest = JPG_TMP / (f.stem + ".jpg")
    if dest.exists(): continue
    try:
        img = Image.open(f).convert("RGB")
        img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        img.save(dest, "JPEG", quality=85, optimize=True)
        converted += 1
    except Exception as e:
        print(f"  SKIP {f.name}: {e}")
print(f"  Converted {converted}, total JPGs: {len(list(JPG_TMP.glob('*.jpg')))}")

# Step 2: transcribe each via Claude Sonnet Vision
PROMPT = """Analyseer deze pagina uit het DNV Training Auditor Lead Auditor ISMS ISO 27001:2022 cursusboek (Rev.7).

Geef ALLEEN JSON terug in dit format (geen markdown, geen uitleg buiten JSON):
{
  "pagina": "nummer uit voettekst indien zichtbaar, bv '29 van 112'",
  "type": "content",
  "hoofdstuk": "hoofdstuk/sectietitel indien zichtbaar",
  "transcriptie": "VOLLEDIGE tekst woord-voor-woord zoals op de pagina staat. Diagrammen beschrijf je in zinnen. Tabellen zet je om naar markdown-tabellen. Behoud nummering, opsomming en paragraaf-structuur.",
  "kernconcepten": ["concept 1", "concept 2"]
}

Type-waarden: "content" (gedrukte lesstof) | "oefening" (pagina met vragen om zelf te beantwoorden) | "leeg" | "handgeschreven" (persoonlijke aantekeningen) | "diagram" | "tabel" | "cover" (voorblad/inhoudsopgave).

Als type = "leeg" of "oefening" zonder echte content: transcriptie mag leeg of kort."""

def transcribe(jpg_path):
    out = OUT_JSON / (jpg_path.stem + ".json")
    if out.exists(): return "skip"
    try:
        with open(jpg_path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        payload = {
            "model": "claude-sonnet-4-5",
            "max_tokens": 3000,
            "messages": [{
                "role": "user",
                "content": [
                    {"type": "image", "source": {"type": "base64", "media_type": "image/jpeg", "data": b64}},
                    {"type": "text", "text": PROMPT}
                ]
            }]
        }
        req = urllib.request.Request(
            "https://api.anthropic.com/v1/messages",
            data=json.dumps(payload).encode(),
            headers={
                "x-api-key": ANTHROPIC_KEY,
                "anthropic-version": "2023-06-01",
                "content-type": "application/json"
            }
        )
        for attempt in range(4):
            try:
                with urllib.request.urlopen(req, timeout=180) as r:
                    data = json.loads(r.read())
                    text = data["content"][0]["text"]
                    # Parse JSON out of text
                    start = text.find("{"); end = text.rfind("}") + 1
                    parsed = json.loads(text[start:end]) if start >= 0 else {"raw": text}
                    parsed["_source"] = jpg_path.name
                    parsed["_input_tokens"] = data.get("usage", {}).get("input_tokens", 0)
                    parsed["_output_tokens"] = data.get("usage", {}).get("output_tokens", 0)
                    with open(out, "w", encoding="utf-8") as f:
                        json.dump(parsed, f, ensure_ascii=False, indent=2)
                    return "ok"
            except urllib.error.HTTPError as e:
                if e.code in (429, 529) and attempt < 3:
                    time.sleep(5 * (attempt + 1)); continue
                return f"HTTP {e.code}: {e.read()[:200].decode('utf-8', errors='replace')}"
            except Exception as e:
                if attempt < 3: time.sleep(3); continue
                return f"ERR: {e}"
    except Exception as e:
        return f"FAIL: {e}"
    return "maxretry"

print("\n[2/3] Transcribing via Claude Sonnet Vision (parallel=5)...")
jpgs = sorted(JPG_TMP.glob("*.jpg"))
print(f"  Total pages: {len(jpgs)}")
results = {"ok": 0, "skip": 0, "err": 0}
with ThreadPoolExecutor(max_workers=5) as ex:
    futs = {ex.submit(transcribe, j): j for j in jpgs}
    done = 0
    for fut in as_completed(futs):
        done += 1
        r = fut.result()
        if r == "ok": results["ok"] += 1
        elif r == "skip": results["skip"] += 1
        else:
            results["err"] += 1
            print(f"  ERR on {futs[fut].name}: {r[:120]}")
        if done % 20 == 0:
            print(f"  {done}/{len(jpgs)} done (ok={results['ok']} skip={results['skip']} err={results['err']})")
print(f"  Final: {results}")

# Step 3: aggregate into CORPUS
print("\n[3/3] Aggregating into DNV-CORPUS.md...")
jsons = sorted(OUT_JSON.glob("*.json"))
total_in = 0; total_out = 0
chunks = []
for j in jsons:
    try:
        d = json.loads(j.read_text(encoding="utf-8"))
    except:
        continue
    total_in += d.get("_input_tokens", 0)
    total_out += d.get("_output_tokens", 0)
    t = (d.get("transcriptie") or "").strip()
    if not t: continue
    if d.get("type") in ("leeg",):  continue
    chunks.append({
        "src": d.get("_source", ""),
        "pagina": d.get("pagina", "") or "?",
        "type": d.get("type", ""),
        "hoofdstuk": d.get("hoofdstuk", ""),
        "text": t,
        "concepten": d.get("kernconcepten", [])
    })

def page_sort(c):
    p = str(c.get("pagina", "")).strip()
    try: return int(p.split()[0])
    except:
        try: return int(''.join(ch for ch in p if ch.isdigit())[:3])
        except: return 9999

chunks.sort(key=page_sort)

corpus_path = WORK / "DNV-CORPUS.md"
with open(corpus_path, "w", encoding="utf-8") as f:
    f.write("# DNV Training Auditor Lead Auditor ISMS ISO 27001:2022 (Rev.7)\n\n")
    f.write(f"*Getranscribeerd uit {len(chunks)} content-pagina's. Voor gebruik als RAG-corpus bij AI-rapportage.*\n\n")
    f.write(f"**Token-usage**: {total_in:,} input + {total_out:,} output. Geschatte cost (Sonnet 4.5): **${(total_in*3 + total_out*15)/1000000:.2f}**.\n\n")
    f.write("---\n\n")
    for c in chunks:
        f.write(f"## Pagina {c['pagina']}")
        if c['hoofdstuk']: f.write(f" — {c['hoofdstuk']}")
        f.write(f" ({c['type']})\n\n")
        f.write(c["text"] + "\n\n")
        if c.get("concepten"):
            f.write(f"**Kernconcepten:** {', '.join(c['concepten'])}\n\n")
        f.write("---\n\n")

print(f"\nCORPUS WRITTEN: {corpus_path}")
print(f"Pages included: {len(chunks)}")
print(f"Tokens: {total_in:,} in + {total_out:,} out")
print(f"Estimated cost: ${(total_in*3 + total_out*15)/1000000:.2f}")
