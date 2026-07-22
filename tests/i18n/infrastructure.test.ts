import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import sitemap from "../../app/sitemap";
import { siteUrl as configuredSiteUrl } from "../../app/site";
import { getLanguageSwitchOptions, resolveLanguageSwitchTarget } from "../../app/components/i18n/LanguageSwitcher";
import { contentRepository, createContentRepository } from "../../lib/content/repository";
import type { ContentEntity, ContentManifest, LocalizedContentVersion, PublicationStatus } from "../../lib/content/types";
import { buildPublicPath } from "../../lib/i18n/paths";
import { decideLocaleRequest } from "../../lib/i18n/request-policy";
import { createTranslationPipeline, type TranslationRecord } from "../../lib/publishing/translation-pipeline";
import { buildLocalizedMetadata } from "../../lib/seo/metadata";
import { buildLocalizedSchemaGraph } from "../../lib/seo/schema";
import { buildPublishedSitemap } from "../../lib/seo/sitemap";
import { validateContentManifest } from "../../lib/validation/locale";
import { localizedSitemapEntries } from "../../app/seo-data";
import { commercialCompletionBCSelections } from "../../content/i18n/commercial-completion-bc";
import { commercialCompletionCSelections } from "../../content/i18n/commercial-completion-c";
import { indonesianExcludedContentIds } from "../../content/i18n/indonesian-manifest";

const siteUrl = "https://www.chinafreeweight.com";
const timestamp = "2026-07-14T00:00:00.000Z";

function localizedVersion(
  locale: "en" | "pt-BR",
  publicPath: string,
  status: PublicationStatus = "published"
): LocalizedContentVersion {
  return {
    locale,
    translationStatus: status,
    reviewStatus: status,
    publishStatus: status,
    slug: "rubber-hex-dumbbells",
    publicPath,
    title: `${locale} fixture title`,
    description: `${locale} fixture description`,
    h1: `${locale} fixture heading`,
    body: [{ id: "intro", type: "rich_text", content: `${locale} fixture body` }],
    faq: [{ id: "faq-1", question: `${locale} fixture question`, answer: `${locale} fixture answer` }],
    schemaData: {
      sku: "PBF-TEST",
      brand: "PowerBaseFit",
      breadcrumbs: [{ name: `${locale} fixture breadcrumb`, path: publicPath }]
    },
    images: [{ id: "hero", src: "/assets/hero-poster.avif", alt: `${locale} fixture alt` }],
    internalLinks: [],
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt: timestamp,
    publishedAt: status === "published" ? timestamp : undefined,
    version: 1
  };
}

function fixtureManifest(ptStatus: PublicationStatus = "published"): ContentManifest {
  const entity: ContentEntity = {
    id: "product:rubber-hex-dumbbells",
    type: "product",
    defaultLocale: "en",
    versions: {
      en: localizedVersion("en", "/products/dumbbells/rubber-hex-dumbbells"),
      "pt-BR": localizedVersion("pt-BR", "/pt/products/dumbbells/rubber-hex-dumbbells", ptStatus)
    }
  };
  return { schemaVersion: 1, entities: [entity] };
}

test("locale routing: English stays unprefixed and /en redirects", () => {
  assert.deepEqual(decideLocaleRequest("/products/dumbbells"), { action: "pass", internalLocale: "en" });
  assert.deepEqual(decideLocaleRequest("/en/products/dumbbells"), {
    action: "redirect",
    destination: "/products/dumbbells"
  });
  assert.equal(buildPublicPath("en", "/products/dumbbells"), "/products/dumbbells");
  assert.equal(buildPublicPath("pt-BR", "/products/dumbbells"), "/pt/products/dumbbells");
});

test("published locale routing: Portuguese, Spanish, German, French, Vietnamese, Swedish, Italian, Korean and Indonesian are public", () => {
  assert.deepEqual(decideLocaleRequest("/pt/products/dumbbells"), {
    action: "pass",
    internalLocale: "pt-BR"
  });
  assert.deepEqual(decideLocaleRequest("/es/productos/mancuernas"), { action: "pass", internalLocale: "es" });
  assert.deepEqual(decideLocaleRequest("/de/produkte/kurzhanteln"), { action: "pass", internalLocale: "de" });
  assert.deepEqual(decideLocaleRequest("/fr/produits/halteres"), { action: "pass", internalLocale: "fr" });
  assert.deepEqual(decideLocaleRequest("/vi/san-pham/ta-tay"), { action: "pass", internalLocale: "vi" });
  assert.deepEqual(decideLocaleRequest("/sv/produkter/hantlar"), { action: "pass", internalLocale: "sv" });
  assert.deepEqual(decideLocaleRequest("/it/prodotti"), { action: "pass", internalLocale: "it" });
  assert.deepEqual(decideLocaleRequest("/ko/products"), { action: "pass", internalLocale: "ko" });
  assert.deepEqual(decideLocaleRequest("/id/produk"), { action: "pass", internalLocale: "id" });
});

test("production manifest: only reviewed content in the ten public languages is published", () => {
  assert.equal(contentRepository.listPublished({ locale: "pt-BR" }).length, 122);
  assert.equal(contentRepository.listPublished({ locale: "es" }).length, 122);
  assert.equal(contentRepository.listPublished({ locale: "de" }).length, 124);
  assert.equal(contentRepository.listPublished({ locale: "fr" }).length, 124);
  assert.equal(contentRepository.listPublished({ locale: "en" }).length, 123);
  assert.equal(contentRepository.listPublished({ locale: "vi" }).length, 124);
  assert.equal(contentRepository.listPublished({ locale: "sv" }).length, 124);
  assert.equal(contentRepository.listPublished({ locale: "it" }).length, 124);
  assert.equal(contentRepository.listPublished({ locale: "ko" }).length, 116);
  assert.equal(contentRepository.listPublished({ locale: "id" }).length, 122);
  assert.equal(contentRepository.listPublished().length, 1225);
  assert.equal(contentRepository.listPublished().some(({ version }) => !["en", "pt-BR", "es", "de", "fr", "vi", "sv", "it", "ko", "id"].includes(version.locale)), false);
});

test("canonical and metadata: localized content is self-canonical", () => {
  const repository = createContentRepository(fixtureManifest());
  const content = repository.getPublishedVersion("product:rubber-hex-dumbbells", "pt-BR");
  assert.ok(content);
  const metadata = buildLocalizedMetadata(content, repository, siteUrl, "PowerBaseFit");
  assert.equal(metadata.alternates?.canonical, `${siteUrl}/pt/products/dumbbells/rubber-hex-dumbbells`);
  assert.equal(metadata.openGraph && "locale" in metadata.openGraph ? metadata.openGraph.locale : undefined, "pt_BR");
});

test("hreflang: only public, published and existing locale routes are emitted", () => {
  const repository = createContentRepository(fixtureManifest());
  const content = repository.getPublishedVersion("product:rubber-hex-dumbbells", "en");
  assert.ok(content);
  const metadata = buildLocalizedMetadata(content, repository, siteUrl, "PowerBaseFit");
  assert.deepEqual(metadata.alternates?.languages, {
    en: `${siteUrl}/products/dumbbells/rubber-hex-dumbbells`,
    "pt-BR": `${siteUrl}/pt/products/dumbbells/rubber-hex-dumbbells`,
    "x-default": `${siteUrl}/products/dumbbells/rubber-hex-dumbbells`
  });
});

test("schema language: localized schema uses the current locale text and URL", () => {
  const repository = createContentRepository(fixtureManifest());
  const content = repository.getPublishedVersion("product:rubber-hex-dumbbells", "pt-BR");
  assert.ok(content);
  const graph = buildLocalizedSchemaGraph(content, siteUrl);
  const product = graph.find((node) => node["@type"] === "Product");
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  assert.equal(product?.inLanguage, "pt-BR");
  assert.equal(breadcrumb?.inLanguage, "pt-BR");
  assert.equal(product?.url, `${siteUrl}/pt/products/dumbbells/rubber-hex-dumbbells`);
  assert.equal(product?.name, "pt-BR fixture heading");
});

test("growth content: products and blogs meet useful Portuguese depth targets", () => {
  function words(content: ReturnType<typeof contentRepository.listPublished>[number]) {
    const { version } = content;
    const dataText = version.body.flatMap((block) => {
      const values = [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items, block.data?.markdown].flat(3);
      return values.filter((value): value is string => typeof value === "string");
    });
    return [version.h1, version.description, ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? ""]), ...dataText, ...version.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ")
      .split(/\s+/)
      .filter(Boolean).length;
  }

  const portuguese = contentRepository.listPublished({ locale: "pt-BR" });
  const productWords = portuguese.filter(({ entity }) => entity.type === "product").map(words);
  const blogWords = portuguese.filter(({ entity }) => entity.type === "blog").map(words);
  assert.equal(productWords.length, 85);
  assert.ok(productWords.every((count) => count >= 700 && count <= 1500), JSON.stringify(productWords));
  assert.equal(blogWords.length, 25);
  assert.ok(blogWords.every((count) => count >= 1200 && count <= 2000), JSON.stringify(blogWords));
});

