import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primaryCopiesJson from "../../../content/i18n/neoprene-vinyl-dumbbell-guide-copy-primary.json";
import euWestCopiesJson from "../../../content/i18n/neoprene-vinyl-dumbbell-guide-copy-eu-west.json";
import euNorthCopiesJson from "../../../content/i18n/neoprene-vinyl-dumbbell-guide-copy-eu-north.json";
import apacLatinCopiesJson from "../../../content/i18n/neoprene-vinyl-dumbbell-guide-copy-apac-latin.json";
import apacCopiesJson from "../../../content/i18n/neoprene-vinyl-dumbbell-guide-copy-apac.json";

type Copy = (typeof primaryCopiesJson)[number];
const copies = [
  ...primaryCopiesJson,
  ...euWestCopiesJson,
  ...euNorthCopiesJson,
  ...apacLatinCopiesJson,
  ...apacCopiesJson
] as Copy[];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-10-26";
const publishedAt = "2026-10-26T04:21:26.000Z";
const entityId = "neoprene-vinyl-dumbbell-wholesale-guide";
const targets = [
  "dumbbells-category",
  "product:dumbbells:neoprene-dumbbell-kg",
  "commercial-dumbbell-set-planning",
  "custom-logo-free-weights",
  "custom-color-free-weights-approval-guide",
  "low-odor-rubber-free-weights-guide",
  "export-packaging-free-weights",
  "contact"
];
const englishPaths = [
  "/products/dumbbells",
  "/products/dumbbells/neoprene-dumbbell-kg",
  "/resources/plan-commercial-dumbbell-set",
  "/resources/custom-logo-options-dumbbells-weight-plates",
  "/resources/custom-color-dumbbells-weight-plates-guide",
  "/resources/low-odor-rubber-dumbbells-weight-plates-guide",
  "/resources/export-packaging-dumbbells-weight-plates",
  "/contact"
];
const architecture = {
  en: ["technical_comparison", "comparison_decision_tree", "Purchasing Manager"],
  "pt-BR": ["procurement_decision", "procurement_risk_map", "Distributor"],
  es: ["technical_comparison", "comparison_decision_tree", "Importer"],
  de: ["quality_control", "quality_failure_analysis", "Purchasing Manager"],
  fr: ["supplier_selection", "procurement_risk_map", "Fitness Brand"],
  vi: ["project_planning", "project_sequence", "Gym Owner"],
  sv: ["procurement_decision", "comparison_decision_tree", "Gym Owner"],
  it: ["supplier_selection", "procurement_risk_map", "Distributor"],
  nl: ["cost_analysis", "cost_model", "Importer"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"],
  id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["quality_control", "quality_failure_analysis", "Purchasing Manager"]
} as const;
const localMarketEvidence: Record<string, string[]> = {
  en: [
    "English People Also Ask results repeatedly asked whether neoprene and vinyl are the same and whether vinyl-coated dumbbells are suitable for use.",
    "Reddit buyers framed the choice through sweaty-hand grip, sticky transfer, smell, grime and cracking rather than a coating name alone."
  ],
  "pt-BR": [
    "Buscas brasileiras usam halter de neoprene, halter em vinil, kit colorido e fácil de higienizar, com forte contexto de estúdio e varejo.",
    "A edição brasileira prioriza mãos suadas, produto de limpeza, marcação em kg, cartela de cores e reposição do kit."
  ],
  es: [
    "Las preguntas en español incluyeron si las mancuernas de neopreno son buenas y cuál es el mejor material para una mancuerna.",
    "La edición usa el lenguaje de compra mayorista, clases dirigidas, limpieza, marcación en kg y continuidad de surtido."
  ],
  de: [
    "Deutschsprachige Ergebnisse verwenden Neopren-Hanteln, Vinyl-Kurzhanteln, Großhandel, Reinigung und rutschfester Griff als Beschaffungssprache.",
    "Die DACH-Fassung priorisiert Werkstoffangabe, Artikelnummer, Nachweisumfang und wiederholbare Wareneingangskriterien."
  ],
  fr: [
    "Les recherches francophones associent haltères néoprène ou vinyle à la prise en main, au nettoyage, aux petites charges et aux cours collectifs.",
    "La version française structure la décision comme un cahier des charges avec référence, justificatif, bon à tirer et réassort."
  ],
  vi: [
    "Truy vấn tiếng Việt dùng tạ tay bọc neoprene, tạ vinyl, mua sỉ, bộ kg và vệ sinh cho phòng tập hoặc lớp nhóm.",
    "Bài viết ưu tiên dải kg, màu nhận diện, tay ẩm, hồ sơ nhập hàng và khả năng bổ sung SKU bán chạy."
  ],
  sv: [
    "Svenska sökningar kopplar neopren- och vinylhantlar till gruppträning, grepp, rengöring, färgkodning och inköp för gym.",
    "Den svenska vinkeln betonar städrutin, komplettering, kontrollerad kulör och mottagningskontroll för anläggningar."
  ],
  it: [
    "Le ricerche italiane usano manubri in neoprene o vinile, ingrosso, presa, pulizia e set colorati per corsi e vendita.",
    "La versione italiana mette al centro fascicolo acquisti, scala pesi, private label, campione e continuità del riordino."
  ],
  nl: [
    "Nederlandstalige zoektermen combineren neopreen of vinyl dumbbells met groothandel, schoonmaken, grip en groepslessen.",
    "De Nederlandse editie legt nadruk op beheerde referenties, gebruikskosten, doosvolume en leverbaarheid bij nabestelling."
  ],
  ar: [
    "تستخدم نتائج البحث العربية عبارات دمبل نيوبرين ودمبل فينيل والشراء بالجملة وسهولة التنظيف والثبات في اليد.",
    "تركز النسخة العربية على وثائق سوق الوجهة ووضوح الوزن والتغليف وإمكانية تكرار الشكل في الطلب التالي."
  ],
  ko: [
    "한국어 검색은 네오프렌 덤벨, 비닐 덤벨, 도매, 세척, 미끄럼과 그룹 수업용 저중량 세트를 함께 다룹니다.",
    "한국어판은 kg 표시, 빠른 사용자 교대, 반복 세척, 입고 검사와 동일 외관 재주문을 중심으로 구성했습니다."
  ],
  id: [
    "Pencarian Indonesia memakai dumbbell neoprene atau vinyl, grosir, mudah dibersihkan, grip, dan paket warna untuk kelas.",
    "Edisi Indonesia menekankan SKU, tangga berat, penanganan distributor, dokumen tujuan, packing, dan pengisian ulang."
  ],
  pl: [
    "Polskie wyniki łączą hantle neoprenowe i winylowe z hurtownią, chwytem, czyszczeniem, kolorem oraz zajęciami fitness.",
    "Wersja polska koncentruje się na dokumentacji zakupu, kryteriach odbioru, znakowaniu masy i zgodności kolejnych dostaw."
  ]
};
const sources = [
  {
    title: "ECHA — Phthalates",
    url: "https://echa.europa.eu/hot-topics/phthalates",
    primary: true,
    use: "Regulator overview used for the bounded statement that certain phthalates are restricted and that applicability depends on substance, article and destination context."
  },
  {
    title: "ECHA — Annex XVII restriction entry for specified phthalates",
    url: "https://echa.europa.eu/documents/10162/aaa92146-a005-1dc2-debe-93c80b57c5ee",
    primary: true,
    use: "Primary restriction text used to keep documentation advice model- and scope-specific rather than make a generic compliance claim."
  },
  {
    title: "Vinyl Institute — Vinyl production",
    url: "https://www.vinylinfo.org/production/",
    primary: false,
    use: "Industry description supporting cautious terminology around vinyl and PVC; it is not treated as regulatory evidence."
  },
  {
    title: "Reddit Fitness — Neoprene vs vinyl vs raw dumbbells",
    url: "https://www.reddit.com/r/Fitness/comments/9kmxd6/neoprene_vs_vinyl_vs_raw_little_dumbbells/",
    primary: false,
    use: "Community vocabulary about grip and cleaning concerns; not used as material-performance proof."
  },
  {
    title: "Ironhue — Vinyl/Neoprene Dumbbells",
    url: "https://ironhue.com/products/dumbbells/vinyl-neoprene-dumbbells",
    primary: false,
    use: "Market-language example showing why the buyer should request an exact construction declaration."
  }
];

function localizedPath(id: string, locale: string, fallback: string) {
  const versions = contentRepository.getEntity(id)?.versions as Record<string, { publicPath: string } | undefined> | undefined;
  return versions?.[locale]?.publicPath ?? fallback;
}

function assetLocale(locale: string) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

const documents = copies.map((copy) => {
  const version = contentRepository.getPublishedVersion(entityId, copy.locale as InternalLocale)?.version;
  if (!version) throw new Error(`Missing published repository version for ${copy.locale}`);
  const [searchIntentClass, structureFamily, targetBuyer] = architecture[copy.locale as keyof typeof architecture];
  const sections = copy.sections.map((section, index) => ({
    heading: section.heading,
    paragraphs: section.text.split(/\n\n/u),
    ...(index === Math.min(3, copy.sections.length - 1) ? { table: copy.table } : {}),
    ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {})
  }));
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-neoprene-vinyl-dumbbells`,
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
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections.at(-1)?.heading}`,
    targetBuyer,
    whyThisArticleExists: copy.sections[1].text,
    independentInsights: [copy.sections[2].text, copy.sections[4].text, copy.sections[5].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: copy.sections.at(-1)?.text,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: localMarketEvidence[copy.locale],
    sections,
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({
      targetContentId,
      label: copy.linkLabels[index],
      href: localizedPath(targetContentId, copy.locale, englishPaths[index])
    })),
    images: [{
      src: `/assets/resources/neoprene-vinyl-dumbbells/${assetLocale(copy.locale)}-neoprene-vinyl-dumbbells-guide.webp`,
      alt: copy.imageAlt,
      provenance: "Original image created with OpenAI image generation for this locale; prompt and source mapping are retained in the run artifact.",
      rights: "Commissioned original for ChinaFreeWeight; no customer image, third-party brand or documentary factory claim."
    }],
    sources,
    cta: {
      label: copy.cta[2],
      href: localizedPath("contact", copy.locale, "/contact"),
      buyerValue: `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply options are reviewed against the selected construction.`
    }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "Neoprene versus vinyl dumbbells for wholesale and private-label buying",
  selectionReason: "Distinct high-intent material question not owned by the existing rubber-versus-urethane guide; buyers need a verification framework because market labels are inconsistent.",
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, {
    targetKeyword: copy.keyword,
    questions: copy.faq.map(([question]) => question),
    evidence: localMarketEvidence[copy.locale],
    path: copy.path
  }])),
  competitors: [
    { name: "Ironhue", url: "https://ironhue.com/products/dumbbells/vinyl-neoprene-dumbbells", observation: "Uses a combined material label, reinforcing the need for exact SKU declarations." },
    { name: "Avec Fitness", url: "https://www.avecfitness.com/Boutique-customization/neoprene-hex-weights-dumbbells", observation: "Listing terminology and stated material fields are not identical, so the guide avoids inferring chemistry from titles." },
    { name: "Yanre Fitness", url: "https://www.yanrefitness.com/wholesale-neoprene-dumbbells/", observation: "Targets wholesale neoprene demand and customization language." }
  ],
  rejectedTopics: [
    "Export packaging for dumbbells and weight plates — existing page owns the intent.",
    "Cable-attachment weld inspection — existing quality content would overlap.",
    "Commercial dumbbell-set planning — already published in every locale.",
    "General pre-shipment inspection — existing guide owns the query.",
    "Rust and corrosion — already covered by finish and maintenance guides."
  ],
  siteGaps: ["No dedicated neoprene-versus-vinyl light-dumbbell procurement guide before this run."],
  searchRun: {
    provider: "DataForSEO live search plus public web review",
    successfulTasks: 14,
    recordedCostUsd: 0.088,
    observedQuestions: 24,
    limitations: [
      "German and French paid live-result tasks failed; broader public results and local site terminology were used.",
      "Quora page text was inaccessible; only question snippets were observed and no technical claim relies on an answer.",
      "Vietnamese results were noisy and were used only for vocabulary and question framing."
    ]
  },
  sources
};

async function main() {
  await mkdir(path.join(runRoot, "drafts"), { recursive: true });
  await writeFile(path.join(runRoot, "drafts", "index.json"), `${JSON.stringify({ schemaVersion: 2, siteId: "chinafreeweight", runDate, status: "ready-for-qa", documents }, null, 2)}\n`);
  await writeFile(path.join(runRoot, "research.json"), `${JSON.stringify(research, null, 2)}\n`);

  const manifestPath = path.join(runRoot, "manifest.json");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  manifest.preparedAt = new Date().toISOString();
  manifest.selectedTopic = research.selectedTopic;
  manifest.preparedCount = documents.length;
  manifest.slots = manifest.slots.map((slot: { locale: string; status: string }, index: number, slots: Array<{ locale: string; status: string }>) => {
    const firstForLocale = slots.findIndex((candidate) => candidate.locale === slot.locale) === index;
    return firstForLocale ? { ...slot, status: "prepared", documentId: documents.find((document) => document.locale === slot.locale)?.id } : slot;
  });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "built", documents: documents.length, research: path.join(runRoot, "research.json") }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
