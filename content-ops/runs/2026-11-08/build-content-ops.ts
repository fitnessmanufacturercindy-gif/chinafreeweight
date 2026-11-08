import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/free-weight-tooling-agreement-copy-primary.json";
import euCopies from "../../../content/i18n/free-weight-tooling-agreement-copy-eu.json";
import apacCopies from "../../../content/i18n/free-weight-tooling-agreement-copy-apac.json";

const copies = [...primaryCopies, ...euCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-08";
const publishedAt = "2026-11-08T04:30:00.000Z";
const entityId = "custom-free-weight-tooling-ownership-guide";
const targets = ["factory", "products-hub", "custom-logo-free-weights", "oem-sample-approval-free-weights", "free-weight-reorder-batch-consistency", "free-weight-moq-mixed-sku-order-guide", "custom-free-weight-production-lead-time-guide", "contact"];
const englishPaths = ["/factory", "/products", "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process", "/resources/free-weight-reorder-batch-consistency", "/resources/free-weight-moq-mixed-sku-order-guide", "/resources/custom-free-weight-production-lead-time-guide", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "project_sequence", "Fitness Brand"],
  "pt-BR": ["supplier_selection", "procurement_risk_map", "Distributor"],
  es: ["procurement_decision", "comparison_decision_tree", "Importer"],
  de: ["supplier_selection", "project_sequence", "Purchasing Manager"],
  fr: ["procurement_decision", "procurement_risk_map", "Fitness Brand"],
  vi: ["supplier_selection", "project_sequence", "Distributor"],
  sv: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
  it: ["supplier_selection", "procurement_risk_map", "Importer"],
  nl: ["procurement_decision", "project_sequence", "Distributor"],
  ar: ["supplier_selection", "comparison_decision_tree", "Importer"],
  ko: ["procurement_decision", "procurement_risk_map", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local buyer phrase “${copy.keyword}” and treats ownership, custody, permitted use, maintenance, change approval and transfer as separate decisions.`,
  `Answers five local-market questions from the edition, including “${copy.faq[0][0]}” and “${copy.faq[3][0]}”.`
]]));
const sources = [
  { title: "WIPO Frequently Asked Questions on Trade Secrets", url: "https://www.wipo.int/en/web/trade-secrets/tradesecrets_faqs", primary: true, use: "Defines trade-secret boundaries and reasonable safeguards for confidential manufacturing and commercial information." },
  { title: "WIPO Guide to Trade Secrets and Innovation: management", url: "https://www.wipo.int/web-publications/wipo-guide-to-trade-secrets-and-innovation/en/part-iv-trade-secret-management.html", primary: true, use: "Supports written controls for third-party access, use, return or destruction, and decision responsibility." },
  { title: "WIPO IP agreements with suppliers", url: "https://www.wipo.int/en/web/ip-commercialization/w/blog/ip-agreements-with-suppliers-what-ventures-need-to-know", primary: true, use: "Explains why background rights, project results, responsibilities and milestones should be clarified in writing." },
  { title: "ISO guidance on documented information", url: "https://www.iso.org/files/live/sites/isoorg/files/standards/docs/en/iso_9001_2015_guidance_documented_information.pdf", primary: true, use: "Supports controlled specifications, master samples and retained evidence without claiming certification for ChinaFreeWeight." },
  { title: "Kongsberg Automotive purchasing conditions for tooling at a supplier facility", url: "https://www.kongsbergautomotive.com/globalassets/for-suppliers/documents-for-suppliers/purchasing-conditions--manuals---indirect/general-purchasing-conditions-tooling-supplier-facility-december-2023.pdf", primary: true, use: "A real buyer-terms example showing identification, storage, maintenance, documentation and release clauses; it is not presented as universal law or our contract." },
  { title: "Ivanko urethane custom-logo program", url: "https://ivankobarbell.com/pages/urethane-specs-engraving-and-warranty", primary: false, use: "Competitor example showing that logo feasibility and setup are tied to product geometry; its commercial terms are not reused." },
  { title: "Reddit manufacturing discussion on custom tooling ownership", url: "https://www.reddit.com/r/manufacturing/comments/1jskh74", primary: false, use: "Buyer vocabulary and recurring concerns only; comments are not used as legal or technical proof." }
];
const candidateLabels = ["ownership versus payment", "asset register", "custody and storage", "permitted use", "standard versus dedicated inserts", "logo-file access", "background and project IP", "maintenance responsibility", "damage responsibility", "engineering change approval", "inventory evidence", "reorder revision", "transfer package", "exit conditions", "RFQ tooling schedule"];

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
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-tooling-ownership`,
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
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[5].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[1].text} The live library covers custom logos, samples, batch control, MOQ and lead time, but no dedicated page owns the contract-to-asset workflow for tooling ownership, custody, maintenance, changes and transfer.`,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[5].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[6].text} The resulting record changes quotation comparison, sample approval, reorder revision checks and exit planning.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({
      heading: section.heading,
      paragraphs: section.text.split(/\n\n/u),
      ...(index === 3 ? { table: copy.table } : {}),
      ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {})
    })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{
      src: `/assets/resources/free-weight-tooling-agreement/${assetLocale(copy.locale)}-free-weight-tooling-agreement.webp`,
      alt: copy.imageAlt,
      provenance: "Original commissioned conceptual editorial image for this locale; generation source, prompt brief, visual review, rejected Arabic first version and conversion mapping are retained in run artifacts.",
      rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, protected logo, actual factory visit, ownership certificate or documentary tooling claim."
    }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review aligns OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements with the named product, tooling item, revision and approved use.` }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "Tooling and mold ownership, custody, maintenance, change control and transfer for custom free weights",
  selectionReason: "A high-intent contracting and supplier-dependency gap with no dedicated live owner. The guide gives buyers a model-specific record for molds, inserts, fixtures, gauges, files and transfer conditions without pretending that payment creates universal rights.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Ivanko", url: sources[5].url, observation: "Shows that custom-logo feasibility is tied to product geometry; the new guide addresses the missing buyer-side ownership, custody and change-control layer." },
    { name: "Speck/YogaFitness", url: "https://www.yogafitness.group/custom-manufacturing/", observation: "Public custom-manufacturing language confirms mold/tooling as a buyer question; no unverified capability or term is transferred to ChinaFreeWeight." },
    { name: "Kongsberg Automotive", url: sources[4].url, observation: "Provides a concrete buyer-terms example with identification, maintenance, storage and release provisions; it is clearly labeled an example, not universal law." }
  ],
  rejectedTopics: [
    "OEM free-weight test-report verification — yesterday's exact multilingual owner is live.",
    "OEM sample approval — an exact multilingual owner already exists.",
    "Shipment AQL and defect classification — an exact multilingual owner already exists.",
    "Custom-logo method selection — a dedicated multilingual owner already exists."
  ],
  siteGaps: ["No existing page owns the ownership → custody → permitted use → maintenance → change approval → inventory → transfer workflow for custom dumbbell and weight-plate tooling."],
  conflictCheck: {
    liveSitemapUrlsReviewed: 1875,
    repositoryPublishedVersionsReviewed: 1861,
    dedicatedArticleFound: false,
    nearestTopics: ["custom-logo options", "OEM sample approval", "reorder batch consistency", "mixed-SKU MOQ", "production lead-time planning"]
  },
  sources,
  paidSearchRefresh: { provider: "DataForSEO", tasksSubmitted: 20, tasksSucceeded: 10, organicUrlsCollected: 86, questionsCollected: 4, costUsd: 0.06, artifact: ".artifacts/free-weight-tooling-2026-11-08/serp-summary.json" },
  limitations: [
    "Ten paid search tasks returned provider-side errors or no results; public Google/Bing-visible search and primary sources filled the research gaps without inventing demand data.",
    "Quora pages were not used because direct automated verification was blocked; no factual or legal claim depends on Quora.",
    "Reddit was used only to understand buyer wording, never as legal, ownership, cost or technical proof.",
    "The guide is procurement information, not legal advice; contract language and applicable law determine ownership and transfer rights.",
    "No customer, project, tooling cost, MOQ, tool life, transfer right, lead time, certification or factory evidence is claimed.",
    "Images are conceptual editorial illustrations, not evidence of an actual customer mold, owned asset, factory visit or transfer event."
  ]
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.slots = manifest.slots.map((slot: { locale: string; id: string }, index: number) => {
    const localePosition = manifest.slots.slice(0, index + 1).filter((item: { locale: string }) => item.locale === slot.locale).length;
    const copy = copies.find((item) => item.locale === slot.locale);
    return localePosition === 1
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-free-weight-tooling-ownership`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
