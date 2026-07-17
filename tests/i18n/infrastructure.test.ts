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

test("published locale routing: Portuguese and Spanish are public while other locales remain unavailable", () => {
  assert.deepEqual(decideLocaleRequest("/pt/products/dumbbells"), {
    action: "pass",
    internalLocale: "pt-BR"
  });
  assert.deepEqual(decideLocaleRequest("/es/productos/mancuernas"), { action: "pass", internalLocale: "es" });
  assert.deepEqual(decideLocaleRequest("/de/products/dumbbells"), { action: "not_found", reason: "locale_not_public" });
});

test("production manifest: only reviewed English, Portuguese and Spanish content is published", () => {
  assert.equal(contentRepository.listPublished({ locale: "pt-BR" }).length, 39);
  assert.equal(contentRepository.listPublished({ locale: "es" }).length, 38);
  assert.equal(contentRepository.listPublished({ locale: "en" }).length, 28);
  assert.equal(contentRepository.listPublished().length, 105);
  assert.equal(contentRepository.listPublished().some(({ version }) => !["en", "pt-BR", "es"].includes(version.locale)), false);
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
      const values = [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items].flat(3);
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
  assert.equal(productWords.length, 12);
  assert.ok(productWords.every((count) => count >= 700 && count <= 1200), JSON.stringify(productWords));
  assert.equal(blogWords.length, 15);
  assert.ok(blogWords.every((count) => count >= 1200 && count <= 2000), JSON.stringify(blogWords));
});

test("Spanish expansion: products and blogs meet localized depth targets", () => {
  function words(content: ReturnType<typeof contentRepository.listPublished>[number]) {
    const dataText = content.version.body.flatMap((block) =>
      [block.data?.term, block.data?.columns, block.data?.rows, block.data?.items].flat(3)
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
  assert.equal(products.length, 12);
  assert.ok(products.every((count) => count >= 700 && count <= 1200), JSON.stringify(products));
  assert.equal(blogs.length, 14);
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
    assert.ok(alternates && alternates.en && alternates["pt-BR"] && alternates.es && alternates["x-default"], `${content.version.publicPath}: hreflang cluster`);
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
    assert.deepEqual(Object.keys(metadata.alternates?.languages ?? {}).sort(), ["en", "es", "pt-BR", "x-default"].sort(), `${version.publicPath}: hreflang`);
    const graph = buildLocalizedSchemaGraph(content, siteUrl);
    const primaryType = entity.type === "blog" ? "BlogPosting" : "Product";
    assert.ok(graph.some((node) => node["@type"] === primaryType && node.inLanguage === version.locale), `${version.publicPath}: primary schema`);
    assert.ok(graph.some((node) => node["@type"] === "FAQPage" && node.inLanguage === version.locale), `${version.publicPath}: FAQ schema`);
    assert.ok(graph.some((node) => node["@type"] === "BreadcrumbList" && node.inLanguage === version.locale), `${version.publicPath}: breadcrumb schema`);
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
    assert.ok(types.has("specifications"), `${content.version.publicPath}: table`);
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

test("products hub has a complete English, Portuguese and Spanish hreflang cluster", () => {
  const content = contentRepository.getPublishedVersion("products-hub", "pt-BR");
  assert.ok(content);
  const metadata = buildLocalizedMetadata(content, contentRepository, siteUrl, "PowerBaseFit");
  assert.deepEqual(metadata.alternates?.languages, {
    en: `${siteUrl}/products`,
    "pt-BR": `${siteUrl}/pt/produtos`,
    es: `${siteUrl}/es/productos`,
    "x-default": `${siteUrl}/products`
  });
  assert.deepEqual(getLanguageSwitchOptions("products-hub", "pt-BR", contentRepository).map((option) => option.locale), ["en", "pt-BR", "es"]);
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
  assert.deepEqual(getLanguageSwitchOptions("dumbbells-category", "en", contentRepository).map((option) => option.locale), ["en", "pt-BR", "es"]);
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

test("multilingual sitemap retains 125 English routes and adds 39 Portuguese and 38 Spanish routes", () => {
  const urls = sitemap().map((entry) => entry.url);
  const portugueseUrls = urls.filter((url) => new URL(url).pathname === "/pt" || new URL(url).pathname.startsWith("/pt/"));
  const spanishUrls = urls.filter((url) => new URL(url).pathname === "/es" || new URL(url).pathname.startsWith("/es/"));
  const englishUrls = urls.filter((url) => !portugueseUrls.includes(url) && !spanishUrls.includes(url));
  assert.equal(englishUrls.length, 125);
  assert.equal(portugueseUrls.length, 39);
  assert.equal(spanishUrls.length, 38);
  assert.equal(new Set(urls).size, 202);
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
  assert.equal(urls.some((url) => /^\/(de|fr|it|nl|ru|ar|ja|ko)(\/|$)/.test(new URL(url).pathname)), false);
});

test("language sitemap contains all 202 public URLs with the complete products hub cluster", () => {
  const entries = localizedSitemapEntries();
  const english = entries.filter((entry) => !/^\/(?:pt|es)(?:\/|$)/.test(new URL(entry.url).pathname));
  const portuguese = entries.filter((entry) => /^\/pt(?:\/|$)/.test(new URL(entry.url).pathname));
  const spanish = entries.filter((entry) => /^\/es(?:\/|$)/.test(new URL(entry.url).pathname));
  assert.equal(english.length, 125);
  assert.equal(portuguese.length, 39);
  assert.equal(spanish.length, 38);
  assert.equal(new Set(entries.map((entry) => entry.url)).size, 202);
  for (const path of ["/products", "/pt/produtos", "/es/productos"]) {
    const entry = entries.find((item) => new URL(item.url).pathname === path);
    assert.deepEqual(entry?.alternates?.languages, {
      en: `${siteUrl}/products`,
      "pt-BR": `${siteUrl}/pt/produtos`,
      es: `${siteUrl}/es/productos`,
      "x-default": `${siteUrl}/products`
    });
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
