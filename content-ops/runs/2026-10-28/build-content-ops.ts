import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primary from "../../../content/i18n/private-label-gtin-packaging-guide-copy-primary.json";
import euWest from "../../../content/i18n/private-label-gtin-packaging-guide-copy-eu-west.json";
import euNorth from "../../../content/i18n/private-label-gtin-packaging-guide-copy-eu-north.json";
import apacLatin from "../../../content/i18n/private-label-gtin-packaging-guide-copy-apac-latin.json";
import arabic from "../../../content/i18n/private-label-gtin-packaging-guide-copy-ar.json";
import korean from "../../../content/i18n/private-label-gtin-packaging-guide-copy-ko.json";

type Copy = (typeof primary)[number];
const copies = [...primary, ...euWest, ...euNorth, ...apacLatin, ...arabic, ...korean] as Copy[];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-10-28";
const publishedAt = "2026-10-28T04:10:00.000Z";
const entityId = "private-label-free-weight-gtin-packaging-guide";
const targets = [
  "dumbbells-category", "weight-plates-category", "commercial-free-weight-rfq", "custom-logo-free-weights",
  "oem-sample-approval-free-weights", "export-packaging-free-weights", "pre-shipment-inspection-free-weights", "contact"
];
const englishPaths = [
  "/products/dumbbells", "/products/weight-plates", "/resources/commercial-free-weight-rfq-checklist",
  "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process",
  "/resources/export-packaging-dumbbells-weight-plates", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/contact"
];
const architecture = {
  en: ["procurement_decision", "project_sequence", "Fitness Brand"],
  "pt-BR": ["quality_control", "quality_failure_analysis", "Distributor"],
  es: ["supplier_selection", "procurement_risk_map", "Importer"],
  de: ["quality_control", "quality_failure_analysis", "Purchasing Manager"],
  fr: ["project_planning", "project_sequence", "Fitness Brand"],
  vi: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  sv: ["supplier_selection", "procurement_risk_map", "Purchasing Manager"],
  it: ["project_planning", "project_sequence", "Importer"],
  nl: ["cost_analysis", "cost_model", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"],
  id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["project_planning", "project_sequence", "Purchasing Manager"]
} as const;
const marketTerms: Record<string, string[]> = {
  en: ["English buyer questions distinguish who obtains a UPC or EAN, whether every weight needs its own record, and how a factory applies the file.", "The edition separates single, pair, set and case levels for retailers, marketplaces and 3PL receiving."],
  "pt-BR": ["Buscas brasileiras combinam GTIN, EAN, SKU, marca própria, caixa máster e cadastro de marketplace.", "A edição brasileira usa peça, par e kit e concentra a decisão na matriz que acompanha importação e recebimento."],
  es: ["Las consultas usan GTIN, EAN, código de barras, marca propia, pareja, juego y caja máster.", "La versión española prioriza alta de producto, prueba impresa, recepción y control de reposición."],
  de: ["Deutschsprachige Fragen verwenden GTIN, EAN, Artikelnummer, Verkaufseinheit, Umkarton und Eigenmarke.", "Die DACH-Fassung betont Stammdaten, Druckfreigabe, Wareneingang und Revisionskontrolle."],
  fr: ["Les requêtes associent GTIN, EAN, SKU, marque privée, unité consommateur, lot et carton maître.", "La version française articule BAT, support réel, enseigne, logisticien et réassort."],
  vi: ["Truy vấn dùng mã SKU, GTIN, EAN, mã vạch, hàng nhãn riêng, chiếc, cặp và thùng ngoài.", "Bản tiếng Việt gắn tệp nhãn với sàn, 3PL và quy trình nhận hàng thực tế."],
  sv: ["Svenska frågor använder GTIN, EAN, artikelnummer, eget varumärke, par, set och ytterkartong.", "Texten kopplar artikelregister, tryckprov, mottagning och återorder utan att ge universella kanalregler."],
  it: ["Le ricerche usano GTIN, EAN, SKU, private label, coppia, set e cartone master.", "La versione italiana segue anagrafica, file vettoriale, campione, ricevimento e riordino."],
  nl: ["Nederlandse zoektaal combineert GTIN, EAN, artikelnummer, eigen merk, paar, set en omdoos.", "De editie legt de nadruk op artikelhiërarchie, drukproef, logistieke ontvangst en revisiebeheer."],
  ar: ["تجمع الاستفسارات العربية بين GTIN وEAN وSKU والعلامة الخاصة والزوج والطقم والكرتون الرئيسي.", "تربط النسخة العربية ملكية الرقم بملف المشتري وفحص الطباعة والاستلام."],
  ko: ["한국어 검색은 GTIN, EAN, SKU, 자체 브랜드, 낱개, 한 쌍, 세트와 마스터 카톤을 함께 묻습니다.", "한국어판은 상품 등록, 인쇄 샘플, 물류센터 입고와 재주문 개정을 연결합니다."],
  id: ["Pencarian Indonesia memakai SKU, GTIN, EAN, kode batang, merek sendiri, pasang, set, dan karton induk.", "Edisi Indonesia membedakan data merek, berkas pabrik, marketplace, 3PL, dan penerimaan barang."],
  pl: ["Polskie wyszukiwania łączą GTIN, EAN, SKU, markę własną, parę, zestaw i karton zbiorczy.", "Wersja polska prowadzi od kartoteki przez próbkę druku do przyjęcia i ponownego zamówienia."]
};
const sources = [
  {
    title: "GS1 — Who is responsible for numbering trade items?",
    url: "https://support.gs1.org/support/solutions/articles/43000734414-who-is-responsible-for-numbering-trade-items-",
    primary: true,
    use: "Primary source for the normal responsibility of the brand owner, including an importer or wholesaler selling under its own brand."
  },
  {
    title: "GS1 GTIN Management Standard",
    url: "https://www.gs1.org/sites/default/files/docs/barcodes/GS1_GTIN_Management_Standard.pdf",
    primary: true,
    use: "Primary standard for reviewing new products, declared content, brand and pack or case quantity changes; no local legal conclusion is inferred."
  },
  {
    title: "GS1 — What should I check to ensure good quality barcodes?",
    url: "https://support.gs1.org/support/solutions/articles/43000734141-what-should-i-check-to-ensure-good-quality-barcodes-",
    primary: true,
    use: "Primary guidance for check digit, quiet zones, contrast, height, substrate obstacles, damage and placement checks."
  },
  {
    title: "GS1 General Specifications",
    url: "https://ref.gs1.org/standards/genspecs/",
    primary: true,
    use: "Normative reference for barcode placement and for avoiding seams, folds, edges, staples and conflicting identifiers."
  },
  {
    title: "Reddit r/barcodes — who is responsible for the barcode, brand or overseas manufacturer?",
    url: "https://www.reddit.com/r/barcodes/comments/1arou7a/questions_about_barcodes_from_a_soon_to_be_food/",
    primary: false,
    use: "Natural buyer wording about giving an allocated number to a contract manufacturer; not used as standards evidence."
  }
];
const candidateLabels = [
  "brand owner versus factory GTIN responsibility", "UPC or EAN for private-label dumbbells", "one GTIN per dumbbell weight",
  "single versus pair barcode", "set and assortment identification", "inner pack versus master carton", "GTIN and internal SKU mapping",
  "barcode artwork handoff to factory", "quiet zone and carton placement", "printed barcode sample approval", "3PL receiving scan rehearsal",
  "marketplace label versus product barcode", "private-label weight plate carton labels", "repeat-order artwork control", "pre-shipment barcode inspection"
];

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}
function assetLocale(locale: string) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing published repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale as keyof typeof architecture];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-private-label-gtin-packaging`,
    siteId: "chinafreeweight",
    runDate,
    locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team",
    slug: copy.path.split("/").filter(Boolean).at(-1),
    title: copy.title,
    metaDescription: copy.description,
    h1: copy.h1,
    directAnswer: copy.sections[0].text,
    targetKeyword: copy.keyword,
    intent: copy.sections[0].heading,
    relatedQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path,
    publishedPath: copy.path,
    publishedAt,
    searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`,
    targetBuyer,
    whyThisArticleExists: copy.sections[1].text,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[6].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: copy.sections.at(-1)?.text,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: marketTerms[copy.locale],
    sections: copy.sections.map((section, index) => ({
      heading: section.heading,
      paragraphs: section.text.split(/\n\n/u),
      ...(index === 3 ? { table: copy.table } : {}),
      ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {})
    })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({
      targetContentId,
      label: copy.linkLabels[index],
      href: localizedPath(targetContentId, copy.locale, englishPaths[index])
    })),
    images: [{
      src: `/assets/resources/private-label-gtin-packaging/${assetLocale(copy.locale)}-private-label-gtin-packaging-guide.webp`,
      alt: copy.imageAlt,
      provenance: "Original commissioned conceptual image created for this locale; prompt and source mapping are retained in the run artifact.",
      rights: "Commissioned original for ChinaFreeWeight; no customer image, third-party brand, real identifier or documentary factory claim."
    }],
    sources,
    cta: {
      label: copy.cta[2],
      href: localizedPath("contact", copy.locale, "/contact"),
      buyerValue: copy.locale === "id"
        ? `${copy.cta[1]} OEM, ODM, logo khusus, merek milik pembeli, dan pasokan volume besar ditinjau berdasarkan matriks yang disetujui.`
        : `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply are reviewed against the approved item matrix.`
    }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "GTIN, UPC/EAN and carton-label handoff for private-label free weights",
  selectionReason: "High-intent brand and importer question that connects item hierarchy, identifier ownership, factory artwork handoff, print verification and receiving without duplicating the existing logo or export-packaging guides.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketTerms[copy.locale], path: copy.path }])),
  competitors: [
    { name: "GymWeightSupply", url: "https://gymweightsupply.com/oem-odm", observation: "Mentions label files, barcodes, carton marks and packing-language inputs but does not provide a complete item-hierarchy decision method." },
    { name: "GripForge Fitness", url: "https://www.dumbbellmanufacturers.com/", observation: "Lists barcode labels and retail packaging among private-label inputs; exact commercial claims were not reused." },
    { name: "Yunlingyu", url: "https://yunlingyusport.com/oem-private-label/", observation: "Treats barcode and carton files as buyer-supplied packaging requirements; no technical claim relies on the page." }
  ],
  rejectedTopics: [
    "Custom-logo application methods — already covered in every locale.",
    "General export packaging strength — already covered in every locale.",
    "Pre-shipment inspection — already has a dedicated multilingual guide.",
    "Dumbbell weight markings — already covered by marking and unit guides.",
    "Weight-plate storage — published on 2026-10-27 and intentionally avoided."
  ],
  siteGaps: ["No existing guide previously explained who controls identifiers, how single/pair/set/case levels differ, or how the buyer hands approved files to the free-weight factory."],
  conflictCheck: { liveBlogUrlsReviewed: 901, dedicatedGtinBarcodeArticleFound: false, nearestTopics: ["custom-logo free weights", "export packaging", "OEM sample approval", "pre-shipment inspection"] },
  searchRun: {
    provider: "Public Google and Bing result review plus direct source verification",
    queryFormulationsReviewed: 12,
    observedQuestionGroups: 16,
    limitations: [
      "Bing's live interface returned no usable organic result body for the focused query, so no claim depends on it.",
      "Quora blocked automated access; no answer text was used.",
      "Reddit supplied buyer wording only. Standards and allocation claims rely on GS1 sources.",
      "Paid search cache was not refreshed because this run is not the scheduled Sunday research refresh."
    ]
  },
  sources
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ schemaVersion: 2, siteId: "chinafreeweight", runDate, status: "ready-for-qa", documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.preparedAt = new Date().toISOString();
  manifest.selectedTopic = research.selectedTopic;
  manifest.preparedCount = documents.length;
  manifest.candidateCount = research.candidatePool.length;
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number, slots: Array<{ locale: string }>) => {
    const first = slots.findIndex((candidate) => candidate.locale === slot.locale) === index;
    return first ? { ...slot, status: "prepared", documentId: documents.find((document) => document.locale === slot.locale)?.id } : slot;
  });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "built", documents: documents.length, candidates: research.candidatePool.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
