import { getAllPosts } from "../app/resources/blogData";
import fs from "node:fs";
import path from "node:path";
import { contentRepository } from "../lib/content/repository";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "kg-lb-free-weight-ordering-guide";
const siteUrl = "https://www.chinafreeweight.com";
const expectedImageCount = 3;
const expectedFaqCount = 6;
const failures: string[] = [];
const entity = contentRepository.getEntity(entityId);
const publishedLocales = getPublishedLocaleDefinitions();
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupportedClaims = /(?<![\p{L}\p{N}])(?:our customer|our client|client project|customer project|guaranteed capacity|guaranteed lead time|guaranteed MOQ|certified by IWF|certified by IPF|millions of drops|zero maintenance|corrosion proof)(?![\p{L}\p{N}])/giu;

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function visibleText(version: LocalizedContentVersion): string {
  return [
    version.title,
    version.description,
    version.h1,
    ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? "", ...strings(block.data)]),
    ...version.faq.flatMap((item) => [item.question, item.answer]),
    ...version.images.flatMap((image) => [image.alt, image.caption ?? ""]),
    ...version.internalLinks.map((link) => link.label),
    ...strings(version.schemaData.extra)
  ].join("\n");
}

function markdownLinks(version: LocalizedContentVersion): string[] {
  const text = version.body.flatMap((block) => [block.content ?? "", ...strings(block.data?.markdown)]).join("\n");
  return [...text.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)].map((match) => match[1]);
}

