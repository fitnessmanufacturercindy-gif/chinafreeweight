import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "pagespeed");
const DATE_ID = new Date().toISOString().replace(/[:.]/g, "-");
const BASE_URL = (process.env.PAGESPEED_BASE_URL || "https://www.chinafreeweight.com").replace(/\/$/, "");
const RUNS = Math.max(1, Number(process.env.PAGESPEED_RUNS || 1));
const PATH_FILTER = (process.env.PAGESPEED_PATHS || "")
  .split(",")
  .map((item) => item.trim())
  .filter(Boolean);

const corePages = [
  { type: "home", path: "/" },
  { type: "category", path: "/products/dumbbells" },
  { type: "category", path: "/products/weight-plates" },
  { type: "category", path: "/products/gym-accessories" },
  { type: "category", path: "/products/racks-benches" },
  { type: "resources", path: "/resources" },
  { type: "resource-detail", path: "/resources/how-to-choose-commercial-dumbbells" },
  { type: "resource-detail", path: "/resources/evaluate-oem-gym-equipment-factory-china" },
  { type: "projects", path: "/projects" },
  { type: "contact", path: "/contact" },
  { type: "manufacturer", path: "/manufacturer/rubber-hex-dumbbell-manufacturer" },
  { type: "product", path: "/products/dumbbells/hex-dumbbell-kg" },
  { type: "product", path: "/products/dumbbells/chrome-dumbbell" },
  { type: "product", path: "/products/dumbbells/classic-rubber-round-dumbbell" },
  { type: "product", path: "/products/dumbbells/cpu-dumbbell-kg" },
  { type: "product", path: "/products/weight-plates/rubber-weight-plate" },
  { type: "product", path: "/products/weight-plates/cast-iron-weight-plate" },
  { type: "product", path: "/products/weight-plates/cpu-bumper-plate" },
  { type: "product", path: "/products/gym-accessories/rubber-coated-gym-handle-sets" },
  { type: "product", path: "/products/gym-accessories/cable-machine-attachments" },
  { type: "product", path: "/products/racks-benches/private-home-gym-rack-system" }
];
const pages = PATH_FILTER.length ? corePages.filter((page) => PATH_FILTER.includes(page.path)) : corePages;

function slugFor(page, formFactor, run) {
  const slug = page.path === "/" ? "home" : page.path.replace(/^\/|\/$/g, "").replace(/[^a-z0-9]+/gi, "-");
  return `${DATE_ID}-${slug}-${formFactor}-${run}.json`;
}

function lighthouseArgs(url, formFactor, outputPath) {
  const mobile = formFactor === "mobile";
  const args = [
    url,
    "--quiet",
    "--only-categories=performance,accessibility,best-practices,seo",
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

function score(category) {
  return Math.round((category?.score || 0) * 100);
}

function metric(audits, key) {
  return audits[key]?.numericValue ?? null;
}

function median(values) {
  const sorted = values.filter((value) => typeof value === "number").sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)] ?? null;
}

function summarizeRun(page, formFactor, runNumber, outputPath) {
  const report = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const audits = report.audits;
  const categories = report.categories;
  const networkItems = audits["network-requests"]?.details?.items || [];
  const lcpElement =
    audits["lcp-breakdown-insight"]?.details?.items?.find((item) => item.type === "node") ||
    audits["largest-contentful-paint-element"]?.details?.items?.[0]?.node ||
    null;
  const opportunities = Object.values(audits)
    .filter((audit) => audit.score !== null && audit.score !== undefined && audit.score < 0.9)
    .map((audit) => audit.title || audit.id)
    .slice(0, 8);

  return {
    type: page.type,
    url: `${BASE_URL}${page.path}`,
    formFactor,
    runNumber,
    performance: score(categories.performance),
    accessibility: score(categories.accessibility),
    bestPractices: score(categories["best-practices"]),
    seo: score(categories.seo),
    fcp: metric(audits, "first-contentful-paint"),
    lcp: metric(audits, "largest-contentful-paint"),
    cls: metric(audits, "cumulative-layout-shift"),
    tbt: metric(audits, "total-blocking-time"),
    speedIndex: metric(audits, "speed-index"),
    ttfb: metric(audits, "server-response-time"),
    networkCount: networkItems.length,
    transferBytes: networkItems.reduce((sum, item) => sum + (item.transferSize || 0), 0),
    lcpElement,
    mainProblems: opportunities,
    reportPath: path.relative(ROOT, outputPath)
  };
}

