import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";

const entityId = "bumper-plate-hub-rust-corrosion-inspection-guide";
const siteUrl = "https://www.chinafreeweight.com";
const imageDirectory = "/assets/resources/bumper-plate-hub-corrosion/";
const locales = getPublishedLocaleDefinitions();
const entity = contentRepository.getEntity(entityId);
const failures: string[] = [];
const banned = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupported = /(?<![\p{L}\p{N}])(?:our customer|our client|guaranteed lifetime|indestructible|we are certified|zero defects|no minimum order|fixed lead time)(?![\p{L}\p{N}])/giu;
const strings = (value: unknown): string[] => typeof value === "string" ? [value] : Array.isArray(value) ? value.flatMap(strings) : value && typeof value === "object" ? Object.values(value).flatMap(strings) : [];
const assetLocale = (locale: string) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();

async function main() {
  if (!entity) throw new Error(`${entityId}: missing`);
  if (Object.keys(entity.versions).length !== locales.length) failures.push("locale coverage mismatch");
  const unique = { paths: new Set<string>(), titles: new Set<string>(), descriptions: new Set<string>(), headings: new Set<string>(), heroes: new Set<string>() };
  for (const definition of locales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) { failures.push(`${locale}: missing`); continue; }
    const label = `${entityId}:${locale}`;
    const visible = strings([version.title, version.description, version.h1, version.body, version.faq, version.images, version.schemaData.extra]).join("\n");
    if (version.translationStatus !== (locale === "en" ? "published" : "localized") || version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: status`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex || !version.hreflangData.include) failures.push(`${label}: index state`);
    for (const [name, value, set] of [["path", version.publicPath, unique.paths], ["title", version.title, unique.titles], ["description", version.description, unique.descriptions], ["H1", version.h1, unique.headings]] as const) { const normalized = value.trim().toLocaleLowerCase(); if (!normalized || set.has(normalized)) failures.push(`${label}: duplicate ${name}`); set.add(normalized); }
    if (version.title === version.h1) failures.push(`${label}: title equals H1`);
    if (version.body.length !== 9 || version.body.filter((block) => block.id.startsWith("bumper-plate-hub-corrosion-section-")).length !== 6) failures.push(`${label}: structure`);
    for (const block of version.body.filter((item) => item.id.startsWith("bumper-plate-hub-corrosion-section-"))) { const text = block.content ?? String(block.data?.markdown ?? ""); if (text.split(/\n\s*\n/gu).filter(Boolean).length !== 2) failures.push(`${label}: section paragraphs`); }
    const table = version.body.find((block) => block.type === "specifications");
    const checklist = version.body.find((block) => block.type === "features");
    if (!Array.isArray(table?.data?.rows) || table.data.rows.length !== 5) failures.push(`${label}: table`);
    if (!Array.isArray(checklist?.data?.items) || checklist.data.items.length !== 12) failures.push(`${label}: checklist`);
    if (version.faq.length !== 5) failures.push(`${label}: faq`);
    if (visible.split(/\s+/u).filter(Boolean).length < 280) failures.push(`${label}: insufficient detail`);
    for (const [name, regex] of [["banned", banned], ["unsupported", unsupported]] as const) { const matches = [...new Set(visible.match(regex) ?? [])]; if (matches.length) failures.push(`${label}: ${name}: ${matches.join(", ")}`); }
    if (/\uFFFD|Lorem ipsum/gu.test(visible)) failures.push(`${label}: damaged text`);
    const factoryTerms = locale === "id" ? ["ChinaFreeWeight", "OEM", "ODM", "logo kustom", "merek privat", "pasokan volume"] : ["ChinaFreeWeight", "OEM", "ODM", "Custom Logo", "Private Label", "Bulk Supply"];
    for (const term of factoryTerms) if (!visible.includes(term)) failures.push(`${label}: missing ${term}`);
    const expectedImage = `${imageDirectory}${assetLocale(locale)}-bumper-plate-hub-inspection.webp`;
    const image = version.images[0];
    if (version.images.length !== 1 || image?.src !== expectedImage || unique.heroes.has(expectedImage)) failures.push(`${label}: hero`);
    unique.heroes.add(expectedImage);
    for (const relative of [expectedImage, expectedImage.replace(/\.webp$/u, ".avif")]) { const file = path.join(process.cwd(), "public", relative.replace(/^\//u, "")); if (!fs.existsSync(file)) failures.push(`${label}: missing ${relative}`); else { const metadata = await sharp(file).metadata(); if (metadata.width !== 1536 || metadata.height !== 1024 || fs.statSync(file).size >= 200_000) failures.push(`${label}: asset ${relative}`); } }
    if (!image.width || !image.height || image.alt.length < 20 || (image.caption?.length ?? 0) < 20) failures.push(`${label}: image metadata`);
    if (version.internalLinks.length < 5 || version.internalLinks.length > 8) failures.push(`${label}: internal links`);
    const item = contentRepository.getPublishedVersion(entityId, locale);
    if (!item) { failures.push(`${label}: repository`); continue; }
    const metadata = buildLocalizedMetadata(item, contentRepository, siteUrl, "ChinaFreeWeight");
    if (metadata.alternates?.canonical !== siteUrl + version.publicPath) failures.push(`${label}: canonical`);
    const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    for (const target of locales) if (languages?.[target.hreflang]?.toString() !== siteUrl + entity.versions[target.internalLocale]?.publicPath) failures.push(`${label}: hreflang ${target.hreflang}`);
    const schemaTypes = buildLocalizedSchemaGraph(item, siteUrl).map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!schemaTypes.includes(required)) failures.push(`${label}: schema ${required}`);
  }
  if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
  console.log(`Bumper-plate hub-corrosion audit passed: ${locales.length} localized editions.`);
}
main().catch((error) => { console.error(error); process.exit(1); });
