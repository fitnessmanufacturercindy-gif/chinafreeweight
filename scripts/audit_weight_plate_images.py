from pathlib import Path

from PIL import Image, ImageDraw


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "catalog"
OUT = ROOT / "outputs" / "weight-plates-assets-audit.jpg"


def main() -> None:
    files = sorted(SRC_DIR.glob("*.jpg"))
    cols = 4
    thumb_w, thumb_h = 230, 190
    rows = (len(files) + cols - 1) // cols
    canvas = Image.new("RGB", (cols * thumb_w, rows * thumb_h), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)
    for i, path in enumerate(files):
        im = Image.open(path).convert("RGB")
        im.thumbnail((thumb_w - 20, thumb_h - 46), Image.Resampling.LANCZOS)
        x = (i % cols) * thumb_w + 10
        y = (i // cols) * thumb_h + 8
        canvas.paste(im, (x, y))
        draw.text((x, y + thumb_h - 36), path.stem[:28], fill=(0, 0, 0))
    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, quality=92)
    print(OUT)


if __name__ == "__main__":
    main()
