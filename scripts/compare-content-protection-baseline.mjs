import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baselinePath = resolve(process.argv[2]);
const afterPath = resolve(process.argv[3]);
const outputPath = resolve(process.argv[4]);
const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const after = JSON.parse(await readFile(afterPath, "utf8"));
const baselineSite = baseline.sites.find((site) => site.siteId === "chinafreeweight");
const afterSite = after.sites.find((site) => site.siteId === "chinafreeweight");

if (!baselineSite || !afterSite) throw new Error("ChinaFreeWeight baseline or after-deploy site data is missing.");

const afterByUrl = new Map(afterSite.protectedUrls.map((entry) => [entry.url, entry]));
const protectedFields = ["status", "indexable", "canonical", "hreflang", "title", "h1", "schemaTypes"];
const regressions = [];

for (const beforeEntry of baselineSite.protectedUrls) {
  const afterEntry = afterByUrl.get(beforeEntry.url);
  if (!afterEntry) {
    regressions.push({ url: beforeEntry.url, field: "sitemap", before: "present", after: "missing" });
    continue;
  }
  for (const field of protectedFields) {
    const beforeValue = JSON.stringify(beforeEntry[field] ?? null);
    const afterValue = JSON.stringify(afterEntry[field] ?? null);
    if (beforeValue !== afterValue) {
      regressions.push({
        url: beforeEntry.url,
        field,
        before: beforeEntry[field] ?? null,
        after: afterEntry[field] ?? null,
      });
    }
  }
}

const newPath = "https://www.chinafreeweight.com/resources/cable-attachment-sku-compatibility-register";
const newEntry = afterByUrl.get(newPath);
const report = {
  schemaVersion: 1,
  checkedAt: new Date().toISOString(),
  baselineCapturedAt: baseline.capturedAt,
  afterCapturedAt: after.capturedAt,
  protectedUrlCount: baselineSite.urlCount,
  afterUrlCount: afterSite.urlCount,
  protectedRegressionCount: regressions.length,
  regressions,
  newUrl: {
    url: newPath,
    inSitemap: Boolean(newEntry),
    status: newEntry?.status ?? 0,
    indexable: newEntry?.indexable ?? false,
    canonical: newEntry?.canonical ?? "",
    title: newEntry?.title ?? "",
    h1: newEntry?.h1 ?? "",
    schemaTypes: newEntry?.schemaTypes ?? [],
  },
  passed: regressions.length === 0
    && afterSite.urlCount === baselineSite.urlCount + 1
    && newEntry?.status === 200
    && newEntry?.indexable === true
    && newEntry?.canonical === newPath
    && newEntry?.schemaTypes?.includes("BlogPosting")
    && newEntry?.schemaTypes?.includes("FAQPage")
    && newEntry?.schemaTypes?.includes("BreadcrumbList"),
};

await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(JSON.stringify({
  outputPath,
  protectedUrlCount: report.protectedUrlCount,
  afterUrlCount: report.afterUrlCount,
  protectedRegressionCount: report.protectedRegressionCount,
  newUrl: report.newUrl,
  passed: report.passed,
}, null, 2));
if (!report.passed) process.exitCode = 2;
