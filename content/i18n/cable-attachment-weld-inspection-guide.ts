import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import primaryCopies from "./cable-attachment-weld-copy-primary.json";
import euCopies from "./cable-attachment-weld-copy-eu.json";
import apacCopies from "./cable-attachment-weld-copy-apac.json";

type GuideCopy = {
  locale: InternalLocale; path: string; title: string; description: string; h1: string; keyword: string;
  home: string; library: string; eyebrow: string; sections: Array<{ heading: string; text: string }>;
  table: { heading: string; columns: string[]; rows: string[][] };
  checklist: { heading: string; items: string[] }; faq: string[][]; faqHeading: string;
  linkHeading: string; linkLabels: string[]; imageAlt: string; imageCaption: string; cta: string[];
};

const copies = [...primaryCopies, ...euCopies, ...apacCopies] as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "cable-attachment-weld-quality-inspection-guide";
const publishedAt = "2026-11-04T04:00:00.000Z";
const targets = [
  "product:accessories:cable-machine-attachments",
  "gym-accessories-category",
  "cable-attachment-compatibility-oem-guide",
  "cable-attachment-load-rating-inspection-guide",
  "cable-attachment-handle-grip-specification-guide",
  "cable-attachment-chrome-plating-corrosion-guide",
  "oem-sample-approval-free-weights",
  "contact"
];
const englishPaths = [
  "/products/gym-accessories/cable-machine-attachments",
  "/products/gym-accessories",
  "/resources/are-cable-machine-attachments-universal",
  "/resources/cable-attachment-load-rating-inspection-guide",
  "/resources/cable-attachment-handle-diameter-grip-guide",
  "/resources/cable-attachment-chrome-plating-corrosion-guide",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact"
];

function assetLocale(locale: InternalLocale) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }
function imageFor(copy: GuideCopy): LocalizedImage {
  return {
    id: `cable-attachment-weld-${assetLocale(copy.locale)}`,
    src: `/assets/resources/cable-attachment-welds/${assetLocale(copy.locale)}-cable-attachment-weld-inspection.webp`,
    width: 1536,
    height: 1024,
    alt: copy.imageAlt,
    caption: copy.imageCaption
  };
}
function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}
function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest) {
  return targets.map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`).join("\n");
}
function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `cable-attachment-weld-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    heading: section.heading,
    content: index < 2 ? section.text : undefined,
    data: index < 2
      ? { component: index === 0 ? "quick-answer" : "definition" }
      : { component: "markdown-section", markdown: section.text }
  }));
  sections.splice(4, 0, {
    id: "cable-attachment-weld-evidence-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({ id: "cable-attachment-weld-checklist", type: "features", heading: copy.checklist.heading, data: { items: copy.checklist.items } });
  sections.push({ id: "cable-attachment-weld-links", type: "custom", heading: copy.linkHeading, data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) } });
  return sections;
}
function versionFor(copy: GuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryPath = copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}`;
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `cable-attachment-weld-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-cable-attachment-weld-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-cable-attachment-weld-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
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

export const cableAttachmentWeldInspectionEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "cable handle weld inspection",
    "gym attachment welded joint specification",
    "cable attachment visual weld check",
    "OEM cable handle welding control",
    "private label cable attachment sample"
  ],
  searchIntent: "specify and inspect welded joints on commercial cable-machine attachments",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt
};

export function withCableAttachmentWeldInspectionGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
