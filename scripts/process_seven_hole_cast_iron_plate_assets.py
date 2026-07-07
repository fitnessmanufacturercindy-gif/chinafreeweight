from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/875fe72941bad62b33b96021e715eca8.jpg")
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "seven-hole-cast-iron"
OUTPUT = OUT_DIR / "seven-hole-cast-iron-plate-main.jpg"
SHEET = ROOT / "outputs" / "seven-hole-cast-iron-plate-white-bg-sheet.jpg"


def main() -> None:
    image = ImageOps.exif_transpose(Image.open(SOURCE)).convert("RGB")
    width, height = image.size
    image = image.crop((int(width * 0.02), int(height * 0.02), int(width * 0.98), int(height * 0.98)))
    image.thumbnail((760, 760), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 42)).filter(ImageFilter.GaussianBlur(18))
    shadow_layer = Image.new("RGB", image.size, (232, 231, 225))
    canvas.paste(shadow_layer, (x + 10, y + 15), shadow)
    canvas.paste(image, (x, y))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, quality=94, optimize=True)
    SHEET.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(SHEET, quality=92, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
