import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopies from "../../../content/i18n/fixed-dumbbell-impact-copy-primary.json";
import euCopies from "../../../content/i18n/fixed-dumbbell-impact-copy-eu.json";
import apacCopies from "../../../content/i18n/fixed-dumbbell-impact-copy-apac.json";

const copies = [...primaryCopies, ...euCopies, ...apacCopies];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-06";
const publishedAt = "2026-11-06T09:00:00.000Z";
const entityId = "fixed-dumbbell-impact-validation-guide";
const targets = ["rubber-hex-dumbbell", "dumbbells-category", "dumbbell-head-handle-construction-guide", "fixed-vs-adjustable-dumbbells-commercial-guide", "rubber-coating-adhesion-dumbbell-plate-guide", "free-weight-aql-defect-classification-guide", "oem-sample-approval-free-weights", "contact"];
const englishPaths = ["/products/dumbbells/hex-dumbbell-kg", "/products/dumbbells", "/resources/dumbbell-head-handle-construction-guide", "/resources/fixed-vs-adjustable-dumbbells-commercial-gym", "/resources/rubber-coating-peeling-cracking-inspection", "/resources/free-weight-aql-inspection-defect-classification-guide", "/resources/oem-free-weight-sample-approval-process", "/contact"];
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
const marketEvidence: Record<string, string[]> = {
  en: ["Uses the buyer phrase fixed dumbbell impact test while reframing it as a controlled evidence plan.", "Separates orientation, surface and model instructions from a generic drop-proof claim."],
  "pt-BR": ["Uses halter fixo, validação de impacto, academia, lote and recebimento in Brazilian procurement context.", "Treats the floor and quarantine record as buyer controls, not marketing claims."],
  es: ["Uses mancuerna fija, validación de impacto, importador and gimnasio comercial.", "Structures the decision around an expediente, sample family and reception."],
  de: ["Uses Fallprüfung, Stoßvalidierung, Prüfplan and Einkaufsakte.", "Emphasizes revision status, Erstmuster and Wareneingang."],
  fr: ["Uses haltère fixe, validation d’impact, cahier des charges and réception.", "Emphasizes a complete dossier and model-specific instructions."],
  vi: ["Uses tạ tay cố định, xác minh va đập, lô hàng and nhận hàng.", "Explains representative weights through construction logic."],
  sv: ["Uses fast hantel, stötprov, inköpsakt and mottagning.", "Treats the landing surface as a documented test variable."],
  it: ["Uses manubrio fisso, validazione d’urto, buyer and ricevimento.", "Frames the output as a traceable fascicolo rather than a promotional clip."],
  nl: ["Uses vaste halter, impactvalidatie, inkoopdossier and quarantaine.", "Connects the sample identity to first-piece and lot controls."],
  ar: ["Uses Arabic purchasing language for fixed-dumbbell impact verification, sample isolation and acceptance responsibility.", "Keeps OEM program terms recognizable while localizing the decision workflow."],
  ko: ["Uses 고정식 덤벨 충격 검증, 시편, 로트 and 입고 검사.", "Emphasizes fixed camera view, specimen ID and production revision."],
  id: ["Uses dumbbell tetap, validasi benturan, sampel, lot and karantina.", "Separates product evidence from distribution and packaging damage."],
  pl: ["Uses walidacja udaru hantli stałych, próbka wzorcowa and dokumentacja zakupu.", "Uses reference comparison and written stop conditions for the purchasing file."]
};
const sources = [
  { title: "TÜV SÜD certification mark for dumbbells", url: "https://www.tuvsud.com/en/customer-hub/ps-cert/certification-mark-for-dumbbells", primary: true, use: "Official summary of documentation, construction review, testing, production monitoring and factory surveillance; no certification is claimed for ChinaFreeWeight." },
  { title: "TÜV SÜD German certification page for fixed dumbbells", url: "https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/z2-308-hanteln", primary: true, use: "Official program language showing foreseeable misuse may be simulated with drop testing; no universal method or threshold is inferred." },
  { title: "ISO 20957-1:2024 stationary training equipment", url: "https://www.iso.org/standard/81908.html", primary: true, use: "Scope boundary reviewed; applicability to a loose fixed dumbbell is not assumed." },
  { title: "REP x PÉPIN FAST Series adjustable dumbbell", url: "https://repfitness.com/collections/dumbbells/products/rep-x-pepin-fast-series-adjustable-dumbbell", primary: false, use: "Model-specific instructions illustrate why landing orientation and abuse exclusions matter; adjustable-model claims are not generalized." },
  { title: "IRON COMPANY fixed urethane dumbbells", url: "https://www.ironcompany.com/iron-company-urethane-dumbbells", primary: false, use: "Model-specific handling and warranty language reviewed; not generalized to all fixed dumbbells." },
  { title: "Eleiko Evo fixed dumbbell", url: "https://eleiko.com/es-es/equipment/dumbbells/fixed/3060990-0060-eleiko-evo-dumbbell-fixed-6-kg", primary: true, use: "Manufacturer example of model-specific validation; published figures were not copied or transferred." },
  { title: "Reddit buyer discussion of a damaged dumbbell", url: "https://www.reddit.com/r/homegym/comments/1covvbl/was_working_out_at_home_and_then_this_happened/", primary: false, use: "Buyer wording only; anecdotal content is not treated as engineering evidence." }
];
const candidateLabels = ["sample-family selection", "flat-versus-edge orientation", "landing-surface definition", "release-fixture control", "pre-impact measurement record", "head-handle post-impact check", "coating and sharp-edge inspection", "stop and quarantine conditions", "validated-sample disposition", "first-piece linkage", "lot traceability", "engineering-change review", "warranty and handling boundary", "private-label revision control", "RFQ evidence matrix"];

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
    id: `${runDate}-chinafreeweight-${copy.locale}-fixed-dumbbell-impact-validation`,
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
    whyThisArticleExists: `${copy.sections[1].text} The current library owns joint construction, coating adhesion, equipment-format selection and general sample approval, but not the controlled impact setup, orientation record, specimen disposition and change-control workflow.`,
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
      src: `/assets/resources/fixed-dumbbell-impact-validation/${assetLocale(copy.locale)}-fixed-dumbbell-impact-validation.webp`,
      alt: copy.imageAlt,
      provenance: "Original commissioned conceptual editorial image for this locale; source, prompt summary, visual review and conversion mapping are retained in the run artifacts.",
      rights: "Commissioned original for ChinaFreeWeight; no customer order, third-party brand, shipment record, certification or documentary factory-test claim."
    }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The review aligns OEM, ODM, Custom Logo, Private Label and Bulk Supply requirements with the traceable construction revision.` }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "Controlled impact-validation planning for fixed dumbbells",
  selectionReason: "A purchase-intent gap with no dedicated live owner. The guide separates specimen family, landing surface, orientation, before-and-after evidence, stop conditions and production change control from existing joint, coating, product-format and sample-approval pages.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketEvidence[copy.locale], path: copy.path }])),
  competitors: [
    { name: "TÜV SÜD", url: sources[0].url, observation: "Shows that product testing, documentation and production monitoring are distinct parts of a controlled program; no ChinaFreeWeight certification claim is made." },
    { name: "REP Fitness", url: sources[3].url, observation: "Model instructions show why orientation and model-specific warranty language matter; adjustable-model statements were not generalized." },
    { name: "Eleiko", url: sources[5].url, observation: "Publishes model-specific validation evidence; its figures were excluded from the article because they cannot be transferred to another design." }
  ],
  rejectedTopics: [
    "Export packaging for dumbbells and plates — an exact live owner already exists.",
    "OEM free-weight sample approval — an exact multilingual owner already exists.",
    "Artwork and logo approval — the custom-logo guide owns the intent.",
    "Weight-plate runout and concentricity — current flatness and plate-to-bar fit pages create a higher collision risk."
  ],
  siteGaps: ["No existing page owns the specimen family → landing setup → before-and-after evidence → stop and quarantine → production change-control workflow for fixed dumbbells."],
  conflictCheck: {
    liveSitemapUrlsReviewed: 1849,
    liveBlogUrlsReviewed: 979,
    dedicatedArticleFound: false,
    nearestTopics: ["dumbbell head-to-handle construction", "rubber coating adhesion", "fixed versus adjustable dumbbells", "OEM sample approval", "free-weight AQL defect classification", "gym flooring"]
  },
  sources,
  limitations: [
    "Quora pages were not used because automated verification was blocked; no claim depends on them.",
    "Reddit was used only to understand buyer wording, never as product or engineering proof.",
    "The paid keyword refresh is reserved for Sunday under the shared policy; this Friday run used public search, live sitemaps, repository content and the shared topic ledger.",
    "No universal drop height, repetition count or acceptance threshold is stated because the product design, use case, market and contract must define them.",
    "Commissioned images are conceptual editorial illustrations, not evidence of an actual customer project or factory validation."
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
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-fixed-dumbbell-impact-validation`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully verified edition is prepared for this run; additional daily slots are deferred rather than lowering evidence, media or review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, researchCandidates: research.candidatePool.length, manifest: manifestPath }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
