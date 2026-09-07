import type { InternalLocale } from "../../i18n/locale-registry";
import type { ContentBlock, ContentEntity, ContentManifest, LocalizedContentVersion, LocalizedImage } from "../../lib/content/types";
import copyData from "./dumbbell-head-retention-copy.json";

type GuideCopy = {
  locale: InternalLocale; path: string; title: string; description: string; h1: string;
  keyword: string; home: string; library: string; eyebrow: string;
  sections: Array<{ heading: string; text: string }>;
  table: { heading: string; columns: string[]; rows: string[][] };
  checklist: { heading: string; items: string[] };
  faq: string[][]; faqHeading: string; linkHeading: string; linkLabels: string[];
  imageCopy: string[][]; cta: string[];
};
const copies = copyData as GuideCopy[];
const english = copies.find((copy) => copy.locale === "en")!;
const entityId = "dumbbell-head-handle-construction-guide";
const publishedAt = "2026-09-02T04:00:00.000Z";
const files = ["fixed-dumbbell-head-handle", "dumbbell-handle-shoulder-detail", "dumbbell-head-support-packaging"];
const targets = ["rubber-hex-dumbbell", "dumbbells-category", "pre-shipment-inspection-free-weights", "oem-sample-approval-free-weights", "factory", "contact"];
const englishPaths = ["/products/dumbbells/hex-dumbbell-kg", "/products/dumbbells", "/resources/pre-shipment-inspection-dumbbells-weight-plates", "/resources/oem-free-weight-sample-approval-process", "/factory", "/contact"];

function imagesFor(copy: GuideCopy): LocalizedImage[] {
  return files.map((file, index) => ({ id: `dumbbell-joint-${index + 1}`, src: `/assets/resources/dumbbell-head-retention/${file}.webp`, width: 1536, height: 1024, alt: copy.imageCopy[index][0], caption: copy.imageCopy[index][1] }));
}
function linkMarkdown(copy: GuideCopy, manifest?: ContentManifest): string {
  const links = targets.map((id, index) => {
    const entity = manifest?.entities.find((entry) => entry.id === id);
    const href = entity?.versions[copy.locale]?.publicPath ?? englishPaths[index];
    return `- [${copy.linkLabels[index]}](${href})`;
  });
  if (copy.locale === "ar") links.push("- [دليل شراء الدمبل الفولاذي](/ar/blog/damabil-fawlad-masmat-oem-jumla)", "- [دليل فحص وزن الأقراص](/ar/blog/hamish-inhiraf-wazn-aqras-athqal)");
  return links.join("\n");
}
function bodyFor(copy: GuideCopy, manifest?: ContentManifest): ContentBlock[] {
  const sections: ContentBlock[] = copy.sections.map((section, index) => ({
    id: `joint-section-${index + 1}`, type: index < 2 ? "rich_text" : "custom", heading: section.heading,
    ...(index < 2 ? { content: section.text, data: { component: index === 0 ? "quick-answer" : "definition" } } : { data: { component: "markdown-section", markdown: section.text } })
  }));
  sections.splice(3, 0, { id: "joint-evidence-table", type: "specifications", heading: copy.table.heading, data: { columns: copy.table.columns, rows: copy.table.rows } });
  sections.splice(6, 0, { id: "joint-receiving-checklist", type: "features", heading: copy.checklist.heading, data: { items: copy.checklist.items } });
  sections.push({ id: "joint-related-reading", type: "custom", heading: copy.linkHeading, data: { component: "markdown-section", markdown: linkMarkdown(copy, manifest) } });
  return sections;
}
function versionFor(copy: GuideCopy, manifest: ContentManifest): LocalizedContentVersion {
  const parts = copy.path.split("/").filter(Boolean);
  const contact = manifest.entities.find((entity) => entity.id === "contact")?.versions[copy.locale]?.publicPath ?? "/contact";
  return {
    locale: copy.locale, translationStatus: copy.locale === "en" ? "published" : "localized", reviewStatus: "approved", publishStatus: "published",
    slug: parts.at(-1)!, publicPath: copy.path, title: copy.title, description: copy.description, h1: copy.h1,
    body: bodyFor(copy, manifest), faq: copy.faq.map(([question, answer], index) => ({ id: `joint-faq-${index + 1}`, question, answer })),
    author: { id: `powerbasefit-joint-team-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.eyebrow },
    reviewedBy: { id: `powerbasefit-joint-review-${copy.locale}`, name: "PowerBaseFit", kind: "Organization", role: copy.checklist.heading },
    schemaData: { category: copy.keyword, breadcrumbs: [
      { name: copy.home, path: copy.locale === "en" || copy.locale === "ar" ? "/" : `/${parts[0]}` },
      { name: copy.library, path: copy.locale === "en" || copy.locale === "ar" ? "/resources" : `/${parts.slice(0, 2).join("/")}` },
      { name: copy.h1, path: copy.path }
    ], extra: { primaryKeyword: copy.keyword, eyebrow: copy.eyebrow, contactPath: contact, ctaTitle: copy.cta[0], ctaText: copy.cta[1], ctaLabel: copy.cta[2] } },
    images: imagesFor(copy), internalLinks: copy.locale === "ar" ? [
      { targetContentId: "bulk-oem-steel-dumbbells-guide", label: "دليل شراء الدمبل الفولاذي" },
      { targetContentId: "weight-plate-tolerance-bulk-order-guide", label: "دليل فحص وزن الأقراص" }
    ] : targets.filter((id) => manifest.entities.find((entity) => entity.id === id)?.versions[copy.locale]?.publishStatus === "published").map((id) => ({ targetContentId: id, label: copy.linkLabels[targets.indexOf(id)] })),
    canonicalData: { mode: "self" }, hreflangData: { include: true }, publishedAt, updatedAt: publishedAt, version: 1
  };
}
function englishMarkdown(): string {
  return [...bodyFor(english).map((block) => {
    let content = block.content ?? String(block.data?.markdown ?? "");
    if (block.type === "specifications") content = [`| ${english.table.columns.join(" | ")} |`, `| ${english.table.columns.map(() => "---").join(" | ")} |`, ...english.table.rows.map((row) => `| ${row.join(" | ")} |`)].join("\n");
    if (block.type === "features") content = english.checklist.items.map((item) => `- ${item}`).join("\n");
    return `## ${block.heading}\n\n${content}`;
  }), `## ${english.faqHeading}\n\n${english.faq.map(([q, a]) => `### ${q}\n\n${a}`).join("\n\n")}`, `## ${english.cta[0]}\n\n${english.cta[1]} [${english.cta[2]}](/contact).`].join("\n\n");
}
export const dumbbellHeadRetentionEnglishPost = { entityId, publicPath: english.path, title: english.title, h1: english.h1, description: english.description, primaryKeyword: english.keyword, secondaryKeywords: ["dumbbell head retention", "welded dumbbell construction", "OEM dumbbell inspection", "wholesale rubber hex dumbbells"], searchIntent: "dumbbell joint specification and bulk acceptance", content: englishMarkdown(), images: imagesFor(english), publishedAt, updatedAt: publishedAt };
export function withDumbbellHeadRetentionGuide(manifest: ContentManifest): ContentManifest {
  if (manifest.entities.some((entity) => entity.id === entityId)) throw new Error(`Duplicate content entity: ${entityId}`);
  const entity: ContentEntity = { id: entityId, type: "blog", defaultLocale: "en", versions: Object.fromEntries(copies.map((copy) => [copy.locale, versionFor(copy, manifest)])) as ContentEntity["versions"] };
  return { ...manifest, entities: [...manifest.entities, entity] };
}