test("Spanish expansion: products and blogs meet localized depth targets", () => {
  function words(content: ReturnType<typeof contentRepository.listPublished>[number]) {
    const dataText = content.version.body.flatMap((block) =>
      [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items, block.data?.markdown].flat(3)
        .filter((value): value is string => typeof value === "string")
    );
    return [
      content.version.h1,
      content.version.description,
      ...content.version.body.flatMap((block) => [block.heading ?? "", block.content ?? ""]),
      ...dataText,
      ...content.version.faq.flatMap((item) => [item.question, item.answer])
    ].join(" ").split(/\s+/).filter(Boolean).length;
  }
  const spanish = contentRepository.listPublished({ locale: "es" });
  const products = spanish.filter(({ entity }) => entity.type === "product").map(words);
  const blogs = spanish.filter(({ entity }) => entity.type === "blog").map(words);
  assert.equal(products.length, 85);
  assert.ok(products.every((count) => count >= 700 && count <= 1500), JSON.stringify(products));
  assert.equal(blogs.length, 25);
  assert.ok(blogs.every((count) => count >= 1200 && count <= 2000), JSON.stringify(blogs));
});

test("multilingual SEO expansion: eight A-grade pages are deep, unique and internally linked", () => {
  const routes = [
    "/pt/produtos/racks-e-bancos",
    "/pt/produtos/acessorios-de-academia",
    "/pt/fabricante/halteres-sextavados-de-borracha",
    "/es/productos/racks-y-bancos",
    "/es/productos/accesorios-de-gimnasio",
    "/es/fabricante/mancuernas-hexagonales-de-goma",
    "/es/blog/como-elegir-mancuernas-para-gimnasio-profesional",
    "/es/blog/discos-de-peso-vs-discos-bumper"
  ];
  const localized = contentRepository.listPublished().filter(({ version }) => routes.includes(version.publicPath));
  assert.equal(localized.length, routes.length);

  function words(content: (typeof localized)[number]) {
    const data = content.version.body.flatMap((block) =>
      [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items].flat(3)
        .filter((value): value is string => typeof value === "string")
    );
    return [content.version.h1, content.version.description, ...content.version.body.flatMap((block) => [block.heading ?? "", block.content ?? ""]), ...data, ...content.version.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ").split(/\s+/).filter(Boolean).length;
  }

  for (const content of localized) {
    const count = words(content);
    const minimum = content.entity.type === "blog" ? 1200 : 700;
    const maximum = content.entity.type === "blog" ? 2000 : 1200;
    assert.ok(count >= minimum && count <= maximum, `${content.version.publicPath}: ${count}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage"), `${content.version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList"), `${content.version.publicPath}: breadcrumb schema`);
    const alternates = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit").alternates?.languages;
    const hasEnglishEquivalent = Boolean(contentRepository.getPublishedVersion(content.entity.id, "en"));
    assert.ok(alternates && alternates["pt-BR"] && alternates.es && alternates["x-default"], `${content.version.publicPath}: hreflang cluster`);
    assert.equal(Boolean(alternates?.en), hasEnglishEquivalent, `${content.version.publicPath}: English hreflang only when an English equivalent exists`);
    const inbound = contentRepository.listPublished({ locale: content.version.locale })
      .some(({ entity, version }) => entity.id !== content.entity.id && version.internalLinks.some((link) => link.targetContentId === content.entity.id));
    assert.ok(inbound, `${content.version.publicPath}: inbound internal link`);
  }

  for (const locale of ["pt-BR", "es"] as const) {
    const pages = contentRepository.listPublished({ locale });
    assert.equal(new Set(pages.map(({ version }) => version.title)).size, pages.length, `${locale}: unique titles`);
    assert.equal(new Set(pages.map(({ version }) => version.description)).size, pages.length, `${locale}: unique descriptions`);
    assert.equal(new Set(pages.map(({ version }) => version.h1)).size, pages.length, `${locale}: unique H1s`);
  }
});

test("product localization batch 1: eighteen pages meet content, image, schema and publishing gates", () => {
  const routes = [
    "/pt/produtos/halteres/halter-ferro-fundido",
    "/pt/produtos/halteres/halter-cpu",
    "/pt/produtos/halteres/halter-tpu",
    "/pt/produtos/anilhas/anilha-bumper-cpu",
    "/pt/produtos/anilhas/anilha-ferro-fundido",
    "/pt/produtos/anilhas/anilha-cpu-com-pegada",
    "/pt/blog/como-sao-fabricadas-anilhas-bumper",
    "/pt/blog/como-verificar-peso-de-halteres-na-fabrica",
    "/es/productos/mancuernas/mancuerna-redonda-de-goma",
    "/es/productos/mancuernas/mancuerna-pu",
    "/es/productos/mancuernas/mancuerna-hierro-fundido",
    "/es/productos/mancuernas/mancuerna-cpu",
    "/es/productos/mancuernas/mancuerna-tpu",
    "/es/productos/discos/disco-bumper-cpu",
    "/es/productos/discos/disco-hierro-fundido",
    "/es/productos/discos/disco-cpu-con-agarres",
    "/es/blog/como-se-fabrican-discos-bumper",
    "/es/blog/como-verificar-peso-mancuernas-fabrica"
  ];
  const localized = contentRepository.listPublished().filter(({ version }) => routes.includes(version.publicPath));
  assert.equal(localized.length, routes.length);

  const words = (content: (typeof localized)[number]) => {
    const data = content.version.body.flatMap((block) =>
      [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items].flat(3)
        .filter((value): value is string => typeof value === "string")
    );
    return [content.version.h1, content.version.description, ...content.version.body.flatMap((block) => [block.heading ?? "", block.content ?? ""]), ...data, ...content.version.faq.flatMap((item) => [item.question, item.answer])]
      .join(" ").split(/\s+/).filter(Boolean).length;
  };

  for (const content of localized) {
    const { entity, version } = content;
    const count = words(content);
    assert.ok(count >= (entity.type === "blog" ? 1200 : 700), `${version.publicPath}: minimum ${count}`);
    assert.ok(count <= (entity.type === "blog" ? 2000 : 1200), `${version.publicPath}: maximum ${count}`);
    assert.ok(version.images.length >= 1, `${version.publicPath}: image`);
    assert.ok(version.images.every((image) => image.alt.length > 20), `${version.publicPath}: localized alt`);
    assert.ok(version.author && version.reviewedBy && version.updatedAt === "2026-07-17T12:00:00.000Z", `${version.publicPath}: editorial data`);
    const components = new Set(version.body.map((block) => block.data?.component));
    assert.ok(components.has("quick-answer") && components.has("definition"), `${version.publicPath}: answer structure`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: specification table`);
    assert.ok(version.body.some((block) => block.type === "features"), `${version.publicPath}: checklist`);
    const visible = [version.title, version.description, version.h1, ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? ""]), ...version.faq.flatMap((item) => [item.question, item.answer])].join(" ");
    assert.doesNotMatch(visible, /\b(?:SEO|GEO|AI Search|Google ranking|keyword optimization)\b/i, `${version.publicPath}: internal terminology`);

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`, `${version.publicPath}: canonical`);
    const expectedLanguages = ["de", "en", "es", "fr", "it", "pt-BR", "sv", "vi", "x-default"];
    if (contentRepository.getPublishedVersion(entity.id, "ko")) expectedLanguages.push("ko");
    if (contentRepository.getPublishedVersion(entity.id, "id")) expectedLanguages.push("id");
    assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}).sort(), expectedLanguages.sort(), `${version.publicPath}: hreflang`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primaryType = entity.type === "blog" ? "BlogPosting" : "Product";
    const schemaLanguage = version.locale;
    assert.ok(graph.some((node) => node["@type"] === primaryType && node.inLanguage === schemaLanguage), `${version.publicPath}: primary schema`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === schemaLanguage), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === schemaLanguage), `${version.publicPath}: breadcrumb schema`);
    const inbound = contentRepository.listPublished({ locale: version.locale })
      .some(({ entity: source, version: sourceVersion }) => source.id !== entity.id && sourceVersion.internalLinks.some((link) => link.targetContentId === entity.id));
    assert.ok(inbound, `${version.publicPath}: inbound localized link`);
  }

  const fiveGrams = (text: string) => {
    const tokens = text.toLowerCase().replace(/[^a-záéíóúüñãõç0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(" ")));
  };
  for (const locale of ["pt-BR", "es"] as const) {
    const products = localized.filter(({ entity, version }) => entity.type === "product" && version.locale === locale);
    for (let first = 0; first < products.length; first += 1) {
      for (let second = first + 1; second < products.length; second += 1) {
        const left = fiveGrams(products[first].version.body.map((block) => block.content ?? "").join(" "));
        const right = fiveGrams(products[second].version.body.map((block) => block.content ?? "").join(" "));
        const intersection = [...left].filter((gram) => right.has(gram)).length;
        const overlap = intersection / new Set([...left, ...right]).size;
        assert.ok(overlap < 0.45, `${locale}: ${products[first].entity.id}/${products[second].entity.id} overlap ${overlap}`);
      }
    }
  }
});

