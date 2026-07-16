import type {
  ContentBlock,
  LocalizedContentVersion,
  LocalizedFaq,
  LocalizedImage,
  LocalizedInternalLink
} from "../../lib/content/types";
import { spanishBlogsA } from "./spanish-blogs-a";
import { spanishBlogsB } from "./spanish-blogs-b";
import { spanishPages } from "./spanish-pages";
import type { SpanishPage } from "./es-types";

const updatedAt = "2026-07-16T08:00:00.000Z";
const publishedAt = "2026-07-16T08:00:00.000Z";

function faq(items: Array<[string, string]>): LocalizedFaq[] {
  return items.map(([question, answer], index) => ({ id: `faq-${index + 1}`, question, answer }));
}

function image(item?: [string, string]): LocalizedImage[] {
  return item ? [{ id: "principal", src: item[0], alt: item[1] }] : [];
}

function links(items: Array<[string, string]>): LocalizedInternalLink[] {
  return items.map(([targetContentId, label]) => ({ targetContentId, label }));
}

function breadcrumbs(page: SpanishPage) {
  const result = [{ name: "Inicio", path: "/es" }];
  if (page.esPath === "/es") return result;
  if (page.type === "blog") result.push({ name: "Blog", path: "/es/blog" });
  if (page.esPath.startsWith("/es/productos")) {
    result.push({ name: "Productos", path: "/es/productos" });
    if (page.esPath.startsWith("/es/productos/mancuernas/") || page.esPath === "/es/productos/mancuernas") {
      result.push({ name: "Mancuernas", path: "/es/productos/mancuernas" });
    }
    if (page.esPath.startsWith("/es/productos/discos")) {
      result.push({ name: "Discos de peso", path: "/es/productos/discos-de-peso" });
    }
  }
  if (result.at(-1)?.path !== page.esPath) result.push({ name: page.h1, path: page.esPath });
  return result;
}

function body(page: SpanishPage): ContentBlock[] {
  const blocks = [...page.blocks];
  if (page.type === "contact") {
    blocks.push({ id: "inquiry-form", type: "custom", heading: "Cuéntenos su proyecto", data: { component: "inquiry-form" } });
  }
  return blocks;
}

function publishedVersion(page: SpanishPage): LocalizedContentVersion {
  return {
    locale: "es",
    translationStatus: "localized",
    reviewStatus: "approved",
    publishStatus: "published",
    slug: page.esPath.split("/").filter(Boolean).at(-1) ?? "inicio",
    publicPath: page.esPath,
    title: page.title,
    description: page.description,
    h1: page.h1,
    body: body(page),
    faq: faq(page.faq),
    author: page.author,
    reviewedBy: page.reviewedBy,
    schemaData: {
      sku: page.sku,
      brand: page.type === "product" ? "PowerBaseFit" : undefined,
      manufacturer: page.type === "product" ? "Powerbase Fitness Equipment Co.,Ltd" : undefined,
      material: page.material,
      category: page.category,
      specifications: page.specifications,
      breadcrumbs: breadcrumbs(page)
    },
    images: image(page.image),
    internalLinks: links(page.links),
    canonicalData: { mode: "self" },
    hreflangData: { include: true },
    updatedAt,
    publishedAt,
    version: 1
  };
}

const allPages = [...spanishPages, ...spanishBlogsA, ...spanishBlogsB];

export const spanishPublishedVersions = allPages.map((page) => ({
  id: page.id,
  version: publishedVersion(page)
}));
