import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { DataForSeoEnvelope } from "../lib/integrations/dataforseo";
import { contentAutomationConfig } from "./config";

type Ledger = { schemaVersion: 1; month: string; monthlyUsd: number; days: Record<string, number> };
type CacheEntry<T> = { createdAt: string; expiresAt: string; value: T };

export class DataForSeoBudgetError extends Error {}

function monthOf(date: Date) { return date.toISOString().slice(0, 7); }
function dayOf(date: Date) { return date.toISOString().slice(0, 10); }

export class DataForSeoResearchStore {
  constructor(private readonly root = path.join(process.cwd(), "content-ops"), private readonly now = () => new Date()) {}

  private ledgerPath() { return path.join(this.root, "budget-ledger.json"); }
  private cachePath(key: string) { return path.join(this.root, "cache", `${createHash("sha256").update(key).digest("hex")}.json`); }

  async readLedger(): Promise<Ledger> {
    try {
      const ledger = JSON.parse(await readFile(this.ledgerPath(), "utf8")) as Ledger;
      if (ledger.month === monthOf(this.now())) return ledger;
    } catch {}
    return { schemaVersion: 1, month: monthOf(this.now()), monthlyUsd: 0, days: {} };
  }

  async assertBudget(estimatedUsd = 0) {
    const ledger = await this.readLedger();
    const day = dayOf(this.now());
    if ((ledger.days[day] || 0) + estimatedUsd > contentAutomationConfig.apiBudgetUsd.daily) throw new DataForSeoBudgetError("Daily DataForSEO budget limit reached.");
    if (ledger.monthlyUsd + estimatedUsd > contentAutomationConfig.apiBudgetUsd.monthly) throw new DataForSeoBudgetError("Monthly DataForSEO budget limit reached.");
  }

  async record(costUsd: number) {
    const ledger = await this.readLedger(); const day = dayOf(this.now());
    ledger.days[day] = Number(((ledger.days[day] || 0) + costUsd).toFixed(6));
    ledger.monthlyUsd = Number((ledger.monthlyUsd + costUsd).toFixed(6));
    await mkdir(this.root, { recursive: true });
    await writeFile(this.ledgerPath(), `${JSON.stringify(ledger, null, 2)}\n`, "utf8");
    await this.assertBudget();
    return ledger;
  }

  async cached<T>(key: string): Promise<T | undefined> {
    try {
      const entry = JSON.parse(await readFile(this.cachePath(key), "utf8")) as CacheEntry<T>;
      return new Date(entry.expiresAt).getTime() > this.now().getTime() ? entry.value : undefined;
    } catch { return undefined; }
  }

  async run<T>(options: { cacheKey: string; ttlDays: number; estimatedUsd?: number; call: () => Promise<DataForSeoEnvelope<T>> }) {
    const cached = await this.cached<DataForSeoEnvelope<T>>(options.cacheKey);
    if (cached) return { envelope: cached, cached: true, costUsd: 0 };
    await this.assertBudget(options.estimatedUsd || 0);
    const envelope = await options.call();
    const costUsd = Number(envelope.cost || 0) + (envelope.tasks || []).reduce((sum, task) => sum + Number(task.cost || 0), 0);
    await this.record(costUsd);
    const now = this.now(); const expires = new Date(now.getTime() + options.ttlDays * 86400000);
    const entry: CacheEntry<DataForSeoEnvelope<T>> = { createdAt: now.toISOString(), expiresAt: expires.toISOString(), value: envelope };
    await mkdir(path.dirname(this.cachePath(options.cacheKey)), { recursive: true });
    await writeFile(this.cachePath(options.cacheKey), `${JSON.stringify(entry, null, 2)}\n`, "utf8");
    return { envelope, cached: false, costUsd };
  }
}
