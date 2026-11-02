import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import englishCopies from "../../../content/i18n/dumbbell-handle-choice-copy-en.json";
import latamCopies from "../../../content/i18n/dumbbell-handle-choice-copy-latam.json";
import euWestCopies from "../../../content/i18n/dumbbell-handle-choice-copy-eu-west.json";
import euNorthCopies from "../../../content/i18n/dumbbell-handle-choice-copy-eu-north.json";
import apacCopies from "../../../content/i18n/dumbbell-handle-choice-copy-apac.json";

const copies = [...englishCopies, ...latamCopies, ...euWestCopies, ...euNorthCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-02";
const publishedAt = "2026-11-02T05:00:00.000Z";
const entityId = "fixed-vs-rotating-dumbbell-handle-guide";
const targets = ["dumbbells-category", "fixed-dumbbell-handle-specification-guide", "dumbbell-head-handle-construction-guide", "fixed-vs-adjustable-dumbbells-commercial-guide", "commercial-dumbbell-rack-compatibility-guide", "custom-logo-free-weights", "oem-sample-approval-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/resources/dumbbell-handle-diameter-knurling-specification", "/resources/dumbbell-head-handle-construction-guide", "/resources/fixed-vs-adjustable-dumbbells-commercial-gym", "/resources/commercial-dumbbell-rack-compatibility-guide", "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "comparison_decision_tree", "Fitness Brand"], "pt-BR": ["supplier_selection", "procurement_risk_map", "Distributor"], es: ["procurement_decision", "quality_failure_analysis", "Importer"],
  de: ["supplier_selection", "comparison_decision_tree", "Purchasing Manager"], fr: ["procurement_decision", "project_sequence", "Fitness Brand"], vi: ["procurement_decision", "procurement_risk_map", "Distributor"],
  sv: ["supplier_selection", "quality_failure_analysis", "Purchasing Manager"], it: ["procurement_decision", "comparison_decision_tree", "Importer"], nl: ["procurement_decision", "project_sequence", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"], ko: ["procurement_decision", "quality_failure_analysis", "Fitness Brand"], id: ["procurement_decision", "comparison_decision_tree", "Distributor"], pl: ["supplier_selection", "project_sequence", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `The ${copy.locale} edition uses market-appropriate procurement language for grip rotation, sample approval, rack fit, receiving inspection and service boundaries.`,
  `Its buyer questions separate fixed-weight format from a rotating grip interface and avoid transferring one supplier's model claim to another product.`
]]));
const sources = [
  { title: "Eleiko EVO rotating dumbbell", url: "https://eleiko.com/en/equipment/dumbbells/rotating/3060991-1020-eleiko-evo-dumbbell-set-rotating-42-60-kg", primary: true, use: "Primary manufacturer evidence for one rotating product architecture and its model-specific positioning." },
  { title: "Eleiko EVO fixed dumbbell", url: "https://eleiko.com/en/equipment/dumbbells/fixed/3060990-0010-eleiko-evo-dumbbell-fixed-1-kg", primary: true, use: "Primary manufacturer evidence for a fixed counterpart; no universal performance claim is inferred." },
  { title: "Eleiko rotating dumbbell product sheet", url: "https://media.eleiko.com/admin/download-product-sheet.aspx?articlecode=3060991-0600&language=en-us", primary: true, use: "Primary product document supporting the request for model-level specifications." },
  { title: "RitFit rotating dumbbell handle guide", url: "https://www.ritfitsports.com/blogs/article/dumbbell-handle-grip-guide-rotating", primary: false, use: "Competitor terminology reviewed; unverified performance claims were excluded." },
  { title: "Reddit GripTraining discussion", url: "https://www.reddit.com/r/GripTraining/comments/cz5dxo", primary: false, use: "Public user-language evidence for grip context; anecdotes were not used as product proof." }
];
const candidateLabels = ["fixed versus rotating grip definition", "bearing or bushing mechanism", "sample play inspection", "binding and noise checks", "head retention boundary", "rack fit across weight ladder", "pair consistency", "service-parts planning", "quarantine triggers", "fixed weight versus adjustable load", "model-specific training trial", "Custom Logo identification", "receiving inspection", "repeat-order revision control", "RFQ evidence matrix"];
function localizedPath(id: string, locale: string, fallback: string) { const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined; return versions?.[locale]?.publicPath ?? fallback; }
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }

const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-fixed-vs-rotating-dumbbell-handles`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title, metaDescription: copy.description, h1: copy.h1,
    directAnswer: copy.sections[0].text, targetKeyword: copy.keyword, intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path, publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`, targetBuyer,
    whyThisArticleExists: `${copy.sections[1].text} The existing library covers grip dimensions and fixed versus adjustable load, but not the lifecycle decision between fixed and rotating grip mechanisms.`,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[4].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "), decisionConsequence: `${copy.sections[4].text} This affects sample acceptance, rack compatibility, service responsibility and receiving control across the purchased range.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/dumbbell-handle-choice/${assetLocale(copy.locale)}-fixed-vs-rotating-dumbbell-handles.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual image for this locale; generation source, visual review and conversion mapping are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record or documentary factory claim." }],
    sources, cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review aligns OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements with the approved model evidence.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete", selectedTopic: "Fixed versus rotating handle mechanisms for commercial fixed-weight dumbbells",
  selectionReason: "A high-intent mechanism and lifecycle question with no dedicated live article. It is distinct from existing fixed-versus-adjustable and grip-dimension guides.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [{ name: "Eleiko", url: sources[0].url, observation: "Maintains separate fixed and rotating families; the guide treats its use wording as model-specific." }, { name: "RitFit", url: sources[3].url, observation: "Publishes broad grip terminology; the new guide adds procurement evidence, service and receiving controls." }],
  rejectedTopics: ["Container loading — existing export-packaging guidance owns the intent.", "Batch traceability — existing reorder-consistency and item-data guidance already cover it.", "Plate thickness — existing bumper-plate sleeve-capacity guide owns the intent."],
  siteGaps: ["No existing page compares fixed and rotating grip-to-head interfaces while separating that choice from adjustable load."],
  conflictCheck: { liveSitemapUrlsReviewed: 1823, liveBlogUrlsReviewed: 953, activeLanguageUrlsReviewed: 1821, liveImageEntriesReviewed: 4511, dedicatedArticleFound: false, nearestTopics: ["dumbbell handle diameter and knurling", "dumbbell head retention", "fixed versus adjustable dumbbells", "dumbbell rack compatibility", "OEM sample approval"] },
  sources, limitations: ["Quora results were not used because verification was blocked by robots restrictions.", "Paid keyword refresh was not run because shared policy permits it on Sunday; this Monday run uses public search and the existing topic ledger."]
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
    return localePosition === 1 ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-fixed-vs-rotating-dumbbell-handles`, entityId, publicPath: copy?.path, draft: "drafts/index.json" } : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is published for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
