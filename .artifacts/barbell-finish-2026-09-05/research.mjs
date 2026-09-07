import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputDir = path.join(root, ".artifacts", "barbell-finish-2026-09-05");
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
  ["google", "barbell coating hard chrome zinc black oxide cerakote commercial gym", 2840, "en"],
  ["bing", "barbell coating hard chrome zinc black oxide cerakote commercial gym", 2840, "en"],
  ["google", "site:reddit.com barbell coating chrome zinc cerakote rust gym", 2840, "en"],
  ["google", "site:quora.com barbell finish chrome zinc cerakote", 2840, "en"],
  ["google", "acabamento barra olímpica hard chrome zinco cerakote academia", 2076, "pt"],
  ["google", "acabado barra olímpica cromo zinc cerakote gimnasio", 2724, "es"],
  ["google", "Langhantel Beschichtung Hartchrom Zink Cerakote Fitnessstudio", 2276, "de"],
  ["google", "revêtement barre olympique chrome zinc cerakote salle", 2250, "fr"],
  ["google", "lớp phủ đòn tạ Olympic chrome kẽm cerakote phòng gym", 2704, "vi"],
  ["google", "skivstång ytbehandling hårdkrom zink cerakote gym", 2752, "sv"],
  ["google", "finitura bilanciere olimpico cromo zinco cerakote palestra", 2380, "it"],
  ["google", "halterstang coating hardchroom zink cerakote sportschool", 2528, "nl"],
  ["google", "طلاء البار الأولمبي كروم زنك سيراكوت صالة رياضية", 2784, "ar"],
  ["google", "올림픽 바벨 코팅 하드 크롬 아연 세라코트 헬스장", 2410, "ko"],
  ["google", "lapisan barbel olimpik hard chrome zinc cerakote gym", 2360, "id"],
  ["google", "powłoka gryfu olimpijskiego chrom cynk cerakote siłownia", 2616, "pl"],
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

fs.writeFileSync(path.join(outputDir, "search-summary.json"), JSON.stringify(summaries, null, 2));
for (const summary of summaries) console.log(JSON.stringify({ engine: summary.engine, keyword: summary.keyword, status: summary.status, items: summary.items.length }));
