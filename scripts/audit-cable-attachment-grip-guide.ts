import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../app/resources/blogData";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "cable-attachment-handle-grip-specification-guide";
const siteUrl = "https://www.chinafreeweight.com";
const imageDirectory = "/assets/resources/cable-attachment-grips/";
const locales = getPublishedLocaleDefinitions();
const entity = contentRepository.getEntity(entityId);
const failures: string[] = [];
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupportedClaims = /(?<![\p{L}\p{N}])(?:our customer|our client|client project|customer project|guaranteed|indestructible|lifetime warranty|ASTM certified|ISO certified|universal standard|zero defects)(?![\p{L}\p{N}])/giu;
const inventedCommercialNumbers = /(?<![\p{L}\p{N}])(?:MOQ\s*[:=]?\s*\d|US?\$\s*\d|€\s*\d|£\s*\d|\d+\s*(?:day|days|week|weeks|pieces|pcs|sets|units)\b)(?![\p{L}\p{N}])/giu;

function strings(value: unknown): string[] {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === "object") return Object.values(value).flatMap(strings);
  return [];
}

function visibleText(version: LocalizedContentVersion): string {
  return [version.title, version.description, version.h1,
    ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? "", ...strings(block.data)]),
    ...version.faq.flatMap((item) => [item.question, item.answer]),
    ...version.images.flatMap((image) => [image.alt, image.caption ?? ""]),
    ...version.internalLinks.map((link) => link.label), ...strings(version.schemaData.extra)].join("\n");
}

function markdownLinks(version: LocalizedContentVersion): string[] {
  return version.body.flatMap((block) => strings(block.data?.markdown).flatMap((value) =>
    [...value.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)].map((match) => match[1])));
}

