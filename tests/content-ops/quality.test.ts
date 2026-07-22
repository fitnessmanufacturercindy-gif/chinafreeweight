import assert from "node:assert/strict";
import test from "node:test";
import { getAutomationLocales, getDailyCandidateUrlLimit } from "../../content-ops/config";
import { scanCustomerVisibleText, semanticSimilarity, validateDocument } from "../../content-ops/quality";
import type { AutomatedContentDocument } from "../../content-ops/types";
import type { ContentEntity, LocalizedContentVersion } from "../../lib/content/types";
import { getPublishedLocaleDefinitions } from "../../i18n/locale-registry";
import { scoreCandidate } from "../../content-ops/scoring";

function version(overrides: Partial<LocalizedContentVersion> = {}): LocalizedContentVersion {
  const body = Array.from({ length: 8 }, (_, index) => ({
    id: `section-${index}`,
    type: index === 1 ? "specifications" as const : index === 7 ? "cta" as const : "rich_text" as const,
    heading: `Buyer decision section ${index + 1}`,
    content: `${`This paragraph explains measurable purchasing considerations for commercial strength equipment, including dimensions, tolerance, durability, packaging, inspection, facility use, ordering quantities, maintenance, storage, delivery planning, and supplier documentation. `.repeat(5)}\n\n${`This paragraph defines practical tradeoffs, operating limits, sample approval points, buyer questions, lifecycle risks, replacement planning, and information that should be verified before a commercial order is confirmed. `.repeat(5)}`,
    data: index === 0 ? { component: "quick-answer" } : index === 1 ? { component: "decision-framework", columns: ["Option", "Use"], rows: [["A", "Commercial facility"]] } : index === 6 ? { component: "risk-boundary" } : {},
  }));
  return {
    locale: "en", translationStatus: "approved", reviewStatus: "approved", publishStatus: "published",
    slug: "commercial-dumbbell-planning", publicPath: "/resources/commercial-dumbbell-planning",
    title: "Commercial Dumbbell Planning Guide", description: "Compare materials, increments, storage, and ordering risks for a commercial dumbbell range.", h1: "How to Plan a Commercial Dumbbell Range",
    body,
    faq: Array.from({ length: 5 }, (_, i) => ({ id: `faq-${i}`, question: `What should buyers verify in step ${i + 1}?`, answer: "Verify dimensions, tolerance, packaging, samples, and inspection criteria before ordering." })),
    schemaData: { breadcrumbs: [{ name: "Resources", path: "/resources" }, { name: "Planning guide", path: "/resources/commercial-dumbbell-planning" }] },
    images: [{ id: "hero", src: "/assets/content/commercial-dumbbell-planning.webp", alt: "Commercial dumbbell range planning for a gym weight area", width: 1600, height: 900 }],
    internalLinks: Array.from({ length: 4 }, (_, i) => ({ targetContentId: `product-${i}`, label: `Related purchasing option ${i + 1}` })),
    canonicalData: { mode: "self" }, hreflangData: { include: true }, updatedAt: "2026-07-22T00:00:00.000Z", publishedAt: "2026-07-22T00:00:00.000Z", version: 1,
    ...overrides,
  };
}

function document(entityType: ContentEntity["type"] = "blog", versionOverrides: Partial<LocalizedContentVersion> = {}): AutomatedContentDocument {
  const localized = version(versionOverrides);
  if (entityType === "case") {
    localized.schemaData.extra = { solutionMode: "configuration" };
    ["scenario-assumptions", "product-configuration", "specification-selection", "quantity-plan", "risk-boundary", "oem-packaging", "inquiry-checklist"].forEach((component, index) => { localized.body[index].data = { ...localized.body[index].data, component }; });
  }
  return {
    schemaVersion: 1, runDate: "2026-07-22",
    entity: { id: "daily-commercial-dumbbell-planning", type: entityType, defaultLocale: "en", versions: { en: localized } },
    sources: [
      { url: "https://example.org/standard", title: "Published standard", publisher: "Standards body", accessedAt: "2026-07-22", supports: "Dimension definitions", confidence: "primary" },
      { url: "https://example.org/guide", title: "Buyer guide", publisher: "Trade association", accessedAt: "2026-07-22", supports: "Procurement considerations", confidence: "high" },
      { url: "https://example.org/spec", title: "Product specification", publisher: "Manufacturer", accessedAt: "2026-07-22", supports: "Material options", confidence: "high" },
    ],
    assets: [{ src: localized.images[0].src, sourceUrl: "https://www.chinafreeweight.com", licenseOrOwner: "ChinaFreeWeight", checksum: "sha256:test", width: 1600, height: 900, bytes: 180000, httpStatus: 200, verifiedAt: "2026-07-22" }],
    research: [],
  };
}

test("public locales and candidate limit are dynamic", () => {
  assert.deepEqual(getAutomationLocales().map((item) => item.internalLocale), getPublishedLocaleDefinitions().map((item) => item.internalLocale));
  assert.equal(getDailyCandidateUrlLimit(), getPublishedLocaleDefinitions().length * 10);
  assert.equal(getAutomationLocales().some((item) => item.internalLocale === "ar"), false);
});

test("candidate scoring uses the approved purchasing weights", () => {
  const candidate = scoreCandidate({ id: "one", type: "blog", locale: "en", keyword: "commercial dumbbells", intent: "purchase", scores: { purchaseIntent: 100, siteGap: 80, gscOpportunity: 60, productFit: 100, evidenceAssets: 90, competitionOpportunity: 40 } });
  assert.equal(candidate.weightedScore, 83);
});

test("forbidden standalone tokens fail in all visible field groups without matching training", () => {
  assert.equal(scanCustomerVisibleText(version({ title: "Commercial training equipment" })).length, 0);
  for (const override of [
    { title: "AI buying guide" },
    { body: [{ ...version().body[0], content: "SEO analysis" }, ...version().body.slice(1)] },
    { faq: [{ ...version().faq[0], answer: "GEO process" }, ...version().faq.slice(1)] },
    { images: [{ ...version().images[0], alt: "AIO image" }] },
    { schemaData: { extra: { label: "artificial intelligence" } } },
  ]) assert.ok(scanCustomerVisibleText(version(override as Partial<LocalizedContentVersion>)).length > 0);
});

test("complete documents pass and missing evidence or real-case proof fails", () => {
  assert.equal(validateDocument(document()).passed, true);
  const missingImage = document(); missingImage.assets = [];
  assert.equal(validateDocument(missingImage).passed, false);
  const claimedCase = document("case"); claimedCase.entity.versions.en!.schemaData.extra = { solutionMode: "verified-case" };
  assert.equal(validateDocument(claimedCase).passed, false);
});

test("duplicate slugs and high textual similarity fail", () => {
  const first = document(); const duplicate = document(); duplicate.entity.id = "another";
  assert.equal(validateDocument(duplicate, [first]).passed, false);
  assert.ok(semanticSimilarity("one two three four five six", "one two three four five six") > 0.86);
});
