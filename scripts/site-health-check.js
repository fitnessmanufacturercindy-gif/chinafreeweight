#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright");

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "daily-site-health");
const DEFAULT_BASE_URL = process.env.SITE_HEALTH_BASE_URL || "http://127.0.0.1:3000";
const BASE_URL = DEFAULT_BASE_URL.replace(/\/$/, "");
const PUBLIC_SITE_URL = (process.env.SITE_HEALTH_PUBLIC_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const TODAY = new Date().toISOString().slice(0, 10);
const PAGE_IDLE_TIMEOUT_MS = Number(process.env.SITE_HEALTH_PAGE_IDLE_TIMEOUT_MS || 2000);
const MOBILE_IDLE_TIMEOUT_MS = Number(process.env.SITE_HEALTH_MOBILE_IDLE_TIMEOUT_MS || 1500);
const SCROLL_DELAY_MS = Number(process.env.SITE_HEALTH_SCROLL_DELAY_MS || 60);
const POST_SCROLL_WAIT_MS = Number(process.env.SITE_HEALTH_POST_SCROLL_WAIT_MS || 300);
const REQUESTED_PATHS = uniqueRequestedPaths(process.env.SITE_HEALTH_PATHS || "");

function uniqueRequestedPaths(value) {
  return [...new Set(value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => item.startsWith("/") ? item : `/${item}`))];
}

const LANGUAGE_RULES = {
  es: { name: "Spanish", maxEnglishRatio: 0.18 },
  fr: { name: "French", maxEnglishRatio: 0.18 },
  de: { name: "German", maxEnglishRatio: 0.2 },
  it: { name: "Italian", maxEnglishRatio: 0.18 },
  pt: { name: "Portuguese", maxEnglishRatio: 0.18 },
  ar: { name: "Arabic", maxEnglishRatio: 0.16 },
  ru: { name: "Russian", maxEnglishRatio: 0.16 },
  tr: { name: "Turkish", maxEnglishRatio: 0.18 }
};

const ENGLISH_SIGNAL_WORDS = [
  "factory",
  "product",
  "products",
  "contact",
  "quote",
  "manufacturer",
  "wholesale",
  "supplier",
  "custom",
  "dumbbell",
  "weight",
  "plate",
  "gym",
  "quality",
  "solution",
  "project",
  "resources",
  "learn",
  "read",
  "send"
];

const EXPECTED_SCHEMA_BY_PATH = [
  { test: (u) => u.pathname === "/", types: ["Organization", "WebSite"] },
  { test: (u) => u.pathname.startsWith("/products/") && u.pathname.split("/").length >= 4, types: ["Product", "BreadcrumbList"] },
  { test: (u) => /^\/products\/[^/]+$/.test(u.pathname), types: ["CollectionPage", "BreadcrumbList"] },
  { test: (u) => u.pathname === "/resources", types: ["CollectionPage", "BreadcrumbList"] },
  { test: (u) => u.pathname.startsWith("/resources/"), types: ["Article", "BreadcrumbList"] },
  { test: (u) => u.pathname === "/projects", types: ["CollectionPage", "BreadcrumbList"] },
  { test: (u) => u.pathname === "/contact", types: ["ContactPage", "BreadcrumbList"] }
];

function issue(severity, area, url, message, details = {}) {
  return {
    severity,
    area,
    url,
    message,
    details,
    autoFixable: Boolean(details.autoFixable),
    needsHumanReview: Boolean(details.needsHumanReview)
  };
}

function isInternalUrl(href) {
  try {
    const url = new URL(href, BASE_URL);
    return [new URL(BASE_URL).origin, new URL(PUBLIC_SITE_URL).origin].includes(url.origin);
  } catch {
    return false;
  }
}

function normalizeInternalUrl(href) {
  const url = new URL(href, BASE_URL);
  const base = new URL(BASE_URL);
  url.hash = "";
  url.protocol = base.protocol;
  url.host = base.host;
  return url.toString().replace(/\/$/, url.pathname === "/" ? "/" : "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow" });
  return { ok: response.ok, status: response.status, url: response.url, text: await response.text() };
}

function parseSitemapUrls(xml) {
  return unique([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => match[1].trim()));
}

function routePathFromFile(filePath) {
  const relative = path.relative(path.join(ROOT, "app"), filePath).replace(/\\/g, "/");
  if (!relative.endsWith("/page.tsx") && !relative.endsWith("/page.jsx")) return null;
  const route = relative
    .replace(/\/page\.tsx?$/, "")
    .replace(/\/page\.jsx?$/, "")
    .replace(/\/\(.*?\)/g, "")
    .replace(/\/$/, "");
  if (!route || route === "page.tsx") return "/";
  if (route.includes("[")) return null;
  return `/${route}`;
}

function listStaticAppRoutes() {
  const appDir = path.join(ROOT, "app");
  if (!fs.existsSync(appDir)) return [];
  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      if (entry.isFile()) files.push(fullPath);
    }
  };
  walk(appDir);
  return files.map(routePathFromFile).filter(Boolean).map((route) => `${BASE_URL}${route === "/" ? "" : route}`);
}

async function discoverUrls() {
  const discovered = new Set();
  const sitemapIssues = [];

  try {
    const sitemap = await fetchText(`${BASE_URL}/sitemap.xml`);
    if (!sitemap.ok) {
      sitemapIssues.push(issue("High", "sitemap", `${BASE_URL}/sitemap.xml`, `sitemap.xml returned ${sitemap.status}`));
    } else {
      parseSitemapUrls(sitemap.text)
        .filter(isInternalUrl)
        .forEach((url) => discovered.add(normalizeInternalUrl(url)));
    }
  } catch (error) {
    sitemapIssues.push(issue("High", "sitemap", `${BASE_URL}/sitemap.xml`, `sitemap.xml could not be fetched: ${error.message}`));
  }

  if (REQUESTED_PATHS.length) {
    const sitemapUrls = new Set(discovered);
    const selected = REQUESTED_PATHS.map((route) => normalizeInternalUrl(route));
    for (const url of selected) {
      if (!sitemapUrls.has(url)) {
        sitemapIssues.push(issue("High", "sitemap", url, "Incremental health target is missing from sitemap.xml"));
      }
    }
    return { urls: unique(selected).sort(), sitemapIssues };
  }

  if (discovered.size === 0) {
    listStaticAppRoutes().forEach((url) => discovered.add(normalizeInternalUrl(url)));
  }

  discovered.add(`${BASE_URL}/`);
  return { urls: [...discovered].sort(), sitemapIssues };
}

