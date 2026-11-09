import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/free-weight-corrective-action-copy-primary.json";
import euCopies from "../../../content/i18n/free-weight-corrective-action-copy-eu.json";
import apacCopies from "../../../content/i18n/free-weight-corrective-action-copy-apac.json";

const copies = [...primaryCopies, ...euCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-09";
const publishedAt = "2026-11-09T04:30:00.000Z";
const entityId = "free-weight-failed-inspection-corrective-action-guide";
const targets = ["factory", "pre-shipment-inspection-free-weights", "free-weight-aql-defect-classification-guide", "free-weight-reorder-batch-consistency", "oem-sample-approval-free-weights", "dumbbells-category", "weight-plates-category", "contact"];
const englishPaths = ["/factory", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/free-weight-reorder-batch-consistency", "/resources/oem-free-weight-sample-approval-process", "/products/dumbbells", "/products/weight-plates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["quality_control", "quality_failure_analysis", "Importer"],
  "pt-BR": ["supplier_selection", "procurement_risk_map", "Distributor"],
  es: ["procurement_decision", "project_sequence", "Importer"],
  de: ["quality_control", "technical_system_walkthrough", "Purchasing Manager"],
  fr: ["quality_control", "procurement_risk_map", "Fitness Brand"],
  vi: ["supplier_selection", "project_sequence", "Distributor"],
  sv: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
  it: ["quality_control", "quality_failure_analysis", "Importer"],
  nl: ["procurement_decision", "technical_system_walkthrough", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"]
};
const sources = [
  { title: "ISO/IAF review of nonconformity", url: "https://committee.iso.org/files/live/sites/tc176/files/PDF%20APG%20New%20Disclaimer%2012-2023/ISO-TC%20176-TF_APG-ReviewNonconformity.pdf", primary: true, use: "Separates correction from corrective action and requires evidence of implementation and effectiveness." },
  { title: "Harbor Freight pre-shipping inspection guide", url: "https://images.harborfreight.com/hftweb/global-sourcing/Harbor-Freight-ETQ-Pre-shipping-Inspection-Guide.pdf", primary: true, use: "A public buyer manual showing impact analysis, containment, sorting, rework, replacement, cause review and reinspection as distinct decisions." },
  { title: "ASQ supplier corrective action overview", url: "https://asq.org/quality-progress/articles/healing-ways?id=a2fcf84867b641af82c8dc8904a5aafc", primary: false, use: "Supports the sequence from containment through root cause, implementation, effectiveness and closure." },
  { title: "ASQ Eight Disciplines problem solving", url: "https://asq.org/quality-press/display-item?item=H1621", primary: false, use: "Industry reference for team-based containment, cause and permanent corrective action." },
  { title: "Reddit manufacturing discussion on supplier-fix verification", url: "https://www.reddit.com/r/manufacturing/comments/1war4ox/how_do_you_verify_a_supplier_fix_on_a_part_that/", primary: false, use: "Buyer vocabulary and recurring verification concerns only; not used as technical proof." },
  { title: "Reddit discussion on documenting supplier errors", url: "https://www.reddit.com/r/iso9001/comments/1x0wemf/how_do_i_document_a_supplier_error_aside_from_a/", primary: false, use: "Public practitioner wording around supplier nonconformity records only; no factual claim relies on comments." }
];
const candidateLabels = ["immediate shipment hold", "report identity review", "affected-scope tracing", "containment zones", "full-sort suitability", "rework approval", "replacement route", "written deviation authority", "reinspection plan", "rework-created risk", "occurrence versus escape cause", "supplier corrective response", "effectiveness evidence", "repeat-failure escalation", "purchase-order failure clause"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local procurement phrase “${copy.keyword}” and keeps a failed sample distinct from proof that every unit is defective.`,
  `Answers locally worded buyer questions including “${copy.faq[0][0]}” and “${copy.faq[2][0]}”.`
]]));

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
    id: `${runDate}-chinafreeweight-${copy.locale}-failed-inspection-corrective-action`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[4].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The live library explains how to inspect and how to classify defects, but no dedicated owner explains the post-failure path from release hold through containment, disposition, corrective action, reinspection and written release.`,
    independentInsights: [copy.sections[1].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[6].text} The record changes payment release, lot disposition, reinspection scope and the control required on a later order.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-corrective-action/${assetLocale(copy.locale)}-free-weight-corrective-action.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual editorial image for this locale; generation source, prompt brief, contact sheet, visual review and conversion mapping are retained in run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, protected logo, actual factory visit, inspection report or documentary lot claim." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review connects OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to the released specification, affected construction, disposition and buyer-controlled reinspection.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Corrective action, lot disposition and reinspection after a failed free-weight pre-shipment inspection",
  selectionReason: "A high-intent buyer problem with no dedicated live owner. Existing pages explain how to inspect and classify defects; this guide owns the next decision: hold release, define scope, contain, sort or rework, verify cause, reinspect and issue written release without treating one failed sample as proof about every unit.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Harbor Freight", url: sources[1].url, observation: "Public buyer-side manual provides a concrete disposition and reinspection sequence; the new article localizes that decision model to free-weight constructions without copying its text or contractual terms." },
    { name: "V-Trust", url: "https://www.v-trust.com/en/our-services/product-inspection/pre-shipment-inspection", observation: "Inspection-service content emphasizes the pass/fail report; the new guide addresses what the free-weight buyer should document after a failure." },
    { name: "HQTS", url: "https://www.hqts.com/what-happens-if-pre-shipment-inspection-fails/", observation: "Industry coverage confirms recurring buyer concern about failed inspection; the new guide adds affected-scope tracing, rework-created risk and written release authority." }
  ],
  rejectedTopics: ["RFQ comparison — dedicated commercial free-weight RFQ owner exists.", "OEM sample approval — dedicated multilingual owner exists.", "AQL and defect classification — dedicated multilingual owner exists.", "Test-report verification — recent exact multilingual owner exists.", "Tooling ownership — yesterday's exact multilingual owner is live."],
  siteGaps: ["No page owns the failed inspection → release hold → affected scope → containment → disposition → cause → effectiveness → reinspection → written release workflow."],
  conflictCheck: { liveSitemapUrlsReviewed: 1888, repositoryPublishedVersionsReviewed: 1874, dedicatedArticleFound: false, nearestTopics: ["pre-shipment inspection planning", "AQL defect classification", "OEM sample approval", "reorder batch consistency", "test-report verification"] },
  sources,
  publicSearch: { queriesReviewed: 26, markets: copies.map((copy) => copy.locale), recurringQuestions: ["Does a failed sample mean the whole lot is defective?", "Should the balance be paid after failure?", "Who pays for reinspection?", "Are supplier photos enough?", "Can the buyer accept a deviation?", "What if a supplier resists a second inspection?"] },
  paidSearchRefresh: { status: "not-scheduled", reason: "2026-11-09 is Monday; the repository protocol reserves the weekly paid refresh for Sunday." },
  limitations: ["Quora pages were not used because automated verification was blocked; no claim depends on Quora.", "Reddit was used only for buyer wording and recurring questions, never as technical or contractual proof.", "No universal rule is claimed for payment, reinspection cost, deviation authority or supplier liability; signed terms control the commercial decision.", "No customer, project, quantity, price, MOQ, lead time, test result, certification or factory performance claim is made.", "Images are conceptual editorial scenes, not evidence of an actual order, failed lot, customer, inspection visit or factory event."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-failed-inspection-corrective-action`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
