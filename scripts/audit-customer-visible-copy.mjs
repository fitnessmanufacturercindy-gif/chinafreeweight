#!/usr/bin/env node

const DEFAULT_BASE_URL = "https://www.chinafreeweight.com";
const baseUrl = (process.env.CUSTOMER_COPY_BASE_URL || process.argv[2] || DEFAULT_BASE_URL).replace(/\/$/, "");
const concurrency = Math.max(1, Number(process.env.CUSTOMER_COPY_CONCURRENCY || 12));

const rules = [
  {
    id: "optimization-jargon",
    label: "internal optimization terminology",
    pattern: /\b(?:SEO|GEO|AI)\b/gu
  },
  {
    id: "editorial-workflow",
    label: "editorial or production workflow text",
    pattern: /\b(?:draft review|draft content|internal notes?|internal links?|content strategy|content score|generation notes?|missing evidence|image plan|search intent|buyer intent|source opportunity|keyword clusters?|keyword maps?|conversion paths?|conversion funnels?|lorem ipsum|placeholder)\b/giu
  },
  {
    id: "unfinished-marker",
    label: "unfinished content marker",
    pattern: /\b(?:TBD|TODO)\b/gu
  },
  {
    id: "page-commentary",
    label: "commentary about the page rather than the buyer offer",
    pattern: /\b(?:this|the)\s+(?:page|section|gallery|module|block)\b/giu
  },
  {
    id: "future-editorial-plan",
    label: "future editorial plan",
    pattern: /\b(?:designed to grow over time|new customer photos can be added|can be added as additional|more case entrances)\b/giu
  },
  {
    id: "spanish-internal-copy",
    label: "Spanish internal terminology",
    pattern: /\b(?:borrador|marcador de posici[oó]n|estrategia de contenido|intenci[oó]n de b[uú]squeda|enlaces internos|esta (?:p[aá]gina|secci[oó]n|galer[ií]a))\b/giu
  },
  {
    id: "portuguese-internal-copy",
    label: "Portuguese internal terminology",
    pattern: /\b(?:rascunho|espa[cç]o reservado|estrat[eé]gia de conte[uú]do|inten[cç][aã]o de (?:busca|pesquisa)|links internos|esta (?:p[aá]gina|se[cç][aã]o|galeria))\b/giu
  },
  {
    id: "western-europe-internal-copy",
    label: "localized internal terminology",
    pattern: /\b(?:Entwurf|Platzhalter|Suchabsicht|interne Links|diese Seite|dieser Abschnitt|brouillon|texte provisoire|intention de recherche|liens internes|cette (?:page|section|galerie)|bozza|segnaposto|intento di ricerca|link interni|questa (?:pagina|sezione|galleria)|utkast|platshållare|sökintention|interna länkar|den här sidan|det här avsnittet|szkic|wersja robocza|symbol zastępczy|intencja wyszukiwania|linki wewnętrzne|ta (?:strona|sekcja)|concepttekst|tijdelijke aanduiding|zoekintentie|interne links|deze (?:pagina|sectie))\b/giu
  },
  {
    id: "asian-language-internal-copy",
    label: "localized internal terminology",
    pattern: /(?:本[页頁]|本部分|页面结构|内部链接|草稿|占位文字|bản nháp|văn bản giữ chỗ|chiến lược nội dung|mục đích tìm kiếm|liên kết nội bộ|trang này|phần này|초안|자리 표시자|콘텐츠 전략|검색 의도|내부 링크|이 페이지|이 섹션|\bdraf\b|strategi konten|maksud pencarian|tautan internal|halaman ini|bagian ini)/giu
  }
];

function decodeEntities(value) {
  const entities = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"'
  };
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&([a-z]+);/gi, (entity, name) => entities[name.toLowerCase()] ?? entity);
}

function visibleTextFromHtml(html) {
  return decodeEntities(
    html
      .replace(/<!--([\s\S]*?)-->/g, " ")
      .replace(/<(script|style|noscript|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ").trim();
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)].map((match) => decodeEntities(match[1].trim()));
}

function onAuditOrigin(location) {
  const source = new URL(location, `${baseUrl}/`);
  return new URL(`${source.pathname}${source.search}`, `${baseUrl}/`).toString();
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "user-agent": "PowerBaseFit customer-visible copy audit" },
    redirect: "follow"
  });
  return { ok: response.ok, status: response.status, text: await response.text(), url: response.url };
}

async function discoverUrls() {
  const sitemapQueue = [`${baseUrl}/sitemap-index.xml`, `${baseUrl}/sitemap.xml`];
  const visitedSitemaps = new Set();
  const pages = new Set();

  while (sitemapQueue.length) {
    const sitemapUrl = sitemapQueue.shift();
    if (!sitemapUrl || visitedSitemaps.has(sitemapUrl)) continue;
    visitedSitemaps.add(sitemapUrl);
    const result = await fetchText(sitemapUrl);
    if (!result.ok) continue;
    for (const location of sitemapLocations(result.text)) {
      const auditLocation = onAuditOrigin(location);
      if (new URL(auditLocation).pathname.endsWith(".xml")) sitemapQueue.push(auditLocation);
      else pages.add(auditLocation.replace(/\/$/, "") || baseUrl);
    }
  }

  pages.add(baseUrl);
  return [...pages].sort();
}

function findingsForText(url, text) {
  const findings = [];
  for (const rule of rules) {
    rule.pattern.lastIndex = 0;
    for (const match of text.matchAll(rule.pattern)) {
      const start = Math.max(0, (match.index || 0) - 90);
      const end = Math.min(text.length, (match.index || 0) + match[0].length + 140);
      findings.push({
        url,
        rule: rule.id,
        label: rule.label,
        match: match[0],
        snippet: text.slice(start, end)
      });
    }
  }
  return findings;
}

async function auditPage(url) {
  try {
    const result = await fetchText(url);
    if (!result.ok) return { url, status: result.status, findings: [], error: `HTTP ${result.status}` };
    const text = visibleTextFromHtml(result.text);
    return { url, status: result.status, findings: findingsForText(url, text), error: null };
  } catch (error) {
    return { url, status: 0, findings: [], error: error instanceof Error ? error.message : String(error) };
  }
}

async function mapWithConcurrency(items, limit, task) {
  const results = new Array(items.length);
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await task(items[index]);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

const urls = await discoverUrls();
const results = await mapWithConcurrency(urls, concurrency, auditPage);
const findings = results.flatMap((result) => result.findings);
const errors = results.filter((result) => result.error);

console.log(JSON.stringify({
  baseUrl,
  pagesChecked: results.length,
  pagesWithFindings: new Set(findings.map((finding) => finding.url)).size,
  findingCount: findings.length,
  requestErrors: errors,
  findings
}, null, 2));

if (findings.length || errors.length) process.exitCode = 1;
