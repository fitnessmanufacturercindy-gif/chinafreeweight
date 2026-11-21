import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import { freeWeightIncotermsPrimaryCopies } from "./free-weight-incoterms-copy-primary";
import { freeWeightIncotermsEuCopies } from "./free-weight-incoterms-copy-eu";
import { freeWeightIncotermsApacCopies } from "./free-weight-incoterms-copy-apac";

export type FreeWeightIncotermsCopy = {
  locale: InternalLocale; path: string; title: string; description: string; h1: string; keyword: string;
  home: string; library: string; eyebrow: string;
  sections: Array<{ heading: string; text: string }>;
  table: { heading: string; columns: string[]; rows: string[][] };
  checklist: { heading: string; items: string[] };
  faqHeading: string; faq: string[][]; linkHeading: string; linkLabels: string[];
  imageAlt: string; imageCaption: string; cta: string[];
};

export const freeWeightIncotermsCopies = [...freeWeightIncotermsPrimaryCopies, ...freeWeightIncotermsEuCopies, ...freeWeightIncotermsApacCopies] as FreeWeightIncotermsCopy[];
const english = freeWeightIncotermsCopies.find((copy) => copy.locale === "en")!;
const entityId = "wholesale-free-weight-incoterms-import-guide";
const publishedAt = "2026-11-21T04:00:00.000Z";
const targets = ["dumbbells-category", "weight-plates-category", "landed-cost-free-weights", "wholesale-free-weight-container-loading-guide", "export-packaging-free-weights", "contact"];
const englishPaths = ["/products/dumbbells", "/products/weight-plates", "/resources/landed-cost-wholesale-free-weights", "/resources/how-many-dumbbells-fit-container-loading-guide", "/resources/export-packaging-dumbbells-weight-plates", "/contact"];

function assetLocale(locale: InternalLocale) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }
function imageFor(copy: FreeWeightIncotermsCopy): LocalizedImage {
  const locale = assetLocale(copy.locale);
  return { id: `free-weight-incoterms-${locale}`, src: `/assets/resources/free-weight-incoterms/${locale}-free-weight-incoterms.webp`, width: 1536, height: 1024, alt: copy.imageAlt, caption: copy.imageCaption };
}
function localizedPath(manifest: ContentManifest | undefined, id: string, locale: InternalLocale, fallback: string) { return manifest?.entities.find((entry) => entry.id === id)?.versions[locale]?.publicPath ?? fallback; }
function linkMarkdown(copy: FreeWeightIncotermsCopy, manifest?: ContentManifest) { return targets.map((id, index) => `- [${copy.linkLabels[index]}](${localizedPath(manifest, id, copy.locale, englishPaths[index])})`).join("\n"); }
function bodyFor(copy: FreeWeightIncotermsCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({ id: `free-weight-incoterms-section-${index + 1}`, type: index < 2 ? "rich_text" : "custom", heading: section.heading, content: index === 0 ? section.text : undefined, data: index < 2 ? index === 0 ? { component: "quick-answer" } : { component: "definition", markdown: section.text } : { component: "markdown-section", markdown: section.text } }));
  sections.splice(4, 0, { id: "free-weight-incoterms-comparison", type: "specifications", heading: copy.table.heading, data: { columns: copy.table.columns, rows: copy.table.rows } });
  sections.push({ id: "free-weight-incoterms-checklist", type: "features", heading: copy.checklist.heading, data: { items: copy.checklist.items } });
  sections.push({ id: "free-weight-incoterms-links", type: "custom", heading: copy.linkHeading, data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) } });
  return sections;
}
function versionFor(copy: FreeWeightIncotermsCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const homePath = localizedPath(manifest, "home", copy.locale, copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}`);
  const libraryFallback = copy.locale === "en" || copy.locale === "ar" ? "/resources" : copy.locale === "sv" ? "/sv/blogg" : `/${parts.slice(0, 2).join("/")}`;
  const libraryPath = localizedPath(manifest, "blog-index", copy.locale, libraryFallback);
  const internalLinks = targets.filter((id) => manifest.entities.find((entry) => entry.id === id)?.versions[copy.locale]?.publishStatus === "published").map((id) => ({ targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] }));
  return {
    locale: copy.locale, translationStatus: copy.locale === "en" ? "published" : "localized", reviewStatus: "approved", publishStatus: "published",
    slug: parts.at(-1)!, publicPath: copy.path, title: copy.title, description: copy.description, h1: copy.h1,
    body: bodyFor(copy, manifest), faq: copy.faq.map(([question, answer], index) => ({ id: `free-weight-incoterms-faq-${index + 1}`, question, answer })),
    author: { id: `chinafreeweight-trade-terms-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `chinafreeweight-trade-terms-review-${copy.locale}`, name: "ChinaFreeWeight Technical Editorial Team", kind: "Organization", role: copy.checklist.heading },
    schemaData: { category: copy.keyword, breadcrumbs: [{ name: copy.home, path: homePath }, { name: copy.library, path: libraryPath }, { name: copy.h1, path: copy.path }], extra: { primaryKeyword: copy.keyword, useLocalizedHero: true, eyebrow: copy.eyebrow, contactPath: localizedPath(manifest, "contact", copy.locale, "/contact"), ctaTitle: copy.cta[0], ctaText: copy.cta[1], ctaLabel: copy.cta[2] } },
    images: [imageFor(copy)], internalLinks, canonicalData: { mode: "self" }, hreflangData: { include: true }, publishedAt, updatedAt: publishedAt, version: 1
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
export const freeWeightIncotermsEnglishPost = { entityId, publicPath: english.path, title: english.title, h1: english.h1, description: english.description, primaryKeyword: english.keyword, secondaryKeywords: ["FCA vs FOB gym equipment", "DDP dumbbell import", "CIF weight plates", "free weight landed cost quote", "Incoterms 2020 fitness equipment"], searchIntent: "compare wholesale free-weight quotations by named place, cost scope, risk handoff, insurance, export and import responsibility", content: englishMarkdown(), images: [imageFor(english)], publishedAt, updatedAt: publishedAt };
export function withFreeWeightIncotermsGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = { id: entityId, type: "blog", defaultLocale: "en", versions: Object.fromEntries(freeWeightIncotermsCopies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"] };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
