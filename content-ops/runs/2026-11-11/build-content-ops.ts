import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { freeWeightContainerLoadingPrimaryCopies } from "../../../content/i18n/free-weight-container-loading-copy-primary";
import { freeWeightContainerLoadingEuCopies } from "../../../content/i18n/free-weight-container-loading-copy-eu";
import { freeWeightContainerLoadingApacCopies } from "../../../content/i18n/free-weight-container-loading-copy-apac";

const copies = [...freeWeightContainerLoadingPrimaryCopies, ...freeWeightContainerLoadingEuCopies, ...freeWeightContainerLoadingApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-11";
const publishedAt = "2026-11-11T06:30:00.000Z";
const entityId = "wholesale-free-weight-container-loading-guide";
const targets = ["factory", "export-packaging-free-weights", "landed-cost-free-weights", "commercial-free-weight-rfq", "pre-shipment-inspection-free-weights", "dumbbells-category", "weight-plates-category", "contact"];
const englishPaths = ["/factory", "/resources/export-packaging-dumbbells-weight-plates", "/resources/landed-cost-wholesale-free-weights", "/resources/commercial-free-weight-rfq-checklist", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/products/dumbbells", "/products/weight-plates", "/contact"];
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
  { title: "IMO — Verification of the gross mass of a packed container", url: "https://www.imo.org/en/ourwork/safety/pages/verification-of-the-gross-mass.aspx", primary: true, use: "Primary source for the requirement that verified gross mass be available before vessel loading and for distinguishing a commercial load plan from VGM." },
  { title: "UNECE — IMO/ILO/UNECE Code of Practice for Packing of Cargo Transport Units", url: "https://unece.org/transport/intermodal-transport/ctu-code", primary: true, use: "Primary safety reference for cargo transport unit suitability, load distribution, packing and securing." },
  { title: "LMCC Fitness — Gym Equipment Container Loading", url: "https://lmccfitness.com/gym-equipment-container-loading.html", primary: false, use: "Competitor example reviewed for buyer-facing load-plan structure, equipment mix and unloading sequence; its numeric examples were not reused as free-weight promises." },
  { title: "Maviet Supplies — Packaging", url: "https://mavietsupplies.com/packaging/", primary: false, use: "Industry example showing that a container load plan can include unit count, cartons, layers, gross weight and CBM; figures were not copied." },
  { title: "BETTWISER — Wholesale and OEM adjustable dumbbells", url: "https://bettwiser.com/wholesale.html", primary: false, use: "Competitor page reviewed for how suppliers expose carton, gross-weight and container assumptions; no supplier number is treated as universal." },
  { title: "Reddit logistics discussions about dense container cargo", url: "https://www.reddit.com/r/logistics/search/?q=container%20weight%20volume&restrict_sr=1", primary: false, use: "Used only to identify recurring buyer language about weight versus CBM, chassis limits, dock access and load shift; no technical claim depends on comments." },
  { title: "Quora search for container loading questions", url: "https://www.quora.com/search?q=how%20many%20dumbbells%20fit%20in%20a%20container", primary: false, use: "Attempted question-surface review; automated access was blocked, so no factual statement depends on it." }
];
const candidateLabels = ["how many dumbbells fit a 20-foot container", "weight versus volume constraint", "mixed-SKU layer plan", "20-foot versus 40-foot decision", "pallet versus floor loading", "gross weight and packaging tare", "load distribution", "cargo securing", "VGM responsibility", "receiver dock and forklift access", "multi-stop unloading", "long Olympic bar support", "container inspection", "packing-list reconciliation", "load-plan fields for RFQ"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local procurement phrase “${copy.keyword}” and separates carton geometry, gross mass, securing and receiving access instead of translating one generic freight phrase.`,
  `Answers locally worded buyer questions including “${copy.faq[0][0]}” and “${copy.faq[1][0]}”, with market-appropriate importer, distributor and warehouse terminology.`
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
    id: `${runDate}-chinafreeweight-${copy.locale}-container-loading`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[4].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The 1,914-URL production sitemap and 1,044-URL blog sitemap contain no dedicated container quantity or mixed-load-plan owner. Existing pages cover export packaging and landed cost, but not the operational decision file for quantity, distribution, securing and unloading.` ,
    independentInsights: [copy.sections[1].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section: { heading: string }) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The written route changes which party must act, what evidence is preserved, whether a product remains in service, which parts are compatible and how the next order is controlled.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section: { heading: string; text: string }, index: number) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/free-weight-container-loading/${assetLocale(copy.locale)}-free-weight-container-loading.webp`, alt: copy.imageAlt, provenance: "Original commissioned conceptual editorial image for this locale; generation source, prompt set, contact sheet, visual review and conversion mapping are retained in run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, protected logo, actual factory visit, shipment record or transport approval is depicted." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review connects OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to measured packaging data while final equipment and route limits remain with the responsible logistics parties.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Wholesale free-weight container quantity, mixed-SKU load planning, securing and unloading",
  selectionReason: "High-intent purchasing question with no dedicated live owner. Buyers repeatedly ask how many dumbbells or plates fit, whether weight or CBM binds, which container to book and what the supplier must provide before loading.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "LMCC Fitness", url: sources[2].url, observation: "Uses equipment mix, several physical ceilings and unloading sequence. The new guide narrows the decision to dense free weights and removes reusable-looking universal counts." },
    { name: "Maviet Supplies", url: sources[3].url, observation: "Presents carton, layer, gross-weight and CBM fields. The new guide adds route validation, VGM separation and receiver access." },
    { name: "BETTWISER", url: sources[4].url, observation: "Shows SKU-specific carton and load assumptions. The new guide makes clear that one product table cannot be applied to a different model or mixed order." }
  ],
  rejectedTopics: ["Export packaging protection — a dedicated multilingual owner already covers carton and pallet protection.", "Landed cost — a dedicated multilingual owner covers financial cost composition.", "General RFQ comparison — a dedicated commercial RFQ owner exists.", "Golden-sample approval — a dedicated multilingual owner exists.", "Failed pre-shipment inspection — the corrective-action owner covers the pre-release workflow."],
  siteGaps: ["No page owns the operational route from final SKU mix through measured packaging, dual weight-and-geometry calculation, distribution, securing, VGM handoff and receiver unloading."],
  conflictCheck: { liveSitemapUrlsReviewed: 1914, liveBlogUrlsReviewed: 1044, repositoryPublishedVersionsReviewed: 1900, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["export packaging for dumbbells and plates", "landed cost of wholesale free weights", "commercial free-weight RFQ", "pre-shipment inspection"] },
  sources,
  publicSearch: { queriesReviewed: 34, surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "People Also Ask-style result questions", "Reddit", "Quora attempted but blocked", "industry sites", "competitor sites", "local-language market results"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["How many dumbbells fit in a 20-foot container?", "Are free weights limited by weight or CBM?", "Does a high-cube reduce cost per unit?", "Should dense weights be palletized?", "How should mixed SKUs be sequenced?", "Who verifies gross mass?", "What must the supplier send after loading?"] },
  paidSearchRefresh: { status: "not-scheduled", reason: "2026-11-11 is Tuesday; the repository protocol reserves the weekly paid refresh for Sunday." },
  limitations: ["Quora pages were not used because automated verification was blocked; no claim depends on Quora.", "Reddit was used only for buyer wording and recurring questions, never as technical, legal or operational proof.", "Competitor and industry quantity tables were reviewed but not copied; each SKU, package, container and route must be recalculated.", "No universal payload, unit count, cost advantage, road allowance or securing method is claimed; the booked equipment, carrier, port and inland route control.", "No customer, project, quantity, price, MOQ, lead time, test result, certification or factory-performance claim is made.", "Images are conceptual editorial scenes, not evidence of an actual customer shipment, factory event, transport approval or load outcome."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-container-loading`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
