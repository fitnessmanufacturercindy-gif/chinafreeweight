import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import { freeWeightPaymentTermsCopies as copies } from "../../../content/i18n/free-weight-payment-terms-guide";

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-11-22";
const publishedAt = "2026-11-22T06:00:00.000Z";
const entityId = "wholesale-free-weight-payment-terms-guide";
const targets = ["dumbbells-category", "weight-plates-category", "commercial-free-weight-rfq", "pre-shipment-inspection-free-weights", "wholesale-free-weight-incoterms-import-guide", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/commercial-free-weight-rfq-checklist", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/resources/exw-fob-cif-ddp-free-weight-import-guide", "/contact"];
const architecture: Record<string, [string, string, string]> = {
  en: ["procurement_decision", "procurement_risk_map", "Importer"],
  "pt-BR": ["project_planning", "project_sequence", "Distributor"],
  es: ["procurement_decision", "comparison_decision_tree", "Fitness Brand"],
  de: ["supplier_selection", "procurement_risk_map", "Purchasing Manager"],
  fr: ["cost_analysis", "cost_model", "Importer"],
  vi: ["project_planning", "project_sequence", "Distributor"],
  sv: ["supplier_selection", "procurement_risk_map", "Purchasing Manager"],
  it: ["procurement_decision", "comparison_decision_tree", "Fitness Brand"],
  nl: ["cost_analysis", "cost_model", "Distributor"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["project_planning", "project_sequence", "Fitness Brand"],
  id: ["cost_analysis", "cost_model", "Distributor"],
  pl: ["procurement_decision", "comparison_decision_tree", "Purchasing Manager"],
};
const sources = [
  { title: "ICC — UCP 600 documentary credit rules", url: "https://library.iccwbo.org/content/tfb/RULES/tfb-ucp600-rules.htm", primary: true, use: "Official rules used for document examination, complying presentation and discrepancy handling when incorporated into a credit." },
  { title: "ICC — eUCP commercialisation briefing", url: "https://library.iccwbo.org/content/tfb/DIGITAL_COM_BRIEFINGS/20240402_Commercialisation_Briefing_eUCP_MT700_templates_n_3.pdf", primary: true, use: "Official ICC briefing used to preserve the distinction between documents and goods and to keep documentary requirements essential and precise." },
  { title: "U.S. International Trade Administration — Trade Finance Guide", url: "https://www.trade.gov/report/trade-finance-guide", primary: true, use: "Government overview used to compare cash in advance, letters of credit, documentary collection and open-account exposure without presenting one method as universal." },
  { title: "U.S. International Trade Administration — Documentary Collections", url: "https://www.trade.gov/documentary-collections", primary: true, use: "Government guidance used for D/P and D/A and the limited role of banks in collection." },
  { title: "ICC — Incoterms® 2020", url: "https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/", primary: true, use: "Official overview used to keep delivery allocation separate from payment and product acceptance." },
  { title: "FBI — Business Email Compromise", url: "https://www.fbi.gov/how-we-can-help-you/common-frauds-and-scams/business-email-compromise", primary: true, use: "Law-enforcement guidance used for independent verification of beneficiary, account-number and payment-procedure changes." },
  { title: "IC3 — Business Email Compromise", url: "https://www.ic3.gov/CrimeInfo/BEC", primary: true, use: "Law-enforcement source reviewed for secondary-channel verification and account-change controls." },
  { title: "Reddit procurement buyer question — T/T or L/C", url: "https://www.reddit.com/r/procurement/", primary: false, use: "Used only to confirm recurring buyer wording about T/T before or after shipment and when a letter of credit is considered; no advice, figures or claims were reused." },
];
const localQueries: Record<string, string> = {
  en: "T/T vs letter of credit importing gym equipment supplier payment terms",
  "pt-BR": "pagamento T/T ou carta de crédito importação equipamento academia China",
  es: "pago T/T o carta de crédito importar equipamiento gimnasio China",
  de: "T/T oder Akkreditiv Import Fitnessgeräte China Zahlungsbedingungen",
  fr: "paiement T/T ou crédit documentaire import matériel musculation Chine",
  vi: "thanh toán T/T hay L/C nhập khẩu thiết bị gym từ Trung Quốc",
  sv: "T/T eller remburs importera gymutrustning från Kina betalningsvillkor",
  it: "pagamento T/T o lettera di credito importare attrezzatura palestra Cina",
  nl: "T/T of letter of credit fitnessapparatuur importeren China betalingsvoorwaarden",
  ar: "الدفع T/T أم خطاب اعتماد استيراد معدات الجيم من الصين",
  ko: "중국 헬스기구 수입 T/T 신용장 결제 조건",
  id: "pembayaran T/T atau letter of credit impor alat fitness China",
  pl: "T/T czy akredytywa import sprzętu siłowni z Chin warunki płatności",
};
const candidates = [
  "T/T versus documentary credit decision",
  "payment milestone evidence map",
  "beneficiary and account-change verification",
  "letter-of-credit document design",
  "D/P versus D/A collection",
  "payment clause versus Incoterm",
  "pre-shipment inspection payment gate",
  "product acceptance versus bank presentation",
  "bank discrepancy authority",
  "free-weight packing evidence",
  "payment-file audit trail",
  "supplier and buyer entity matching",
  "open-account credit exposure",
  "shipping-document release control",
  "project-specific payment RFQ",
];

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }
const repositoryPublishedVersionsReviewed = contentRepository.listPublished().length - copies.length;
const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing version: ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale];
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-free-weight-payment-terms`,
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
    searchIntent: copy.sections[0].heading,
    primaryKeyword: copy.keyword,
    relatedQuestions: copy.faq.map(([question]) => question),
    buyerQuestions: copy.faq.map(([question]) => question),
    proposedPublicPath: copy.path,
    publishedPath: copy.path,
    publishedAt,
    searchIntentClass,
    coreIntentKey: `${copy.keyword} | documentary payment trigger | product acceptance separation`,
    targetBuyer,
    whyThisArticleExists: `${copy.sections[1].text} ${copy.sections[3].text}`,
    independentInsights: [copy.sections[1].text, copy.sections[2].text, copy.sections.at(-2)?.text ?? copy.sections[4].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: `${copy.sections[0].text} The decision changes bank involvement, documentary workload, fraud controls, inspection gates and the evidence needed before funds move.`,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: [
      `Public query reviewed: “${localQueries[copy.locale]}”. The edition uses the market's established terminology for bank transfer, documentary credit, collection and import purchasing.`,
      `The local buyer questions “${copy.faq[0][0]}” and “${copy.faq[3][0]}” shape the sequence and risk emphasis; the text was authored for that market rather than converted sentence by sentence.`,
    ],
    sections: copy.sections.map((section, index) => ({
      heading: section.heading,
      paragraphs: section.text.split(/\n\n/u),
      ...(copy.table.afterSection === index + 1 ? { table: copy.table } : {}),
      ...(copy.checklist.afterSection === index + 1 ? { bullets: copy.checklist.items } : {}),
    })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({ targetContentId, label: copy.linkLabels[index], href: localizedPath(targetContentId, copy.locale, englishPaths[index]) })),
    images: [{
      src: `/assets/resources/free-weight-payment-terms/${assetLocale(copy.locale)}-free-weight-payment-terms.webp`,
      alt: copy.imageAlt,
      provenance: "Original locale-specific editorial image generated for this guide; source PNG, prompt notes, visual review and optimized WebP/AVIF manifest are retained in run artifacts.",
      rights: "Commissioned original for ChinaFreeWeight. It is an unbranded conceptual purchasing scene and does not depict a customer transaction, a documented factory event, a bank document or a commercial result.",
    }],
    sources,
    cta: { label: copy.cta[2], href: localizedPath("contact", copy.locale, "/contact"), buyerValue: `${copy.cta[1]} The review separates OEM, ODM, Custom Logo, Private Label and Bulk Supply product evidence from the bank payment path.` },
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "T/T, documentary credit and documentary collection for wholesale free-weight orders",
  selectionReason: "Buyers repeatedly ask whether to use T/T before or after shipment, when an L/C is justified, which evidence should release a later payment and how to respond to changed bank details. The live site and shared registry had no dedicated article. The preceding Incoterms guide explicitly excluded payment, so this edition owns bank method, documentary triggers and payment evidence without re-covering transport-risk allocation.",
  candidatePool: copies.flatMap((copy) => candidates.map((topic, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${topic}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, publicQuery: localQueries[copy.locale], questions: copy.faq.map(([question]) => question), path: copy.path }])),
  competitors: [
    { name: "LMCC Fitness", url: "https://lmccfitness.com/gym-equipment-payment-terms-importers.html", observation: "Reviewed current gym-equipment wording and recurring importer concerns. Unsupported percentages, fee ranges and universal claims were excluded." },
    { name: "Sorva", url: "https://sorvatrade.com/it/guide/payer-un-fournisseur-chinois-virement-lc", observation: "Reviewed localized bank-transfer and documentary-credit vocabulary; no commercial claims or wording were reused." },
    { name: "Seawing", url: "https://seawingglobaltrade.com/ar/blog/china-payment-terms-safety", observation: "Reviewed Arabic buyer terminology and the distinction between payment and delivery terms; factual explanations were independently grounded in ICC and government sources." },
  ],
  rejectedTopics: [
    "Cable D-handle webbing and stitching — the existing cable-attachment load-rating guide already owns textile construction, seam damage and assembly testing.",
    "Urethane dumbbell yellowing — credible technical material exists, but verified buyer demand was weaker and the custom-color guide already covers color approval and reorder consistency.",
    "OEM sample approval — already owned by a dedicated multilingual guide.",
    "Mixed-SKU MOQ and RFQ design — already owned by dedicated guides.",
    "Incoterms selection — published in the immediately preceding run; payment is intentionally a separate intent.",
  ],
  siteGaps: ["No dedicated page separated T/T milestones, documentary-credit presentation, D/P and D/A, physical acceptance and independent verification of bank-account changes for free-weight sourcing."],
  conflictCheck: {
    liveSitemapUrlsReviewed: 2005,
    liveBlogUrlsReviewed: 2005,
    repositoryPublishedVersionsReviewed,
    registryTopicsReviewed: 789,
    registryChinaFreeWeightTopicsReviewed: 584,
    dedicatedArticleFound: false,
    slugTokenMatches: 0,
    nearestTopics: ["EXW, FCA, FOB, CIF and DDP selection", "commercial free-weight RFQ", "pre-shipment inspection", "OEM sample approval"],
  },
  sources,
  publicSearch: {
    surfaces: ["Google-visible indexed results", "Bing-visible indexed results", "question-style result panels", "Reddit buyer discussions", "Quora attempted but blocked by robots", "ICC official rules and briefings", "government trade-finance guidance", "law-enforcement fraud guidance", "industry and competitor pages", "local-language queries for all publication markets"],
    markets: copies.map((copy) => copy.locale),
    recurringQuestions: ["Should T/T be paid before or after shipment?", "Is a letter of credit automatically safer?", "Can a pre-shipment inspection release a later payment?", "Do banks inspect the goods under an L/C?", "What is the difference between D/P and D/A?", "How should changed beneficiary details be verified?"],
  },
  limitations: [
    "Quora blocked automated verification and supplied no claim.",
    "Reddit was used only to confirm buyer wording, not financial or legal advice.",
    "No deposit ratio, bank fee, price, MOQ, lead time, credit availability or accepted payment method is presented as universal or as a standing factory promise.",
    "The guide does not replace the buyer's bank, legal, tax, foreign-exchange or jurisdiction-specific advice.",
    "Images are unbranded conceptual purchasing scenes, not evidence of a customer payment, bank approval or factory event.",
  ],
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);
  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number) => {
    const sequence = manifest.slots.slice(0, index + 1).filter((item: { locale: string }) => item.locale === slot.locale).length;
    const copy = copies.find((item) => item.locale === slot.locale);
    return sequence === 1
      ? { ...slot, status: "prepared", documentId: `${runDate}-chinafreeweight-${copy?.locale}-free-weight-payment-terms`, entityId, publicPath: copy?.path, draft: "drafts/index.json" }
      : { ...slot, status: "deferred", reason: "One independently localized, fully evidenced edition is prepared; optional extra slots are deferred to preserve research, media and review quality." };
  });
  manifest.status = "prepared";
  manifest.preparedAt = new Date().toISOString();
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ documents: documents.length, candidates: research.candidatePool.length, repositoryPublishedVersionsReviewed }, null, 2));
}

main().catch((error) => { console.error(error); process.exit(1); });
