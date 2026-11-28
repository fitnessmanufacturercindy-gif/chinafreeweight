import { readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

export function decodeEntities(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return value.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (entity, code) => {
    if (!code.startsWith("#")) return named[code.toLowerCase()];
    const point = code[1].toLowerCase() === "x" ? Number.parseInt(code.slice(2), 16) : Number(code.slice(1));
    return point <= 0x10ffff ? String.fromCodePoint(point) : entity;
  });
}

export function attributes(tag) {
  return Object.fromEntries(
    Array.from(
      tag.replace(/^<[^\s>]+/, "").matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g),
      ([, name, double, single, bare]) => [name.toLowerCase(), decodeEntities(double ?? single ?? bare)]
    )
  );
}

export function alternates(tags) {
  return Array.from(tags, ([tag]) => attributes(tag))
    .filter(({ rel, hreflang }) => rel?.toLowerCase().split(/\s+/).includes("alternate") && hreflang !== undefined)
    .map(({ hreflang, href }) => [hreflang, href]);
}

export function sortedLinks(links) {
  return links.map((link) => JSON.stringify(link)).sort().join("\n");
}

export function verifyBuiltHreflang(buildDir = ".next") {
  const appDir = join(buildDir, "server", "app");
  const xml = readFileSync(join(appDir, "sitemap.xml.body"), "utf8");
  const { routes } = JSON.parse(readFileSync(join(buildDir, "prerender-manifest.json"), "utf8"));
  const { redirects } = JSON.parse(readFileSync(join(buildDir, "routes-manifest.json"), "utf8"));
  const unconditionalRedirects = redirects.filter(({ has, missing }) => !has?.length && !missing?.length)
    .map(({ regex }) => new RegExp(regex));

  const entries = Array.from(xml.matchAll(/<url>([\s\S]*?)<\/url>/g), ([, entry]) => ({
    url: decodeEntities(entry.match(/<loc>([^<]+)<\/loc>/)?.[1] ?? ""),
    links: alternates(entry.matchAll(/<xhtml:link\b[^>]*>/g))
  }));
  if (!entries.length || entries.some(({ url }) => !url)) {
    throw new Error("Expected page URLs in the built sitemap");
  }

  const clusters = new Map(entries.map(({ url, links }) => [url, sortedLinks(links)]));
  if (clusters.size !== entries.length) throw new Error("Duplicate sitemap URLs");

  const mismatches = [];
  const languageCodes = new Set();
  for (const { url, links } of entries) {
    const { pathname } = new URL(url);
    const errors = [];
    const cluster = new Map(links);
    if (!routes[pathname] || (routes[pathname].initialStatus ?? 200) !== 200 ||
        unconditionalRedirects.some((regex) => regex.test(pathname))) {
      errors.push("URL is missing from the prerendered 200 routes or matches a redirect");
    }

    if (cluster.size !== links.length) errors.push("Duplicate hreflang codes");
    if (!links.some(([code, href]) => code !== "x-default" && href === url)) {
      errors.push("Missing self hreflang");
    }
    if (cluster.get("x-default") !== cluster.get("en")) {
      errors.push("x-default must equal English or be absent with English");
    }
    for (const [code, href] of links) {
      if (code !== "x-default") languageCodes.add(code);
      if (clusters.get(href) !== clusters.get(url)) errors.push(`Non-reciprocal alternate: ${code} ${href}`);
    }

    try {
      const html = readFileSync(join(appDir, pathname === "/" ? "index.html" : `${pathname.slice(1)}.html`), "utf8");
      const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
      const headLinks = alternates(head.matchAll(/<link\b[^>]*>/gi));
      if (sortedLinks(headLinks) !== clusters.get(url)) {
        const expected = new Set(links.map((link) => JSON.stringify(link)));
        const actual = new Set(headLinks.map((link) => JSON.stringify(link)));
        errors.push(`HTML alternates differ (missing: ${[...expected].filter((link) => !actual.has(link)).join(", ") || "none"}; extra: ${[...actual].filter((link) => !expected.has(link)).join(", ") || "none"}; sitemap/HTML counts: ${links.length}/${headLinks.length})`);
      }

      const canonicals = Array.from(head.matchAll(/<link\b[^>]*>/gi), ([tag]) => attributes(tag))
        .filter(({ rel }) => rel === "canonical").map(({ href }) => href);
      if (canonicals.length !== 1 || canonicals[0] !== url) errors.push("HTML canonical differs from sitemap loc");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      errors.push("Missing prerendered HTML");
    }
    if (errors.length) mismatches.push({ url, errors });
  }

  // x-default is a special hreflang value, so validate only actual language tags.
  for (const code of languageCodes) {
    if (Intl.getCanonicalLocales(code)[0] !== code) throw new Error(`Noncanonical language code: ${code}`);
  }

  return { checked: entries.length, languageCodes: [...languageCodes].sort(), mismatches };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { checked, languageCodes, mismatches } = verifyBuiltHreflang(process.argv[2]);
  for (const { url, errors } of mismatches) console.error(url, errors);
  console.log(`Checked ${checked} sitemap URLs. Mismatches: ${mismatches.length}. Languages: ${languageCodes.join(", ")}.`);
  if (mismatches.length) process.exitCode = 1;
}
