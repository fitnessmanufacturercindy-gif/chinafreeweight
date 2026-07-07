from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/3b48f3e008ae62ab3af3838a79e9fbd7.jpg")
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "cast-iron"
OUTPUT = OUT_DIR / "cast-iron-weight-plate-main.jpg"
SHEET = ROOT / "outputs" / "cast-iron-weight-plate-white-bg-sheet.jpg"


def crop_to_ratio(image: Image.Image, target_ratio: float) -> Image.Image:
    width, height = image.size
    current_ratio = width / height
    if current_ratio > target_ratio:
        new_width = int(height * target_ratio)
        left = (width - new_width) // 2
        return image.crop((left, 0, left + new_width, height))
    new_height = int(width / target_ratio)
    top = (height - new_height) // 2
    return image.crop((0, top, width, top + new_height))


def main() -> None:
    image = ImageOps.exif_transpose(Image.open(SOURCE)).convert("RGB")
    width, height = image.size
    image = image.crop((int(width * 0.04), int(height * 0.03), int(width * 0.96), int(height * 0.88)))
    image = crop_to_ratio(image, 1.34)
    image.thumbnail((1010, 760), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 44)).filter(ImageFilter.GaussianBlur(18))
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
