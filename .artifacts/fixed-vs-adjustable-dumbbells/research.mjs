import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "fixed-vs-adjustable-dumbbells");
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
  ["google", "fixed vs adjustable dumbbells commercial gym", 2840, "en"],
  ["bing", "fixed vs adjustable dumbbells commercial gym", 2840, "en"],
  ["google", "site:reddit.com adjustable dumbbells fixed dumbbells durability space", 2840, "en"],
  ["google", "site:quora.com adjustable dumbbells vs fixed dumbbells", 2840, "en"],
  ["google", "halteres ajustáveis ou fixos academia comercial", 2076, "pt"],
  ["google", "mancuernas ajustables o fijas gimnasio comercial", 2724, "es"],
  ["google", "verstellbare oder feste Kurzhanteln Fitnessstudio", 2276, "de"],
  ["google", "haltères réglables ou fixes salle de sport", 2250, "fr"],
  ["google", "조절식 덤벨 고정식 덤벨 체육관 비교", 2410, "ko"],
];

const authorization = Buffer.from(`${process.env.DATAFORSEO_LOGIN}:${process.env.DATAFORSEO_PASSWORD}`).toString("base64");
const summaries = await Promise.all(tasks.map(async ([engine, keyword, locationCode, languageCode], index) => {
  const response = await fetch(`https://api.dataforseo.com/v3/serp/${engine}/organic/live/advanced`, {
    method: "POST",
    headers: { Authorization: `Basic ${authorization}`, "Content-Type": "application/json" },
    body: JSON.stringify([{ keyword, location_code: locationCode, language_code: languageCode, device: "desktop", depth: 10 }]),
  });
  const payload = await response.json();
  fs.writeFileSync(path.join(outputDir, `serp-${index}.json`), JSON.stringify(payload, null, 2));
  const task = payload.tasks?.[0];
  const items = task?.result?.[0]?.items?.filter((item) => ["organic", "people_also_ask", "related_searches"].includes(item.type)).slice(0, 8) ?? [];
  return {
    engine,
    keyword,
    status: task?.status_message ?? response.statusText,
    items: items.map((item) => ({
      type: item.type,
      title: item.title,
      url: item.url,
      questions: item.items?.map((child) => child.title).filter(Boolean),
    })),
  };
}));

fs.writeFileSync(path.join(outputDir, "search-summary.json"), JSON.stringify(summaries, null, 2));
for (const summary of summaries) console.log(JSON.stringify(summary));
