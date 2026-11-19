import { copyFile, mkdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, ".artifacts", "bumper-plate-hub-corrosion-2026-11-16", "source-png");
const outputDir = path.join(root, "public", "assets", "resources", "bumper-plate-hub-corrosion");
const generatedRoot = "C:/Users/Kloe/.codex/generated_images/01a1f1df-1712-7d40-8cd2-0b4aa9e79aa6";
const inputs = {
  en: "exec-3489968d-eebf-4fa5-abbd-a9d2406c216b.png",
  "pt-br": "exec-b555f466-c7ec-47b2-9aac-318a80d0fcf6.png",
  es: "exec-fd004a27-ab9b-4e17-8b58-76fb3f15cd82.png",
  de: "exec-600e40f3-ee86-4284-becf-16c6f1dcdb98.png",
  fr: "exec-199db78c-79a2-4183-a25c-d7deaad1a46a.png",
  vi: "exec-dfda89d1-b8cd-4a6e-bd3f-90e03733203a.png",
  sv: "exec-cb5c607a-0bd9-414b-b422-50c319fc9ff5.png",
  it: "exec-76e16102-c504-4751-bde5-578d8e5dc102.png",
  nl: "exec-3db48a76-ab89-4686-926d-ab1a7dbccd64.png",
  ar: "exec-ec4782e5-16c6-4071-a580-3314ae802a57.png",
  ko: "exec-0261a3d7-8db4-4cdf-8cc8-b206db5f8397.png",
  id: "exec-7400342b-f86a-4e07-a1f8-291b75558801.png",
  pl: "exec-b0f54c86-563d-463d-8084-1e9708c6c6ed.png"
};

await mkdir(sourceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });
const assets = [];
for (const [locale, generatedName] of Object.entries(inputs)) {
  const source = path.join(sourceDir, `${locale}-bumper-plate-hub-inspection-source.png`);
  await copyFile(path.join(generatedRoot, generatedName), source);
  const base = `${locale}-bumper-plate-hub-inspection`;
  const webp = path.join(outputDir, `${base}.webp`);
  const avif = path.join(outputDir, `${base}.avif`);
  const pipeline = sharp(source).rotate().resize(1536, 1024, { fit: "cover", position: "centre" });
  await pipeline.clone().webp({ quality: 76, effort: 6 }).toFile(webp);
  await pipeline.clone().avif({ quality: 58, effort: 7, chromaSubsampling: "4:2:0" }).toFile(avif);
  const [webpInfo, avifInfo] = await Promise.all([sharp(webp).metadata(), sharp(avif).metadata()]);
  assets.push({ locale, source, webp: { path: webp, bytes: (await stat(webp)).size, width: webpInfo.width, height: webpInfo.height }, avif: { path: avif, bytes: (await stat(avif)).size, width: avifInfo.width, height: avifInfo.height } });
}
const artifactDir = path.dirname(sourceDir);
await writeFile(path.join(artifactDir, "optimized-assets.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), mode: "imagegen", assets }, null, 2)}\n`);
console.log(JSON.stringify({ count: assets.length, maxWebpBytes: Math.max(...assets.map((item) => item.webp.bytes)), maxAvifBytes: Math.max(...assets.map((item) => item.avif.bytes)) }, null, 2));
