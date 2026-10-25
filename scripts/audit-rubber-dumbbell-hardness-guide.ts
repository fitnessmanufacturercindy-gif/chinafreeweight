import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { getAllPosts } from "../app/resources/blogData";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import type { LocalizedContentVersion } from "../lib/content/types";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";

const entityId = "rubber-dumbbell-shore-hardness-guide";
const siteUrl = "https://www.chinafreeweight.com";
const imageDirectory = "/assets/resources/dumbbell-rubber-hardness/";
const heroSuffix = "rubber-dumbbell-shore-hardness-guide";
const locales = getPublishedLocaleDefinitions();
const entity = contentRepository.getEntity(entityId);
const failures: string[] = [];
const banned = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupported = /(?<![\p{L}\p{N}])(?:our customer|our client|guaranteed|indestructible|lifetime warranty|IWF certified|IPF certified|ISO certified|approved for competition)(?![\p{L}\p{N}])/giu;
const inventedNumbers = /(?<![\p{L}\p{N}])(?:MOQ\s*[:=]?\s*\d|US?\$\s*\d|€\s*\d|£\s*\d|\d+\s*(?:day|days|week|weeks|pieces|pcs|sets|units)\b)(?![\p{L}\p{N}])/giu;

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function visibleText(version: LocalizedContentVersion) {
  return strings([version.title, version.description, version.h1, version.body, version.faq, version.images, version.internalLinks, version.schemaData.extra]).join("\n");
}

function markdownLinks(version: LocalizedContentVersion) {
  return version.body.flatMap((block) =>
    strings(block.data?.markdown).flatMap((value) =>
      [...value.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)].map((match) => match[1])
    )
  );
}

