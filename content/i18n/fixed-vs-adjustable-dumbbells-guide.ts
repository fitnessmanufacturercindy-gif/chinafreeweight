import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import copyData from "./fixed-vs-adjustable-dumbbells-copy.json";

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
  checklist: { heading: string; items: string[] };
  faq: string[][];
  faqHeading: string;
  linkHeading: string;
  linkLabels: string[];
  imageCopy: string[][];
  cta: string[];
};

const copies = copyData as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "fixed-vs-adjustable-dumbbells-commercial-guide";
const publishedAt = "2026-09-04T04:00:00.000Z";
const targets = [
  "product:dumbbells:adjustable-dumbbell-kg",
  "rubber-hex-dumbbell",
  "commercial-dumbbell-set-planning",
  "dumbbell-head-handle-construction-guide",
  "factory",
  "contact"
];
const englishPaths = [
  "/products/dumbbells/adjustable-dumbbell-kg",
  "/products/dumbbells/hex-dumbbell-kg",
  "/resources/plan-commercial-dumbbell-set",
  "/resources/dumbbell-head-handle-construction-guide",
  "/factory",
  "/contact"
];
const supportingLocale: Partial<Record<InternalLocale, [InternalLocale, InternalLocale]>> = {
  en: ["de", "ko"], "pt-BR": ["es", "fr"], es: ["pt-BR", "it"], de: ["sv", "nl"], fr: ["it", "pt-BR"],
  vi: ["id", "ko"], sv: ["de", "nl"], it: ["fr", "es"], nl: ["de", "sv"], ar: ["en", "fr"], ko: ["vi", "id"],
  id: ["vi", "ko"], pl: ["de", "sv"]
};

function imagePath(locale: InternalLocale) {
  return `/assets/resources/fixed-vs-adjustable-dumbbells/${locale.toLowerCase()}-fixed-adjustable-dumbbells.webp`;
}

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  const locales = [copy.locale, ...(supportingLocale[copy.locale] ?? ["en", "de"] as const)];
  return locales.map((locale, index) => ({
    id: `fixed-adjustable-${index + 1}`,
    src: imagePath(locale),
    width: 1536,
    height: 1024,
    alt: copy.imageCopy[index][0],
    caption: copy.imageCopy[index][1]
  }));
}

function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest): string {
  return targets.map((id, index) => {
    const entity = manifest?.entities.find((entry) => entry.id === id);
    const href = entity?.versions[copy.locale]?.publicPath ?? englishPaths[index];
    return `- [${copy.linkLabels[index]}](${href})`;
  }).join("\n");
}

function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `fixed-adjustable-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    heading: section.heading,
    ...(index < 2
      ? { content: section.text, data: { component: index === 0 ? "quick-answer" : "definition" } }
      : { data: { component: "markdown-section", markdown: section.text } })
  }));
  sections.splice(4, 0, {
    id: "fixed-adjustable-fit-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.splice(7, 0, {
    id: "fixed-adjustable-sample-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items }
  });
  sections.push({
    id: "fixed-adjustable-related-reading",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) }
  });
  return sections;
}

function versionFor(copy: GuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const contactPath = manifest.entities.find((entity) => entity.id === "contact")?.versions[copy.locale]?.publicPath ?? "/contact";
  const internalLinks = targets
    .filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published")
    .map((id) => ({ targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] }));
  if (copy.locale === "ar") {
    for (const [targetContentId, label] of [
      ["bulk-oem-steel-dumbbells-guide", "دليل شراء الدمبل الفولاذي"],
      ["weight-plate-tolerance-bulk-order-guide", "دليل فحص تفاوت وزن الأقراص"],
      ["commercial-olympic-barbell-buying-guide", "دليل شراء البار الأولمبي"],
      ["kg-lb-free-weight-ordering-guide", "دليل طلب الأوزان بالكيلو والرطل"]
    ] as const) {
      internalLinks.push({ targetContentId, label });
    }
  }
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `fixed-adjustable-faq-${index + 1}`, question, answer })),
    author: { id: `powerbasefit-fixed-adjustable-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `powerbasefit-fixed-adjustable-review-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.checklist.heading },
    schemaData: {
      category: copy.keyword,
      breadcrumbs: [
        { name: copy.home, path: copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}` },
        { name: copy.library, path: copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}` },
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
    updatedAt: publishedAt,
    version: 1
  };
}

function englishMarkdown(): string {
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
      return `## ${block.heading}\n\n${content}`;
    }),
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`
  ].join("\n\n");
}

export const fixedVsAdjustableEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["fixed dumbbells for commercial gyms", "adjustable dumbbells for hotels", "commercial adjustable dumbbell buying guide", "gym dumbbell space planning"],
  searchIntent: "compare fixed and adjustable dumbbells for a commercial facility purchase",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt
};

export function withFixedVsAdjustableDumbbellsGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
