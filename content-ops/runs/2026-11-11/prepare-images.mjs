import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(runRoot, "../../..");
const artifactRoot = path.join(projectRoot, ".artifacts", "free-weight-container-loading-2026-11-11");
const sourceRoot = path.join(artifactRoot, "originals");
const outputRoot = path.join(projectRoot, "public", "assets", "resources", "free-weight-container-loading");
const locales = ["en", "pt-br", "es", "de", "fr", "sv", "it", "nl", "pl", "vi", "ar", "ko", "id"];

await mkdir(outputRoot, { recursive: true });
const outputs = [];
for (const locale of locales) {
  const source = path.join(sourceRoot, `${locale}-free-weight-container-loading-source.png`);
  const base = path.join(outputRoot, `${locale}-free-weight-container-loading`);
  const image = sharp(source).rotate().resize(1536, 1024, { fit: "cover", position: "attention" });
  await image.clone().webp({ quality: 67, effort: 6, smartSubsample: true }).toFile(`${base}.webp`);
  await image.clone().avif({ quality: 48, effort: 7, chromaSubsampling: "4:2:0" }).toFile(`${base}.avif`);
  for (const format of ["webp", "avif"]) {
    const file = `${base}.${format}`;
    const metadata = await sharp(file).metadata();
    outputs.push({ locale, format, file: path.relative(projectRoot, file).replaceAll("\\", "/"), width: metadata.width, height: metadata.height, bytes: (await import("node:fs/promises")).stat(file).then((stat) => stat.size) });
  }
}
for (const item of outputs) item.bytes = await item.bytes;

const thumbs = [];
for (const [index, locale] of locales.entries()) {
  const buffer = await sharp(path.join(outputRoot, `${locale}-free-weight-container-loading.webp`))
    .resize(384, 256, { fit: "cover" })
    .composite([{ input: Buffer.from(`<svg width="384" height="32"><rect width="384" height="32" fill="rgba(0,0,0,.72)"/><text x="16" y="22" font-family="Arial" font-size="18" fill="white">${locale}</text></svg>`), top: 224, left: 0 }])
    .png()
    .toBuffer();
  thumbs.push({ input: buffer, left: (index % 4) * 384, top: Math.floor(index / 4) * 256 });
}
await sharp({ create: { width: 1536, height: 1024, channels: 3, background: "#e5e7eb" } })
  .composite(thumbs)
  .jpeg({ quality: 86 })
  .toFile(path.join(artifactRoot, "contact-sheet.jpg"));

await writeFile(path.join(artifactRoot, "optimized-assets.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), outputs }, null, 2)}\n`);
console.log(JSON.stringify({ sourceCount: (await readdir(sourceRoot)).length, outputCount: outputs.length, maxBytes: Math.max(...outputs.map((item) => item.bytes)), outputs }, null, 2));