function aggregate(page, formFactor, runs) {
  const representative = [...runs].sort((a, b) => a.performance - b.performance)[Math.floor(runs.length / 2)];
  return {
    ...representative,
    performance: median(runs.map((run) => run.performance)),
    accessibility: median(runs.map((run) => run.accessibility)),
    bestPractices: median(runs.map((run) => run.bestPractices)),
    seo: median(runs.map((run) => run.seo)),
    fcp: median(runs.map((run) => run.fcp)),
    lcp: median(runs.map((run) => run.lcp)),
    cls: median(runs.map((run) => run.cls)),
    tbt: median(runs.map((run) => run.tbt)),
    speedIndex: median(runs.map((run) => run.speedIndex)),
    transferBytes: median(runs.map((run) => run.transferBytes)),
    networkCount: median(runs.map((run) => run.networkCount)),
    runs
  };
}

function ms(value) {
  return value === null || value === undefined ? "-" : `${Math.round(value)}ms`;
}

function kb(value) {
  return value === null || value === undefined ? "-" : `${Math.round(value / 1024)}KB`;
}

function markdown(results) {
  const rows = results
    .map((run) => `| ${run.formFactor} | ${run.type} | ${run.url} | ${run.performance} | ${run.accessibility} | ${run.bestPractices} | ${run.seo} | ${ms(run.fcp)} | ${ms(run.lcp)} | ${run.cls?.toFixed?.(3) ?? run.cls} | ${ms(run.tbt)} | ${kb(run.transferBytes)} | ${run.mainProblems.slice(0, 3).join("; ")} |`)
    .join("\n");
  const low = [...results].sort((a, b) => a.performance - b.performance).slice(0, 20);
  const lowRows = low.map((run, index) => `${index + 1}. ${run.performance} ${run.formFactor} ${run.url} - ${run.mainProblems.slice(0, 4).join("; ")}`).join("\n");
  return `# ChinaFreeWeight PageSpeed Core Audit

- Checked at: ${new Date().toISOString()}
- Base URL: ${BASE_URL}
- Pages: ${pages.length}
- Runs per page/form factor: ${RUNS}

| Mode | Type | URL | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT | Transfer | Main Problem |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
${rows}

## Lowest Performance Top 20

${lowRows}
`;
}

fs.mkdirSync(REPORT_DIR, { recursive: true });
const results = [];

for (const page of pages) {
  for (const formFactor of ["mobile", "desktop"]) {
    const runs = [];
    for (let run = 1; run <= RUNS; run += 1) {
      const outputPath = path.join(REPORT_DIR, slugFor(page, formFactor, run));
      const url = `${BASE_URL}${page.path}`;
      console.log(`[pagespeed] ${formFactor} ${run}/${RUNS} ${url}`);
      try {
        execFileSync(process.execPath, [path.join(ROOT, "node_modules", "lighthouse", "cli", "index.js"), ...lighthouseArgs(url, formFactor, outputPath)], {
          cwd: ROOT,
          stdio: "inherit",
          shell: false
        });
      } catch (error) {
        if (!fs.existsSync(outputPath)) throw error;
        console.warn(`Lighthouse exited after writing ${outputPath}. Continuing.`);
      }
      runs.push(summarizeRun(page, formFactor, run, outputPath));
    }
    results.push(aggregate(page, formFactor, runs));
  }
}

const jsonPath = path.join(REPORT_DIR, `${DATE_ID}-core-pagespeed.json`);
const mdPath = path.join(REPORT_DIR, `${DATE_ID}-core-pagespeed.md`);
fs.writeFileSync(jsonPath, `${JSON.stringify({ checkedAt: new Date().toISOString(), baseUrl: BASE_URL, pages, results }, null, 2)}\n`);
fs.writeFileSync(mdPath, markdown(results));
console.log(`PageSpeed core audit written:\n- ${mdPath}\n- ${jsonPath}`);
