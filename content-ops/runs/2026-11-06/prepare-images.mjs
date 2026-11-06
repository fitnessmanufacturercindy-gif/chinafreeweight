import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = "C:/Users/Kloe/.codex/generated_images/01a1afec-6568-7952-90a1-113c69821beb";
const artifactRoot = path.join(root, ".artifacts", "fixed-dumbbell-impact-validation-2026-11-06");
const sourceArchive = path.join(artifactRoot, "sources");
const outputRoot = path.join(root, "public", "assets", "resources", "fixed-dumbbell-impact-validation");
const mappings = [
  ["en", "exec-6bc5f507-5c09-4f7d-9448-9922527b7ab2.png"],
  ["pt-br", "exec-eb00ea66-1800-43fe-96f8-46c5d717b663.png"],
  ["es", "exec-5c695fcf-5092-4f30-906c-22dce9c3c5e9.png"],
  ["de", "exec-1f8677aa-e32d-4035-aa45-3a9a44b69e4c.png"],
  ["fr", "exec-4f8a0e0f-7332-4370-8fc2-bf3547002936.png"],
  ["vi", "exec-8310b65b-cf40-4208-b61c-5c736388c49b.png"],
  ["sv", "exec-4126f40d-f154-4d4a-b7cc-d5345869a772.png"],
  ["it", "exec-20a70f7a-484f-4969-a016-622da3adebf0.png"],
  ["nl", "exec-a1f1825f-73fa-4678-8983-7f945bc610b7.png"],
  ["ar", "exec-7c3482a0-ea76-41e9-8aef-db772726578e.png"],
  ["ko", "exec-4ff7161e-cd8b-41a5-8b42-aab71194512d.png"],
  ["id", "exec-cb11d67c-840e-4604-8e1c-1e681c908e38.png"],
  ["pl", "exec-7da145f5-c7db-4027-b284-d78bb994f5ee.png"]
];

await mkdir(sourceArchive, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const assets = [];
const contactCells = [];
for (const [locale, sourceName] of mappings) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const archivedSource = path.join(sourceArchive, `${locale}.png`);
  const baseName = `${locale}-fixed-dumbbell-impact-validation`;
  const webpPath = path.join(outputRoot, `${baseName}.webp`);
  const avifPath = path.join(outputRoot, `${baseName}.avif`);
  await copyFile(sourcePath, archivedSource);
  const normalized = sharp(sourcePath).rotate().resize(1536, 1024, { fit: "cover", position: "centre" });
  await normalized.clone().webp({ quality: 58, effort: 6, smartSubsample: true }).toFile(webpPath);
  await normalized.clone().avif({ quality: 38, effort: 6, chromaSubsampling: "4:2:0" }).toFile(avifPath);
  const metadata = await sharp(webpPath).metadata();
  const [webpInfo, avifInfo] = await Promise.all([stat(webpPath), stat(avifPath)]);
  assets.push({
    locale,
    source: path.relative(root, archivedSource).replaceAll("\\", "/"),
    webp: path.relative(root, webpPath).replaceAll("\\", "/"),
    avif: path.relative(root, avifPath).replaceAll("\\", "/"),
    width: metadata.width,
    height: metadata.height,
    webpBytes: webpInfo.size,
    avifBytes: avifInfo.size,
    provenance: "Original conceptual editorial image commissioned with the built-in image generation capability; not documentary evidence of a customer order or factory test."
  });
  const thumb = await sharp(sourcePath).rotate().resize(360, 240, { fit: "cover" }).jpeg({ quality: 76 }).toBuffer();
  const label = Buffer.from(`<svg width="360" height="240"><rect x="0" y="202" width="360" height="38" fill="rgba(0,0,0,.72)"/><text x="14" y="228" fill="white" font-family="Arial" font-size="20">${locale}</text></svg>`);
  const contactIndex = assets.length - 1;
  const contactLeft = (contactIndex % 4) * 360;
  const contactTop = Math.floor(contactIndex / 4) * 240;
  contactCells.push({ input: thumb, left: contactLeft, top: contactTop });
  contactCells.push({ input: label, left: contactLeft, top: contactTop });
}

await sharp({ create: { width: 1440, height: 960, channels: 3, background: "#111827" } })
  .composite(contactCells)
  .jpeg({ quality: 82 })
  .toFile(path.join(artifactRoot, "contact-sheet.jpg"));

const manifest = {
  createdAt: new Date().toISOString(),
  topic: "Fixed dumbbell impact-validation planning for B2B buyers",
  generationMode: "Built-in image generation capability",
  promptSet: "Thirteen locale-specific, photorealistic editorial scenes showing controlled specimen identification, landing setup, measurement, orientation, quarantine and comparison. No text, logo, third-party brand or customer claim.",
  reviewBoundary: "Conceptual editorial illustration only; never presented as a real customer project, actual production record or certification evidence.",
  assets
};
await writeFile(path.join(artifactRoot, "image-provenance.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const oversized = assets.filter((asset) => asset.webpBytes >= 150_000 || asset.avifBytes >= 150_000);
if (oversized.length) throw new Error(`Assets exceed 150 KB: ${oversized.map((asset) => asset.locale).join(", ")}`);
console.log(JSON.stringify({ assets: assets.length, largestWebp: Math.max(...assets.map((asset) => asset.webpBytes)), largestAvif: Math.max(...assets.map((asset) => asset.avifBytes)), contactSheet: path.join(artifactRoot, "contact-sheet.jpg") }, null, 2));
