import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE_URL = (process.env.QUALITY_GATE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const PUBLIC_SITE_URL = (process.env.QUALITY_GATE_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "d787e9478e6f40c6f5b2e42327a8f7ab";
const REPORT_DIR = path.join(ROOT, "reports", "quality-gate");
const DATE_ID = new Date().toISOString().replace(/[:.]/g, "-");
const REPORT_JSON = path.join(REPORT_DIR, `${DATE_ID}-quality-gate.json`);
const REPORT_MD = path.join(REPORT_DIR, `${DATE_ID}-quality-gate.md`);
const LIGHTHOUSE_RUNS = Math.max(1, Number(process.env.QUALITY_GATE_LIGHTHOUSE_RUNS || 3));

const thresholds = {
  performance: Number(process.env.QUALITY_GATE_MIN_PERFORMANCE || 90),
  seo: Number(process.env.QUALITY_GATE_MIN_SEO || 100),
  lcp: Number(process.env.QUALITY_GATE_MAX_LCP_MS || 2500),
  cls: Number(process.env.QUALITY_GATE_MAX_CLS || 0.1),
  tbt: Number(process.env.QUALITY_GATE_MAX_TBT_MS || 300),
  imageWarnBytes: Number(process.env.QUALITY_GATE_IMAGE_WARN_BYTES || 150 * 1024),
  nextChunkBytes: Number(process.env.QUALITY_GATE_MAX_NEXT_CHUNK_BYTES || 2 * 1024 * 1024),
  blockTbt: process.env.QUALITY_GATE_BLOCK_TBT === "1"
};

const requiredEndpoints = [
  "/robots.txt",
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/sitemaps/products.xml",
  "/sitemaps/blogs.xml",
  "/sitemaps/images.xml",
  "/sitemaps/videos.xml",
  "/sitemaps/languages.xml",
  "/llms.txt",
  `/${INDEXNOW_KEY}.txt`
];

function issue(level, area, message, details = {}) {
  return { level, area, message, details };
}
const fail = (area, message, details) => issue("fail", area, message, details);
const warn = (area, message, details) => issue("warn", area, message, details);
const unique = (values) => [...new Set(values.filter(Boolean))];

function toUrl(href, pageUrl = BASE_URL) {
  try {
    const url = new URL(href, pageUrl);
    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

function isHttpUrl(url) {
  return url?.protocol === "http:" || url?.protocol === "https:";
}

function isSameOrigin(url) {
  if (!isHttpUrl(url)) return false;
  return [new URL(BASE_URL).origin, new URL(PUBLIC_SITE_URL).origin].includes(url.origin);
}

function toLocalUrlString(url) {
  const parsed = typeof url === "string" ? toUrl(url) : url;
  if (!parsed) return null;
  const base = new URL(BASE_URL);
  parsed.protocol = base.protocol;
  parsed.host = base.host;
  return parsed.toString();
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { ok: response.ok, status: response.status, url: response.url, text: await response.text(), headers: response.headers };
}

async function fetchHeadOrGet(url) {
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (response.status === 405 || response.status === 403) response = await fetch(url, { method: "GET", redirect: "follow" });
    return response;
  } catch {
    return null;
  }
}

function attrTags(html, tag, attr) {
  const tagPattern = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const attrPattern = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, "i");
  return [...html.matchAll(tagPattern)].map((match) => match[0].match(attrPattern)?.[1]).filter(Boolean);
}

function extractLinks(html) {
  return [
    ...attrTags(html, "a", "href"),
    ...attrTags(html, "link", "href").filter((href) => !href.startsWith("/_next/"))
  ].filter((href) => !href.startsWith("/_next/"));
}

function extractImageUrls(html, pageUrl) {
  return unique([
    ...attrTags(html, "img", "src"),
    ...attrTags(html, "source", "srcset").flatMap((srcset) => srcset.split(",").map((part) => part.trim().split(/\s+/)[0]))
  ])
    .map((src) => toUrl(src, pageUrl))
    .filter(isSameOrigin)
    .map((url) => url.toString());
}

function parseLocs(xml) {
  return unique([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1].trim()));
}

function metadataFromHtml(html) {
  return {
    title: html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "",
    description:
      html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() ||
      html.match(/<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i)?.[1]?.trim() ||
      "",
    canonical: html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "",
    h1Count: [...html.matchAll(/<h1\b/gi)].length,
    robots: html.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || ""
  };
}

function parseJsonLd(html) {
  return [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((match) => {
    try {
      return { ok: true, value: JSON.parse(match[1].trim()) };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  });
}

function flattenSchemaTypes(value) {
  const types = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    if (node["@type"]) {
      if (Array.isArray(node["@type"])) types.push(...node["@type"]);
      else types.push(node["@type"]);
    }
    if (node["@graph"]) visit(node["@graph"]);
  };
  visit(value);
  return unique(types);
}

function lighthouseArgs(url, formFactor, outputPath) {
  const mobile = formFactor === "mobile";
  const args = [
    url,
    "--quiet",
    "--only-categories=performance,seo",
    `--form-factor=${formFactor}`,
    `--screenEmulation.mobile=${mobile}`,
    `--screenEmulation.width=${mobile ? 390 : 1440}`,
    `--screenEmulation.height=${mobile ? 844 : 1000}`,
    `--screenEmulation.deviceScaleFactor=${mobile ? 2 : 1}`,
    "--chrome-flags=--headless=new --no-sandbox",
    "--output=json",
    `--output-path=${outputPath}`
  ];
  if (!mobile) args.splice(3, 0, "--preset=desktop");
  return args;
}

function runLighthouseOnce(formFactor, runNumber) {
  const outputPath = path.join(REPORT_DIR, `${DATE_ID}-lighthouse-${formFactor}-${runNumber}.json`);
  try {
    execFileSync(process.execPath, [path.join(ROOT, "node_modules", "lighthouse", "cli", "index.js"), ...lighthouseArgs(`${BASE_URL}/`, formFactor, outputPath)], { cwd: ROOT, stdio: "inherit", shell: false });
  } catch (error) {
    if (!fs.existsSync(outputPath)) throw error;
    console.warn(`Lighthouse ${formFactor} exited after writing ${outputPath}. Continuing.`);
  }
  const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const audits = report.audits;
  const networkItems = audits["network-requests"]?.details?.items || [];
  return {
    formFactor,
    runNumber,
    outputPath: path.relative(ROOT, outputPath),
    performance: Math.round((report.categories.performance?.score || 0) * 100),
    seo: Math.round((report.categories.seo?.score || 0) * 100),
    fcp: audits["first-contentful-paint"]?.numericValue,
    lcp: audits["largest-contentful-paint"]?.numericValue,
    tbt: audits["total-blocking-time"]?.numericValue,
    cls: audits["cumulative-layout-shift"]?.numericValue,
    speedIndex: audits["speed-index"]?.numericValue,
    networkCount: networkItems.length,
    networkBytes: networkItems.reduce((sum, item) => sum + (item.transferSize || 0), 0)
  };
}

function median(values) {
  return [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
}

function medianRun(formFactor) {
  const runs = Array.from({ length: LIGHTHOUSE_RUNS }, (_, index) => runLighthouseOnce(formFactor, index + 1));
  const performance = median(runs.map((run) => run.performance));
  const lcp = median(runs.map((run) => run.lcp));
  const representative = runs.map((run) => ({ run, distance: Math.abs(run.performance - performance) + Math.abs(run.lcp - lcp) / 1000 })).sort((a, b) => a.distance - b.distance)[0].run;
  return { ...representative, performance, seo: median(runs.map((run) => run.seo)), fcp: median(runs.map((run) => run.fcp)), lcp, tbt: median(runs.map((run) => run.tbt)), cls: median(runs.map((run) => run.cls)), speedIndex: median(runs.map((run) => run.speedIndex)), networkCount: median(runs.map((run) => run.networkCount)), networkBytes: median(runs.map((run) => run.networkBytes)), runs };
}

async function checkMachineEndpoints(issues) {
  const endpoints = [];
  for (const endpoint of requiredEndpoints) {
    const response = await fetchText(`${BASE_URL}${endpoint}`).catch((error) => ({ ok: false, status: 0, text: "", error }));
    endpoints.push({ endpoint, status: response.status, ok: response.ok });
    if (!response.ok) issues.push(fail("technical-seo", `${endpoint} is not reachable`));
    if (response.ok && endpoint.endsWith(".xml") && !/<loc>/.test(response.text)) issues.push(fail("sitemap", `${endpoint} has no <loc> entries`));
    if (response.ok && endpoint === "/robots.txt" && /Host:\s*https?:\/\//i.test(response.text)) issues.push(fail("robots", "robots.txt contains invalid Host directive"));
    if (response.ok && endpoint === "/llms.txt" && !/PowerBaseFit/i.test(response.text)) issues.push(fail("ai-search", "llms.txt is missing brand context"));
    if (response.ok && endpoint.endsWith(`${INDEXNOW_KEY}.txt`) && response.text.trim() !== INDEXNOW_KEY) issues.push(fail("indexnow", "IndexNow key content mismatch"));
  }
  return endpoints;
}

async function discoverUrls(issues) {
  const urls = [];
  for (const sitemapUrl of [`${BASE_URL}/sitemap.xml`, `${BASE_URL}/sitemap-index.xml`]) {
    const sitemap = await fetchText(sitemapUrl).catch((error) => ({ ok: false, status: 0, text: "", error }));
    if (!sitemap.ok) {
      issues.push(fail("sitemap", `${sitemapUrl} is not reachable`));
      continue;
    }
    const locs = parseLocs(sitemap.text);
    for (const loc of locs) {
      const local = toLocalUrlString(loc);
      if (!local) continue;
      if (local.endsWith(".xml")) {
        const child = await fetchText(local).catch(() => ({ ok: false, text: "" }));
        if (child.ok) urls.push(...parseLocs(child.text).map(toLocalUrlString).filter(Boolean).filter((url) => !url.endsWith(".xml")));
      } else {
        urls.push(local);
      }
    }
  }
  if (!urls.length) issues.push(fail("sitemap", "No same-origin URLs discovered from sitemap"));
  return unique([`${BASE_URL}/`, ...urls]);
}

async function checkPages(urls, issues) {
  const linkTargets = new Map();
  const imageTargets = new Map();
  const pages = [];
  for (const url of urls) {
    const page = await fetchText(url).catch((error) => ({ ok: false, status: 0, text: "", error }));
    const result = { url, status: page.status, ok: page.ok, title: "", canonical: "", h1Count: 0, schemaTypes: [] };
    pages.push(result);
    if (!page.ok) {
      issues.push(fail("availability", `${url} returned ${page.status || "request failed"}`));
      continue;
    }
    const meta = metadataFromHtml(page.text);
    Object.assign(result, { title: meta.title, canonical: meta.canonical, h1Count: meta.h1Count });
    if (!meta.title || meta.title.length < 8) issues.push(fail("metadata", `${url} is missing a useful title`));
    if (!meta.description || meta.description.length < 40) issues.push(fail("metadata", `${url} is missing a useful meta description`));
    if (meta.h1Count !== 1) issues.push(fail("metadata", `${url} has ${meta.h1Count} H1 elements`));
    if (/noindex/i.test(meta.robots)) issues.push(fail("metadata", `${url} contains noindex`));
    const canonicalUrl = meta.canonical ? toUrl(meta.canonical, url) : null;
    if (!canonicalUrl) issues.push(fail("canonical", `${url} is missing canonical`));
    else if (!isSameOrigin(canonicalUrl)) issues.push(fail("canonical", `${url} canonical is off-site: ${meta.canonical}`));
    else if (canonicalUrl.pathname.replace(/\/$/, "") !== new URL(url).pathname.replace(/\/$/, "")) issues.push(fail("canonical", `${url} canonical path does not match`));
    const jsonLd = parseJsonLd(page.text);
    if (!jsonLd.length) issues.push(warn("schema", `${url} has no JSON-LD schema`));
    for (const item of jsonLd) {
      if (!item.ok) issues.push(fail("schema", `${url} has invalid JSON-LD: ${item.error}`));
      else result.schemaTypes.push(...flattenSchemaTypes(item.value));
    }
    result.schemaTypes = unique(result.schemaTypes);
    for (const href of extractLinks(page.text)) {
      const target = toUrl(href, url);
      if (isSameOrigin(target)) linkTargets.set(toLocalUrlString(target), { from: url });
    }
    for (const imageUrl of extractImageUrls(page.text, url)) imageTargets.set(imageUrl, { from: url });
  }
  return { pages, linkTargets, imageTargets };
}

async function checkLinks(linkTargets, issues) {
  for (const [url, meta] of linkTargets.entries()) {
    const response = await fetchHeadOrGet(url);
    if (!response || response.status >= 400) issues.push(fail("broken-links", `${meta.from} links to ${url}, which returned ${response?.status || "request failed"}`));
  }
}

async function checkImages(imageTargets, issues) {
  const images = [];
  for (const [url, meta] of imageTargets.entries()) {
    const response = await fetchHeadOrGet(url);
    if (!response || response.status >= 400) {
      issues.push(fail("images", `${meta.from} references broken image ${url}`));
      continue;
    }
    const size = Number(response.headers.get("content-length") || 0);
    const image = { url, from: meta.from, size, contentType: response.headers.get("content-type") || "" };
    images.push(image);
    if (size >= thresholds.imageWarnBytes) issues.push(warn("images", `Image is large (${Math.round(size / 1024)}KB): ${url}`, image));
  }
  return images.sort((a, b) => b.size - a.size);
}

function checkBundle(issues) {
  const staticDir = path.join(ROOT, ".next", "static", "chunks");
  if (!fs.existsSync(staticDir)) {
    issues.push(fail("bundle", ".next/static/chunks does not exist. Run npm run build before quality gate."));
    return { chunkBytes: 0, files: [] };
  }
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && entry.name.endsWith(".js")) files.push({ path: path.relative(ROOT, full), size: fs.statSync(full).size });
    }
  };
  walk(staticDir);
  const chunkBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (chunkBytes > thresholds.nextChunkBytes) issues.push(fail("bundle", `Built JS chunks are too large: ${Math.round(chunkBytes / 1024)}KB`));
  return { chunkBytes, files: files.sort((a, b) => b.size - a.size).slice(0, 20) };
}

function checkLighthouseThresholds(lighthouse, issues) {
  for (const run of lighthouse) {
    if (run.performance < thresholds.performance) issues.push(fail("lighthouse", `${run.formFactor} Performance ${run.performance} < ${thresholds.performance}`, run));
    if (run.seo < thresholds.seo) issues.push(fail("lighthouse", `${run.formFactor} SEO ${run.seo} < ${thresholds.seo}`, run));
    if (run.lcp > thresholds.lcp) issues.push(fail("core-web-vitals", `${run.formFactor} LCP ${Math.round(run.lcp)}ms > ${thresholds.lcp}ms`, run));
    if (run.cls > thresholds.cls) issues.push(fail("core-web-vitals", `${run.formFactor} CLS ${run.cls} > ${thresholds.cls}`, run));
    if (run.tbt > thresholds.tbt) issues.push((thresholds.blockTbt ? fail : warn)("core-web-vitals", `${run.formFactor} TBT ${Math.round(run.tbt)}ms > ${thresholds.tbt}ms`, run));
  }
}

const ms = (value) => (Number.isFinite(value) ? `${Math.round(value)}ms` : "n/a");

function buildMarkdown(report) {
  const failed = report.issues.filter((item) => item.level === "fail");
  const warnings = report.issues.filter((item) => item.level === "warn");
  const rows = report.lighthouse.map((run) => `| ${run.formFactor} | ${run.performance} | ${run.seo} | ${ms(run.fcp)} | ${ms(run.lcp)} | ${ms(run.tbt)} | ${run.cls?.toFixed?.(3) ?? run.cls} | ${ms(run.speedIndex)} | ${run.networkCount} | ${Math.round(run.networkBytes / 1024)}KB |`).join("\n");
  return `# Website Quality Gate Report

- Checked at: ${report.checkedAt}
- Base URL: ${report.baseUrl}
- URLs checked: ${report.urlsChecked}
- Machine endpoints checked: ${report.machineEndpoints.length}
- Status: ${failed.length ? "FAILED" : "PASSED"}
- Failures: ${failed.length}
- Warnings: ${warnings.length}

## Lighthouse / Core Web Vitals

| Mode | Performance | SEO | FCP | LCP | TBT | CLS | Speed Index | Requests | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
${rows}

## Failures
${failed.map((item) => `- **${item.area}** ${item.message}`).join("\n") || "None."}

## Warnings
${warnings.map((item) => `- **${item.area}** ${item.message}`).join("\n") || "None."}
`;
}

async function main() {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const issues = [];
  const lighthouse = [medianRun("mobile"), medianRun("desktop")];
  checkLighthouseThresholds(lighthouse, issues);
  const machineEndpoints = await checkMachineEndpoints(issues);
  const urls = await discoverUrls(issues);
  const { pages, linkTargets, imageTargets } = await checkPages(urls, issues);
  await checkLinks(linkTargets, issues);
  const images = await checkImages(imageTargets, issues);
  const bundle = checkBundle(issues);
  const report = { checkedAt: new Date().toISOString(), baseUrl: BASE_URL, thresholds, urlsChecked: urls.length, machineEndpoints, lighthouse, pages, images, bundle, issues };
  fs.writeFileSync(REPORT_JSON, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(REPORT_MD, buildMarkdown(report));
  console.log(`Quality gate report written:\n- ${REPORT_MD}\n- ${REPORT_JSON}`);
  const failures = issues.filter((item) => item.level === "fail");
  if (failures.length) {
    console.error(`Quality gate failed with ${failures.length} failure(s).`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
