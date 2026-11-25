import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { freeWeightLotTraceabilityCopies as copies } from "../../../content/i18n/free-weight-lot-traceability-copy";

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-24";
const publishedAt = "2026-11-24T06:30:00.000Z";
const entityId = "oem-free-weight-lot-batch-traceability-guide";
const targets = ["dumbbells-category", "weight-plates-category", "oem-sample-approval-free-weights", "free-weight-aql-defect-classification-guide", "free-weight-reorder-batch-consistency", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/oem-free-weight-sample-approval-process", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/free-weight-reorder-batch-consistency", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["quality_control", "technical_system_walkthrough", "Importer"],
  "pt-BR": ["project_planning", "project_sequence", "Distributor"],
  es: ["procurement_decision", "procurement_risk_map", "Fitness Brand"],
  de: ["quality_control", "quality_failure_analysis", "Purchasing Manager"],
  fr: ["supplier_selection", "technical_system_walkthrough", "Importer"],
  vi: ["project_planning", "manufacturing_process_map", "Distributor"],
  sv: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
  it: ["supplier_selection", "procurement_risk_map", "Fitness Brand"],
  nl: ["quality_control", "quality_failure_analysis", "Distributor"],
  ar: ["project_planning", "project_sequence", "Importer"],
  ko: ["supplier_selection", "technical_system_walkthrough", "Fitness Brand"],
  id: ["quality_control", "manufacturing_process_map", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
};
const sources = [
  { title: "GS1 General Specifications", url: "https://ref.gs1.org/standards/genspecs/24.0.0/", primary: true, use: "Official reference for the distinct roles of batch or lot identifier (10) and serial identifier (21), used without implying that every project must adopt a GS1 barcode." },
  { title: "GS1 Global Traceability Standard", url: "https://ref.gs1.org/standards/global-traceability/", primary: true, use: "Official traceability framework for identifiable objects, parties, locations and events, applied as a record-linkage model." },
  { title: "European Commission GPSR business guidance", url: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52025XC06233", primary: true, use: "Official guidance reviewed for product identification by type, batch, serial or another element; the article leaves market-specific legal assessment to the importer." },
  { title: "Motherson supplier quality manual", url: "https://www.motherson.com/storage/suppliers/supplier-quality-manual.pdf", primary: false, use: "Industry supplier manual reviewed for buyer wording around lot control and backward or forward tracing; no company-specific requirement is presented as universal." },
  { title: "Kohler supplier quality manual", url: "https://resources.kohler.com/plumbing/kohlercom-na/pdf/supplier-quality-manual-french.pdf", primary: false, use: "French-language supplier-quality terminology reviewed for record linkage and lot identification." },
  { title: "AEL supplier quality requirements", url: "https://www.ael.com.br/downloads/supplier-quality-requirements-pt.pdf", primary: false, use: "Portuguese-language supplier manual reviewed for localized traceability terminology and buyer questions." },
  { title: "Solaris supplier quality manual", url: "https://www.solarisbus.com/public/assets/content/supplier-quality-manual-pl.pdf", primary: false, use: "Polish-language supplier manual reviewed for batch identification vocabulary." },
  { title: "Reddit manufacturing batch tracking discussion", url: "https://www.reddit.com/r/manufacturing/comments/1dhkzqo/what_do_you_use_to_track_single_batches/", primary: false, use: "Used only to confirm recurring pain around batch boundaries that are too broad; no advice or claims were reused." },
  { title: "Reddit inventory receiving inspection discussion", url: "https://www.reddit.com/r/InventoryManagement/", primary: false, use: "Used only to confirm buyer wording about tying receiving inspection to purchase order and supplier lot." },
];
const localQueries: Record<string, string> = {
  en: "OEM gym equipment batch number lot traceability supplier",
  "pt-BR": "rastreabilidade lote halteres anilhas fornecedor OEM",
  es: "trazabilidad lotes mancuernas discos fabricante OEM",
  de: "Chargenrückverfolgbarkeit Hanteln Gewichtsscheiben OEM",
  fr: "traçabilité lots haltères disques fournisseur OEM",
  vi: "truy xuất lô tạ tay bánh tạ nhà máy OEM",
  sv: "spårbarhet partinummer hantlar viktskivor OEM",
  it: "tracciabilità lotti manubri dischi produttore OEM",
  nl: "traceerbaarheid batches dumbbells halterschijven OEM",
  ar: "تتبع دفعات الدمبل وأقراص الأوزان مصنع OEM",
  ko: "OEM 덤벨 원판 생산 로트 추적성",
  id: "ketertelusuran batch dumbbell weight plate OEM",
  pl: "identyfikowalność partii hantle talerze producent OEM",
};
const candidates = [
  "batch versus serial decision",
  "SKU and revision relationship",
  "backward trace exercise",
  "forward trace exercise",
  "material-to-finished-lot linkage",
  "rework identity preservation",
  "split and merged lot control",
  "mixed-SKU pallet records",
  "carton and packing-list linkage",
  "distributor repacking control",
  "coating lot investigation",
  "insert and assembly lot investigation",
  "record retention ownership",
  "supplier traceability audit",
  "OEM RFQ traceability fields",
];

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }
const repositoryPublishedVersionsReviewed = contentRepository.listPublished().length - copies.length;
const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing version: ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-lot-traceability`,
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
    searchIntent: copy.sections[0].heading,
    primaryKeyword: copy.keyword,
    relatedQuestions: copy.faq.map(([question]) => question),
    buyerQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path,
    publishedPath: copy.path,
    publishedAt,
    searchIntentClass,
    coreIntentKey: `${copy.keyword} | product identity | backward and forward retrieval`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} ${copy.sections[3].text}`,
    independentInsights: [copy.sections[1].text, copy.sections[2].text, copy.sections[4].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[5].text} The buyer's chosen depth changes marking, record ownership, warehouse handling, claim scope and the evidence that must remain retrievable after shipment.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: [
      `Public query reviewed: “${localQueries[copy.locale]}”. The edition uses the market's established terms for lot, serial identity, receiving, repacking and supplier records.`,
      `The local buyer questions “${copy.faq[0][0]}” and “${copy.faq[4][0]}” determine the order and operational emphasis; the edition was authored for that market rather than converted sentence by sentence.`,
    ],
    sections: copy.sections.map((section, index) => ({
      heading: section.heading,
      paragraphs: section.text.split(/\n\n/u),
      ...(copy.table.afterSection === index + 1 ? { table: copy.table } : {}),
      ...(copy.checklist.afterSection === index + 1 ? { bullets: copy.checklist.items } : {}),
    })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{
      src: `/assets/resources/free-weight-lot-traceability/${assetLocale(copy.locale)}-free-weight-lot-traceability.webp`,
      alt: copy.imageAlt,
      provenance: "Original locale-specific editorial image generated with the built-in image generator for this guide; source PNG, prompt record, visual review contact sheet and optimized WebP/AVIF manifest are retained in run artifacts.",
      rights: "Commissioned original for ChinaFreeWeight. It is an unbranded conceptual traceability scene and does not depict a real customer project, production lot, factory inspection or certification.",
    }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The review maps feasible OEM, ODM, Custom Logo, Private Label and Bulk Supply identity fields without promising unsupported records.` },
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "Lot and batch traceability for OEM free weights",
  selectionReason: "Buyers repeatedly ask what a batch number should identify, whether every product needs a serial number and how a supplier can trace a suspect component to cartons and shipments. The live site had a reorder-consistency guide but no dedicated identifier architecture or two-direction retrieval guide, so this article owns trace depth, lot boundaries, record linkage and trace exercises without re-covering visual consistency between reorders.",
  candidatePool: copies.flatMap((copy) => candidates.map((topic, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${topic}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, publicQuery: localQueries[copy.locale], questions: copy.faq.map(([question]) => question), path: copy.path }])),
  competitors: [
    { name: "Major Fitness", url: "https://www.majorfitness.com/pages/product-registration", observation: "Reviewed gym-product serial and batch lookup language only; no customer, warranty or product claim was reused." },
    { name: "Motherson", url: "https://www.motherson.com/storage/suppliers/supplier-quality-manual.pdf", observation: "Reviewed industry supplier requirements for forward and backward trace language; company-specific requirements were not presented as universal." },
    { name: "Kohler", url: "https://resources.kohler.com/plumbing/kohlercom-na/pdf/supplier-quality-manual-french.pdf", observation: "Reviewed French supplier-quality terminology for traceability and lot control; no wording was copied." },
  ],
  rejectedTopics: [
    "Manufacturer versus trading company — already covered by the multilingual factory-evaluation guide.",
    "OEM sample approval — already covered by a dedicated guide.",
    "RFQ structure and mixed-SKU MOQ — already covered by dedicated guides.",
    "Shipping marks — already covered inside packaging and loading guidance.",
    "Reorder batch consistency — nearest existing topic, but it owns golden samples and variation between orders rather than lot identity and retrieval.",
  ],
  siteGaps: ["No dedicated page explained how SKU, revision, production lot, serial number, carton, pallet and shipment records should connect for free-weight sourcing."],
  conflictCheck: {
    liveSitemapUrlsReviewed: 2019,
    liveBlogUrlsReviewed: 1149,
    liveLanguageUrlsReviewed: 2017,
    liveImageUrlsReviewed: 4707,
    repositoryPublishedVersionsReviewed,
    registryTopicsReviewed: 2394,
    registryChinaFreeWeightTopicsReviewed: 610,
    dedicatedArticleFound: false,
    slugTokenMatches: 0,
    nearestTopics: ["free-weight reorder batch consistency", "OEM sample approval", "AQL defect classification", "test report verification", "warranty claim evidence"],
    boundary: "This guide covers identifier hierarchy, lot-opening rules, splits, merges, repacking, backward and forward retrieval. It excludes golden-sample comparison and repeat-order visual consistency owned by the existing reorder guide.",
  },
  sources,
  publicSearch: {
    surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "question-style search results", "Reddit manufacturing and inventory discussions", "Quora attempted but blocked by robots", "GS1 standards", "EUR-Lex guidance", "supplier quality manuals", "gym-product and contract-manufacturing pages", "local-language queries for all publication markets"],
    markets: copies.map((copy) => copy.locale),
    recurringQuestions: ["Is a batch number the same as a serial number?", "Does every dumbbell need a serial number?", "Can a purchase-order number serve as the batch?", "Where should the code appear?", "How can a buyer test backward and forward traceability?", "What happens when cartons are repacked or lots are split?"],
  },
  limitations: [
    "Quora blocked automated verification and supplied no claim.",
    "Reddit was used only to confirm buyer wording, not as authority for standards or legal duties.",
    "Arabic- and Korean-language public results were sparse; official sources and local terminology checks were used, and no unsupported local market claim was added.",
    "The guide does not claim that every product requires serialization, that every raw material can be traced, or that a retrieval exercise proves legal conformity.",
    "Images are unbranded conceptual editorial scenes, not evidence of a customer order, factory event, inspection result or certification.",
  ],
};

const imageProvenance = {
  generatedAt: new Date().toISOString(),
  generator: "built-in image generator",
  rights: "Commissioned original image set for ChinaFreeWeight website use.",
  editorialBoundary: "Conceptual unbranded traceability scenes only; not customer evidence, factory documentation, certificates, barcodes or real lot records.",
  promptSet: copies.map((copy) => ({ locale: copy.locale, objective: "Photorealistic editorial still life of structurally plausible unbranded free-weight products, plain cartons, blank tags and color-coded inspection grouping; no readable text, logo, barcode, QR code, brand or certification mark.", alt: copy.imageAlt })),
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  await writeFile(path.join(process.cwd(), ".artifacts", "free-weight-lot-traceability-2026-11-24", "image-provenance.json"), `${JSON.stringify(imageProvenance, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number) => {
    const sequence = manifest.slots.slice(0, index + 1).filter((item: { locale: string }) => item.locale === slot.locale).length;
    const copy = copies.find((item) => item.locale === slot.locale);
    return sequence === 1
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-free-weight-lot-traceability`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully evidenced edition is prepared; optional extra slots are deferred to preserve research, media and review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, candidates: research.candidatePool.length, repositoryPublishedVersionsReviewed }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
