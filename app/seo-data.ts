import { getAllPosts } from "./resources/blogData";
import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { racksBenchesProducts } from "./products/racks-benches/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { siteUrl } from "./site";

export type SeoUrl = {
  path: string;
  priority: number;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  type: "static" | "product" | "resource" | "language";
  image?: string;
  title?: string;
  lang?: string;
  alternates?: Record<string, string>;
};

export const staticSeoRoutes: SeoUrl[] = [
  { path: "", priority: 1, changeFrequency: "weekly", type: "static", image: "/assets/hero-poster.avif" },
  { path: "/products/dumbbells", priority: 0.9, changeFrequency: "weekly", type: "static", image: "/assets/hex-dumbbells.avif" },
  { path: "/products/weight-plates", priority: 0.9, changeFrequency: "weekly", type: "static", image: "/assets/weight-plate.avif" },
  { path: "/products/racks-benches", priority: 0.86, changeFrequency: "weekly", type: "static", image: "/assets/racks-benches.avif" },
  { path: "/products/gym-accessories", priority: 0.78, changeFrequency: "weekly", type: "static", image: "/assets/gym-accessories.avif" },
  { path: "/factory", priority: 0.88, changeFrequency: "weekly", type: "static", image: "/assets/factory.avif" },
  { path: "/projects", priority: 0.82, changeFrequency: "weekly", type: "static", image: "/assets/case-showroom.avif" },
  { path: "/resources", priority: 0.78, changeFrequency: "weekly", type: "static", image: "/assets/resource-cnc-machining.avif" },
  { path: "/contact", priority: 0.86, changeFrequency: "monthly", type: "static" }
];

export const portugueseSeoRoutes: SeoUrl[] = [
  { path: "/pt/", priority: 0.92, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/equipamentos-profissionais-academias.webp", alternates: { en: "/", pt: "/pt/", "x-default": "/" } },
  { path: "/pt/products/", priority: 0.84, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/equipamentos-profissionais-academias.webp", alternates: { en: "/products/dumbbells", pt: "/pt/products/", "x-default": "/products/dumbbells" } },
  { path: "/pt/products/dumbbells/", priority: 0.9, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/halteres-borracha-profissionais.webp", alternates: { en: "/products/dumbbells", pt: "/pt/products/dumbbells/", "x-default": "/products/dumbbells" } },
  { path: "/pt/products/weight-plates/", priority: 0.9, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/anilhas-olimpicas-profissionais.webp", alternates: { en: "/products/weight-plates", pt: "/pt/products/weight-plates/", "x-default": "/products/weight-plates" } },
  { path: "/pt/products/bumper-plates/", priority: 0.9, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/bumper-plates-olimpicos.webp", alternates: { en: "/products/weight-plates", pt: "/pt/products/bumper-plates/", "x-default": "/products/weight-plates" } },
  { path: "/pt/oem-private-label/", priority: 0.88, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/equipamentos-fitness-oem-marca-propria.webp", alternates: { en: "/factory", pt: "/pt/oem-private-label/", "x-default": "/factory" } },
  { path: "/pt/factory/", priority: 0.88, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/fabrica-equipamentos-fitness-china.webp", alternates: { en: "/factory", pt: "/pt/factory/", "x-default": "/factory" } },
  { path: "/pt/blog/", priority: 0.76, changeFrequency: "weekly", type: "language", lang: "pt-BR", image: "/assets/pt/equipamentos-profissionais-academias.webp", alternates: { en: "/resources", pt: "/pt/blog/", "x-default": "/resources" } }
];

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

export function getProductSeoRoutes(): SeoUrl[] {
  return [
    ...dumbbellProducts.map((product) => ({
      path: `/products/dumbbells/${product.slug}`,
      priority: 0.72,
      changeFrequency: "monthly" as const,
      type: "product" as const,
      image: product.image,
      title: product.name
    })),
    ...weightPlateProducts.map((product) => ({
      path: `/products/weight-plates/${product.slug}`,
      priority: 0.72,
      changeFrequency: "monthly" as const,
      type: "product" as const,
      image: product.image,
      title: product.name
    })),
    ...racksBenchesProducts.map((product) => ({
      path: `/products/racks-benches/${product.slug}`,
      priority: 0.72,
      changeFrequency: "monthly" as const,
      type: "product" as const,
      image: product.image,
      title: product.name
    })),
    ...gymAccessoryProducts.map((product) => ({
      path: `/products/gym-accessories/${product.slug}`,
      priority: 0.72,
      changeFrequency: "monthly" as const,
      type: "product" as const,
      image: product.image,
      title: product.name
    }))
  ];
}

export function getResourceSeoRoutes(): SeoUrl[] {
  return getAllPosts().map((post) => ({
    path: `/resources/${post.slug}`,
    priority: 0.68,
    changeFrequency: "monthly" as const,
    type: "resource" as const,
    image: post.coverImage,
    title: post.title
  }));
}

export function getAllSeoRoutes(): SeoUrl[] {
  return [...staticSeoRoutes, ...portugueseSeoRoutes, ...getProductSeoRoutes(), ...getResourceSeoRoutes()];
}

export function getImageSeoEntries() {
  return getAllSeoRoutes()
    .filter((route) => route.image)
    .map((route) => ({
      pageUrl: absoluteUrl(route.path),
      imageUrl: absoluteUrl(route.image || ""),
      title: route.title || "PowerBaseFit free weight equipment"
    }));
}
