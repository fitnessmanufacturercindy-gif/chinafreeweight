import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const issues = [];
const results = [];
const requiredPaths = [
  "/pt/",
  "/pt/products/",
  "/pt/products/dumbbells/",
  "/pt/products/weight-plates/",
  "/pt/products/bumper-plates/",
  "/pt/oem-private-label/",
  "/pt/factory/",
  "/pt/blog/"
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

for (const file of ["app/pt/content.ts", "app/pt/businessContent.ts"]) {
  const source = read(file);
  for (const part of source.split(/export const /).slice(1)) {
    const name = part.match(/^(\w+)/)?.[1] || file;
    const strings = [...part.matchAll(/"([^"\n]*)"/g)].map((match) => match[1]).join(" ");
    const words = strings.match(/[A-Za-zÀ-ÿ]+/g)?.length || 0;
    results.push(`${name}: ${words} palavras`);
    if (words < 800 || words > 1500) issues.push(`${name} tem ${words} palavras; esperado: 800–1500.`);
  }
}

function walk(directory) {
  return fs.readdirSync(path.join(root, directory), { withFileTypes: true }).flatMap((entry) => {
    const relative = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(relative) : [relative];
  });
}

for (const file of walk("app/pt").filter((name) => name.endsWith("page.tsx"))) {
  const source = read(file);
  for (const match of source.matchAll(/description:\s*"([^"]+)"/g)) {
    const length = match[1].length;
    results.push(`${file}: meta ${length} caracteres`);
    if (length < 150 || length > 160) issues.push(`${file} tem meta description de ${length} caracteres; esperado: 150–160.`);
  }
  for (const match of source.matchAll(/ptMetadata\([^,]+,\s*"[^"]+",\s*"([^"]+)"\)/g)) {
    const length = match[1].length;
    results.push(`${file}: meta ${length} caracteres`);
    if (length < 150 || length > 160) issues.push(`${file} tem meta description de ${length} caracteres; esperado: 150–160.`);
  }
}

const sitemap = read("app/sitemap.ts");
for (const route of requiredPaths) {
  if (!sitemap.includes(`path: "${route}"`)) issues.push(`Sitemap sem ${route}`);
}

const robots = read("app/robots.ts");
if (!robots.includes('allow: "/"')) issues.push("robots.ts não permite rastreamento geral.");

const template = read("app/pt/PtSeoPage.tsx");
for (const schema of ["FAQPage", "BreadcrumbList", 'schemaType === "Product"']) {
  if (!template.includes(schema)) issues.push(`Template sem verificação de schema: ${schema}`);
}

console.log(results.join("\n"));
if (issues.length) {
  console.error("\nFalhas de SEO:\n- " + issues.join("\n- "));
  process.exit(1);
}
console.log("\nSEO PT básico validado.");
