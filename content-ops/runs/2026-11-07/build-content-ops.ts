import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/free-weight-test-report-copy-primary.json";
import euCopies from "../../../content/i18n/free-weight-test-report-copy-eu.json";
import apacCopies from "../../../content/i18n/free-weight-test-report-copy-apac.json";

const copies = [...primaryCopies, ...euCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-07";
const publishedAt = "2026-11-07T04:30:00.000Z";
const entityId = "oem-free-weight-test-report-verification-guide";
const targets = ["factory", "oem-sample-approval-free-weights", "free-weight-aql-defect-classification-guide", "free-weight-reorder-batch-consistency", "olympic-barbell-tensile-yield-strength-guide", "fixed-dumbbell-impact-validation-guide", "custom-free-weight-production-lead-time-guide", "contact"];
const englishPaths = ["/factory", "/resources/oem-free-weight-sample-approval-process", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/free-weight-reorder-batch-consistency", "/resources/olympic-barbell-tensile-yield-strength-guide", "/resources/fixed-dumbbell-impact-validation-guide", "/resources/custom-free-weight-production-lead-time-guide", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "project_sequence", "Fitness Brand"],
  "pt-BR": ["supplier_selection", "procurement_risk_map", "Distributor"],
  es: ["procurement_decision", "quality_failure_analysis", "Importer"],
  de: ["supplier_selection", "project_sequence", "Purchasing Manager"],
  fr: ["procurement_decision", "project_sequence", "Fitness Brand"],
  vi: ["supplier_selection", "procurement_risk_map", "Distributor"],
  sv: ["procurement_decision", "quality_failure_analysis", "Purchasing Manager"],
  it: ["supplier_selection", "comparison_decision_tree", "Importer"],
  nl: ["procurement_decision", "project_sequence", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["procurement_decision", "quality_failure_analysis", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "procurement_risk_map", "Purchasing Manager"]
};
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local purchasing phrase “${copy.keyword}” and distinguishes reports, product certificates, management-system certificates and declarations.`,
  "Builds the decision around exact specimen identity, method edition, laboratory scope, recorded results and production change control."
]]));
const sources = [
  { title: "ISO/IEC 17025:2017", url: "https://www.iso.org/standard/66912.html", primary: true, use: "Official scope: competence, impartiality and consistent operation of testing and calibration laboratories." },
  { title: "ILAC accredited conformity assessment bodies", url: "https://ilac.org/ilac-mra-and-signatories/accredited-conformity-assessment-bodies/", primary: true, use: "Official route for checking the issuing laboratory through the relevant accreditation body and reviewing its scope." },
  { title: "European Commission CE marking", url: "https://single-market-economy.ec.europa.eu/single-market/goods/ce-marking_en", primary: true, use: "Official boundary: CE marking applies only where harmonised legislation requires it and must not be used otherwise." },
  { title: "TÜV SÜD sports-equipment testing", url: "https://www.tuvsud.com/en/industries/consumer-products-and-retail/sports-leisure/sports-equipment", primary: true, use: "Separates product testing, certification and production-related assessment; no certification is claimed for ChinaFreeWeight." },
  { title: "YR Fitness test-report example", url: "https://www.yanrefitness.com/testing-report/", primary: false, use: "Competitor example reviewed for report presentation only; its results are not transferred to another product." },
  { title: "Reddit supplier-certification discussion", url: "https://www.reddit.com/r/Entrepreneur/comments/1n61k99/how_do_you_validate_a_suppliers_certifications/", primary: false, use: "Buyer wording only; anecdotal comments are not treated as compliance or technical evidence." }
];
const candidateLabels = ["document-purpose mapping", "exact specimen identity", "model and revision mapping", "product-family rationale", "method and edition", "laboratory accreditation scope", "report authenticity", "acceptance rule", "result units and uncertainty", "annex and exclusion review", "customization change impact", "first-article linkage", "lot inspection linkage", "shipment release boundary", "RFQ evidence matrix"];

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
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-test-report-verification`,
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
    coreIntentKey: `${copy.keyword} | ${copy.sections[2].heading} | ${copy.sections[4].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[1].text} The current library owns sample approval, AQL, individual product tests and material reports, but not the full workflow for verifying a supplier document against the exact OEM SKU, laboratory scope and production revision.`,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[5].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The result changes sample release, lot monitoring, incoming quarantine and engineering-change decisions.`,
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
      src: `/assets/resources/free-weight-test-report-verification/${assetLocale(copy.locale)}-free-weight-test-report-verification.webp`,
      alt: copy.imageAlt,
      provenance: "Original commissioned conceptual editorial image for this locale; source, prompt summary, visual review and conversion mapping are retained in the run artifacts.",
      rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record, certification or documentary factory-test claim."
    }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The review aligns OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements with the exact document, product revision and release decision.` }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "How B2B buyers verify OEM free-weight test reports and certificates",
  selectionReason: "A high-intent documentation gap with no dedicated live owner. The guide teaches buyers to match document purpose, specimen and revision, test method, laboratory scope, results and production controls before relying on a report.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "TÜV SÜD", url: sources[3].url, observation: "Shows testing, certification and production assessment as separate evidence layers; no ChinaFreeWeight certification claim is made." },
    { name: "YR Fitness", url: sources[4].url, observation: "Shows how a manufacturer presents a report; the article adds buyer-side specimen, scope and revision checks missing from a simple download." },
    { name: "ILAC", url: sources[1].url, observation: "Provides the authoritative verification route through accreditation bodies and relevant laboratory scopes." }
  ],
  rejectedTopics: [
    "OEM free-weight sample approval — an exact multilingual owner already exists.",
    "Shipment AQL and defect classification — an exact multilingual owner already exists.",
    "Olympic-bar tensile and yield reports — a product-specific owner already exists.",
    "Fixed-dumbbell impact evidence — yesterday’s exact multilingual owner already exists."
  ],
  siteGaps: ["No existing page owns the document type → exact specimen and revision → test method → laboratory scope → result and decision rule → production linkage workflow across free-weight categories."],
  conflictCheck: {
    liveSitemapUrlsReviewed: 1862,
    liveBlogUrlsReviewed: 992,
    dedicatedArticleFound: false,
    nearestTopics: ["OEM sample approval", "free-weight AQL defect classification", "Olympic-bar material reports", "fixed-dumbbell impact validation", "production lead-time planning"]
  },
  sources,
  limitations: [
    "Quora pages were not used because automated verification was blocked; no claim depends on them.",
    "Reddit was used only to understand buyer wording, never as product, laboratory or legal proof.",
    "The paid keyword refresh is reserved for Sunday under the shared policy; this Saturday run used public search, live pages, repository content and the shared topic ledger.",
    "No report, certificate, accreditation, conformity result, price, MOQ, lead time or customer project is claimed for ChinaFreeWeight.",
    "Commissioned images are conceptual editorial illustrations, not evidence of an actual laboratory, certificate, customer project or factory test."
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-free-weight-test-report-verification`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });


