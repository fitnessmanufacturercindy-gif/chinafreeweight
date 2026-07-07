from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "outputs" / "catalog-new"
OUT_DIR = ROOT / "public" / "assets" / "products" / "dumbbells" / "catalog-v2"
BASE_W = 1684

PRODUCT_CROPS = [
    ("cpu-dumbbell-kg", 2, (105, 145, 300, 270)),
    ("cpu-square-dumbbell-kg", 2, (470, 145, 300, 270)),
    ("adjustable-dumbbell-kg", 3, (80, 805, 360, 210)),
    ("cpu-dumbbell-heavy-kg", 3, (500, 680, 410, 250)),
    ("hex-dumbbell-kg", 3, (970, 700, 380, 300)),
    ("neoprene-dumbbell-kg", 3, (1325, 690, 285, 305)),
    ("pu-dumbbell-kg", 4, (75, 690, 360, 300)),
    ("sus304-dumbbell-kg", 4, (900, 725, 385, 250)),
    ("tpu-dumbbell-kg", 5, (85, 145, 355, 250)),
    ("tpu-round-dumbbell-kg", 5, (875, 145, 320, 250)),
    ("tpu-small-dumbbell-kg", 5, (1285, 145, 300, 250)),
    ("selectorized-adjustable-dumbbell-kg", 5, (840, 710, 385, 255)),
    ("cpu-hexagonal-dumbbell-kg", 5, (1280, 680, 330, 300)),
    ("cpu-dumbbell-lb", 6, (70, 155, 395, 315)),
    ("cpu-square-dumbbell-lb", 6, (500, 155, 365, 310)),
    ("neoprene-dumbbell-lb", 7, (1000, 735, 350, 300)),
    ("hex-dumbbell-lb", 7, (1300, 725, 350, 315)),
    ("pu-dumbbell-lb", 8, (1240, 140, 360, 280)),
    ("tpu-dumbbell-lb", 11, (60, 135, 375, 265)),
    ("sus304-dumbbell-lb", 11, (470, 120, 325, 255)),
    ("adjustable-dumbbell-lb", 11, (870, 125, 355, 245)),
    ("tpu-adjustable-dumbbell-lb", 11, (1275, 135, 320, 245)),
    ("cpu-dumbbell-compact", 11, (510, 620, 390, 310)),
    ("cpu-twelve-sided-dumbbell", 12, (105, 40, 300, 315)),
    ("cpu-hexagonal-dumbbell-wide", 12, (930, 35, 330, 305)),
    ("cpu-dumbbell-full-range", 12, (1260, 585, 320, 290)),
]


def scaled(rect: tuple[int, int, int, int], scale: float) -> tuple[int, int, int, int]:
    x, y, w, h = rect
    return tuple(round(v * scale) for v in (x, y, w, h))


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


def crop_and_fit(page: Image.Image, rect: tuple[int, int, int, int]) -> Image.Image:
    scale = page.width / BASE_W
    x, y, w, h = scaled(rect, scale)
    crop = trim_white_margin(page.crop((x, y, x + w, y + h)))
    crop = ImageOps.contain(crop, (920, 680))
    canvas = Image.new("RGB", (920, 680), (248, 248, 246))
    canvas.paste(crop, ((920 - crop.width) // 2, (680 - crop.height) // 2))
    return canvas


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pages: dict[int, Image.Image] = {}
    for slug, page_no, rect in PRODUCT_CROPS:
        if page_no not in pages:
            pages[page_no] = Image.open(SRC_DIR / f"catalog-{page_no:02d}.png").convert("RGB")
        out = crop_and_fit(pages[page_no], rect)
        out.save(OUT_DIR / f"{slug}.jpg", quality=92, optimize=True)
    print(f"Generated {len(PRODUCT_CROPS)} clean dumbbell images")


if __name__ == "__main__":
    main()
