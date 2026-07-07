from pathlib import Path

import pypdfium2 as pdfium


ROOT = Path(__file__).resolve().parents[1]
PDF = Path("D:/网站/产品图册.pdf")
OUT = ROOT / "outputs" / "racks-catalog-pages"
OUT.mkdir(parents=True, exist_ok=True)

pages = [3, 4, 25, 26, 27, 58, 94]
doc = pdfium.PdfDocument(str(PDF))
print(f"pages={len(doc)}")

for page_number in pages:
    if page_number < 1 or page_number > len(doc):
        print(f"skip page {page_number}")
        continue
    page = doc[page_number - 1]
    bitmap = page.render(scale=2.2)
    image = bitmap.to_pil()
    dest = OUT / f"page-{page_number:03d}.jpg"
    image.convert("RGB").save(dest, "JPEG", quality=94, optimize=True)
    print(dest)
