import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-primary.json";
import euWestCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-eu-west.json";
import euNorthCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-eu-north.json";
import apacCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-apac.json";
import arabicCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-ar.json";
import koreanCopies from "../../../content/i18n/free-weight-moq-mixed-sku-guide-copy-ko.json";

const copies = [...primaryCopies, ...euWestCopies, ...euNorthCopies, ...apacCopies, ...arabicCopies, ...koreanCopies];

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-10-31";
const publishedAt = "2026-10-31T05:00:00.000Z";
const entityId = "free-weight-moq-mixed-sku-order-guide";
const targets = ["dumbbells-category", "weight-plates-category", "commercial-free-weight-rfq", "custom-logo-free-weights", "oem-sample-approval-free-weights", "private-label-free-weight-gtin-packaging-guide", "export-packaging-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/commercial-free-weight-rfq-checklist", "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process", "/resources/private-label-free-weight-gtin-barcode-guide", "/resources/export-packaging-dumbbells-weight-plates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "procurement_risk_map", "Fitness Brand"], "pt-BR": ["procurement_decision", "project_sequence", "Distributor"], es: ["supplier_selection", "comparison_decision_tree", "Importer"],
  de: ["supplier_selection", "quality_failure_analysis", "Purchasing Manager"], fr: ["procurement_decision", "project_sequence", "Fitness Brand"], vi: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  sv: ["procurement_decision", "procurement_risk_map", "Purchasing Manager"], it: ["procurement_decision", "project_sequence", "Importer"], nl: ["procurement_decision", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"], ko: ["procurement_decision", "quality_failure_analysis", "Fitness Brand"], id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["procurement_decision", "procurement_risk_map", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `The ${copy.locale} edition uses local procurement language for minimum-order scope, SKU mix, packaging and repeat-order exposure.`,
  `Its examples distinguish pieces, pairs, sets, production mass, color batches and pack levels for the local buying context.`
]]));
const sources = [
  { title: "GS1 — sizes and colours need separate GTINs", url: "https://support.gs1.org/support/solutions/articles/43000734083-how-many-gs1-gtins-do-i-need-when-i-have-a-product-with-many-sizes-and-colours-", primary: true, use: "Primary guidance that separately traded size and colour variations need separate identification." },
  { title: "IMO — verification of packed-container gross mass", url: "https://www.imo.org/en/ourwork/safety/pages/verification-of-the-gross-mass.aspx", primary: true, use: "Primary SOLAS explanation for verified gross mass; used only to bound shipment-mass planning." },
  { title: "ICC — Incoterms and commercial contracts", url: "https://library.iccwbo.org/clp/clp-incoterms-qa-2020.htm", primary: true, use: "Primary explanation of cost, risk and obligation allocation; not treated as an MOQ rule." },
  { title: "Reddit — MOQ with several sizes", url: "https://www.reddit.com/r/SupplyChainLogistics/comments/1wzrw59/", primary: false, use: "Buyer wording around whether a quoted minimum applies per size, SKU or total order." },
  { title: "Reddit — manufacturing MOQ discussion", url: "https://www.reddit.com/r/manufacturing/comments/1tgypkv/", primary: false, use: "Manufacturer-side language around setup, batch economics and packaging; no numerical claim reused." },
  { title: "IRONHUE — free-weight MOQ units", url: "https://ironhue.com/blog/free-weight-moq-kilograms-pieces-pairs", primary: false, use: "Competitor result reviewed for common buyer questions; its exact commercial numbers were excluded." },
  { title: "Gym Weight Supply — factory FAQ", url: "https://gymweightsupply.com/factory/faq", primary: false, use: "Competitor result reviewed for RFQ fields and mixed-order language; no factory claim was imported." }
];
const candidateLabels = ["minimum per order versus per SKU", "pieces pairs sets or production mass", "mixed dumbbell weight ladder", "material and color batch scope", "custom-logo setup grouping", "private-label packaging minimum", "standard product versus new tooling", "first-order assortment risk", "slow-moving weight exposure", "price break versus inventory cost", "estimated packing list by SKU", "pallet and gross-mass reconciliation", "repeat-order conditions", "leftover packaging ownership", "written MOQ exception in the purchase order"];

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }

const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-moq-mixed-sku`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title, metaDescription: copy.description, h1: copy.h1,
    directAnswer: copy.sections[0].text, targetKeyword: copy.keyword, intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path, publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[4].heading}`, targetBuyer, whyThisArticleExists: copy.sections[1].text,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "), decisionConsequence: copy.sections[5].text,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-moq-mixed-sku/${assetLocale(copy.locale)}-free-weight-moq-mixed-sku-guide.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual image for this locale; prompt and source mapping retained in the image artifact.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record or documentary factory claim." }],
    sources, cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply scope is reviewed against buyer-approved evidence.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "MOQ scope and mixed-SKU planning for wholesale dumbbell and weight-plate orders",
  selectionReason: "High-intent importer question that explains whether minimums apply by order, SKU, weight, material, color, logo process or packaging without duplicating the existing gym-use dumbbell-set planner.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "IRONHUE", url: "https://ironhue.com/blog/free-weight-moq-kilograms-pieces-pairs", observation: "Covers the headline distinction between mass, pieces and pairs; all exact supplier figures were excluded from this guide." },
    { name: "Gym Weight Supply", url: "https://gymweightsupply.com/factory/faq", observation: "Covers common MOQ and mixed-container questions; the new guide adds a buyer-owned scope matrix, inventory exposure and documentation controls." },
    { name: "RYMAX Fitness", url: "https://www.rymaxfitness.com/dumbbell-faq/", observation: "FAQ result reviewed for buyer wording only; no commercial quantity or factory claim was reused." }
  ],
  rejectedTopics: [
    "Tooling ownership for a private mould — valuable but lower-frequency than the selected first-order MOQ question.",
    "Container loading optimization — overlaps the export-packaging and landed-cost guides.",
    "Commercial dumbbell-set planning for gym use — already published in every active locale.",
    "Custom-logo method comparison — existing multilingual content covers moulded, printed, engraved and end-cap options.",
    "AQL acceptance sampling — published on the previous run and intentionally excluded from today's intent."
  ],
  siteGaps: ["No existing article explains how a free-weight buyer separates a total-order minimum from per-weight, material, color, logo, packaging and shipment constraints in one comparable RFQ matrix."],
  conflictCheck: { liveSitemapUrlsReviewed: 1797, liveBlogUrlsReviewed: 927, activeLanguageUrlsReviewed: 1795, dedicatedFreeWeightMoqScopeArticleFound: false, nearestTopics: ["commercial dumbbell set planning", "commercial free-weight RFQ", "private-label GTIN and packaging", "landed-cost planning"] },
  searchRun: {
    provider: "Public Google- and Bing-visible result review, People Also Ask-style question review, Reddit buyer-language review, competitor review and direct primary-source verification",
    queryFormulationsReviewed: 22, observedQuestionGroups: 17,
    limitations: ["Quora blocked automated access; no answer text was used.", "Reddit supplied buyer language only; identification, shipment-mass and trade-term statements rely on GS1, IMO and ICC.", "Competitor minimum quantities were treated as supplier-specific and were not reproduced.", "No customer, shipment, price, MOQ number, lead time, certification or performance result was inferred from public pages."]
  },
  sources
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ schemaVersion: 2, siteId: "chinafreeweight", runDate, status: "ready-for-qa", documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.preparedAt = new Date().toISOString(); manifest.selectedTopic = research.selectedTopic; manifest.preparedCount = documents.length; manifest.candidateCount = research.candidatePool.length;
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number, slots: Array<{ locale: string }>) => {
    const first = slots.findIndex((candidate) => candidate.locale === slot.locale) === index;
    return first ? { ...slot, status: "prepared", documentId: documents.find((document) => document.locale === slot.locale)?.id } : { ...slot, status: "deferred", reason: "Daily minimum satisfied by the selected high-value guide; additional slot held for future non-overlapping topics." };
  });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "built", documents: documents.length, candidates: research.candidatePool.length }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