test("growth content: AI answer blocks, tables, authors, links and images are complete", () => {
  const localized = [
    ...contentRepository.listPublished({ locale: "pt-BR" }),
    ...contentRepository.listPublished({ locale: "es" })
  ];
  const deepPages = localized.filter(({ entity }) => entity.type === "product" || entity.type === "blog");

  for (const content of deepPages) {
    const types = new Set(content.version.body.map((block) => block.type));
    const components = new Set(content.version.body.map((block) => block.data?.component));
    assert.ok(components.has("quick-answer"), `${content.version.publicPath}: quick answer`);
    assert.ok(components.has("definition"), `${content.version.publicPath}: definition`);
    const hasMarkdownTable = content.version.body.some((block) => typeof block.data?.markdown === "string" && block.data.markdown.includes("|---"));
    assert.ok(types.has("specifications") || hasMarkdownTable, `${content.version.publicPath}: table`);
    assert.ok(content.version.author, `${content.version.publicPath}: author`);
    assert.ok(content.version.reviewedBy, `${content.version.publicPath}: reviewer`);
    assert.ok(content.version.faq.length >= 4, `${content.version.publicPath}: FAQ`);
  }

  for (const { version } of localized) {
    for (const link of version.internalLinks) {
      assert.ok(contentRepository.getPublishedVersion(link.targetContentId, version.locale), `${version.publicPath}: ${link.targetContentId}`);
    }
    for (const item of version.images) {
      assert.ok(existsSync(join(process.cwd(), "public", item.src.replace(/^\//, ""))), `${version.publicPath}: ${item.src}`);
      assert.ok(item.alt.trim().length > 20, `${version.publicPath}: image alt`);
    }
  }
});

test("growth schema: product facts and editorial review are machine readable", () => {
  const productContent = contentRepository.getPublishedVersion("rubber-round-dumbbell", "pt-BR");
  assert.ok(productContent);
  const productGraph = buildLocalizedSchemaGraph(productContent, siteUrl);
  const product = productGraph.find((node) => node["@type"] === "Product");
  assert.equal(product?.manufacturer && typeof product.manufacturer === "object" && "name" in product.manufacturer ? product.manufacturer.name : undefined, "Powerbase Fitness Equipment Co.,Ltd");
  assert.ok(Array.isArray(product?.additionalProperty));

  const blogContent = contentRepository.getPublishedVersion("import-guide", "pt-BR");
  assert.ok(blogContent);
  const blogGraph = buildLocalizedSchemaGraph(blogContent, siteUrl);
  const article = blogGraph.find((node) => node["@type"] === "BlogPosting");
  assert.equal(article?.author && typeof article.author === "object" && "@type" in article.author ? article.author["@type"] : undefined, "Organization");
  assert.ok(article?.reviewedBy);
  assert.ok(article?.publisher);
  assert.ok(article?.image);
});

test("Spanish metadata and schema use Spanish text and language", () => {
  const content = contentRepository.getPublishedVersion("rubber-hex-dumbbell", "es");
  assert.ok(content);
  const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
  assert.equal(metadata.alternates?.canonical, `${siteUrl}/es/productos/mancuernas/mancuerna-hexagonal-goma`);
  assert.deepEqual(metadata.alternates?.languages, {
    en: `${siteUrl}/products/dumbbells/hex-dumbbell-kg`,
    "pt-BR": `${siteUrl}/pt/produtos/halteres/halter-sextavado-borracha`,
    es: `${siteUrl}/es/productos/mancuernas/mancuerna-hexagonal-goma`,
    de: `${siteUrl}/de/produkte/kurzhanteln/gummi-hex-kurzhantel`,
    fr: `${siteUrl}/fr/produits/halteres/haltere-hexagonal-caoutchouc`,
    vi: `${siteUrl}/vi/san-pham/ta-tay/ta-tay-luc-giac-boc-cao-su`,
    sv: `${siteUrl}/sv/produkter/hantlar/hexagonal-hantel`,
    it: `${siteUrl}/it/prodotti/manubri/manubrio-esagonale-in-gomma`,
    ko: `${siteUrl}/ko/products/dumbbells/rubber-hex-dumbbell`,
    id: `${siteUrl}/id/produk/dumbbell/dumbbell-hex-karet`,
    "x-default": `${siteUrl}/products/dumbbells/hex-dumbbell-kg`
  });
  const graph = buildLocalizedSchemaGraph(content, siteUrl);
  const product = graph.find((node) => node["@type"] === "Product");
  const faq = graph.find((node) => node["@type"] === "FAQPage");
  const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
  assert.equal(product?.inLanguage, "es");
  assert.match(String(product?.name), /Mancuerna hexagonal/);
  assert.equal(faq?.inLanguage, "es");
  assert.equal(breadcrumb?.inLanguage, "es");
});

test("products hub has a complete ten-language hreflang cluster", () => {
  const content = contentRepository.getPublishedVersion("products-hub", "pt-BR");
  assert.ok(content);
  const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
  assert.deepEqual(metadata.alternates?.languages, {
    en: `${siteUrl}/products`,
    "pt-BR": `${siteUrl}/pt/produtos`,
    es: `${siteUrl}/es/productos`,
    de: `${siteUrl}/de/produkte`,
    fr: `${siteUrl}/fr/produits`,
    vi: `${siteUrl}/vi/san-pham`,
    sv: `${siteUrl}/sv/produkter`,
    it: `${siteUrl}/it/prodotti`,
    ko: `${siteUrl}/ko/products`,
    id: `${siteUrl}/id/produk`,
    "x-default": `${siteUrl}/products`
  });
  assert.deepEqual(getLanguageSwitchOptions("products-hub", "pt-BR", contentRepository).map((option) => option.locale), ["en", "pt-BR", "es", "de", "fr", "vi", "sv", "it", "ko", "id"]);
});

test("sitemap: non-public and review-required localizations never enter output", () => {
  for (const ptStatus of ["published", "review_required"] as const) {
    const repository = createContentRepository(fixtureManifest(ptStatus));
    const entries = buildPublishedSitemap(repository, siteUrl);
    assert.deepEqual(entries.map((entry) => entry.url), ptStatus === "published" ? [
      `${siteUrl}/products/dumbbells/rubber-hex-dumbbells`,
      `${siteUrl}/pt/products/dumbbells/rubber-hex-dumbbells`
    ] : [`${siteUrl}/products/dumbbells/rubber-hex-dumbbells`]);
  }
});

test("language switch mapping: stable content ID resolves the matching localized slug", () => {
  const repository = createContentRepository(fixtureManifest());
  assert.equal(
    resolveLanguageSwitchTarget(
      "product:rubber-hex-dumbbells",
      "pt-BR",
      repository,
      () => true
    ),
    "/pt/products/dumbbells/rubber-hex-dumbbells"
  );
  assert.deepEqual(getLanguageSwitchOptions("product:rubber-hex-dumbbells", "en", repository).map((option) => option.locale), ["en", "pt-BR"]);
  assert.deepEqual(getLanguageSwitchOptions("dumbbells-category", "en", contentRepository).map((option) => option.locale), ["en", "pt-BR", "es", "de", "fr", "vi", "sv", "it", "ko", "id"]);
  assert.equal(resolveLanguageSwitchTarget("dumbbells-category", "es", contentRepository), "/es/productos/mancuernas");
});

test("locale validation: catches /en URLs, missing slugs and duplicate localized URLs", () => {
  const manifest = fixtureManifest();
  const duplicate = structuredClone(manifest.entities[0]);
  duplicate.id = "product:duplicate";
  duplicate.versions.en!.slug = "";
  duplicate.versions.en!.publicPath = "/en/products/dumbbells/rubber-hex-dumbbells";
  manifest.entities.push(duplicate);
  const codes = validateContentManifest(manifest).map((issue) => issue.code);
  assert.ok(codes.includes("english_prefixed"));
  assert.ok(codes.includes("missing_slug"));
  assert.ok(codes.includes("duplicate_locale_url"));
});

test("translation pipeline: review and publish gates preserve immutable history", () => {
  const draft = localizedVersion("pt-BR", "/pt/products/dumbbells/rubber-hex-dumbbells", "draft");
  const pipeline = createTranslationPipeline(() => timestamp);
  let record: TranslationRecord = { contentId: "product:rubber-hex-dumbbells", locale: "pt-BR", current: draft, history: [] };
  for (const status of ["generated", "localized", "review_required", "approved", "published"] as const) {
    record = pipeline.transition(record, status, "test");
  }
  assert.equal(record.current.publishStatus, "published");
  assert.equal(record.history.length, 5);
  assert.equal(record.current.publishedAt, timestamp);
  const withdrawn = pipeline.withdraw(record, "test");
  assert.equal(withdrawn.current.publishStatus, "approved");
  assert.equal(withdrawn.current.publishedAt, undefined);
});

test("multilingual sitemap retains 135 English routes and adds all nine localized route sets", () => {
  const urls = sitemap().map((entry) => entry.url);
  const portugueseUrls = urls.filter((url) => new URL(url).pathname === "/pt" || new URL(url).pathname.startsWith("/pt/"));
  const spanishUrls = urls.filter((url) => new URL(url).pathname === "/es" || new URL(url).pathname.startsWith("/es/"));
  const germanUrls = urls.filter((url) => new URL(url).pathname === "/de" || new URL(url).pathname.startsWith("/de/"));
  const frenchUrls = urls.filter((url) => new URL(url).pathname === "/fr" || new URL(url).pathname.startsWith("/fr/"));
  const vietnameseUrls = urls.filter((url) => new URL(url).pathname === "/vi" || new URL(url).pathname.startsWith("/vi/"));
  const swedishUrls = urls.filter((url) => new URL(url).pathname === "/sv" || new URL(url).pathname.startsWith("/sv/"));
  const italianUrls = urls.filter((url) => new URL(url).pathname === "/it" || new URL(url).pathname.startsWith("/it/"));
  const koreanUrls = urls.filter((url) => new URL(url).pathname === "/ko" || new URL(url).pathname.startsWith("/ko/"));
  const indonesianUrls = urls.filter((url) => new URL(url).pathname === "/id" || new URL(url).pathname.startsWith("/id/"));
  const englishUrls = urls.filter((url) => !portugueseUrls.includes(url) && !spanishUrls.includes(url) && !germanUrls.includes(url) && !frenchUrls.includes(url) && !vietnameseUrls.includes(url) && !swedishUrls.includes(url) && !italianUrls.includes(url) && !koreanUrls.includes(url) && !indonesianUrls.includes(url));
  assert.equal(englishUrls.length, 135);
  assert.equal(portugueseUrls.length, 122);
  assert.equal(spanishUrls.length, 122);
  assert.equal(germanUrls.length, 124);
  assert.equal(frenchUrls.length, 124);
  assert.equal(vietnameseUrls.length, 124);
  assert.equal(swedishUrls.length, 124);
  assert.equal(italianUrls.length, 124);
  assert.equal(koreanUrls.length, 116);
  assert.equal(indonesianUrls.length, 122);
  assert.equal(new Set(urls).size, 1237);
  assert.ok(urls.includes(configuredSiteUrl));
  assert.ok(urls.includes(`${configuredSiteUrl}/products/dumbbells`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/how-to-choose-commercial-dumbbells`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/do-dumbbells-help-with-bone-density`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/why-is-it-called-a-dumbbell`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/can-i-build-muscle-with-only-dumbbells`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/how-are-bumper-plates-made`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/how-are-dumbbells-weighed`));
  assert.ok(urls.includes(`${configuredSiteUrl}/factory`));
  assert.ok(urls.includes(`${configuredSiteUrl}/contact`));
  assert.equal(urls.some((url) => new URL(url).pathname.startsWith("/en/")), false);
  assert.ok(urls.includes(`${configuredSiteUrl}/es`));
  assert.ok(urls.includes(`${configuredSiteUrl}/es/productos/mancuernas`));
  assert.ok(urls.includes(`${configuredSiteUrl}/es/blog/importar-equipos-gimnasio-desde-china`));
  assert.ok(urls.includes(`${configuredSiteUrl}/de`));
  assert.ok(urls.includes(`${configuredSiteUrl}/de/produkte`));
  assert.ok(urls.includes(`${configuredSiteUrl}/de/blog/wie-werden-bumper-plates-hergestellt`));
  assert.ok(urls.includes(`${configuredSiteUrl}/fr`));
  assert.ok(urls.includes(`${configuredSiteUrl}/fr/produits`));
  assert.ok(urls.includes(`${configuredSiteUrl}/fr/blog/fabrication-bumper-plates`));
  assert.ok(urls.includes(`${configuredSiteUrl}/vi`));
  assert.ok(urls.includes(`${configuredSiteUrl}/vi/san-pham`));
  assert.ok(urls.includes(`${configuredSiteUrl}/vi/blog/quy-trinh-san-xuat-banh-ta-bumper`));
  assert.ok(urls.includes(`${configuredSiteUrl}/sv`));
  assert.ok(urls.includes(`${configuredSiteUrl}/sv/produkter`));
  assert.ok(urls.includes(`${configuredSiteUrl}/sv/blogg/sa-tillverkas-bumperviktskivor`));
  assert.ok(urls.includes(`${configuredSiteUrl}/it`));
  assert.ok(urls.includes(`${configuredSiteUrl}/it/prodotti`));
  assert.ok(urls.includes(`${configuredSiteUrl}/it/blog/come-si-producono-dischi-bumper`));
  assert.ok(urls.includes(`${configuredSiteUrl}/ko`));
  assert.ok(urls.includes(`${configuredSiteUrl}/ko/products`));
  assert.ok(urls.includes(`${configuredSiteUrl}/ko/blog/choose-chinese-fitness-equipment-manufacturer`));
  assert.ok(urls.includes(`${configuredSiteUrl}/id`));
  assert.ok(urls.includes(`${configuredSiteUrl}/id/produk`));
  assert.equal(urls.some((url) => /^\/(nl|ru|ar|ja)(\/|$)/.test(new URL(url).pathname)), false);
});

test("language sitemap contains all 1237 public URLs with the complete products hub cluster", () => {
  const entries = localizedSitemapEntries();
  const english = entries.filter((entry) => !/^\/(?:pt|es|de|fr|vi|sv|it|ko|id)(?:\/|$)/.test(new URL(entry.url).pathname));
  const portuguese = entries.filter((entry) => /^\/pt(?:\/|$)/.test(new URL(entry.url).pathname));
  const spanish = entries.filter((entry) => /^\/es(?:\/|$)/.test(new URL(entry.url).pathname));
  const german = entries.filter((entry) => /^\/de(?:\/|$)/.test(new URL(entry.url).pathname));
  const french = entries.filter((entry) => /^\/fr(?:\/|$)/.test(new URL(entry.url).pathname));
  const vietnamese = entries.filter((entry) => /^\/vi(?:\/|$)/.test(new URL(entry.url).pathname));
  const swedish = entries.filter((entry) => /^\/sv(?:\/|$)/.test(new URL(entry.url).pathname));
  const italian = entries.filter((entry) => /^\/it(?:\/|$)/.test(new URL(entry.url).pathname));
  const korean = entries.filter((entry) => /^\/ko(?:\/|$)/.test(new URL(entry.url).pathname));
  const indonesian = entries.filter((entry) => /^\/id(?:\/|$)/.test(new URL(entry.url).pathname));
  assert.equal(english.length, 135);
  assert.equal(portuguese.length, 122);
  assert.equal(spanish.length, 122);
  assert.equal(german.length, 124);
  assert.equal(french.length, 124);
  assert.equal(vietnamese.length, 124);
  assert.equal(swedish.length, 124);
  assert.equal(italian.length, 124);
  assert.equal(korean.length, 116);
  assert.equal(indonesian.length, 122);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 1237);
  for (const path of ["/products", "/pt/produtos", "/es/productos", "/de/produkte", "/fr/produits", "/vi/san-pham", "/sv/produkter", "/it/prodotti", "/ko/products", "/id/produk"]) {
    const entry = entries.find((item) => new URL(item.url).pathname === path);
    assert.deepEqual(entry?.alternates?.languages, {
      en: `${siteUrl}/products`,
      "pt-BR": `${siteUrl}/pt/produtos`,
      es: `${siteUrl}/es/productos`,
      de: `${siteUrl}/de/produkte`,
      fr: `${siteUrl}/fr/produits`,
      vi: `${siteUrl}/vi/san-pham`,
      sv: `${siteUrl}/sv/produkter`,
      it: `${siteUrl}/it/prodotti`,
      ko: `${siteUrl}/ko/products`,
      id: `${siteUrl}/id/produk`,
      "x-default": `${siteUrl}/products`
    });
  }
});

test("Indonesian launch meets coverage, editorial, media, SEO and similarity gates", () => {
  const pages = contentRepository.listPublished({ locale: "id" });
  const counts = new Map<string, number>();
  for (const { entity } of pages) counts.set(entity.type, (counts.get(entity.type) ?? 0) + 1);
  assert.deepEqual(Object.fromEntries([...counts].sort()), {
    blog: 25,
    blog_index: 1,
    contact: 1,
    factory: 1,
    home: 1,
    landing: 1,
    oem: 1,
    product: 85,
    product_category: 5,
    projects: 1
  });
  assert.equal(new Set(pages.map(({ version }) => version.publicPath)).size, 122);
  assert.equal(new Set(pages.map(({ version }) => version.title)).size, 122);
  assert.equal(new Set(pages.map(({ version }) => version.h1)).size, 122);

  const visibleText = (version: LocalizedContentVersion) => [
    version.title,
    version.description,
    version.h1,
    ...version.body.flatMap((block) => [block.heading ?? "", block.content ?? "", JSON.stringify(block.data ?? {})]),
    ...version.faq.flatMap((item) => [item.question, item.answer])
  ].join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;

  for (const content of pages) {
    const { entity, version } = content;
    assert.equal(version.locale, "id");
    assert.equal(version.translationStatus, "localized");
    assert.equal(version.reviewStatus, "approved");
    assert.equal(version.publishStatus, "published");
    assert.match(version.publicPath, /^\/id(?:\/|$)/);
    assert.ok(version.author && version.reviewedBy && version.updatedAt, `${version.publicPath}: editorial provenance`);
    assert.ok(version.images.length >= 2 && version.images.length <= 3, `${version.publicPath}: two or three real images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/gambar-id\//, `${version.publicPath}: localized image filename`);
      assert.ok(image.alt.length >= 20, `${version.publicPath}: localized image alt`);
      const encoded = image.src.split("/")[2];
      const source = Buffer.from(encoded, "base64url").toString("utf8");
      assert.ok(source.startsWith("/assets/") && existsSync(join(process.cwd(), "public", source)), `${version.publicPath}: real source image ${source}`);
    }
    assert.equal(version.faq.length, 5, `${version.publicPath}: FAQ`);
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AIO|AI Search|keyword optimization|ranking optimization)\b/i, `${version.publicPath}: no internal terminology`);

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`, `${version.publicPath}: self canonical`);
    assert.equal(metadata.alternates?.languages?.id, `${siteUrl}${version.publicPath}`, `${version.publicPath}: Indonesian hreflang`);
    const english = contentRepository.getPublishedVersion(entity.id, "en");
    if (english) {
      assert.equal(metadata.alternates?.languages?.en, `${siteUrl}${english.version.publicPath}`, `${version.publicPath}: English hreflang`);
      assert.equal(metadata.alternates?.languages?.["x-default"], `${siteUrl}${english.version.publicPath}`, `${version.publicPath}: x-default`);
    }
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "id"), `${version.publicPath}: breadcrumb schema`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "id"), `${version.publicPath}: FAQ schema`);
    if (entity.type === "product") assert.ok(graph.some((node) => node["@type"] === "Product" && node.inLanguage === "id"), `${version.publicPath}: product schema`);
    if (entity.type === "blog") assert.ok(graph.some((node) => node["@type"] === "BlogPosting" && node.inLanguage === "id"), `${version.publicPath}: article schema`);

    if (entity.type === "product" || entity.type === "blog") {
      const words = wordCount(version);
      assert.ok(words >= (entity.type === "product" ? 1000 : 1500), `${version.publicPath}: minimum content length ${words}`);
      assert.ok(words <= (entity.type === "product" ? 1500 : 2500), `${version.publicPath}: maximum content length ${words}`);
      assert.ok(version.body.filter((block) => block.type === "specifications").length >= 2, `${version.publicPath}: technical/comparison tables`);
      assert.ok(version.body.some((block) => block.type === "features"), `${version.publicPath}: buyer checklist`);
      const components = new Set(version.body.map((block) => block.data?.component));
      assert.ok(components.has("quick-answer") && components.has("definition"), `${version.publicPath}: answer-first structure`);
    }
  }

  for (const id of indonesianExcludedContentIds) {
    assert.equal(contentRepository.getPublishedVersion(id, "id"), undefined, `${id}: intentionally excluded`);
  }

  const grams = (version: LocalizedContentVersion) => {
    const bodyText = version.body.map((block) => block.content ?? "").join(" ");
    const tokens = bodyText.toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(tokens.slice(0, -4).map((_, index) => tokens.slice(index, index + 5).join(" ")));
  };
  for (const type of ["product", "blog"] as const) {
    const scoped = pages.filter(({ entity }) => entity.type === type);
    let maximum = 0;
    for (let first = 0; first < scoped.length; first += 1) {
      for (let second = first + 1; second < scoped.length; second += 1) {
        const left = grams(scoped[first].version);
        const right = grams(scoped[second].version);
        const overlap = [...left].filter((value) => right.has(value)).length;
        maximum = Math.max(maximum, overlap / new Set([...left, ...right]).size);
      }
    }
    assert.ok(maximum < 0.65, `${type}: maximum same-language five-gram Jaccard similarity ${maximum.toFixed(3)}`);
  }
});

test("Spanish blog content is differentiated by search intent", () => {
  const blogs = contentRepository.listPublished({ locale: "es" }).filter(({ entity }) => entity.type === "blog");
  const normalize = (text: string) => text.toLowerCase().replace(/[^a-záéíóúüñ0-9 ]/g, " ");
  const grams = (text: string) => {
    const words = normalize(text).split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  const articleText = blogs.map(({ entity, version }) => ({
    id: entity.id,
    grams: grams([
      version.h1,
      version.description,
      ...version.body.flatMap((block) => [
        block.heading ?? "",
        block.content ?? "",
        ...[block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]
          .flat(3)
          .filter((value): value is string => typeof value === "string")
      ]),
      ...version.faq.flatMap((item) => [item.question, item.answer])
    ].join(" "))
  }));
  for (let left = 0; left < articleText.length; left += 1) {
    for (let right = left + 1; right < articleText.length; right += 1) {
      const a = articleText[left].grams;
      const b = articleText[right].grams;
      const intersection = [...a].filter((value) => b.has(value)).length;
      const jaccard = intersection / (a.size + b.size - intersection);
      assert.ok(jaccard < 0.3, `${articleText[left].id} / ${articleText[right].id}: ${jaccard}`);
    }
  }
});

test("German launch: 124 published pages pass depth, media, metadata, schema and link gates", () => {
  const german = contentRepository.listPublished({ locale: "de" });
  const products = german.filter(({ entity }) => entity.type === "product");
  const guides = german.filter(({ entity }) => entity.type === "blog");
  assert.equal(german.length, 124);
  assert.equal(products.length, 97);
  assert.equal(guides.length, 15);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const wordCount = (version: LocalizedContentVersion) => values([version.h1, version.description, version.body, version.faq]).join(" ").split(/\s+/).filter(Boolean).length;

  const urls = new Set(german.map(({ version }) => version.publicPath));
  const titles = new Set(german.map(({ version }) => version.title));
  const headings = new Set(german.map(({ version }) => version.h1));
  assert.equal(urls.size, german.length);
  assert.equal(titles.size, german.length);
  assert.equal(headings.size, german.length);

  for (const content of german) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/de(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 4, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: editorial attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: direct answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.internalLinks.length >= 3, `${version.publicPath}: internal links`);
    for (const link of version.internalLinks) {
      assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "de"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    }
    for (const image of version.images) {
      assert.match(image.src, /^\/bilder\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const encoded = image.src.split("/")[2];
      const source = Buffer.from(encoded, "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 25 && image.caption && image.caption.length > 25, `${version.publicPath}: localized image text`);
    }

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    const alternates = metadata.alternates?.languages ?? {};
    assert.equal(alternates.de, `${siteUrl}${version.publicPath}`);
    for (const href of Object.values(alternates)) assert.ok(typeof href === "string" && href.startsWith(siteUrl));

    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "de"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "de"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "de"), `${version.publicPath}: breadcrumb schema`);
  }

  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = values([version.h1, version.body, version.faq]).join(" ").toLowerCase().replace(/[^a-zäöüß0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const collection of [products, guides]) {
    for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
        const left = fiveGrams(collection[leftIndex].version);
        const right = fiveGrams(collection[rightIndex].version);
        const intersection = [...left].filter((gram) => right.has(gram)).length;
        const overlap = intersection / new Set([...left, ...right]).size;
        assert.ok(overlap < 0.85, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
      }
    }
  }
});

