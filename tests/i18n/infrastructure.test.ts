import assert from "node:assert/strict";
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

test("pilot routing: Portuguese is public while other configured locales remain unavailable", () => {
  assert.deepEqual(decideLocaleRequest("/pt/products/dumbbells"), {
    action: "pass",
    internalLocale: "pt-BR"
  });
  assert.deepEqual(decideLocaleRequest("/es/products/dumbbells"), { action: "not_found", reason: "locale_not_public" });
});

test("production manifest: only the reviewed Brazilian Portuguese pilot is published", () => {
  assert.equal(contentRepository.listPublished({ locale: "pt-BR" }).length, 13);
  assert.equal(contentRepository.listPublished().length, 26);
  assert.equal(contentRepository.listPublished().some(({ version }) => !["en", "pt-BR"].includes(version.locale)), false);
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
  assert.equal(product?.inLanguage, "pt-BR");
  assert.equal(product?.url, `${siteUrl}/pt/products/dumbbells/rubber-hex-dumbbells`);
  assert.equal(product?.name, "pt-BR fixture heading");
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

test("English URL regression: sitemap retains 112 English routes and adds only 13 Portuguese routes", () => {
  const urls = sitemap().map((entry) => entry.url);
  const portugueseUrls = urls.filter((url) => new URL(url).pathname === "/pt" || new URL(url).pathname.startsWith("/pt/"));
  const englishUrls = urls.filter((url) => !portugueseUrls.includes(url));
  assert.equal(englishUrls.length, 112);
  assert.equal(portugueseUrls.length, 13);
  assert.equal(new Set(urls).size, 125);
  assert.ok(urls.includes(configuredSiteUrl));
  assert.ok(urls.includes(`${configuredSiteUrl}/products/dumbbells`));
  assert.ok(urls.includes(`${configuredSiteUrl}/resources/how-to-choose-commercial-dumbbells`));
  assert.ok(urls.includes(`${configuredSiteUrl}/factory`));
  assert.ok(urls.includes(`${configuredSiteUrl}/contact`));
  assert.equal(urls.some((url) => new URL(url).pathname.startsWith("/en/")), false);
  assert.equal(urls.some((url) => /^\/(es|de|fr|it|nl|ru|ar|ja|ko)(\/|$)/.test(new URL(url).pathname)), false);
});
