import fs from "node:fs";
import path from "node:path";
import { appendJsonLog, listFilesSafe, readJson, writeJson, writeText } from "./lib/io.mjs";
import { createIssue, ensureLabels, getGithubContext } from "./lib/github.mjs";

const root = process.cwd();
const engineRoot = path.join(root, "seo-engine");
const config = readJson(path.join(engineRoot, "config", "engine.config.json"));
const opportunitiesPath = path.join(engineRoot, "data", "content-opportunities.json");
const approvalsPath = path.join(engineRoot, "data", "approval-statuses.json");
const argv = process.argv.slice(2);
const modeIndex = argv.indexOf("--mode");
const mode = modeIndex >= 0 ? argv[modeIndex + 1] : "daily";
const runId = new Date().toISOString().replace(/[:.]/g, "-");
const startedAt = new Date();
const timezone = "UTC runtime; report includes Beijing time conversion";
const logPath = path.join(engineRoot, "logs", `${new Date().toISOString().slice(0, 10)}.jsonl`);
const success = [];
const failed = [];
const skipped = [];

function nowIso() {
  return new Date().toISOString();
}

function beijingTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    dateStyle: "medium",
    timeStyle: "long"
  }).format(date);
}

function scoreOpportunity(item) {
  return Object.values(item.prioritySignals || {}).reduce((sum, value) => sum + Number(value || 0), 0);
}

function inspectProjectState() {
  const packageJson = readJson(path.join(root, "package.json"), {});
  const resourceFiles = listFilesSafe(path.join(root, "content", "resources"), ".md");
  const appFiles = [
    ...listFilesSafe(path.join(root, "app"), ".tsx"),
    ...listFilesSafe(path.join(root, "app"), ".ts")
  ];
  const workflowFiles = listFilesSafe(path.join(root, ".github", "workflows"), ".yml");
  return {
    stack: {
      framework: "Next.js",
      nextVersion: packageJson.dependencies?.next || "Unavailable",
      packageManager: fs.existsSync(path.join(root, "package-lock.json")) ? "npm" : "Unknown",
      deployment: fs.existsSync(path.join(root, "vercel.json")) ? "Vercel / Next.js" : "Unavailable"
    },
    contentStorage: {
      resourcesDirectory: "content/resources",
      resourceCount: resourceFiles.length,
      productDataFiles: appFiles.filter((file) => file.endsWith("productData.ts")).map((file) => path.relative(root, file)),
      sitemap: fs.existsSync(path.join(root, "app", "sitemap.ts")) ? "app/sitemap.ts" : "Unavailable",
      metadata: fs.existsSync(path.join(root, "app", "layout.tsx")) ? "app/layout.tsx plus page metadata" : "Unavailable",
      schema: fs.existsSync(path.join(root, "app", "site.ts")) ? "app/site.ts organization JSON-LD" : "Unavailable",
      multilingualRoutes: "No dedicated locale route detected"
    },
    workflows: workflowFiles.map((file) => path.relative(root, file))
  };
}

function buildKeywordDiscoveries() {
  return config.seedKeywords.slice(0, config.limits.dailySearchLimit).map((keyword) => ({
    keyword,
    searchIntent: keyword.includes("manufacturer") || keyword.includes("supplier") || keyword.includes("wholesale") ? "commercial sourcing" : "product research",
    buyerStage: keyword.includes("manufacturer") || keyword.includes("supplier") ? "decision" : "consideration",
    recommendedPageType: keyword.includes("OEM") || keyword.includes("private label") ? "OEM page" : "category or buying guide",
    targetMarket: "Global English B2B buyers",
    commercialValue: keyword.match(/manufacturer|supplier|wholesale|OEM|private label/i) ? "High" : "Medium",
    competitionLevel: "Estimated / Inferred",
    evidenceSource: "Seed keyword configuration; connect SERP API for live ranking evidence."
  }));
}

