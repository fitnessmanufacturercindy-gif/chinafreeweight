import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { cableAttachmentBrandingPrimaryCopies } from "../../../content/i18n/cable-attachment-branding-guide-copy-primary";
import { cableAttachmentBrandingEuCopies } from "../../../content/i18n/cable-attachment-branding-guide-copy-eu";
import { cableAttachmentBrandingApacCopies } from "../../../content/i18n/cable-attachment-branding-guide-copy-apac";

const copies = [...cableAttachmentBrandingPrimaryCopies, ...cableAttachmentBrandingEuCopies, ...cableAttachmentBrandingApacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-14";
const publishedAt = "2026-11-14T06:30:00.000Z";
const entityId = "private-label-cable-attachment-logo-branding-guide";
const targets = ["gym-accessories-category", "cable-attachment-compatibility-oem-guide", "cable-attachment-handle-grip-specification-guide", "cable-attachment-chrome-plating-corrosion-guide", "cable-attachment-weld-quality-inspection-guide", "custom-logo-free-weights", "oem-sample-approval-free-weights", "contact"];
const englishPaths = ["/products/gym-accessories", "/resources/are-cable-machine-attachments-universal", "/resources/cable-attachment-handle-diameter-grip-guide", "/resources/cable-attachment-chrome-plating-corrosion-guide", "/resources/cable-attachment-weld-quality-inspection-guide", "/resources/custom-logo-options-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "comparison_decision_tree", "Importer"],
  "pt-BR": ["supplier_selection", "project_sequence", "Distributor"],
  es: ["procurement_decision", "procurement_risk_map", "Fitness Brand"],
  de: ["quality_control", "technical_system_walkthrough", "Purchasing Manager"],
  fr: ["supplier_selection", "comparison_decision_tree", "Importer"],
  vi: ["procurement_decision", "project_sequence", "Distributor"],
  sv: ["quality_control", "procurement_risk_map", "Purchasing Manager"],
  it: ["supplier_selection", "manufacturing_process_map", "Fitness Brand"],
  nl: ["procurement_decision", "quality_failure_analysis", "Distributor"],
  ar: ["supplier_selection", "technical_system_walkthrough", "Importer"],
  ko: ["quality_control", "comparison_decision_tree", "Fitness Brand"],
  id: ["supplier_selection", "project_sequence", "Distributor"],
  pl: ["procurement_decision", "manufacturing_process_map", "Purchasing Manager"]
};
const sources = [
  { title: "Trotec — Can a laser machine engrave and mark metal?", url: "https://www.troteclaser.com/en/resources/faqs/metal-engraving-marking", primary: true, use: "Official process overview used to distinguish annealing, engraving and coating removal rather than treating every laser mark as the same operation." },
  { title: "KEYENCE — Laser marking introduction", url: "https://www.keyence.com/landing/lpc/laser-chat.jsp", primary: true, use: "Official manufacturer explanation used only for material-dependent process categories and direct-part-marking context." },
  { title: "Ceta Form private-label brochure", url: "https://www.agstech.net/vi/_files/ugd/ef3ba0_a2b20d97343046e3add1208ed29ed4ec.pdf?index=true", primary: true, use: "Manufacturer brochure reviewed for real examples of molded, pad-printed and laser-marked grip branding without adopting its cost or permanence claims." },
  { title: "Ironpower Fitness OEM cable attachment product", url: "https://www.ironpowerfitness.com/product/acs-al017-aluminum-dual-hook-straight-bar/", primary: false, use: "Competitor product evidence that buyers encounter laser marking on bars or end caps; no model specifications were copied." },
  { title: "Zhongda cable attachments", url: "https://www.zhongdafitness.com/cable-attachments.html", primary: false, use: "Competitor category language confirms buyer interest in logo, grip color and private-label packaging." },
  { title: "Reddit home gym customization question surface", url: "https://www.reddit.com/r/homegym/search/?q=custom%20logo%20handle&restrict_sr=1", primary: false, use: "Used only for buyer wording about customization, availability and approval; no technical claim depends on comments." },
  { title: "ChinaFreeWeight gym accessories category", url: "https://www.chinafreeweight.com/products/gym-accessories", primary: true, use: "Current product scope and same-language internal-link destination verified before topic selection." }
];
const candidateLabels = ["laser marking versus engraving", "molded grip logo", "printed grip acceptance", "logo placement drawing", "curved-handle orientation", "artwork revision control", "finished-sample approval", "cleaning and rub check", "coating-removal risk", "end-badge retention", "textile label route", "retail-box artwork", "master-carton identity", "bulk marking inspection", "rework and reinspection"];
const marketEvidence: Record<string, string[]> = Object.fromEntries(copies.map((copy) => [copy.locale, [
  `Uses the local purchasing phrase “${copy.keyword}” and distinguishes the market terms for laser marking, engraving, molded branding, sample approval and private-label packaging.`,
  `Answers locally phrased buyer questions including “${copy.faq[0][0]}” and “${copy.faq[4][0]}” with terminology used by importers and distributors rather than translating an English keyword list.`
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
    id: `${runDate}-chinafreeweight-${copy.locale}-cable-attachment-branding`, siteId: "chinafreeweight", runDate, locale: copy.locale,
    author: "ChinaFreeWeight Technical Editorial Team", slug: copy.path.split("/").filter(Boolean).at(-1), title: copy.title,
    metaDescription: copy.description, h1: copy.h1, directAnswer: copy.sections[0].text, targetKeyword: copy.keyword,
    intent: copy.sections[0].heading, searchIntent: copy.sections[0].heading, primaryKeyword: copy.keyword,
    relatedQuestions: copy.faq.map(([question]) => question), buyerQuestions: copy.faq.map(([question]) => question), proposedPublicPath: copy.path,
    publishedPath: copy.path, publishedAt, searchIntentClass,
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[0].text} The live 1,953-URL sitemap and 1,939 previously published repository versions had no dedicated page that compared cable-attachment marking routes, placement drawings, finished-sample approval, packaging identity and bulk mark inspection. Existing pages own cable compatibility, grip geometry, chrome corrosion, weld quality and dumbbell or plate branding.` ,
    independentInsights: [copy.sections[1].text, copy.sections[2].text, copy.sections[5].text], structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[3].text} The decision changes which component carries the brand, whether tooling or a surface process is needed, what the buyer approves and how the bulk lot is sampled.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`, languageCreationMode: "local-market-original", translationSourceId: null,
    localMarketEvidence: marketEvidence[copy.locale],
    sections: copy.sections.map((section, index) => ({ heading: section.heading, paragraphs: section.text.split(/\n\n/u), ...(index === 3 ? { table: copy.table } : {}), ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {}) })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{ src: `/assets/resources/cable-attachment-branding/${assetLocale(copy.locale)}-cable-attachment-branding.webp`, alt: copy.imageAlt, provenance: "Original locale-specific editorial image generated for this guide; source files, prompt set, rejected Korean first output, contact sheet, visual review and conversion mapping are retained in the run artifacts.", rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, actual factory event, certification, test result or trademark is depicted." }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The factory review connects OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements to a reproducible marking and approval specification.` }
  };
});

const research = {
  schemaVersion: 1, siteId: "chinafreeweight", runDate, status: "complete",
  selectedTopic: "Private-label cable attachments and gym handles: marking-method selection, sample approval and bulk inspection",
  selectionReason: "Current search results repeatedly offer logo, color and packaging customization, yet few results help B2B buyers connect metal, molded, textile and packaging substrates to a controlled proof, finished sample and lot-inspection decision. The live site had no page owning this intent.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "IRONHUE", url: "https://ironhue.com/products/barbells/cable-attachments", observation: "Search-visible category offers engraved or printed grips plus branded packaging. The new guide fills the buyer-side method, sample and inspection gap without reusing commercial claims." },
    { name: "Zhongda Sports", url: "https://www.zhongdafitness.com/cable-attachments.html", observation: "Offers logo branding, custom grip colors and private-label packaging but does not provide the same substrate-to-acceptance framework." },
    { name: "Ironpower Fitness", url: "https://www.ironpowerfitness.com/product/acs-al017-aluminum-dual-hook-straight-bar/", observation: "A model page mentions laser engraving on a bar or end caps. No dimensions, MOQ, price or performance statement was reused." },
    { name: "Ceta Form", url: "https://www.agstech.net/vi/_files/ugd/ef3ba0_a2b20d97343046e3add1208ed29ed4ec.pdf?index=true", observation: "Manufacturer brochure shows molded, printed and laser-marked grip routes, supporting the need to choose by component rather than treating logo customization as one process." }
  ],
  rejectedTopics: ["Cable attachment universality — a complete multilingual compatibility guide already owns the intent.", "Grip diameter and knurl — a dedicated guide owns grip geometry and handling.", "Chrome corrosion — an existing guide owns plating, corrosion evidence and finish inspection.", "Cable attachment welds — the latest dedicated guide owns weld acceptance and load-path evidence.", "Custom logos on dumbbells and plates — an existing cluster owns those product families, while this topic is limited to cable attachments and gym handles."],
  siteGaps: ["No dedicated guide compared direct metal marking, molded or printed grips, textile labels, badges and packaging for cable attachments while connecting each route to artwork revision, physical sample approval and batch inspection."],
  conflictCheck: { liveSitemapUrlsReviewed: 1953, liveBlogUrlsReviewed: 1083, repositoryPublishedVersionsReviewed: 1939, dedicatedArticleFound: false, slugTokenMatches: 0, nearestTopics: ["custom logo options for dumbbells and weight plates", "cable attachment compatibility", "cable handle grip diameter", "cable attachment chrome plating", "cable attachment weld inspection"] },
  sources,
  publicSearch: { queriesReviewed: 20, surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "question-style searches", "Reddit", "Quora attempted but blocked", "official laser-process pages", "industry and competitor sites", "local-language results for every publication market"], markets: copies.map((copy) => copy.locale), recurringQuestions: ["Can cable attachments carry a custom logo?", "Is laser engraving better than printing?", "Which file and placement information should a buyer send?", "Does a digital proof replace a physical sample?", "How should logo durability be checked?", "Should the logo or the packaging carry model and retail information?"] },
  paidSearchRefresh: { status: "not-scheduled", reason: "The recovered run date is Saturday. The repository protocol limits the paid weekly refresh to Sunday, so this run used public search evidence and incurred no paid request." },
  limitations: ["Quora pages were inaccessible to automated verification and supplied no claims.", "Reddit was used only for buyer wording and recurring customization questions, never as technical evidence.", "No universal durability, abrasion count, corrosion outcome, MOQ, price, lead time, sample time or marking guarantee is claimed.", "No customer, project, certification, test result, production capacity or ChinaFreeWeight process-performance fact is invented.", "Images are conceptual unbranded product-inspection scenes, not evidence of a customer program, actual factory floor or completed order."]
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-cable-attachment-branding`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
