import fs from "node:fs";
import path from "node:path";

function loadLocalEnvironment() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/, "$2");
  }
}

loadLocalEnvironment();

const login = process.env.DATAFORSEO_LOGIN?.trim();
const password = process.env.DATAFORSEO_PASSWORD?.trim();
const baseUrl = (
  process.env.DATAFORSEO_BASE_URL || "https://api.dataforseo.com/v3"
).replace(/\/$/, "");

if (!login || !password) {
  console.error("DataForSEO credentials are not configured.");
  process.exit(1);
}

const authorization = Buffer.from(`${login}:${password}`, "utf8").toString(
  "base64",
);
const response = await fetch(`${baseUrl}/appendix/user_data`, {
  headers: { Authorization: `Basic ${authorization}` },
});
const payload = await response.json();

if (!response.ok || payload.status_code !== 20000) {
  console.error(
    `DataForSEO connection failed (${payload.status_code || response.status}): ${payload.status_message || response.statusText}`,
  );
  process.exit(1);
}

const account = payload.tasks?.[0]?.result?.[0] || {};
console.log("DataForSEO connection: OK");
console.log(`Account status: ${account.account_status || "active"}`);
console.log(`Balance available: ${typeof account.money?.balance === "number" ? "yes" : "unknown"}`);
