import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { DataForSeoBudgetError, DataForSeoResearchStore } from "../../content-ops/dataforseo-budget";
import { dataForSeoClient, DataForSeoError } from "../../lib/integrations/dataforseo";

test("research store caches responses and records cost", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "cfw-dataforseo-")); let calls = 0;
  const store = new DataForSeoResearchStore(root, () => new Date("2026-07-22T12:00:00Z"));
  const call = async () => { calls += 1; return { status_code: 20000, status_message: "Ok.", cost: 0.05, tasks: [{ status_code: 20000, status_message: "Ok.", result: [{ keyword: "rubber dumbbells" }] }] }; };
  const first = await store.run({ cacheKey: "suggestions:en:rubber", ttlDays: 30, estimatedUsd: 0.05, call });
  const second = await store.run({ cacheKey: "suggestions:en:rubber", ttlDays: 30, estimatedUsd: 0.05, call });
  assert.equal(first.cached, false); assert.equal(second.cached, true); assert.equal(calls, 1);
  const ledger = JSON.parse(await readFile(path.join(root, "budget-ledger.json"), "utf8"));
  assert.equal(ledger.monthlyUsd, 0.05);
});

test("daily and monthly budget limits stop paid calls", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "cfw-dataforseo-"));
  const store = new DataForSeoResearchStore(root, () => new Date("2026-07-22T12:00:00Z"));
  await store.record(2);
  await assert.rejects(() => store.assertBudget(0.01), DataForSeoBudgetError);
});

test("budget dates use Beijing time across the UTC day boundary", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "cfw-dataforseo-"));
  const store = new DataForSeoResearchStore(root, () => new Date("2026-07-22T23:30:00Z"));
  const ledger = await store.record(0.25);
  assert.equal(ledger.days["2026-07-23"], 0.25);
});

test("client parses keyword responses and surfaces auth, rate, balance, and timeout failures", async () => {
  const originalFetch = globalThis.fetch; const originalLogin = process.env.DATAFORSEO_LOGIN; const originalPassword = process.env.DATAFORSEO_PASSWORD;
  process.env.DATAFORSEO_LOGIN = "test"; process.env.DATAFORSEO_PASSWORD = "test";
  try {
    globalThis.fetch = async () => new Response(JSON.stringify({ status_code: 20000, status_message: "Ok.", tasks: [{ status_code: 20000, status_message: "Ok.", result: [{ items: [{ keyword: "urethane dumbbells" }] }] }] }), { status: 200 });
    const result = await dataForSeoClient.keywordSuggestions({ keyword: "dumbbells", locationCode: 2840, languageCode: "en" });
    assert.equal(result.tasks?.[0].status_code, 20000);
    for (const [status, code] of [[401, 40100], [429, 40209]] as const) {
      globalThis.fetch = async () => new Response(JSON.stringify({ status_code: code, status_message: "Rejected" }), { status });
      await assert.rejects(() => dataForSeoClient.getUserData(), DataForSeoError);
    }
    globalThis.fetch = async () => new Response(JSON.stringify({ status_code: 20000, status_message: "Ok.", tasks: [{ status_code: 40202, status_message: "Insufficient balance" }] }), { status: 200 });
    await assert.rejects(() => dataForSeoClient.getUserData(), DataForSeoError);
    globalThis.fetch = async () => { throw new Error("timeout"); };
    await assert.rejects(() => dataForSeoClient.getUserData(), /timeout/);
  } finally {
    globalThis.fetch = originalFetch; process.env.DATAFORSEO_LOGIN = originalLogin; process.env.DATAFORSEO_PASSWORD = originalPassword;
  }
});
