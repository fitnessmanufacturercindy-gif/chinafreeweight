#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");

const ROOT = process.cwd();
const REPORT_DIR = path.join(ROOT, "reports", "daily-site-health");

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: options.stdio || "pipe",
    shell: false
  }).trim();
}

function unique(values) {
  return [...new Set(values)];
}

function latestReportPath() {
  if (!fs.existsSync(REPORT_DIR)) return null;
  return fs
    .readdirSync(REPORT_DIR)
    .filter((name) => /site-health-report\.json$/.test(name))
    .sort()
    .map((name) => path.join(REPORT_DIR, name))
    .pop();
}

function sourceStatus() {
  return run("git", [
    "status",
    "--porcelain",
    "--",
    "app",
    "public",
    "scripts",
    "tests",
    "docs",
    "package.json",
    "package-lock.json",
    "next.config.mjs",
    "playwright.config.js"
  ]);
}

function isSourceClean() {
  return sourceStatus() === "";
}

function listSourceFiles() {
  const files = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      if (entry.isFile() && /\.(tsx|jsx|ts|js)$/.test(entry.name)) files.push(fullPath);
    }
  };
  walk(path.join(ROOT, "app"));
  return files;
}

function publicPathFromUrl(src) {
  try {
    const pathname = new URL(src).pathname;
    return pathname.startsWith("/") ? pathname : `/${pathname}`;
  } catch {
    return src.startsWith("/") ? src : null;
  }
}

function replacementForBrokenAsset(publicPath) {
  if (!publicPath) return null;
  const current = path.join(ROOT, "public", publicPath.replace(/^\//, ""));
  const parsed = path.parse(current);
  const publicParsed = path.parse(publicPath);
  const candidates = [
    path.join(parsed.dir, `${parsed.name}-optimized${parsed.ext}`),
    path.join(parsed.dir, `${parsed.name}.webp`),
    path.join(parsed.dir, `${parsed.name}.png`),
    path.join(parsed.dir, `${parsed.name}.jpg`),
    path.join(parsed.dir, `${parsed.name}.jpeg`)
  ];

  for (const candidate of candidates) {
    if (candidate !== current && fs.existsSync(candidate) && fs.statSync(candidate).size > 0) {
      const candidateName = path.basename(candidate);
      return path.posix.join(publicParsed.dir.replace(/\\/g, "/"), candidateName);
    }
  }
  return null;
}

function fixBrokenImagePaths(report) {
  const replacements = new Map();
  for (const finding of report.issues || []) {
    if (finding.area !== "images") continue;
    for (const image of finding.details?.images || []) {
      const publicPath = publicPathFromUrl(image.src);
      const replacement = replacementForBrokenAsset(publicPath);
      if (replacement) replacements.set(publicPath, replacement);
    }
  }

  if (replacements.size === 0) return [];

  const changed = [];
  for (const file of listSourceFiles()) {
    let source = fs.readFileSync(file, "utf8");
    const before = source;
    for (const [from, to] of replacements) {
      source = source.split(from).join(to);
    }
    if (source !== before) {
      fs.writeFileSync(file, source);
      changed.push(path.relative(ROOT, file));
    }
  }
  return changed;
}

function altFromImagePath(src) {
  const clean = src
    .split("/")
    .pop()
    .replace(/\.(avif|webp|png|jpe?g|gif|svg)$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
  return clean || "PowerBaseFit product image";
}

function addMissingImgAlt() {
  const changed = [];
  const imgWithoutAlt = /<img(?![^>]*\salt=)([^>]*\ssrc=(?:"([^"]+)"|'([^']+)')[^>]*)>/g;
  for (const file of listSourceFiles()) {
    const before = fs.readFileSync(file, "utf8");
    const after = before.replace(imgWithoutAlt, (match, attrs, srcA, srcB) => {
      const alt = altFromImagePath(srcA || srcB || "");
      return `<img alt="${alt}"${attrs}>`;
    });
    if (after !== before) {
      fs.writeFileSync(file, after);
      changed.push(path.relative(ROOT, file));
    }
  }
  return changed;
}

function buildPrBody(report, changes) {
  const candidates = report.autoFixes?.candidates || [];
  return [
    "Automated safe-fix PR from the daily site health workflow.",
    "",
    "Scope:",
    ...changes.map((item) => `- ${item}`),
    "",
    "Health findings considered:",
    ...candidates.slice(0, 20).map((item) => `- ${item.severity} / ${item.area}: ${item.message} (${item.url})`),
    "",
    "Guardrails:",
    "- No direct merge to main.",
    "- No product data, brand, contact, canonical, hreflang, indexed URL, layout, or long-form translation rewrites."
  ].join("\n");
}

function main() {
  const reportPath = latestReportPath();
  if (!reportPath) {
    console.log("No site health report found. Run npm run site:health first.");
    return;
  }

  const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
  const candidates = report.autoFixes?.candidates || report.issues?.filter((item) => item.autoFixable) || [];
  if (candidates.length === 0) {
    console.log("No safe auto-fix candidates found.");
    return;
  }

  if (!isSourceClean()) {
    console.log("Source working tree is not clean. Skipping auto-fix branch creation to avoid mixing unrelated changes.");
    return;
  }

  const date = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  const branch = `codex/site-health-safe-fixes-${date}`;
  run("git", ["checkout", "-b", branch], { stdio: "inherit" });

  const changedFiles = unique([...fixBrokenImagePaths(report), ...addMissingImgAlt()]);
  if (changedFiles.length === 0 || isSourceClean()) {
    run("git", ["checkout", "-"], { stdio: "inherit" });
    run("git", ["branch", "-D", branch], { stdio: "inherit" });
    console.log("Safe candidates were found, but no source-level safe edits could be applied automatically.");
    return;
  }

  run("git", ["add", ...changedFiles], { stdio: "inherit" });
  run("git", ["commit", "-m", "fix: apply safe site health fixes"], { stdio: "inherit" });

  if (process.env.CREATE_PR === "true") {
    run("git", ["push", "-u", "origin", branch], { stdio: "inherit" });
    const body = buildPrBody(report, changedFiles);
    run("gh", [
      "pr",
      "create",
      "--title",
      "Safe site health fixes",
      "--body",
      body,
      "--base",
      "main",
      "--head",
      branch
    ], { stdio: "inherit" });
  }

  console.log(`Created safe-fix branch: ${branch}`);
}

main();