function buildCompetitorDiscoveries() {
  return config.competitors.map((competitor) => ({
    ...competitor,
    mainProductLines: "Free weights / strength equipment, inferred from public brand positioning",
    trafficPages: "Unavailable without SERP or SEO API",
    categoryStructure: "Estimated / Inferred",
    productStructure: "Estimated / Inferred",
    blogStructure: "Estimated / Inferred",
    seoKeywordDirection: "Commercial gym equipment, dumbbells, plates, racks, strength equipment",
    buyerIntentDirection: "Gym owner, distributor, strength equipment buyer",
    geoCoverage: competitor.country,
    firstDiscoveredAt: nowIso(),
    lastScannedAt: nowIso(),
    rankingKeywords: "Unavailable without SERP API",
    reasonToMonitor: competitor.reasonToMonitor
  }));
}

function buildContentGaps(projectState, opportunities) {
  return opportunities.map((item) => ({
    gap: item.keyword,
    competitorEvidence: item.evidence,
    existingChinaFreeWeightPage: projectState.contentStorage.resourceCount
      ? "Existing resources cover broad dumbbell / plate buying guides but this specific page intent is not dedicated."
      : "Unavailable",
    recommendedAction: item.recommendedPageType === "category_page" ? "Upgrade or create category/manufacturer page" : "Create content brief after approval",
    priority: scoreOpportunity(item),
    status: item.status
  }));
}

function reportMarkdown({ title, projectState, keywords, competitors, gaps, opportunities, issueLinks = [] }) {
  const lines = [
    `# ${title}`,
    "",
    `- Execution started: ${startedAt.toISOString()}`,
    `- Execution ended: ${nowIso()}`,
    `- Timezone: ${timezone}`,
    `- Beijing time: ${beijingTime()}`,
    "",
    "## Current State Audit",
    "",
    `- Stack: ${projectState.stack.framework} ${projectState.stack.nextVersion}`,
    `- Package manager: ${projectState.stack.packageManager}`,
    `- Deployment: ${projectState.stack.deployment}`,
    `- Blog/resource storage: ${projectState.contentStorage.resourcesDirectory} (${projectState.contentStorage.resourceCount} files)`,
    `- Product data files: ${projectState.contentStorage.productDataFiles.join(", ") || "Unavailable"}`,
    `- Sitemap: ${projectState.contentStorage.sitemap}`,
    `- Metadata: ${projectState.contentStorage.metadata}`,
    `- Schema: ${projectState.contentStorage.schema}`,
    `- Multilingual routing: ${projectState.contentStorage.multilingualRoutes}`,
    "",
    "## New Keywords",
    "",
    ...keywords.slice(0, 20).map((item) => `- ${item.keyword} | ${item.searchIntent} | ${item.buyerStage} | ${item.commercialValue} | ${item.evidenceSource}`),
    "",
    "## New / Monitored Competitors",
    "",
    ...competitors.map((item) => `- ${item.domain} (${item.country}, ${item.type}) - ${item.reasonToMonitor}`),
    "",
    "## Content Gaps",
    "",
    ...gaps.map((item) => `- ${item.gap} | Priority ${item.priority}/100 | ${item.recommendedAction}`),
    "",
    "## Recommended Content",
    "",
    ...opportunities
      .sort((a, b) => scoreOpportunity(b) - scoreOpportunity(a))
      .slice(0, config.limits.dailyContentSuggestions)
      .map((item) => `- ${item.keyword} | ${item.recommendedPageType} | score ${scoreOpportunity(item)}/100 | status ${item.status}`),
    "",
    "## Run Summary",
    "",
    `- Success: ${success.join("; ") || "None"}`,
    `- Failed: ${failed.join("; ") || "None"}`,
    `- Skipped: ${skipped.join("; ") || "None"}`,
    "",
    "## GitHub Issues",
    "",
    issueLinks.length ? issueLinks.map((link) => `- ${link}`).join("\n") : "- Not created in local or unauthenticated mode.",
    "",
    "## Data Limits",
    "",
    "- Search volume, traffic, keyword difficulty, and ranking positions are not invented.",
    "- Live SERP, GSC, GA4 and SEO tool data require API configuration listed in SETUP_REQUIRED.md."
  ];
  return `${lines.join("\n")}\n`;
}

