import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { contentAutomationConfig } from "../content-ops/config";
import { DataForSeoResearchStore } from "../content-ops/dataforseo-budget";
import { dataForSeoClient } from "../lib/integrations/dataforseo";

type ResearchRequest = {
  locale: string;
  languageCode: string;
  locationCode: number;
  seeds: string[];
  finalSerpKeywords?: string[];
};

async function main() {
  const date = process.env.CONTENT_RUN_DATE || new Intl.DateTimeFormat("en-CA", { timeZone: contentAutomationConfig.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const runDir = path.join(process.cwd(), "content-ops", "runs", date, "research");
  const requestPath = path.join(runDir, "dataforseo-requests.json");
  let requests: ResearchRequest[];
  try { requests = JSON.parse(await readFile(requestPath, "utf8")); }
  catch { throw new Error(`Create ${requestPath} from the evidence-backed candidate pool before paid research.`); }
  const store = new DataForSeoResearchStore();
  await store.assertBudget();
  await dataForSeoClient.getUserData();
  const output: Array<Record<string, unknown>> = [];
  let generationAllowed = true;
  for (const request of requests) {
    const common = { locationCode: request.locationCode, languageCode: request.languageCode };
    for (const seed of request.seeds) {
      for (const [operation, ttlDays, call] of [
        ["suggestions", contentAutomationConfig.cacheDays.keywords, () => dataForSeoClient.keywordSuggestions({ keyword: seed, ...common, limit: 100 })],
        ["related", contentAutomationConfig.cacheDays.keywords, () => dataForSeoClient.relatedKeywords({ keyword: seed, ...common, limit: 100 })],
      ] as const) {
        try { output.push({ locale: request.locale, operation, seed, ...(await store.run({ cacheKey: `${operation}:${request.locale}:${request.locationCode}:${seed}`, ttlDays, estimatedUsd: 0.05, call })) }); }
        catch (error) { generationAllowed = false; output.push({ locale: request.locale, operation, seed, error: error instanceof Error ? error.message : String(error) }); }
      }
    }
    if (request.seeds.length) {
      try { output.push({ locale: request.locale, operation: "overview", ...(await store.run({ cacheKey: `overview:${request.locale}:${request.locationCode}:${request.seeds.sort().join("|")}`, ttlDays: contentAutomationConfig.cacheDays.keywords, estimatedUsd: 0.05, call: () => dataForSeoClient.keywordOverview({ keywords: request.seeds, ...common }) })) }); }
      catch (error) { generationAllowed = false; output.push({ locale: request.locale, operation: "overview", error: error instanceof Error ? error.message : String(error) }); }
      try { output.push({ locale: request.locale, operation: "site-gap", ...(await store.run({ cacheKey: `site:${request.locale}:${request.locationCode}`, ttlDays: contentAutomationConfig.cacheDays.keywords, estimatedUsd: 0.05, call: () => dataForSeoClient.keywordsForSite({ target: "chinafreeweight.com", ...common, limit: 100 }) })) }); }
      catch (error) { generationAllowed = false; output.push({ locale: request.locale, operation: "site-gap", error: error instanceof Error ? error.message : String(error) }); }
    }
    for (const keyword of request.finalSerpKeywords || []) {
      try { output.push({ locale: request.locale, operation: "serp", keyword, ...(await store.run({ cacheKey: `serp:${request.locale}:${request.locationCode}:${keyword}`, ttlDays: contentAutomationConfig.cacheDays.serp, estimatedUsd: 0.01, call: () => dataForSeoClient.serp({ keyword, ...common, device: "mobile" }) })) }); }
      catch (error) { generationAllowed = false; output.push({ locale: request.locale, operation: "serp", keyword, error: error instanceof Error ? error.message : String(error) }); }
    }
  }
  await mkdir(runDir, { recursive: true });
  await writeFile(path.join(runDir, "dataforseo-results.json"), `${JSON.stringify({ schemaVersion: 1, date, generationAllowed, results: output }, null, 2)}\n`, "utf8");
  if (!generationAllowed) process.exitCode = 2;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
