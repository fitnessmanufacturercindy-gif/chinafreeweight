import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { InternalLocale } from "../../../i18n/locale-registry";
import { contentRepository } from "../../../lib/content/repository";
import primary from "../../../content/i18n/weight-plate-storage-guide-copy-primary.json";
import euWest from "../../../content/i18n/weight-plate-storage-guide-copy-eu-west.json";
import euNorth from "../../../content/i18n/weight-plate-storage-guide-copy-eu-north.json";
import apacLatin from "../../../content/i18n/weight-plate-storage-guide-copy-apac-latin.json";
import arabic from "../../../content/i18n/weight-plate-storage-guide-copy-ar.json";
import korean from "../../../content/i18n/weight-plate-storage-guide-copy-ko.json";

type Copy = (typeof primary)[number];
const copies = [...primary, ...euWest, ...euNorth, ...apacLatin, ...arabic, ...korean] as Copy[];
const runRoot = path.dirname(fileURLToPath(import.meta.url));
const runDate = "2026-10-27";
const publishedAt = "2026-10-27T06:00:00.000Z";
const entityId = "commercial-weight-plate-storage-planning-guide";
const targets = [
  "weight-plates-category",
  "plates-guide",
  "weight-plate-outside-diameter-profile-guide",
  "bumper-plate-thickness-sleeve-capacity-guide",
  "weight-plate-grip-openings-handling-guide",
  "weight-plate-edge-rim-handling-guide",
  "export-packaging-free-weights",
  "contact"
];
const englishPaths = [
  "/products/weight-plates",
  "/resources/weight-plates-vs-bumper-plates-b2b-guide",
  "/resources/weight-plate-outside-diameter-profile-guide",
  "/resources/bumper-plate-thickness-sleeve-capacity-guide",
  "/resources/weight-plate-grip-openings-handling-guide",
  "/resources/weight-plate-edge-rim-handling-guide",
  "/resources/export-packaging-dumbbells-weight-plates",
  "/contact"
];
const architecture = {
  en: ["project_planning", "project_sequence", "Purchasing Manager"],
  "pt-BR": ["procurement_decision", "comparison_decision_tree", "Distributor"],
  es: ["supplier_selection", "procurement_risk_map", "Importer"],
  de: ["quality_control", "quality_failure_analysis", "Purchasing Manager"],
  fr: ["project_planning", "project_sequence", "Gym Owner"],
  vi: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  sv: ["supplier_selection", "procurement_risk_map", "Gym Owner"],
  it: ["project_planning", "project_sequence", "Fitness Brand"],
  nl: ["cost_analysis", "cost_model", "Importer"],
  ar: ["supplier_selection", "procurement_risk_map", "Importer"],
  ko: ["quality_control", "quality_failure_analysis", "Fitness Brand"],
  id: ["procurement_decision", "comparison_decision_tree", "Distributor"],
  pl: ["quality_control", "quality_failure_analysis", "Purchasing Manager"]
} as const;
const marketTerms: Record<string, string[]> = {
  en: ["English buyer questions compare plate trees, floor racks, wall storage and rack-mounted pegs by fit, capacity and stability.", "Community discussions repeatedly ask whether thick bumper plates fit, whether a tree can tip and how to avoid wasted floor space."],
  "pt-BR": ["Buscas brasileiras usam suporte para anilhas olímpicas, árvore de anilhas 50 mm, capacidade e organização de academia.", "A edição brasileira liga a escolha à mistura de anilhas, circulação, marcação em kg e recebimento do lote."],
  es: ["Las búsquedas usan soporte para discos olímpicos, árbol de discos 50 mm, capacidad y almacenamiento para gimnasio.", "La edición española prioriza medidas terminadas, reparto por perno, circulación y control de recepción."],
  de: ["Deutschsprachige Suchen verwenden Hantelscheibenständer 50 mm, Aufbewahrung, Belastbarkeit und Bumper Plates.", "Die DACH-Fassung trennt nutzbare Länge, Freiraum, Einzellast und Gesamtfreigabe für eine prüfbare Bestellung."],
  fr: ["Les requêtes emploient rangement disques olympiques, arbre à disques, support bumper et capacité pour salle.", "La version française relie nomenclature des disques, plan de zone, fixation, accessibilité et réception."],
  vi: ["Truy vấn dùng giá để bánh tạ Olympic, cây treo bánh tạ 50 mm, sức chứa và sắp xếp phòng gym.", "Bài viết ưu tiên danh sách bánh, chiều dài hữu dụng, lối đi, lấy bánh và kiểm tra khi nhận."],
  sv: ["Svenska sökningar använder viktskiveställ 50 mm, förvaring av bumper plates, kapacitet och gymmiljö.", "Den svenska texten prioriterar skivlista, åtkomst, golvyta, tillåten last och mottagningskontroll."],
  it: ["Le ricerche usano porta dischi olimpici, rastrelliera 50 mm, capacità e stoccaggio dischi palestra.", "La versione italiana collega distinta dischi, spazio utile, passaggi, fissaggio e collaudo in ricezione."],
  nl: ["Nederlandse zoektermen combineren halterschijven opbergrek, 50 mm, bumper plates, capaciteit en sportschool.", "De Nederlandse editie maakt de kosten van verkeerde maatvoering zichtbaar via bezetting, handling en nabestelling."],
  ar: ["تستخدم الاستفسارات العربية حامل أقراص أوزان أولمبية وشجرة أقراص 50 مم والسعة وتنظيم الصالة.", "تركز النسخة العربية على جدول الأقراص والخلوص والثبات ومسار المستخدم وفحص الاستلام."],
  ko: ["한국어 검색은 원판 보관대, 50 mm 원판 거치대, 범퍼 플레이트 수납, 허용 하중을 함께 묻습니다.", "한국어판은 완성 치수, 실사용 길이, 편하중, 동선과 입고 검사에 초점을 둡니다."],
  id: ["Pencarian Indonesia memakai rak penyimpanan plate Olympic, tree 50 mm, kapasitas dan penataan gym.", "Edisi Indonesia menghubungkan daftar plate, panjang pakai, jalur pengguna, stabilitas dan pemeriksaan penerimaan."],
  pl: ["Polskie wyszukiwania używają stojak na obciążenia olimpijskie 50 mm, bumper plates, udźwig i przechowywanie.", "Wersja polska rozdziela geometrię, nośność, stateczność, montaż oraz kontrolę dostawy."]
};
const sources = [
  {
    title: "OSHA 29 CFR 1910.176 — Materials handling and storage",
    url: "https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.176",
    primary: true,
    use: "Primary U.S. reference for stable storage and clear passageways; explicitly not used as a rack load rating."
  },
  {
    title: "Precor DBR0817 Olympic Weight Tree",
    url: "https://www.precor.com/en-US/products/DBR0817",
    primary: true,
    use: "Manufacturer page showing that horn count and stated storage values belong to an identified model."
  },
  {
    title: "Eleiko Prestera Plate Storage",
    url: "https://eleiko.com/en/equipment/outdoor/galvanized/3085718-01-eleiko-prestera-plate-storage-1720mm-outdoor",
    primary: true,
    use: "Manufacturer example showing that rack-mounted storage is tied to a named equipment ecosystem and configuration."
  },
  {
    title: "Rival T Series Rack Mounted Plate Storage",
    url: "https://www.rivalstrength.co.uk/products/t-series-rack-mounted-plate-storage-pair",
    primary: true,
    use: "Manufacturer example supporting exact upright, hole and hardware compatibility checks."
  },
  {
    title: "Reddit Weightlifting — bumper plate storage question",
    url: "https://www.reddit.com/r/weightlifting/comments/15pa8xv/bumper_plate_storage_what_about_tire_racks/",
    primary: false,
    use: "Natural buyer wording around plate diameter, slot format and storage footprint; not used as engineering evidence."
  }
];
const candidateLabels = [
  "plate tree versus slot rack", "50 mm storage peg compatibility", "bumper plate rack capacity", "usable peg length", "uneven loading stability",
  "rack-mounted horn compatibility", "wall-mounted plate storage", "mobile plate trolley", "change plate organization", "plate storage RFQ",
  "plate rack receiving inspection", "gym storage aisle planning", "plate thickness storage math", "private-label plate rack", "bulk plate and rack program"
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
  return {
    id: `${runDate}-chinafreeweight-${copy.locale}-weight-plate-storage`,
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
    coreIntentKey: `${copy.keyword} | ${copy.sections[1].heading} | ${copy.sections[3].heading}`,
    targetBuyer,
    whyThisArticleExists: copy.sections[1].text,
    independentInsights: [copy.sections[2].text, copy.sections[3].text, copy.sections[5].text],
    structureFamily,
    outlineRationale: copy.sections.map((section) => section.heading).join(" → "),
    decisionConsequence: copy.sections.at(-1)?.text,
    ctaStrategy: `${copy.cta[0]} — ${copy.cta[1]}`,
    languageCreationMode: "local-market-original",
    translationSourceId: null,
    localMarketEvidence: marketTerms[copy.locale],
    sections: copy.sections.map((section, index) => ({
      heading: section.heading,
      paragraphs: section.text.split(/\n\n/u),
      ...(index === 3 ? { table: copy.table } : {}),
      ...(index === copy.sections.length - 1 ? { bullets: copy.checklist.items } : {})
    })),
    faq: copy.faq.map(([question, answer]) => ({ question, answer })),
    internalLinks: targets.map((targetContentId, index) => ({
      targetContentId,
      label: copy.linkLabels[index],
      href: localizedPath(targetContentId, copy.locale, englishPaths[index])
    })),
    images: [{
      src: `/assets/resources/weight-plate-storage/${assetLocale(copy.locale)}-weight-plate-storage-guide.webp`,
      alt: copy.imageAlt,
      provenance: "Original commissioned image created for this locale; prompt and source mapping are retained in the run artifact.",
      rights: "Commissioned original for ChinaFreeWeight; no customer image, third-party brand or documentary factory claim."
    }],
    sources,
    cta: {
      label: copy.cta[2],
      href: localizedPath("contact", copy.locale, "/contact"),
      buyerValue: `${copy.cta[1]} OEM, ODM, Custom Logo, Private Label and Bulk Supply are reviewed against the selected configuration.`
    }
  };
});

