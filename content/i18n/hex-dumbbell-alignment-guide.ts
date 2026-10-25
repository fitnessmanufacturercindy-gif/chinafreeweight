import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import primaryCopies from "./hex-dumbbell-alignment-guide-copy-primary.json";
import euCopies from "./hex-dumbbell-alignment-guide-copy-eu.json";
import apacCopies from "./hex-dumbbell-alignment-guide-copy-apac.json";

type GuideCopy = {
  locale: InternalLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  home: string;
  library: string;
  eyebrow: string;
  sections: Array<{ heading: string; text: string }>;
  table: { heading: string; columns: string[]; rows: string[][] };
  tablePosition: number;
  checklist: { heading: string; items: string[] };
  faq: string[][];
  faqHeading: string;
  linkHeading: string;
  linkLabels: string[];
  imageCopy: string[][];
  cta: string[];
};

const copies = [...primaryCopies, ...euCopies, ...apacCopies] as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "hex-dumbbell-head-alignment-anti-roll-inspection-guide";
const publishedAt = "2026-10-08T01:00:00.000Z";
const updatedAt = "2026-10-08T03:35:00.000Z";
const commerceTargets = [
  { id: "rubber-hex-dumbbell", path: "/products/dumbbells/hex-dumbbell-kg" },
  { id: "dumbbells-category", path: "/products/dumbbells" }
] as const;
const commerceLabels: Partial<Record<InternalLocale, [string, string]>> = {
  en: ["View rubber hex dumbbells", "Compare commercial dumbbells"],
  "pt-BR": ["Ver halteres sextavados de borracha", "Comparar halteres profissionais"],
  es: ["Ver mancuernas hexagonales de goma", "Comparar mancuernas profesionales"],
  de: ["Gummi-Hex-Kurzhanteln ansehen", "Gewerbliche Kurzhanteln vergleichen"],
  fr: ["Voir les haltères hexagonaux en caoutchouc", "Comparer les haltères professionnels"],
  vi: ["Xem tạ tay lục giác bọc cao su", "So sánh tạ tay chuyên nghiệp"],
  sv: ["Se gummi-hexhantlar", "Jämför kommersiella hantlar"],
  it: ["Vedere i manubri esagonali in gomma", "Confrontare i manubri professionali"],
  nl: ["Bekijk rubberen hex-halters", "Vergelijk professionele halters"],
  ar: ["عرض الدمبل السداسي المطاطي", "مقارنة الدمبل التجاري"],
  ko: ["고무 육각 덤벨 보기", "상업용 덤벨 비교"],
  id: ["Lihat dumbbell hex karet", "Bandingkan dumbbell komersial"],
  pl: ["Zobacz gumowane hantle sześciokątne", "Porównaj hantle komercyjne"]
};
const targets = [
  "dumbbell-head-retention-guide",
  "dumbbell-handle-specification-guide",
  "commercial-dumbbell-rack-compatibility-guide",
  "dumbbell-weight-verification",
  "rubber-coating-adhesion-guide",
  "export-packaging-free-weights",
  "pre-shipment-inspection-free-weights",
  "oem-private-label",
  "contact"
];
const englishPaths = [
  "/resources/dumbbell-head-handle-construction-guide",
  "/resources/dumbbell-handle-diameter-knurling-specification",
  "/resources/commercial-dumbbell-rack-compatibility-guide",
  "/resources/how-are-dumbbells-weighed",
  "/resources/rubber-coating-peeling-cracking-inspection",
  "/resources/export-packaging-dumbbells-weight-plates",
  "/resources/pre-shipment-inspection-dumbbells-weight-plates",
  "/oem",
  "/contact"
];
const supportingLocale: Partial<Record<InternalLocale, [InternalLocale, InternalLocale]>> = {
  en: ["de", "es"],
  "pt-BR": ["es", "fr"],
  es: ["pt-BR", "it"],
  de: ["sv", "nl"],
  fr: ["it", "pt-BR"],
  vi: ["id", "ko"],
  sv: ["de", "nl"],
  it: ["fr", "es"],
  nl: ["de", "sv"],
  ar: ["en", "fr"],
  ko: ["vi", "id"],
  id: ["vi", "ko"],
  pl: ["de", "sv"]
};

