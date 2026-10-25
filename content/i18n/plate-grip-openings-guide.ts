import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import copiesJson from "./plate-grip-openings-guide-copy.json";

type Copy = {
  locale: InternalLocale;
  path: string;
  title: string;
  description: string;
  h1: string;
  keyword: string;
  home: string;
  library: string;
  eyebrow: string;
  sections: [string, string, string][];
  appendix?: [string, string][];
  steps: string[];
  faqHeading: string;
  faq: [string, string][];
  linkHeading: string;
  linkLabels: string[];
  imageText: [string, string][];
  cta: [string, string, string];
};

const copies = copiesJson as Copy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "weight-plate-grip-openings-handling-guide";
const publishedAt = "2026-09-21T04:00:00.000Z";
const targets = [
  "weight-plates-category",
  "olympic-plate-hole-barbell-sleeve-fit-guide",
  "rubber-coating-adhesion-dumbbell-plate-guide",
  "weight-plate-outside-diameter-profile-guide",
  "pre-shipment-inspection-free-weights",
  "oem-sample-approval-free-weights",
  "oem-private-label",
  "contact",
];
const englishPaths = [
  "/products/weight-plates",
  "/resources/olympic-plate-hole-barbell-sleeve-fit-guide",
  "/resources/rubber-coating-peeling-cracking-inspection",
  "/resources/weight-plate-outside-diameter-profile-guide",
  "/resources/pre-shipment-inspection-dumbbells-weight-plates",
  "/resources/oem-free-weight-sample-approval-process",
  "/oem",
  "/contact",
];
const supportingLocale: Partial<Record<InternalLocale, [InternalLocale, InternalLocale]>> = {
  en: ["pt-BR", "es"],
  "pt-BR": ["en", "es"],
  es: ["pt-BR", "en"],
  de: ["pl", "nl"],
  fr: ["pl", "es"],
  vi: ["pl", "en"],
  sv: ["en", "nl"],
  it: ["fr", "pt-BR"],
  nl: ["pl", "de"],
  ar: ["pl", "en"],
  ko: ["pl", "en"],
  id: ["pl", "en"],
  pl: ["de", "nl"],
};
const tableLabels: Partial<Record<InternalLocale, [string, string, string]>> = {
  en: ["Grip plate decision table", "Control", "Buyer action"],
  "pt-BR": ["Quadro de compra da anilha", "Verificação", "Ação do comprador"],
  es: ["Cuadro de control del disco", "Punto", "Acción de compra"],
  de: ["Prüfmatrix für Griffscheiben", "Merkmal", "Prüfung"],
  fr: ["Tableau de contrôle du disque", "Point", "Action de l'acheteur"],
  vi: ["Bảng kiểm đĩa có lỗ cầm", "Hạng mục", "Việc cần làm"],
  sv: ["Beslutstabell för greppskivor", "Kontroll", "Inköparens åtgärd"],
  it: ["Tabella di controllo del disco", "Punto", "Verifica"],
  nl: ["Beslistabel voor gripplaten", "Onderdeel", "Controle"],
  ar: ["جدول فحص القرص", "البند", "الإجراء"],
  ko: ["그립 홀 원판 확인표", "항목", "구매자 확인"],
  id: ["Tabel pemeriksaan piring", "Bagian", "Tindakan pembeli"],
  pl: ["Tabela kontroli talerza", "Cecha", "Czynność"],
};

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imagePath(locale: InternalLocale) {
  return `/assets/resources/plate-grip-openings/${assetLocale(locale)}-weight-plate-grip-openings.webp`;
}

function imagesFor(copy: Copy): LocalizedImage[] {
  return [copy.locale, ...(supportingLocale[copy.locale] ?? ["en", "de"])].map((locale, index) => ({
    id: `plate-grip-${index + 1}`,
    src: imagePath(locale),
    width: 1536,
    height: 1024,
    alt: copy.imageText[index][0],
    caption: copy.imageText[index][1],
  }));
}

function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) {
  return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback;
}

function linkMarkdown(copy: Copy, manifest?: ContentManifest): string {
  return targets.map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`).join("\n");
}

function sectionBlock(section: Copy["sections"][number], index: number): ContentBlock {
  if (index < 2) return {
    id: `plate-grip-section-${index + 1}`,
    type: "rich_text",
    heading: section[0],
    content: section[2],
    data: { component: index === 0 ? "quick-answer" : "definition" },
  };
  return {
    id: `plate-grip-section-${index + 1}`,
    type: "custom",
    heading: section[0],
    data: { component: "markdown-section", markdown: `### ${section[1]}\n\n${section[2]}` },
  };
}

function bodyFor(copy: Copy, manifest?: ContentManifest): ContentBlock[] {
  const labels = tableLabels[copy.locale] ?? tableLabels.en!;
  return [
    ...copy.sections.map(sectionBlock),
    ...(copy.appendix ?? []).map(([heading, content], index): ContentBlock => ({
      id: `plate-grip-appendix-${index + 1}`,
      type: "rich_text",
      heading,
      content,
    })),
    {
      id: "plate-grip-decision-table",
      type: "specifications",
      heading: labels[0],
      data: {
        columns: labels.slice(1),
        rows: copy.sections.slice(2, 7).map((section, index) => [section[0], copy.steps[index + 1]]),
      },
    },
    {
      id: "plate-grip-rfq",
      type: "features",
      heading: copy.locale === "en" ? "Buying brief" : copy.steps[0],
      data: { items: copy.steps.slice(0, 3) },
    },
    {
      id: "plate-grip-receiving",
      type: "features",
      heading: copy.locale === "en" ? "Receiving checks" : copy.steps[3],
      data: { items: copy.steps.slice(3) },
    },
    {
      id: "plate-grip-links",
      type: "custom",
      heading: copy.linkHeading,
      data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) },
    },
  ];
}

function versionFor(copy: Copy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const contactPath = localizedPath(manifest, "contact", copy.locale, "/contact");
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "ar" || copy.locale === "en" ? "/" : `/${parts[0]}`);
  const libraryPath = copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}`;
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `plate-grip-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-plate-grip-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-plate-grip-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
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
        const columns = block.data?.columns as string[];
        const rows = block.data?.rows as string[][];
        content = [
          `| ${columns.join(" | ")} |`,
          `| ${columns.map(() => "---").join(" | ")} |`,
          ...rows.map((row) => `| ${row.join(" | ")} |`),
        ].join("\n");
      }
      if (block.type === "features") content = (block.data?.items as string[]).map((item) => `- ${item}`).join("\n");
      return block.heading ? `## ${block.heading}\n\n${content}` : content;
    }),
    `## ${english.faqHeading}\n\n${english.faq.map(([question, answer]) => `### ${question}\n\n${answer}`).join("\n\n")}`,
    `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`,
  ].join("\n\n");
}

export const plateGripOpeningsEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["grip plate handling", "weight plate hand holes", "commercial grip plate inspection"],
  searchIntent: "specify and inspect grip openings for commercial weight-plate procurement",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt,
};

export function withPlateGripOpeningsGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
