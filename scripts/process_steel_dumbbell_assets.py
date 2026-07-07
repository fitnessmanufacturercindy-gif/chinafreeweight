from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageFilter


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "products" / "dumbbells" / "steel-12-sided"
SOURCES = [
    Path(r"E:\chinafreeweight.com资料\哑铃\微信图片_20260705141943_1297_71.jpg"),
    Path(r"E:\chinafreeweight.com资料\哑铃\微信图片_20260705141945_1299_71.jpg"),
    Path(r"E:\chinafreeweight.com资料\哑铃\微信图片_20260705141942_1296_71.jpg"),
    Path(r"E:\chinafreeweight.com资料\哑铃\微信图片_20260705141944_1298_71.jpg"),
]


def center_crop(img: Image.Image, ratio: float = 1.18) -> Image.Image:
    w, h = img.size
    current = w / h
    if current > ratio:
        new_w = int(h * ratio)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    new_h = int(w / ratio)
    top = max(0, (h - new_h) // 2)
    return img.crop((0, top, w, top + new_h))


def make_white_card(src: Path, out: Path, crop_box: tuple[float, float, float, float]) -> None:
    img = Image.open(src).convert("RGB")
    w, h = img.size
    x1, y1, x2, y2 = crop_box
    crop = img.crop((int(w * x1), int(h * y1), int(w * x2), int(h * y2)))
    crop = center_crop(crop)
    crop.thumbnail((980, 760), Image.Resampling.LANCZOS)

    canvas = Image.new("RGB", (1100, 820), (248, 248, 245))
    shadow = Image.new("RGBA", crop.size, (0, 0, 0, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(20))
    x = (canvas.width - crop.width) // 2
    y = (canvas.height - crop.height) // 2
    canvas.paste(Image.new("RGB", shadow.size, (229, 226, 219)), (x + 12, y + 18), shadow)
    canvas.paste(crop, (x, y))
    canvas.save(out, quality=92, optimize=True)


def make_cutout_attempt(src: Path, out: Path, rect_ratio: tuple[float, float, float, float]) -> None:
    image = cv2.imdecode(np.fromfile(str(src), dtype=np.uint8), cv2.IMREAD_COLOR)
    if image is None:
        raise FileNotFoundError(src)
    h, w = image.shape[:2]
    rx, ry, rw, rh = rect_ratio
    rect = (int(w * rx), int(h * ry), int(w * rw), int(h * rh))
    mask = np.zeros((h, w), np.uint8)
    bgd = np.zeros((1, 65), np.float64)
    fgd = np.zeros((1, 65), np.float64)
    cv2.grabCut(image, mask, rect, bgd, fgd, 5, cv2.GC_INIT_WITH_RECT)
    mask2 = np.where((mask == 2) | (mask == 0), 0, 255).astype("uint8")
    kernel = np.ones((7, 7), np.uint8)
    mask2 = cv2.morphologyEx(mask2, cv2.MORPH_CLOSE, kernel, iterations=2)
    mask2 = cv2.GaussianBlur(mask2, (9, 9), 0)
    rgba = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
    rgba[:, :, 3] = mask2
    ys, xs = np.where(mask2 > 18)
    if xs.size == 0 or ys.size == 0:
        make_white_card(src, out, (0, 0, 1, 1))
        return
    x1, x2 = xs.min(), xs.max()
    y1, y2 = ys.min(), ys.max()
    pad = 26
    x1, y1 = max(0, x1 - pad), max(0, y1 - pad)
    x2, y2 = min(w, x2 + pad), min(h, y2 + pad)
    cut = Image.fromarray(cv2.cvtColor(rgba[y1:y2, x1:x2], cv2.COLOR_BGRA2RGBA))
    cut.thumbnail((940, 700), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (1100, 820), (248, 248, 245, 255))
    shadow = Image.new("RGBA", cut.size, (0, 0, 0, 115))
    shadow.putalpha(cut.getchannel("A").filter(ImageFilter.GaussianBlur(18)))
    x = (canvas.width - cut.width) // 2
    y = (canvas.height - cut.height) // 2
    canvas.alpha_composite(shadow, (x + 12, y + 18))
    canvas.alpha_composite(cut, (x, y))
    canvas.convert("RGB").save(out, quality=92, optimize=True)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    make_white_card(SOURCES[2], OUT_DIR / "twelve-sided-steel-dumbbell-main.jpg", (0.0, 0.1, 0.98, 0.86))
    make_white_card(SOURCES[0], OUT_DIR / "twelve-sided-steel-dumbbell-side.jpg", (0.02, 0.24, 0.92, 0.93))
    make_white_card(SOURCES[1], OUT_DIR / "twelve-sided-steel-dumbbell-handle.jpg", (0.0, 0.18, 1.0, 0.88))
    make_white_card(SOURCES[3], OUT_DIR / "twelve-sided-steel-dumbbell-detail.jpg", (0.0, 0.02, 0.96, 0.78))
    print(OUT_DIR)


if __name__ == "__main__":
    main()