const assetLocale = (locale: InternalLocale) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
const imagePath = (locale: InternalLocale) => `/assets/resources/hex-dumbbell-alignment/${assetLocale(locale)}-hex-dumbbell-alignment-guide.webp`;

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  const locales = [copy.locale, ...(supportingLocale[copy.locale] ?? (["en", "de"] as const))];
  return locales.map((locale, index) => ({
    id: `hex-dumbbell-alignment-${index + 1}`,
    src: imagePath(locale),
    width: 1536,
    height: 1024,
    alt: copy.imageCopy[index][0],
    caption: copy.imageCopy[index][1]
  }));
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function visibleLinks(copy: GuideCopy, manifest?: ContentManifest) {
  const localizedCommerceLabels = commerceLabels[copy.locale] ?? commerceLabels.en!;
  return [
    ...commerceTargets.map((target, index) => ({
      id: target.id,
      label: localizedCommerceLabels[index],
      path: localizedPath(manifest, target.id, copy.locale, target.path)
    })),
    ...targets.map((id, index) => ({
      id,
      label: copy.linkLabels[index],
      path: localizedPath(manifest, id, copy.locale, englishPaths[index])
    }))
  ];
}

function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest) {
  return visibleLinks(copy, manifest).map((link) => `- [${link.label}](${link.path})`).join("\n");
}

function sectionBlock(section: GuideCopy["sections"][number], index: number): ContentBlock {
  if (index < 2) {
    return {
      id: `hex-dumbbell-alignment-section-${index + 1}`,
      type: "rich_text",
      heading: section.heading,
      content: section.text,
      data: { component: index === 0 ? "quick-answer" : "definition" }
    };
  }
  return {
    id: `hex-dumbbell-alignment-section-${index + 1}`,
    type: "custom",
    data: { component: "markdown-section", markdown: `### ${section.heading}\n\n${section.text}` }
  };
}

function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections = copy.sections.map(sectionBlock);
  const insertion = Math.max(2, Math.min(copy.tablePosition, sections.length));
  sections.splice(insertion, 0, {
    id: "hex-dumbbell-alignment-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({ id: "hex-dumbbell-alignment-checklist", type: "features", heading: copy.checklist.heading, data: { items: copy.checklist.items } });
  sections.push({ id: "hex-dumbbell-alignment-links", type: "custom", heading: copy.linkHeading, data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) } });
  return sections;
}

function versionFor(copy: GuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const contactPath = localizedPath(manifest, "contact", copy.locale, "/contact");
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryPath = copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}`;
  const internalLinks = visibleLinks(copy, manifest)
    .filter((link) => manifest.entities.find((entity) => entity.id === link.id)?.versions[copy.locale]?.publishStatus === "published")
    .map((link) => ({ targetContentId: link.id, label: link.label }));

  return {
    locale: copy.locale,
    translationStatus: copy.locale === "en" ? "published" : "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: parts.at(-1)!,
    publicPath: copy.path,
    title: copy.title,
    description: copy.description,
    h1: copy.h1,
    body: bodyFor(copy, manifest),
    faq: copy.faq.map(([question, answer], index) => ({ id: `hex-dumbbell-alignment-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-hex-dumbbell-alignment-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-hex-dumbbell-alignment-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
    schemaData: {
      category: copy.keyword,
      breadcrumbs: [
        { name: copy.home, path: homePath },
        { name: copy.library, path: libraryPath },
        { name: copy.h1, path: copy.path }
      ],
      extra: {
        primaryKeyword: copy.keyword,
        useLocalizedHero: true,
        eyebrow: copy.eyebrow,
        contactPath,
        ctaTitle: copy.cta[0],
        ctaText: copy.cta[1],
        ctaLabel: copy.cta[2]
      }
    },
    images: imagesFor(copy),
    internalLinks,
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    publishedAt,
    updatedAt,
    version: 1
  };
}

function englishMarkdown() {
  return [
    ...bodyFor(english).map((block) => {
      let content = block.content ?? String(block.data?.markdown ?? "");
      if (block.type === "specifications") {
        content = [
          `| ${english.table.columns.join(" | ")} |`,
          `| ${english.table.columns.map(() => "---").join(" | ")} |`,
          ...english.table.rows.map((row) => `| ${row.join(" | ")} |`)
        ].join("\n");
      }
      if (block.type === "features") content = english.checklist.items.map((item) => `- ${item}`).join("\n");
      return block.heading ? `## ${block.heading}\n\n${content}` : content;
    }),
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`
  ].join("\n\n");
}

export const hexDumbbellAlignmentEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["hex dumbbell anti-roll inspection", "dumbbell head phase alignment", "fixed dumbbell geometry quality", "private label hex dumbbell inspection"],
  searchIntent: "specify, approve and inspect hex dumbbell head geometry, alignment and stable anti-roll seating for bulk orders",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt
};

export function withHexDumbbellAlignmentGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
