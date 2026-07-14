import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const BASE_URL = (process.env.QUALITY_GATE_BASE_URL || "http://127.0.0.1:3000").replace(/\/$/, "");
const PUBLIC_SITE_URL = (process.env.QUALITY_GATE_PUBLIC_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const REPORT_DIR = path.join(ROOT, "reports", "quality-gate");
const DATE_ID = new Date().toISOString().replace(/[:.]/g, "-");
const REPORT_JSON = path.join(REPORT_DIR, `${DATE_ID}-quality-gate.json`);
const REPORT_MD = path.join(REPORT_DIR, `${DATE_ID}-quality-gate.md`);
const LIGHTHOUSE_RUNS = Math.max(1, Number(process.env.QUALITY_GATE_LIGHTHOUSE_RUNS || 3));
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "e0ad369810e295747f3e88ba667e37f8";
const requiredMachineEndpoints = [
  "/sitemap.xml",
  "/sitemap-index.xml",
  "/sitemaps/products.xml",
  "/sitemaps/blogs.xml",
  "/sitemaps/images.xml",
  "/sitemaps/videos.xml",
  "/sitemaps/languages.xml",
  "/robots.txt",
  "/llms.txt",
  `/${INDEXNOW_KEY}.txt`
];

const thresholds = {
  performance: Number(process.env.QUALITY_GATE_MIN_PERFORMANCE || 90),
  seo: Number(process.env.QUALITY_GATE_MIN_SEO || 100),
  lcp: Number(process.env.QUALITY_GATE_MAX_LCP_MS || 2500),
  cls: Number(process.env.QUALITY_GATE_MAX_CLS || 0.1),
  tbt: Number(process.env.QUALITY_GATE_MAX_TBT_MS || 300),
  imageWarnBytes: Number(process.env.QUALITY_GATE_IMAGE_WARN_BYTES || 150 * 1024),
  imageFailBytes: Number(process.env.QUALITY_GATE_IMAGE_FAIL_BYTES || 250 * 1024),
  sameOriginJsTransferBytes: Number(process.env.QUALITY_GATE_MAX_JS_TRANSFER_BYTES || 180 * 1024),
  nextChunkBytes: Number(process.env.QUALITY_GATE_MAX_NEXT_CHUNK_BYTES || 2 * 1024 * 1024),
  blockLargeImages: process.env.QUALITY_GATE_BLOCK_LARGE_IMAGES === "1",
  blockTbt: process.env.QUALITY_GATE_BLOCK_TBT === "1"
};

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function lighthouseCliPath() {
  return path.join(ROOT, "node_modules", "lighthouse", "cli", "index.js");
}

function severity(level, area, message, details = {}) {
  return { level, area, message, details };
}

function fail(area, message, details = {}) {
  return severity("fail", area, message, details);
}

function warn(area, message, details = {}) {
  return severity("warn", area, message, details);
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

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
  return {
    ok: response.ok,
    status: response.status,
    url: response.url,
    text: await response.text(),
    headers: response.headers
  };
}

async function fetchHeadOrGet(url) {
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (response.status === 405 || response.status === 403) {
      response = await fetch(url, { method: "GET", redirect: "follow" });
    }
    return response;
  } catch {
    return null;
  }
}

function extractAttributeTags(html, tag, attribute) {
  const tagPattern = new RegExp(`<${tag}\\b[^>]*>`, "gi");
  const attrPattern = new RegExp(`${attribute}\\s*=\\s*["']([^"']+)["']`, "i");
  return [...html.matchAll(tagPattern)]
    .map((match) => match[0].match(attrPattern)?.[1])
    .filter(Boolean);
}

function extractLinks(html) {
  return [
    ...extractAttributeTags(html, "a", "href"),
    ...extractAttributeTags(html, "link", "href"),
    ...extractAttributeTags(html, "script", "src"),
    ...extractAttributeTags(html, "img", "src"),
    ...extractAttributeTags(html, "source", "src"),
    ...extractAttributeTags(html, "source", "srcset").flatMap((srcset) =>
      srcset.split(",").map((part) => part.trim().split(/\s+/)[0])
    )
  ];
}