async function collectAnchors(page) {
  return page.$$eval("a[href]", (anchors) =>
    anchors.map((anchor) => ({
      href: anchor.href,
      text: (anchor.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
      rel: anchor.getAttribute("rel") || "",
      target: anchor.getAttribute("target") || "",
      className: anchor.getAttribute("class") || "",
      ariaLabel: anchor.getAttribute("aria-label") || ""
    }))
  );
}

async function collectSeo(page) {
  return page.evaluate(() => {
    const canonical = document.querySelector('link[rel="canonical"]')?.href || "";
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content") || "";
    const descriptions = [...document.querySelectorAll('meta[name="description"]')].map((node) => node.getAttribute("content") || "");
    const hreflang = [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((node) => ({
      hreflang: node.getAttribute("hreflang"),
      href: node.href
    }));
    const h1 = [...document.querySelectorAll("h1")].map((node) => (node.textContent || "").trim()).filter(Boolean);
    const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')]
      .map((node) => {
        try {
          return JSON.parse(node.textContent || "{}");
        } catch {
          return { parseError: true };
        }
      });
    return { title: document.title, canonical, robots, descriptions, hreflang, h1, jsonLd };
  });
}

function flattenSchemaTypes(jsonLd) {
  const types = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (node.parseError) {
      types.push("ParseError");
    }
    if (node["@type"]) {
      if (Array.isArray(node["@type"])) types.push(...node["@type"]);
      else types.push(node["@type"]);
    }
    if (node["@graph"]) visit(node["@graph"]);
  };
  visit(jsonLd);
  return unique(types);
}

function classifyPath(url) {
  const pathname = new URL(url).pathname;
  if (pathname === "/") return "home";
  if (pathname.startsWith("/products/") && pathname.split("/").length >= 4) return "product-detail";
  if (pathname.startsWith("/products/")) return "product-category";
  if (pathname.startsWith("/resources/")) return "resource-detail";
  if (pathname === "/resources") return "resources-list";
  if (pathname === "/projects") return "projects";
  if (pathname === "/factory") return "factory";
  if (pathname === "/contact") return "contact";
  return "page";
}

function languageCodeForUrl(url) {
  const firstSegment = new URL(url).pathname.split("/").filter(Boolean)[0];
  return LANGUAGE_RULES[firstSegment] ? firstSegment : null;
}

function checkLanguage(text, langCode) {
  const normalized = text.toLowerCase();
  const words = normalized.match(/[a-z]{3,}/g) || [];
  if (words.length < 80) return null;
  const englishHits = words.filter((word) => ENGLISH_SIGNAL_WORDS.includes(word)).length;
  const ratio = englishHits / words.length;
  if (ratio > LANGUAGE_RULES[langCode].maxEnglishRatio) {
    return { ratio: Number(ratio.toFixed(3)), words: words.length, englishHits };
  }
  return null;
}

async function checkPage(page, context, url, linkStatusCache) {
  const issues = [];
  const consoleErrors = [];
  const failedRequests = [];
  const started = Date.now();

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push({ url: request.url(), failure: request.failure()?.errorText || "request failed" });
  });

  let response;
  try {
    response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.waitForLoadState("networkidle", { timeout: PAGE_IDLE_TIMEOUT_MS }).catch(() => {});
  } catch (error) {
    issues.push(issue("Critical", "availability", url, `Page navigation failed: ${error.message}`));
    return { url, ok: false, type: classifyPath(url), loadMs: Date.now() - started, issues, links: [] };
  }

  const status = response?.status() || 0;
  const loadMs = Date.now() - started;
  const finalUrl = page.url();
  const type = classifyPath(url);

  if (status >= 500) issues.push(issue("Critical", "availability", url, `Page returned ${status}`));
  else if ([401, 403, 404].includes(status)) issues.push(issue(type.includes("product") || url === `${BASE_URL}/` ? "Critical" : "High", "availability", url, `Page returned ${status}`));
  else if (status >= 400) issues.push(issue("High", "availability", url, `Page returned ${status}`));

  if (response?.request().redirectedFrom()) {
    let redirects = 0;
    let current = response.request();
    while (current.redirectedFrom()) {
      redirects += 1;
      current = current.redirectedFrom();
    }
    if (redirects > 5) issues.push(issue("High", "availability", url, `Redirect chain is too long (${redirects})`));
  }

  const bodyText = await page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
  const mainTextLength = bodyText.replace(/\s+/g, " ").trim().length;
  if (mainTextLength < 120) {
    issues.push(issue(type === "home" || type.includes("product") ? "Critical" : "High", "content", url, `Page appears blank or too thin (${mainTextLength} text characters)`));
  }

  if (consoleErrors.length > 0) {
    issues.push(issue("High", "javascript", url, "JavaScript console errors detected", { errors: unique(consoleErrors).slice(0, 10) }));
  }

  const seo = await collectSeo(page);
  if (!seo.title || seo.title.trim().length < 8) issues.push(issue("Medium", "seo", url, "Title is missing or too short"));
  if (seo.descriptions.length === 0 || !seo.descriptions[0] || seo.descriptions[0].trim().length < 40) {
    issues.push(issue("Medium", "seo", url, "Meta description is missing or too short"));
  }
  if (seo.descriptions.length > 1) issues.push(issue("Medium", "seo", url, "Multiple meta descriptions found"));
  if (seo.h1.length === 0) issues.push(issue("Medium", "seo", url, "H1 is missing"));
  if (seo.h1.length > 1) issues.push(issue("Medium", "seo", url, "Multiple H1 elements found", { h1: seo.h1 }));
  if (/noindex/i.test(seo.robots)) issues.push(issue("High", "seo", url, "Page contains noindex robots directive"));
  if (!seo.canonical) {
    issues.push(issue("Medium", "seo", url, "Canonical URL is missing", { needsHumanReview: true }));
  } else if (!isInternalUrl(seo.canonical)) {
    issues.push(issue("High", "seo", url, `Canonical points outside the site: ${seo.canonical}`, { needsHumanReview: true }));
  } else if (new URL(seo.canonical).pathname !== new URL(url).pathname) {
    issues.push(issue("High", "seo", url, `Canonical path does not match page path: ${seo.canonical}`, { needsHumanReview: true }));
  }

  const schemaTypes = flattenSchemaTypes(seo.jsonLd);
  if (schemaTypes.includes("ParseError")) issues.push(issue("High", "schema", url, "Invalid JSON-LD schema detected"));
  for (const rule of EXPECTED_SCHEMA_BY_PATH) {
    if (!rule.test(new URL(url))) continue;
    const missingTypes = rule.types.filter((typeName) => !schemaTypes.includes(typeName));
    if (missingTypes.length > 0) {
      issues.push(issue("Medium", "schema", url, `Expected schema type missing: ${missingTypes.join(", ")}`, { found: schemaTypes }));
    }
  }

  await page.evaluate(async () => {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    document.querySelectorAll("img").forEach((img) => {
      img.loading = "eager";
    });
    const step = Math.max(window.innerHeight, 600);
    for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await delay(window.__siteHealthScrollDelayMs || 60);
    }
    window.scrollTo(0, 0);
    await delay(window.__siteHealthPostScrollWaitMs || 300);
  });
  await page.waitForTimeout(200);

  const images = await page.$$eval("img", (nodes) =>
    nodes.map((img) => ({
      src: img.currentSrc || img.src,
      alt: img.getAttribute("alt"),
      complete: img.complete,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight
    }))
  );
  const brokenImages = images.filter((img) => img.src && img.naturalWidth === 0);
  if (brokenImages.length > 0) {
    issues.push(issue(brokenImages.length >= 5 ? "Critical" : "High", "images", url, "Broken images detected", { images: brokenImages.slice(0, 20), autoFixable: true }));
  }
  const missingAlt = images.filter((img) => img.src && (img.alt === null || img.alt.trim() === ""));
  if (missingAlt.length > 0) {
    issues.push(issue("Medium", "images", url, "Images missing alt text", { count: missingAlt.length, samples: missingAlt.slice(0, 10), autoFixable: true }));
  }

  const anchors = await collectAnchors(page);
  const internalLinks = unique(
    anchors
      .map((anchor) => anchor.href)
      .filter((href) => href && isInternalUrl(href))
      .map(normalizeInternalUrl)
  );

  for (const href of internalLinks) {
    if (!linkStatusCache.has(href)) {
      try {
        const linkResponse = await context.request.get(href, { maxRedirects: 8, timeout: 15000 });
        linkStatusCache.set(href, linkResponse.status());
      } catch {
        linkStatusCache.set(href, 0);
      }
    }
    const linkStatus = linkStatusCache.get(href);
    if (!linkStatus || linkStatus >= 400) {
      issues.push(issue(linkStatus >= 500 ? "High" : "Medium", "links", url, `Internal link failed (${linkStatus || "request failed"}): ${href}`, { href, status: linkStatus, autoFixable: true }));
    }
  }

  const contactLinks = anchors.filter((anchor) => /whatsapp|mail|email|phone|tel|quote|get a quote|rfq/i.test(`${anchor.text} ${anchor.ariaLabel} ${anchor.href}`));
  for (const anchor of contactLinks) {
    const ok = /^(mailto:|tel:|https:\/\/wa\.me\/|https:\/\/api\.whatsapp\.com\/|https?:\/\/[^/]+\/contact|http:\/\/127\.0\.0\.1:\d+\/contact|https?:\/\/[^/]+\/#contact|http:\/\/127\.0\.0\.1:\d+\/#contact)/i.test(anchor.href);
    if (!ok) issues.push(issue("High", "conversion", url, `Contact/CTA link has an unexpected target: ${anchor.href}`));
  }

  if (failedRequests.length > 0) {
    const imageFailures = failedRequests.filter((request) => /\.(png|jpe?g|webp|avif|gif|svg)(\?|$)/i.test(request.url));
    if (imageFailures.length > 0) {
      issues.push(issue("High", "images", url, "Image/network requests failed", { failures: imageFailures.slice(0, 20), autoFixable: true }));
    }
  }

  if (loadMs > 12000) issues.push(issue("Medium", "performance", url, `Page load is slow (${loadMs}ms)`));

  const langCode = languageCodeForUrl(url);
  if (langCode) {
    const languageFinding = checkLanguage(bodyText, langCode);
    if (languageFinding) {
      issues.push(issue(languageFinding.ratio > 0.28 ? "Critical" : "High", "language", url, `${LANGUAGE_RULES[langCode].name} page appears to contain too much English body text`, { ...languageFinding, needsHumanReview: true }));
    }
  }

  return { url, finalUrl, status, ok: status >= 200 && status < 400 && mainTextLength >= 120, type, loadMs, issues, links: internalLinks, schemaTypes };
}

