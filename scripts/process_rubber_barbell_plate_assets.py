from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "rubber-barbell"
SOURCES = {
    "rubber-barbell-plate-main.jpg": (
        Path("E:/chinafreeweight.com资料/铃片/wx_camera_1775793773695.jpg"),
        (0.02, 0.14, 0.98, 0.92),
    ),
    "rubber-barbell-plate-grip.jpg": (
        Path("E:/chinafreeweight.com资料/铃片/wx_camera_1775793821785.jpg"),
        (0.0, 0.02, 1.0, 0.78),
    ),
    "rubber-barbell-plate-sleeve.jpg": (
        Path("E:/chinafreeweight.com资料/铃片/wx_camera_1775793796213.jpg"),
        (0.0, 0.0, 1.0, 0.92),
    ),
}


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


def make_card(source: Path, output: Path, crop_box: tuple[float, float, float, float]) -> None:
    image = ImageOps.exif_transpose(Image.open(source)).convert("RGB")
    width, height = image.size
    left, top, right, bottom = crop_box
    image = image.crop(
        (
            int(width * left),
            int(height * top),
            int(width * right),
            int(height * bottom),
        )
    )
    image = crop_to_ratio(image, 1.34)
    image.thumbnail((1010, 760), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 54)).filter(ImageFilter.GaussianBlur(20))
    shadow_layer = Image.new("RGB", image.size, (232, 231, 225))
    canvas.paste(shadow_layer, (x + 12, y + 18), shadow)
    canvas.paste(image, (x, y))
    output.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(output, quality=94, optimize=True)


def make_contact_sheet(outputs: list[Path]) -> None:
    thumbs = []
    for path in outputs:
        img = Image.open(path).convert("RGB")
        img.thumbnail((420, 320), Image.Resampling.LANCZOS)
        thumbs.append((path.stem, img.copy()))

    sheet = Image.new("RGB", (1380, 420), (18, 18, 16))
    x = 30
    for label, img in thumbs:
        sheet.paste(img, (x, 40))
        x += 450

    out = ROOT / "outputs" / "rubber-barbell-plate-white-bg-sheet.jpg"
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, quality=92, optimize=True)


def main() -> None:
    outputs = []
    for filename, (source, crop_box) in SOURCES.items():
        output = OUT_DIR / filename
        make_card(source, output, crop_box)
        outputs.append(output)
    make_contact_sheet(outputs)
    for path in outputs:
        print(path)


if __name__ == "__main__":
    main()
