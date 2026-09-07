import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const generatedRoot = "C:/Users/Kloe/.codex/generated_images/01a06f9e-af9b-7ae0-afaf-5d2018e77a97";
const artifactDir = path.join(root, ".artifacts", "barbell-finish-2026-09-05");
const sourceDir = path.join(artifactDir, "accepted-sources");
const publicDir = path.join(root, "public", "assets", "resources", "barbell-finishes");
fs.mkdirSync(sourceDir, { recursive: true });
fs.mkdirSync(publicDir, { recursive: true });

const sources = {
  en: "exec-8e46f169-21bc-44f7-890c-511ce0303995.png",
  "pt-br": "exec-2f2b80ab-6f50-45cc-8f8c-fdb44ea6640f.png",
  es: "exec-14ab587b-b895-4249-a416-4683b0e471f4.png",
  de: "exec-abb34682-c544-4823-877c-6d6fc612543f.png",
  fr: "exec-996be706-00b4-4130-8015-687394f63d3c.png",
  vi: "exec-bd52ed21-e050-474d-8ba5-d715b6815ed9.png",
  sv: "exec-8c4c1216-387c-4714-ba86-c14126e2ac2b.png",
  it: "exec-604126b4-32d7-46eb-b34d-bd5e96ef76dc.png",
  nl: "exec-0e75384e-6b72-4f0c-a108-d3632175b5a6.png",
  ar: "exec-d609bcba-0f0a-45c2-a9cd-57cf0616d9f8.png",
  ko: "exec-819c3443-7035-4498-b895-f4b8c76706e8.png",
  id: "exec-72b8faa2-6375-486f-a157-228646f7bfd9.png",
  pl: "exec-42d1207d-2b67-40fd-85e0-a00c750b9c3d.png",
};

const records = [];
for (const [locale, filename] of Object.entries(sources)) {
  const source = path.join(generatedRoot, filename);
  if (!fs.existsSync(source)) throw new Error(`Missing generated source: ${source}`);
  const acceptedSource = path.join(sourceDir, `${locale}-barbell-finish.png`);
  fs.copyFileSync(source, acceptedSource);
  const base = path.join(publicDir, `${locale}-olympic-barbell-finishes`);
  await sharp(source).resize(1536, 1024, { fit: "cover" }).webp({ quality: 72, effort: 6 }).toFile(`${base}.webp`);
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
