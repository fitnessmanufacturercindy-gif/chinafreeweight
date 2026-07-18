import { getMultilingualBlogDocuments } from "../lib/content/multilingual-blog-files";
import { contentRepository } from "../lib/content/repository";

const baseUrl = (process.env.BASE_URL ?? "http://127.0.0.1:3000").replace(/\/$/, "");
const canonicalOrigin = "https://www.chinafreeweight.com";
const documents = getMultilingualBlogDocuments();
const errors: string[] = [];
const statusCache = new Map<string, number>();

const check = (condition: unknown, message: string) => {
  if (!condition) errors.push(message);
};
const statusFor = async (path: string) => {
  const url = new URL(path, `${baseUrl}/`).toString();
  if (!statusCache.has(url)) statusCache.set(url, (await fetch(url, { redirect: "manual" })).status);
  return statusCache.get(url) ?? 0;
};
const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

async function main() {
for (const document of documents) {
  const label = `${document.locale} ${document.publicPath}`;
  const response = await fetch(new URL(document.publicPath, `${baseUrl}/`), { redirect: "manual" });
  const html = await response.text();
  check(response.status === 200, `${label}: HTTP ${response.status}`);
  check(response.headers.get("content-type")?.includes("text/html"), `${label}: non-HTML response`);
  check(new RegExp(`<html[^>]+lang=["']${escapeRegExp(document.locale)}["']`, "i").test(html), `${label}: html lang mismatch`);
  check((html.match(/<h1\b/gi) ?? []).length === 1, `${label}: expected exactly one H1`);
  check(html.includes(`<title>${document.title}</title>`), `${label}: title mismatch`);
  check(html.includes(`content="${document.description}"`), `${label}: meta description mismatch`);
  check(html.includes(`rel="canonical" href="${canonicalOrigin}${document.publicPath}"`), `${label}: canonical mismatch`);
  for (const hreflang of ["en", "pt-BR", "es", "x-default"]) {
    check(new RegExp(`hreflang=["']${hreflang}["']`, "i").test(html), `${label}: missing hreflang ${hreflang}`);
  }
  for (const type of ["BlogPosting", "FAQPage", "BreadcrumbList"]) {
    check(html.includes(`"@type":"${type}"`), `${label}: missing ${type} schema`);
  }
  check(html.includes(`"inLanguage":"${document.locale}"`), `${label}: schema language mismatch`);
  check(!/(?:Runtime Error|Application error|Cannot find module|nextjs-portal)/i.test(html), `${label}: framework error marker`);

  for (const image of document.images) {
    check(html.includes(image.src), `${label}: image absent from HTML ${image.src}`);
    check(html.includes(image.alt), `${label}: alt absent from HTML ${image.alt}`);
    check((await statusFor(image.src)) === 200, `${label}: image HTTP failure ${image.src}`);
  }
  for (const link of document.internalLinks) {
    const target = contentRepository.getPublishedVersion(link.targetContentId, document.locale)?.version.publicPath;
    check(Boolean(target), `${label}: unresolved entity ${link.targetContentId}`);
    if (target) check((await statusFor(target)) === 200, `${label}: linked route failed ${target}`);
  }
  for (const match of document.content.matchAll(/\[[^\]]+\]\((\/[^)]+)\)/g)) {
    check((await statusFor(match[1])) === 200, `${label}: inline route failed ${match[1]}`);
  }
}

for (const sitemapPath of ["/sitemap.xml", "/sitemaps/blogs.xml", "/sitemaps/languages.xml"]) {
  const response = await fetch(new URL(sitemapPath, `${baseUrl}/`));
  const xml = await response.text();
  check(response.status === 200, `${sitemapPath}: HTTP ${response.status}`);
  for (const document of documents) {
    check(xml.includes(`${canonicalOrigin}${document.publicPath}`) || sitemapPath === "/sitemap.xml", `${sitemapPath}: missing ${document.publicPath}`);
  }
}

if (errors.length) {
  console.error(`Rendered page audit failed for ${baseUrl} with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`PASS: ${documents.length}/30 rendered article URLs returned 200 at ${baseUrl}`);
console.log(`PASS: HTML language, H1, metadata, canonical, hreflang, schemas, images, links, and sitemap coverage`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
