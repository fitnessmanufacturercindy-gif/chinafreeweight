import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import englishCopies from "../../../content/i18n/free-weight-production-lead-time-copy-en.json";
import latamCopies from "../../../content/i18n/free-weight-production-lead-time-copy-latam.json";
import euWestCopies from "../../../content/i18n/free-weight-production-lead-time-copy-eu-west.json";
import euNorthCopies from "../../../content/i18n/free-weight-production-lead-time-copy-eu-north.json";
import apacCopies from "../../../content/i18n/free-weight-production-lead-time-copy-apac.json";

const copies = [...englishCopies, ...latamCopies, ...euWestCopies, ...euNorthCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-01";
const publishedAt = "2026-11-01T05:00:00.000Z";
const entityId = "custom-free-weight-production-lead-time-guide";
const targets = ["dumbbells-category", "weight-plates-category", "commercial-free-weight-rfq", "oem-sample-approval-free-weights", "custom-logo-free-weights", "free-weight-moq-mixed-sku-order-guide", "export-packaging-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/commercial-free-weight-rfq-checklist", "/resources/oem-free-weight-sample-approval-process", "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/free-weight-moq-mixed-sku-order-guide", "/resources/export-packaging-dumbbells-weight-plates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "project_sequence", "Fitness Brand"], "pt-BR": ["procurement_decision", "procurement_risk_map", "Distributor"], es: ["supplier_selection", "project_sequence", "Importer"],
  de: ["supplier_selection", "quality_failure_analysis", "Purchasing Manager"], fr: ["procurement_decision", "project_sequence", "Fitness Brand"], vi: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  sv: ["procurement_decision", "procurement_risk_map", "Purchasing Manager"], it: ["supplier_selection", "project_sequence", "Importer"], nl: ["procurement_decision", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"], ko: ["procurement_decision", "quality_failure_analysis", "Fitness Brand"], id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["procurement_decision", "procurement_risk_map", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `The ${copy.locale} edition uses local procurement language for schedule triggers, approvals, production milestones and logistics handoff.`,
  `Its examples distinguish the manufacturing path from sample development, buyer approvals, inspection, packing and international transit.`
]]));
const sources = [
  { title: "ISO 9001 — quality management systems", url: "https://www.iso.org/standard/9001.html", primary: true, use: "Primary overview for controlled processes, customer requirements and documented information; no certification claim is made." },
  { title: "ICC — Incoterms delivery, risk and costs", url: "https://library.iccwbo.org/clp/clp-incoterms-qa-2020.htm", primary: true, use: "Primary explanation for separating a named delivery point from a manufacturing completion milestone." },
  { title: "IMO — verification of packed-container gross mass", url: "https://www.imo.org/en/ourwork/safety/pages/verification-of-the-gross-mass.aspx", primary: true, use: "Primary SOLAS explanation used to keep verified gross mass within the later shipping stage." },
  { title: "Weight Supply — custom weights", url: "https://weightsupply.com/", primary: false, use: "Competitor result reviewed to identify fixed-range wording; its numeric promise was excluded." },
  { title: "Ivanko — custom urethane specifications", url: "https://ivankobarbell.com/pages/urethane-specs-engraving-and-warranty", primary: false, use: "Competitor result reviewed to compare the trigger used for a quoted schedule; no duration was reused." },
  { title: "OKPRO — B2B dumbbell sourcing guide", url: "https://www.okpro.com/blog/b2b-sourcing-guide-for-durable-dumbbell-manufacturing", primary: false, use: "Reviewed for overlapping buyer terminology; commercial quantities and timing claims were excluded." },
  { title: "Reddit — manufacturing shop stage visibility", url: "https://www.reddit.com/r/GarageGym/comments/1pxtbsb/lets_set_the_record_straight_the_reality_of/", primary: false, use: "Buyer-language evidence for visible fabrication, coating and packaging stages; no time claim was reused." }
];
const candidateLabels = ["definition of the production clock", "sample approval versus production", "construction-specific critical path", "tool and material readiness", "logo artwork release", "private-label packaging approval", "inspection booking point", "production completion versus packing", "factory handoff versus freight", "buyer change-control process", "repeat-order resource check", "milestone evidence in the RFQ", "Incoterms named-place boundary", "verified gross mass boundary", "schedule comparison checklist"];

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
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-production-lead-time`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title, metaDescription: copy.description, h1: copy.h1,
    directAnswer: copy.sections[0].text, targetKeyword: copy.keyword, intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path, publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[2].heading}`, targetBuyer, whyThisArticleExists: copy.sections[1].text,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "), decisionConsequence: copy.sections[5].text,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-production-lead-time/${assetLocale(copy.locale)}-free-weight-production-lead-time-guide.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual image for this locale; prompt, source and conversion mapping are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record or documentary factory claim." }],
    sources, cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply scope is reviewed against buyer-approved evidence.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Production lead time and critical-path planning for custom dumbbells and weight plates",
  selectionReason: "High-intent buyer question with no dedicated live article. The guide defines the production clock, separates manufacturing from development and freight, and avoids unverified universal timing claims.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Weight Supply", url: "https://weightsupply.com/", observation: "Publishes a fixed range from a commercial trigger; the guide excludes that figure and teaches buyers to align the scope and milestones." },
    { name: "Ivanko", url: "https://ivankobarbell.com/pages/urethane-specs-engraving-and-warranty", observation: "Uses customer approval and payment as schedule conditions for one program; the guide generalizes only the need to define a trigger." },
    { name: "OKPRO", url: "https://www.okpro.com/blog/b2b-sourcing-guide-for-durable-dumbbell-manufacturing", observation: "Combines sourcing, customization and schedule language; the new guide adds a buyer-controlled critical-path and evidence matrix." }
  ],
  rejectedTopics: [
    "Sample approval for OEM free weights — already published in every active locale.",
    "Custom logo method comparison — existing multilingual guide covers molded, printed, engraved and end-cap routes.",
    "MOQ scope and mixed-SKU planning — published on the previous daily run.",
    "Export packaging — existing guide owns the primary packaging intent.",
    "AQL inspection — existing guide owns the acceptance-sampling intent."
  ],
  siteGaps: ["No existing article defines the start and finish of a custom free-weight production schedule or maps product, branding, packaging, inspection and handoff dependencies in one buyer file."],
  conflictCheck: { liveSitemapUrlsReviewed: 1810, liveBlogUrlsReviewed: 940, activeLanguageUrlsReviewed: 1808, liveImageEntriesReviewed: 4498, dedicatedLeadTimeArticleFound: false, nearestTopics: ["OEM sample approval", "custom-logo methods", "commercial free-weight RFQ", "MOQ scope", "export packaging", "AQL inspection"] },
  searchRun: {
    provider: "DataForSEO Google and Bing results, People Also Ask extraction, Reddit buyer-language review, competitor review and direct primary-source verification",
    initialTasks: 28, successfulInitialTasks: 17, followupTasks: 6, successfulFollowupTasks: 6, organicUrls: 170, peopleAlsoAskQuestions: 16, reportedCostUsd: 0.17,
    limitations: ["Eleven initial tasks returned no result, an upstream error or an unsupported language field.", "Quora blocked automated access; no answer text was used.", "Competitor durations were treated as supplier-specific and were not reproduced.", "No customer, order quantity, price, duration, capacity, certification or performance result was inferred from public pages."]
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
    return first ? { ...slot, status: "prepared", documentId: documents.find((document) => document.locale === slot.locale)?.id } : { ...slot, status: "deferred", reason: "Daily minimum satisfied by the selected high-value guide; additional slot reserved for a future non-overlapping topic." };
  });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "built", documents: documents.length, candidates: research.candidatePool.length }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
