import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import primaryCopies from "./fixed-dumbbell-impact-copy-primary.json";
import euCopies from "./fixed-dumbbell-impact-copy-eu.json";
import apacCopies from "./fixed-dumbbell-impact-copy-apac.json";

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
  imageAlt: string;
  imageCaption: string;
  cta: string[];
};

const copies = [...primaryCopies, ...euCopies, ...apacCopies] as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "fixed-dumbbell-impact-validation-guide";
const publishedAt = "2026-11-06T09:00:00.000Z";
const targets = [
  "rubber-hex-dumbbell",
  "dumbbells-category",
  "dumbbell-head-handle-construction-guide",
  "fixed-vs-adjustable-dumbbells-commercial-guide",
  "rubber-coating-adhesion-dumbbell-plate-guide",
  "free-weight-aql-defect-classification-guide",
  "oem-sample-approval-free-weights",
  "contact"
];
const englishPaths = [
  "/products/dumbbells/hex-dumbbell-kg",
  "/products/dumbbells",
  "/resources/dumbbell-head-handle-construction-guide",
  "/resources/fixed-vs-adjustable-dumbbells-commercial-gym",
  "/resources/rubber-coating-peeling-cracking-inspection",
  "/resources/free-weight-aql-inspection-defect-classification-guide",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact"
];

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imageFor(copy: GuideCopy): LocalizedImage {
  return {
    id: `fixed-dumbbell-impact-${assetLocale(copy.locale)}`,
    src: `/assets/resources/fixed-dumbbell-impact-validation/${assetLocale(copy.locale)}-fixed-dumbbell-impact-validation.webp`,
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
  return targets
    .map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`)
    .join("\n");
}

function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `fixed-dumbbell-impact-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    heading: section.heading,
    content: index < 2 ? section.text : undefined,
    data: index < 2
      ? { component: index === 0 ? "quick-answer" : "definition" }
      : { component: "markdown-section", markdown: section.text }
  }));
  sections.splice(4, 0, {
    id: "fixed-dumbbell-impact-evidence-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows }
  });
  sections.push({
    id: "fixed-dumbbell-impact-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items }
  });
  sections.push({
    id: "fixed-dumbbell-impact-links",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) }
  });
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `fixed-dumbbell-impact-faq-${index + 1}`, question, answer })),
    author: {
      id: `chinafreeweight-fixed-dumbbell-impact-${copy.locale}`,
      name: "ChinaFreeWeight Technical Editorial Team",
      kind: "Organization",
      role: copy.eyebrow
    },
    reviewedBy: {
      id: `chinafreeweight-fixed-dumbbell-impact-review-${copy.locale}`,
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

export const fixedDumbbellImpactValidationEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "fixed dumbbell drop test plan",
    "commercial dumbbell impact inspection",
    "dumbbell landing orientation evidence",
    "OEM fixed dumbbell validation",
    "private label dumbbell change control"
  ],
  searchIntent: "specify a controlled impact-validation plan for fixed dumbbell purchasing",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt
};

export function withFixedDumbbellImpactValidationGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"]
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
