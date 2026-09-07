import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import copyPrimary from "./barbell-knurling-guide-copy.json";
import copyEu from "./barbell-knurling-guide-copy-eu.json";
import copyApac from "./barbell-knurling-guide-copy-apac.json";

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

const copies = [...copyPrimary, ...copyEu, ...copyApac] as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "commercial-barbell-knurling-specification-guide";
const publishedAt = "2026-09-07T04:00:00.000Z";
const targets = [
  "commercial-olympic-barbell-buying-guide",
  "olympic-barbell-finish-coating-guide",
  "olympic-plate-hole-barbell-sleeve-fit-guide",
  "weight-plates-category",
  "factory",
  "oem-private-label",
  "oem-sample-approval-free-weights",
  "contact",
];
const englishPaths = [
  "/resources/commercial-olympic-barbell-buying-guide",
  "/resources/olympic-barbell-coating-finish-guide",
  "/resources/olympic-plate-hole-barbell-sleeve-fit-guide",
  "/products/weight-plates",
  "/factory",
  "/oem",
  "/resources/oem-free-weight-sample-approval-process",
  "/contact",
];
const supportingLocale: Partial<Record<InternalLocale, [InternalLocale, InternalLocale]>> = {
  en: ["de", "ko"],
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

function imagePath(locale: InternalLocale) {
  return `/assets/resources/barbell-knurling/${locale.toLowerCase()}-barbell-knurling.webp`;
}

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  const locales = [copy.locale, ...(supportingLocale[copy.locale] ?? (["en", "de"] as const))];
  return locales.map((locale, index) => ({
    id: `barbell-knurling-${index + 1}`,
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

function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest): string {
  return targets
    .map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`)
    .join("\n");
}

function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `barbell-knurling-section-${index + 1}`,
    type: index < 2 ? "rich_text" : "custom",
    ...(index < 2
      ? { heading: section.heading, content: section.text, data: { component: index === 0 ? "quick-answer" : "definition" } }
      : { data: { component: "markdown-section", markdown: `### ${section.heading}\n\n${section.text}` } }),
  }));
  sections.splice(3, 0, {
    id: "barbell-knurling-decision-table",
    type: "specifications",
    heading: copy.table.heading,
    data: { columns: copy.table.columns, rows: copy.table.rows },
  });
  sections.splice(8, 0, {
    id: "barbell-knurling-inspection-checklist",
    type: "features",
    heading: copy.checklist.heading,
    data: { items: copy.checklist.items },
  });
  sections.push({
    id: "barbell-knurling-related-reading",
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
  const repositoryTargets = copy.locale === "ar" ? [...targets, "kg-lb-free-weight-ordering-guide"] : targets;
  const internalLinks = repositoryTargets
    .filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published")
    .map((id) => {
      const targetVersion = manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale];
      return { targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] ?? targetVersion?.h1 ?? id };
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `barbell-knurling-faq-${index + 1}`, question, answer })),
    author: { id: `powerbasefit-barbell-knurling-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `powerbasefit-barbell-knurling-review-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.checklist.heading },
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

export const barbellKnurlingEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: [
    "aggressive vs passive barbell knurling",
    "Olympic bar center knurl",
    "barbell grip marks",
    "barbell knurling inspection",
  ],
  searchIntent: "select, specify, sample and inspect Olympic barbell knurling for a commercial order",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt,
};

export function withBarbellKnurlingGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
