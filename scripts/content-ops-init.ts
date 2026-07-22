import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { contentAutomationConfig, getAutomationLocales, getDailyCandidateUrlLimit } from "../content-ops/config";
import { qualifiesAsPendingContentReview } from "../content-ops/review-pr";
import type { DailyRunManifest } from "../content-ops/types";

async function main() {
  const date = process.env.CONTENT_RUN_DATE || new Intl.DateTimeFormat("en-CA", { timeZone: contentAutomationConfig.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const root = path.join(process.cwd(), "content-ops");
  const runDir = path.join(root, "runs", date);
  const pendingReviewInput = {
    pullRequest: process.env.OPEN_DAILY_CONTENT_PR?.trim() || undefined,
    branch: process.env.OPEN_DAILY_CONTENT_BRANCH?.trim() || undefined,
    generatedDocumentCount: Number(process.env.OPEN_DAILY_CONTENT_DOCUMENT_COUNT || 0),
  };
  const openDailyPullRequest = qualifiesAsPendingContentReview(pendingReviewInput)
    ? pendingReviewInput.pullRequest
    : undefined;
  if (pendingReviewInput.pullRequest && !openDailyPullRequest) {
    console.warn("Ignored OPEN_DAILY_CONTENT_PR because it is not a dated content-review PR with generated documents.");
  }
  let ledger = { monthlyUsd: 0, days: {} as Record<string, number> };
  try { ledger = JSON.parse(await readFile(path.join(root, "budget-ledger.json"), "utf8")); } catch {}
  const manifest: DailyRunManifest = {
  schemaVersion: 1,
  date,
  siteUrl: contentAutomationConfig.siteUrl,
  timeZone: contentAutomationConfig.timeZone,
  publicLocales: getAutomationLocales().map((locale) => locale.internalLocale),
  candidateUrlLimit: getDailyCandidateUrlLimit(),
  mode: openDailyPullRequest ? "research-only" : "generate",
  openDailyPullRequest,
  apiSpendUsd: { daily: ledger.days?.[date] || 0, monthly: ledger.monthlyUsd || 0 },
  createdAt: new Date().toISOString(),
  };
  await mkdir(path.join(runDir, "documents"), { recursive: true });
  await mkdir(path.join(runDir, "research"), { recursive: true });
  await writeFile(path.join(runDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  await writeFile(path.join(runDir, "research", "candidate-pool.json"), "[]\n", "utf8");
  console.log(JSON.stringify(manifest, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
