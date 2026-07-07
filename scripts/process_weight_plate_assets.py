from pathlib import Path

import numpy as np
from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SRC_DIR = ROOT / "outputs" / "catalog-new"
OUT_DIR = ROOT / "public" / "assets" / "products" / "weight-plates" / "catalog"
BASE_W = 1684

PRODUCT_CROPS = [
    ("cpu-bumper-plate", 3, (80, 150, 390, 270)),
    ("rubber-weight-plate", 4, (90, 170, 330, 300)),
    ("spray-weight-plate", 4, (1280, 180, 360, 295)),
    ("tpu-olympic-plate", 4, (500, 690, 400, 310)),
    ("star-tpu-plate", 5, (70, 680, 390, 300)),
    ("cpu-grip-plate", 6, (900, 160, 385, 245)),
    ("cpu-color-bumper-plate", 6, (1280, 165, 350, 300)),
    ("pu-grip-plate", 6, (70, 730, 370, 300)),
    ("pu-color-plate", 6, (500, 735, 380, 300)),
    ("cpu-mini-bumper-plate", 7, (1280, 155, 340, 285)),
    ("rubber-olympic-plate", 8, (120, 155, 330, 295)),
    ("pu-plate-set", 8, (100, 720, 370, 290)),
    ("rubber-bumper-plate", 12, (500, 40, 340, 260)),
    ("four-grip-cpu-plate", 12, (930, 635, 340, 235)),
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
    pad = 22
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
        crop_and_fit(pages[page_no], rect).save(OUT_DIR / f"{slug}.jpg", quality=92, optimize=True)
    print(f"Generated {len(PRODUCT_CROPS)} weight plate images")


if __name__ == "__main__":
    main()
