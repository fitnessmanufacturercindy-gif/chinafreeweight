import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { freeWeightWarrantyClaimsPrimaryCopies } from "../../../content/i18n/free-weight-warranty-claims-copy-primary";
import { freeWeightWarrantyClaimsEuCopies } from "../../../content/i18n/free-weight-warranty-claims-copy-eu";
import { freeWeightWarrantyClaimsApacCopies } from "../../../content/i18n/free-weight-warranty-claims-copy-apac";

const copies = [...freeWeightWarrantyClaimsPrimaryCopies, ...freeWeightWarrantyClaimsEuCopies, ...freeWeightWarrantyClaimsApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-10";
const publishedAt = "2026-11-10T06:30:00.000Z";
const entityId = "wholesale-free-weight-warranty-claims-guide";
const targets = ["factory", "pre-shipment-inspection-free-weights", "oem-free-weight-test-report-verification-guide", "free-weight-reorder-batch-consistency", "oem-sample-approval-free-weights", "olympic-barbell-maintenance-cleaning-guide", "cable-attachment-compatibility-oem-guide", "contact"];
const englishPaths = ["/factory", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/resources/verify-oem-free-weight-test-reports-certificates", "/resources/free-weight-reorder-batch-consistency", "/resources/oem-free-weight-sample-approval-process", "/resources/olympic-barbell-maintenance-cleaning-guide", "/resources/are-cable-machine-attachments-universal", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "technical_system_walkthrough", "Importer"],
  "pt-BR": ["supplier_selection", "project_sequence", "Distributor"],
  es: ["procurement_decision", "procurement_risk_map", "Importer"],
  de: ["quality_control", "technical_system_walkthrough", "Purchasing Manager"],
  fr: ["supplier_selection", "project_sequence", "Fitness Brand"],
  vi: ["procurement_decision", "procurement_risk_map", "Distributor"],
  sv: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
  it: ["supplier_selection", "technical_system_walkthrough", "Importer"],
  nl: ["procurement_decision", "project_sequence", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "technical_system_walkthrough", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"]
};
const sources = [
  { title: "ISO 10002:2018 Quality management — Customer satisfaction — Guidelines for complaints handling", url: "https://www.iso.org/standard/71580.html", primary: true, use: "Primary framework for planning, operating, maintaining and improving a complaints-handling process; ISO records the standard as reviewed and confirmed in 2023." },
  { title: "Jordan Fitness warranty procedure", url: "https://www.jordanfitness.com/warranty/", primary: true, use: "Public manufacturer example showing order identification, photographs, inspection and repair-or-replacement routes; used only to observe process fields, never to claim ChinaFreeWeight terms." },
  { title: "REP Fitness warranty information", url: "https://repfitness.com/pages/warranty-information", primary: true, use: "Public product- and use-specific warranty structure demonstrating why coverage must be tied to item and usage instead of a universal headline." },
  { title: "Titan Commercial return and warranty policy", url: "https://commercial.titanfitness.com/pages/return-warranty-policy", primary: true, use: "Public commercial-equipment policy used to compare evidence and remedy vocabulary, not copied as contract language." },
  { title: "American Barbell warranty and liability information", url: "https://americanbarbell.com/pages/warranty-and-liability-information", primary: true, use: "Public manufacturer source confirming that product categories and use conditions lead to different written boundaries." },
  { title: "Reddit home-gym discussions about replacement parts and support", url: "https://www.reddit.com/r/homegym/search/?q=replacement%20parts%20warranty&restrict_sr=1", primary: false, use: "Used only to identify recurring buyer language around missing parts, worn finishes, damaged deliveries and slow support; no technical or contractual claim relies on comments." }
];
const candidateLabels = ["warranty scope by SKU and use", "arrival damage versus warranty", "claim evidence checklist", "commercial-use coverage", "spare-parts planning", "local repair authority", "freight and labor responsibility", "replacement versus credit", "revision compatibility", "discontinued products", "normal wear boundaries", "private-label claim ownership", "unsafe-item stop-use route", "complaint trend review", "after-sales terms in purchase orders"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local procurement phrase “${copy.keyword}” and distinguishes delivery damage, order nonconformity, warranty, wear and service instead of translating one generic label.`,
  `Answers locally worded buyer questions including “${copy.faq[0][0]}” and “${copy.faq[1][0]}”, with market-appropriate distributor, commercial-use and proof-of-purchase context.`
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
    id: `${runDate}-chinafreeweight-${copy.locale}-warranty-claims`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[4].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The 1,901-URL production sitemap and 1,031-URL blog sitemap contain no warranty, claims, spare-parts or after-sales slug owner. Existing pages cover pre-shipment inspection, sample approval, test-report verification and maintenance, but not the post-delivery decision file.` ,
    independentInsights: [copy.sections[1].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section: { heading: string }) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The written route changes which party must act, what evidence is preserved, whether a product remains in service, which parts are compatible and how the next order is controlled.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section: { heading: string; text: string }, index: number) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-warranty-claims/${assetLocale(copy.locale)}-free-weight-warranty-claims.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual editorial image for this locale; generation source, prompt set, contact sheet, visual review and conversion mapping are retained in run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, protected logo, actual factory visit, warranty claim, repair record or documentary parts commitment." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review connects OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to exact revisions, claim evidence and compatible service parts without promising universal coverage.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Wholesale free-weight warranty scope, claim evidence, spare-parts control and remedy routes",
  selectionReason: "High-intent post-delivery buyer problem with no dedicated live owner. Buyers need to classify freight damage, receipt nonconformity, warranty, wear and service; preserve usable evidence; define compatible parts; and write responsibility before a claim occurs.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Jordan Fitness", url: sources[1].url, observation: "Public claim route asks for purchase identity and photographs and may use inspection, repair or replacement; the new guide turns those fields into an importer-side buying file without copying terms." },
    { name: "REP Fitness", url: sources[2].url, observation: "Public coverage differs by product and use. The new guide explains how wholesale buyers should define exact SKU, revision and use class before shipment." },
    { name: "Titan Commercial", url: sources[3].url, observation: "Commercial policy illustrates product-specific remedies and exclusions; the new guide adds freight-versus-warranty classification and OEM spare-part revision control." }
  ],
  rejectedTopics: ["Container and pallet loading — overlaps the existing export-packaging and landed-cost owners.", "Golden-sample approval — a dedicated multilingual owner exists.", "Incoterms — the landed-cost guide owns that decision.", "General RFQ comparison — a dedicated commercial RFQ owner exists.", "Failed pre-shipment inspection — yesterday's corrective-action owner covers the pre-release workflow."],
  siteGaps: ["No page owns the post-delivery route from event classification through evidence, coverage, remedy, compatible parts and complaint trend review."],
  conflictCheck: { liveSitemapUrlsReviewed: 1901, liveBlogUrlsReviewed: 1031, repositoryPublishedVersionsReviewed: 1887, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["pre-shipment inspection planning", "failed inspection corrective action", "test-report verification", "reorder consistency", "Olympic-bar maintenance", "cable attachment compatibility"] },
  sources,
  publicSearch: { queriesReviewed: 31, surfaces: ["Google query loaded", "Bing-visible indexed results", "People Also Ask-style result questions", "Reddit", "Quora attempted but blocked", "manufacturer policies", "local-language market results"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["What information is needed for a warranty claim?", "Is commercial use covered?", "Who pays return freight and labor?", "Can the distributor repair locally?", "Can replacement parts be ordered outside coverage?", "Does every delivery problem count as warranty?", "How should potentially unsafe equipment be isolated?"] },
  paidSearchRefresh: { status: "not-scheduled", reason: "2026-11-10 is Tuesday; the repository protocol reserves the weekly paid refresh for Sunday." },
  limitations: ["Quora pages were not used because automated verification was blocked; no claim depends on Quora.", "The Google query page loaded, but accessibility extraction timed out; indexed public results were verified through the search service instead.", "Reddit was used only for buyer wording and recurring questions, never as technical, legal or contractual proof.", "No universal warranty duration, remedy, freight allocation, spare availability, response time or legal duty is claimed; written terms and applicable law control each order.", "No customer, project, quantity, price, MOQ, lead time, test result, certification or factory-performance claim is made.", "Images are conceptual editorial scenes, not evidence of an actual claim, customer, order, factory event, repair or spare-parts commitment."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-warranty-claims`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