function extractImageUrls(html, pageUrl) {
  const imgUrls = extractAttributeTags(html, "img", "src");
  const sourceUrls = extractAttributeTags(html, "source", "srcset").flatMap((srcset) =>
    srcset.split(",").map((part) => part.trim().split(/\s+/)[0])
  );
  return unique([...imgUrls, ...sourceUrls])
    .map((src) => toUrl(src, pageUrl))
    .filter(isSameOrigin)
    .map((url) => url.toString());
}

function parseSitemapUrls(xml) {
  return unique([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1].trim()));
}

function parseJsonLd(html) {
  const scripts = [...html.matchAll(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  return scripts.map((match) => {
    const raw = match[1].trim();
    try {
      return { ok: true, value: JSON.parse(raw) };
    } catch (error) {
      return { ok: false, error: error.message, raw: raw.slice(0, 160) };
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

function metadataFromHtml(html) {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() || "";
  const description =
    html.match(/<meta\b[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() ||
    html.match(/<meta\b[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i)?.[1]?.trim() ||
    "";
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
  const h1Count = [...html.matchAll(/<h1\b/gi)].length;
  const robots = html.match(/<meta\b[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1]?.trim() || "";
  return { title, description, canonical, h1Count, robots };
}

function lighthouseCommandArgs(url, formFactor, outputPath) {
  const isMobile = formFactor === "mobile";
  const args = [
    url,
    "--quiet",
    "--only-categories=performance,seo",
    `--form-factor=${formFactor}`,
    `--screenEmulation.mobile=${isMobile}`,
    `--screenEmulation.width=${isMobile ? 390 : 1440}`,
    `--screenEmulation.height=${isMobile ? 844 : 1000}`,
    `--screenEmulation.deviceScaleFactor=${isMobile ? 2 : 1}`,
    "--chrome-flags=--headless=new --no-sandbox",
    "--output=json",
    `--output-path=${outputPath}`
  ];
  if (!isMobile) args.splice(3, 0, "--preset=desktop");
  return args;
}

function runLighthouse(formFactor) {
  return runLighthouseOnce(formFactor, 1);
}

function runLighthouseOnce(formFactor, runNumber) {
  const outputPath = path.join(REPORT_DIR, `${DATE_ID}-lighthouse-${formFactor}-${runNumber}.json`);
  try {
    execFileSync(process.execPath, [lighthouseCliPath(), ...lighthouseCommandArgs(`${BASE_URL}/`, formFactor, outputPath)], {
      cwd: ROOT,
      stdio: "inherit",
      shell: false
    });
  } catch (error) {
    if (!fs.existsSync(outputPath)) {
      throw error;
    }
    console.warn(`Lighthouse ${formFactor} exited with a non-zero status after writing a report. Continuing with ${outputPath}.`);
  }
  const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const audits = report.audits;
  const networkItems = audits["network-requests"]?.details?.items || [];
  const sameOriginJsTransfer = networkItems
    .filter((item) => item.resourceType === "Script" && item.url.startsWith(`${BASE_URL}/_next/`))
    .reduce((sum, item) => sum + (item.transferSize || 0), 0);

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
    networkBytes: networkItems.reduce((sum, item) => sum + (item.transferSize || 0), 0),
    sameOriginJsTransfer,
    lcpElement: audits["largest-contentful-paint-element"]?.details?.items?.[0] || null
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
}

function medianRun(formFactor) {
  const runs = [];
  for (let index = 1; index <= LIGHTHOUSE_RUNS; index += 1) {
    runs.push(runLighthouseOnce(formFactor, index));
  }
  const performance = median(runs.map((run) => run.performance));
  const lcp = median(runs.map((run) => run.lcp));
  const representative = runs
    .map((run) => ({ run, distance: Math.abs(run.performance - performance) + Math.abs(run.lcp - lcp) / 1000 }))
    .sort((a, b) => a.distance - b.distance)[0].run;

  return {
    ...representative,
    performance,
    seo: median(runs.map((run) => run.seo)),
    fcp: median(runs.map((run) => run.fcp)),
    lcp,
    tbt: median(runs.map((run) => run.tbt)),
    cls: median(runs.map((run) => run.cls)),
    speedIndex: median(runs.map((run) => run.speedIndex)),
    networkCount: median(runs.map((run) => run.networkCount)),
    networkBytes: median(runs.map((run) => run.networkBytes)),
    sameOriginJsTransfer: median(runs.map((run) => run.sameOriginJsTransfer)),
    runs
  };
}

async function discoverUrls(issues) {
  const sitemapUrls = [`${BASE_URL}/sitemap.xml`];
  const urls = [];

  for (const sitemapUrl of sitemapUrls) {
    const sitemap = await fetchText(sitemapUrl).catch((error) => ({
      ok: false,
      status: 0,
      text: "",
      error
    }));
    if (!sitemap.ok) {
      issues.push(fail("sitemap", `${sitemapUrl} is not reachable: ${sitemap.status || sitemap.error?.message || "request failed"}`));
      continue;
    }
    urls.push(
      ...parseSitemapUrls(sitemap.text)
        .map((url) => toUrl(url))
        .filter(isSameOrigin)
        .map((url) => toLocalUrlString(url))
    );
  }

  const sitemapIndex = await fetchText(`${BASE_URL}/sitemap-index.xml`).catch((error) => ({
    ok: false,
    status: 0,
    text: "",
    error
  }));
  if (sitemapIndex.ok) {
    const childSitemaps = parseSitemapUrls(sitemapIndex.text)
      .map((url) => toUrl(url))
      .filter(isSameOrigin)
      .map((url) => toLocalUrlString(url));
    for (const childSitemap of unique(childSitemaps)) {
      const child = await fetchText(childSitemap).catch((error) => ({ ok: false, status: 0, text: "", error }));
      if (!child.ok) {
        issues.push(fail("sitemap", `${childSitemap} is not reachable: ${child.status || child.error?.message || "request failed"}`));
        continue;
      }
      urls.push(
        ...parseSitemapUrls(child.text)
          .map((url) => toUrl(url))
          .filter(isSameOrigin)
          .map((url) => toLocalUrlString(url))
      );
    }
  }

  if (!urls.length) issues.push(fail("sitemap", "sitemap.xml contains no same-origin URLs"));
  return unique([`${BASE_URL}/`, ...urls]);
}

async function checkMachineEndpoints(issues) {
  const endpoints = [];
  for (const path of requiredMachineEndpoints) {
    const url = `${BASE_URL}${path}`;
    const response = await fetchText(url).catch((error) => ({ ok: false, status: 0, text: "", error }));
    endpoints.push({ path, status: response.status, ok: response.ok });
    if (!response.ok) {
      issues.push(fail("technical-seo", `${path} is not reachable: ${response.status || response.error?.message || "request failed"}`));
      continue;
    }
    if (path.endsWith(".xml") && !/<loc>/.test(response.text)) {
      issues.push(fail("sitemap", `${path} has no <loc> entries`));
    }
    if (path === "/llms.txt" && !/PowerBaseFit/i.test(response.text)) {
      issues.push(fail("ai-search", "llms.txt is reachable but missing brand context"));
    }
    if (path.endsWith(`${INDEXNOW_KEY}.txt`) && response.text.trim() !== INDEXNOW_KEY) {
      issues.push(fail("indexnow", "IndexNow key file content does not match INDEXNOW_KEY"));
    }
  }
  return endpoints;
}

async function checkRobots(issues) {
  const robotsUrl = `${BASE_URL}/robots.txt`;
  const robots = await fetchText(robotsUrl).catch((error) => ({ ok: false, status: 0, text: "", error }));
  if (!robots.ok) {
    issues.push(fail("robots", `robots.txt is not reachable: ${robots.status || robots.error?.message || "request failed"}`));
    return;
  }
  if (!/User-agent:\s*\*/i.test(robots.text)) issues.push(fail("robots", "robots.txt is missing User-agent: *"));
  if (!/Sitemap:\s*\S+/i.test(robots.text)) issues.push(fail("robots", "robots.txt is missing Sitemap reference"));
  if (/Disallow:\s*\/\s*$/im.test(robots.text)) issues.push(fail("robots", "robots.txt blocks the whole site"));
}

async function checkPages(urls, issues) {
  const linkTargets = new Map();
  const imageTargets = new Map();
  const pages = [];

  for (const url of urls) {
    const page = await fetchText(url).catch((error) => ({ ok: false, status: 0, text: "", error }));
    const pageResult = { url, status: page.status, ok: page.ok, title: "", canonical: "", h1Count: 0, schemaTypes: [] };
    pages.push(pageResult);
    if (!page.ok) {
      issues.push(fail("availability", `${url} returned ${page.status || page.error?.message || "request failed"}`));
      continue;
    }
    if (/404|not found/i.test(page.text.slice(0, 2000)) && page.status === 200) {
      issues.push(warn("404", `${url} may render a soft 404 page`));
    }

    const meta = metadataFromHtml(page.text);
    pageResult.title = meta.title;
    pageResult.canonical = meta.canonical;
    pageResult.h1Count = meta.h1Count;

    if (!meta.title || meta.title.length < 8) issues.push(fail("metadata", `${url} is missing a useful title`));
    if (!meta.description || meta.description.length < 40) issues.push(fail("metadata", `${url} is missing a useful meta description`));
    if (meta.h1Count !== 1) issues.push(fail("metadata", `${url} has ${meta.h1Count} H1 elements`));
    if (/noindex/i.test(meta.robots)) issues.push(fail("metadata", `${url} contains noindex`));
    if (!meta.canonical) {
      issues.push(fail("canonical", `${url} is missing canonical`));
    } else {
      const canonicalUrl = toUrl(meta.canonical, url);
      if (!isSameOrigin(canonicalUrl)) issues.push(fail("canonical", `${url} canonical is off-site: ${meta.canonical}`));
      else if (canonicalUrl.pathname.replace(/\/$/, "") !== new URL(url).pathname.replace(/\/$/, "")) {
        issues.push(fail("canonical", `${url} canonical path does not match: ${canonicalUrl.toString()}`));
      }
    }

    const jsonLd = parseJsonLd(page.text);
    if (!jsonLd.length) issues.push(warn("schema", `${url} has no JSON-LD schema`));
    for (const item of jsonLd) {
      if (!item.ok) issues.push(fail("schema", `${url} has invalid JSON-LD: ${item.error}`));
      else pageResult.schemaTypes.push(...flattenSchemaTypes(item.value));
    }
    pageResult.schemaTypes = unique(pageResult.schemaTypes);

    for (const href of extractLinks(page.text)) {
      const target = toUrl(href, url);
      if (!isHttpUrl(target)) continue;
      if (isSameOrigin(target)) linkTargets.set(target.toString(), { from: url });
    }
    for (const imageUrl of extractImageUrls(page.text, url)) {
      imageTargets.set(imageUrl, { from: url });
    }
  }

  return { pages, linkTargets, imageTargets };
}

async function checkLinks(linkTargets, issues) {
  for (const [url, meta] of linkTargets.entries()) {
    const response = await fetchHeadOrGet(url);
    if (!response || response.status >= 400) {
      issues.push(fail("broken-links", `${meta.from} links to ${url}, which returned ${response?.status || "request failed"}`));
    }
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
    const contentType = response.headers.get("content-type") || "";
    const image = { url, from: meta.from, size, contentType };
    images.push(image);
    if (size >= thresholds.imageFailBytes) {
      const issue = thresholds.blockLargeImages ? fail : warn;
      issues.push(issue("images", `Image is too large (${Math.round(size / 1024)}KB): ${url}`, image));
    } else if (size >= thresholds.imageWarnBytes) {
      issues.push(warn("images", `Image is large (${Math.round(size / 1024)}KB): ${url}`, image));
    }
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
      else if (entry.isFile() && entry.name.endsWith(".js")) {
        files.push({ path: path.relative(ROOT, full), size: fs.statSync(full).size });
      }
    }
  };
  walk(staticDir);
  const chunkBytes = files.reduce((sum, file) => sum + file.size, 0);
  if (chunkBytes > thresholds.nextChunkBytes) {
    issues.push(fail("bundle", `Built JS chunks are too large: ${Math.round(chunkBytes / 1024)}KB`, { chunkBytes }));
  }
  return { chunkBytes, files: files.sort((a, b) => b.size - a.size).slice(0, 20) };
}

function checkLighthouseThresholds(lighthouse, issues) {
  for (const run of lighthouse) {
    if (run.performance < thresholds.performance) {
      issues.push(fail("lighthouse", `${run.formFactor} Performance ${run.performance} < ${thresholds.performance}`, run));
    }
    if (run.seo < thresholds.seo) {
      issues.push(fail("lighthouse", `${run.formFactor} SEO ${run.seo} < ${thresholds.seo}`, run));
    }
    if (run.lcp > thresholds.lcp) {
      issues.push(fail("core-web-vitals", `${run.formFactor} LCP ${Math.round(run.lcp)}ms > ${thresholds.lcp}ms`, run));
    }
    if (run.cls > thresholds.cls) {
      issues.push(fail("core-web-vitals", `${run.formFactor} CLS ${run.cls} > ${thresholds.cls}`, run));
    }
    if (run.tbt > thresholds.tbt) {
      const issue = thresholds.blockTbt ? fail : warn;
      issues.push(issue("core-web-vitals", `${run.formFactor} TBT ${Math.round(run.tbt)}ms > ${thresholds.tbt}ms`, run));
    }
    if (run.sameOriginJsTransfer > thresholds.sameOriginJsTransferBytes) {
      issues.push(
        fail(
          "bundle",
          `${run.formFactor} same-origin JS transfer is too large: ${Math.round(run.sameOriginJsTransfer / 1024)}KB`,
          run
        )
      );
    }
  }
}

function ms(value) {
  return Number.isFinite(value) ? `${Math.round(value)}ms` : "n/a";
}

function buildMarkdown(report) {
  const failed = report.issues.filter((issue) => issue.level === "fail");
  const warnings = report.issues.filter((issue) => issue.level === "warn");
  const lhRows = report.lighthouse
    .map(
      (run) =>
        `| ${run.formFactor} | ${run.performance} | ${run.seo} | ${ms(run.fcp)} | ${ms(run.lcp)} | ${ms(run.tbt)} | ${run.cls?.toFixed?.(3) ?? run.cls} | ${ms(run.speedIndex)} | ${run.networkCount} | ${Math.round(run.networkBytes / 1024)}KB |`
    )
    .join("\n");

  return `# Website Quality Gate Report

- Checked at: ${report.checkedAt}
- Base URL: ${report.baseUrl}
- URLs checked: ${report.urlsChecked}
- Status: ${failed.length ? "FAILED" : "PASSED"}
- Failures: ${failed.length}
- Warnings: ${warnings.length}

## Lighthouse / Core Web Vitals

| Mode | Performance | SEO | FCP | LCP | TBT | CLS | Speed Index | Requests | Transfer |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
${lhRows}

## Bundle Size

- Built JS chunks: ${Math.round(report.bundle.chunkBytes / 1024)}KB
- Lighthouse same-origin JS threshold: ${Math.round(thresholds.sameOriginJsTransferBytes / 1024)}KB transfer

## Largest Images

${report.images
  .slice(0, 20)
  .map((image) => `- ${Math.round(image.size / 1024)}KB ${image.url}`)
  .join("\n") || "None."}

## Failures

${failed.map((item) => `- **${item.area}** ${item.message}`).join("\n") || "None."}

## Warnings

${warnings.map((item) => `- **${item.area}** ${item.message}`).join("\n") || "None."}
`;
}

async function main() {
  ensureDir(REPORT_DIR);
  const issues = [];
  const lighthouse = [medianRun("mobile"), medianRun("desktop")];
  checkLighthouseThresholds(lighthouse, issues);

  const machineEndpoints = await checkMachineEndpoints(issues);
  await checkRobots(issues);
  const urls = await discoverUrls(issues);
  const { pages, linkTargets, imageTargets } = await checkPages(urls, issues);
  await checkLinks(linkTargets, issues);
  const images = await checkImages(imageTargets, issues);
  const bundle = checkBundle(issues);

  const report = {
    checkedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    thresholds,
    urlsChecked: urls.length,
    machineEndpoints,
    lighthouse,
    pages,
    images,
    bundle,
    issues
  };

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