async function checkMobile(browser, urls) {
  const issues = [];
  const mobileContext = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 390, height: 844 },
    isMobile: true
  });
  const page = await mobileContext.newPage();
  for (const url of urls.slice(0, 12)) {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 }).catch((error) => {
      issues.push(issue("High", "mobile", url, `Mobile navigation failed: ${error.message}`));
    });
    await page.waitForLoadState("networkidle", { timeout: MOBILE_IDLE_TIMEOUT_MS }).catch(() => {});
    const layout = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      hasMobileMenu: Boolean(document.querySelector(".mobile-nav-menu")),
      mobileMenuOpen: document.querySelector(".mobile-nav-menu")?.hasAttribute("open") || false
    }));
    if (layout.scrollWidth > layout.clientWidth + 24) {
      issues.push(issue("High", "mobile", url, `Mobile layout has horizontal overflow (${layout.scrollWidth}px > ${layout.clientWidth}px)`));
    }
    if (url.endsWith("/") && layout.hasMobileMenu) {
      const summary = page.locator(".mobile-nav-menu summary").first();
      await summary.click({ force: true }).catch(() => issues.push(issue("High", "navigation", url, "Mobile menu could not be opened")));
      const opened = await page.locator(".mobile-nav-menu[open]").count();
      await summary.click({ force: true }).catch(() => issues.push(issue("Medium", "navigation", url, "Mobile menu could not be closed")));
      const closed = await page.locator(".mobile-nav-menu[open]").count();
      if (!opened || closed) issues.push(issue("High", "navigation", url, "Mobile menu open/close state is not working"));
    }
  }
  await mobileContext.close();
  return issues;
}

