from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "gym-accessories"
SHEET = ROOT / "outputs" / "gym-accessories-product-sheet.jpg"

SRC_1 = Path("C:/Users/Kloe/AppData/Local/Temp/codex-clipboard-8727dac4-7cde-4018-8389-4dcd85b02733.png")
SRC_2 = Path("C:/Users/Kloe/AppData/Local/Temp/codex-clipboard-9b324acd-2f0c-4072-8b85-34a2b8420bb3.png")
SRC_3 = Path("C:/Users/Kloe/AppData/Local/Temp/codex-clipboard-5d6e83cc-dfd0-49b0-b147-30f8017a49eb.png")

ITEMS = [
    ("vinyl-kettlebell", SRC_1, (55, 0, 220, 105)),
    ("cast-iron-kettlebell", SRC_1, (380, 0, 530, 125)),
    ("competition-kettlebell", SRC_1, (70, 230, 225, 320)),
    ("six-side-cable-handle", SRC_2, (700, 15, 930, 120)),
    ("tetragonal-cable-handle", SRC_2, (1005, 0, 1245, 125)),
    ("tpe-yoga-mat", SRC_3, (95, 0, 300, 140)),
    ("vipr-training-tube", SRC_3, (380, 0, 570, 125)),
    ("yoga-ball", SRC_3, (55, 215, 320, 345)),
    ("bosu-ball", SRC_3, (390, 230, 595, 370)),
    ("aerobic-step", SRC_3, (75, 530, 305, 610)),
    ("compact-aerobic-step", SRC_3, (380, 535, 610, 625)),
]


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


def make_card(slug: str, source: Path, crop: tuple[int, int, int, int]) -> Path:
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    image = image.crop(crop)
    image = crop_to_ratio(image, 1.34)
    image = image.resize((900, 672), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 38)).filter(ImageFilter.GaussianBlur(16))
    shadow_layer = Image.new("RGB", image.size, (232, 231, 225))
    canvas.paste(shadow_layer, (x + 8, y + 12), shadow)
    canvas.paste(image, (x, y))

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    output = OUT_DIR / f"{slug}.jpg"
    canvas.save(output, quality=94, optimize=True)
    return output


def make_sheet(paths: list[Path]) -> None:
    sheet = Image.new("RGB", (1320, 1440), (18, 18, 16))
    x_positions = [30, 455, 880]
    y = 30
    for index, path in enumerate(paths):
        thumb = Image.open(path).convert("RGB")
        thumb.thumbnail((390, 290), Image.Resampling.LANCZOS)
        x = x_positions[index % 3]
        if index and index % 3 == 0:
            y += 340
        sheet.paste(thumb, (x, y))
    SHEET.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(SHEET, quality=92, optimize=True)


def main() -> None:
    paths = [make_card(*item) for item in ITEMS]
    make_sheet(paths)
    for path in paths:
        print(path)


if __name__ == "__main__":
    main()
