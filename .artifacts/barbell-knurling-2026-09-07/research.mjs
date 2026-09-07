import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "barbell-knurling-2026-09-07");
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
  ["google", "barbell knurling types aggressive passive center knurl commercial gym buying guide", 2840, "en"],
  ["bing", "barbell knurling types aggressive passive center knurl commercial gym buying guide", 2840, "en"],
  ["google", "site:reddit.com barbell knurling aggressive passive center knurl gym", 2840, "en"],
  ["google", "site:quora.com barbell knurling aggressive passive center knurl", 2840, "en"],
  ["google", "recartilhado barra olímpica agressivo central compra academia", 2076, "pt"],
  ["google", "moleteado barra olímpica agresivo central comprar gimnasio", 2724, "es"],
  ["google", "Langhantel Rändelung aggressiv Mittelrändelung Fitnessstudio kaufen", 2276, "de"],
  ["google", "moletage barre olympique agressif central achat salle", 2250, "fr"],
  ["google", "độ nhám tay đòn Olympic vân nhám giữa mua phòng gym", 2704, "vi"],
  ["google", "skivstång lättring aggressiv mittlättring gym inköp", 2752, "sv"],
  ["google", "zigrinatura bilanciere olimpico aggressiva centrale acquisto palestra", 2380, "it"],
  ["google", "halterstang karteling agressief middenkarteling sportschool inkopen", 2528, "nl"],
  ["google", "تخريش عمود الأثقال الأولمبي خشن مركزي شراء صالة", 2784, "ar"],
  ["google", "올림픽 바벨 널링 강도 센터 널링 헬스장 구매", 2410, "ko"],
  ["google", "knurling barbel Olimpiade agresif tengah pembelian gym", 2360, "id"],
  ["google", "moletowanie gryfu olimpijskiego agresywne centralne zakup siłownia", 2616, "pl"],
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
  const items = task?.result?.[0]?.items?.filter((item) => ["organic", "people_also_ask", "related_searches"].includes(item.type)).slice(0, 12) ?? [];
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
