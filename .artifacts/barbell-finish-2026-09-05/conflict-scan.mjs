import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "barbell-finish-2026-09-05");
fs.mkdirSync(outputDir, { recursive: true });

const terms = /barbell|olympic bar|barra ol[ií]mpica|langhantel|barre olympique|đòn tạ|skivstång|bilanciere|halterstang|البار الأولمبي|바벨|barbel olimpik|gryf olimpijski|chrome|chrom|cromo|zinc|zinco|zink|cerakote|oxide|oxid|powłok|coating|finish|acabamento|acabado|beschichtung|revêtement|lớp phủ|ytbehandling|finitura|طلاء|코팅|lapisan/iu;
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
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split(/\r?\n/u);
  lines.forEach((line, index) => {
    if (terms.test(line)) repositoryMatches.push({ file: path.relative(root, file).replaceAll("\\", "/"), line: index + 1, text: line.trim().slice(0, 500) });
    terms.lastIndex = 0;
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
      terms.lastIndex = 0;
    } catch (error) {
      livePages.push({ url, status: 0, error: error.message });
    }
  }
});
await Promise.all(workers);

const report = { checkedAt: new Date().toISOString(), totalRepositoryFiles: contentFiles.length, repositoryMatches, totalLiveUrls: urls.length, livePages };
fs.writeFileSync(path.join(outputDir, "conflict-scan.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ totalRepositoryFiles: contentFiles.length, repositoryMatches: repositoryMatches.length, totalLiveUrls: urls.length, liveMatches: livePages.length }, null, 2));
