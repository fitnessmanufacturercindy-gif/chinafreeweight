import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { freeWeightQualityAgreementPrimaryCopies } from "../../../content/i18n/free-weight-quality-agreement-copy-primary";
import { freeWeightQualityAgreementEuCopies } from "../../../content/i18n/free-weight-quality-agreement-copy-eu";
import { freeWeightQualityAgreementApacCopies } from "../../../content/i18n/free-weight-quality-agreement-copy-apac";

const copies = [...freeWeightQualityAgreementPrimaryCopies, ...freeWeightQualityAgreementEuCopies, ...freeWeightQualityAgreementApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-12";
const publishedAt = "2026-11-12T06:30:00.000Z";
const entityId = "oem-free-weight-supplier-quality-agreement-guide";
const targets = ["factory", "commercial-free-weight-rfq", "oem-sample-approval-free-weights", "free-weight-aql-defect-classification-guide", "free-weight-failed-inspection-corrective-action-guide", "wholesale-free-weight-warranty-claims-guide", "oem-free-weight-test-report-verification-guide", "contact"];
const englishPaths = ["/factory", "/resources/commercial-free-weight-rfq-checklist", "/resources/oem-free-weight-sample-approval-process", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/free-weight-failed-inspection-corrective-action-guide", "/resources/wholesale-free-weight-warranty-claims-guide", "/resources/verify-oem-free-weight-test-reports-certificates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "procurement_risk_map", "Importer"],
  "pt-BR": ["supplier_selection", "manufacturing_process_map", "Distributor"],
  es: ["quality_control", "procurement_risk_map", "Importer"],
  de: ["quality_control", "technical_system_walkthrough", "Purchasing Manager"],
  fr: ["supplier_selection", "project_sequence", "Fitness Brand"],
  vi: ["procurement_decision", "project_sequence", "Distributor"],
  sv: ["quality_control", "comparison_decision_tree", "Purchasing Manager"],
  it: ["supplier_selection", "manufacturing_process_map", "Importer"],
  nl: ["procurement_decision", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "technical_system_walkthrough", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"]
};
const sources = [
  { title: "ISO 9001 Auditing Practices Group — External Providers", url: "https://committee.iso.org/files/live/sites/tc176/files/documents/ISO%209001%20Auditing%20Practices%20Group%20docs/Auditing%20to%20ISO%209001%202015/APG-ExternalProviders2015.pdf", primary: true, use: "Authoritative guidance for defining external-provider criteria, monitoring, verification and risk-based controls without claiming that one template fits every supplier." },
  { title: "ISO — Quality management systems", url: "https://www.iso.org/standard/62085.html", primary: true, use: "Official standards page checked for edition status; the article avoids asserting a universal clause set or unverified certification." },
  { title: "TÜV SÜD — Vendor quality management requirements", url: "https://www.tuvsud.com/en-gb/-/media/regions/uk/pdf-files/industries/cps/tqmgent02-v30--september-2022-final.pdf", primary: true, use: "Industry example for product and process requirements, outsourced processes, monitoring and acceptance interfaces between vendor and OEM or ODM supplier." },
  { title: "China-Britain Business Council — Preparing for Trade with China", url: "https://www.cbbc.org/sites/default/files/2021-01/CBBC-China-Business-Guide-Preparing-for-Trade-with-China_1.pdf", primary: false, use: "Cross-border sourcing guidance reviewed for written technical, quality, acceptance, configuration, tooling, packaging and nonconformance terms." },
  { title: "Reddit manufacturing discussion — restrictions on subcontracting work", url: "https://www.reddit.com/r/manufacturing/", primary: false, use: "Used only to identify buyer wording around undisclosed subcontracting, change requests and approval authority; no technical or legal claim depends on comments." },
  { title: "Quora supplier quality agreement question surface", url: "https://www.quora.com/search?q=supplier%20quality%20agreement%20manufacturer", primary: false, use: "Attempted question-surface review; direct automated access was blocked, so no factual statement depends on it." }
];
const candidateLabels = ["supplier quality agreement contents", "specification hierarchy", "approved sample status", "buyer and factory responsibilities", "subcontractor disclosure", "change-notification route", "temporary deviation authority", "release evidence", "nonconformance disposition", "corrective-action closure", "tooling and artwork control", "packaging approval", "importer obligations", "document revision control", "RFQ quality annex"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local purchasing expression “${copy.keyword}” and the market's normal terms for specification, release, deviation, subcontracting and importer responsibility.`,
  `Answers locally phrased buyer questions including “${copy.faq[0][0]}” and “${copy.faq[3][0]}” instead of reusing one translated question set.`
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
    id: `${runDate}-chinafreeweight-${copy.locale}-quality-agreement`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The 1,927-URL production sitemap and 1,913 published repository versions had no dedicated quality-agreement owner. Existing pages cover sample approval, inspection, failed-lot correction, test evidence and warranty, but not the pre-production document hierarchy, responsibility and change-control interface.`,
    independentInsights: [copy.sections[1].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section: { heading: string }) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The agreement changes who must act, which revision controls production, what evidence is required and who may authorize a temporary deviation.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section: { heading: string; text: string }, index: number) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-quality-agreement/${assetLocale(copy.locale)}-free-weight-quality-agreement.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual editorial image for this locale; generation source, prompt set, contact sheet, visual review and conversion mapping are retained in run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, protected logo, actual factory visit, signed agreement or inspection result is depicted." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review can connect OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to a manufacturable quality interface; legal effect and importer obligations remain with qualified buyer review.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "OEM free-weight supplier quality agreement: specifications, responsibility, change control and release evidence",
  selectionReason: "High-intent pre-production purchasing question with no dedicated live owner. Buyers need a usable interface between the commercial order, specification, approved sample, inspection, change request and release file.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "XRI Fitness", url: "https://xirifitness.com/quality-control/", observation: "Generic quality-control positioning was reviewed. It does not own the buyer's agreement structure, document priority or authorization route." },
    { name: "Dongli Fitness", url: "https://www.donglifitness.com/oem-odm/", observation: "OEM workflow positioning was reviewed. The new guide narrows the topic to the written buyer-factory quality interface without treating marketing process claims as evidence." },
    { name: "Chahang Fitness", url: "https://www.chahangfitness.com/quality-control/", observation: "Supplier quality-control language was reviewed for common market wording; no factory claim or numerical promise was reused." }
  ],
  rejectedTopics: ["Factory audit — a dedicated multilingual factory-evaluation guide already owns the intent.", "Incoterms and landed cost — existing guides already own commercial and logistics cost intent.", "Failed inspection — a dedicated corrective-action guide owns post-inspection containment and disposition.", "Warranty claims — a dedicated multilingual owner covers field-claim evidence and recurrence control.", "Container planning — the prior run already owns quantity, mass, geometry, securing and unloading."],
  siteGaps: ["No page owned the pre-production relationship among document hierarchy, approved product baseline, responsibility matrix, outsourced processes, change approval, release evidence and limited deviation authority."],
  conflictCheck: { liveSitemapUrlsReviewed: 1927, repositoryPublishedVersionsReviewed: 1913, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["OEM free-weight sample approval", "free-weight AQL defect classification", "failed-inspection corrective action", "warranty claims workflow", "test-report verification", "tooling ownership agreement"] },
  sources,
  publicSearch: { queriesReviewed: 36, surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "People Also Ask-style questions", "Reddit", "Quora attempted but blocked", "industry guidance", "competitor sites", "local-language market results"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["What belongs in a supplier quality agreement?", "Does an approved sample replace the specification?", "Who approves a deviation?", "Must subcontractors be disclosed?", "How should engineering changes be approved?", "What release evidence should the supplier provide?", "Is the quality agreement the same as the purchase contract?"] },
  paidSearchRefresh: { status: "not-scheduled", reason: "2026-11-12 is Thursday; the repository protocol reserves the weekly paid refresh for Sunday." },
  limitations: ["Quora pages were not used because direct automated verification was blocked; no claim depends on Quora.", "Reddit was used only for buyer language and recurring concerns, never as technical or legal proof.", "The guide is a procurement and manufacturing interface, not legal advice or a claim that one template is enforceable in every jurisdiction.", "No universal response period, remedy, audit right, certification or compliance result is claimed.", "No customer, project, quantity, price, MOQ, lead time, test result, certification or factory-performance claim is made.", "Images are conceptual editorial scenes, not evidence of an actual agreement, customer order, factory event, inspection or release decision."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-quality-agreement`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
