import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const generatedRoot = "C:/Users/Kloe/.codex/generated_images/01a074c4-84c7-7d00-a468-28aa802a2edc";
const artifactDir = path.join(root, ".artifacts", "plate-bar-fit-2026-09-06");
const sourceDir = path.join(artifactDir, "accepted-sources");
const publicDir = path.join(root, "public", "assets", "resources", "plate-bar-fit");
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const sources = {
  en: "exec-9c16c482-0bb2-4f1f-b2dd-d4c67a0f7392.png",
  "pt-br": "exec-906b0ca4-4b99-490e-a02b-019d060372b8.png",
  es: "exec-315417de-231a-48f8-900c-af4aa347583a.png",
  de: "exec-133dcb82-36cc-47c5-a3f7-a1f6e09ce265.png",
  fr: "exec-31111e8c-6e30-4ec1-85aa-c50427b23d4f.png",
  vi: "exec-10aed3b6-3ac0-4a38-9cc4-d28590576056.png",
  sv: "exec-22613835-6b50-46da-b1e5-f2b0647f5201.png",
  it: "exec-6bb7fdb1-483d-4f99-8d3e-c2c8200d2a9a.png",
  nl: "exec-b683fffd-51e5-4a76-bd8d-36f3c115f4f4.png",
  ar: "exec-3413a12b-0b1d-464c-8612-3030e07a1195.png",
  ko: "exec-efbd933b-d848-4d03-bd29-99da5df1aa5e.png",
  id: "exec-ac43aa3d-3629-4324-be2d-c5df67a3f9c1.png",
  pl: "exec-f8f89ba2-ffac-4111-b90a-eb3636b9b420.png",
};

const records = [];
for (const [locale, filename] of Object.entries(sources)) {
  const source = path.join(generatedRoot, filename);
  if (!fs.existsSync(source)) throw new Error(`Missing generated source: ${source}`);
  const acceptedSource = path.join(sourceDir, `${locale}-plate-bar-fit.png`);
  fs.copyFileSync(source, acceptedSource);
  const base = path.join(publicDir, `${locale}-plate-bar-fit`);
  const webpQuality = locale === "de" ? 68 : 72;
  await sharp(source).resize(1536, 1024, { fit: "cover" }).webp({ quality: webpQuality, effort: 6 }).toFile(`${base}.webp`);
  await sharp(source).resize(1536, 1024, { fit: "cover" }).avif({ quality: 42, effort: 6, chromaSubsampling: "4:2:0" }).toFile(`${base}.avif`);
  records.push({
    locale,
    generatedSource: source.replaceAll("\\", "/"),
    acceptedSource: path.relative(root, acceptedSource).replaceAll("\\", "/"),
    webp: { path: path.relative(root, `${base}.webp`).replaceAll("\\", "/"), bytes: fs.statSync(`${base}.webp`).size },
    avif: { path: path.relative(root, `${base}.avif`).replaceAll("\\", "/"), bytes: fs.statSync(`${base}.avif`).size },
  });
}

const thumbnails = [];
for (const record of records) {
  const buffer = await sharp(path.join(root, record.webp.path)).resize(360, 240, { fit: "cover" }).toBuffer();
  thumbnails.push({ input: buffer, left: (thumbnails.length % 4) * 360, top: Math.floor(thumbnails.length / 4) * 240 });
}
await sharp({ create: { width: 1440, height: 960, channels: 3, background: "#111827" } })
  .composite(thumbnails)
  .jpeg({ quality: 84 })
  .toFile(path.join(artifactDir, "contact-sheet.jpg"));

fs.writeFileSync(path.join(artifactDir, "accepted-source-map.json"), `${JSON.stringify(records, null, 2)}\n`);
for (const record of records) console.log(`${record.locale}: webp=${record.webp.bytes} avif=${record.avif.bytes}`);
