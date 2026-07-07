from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "gold-steel"
OUTPUT = OUT_DIR / "gold-steel-barbell-plate-main.jpg"
SHEET = ROOT / "outputs" / "gold-steel-barbell-plate-white-bg-sheet.jpg"
SOURCES = {
    "set": (
        Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/70f039f3028d38f3d107d4fa5053bf07.jpg"),
        (0.05, 0.03, 0.95, 0.97),
    ),
    "bar": (
        Path("D:/xwechat_files/wxid_k2g3trzr89ou22_5ad9/temp/RWTemp/2026-07/9e20f478899dc29eb19741386f9343c8/d1b927826774047ce7f99d4e3d8a851f.jpg"),
        (0.03, 0.10, 0.97, 0.82),
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


def prepare_panel(source: Path, crop_box: tuple[float, float, float, float], ratio: float, size: tuple[int, int]) -> Image.Image:
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
    image = crop_to_ratio(image, ratio)
    image.thumbnail(size, Image.Resampling.LANCZOS)
    return image


def paste_panel(canvas: Image.Image, image: Image.Image, x: int, y: int) -> None:
    shadow = Image.new("RGBA", image.size, (0, 0, 0, 46)).filter(ImageFilter.GaussianBlur(18))
    shadow_layer = Image.new("RGB", image.size, (232, 231, 225))
    canvas.paste(shadow_layer, (x + 10, y + 15), shadow)
    canvas.paste(image, (x, y))


def main() -> None:
    set_panel = prepare_panel(*SOURCES["set"], ratio=0.78, size=(520, 710))
    bar_panel = prepare_panel(*SOURCES["bar"], ratio=0.78, size=(420, 610))

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    paste_panel(canvas, set_panel, 70, 55)
    paste_panel(canvas, bar_panel, 625, 105)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    canvas.save(OUTPUT, quality=94, optimize=True)
    SHEET.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(SHEET, quality=92, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    main()
