import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import copiesJson from "./bumper-plate-hub-guide-copy.json";

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

const copies = copiesJson as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "bumper-plate-hub-insert-retention-guide";
const publishedAt = "2026-09-17T05:30:00.000Z";
const targets = [
  "olympic-plate-hole-barbell-sleeve-fit-guide",
  "bumper-plate-bounce-shore-hardness-test-guide",
  "bumper-plate-thickness-sleeve-capacity-guide",
  "rubber-coating-adhesion-dumbbell-plate-guide",
  "weight-plate-tolerance-bulk-order-guide",
  "training-vs-competition-bumper-plates",
  "pre-shipment-inspection-free-weights",
  "oem-private-label",
  "contact",
];
const englishPaths = [
  "/resources/olympic-plate-hole-barbell-sleeve-fit-guide",
  "/resources/bumper-plate-bounce-shore-hardness-drop-test",
  "/resources/bumper-plate-thickness-sleeve-capacity-guide",
  "/resources/rubber-coating-peeling-cracking-inspection",
  "/resources/weight-plate-tolerance-bulk-order-guide",
  "/resources/training-vs-competition-bumper-plates",
  "/resources/pre-shipment-inspection-dumbbells-weight-plates",
  "/oem",
  "/contact",
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
  pl: ["de", "sv"],
};

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imagePath(locale: InternalLocale) {
  return `/assets/resources/bumper-plate-hubs/${assetLocale(locale)}-bumper-plate-hub.webp`;
}

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  const locales = [copy.locale, ...(supportingLocale[copy.locale] ?? (["en", "de"] as const))];
  return locales.map((locale, index) => ({
    id: `bumper-plate-hub-${index + 1}`,
    src: imagePath(locale),
    width: 1536,
    height: 1024,
    alt: copy.imageCopy[index][0],
    caption: copy.imageCopy[index][1],
  }));
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkLabel(copy: GuideCopy, manifest: ContentManifest | undefined, index: number) {
  if (index < 7) return copy.linkLabels[index + 1];
  if (index === 8) return copy.linkLabels[8];
  return manifest?.entities.find((entry) => entry.id === "oem-private-label")?.versions[copy.locale]?.h1 ?? "OEM and private-label options";
}

function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest): string {
  return targets
    .map((id, index) => `- [${linkLabel(copy, manifest, index)}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`)
    .join("\n");
}

function sectionBlock(section: GuideCopy["sections"][number], index: number): ContentBlock {
  if (index < 2) {
    return {
      id: `bumper-hub-section-${index + 1}`,
      type: "rich_text",
      heading: section.heading,
      content: section.text,
      data: { component: index === 0 ? "quick-answer" : "definition" },
    };
  }
  return {
    id: `bumper-hub-section-${index + 1}`,
    type: "custom",
    data: { component: "markdown-section", markdown: `### ${section.heading}\n\n${section.text}` },
  };
}

function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections = copy.sections.map((section, index) => sectionBlock(section, index));
  const insertion = Math.max(2, Math.min(copy.tablePosition, sections.length));
  sections.splice(insertion, 0, {
    id: "bumper-hub-specification-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows },
  });
  sections.push({
    id: "bumper-hub-buyer-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items },
  });
  sections.push({
    id: "bumper-hub-related-reading",
    type: "custom",
    heading: copy.linkHeading,
    data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) },
  });
  return sections;
}

function versionFor(copy: GuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const contactPath = localizedPath(manifest, "contact", copy.locale, "/contact");
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "ar" || copy.locale === "en" ? "/" : `/${parts[0]}`);
  const libraryPath = copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}`;
  const internalLinks = targets
    .filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published")
    .map((id) => {
      const index = targets.indexOf(id);
      return { targetContentId: id, label: linkLabel(copy, manifest, index) };
    });

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
    faq: copy.faq.map(([question, answer], index) => ({ id: `bumper-hub-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-bumper-hub-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-bumper-hub-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
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
        contactPath,
        ctaTitle: copy.cta[0],
        ctaText: copy.cta[1],
        ctaLabel: copy.cta[2],
      },
    },
    images: imagesFor(copy),
    internalLinks,
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    publishedAt,
    updatedAt: publishedAt,
    version: 1,
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
          ...english.table.rows.map((row) => `| ${row.join(" | ")} |`),
        ].join("\n");
      }
      if (block.type === "features") content = english.checklist.items.map((item) => `- ${item}`).join("\n");
      return block.heading ? `## ${block.heading}\n\n${content}` : content;
    }),
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`,
  ].join("\n\n");
}

export const bumperPlateHubEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "loose bumper plate insert",
    "bumper plate hub retention",
    "bumper plate center ring inspection",
    "OEM bumper plate quality control",
  ],
  searchIntent: "specify and inspect bumper-plate center insert and hub retention for commercial procurement",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt,
};

export function withBumperPlateHubGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
