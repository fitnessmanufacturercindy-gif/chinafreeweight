import { contentRepository } from "../lib/content/repository";
import { sitemapPageUrl } from "../lib/seo/sitemap-eligibility";
import sitemap from "./sitemap";
import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { getAllPosts } from "./resources/blogData";
import { siteUrl } from "./site";

export type SeoRoute = {
  path: string;
  type: "static" | "product" | "blog" | "language" | "landing";
  title?: string;
  image?: string;
  lastModified?: string | Date;
};

export const staticSeoRoutes: SeoRoute[] = [
  { path: "/", type: "static", title: "PowerBaseFit", image: "/assets/hero-poster.avif" },
  { path: "/products", type: "static", title: "Free Weight Equipment Products", image: "/assets/hero-poster.avif" },
  { path: "/products/dumbbells", type: "static", title: "Commercial Dumbbells", image: "/assets/hex-dumbbells.avif" },
  { path: "/products/weight-plates", type: "static", title: "Commercial Weight Plates", image: "/assets/weight-plate.avif" },
  { path: "/products/gym-accessories", type: "static", title: "Gym Accessories", image: "/assets/gym-accessories.avif" },
  { path: "/factory", type: "static", title: "Factory", image: "/assets/factory.avif" },
  { path: "/projects", type: "static", title: "Projects", image: "/assets/case-showroom.avif" },
  {
    path: "/projects/compact-chrome-dumbbell-set",
    type: "landing",
    title: "Compact Chrome Dumbbell Set with Rack Case Study",
    image: "/assets/projects/compact-chrome-dumbbell-set.webp",
    lastModified: "2026-07-27T05:30:00.000Z"
  },
  {
    path: "/projects/custom-pink-cpu-dumbbells-weight-plates",
    type: "landing",
    title: "Custom Pink CPU Dumbbells and Weight Plates OEM Case",
    image: "/assets/projects/custom-pink-cpu-dumbbells-weight-plates/custom-pink-cpu-dumbbells.webp",
    lastModified: "2026-10-25T08:00:00.000Z"
  },
  {
    path: "/projects/chrome-dumbbell-distributor-stock-direct-shipping",
    type: "landing",
    title: "Wholesale Chrome Dumbbells for Distributor Fulfillment",
    image: "/assets/projects/chrome-dumbbell-distributor-fulfillment/real-chrome-dumbbell-pallet-shipment.webp",
    lastModified: "2026-10-25T10:00:00.000Z"
  },
  { path: "/resources", type: "static", title: "Resources", image: "/assets/resource-cnc-machining.avif" },
  { path: "/contact", type: "static", title: "Contact" },
  { path: "/manufacturer/rubber-hex-dumbbells-manufacturer", type: "landing", title: "Rubber Hex Dumbbells Manufacturer China", image: "/assets/hex-dumbbells.avif" }
];

export function absoluteUrl(path: string) {
  return new URL(path, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function productSeoRoutes(): SeoRoute[] {
  return [
    ...dumbbellProducts.map((product) => ({ path: `/products/dumbbells/${product.slug}`, type: "product" as const, title: product.name, image: product.image })),
    ...weightPlateProducts.map((product) => ({ path: `/products/weight-plates/${product.slug}`, type: "product" as const, title: product.name, image: product.image })),
    ...gymAccessoryProducts.map((product) => ({ path: `/products/gym-accessories/${product.slug}`, type: "product" as const, title: product.name, image: product.image }))
  ];
}

export function blogSeoRoutes(): SeoRoute[] {
  return getAllPosts().map((post) => ({
    path: `/resources/${post.slug}`,
    type: "blog" as const,
    title: post.title,
    image: post.coverImage,
    lastModified: post.updatedAt
  }));
}

export function localizedSeoRoutes(): SeoRoute[] {
  return contentRepository
    .listPublished()
    .filter(({ version }) => version.locale !== "en")
    .map(({ version }) => ({
      path: version.publicPath,
      type: "language" as const,
      title: version.title,
      image: version.images[0]?.src,
      lastModified: version.updatedAt
    }));
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
  const pages = new Set(sitemap().map(({ url }) => url));
  const images = [
    ...allSeoRoutes().flatMap((route) => route.image
      ? [{ pageUrl: sitemapPageUrl(route.path, siteUrl), imageUrl: absoluteUrl(route.image) }]
      : []),
    ...contentRepository.listPublished().flatMap(({ version }) =>
      version.images.map((image) => ({ pageUrl: sitemapPageUrl(version.publicPath, siteUrl), imageUrl: absoluteUrl(image.src) }))
    )
  ];
  return images.filter(({ pageUrl }) => pages.has(pageUrl));
}

export function sitemapEntriesFor(type: "product" | "blog") {
  const englishRoutes = type === "product" ? productSeoRoutes() : blogSeoRoutes();
  const urls = new Set([
    ...englishRoutes.map(({ path }) => absoluteUrl(path)),
    ...contentRepository.listPublished({ type }).map(({ version }) => absoluteUrl(version.publicPath))
  ]);
  return sitemap().filter(({ url }) => urls.has(url));
}
