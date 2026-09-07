import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "plate-bar-fit-2026-09-06");
fs.mkdirSync(outputDir, { recursive: true });

const envPath = path.join(root, ".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/u)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/u);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/u, "$2");
  }
}

if (!process.env.DATAFORSEO_LOGIN || !process.env.DATAFORSEO_PASSWORD) {
  throw new Error("DataForSEO credentials are not configured");
}

const tasks = [
  ["google", "Olympic weight plate hole size 50mm vs 2 inch barbell sleeve fit", 2840, "en"],
  ["bing", "Olympic weight plate hole size 50mm vs 2 inch barbell sleeve fit", 2840, "en"],
  ["google", "site:reddit.com weight plate stuck loose Olympic bar sleeve 50mm 2 inch", 2840, "en"],
  ["google", "site:quora.com Olympic plate hole size barbell sleeve fit", 2840, "en"],
  ["google", "furo anilha olímpica 50 mm 2 polegadas encaixe barra", 2076, "pt"],
  ["google", "agujero disco olímpico 50 mm 2 pulgadas ajuste barra", 2724, "es"],
  ["google", "Hantelscheibe Bohrung 50 mm 2 Zoll Passung Langhantel", 2276, "de"],
  ["google", "alésage disque olympique 50 mm 2 pouces ajustement barre", 2250, "fr"],
  ["google", "lỗ bánh tạ Olympic 50 mm 2 inch vừa tay đòn tạ", 2704, "vi"],
  ["google", "viktskiva håldiameter 50 mm 2 tum passform skivstång", 2752, "sv"],
  ["google", "foro disco olimpico 50 mm 2 pollici compatibilità bilanciere", 2380, "it"],
  ["google", "halterschijf boring 50 mm 2 inch passing halterstang", 2528, "nl"],
  ["google", "فتحة قرص أولمبي 50 مم 2 بوصة توافق عمود الأثقال", 2784, "ar"],
  ["google", "올림픽 원판 구멍 50mm 2인치 바벨 슬리브 호환", 2410, "ko"],
  ["google", "lubang plate beban Olimpiade 50 mm 2 inci cocok barbel", 2360, "id"],
  ["google", "otwór talerza olimpijskiego 50 mm 2 cale pasowanie gryf", 2616, "pl"],
];

const authorization = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString("base64");
const baseUrl = (process.env.DATAFORSEO_BASE_URL || "https://api.dataforseo.com/v3").replace(/\/$/u, "");
const summaries = await Promise.all(tasks.map(async ([engine, keyword, locationCode, languageCode], index) => {
  const response = await fetch(`${baseUrl}/serp/${engine}/organic/live/advanced`, {
    method: "POST",
    headers: { Authorization: `Basic ${authorization}`, "Content-Type": "application/json" },
    body: JSON.stringify([{ keyword, location_code: locationCode, language_code: languageCode, device: "desktop", depth: 10 }]),
  });
  const payload = await response.json();
  fs.writeFileSync(path.join(outputDir, `serp-${index}.json`), JSON.stringify(payload, null, 2));
  const task = payload.tasks?.[0];
  const items = task?.result?.[0]?.items?.filter((item) => ["organic", "people_also_ask", "related_searches"].includes(item.type)).slice(0, 10) ?? [];
  return {
    engine,
    keyword,
    status: task?.status_message ?? response.statusText,
    items: items.map((item) => ({
      type: item.type,
      title: item.title,
      url: item.url,
      description: item.description,
      questions: item.items?.map((child) => child.title).filter(Boolean),
    })),
  };
}));

fs.writeFileSync(path.join(outputDir, "search-summary.json"), `${JSON.stringify(summaries, null, 2)}\n`);
for (const summary of summaries) console.log(JSON.stringify({ engine: summary.engine, keyword: summary.keyword, status: summary.status, items: summary.items.length }));
