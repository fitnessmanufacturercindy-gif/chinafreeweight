import pdfplumber


PDF = "D:/网站/产品图册.pdf"
TERMS = ["DF35", "DF35A", "DF36", "DF37", "DF25B", "DA18", "DA24", "REP"]

with pdfplumber.open(PDF) as pdf:
    print("pages", len(pdf.pages))
    for index, page in enumerate(pdf.pages, start=1):
        text = page.extract_text() or ""
        if any(term.lower() in text.lower() for term in TERMS):
            clean = " | ".join(text.splitlines())
            print(f"--- page {index} ---")
            print(clean[:2000])
