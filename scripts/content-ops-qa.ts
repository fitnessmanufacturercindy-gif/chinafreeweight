import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { semanticSimilarity, validateDocument } from "../content-ops/quality";
import type { AutomatedContentDocument } from "../content-ops/types";
import { contentRepository } from "../lib/content/repository";

async function main() {
  const date = process.env.CONTENT_RUN_DATE || new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  const runDir = path.join(process.cwd(), "content-ops", "runs", date);
  const documentsDir = path.join(runDir, "documents");
  const files = (await readdir(documentsDir)).filter((file) => file.endsWith(".json"));
  const documents = await Promise.all(files.map(async (file) => JSON.parse(await readFile(path.join(documentsDir, file), "utf8")) as AutomatedContentDocument));
  const results = documents.map((document, index) => validateDocument(document, documents.slice(0, index)));
  documents.forEach((document, documentIndex) => {
    for (const version of Object.values(document.entity.versions).filter(Boolean)) {
      const bodyText = version!.body.map((block) => `${block.heading || ""} ${block.content || ""}`).join(" ");
      for (const current of contentRepository.listPublished({ locale: version!.locale, type: document.entity.type })) {
        const currentText = current.version.body.map((block) => `${block.heading || ""} ${block.content || ""}`).join(" ");
        const conflict = current.version.slug === version!.slug || current.version.publicPath === version!.publicPath || current.version.title.trim().toLocaleLowerCase() === version!.title.trim().toLocaleLowerCase() || current.version.h1.trim().toLocaleLowerCase() === version!.h1.trim().toLocaleLowerCase() || semanticSimilarity(bodyText, currentText) > 0.86;
        if (conflict) {
          const result = results[documentIndex].versions.find((item) => item.locale === version!.locale)!;
          result.issues.push({ code: "existing-content-conflict", message: `Conflicts with existing entity: ${current.entity.id}`, hard: true });
          result.score = Math.max(0, result.score - 8); result.passed = false; results[documentIndex].passed = false;
        }
      }
      for (const link of version!.internalLinks) {
        const currentTarget = contentRepository.getPublishedVersion(link.targetContentId, version!.locale);
        const candidateTarget = documents.some((candidate) => candidate.entity.id === link.targetContentId && Boolean(candidate.entity.versions[version!.locale]));
        if (!currentTarget && !candidateTarget) {
          const result = results[documentIndex].versions.find((item) => item.locale === version!.locale)!;
          result.issues.push({ code: "broken-internal-link", message: `Missing same-language internal link target: ${link.targetContentId}`, hard: true });
          result.score = Math.max(0, result.score - 8); result.passed = false; results[documentIndex].passed = false;
        }
      }
    }
  });
  const report = { schemaVersion: 1, date, passed: results.every((result) => result.passed), documents: results };
  await writeFile(path.join(runDir, "qa-report.json"), `${JSON.stringify(report, null, 2)}\n`, "utf8");
  console.log(JSON.stringify(report, null, 2));
  if (!report.passed) process.exitCode = 1;
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
