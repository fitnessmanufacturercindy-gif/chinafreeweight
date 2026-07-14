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
const warnings = [];
const requestCache = new Map();
const headFallbackStatuses = new Set([403, 405, 429]);
const unavailable = "暂不可用";

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

function isConfigured(...names) {
  return names.every((name) => Boolean(process.env[name]));
}

function getApiStatus() {
  return {
    gsc: {
      label: "Google Search Console",
      configured: isConfigured("GSC_SERVICE_ACCOUNT_JSON", "GSC_SITE_URL"),
      requiredFor: "自有网站真实查询、点击、展示、平均排名"
    },
    ga4: {
      label: "GA4",
      configured: isConfigured("GA4_PROPERTY_ID") && (isConfigured("GA4_CLIENT_EMAIL", "GA4_PRIVATE_KEY") || Boolean(process.env.GA4_SERVICE_ACCOUNT_JSON)),
      requiredFor: "网站真实访问、互动和转化"
    },
    serp: {
      label: "SERP API",
      configured: isConfigured("SERP_API_PROVIDER", "SERP_API_KEY"),
      requiredFor: "Google 实时排名、SERP 竞争页面、AI Overview/搜索结果证据"
    },
    keywordData: {
      label: "Keyword Data API",
      configured: Boolean(process.env.SEO_TOOL_API_KEY || process.env.KEYWORD_DATA_API_KEY || process.env.GOOGLE_ADS_KEYWORD_PLANNER_TOKEN),
      requiredFor: "Search Volume、Keyword Difficulty、第三方流量估算"
    }
  };
}

function getDataSourceNotes(apiStatus = getApiStatus()) {
  return [
    {
      metric: "Google排名",
      source: "需要 SERP API",
      status: apiStatus.serp.configured ? "已配置" : unavailable
    },
    {
      metric: "自有网站平均排名",
      source: "需要 Google Search Console",
      status: apiStatus.gsc.configured ? "已配置" : unavailable
    },
    {
      metric: "Search Volume",
      source: "需要 Google Ads Keyword Planner 或 SEO 工具 API",
      status: apiStatus.keywordData.configured ? "已配置" : unavailable
    },
    {
      metric: "Keyword Difficulty",
      source: "需要第三方 SEO 工具 API",
      status: apiStatus.keywordData.configured ? "已配置" : unavailable
    },
    {
      metric: "Traffic Estimate",
      source: "属于第三方估算数据，不等同于 GA4 真实访问",
      status: apiStatus.keywordData.configured ? "已配置" : unavailable
    },
    {
      metric: "网站真实访问和转化",
      source: "需要 GA4",
      status: apiStatus.ga4.configured ? "已配置" : unavailable
    }
  ];
}

function normalizeUrl(url) {
  if (!url) return "";
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).toString();
  } catch {
    return "";
  }
}

async function requestUrl(url, method) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  const checkedAt = nowIso();
  try {
    const response = await fetch(url, {
      method,
      redirect: "manual",
      signal: controller.signal,
      headers: {
        "User-Agent": "ChinaFreeWeight SEO compatibility checker; +https://seo.chinafreeweight.com",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
      }
    });
    return { method, status: response.status, ok: response.status >= 200 && response.status <= 399, checkedAt };
  } catch (error) {
    return {
      method,
      status: null,
      ok: false,
      checkedAt,
      error: error.name === "AbortError" ? "timeout" : "network_error"
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function checkPageAccess(url) {
  const normalized = normalizeUrl(url);
  if (!normalized) {
    return {
      url,
      accessible: false,
      checkedAt: nowIso(),
      message: "URL 格式无效。",
      attempts: []
    };
  }
  if (requestCache.has(normalized)) return requestCache.get(normalized);

  const checkPromise = (async () => {
    const head = await requestUrl(normalized, "HEAD");
    if (head.ok) {
      return {
        url: normalized,
        accessible: true,
        checkedAt: head.checkedAt,
        methodUsed: "HEAD",
        headStatus: head.status,
        getStatus: null,
        message: "HEAD 请求正常，页面可访问。",
        attempts: [head]
      };
    }

    const shouldFallback = headFallbackStatuses.has(Number(head.status)) || head.error || !head.ok;
    if (!shouldFallback) {
      return {
        url: normalized,
        accessible: false,
        checkedAt: head.checkedAt,
        methodUsed: "HEAD",
        headStatus: head.status,
        getStatus: null,
        message: "HEAD 请求失败。",
        attempts: [head]
      };
    }

    const get = await requestUrl(normalized, "GET");
    if (get.ok) {
      return {
        url: normalized,
        accessible: true,
        checkedAt: get.checkedAt,
        methodUsed: "GET",
        headStatus: head.status,
        getStatus: get.status,
        message: "该页面不支持HEAD请求，但GET访问正常。",
        attempts: [head, get],
        warning: true
      };
    }

    return {
      url: normalized,
      accessible: false,
      checkedAt: get.checkedAt,
      methodUsed: "GET",
      headStatus: head.status,
      getStatus: get.status,
      message: "HEAD 和 GET 都失败，页面不可访问。",
      attempts: [head, get]
    };
  })();
  requestCache.set(normalized, checkPromise);
  return checkPromise;
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
    competitionLevel: unavailable,
    searchVolume: unavailable,
    keywordDifficulty: unavailable,
    preciseRanking: unavailable,
    evidenceSource: "Seed keyword configuration; connect SERP API for live ranking evidence."
  }));
}

