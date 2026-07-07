from pathlib import Path

from PIL import Image, ImageFilter, ImageOps


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "assets" / "products" / "racks-benches"
OUT.mkdir(parents=True, exist_ok=True)


ITEMS = [
    (
        "adjustable-weight-bench.jpg",
        Path("D:/网站/home fitness equipment REP/334288a258aad9e60b79498f88c00444.png"),
    ),
    (
        "power-rack-functional-trainer.jpg",
        Path("D:/网站/home fitness equipment REP/bd77b096162172e3f6d09ea3f65fea93.png"),
    ),
    (
        "home-gym-functional-trainer.jpg",
        Path("D:/网站/home fitness equipment REP/c6feab8947a31c7edea4449b50e86cdd.jpg"),
    ),
    (
        "private-home-gym-rack-system.jpg",
        Path("D:/网站/home fitness equipment REP/home fitness equipment REP.png"),
    ),
    (
        "compact-cable-power-rack.jpg",
        Path("D:/网站/home fitness equipment REP/powerbase4.jpg"),
    ),
    (
        "dual-pulley-smith-rack.jpg",
        Path("D:/网站/home fitness equipment REP/微信图片_2026-04-20_215903_654.png"),
    ),
    (
        "custom-home-gym-rack.jpg",
        Path("D:/网站/home fitness equipment REP/微信图片_2026-04-20_220016_118.png"),
    ),
    (
        "storage-functional-trainer.jpg",
        Path("D:/网站/home fitness equipment REP/终极二合一置物套装.jpg"),
    ),
    (
        "cable-crossover-functional-trainer.jpg",
        Path("D:/网站/home fitness equipment REP/终极飞鸟.jpg"),
    ),
]


def make_card(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("RGB")
    image = ImageOps.exif_transpose(image)

    canvas = Image.new("RGB", (1100, 820), "#f7f5ef")
    image.thumbnail((1030, 760), Image.Resampling.LANCZOS)

    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2

    shadow = Image.new("RGBA", (image.width + 32, image.height + 32), (0, 0, 0, 0))
    shadow_layer = Image.new("RGBA", (image.width, image.height), (0, 0, 0, 90))
    shadow.paste(shadow_layer, (16, 18))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    canvas.paste(shadow.convert("RGB"), (x - 16, y - 16))
    canvas.paste(image, (x, y))
    canvas.save(dest, "JPEG", quality=92, optimize=True, progressive=True)


for filename, source in ITEMS:
    if not source.exists():
        raise FileNotFoundError(source)
    make_card(source, OUT / filename)


sheet = Image.new("RGB", (1650, 2460), "#111111")
for index, (filename, _) in enumerate(ITEMS):
    thumb = Image.open(OUT / filename).convert("RGB")
    thumb.thumbnail((500, 370), Image.Resampling.LANCZOS)
    col = index % 3
    row = index // 3
    x = 35 + col * 540
    y = 35 + row * 790
    sheet.paste(thumb, (x, y))
sheet.save(ROOT / "outputs" / "racks-benches-product-sheet.jpg", "JPEG", quality=90, optimize=True)
