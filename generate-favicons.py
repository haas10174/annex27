"""Generate PNG favicons from brand colors. Run once: python generate-favicons.py"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

BG = (12, 15, 26)          # #0c0f1a
ACCENT = (20, 184, 166)    # #14b8a6

def find_font(size):
    candidates = [
        "C:/Windows/Fonts/seguisb.ttf",      # Segoe UI Semibold
        "C:/Windows/Fonts/segoeuib.ttf",     # Segoe UI Bold
        "C:/Windows/Fonts/arialbd.ttf",      # Arial Bold
    ]
    for c in candidates:
        if Path(c).exists():
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

def make_icon(size, out):
    img = Image.new("RGBA", (size, size), BG + (255,))
    draw = ImageDraw.Draw(img)
    # rounded corners via mask
    mask = Image.new("L", (size, size), 0)
    mdraw = ImageDraw.Draw(mask)
    radius = max(2, size // 6)
    mdraw.rounded_rectangle([0, 0, size - 1, size - 1], radius=radius, fill=255)
    # top accent bar
    bar_h = max(1, size // 20)
    draw.rectangle([0, 0, size, bar_h], fill=ACCENT + (255,))
    # "27" text
    fsize = int(size * 0.62)
    font = find_font(fsize)
    text = "27"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) // 2 - bbox[0]
    ty = (size - th) // 2 - bbox[1] + size // 20
    draw.text((tx, ty), text, fill=ACCENT + (255,), font=font)
    # apply rounded mask
    out_img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    out_img.paste(img, (0, 0), mask)
    out_img.save(out, "PNG")
    print(f"wrote {out}")

if __name__ == "__main__":
    root = Path(__file__).parent
    make_icon(16, root / "favicon-16x16.png")
    make_icon(32, root / "favicon-32x32.png")
    make_icon(180, root / "apple-touch-icon.png")
    make_icon(192, root / "android-chrome-192x192.png")
    make_icon(512, root / "android-chrome-512x512.png")
