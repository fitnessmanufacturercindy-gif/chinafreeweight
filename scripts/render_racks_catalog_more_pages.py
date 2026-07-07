from pathlib import Path

import pypdfium2 as pdfium


ROOT = Path(__file__).resolve().parents[1]
PDF = Path("D:/网站/产品图册.pdf")
OUT = ROOT / "outputs" / "racks-catalog-pages-more"
OUT.mkdir(parents=True, exist_ok=True)

doc = pdfium.PdfDocument(str(PDF))
for page_number in list(range(4, 16)) + list(range(29, 39)) + list(range(50, 66)):
    if page_number < 1 or page_number > len(doc):
        continue
    page = doc[page_number - 1]
    bitmap = page.render(scale=1.6)
    image = bitmap.to_pil().convert("RGB")
    dest = OUT / f"page-{page_number:03d}.jpg"
    image.save(dest, "JPEG", quality=90, optimize=True)
    print(dest)
