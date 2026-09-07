import fs from "node:fs";
import path from "node:path";
import { multilingualManifest } from "../content/i18n/multilingual-manifest";
import { getPublishedLocaleDefinitions } from "../i18n/locale-registry";
import { createContentRepository } from "../lib/content/repository";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";
import type { LocalizedContentVersion } from "../lib/content/types";

const entityId = "bulk-oem-steel-dumbbells-guide";
const siteUrl = "https://www.chinafreeweight.com";
const failures: string[] = [];
const repository = createContentRepository(multilingualManifest);
const entity = multilingualManifest.entities.find((item) => item.id === entityId);
const publicLocaleDefinitions = getPublishedLocaleDefinitions();
const forbidden = /(?:\bSEO\b|\bGEO\b|\bAIO\b|AI Search|ChatGPT|Gemini|Perplexity|\bDraft\b|Internal note|Placeholder|Generated content|\bTBD\b|\bXXX\b|Lorem ipsum)/giu;
const editorialMarkers = /(?:\bTODO\b|\bTBD\b|\bXXX\b)/gu;
const publicAnalysisMarkers = /(?:what (?:the )?production photographs? (?:actually )?(?:show|prove)|does not (?:establish|prove)|cannot prove|inferred from (?:a )?photograph|qué muestran realmente las fotografías|no puede demostrarse en una imagen|o que as fotos reais de produção mostram|fotos belegen nur|ce que prouvent les photos|che cosa dimostrano le fotografie|vad produktionsbilderna faktiskt visar|ảnh sản xuất thực tế cho thấy|사진에서 확인할 수 있는 사실|fakta yang terlihat pada foto|co potwierdzają rzeczywiste zdjęcia|wat de echte productiefoto's bewijzen|ما الذي تثبته صور الإنتاج)/giu;

function visibleText(version: LocalizedContentVersion): string {
  return [
    version.title,
    version.description,
    version.h1,
    ...version.body.flatMap((block) => [
      block.heading ?? "",
      block.content ?? "",
      ...(Array.isArray(block.data?.items) ? block.data.items.map(String) : []),
      ...(Array.isArray(block.data?.columns) ? block.data.columns.map(String) : []),
      ...(Array.isArray(block.data?.rows) ? block.data.rows.flat().map(String) : [])
    ]),
    ...version.faq.flatMap((item) => [item.question, item.answer]),
    ...version.images.flatMap((image) => [image.alt, image.caption ?? ""]),
    ...version.internalLinks.map((link) => link.label),
    JSON.stringify(version.schemaData.extra ?? {})
  ].join("\n");
}

function wordCount(value: string): number {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}

if (!entity) {
  failures.push(`${entityId}: content entity is missing`);
} else {
  const expectedLocales = publicLocaleDefinitions.map((locale) => locale.internalLocale).sort();
  const actualLocales = Object.keys(entity.versions).sort();
  if (actualLocales.join("|") !== expectedLocales.join("|")) {
    failures.push(`locale coverage mismatch: expected ${expectedLocales.join(", ")}; found ${actualLocales.join(", ")}`);
  }

  const paths = new Set<string>();
  const titles = new Set<string>();
  const descriptions = new Set<string>();

  for (const locale of expectedLocales) {
    const version = entity.versions[locale];
    if (!version) continue;
    const label = `${entityId}:${locale}`;
    const text = visibleText(version);
    const matches = [
      ...(text.match(forbidden) ?? []),
      ...(text.match(editorialMarkers) ?? []),
      ...(text.match(publicAnalysisMarkers) ?? [])
    ];

    if (version.publishStatus !== "published" || version.reviewStatus !== "approved" || !["approved", "localized"].includes(version.translationStatus)) {
      failures.push(`${label}: publication status is not fully approved`);
    }
    if (!version.publishedAt) failures.push(`${label}: publication date is missing`);
    if (version.canonicalData.mode !== "self" || version.canonicalData.noindex) failures.push(`${label}: canonical/indexing state is invalid`);
    if (!version.hreflangData.include) failures.push(`${label}: hreflang participation is disabled`);
    if (paths.has(version.publicPath)) failures.push(`${label}: duplicate path ${version.publicPath}`);
    paths.add(version.publicPath);

    const normalizedTitle = version.title.trim().toLocaleLowerCase();
    const normalizedDescription = version.description.trim().toLocaleLowerCase();
    if (titles.has(normalizedTitle)) failures.push(`${label}: duplicate title`);
    if (descriptions.has(normalizedDescription)) failures.push(`${label}: duplicate description`);
    titles.add(normalizedTitle);
    descriptions.add(normalizedDescription);

    if (locale === "en") {
      const words = wordCount(text);
      if (words < 2500 || words > 4000) failures.push(`${label}: English length is ${words} words`);
    } else if (text.replace(/\s/gu, "").length < 2500) {
      failures.push(`${label}: localized article is not sufficiently substantial`);
    }

    if (version.faq.length < 8) failures.push(`${label}: only ${version.faq.length} FAQs`);
    if (version.images.length < 5 || version.images.length > 8) failures.push(`${label}: image count is ${version.images.length}`);
    if (matches?.length) failures.push(`${label}: prohibited visible wording: ${[...new Set(matches)].join(", ")}`);

    for (const image of version.images) {
      const webpPath = path.join(process.cwd(), "public", image.src.replace(/^\//u, ""));
      const avifPath = webpPath.replace(/\.webp$/u, ".avif");
      if (!fs.existsSync(webpPath)) failures.push(`${label}: missing ${image.src}`);
      if (!fs.existsSync(avifPath)) failures.push(`${label}: missing AVIF for ${image.src}`);
      if (!image.width || !image.height || !image.alt.trim() || !image.caption?.trim()) failures.push(`${label}: incomplete image metadata for ${image.src}`);
      if (fs.existsSync(webpPath) && fs.statSync(webpPath).size > 160_000) failures.push(`${label}: WebP exceeds 160 KB: ${image.src}`);
    }

    for (const link of version.internalLinks) {
      if (!repository.getPublishedVersion(link.targetContentId, locale)) failures.push(`${label}: unresolved internal target ${link.targetContentId}`);
    }

    const graph = buildLocalizedSchemaGraph({ entity, version }, siteUrl);
    const types = graph.map((node) => node["@type"]);
    for (const required of ["BlogPosting", "FAQPage", "BreadcrumbList"]) {
      if (!types.includes(required)) failures.push(`${label}: missing ${required} schema`);
    }
    if (types.filter((type) => type === "ImageObject").length !== version.images.length) failures.push(`${label}: ImageObject count mismatch`);

    const backlink = multilingualManifest.entities.some((source) => {
      if (source.id === entityId) return false;
      return source.versions[locale]?.internalLinks.some((link) => link.targetContentId === entityId);
    });
    if (!backlink) failures.push(`${label}: no localized inbound internal link`);
  }
}

const releaseDirectories = [
  path.join(process.cwd(), "public", "assets", "resources", "steel-dumbbells"),
  path.join(process.cwd(), "content", "i18n")
];
for (const directory of releaseDirectories) {
  for (const filename of fs.readdirSync(directory)) {
    if (/(?:\.draft(?:\.|$)|\.tmp$|\.bak$|^notes?(?:\.|$))/iu.test(filename)) failures.push(`non-release file: ${path.join(directory, filename)}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Steel dumbbell article audit passed: ${publicLocaleDefinitions.length} published locales, 5 optimized images per locale.`);