test("French launch: 124 published pages pass depth, media, metadata, schema and link gates", () => {
  const french = contentRepository.listPublished({ locale: "fr" });
  const products = french.filter(({ entity }) => entity.type === "product");
  const guides = french.filter(({ entity }) => entity.type === "blog");
  assert.equal(french.length, 124);
  assert.equal(products.length, 97);
  assert.equal(guides.length, 15);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.h1,
    version.description,
    version.body.flatMap((block) => [block.heading, block.content, block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]),
    version.faq.flatMap((item) => [item.question, item.answer])
  ]).join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;
  assert.equal(new Set(french.map(({ version }) => version.publicPath)).size, french.length);
  assert.equal(new Set(french.map(({ version }) => version.title)).size, french.length);
  assert.equal(new Set(french.map(({ version }) => version.description)).size, french.length);
  assert.equal(new Set(french.map(({ version }) => version.h1)).size, french.length);

  for (const content of french) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/fr(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 4, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: direct answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.internalLinks.length >= 3, `${version.publicPath}: internal links`);
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "fr"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    assert.equal(version.images.length, 3, `${version.publicPath}: three images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/images-fr\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const source = Buffer.from(image.src.split("/")[2], "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 25 && image.caption && image.caption.length > 20, `${version.publicPath}: image text`);
    }

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates?.languages?.fr, `${siteUrl}${version.publicPath}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "fr"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "fr"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "fr"), `${version.publicPath}: breadcrumb schema`);
    const visible = visibleText(version);
    assert.doesNotMatch(visible, /\b(?:SEO|GEO|AI Search|keyword optimization|Google ranking)\b/i, `${version.publicPath}: internal terminology`);
  }

  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = visibleText(version).toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿœ0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const collection of [products, guides]) {
    for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
        const left = fiveGrams(collection[leftIndex].version);
        const right = fiveGrams(collection[rightIndex].version);
        const intersection = [...left].filter((gram) => right.has(gram)).length;
        const overlap = intersection / new Set([...left, ...right]).size;
        assert.ok(overlap < 0.85, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
      }
    }
  }
});

