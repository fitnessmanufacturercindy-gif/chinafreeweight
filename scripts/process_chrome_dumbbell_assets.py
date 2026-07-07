from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "dumbbells" / "chrome"
SOURCE_DIR = Path(r"E:\chinafreeweight.com资料\chrome")

SOURCES = {
    "main": SOURCE_DIR / "chrome dumbbell.jpg",
    "silver_pair": SOURCE_DIR / "_chrome.jpg",
    "black_handle": SOURCE_DIR / "Twelve-sided chrome dumbbell BLACK HANDLE.jpg",
    "custom_logo": SOURCE_DIR / "chrome dumbbell8.jpg",
    "gym_set": SOURCE_DIR / "chrome dumbbell9.jpg",
}


def center_crop(img: Image.Image, ratio: float = 1.22) -> Image.Image:
    w, h = img.size
    current = w / h
    if current > ratio:
        new_w = int(h * ratio)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    new_h = int(w / ratio)
    top = max(0, (h - new_h) // 2)
    return img.crop((0, top, w, top + new_h))


def save_white_card(src: Path, out: Path, crop_box: tuple[float, float, float, float]) -> None:
    img = ImageOps.exif_transpose(Image.open(src)).convert("RGB")
    w, h = img.size
    x1, y1, x2, y2 = crop_box
    crop = img.crop((int(w * x1), int(h * y1), int(w * x2), int(h * y2)))
    crop = center_crop(crop)
    crop.thumbnail((980, 760), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    shadow = Image.new("RGBA", crop.size, (0, 0, 0, 68))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    x = (canvas.width - crop.width) // 2
    y = (canvas.height - crop.height) // 2
    canvas.paste(Image.new("RGB", shadow.size, (232, 231, 225)), (x + 10, y + 16), shadow)
    canvas.paste(crop, (x, y))
    canvas.save(out, quality=94, optimize=True)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save_white_card(SOURCES["main"], OUT_DIR / "chrome-dumbbell-main.jpg", (0.04, 0.02, 0.95, 0.96))
    save_white_card(SOURCES["silver_pair"], OUT_DIR / "chrome-dumbbell-silver.jpg", (0.0, 0.08, 1.0, 0.94))
    save_white_card(SOURCES["black_handle"], OUT_DIR / "chrome-dumbbell-black-handle.jpg", (0.10, 0.08, 0.96, 0.88))
    save_white_card(SOURCES["custom_logo"], OUT_DIR / "chrome-dumbbell-custom-logo.jpg", (0.02, 0.04, 0.98, 0.92))
    save_white_card(SOURCES["gym_set"], OUT_DIR / "chrome-dumbbell-gym-set.jpg", (0.03, 0.0, 0.98, 0.88))
    print(OUT_DIR)


if __name__ == "__main__":
    main()
