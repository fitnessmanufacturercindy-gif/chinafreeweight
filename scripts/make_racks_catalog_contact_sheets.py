from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "outputs" / "racks-catalog-pages-more"
OUT = ROOT / "outputs" / "racks-catalog-contact-sheets"
OUT.mkdir(parents=True, exist_ok=True)

files = sorted(SRC.glob("page-*.jpg"))
font = ImageFont.load_default()

for group_index in range(0, len(files), 12):
    group = files[group_index : group_index + 12]
    canvas = Image.new("RGB", (1800, 1600), "#111111")
    draw = ImageDraw.Draw(canvas)
    for idx, file in enumerate(group):
        image = Image.open(file).convert("RGB")
        image.thumbnail((550, 360), Image.Resampling.LANCZOS)
        col = idx % 3
        row = idx // 3
        x = 30 + col * 590
        y = 45 + row * 385
        draw.text((x, y - 25), file.stem, fill="#ffffff", font=font)
        canvas.paste(image, (x, y))
    canvas.save(OUT / f"sheet-{group_index // 12 + 1}.jpg", "JPEG", quality=90, optimize=True)
