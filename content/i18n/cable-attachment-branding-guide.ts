import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { cableAttachmentBrandingPrimaryCopies } from "./cable-attachment-branding-guide-copy-primary";
import { cableAttachmentBrandingEuCopies } from "./cable-attachment-branding-guide-copy-eu";
import { cableAttachmentBrandingApacCopies } from "./cable-attachment-branding-guide-copy-apac";

export type CableAttachmentBrandingGuideCopy = {
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
  ...cableAttachmentBrandingPrimaryCopies,
  ...cableAttachmentBrandingEuCopies,
  ...cableAttachmentBrandingApacCopies
] as unknown as CableAttachmentBrandingGuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "private-label-cable-attachment-logo-branding-guide";
const publishedAt = "2026-11-14T06:30:00.000Z";
const targets = [
  "gym-accessories-category",
  "cable-attachment-compatibility-oem-guide",
  "cable-attachment-handle-grip-specification-guide",
  "cable-attachment-chrome-plating-corrosion-guide",
  "cable-attachment-weld-quality-inspection-guide",
  "custom-logo-free-weights",
  "oem-sample-approval-free-weights",
  "contact"
];
const englishPaths = [
  "/products/gym-accessories",
  "/resources/are-cable-machine-attachments-universal",
  "/resources/cable-attachment-handle-diameter-grip-guide",
  "/resources/cable-attachment-chrome-plating-corrosion-guide",
  "/resources/cable-attachment-weld-quality-inspection-guide",
  "/resources/custom-logo-options-dumbbells-weight-plates",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact"
];

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imageFor(copy: CableAttachmentBrandingGuideCopy): LocalizedImage {
  const locale = assetLocale(copy.locale);
  return {
    id: `cable-attachment-branding-${locale}`,
    src: `/assets/resources/cable-attachment-branding/${locale}-cable-attachment-branding.webp`,
    width: 1536,
    height: 1024,
    alt: copy.imageAlt,
    caption: copy.imageCaption
  };
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkMarkdown(copy: CableAttachmentBrandingGuideCopy, manifest?: ContentManifest) {
  return targets
    .map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`)
    .join("\n");
}

function bodyFor(copy: CableAttachmentBrandingGuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `cable-attachment-branding-section-${index + 1}`,
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
    id: "cable-attachment-branding-decision-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({
    id: "cable-attachment-branding-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items }
  });
  sections.push({
    id: "cable-attachment-branding-links",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) }
  });
  return sections;
}

function versionFor(copy: CableAttachmentBrandingGuideCopy, manifest: ContentManifest): LocalizedContentVersion {
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `cable-attachment-branding-faq-${index + 1}`, question, answer })),
    author: {
      id: `chinafreeweight-cable-branding-${copy.locale}`,
      name: "ChinaFreeWeight Technical Editorial Team",
      kind: "Organization",
      role: copy.eyebrow
    },
    reviewedBy: {
      id: `chinafreeweight-cable-branding-review-${copy.locale}`,
      name: "ChinaFreeWeight Technical Editorial Team",
      kind: "Organization",
      role: copy.checklist.heading
    },
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

export const cableAttachmentBrandingEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "custom logo cable attachments",
    "private label gym handles",
    "laser engraved cable handles",
    "OEM cable attachment branding",
    "wholesale gym handle logo approval"
  ],
  searchIntent: "choose, approve and inspect a private-label marking method for commercial cable attachments and gym handles",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt
};

export function withCableAttachmentBrandingGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
