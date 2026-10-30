import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import copies from "../../../content/i18n/free-weight-aql-inspection-guide-copy.json";

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-10-30";
const publishedAt = "2026-10-30T04:50:00.000Z";
const entityId = "free-weight-aql-defect-classification-guide";
const targets = ["dumbbells-category", "weight-plates-category", "commercial-free-weight-rfq", "oem-sample-approval-free-weights", "pre-shipment-inspection-free-weights", "weight-plate-tolerance-bulk-order-guide", "export-packaging-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/commercial-free-weight-rfq-checklist", "/resources/oem-free-weight-sample-approval-process", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/resources/weight-plate-tolerance-bulk-order-guide", "/resources/export-packaging-dumbbells-weight-plates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["quality_control", "procurement_risk_map", "Fitness Brand"], "pt-BR": ["quality_control", "project_sequence", "Distributor"], es: ["supplier_selection", "procurement_risk_map", "Importer"],
  de: ["quality_control", "quality_failure_analysis", "Purchasing Manager"], fr: ["quality_control", "project_sequence", "Fitness Brand"], vi: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  sv: ["supplier_selection", "procurement_risk_map", "Purchasing Manager"], it: ["quality_control", "project_sequence", "Importer"], nl: ["quality_control", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"], ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"], id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["quality_control", "procurement_risk_map", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `The ${copy.locale} edition uses local procurement language for AQL, defect classes, lot traceability and pre-shipment acceptance.`,
  `Its examples distinguish dimensional results, product function, branding zones and packing evidence for the local buyer context.`
]]));
const sources = [
  { title: "ISO 2859-1:2026", url: "https://www.iso.org/standard/2859-1", primary: true, use: "Current edition scope: AQL-indexed sampling schemes for lot-by-lot inspection and switching rules." },
  { title: "ASQ — Sampling", url: "https://asq.org/quality-resources/sampling", primary: true, use: "Explains what random samples can infer and why sampling does not identify the location or cause of defects." },
  { title: "ASQ Quality Glossary", url: "https://asq.org/quality-resources/quality-glossary", primary: true, use: "Definitions for AQL, acceptance sampling, acceptance number, sample and random sampling." },
  { title: "ASQ — Standards resources", url: "https://asq.org/quality-resources/learn-about-standards", primary: true, use: "Reference point for ANSI/ASQ Z1.4 sampling by attributes; no tables or acceptance numbers are reproduced." },
  { title: "Reddit buyer discussion — loose dumbbell heads", url: "https://www.reddit.com/r/homegym/comments/k9efp5", primary: false, use: "Buyer wording around loose-head concerns; not used as standards or product-safety evidence." },
  { title: "DZSD — gym equipment factory inspection guide", url: "https://dzsfitness.com/guides/factory-inspection-gym-equipment", primary: false, use: "Competitor coverage confirms broad AQL intent; numerical recommendations and claims were not reused." },
  { title: "ChaHang — free-weight quality control", url: "https://www.chahangdumbbell.com/quality-control", primary: false, use: "Competitor product matrix reviewed for scope only; no unverified claim was imported." }
];
const candidateLabels = ["critical-major-minor defect catalogue", "AQL is not a permitted defect percentage", "lot definition for mixed SKU orders", "random carton selection across pallets", "weight tolerance as numerical evidence", "plate bore and bar sleeve fit", "dumbbell head retention finding", "custom-logo zone severity", "coating boundary samples", "carton and label mismatch", "zero-acceptance critical class decision", "reinspection after sorting or rework", "written concession by exact lot", "AQL versus full inspection", "supplier corrective action after repeated findings"];

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
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-aql-inspection`, siteId: "chinafreeweight", runDate, locale: copy.locale,
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
    images: [{ src: `/assets/resources/free-weight-aql-inspection/${assetLocale(copy.locale)}-free-weight-aql-inspection-guide.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual image for this locale; prompt and source mapping retained in the image artifact.", rights: "Commissioned original for ChinaFreeWeight; no customer project, third-party brand, completed test or documentary factory claim." }],
    sources, cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply scope is reviewed against buyer-approved evidence.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "AQL acceptance sampling and defect classification for wholesale free-weight orders",
  selectionReason: "High-intent importer question that complements the existing pre-shipment guide by defining defect classes, lot/SKU coverage, numerical evidence and post-rejection action without duplicating the inspection sequence.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "DZSD", url: "https://dzsfitness.com/guides/factory-inspection-gym-equipment", observation: "Broad AQL and inspection overview; it does not provide this guide's free-weight-specific consequence/evidence matrix." },
    { name: "ChaHang", url: "https://www.chahangdumbbell.com/quality-control", observation: "Product-specific QC matrix reviewed as competitor context; no numerical or factory claim was reused." },
    { name: "TradeAiders", url: "https://www.tradeaiders.com/de/dumbbell-and-kettlebell-inspection-checklist.html", observation: "Inspection-service checklist reviewed; the article remains focused on buyer-owned defect classification and lot decisions." }
  ],
  rejectedTopics: [
    "CPU versus TPU dumbbells — overlaps the existing rubber-versus-urethane and material guides.",
    "Container loading optimization — overlaps the export-packaging and landed-cost guides.",
    "Dumbbell weight tolerance alone — existing weighed-dumbbell and tolerance content already covers the main intent.",
    "General pre-shipment inspection — already published in every active locale.",
    "Cable weld inspection alone — overlaps compatibility and load-path guides and lacks a distinct broad buyer decision gap."
  ],
  siteGaps: ["No existing article defined how a buyer converts consequences into critical, major and minor findings across mixed free-weight SKUs, or how rejection, containment and reinspection should be documented."],
  conflictCheck: { liveSitemapUrlsReviewed: 1784, liveBlogUrlsReviewed: 914, activeLanguageUrlsReviewed: 1782, dedicatedAqlDefectClassificationArticleFound: false, nearestTopics: ["pre-shipment inspection", "OEM sample approval", "weight-plate tolerances", "dumbbell head retention"] },
  searchRun: {
    provider: "Public Google and Bing result review, Reddit buyer-language review, competitor review and direct primary-source verification",
    queryFormulationsReviewed: 24, observedQuestionGroups: 18,
    limitations: ["Quora blocked automated access; no answer text was used.", "Reddit supplied buyer language only; standards claims rely on ISO and ASQ.", "ISO table values are not reproduced because buyers must select the purchased standard edition and contractual plan.", "No customer, shipment, price, MOQ, certification or performance result was inferred from public pages."]
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