test("Vietnamese launch: 124 published pages pass depth, media, metadata, schema and link gates", () => {
  const vietnamese = contentRepository.listPublished({ locale: "vi" });
  const products = vietnamese.filter(({ entity }) => entity.type === "product");
  const guides = vietnamese.filter(({ entity }) => entity.type === "blog");
  assert.equal(vietnamese.length, 124);
  assert.equal(products.length, 97);
  assert.equal(guides.length, 15);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.h1,
    version.description,
    version.body.flatMap((block) => [block.heading, block.content, block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]),
    version.faq.flatMap((item) => [item.question, item.answer])
  ]).join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;

  assert.equal(new Set(vietnamese.map(({ version }) => version.publicPath)).size, vietnamese.length);
  assert.equal(new Set(vietnamese.map(({ version }) => version.title)).size, vietnamese.length);
  assert.equal(new Set(vietnamese.map(({ version }) => version.description)).size, vietnamese.length);
  assert.equal(new Set(vietnamese.map(({ version }) => version.h1)).size, vietnamese.length);

  for (const content of vietnamese) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/vi(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 4, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: direct answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.internalLinks.length >= 3, `${version.publicPath}: internal links`);
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "vi"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    assert.equal(version.images.length, 3, `${version.publicPath}: three images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/hinh-anh-vi\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const source = Buffer.from(image.src.split("/")[2], "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 25 && image.caption && image.caption.length > 20, `${version.publicPath}: image text`);
    }

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates?.languages?.vi, `${siteUrl}${version.publicPath}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "vi"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "vi"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "vi"), `${version.publicPath}: breadcrumb schema`);
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AI Search|keyword optimization|Google ranking)\b/i, `${version.publicPath}: internal terminology`);
  }

  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = visibleText(version).toLowerCase().replace(/[^a-z\u00c0-\u024f\u1e00-\u1eff0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const collection of [products, guides]) {
    for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
        const left = fiveGrams(collection[leftIndex].version);
        const right = fiveGrams(collection[rightIndex].version);
        const intersection = [...left].filter((gram) => right.has(gram)).length;
        const overlap = intersection / new Set([...left, ...right]).size;
        assert.ok(overlap < 0.85, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
      }
    }
  }
});

test("Swedish launch: 124 published pages pass depth, media, metadata, schema, links and differentiation gates", () => {
  const swedish = contentRepository.listPublished({ locale: "sv" });
  const products = swedish.filter(({ entity }) => entity.type === "product");
  const guides = swedish.filter(({ entity }) => entity.type === "blog");
  assert.equal(swedish.length, 124);
  assert.equal(products.length, 97);
  assert.equal(guides.length, 15);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.h1,
    version.description,
    version.body.flatMap((block) => [block.heading, block.content, block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]),
    version.faq.flatMap((item) => [item.question, item.answer])
  ]).join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;

  assert.equal(new Set(swedish.map(({ version }) => version.publicPath)).size, swedish.length);
  assert.equal(new Set(swedish.map(({ version }) => version.title)).size, swedish.length);
  assert.equal(new Set(swedish.map(({ version }) => version.description)).size, swedish.length);
  assert.equal(new Set(swedish.map(({ version }) => version.h1)).size, swedish.length);

  for (const content of swedish) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/sv(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 4, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: direct answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.internalLinks.length >= 3, `${version.publicPath}: internal links`);
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "sv"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    assert.equal(version.images.length, 3, `${version.publicPath}: three images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/bilder-sv\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const source = Buffer.from(image.src.split("/")[2], "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 25 && image.caption && image.caption.length > 20, `${version.publicPath}: image text`);
    }

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates?.languages?.sv, `${siteUrl}${version.publicPath}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "sv"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "sv"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "sv"), `${version.publicPath}: breadcrumb schema`);
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AI Search|keyword optimization|Google ranking)\b/i, `${version.publicPath}: internal terminology`);
  }

  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = visibleText(version).toLowerCase().replace(/[^a-zåäö0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const collection of [products, guides]) {
    for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
        const left = fiveGrams(collection[leftIndex].version);
        const right = fiveGrams(collection[rightIndex].version);
        const intersection = [...left].filter((gram) => right.has(gram)).length;
        const overlap = intersection / new Set([...left, ...right]).size;
        assert.ok(overlap < 0.85, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
      }
    }
  }
});

test("Italian launch: 124 published pages pass localization, depth, media, metadata, schema and link gates", () => {
  const italian = contentRepository.listPublished({ locale: "it" });
  const products = italian.filter(({ entity }) => entity.type === "product");
  const guides = italian.filter(({ entity }) => entity.type === "blog");
  assert.equal(italian.length, 124);
  assert.equal(products.length, 97);
  assert.equal(guides.length, 15);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.h1, version.description,
    version.body.flatMap((block) => [block.heading, block.content, block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]),
    version.faq.flatMap((item) => [item.question, item.answer])
  ]).join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;

  assert.equal(new Set(italian.map(({ version }) => version.publicPath)).size, italian.length);
  assert.equal(new Set(italian.map(({ version }) => version.title)).size, italian.length);
  assert.equal(new Set(italian.map(({ version }) => version.h1)).size, italian.length);

  for (const content of italian) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/it(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 4, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: quick answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.body.some((block) => block.type === "features"), `${version.publicPath}: checklist`);
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "it"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    assert.equal(version.images.length, 3, `${version.publicPath}: images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/immagini-it\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const source = Buffer.from(image.src.split("/")[2], "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 25 && image.caption && image.caption.length > 20, `${version.publicPath}: image text`);
    }
    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates?.languages?.it, `${siteUrl}${version.publicPath}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "it"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "it"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "it"), `${version.publicPath}: breadcrumb schema`);
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AI Search|keyword optimization|Google ranking)\b/i, `${version.publicPath}: internal terminology`);
  }
  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = visibleText(version).toLowerCase().replace(/[^a-zà-ÿ0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const collection of [products, guides]) for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
    const left = fiveGrams(collection[leftIndex].version);
    const right = fiveGrams(collection[rightIndex].version);
    const overlap = [...left].filter((gram) => right.has(gram)).length / new Set([...left, ...right]).size;
    assert.ok(overlap < 0.86, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
  }
});

test("Korean A-tier launch: 49 published pages pass localization, depth, media, metadata, schema and differentiation gates", () => {
  const korean = contentRepository.listPublished({ locale: "ko" }).filter(({ version }) => version.images.every((image) => image.src.startsWith("/images-ko/")));
  const products = korean.filter(({ entity }) => entity.type === "product");
  const guides = korean.filter(({ entity }) => entity.type === "blog");
  assert.equal(korean.length, 49);
  assert.equal(products.length, 18);
  assert.equal(guides.length, 19);

  const values = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(values);
    if (value && typeof value === "object") return Object.values(value).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.h1,
    version.description,
    version.body.flatMap((block) => [block.heading, block.content, block.data?.term, block.data?.columns, block.data?.rows, block.data?.items]),
    version.faq.flatMap((item) => [item.question, item.answer])
  ]).join(" ");
  const wordCount = (version: LocalizedContentVersion) => visibleText(version).split(/\s+/).filter(Boolean).length;

  assert.equal(new Set(korean.map(({ version }) => version.publicPath)).size, korean.length);
  assert.equal(new Set(korean.map(({ version }) => version.title)).size, korean.length);
  assert.equal(new Set(korean.map(({ version }) => version.description)).size, korean.length);
  assert.equal(new Set(korean.map(({ version }) => version.h1)).size, korean.length);

  for (const content of korean) {
    const { entity, version } = content;
    assert.match(version.publicPath, /^\/ko(?:\/|$)/);
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.equal(version.publishStatus, "published");
    assert.equal(version.reviewStatus, "approved");
    assert.ok(version.faq.length >= 5, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy, `${version.publicPath}: attribution`);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: quick answer`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: table`);
    assert.ok(version.body.some((block) => block.type === "features"), `${version.publicPath}: checklist`);
    assert.ok(version.internalLinks.length >= 4, `${version.publicPath}: internal links`);
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId, "ko"), `${version.publicPath}: unresolved ${link.targetContentId}`);
    assert.equal(version.images.length, 3, `${version.publicPath}: images`);
    for (const image of version.images) {
      assert.match(image.src, /^\/images-ko\/[A-Za-z0-9_-]+\/[a-z0-9-]+\.(?:avif|gif|jpe?g|png|svg|webp)$/);
      const source = Buffer.from(image.src.split("/")[2], "base64url").toString("utf8");
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 15 && image.caption && image.caption.length > 15, `${version.publicPath}: image text`);
    }
    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.deepEqual(metadata.robots, { index: true, follow: true });
    assert.equal(metadata.alternates?.languages?.ko, `${siteUrl}${version.publicPath}`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === "ko"), `${version.publicPath}: ${primary}`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === "ko"), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === "ko"), `${version.publicPath}: breadcrumb schema`);
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AIO|AI Search|keyword optimization|Google ranking)\b/i, `${version.publicPath}: internal terminology`);
  }
  for (const { version } of products) assert.ok(wordCount(version) >= 1000 && wordCount(version) <= 1500, `${version.publicPath}: ${wordCount(version)} words`);
  for (const { version } of guides) assert.ok(wordCount(version) >= 1500 && wordCount(version) <= 2500, `${version.publicPath}: ${wordCount(version)} words`);

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = visibleText(version).toLowerCase().replace(/[^가-힣a-z0-9 ]/g, " ").split(/\s+/).filter(Boolean);
    return new Set(words.slice(0, -4).map((_, index) => words.slice(index, index + 5).join(" ")));
  };
  for (const [collection, threshold] of [[products, 0.65], [guides, 0.8]] as const) {
    for (let leftIndex = 0; leftIndex < collection.length; leftIndex += 1) {
      for (let rightIndex = leftIndex + 1; rightIndex < collection.length; rightIndex += 1) {
        const left = fiveGrams(collection[leftIndex].version);
        const right = fiveGrams(collection[rightIndex].version);
        const overlap = [...left].filter((gram) => right.has(gram)).length / new Set([...left, ...right]).size;
        assert.ok(overlap < threshold, `${collection[leftIndex].version.publicPath} / ${collection[rightIndex].version.publicPath}: ${overlap}`);
      }
    }
  }
});