function tokens(value: string) {
  return new Set(value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").split(/\s+/u).filter((token) => token.length > 2));
}

function similarity(left: string, right: string) {
  const a = tokens(left);
  const b = tokens(right);
  return [...a].filter((token) => b.has(token)).length / Math.max(1, new Set([...a, ...b]).size);
}

const assetLocale = (locale: string) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();

async function main() {
  if (!entity) failures.push(entityId + ": content entity missing");
  else {
    const expected = locales.map((item) => item.internalLocale).sort();
    const actual = Object.keys(entity.versions).sort();
    if (expected.join("|") !== actual.join("|")) failures.push("locale coverage mismatch: " + actual.join(", "));
    const allPublished = contentRepository.listPublished();
    const allPaths = new Set([...allPublished.map(({ version }) => version.publicPath), ...getAllPosts().map((post) => "/resources/" + post.slug), "/contact"]);
    const heroes = Object.values(entity.versions).map((version) => version?.images[0]?.src);
    if (new Set(heroes).size !== locales.length) failures.push("Each locale must have a distinct hero image");
    const seen = { paths: new Set<string>(), titles: new Set<string>(), descriptions: new Set<string>(), headings: new Set<string>(), keywords: new Set<string>() };

    for (const definition of locales) {
      const locale = definition.internalLocale;
      const version = entity.versions[locale];
      if (!version) continue;
      const label = entityId + ":" + locale;
      const visible = visibleText(version);
      if (version.translationStatus !== (locale === "en" ? "published" : "localized") || version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(label + ": publication status");
      if (version.canonicalData.mode !== "self" || version.canonicalData.noindex || !version.hreflangData.include) failures.push(label + ": canonical/index state");
      if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : definition.prefix + "/")) failures.push(label + ": route " + version.publicPath);
      for (const [field, value, target] of [["path", version.publicPath, seen.paths], ["title", version.title, seen.titles], ["description", version.description, seen.descriptions], ["H1", version.h1, seen.headings], ["keyword", String(version.schemaData.extra?.primaryKeyword ?? ""), seen.keywords]] as const) {
        const normalized = value.trim().toLocaleLowerCase();
        if (!normalized) failures.push(label + ": missing " + field);
        if (target.has(normalized)) failures.push(label + ": duplicate " + field);
        target.add(normalized);
      }
      if (version.body.length < 9 || version.body.filter((block) => block.heading).length < 9) failures.push(label + ": section depth");
      const paragraphs = version.body.flatMap((block) => [block.content, ...strings(block.data?.markdown)]).filter(Boolean).reduce((total, value) => total + String(value).split(/\n\n+/u).filter(Boolean).length, 0);
      if (paragraphs < 12) failures.push(label + ": only " + paragraphs + " substantive paragraphs");
      if (!version.body.some((block) => block.data?.component === "quick-answer") || !version.body.some((block) => block.data?.component === "definition")) failures.push(label + ": answer structure");
      const table = version.body.find((block) => block.type === "specifications");
      if (!table || !Array.isArray(table.data?.rows) || table.data.rows.length !== 6) failures.push(label + ": six-row decision table required");
      const checklist = version.body.find((block) => block.type === "features");
      if (!checklist || !Array.isArray(checklist.data?.items) || checklist.data.items.length !== 10) failures.push(label + ": ten-point checklist required");
      if (version.faq.length !== 5 || new Set(version.faq.map((item) => item.question.trim().toLocaleLowerCase())).size !== 5) failures.push(label + ": five distinct FAQs required");
      if (version.images.length !== 1 || version.images[0]?.src !== imageDirectory + assetLocale(locale) + "-" + heroSuffix + ".webp") failures.push(label + ": localized hero");
      for (const [name, regex] of [["banned wording", banned], ["unsupported claim", unsupported], ["unverified commercial number", inventedNumbers]] as const) {
        const matches = [...new Set(visible.match(regex) ?? [])];
        if (matches.length) failures.push(label + ": " + name + ": " + matches.join(", "));
      }
      if (/\uFFFD|鈥■|脯|Ã|Lorem ipsum/gu.test(visible)) failures.push(label + ": filler or mojibake");
      const hasCustomization = /OEM/iu.test(visible) && /ODM/iu.test(visible) && /ChinaFreeWeight/iu.test(visible) && (locale === "id" ? /merek privat/iu.test(visible) : /Private[- ]Label/iu.test(visible)) && /Bulk[- ]Supply/iu.test(visible);
      if (!hasCustomization) failures.push(label + ": factory and customization scope missing");
      const image = version.images[0];
      const webp = path.join(process.cwd(), "public", image.src.replace(/^\//u, ""));
      const avif = webp.replace(/\.webp$/u, ".avif");
      for (const file of [webp, avif]) {
        if (!fs.existsSync(file)) failures.push(label + ": missing asset " + file);
        else {
          const metadata = await sharp(file).metadata();
          if (metadata.width !== 1536 || metadata.height !== 1024 || fs.statSync(file).size >= 150_000) failures.push(label + ": invalid optimized asset " + file);
        }
      }
      if (!image.width || !image.height || image.alt.trim().length < 12 || (image.caption?.trim().length ?? 0) < 12) failures.push(label + ": image metadata");
      const links = markdownLinks(version);
      if (links.length !== 7) failures.push(label + ": expected seven visible internal links, found " + links.length);
      for (const href of links) if (!allPaths.has(href)) failures.push(label + ": unresolved link " + href);
      const published = contentRepository.getPublishedVersion(entityId, locale);
      if (!published) { failures.push(label + ": repository publication missing"); continue; }
      const metadata = buildLocalizedMetadata(published, contentRepository, siteUrl, "ChinaFreeWeight");
      if (metadata.alternates?.canonical !== siteUrl + version.publicPath) failures.push(label + ": canonical mismatch");
      const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
      for (const target of locales) if (languages?.[target.hreflang]?.toString() !== siteUrl + entity.versions[target.internalLocale]?.publicPath) failures.push(label + ": missing " + target.hreflang);
      if (languages?.["x-default"]?.toString() !== siteUrl + entity.versions.en?.publicPath) failures.push(label + ": x-default");
      const types = buildLocalizedSchemaGraph(published, siteUrl).map((node) => node["@type"]);
      for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList", "ImageObject"]) if (!types.includes(required)) failures.push(label + ": missing " + required);
      for (const other of allPublished.filter(({ entity: candidate, version: otherVersion }) => candidate.id !== entityId && candidate.type === "blog" && otherVersion.locale === locale)) {
        const keyword = String(version.schemaData.extra?.primaryKeyword ?? "").toLocaleLowerCase();
        const otherKeyword = String(other.version.schemaData.extra?.primaryKeyword ?? "").toLocaleLowerCase();
        if (other.version.title.trim().toLocaleLowerCase() === version.title.trim().toLocaleLowerCase() || other.version.h1.trim().toLocaleLowerCase() === version.h1.trim().toLocaleLowerCase() || otherKeyword === keyword || similarity(version.title + " " + version.h1, other.version.title + " " + other.version.h1) >= 0.83) failures.push(label + ": topic collision with " + other.entity.id);
      }
    }
  }
  if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
  console.log("Rubber-dumbbell hardness guide audit passed: " + locales.length + " editions, distinct media, claims, links, metadata and schemas.");
}

main().catch((error) => { console.error(error); process.exit(1); });
