import fs from "node:fs";
import path from "node:path";
import { getAllPosts } from "../app/resources/blogData";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "olympic-plate-hole-barbell-sleeve-fit-guide";
const siteUrl = "https://www.chinafreeweight.com";
const imageDirectory = "/assets/resources/plate-bar-fit/";
const failures: string[] = [];
const entity = contentRepository.getEntity(entityId);
const locales = getPublishedLocaleDefinitions();
const bannedVisibleTerms = /(?<![\p{L}\p{N}])(?:SEO|GEO|AIO|AI-generated|draft|TBD|placeholder|uncertain|pending|target keyword|search intent|rascunho|borrador|entwurf|brouillon|nháp|utkast|bozza|conceptversie|مسودة|초안|draf|szkic)(?![\p{L}\p{N}])/giu;
const unsupportedClaims = /(?<![\p{L}\p{N}])(?:our customer|our client|client project|customer project|guaranteed capacity|guaranteed lead time|guaranteed MOQ|certified by IWF|certified by IPF|universal fit|zero maintenance|lifetime parts supply)(?![\p{L}\p{N}])/giu;

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
    ...strings(version.schemaData.extra),
  ].join("\n");
}

function markdownLinks(version: LocalizedContentVersion): string[] {
  return version.body.flatMap((block) => strings(block.data?.markdown).flatMap((value) => [...value.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/gu)].map((match) => match[1])));
}

