import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const runSource = args.size === 0 || args.has("--source");
const runHtml = args.size === 0 || args.has("--html");

const leakTerms = [
  "title:",
  "meta_description:",
  "slug:",
  "primary_keyword:",
  "secondary_keyword:",
  "search_intent:",
  "buyer_intent:",
  "publishing_decision:",
  "product_context:",
  "quality_score:",
  "internal_notes:",
  "draft:",
  "Draft Review:",
  "Image Plan:",
  "Missing Evidence:",
  "Status: Missing:",
  "Content Strategy:",
  "Generation Notes:",
  "Image Asset Metadata",
  "Internal image notes",
  "synthetic_visual",
  "ai_generated_visual",
  "Describe verified",
  "Explain the practical",
  "Answer this"
];

const batchPages = [
  {
    slug: "chrome-dumbbell-manufacturer",
    path: "/manufacturer/chrome-dumbbell-manufacturer",
    title: "Chrome Dumbbell Manufacturer",
    type: "manufacturer",
    forbidden: ["Rubber Hex Dumbbell", "rubber coating", "hex head"]
  },
  {
    slug: "urethane-dumbbell-manufacturer",
    path: "/manufacturer/urethane-dumbbell-manufacturer",
    title: "Urethane Dumbbell Manufacturer",
    type: "manufacturer",
    forbidden: ["Rubber Hex", "hex dumbbell"]
  },
  {
    slug: "oem-dumbbells",
    path: "/oem/oem-dumbbells",
    title: "OEM Dumbbells",
    type: "oem",
    required: ["OEM", "customization", "private label", "branding"]
  },
  {
    slug: "private-label-dumbbells",
    path: "/oem/private-label-dumbbells",
    title: "Private Label Dumbbells",
    type: "oem",
    required: ["OEM", "customization", "private label", "branding"]
  },
  {
    slug: "weight-plate-manufacturer",
    path: "/manufacturer/weight-plate-manufacturer",
    title: "Weight Plate Manufacturer",
    type: "manufacturer",
    forbidden: ["dumbbell", "handle grip"]
  }
];

const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function walk(dir, predicate = () => true) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  const files = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const entryPath = path.join(absolute, entry.name);
    const relative = path.relative(root, entryPath).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      files.push(...walk(relative, predicate));
    } else if (predicate(relative)) {
      files.push(relative);
    }
  }
  return files;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function containsTerm(text, term) {
  return new RegExp(escapeRegExp(term), "i").test(text);
}

function visibleBody(html) {
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || html;
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "");
}

function mainContent(html) {
  return html.match(/<main[^>]*>([\s\S]*?)<\/main>/i)?.[1] || visibleBody(html);
}

