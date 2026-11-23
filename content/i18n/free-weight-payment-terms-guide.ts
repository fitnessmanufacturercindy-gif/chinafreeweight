import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { freeWeightPaymentTermsPrimaryCopies } from "./free-weight-payment-terms-copy-primary";
import { freeWeightPaymentTermsEuCopies } from "./free-weight-payment-terms-copy-eu";
import { freeWeightPaymentTermsApacCopies } from "./free-weight-payment-terms-copy-apac";

export type FreeWeightPaymentTermsCopy = {
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
  table: { heading: string; columns: string[]; rows: string[][]; afterSection: number };
  checklist: { heading: string; items: string[]; afterSection: number };
  faqHeading: string;
  faq: string[][];
  linkHeading: string;
  linkLabels: string[];
  imageAlt: string;
  imageCaption: string;
  cta: string[];
};

export const freeWeightPaymentTermsCopies = [
  ...freeWeightPaymentTermsPrimaryCopies,
  ...freeWeightPaymentTermsEuCopies,
  ...freeWeightPaymentTermsApacCopies,
] as FreeWeightPaymentTermsCopy[];

const english = freeWeightPaymentTermsCopies.find((copy) => copy.locale === "en")!;
const entityId = "wholesale-free-weight-payment-terms-guide";
const publishedAt = "2026-11-22T06:00:00.000Z";
const targets = [
  "dumbbells-category",
  "weight-plates-category",
  "commercial-free-weight-rfq",
  "pre-shipment-inspection-free-weights",
  "wholesale-free-weight-incoterms-import-guide",
  "contact",
];
const englishPaths = [
  "/products/dumbbells",
  "/products/weight-plates",
  "/resources/commercial-free-weight-rfq-checklist",
  "/resources/pre-shipment-inspection-dumbbells-weight-plates",
  "/resources/exw-fob-cif-ddp-free-weight-import-guide",
  "/contact",
];

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imageFor(copy: FreeWeightPaymentTermsCopy): LocalizedImage {
  const locale = assetLocale(copy.locale);
  return {
    id: `free-weight-payment-terms-${locale}`,
    src: `/assets/resources/free-weight-payment-terms/${locale}-free-weight-payment-terms.webp`,
    width: 1536,
    height: 1024,
    alt: copy.imageAlt,
    caption: copy.imageCaption,
  };
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkMarkdown(copy: FreeWeightPaymentTermsCopy, manifest?: ContentManifest) {
  return targets
    .map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`)
    .join("\n");
}

function bodyFor(copy: FreeWeightPaymentTermsCopy, manifest?: ContentManifest): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  copy.sections.forEach((section, index) => {
    blocks.push({
      id: `free-weight-payment-terms-section-${index + 1}`,
      type: index < 2 ? "rich_text" : "custom",
      heading: section.heading,
      content: index === 0 ? section.text : undefined,
      data:
        index < 2
          ? index === 0
            ? { component: "quick-answer" }
            : { component: "definition", markdown: section.text }
          : { component: "markdown-section", markdown: section.text },
    });
    if (copy.table.afterSection === index + 1) {
      blocks.push({
        id: "free-weight-payment-terms-comparison",
        type: "specifications",
        heading: copy.table.heading,
        data: { columns: copy.table.columns, rows: copy.table.rows },
      });
    }
    if (copy.checklist.afterSection === index + 1) {
      blocks.push({
        id: "free-weight-payment-terms-checklist",
        type: "features",
        heading: copy.checklist.heading,
        data: { items: copy.checklist.items },
      });
    }
  });
  blocks.push({
    id: "free-weight-payment-terms-links",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) },
  });
  return blocks;
}

function versionFor(copy: FreeWeightPaymentTermsCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryFallback = copy.locale === "en" || copy.locale === "ar" ? "/resources" : copy.locale === "sv" ? "/sv/blogg" : `/${parts.slice(0, 2).join("/")}`;
  const libraryPath = localizedPath(manifest, "blog-index", copy.locale, libraryFallback);
  const internalLinks = targets
    .filter((id) => manifest.entities.find((entry) => entry.id === id)?.versions[copy.locale]?.publishStatus === "published")
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `free-weight-payment-terms-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-payment-terms-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-payment-terms-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
    schemaData: {
      category: copy.keyword,
      breadcrumbs: [
        { name: copy.home, path: homePath },
        { name: copy.library, path: libraryPath },
        { name: copy.h1, path: copy.path },
      ],
      extra: {
        primaryKeyword: copy.keyword,
        useLocalizedHero: true,
        eyebrow: copy.eyebrow,
        contactPath: localizedPath(manifest, "contact", copy.locale, "/contact"),
        ctaTitle: copy.cta[0],
        ctaText: copy.cta[1],
        ctaLabel: copy.cta[2],
      },
    },
    images: [imageFor(copy)],
    internalLinks,
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    publishedAt,
    updatedAt: publishedAt,
    version: 1,
  };
}

function englishMarkdown() {
  const blocks = bodyFor(english).map((block) => {
    let content = block.content ?? String(block.data?.markdown ?? "");
    if (block.type === "specifications") {
      content = [
        `| ${english.table.columns.join(" | ")} |`,
        `| ${english.table.columns.map(() => "---").join(" | ")} |`,
        ...english.table.rows.map((row) => `| ${row.join(" | ")} |`),
      ].join("\n");
    }
    if (block.type === "features") content = english.checklist.items.map((item) => `- ${item}`).join("\n");
    return block.heading ? `## ${block.heading}\n\n${content}` : content;
  });
  return [
    ...blocks,
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`,
  ].join("\n\n");
}

export const freeWeightPaymentTermsEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "T/T payment gym equipment",
    "letter of credit dumbbell order",
    "free weight supplier payment milestones",
    "documentary collection gym equipment",
    "verify supplier bank details",
  ],
  searchIntent: "choose and document payment terms for a wholesale free-weight order without confusing bank documents with product quality evidence",
  content: englishMarkdown(),
  images: [imageFor(english)],
  publishedAt,
  updatedAt: publishedAt,
};

export function withFreeWeightPaymentTermsGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(freeWeightPaymentTermsCopies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
