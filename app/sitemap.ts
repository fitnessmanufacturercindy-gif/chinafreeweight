import type { MetadataRoute } from "next";
import { getAllPosts } from "./resources/blogData";
import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { siteUrl } from "./site";
import { contentRepository } from "../lib/content/repository";
import { buildPublishedSitemap } from "../lib/seo/sitemap";

const staticRoutes = [
  { path: "/", priority: 1 },
  { path: "/products", priority: 0.92 },
  { path: "/products/dumbbells", priority: 0.9 },
  { path: "/products/weight-plates", priority: 0.9 },
  { path: "/products/gym-accessories", priority: 0.78 },
  { path: "/oem", priority: 0.9 },
  { path: "/factory", priority: 0.88 },
  { path: "/projects", priority: 0.82 },
  { path: "/projects/compact-chrome-dumbbell-set", priority: 0.8 },
  { path: "/projects/custom-logo-dumbbells-weight-plates-fitness-chain", priority: 0.82 },
  { path: "/projects/custom-pink-cpu-dumbbells-weight-plates", priority: 0.82 },
  { path: "/projects/chrome-dumbbell-distributor-stock-direct-shipping", priority: 0.82 },
  { path: "/resources", priority: 0.78 },
  { path: "/contact", priority: 0.86 }
];

function entry(
  path: string,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  lastModified?: string | Date
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
    changeFrequency,
    priority
  };
}

export default function sitemap() {
  const productRoutes = [
    ...dumbbellProducts.map((product) => `/products/dumbbells/${product.slug}`),
    ...weightPlateProducts.map((product) => `/products/weight-plates/${product.slug}`),
    ...gymAccessoryProducts.map((product) => `/products/gym-accessories/${product.slug}`)
  ];

  const resourceRoutes = getAllPosts().map((post) => ({
    path: `/resources/${post.slug}`,
    updatedAt: post.updatedAt
  }));
  const seoLandingRoutes = [
    "/manufacturer/rubber-hex-dumbbells-manufacturer"
  ];

  const englishSitemap = [
    ...staticRoutes.map((route) => entry(route.path, route.priority, "weekly")),
    ...productRoutes.map((path) => entry(path, 0.72, "monthly")),
    ...resourceRoutes.map(({ path, updatedAt }) => entry(path, 0.68, "monthly", updatedAt)),
    ...seoLandingRoutes.map((path) => entry(path, 0.74, "monthly"))
  ];

  return buildPublishedSitemap(contentRepository, siteUrl, { englishEntries: englishSitemap });
}