function readStoredCompetitors() {
  const competitorDir = path.join(engineRoot, "data", "competitors");
  return listFilesSafe(competitorDir, ".json").flatMap((file) => {
    try {
      const data = readJson(file, {});
      return Array.isArray(data.competitors) ? data.competitors : [];
    } catch {
      return [];
    }
  });
}

function mergeCompetitorSources() {
  const merged = new Map();
  for (const competitor of [...config.competitors, ...readStoredCompetitors()]) {
    if (!competitor.domain) continue;
    const existing = merged.get(competitor.domain) || {};
    merged.set(competitor.domain, { ...existing, ...competitor });
  }
  return [...merged.values()];
}

async function buildCompetitorDiscoveries() {
  const competitors = [];
  for (const competitor of mergeCompetitorSources()) {
    const urls = [competitor.relevantPage, ...(competitor.relevantPages || []), `https://${competitor.domain}`].filter(Boolean);
    const accessChecks = [];
    for (const url of [...new Set(urls)].slice(0, 3)) {
      const check = await checkPageAccess(url);
      accessChecks.push(check);
      if (check.warning) warnings.push(`${check.url}: ${check.message} HEAD=${check.headStatus || "无"} GET=${check.getStatus || "无"} at ${check.checkedAt}`);
      if (!check.accessible) failed.push(`${check.url}: ${check.message} HEAD=${check.headStatus || "无"} GET=${check.getStatus || "无"} at ${check.checkedAt}`);
    }
    competitors.push({
      ...competitor,
      mainProductLines: competitor.mainProductLines || "Free weights / strength equipment, inferred from public brand positioning",
      trafficPages: unavailable,
      trafficEstimate: unavailable,
      categoryStructure: unavailable,
      productStructure: unavailable,
      blogStructure: unavailable,
      seoKeywordDirection: competitor.seoKeywordDirection || "Commercial gym equipment, dumbbells, plates, racks, strength equipment",
      buyerIntentDirection: competitor.buyerIntentDirection || "Gym owner, distributor, strength equipment buyer",
      geoCoverage: competitor.country,
      firstDiscoveredAt: nowIso(),
      lastScannedAt: nowIso(),
      rankingKeywords: unavailable,
      preciseRanking: unavailable,
      accessChecks,
      reasonToMonitor: competitor.reasonToMonitor
    });
  }
  return competitors;
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

function reportMarkdown({ title, projectState, keywords, competitors, gaps, opportunities, apiStatus, dataSourceNotes, issueLinks = [] }) {
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
    ...keywords.slice(0, 20).map((item) => `- ${item.keyword} | ${item.searchIntent} | ${item.buyerStage} | ${item.commercialValue} | 精确排名: ${item.preciseRanking} | 搜索量: ${item.searchVolume} | 难度: ${item.keywordDifficulty} | ${item.evidenceSource}`),
    "",
    "## New / Monitored Competitors",
    "",
    ...competitors.map((item) => `- ${item.domain} (${item.country}, ${item.type}) - 流量估算: ${item.trafficEstimate} - ${item.reasonToMonitor}`),
    "",
    "## Page Access Checks",
    "",
    ...competitors.flatMap((item) => (item.accessChecks || []).map((check) => `- ${check.accessible ? "可访问" : "失败"} | ${check.url} | method: ${check.methodUsed || "N/A"} | HEAD: ${check.headStatus || "无"} | GET: ${check.getStatus || "无"} | checked: ${check.checkedAt} | ${check.message}`)),
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
    "## Warnings or Compatibility Notes",
    "",
    warnings.length ? warnings.map((item) => `- ${item}`).join("\n") : "- None",
    "",
    "## GitHub Issues",
    "",
    issueLinks.length ? issueLinks.map((link) => `- ${link}`).join("\n") : "- Not created in local or unauthenticated mode.",
    "",
    "## API Configuration Status",
    "",
    ...Object.values(apiStatus).map((item) => `- ${item.label}: ${item.configured ? "已配置" : "未配置"}；用途：${item.requiredFor}`),
    "",
    "## Data Source Status",
    "",
    ...dataSourceNotes.map((item) => `- ${item.metric}: ${item.status}；${item.source}`),
    "",
    "## Data Limits",
    "",
    "- Search volume, traffic, keyword difficulty, and ranking positions are not invented.",
    "- Google排名需要 SERP API。",
    "- 自有网站平均排名需要 Google Search Console。",
    "- Search Volume 需要 Google Ads Keyword Planner 或 SEO 工具 API。",
    "- Keyword Difficulty 需要第三方 SEO 工具 API。",
    "- Traffic Estimate 属于第三方估算数据，不等同于 GA4 真实访问。",
    "- 网站真实访问和转化需要 GA4。"
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

async function writeReport(kind) {
  const projectState = inspectProjectState();
  const opportunities = readJson(opportunitiesPath, []);
  const apiStatus = getApiStatus();
  const dataSourceNotes = getDataSourceNotes(apiStatus);
  const keywords = buildKeywordDiscoveries();
  const competitors = await buildCompetitorDiscoveries();
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
    apiStatus,
    dataSourceNotes,
    keywords,
    competitors,
    gaps,
    opportunities: opportunities.map((item) => ({ ...item, priorityScore: scoreOpportunity(item) })),
    success,
    failed,
    warnings,
    skipped
  };
  writeJson(path.join(dir, `${kind}-seo-growth-report.json`), payload);
  return { dir, payload, projectState, apiStatus, dataSourceNotes, keywords, competitors, gaps, opportunities };
}

async function runReport(kind) {
  success.push(`Generated ${kind} SEO intelligence data in restricted mode.`);
  const report = await writeReport(kind);
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
