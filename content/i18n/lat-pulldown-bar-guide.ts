import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { latBarCopies as copies, type LatBarCopy as Copy } from "./lat-pulldown-bar-guide-copy";

const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "lat-pulldown-bar-buying-inspection-guide";
const publishedAt = "2026-09-23T04:00:00.000Z";
const targets = [
  "product:accessories:lat-pulldown-handles",
  "gym-accessories-category",
  "cable-attachment-compatibility-oem-guide",
  "cable-attachment-load-rating-inspection-guide",
  "cable-attachment-handle-grip-specification-guide",
  "triceps-rope-attachment-buying-inspection-guide",
  "oem-private-label",
  "contact",
];
const englishPaths = [
  "/products/gym-accessories/lat-pulldown-handles",
  "/products/gym-accessories",
  "/resources/are-cable-machine-attachments-universal",
  "/resources/cable-attachment-load-rating-inspection-guide",
  "/resources/cable-attachment-handle-diameter-grip-guide",
  "/resources/triceps-rope-attachment-buying-inspection-guide",
  "/oem",
  "/contact",
];
const supportingLocale: Partial<Record<InternalLocale, [InternalLocale, InternalLocale]>> = {
  en: ["de", "es"],
  "pt-BR": ["es", "en"],
  es: ["pt-BR", "fr"],
  de: ["pl", "nl"],
  fr: ["it", "es"],
  vi: ["id", "ko"],
  sv: ["nl", "de"],
  it: ["fr", "pt-BR"],
  nl: ["de", "sv"],
  ar: ["en", "fr"],
  ko: ["vi", "id"],
  id: ["vi", "ko"],
  pl: ["de", "nl"],
};
const tableLabels: Partial<Record<InternalLocale, [string, string, string]>> = {
  en: ["Lat bar decision table", "Control point", "Buyer action"],
  "pt-BR": ["Quadro de decisão da barra", "Ponto", "Ação do comprador"],
  es: ["Cuadro de decisión de la barra", "Punto", "Acción de compra"],
  de: ["Prüftabelle für Latzugstangen", "Prüfpunkt", "Einkaufsmaßnahme"],
  fr: ["Tableau de décision de la barre", "Point", "Action acheteur"],
  vi: ["Bảng quyết định thanh kéo xô", "Hạng mục", "Việc bên mua"],
  sv: ["Beslutstabell för latsdragsstång", "Kontroll", "Köparens åtgärd"],
  it: ["Tabella decisionale della barra", "Punto", "Azione acquirente"],
  nl: ["Beslistabel voor de latstang", "Controlepunt", "Actie inkoper"],
  ar: ["جدول قرار بار السحب", "نقطة الفحص", "إجراء المشتري"],
  ko: ["랫풀다운 바 결정표", "확인 항목", "구매자 조치"],
  id: ["Tabel keputusan bar lat", "Titik kontrol", "Tindakan pembeli"],
  pl: ["Tabela decyzji dla drążka", "Punkt kontroli", "Działanie kupującego"],
};

function assetLocale(locale: InternalLocale) {
  return locale === "pt-BR" ? "pt-br" : locale.toLowerCase();
}

function imagePath(locale: InternalLocale) {
  return `/assets/resources/lat-pulldown-bars/${assetLocale(locale)}-lat-pulldown-bar-buying-guide.webp`;
}

function imagesFor(copy: Copy): LocalizedImage[] {
  return [copy.locale, ...(supportingLocale[copy.locale] ?? ["en", "de"])].map((locale, index) => ({
    id: `lat-bar-guide-${index + 1}`,
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
    id: `lat-bar-guide-section-${index + 1}`,
    type: "rich_text",
    heading: section[0],
    content: `${section[2]}\n\n${section[3]}`,
    data: { component: index === 0 ? "quick-answer" : "definition" },
  };
  return {
    id: `lat-bar-guide-section-${index + 1}`,
    type: "custom",
    heading: section[0],
    data: { component: "markdown-section", markdown: `### ${section[1]}\n\n${section[2]}\n\n${section[3]}` },
  };
}

function bodyFor(copy: Copy, manifest?: ContentManifest): ContentBlock[] {
  const labels = tableLabels[copy.locale] ?? tableLabels.en!;
  return [
    ...copy.sections.map(sectionBlock),
    {
      id: "lat-bar-guide-decision-table",
      type: "specifications",
      heading: labels[0],
      data: {
        columns: labels.slice(1),
        rows: copy.sections.slice(2, 7).map((section, index) => [section[0], copy.steps[index + 1]]),
      },
    },
    {
      id: "lat-bar-guide-rfq",
      type: "features",
      heading: copy.steps[0],
      data: { items: copy.steps.slice(0, 3) },
    },
    {
      id: "lat-bar-guide-receiving",
      type: "features",
      heading: copy.steps[3],
      data: { items: copy.steps.slice(3) },
    },
    {
      id: "lat-bar-guide-links",
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
    faq: copy.faq.map(([question, answer], index) => ({ id: `lat-bar-guide-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-lat-bar-guide-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-lat-bar-guide-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
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

export const latPulldownBarEnglishPost = {
  entityId,
  publicPath: english.path,
  title: english.title,
  h1: english.h1,
  description: english.description,
  primaryKeyword: english.keyword,
  secondaryKeywords: ["lat pulldown bar width", "revolving lat bar connector", "bulk lat bar inspection"],
  searchIntent: "specify and inspect commercial lat pulldown bars for procurement",
  content: englishMarkdown(),
  images: imagesFor(english),
  publishedAt,
  updatedAt: publishedAt,
};

export function withLatPulldownBarGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = {
    id: entityId,
    type: "blog",
    defaultLocale: "en",
    versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"],
  };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