function checkMultilingualCoverage(urls) {
  const issues = [];
  const languageRoutes = urls.filter((url) => languageCodeForUrl(url));
  const hasLanguageTools =
    fs.existsSync(path.join(ROOT, "app", "components", "LanguageSwitcher.tsx")) ||
    fs.existsSync(path.join(ROOT, "app", "components", "languageDictionary.ts"));

  if (hasLanguageTools && languageRoutes.length === 0) {
    issues.push(
      issue(
        "Medium",
        "language",
        BASE_URL,
        "No language-prefixed public URLs were found, so independent minor-language page health, canonical, and hreflang coverage cannot be fully verified.",
        { needsHumanReview: true }
      )
    );
  }

  return issues;
}

async function checkContactForm(context) {
  const issues = [];
  const page = await context.newPage();
  await page.route("https://formsubmit.co/**", async (route) => {
    await route.fulfill({ status: 200, contentType: "text/html", body: "<html><body>ok</body></html>" });
  });
  try {
    await page.goto(`${BASE_URL}/contact`, { waitUntil: "domcontentloaded", timeout: 30000 });
    await page.fill('input[name="name"]', "Site Health Bot");
    await page.fill('input[name="email"]', "health-check@example.com");
    await page.fill('input[name="phone"]', "+1 555 123 4567");
    await page.fill('input[name="company"]', "Automated QA");
    await page.fill('textarea[name="message"]', "Automated non-delivered form validation check.");
    await Promise.all([
      page.waitForLoadState("domcontentloaded", { timeout: 10000 }).catch(() => {}),
      page.click('button[type="submit"]')
    ]);
  } catch (error) {
    issues.push(issue("Critical", "conversion", `${BASE_URL}/contact`, `Contact form input/submit check failed: ${error.message}`));
  } finally {
    await page.close();
  }
  return issues;
}

