import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { contentAutomationConfig } from "../content-ops/config";

async function main() {
  const date = process.env.CONTENT_RUN_DATE || new Intl.DateTimeFormat("en-CA", { timeZone: contentAutomationConfig.timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const target = path.join(process.cwd(), "content-ops", "runs", date, "research", "analytics");
  await mkdir(target, { recursive: true });
  const imports = [
    ["gsc", process.env.GSC_EXPORT_PATH],
    ["ga4", process.env.GA4_EXPORT_PATH],
  ] as const;
  const report: Array<Record<string, unknown>> = [];
  for (const [name, source] of imports) {
    if (!source) { report.push({ source: name, imported: false, reason: "export path not configured" }); continue; }
    const extension = path.extname(source) || ".json";
    const destination = path.join(target, `${name}${extension}`);
    await copyFile(source, destination);
    report.push({ source: name, imported: true, bytes: (await stat(destination)).size, destination, importedAt: new Date().toISOString() });
  }
  await writeFile(path.join(target, "import-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
