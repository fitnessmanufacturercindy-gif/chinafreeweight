import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { basename } from "node:path";

const criticalPaths = [
  "/",
  "/contact",
  "/resources",
  "/pt",
  "/es",
  "/de",
  "/fr",
  "/vi",
  "/sv",
  "/it",
  "/ko",
  "/id",
  "/pl",
  "/nl",
];

function shanghaiDateParts() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  }).formatToParts(new Date());
  return Object.fromEntries(parts.map((part) => [part.type, part.value]));
}

function gitLines(args) {
  try {
    return execFileSync("git", args, { encoding: "utf8" })
      .split(/\r?\n/u)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

function eventRange() {
  try {
    const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
    const base = event.pull_request?.base?.sha || event.before;
    const head = event.pull_request?.head?.sha || event.after || "HEAD";
    if (base && !/^0+$/u.test(base)) return [base, head];
  } catch {
    // Local runs and manually invoked workflows may not have an event payload.
  }
  return ["HEAD^", "HEAD"];
}

function routeForFile(file) {
  const normalized = file.replaceAll("\\", "/");
  const resource = normalized.match(/^content\/resources\/([^/]+)\.md$/u);
  if (resource) return `/resources/${resource[1]}`;

  if (/^app\/\(en\)\/resources\/\[slug\]\/page\.tsx$/u.test(normalized)) {
    return "/resources/how-to-choose-commercial-dumbbells";
  }
  if (/^app\/\(en\)\/resources\/page\.tsx$/u.test(normalized)) return "/resources";
  if (/^app\/\(en\)\/contact\//u.test(normalized)) return "/contact";
  if (/^app\/\(en\)\/page\.tsx$/u.test(normalized)) return "/";

  const staticRoute = normalized.match(/^app\/\(en\)\/(.+)\/page\.(?:tsx|jsx)$/u);
  if (staticRoute && !staticRoute[1].includes("[")) return `/${staticRoute[1]}`;
  return null;
}

const date = shanghaiDateParts();
const monthlyFull = date.day === "01";
const weeklyAppend = date.weekday === "Sun";
let changedFiles = [];

if (!monthlyFull) {
  changedFiles = weeklyAppend
    ? gitLines(["log", "--since=7.days", "--name-only", "--pretty=format:"])
    : gitLines(["diff", "--name-only", ...eventRange()]);
}

const affectedPaths = changedFiles.map(routeForFile).filter(Boolean);
const paths = monthlyFull ? "" : [...new Set([...criticalPaths, ...affectedPaths])].join(",");
const mode = monthlyFull ? "monthly-full" : weeklyAppend ? "weekly-seven-day-incremental" : "daily-incremental";
const output = {
  mode,
  paths,
  changedFileCount: new Set(changedFiles).size,
  affectedPaths: [...new Set(affectedPaths)],
  source: process.env.GITHUB_EVENT_PATH ? basename(process.env.GITHUB_EVENT_PATH) : "local-git",
};

if (process.env.GITHUB_OUTPUT) {
  appendFileSync(process.env.GITHUB_OUTPUT, `mode=${mode}\npaths=${paths}\n`, "utf8");
}
console.log(JSON.stringify(output, null, 2));