function tokens(value: string): Set<string> {
  return new Set(value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").split(/\s+/u).filter((token) => token.length > 2));
}

function similarity(left: string, right: string): number {
  const a = tokens(left); const b = tokens(right);
  return [...a].filter((token) => b.has(token)).length / Math.max(1, new Set([...a, ...b]).size);
}

const assetLocale = (locale: string) => locale === "pt-BR" ? "pt-br" : locale.toLowerCase();

if (!entity) failures.push(`${entityId}: content entity missing`);
else {
  const expected = locales.map((item) => item.internalLocale).sort();
  const actual = Object.keys(entity.versions).sort();
  if (expected.join("|") !== actual.join("|")) failures.push(`locale coverage: expected ${expected.join(", ")}; found ${actual.join(", ")}`);
  const allPublished = contentRepository.listPublished();
  const legacyPosts = getAllPosts();
  const allPaths = new Set([...allPublished.map(({ version }) => version.publicPath), ...legacyPosts.map((post) => `/resources/${post.slug}`), "/oem"]);
  const heroes = Object.values(entity.versions).map((version) => version?.images[0]?.src);
  if (new Set(heroes).size !== locales.length) failures.push("Every locale requires a distinct original hero image");
  const seen = { paths: new Set<string>(), titles: new Set<string>(), descriptions: new Set<string>(), headings: new Set<string>(), keywords: new Set<string>() };

  for (const definition of locales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const visible = visibleText(version);
    if (version.translationStatus !== (locale === "en" ? "published" : "localized")) failures.push(`${label}: translation status`);
    if (version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: publication not approved`);
    if (version.author?.name !== "ChinaFreeWeight Technical Editorial Team" || version.reviewedBy?.name !== "ChinaFreeWeight Technical Editorial Team") failures.push(`${label}: editorial provenance incomplete`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex || !version.hreflangData.include) failures.push(`${label}: canonical or index state invalid`);
    if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : `${definition.prefix}/`)) failures.push(`${label}: unexpected route ${version.publicPath}`);
    const fields = [["path", version.publicPath, seen.paths], ["title", version.title, seen.titles], ["description", version.description, seen.descriptions], ["H1", version.h1, seen.headings], ["keyword", String(version.schemaData.extra?.primaryKeyword ?? ""), seen.keywords]] as const;
    for (const [field, value, target] of fields) {
      const normalized = value.trim().toLocaleLowerCase();
      if (!normalized) failures.push(`${label}: missing ${field}`);
      if (target.has(normalized)) failures.push(`${label}: duplicate ${field}`);
      target.add(normalized);
    }
    const compact = locale === "ar" || locale === "ko";
    if (version.title.length < (compact ? 16 : 25) || version.description.length < (compact ? 45 : 70) || version.h1.length < (compact ? 15 : 22)) failures.push(`${label}: metadata too thin`);
    if (version.body.length < 10 || version.body.filter((block) => block.heading).length < 5) failures.push(`${label}: section depth missing`);
    const h3Count = version.body.flatMap((block) => strings(block.data?.markdown)).join("\n").match(/^###\s+/gmu)?.length ?? 0;
    if (h3Count < 5) failures.push(`${label}: only ${h3Count} H3 sections`);
    if (!version.body.some((block) => block.data?.component === "quick-answer") || !version.body.some((block) => block.data?.component === "definition")) failures.push(`${label}: answer structure missing`);
    const spec = version.body.find((block) => block.type === "specifications");
    if (!spec || !Array.isArray(spec.data?.rows) || spec.data.rows.length !== 8) failures.push(`${label}: eight-row table required`);
    const checklist = version.body.find((block) => block.type === "features");
    if (!checklist || !Array.isArray(checklist.data?.items) || checklist.data.items.length !== 10) failures.push(`${label}: ten-point checklist required`);
    if (version.faq.length !== 7 || new Set(version.faq.map((item) => item.question.trim().toLocaleLowerCase())).size !== 7) failures.push(`${label}: seven distinct FAQs required`);
    if (version.images.length !== 3) failures.push(`${label}: expected 3 images`);
    if (version.images[0]?.src !== `${imageDirectory}${assetLocale(locale)}-cable-attachment-grip.webp`) failures.push(`${label}: incorrect hero`);
    const minimumLength = locale === "ko" ? 2_200 : locale === "ar" ? 3_000 : 3_500;
    if (visible.length < minimumLength) failures.push(`${label}: buyer content too thin (${visible.length} chars)`);
    for (const [name, regex] of [["banned visible wording", bannedVisibleTerms], ["unsupported claim wording", unsupportedClaims], ["unverified commercial number", inventedCommercialNumbers]] as const) {
      const matches = [...new Set(visible.match(regex) ?? [])]; if (matches.length) failures.push(`${label}: ${name} ${matches.join(", ")}`);
    }
    if (/\uFFFD|鈻|脿|Ã|Lorem ipsum/gu.test(visible)) failures.push(`${label}: filler or mojibake`);
    for (const image of version.images) {
      const webp = path.join(process.cwd(), "public", image.src.replace(/^\//u, "")); const avif = webp.replace(/\.webp$/u, ".avif");
      if (!image.src.startsWith(imageDirectory) || !fs.existsSync(webp) || !fs.existsSync(avif)) failures.push(`${label}: missing approved asset ${image.src}`);
      if (fs.existsSync(webp) && fs.statSync(webp).size > 150_000 || fs.existsSync(avif) && fs.statSync(avif).size > 150_000) failures.push(`${label}: image exceeds 150 KB ${image.src}`);
      if (image.width !== 1536 || image.height !== 1024 || image.alt.trim().length < 12 || (image.caption?.trim().length ?? 0) < 12) failures.push(`${label}: image metadata incomplete ${image.src}`);
    }
    if (version.internalLinks.length < (locale === "ar" ? 0 : 6)) failures.push(`${label}: too few repository links`);
    for (const link of version.internalLinks) if (!contentRepository.getPublishedVersion(link.targetContentId, locale)) failures.push(`${label}: unresolved repository link ${link.targetContentId}`);
    const links = markdownLinks(version);
    if (links.length !== 9) failures.push(`${label}: expected 9 visible internal links; found ${links.length}`);
    for (const href of links) if (!allPaths.has(href)) failures.push(`${label}: unresolved visible link ${href}`);
    const published = contentRepository.getPublishedVersion(entityId, locale);
    if (!published) { failures.push(`${label}: repository publication missing`); continue; }
    const metadata = buildLocalizedMetadata(published, contentRepository, siteUrl, "PowerBaseFit");
    if (metadata.alternates?.canonical !== `${siteUrl}${version.publicPath}`) failures.push(`${label}: canonical mismatch`);
    const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    for (const target of locales) if (languages?.[target.hreflang]?.toString() !== `${siteUrl}${entity.versions[target.internalLocale]?.publicPath}`) failures.push(`${label}: missing ${target.hreflang} hreflang`);
    if (languages?.["x-default"]?.toString() !== `${siteUrl}${entity.versions.en?.publicPath}`) failures.push(`${label}: incorrect x-default`);
    const types = buildLocalizedSchemaGraph(published, siteUrl).map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList"]) if (!types.includes(required)) failures.push(`${label}: missing ${required} schema`);
    if (types.filter((type) => type === "ImageObject").length !== 3) failures.push(`${label}: ImageObject count mismatch`);
    for (const other of allPublished.filter(({ entity: candidate, version: candidateVersion }) => candidate.id !== entityId && candidate.type === "blog" && candidateVersion.locale === locale)) {
      if (other.version.title.trim().toLocaleLowerCase() === version.title.trim().toLocaleLowerCase() || other.version.h1.trim().toLocaleLowerCase() === version.h1.trim().toLocaleLowerCase() || String(other.version.schemaData.extra?.primaryKeyword ?? "").toLocaleLowerCase() === String(version.schemaData.extra?.primaryKeyword ?? "").toLocaleLowerCase() || similarity(`${version.title} ${version.h1}`, `${other.version.title} ${other.version.h1}`) >= 0.8) failures.push(`${label}: topic collision with ${other.entity.id}`);
    }
  }
}

if (failures.length) { console.error(failures.join("\n")); process.exit(1); }
console.log(`Cable attachment grip audit passed: ${locales.length} localized editions, distinct heroes, metadata, links, assets and schemas.`);
