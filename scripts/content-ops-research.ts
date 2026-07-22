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

type ResearchItem = {
  keyword?: string;
  keyword_info?: { search_volume?: number; cpc?: number; competition?: number; competition_level?: string; monthly_searches?: unknown[] };
  search_intent_info?: { main_intent?: string; foreign_intent?: string[] };
  type?: string; rank_group?: number; rank_absolute?: number; domain?: string; title?: string; url?: string; description?: string;
};
type ResearchResult = { se_type?: string; seed_keyword?: string; target?: string; location_code?: number; language_code?: string; total_count?: number; items_count?: number; items?: ResearchItem[] };
type ResearchEnvelope = { status_code: number; status_message: string; cost?: number; tasks_count?: number; tasks_error?: number; tasks?: Array<{ id?: string; status_code: number; status_message: string; cost?: number; result?: ResearchResult[] }> };
type ResearchOutput = { locale: string; operation: string; seed?: string; keyword?: string; envelope?: ResearchEnvelope; cached?: boolean; costUsd?: number; error?: string };

function compactEnvelope(envelope: ResearchEnvelope | undefined) {
  if (!envelope) return undefined;
  return {
    status_code: envelope.status_code,
    status_message: envelope.status_message,
    cost: envelope.cost,
    tasks_count: envelope.tasks_count,
    tasks_error: envelope.tasks_error,
    tasks: (envelope.tasks || []).map((task) => ({
      id: task.id,
      status_code: task.status_code,
      status_message: task.status_message,
      cost: task.cost,
      result: (task.result || []).map((result) => ({
        se_type: result.se_type,
        seed_keyword: result.seed_keyword,
        target: result.target,
        location_code: result.location_code,
        language_code: result.language_code,
        total_count: result.total_count,
        items_count: result.items_count,
        items: (result.items || []).map((item) => ({
          keyword: item.keyword,
          keyword_info: item.keyword_info ? {
            search_volume: item.keyword_info.search_volume,
            cpc: item.keyword_info.cpc,
            competition: item.keyword_info.competition,
            competition_level: item.keyword_info.competition_level,
            monthly_searches: item.keyword_info.monthly_searches,
          } : undefined,
          search_intent_info: item.search_intent_info ? {
            main_intent: item.search_intent_info.main_intent,
            foreign_intent: item.search_intent_info.foreign_intent,
          } : undefined,
          type: item.type,
          rank_group: item.rank_group,
          rank_absolute: item.rank_absolute,
          domain: item.domain,
          title: item.title,
          url: item.url,
          description: item.description,
        })),
      })),
    })),
  };
}

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
  const output: ResearchOutput[] = [];
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
  const compactResults = output.map((entry) => ({ ...entry, envelope: compactEnvelope(entry.envelope) }));
  await writeFile(path.join(runDir, "dataforseo-results.json"), `${JSON.stringify({ schemaVersion: 1, date, generationAllowed, results: compactResults })}\n`, "utf8");
  if (!generationAllowed) process.exitCode = 2;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
