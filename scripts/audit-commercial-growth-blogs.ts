import fs from "node:fs";
import path from "node:path";
import { multilingualManifest } from "../content/i18n/multilingual-manifest";

const expected = {
  "materials-guide": {
    en: "/resources/rubber-vs-urethane-dumbbells-commercial-gyms",
    es: "/es/blog/mancuernas-goma-vs-pu-vs-tpu",
    "pt-BR": "/pt/blog/halter-borracha-pu-tpu",
    de: "/de/blog/gummi-pu-tpu-kurzhanteln-vergleich"
  },
  "hex-vs-round-guide": {
    en: "/resources/hex-vs-round-dumbbells-commercial-gyms",
    es: "/es/blog/mancuerna-hexagonal-vs-redonda",
    "pt-BR": "/pt/blog/halter-sextavado-ou-redondo",
    de: "/de/blog/hex-kurzhanteln-vs-rundhanteln"
  },
  "commercial-dumbbell-maintenance-guide": {
    en: "/resources/commercial-dumbbell-maintenance-cleaning-replacement",
    es: "/es/blog/mantenimiento-mancuernas-gimnasio",
    "pt-BR": "/pt/blog/manutencao-halteres-academia",
    de: "/de/blog/kurzhanteln-pflege-reinigung-austausch"
  },
  "commercial-kettlebell-guide": {
    en: "/resources/commercial-kettlebell-buying-guide",
    es: "/es/blog/guia-compra-kettlebells-gimnasio",
    "pt-BR": "/pt/blog/guia-compra-kettlebells-academia",
    de: "/de/blog/kettlebell-kaufberatung-fitnessstudio"
  },
  "free-weight-area-guide": {
    en: "/resources/commercial-free-weight-area-design",
    es: "/es/blog/planificar-zona-peso-libre",
    "pt-BR": "/pt/blog/planejamento-area-pesos-livres",
    de: "/de/blog/freihantelbereich-fitnessstudio-planen"
  }
} as const;

const blockedVisibleText = /\b(?:SEO|GEO|AIO|AI Search|ChatGPT|Gemini|Perplexity|Draft|Internal note|Placeholder|Generated content)\b/iu;
const blockedEditorialMarker = /\bTODO\b/u;
const removedArticleTerms = /\b(?:power rack|smith machine|functional trainer)\b/iu;
const failures: string[] = [];
const seenMetadata = new Set<string>();
const seenParagraphs = new Map<string, string>();

function visibleText(version: NonNullable<(typeof multilingualManifest.entities)[number]["versions"][keyof (typeof multilingualManifest.entities)[number]["versions"]]>) {
  return [
    version.title,
    version.description,
    version.h1,
    ...version.body.flatMap((block) => [
      block.heading ?? "",
      block.content ?? "",
      ...(Array.isArray(block.data?.items) ? block.data.items.map(String) : []),
      ...(Array.isArray(block.data?.rows) ? block.data.rows.flat().map(String) : []),
      typeof block.data?.caption === "string" ? block.data.caption : ""
    ]),
    ...version.faq.flatMap((item) => [item.question, item.answer]),
    ...version.images.flatMap((image) => [image.alt, image.caption ?? ""]),
    ...version.internalLinks.map((link) => link.label),
    ...Object.values(version.schemaData.extra ?? {}).filter((value): value is string => typeof value === "string")
  ].join("\n");
}

function countWords(value: string) {
  return value.trim().split(/\s+/u).filter(Boolean).length;
}

for (const [id, paths] of Object.entries(expected)) {
  const entity = multilingualManifest.entities.find((item) => item.id === id);
  if (!entity) {
    failures.push(`${id}: missing entity`);
    continue;
  }

  for (const [locale, expectedPath] of Object.entries(paths)) {
    const version = entity.versions[locale as keyof typeof entity.versions];
    if (!version) {
      failures.push(`${id}:${locale}: missing version`);
      continue;
    }
    if (version.publicPath !== expectedPath) failures.push(`${id}:${locale}: unexpected path ${version.publicPath}`);
    if (version.publishStatus !== "published" || !version.publishedAt) failures.push(`${id}:${locale}: not published`);
    if (version.reviewStatus !== "approved") failures.push(`${id}:${locale}: not approved`);
    if (version.canonicalData.mode !== "self") failures.push(`${id}:${locale}: canonical is not self`);
    if (!version.hreflangData.include) failures.push(`${id}:${locale}: missing hreflang participation`);
    if (version.faq.length < 6 || version.faq.length > 8) failures.push(`${id}:${locale}: FAQ count ${version.faq.length}`);

    const text = visibleText(version);
    const words = countWords(text);
    if (words < 1800 || words > 2400) failures.push(`${id}:${locale}: ${words} words`);
    if (blockedVisibleText.test(text) || blockedEditorialMarker.test(text)) failures.push(`${id}:${locale}: contains publishing-process wording`);
    if (removedArticleTerms.test(text)) failures.push(`${id}:${locale}: contains removed comparison-topic wording`);

    const metadataKey = `${locale}\n${version.title.toLocaleLowerCase()}\n${version.description.toLocaleLowerCase()}`;
    if (seenMetadata.has(metadataKey)) failures.push(`${id}:${locale}: duplicate title and description`);
    seenMetadata.add(metadataKey);

    for (const block of version.body) {
      for (const paragraph of (block.content ?? "").split(/\n\n+/u)) {
        const normalized = paragraph.trim().replace(/\s+/gu, " ").toLocaleLowerCase();
        if (normalized.length < 180) continue;
        const previous = seenParagraphs.get(normalized);
        if (previous) failures.push(`${id}:${locale}: duplicates paragraph from ${previous}`);
        else seenParagraphs.set(normalized, `${id}:${locale}`);
      }
    }

    for (const image of version.images) {
      const encodedGermanSource = image.src.match(/^\/bilder\/([^/]+)\//u)?.[1];
      const sourcePath = encodedGermanSource ? Buffer.from(encodedGermanSource, "base64url").toString("utf8") : image.src;
      const diskPath = path.join(process.cwd(), "public", sourcePath.replace(/^\//u, ""));
      if (!fs.existsSync(diskPath)) failures.push(`${id}:${locale}: missing image ${image.src}`);
      if (!image.width || !image.height) failures.push(`${id}:${locale}: image dimensions missing for ${image.src}`);
      if (!image.alt.trim() || !image.caption?.trim()) failures.push(`${id}:${locale}: image text missing for ${image.src}`);
    }
  }

  if (["commercial-dumbbell-maintenance-guide", "commercial-kettlebell-guide"].includes(id)) {
    for (const [locale, version] of Object.entries(entity.versions)) {
      if (version && !(locale in paths) && version.hreflangData.include) failures.push(`${id}:${locale}: unexpected hreflang participation`);
    }
  }
}

const contentDirectories = [path.join(process.cwd(), "content", "i18n"), path.join(process.cwd(), "content", "resources")];
for (const directory of contentDirectories) {
  for (const filename of fs.readdirSync(directory)) {
    if (/(?:\.draft(?:\.|$)|\.tmp$|\.bak$|^notes?(?:\.|$))/iu.test(filename)) failures.push(`non-release content file: ${path.join(directory, filename)}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Commercial growth blog audit passed: 5 topics, 20 localized versions.");
