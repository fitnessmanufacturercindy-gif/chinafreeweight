from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "dumbbells" / "classic-rubber-round"
SOURCES = {
    "main": Path(r"D:\xwechat_files\wxid_k2g3trzr89ou22_5ad9\temp\RWTemp\2026-07\9e20f478899dc29eb19741386f9343c8\4af681af4933cf31e45cf3d3247c75af.jpg"),
    "detail": Path(r"D:\xwechat_files\wxid_k2g3trzr89ou22_5ad9\temp\RWTemp\2026-07\9e20f478899dc29eb19741386f9343c8\3a76343c5bb95c9106f1e8bc4ae7009d.jpg"),
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
    shadow = Image.new("RGBA", crop.size, (0, 0, 0, 70)).filter(ImageFilter.GaussianBlur(18))
    x = (canvas.width - crop.width) // 2
    y = (canvas.height - crop.height) // 2
    canvas.paste(Image.new("RGB", shadow.size, (232, 231, 225)), (x + 10, y + 16), shadow)
    canvas.paste(crop, (x, y))
    canvas.save(out, quality=94, optimize=True)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    save_white_card(SOURCES["main"], OUT_DIR / "classic-rubber-round-dumbbell-main.jpg", (0.02, 0.03, 0.94, 0.92))
    save_white_card(SOURCES["detail"], OUT_DIR / "classic-rubber-round-dumbbell-detail.jpg", (0.03, 0.02, 0.98, 0.86))
    print(OUT_DIR)


if __name__ == "__main__":
    main()