async function checkRobots() {
  try {
    const robots = await fetchText(`${BASE_URL}/robots.txt`);
    if (!robots.ok) return [issue("High", "robots", `${BASE_URL}/robots.txt`, `robots.txt returned ${robots.status}`)];
    const issues = [];
    if (!/User-agent:\s*\*/i.test(robots.text)) issues.push(issue("Medium", "robots", `${BASE_URL}/robots.txt`, "robots.txt is missing User-agent: *"));
    if (!/Sitemap:\s*\S+/i.test(robots.text)) issues.push(issue("Medium", "robots", `${BASE_URL}/robots.txt`, "robots.txt is missing Sitemap reference", { autoFixable: true }));
    if (/Disallow:\s*\/\s*$/im.test(robots.text)) issues.push(issue("Critical", "robots", `${BASE_URL}/robots.txt`, "robots.txt appears to block the whole site"));
    return issues;
  } catch (error) {
    return [issue("High", "robots", `${BASE_URL}/robots.txt`, `robots.txt could not be fetched: ${error.message}`)];
  }
}

function summarize(allIssues, pageResults) {
  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  for (const item of allIssues) counts[item.severity] = (counts[item.severity] || 0) + 1;
  return {
    checkedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    urlCount: pageResults.length,
    okPages: pageResults.filter((page) => page.ok).length,
    abnormalPages: pageResults.filter((page) => !page.ok || page.issues.length > 0).length,
    severityCounts: counts,
    autoFixedIssues: 0,
    needsHumanReviewIssues: allIssues.filter((item) => item.needsHumanReview).length
  };
}

function section(title, rows, formatter) {
  if (!rows.length) return `\n## ${title}\n\nNone.\n`;
  return `\n## ${title}\n\n${rows.map(formatter).join("\n")}\n`;
}

function buildMarkdown(report) {
  const issues = report.issues;
  const byArea = (area) => issues.filter((item) => item.area === area);
  const statusIssues = issues.filter((item) => item.area === "availability");
  const autoFixed = report.autoFixes?.applied || [];
  const prItems = report.autoFixes?.pullRequests || [];
  const human = issues.filter((item) => item.needsHumanReview || ["language", "seo"].includes(item.area));

  return `# Daily Site Health Report - ${TODAY}

- Checked at: ${report.summary.checkedAt}
- Base URL: ${report.summary.baseUrl}
- Checked URL total: ${report.summary.urlCount}
- Normal pages: ${report.summary.okPages}
- Abnormal pages: ${report.summary.abnormalPages}
- Automatically fixed issues: ${report.summary.autoFixedIssues}
- Needs human confirmation: ${report.summary.needsHumanReviewIssues}
- Critical: ${report.summary.severityCounts.Critical}
- High: ${report.summary.severityCounts.High}
- Medium: ${report.summary.severityCounts.Medium}
- Low: ${report.summary.severityCounts.Low}

${section("404 / 500 / Access Issues", statusIssues, (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Broken Images", byArea("images"), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Broken Internal Links", byArea("links"), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Minor-Language Issues", byArea("language"), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("SEO Issues", byArea("seo"), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Schema Issues", byArea("schema"), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Form / Button / Navigation Issues", issues.filter((item) => ["conversion", "navigation", "mobile"].includes(item.area)), (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}
${section("Automatically Fixed", autoFixed, (item) => `- ${item}`)}
${section("Pull Requests Created", prItems, (item) => `- ${item}`)}
${section("Needs Human Confirmation", human, (item) => `- **${item.severity}** ${item.url} - ${item.message}`)}

## Before / After Fix Notes

${autoFixed.length === 0 ? "No source-level auto-fixes were applied during this run." : autoFixed.map((item) => `- ${item}`).join("\n")}

## Content Still Needed

${human.length === 0 ? "None." : "- Review the human-confirmation items above before changing indexed URLs, multilingual architecture, canonical/hreflang rules, product facts, or long-form localized copy."}

## Next Recommendations

${issues.length === 0 ? "- No blocking issues found. Keep the daily workflow enabled." : "- Review Critical and High findings first.\n- Let safe-fix PRs stay small and merge only after manual review.\n- Treat language, canonical, hreflang, major title/H1, product data, and indexed URL changes as manual editorial work."}
`;
}

