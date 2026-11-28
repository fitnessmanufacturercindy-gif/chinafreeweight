import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";

import { legacyAssetRedirects, legacyRedirects } from "../lib/seo/legacy-redirects.mjs";
import { alternates, attributes, decodeEntities, sortedLinks } from "./verify-built-hreflang.mjs";

const PUBLIC_ORIGIN = "https://www.chinafreeweight.com";
const RETIRED_SITEMAPS = ["/sitemap-index.xml", "/sitemaps/languages.xml"];
const GROUPS = ["Robots", "Sitemaps", "Retired sitemaps", "Pages", "Image uniqueness", "Image responses",
  "Legacy redirects", "404 pages", "Live"];

function requireCheck(condition, message) {
  if (!condition) throw new Error(message);
}

function httpUrl(value) {
  const url = new URL(value);
  requireCheck(["http:", "https:"].includes(url.protocol) && !url.username && !url.password,
    `Expected an HTTP(S) URL without credentials, got ${value}`);
  return url;
}

function origin(value) {
  const url = httpUrl(value);
  requireCheck(url.href === url.origin + "/", `Expected an origin, got ${value}`);
  return url.origin;
}

function integer(value, name, minimum) {
  const number = Number(value);
  requireCheck(/^\d+$/.test(value) && Number.isSafeInteger(number) && number >= minimum,
    `--${name} must be an integer >= ${minimum}`);
  return number;
}

function mediaType(response) {
  return response.headers.get("content-type")?.split(";")[0].trim().toLowerCase() ?? "";
}