test("commercial completion A: 23 Portuguese, Spanish and Korean pages pass publish, SEO, media and link gates", () => {
  const paths = [
    "/pt/produtos/halteres/halter-ajustavel",
    "/pt/produtos/anilhas/anilha-bumper-competicao",
    "/pt/produtos/racks-e-bancos/power-rack-treinador-funcional",
    "/pt/produtos/racks-e-bancos/smith-machine-profissional",
    "/pt/produtos/racks-e-bancos/banco-regulavel-profissional",
    "/pt/produtos/acessorios-de-academia/kettlebell-ferro-fundido",
    "/es/productos/mancuernas/mancuerna-ajustable",
    "/es/productos/discos-de-peso/disco-bumper-competicion",
    "/es/productos/racks-y-bancos/jaula-potencia-entrenador-funcional",
    "/es/productos/racks-y-bancos/maquina-smith-profesional",
    "/es/productos/racks-y-bancos/banco-ajustable-profesional",
    "/es/productos/accesorios-de-gimnasio/kettlebell-hierro-fundido",
    "/ko/products/dumbbells/adjustable-dumbbell",
    "/ko/projects",
    "/ko/blog/how-bumper-plates-are-made",
    "/ko/blog/how-dumbbells-are-weighed-in-factory",
    "/ko/blog/commercial-free-weight-rfq-checklist-korea",
    "/ko/blog/custom-logo-dumbbells-weight-plates",
    "/ko/blog/free-weight-reorder-batch-consistency-korea",
    "/ko/blog/landed-cost-wholesale-free-weights-korea",
    "/ko/blog/oem-free-weight-sample-approval-korea",
    "/ko/blog/plan-commercial-dumbbell-set-korea",
    "/ko/blog/training-vs-competition-bumper-plates-korea"
  ];
  const localized = contentRepository.listPublished().filter(({ version }) => paths.includes(version.publicPath));
  assert.equal(localized.length, paths.length);
  assert.deepEqual(new Set(localized.map(({ version }) => version.locale)), new Set(["pt-BR", "es", "ko"]));

  for (const content of localized) {
    const { entity, version } = content;
    assert.equal(version.reviewStatus, "approved");
    assert.equal(version.publishStatus, "published");
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    assert.ok(version.title.length > 20 && version.description.length > 60 && version.h1.length > 10, version.publicPath);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"));
    assert.ok(version.body.some((block) => block.type === "specifications"));
    assert.ok(version.body.some((block) => block.type === "features"));
    assert.ok(version.faq.length >= 5);
    assert.ok(version.author && version.reviewedBy);
    assert.equal(version.images.length, 3);
    for (const image of version.images) {
      const source = image.src.startsWith("/images-ko/")
        ? Buffer.from(image.src.split("/")[2], "base64url").toString("utf8")
        : image.src;
      assert.ok(existsSync(join(process.cwd(), "public", source.replace(/^\//, ""))), `${version.publicPath}: ${source}`);
      assert.ok(image.alt.length > 15 && image.caption && image.caption.length > 15);
    }
    for (const link of version.internalLinks) {
      assert.ok(contentRepository.getPublishedVersion(link.targetContentId, version.locale), `${version.publicPath}: unresolved ${link.targetContentId}`);
    }
    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.equal(metadata.alternates?.languages?.[version.locale === "pt-BR" ? "pt-BR" : version.locale], `${siteUrl}${version.publicPath}`);
    assert.ok(metadata.alternates?.languages?.en);
    assert.equal(metadata.alternates?.languages?.["x-default"], metadata.alternates?.languages?.en);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primary = entity.type === "product" ? "Product" : entity.type === "blog" ? "BlogPosting" : undefined;
    if (primary) assert.ok(graph.some((node) => node["@type"] === primary && node.inLanguage === version.locale));
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === version.locale));
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === version.locale));
  }
});

test("commercial completion B/C priority release: 174 pages pass quality, media and SEO gates", () => {
  assert.equal(commercialCompletionBCSelections.length, 58);
  assert.equal(commercialCompletionBCSelections.filter((item) => item.grade === "B").length, 37);
  assert.equal(commercialCompletionBCSelections.filter((item) => item.grade === "C").length, 21);

  const values = (input: unknown): string[] => {
    if (typeof input === "string") return [input];
    if (Array.isArray(input)) return input.flatMap(values);
    if (input && typeof input === "object") return Object.values(input).flatMap(values);
    return [];
  };
  const visibleText = (version: LocalizedContentVersion) => values([
    version.title,
    version.description,
    version.h1,
    version.body,
    version.faq,
    version.images.map(({ alt, caption }) => [alt, caption])
  ]).join(" ");
  const contentText = (version: LocalizedContentVersion) => values([version.body, version.faq]).join(" ");
  const selectedIds = new Set(commercialCompletionBCSelections.map((item) => `product:${item.family}:${item.slug}`));
  const localized = contentRepository.listPublished().filter(({ entity, version }) => selectedIds.has(entity.id) && ["pt-BR", "es", "ko"].includes(version.locale));
  const allPublishedPaths = new Set(contentRepository.listPublished().map(({ version }) => version.publicPath));
  assert.equal(localized.length, 174);
  assert.equal(new Set(localized.map(({ version }) => version.publicPath)).size, 174);
  assert.equal(new Set(localized.map(({ version }) => version.title)).size, 174);
  assert.equal(new Set(localized.map(({ version }) => version.h1)).size, 174);

  for (const content of localized) {
    const { entity, version } = content;
    assert.equal(version.reviewStatus, "approved");
    assert.equal(version.publishStatus, "published");
    assert.equal(version.canonicalData.mode, "self");
    assert.notEqual(version.canonicalData.noindex, true);
    if (version.locale === "ko") assert.ok(version.title.length > 20 && version.description.length > 60 && version.h1.length > 10, version.publicPath);
    else assert.ok(version.title.length > 30 && version.description.length > 100 && version.h1.length > 15, version.publicPath);
    assert.ok(version.body.some((block) => block.data?.component === "quick-answer"), `${version.publicPath}: quick answer`);
    assert.ok(version.body.some((block) => block.data?.component === "definition"), `${version.publicPath}: definition`);
    assert.ok(version.body.filter((block) => block.type === "specifications").length >= 2, `${version.publicPath}: tables`);
    assert.ok(version.body.some((block) => block.type === "specifications"), `${version.publicPath}: checklist`);
    assert.ok(version.faq.length >= 5, `${version.publicPath}: FAQ`);
    assert.ok(version.author && version.reviewedBy && version.updatedAt, `${version.publicPath}: trust signals`);
    assert.ok(version.images.length >= 2 && version.images.length <= 3, `${version.publicPath}: images`);
    for (const image of version.images) {
      assert.ok(existsSync(join(process.cwd(), "public", image.src.replace(/^\//, ""))), `${version.publicPath}: ${image.src}`);
      assert.ok(image.alt.length > 15 && image.caption && image.caption.length > 15, `${version.publicPath}: localized image text`);
    }
    for (const link of version.internalLinks) {
      assert.ok(contentRepository.getPublishedVersion(link.targetContentId, version.locale), `${version.publicPath}: unresolved ${link.targetContentId}`);
    }
    assert.doesNotMatch(visibleText(version), /\b(?:SEO|GEO|AIO|AI Search|keyword optimization|Google ranking|classificação interna|clasificación interna)\b/i, `${version.publicPath}: internal terminology`);
    const words = contentText(version).split(/\s+/u).filter(Boolean).length;
    if (version.locale === "ko") assert.ok(words >= 950 && words <= 1200, `${version.publicPath}: ${words} tokens`);
    else assert.ok(words >= 1100 && words <= 1500, `${version.publicPath}: ${words} words`);

    const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
    assert.equal(metadata.alternates?.canonical, `${siteUrl}${version.publicPath}`);
    assert.equal(metadata.alternates?.languages?.[version.locale], `${siteUrl}${version.publicPath}`);
    assert.equal(metadata.alternates?.languages?.en, `${siteUrl}${entity.versions.en?.publicPath}`);
    assert.equal(metadata.alternates?.languages?.["x-default"], metadata.alternates?.languages?.en);
    for (const alternate of Object.values(metadata.alternates?.languages ?? {})) {
      if (typeof alternate === "string") assert.ok(allPublishedPaths.has(new URL(alternate).pathname), `${version.publicPath}: missing alternate ${alternate}`);
    }
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    assert.ok(graph.some((node) => node["@type"] === "Product" && node.inLanguage === version.locale));
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === version.locale));
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === version.locale));

    for (const targetLocale of ["pt-BR", "es", "ko"] as const) {
      const target = resolveLanguageSwitchTarget(entity.id, targetLocale, contentRepository);
      assert.equal(target, entity.versions[targetLocale]?.publicPath, `${version.publicPath}: switch to ${targetLocale}`);
    }
  }

  const sitemapPaths = new Set(localizedSitemapEntries().map((entry) => new URL(entry.url).pathname));
  for (const { version } of localized) assert.ok(sitemapPaths.has(version.publicPath), `${version.publicPath}: language sitemap`);
});

