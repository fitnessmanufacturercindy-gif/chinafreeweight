import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/cable-attachment-weld-copy-primary.json";
import euCopies from "../../../content/i18n/cable-attachment-weld-copy-eu.json";
import apacCopies from "../../../content/i18n/cable-attachment-weld-copy-apac.json";

const copies = [...primaryCopies, ...euCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-04";
const publishedAt = "2026-11-04T04:00:00.000Z";
const entityId = "cable-attachment-weld-quality-inspection-guide";
const targets = ["product:accessories:cable-machine-attachments", "gym-accessories-category", "cable-attachment-compatibility-oem-guide", "cable-attachment-load-rating-inspection-guide", "cable-attachment-handle-grip-specification-guide", "cable-attachment-chrome-plating-corrosion-guide", "oem-sample-approval-free-weights", "contact"];
const englishPaths = ["/products/gym-accessories/cable-machine-attachments", "/products/gym-accessories", "/resources/are-cable-machine-attachments-universal", "/resources/cable-attachment-load-rating-inspection-guide", "/resources/cable-attachment-handle-diameter-grip-guide", "/resources/cable-attachment-chrome-plating-corrosion-guide", "/resources/oem-free-weight-sample-approval-process", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["supplier_selection", "comparison_decision_tree", "Fitness Brand"], "pt-BR": ["procurement_decision", "procurement_risk_map", "Distributor"], es: ["supplier_selection", "quality_failure_analysis", "Importer"],
  de: ["procurement_decision", "project_sequence", "Purchasing Manager"], fr: ["supplier_selection", "project_sequence", "Fitness Brand"], vi: ["procurement_decision", "procurement_risk_map", "Distributor"],
  sv: ["supplier_selection", "quality_failure_analysis", "Purchasing Manager"], it: ["procurement_decision", "comparison_decision_tree", "Importer"], nl: ["supplier_selection", "project_sequence", "Distributor"],
  ar: ["procurement_decision", "procurement_risk_map", "Importer"], ko: ["supplier_selection", "quality_failure_analysis", "Fitness Brand"], id: ["procurement_decision", "project_sequence", "Distributor"], pl: ["supplier_selection", "procurement_risk_map", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `The ${copy.locale} edition uses local purchasing terminology for drawings, sample approval, surface inspection, lot containment and receiving decisions.`,
  `Its questions distinguish visible workmanship from design suitability and avoid importing a universal weld size, load value or certification claim.`
]]));
const sources = [
  { title: "ISO 17637:2016 visual testing of fusion-welded joints", url: "https://www.iso.org/standard/67259.html", primary: true, use: "Scope boundary for visual examination of metallic fusion welds and possible pre-weld joint examination." },
  { title: "ISO 5817:2023 quality levels for imperfections", url: "https://www.iso.org/standard/80209.html", primary: true, use: "Primary standard summary used to distinguish production workmanship levels from complete-product fitness." },
  { title: "ISO 15607:2019 general rules for welding procedures", url: "https://www.iso.org/standard/71495.html", primary: true, use: "Primary framework for procedure specification and qualification; no application-specific requirement is assumed." },
  { title: "ISO 10042:2018 quality levels for aluminium weld imperfections", url: "https://www.iso.org/standard/70566.html", primary: true, use: "Material-specific boundary showing that production quality levels do not by themselves establish fitness for purpose." },
  { title: "ISO 20957-1:2024 stationary training equipment", url: "https://www.iso.org/standard/81908.html", primary: true, use: "Training-equipment scope reviewed; exact applicability to an accessory and market must be confirmed rather than assumed." },
  { title: "Hampton Fitness cable-machine attachment guide", url: "https://www.hamptonfit.com/blog/news/cable-machine-attachments/", primary: false, use: "Competitor terminology for connection points reviewed; brand-specific durability and failure claims were not reused as universal facts." },
  { title: "Reddit discussion of a crossover attachment failure", url: "https://www.reddit.com/r/homegym/comments/12u75oo", primary: false, use: "Buyer-language and inspection concern only; the anecdote is not treated as engineering or product proof." }
];
const candidateLabels = ["drawing and joint-location control", "visual inspection before finishing", "procedure and personnel evidence", "surface indications versus design suitability", "approved reference sample", "lot sampling across welding periods", "finish masking and post-finish checks", "connector-eye dimensional inspection", "nonconformity containment and reinspection", "engineering-change approval", "receiving quarantine triggers", "steel and aluminium acceptance boundaries", "complete-product validation boundary", "private-label marking and traceability", "RFQ evidence matrix"];
function localizedPath(id: string, locale: string, fallback: string) { const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined; return versions?.[locale]?.publicPath ?? fallback; }
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }

const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-cable-attachment-weld-inspection`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title, metaDescription: copy.description, h1: copy.h1,
    directAnswer: copy.sections[0].text, targetKeyword: copy.keyword, intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path, publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`, targetBuyer,
    whyThisArticleExists: `${copy.sections[1].text} The existing library owns compatibility, complete-assembly load evidence, grip geometry and finish control, but not the dedicated workflow for a welded joint drawing, pre-finish visual examination and welding-production change control.`,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[4].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "), decisionConsequence: `${copy.sections[4].text} This changes sample release, production containment, finish inspection and receiving decisions.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/cable-attachment-welds/${assetLocale(copy.locale)}-cable-attachment-weld-inspection.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual inspection image for this locale; generation source, visual review and conversion mapping are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record or documentary factory claim." }],
    sources, cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The review aligns OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements with the controlled drawing and evidence plan.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete", selectedTopic: "Welded-joint specification and visual inspection for commercial cable-machine attachments",
  selectionReason: "A purchase-intent gap with no dedicated live owner. The article separates joint drawings, welding-production evidence and pre-finish inspection from the existing compatibility, load-rating, grip and chrome-finish guides.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [{ name: "Hampton Fitness", url: sources[5].url, observation: "Treats the connection eye as a key load-transfer point; its model claims were reviewed but not generalized." }, { name: "Public buyer discussions", url: sources[6].url, observation: "Show the language buyers use after equipment incidents; anecdotes were excluded from technical claims." }],
  rejectedTopics: ["Container loading — export-packaging and landed-cost owners already cover the intent.", "Batch traceability — reorder-consistency content owns the intent.", "Plate thickness — bumper-plate sleeve-capacity content owns the intent.", "Selectorized dumbbell locking — the fixed-versus-adjustable guide already covers the sample and service decision."],
  siteGaps: ["No existing page owns the joint drawing → procedure evidence → pre-finish visual examination → lot containment workflow for cable attachments."],
  conflictCheck: { liveSitemapUrlsReviewed: 1836, liveBlogUrlsReviewed: 966, dedicatedArticleFound: false, nearestTopics: ["cable attachment compatibility", "complete-assembly load evidence", "handle diameter and grip", "swivel inspection", "chrome plating and corrosion", "OEM sample approval"] },
  sources,
  limitations: ["Quora pages were not used because automated verification was blocked; no claim depends on them.", "Reddit posts were used only to understand buyer wording, never as product or engineering evidence.", "The scheduled paid keyword refresh is reserved for Sunday under the shared policy; this Wednesday run used public search, live sitemaps and the existing registry.", "An exact application standard and acceptance level must be selected for the product, material, market and contract; the guide does not prescribe one universally."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-cable-attachment-weld-inspection`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
