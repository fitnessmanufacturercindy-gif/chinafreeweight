import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "plate-bar-fit-2026-09-06");
fs.mkdirSync(outputDir, { recursive: true });

const terms = /plate (?:hole|bore)|center hole|centre hole|collar opening|sleeve (?:diameter|fit)|50(?:\.|\s)?(?:0|4|6)?\s?mm|2[ -]?inch|furo (?:central|da anilha)|agujero (?:central|del disco)|Hantelscheibe.*Bohrung|alésage.*disque|lỗ.*bánh tạ|viktskiva.*hål|foro.*disco|halterschijf.*boring|فتحة.*قرص|원판.*구멍|lubang.*plate|otwór.*talerza/iu;
const contentFiles = [];
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (/\.(md|ts|tsx|json)$/u.test(entry.name)) contentFiles.push(full);
  }
};
for (const relative of ["content", "app/resources"]) walk(path.join(root, relative));

const repositoryMatches = [];
for (const file of contentFiles) {
  const lines = fs.readFileSync(file, "utf8").split(/\r?\n/u);
  lines.forEach((line, index) => {
    if (terms.test(line)) repositoryMatches.push({ file: path.relative(root, file).replaceAll("\\", "/"), line: index + 1, text: line.trim().slice(0, 500) });
  });
}

const parseLocs = (xml) => [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/giu)].map((match) => match[1].trim());
const site = "https://www.chinafreeweight.com";
const sitemapIndex = await fetch(`${site}/sitemap-index.xml`).then((response) => response.text());
const sitemapUrls = parseLocs(sitemapIndex);
const pageUrls = new Set([site]);
for (const sitemapUrl of sitemapUrls) {
  const xml = await fetch(sitemapUrl).then((response) => response.text());
  for (const url of parseLocs(xml)) if (!url.endsWith(".xml")) pageUrls.add(url);
}

const urls = [...pageUrls];
const livePages = [];
let cursor = 0;
const workers = Array.from({ length: 16 }, async () => {
  while (cursor < urls.length) {
    const url = urls[cursor++];
    try {
      const response = await fetch(url);
      const html = await response.text();
      const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/iu)?.[1]?.replace(/<[^>]+>/gu, "").trim() ?? "";
      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/iu)?.[1]?.replace(/<[^>]+>/gu, " ").replace(/\s+/gu, " ").trim() ?? "";
      const description = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)/iu)?.[1] ?? html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/iu)?.[1] ?? "";
      if (terms.test(`${url}\n${title}\n${h1}\n${description}`)) livePages.push({ url, status: response.status, title, h1, description });
    } catch (error) {
      livePages.push({ url, status: 0, error: error.message });
    }
  }
});
await Promise.all(workers);

const report = { checkedAt: new Date().toISOString(), totalRepositoryFiles: contentFiles.length, repositoryMatches, totalLiveUrls: urls.length, livePages };
fs.writeFileSync(path.join(outputDir, "conflict-scan.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ totalRepositoryFiles: contentFiles.length, repositoryMatches: repositoryMatches.length, totalLiveUrls: urls.length, liveMatches: livePages.length }, null, 2));