function tokens(value: string): Set<string> {
  return new Set(value.toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").split(/\s+/u).filter((token) => token.length > 2));
}

function similarity(left: string, right: string): number {
  const a = tokens(left);
  const b = tokens(right);
  return [...a].filter((token) => b.has(token)).length / Math.max(1, new Set([...a, ...b]).size);
}

if (!entity) {
  failures.push(`${entityId}: content entity missing`);
} else {
  const expectedLocales = locales.map((locale) => locale.internalLocale).sort();
  const actualLocales = Object.keys(entity.versions).sort();
  if (actualLocales.join("|") !== expectedLocales.join("|")) failures.push(`locale coverage: expected ${expectedLocales.join(", ")}; found ${actualLocales.join(", ")}`);

  const allPublished = contentRepository.listPublished();
  const legacyPosts = getAllPosts();
  const allPaths = new Set([...allPublished.map(({ version }) => version.publicPath), ...legacyPosts.map((post) => `/resources/${post.slug}`), "/oem"]);
  const heroes = Object.values(entity.versions).map((version) => version?.images[0]?.src);
  if (new Set(heroes).size !== locales.length) failures.push("Every locale requires a distinct original hero image");
  const seen = { paths: new Set<string>(), titles: new Set<string>(), descriptions: new Set<string>(), headings: new Set<string>() };

  for (const definition of locales) {
    const locale = definition.internalLocale;
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const visible = visibleText(version);

    if (version.translationStatus !== (locale === "en" ? "published" : "localized")) failures.push(`${label}: translation status`);
    if (version.reviewStatus !== "approved" || version.publishStatus !== "published") failures.push(`${label}: publication not approved`);
    if (!version.author || !version.reviewedBy || !version.publishedAt || !version.updatedAt) failures.push(`${label}: editorial provenance incomplete`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex || !version.hreflangData.include) failures.push(`${label}: canonical or index state invalid`);
    if (!version.publicPath.startsWith(locale === "en" ? "/resources/" : `${definition.prefix}/`)) failures.push(`${label}: unexpected route ${version.publicPath}`);

    for (const [field, value, target] of [
      ["path", version.publicPath, seen.paths], ["title", version.title, seen.titles], ["description", version.description, seen.descriptions], ["H1", version.h1, seen.headings],
    ] as const) {
      const normalized = value.trim().toLocaleLowerCase();
      if (target.has(normalized)) failures.push(`${label}: duplicate ${field}`);
      target.add(normalized);
    }

    const compact = locale === "ar" || locale === "ko";
    if (version.title.length < (compact ? 18 : 28) || version.description.length < (compact ? 50 : 80) || version.h1.length < (compact ? 18 : 28)) failures.push(`${label}: metadata too thin`);
    if (version.body.length < 11 || version.body.filter((block) => block.heading).length < 5) failures.push(`${label}: section depth missing`);
    const h3Count = version.body.flatMap((block) => strings(block.data?.markdown)).join("\n").match(/^###\s+/gmu)?.length ?? 0;
    if (h3Count < 6) failures.push(`${label}: only ${h3Count} H3 sections`);
    if (!version.body.some((block) => block.data?.component === "quick-answer")) failures.push(`${label}: quick answer missing`);
    if (!version.body.some((block) => block.data?.component === "definition")) failures.push(`${label}: definition missing`);
    if (!version.body.some((block) => block.type === "specifications")) failures.push(`${label}: fit-control table missing`);
    if (!version.body.some((block) => block.type === "features")) failures.push(`${label}: inspection checklist missing`);
    if (version.faq.length !== 8) failures.push(`${label}: expected 8 FAQs`);
    if (version.images.length !== 3) failures.push(`${label}: expected 3 images`);
    const expectedHero = `${imageDirectory}${locale.toLowerCase()}-plate-bar-fit.webp`;
    if (version.images[0]?.src !== expectedHero) failures.push(`${label}: incorrect localized hero ${version.images[0]?.src}`);
    const minimumLength = locale === "ko" ? 4_300 : locale === "ar" ? 7_000 : 8_000;
    if (visible.length < minimumLength) failures.push(`${label}: buyer content too thin (${visible.length} chars)`);

    const banned = [...new Set(visible.match(bannedVisibleTerms) ?? [])];
    if (banned.length) failures.push(`${label}: banned visible wording ${banned.join(", ")}`);
    const unsupported = [...new Set(visible.match(unsupportedClaims) ?? [])];
    if (unsupported.length) failures.push(`${label}: unsupported claim wording ${unsupported.join(", ")}`);
    if (/\uFFFD|鈻|脿|Ã|Lorem ipsum/gu.test(visible)) failures.push(`${label}: filler or mojibake`);

    for (const image of version.images) {
      if (!image.src.startsWith(imageDirectory)) failures.push(`${label}: image outside approved original set ${image.src}`);
      const webp = path.join(process.cwd(), "public", image.src.replace(/^\//u, ""));
      const avif = webp.replace(/\.webp$/u, ".avif");
      if (!fs.existsSync(webp) || !fs.existsSync(avif)) failures.push(`${label}: missing WebP or AVIF for ${image.src}`);
      if (fs.existsSync(webp) && fs.statSync(webp).size > 150_000) failures.push(`${label}: WebP exceeds 150 KB ${image.src}`);
      if (fs.existsSync(avif) && fs.statSync(avif).size > 150_000) failures.push(`${label}: AVIF exceeds 150 KB ${image.src}`);
      if (image.width !== 1536 || image.height !== 1024) failures.push(`${label}: intrinsic dimensions incorrect ${image.src}`);
      if (image.alt.trim().length < 18 || (image.caption?.trim().length ?? 0) < 18) failures.push(`${label}: localized image text incomplete ${image.src}`);
    }

    const minimumLinks = locale === "ar" ? 4 : 6;
    if (version.internalLinks.length < minimumLinks) failures.push(`${label}: too few repository links`);
    for (const link of version.internalLinks) if (!contentRepository.getPublishedVersion(link.targetContentId, locale)) failures.push(`${label}: unresolved repository link ${link.targetContentId}`);
    const visibleLinks = markdownLinks(version);
    if (visibleLinks.length < minimumLinks) failures.push(`${label}: too few visible internal links`);
    for (const href of visibleLinks) if (!allPaths.has(href)) failures.push(`${label}: unresolved visible link ${href}`);

    const published = contentRepository.getPublishedVersion(entityId, locale);
    if (!published) {
      failures.push(`${label}: repository publication missing`);
      continue;
    }
    const metadata = buildLocalizedMetadata(published, contentRepository, siteUrl, "PowerBaseFit");
    if (metadata.alternates?.canonical !== `${siteUrl}${version.publicPath}`) failures.push(`${label}: canonical mismatch`);
    const languages = metadata.alternates?.languages as Record<string, string | URL | null> | undefined;
    for (const target of locales) {
      const targetVersion = entity.versions[target.internalLocale];
      if (targetVersion && languages?.[target.hreflang]?.toString() !== `${siteUrl}${targetVersion.publicPath}`) failures.push(`${label}: missing ${target.hreflang} hreflang`);
    }
    if (languages?.["x-default"]?.toString() !== `${siteUrl}${entity.versions.en?.publicPath}`) failures.push(`${label}: incorrect x-default`);
    const graph = buildLocalizedSchemaGraph(published, siteUrl);
    const types = graph.map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList"]) if (!types.includes(required)) failures.push(`${label}: missing ${required} schema`);
    if (types.filter((type) => type === "ImageObject").length !== 3) failures.push(`${label}: ImageObject count mismatch`);

    for (const other of allPublished.filter(({ entity: otherEntity, version: otherVersion }) => otherEntity.id !== entityId && otherEntity.type === "blog" && otherVersion.locale === locale)) {
      if (other.version.title.trim().toLocaleLowerCase() === version.title.trim().toLocaleLowerCase()) failures.push(`${label}: title collision with ${other.entity.id}`);
      if (other.version.h1.trim().toLocaleLowerCase() === version.h1.trim().toLocaleLowerCase()) failures.push(`${label}: H1 collision with ${other.entity.id}`);
      if (other.version.schemaData.extra?.primaryKeyword === version.schemaData.extra?.primaryKeyword) failures.push(`${label}: keyword collision with ${other.entity.id}`);
      if (similarity(`${version.title} ${version.h1}`, `${other.version.title} ${other.version.h1}`) >= 0.8) failures.push(`${label}: possible topic collision with ${other.entity.id}`);
    }
    if (locale === "en") for (const post of legacyPosts.filter((post) => `/resources/${post.slug}` !== version.publicPath)) {
      if (post.primaryKeyword === version.schemaData.extra?.primaryKeyword || similarity(`${version.title} ${version.h1}`, `${post.seoTitle} ${post.title}`) >= 0.8) failures.push(`${label}: legacy post conflict ${post.slug}`);
    }
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Plate-and-bar fit audit passed: ${locales.length} localized editions, distinct heroes, 8 FAQs, metadata, links, assets and schemas.`);
