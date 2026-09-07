import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { contentRepository } from "../lib/content/repository";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "weight-plate-tolerance-bulk-order-guide";
const siteUrl = "https://www.chinafreeweight.com";
const expectedImageCount = 5;
const expectedFaqCount = 8;
const failures: string[] = [];
const entity = contentRepository.getEntity(entityId);
const publishedLocales = getPublishedLocaleDefinitions();
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupportedClaimPatterns = /(?<![\p{L}\p{N}])(?:customer project|client project|our client|case study|certified|guaranteed lead time|guaranteed MOQ|every plate is weighed|all plates are calibrated|sales increased|factory test proves)(?![\p{L}\p{N}])/giu;

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
  failures.push(`${entityId}: missing content entity`);
} else {
  const expectedLocales = publishedLocales.map((definition) => definition.internalLocale).sort();
  const actualLocales = Object.keys(entity.versions).sort();
  if (actualLocales.join("|") !== expectedLocales.join("|")) failures.push(`locale coverage: expected ${expectedLocales.join(", ")}; found ${actualLocales.join(", ")}`);

  const allPublished = contentRepository.listPublished();
  const allPaths = new Set(allPublished.map(({ version }) => version.publicPath));
  const seenPaths = new Set<string>();
  const seenTitles = new Set<string>();
  const seenDescriptions = new Set<string>();
  const seenH1s = new Set<string>();

  for (const definition of publishedLocales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const visible = visibleText(version);

    if (version.translationStatus !== (locale === "en" ? "published" : "localized")) failures.push(`${label}: translation status ${version.translationStatus}`);
    if (version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: publication is not approved`);
    if (!version.publishedAt || !version.updatedAt || !version.author || !version.reviewedBy) failures.push(`${label}: editorial provenance incomplete`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex) failures.push(`${label}: canonical/index state invalid`);
    if (!version.hreflangData.include) failures.push(`${label}: hreflang disabled`);
    if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : `${definition.prefix}/`)) failures.push(`${label}: unexpected route ${version.publicPath}`);

    for (const [name, value, seen] of [["path", version.publicPath, seenPaths], ["title", version.title, seenTitles], ["description", version.description, seenDescriptions], ["H1", version.h1, seenH1s]] as const) {
      const normalized = value.trim().toLocaleLowerCase();
      if (seen.has(normalized)) failures.push(`${label}: duplicate ${name}`);
      seen.add(normalized);
    }

    const compactScript = locale === "ko";
    if (version.title.length < 35 || version.description.length < (compactScript ? 60 : 100) || version.h1.length < (compactScript ? 25 : 30)) failures.push(`${label}: title, description or H1 is too thin`);
    if (version.body.length < 14 || version.body.filter((block) => Boolean(block.heading)).length < 14) failures.push(`${label}: fewer than fourteen buyer sections`);
    const h3Count = version.body.flatMap((block) => strings(block.data?.markdown)).join("\n").match(/^###\s+/gmu)?.length ?? 0;
    if (h3Count < 3) failures.push(`${label}: fewer than three H3 subsections`);
    if (!version.body.some((block) => block.data?.component === "quick-answer")) failures.push(`${label}: quick answer missing`);
    if (!version.body.some((block) => block.data?.component === "definition")) failures.push(`${label}: definition missing`);
    if (!version.body.some((block) => block.type === "specifications")) failures.push(`${label}: acceptance table missing`);
    if (!version.body.some((block) => block.type === "features")) failures.push(`${label}: inspection checklist missing`);
    if (version.faq.length !== expectedFaqCount) failures.push(`${label}: expected ${expectedFaqCount} FAQs; found ${version.faq.length}`);
    if (version.images.length !== expectedImageCount) failures.push(`${label}: expected ${expectedImageCount} images; found ${version.images.length}`);
    const minimumVisibleLength = locale === "ko" ? 2400 : locale === "ar" ? 3600 : 5000;
    if (visible.length < minimumVisibleLength) failures.push(`${label}: localized buyer content too thin (${visible.length} chars)`);

    const banned = [...new Set(visible.match(bannedVisibleTerms) ?? [])];
    if (banned.length) failures.push(`${label}: banned visible wording: ${banned.join(", ")}`);
    const unsupported = [...new Set(visible.match(unsupportedClaimPatterns) ?? [])];
    if (unsupported.length) failures.push(`${label}: unsupported claim wording: ${unsupported.join(", ")}`);
    if (/\uFFFD|鈥|脿|Ã|Lorem ipsum/gu.test(visible)) failures.push(`${label}: mojibake or filler text`);

    for (const image of version.images) {
      const webp = path.join(process.cwd(), "public", image.src.replace(/^\//u, ""));
      const avif = webp.replace(/\.webp$/u, ".avif");
      if (!fs.existsSync(webp)) failures.push(`${label}: missing WebP ${image.src}`);
      if (!fs.existsSync(avif)) failures.push(`${label}: missing AVIF ${image.src}`);
      if (fs.existsSync(webp) && fs.statSync(webp).size > 280_000) failures.push(`${label}: oversized WebP ${image.src}`);
      if (fs.existsSync(avif) && fs.statSync(avif).size > 190_000) failures.push(`${label}: oversized AVIF ${image.src}`);
      if (image.width !== 1536 || image.height !== 1024) failures.push(`${label}: incorrect intrinsic dimensions ${image.src}`);
      if (image.alt.trim().length < 12 || (image.caption?.trim().length ?? 0) < 12) failures.push(`${label}: incomplete localized image text ${image.src}`);
    }

    const minimumInternalLinks = locale === "ar" ? 2 : 5;
    if (version.internalLinks.length < minimumInternalLinks) failures.push(`${label}: only ${version.internalLinks.length} internal links`);
    for (const link of version.internalLinks) if (!contentRepository.getPublishedVersion(link.targetContentId, locale)) failures.push(`${label}: unresolved internal target ${link.targetContentId}`);
    const visibleLinks = markdownLinks(version);
    if (visibleLinks.length < 3) failures.push(`${label}: fewer than three visible category/product links`);
    for (const href of visibleLinks) if (!allPaths.has(href)) failures.push(`${label}: unresolved visible link ${href}`);

    const published = contentRepository.getPublishedVersion(entityId, locale);
    assert.ok(published);
    const metadata = buildLocalizedMetadata(published, contentRepository, siteUrl, "PowerBaseFit");
    if (metadata.alternates?.canonical !== `${siteUrl}${version.publicPath}`) failures.push(`${label}: incorrect canonical`);
    const alternateLanguages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    if (alternateLanguages?.[definition.hreflang]?.toString() !== `${siteUrl}${version.publicPath}`) failures.push(`${label}: missing self hreflang`);
    for (const targetDefinition of publishedLocales) {
      const targetVersion = entity.versions[targetDefinition.internalLocale];
      if (targetVersion && alternateLanguages?.[targetDefinition.hreflang]?.toString() !== `${siteUrl}${targetVersion.publicPath}`) failures.push(`${label}: missing ${targetDefinition.hreflang} hreflang`);
    }
    if (alternateLanguages?.["x-default"]?.toString() !== `${siteUrl}${entity.versions.en?.publicPath}`) failures.push(`${label}: incorrect x-default`);
    const graph = buildLocalizedSchemaGraph(published, siteUrl);
    const types = graph.map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList"]) if (!types.includes(required)) failures.push(`${label}: missing ${required} schema`);
    if (types.filter((type) => type === "ImageObject").length !== expectedImageCount) failures.push(`${label}: ImageObject count mismatch`);

    for (const other of allPublished.filter(({ entity: otherEntity, version: otherVersion }) => otherEntity.id !== entityId && otherVersion.locale === locale && otherEntity.type === "blog")) {
      if (other.version.title.trim().toLocaleLowerCase() === version.title.trim().toLocaleLowerCase()) failures.push(`${label}: title collision with ${other.entity.id}`);
      if (other.version.h1.trim().toLocaleLowerCase() === version.h1.trim().toLocaleLowerCase()) failures.push(`${label}: H1 collision with ${other.entity.id}`);
      if (titleSimilarity(`${version.title} ${version.h1}`, `${other.version.title} ${other.version.h1}`) >= 0.78) failures.push(`${label}: possible topic conflict with ${other.entity.id}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Weight plate tolerance guide audit passed: ${publishedLocales.length} localized editions, ${expectedImageCount} optimized images and ${expectedFaqCount} FAQs each.`);
