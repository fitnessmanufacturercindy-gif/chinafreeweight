import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const artifactDir = path.join(root, ".artifacts", "free-weight-incoterms-2026-11-20");
const sourceDir = path.join(artifactDir, "source");
const outputDir = path.join(root, "public", "assets", "resources", "free-weight-incoterms");
const generatedRoot = "C:/Users/Kloe/.codex/generated_images/01a1fc29-1858-7ef2-978b-11cbefaba477";
const inputs = {
  en: "exec-1f4bfed2-24a2-4119-b97f-f7d7b67a6f00.png",
  "pt-br": "exec-1357f62a-b699-4d1f-bda7-f3619d64ebce.png",
  es: "exec-cc832b15-b5d9-463c-a02c-2cdec213404f.png",
  de: "exec-98cc2ce4-6ec2-4994-8e4a-81e2e9e5aede.png",
  fr: "exec-ad54395f-bba9-4733-9869-719406b3de4d.png",
  vi: "exec-19373097-8c3b-4064-86dd-ff67c04cd3cf.png",
  sv: "exec-109810b5-cb36-4aad-bbe7-a6412cb6bff0.png",
  it: "exec-461a0c23-9ab6-46eb-9593-263528654230.png",
  nl: "exec-21da7b99-7bce-4167-be16-95bf7605e37e.png",
  ar: "exec-b23ee9cf-8c86-410f-bfb4-253595d20c06.png",
  ko: "exec-677d7dd2-1c3b-454d-95b8-fd513bb58f11.png",
  id: "exec-d81cff08-1d4f-414a-8e4d-c013dcc7f621.png",
  pl: "exec-2aafe709-e843-44b1-9ea8-7eecd7bf80c7.png"
};

await mkdir(sourceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });
const assets = [];
for (const [locale, generatedName] of Object.entries(inputs)) {
  const source = path.join(sourceDir, `${locale}-free-weight-incoterms-source.png`);
  await copyFile(path.join(generatedRoot, generatedName), source);
  const base = `${locale}-free-weight-incoterms`;
  const webp = path.join(outputDir, `${base}.webp`);
  const avif = path.join(outputDir, `${base}.avif`);
  const pipeline = sharp(source).rotate().resize(1536, 1024, { fit: "cover", position: "centre" });
  await pipeline.clone().webp({ quality: 74, effort: 6 }).toFile(webp);
  await pipeline.clone().avif({ quality: 56, effort: 7, chromaSubsampling: "4:2:0" }).toFile(avif);
  const [webpInfo, avifInfo, webpSize, avifSize] = await Promise.all([sharp(webp).metadata(), sharp(avif).metadata(), stat(webp), stat(avif)]);
  assets.push({ locale, generatedName, source, webp: { path: webp, bytes: webpSize.size, width: webpInfo.width, height: webpInfo.height }, avif: { path: avif, bytes: avifSize.size, width: avifInfo.width, height: avifInfo.height } });
}
await writeFile(path.join(artifactDir, "optimized-assets.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), mode: "imagegen", assets }, null, 2)}\n`);
console.log(JSON.stringify({ count: assets.length, maxWebpBytes: Math.max(...assets.map((item) => item.webp.bytes)), maxAvifBytes: Math.max(...assets.map((item) => item.avif.bytes)) }, null, 2));
