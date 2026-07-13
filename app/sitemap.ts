import type { MetadataRoute } from "next";
import { getAllPosts } from "./resources/blogData";
import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { racksBenchesProducts } from "./products/racks-benches/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { siteUrl } from "./site";

const staticRoutes = [
  { path: "", priority: 1 },
  { path: "/products/dumbbells", priority: 0.9 },
  { path: "/products/weight-plates", priority: 0.9 },
  { path: "/products/racks-benches", priority: 0.86 },
  { path: "/products/gym-accessories", priority: 0.78 },
  { path: "/factory", priority: 0.88 },
  { path: "/projects", priority: 0.82 },
  { path: "/resources", priority: 0.78 },
  { path: "/contact", priority: 0.86 }
];

const portugueseRoutes = [
  { path: "/pt/", priority: 0.92 },
  { path: "/pt/products/", priority: 0.84 },
  { path: "/pt/products/dumbbells/", priority: 0.9 },
  { path: "/pt/products/weight-plates/", priority: 0.9 },
  { path: "/pt/products/bumper-plates/", priority: 0.9 },
  { path: "/pt/oem-private-label/", priority: 0.88 },
  { path: "/pt/factory/", priority: 0.88 },
  { path: "/pt/blog/", priority: 0.76 }
];

function entry(
  path: string,
  priority = 0.7,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly"
): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = [
    ...dumbbellProducts.map((product) => `/products/dumbbells/${product.slug}`),
    ...weightPlateProducts.map((product) => `/products/weight-plates/${product.slug}`),
    ...racksBenchesProducts.map((product) => `/products/racks-benches/${product.slug}`),
    ...gymAccessoryProducts.map((product) => `/products/gym-accessories/${product.slug}`)
  ];

  const resourceRoutes = getAllPosts().map((post) => `/resources/${post.slug}`);

  return [
    ...staticRoutes.map((route) => entry(route.path, route.priority, "weekly")),
    ...portugueseRoutes.map((route) => entry(route.path, route.priority, "weekly")),
    ...productRoutes.map((path) => entry(path, 0.72, "monthly")),
    ...resourceRoutes.map((path) => entry(path, 0.68, "monthly"))
  ];
}
