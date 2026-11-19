import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { bumperPlateHubCorrosionPrimaryCopies } from "./bumper-plate-hub-corrosion-guide-copy-primary";
import { bumperPlateHubCorrosionEuCopies } from "./bumper-plate-hub-corrosion-guide-copy-eu";
import { bumperPlateHubCorrosionApacCopies } from "./bumper-plate-hub-corrosion-guide-copy-apac";

export type BumperPlateHubCorrosionGuideCopy = {
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

const copies = [...bumperPlateHubCorrosionPrimaryCopies, ...bumperPlateHubCorrosionEuCopies, ...bumperPlateHubCorrosionApacCopies] as BumperPlateHubCorrosionGuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "bumper-plate-hub-rust-corrosion-inspection-guide";
const publishedAt = "2026-11-16T06:30:00.000Z";
const targets = [
  "weight-plates-category",
  "bumper-plate-hub-insert-retention-guide",
  "olympic-plate-hole-barbell-sleeve-fit-guide",
  "bumper-plate-cracks-edge-splits-inspection-guide",
  "oem-free-weight-supplier-quality-agreement-guide",
  "wholesale-free-weight-container-loading-guide",
  "oem-sample-approval-free-weights",
  "contact"
];
const englishPaths = [
  "/products/weight-plates",
  "/resources/bumper-plate-loose-insert-hub-retention-guide",
  "/resources/olympic-plate-hole-barbell-sleeve-fit-guide",
  "/resources/bumper-plate-cracks-edge-splits-inspection-guide",
  "/resources/oem-free-weight-supplier-quality-agreement-guide",
  "/resources/how-many-dumbbells-fit-container-loading-guide",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact"
];

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imageFor(copy: BumperPlateHubCorrosionGuideCopy): LocalizedImage {
  const locale = assetLocale(copy.locale);
  return {
    id: `bumper-plate-hub-corrosion-${locale}`,
    src: `/assets/resources/bumper-plate-hub-corrosion/${locale}-bumper-plate-hub-inspection.webp`,
    width: 1536,
    height: 1024,
    alt: copy.imageAlt,
    caption: copy.imageCaption
  };
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkMarkdown(copy: BumperPlateHubCorrosionGuideCopy, manifest?: ContentManifest) {
  return targets.map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`).join("\n");
}

function bodyFor(copy: BumperPlateHubCorrosionGuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `bumper-plate-hub-corrosion-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    heading: section.heading,
    content: index === 0 ? section.text : undefined,
    data: index < 2
      ? index === 0
        ? { component: "quick-answer" }
        : { component: "definition", markdown: section.text }
      : { component: "markdown-section", markdown: section.text }
  }));
  sections.splice(4, 0, {
    id: "bumper-plate-hub-corrosion-decision-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({ id: "bumper-plate-hub-corrosion-checklist", type: "features", heading: copy.checklist.heading, data: { items: copy.checklist.items } });
  sections.push({ id: "bumper-plate-hub-corrosion-links", type: "custom", heading: copy.linkHeading, data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) } });
  return sections;
}

function versionFor(copy: BumperPlateHubCorrosionGuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryFallback = copy.locale === "en" || copy.locale === "ar" ? "/resources" : copy.locale === "sv" ? "/sv/blogg" : `/${parts.slice(0, 2).join("/")}`;
  const libraryPath = localizedPath(manifest, "blog-index", copy.locale, libraryFallback);
  const internalLinks = targets.filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published").map((id) => ({ targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] }));
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `bumper-plate-hub-corrosion-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-hub-corrosion-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-hub-corrosion-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
    schemaData: {
      category: copy.keyword,
      breadcrumbs: [{ name: copy.home, path: homePath }, { name: copy.library, path: libraryPath }, { name: copy.h1, path: copy.path }],
      extra: { primaryKeyword: copy.keyword, useLocalizedHero: true, eyebrow: copy.eyebrow, contactPath: localizedPath(manifest, "contact", copy.locale, "/contact"), ctaTitle: copy.cta[0], ctaText: copy.cta[1], ctaLabel: copy.cta[2] }
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
    if (block.type === "specifications") content = [`| ${english.table.columns.join(" | ")} |`, `| ${english.table.columns.map(() => "---").join(" | ")} |`, ...english.table.rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
    if (block.type === "features") content = english.checklist.items.map((item) => `- ${item}`).join("\n");
    return block.heading ? `## ${block.heading}\n\n${content}` : content;
  });
  return [...blocks, `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`, `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`].join("\n\n");
}

export const bumperPlateHubCorrosionEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["bumper plate center ring rust", "bumper plate stainless insert staining", "weight plate hub corrosion inspection", "OEM bumper plate receiving inspection", "private label bumper plates"],
  searchIntent: "distinguish removable rust-colored transfer from persistent corrosion or pitting on bumper plate hubs and make a documented lot decision",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt
};

export function withBumperPlateHubCorrosionGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = { id: entityId, type: "blog", defaultLocale: "en", versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"] };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
