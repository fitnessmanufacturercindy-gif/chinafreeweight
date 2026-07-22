import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContentManifest } from "../lib/content/types";
import type { AutomatedContentDocument } from "../content-ops/types";
import { validateDocument } from "../content-ops/quality";

async function main() {
  const date = process.env.CONTENT_RUN_DATE;
  if (!date) throw new Error("CONTENT_RUN_DATE is required. Staging is never implicit.");
  const runDir = path.join(process.cwd(), "content-ops", "runs", date);
  const files = (await readdir(path.join(runDir, "documents"))).filter((file) => file.endsWith(".json"));
  const documents = await Promise.all(files.map(async (file) => JSON.parse(await readFile(path.join(runDir, "documents", file), "utf8")) as AutomatedContentDocument));
  const catalogPath = path.join(process.cwd(), "content-ops", "published", "catalog.json");
  const catalog = JSON.parse(await readFile(catalogPath, "utf8")) as ContentManifest;
  for (const document of documents) {
    if (!document.approval?.approvedBy || !document.approval.approvedAt || !document.approval.pullRequest) throw new Error(`${document.entity.id} has no explicit human approval record.`);
    if (!validateDocument(document).passed) throw new Error(`${document.entity.id} failed the hard quality gate.`);
    if (catalog.entities.some((entity) => entity.id === document.entity.id)) throw new Error(`Duplicate catalog entity: ${document.entity.id}`);
    catalog.entities.push(document.entity);
  }
  await writeFile(catalogPath, `${JSON.stringify(catalog, null, 2)}\n`, "utf8");
  console.log(`Staged ${documents.length} approved content entities. Production deployment remains controlled by the normal merge flow.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
