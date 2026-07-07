from pathlib import Path

import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "outputs" / "catalog-new"
OUT_DIR = ROOT / "public" / "assets" / "products" / "dumbbells" / "catalog-v2"
BASE_W = 1684


def scaled(rect: tuple[int, int, int, int], scale: float) -> tuple[int, int, int, int]:
    x, y, w, h = rect
    return tuple(round(v * scale) for v in (x, y, w, h))


def soften_cover(img: Image.Image, rect: tuple[int, int, int, int], scale: float, fill) -> None:
    x, y, w, h = scaled(rect, scale)
    patch = Image.new("RGB", (w, h), fill).filter(ImageFilter.GaussianBlur(max(1, int(2 * scale))))
    img.paste(patch, (x, y))


BRAND_COVERS = {
    2: [
        ((212, 280, 92, 34), (28, 28, 28)), ((286, 380, 82, 32), (28, 28, 28)),
        ((620, 252, 86, 34), (42, 42, 42)), ((715, 397, 86, 34), (42, 42, 42)),
    ],
    3: [
        ((698, 704, 178, 58), (142, 142, 142)),
        ((705, 792, 176, 62), (40, 40, 40)),
    ],
    4: [
        ((148, 728, 130, 38), (30, 30, 30)), ((262, 902, 124, 38), (35, 35, 35)),
        ((930, 800, 430, 96), (45, 45, 55)),
    ],
    5: [
        ((184, 207, 126, 56), (50, 50, 55)), ((122, 268, 88, 38), (45, 45, 45)),
        ((1488, 214, 88, 30), (20, 20, 20)), ((1488, 314, 88, 30), (20, 20, 20)),
    ],
    6: [
        ((176, 218, 126, 42), (25, 25, 25)), ((260, 372, 136, 42), (25, 25, 25)),
        ((548, 350, 112, 38), (45, 45, 45)),
    ],
    7: [
        ((1308, 244, 84, 30), (22, 22, 22)), ((1420, 244, 104, 34), (24, 24, 24)),
    ],
    8: [
        ((1385, 208, 124, 38), (32, 32, 32)), ((240, 202, 124, 38), (32, 32, 32)),
        ((255, 362, 140, 42), (32, 32, 32)),
    ],
    11: [
        ((186, 238, 94, 34), (35, 35, 35)), ((314, 198, 78, 32), (35, 35, 35)),
        ((560, 218, 96, 34), (190, 150, 110)), ((1464, 218, 90, 34), (20, 20, 20)),
        ((508, 812, 120, 40), (35, 35, 35)), ((704, 760, 156, 70), (30, 30, 30)),
        ((1108, 236, 148, 48), (20, 20, 20)), ((1108, 400, 148, 48), (20, 20, 20)),
    ],
    12: [
        ((222, 262, 132, 48), (40, 40, 40)), ((986, 262, 102, 48), (45, 45, 45)),
        ((1408, 748, 110, 56), (65, 65, 65)),
    ],
}


PRODUCT_CROPS = [
    ("cpu-dumbbell-kg", 2, (105, 145, 300, 270)),
    ("cpu-square-dumbbell-kg", 2, (470, 145, 300, 270)),
    ("adjustable-dumbbell-kg", 3, (80, 690, 360, 330)),
    ("cpu-dumbbell-heavy-kg", 3, (500, 690, 410, 300)),
    ("hex-dumbbell-kg", 3, (970, 700, 380, 300)),
    ("neoprene-dumbbell-kg", 3, (1325, 690, 285, 305)),
    ("pu-dumbbell-kg", 4, (75, 690, 360, 300)),
    ("sus304-dumbbell-kg", 4, (900, 670, 385, 320)),
    ("tpu-dumbbell-kg", 5, (85, 145, 355, 250)),
    ("tpu-round-dumbbell-kg", 5, (875, 145, 320, 250)),
    ("tpu-small-dumbbell-kg", 5, (1285, 145, 300, 250)),
    ("selectorized-adjustable-dumbbell-kg", 5, (840, 680, 385, 295)),
    ("cpu-hexagonal-dumbbell-kg", 5, (1280, 680, 330, 300)),
    ("cpu-dumbbell-lb", 6, (70, 155, 395, 315)),
    ("cpu-square-dumbbell-lb", 6, (500, 155, 365, 310)),
    ("neoprene-dumbbell-lb", 7, (1000, 735, 350, 300)),
    ("hex-dumbbell-lb", 7, (1300, 725, 350, 315)),
    ("pu-dumbbell-lb", 8, (1240, 140, 360, 310)),
    ("tpu-dumbbell-lb", 11, (60, 135, 375, 310)),
    ("sus304-dumbbell-lb", 11, (470, 120, 325, 320)),
    ("adjustable-dumbbell-lb", 11, (870, 135, 355, 300)),
    ("tpu-adjustable-dumbbell-lb", 11, (1275, 135, 320, 300)),
    ("cpu-dumbbell-compact", 11, (510, 620, 390, 310)),
    ("cpu-twelve-sided-dumbbell", 12, (105, 40, 300, 315)),
    ("cpu-hexagonal-dumbbell-wide", 12, (960, 40, 370, 315)),
    ("cpu-dumbbell-full-range", 12, (1260, 585, 320, 290)),
]


def prepare_page(page_no: int) -> Image.Image:
    src = Image.open(SRC_DIR / f"catalog-{page_no:02d}.png").convert("RGB")
    return src


def crop_and_fit(img: Image.Image, rect: tuple[int, int, int, int], scale: float) -> Image.Image:
    x, y, w, h = scaled(rect, scale)
    cropped = img.crop((x, y, x + w, y + h))
    cropped = trim_white_margin(cropped)
    cropped = ImageOps.contain(cropped, (920, 680))
    canvas = Image.new("RGB", (920, 680), (248, 248, 246))
    canvas.paste(cropped, ((920 - cropped.width) // 2, (680 - cropped.height) // 2))
    return canvas


def trim_white_margin(img: Image.Image) -> Image.Image:
    arr = np.array(img.convert("RGB"))
    mask = (arr[:, :, 0] < 242) | (arr[:, :, 1] < 242) | (arr[:, :, 2] < 242)
    ys, xs = np.where(mask)
    if xs.size == 0 or ys.size == 0:
        return img
    pad = 18
    x1, x2 = max(0, xs.min() - pad), min(img.width, xs.max() + pad)
    y1, y2 = max(0, ys.min() - pad), min(img.height, ys.max() + pad)
    return img.crop((x1, y1, x2, y2))


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pages: dict[int, Image.Image] = {}
    generated = []
    for slug, page_no, rect in PRODUCT_CROPS:
        if page_no not in pages:
            pages[page_no] = prepare_page(page_no)
        page = pages[page_no]
        scale = page.width / BASE_W
        out = crop_and_fit(page, rect, scale)
        path = OUT_DIR / f"{slug}.jpg"
        out.save(path, quality=92, optimize=True)
        generated.append(path)
    print(f"Generated {len(generated)} dumbbell assets in {OUT_DIR}")


if __name__ == "__main__":
    main()
