from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "custom-solid-steel"
OUTPUT = OUT_DIR / "custom-solid-steel-barbell-plate-main.jpg"
SHEET = ROOT / "outputs" / "custom-solid-steel-barbell-plate-white-bg-sheet.jpg"
SOURCES = [
    (
        Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/220aaf42890bf643df998ac7148ca706.jpg"),
        (0.02, 0.16, 0.98, 0.82),
    ),
    (
        Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/470f54cc440ad0836c1cf06bce401403.jpg"),
        (0.02, 0.12, 0.98, 0.82),
    ),
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


def prepare_panel(source: Path, crop_box: tuple[float, float, float, float]) -> Image.Image:
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
    image = crop_to_ratio(image, 0.86)
    image.thumbnail((470, 690), Image.Resampling.LANCZOS)
    return image


def main() -> None:
    panels = [prepare_panel(source, crop_box) for source, crop_box in SOURCES]
    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    positions = [(80, 65), (550, 65)]

    for image, (x, y) in zip(panels, positions):
        shadow = Image.new("RGBA", image.size, (0, 0, 0, 50)).filter(ImageFilter.GaussianBlur(18))
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
