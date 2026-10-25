import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { ropeCopies as copies, type RopeCopy as Copy } from "./triceps-rope-guide-copy";

const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "triceps-rope-attachment-buying-inspection-guide";
const publishedAt = "2026-09-22T04:00:00.000Z";
const targets = [
  "gym-accessories-category",
  "cable-attachment-compatibility-oem-guide",
  "cable-attachment-load-rating-inspection-guide",
  "cable-attachment-handle-grip-specification-guide",
  "pre-shipment-inspection-free-weights",
  "oem-sample-approval-free-weights",
  "oem-private-label",
  "contact",
];
const englishPaths = [
  "/products/gym-accessories",
  "/resources/are-cable-machine-attachments-universal",
  "/resources/cable-attachment-load-rating-inspection-guide",
  "/resources/cable-attachment-handle-diameter-grip-guide",
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
  en: ["Rope buying decision table", "Control", "Buyer action"],
  "pt-BR": ["Quadro de compra da corda", "Verificação", "Ação do comprador"],
  es: ["Cuadro de compra de la cuerda", "Punto", "Acción"],
  de: ["Prüfmatrix für Trizepsseile", "Merkmal", "Prüfung"],
  fr: ["Tableau de contrôle de la corde", "Point", "Action"],
  vi: ["Bảng kiểm dây kéo cáp", "Hạng mục", "Việc cần làm"],
  sv: ["Kontrolltabell för tricepsrep", "Del", "Köparens åtgärd"],
  it: ["Tabella di controllo della corda", "Punto", "Verifica"],
  nl: ["Beslistabel voor triceps touw", "Onderdeel", "Controle"],
  ar: ["جدول فحص الحبل", "البند", "الإجراء"],
  ko: ["삼두 로프 구매 확인표", "항목", "구매자 확인"],
  id: ["Tabel pemeriksaan tali trisep", "Bagian", "Tindakan"],
  pl: ["Tabela kontroli liny", "Cecha", "Czynność"],
};

const imageSizes: Partial<Record<InternalLocale, [number, number]>> = {
  en: [1536, 1024], "pt-BR": [1349, 1166], es: [1536, 1024],
  de: [1370, 1148], fr: [1370, 1148], vi: [1370, 1148],
  sv: [1536, 1024], it: [1536, 1024], nl: [1370, 1148],
  ar: [1536, 1024], ko: [1370, 1148], id: [1370, 1148], pl: [1370, 1148],
};

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}
function imagePath(locale: InternalLocale) {
  return `/assets/resources/triceps-rope/${assetLocale(locale)}-triceps-rope-buying-guide.webp`;
}

function imagesFor(copy: Copy): LocalizedImage[] {
  return [copy.locale, ...(supportingLocale[copy.locale] ?? ["en", "de"])].map((locale, index) => ({
    id: `rope-guide-${index + 1}`,
    src: imagePath(locale),
    width: (imageSizes[locale] ?? imageSizes.en!)[0],
    height: (imageSizes[locale] ?? imageSizes.en!)[1],
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
    id: `rope-guide-section-${index + 1}`,
    type: "rich_text",
    heading: section[0],
    content: `${section[2]}\n\n${section[3]}`,
    data: { component: index === 0 ? "quick-answer" : "definition" },
  };
  return {
    id: `rope-guide-section-${index + 1}`,
    type: "custom",
    heading: section[0],
    data: { component: "markdown-section", markdown: `### ${section[1]}\n\n${section[2]}\n\n${section[3]}` },
  };
}

function bodyFor(copy: Copy, manifest?: ContentManifest): ContentBlock[] {
  const labels = tableLabels[copy.locale] ?? tableLabels.en!;
  return [
    ...copy.sections.map(sectionBlock),
    ...(copy.appendix ?? []).map(([heading, content], index): ContentBlock => ({
      id: `rope-guide-appendix-${index + 1}`,
      type: "rich_text",
      heading,
      content,
    })),
    {
      id: "rope-guide-decision-table",
      type: "specifications",
      heading: labels[0],
      data: {
        columns: labels.slice(1),
        rows: copy.sections.slice(2, 7).map((section, index) => [section[0], copy.steps[index + 1]]),
      },
    },
    {
      id: "rope-guide-rfq",
      type: "features",
      heading: copy.locale === "en" ? "Buying brief" : copy.steps[0],
      data: { items: copy.steps.slice(0, 3) },
    },
    {
      id: "rope-guide-receiving",
      type: "features",
      heading: copy.locale === "en" ? "Receiving checks" : copy.steps[3],
      data: { items: copy.steps.slice(3) },
    },
    {
      id: "rope-guide-links",
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `rope-guide-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-rope-guide-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-rope-guide-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
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

export const tricepsRopeEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["triceps rope end stops", "cable rope center eye", "bulk cable rope inspection"],
  searchIntent: "specify and inspect triceps rope assemblies for commercial procurement",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt,
};

export function withTricepsRopeGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
