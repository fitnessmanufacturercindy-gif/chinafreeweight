import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = "C:/Users/Kloe/.codex/generated_images/01a1be57-5e21-7013-9651-aae07576654e";
const artifactRoot = path.join(root, ".artifacts", "free-weight-corrective-action-2026-11-09");
const sourceArchive = path.join(artifactRoot, "sources");
const outputRoot = path.join(root, "public", "assets", "resources", "free-weight-corrective-action");
const mappings = [
  ["en", "exec-94198d93-ba6c-40e7-acc7-d0b960c80b2a.png"],
  ["pt-br", "exec-10995912-0477-49e9-9a97-bcdef799dfee.png"],
  ["es", "exec-fdb9c837-7aa8-43df-addb-8d42df8f16f7.png"],
  ["de", "exec-fa378d69-2cdb-4c3c-bc06-44b1946a7347.png"],
  ["fr", "exec-6092c232-0031-4ae5-9b7a-04cb653ee896.png"],
  ["vi", "exec-652ce36e-3203-4758-a3f0-542a572fa36d.png"],
  ["sv", "exec-ebdac330-585e-48bb-b122-27e89bfff9cf.png"],
  ["it", "exec-94efb5d1-f9a6-465d-95f0-ffdcc835a0b3.png"],
  ["nl", "exec-7a1f803e-bccd-41a0-8c62-6ff5b4196ef4.png"],
  ["ar", "exec-3f4b6088-5515-4c00-a93e-9dd22b92ac78.png"],
  ["ko", "exec-b9b3f959-4266-47d1-87a5-7f9523136bb0.png"],
  ["id", "exec-11002302-7e97-49dc-9e61-eb43fffc88aa.png"],
  ["pl", "exec-90f11f07-e4a0-4195-8f27-ec0929508a00.png"]
];

await mkdir(sourceArchive, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const assets = [];
const contactCells = [];
for (const [locale, sourceName] of mappings) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const archivedSource = path.join(sourceArchive, `${locale}.png`);
  const baseName = `${locale}-free-weight-corrective-action`;
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
    provenance: "Original conceptual editorial image commissioned with the built-in image generation capability; not documentary evidence of a customer order, failed lot, factory inspection, correction or release event."
  });
  const thumb = await sharp(sourcePath).rotate().resize(360, 240, { fit: "cover" }).jpeg({ quality: 76 }).toBuffer();
  const label = Buffer.from(`<svg width="360" height="240"><rect x="0" y="202" width="360" height="38" fill="rgba(0,0,0,.72)"/><text x="14" y="228" fill="white" font-family="Arial" font-size="20">${locale}</text></svg>`);
  const index = assets.length - 1;
  const left = (index % 4) * 360;
  const top = Math.floor(index / 4) * 240;
  contactCells.push({ input: thumb, left, top }, { input: label, left, top });
}

await sharp({ create: { width: 1440, height: 960, channels: 3, background: "#111827" } })
  .composite(contactCells)
  .jpeg({ quality: 82 })
  .toFile(path.join(artifactRoot, "contact-sheet.jpg"));

const manifest = {
  createdAt: new Date().toISOString(),
  topic: "Containment, supplier corrective action, reinspection and release after a failed free-weight inspection",
  generationMode: "Built-in image generation capability",
  promptSet: "Thirteen distinct locale-specific photorealistic editorial inspection scenes featuring mechanically plausible unbranded dumbbells, weight plates, barbells or cable attachments. Each scene uses different quarantine, sorting, correction, root-cause or reinspection staging. No readable text, logos, brands, certificates, customer projects or claimed factory events.",
  reviewBoundary: "Conceptual editorial illustration only; never presented as a real customer order, failed production lot, factory record, corrective-action report or shipment release.",
  assets
};
await writeFile(path.join(artifactRoot, "image-provenance.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const oversized = assets.filter((asset) => asset.webpBytes >= 150_000 || asset.avifBytes >= 150_000);
if (oversized.length) throw new Error(`Assets exceed 150 KB: ${oversized.map((asset) => asset.locale).join(", ")}`);
console.log(JSON.stringify({ assets: assets.length, largestWebp: Math.max(...assets.map((asset) => asset.webpBytes)), largestAvif: Math.max(...assets.map((asset) => asset.avifBytes)), contactSheet: path.join(artifactRoot, "contact-sheet.jpg") }, null, 2));
