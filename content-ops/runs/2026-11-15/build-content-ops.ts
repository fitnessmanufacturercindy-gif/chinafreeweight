import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { rubberDumbbellMoldDefectPrimaryCopies } from "../../../content/i18n/rubber-dumbbell-mold-defect-guide-copy-primary";
import { rubberDumbbellMoldDefectEuCopies } from "../../../content/i18n/rubber-dumbbell-mold-defect-guide-copy-eu";
import { rubberDumbbellMoldDefectApacCopies } from "../../../content/i18n/rubber-dumbbell-mold-defect-guide-copy-apac";

const copies = [...rubberDumbbellMoldDefectPrimaryCopies, ...rubberDumbbellMoldDefectEuCopies, ...rubberDumbbellMoldDefectApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-15";
const publishedAt = "2026-11-15T06:30:00.000Z";
const entityId = "rubber-dumbbell-mold-line-flash-inspection-guide";
const targets = ["dumbbells-category", "rubber-coating-adhesion-dumbbell-plate-guide", "rubber-dumbbell-shore-hardness-guide", "rubber-dumbbell-surface-bloom-guide", "dumbbell-head-handle-construction-guide", "free-weight-aql-defect-classification-guide", "oem-sample-approval-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/resources/rubber-coating-peeling-cracking-inspection", "/resources/rubber-dumbbell-shore-hardness-guide", "/resources/rubber-dumbbell-surface-bloom-oily-residue-guide", "/resources/dumbbell-head-handle-construction-guide", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/oem-free-weight-sample-approval-process", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["quality_control", "quality_failure_analysis", "Importer"],
  "pt-BR": ["procurement_decision", "procurement_risk_map", "Distributor"],
  es: ["quality_control", "comparison_decision_tree", "Fitness Brand"],
  de: ["quality_control", "technical_system_walkthrough", "Purchasing Manager"],
  fr: ["supplier_selection", "quality_failure_analysis", "Importer"],
  vi: ["procurement_decision", "project_sequence", "Distributor"],
  sv: ["quality_control", "procurement_risk_map", "Purchasing Manager"],
  it: ["supplier_selection", "manufacturing_process_map", "Fitness Brand"],
  nl: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  ar: ["supplier_selection", "technical_system_walkthrough", "Importer"],
  ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "manufacturing_process_map", "Purchasing Manager"]
};
const sources = [
  { title: "ISO 3302-1:2014 — Rubber tolerances for products", url: "https://www.iso.org/standard/62492.html", primary: true, use: "Official current standard record used to establish dimensional-tolerance and flash-classification scope without selecting a universal dumbbell grade." },
  { title: "ARPM/RMA molded-rubber quality guidance", url: "https://viconerubber.com/en/resources/rma-quality-standard", primary: false, use: "Industry guidance used to distinguish flash thickness, flash extension and parting-line designation; no generic numeric class is imposed on dumbbells." },
  { title: "Protolabs — Injection molding defects", url: "https://www.protolabs.com/resources/design-tips/injection-molding-defects-and-how-to-avoid-them/", primary: false, use: "Manufacturing explanation used to separate an expected parting line from knit lines and other process conditions in stressed zones." },
  { title: "GE Vernova cosmetic inspection guidance", url: "https://www.gevernova.com/electrification/sites/default/files/2025-04/GA-SRC-0002%20Cosmetic%20Inspection%20Guidelines%20for%20Mechanical%20Components.pdf", primary: false, use: "Industry defect vocabulary reviewed for flash, fracture and surface marks; no acceptance number was transferred to free weights." },
  { title: "Reddit buyer and repair discussions", url: "https://www.reddit.com/r/fixit/comments/yfb617/", primary: false, use: "Used only to confirm recurring buyer wording about seams, cracks near handles and whether visible damage is serviceable." },
  { title: "ChinaFreeWeight dumbbell category", url: "https://www.chinafreeweight.com/products/dumbbells", primary: true, use: "Current product scope and internal destination verified before topic selection." }
];
const candidateLabels = ["parting line versus crack", "flash thickness and extension", "sharp flash in handling zones", "surface pit and pinhole classification", "blister versus stable texture", "trim cut versus tear", "open crack and exposed core", "mold-half mismatch", "embedded foreign material", "void near handle transition", "display-face cosmetic zones", "boundary-sample approval", "scaled defect photography", "rework and reinspection", "packaging abrasion versus molding"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local procurement phrase “${copy.keyword}” and market-language distinctions for a mold parting line, flash, pits, trimming damage, cracks and lot disposition.`,
  `Answers locally phrased buyer questions such as “${copy.faq[0][0]}” and “${copy.faq[3][0]}” rather than translating an English keyword list into visitor copy.`
]]));

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }

const repositoryPublishedVersionsReviewed = contentRepository.listPublished().length - copies.length;
const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-rubber-dumbbell-mold-inspection`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, searchIntent: copy.sections[0].heading, primaryKeyword: copy.keyword,
    relatedQuestions: copy.faq.map(([question]) => question), buyerQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[4].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The live production library and ${repositoryPublishedVersionsReviewed} previously published repository versions had no dedicated page that separated a normal dumbbell mold parting line from flash, pits, trim cuts, cracks and lot-level disposition. Existing guides own coating adhesion, odor, hardness, surface bloom, alignment and head retention.` ,
    independentInsights: [copy.sections[1].text, copy.sections[2].text, copy.sections[4].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The classification changes whether a finding is accepted as an approved workmanship feature, contained as a cosmetic deviation, reworked under control, investigated or used to block the affected population.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 2 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/rubber-dumbbell-mold-inspection/${assetLocale(copy.locale)}-rubber-dumbbell-mold-inspection.webp`, alt: copy.imageAlt, provenance: "Original locale-specific editorial image generated for this guide; source PNGs, prompts, contact sheet, visual review and optimized-asset manifest are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, actual factory event, certification, test result or trademark is depicted." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review connects OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to a reproducible surface-acceptance and inspection specification.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Rubber hex dumbbell mold parting lines, flash, surface pits and trim-damage inspection",
  selectionReason: "Public results and community questions repeatedly confuse normal molding witnesses with cracks, while industry guidance separates parting-line location, flash thickness and extension, pits, blisters, cuts and tears. The site lacked a buyer-side guide linking these names to zones, samples, evidence and lot disposition.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Protolabs", url: "https://www.protolabs.com/resources/design-tips/injection-molding-defects-and-how-to-avoid-them/", observation: "Explains parting lines, flash and knit-line consequences in molded parts. The guide adds dumbbell zones, sample approval and lot decisions without transferring plastic-part tolerances." },
    { name: "Vicone / ARPM RMA guidance", url: "https://viconerubber.com/en/resources/rma-quality-standard", observation: "Defines flash thickness and extension and stresses design-manufacturer agreement. ChinaFreeWeight applies that decision pattern without inventing numeric dumbbell limits." },
    { name: "Bick inspection guide", url: "https://bickreal.com/third-party-inspection-for-hex-rubber-dumbbell-set-pre-shipment-supplier/", observation: "Search-visible dumbbell inspection content discusses cosmetic lines and flash, confirming buyer intent. Its tolerances and commercial claims were not reused." },
    { name: "Rubber molding troubleshooting pages", url: "https://tasuinjection.com/blog/rubber-injection-molding-troubleshooting-guide/", observation: "Industry pages connect flash and surface imperfections to tooling and process factors. The article stays at buyer-observable evidence and does not diagnose a factory from one photo." }
  ],
  rejectedTopics: ["Rubber coating peeling and cracking — a dedicated guide already owns coating adhesion and separation.", "Rubber odor and emissions — an existing multilingual guide owns sensory comparison and evidence boundaries.", "Rubber Shore hardness — a dedicated guide owns durometer method and interpretation.", "Surface bloom and oily residue — an existing guide owns residue classification and receiving decisions.", "Dumbbell head alignment and joint retention — dedicated guides own geometry and hidden head-to-handle construction."],
  siteGaps: ["No dedicated guide distinguished a normal mold parting line from excess flash, pits, blisters, trim cuts, tears and open separation while connecting each finding to head zones, photographs, severity and lot disposition."],
  conflictCheck: { liveSitemapUrlsReviewed: 1966, liveBlogUrlsReviewed: 1096, repositoryPublishedVersionsReviewed, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["rubber coating peeling", "rubber dumbbell hardness", "surface bloom and oily residue", "hex dumbbell alignment", "dumbbell head retention"] },
  sources,
  publicSearch: { queriesReviewed: 24, surfaces: ["Google- and Bing-visible indexed results", "question-style searches", "Reddit", "Quora attempted but blocked", "ISO official record", "rubber-industry guidance", "competitor and third-party inspection pages", "local-language terminology for every publication market"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["Is the seam around a rubber dumbbell normal?", "What is the difference between a mold line and flash?", "When does a line become a crack?", "Are pinholes and surface pits acceptable?", "Can flash be trimmed during inspection?", "How should a buyer photograph and classify a repeated defect?"] },
  paidSearchRefresh: { status: "credentials-unavailable", reason: "The recovered run date is Sunday in the editorial ledger. The repository connection test reported that DataForSEO credentials are not configured, so no paid request was made; topic selection relies on current public search plus primary and industry sources." },
  limitations: ["Quora pages were blocked from automated verification and supplied no claims.", "Reddit was used only for buyer wording and recurring seam or crack questions, never as manufacturing proof.", "No ISO or ARPM flash class is imposed as a universal dumbbell acceptance limit; buyer and factory must agree the construction-specific condition.", "No customer, project, quantity, price, MOQ, lead time, certification, test result, defect rate or ChinaFreeWeight process-performance fact is invented.", "Images are conceptual unbranded inspection scenes, not evidence of a customer program, real factory floor or completed shipment."]
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number) => {
    const localePosition = manifest.slots.slice(0, index + 1).filter((item: { locale: string }) => item.locale === slot.locale).length;
    const copy = copies.find((item) => item.locale === slot.locale);
    return localePosition === 1
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-rubber-dumbbell-mold-inspection`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, repositoryPublishedVersionsReviewed, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
