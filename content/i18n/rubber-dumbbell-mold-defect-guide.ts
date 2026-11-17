import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { rubberDumbbellMoldDefectPrimaryCopies } from "./rubber-dumbbell-mold-defect-guide-copy-primary";
import { rubberDumbbellMoldDefectEuCopies } from "./rubber-dumbbell-mold-defect-guide-copy-eu";
import { rubberDumbbellMoldDefectApacCopies } from "./rubber-dumbbell-mold-defect-guide-copy-apac";

export type RubberDumbbellMoldDefectGuideCopy = {
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
  faqHeading: string;
  faq: string[][];
  linkHeading: string;
  linkLabels: string[];
  imageAlt: string;
  imageCaption: string;
  cta: string[];
};

const copies = [
  ...rubberDumbbellMoldDefectPrimaryCopies,
  ...rubberDumbbellMoldDefectEuCopies,
  ...rubberDumbbellMoldDefectApacCopies
] as RubberDumbbellMoldDefectGuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "rubber-dumbbell-mold-line-flash-inspection-guide";
const publishedAt = "2026-11-15T06:30:00.000Z";
const targets = [
  "dumbbells-category",
  "rubber-coating-adhesion-dumbbell-plate-guide",
  "rubber-dumbbell-shore-hardness-guide",
  "rubber-dumbbell-surface-bloom-guide",
  "dumbbell-head-handle-construction-guide",
  "free-weight-aql-defect-classification-guide",
  "oem-sample-approval-free-weights",
  "contact"
];
const englishPaths = [
  "/products/dumbbells",
  "/resources/rubber-coating-peeling-cracking-inspection",
  "/resources/rubber-dumbbell-shore-hardness-guide",
  "/resources/rubber-dumbbell-surface-bloom-oily-residue-guide",
  "/resources/dumbbell-head-handle-construction-guide",
  "/resources/free-weight-aql-inspection-defect-classification-guide",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact"
];

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imageFor(copy: RubberDumbbellMoldDefectGuideCopy): LocalizedImage {
  const locale = assetLocale(copy.locale);
  return {
    id: `rubber-dumbbell-mold-inspection-${locale}`,
    src: `/assets/resources/rubber-dumbbell-mold-inspection/${locale}-rubber-dumbbell-mold-inspection.webp`,
    width: 1536,
    height: 1024,
    alt: copy.imageAlt,
    caption: copy.imageCaption
  };
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkMarkdown(copy: RubberDumbbellMoldDefectGuideCopy, manifest?: ContentManifest) {
  return targets.map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`).join("\n");
}

function bodyFor(copy: RubberDumbbellMoldDefectGuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `rubber-dumbbell-mold-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    heading: section.heading,
    content: index === 0 ? section.text : undefined,
    data: index < 2
      ? index === 0
        ? { component: "quick-answer" }
        : { component: "definition", markdown: section.text }
      : { component: "markdown-section", markdown: section.text }
  }));
  sections.splice(3, 0, {
    id: "rubber-dumbbell-mold-decision-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({
    id: "rubber-dumbbell-mold-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items }
  });
  sections.push({
    id: "rubber-dumbbell-mold-links",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) }
  });
  return sections;
}

function versionFor(copy: RubberDumbbellMoldDefectGuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryFallback = copy.locale === "en" || copy.locale === "ar" ? "/resources" : copy.locale === "sv" ? "/sv/blogg" : `/${parts.slice(0, 2).join("/")}`;
  const libraryPath = localizedPath(manifest, "blog-index", copy.locale, libraryFallback);
  const internalLinks = targets
    .filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published")
    .map((id) => ({ targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] }));
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `rubber-dumbbell-mold-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-rubber-mold-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-rubber-mold-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
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
        contactPath: localizedPath(manifest, "contact", copy.locale, "/contact"),
        ctaTitle: copy.cta[0],
        ctaText: copy.cta[1],
        ctaLabel: copy.cta[2]
      }
    },
    images: [imageFor(copy)],
    internalLinks,
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    publishedAt,
    updatedAt: publishedAt,
    version: 1
  };
}

function englishMarkdown() {
  const blocks = bodyFor(english).map((block) => {
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
  });
  return [
    ...blocks,
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`
  ].join("\n\n");
}

export const rubberDumbbellMoldDefectEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "rubber hex dumbbell mold seam",
    "dumbbell flash inspection",
    "rubber dumbbell surface defects",
    "OEM dumbbell quality inspection",
    "private label rubber dumbbells"
  ],
  searchIntent: "distinguish and inspect mold parting lines, flash, pits, trim damage and cracks on bulk rubber dumbbells",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt
};

export function withRubberDumbbellMoldDefectGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