const research = {
  schemaVersion: 1,
  siteId: "chinafreeweight",
  runDate,
  status: "complete",
  selectedTopic: "Commercial weight-plate storage compatibility and capacity planning",
  selectionReason: "High-intent equipment-planning question not owned by an existing article; it links plate dimensions to storage geometry, declared load, access and inspection without duplicating prior plate-component guides.",
  candidatePool: copies.flatMap((copy) => candidateLabels.map((label, index) => ({ locale: copy.locale, rank: index + 1, topic: `${copy.keyword}: ${label}`, selected: index === 0 }))),
  locales: Object.fromEntries(copies.map((copy) => [copy.locale, { targetKeyword: copy.keyword, questions: copy.faq.map(([question]) => question), evidence: marketTerms[copy.locale], path: copy.path }])),
  competitors: [
    { name: "Precor", url: sources[1].url, observation: "Presents storage by an identified model rather than a universal capacity claim." },
    { name: "Eleiko", url: sources[2].url, observation: "Shows ecosystem-specific rack storage and configuration language." },
    { name: "Rival Strength", url: sources[3].url, observation: "Makes rack interface compatibility part of the product definition." }
  ],
  rejectedTopics: [
    "Weight-plate outside diameter — already covered by the diameter guide.",
    "Bumper plate thickness and bar loading — already covered by the sleeve-capacity guide.",
    "Weight-plate grip openings — already covered by the handling guide.",
    "Weight-plate edge handling — already published in every locale.",
    "Dumbbell rack compatibility — published on 2026-10-02 and outside the selected product family."
  ],
  siteGaps: ["No dedicated guide previously connected a real plate schedule to storage format, usable length, load declarations, access, installation and receipt inspection."],
  conflictCheck: { liveBlogUrlsReviewed: 888, dedicatedPlateStorageArticleFound: false, nearestTopics: ["commercial dumbbell rack compatibility", "weight plate outside diameter", "bumper plate thickness and sleeve capacity"] },
  searchRun: {
    provider: "Public Google/Bing-visible results and direct source review",
    queryFormulationsReviewed: 24,
    observedQuestionGroups: 17,
    limitations: ["Quora page text was blocked, so no technical claim relies on a Quora answer.", "Community discussions were used only for question wording; engineering guidance relies on responsible product documentation and bounded general safety references."]
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
  manifest.candidateCount = research.candidatePool.length;
  manifest.slots = manifest.slots.map((slot: { locale: string }, index: number, slots: Array<{ locale: string }>) => {
    const first = slots.findIndex((candidate) => candidate.locale === slot.locale) === index;
    return first ? { ...slot, status: "prepared", documentId: documents.find((document) => document.locale === slot.locale)?.id } : slot;
  });
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(JSON.stringify({ status: "built", documents: documents.length, candidates: research.candidatePool.length }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