test("remaining C-level completion: 27 selected pages pass localization, differentiation and production gates", () => {
  assert.equal(commercialCompletionCSelections.length, 9);
  assert.equal(commercialCompletionCSelections.filter((item) => item.tier === "A").length, 2);
  assert.equal(commercialCompletionCSelections.filter((item) => item.tier === "B").length, 7);

  const values = (input: unknown): string[] => {
    if (typeof input === "string") return [input];
    if (Array.isArray(input)) return input.flatMap(values);
    if (input && typeof input === "object") return Object.values(input).flatMap(values);
    return [];
  };
  const selectedIds = new Set(commercialCompletionCSelections.map((item) => `product:racks:${item.slug}`));
  const pages = contentRepository.listPublished().filter(({ entity, version }) => selectedIds.has(entity.id) && ["pt-BR", "es", "ko"].includes(version.locale));
  const allPaths = new Set(contentRepository.listPublished().map(({ version }) => version.publicPath));
  assert.equal(pages.length, 27);
  assert.equal(new Set(pages.map(({ version }) => version.publicPath)).size, 27);
  assert.equal(new Set(pages.map(({ version }) => version.title)).size, 27);
  assert.equal(new Set(pages.map(({ version }) => version.h1)).size, 27);

  for (const content of pages) {
    const { entity, version } = content;
    const visible = values([version.title,version.description,version.h1,version.body,version.faq,version.images.map(({alt,caption})=>[alt,caption])]).join(" ");
    const count = values([version.body,version.faq]).join(" ").split(/\s+/u).filter(Boolean).length;
    assert.equal(version.reviewStatus,"approved");
    assert.equal(version.publishStatus,"published");
    assert.equal(version.canonicalData.mode,"self");
    assert.notEqual(version.canonicalData.noindex,true);
    assert.ok(version.body.some((block)=>block.data?.component === "quick-answer"), `${version.publicPath}: quick answer`);
    assert.ok(version.body.some((block)=>block.data?.component === "definition"), `${version.publicPath}: definition`);
    assert.ok(version.body.filter((block)=>block.type === "specifications").length >= 2, `${version.publicPath}: tables`);
    assert.ok(version.body.some((block)=>block.type === "features"), `${version.publicPath}: checklist`);
    assert.equal(version.faq.length,5);
    assert.ok(version.author && version.reviewedBy && version.updatedAt);
    assert.equal(version.images.length,3);
    for (const image of version.images) {
      assert.ok(existsSync(join(process.cwd(),"public",image.src.replace(/^\//,""))), `${version.publicPath}: ${image.src}`);
      assert.ok(image.alt.length > 20 && image.caption && image.caption.length > 20, `${version.publicPath}: localized media text`);
    }
    for (const link of version.internalLinks) assert.ok(contentRepository.getPublishedVersion(link.targetContentId,version.locale), `${version.publicPath}: ${link.targetContentId}`);
    assert.doesNotMatch(visible,/\b(?:SEO|GEO|AIO|AI Search|keyword optimization|ranking optimization|classificação interna|clasificación interna|completion tier|completion score)\b/i, `${version.publicPath}: internal terminology`);
    if (version.locale === "ko") assert.ok(count >= 1000 && count <= 1500, `${version.publicPath}: ${count}`);
    else assert.ok(count >= 1000 && count <= 1500, `${version.publicPath}: ${count}`);

    const metadata = buildLocalizedMetadata(content,contentRepository,siteUrl,"PowerBaseFit");
    assert.equal(metadata.alternates?.canonical,`${siteUrl}${version.publicPath}`);
    assert.equal(metadata.alternates?.languages?.[version.locale],`${siteUrl}${version.publicPath}`);
    assert.equal(metadata.alternates?.languages?.en,`${siteUrl}${entity.versions.en?.publicPath}`);
    assert.equal(metadata.alternates?.languages?.["x-default"],metadata.alternates?.languages?.en);
    for (const alternate of Object.values(metadata.alternates?.languages ?? {})) if (typeof alternate === "string") assert.ok(allPaths.has(new URL(alternate).pathname), `${version.publicPath}: ${alternate}`);
    const graph = buildLocalizedSchemaGraph(content,siteUrl);
    assert.ok(graph.some((node)=>node["@type"] === "Product" && node.inLanguage === version.locale));
    assert.ok(graph.some((node)=>node["@type"] === "FAQPage" && node.inLanguage === version.locale));
    assert.ok(graph.some((node)=>node["@type"] === "BreadcrumbList" && node.inLanguage === version.locale));
    for (const locale of ["en","pt-BR","es","de","fr","vi","sv","it","ko"] as const) {
      assert.equal(resolveLanguageSwitchTarget(entity.id,locale,contentRepository),entity.versions[locale]?.publicPath,`${version.publicPath}: switch ${locale}`);
    }
  }

  const fiveGrams = (version: LocalizedContentVersion) => {
    const words = values([version.body,version.faq]).join(" ").toLowerCase().replace(/[^\p{L}\p{N}]+/gu," ").split(/\s+/u).filter(Boolean);
    return new Set(words.slice(0,-4).map((_,index)=>words.slice(index,index+5).join(" ")));
  };
  for (const locale of ["pt-BR","es","ko"] as const) {
    const localized = pages.filter(({version})=>version.locale === locale);
    for (let left=0;left<localized.length;left+=1) for (let right=left+1;right<localized.length;right+=1) {
      const a=fiveGrams(localized[left].version), b=fiveGrams(localized[right].version);
      const intersection=[...a].filter((gram)=>b.has(gram)).length;
      const similarity=intersection/new Set([...a,...b]).size;
      assert.ok(similarity < 0.65,`${localized[left].version.publicPath} / ${localized[right].version.publicPath}: ${similarity}`);
    }
  }

  const excluded = [
    "product:racks:multi-jungle-training-system",
    "product:accessories:six-side-cable-handle","product:accessories:tetragonal-cable-handle","product:accessories:v-handle-attachments","product:accessories:straight-bar-cable-attachments","product:accessories:triceps-rope-handles",
    "product:accessories:tpe-yoga-mat","product:accessories:vipr-training-tube","product:accessories:yoga-ball","product:accessories:bosu-ball","product:accessories:aerobic-step","product:accessories:compact-aerobic-step"
  ];
  for (const id of excluded) {
    const entity=contentRepository.getEntity(id);
    assert.ok(entity);
    for (const locale of ["pt-BR","es","ko"] as const) assert.equal(entity.versions[locale],undefined,`${id}: ${locale} must remain excluded`);
    for (const locale of ["de","fr","vi","sv","it"] as const) assert.equal(entity.versions[locale]?.publishStatus,"published",`${id}: preserve ${locale}`);
  }

  const sitemapPaths=new Set(localizedSitemapEntries().map((entry)=>new URL(entry.url).pathname));
  for (const {version} of pages) assert.ok(sitemapPaths.has(version.publicPath),`${version.publicPath}: sitemap`);
});
