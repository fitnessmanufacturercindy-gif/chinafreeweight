import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getAllPosts } from "../app/resources/blogData";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "rubber-dumbbell-mold-line-flash-inspection-guide";
const siteUrl = "https://www.chinafreeweight.com";
const imageDirectory = "/assets/resources/rubber-dumbbell-mold-inspection/";
const locales = getPublishedLocaleDefinitions();
const entity = contentRepository.getEntity(entityId);
const failures: string[] = [];
const banned = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupported = /(?<![\p{L}\p{N}])(?:our customer|our client|guaranteed lifetime|indestructible|we are certified|our certification|all products require CE|automatically compliant|zero defects|no minimum order|fixed lead time)(?![\p{L}\p{N}])/giu;

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}
function assetLocale(locale: string) { return locale === "pt-BR" ? "pt-br" : locale.toLowerCase(); }
function markdownText(block: LocalizedContentVersion["body"][number]) { return block.content ?? String(block.data?.markdown ?? ""); }
function markdownLinks(version: LocalizedContentVersion) {
  return version.body.flatMap((block) => strings(block.data?.markdown).flatMap((value) => [...value.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)].map((match) => match[1])));
}

async function main() {
  if (!entity) throw new Error(`${entityId}: content entity missing`);
  const expectedLocales = locales.map((item) => item.internalLocale).sort();
  if (Object.keys(entity.versions).sort().join("|") !== expectedLocales.join("|")) failures.push("locale coverage mismatch");
  const publishedPaths = new Set([...contentRepository.listPublished().map(({ version }) => version.publicPath), ...getAllPosts().map((post) => `/resources/${post.slug}`), "/contact"]);
  const unique = { paths: new Set<string>(), titles: new Set<string>(), descriptions: new Set<string>(), headings: new Set<string>(), keywords: new Set<string>(), heroes: new Set<string>() };

  for (const definition of locales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const visible = strings([version.title, version.description, version.h1, version.body, version.faq, version.images, version.internalLinks, version.schemaData.extra]).join("\n");
    if (version.translationStatus !== (locale === "en" ? "published" : "localized") || version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: publication status`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex || !version.hreflangData.include) failures.push(`${label}: canonical/index state`);
    if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : `${definition.prefix}/`)) failures.push(`${label}: route ${version.publicPath}`);

    for (const [name, value, values] of [["path", version.publicPath, unique.paths], ["title", version.title, unique.titles], ["description", version.description, unique.descriptions], ["H1", version.h1, unique.headings], ["keyword", String(version.schemaData.extra?.primaryKeyword ?? ""), unique.keywords]] as const) {
      const normalized = value.trim().toLocaleLowerCase();
      if (!normalized || values.has(normalized)) failures.push(`${label}: missing or duplicate ${name}`);
      values.add(normalized);
    }
    if (version.title === version.h1) failures.push(`${label}: title and H1 must differ`);
    const peers = contentRepository.listPublished({ locale }).filter(({ entity: peer }) => peer.id !== entityId);
    for (const [name, value] of [["path", version.publicPath], ["title", version.title], ["H1", version.h1]] as const) {
      if (peers.some(({ version: peer }) => (name === "path" ? peer.publicPath : name === "title" ? peer.title : peer.h1).trim().toLocaleLowerCase() === value.trim().toLocaleLowerCase())) failures.push(`${label}: conflicts with existing ${name}`);
    }

    if (version.body.length !== 9 || version.body.filter((block) => block.heading).length !== version.body.length) failures.push(`${label}: expected nine content blocks`);
    if (!version.body.some((block) => block.data?.component === "quick-answer") || !version.body.some((block) => block.data?.component === "definition")) failures.push(`${label}: answer structure`);
    const editorialSections = version.body.filter((block) => block.id.startsWith("rubber-dumbbell-mold-section-"));
    if (editorialSections.length !== 6) failures.push(`${label}: expected six editorial sections`);
    for (const [index, block] of editorialSections.entries()) if (markdownText(block).split(/\n\s*\n/gu).filter(Boolean).length !== 2) failures.push(`${label}: section ${index + 1} must have two paragraphs`);
    const table = version.body.find((block) => block.type === "specifications");
    if (!Array.isArray(table?.data?.rows) || table.data.rows.length !== 6) failures.push(`${label}: decision table`);
    const checklist = version.body.find((block) => block.type === "features");
    if (!Array.isArray(checklist?.data?.items) || checklist.data.items.length !== 12) failures.push(`${label}: checklist`);
    if (version.faq.length !== 5 || new Set(version.faq.map((item) => item.question.trim().toLocaleLowerCase())).size !== 5) failures.push(`${label}: FAQ`);
    if (visible.split(/\s+/u).filter(Boolean).length < 350) failures.push(`${label}: insufficient buyer detail`);
    const externalSources = new Set(strings(version.body).flatMap((value) => [...value.matchAll(/\]\((https:\/\/[^)]+)\)/gu)].map((match) => match[1])));
    if (externalSources.size < 2) failures.push(`${label}: fewer than two visible technical sources`);

    for (const [name, regex] of [["banned wording", banned], ["unsupported claim", unsupported]] as const) {
      const matches = [...new Set(visible.match(regex) ?? [])];
      if (matches.length) failures.push(`${label}: ${name}: ${matches.join(", ")}`);
    }
    if (/\uFFFD|鈻■|脯|Ã|Lorem ipsum/gu.test(visible)) failures.push(`${label}: filler or mojibake`);
    const factoryScope = locale === "id" ? ["ChinaFreeWeight", "OEM", "ODM", "logo kustom", "merek privat", "pasokan volume"] : ["ChinaFreeWeight", "OEM", "ODM", "Custom Logo", "Private Label", "Bulk Supply"];
    for (const term of factoryScope) if (!visible.includes(term)) failures.push(`${label}: missing factory scope ${term}`);

    const expectedImage = `${imageDirectory}${assetLocale(locale)}-rubber-dumbbell-mold-inspection.webp`;
    const image = version.images[0];
    if (version.images.length !== 1 || image?.src !== expectedImage || unique.heroes.has(expectedImage)) failures.push(`${label}: localized hero`);
    unique.heroes.add(expectedImage);
    for (const relative of [expectedImage, expectedImage.replace(/\.webp$/u, ".avif")]) {
      const file = path.join(process.cwd(), "public", relative.replace(/^\//u, ""));
      if (!fs.existsSync(file)) failures.push(`${label}: missing ${relative}`);
      else {
        const metadata = await sharp(file).metadata();
        if (metadata.width !== 1536 || metadata.height !== 1024 || fs.statSync(file).size >= 150_000) failures.push(`${label}: invalid asset ${relative}`);
      }
    }
    if (!image.width || !image.height || image.alt.trim().length < 20 || (image.caption?.trim().length ?? 0) < 20) failures.push(`${label}: image metadata`);

    const links = markdownLinks(version);
    if (links.length !== 8) failures.push(`${label}: expected eight visible internal links`);
    for (const href of links) if (!publishedPaths.has(href)) failures.push(`${label}: unresolved link ${href}`);
    const item = contentRepository.getPublishedVersion(entityId, locale);
    if (!item) { failures.push(`${label}: repository publication missing`); continue; }
    const metadata = buildLocalizedMetadata(item, contentRepository, siteUrl, "ChinaFreeWeight");
    if (metadata.alternates?.canonical !== siteUrl + version.publicPath) failures.push(`${label}: canonical mismatch`);
    const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    for (const target of locales) if (languages?.[target.hreflang]?.toString() !== siteUrl + entity.versions[target.internalLocale]?.publicPath) failures.push(`${label}: missing ${target.hreflang}`);
    if (languages?.["x-default"]?.toString() !== siteUrl + entity.versions.en?.publicPath) failures.push(`${label}: x-default`);
    const schemaTypes = buildLocalizedSchemaGraph(item, siteUrl).map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!schemaTypes.includes(required)) failures.push(`${label}: missing ${required}`);
  }
  if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
  console.log(`Rubber-dumbbell mold-defect audit passed: ${locales.length} localized editions.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
