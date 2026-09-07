import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const artifactDir = path.join(root, ".artifacts", "barbell-knurling-2026-09-07");
const outputDir = path.join(root, "public", "assets", "resources", "barbell-knurling");
const sourceDir = path.join(artifactDir, "sources");
fs.mkdirSync(outputDir, { recursive: true });
fs.mkdirSync(sourceDir, { recursive: true });
const sources = JSON.parse(fs.readFileSync(path.join(artifactDir, "image-sources.json"), "utf8"));

const thumbs = [];
let index = 0;
for (const [locale, source] of Object.entries(sources)) {
  const copied = path.join(sourceDir, `${locale}.png`);
  fs.copyFileSync(source, copied);
  const base = path.join(outputDir, `${locale}-barbell-knurling`);
  const pipeline = sharp(copied).rotate().resize(1536, 1024, { fit: "cover", position: "attention" });
  await pipeline.clone().webp({ quality: 72, effort: 6 }).toFile(`${base}.webp`);
  await pipeline.clone().avif({ quality: 45, effort: 6, chromaSubsampling: "4:2:0" }).toFile(`${base}.avif`);
  const thumb = await sharp(copied).rotate().resize(360, 240, { fit: "cover", position: "attention" }).jpeg({ quality: 78 }).toBuffer();
  const label = Buffer.from(`<svg width="360" height="32"><rect width="360" height="32" fill="#111"/><text x="12" y="22" fill="white" font-size="16" font-family="Arial">${locale}</text></svg>`);
  thumbs.push({ input: thumb, left: (index % 4) * 360, top: Math.floor(index / 4) * 272 });
  thumbs.push({ input: label, left: (index % 4) * 360, top: Math.floor(index / 4) * 272 + 240 });
  index += 1;
}

await sharp({
  create: {
    width: 1440,
    height: Math.ceil(index / 4) * 272,
    channels: 3,
    background: "#e8e8e8",
  },
}).composite(thumbs).jpeg({ quality: 86 }).toFile(path.join(artifactDir, "contact-sheet.jpg"));

for (const file of fs.readdirSync(outputDir).sort()) {
  const full = path.join(outputDir, file);
  console.log(`${file}\t${fs.statSync(full).size}`);
}
