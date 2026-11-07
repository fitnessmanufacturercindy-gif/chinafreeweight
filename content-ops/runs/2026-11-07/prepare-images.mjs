import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = "C:/Users/Kloe/.codex/generated_images/01a1b40e-9af2-7651-9c96-962b833cadee";
const artifactRoot = path.join(root, ".artifacts", "free-weight-test-report-verification-2026-11-07");
const sourceArchive = path.join(artifactRoot, "sources");
const outputRoot = path.join(root, "public", "assets", "resources", "free-weight-test-report-verification");
const mappings = [
  ["en", "exec-37d602c0-e07d-4e83-9762-088211d06b84.png"],
  ["pt-br", "exec-65ecc4a2-277f-4db8-bf6b-1ecf29641df0.png"],
  ["es", "exec-069c69a4-2aef-43a3-aad1-14185beaf9af.png"],
  ["de", "exec-a21da188-dafd-49a3-9ef0-20323e10c832.png"],
  ["fr", "exec-39ecc726-1525-455b-8c3c-a7b2fc93a10c.png"],
  ["vi", "exec-eddadc8e-2fa6-4d40-b21e-97208f15045a.png"],
  ["sv", "exec-6ff82906-a365-43b4-bfba-1a382444f9ec.png"],
  ["it", "exec-5111626c-9929-4dc3-990c-d9a32764db4b.png"],
  ["nl", "exec-bf0bca86-de82-4a88-9323-02ebea7a925f.png"],
  ["ar", "exec-53d34404-2a48-42e3-8285-73d7c45b3111.png"],
  ["ko", "exec-e16ef74c-0995-4dbb-a36e-a4058144a3cd.png"],
  ["id", "exec-ac098127-0703-4cc3-a67b-856081bd3007.png"],
  ["pl", "exec-a0bd6a5e-f08f-4fe9-9837-c284d4f2c3e2.png"]
];

await mkdir(sourceArchive, { recursive: true });
await mkdir(outputRoot, { recursive: true });

const assets = [];
const contactCells = [];
for (const [locale, sourceName] of mappings) {
  const sourcePath = path.join(sourceRoot, sourceName);
  const archivedSource = path.join(sourceArchive, `${locale}.png`);
  const baseName = `${locale}-free-weight-test-report-verification`;
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
    provenance: "Original conceptual editorial image commissioned with the built-in image generation capability; not documentary evidence of a customer order, laboratory result, certification or factory event."
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
  topic: "Verifying test reports and certificate scope for OEM free-weight purchasing",
  generationMode: "Built-in image generation capability",
  promptSet: "Thirteen locale-specific photorealistic editorial procurement scenes matching unbranded dumbbells, plates, bars and cable attachments with blank report folders and specimen tags. No readable text, logos, seals, QR codes, certification marks or customer claims.",
  reviewBoundary: "Conceptual editorial illustration only; never presented as a real customer project, shipment, laboratory result, certificate or factory record.",
  assets
};
await writeFile(path.join(artifactRoot, "image-provenance.json"), `${JSON.stringify(manifest, null, 2)}\n`);

const oversized = assets.filter((asset) => asset.webpBytes >= 150_000 || asset.avifBytes >= 150_000);
if (oversized.length) throw new Error(`Assets exceed 150 KB: ${oversized.map((asset) => asset.locale).join(", ")}`);
console.log(JSON.stringify({ assets: assets.length, largestWebp: Math.max(...assets.map((asset) => asset.webpBytes)), largestAvif: Math.max(...assets.map((asset) => asset.avifBytes)), contactSheet: path.join(artifactRoot, "contact-sheet.jpg") }, null, 2));
