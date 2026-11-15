import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { bumperPlateCrackPrimaryCopies } from "../../../content/i18n/bumper-plate-crack-guide-copy-primary";
import { bumperPlateCrackEuCopies } from "../../../content/i18n/bumper-plate-crack-guide-copy-eu";
import { bumperPlateCrackApacCopies } from "../../../content/i18n/bumper-plate-crack-guide-copy-apac";

const copies = [...bumperPlateCrackPrimaryCopies, ...bumperPlateCrackEuCopies, ...bumperPlateCrackApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-13";
const publishedAt = "2026-11-13T06:30:00.000Z";
const entityId = "bumper-plate-cracks-edge-splits-inspection-guide";
const targets = ["weight-plates-category", "bumper-manufacturing-guide", "bumper-plate-hub-insert-retention-guide", "bumper-plate-bounce-shore-hardness-test-guide", "rubber-coating-adhesion-dumbbell-plate-guide", "free-weight-failed-inspection-corrective-action-guide", "pre-shipment-inspection-free-weights", "contact"];
const englishPaths = ["/products/weight-plates", "/resources/how-are-bumper-plates-made", "/resources/bumper-plate-loose-insert-hub-retention-guide", "/resources/bumper-plate-bounce-shore-hardness-drop-test", "/resources/rubber-coating-peeling-cracking-inspection", "/resources/free-weight-failed-inspection-corrective-action-guide", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["quality_control", "quality_failure_analysis", "Importer"],
  "pt-BR": ["procurement_decision", "procurement_risk_map", "Distributor"],
  es: ["quality_control", "technical_system_walkthrough", "Importer"],
  de: ["quality_control", "comparison_decision_tree", "Purchasing Manager"],
  fr: ["supplier_selection", "quality_failure_analysis", "Fitness Brand"],
  vi: ["procurement_decision", "project_sequence", "Distributor"],
  sv: ["quality_control", "procurement_risk_map", "Purchasing Manager"],
  it: ["supplier_selection", "manufacturing_process_map", "Importer"],
  nl: ["procurement_decision", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "technical_system_walkthrough", "Importer"],
  ko: ["quality_control", "comparison_decision_tree", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "manufacturing_process_map", "Purchasing Manager"]
};
const sources = [
  { title: "ISO 34-1:2022 — Rubber, vulcanized or thermoplastic — Determination of tear strength", url: "https://www.iso.org/standard/82445.html", primary: true, use: "Official method scope used to distinguish specimen tear testing from finished bumper-plate evidence." },
  { title: "ASTM D624-00(2020) — Tear Strength of Conventional Vulcanized Rubber and Thermoplastic Elastomers", url: "https://store.astm.org/standards/d624", primary: true, use: "Official standard summary checked for the condition-specific nature of laboratory tear results." },
  { title: "IWF Technical and Competition Rules & Regulations 2026", url: "https://iwf.sport/wp-content/uploads/downloads/2026/10/IWF-TCRR-2026.pdf", primary: true, use: "Competition-equipment requirements reviewed; they are not represented as a universal crack-acceptance rule." },
  { title: "Escape Fitness free-weights product information guide", url: "https://escapefitness.com/media/escape_assets/product-information-guides/ESC7471-PIG0001-FREEWEIGHTS-A5-031123.pdf", primary: false, use: "Model-specific care wording used only to show why use instructions must not be generalized across products." },
  { title: "Reddit bumper-plate question surface", url: "https://www.reddit.com/r/homegym/search/?q=bumper%20plate%20crack&restrict_sr=1", primary: false, use: "Used only to identify recurring buyer language about seam cracks, edge splits and crumbling; no technical claim depends on comments." },
  { title: "Again Faster bumper plate maintenance guide", url: "https://againfaster.eu/en_gb/blog/bumper-plate-maintenance-guide/", primary: false, use: "Industry care language reviewed for topic gaps without reusing lifecycle or durability claims." }
];
const candidateLabels = ["arrival crack classification", "edge split acceptance", "rubber shedding evidence", "mould seam versus open crack", "hub-boundary tear", "carton damage correlation", "lot mapping", "tear-test scope", "finished-product validation", "quarantine and segregation", "reinspection evidence", "undocumented repair", "custom-logo inspection access", "private-label defect catalogue", "supplier claim package"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the market-facing phrase “${copy.keyword}” and the local terms for mould seam, edge split, loose rubber, receiving inspection and lot disposition.`,
  `Answers locally framed questions including “${copy.faq[0][0]}” and “${copy.faq[4][0]}” with country-appropriate buying and complaint language.`
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
    id: `${runDate}-chinafreeweight-${copy.locale}-bumper-crack-inspection`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, relatedQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[5].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The 1,940-location production sitemap and 1,926 previously published repository versions had no dedicated owner for bumper-plate body cracks, edge splits, rubber shedding and evidence-based lot disposition. Existing guides own manufacturing, rebound, hub retention, coating adhesion and general inspection.` ,
    independentInsights: [copy.sections[1].text, copy.sections[3].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[4].text} The resulting classification changes quarantine scope, evidence requests, reinspection and release authority without claiming one universal crack limit.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/bumper-plate-crack-inspection/${assetLocale(copy.locale)}-bumper-plate-crack-inspection.webp`, alt: copy.imageAlt, provenance: "Original locale-specific editorial image generated for this guide; source files, prompt set, contact sheet, visual review and conversion mapping are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, actual defect claim, factory event, test result or certification is depicted." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review can connect OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to a reproducible inspection interface without replacing buyer approval.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Bumper plate cracks, edge splits and rubber shedding: buyer inspection and lot-decision guide",
  selectionReason: "Repeated buyer questions have high receiving-inspection and supplier-claim intent, while the live site had no dedicated page owning body cracks, edge splits, shedding and evidence-based lot mapping.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Again Faster", url: "https://againfaster.eu/en_gb/blog/bumper-plate-maintenance-guide/", observation: "Maintenance framing reviewed; it does not own a receiving evidence model, defect taxonomy or lot decision workflow." },
    { name: "Iron Company", url: "https://www.ironcompany.com/bumper-plates-buyers-guide", observation: "Buyer-guide positioning reviewed. Numerical marketing claims were not reused; the new guide focuses on reproducible defect records." },
    { name: "Escape Fitness", url: "https://escapefitness.com/media/escape_assets/product-information-guides/ESC7471-PIG0001-FREEWEIGHTS-A5-031123.pdf", observation: "Product-specific handling language confirms why one model's warning cannot become a universal acceptance or service-life claim." }
  ],
  rejectedTopics: ["Crumb versus virgin rubber — the existing manufacturing guide already owns construction and material comparison.", "Loose hub or insert — a dedicated multilingual retention guide owns that interface.", "Bounce and Shore hardness — a dedicated guide owns rebound and hardness evidence.", "Rubber coating peeling — the existing adhesion guide owns coated iron products rather than bumper-plate body splits."],
  siteGaps: ["No page separated closed mould seams, gouges, open body cracks, edge splits, missing material, shedding and hub-boundary tearing while connecting each observation to receiving evidence and lot containment."],
  conflictCheck: { liveSitemapUrlsReviewed: 1940, repositoryPublishedVersionsReviewed: 1926, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["how bumper plates are made", "bumper-plate hub retention", "bounce and Shore hardness", "rubber coating adhesion", "failed-inspection corrective action"] },
  sources,
  publicSearch: { queriesReviewed: 42, surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "People Also Ask-style questions", "Reddit", "Quora attempted but blocked", "official standards pages", "industry guides", "competitor sites", "local-language results"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["Is a seam line on a new bumper plate a crack?", "Should a small edge split be accepted?", "Why is rubber crumbling from a new plate?", "What evidence should accompany a supplier claim?", "Does a tear-strength report prove the finished plate?", "How much of the shipment should be quarantined?"] },
  paidSearchRefresh: { status: "skipped-unavailable", reason: "The scheduled Sunday credential check found no DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD in the isolated automation environment; no paid request was made." },
  limitations: ["Quora pages were not used because direct automated verification was blocked; no claim depends on Quora.", "Reddit was used only for buyer language and recurring questions, never as technical evidence.", "No universal crack size, lifetime, drop count, remedy, test result, certification or safety outcome is claimed.", "No customer, project, quantity, price, MOQ, lead time, sales result or factory-performance claim is made.", "Images are conceptual editorial scenes, not evidence of an actual customer incident, production batch, inspection or factory visit."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-bumper-crack-inspection`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
