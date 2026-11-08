import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = "C:/Users/Kloe/.codex/generated_images/01a1b937-cc22-7651-87ec-27b3a604f59c";
const artifactRoot = path.join(root, ".artifacts", "free-weight-tooling-2026-11-08");
const sourceArchive = path.join(artifactRoot, "sources");
const outputRoot = path.join(root, "public", "assets", "resources", "free-weight-tooling-agreement");
const mappings = [
  ["en", "exec-a9539c31-b66d-4693-bb81-0dd38301523b.png"],
  ["pt-br", "exec-a10e588b-87a0-40ea-b1f2-f24f8d18cbe9.png"],
  ["es", "exec-c87d3dbf-4676-4b49-b17a-ced8ad4b93e3.png"],
  ["de", "exec-ed21d073-0d92-4677-9996-d99e3e766a66.png"],
  ["fr", "exec-8f04f94f-5205-4d44-8698-6e5a7e28ebe7.png"],
  ["vi", "exec-0022b1c8-dfae-4905-8ad2-b362091133e9.png"],
  ["sv", "exec-25f14294-77c6-4fbf-9915-6abca37454ec.png"],
  ["it", "exec-e6a163a3-bfb8-4226-bec7-5a8659176009.png"],
  ["nl", "exec-d9594e96-1596-4593-85dc-93337158577c.png"],
  ["ar", "exec-55869ead-6642-43ba-bd48-e3b251b8d653.png"],
  ["ko", "exec-e77e0a8a-655f-4456-826f-e5f8bdd97626.png"],
  ["id", "exec-912728eb-a381-401f-baf0-9350c183cdfc.png"],
  ["pl", "exec-d8dcce83-0f76-4fe1-9753-7353330a8931.png"]
];

await mkdir(sourceArchive, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const assets = [];
const contactCells = [];
for (const [locale, sourceName] of mappings) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const archivedSource = path.join(sourceArchive, `${locale}.png`);
  const baseName = `${locale}-free-weight-tooling-agreement`;
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
    provenance: "Original conceptual editorial image commissioned with the built-in image generation capability; not documentary evidence of a customer order, tool, factory, contract or transfer."
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
  topic: "Tooling ownership, custody, maintenance and transfer for custom free-weight purchasing",
  generationMode: "Built-in image generation capability",
  promptSet: "Thirteen locale-specific photorealistic editorial toolroom scenes with mechanically plausible dumbbell or weight-plate tooling, blank asset tags and inspection tools. No readable text, logos, brands, certificates, QR codes, customer projects or claimed factory events.",
  reviewBoundary: "Conceptual editorial illustration only; never presented as a real customer tool, factory record, contract, audit or transfer.",
  assets
};
await writeFile(path.join(artifactRoot, "image-provenance.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const oversized = assets.filter((asset) => asset.webpBytes >= 150_000 || asset.avifBytes >= 150_000);
if (oversized.length) throw new Error(`Assets exceed 150 KB: ${oversized.map((asset) => asset.locale).join(", ")}`);
console.log(JSON.stringify({ assets: assets.length, largestWebp: Math.max(...assets.map((asset) => asset.webpBytes)), largestAvif: Math.max(...assets.map((asset) => asset.avifBytes)), contactSheet: path.join(artifactRoot, "contact-sheet.jpg") }, null, 2));