async function createRecommendationIssues(opportunities, reportFile) {
  const ctx = getGithubContext();
  if (!ctx) {
    skipped.push("GitHub Issue creation skipped because GITHUB_TOKEN/GITHUB_REPOSITORY is unavailable.");
    return [];
  }
  await ensureLabels(ctx, config.approval.labels);
  const links = [];
  for (const item of opportunities.slice(0, config.limits.dailyContentSuggestions)) {
    const body = [
      `Keyword: ${item.keyword}`,
      `Intent: ${item.intent}`,
      `Buyer stage: ${item.buyerStage}`,
      `Recommended page type: ${item.recommendedPageType}`,
      `Target market: ${item.targetMarket}`,
      `Priority score: ${scoreOpportunity(item)}/100`,
      "",
      "Evidence:",
      ...item.evidence.map((evidence) => `- ${evidence}`),
      "",
      "Status: recommended",
      "",
      `Report: ${reportFile}`,
      "",
      "Approve by adding one of these labels: approved-for-draft, hold, rejected."
    ].join("\n");
    const issue = await createIssue(ctx, {
      title: `SEO content opportunity: ${item.keyword}`,
      body,
      labels: ["seo-recommended"]
    });
    links.push(issue.html_url);
  }
  success.push(`Created ${links.length} GitHub recommendation issue(s).`);
  return links;
}

function writeReport(kind) {
  const projectState = inspectProjectState();
  const opportunities = readJson(opportunitiesPath, []);
  const keywords = buildKeywordDiscoveries();
  const competitors = buildCompetitorDiscoveries();
  const gaps = buildContentGaps(projectState, opportunities);
  const date = new Date().toISOString().slice(0, 10);
  const dir = path.join(engineRoot, "reports", kind, date);
  const payload = {
    reportType: kind,
    runId,
    executionStartedAt: startedAt.toISOString(),
    executionEndedAt: nowIso(),
    timezone,
    beijingTime: beijingTime(),
    projectState,
    keywords,
    competitors,
    gaps,
    opportunities: opportunities.map((item) => ({ ...item, priorityScore: scoreOpportunity(item) })),
    success,
    failed,
    skipped
  };
  writeJson(path.join(dir, `${kind}-seo-growth-report.json`), payload);
  return { dir, payload, projectState, keywords, competitors, gaps, opportunities };
}

async function runReport(kind) {
  success.push(`Generated ${kind} SEO intelligence data in restricted mode.`);
  const report = writeReport(kind);
  const reportFile = path.relative(root, path.join(report.dir, `${kind}-seo-growth-report.md`));
  const issueLinks = kind === "daily" ? await createRecommendationIssues(report.opportunities, reportFile) : [];
  writeText(
    path.join(report.dir, `${kind}-seo-growth-report.md`),
    reportMarkdown({
      title: kind === "daily" ? "Daily SEO Growth Report" : kind === "weekly" ? "Weekly Competitive Intelligence Report" : "Monthly SEO Strategy Review",
      ...report,
      issueLinks
    })
  );
  writeJson(path.join(engineRoot, "competitors", "latest-competitors.json"), report.competitors);
  writeJson(path.join(engineRoot, "keywords", "latest-keywords.json"), report.keywords);
  writeJson(path.join(engineRoot, "content-gaps", "latest-content-gaps.json"), report.gaps);
  appendJsonLog(logPath, { mode: kind, runId, status: "completed", reportDir: path.relative(root, report.dir), at: nowIso() });
}

