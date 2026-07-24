import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { getMultilingualBlogDocuments } from "../lib/content/multilingual-blog-files";
import { contentRepository } from "../lib/content/repository";
import { buildLocalizedMetadata } from "../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../lib/seo/schema";

const siteUrl = "https://www.chinafreeweight.com";
const documents = getMultilingualBlogDocuments();
const errors: string[] = [];
const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};

const expectedLocales = ["en", "pt-BR", "es"] as const;
const expectedHreflangSignature = ["en", "pt-BR", "es", "de", "fr", "vi", "sv", "it", "ko", "id", "pl", "nl", "x-default"].sort().join(",");
const localePath = {
  en: /^\/resources\/[a-z0-9-]+$/,
  "pt-BR": /^\/pt\/blog\/[a-z0-9-]+$/,
  es: /^\/es\/blog\/[a-z0-9-]+$/
};
const requiredHeadings = {
  en: [/quick answer/i, /definition/i, /checklist/i, /conclusion/i],
  "pt-BR": [/resposta rápida/i, /definição/i, /checklist/i, /conclusão/i],
  es: [/respuesta rápida/i, /definición/i, /(?:lista de comprobación|checklist)/i, /conclusión/i]
};

check(documents.length === 30, `Expected 30 documents, found ${documents.length}`);
check(new Set(documents.map((document) => document.entityId)).size === 10, "Expected 10 trilingual entities");
for (const locale of expectedLocales) {
  check(documents.filter((document) => document.locale === locale).length === 10, `${locale}: expected 10 documents`);
}

const uniqueFields = ["publicPath", "title", "description", "h1"] as const;
for (const field of uniqueFields) {
  const values = documents.map((document) => document[field].toLowerCase());
  check(new Set(values).size === values.length, `${field}: values must be unique across the 30-document release`);
}

for (const document of documents) {
  const label = `${document.locale} ${document.publicPath}`;
  const locale = document.locale as keyof typeof localePath;
  const wordCount = document.content.split(/\s+/).filter(Boolean).length;
  check(wordCount >= 1200 && wordCount <= 2500, `${label}: ${wordCount} words outside 1200-2500`);
  check(Boolean(localePath[locale]?.test(document.publicPath)), `${label}: invalid localized URL pattern`);
  check(document.title.length >= 35 && document.title.length <= 75, `${label}: title length ${document.title.length}`);
  check(document.description.length >= 110 && document.description.length <= 180, `${label}: description length ${document.description.length}`);
  check(document.primaryKeyword.length >= 8, `${label}: missing primary keyword`);
  check(document.secondaryKeywords.length >= 3, `${label}: fewer than three secondary keywords`);
  check(document.images.length >= 2 && document.images.length <= 3, `${label}: expected 2-3 images`);
  check(document.faq.length >= 5, `${label}: expected at least five FAQs`);
  check(document.internalLinks.length >= 4, `${label}: expected at least four internal links`);
  check(/\]\(\/[^)]+\)/.test(document.content), `${label}: no contextual inline link`);
  check(!/(?:AI[- ]generated prompt|SEO analysis|developer note|draft marker|backend instruction)/i.test(document.content), `${label}: editorial-only phrase found`);

  const headings = document.body.map((block) => block.heading ?? "").join("\n");
  for (const pattern of requiredHeadings[locale] ?? []) {
    check(pattern.test(headings), `${label}: missing required section ${pattern}`);
  }

  for (const image of document.images) {
    check(existsSync(join(process.cwd(), "public", image.src.replace(/^\//, ""))), `${label}: missing image ${image.src}`);
    check(image.alt.length >= 35, `${label}: image alt is too short: ${image.alt}`);
    check(image.caption.length >= 35, `${label}: image caption is too short`);
    check(/^\/[a-z0-9/_-]+\.(?:webp|avif|jpg|jpeg|png)$/i.test(image.src), `${label}: non-SEO image path ${image.src}`);
  }

  for (const link of document.internalLinks) {
    check(Boolean(contentRepository.getPublishedVersion(link.targetContentId, document.locale)), `${label}: unresolved entity link ${link.targetContentId}`);
  }
  for (const match of document.content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)) {
    check(Boolean(contentRepository.resolvePublishedPath(document.locale, match[1])), `${label}: unresolved inline link ${match[1]}`);
  }

  const content = contentRepository.getPublishedVersion(document.entityId, document.locale);
  check(Boolean(content), `${label}: not published in repository`);
  if (!content) continue;
  const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
  check(metadata.alternates?.canonical === `${siteUrl}${document.publicPath}`, `${label}: canonical mismatch`);
  const languages = metadata.alternates?.languages ?? {};
  check(Object.keys(languages).sort().join(",") === expectedHreflangSignature, `${label}: incomplete hreflang cluster`);
  const graph = buildLocalizedSchemaGraph(content, siteUrl);
  const language = document.locale;
  check(graph.some((node) => node["@type"] === "BlogPosting" && node.inLanguage === language), `${label}: BlogPosting schema/language missing`);
  check(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === language), `${label}: FAQ schema/language missing`);
  check(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === language), `${label}: Breadcrumb schema/language missing`);
}

for (const entityId of new Set(documents.map((document) => document.entityId))) {
  const cluster = documents.filter((document) => document.entityId === entityId);
  check(cluster.length === 3 && expectedLocales.every((locale) => cluster.some((document) => document.locale === locale)), `${entityId}: incomplete locale cluster`);
}

const normalizeWords = (text: string) => text.toLowerCase().replace(/[^a-záéíóúüñãõç0-9 ]/g, " ").split(/\s+/).filter(Boolean);
const grams = (text: string) => {
  const words = normalizeWords(text);
  return new Set(words.slice(0, -6).map((_, index) => words.slice(index, index + 7).join(" ")));
};
for (const locale of expectedLocales) {
  const localized = documents.filter((document) => document.locale === locale);
  for (let leftIndex = 0; leftIndex < localized.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < localized.length; rightIndex += 1) {
      const left = grams(localized[leftIndex].content);
      const right = grams(localized[rightIndex].content);
      const overlap = [...left].filter((value) => right.has(value)).length / Math.max(1, new Set([...left, ...right]).size);
      check(overlap < 0.2, `${locale}: duplicate-content risk ${localized[leftIndex].entityId}/${localized[rightIndex].entityId} (${overlap.toFixed(3)})`);
    }
  }
}

if (errors.length) {
  console.error(`Multilingual blog audit failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

const counts = Object.fromEntries(expectedLocales.map((locale) => [locale, documents.filter((document) => document.locale === locale).length]));
assert.deepEqual(counts, { en: 10, "pt-BR": 10, es: 10 });
console.log(`PASS: ${documents.length} articles / 10 trilingual clusters`);
console.log("PASS: word count, unique metadata, localized URLs, images, FAQs, sections, links, canonical, hreflang, schema, and duplicate-risk checks");
