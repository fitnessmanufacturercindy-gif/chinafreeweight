import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const runRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(runRoot, "../../..");
const artifactRoot = path.join(projectRoot, ".artifacts", "free-weight-lot-traceability-2026-11-24");
const sourceRoot = path.join(artifactRoot, "source");
const outputRoot = path.join(projectRoot, "public", "assets", "resources", "free-weight-lot-traceability");
const locales = ["en", "pt-br", "es", "de", "fr", "vi", "sv", "it", "nl", "ar", "ko", "id", "pl"];

await mkdir(outputRoot, { recursive: true });
const sourceFiles = await readdir(sourceRoot);
const sourcePngs = sourceFiles.filter((name) => name.endsWith(".png"));
if (sourcePngs.length !== locales.length) {
  throw new Error(`Expected ${locales.length} source PNGs, found ${sourcePngs.length}`);
}

const outputs = [];
for (const locale of locales) {
  const source = path.join(sourceRoot, `${locale}.png`);
  const base = path.join(outputRoot, `${locale}-free-weight-lot-traceability`);
  const image = sharp(source).rotate().resize(1536, 1024, { fit: "cover", position: "attention" });
  const webpQuality = locale === "it" ? 62 : 70;
  await image.clone().webp({ quality: webpQuality, effort: 6, smartSubsample: true }).toFile(`${base}.webp`);
  await image.clone().avif({ quality: 52, effort: 7, chromaSubsampling: "4:2:0" }).toFile(`${base}.avif`);
  for (const format of ["webp", "avif"]) {
    const file = `${base}.${format}`;
    const metadata = await sharp(file).metadata();
    outputs.push({
      locale,
      format,
      file: path.relative(projectRoot, file).replaceAll("\\", "/"),
      width: metadata.width,
      height: metadata.height,
      bytes: (await stat(file)).size,
    });
  }
}

const thumbs = [];
for (const [index, locale] of locales.entries()) {
  const buffer = await sharp(path.join(outputRoot, `${locale}-free-weight-lot-traceability.webp`))
    .resize(384, 256, { fit: "cover" })
    .composite([{
      input: Buffer.from(`<svg width="384" height="32"><rect width="384" height="32" fill="rgba(0,0,0,.72)"/><text x="16" y="22" font-family="Arial" font-size="18" fill="white">${locale}</text></svg>`),
      top: 224,
      left: 0,
    }])
    .png()
    .toBuffer();
  thumbs.push({ input: buffer, left: (index % 4) * 384, top: Math.floor(index / 4) * 256 });
}

await sharp({ create: { width: 1536, height: 1024, channels: 3, background: "#e5e7eb" } })
  .composite(thumbs)
  .jpeg({ quality: 86 })
  .toFile(path.join(artifactRoot, "contact-sheet.jpg"));

await writeFile(
  path.join(artifactRoot, "optimized-assets.json"),
  `${JSON.stringify({ generatedAt: new Date().toISOString(), mode: "built-in-imagegen", sourceCount: sourcePngs.length, outputs }, null, 2)}\n`,
);

const maxWebpBytes = Math.max(...outputs.filter((item) => item.format === "webp").map((item) => item.bytes));
const maxAvifBytes = Math.max(...outputs.filter((item) => item.format === "avif").map((item) => item.bytes));
console.log(JSON.stringify({ sourceCount: sourcePngs.length, outputCount: outputs.length, maxWebpBytes, maxAvifBytes }, null, 2));