function htmlMetadata(html) {
  // Ignore tag-like text in scripts, styles, templates and comments. Next may
  // stream metadata after </head>, so inspect the complete rendered document.
  const markup = html.replace(/<!--[\s\S]*?-->|<(script|style|template|textarea|title)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "");
  const links = Array.from(markup.matchAll(/<link\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi));
  const linkAttrs = links.map(([tag]) => attributes(tag));
  const meta = Array.from(markup.matchAll(/<meta\b(?:[^>"']|"[^"]*"|'[^']*')*>/gi),
    ([tag]) => attributes(tag));
  const directives = (name) => meta.filter((tag) => tag.name?.toLowerCase() === name)
    .map((tag) => tag.content ?? "");
  return {
    canonicals: linkAttrs.filter(({ rel }) => rel?.toLowerCase().split(/\s+/).includes("canonical")),
    hasHreflang: linkAttrs.some(({ hreflang }) => hreflang !== undefined),
    alternates: alternates(links),
    robots: directives("robots"),
    googlebot: directives("googlebot")
  };
}

function parseSitemap(xml) {
  const body = xml.match(/^\s*(?:<\?xml\s[^?]*\?>\s*)?<urlset\b[^>]*>([\s\S]*)<\/urlset>\s*$/)?.[1];
  requireCheck(body !== undefined, "Expected a sitemap XML urlset");
  const entries = Array.from(body.matchAll(/<url\s*>([\s\S]*?)<\/url\s*>/g), ([, entry]) => {
    const locs = Array.from(entry.matchAll(/<loc\s*>([^<]+)<\/loc\s*>/g), ([, loc]) => decodeEntities(loc.trim()));
    requireCheck(locs.length === 1 && locs[0], "Expected one page <loc> per sitemap entry");
    return {
      loc: locs[0],
      links: alternates(entry.matchAll(/<xhtml:link\b(?:[^>"']|"[^"]*"|'[^']*')*>/g)),
      images: Array.from(entry.matchAll(/<image:loc\s*>([^<]*)<\/image:loc\s*>/g),
        ([, loc]) => decodeEntities(loc.trim()))
    };
  });
  requireCheck(entries.length > 0 && entries.length === (body.match(/<url\s*>/g)?.length ?? 0),
    "Expected complete page entries in the sitemap");
  return entries;
}

async function redirectCases(csvPaths, publicOrigin) {
  const wildcard = "/:path*";
  const cases = new Map();
  const patterns = [];
  for (const { source, destination } of [...legacyRedirects, ...legacyAssetRedirects]) {
    if (source.endsWith(wildcard)) {
      const prefix = source.slice(0, -wildcard.length);
      patterns.push({ prefix, destination });
      cases.set(prefix, destination);
      cases.set(prefix + "/adjustable-weight-bench", destination);
    } else {
      cases.set(source, destination);
    }
  }

  const publicHost = new URL(publicOrigin).hostname;
  const siteHosts = new Set([publicHost, publicHost.replace(/^www\./, ""), "www.chinafreeweight.com", "chinafreeweight.com"]);
  for (const csvPath of csvPaths) {
    const csv = await readFile(csvPath, "utf8");
    for (const line of csv.split(/\r?\n/)) {
      // GSC URL exports place the URL in the first column.
      const value = line.trim().match(/^(?:"((?:[^"]|"")*)"|([^,]*))(?:,|$)/);
      const field = (value?.[1]?.replaceAll('""', '"') ?? value?.[2] ?? "").trim();
      if (!/^https?:\/\//i.test(field)) continue;
      const { hostname, pathname, search } = httpUrl(field);
      if (!siteHosts.has(hostname)) continue;
      const pattern = patterns.find(({ prefix }) => pathname === prefix || pathname.startsWith(prefix + "/"));
      const destination = cases.get(pathname) ?? pattern?.destination;
      if (destination) cases.set(pathname + search, destination + search);
    }
  }
  return cases;
}

async function forEachConcurrent(items, concurrency, check) {
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(items.length, concurrency) }, async () => {
    while (next < items.length) await check(items[next++]);
  }));
}

const hasNoindex = (value) => /(?:^|[\s,:])(?:noindex|none)(?=$|[\s,])/i.test(value);
const hasIndex = (value) => /(?:^|[\s,])(?:index|all)(?=$|[\s,])/i.test(value);
const assetPath = /^(?:\/assets\/|\/_next\/)|\.(?:avif|bmp|css|gif|ico|jpe?g|[cm]?js|png|svg|tiff?|webp|heic|jxl)$/i;

/** Validate the HTTP surface. Supply fetcher to exercise an in-memory HTTP handler. */
export async function validateSitemap({
  base, publicOrigin = PUBLIC_ORIGIN, concurrency = 8, limit = Infinity, imageSample = 50,
  csvPaths = [], live = false, fetcher = globalThis.fetch
}) {
  base = origin(base);
  publicOrigin = origin(publicOrigin);
  const result = {
    timestamp: new Date().toISOString(),
    base,
    publicOrigin,
    options: { concurrency, limit: limit === Infinity ? "all" : limit, imageSample, csvPaths, live },
    summary: Object.fromEntries(GROUPS.map((group) => [group, { pass: 0, fail: 0 }])),
    failures: [],
    skipped: [],
    observations: {}
  };

  const scopedUrl = (value) => {
    const url = httpUrl(value);
    requireCheck(url.origin === publicOrigin, `Expected public origin ${publicOrigin}, got ${value}`);
    return url;
  };
  const fetchUrl = (url) => url.origin === publicOrigin && base !== publicOrigin
    ? base + url.pathname + url.search
    : url.href;
  const get = (url) => fetcher(url, { redirect: "manual", signal: AbortSignal.timeout(30000) });
  const local = (path) => new URL(path, base).href;
  const check = async (group, target, run) => {
    try {
      const value = await run();
      result.summary[group].pass++;
      return value;
    } catch (error) {
      result.summary[group].fail++;
      result.failures.push({ group, target, message: error.message, ...(error.cause?.message && { cause: error.cause.message }) });
    }
  };
  const read = async (url) => {
    const response = await get(url);
    return { response, body: await response.text() };
  };
  const probe = async (url) => {
    const response = await get(url);
    await response.body?.cancel();
    return response;
  };
  const status200 = (response) => requireCheck(response.status === 200 && !response.redirected,
    `Expected direct HTTP 200, got ${response.status}; Location: ${response.headers.get("location") ?? "none"}`);

  const robots = await check("Robots", "/robots.txt", async () => {
    const { response, body } = await read(local("/robots.txt"));
    status200(response);
    return body.split(/\r?\n/).map((line) => line.replace(/#.*/, "").trim());
  });
  let sitemapEntries = [];
  if (robots) {
    const declarations = robots.flatMap((line) => {
      const directive = line.match(/^sitemap\s*:\s*(.*)$/i);
      return directive ? [directive[1]] : [];
    });
    await check("Robots", "Disallow rules", () => {
      requireCheck(robots.some((line) => /^disallow\s*:\s*\/\*\?dpl=$/i.test(line)), "Missing Disallow: /*?dpl=");
      requireCheck(!robots.some((line) => /^disallow\s*:\s*\/(?:_next|assets)(?:\/|$)/i.test(line)),
        "Robots disallows /_next/ or /assets/");
    });
    await check("Robots", "Sitemap declarations", () => {
      requireCheck(declarations.includes(publicOrigin + "/sitemap.xml"), "Missing main sitemap declaration");
      requireCheck(!robots.some((line) => /(?:sitemap-index|languages)\.xml/i.test(line)), "Found a retired sitemap reference");
    });

    const sitemapUrls = [...new Set(declarations)];
    const sitemapResults = new Map();
    await forEachConcurrent(sitemapUrls, concurrency, async (value) => {
      const entries = await check("Sitemaps", value, async () => {
        const url = scopedUrl(value);
        const { response, body } = await read(fetchUrl(url));
        status200(response);
        requireCheck(/^(?:application|text)\/(?:[\w.+-]+\+)?xml$/.test(mediaType(response)),
          `Expected XML Content-Type, got ${mediaType(response) || "none"}`);
        return parseSitemap(body).map((entry) => ({ ...entry, sitemap: url.pathname }));
      });
      if (entries) sitemapResults.set(value, entries);
    });
    sitemapEntries = sitemapUrls.flatMap((value) => sitemapResults.get(value) ?? []);
  }

  for (const path of RETIRED_SITEMAPS) {
    await check("Retired sitemaps", path, async () => {
      const response = await probe(local(path));
      requireCheck([404, 410].includes(response.status), `Expected HTTP 404 or 410, got ${response.status}`);
    });
  }

  const pages = new Map();
  const imagesByPage = new Map();
  const imageUrls = new Set();
  for (const entry of sitemapEntries) {
    if (!pages.has(entry.loc) || entry.sitemap === "/sitemap.xml") pages.set(entry.loc, entry);
    if (!entry.images.length) continue;
    const images = imagesByPage.get(entry.loc) ?? [];
    images.push(...entry.images);
    imagesByPage.set(entry.loc, images);
    for (const image of entry.images) imageUrls.add(image);
  }

  await forEachConcurrent([...pages.values()].slice(0, limit), concurrency, ({ loc, links, sitemap }) =>
    check("Pages", loc, async () => {
      const url = scopedUrl(loc);
      requireCheck(!loc.includes("?") && !loc.includes("#"), "Page loc contains a query string or fragment");
      requireCheck(!assetPath.test(decodeURIComponent(url.pathname)), "Page loc points to an asset");
      const { response, body } = await read(fetchUrl(url));
      status200(response);
      requireCheck(mediaType(response) === "text/html", `Expected text/html, got ${mediaType(response) || "none"}`);
      const meta = htmlMetadata(body);
      const errors = [];
      if (meta.canonicals.length !== 1 || meta.canonicals[0].href !== loc) {
        errors.push(`Expected one canonical matching loc, got ${JSON.stringify(meta.canonicals.map(({ href }) => href))}`);
      }
      if ([...meta.robots, ...meta.googlebot, response.headers.get("x-robots-tag") ?? ""].some(hasNoindex)) {
        errors.push("Found noindex in robots metadata or X-Robots-Tag");
      }
      if (sitemap === "/sitemap.xml") {
        if (sortedLinks(meta.alternates) !== sortedLinks(links)) {
          const expected = new Set(links.map((link) => JSON.stringify(link)));
          const actual = new Set(meta.alternates.map((link) => JSON.stringify(link)));
          const missing = links.filter((link) => !actual.has(JSON.stringify(link)));
          const extra = meta.alternates.filter((link) => !expected.has(JSON.stringify(link)));
          errors.push(`HTML hreflang differs from sitemap (missing ${JSON.stringify(missing)}, extra ${JSON.stringify(extra)}, sitemap/HTML counts ${links.length}/${meta.alternates.length})`);
        }
        const english = new Set(links.filter(([lang, href]) => /^en(?:-|$)/i.test(lang) && href).map(([, href]) => href));
        if (links.some(([lang, href]) => lang === "x-default" && !english.has(href))) {
          errors.push("x-default does not match an English alternate");
        }
      }
      requireCheck(!errors.length, errors.join(". "));
    }));

  for (const [page, images] of imagesByPage) {
    await check("Image uniqueness", page, () => {
      const seen = new Set();
      for (const image of images) {
        const url = httpUrl(image).href;
        requireCheck(!seen.has(url), `Duplicate image loc: ${image}`);
        seen.add(url);
      }
    });
  }
  const images = [...imageUrls].sort();
  const sampleSize = imageSample === "all" ? images.length : Math.min(imageSample, images.length);
  const sampled = Array.from({ length: sampleSize }, (_, index) => images[Math.floor(index * images.length / sampleSize)]);
  await forEachConcurrent(sampled, concurrency, (image) => check("Image responses", image, async () => {
    const response = await probe(fetchUrl(httpUrl(image)));
    status200(response);
    requireCheck(mediaType(response).startsWith("image/"), `Expected image/*, got ${mediaType(response) || "none"}`);
  }));
  result.observations.pageUrls = pages.size;
  result.observations.imageUrls = images.length;

  const verifyRedirect = async (source, expected, publicExpected = expected) => {
    const response = await probe(source);
    const location = response.headers.get("location");
    requireCheck([301, 308].includes(response.status) && location,
      `Expected 301/308 with Location, got ${response.status}; Location: ${location ?? "none"}`);
    const target = new URL(location, source).href;
    requireCheck(target === expected || target === publicExpected, `Expected Location ${expected}, got ${target}`);
    status200(await probe(expected));
  };
  const cases = await check("Legacy redirects", "Redirect inputs", () => redirectCases(csvPaths, publicOrigin));
  await forEachConcurrent([...(cases ?? [])], concurrency, ([source, destination]) =>
    check("Legacy redirects", source, () => verifyRedirect(local(source), local(destination), new URL(destination, publicOrigin).href)));

  const missingPaths = [`/this-page-does-not-exist-${randomUUID()}`, "/de/does-not-exist",
    "/products/dumbbells/does-not-exist", "/resources/does-not-exist"];
  for (const path of missingPaths) {
    await check("404 pages", path, async () => {
      const { response, body } = await read(local(path));
      const meta = htmlMetadata(body);
      const errors = [];
      if (response.status !== 404) errors.push(`Expected HTTP 404, got ${response.status}`);
      if (!meta.robots.some(hasNoindex)) errors.push("Missing robots noindex");
      if (meta.canonicals.length) errors.push("Found canonical");
      if (meta.hasHreflang) errors.push("Found hreflang");
      if (meta.googlebot.some(hasIndex)) errors.push("Found Googlebot index");
      requireCheck(!errors.length, errors.join(". "));
    });
  }

  await check("Pages", "/ar homepage", async () => {
    const loc = new URL("/ar", publicOrigin).href;
    const { response, body } = await read(fetchUrl(scopedUrl(loc)));
    result.observations.arStatus = response.status;
    status200(response);
    requireCheck(mediaType(response) === "text/html", `Expected text/html, got ${mediaType(response) || "none"}`);
    const meta = htmlMetadata(body);
    const errors = [];
    if (meta.canonicals.length !== 1 || meta.canonicals[0].href !== loc) {
      errors.push(`Expected self-canonical ${loc}, got ${JSON.stringify(meta.canonicals.map(({ href }) => href))}`);
    }
    if ([...meta.robots, ...meta.googlebot, response.headers.get("x-robots-tag") ?? ""].some(hasNoindex)) {
      errors.push("Found noindex in robots metadata or X-Robots-Tag");
    }
    const byLang = Object.fromEntries(meta.alternates);
    const englishHome = new URL("/", publicOrigin).href.replace(/\/$/, "");
    if (byLang.ar !== loc) errors.push(`hreflang ar is ${byLang.ar ?? "missing"}`);
    if (byLang.en !== englishHome && byLang.en !== `${englishHome}/`) {
      errors.push(`hreflang en is ${byLang.en ?? "missing"}`);
    }
    if (byLang["x-default"] !== englishHome && byLang["x-default"] !== `${englishHome}/`) {
      errors.push(`x-default is ${byLang["x-default"] ?? "missing"}`);
    }
    const required = ["ar", "en", "pt-BR", "es", "de", "fr", "vi", "sv", "it", "ko", "id", "pl", "nl", "x-default"];
    const missing = required.filter((lang) => !byLang[lang]);
    if (missing.length) errors.push(`Incomplete hreflang, missing ${missing.join(", ")}`);
    requireCheck(!errors.length, errors.join(". "));
  });

  if (live) {
    const target = new URL(base);
    await check("Live", "HTTP to HTTPS", async () => {
      requireCheck(target.protocol === "https:", "--live requires an HTTPS base");
      const source = new URL(target);
      source.protocol = "http:";
      await verifyRedirect(source.href, target.href);
    });
    if (target.hostname.startsWith("www.")) {
      await check("Live", "Bare host to www", async () => {
        const source = new URL(target);
        source.hostname = target.hostname.slice(4);
        await verifyRedirect(source.href, target.href);
      });
    } else {
      result.skipped.push("Bare host to www requires a www base hostname");
    }
    await check("Live", "CDN headers on main sitemap", async () => {
      const response = await probe(local("/sitemap.xml"));
      status200(response);
      const names = ["cf-cache-status", "cf-ray", "x-hcdn-cache-status", "x-hcdn-request-id",
        "x-cache", "x-cache-status", "cdn-cache-status", "age", "via", "x-vercel-cache"];
      const headers = Object.fromEntries(names.filter((name) => response.headers.has(name))
        .map((name) => [name, response.headers.get(name)]));
      result.observations.cdnHeaders = { ...headers, "cache-control": response.headers.get("cache-control") };
      requireCheck(Object.values(headers).some((value) => value.trim()), "No recognized CDN or intermediary headers");
    });
  } else {
    result.skipped.push("Live checks require --live (host and HTTPS redirects, CDN headers)");
  }

  return result;
}

async function main() {
  const { values } = parseArgs({ options: Object.fromEntries([
    ...["base", "public-origin", "concurrency", "limit", "report", "image-sample", "gsc-404-csv", "gsc-redirect-csv"]
      .map((name) => [name, { type: "string" }]),
    ["live", { type: "boolean" }]
  ]) });
  requireCheck(values.base, "Usage: node scripts/validate-sitemap.mjs --base <origin> [options]");
  const imageSample = values["image-sample"] ?? "50";
  const result = await validateSitemap({
    base: values.base,
    publicOrigin: values["public-origin"],
    concurrency: integer(values.concurrency ?? "8", "concurrency", 1),
    limit: values.limit === undefined ? Infinity : integer(values.limit, "limit", 0),
    imageSample: imageSample === "all" ? "all" : integer(imageSample, "image-sample", 0),
    csvPaths: [values["gsc-404-csv"], values["gsc-redirect-csv"]].filter(Boolean),
    live: values.live
  });
  const report = values.report ?? `reports/sitemap-validation/${result.timestamp.replaceAll(":", "-")}.json`;
  console.table(result.summary);
  console.log(`/ar status: ${result.observations.arStatus ?? "unavailable"}`);
  for (const reason of result.skipped) console.log(`Skipped: ${reason}`);
  for (const { group, target, message, cause } of result.failures.slice(0, 200)) {
    console.error(`[${group}] ${target}: ${message}${cause ? ` (${cause})` : ""}`);
  }
  if (result.failures.length > 200) console.error(`${result.failures.length - 200} more failures in JSON report`);
  await mkdir(dirname(report), { recursive: true });
  await writeFile(report, JSON.stringify(result, null, 2) + "\n");
  console.log(`Report: ${report}`);
  if (result.failures.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
