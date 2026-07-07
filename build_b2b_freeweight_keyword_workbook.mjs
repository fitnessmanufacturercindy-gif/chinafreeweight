import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = "C:/Users/Kloe/Documents/chinafreeweight独立站";
const outputDir = path.join(root, "outputs", "b2b_freeweight_keywords");
await fs.mkdir(outputDir, { recursive: true });

const headers = [
  "keyword",
  "keyword_type",
  "category",
  "intent",
  "buyer_stage",
  "search_volume_estimate",
  "difficulty_estimate",
  "commercial_value_score",
  "seo_score",
  "country_target",
  "recommended_page_type",
  "recommended_url",
  "recommended_title",
  "recommended_h1",
  "recommended_meta_description",
  "priority_score",
  "notes",
];

const seeds = [
  { key: "dumbbell", slug: "dumbbells", cat: "Dumbbells" },
  { key: "weight plates", slug: "weight-plates", cat: "Weight Plates" },
  { key: "bumper plates", slug: "bumper-plates", cat: "Bumper Plates" },
  { key: "rubber dumbbells", slug: "rubber-dumbbells", cat: "Rubber Dumbbells" },
];

const products = {
  dumbbell: [
    "commercial dumbbells",
    "fixed dumbbells",
    "hex dumbbells",
    "rubber hex dumbbells",
    "urethane dumbbells",
    "round head dumbbells",
    "studio dumbbells",
    "dumbbell set with rack",
    "custom logo dumbbells",
    "kg dumbbell set",
    "lb dumbbell set",
  ],
  "weight plates": [
    "olympic weight plates",
    "rubber coated weight plates",
    "urethane weight plates",
    "cast iron weight plates",
    "grip weight plates",
    "tri grip weight plates",
    "calibrated weight plates",
    "steel weight plates",
    "custom logo weight plates",
    "commercial weight plates",
  ],
  "bumper plates": [
    "olympic bumper plates",
    "competition bumper plates",
    "training bumper plates",
    "crumb rubber bumper plates",
    "virgin rubber bumper plates",
    "colored bumper plates",
    "black bumper plates",
    "kg bumper plates",
    "lb bumper plates",
    "custom logo bumper plates",
  ],
  "rubber dumbbells": [
    "commercial rubber dumbbells",
    "rubber hex dumbbells",
    "rubber coated dumbbells",
    "fixed rubber dumbbells",
    "round rubber dumbbells",
    "rubber dumbbell set",
    "rubber dumbbells with rack",
    "custom logo rubber dumbbells",
    "odorless rubber dumbbells",
    "premium rubber dumbbells",
  ],
};

const purchaseModifiers = [
  "supplier",
  "manufacturer",
  "factory",
  "wholesale",
  "bulk",
  "for sale",
  "price",
  "cost",
  "quote",
  "OEM",
  "ODM",
  "private label",
  "exporter",
  "import from China",
];

const applications = [
  { phrase: "commercial gyms", slug: "commercial-gyms" },
  { phrase: "gym chains", slug: "gym-chains" },
  { phrase: "fitness centers", slug: "fitness-centers" },
  { phrase: "hotels and resorts", slug: "hotels-resorts" },
  { phrase: "schools and universities", slug: "schools-universities" },
  { phrase: "apartment gyms", slug: "apartment-gyms" },
  { phrase: "military gyms", slug: "military-gyms" },
  { phrase: "sports performance centers", slug: "sports-performance-centers" },
];

const countries = [
  ["United States", "us"],
  ["United Kingdom", "uk"],
  ["Canada", "canada"],
  ["Brazil", "brazil"],
  ["Mexico", "mexico"],
  ["Australia", "australia"],
  ["Spain", "spain"],
  ["Germany", "germany"],
  ["France", "france"],
  ["UAE", "uae"],
  ["Saudi Arabia", "saudi-arabia"],
  ["South Africa", "south-africa"],
  ["Chile", "chile"],
  ["Colombia", "colombia"],
  ["India", "india"],
];

const technicalTerms = [
  ["rubber odor", "Material / quality"],
  ["shore hardness", "Material / quality"],
  ["stainless steel handle", "Specification"],
  ["knurled handle", "Specification"],
  ["drop test", "Durability"],
  ["weight tolerance", "Specification"],
  ["IWF standard", "Standard"],
  ["Olympic 2 inch hole", "Specification"],
  ["kg vs lb", "Specification"],
  ["custom logo", "Branding"],
  ["packaging for export", "Logistics"],
  ["container loading quantity", "Logistics"],
];