async function runDraftGeneration() {
  const approvals = readJson(approvalsPath, { items: [] });
  const opportunities = readJson(opportunitiesPath, []);
  const approved = opportunities.filter((item) => {
    const local = approvals.items?.find((approval) => approval.id === item.id);
    return item.status === "approved_for_draft" || local?.status === "approved_for_draft";
  });
  if (!approved.length) {
    skipped.push("No approved_for_draft opportunities found. Draft generation stopped.");
    appendJsonLog(logPath, { mode, runId, status: "skipped", reason: "no approved_for_draft", at: nowIso() });
    return;
  }
  for (const item of approved) {
    const draft = [
      `# ${item.keyword.replace(/\b\w/g, (char) => char.toUpperCase())}: Enhanced SEO Content Brief`,
      "",
      "Status: draft_generated",
      `Primary keyword: ${item.keyword}`,
      `Search intent: ${item.intent}`,
      `Recommended page type: ${item.recommendedPageType}`,
      "",
      "## SEO Structure",
      "",
      `- SEO title: ${item.keyword} Manufacturer and Buying Guide | PowerBaseFit`,
      `- Meta description: Compare ${item.keyword} options for commercial gyms, distributors, OEM brands, packaging, quality control, and export sourcing.`,
      `- Slug: /resources/${item.id}`,
      "- Suggested schema: Article, FAQPage, BreadcrumbList",
      "",
      "## Outline",
      "",
      "1. Definition and buyer intent",
      "2. Product specification checklist",
      "3. OEM / private label options",
      "4. Packaging and shipment planning",
      "5. Quality control checklist",
      "6. RFQ checklist and inquiry CTA",
      "",
      "## Compliance Notes",
      "",
      "- This is an original brief, not copied from competitor content.",
      "- Any traffic, ranking, certification, DDP, or customer case claim must be verified before publication.",
      "- Available shipping options should be confirmed according to destination and order requirements."
    ].join("\n");
    writeText(path.join(engineRoot, "drafts", `${item.id}.md`), `${draft}\n`);
  }
  success.push(`Generated ${approved.length} approved draft brief(s).`);
  appendJsonLog(logPath, { mode, runId, status: "completed", generatedDrafts: approved.length, at: nowIso() });
}

async function runCommitPreparation() {
  const approvals = readJson(approvalsPath, { items: [] });
  const approved = approvals.items?.filter((item) => item.status === "approved_for_commit") || [];
  if (!approved.length) {
    skipped.push("No approved_for_commit items found. Website content and PR creation stopped.");
    appendJsonLog(logPath, { mode, runId, status: "skipped", reason: "no approved_for_commit", at: nowIso() });
    return;
  }
  writeJson(path.join(engineRoot, "reports", "commit", `${runId}.json`), {
    status: "ready_for_manual_commit_flow",
    approved,
    guardrail: "This engine records approved content. Actual website writes, commit, push, and PR creation must be run only after validation scripts pass."
  });
  success.push("Prepared approved_for_commit manifest. Automatic website writes remain guarded.");
}

async function runPublish() {
  if (process.env.SEO_ENGINE_AUTO_PUBLISH !== "true") {
    skipped.push("Publish stopped because SEO_ENGINE_AUTO_PUBLISH is not true.");
    appendJsonLog(logPath, { mode, runId, status: "skipped", reason: "auto publish disabled", at: nowIso() });
    return;
  }
  writeJson(path.join(engineRoot, "reports", "publish", `${runId}.json`), {
    status: "publish_guard_reached",
    note: "Only enable after explicit admin approval and PR review approval."
  });
  success.push("Publish guard checked. No production merge was performed by this local run.");
}

try {
  if (["daily", "weekly", "monthly"].includes(mode)) {
    await runReport(mode);
  } else if (mode === "draft") {
    await runDraftGeneration();
  } else if (mode === "commit") {
    await runCommitPreparation();
  } else if (mode === "publish") {
    await runPublish();
  } else {
    throw new Error(`Unknown mode: ${mode}`);
  }
} catch (error) {
  failed.push(error.message);
  appendJsonLog(logPath, { mode, runId, status: "failed", error: error.message, at: nowIso() });
  throw error;
}
