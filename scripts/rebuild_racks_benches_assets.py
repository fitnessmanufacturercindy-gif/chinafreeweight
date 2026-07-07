from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "products" / "racks-benches"
CATALOG = ROOT / "outputs" / "racks-catalog-pages-more"

OUT.mkdir(parents=True, exist_ok=True)

TARGET = (1200, 850)


def open_rgb(path: str | Path) -> Image.Image:
    return Image.open(path).convert("RGB")


def save_jpg(img: Image.Image, name: str) -> None:
    img.save(OUT / f"{name}.jpg", quality=92, optimize=True, progressive=True)


def cover_resize(img: Image.Image, size=TARGET) -> Image.Image:
    return ImageOps.fit(img, size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def trim_near_white(img: Image.Image, tolerance: int = 248, pad: int = 18) -> Image.Image:
    pixels = img.load()
    left, top, right, bottom = img.width, img.height, 0, 0
    found = False
    # PDF renders often contain off-white compression noise. Compare against
    # pure white with a wide threshold so the quiet page background is ignored.
    for y in range(img.height):
        for x in range(img.width):
            r, g, b = pixels[x, y]
            if max(255 - r, 255 - g, 255 - b) > 38:
                left = min(left, x)
                top = min(top, y)
                right = max(right, x)
                bottom = max(bottom, y)
                found = True
    if not found:
        return img
    left = max(0, left - pad)
    top = max(0, top - pad)
    right = min(img.width, right + pad + 1)
    bottom = min(img.height, bottom + pad + 1)
    return img.crop((left, top, right, bottom))


def fit_on_white(img: Image.Image, size=TARGET, fill: float = 0.93) -> Image.Image:
    canvas = Image.new("RGB", size, "white")
    max_w = int(size[0] * fill)
    max_h = int(size[1] * fill)
    item = img.copy()
    scale = min(max_w / item.width, max_h / item.height)
    item = item.resize((max(1, int(item.width * scale)), max(1, int(item.height * scale))), Image.Resampling.LANCZOS)
    x = (size[0] - item.width) // 2
    y = (size[1] - item.height) // 2
    canvas.paste(item, (x, y))
    return canvas


def catalog_crop(page: str, bbox: tuple[int, int, int, int], name: str, trim: bool = True) -> None:
    src = open_rgb(CATALOG / page)
    crop = src.crop(bbox)
    if trim:
        crop = trim_near_white(crop)
    save_jpg(fit_on_white(crop), name)


def real_photo(src: str, name: str) -> None:
    save_jpg(cover_resize(open_rgb(src)), name)


real_sources = {
    "adjustable-weight-bench": "D:/网站/home fitness equipment REP/334288a258aad9e60b79498f88c00444.png",
    "power-rack-functional-trainer": "D:/网站/home fitness equipment REP/bd77b096162172e3f6d09ea3f65fea93.png",
    "home-gym-functional-trainer": "D:/网站/home fitness equipment REP/c6feab8947a31c7edea4449b50e86cdd.jpg",
    "private-home-gym-rack-system": "D:/网站/home fitness equipment REP/home fitness equipment REP.png",
    "compact-cable-power-rack": "D:/网站/home fitness equipment REP/powerbase4.jpg",
    "dual-pulley-smith-rack": "D:/网站/home fitness equipment REP/微信图片_2026-04-20_215903_654.png",
    "custom-home-gym-rack": "D:/网站/home fitness equipment REP/微信图片_2026-04-20_220016_118.png",
    "storage-functional-trainer": "D:/网站/home fitness equipment REP/终极二合一置物套装.jpg",
    "cable-crossover-functional-trainer": "D:/网站/home fitness equipment REP/终极飞鸟.jpg",
}

for slug, source in real_sources.items():
    if Path(source).exists():
        real_photo(source, slug)


# REP series page: crop only equipment image areas, leaving model labels/text out.
rep_boxes = [
    ("smith-squat-frame", (120, 125, 390, 345)),
    ("half-frame-squat-rack", (520, 125, 800, 345)),
    ("cable-cross-functional-trainer", (1110, 125, 1410, 345)),
    ("six-column-functional-trainer", (1530, 125, 1815, 345)),
    ("cable-crossover-machine", (120, 485, 395, 680)),
    ("full-frame-squat-rack", (525, 480, 800, 680)),
    ("eight-column-training-rack", (1110, 470, 1415, 680)),
    ("wall-mounted-functional-trainer", (1530, 480, 1815, 680)),
    ("smith-cable-crossover-machine", (120, 820, 405, 1015)),
    ("floor-plate-cable-crossover", (520, 790, 815, 1000)),
    ("smith-machine", (1115, 820, 1395, 1005)),
    ("wall-folding-functional-trainer", (1530, 820, 1815, 1005)),
]

for slug, box in rep_boxes:
    catalog_crop("page-005.jpg", box, slug)


bench_boxes = [
    ("incline-flat-decline-bench", (1095, 480, 1390, 675)),
    ("commercial-adjustable-bench", (1490, 475, 1805, 665)),
    ("heavy-duty-adjustable-bench", (1095, 810, 1395, 995)),
    ("compact-adjustable-bench", (1490, 810, 1810, 995)),
]

for slug, box in bench_boxes:
    catalog_crop("page-032.jpg", box, slug)


df_boxes = [
    ("three-in-one-smith-functional-trainer", (510, 125, 800, 345)),
    ("smith-dual-pulley-trainer", (120, 485, 400, 685)),
    ("olympic-bench-plate-storage", (520, 485, 805, 685)),
]

for slug, box in df_boxes:
    catalog_crop("page-033.jpg", box, slug)


da_boxes = [
    ("multi-jungle-functional-trainer", (1510, 780, 1815, 985)),
    ("single-station-functional-trainer", (120, 475, 395, 685)),
    ("three-station-functional-trainer", (520, 475, 815, 685)),
    ("five-station-functional-trainer", (120, 795, 410, 985)),
    ("multi-jungle-training-system", (520, 795, 835, 985)),
]

catalog_crop("page-050.jpg", da_boxes[0][1], da_boxes[0][0])
for slug, box in da_boxes[1:]:
    catalog_crop("page-051.jpg", box, slug)

print(f"Rebuilt racks and benches assets in {OUT}")