async function closeBrowserSafely(browser) {
  const closeResult = await Promise.race([
    browser.close().then(() => "closed").catch(() => "failed"),
    new Promise((resolve) => setTimeout(() => resolve("timeout"), 5000))
  ]);

  if (closeResult === "timeout") {
    if (typeof browser.process === "function") {
      browser.process()?.kill?.("SIGKILL");
    }
  }
}

async function runSiteHealthCheck(options = {}) {
  fs.mkdirSync(REPORT_DIR, { recursive: true });
  const { urls, sitemapIssues } = await discoverUrls();
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ ignoreHTTPSErrors: true, viewport: { width: 1440, height: 1000 } });
  const linkStatusCache = new Map();
  const pageResults = [];

  for (const [index, url] of urls.entries()) {
    if (!options.silent) console.log(`[site-health] Checking ${index + 1}/${urls.length}: ${url}`);
    const page = await context.newPage();
    await page.addInitScript(
      ({ scrollDelayMs, postScrollWaitMs }) => {
        window.__siteHealthScrollDelayMs = scrollDelayMs;
        window.__siteHealthPostScrollWaitMs = postScrollWaitMs;
      },
      { scrollDelayMs: SCROLL_DELAY_MS, postScrollWaitMs: POST_SCROLL_WAIT_MS }
    );
    pageResults.push(await checkPage(page, context, url, linkStatusCache));
    await page.close();
  }

  const mobileIssues = await checkMobile(browser, urls);
  const contactIssues = urls.some((url) => new URL(url).pathname === "/contact") ? await checkContactForm(context) : [];
  await context.close().catch(() => {});
  await closeBrowserSafely(browser);

  const robotsIssues = await checkRobots();
  const multilingualCoverageIssues = checkMultilingualCoverage(urls);
  const allIssues = [
    ...sitemapIssues,
    ...robotsIssues,
    ...multilingualCoverageIssues,
    ...pageResults.flatMap((result) => result.issues),
    ...mobileIssues,
    ...contactIssues
  ];

  const report = {
    summary: summarize(allIssues, pageResults),
    pages: pageResults,
    issues: allIssues,
    autoFixes: {
      applied: [],
      pullRequests: [],
      candidates: allIssues.filter((item) => item.autoFixable)
    }
  };

  const jsonPath = options.jsonPath || path.join(REPORT_DIR, `${TODAY}-site-health-report.json`);
  const mdPath = options.mdPath || path.join(REPORT_DIR, `${TODAY}-site-health-report.md`);
  fs.writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(mdPath, buildMarkdown(report));
  return { report, jsonPath, mdPath };
}

if (require.main === module) {
  runSiteHealthCheck()
    .then(({ report, jsonPath, mdPath }) => {
      console.log(`Site health report written:\n- ${mdPath}\n- ${jsonPath}`);
      const failOn = process.env.SITE_HEALTH_FAIL_ON || "";
      if (failOn === "critical" && report.summary.severityCounts.Critical > 0) process.exitCode = 1;
      if (failOn === "high" && (report.summary.severityCounts.Critical > 0 || report.summary.severityCounts.High > 0)) process.exitCode = 1;
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

module.exports = { runSiteHealthCheck, BASE_URL, REPORT_DIR };
