import sitemap from "../app/sitemap";

const shouldRun = process.env.VERCEL_ENV === "production" || process.env.SITEMAP_REGRESSION_CHECK === "1";

if (!shouldRun) {
  console.log("Production sitemap regression guard skipped outside a production build.");
  process.exit(0);
}

const productionOrigin = (process.env.SITEMAP_GUARD_BASE_URL || "https://www.chinafreeweight.com").replace(/\/$/u, "");
const allowlist = new Set(
  (process.env.SITEMAP_REMOVAL_ALLOWLIST || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean)
);

function comparableUrl(value: string) {
  const url = new URL(value, productionOrigin);
  return `${url.pathname.replace(/\/$/u, "") || "/"}${url.search}`;
}

async function main() {
  let response: Response | undefined;
  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(`${productionOrigin}/sitemap.xml`, {
        headers: { "user-agent": "ChinaFreeWeight production sitemap regression guard" },
        signal: AbortSignal.timeout(30_000)
      });
      if (response.ok || attempt === 3) break;
      await response.body?.cancel();
    } catch (error) {
      lastError = error;
      if (attempt === 3) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 500));
  }

  if (!response) throw lastError instanceof Error ? lastError : new Error("Production sitemap request failed.");

  if (!response.ok) {
    throw new Error(`Production sitemap regression guard could not read ${productionOrigin}/sitemap.xml: HTTP ${response.status}`);
  }

  const liveXml = await response.text();
  const liveUrls = [...liveXml.matchAll(/<loc>([^<]+)<\/loc>/gu)].map((match) => comparableUrl(match[1].replace(/&amp;/gu, "&")));
  const candidateUrls = new Set(sitemap().map((entry) => comparableUrl(entry.url)));

  if (liveUrls.length === 0 || candidateUrls.size === 0) {
    throw new Error(`Production sitemap regression guard received an empty URL set (live=${liveUrls.length}, candidate=${candidateUrls.size}).`);
  }

  const missing = [...new Set(liveUrls.filter((url) => !candidateUrls.has(url) && !allowlist.has(url)))];

  if (missing.length > 0) {
    const sample = missing.slice(0, 20).map((url) => `  - ${url}`).join("\n");
    throw new Error(
      `Production sitemap regression blocked: candidate build removes ${missing.length} live URL(s) `
      + `(live=${liveUrls.length}, candidate=${candidateUrls.size}).\n${sample}`
    );
  }

  console.log(`Production sitemap regression guard passed: live=${liveUrls.length}, candidate=${candidateUrls.size}, removed=0.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