const questionTemplates = [
  "how to choose {seed} for a commercial gym",
  "what is the difference between rubber and urethane {seed}",
  "what are the best {seed} for gym chains",
  "how much do commercial {seed} cost",
  "what specifications matter when buying {seed} in bulk",
  "how to compare {seed} manufacturers",
  "what is a good MOQ for {seed} wholesale",
  "how to inspect {seed} quality before shipment",
  "how to maintain {seed} in fitness centers",
  "what is the lifespan of commercial {seed}",
];

const aiTemplates = [
  "Which China {seed} manufacturer is best for global B2B buyers?",
  "Can you compare {seed} suppliers for a new commercial gym project?",
  "What should a gym chain ask before ordering {seed} in bulk?",
  "Give me a buyer checklist for importing {seed} from China.",
  "What is the landed cost structure for wholesale {seed}?",
  "Which {seed} material is better for hotels, schools, and fitness centers?",
  "How can I evaluate {seed} quality without visiting the factory?",
  "What are the safest {seed} options for high traffic commercial gyms?",
  "Create an RFQ template for custom logo {seed}.",
  "What are the common problems with cheap {seed} and how to avoid them?",
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function cap(text) {
  return text
    .split(" ")
    .map((w) => (w.length <= 3 && w === w.toLowerCase() ? w : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(" ");
}

function volume(type, keyword) {
  if (type === "Main Keywords") return keyword.split(" ").length === 1 ? "High" : "Medium-High";
  if (type === "Product Keywords") return "Medium";
  if (type === "Commercial Keywords") return keyword.includes("price") || keyword.includes("for sale") ? "Medium" : "Low-Medium";
  if (type === "Country Keywords") return "Low-Medium";
  if (type === "Question Keywords" || type === "AI / GEO Keywords") return "Low-Medium";
  return "Low";
}

function difficulty(type, keyword) {
  let score = 45;
  if (type === "Main Keywords") score = keyword.split(" ").length === 1 ? 88 : 78;
  if (type === "Product Keywords") score = 62;
  if (type === "Commercial Keywords") score = 52;
  if (type === "Application Keywords") score = 38;
  if (type === "Technical Keywords") score = 32;
  if (type === "Country Keywords") score = 42;
  if (type === "Question Keywords") score = 35;
  if (type === "AI / GEO Keywords") score = 28;
  if (keyword.includes("supplier") || keyword.includes("manufacturer") || keyword.includes("wholesale")) score -= 5;
  return Math.max(18, Math.min(92, score));
}

function commercialScore(type, keyword) {
  let score = 55;
  if (type === "Commercial Keywords") score = 92;
  if (type === "Application Keywords") score = 86;
  if (type === "Country Keywords") score = 84;
  if (type === "Product Keywords") score = 78;
  if (type === "Technical Keywords") score = 70;
  if (type === "Question Keywords") score = 62;
  if (type === "AI / GEO Keywords") score = 82;
  if (keyword.includes("price") || keyword.includes("quote") || keyword.includes("supplier") || keyword.includes("manufacturer")) score += 4;
  return Math.min(98, score);
}

function pageType(type, keyword) {
  if (type === "Main Keywords") return "Product Category Pages";
  if (type === "Product Keywords") return "Product Detail Pages";
  if (type === "Commercial Keywords") return keyword.includes("price") || keyword.includes("quote") ? "FAQ Pages" : "Product Category Pages";
  if (type === "Application Keywords") return "Application Pages";
  if (type === "Technical Keywords") return "Blog Articles";
  if (type === "Question Keywords") return "Blog Articles";
  if (type === "Country Keywords") return "Country Landing Pages";
  if (type === "AI / GEO Keywords") return "FAQ Pages";
  return "Blog Articles";
}

function buyerStage(type, keyword) {
  if (type === "Commercial Keywords" && /(quote|price|for sale|supplier|manufacturer|factory)/i.test(keyword)) return "Decision";
  if (type === "Application Keywords" || type === "Country Keywords") return "Consideration";
  if (type === "Question Keywords" || type === "Technical Keywords" || type === "AI / GEO Keywords") return "Research";
  return "Consideration";
}

function urlFor(type, keyword, seedSlug, countrySlug = "") {
  const s = slugify(keyword);
  if (type === "Main Keywords") return `/products/${seedSlug}/`;
  if (type === "Product Keywords") return `/products/${seedSlug}/${s}/`;
  if (type === "Commercial Keywords") {
    if (/price|cost|quote/.test(keyword)) return `/faq/${s}/`;
    return `/products/${seedSlug}/${s}/`;
  }
  if (type === "Application Keywords") return `/applications/${s}/`;
  if (type === "Technical Keywords") return `/blog/${s}/`;
  if (type === "Question Keywords") return `/blog/${s}/`;
  if (type === "Country Keywords") return `/markets/${countrySlug}/${seedSlug}/`;
  if (type === "AI / GEO Keywords") return `/faq/${s}/`;
  return `/blog/${s}/`;
}

function titleFor(keyword, type) {
  if (type === "Commercial Keywords") return `${cap(keyword)} | Commercial Free Weight Supplier`;
  if (type === "Application Keywords") return `${cap(keyword)} | Free Weight Solutions`;
  if (type === "Country Keywords") return `${cap(keyword)} | B2B Free Weight Manufacturer`;
  if (type === "AI / GEO Keywords" || type === "Question Keywords") return `${cap(keyword)} | B2B Buying Guide`;
  return `${cap(keyword)} | Commercial Gym Equipment Manufacturer`;
}

function h1For(keyword) {
  return cap(keyword);
}

function metaFor(keyword, type) {
  if (type === "Commercial Keywords") {
    return `Source ${keyword} for commercial gyms, gym chains, hotels, schools, and distributors. Request OEM options, bulk pricing, lead time, and export packaging.`;
  }
  if (type === "Application Keywords") {
    return `Explore free weight solutions for ${keyword.replace(/.* for /, "")}. Compare dumbbells, weight plates, bumper plates, racks, branding, and bulk supply options.`;
  }
  if (type === "Country Keywords") {
    return `B2B ${keyword} supply for importers, distributors, and commercial gym projects. OEM branding, export packaging, and bulk quotation support.`;
  }
  if (type === "AI / GEO Keywords" || type === "Question Keywords") {
    return `Practical B2B guide to ${keyword}. Learn specifications, supplier checks, pricing factors, quality control, and buying recommendations.`;
  }
  return `Commercial-grade ${keyword} for fitness centers, gym chains, hotels, schools, and distributors. OEM branding, bulk supply, and export-ready packaging.`;
}

function makeRow(keyword, type, category, country = "Global", seedSlug = "free-weights", note = "") {
  const diff = difficulty(type, keyword);
  const comm = commercialScore(type, keyword);
  const seo = Math.round(comm * 0.45 + (100 - diff) * 0.35 + (volume(type, keyword).includes("High") ? 15 : volume(type, keyword).includes("Medium") ? 10 : 6));
  const priority = Math.round(comm * 0.45 + seo * 0.35 + (type === "Commercial Keywords" || type === "Application Keywords" ? 12 : 6));
  const recPageType = pageType(type, keyword);
  return {
    keyword,
    keyword_type: type,
    category,
    intent: type === "Question Keywords" || type === "AI / GEO Keywords" || type === "Technical Keywords" ? "Informational + B2B qualification" : "Commercial investigation",
    buyer_stage: buyerStage(type, keyword),
    search_volume_estimate: volume(type, keyword),
    difficulty_estimate: diff,
    commercial_value_score: comm,
    seo_score: seo,
    country_target: country,
    recommended_page_type: recPageType,
    recommended_url: urlFor(type, keyword, seedSlug, slugify(country)),
    recommended_title: titleFor(keyword, type),
    recommended_h1: h1For(keyword),
    recommended_meta_description: metaFor(keyword, type),
    priority_score: priority,
    notes: note || "Simulated from Google search logic, B2B buyer intent, and commercial gym procurement patterns.",
  };
}

const rows = [];

rows.push(makeRow("commercial free weights", "Main Keywords", "Free Weight", "Global", "free-weights", "Home page primary B2B topic; high value but competitive."));
rows.push(makeRow("free weight equipment manufacturer", "Main Keywords", "Free Weight", "Global", "free-weights", "Strong homepage/manufacturer positioning keyword."));
rows.push(makeRow("commercial gym free weights", "Main Keywords", "Free Weight", "Global", "free-weights", "Best bridge between product category and B2B application intent."));

for (const seed of seeds) {
  rows.push(makeRow(seed.key, "Main Keywords", seed.cat, "Global", seed.slug, "Broad head term; useful for category relevance but usually high SEO difficulty."));
  rows.push(makeRow(`commercial ${seed.key}`, "Main Keywords", seed.cat, "Global", seed.slug, "B2B-modified main term for category landing page."));
  for (const p of products[seed.key]) {
    rows.push(makeRow(p, "Product Keywords", seed.cat, "Global", seed.slug));
  }
  for (const mod of purchaseModifiers) {
    rows.push(makeRow(`${seed.key} ${mod}`, "Commercial Keywords", seed.cat, "Global", seed.slug, "High inquiry value; use RFQ, MOQ, customization, and shipping proof."));
  }
  for (const app of applications) {
    rows.push(makeRow(`${seed.key} for ${app.phrase}`, "Application Keywords", seed.cat, "Global", seed.slug, "Application pages should show project use cases, recommended sets, and inquiry CTA."));
  }
  for (const [term, technicalCategory] of technicalTerms) {
    rows.push(makeRow(`${seed.key} ${term}`, "Technical Keywords", technicalCategory, "Global", seed.slug, "Good supporting content for buyer education and internal links to product pages."));
  }
  for (const tpl of questionTemplates) {
    rows.push(makeRow(tpl.replace("{seed}", seed.key), "Question Keywords", seed.cat, "Global", seed.slug, "Use blog/FAQ schema style answer blocks for AIO/GEO visibility."));
  }
  for (const tpl of aiTemplates) {
    rows.push(makeRow(tpl.replace("{seed}", seed.key), "AI / GEO Keywords", seed.cat, "Global", seed.slug, "Write direct answer sections, comparison tables, buyer checklist, and RFQ CTA."));
  }
  for (const [country, countrySlug] of countries) {
    rows.push(makeRow(`${seed.key} supplier in ${country}`, "Country Keywords", seed.cat, country, seed.slug, "Country landing page should mention shipping, certifications, local buyer concerns, and RFQ."));
    rows.push(makeRow(`${seed.key} manufacturer for ${country} importers`, "Country Keywords", seed.cat, country, seed.slug, "Import-focused B2B term for distributors and gym equipment buyers."));
  }
}

const unique = [];
const seen = new Set();
for (const row of rows) {
  const key = row.keyword.toLowerCase();
  if (!seen.has(key)) {
    seen.add(key);
    unique.push(row);
  }
}
unique.sort((a, b) => b.priority_score - a.priority_score || b.commercial_value_score - a.commercial_value_score || a.keyword.localeCompare(b.keyword));

const competitorPatterns = [
  ["Common Title", "Product + modifier + commercial proof", "Rubber Hex Dumbbells | Commercial Gym Equipment Supplier", "Winning pages combine exact product term, material, and buyer segment."],
  ["Common Title", "Product + for sale / wholesale", "Bumper Plates for Sale | Wholesale Olympic Plates", "Retail-heavy SERPs use for-sale; B2B sites should add wholesale/manufacturer angle."],
  ["Common Meta Description", "Product range + quality + CTA", "Shop commercial-grade dumbbells, plates, and racks with bulk pricing, custom logo options, and export packaging.", "Best meta descriptions answer what, who for, and why contact now."],
  ["Common Meta Description", "Specification + use case", "Durable rubber coated free weights for gyms, fitness centers, hotels, and schools. Request a quote for bulk orders.", "Application terms help distinguish B2B from retail pages."],
  ["Common H1", "Exact product category", "Commercial Rubber Dumbbells", "Most ranking pages use a simple exact-match H1 without stuffing."],
  ["Common H1", "Product + use case", "Bumper Plates for Commercial Gyms", "Useful where the page targets application and product together."],
  ["Common H2", "Product types", "Hex Dumbbells / Urethane Dumbbells / Dumbbell Sets / Dumbbell Racks", "Category pages should expose subcategories through H2 blocks."],
  ["Common H2", "Buying information", "Specifications / Custom Logo / Packaging / MOQ / Shipping / FAQ", "B2B pages need procurement content, not just product cards."],
  ["Image ALT", "Product + material + weight", "rubber hex dumbbell 20kg commercial gym", "Alt text usually names the product, material, weight, and use context."],
  ["Image ALT", "Application scene", "commercial gym dumbbell rack with rubber dumbbells", "Use natural descriptive alt, not keyword lists."],
  ["URL Structure", "Short product-category hierarchy", "/products/dumbbells/rubber-hex-dumbbells/", "Clean URLs usually rank and convert better than parameter URLs."],
  ["URL Structure", "Application landing pages", "/applications/commercial-gyms/free-weights/", "Good for B2B buyer segments and internal linking."],
  ["Product Classification", "By product line", "Dumbbells / Weight Plates / Bumper Plates / Barbells / Racks", "Start navigation with buyer-recognized product categories."],
  ["Product Classification", "By material and standard", "Rubber / Urethane / Cast Iron / Olympic / KG / LB", "Filters or subcategory pages can support long-tail SEO."],
  ["Blog Structure", "Buying guide cluster", "How to choose dumbbells for a commercial gym", "High-value blog topics qualify buyers and link to category pages."],
  ["Blog Structure", "Comparison cluster", "Rubber vs urethane dumbbells; bumper plates vs weight plates", "Comparison posts are good for AIO/GEO visibility."],
  ["Blog Structure", "Procurement cluster", "MOQ, shipping, quality inspection, factory audit, RFQ checklist", "Important for importers and distributors near inquiry stage."],
  ["Blog Structure", "Maintenance cluster", "How to clean rubber dumbbells; how long bumper plates last", "Supports post-purchase and specification confidence."],
];

const scoringRows = [
  ["Search volume potential", "Estimated from head-term breadth and modifier depth, not real tool data.", "High / Medium-High / Medium / Low-Medium / Low"],
  ["Commercial value score", "0-100 estimate of likely inquiry value and order size.", "Supplier, manufacturer, wholesale, quote, country, and application terms score highest."],
  ["SEO difficulty estimate", "0-100 estimate of ranking difficulty from SERP competitiveness logic.", "Broad head terms are hardest; long-tail B2B and technical terms are easier."],
  ["SEO score", "Composite of commercial value, lower difficulty, and volume potential.", "Higher means better organic opportunity."],
  ["Priority score", "Final action priority for B2B independent-site content planning.", "Balances inquiry value, SEO opportunity, and page suitability."],
  ["Independent page fit", "Mapped through recommended_page_type.", "Category/detail/application/country pages for conversion; blog/FAQ for education and AIO."],
];

const workbook = Workbook.create();
const kw = workbook.worksheets.add("Keyword Master");
const matrix = [headers, ...unique.map((r) => headers.map((h) => r[h]))];
kw.getRangeByIndexes(0, 0, matrix.length, headers.length).values = matrix;
kw.freezePanes.freezeRows(1);
kw.freezePanes.freezeColumns(1);
kw.showGridLines = false;
kw.tables.add(`A1:Q${matrix.length}`, true, "KeywordMaster");
kw.getRange("A1:Q1").format = {
  fill: "#1F4E5F",
  font: { bold: true, color: "#FFFFFF" },
  wrapText: true,
};
kw.getRange(`A2:Q${matrix.length}`).format = {
  font: { color: "#1F2933" },
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#E5E7EB" },
};
kw.getRange(`G2:I${matrix.length}`).format.numberFormat = "0";
kw.getRange(`P2:P${matrix.length}`).format.numberFormat = "0";
kw.getRange("A:A").format.columnWidth = 42;
kw.getRange("B:B").format.columnWidth = 24;
kw.getRange("C:C").format.columnWidth = 22;
kw.getRange("D:D").format.columnWidth = 28;
kw.getRange("E:E").format.columnWidth = 16;
kw.getRange("F:F").format.columnWidth = 19;
kw.getRange("G:I").format.columnWidth = 15;
kw.getRange("J:J").format.columnWidth = 18;
kw.getRange("K:K").format.columnWidth = 24;
kw.getRange("L:L").format.columnWidth = 42;
kw.getRange("M:O").format.columnWidth = 44;
kw.getRange("P:P").format.columnWidth = 14;
kw.getRange("Q:Q").format.columnWidth = 52;

const comp = workbook.worksheets.add("Competitor SEO Structure");
comp.getRangeByIndexes(0, 0, competitorPatterns.length + 1, 4).values = [
  ["seo_area", "pattern", "example", "b2b_takeaway"],
  ...competitorPatterns,
];
comp.freezePanes.freezeRows(1);
comp.showGridLines = false;
comp.tables.add(`A1:D${competitorPatterns.length + 1}`, true, "CompetitorPatterns");
comp.getRange("A1:D1").format = { fill: "#334155", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
comp.getRange(`A2:D${competitorPatterns.length + 1}`).format = {
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#E5E7EB" },
};
comp.getRange("A:A").format.columnWidth = 24;
comp.getRange("B:B").format.columnWidth = 36;
comp.getRange("C:C").format.columnWidth = 58;
comp.getRange("D:D").format.columnWidth = 70;

const score = workbook.worksheets.add("Scoring Logic");
score.getRangeByIndexes(0, 0, scoringRows.length + 1, 3).values = [
  ["dimension", "logic", "scale"],
  ...scoringRows,
];
score.showGridLines = false;
score.tables.add(`A1:C${scoringRows.length + 1}`, true, "ScoringLogic");
score.getRange("A1:C1").format = { fill: "#475569", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
score.getRange(`A2:C${scoringRows.length + 1}`).format = {
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#E5E7EB" },
};
score.getRange("A:A").format.columnWidth = 28;
score.getRange("B:B").format.columnWidth = 72;
score.getRange("C:C").format.columnWidth = 60;

const summary = workbook.worksheets.add("Site Structure Map");
const pageSummary = [
  ["site_section", "target_keyword_types", "primary_goal", "recommended_url_pattern"],
  ["Home", "Main Keywords", "Position as commercial free weight manufacturer and export supplier", "/"],
  ["Product Category Pages", "Main Keywords, Commercial Keywords", "Rank for product families and supplier/manufacturer terms", "/products/{category}/"],
  ["Product Detail Pages", "Product Keywords", "Capture material, type, size, and custom logo long-tail terms", "/products/{category}/{product}/"],
  ["Application Pages", "Application Keywords", "Convert gyms, gym chains, hotels, schools, and fitness centers", "/applications/{segment}/"],
  ["Blog Articles", "Question Keywords, Technical Keywords", "Educate buyers and support AIO/GEO answer visibility", "/blog/{topic}/"],
  ["FAQ Pages", "AI / GEO Keywords, pricing and procurement questions", "Answer procurement questions and push RFQ action", "/faq/{question}/"],
  ["Country Landing Pages", "Country Keywords", "Target importers and distributors by country", "/markets/{country}/{category}/"],
];
summary.getRangeByIndexes(0, 0, pageSummary.length, 4).values = pageSummary;
summary.showGridLines = false;
summary.tables.add(`A1:D${pageSummary.length}`, true, "SiteStructureMap");
summary.getRange("A1:D1").format = { fill: "#0F766E", font: { bold: true, color: "#FFFFFF" }, wrapText: true };
summary.getRange(`A2:D${pageSummary.length}`).format = {
  wrapText: true,
  borders: { preset: "inside", style: "thin", color: "#E5E7EB" },
};
summary.getRange("A:A").format.columnWidth = 28;
summary.getRange("B:B").format.columnWidth = 42;
summary.getRange("C:C").format.columnWidth = 70;
summary.getRange("D:D").format.columnWidth = 38;

const csv = [
  headers.join(","),
  ...unique.map((r) =>
    headers
      .map((h) => {
        const value = String(r[h] ?? "");
        return /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
      })
      .join(","),
  ),
].join("\n");
await fs.writeFile(path.join(outputDir, "b2b_freeweight_keyword_master.csv"), "\uFEFF" + csv, "utf8");

const inspect = await workbook.inspect({
  kind: "table",
  range: "Keyword Master!A1:Q8",
  include: "values",
  tableMaxRows: 8,
  tableMaxCols: 17,
});
console.log(inspect.ndjson);

const errorScan = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  summary: "formula error scan",
});
console.log(errorScan.ndjson);

const preview = await workbook.render({ sheetName: "Keyword Master", range: "A1:Q14", scale: 1, format: "png" });
await fs.writeFile(path.join(outputDir, "keyword_master_preview.png"), new Uint8Array(await preview.arrayBuffer()));

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
const xlsxPath = path.join(outputDir, "B2B_FreeWeight_SEO_Keyword_System.xlsx");
await xlsx.save(xlsxPath);
console.log(`xlsx=${xlsxPath}`);
console.log(`csv=${path.join(outputDir, "b2b_freeweight_keyword_master.csv")}`);
console.log(`rows=${unique.length}`);