function normalizedTokens(value: string): Set<string> {
  return new Set(value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").split(/\s+/u).filter((token) => token.length > 2));
}

function titleSimilarity(left: string, right: string): number {
  const a = normalizedTokens(left);
  const b = normalizedTokens(right);
  const intersection = [...a].filter((token) => b.has(token)).length;
  return intersection / Math.max(1, new Set([...a, ...b]).size);
}

if (!entity) {
  failures.push(`${entityId}: content entity missing`);
} else {
  const expectedLocales = publishedLocales.map((definition) => definition.internalLocale).sort();
  const actualLocales = Object.keys(entity.versions).sort();
  if (actualLocales.join("|") !== expectedLocales.join("|")) failures.push(`locale coverage: expected ${expectedLocales.join(", ")}; found ${actualLocales.join(", ")}`);

  const allPublished = contentRepository.listPublished();
  const legacyPosts = getAllPosts();
  const allPaths = new Set([...allPublished.map(({ version }) => version.publicPath), ...legacyPosts.map((post) => `/resources/${post.slug}`)]);
  const seenPaths = new Set<string>();
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();
  const seenH1s = new Set<string>();
  const heroPaths = Object.values(entity.versions).map((version) => version?.images[0]?.src);
  if (new Set(heroPaths).size !== publishedLocales.length) failures.push("Each edition requires its own original hero image");

  for (const definition of publishedLocales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const visible = visibleText(version);

    if (version.translationStatus !== (locale === "en" ? "published" : "localized")) failures.push(`${label}: translation status ${version.translationStatus}`);
    if (version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: publication not approved`);
    if (!version.publishedAt || !version.updatedAt || !version.author || !version.reviewedBy) failures.push(`${label}: editorial provenance incomplete`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex) failures.push(`${label}: canonical/index state invalid`);
    if (!version.hreflangData.include) failures.push(`${label}: hreflang disabled`);
    if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : `${definition.prefix}/`)) failures.push(`${label}: unexpected route ${version.publicPath}`);

    for (const [name, value, seen] of [["path", version.publicPath, seenPaths], ["title", version.title, seenTitles], ["description", version.description, seenDescriptions], ["H1", version.h1, seenH1s]] as const) {
      const normalized = value.trim().toLocaleLowerCase();
      if (seen.has(normalized)) failures.push(`${label}: duplicate ${name}`);
      seen.add(normalized);
    }

    const compact = locale === "ko" || locale === "ar";
    if (version.title.length < (compact ? 20 : 35) || version.description.length < (compact ? 55 : 100) || version.h1.length < (compact ? 20 : 30)) failures.push(`${label}: title, description or H1 is too thin`);
    if (version.body.length < 10 || version.body.filter((block) => Boolean(block.heading)).length < 10) failures.push(`${label}: buyer sections missing`);
    const h3Count = version.body.flatMap((block) => strings(block.data?.markdown)).join("\n").match(/^###\s+/gmu)?.length ?? 0;
    if (h3Count < 3) failures.push(`${label}: fewer than three H3 sections`);
    if (!version.body.some((block) => block.data?.component === "quick-answer")) failures.push(`${label}: quick answer missing`);
    if (!version.body.some((block) => block.data?.component === "definition")) failures.push(`${label}: definition missing`);
    if (!version.body.some((block) => block.type === "specifications")) failures.push(`${label}: specification table missing`);
    if (!version.body.some((block) => block.type === "features")) failures.push(`${label}: inspection checklist missing`);
    if (version.faq.length !== expectedFaqCount) failures.push(`${label}: expected ${expectedFaqCount} FAQs; found ${version.faq.length}`);
    if (version.images.length !== expectedImageCount) failures.push(`${label}: expected ${expectedImageCount} images; found ${version.images.length}`);
    if (version.images[0]?.src !== `/assets/resources/kg-lb-units/${locale.toLowerCase()}-weight-assortment.webp`) failures.push(`${label}: wrong locale hero image`);
    const minimumVisibleLength = locale === "ko" ? 2800 : locale === "ar" ? 4800 : 6000;
    if (visible.length < minimumVisibleLength) failures.push(`${label}: localized buyer content too thin (${visible.length} chars)`);

    const banned = [...new Set(visible.match(bannedVisibleTerms) ?? [])];
    if (banned.length) failures.push(`${label}: banned visible wording: ${banned.join(", ")}`);
    const unsupported = [...new Set(visible.match(unsupportedClaims) ?? [])];
    if (unsupported.length) failures.push(`${label}: unsupported claim wording: ${unsupported.join(", ")}`);
    if (/\uFFFD|鈥|脿|Ã|Lorem ipsum/gu.test(visible)) failures.push(`${label}: mojibake or filler text`);

    for (const image of version.images) {
      const webp = path.join(process.cwd(), "public", image.src.replace(/^\//u, ""));
      const avif = webp.replace(/\.webp$/u, ".avif");
      if (!fs.existsSync(webp)) failures.push(`${label}: missing WebP ${image.src}`);
      if (!fs.existsSync(avif)) failures.push(`${label}: missing AVIF ${image.src}`);
      if (fs.existsSync(webp) && fs.statSync(webp).size > 260_000) failures.push(`${label}: oversized WebP ${image.src}`);
      if (fs.existsSync(avif) && fs.statSync(avif).size > 150_000) failures.push(`${label}: oversized AVIF ${image.src}`);
      if (image.width !== 1536 || image.height !== 1024) failures.push(`${label}: incorrect intrinsic dimensions ${image.src}`);
      if (image.alt.trim().length < 12 || (image.caption?.trim().length ?? 0) < 12) failures.push(`${label}: incomplete localized image text ${image.src}`);
    }

    const minimumInternalLinks = locale === "ar" ? 2 : 5;
    if (version.internalLinks.length < minimumInternalLinks) failures.push(`${label}: only ${version.internalLinks.length} repository links`);
    for (const link of version.internalLinks) if (!contentRepository.getPublishedVersion(link.targetContentId, locale)) failures.push(`${label}: unresolved repository target ${link.targetContentId}`);
    const visibleLinks = markdownLinks(version);
    if (visibleLinks.length < 5) failures.push(`${label}: fewer than five visible links`);
    for (const href of visibleLinks) if (!allPaths.has(href)) failures.push(`${label}: unresolved visible link ${href}`);

    const published = contentRepository.getPublishedVersion(entityId, locale);
    if (!published) {
      failures.push(`${label}: repository publication missing`);
      continue;
    }
    const metadata = buildLocalizedMetadata(published, contentRepository, siteUrl, "PowerBaseFit");
    if (metadata.alternates?.canonical !== `${siteUrl}${version.publicPath}`) failures.push(`${label}: canonical mismatch`);
    const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    for (const target of publishedLocales) {
      const targetVersion = entity.versions[target.internalLocale];
      if (targetVersion && languages?.[target.hreflang]?.toString() !== `${siteUrl}${targetVersion.publicPath}`) failures.push(`${label}: missing ${target.hreflang} hreflang`);
    }
    if (languages?.["x-default"]?.toString() !== `${siteUrl}${entity.versions.en?.publicPath}`) failures.push(`${label}: incorrect x-default`);
    const graph = buildLocalizedSchemaGraph(published, siteUrl);
    const types = graph.map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList"]) if (!types.includes(required)) failures.push(`${label}: missing ${required} schema`);
    if (types.filter((type) => type === "ImageObject").length !== expectedImageCount) failures.push(`${label}: ImageObject count mismatch`);

    if (locale === "en") for (const post of legacyPosts.filter((post) => `/resources/${post.slug}` !== version.publicPath)) {
      if (titleSimilarity(`${version.title} ${version.h1}`, `${post.seoTitle ?? post.title} ${post.title}`) >= 0.78 || post.primaryKeyword === version.schemaData.extra?.primaryKeyword) failures.push(`${label}: legacy article conflict ${post.slug}`);
    }

    for (const other of allPublished.filter(({ entity: otherEntity, version: otherVersion }) => otherEntity.id !== entityId && otherVersion.locale === locale && otherEntity.type === "blog")) {
      if (other.version.title.trim().toLocaleLowerCase() === version.title.trim().toLocaleLowerCase()) failures.push(`${label}: title collision with ${other.entity.id}`);
      if (other.version.h1.trim().toLocaleLowerCase() === version.h1.trim().toLocaleLowerCase()) failures.push(`${label}: H1 collision with ${other.entity.id}`);
      if (other.version.description.trim().toLocaleLowerCase() === version.description.trim().toLocaleLowerCase()) failures.push(`${label}: description collision with ${other.entity.id}`);
      if (other.version.schemaData.extra?.primaryKeyword === version.schemaData.extra?.primaryKeyword) failures.push(`${label}: primary keyword collision with ${other.entity.id}`);
      if (titleSimilarity(`${version.title} ${version.h1}`, `${other.version.title} ${other.version.h1}`) >= 0.78) failures.push(`${label}: possible topic conflict with ${other.entity.id}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`KG/LB free-weight guide audit passed: ${publishedLocales.length} localized editions, ${expectedImageCount} optimized images and ${expectedFaqCount} FAQs each.`);
