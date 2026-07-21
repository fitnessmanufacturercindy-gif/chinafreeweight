import type { MetadataRoute } from "next";
import { contentRepository } from "../lib/content/repository";
import { getEnglishAlternates } from "../lib/seo/english-alternates";
import { buildPublishedMediaSitemap, buildPublishedSitemap } from "../lib/seo/sitemap";
import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { racksBenchesProducts } from "./products/racks-benches/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { getAllPosts } from "./resources/blogData";
import { siteUrl } from "./site";

export type SeoRoute = {
  path: string;
  type: "static" | "product" | "blog" | "language" | "landing";
  title?: string;
  image?: string;
};

export const staticSeoRoutes: SeoRoute[] = [
  { path: "/", type: "static", title: "PowerBaseFit", image: "/assets/hero-poster.avif" },
  { path: "/products", type: "static", title: "Free Weight Equipment Products", image: "/assets/hero-poster.avif" },
  { path: "/products/dumbbells", type: "static", title: "Commercial Dumbbells", image: "/assets/hex-dumbbells.avif" },
  { path: "/products/weight-plates", type: "static", title: "Commercial Weight Plates", image: "/assets/weight-plate.avif" },
  { path: "/products/racks-benches", type: "static", title: "Racks and Benches", image: "/assets/racks-benches.avif" },
  { path: "/products/gym-accessories", type: "static", title: "Gym Accessories", image: "/assets/gym-accessories.avif" },
  { path: "/factory", type: "static", title: "Factory", image: "/assets/factory.avif" },
  { path: "/projects", type: "static", title: "Projects", image: "/assets/case-showroom.avif" },
  { path: "/resources", type: "static", title: "Resources", image: "/assets/resource-cnc-machining.avif" },
  { path: "/contact", type: "static", title: "Contact" },
  { path: "/manufacturer/rubber-hex-dumbbell-manufacturer", type: "landing", title: "Rubber Hex Dumbbell Manufacturer", image: "/assets/hex-dumbbells.avif" }
];

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function productSeoRoutes(): SeoRoute[] {
  return [
    ...dumbbellProducts.map((product) => ({ path: `/products/dumbbells/${product.slug}`, type: "product" as const, title: product.name, image: product.image })),
    ...weightPlateProducts.map((product) => ({ path: `/products/weight-plates/${product.slug}`, type: "product" as const, title: product.name, image: product.image })),
    ...racksBenchesProducts.map((product) => ({ path: `/products/racks-benches/${product.slug}`, type: "product" as const, title: product.name, image: product.image })),
    ...gymAccessoryProducts.map((product) => ({ path: `/products/gym-accessories/${product.slug}`, type: "product" as const, title: product.name, image: product.image }))
  ];
}

export function blogSeoRoutes(): SeoRoute[] {
  return getAllPosts().map((post) => ({ path: `/resources/${post.slug}`, type: "blog" as const, title: post.title, image: post.coverImage }));
}

export function localizedSeoRoutes(): SeoRoute[] {
  return contentRepository
    .listPublished()
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({ path: version.publicPath, type: "language" as const, title: version.title, image: version.images[0]?.src }));
}

export function allSeoRoutes(): SeoRoute[] {
  const seen = new Set<string>();
  return [...staticSeoRoutes, ...productSeoRoutes(), ...blogSeoRoutes(), ...localizedSeoRoutes()].filter((route) => {
    if (seen.has(route.path)) return false;
    seen.add(route.path);
    return true;
  });
}

export function imageSeoEntries() {
  const staticImages = allSeoRoutes()
    .filter((route) => route.image)
    .map((route) => ({ pageUrl: absoluteUrl(route.path), imageUrl: absoluteUrl(route.image || ""), title: route.title || "PowerBaseFit free weight equipment" }));
  const localizedImages = buildPublishedMediaSitemap(contentRepository, siteUrl).flatMap((record) =>
    record.images.map((image) => ({ pageUrl: record.loc, imageUrl: image.loc, title: image.caption }))
  );
  return [...staticImages, ...localizedImages].filter((entry, index, list) => list.findIndex((item) => item.pageUrl === entry.pageUrl && item.imageUrl === entry.imageUrl) === index);
}

export function localizedSitemapEntries() {
  const englishRoutes = [...staticSeoRoutes, ...productSeoRoutes(), ...blogSeoRoutes()];
  const seen = new Set<string>();
  const englishEntries: MetadataRoute.Sitemap = englishRoutes.flatMap((route) => {
    if (seen.has(route.path)) return [];
    seen.add(route.path);
    const alternates = getEnglishAlternates(route.path).languages;
    return [{
      url: absoluteUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.type === "blog" ? "monthly" as const : "weekly" as const,
      alternates: {
        languages: Object.fromEntries(
          Object.entries(alternates).map(([locale, path]) => [locale, absoluteUrl(path)])
        )
      }
    }];
  });
  return [
    ...englishEntries,
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "pt-BR" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "es" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "de" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "fr" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "vi" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "sv" }),
    ...buildPublishedSitemap(contentRepository, siteUrl, { locale: "it" })
  ];
}
