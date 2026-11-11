import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = "C:/Users/Kloe/.codex/generated_images/01a1c383-5ff9-75f1-ae11-36b1bc4d437e";
const artifactRoot = path.join(root, ".artifacts", "free-weight-warranty-claims-2026-11-10");
const sourceArchive = path.join(artifactRoot, "sources");
const outputRoot = path.join(root, "public", "assets", "resources", "free-weight-warranty-claims");
const mappings = [
  ["en", "exec-e6d97d1b-c316-4d89-975d-a390780c8009.png"],
  ["pt-br", "exec-91fdfb05-6503-4b4c-833c-51a6dfe03afd.png"],
  ["es", "exec-d6689bcb-d4a9-4c41-abb6-e25270867dec.png"],
  ["de", "exec-e70a2116-49e5-4a97-a503-9bb2c121b062.png"],
  ["fr", "exec-1fb99e0d-b8de-4522-ab37-60931c6c3f4c.png"],
  ["vi", "exec-3b81412f-5e86-4d6e-84ab-3c336ee5bd60.png"],
  ["sv", "exec-671071e9-a287-4104-8e1f-d4d6fa87801e.png"],
  ["it", "exec-5c04683f-22a2-4d5b-a0ee-fef2dbef391b.png"],
  ["nl", "exec-8a752981-923d-4842-ac64-7b9e9c429143.png"],
  ["ar", "exec-6c44606f-6b30-4dc2-b8dc-d0964018a19f.png"],
  ["ko", "exec-84fb1e74-7e5b-4e71-bf4f-739894b3b514.png"],
  ["id", "exec-bcf2bcfd-a788-4d37-af3b-6a405f2530a6.png"],
  ["pl", "exec-a42f3b09-f089-4fc2-b74b-aaa277d0b030.png"]
];

await mkdir(sourceArchive, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const assets = [];
const contactCells = [];
for (const [locale, sourceName] of mappings) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const archivedSource = path.join(sourceArchive, `${locale}.png`);
  const baseName = `${locale}-free-weight-warranty-claims`;
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
    provenance: "Original conceptual editorial image commissioned with the built-in image generation capability; not documentary evidence of a customer order, claim, factory inspection, warranty decision or repair."
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
  topic: "Wholesale free-weight warranty scope, claim evidence, spare-parts control and remedy routes",
  generationMode: "Built-in image generation capability",
  promptSet: "Thirteen distinct locale-specific photorealistic editorial receiving and service-review scenes featuring mechanically plausible unbranded dumbbells, weight plates, Olympic-bar sleeves, cable handles, blank evidence materials and compatible-looking service parts. No readable text, logos, brands, certificates, customer projects or claimed factory events.",
  reviewBoundary: "Conceptual editorial illustration only; never presented as a real customer claim, warranty case, factory record, repair event or parts commitment.",
  assets
};
await writeFile(path.join(artifactRoot, "image-provenance.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const oversized = assets.filter((asset) => asset.webpBytes >= 150_000 || asset.avifBytes >= 150_000);
if (oversized.length) throw new Error(`Assets exceed 150 KB: ${oversized.map((asset) => asset.locale).join(", ")}`);
console.log(JSON.stringify({ assets: assets.length, largestWebp: Math.max(...assets.map((asset) => asset.webpBytes)), largestAvif: Math.max(...assets.map((asset) => asset.avifBytes)), contactSheet: path.join(artifactRoot, "contact-sheet.jpg") }, null, 2));
