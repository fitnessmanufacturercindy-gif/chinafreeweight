import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const artifactDir = path.join(root, ".artifacts", "fixed-vs-adjustable-dumbbells");
const images = JSON.parse(fs.readFileSync(path.join(artifactDir, "image-map.json"), "utf8"));
const outputDir = path.join(root, "public", "assets", "resources", "fixed-vs-adjustable-dumbbells");
fs.mkdirSync(outputDir, { recursive: true });

const tiles = [];
for (let index = 0; index < images.length; index += 1) {
  const image = images[index];
  const name = image.locale.toLowerCase();
  const source = sharp(image.path).resize(1536, 1024, { fit: "cover", position: "attention" });
  const webpPath = path.join(outputDir, `${name}-fixed-adjustable-dumbbells.webp`);
  const avifPath = path.join(outputDir, `${name}-fixed-adjustable-dumbbells.avif`);
  await source.clone().webp({ quality: image.locale === "pt-BR" ? 50 : 74, smartSubsample: true }).toFile(webpPath);
  await source.clone().avif({ quality: 50, effort: 6 }).toFile(avifPath);
  const tile = await source.clone().resize(384, 256).png().toBuffer();
  const left = (index % 4) * 384;
  const top = Math.floor(index / 4) * 288;
  tiles.push({ input: tile, left, top });
  const label = Buffer.from(`<svg width="384" height="32"><rect width="100%" height="100%" fill="white"/><text x="12" y="23" font-size="20">${image.locale}</text></svg>`);
  tiles.push({ input: label, left, top: top + 256 });
  console.log(JSON.stringify({ locale: image.locale, webpBytes: fs.statSync(webpPath).size, avifBytes: fs.statSync(avifPath).size }));
}

await sharp({ create: { width: 1536, height: 1152, channels: 3, background: "#eeeeee" } })
  .composite(tiles)
  .jpeg({ quality: 90 })
  .toFile(path.join(artifactDir, "image-contact-sheet.jpg"));