function plainText(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|h1|h2|h3|li|tr|section|article)>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, "\"")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function htmlForBuiltPath(pagePath) {
  const relative = pagePath.replace(/^\//, "");
  const candidates = [
    `.next/server/app/${relative}.html`,
    `.next/server/app/${relative}/index.html`
  ];
  for (const candidate of candidates) {
    if (exists(candidate)) return read(candidate);
  }

  const htmlFiles = walk(".next/server/app", (file) => file.endsWith(".html"));
  return htmlFiles.map((file) => read(file)).find((html) => html.includes(`https://www.chinafreeweight.com${pagePath}`) || html.includes(pagePath));
}

function sourceAudit() {
  const routes = [
    "app/manufacturer/[slug]/page.tsx",
    "app/oem/[slug]/page.tsx"
  ];
  for (const route of routes) {
    if (!exists(route)) {
      fail(`缺少发布渲染器：${route}`);
      continue;
    }
    const source = read(route);
    for (const required of ["stripBackendSections", "customerVisibleForbidden", "Image Plan", "Missing Evidence", "Status: Missing", "synthetic_visual", "ai_generated_visual"]) {
      if (!source.includes(required)) fail(`${route} 未包含客户可见内容隔离规则：${required}`);
    }
    if (!source.includes("FAQPage") || !source.includes("BreadcrumbList")) {
      fail(`${route} 未生成 FAQPage 或 BreadcrumbList JSON-LD。`);
    }
  }

  const blogDataPath = "app/resources/blogData.ts";
  if (exists(blogDataPath)) {
    const blogData = read(blogDataPath);
    if (!blogData.includes("getPublicArticleContent") || !blogData.includes("Image Planning and AI Image Prompts")) {
      fail(`${blogDataPath} 未隔离资源文章图片规划内部字段。`);
    }
  }

  const metadataFiles = walk("public/seo-assets", (file) => file.endsWith(".json"));
  if (metadataFiles.length) {
    fail(`public/seo-assets 中存在可能暴露图片内部元数据的 JSON 文件：${metadataFiles.join(", ")}`);
  }
}

function scanHtmlLeak(file, html) {
  const bodyText = plainText(visibleBody(html));
  const leaked = leakTerms.filter((term) => containsTerm(bodyText, term));
  if (leaked.length) {
    fail(`${file} 的客户可见正文包含内部字段：${leaked.join(", ")}`);
  }
}

function seoAudit(page, html) {
  const main = mainContent(html);
  const text = plainText(main);
  const h1Count = (main.match(/<h1\b/gi) || []).length;
  const h1Text = plainText(main.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "");
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "";
  const metaDescription = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i)?.[1] || "";
  const canonical = html.match(/<link\s+rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)?.[1] || "";
  const expectedCanonical = `https://www.chinafreeweight.com${page.path}`;

  if (h1Count !== 1) fail(`${page.path} H1 数量应为 1，实际为 ${h1Count}。`);
  if (!h1Text.toLowerCase().includes(page.title.toLowerCase())) fail(`${page.path} H1 不匹配：${h1Text}`);
  if (!title) fail(`${page.path} 缺少 <title>。`);
  if (!metaDescription) fail(`${page.path} 缺少 meta description。`);
  if (canonical !== expectedCanonical) fail(`${page.path} canonical 错误：${canonical || "缺失"}`);
  if (!html.includes("\"@type\":\"BreadcrumbList\"") && !html.includes("\"@type\":\"BreadcrumbList\"".replace(/"/g, "&quot;"))) {
    fail(`${page.path} 缺少 BreadcrumbList JSON-LD。`);
  }
  if (!html.includes("\"@type\":\"FAQPage\"") && !html.includes("\"@type\":\"FAQPage\"".replace(/"/g, "&quot;"))) {
    fail(`${page.path} 缺少 FAQPage JSON-LD。`);
  }
  if (!/FAQ/i.test(text)) fail(`${page.path} 正文未显示 FAQ。`);
  if (!/Request|quotation|contact|inquiry/i.test(text)) fail(`${page.path} 缺少 CTA。`);
  if (/<img\b/i.test(main)) {
    const imagesWithoutAlt = [...main.matchAll(/<img\b[^>]*>/gi)].filter((match) => !/\salt=["'][^"']+["']/i.test(match[0]));
    if (imagesWithoutAlt.length) fail(`${page.path} 存在缺少 ALT 的图片。`);
  }
}

function productContextAudit(page, html) {
  const text = plainText(mainContent(html));
  for (const term of page.forbidden || []) {
    if (containsTerm(text, term)) fail(`${page.path} 产品上下文污染：出现 ${term}`);
  }
  for (const term of page.required || []) {
    if (!containsTerm(text, term)) fail(`${page.path} 缺少必要 OEM/商业上下文：${term}`);
  }
}

function sitemapAudit() {
  const sitemapFiles = [
    ".next/server/app/sitemap.xml.body",
    ".next/server/app/sitemap.xml"
  ];
  const sitemapPath = sitemapFiles.find(exists);
  if (!sitemapPath) {
    warn("构建产物中未找到 sitemap.xml，跳过本地 Sitemap 检查。");
    return;
  }
  const sitemap = read(sitemapPath);
  for (const page of batchPages) {
    const expectedUrl = `https://www.chinafreeweight.com${page.path}`;
    if (!sitemap.includes(expectedUrl)) fail(`Sitemap 未包含 ${expectedUrl}`);
  }
}

function builtHtmlAudit() {
  const htmlFiles = walk(".next/server/app", (file) => file.endsWith(".html"));
  if (!htmlFiles.length) {
    fail("未找到 .next/server/app 下的 HTML 构建产物，无法执行客户可见 HTML 扫描。");
    return;
  }
  for (const file of htmlFiles) {
    scanHtmlLeak(file, read(file));
  }
  for (const page of batchPages) {
    const html = htmlForBuiltPath(page.path);
    if (!html) {
      fail(`未找到 Batch-01 页面构建产物：${page.path}`);
      continue;
    }
    seoAudit(page, html);
    productContextAudit(page, html);
  }
  sitemapAudit();
}

if (runSource) sourceAudit();
if (runHtml) builtHtmlAudit();

for (const message of warnings) {
  console.warn(`WARN: ${message}`);
}

if (failures.length) {
  console.error("Customer Visible Content Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Customer Visible Content Validation passed.");
