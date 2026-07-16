import { dumbbellProducts } from "./products/dumbbells/productData";
import { gymAccessoryProducts } from "./products/gym-accessories/productData";
import { racksBenchesProducts } from "./products/racks-benches/productData";
import { weightPlateProducts } from "./products/weight-plates/productData";
import { getAllPosts } from "./resources/blogData";
import { siteUrl } from "./site";

export type SeoRoute = {
  path: string;
  type: "static" | "product" | "blog";
  title: string;
  image?: string;
};

const staticRoutes: SeoRoute[] = [
  { path: "/", type: "static", title: "PowerBaseFit", image: "/assets/hero-poster.avif" },
  { path: "/products/dumbbells", type: "static", title: "Dumbbells", image: "/assets/hex-dumbbells.avif" },
  { path: "/products/weight-plates", type: "static", title: "Weight Plates", image: "/assets/weight-plate.avif" },
  { path: "/products/racks-benches", type: "static", title: "Racks and Benches", image: "/assets/racks-benches.avif" },
  { path: "/products/gym-accessories", type: "static", title: "Gym Accessories", image: "/assets/gym-accessories.avif" },
  { path: "/factory", type: "static", title: "Factory", image: "/assets/factory.avif" },
  { path: "/projects", type: "static", title: "Projects", image: "/assets/case-showroom.avif" },
  { path: "/resources", type: "static", title: "Resources", image: "/assets/dumbbell-production.avif" },
  { path: "/contact", type: "static", title: "Contact", image: "/assets/logo-readable.webp" },
  { path: "/manufacturer/rubber-hex-dumbbell-manufacturer", type: "static", title: "Rubber Hex Dumbbell Manufacturer", image: "/assets/hex-dumbbells.avif" }
];

export function absoluteUrl(pathname: string) {
  return new URL(pathname, `${siteUrl.replace(/\/$/, "")}/`).toString();
}

export function productSeoRoutes(): SeoRoute[] {
  return [
    ...dumbbellProducts.map((product) => ({
      path: `/products/dumbbells/${product.slug}`,
      type: "product" as const,
      title: product.name,
      image: product.image
    })),
    ...weightPlateProducts.map((product) => ({
      path: `/products/weight-plates/${product.slug}`,
      type: "product" as const,
      title: product.name,
      image: product.image
    })),
    ...racksBenchesProducts.map((product) => ({
      path: `/products/racks-benches/${product.slug}`,
      type: "product" as const,
      title: product.name,
      image: product.image
    })),
    ...gymAccessoryProducts.map((product) => ({
      path: `/products/gym-accessories/${product.slug}`,
      type: "product" as const,
      title: product.name,
      image: product.image
    }))
  ];
}

export function blogSeoRoutes(): SeoRoute[] {
  return getAllPosts().map((post) => ({
    path: `/resources/${post.slug}`,
    type: "blog" as const,
    title: post.title,
    image: post.coverImage
  }));
}

export function allSeoRoutes() {
  return [...staticRoutes, ...productSeoRoutes(), ...blogSeoRoutes()];
}

export function imageSeoEntries() {
  return allSeoRoutes()
    .filter((route) => route.image)
    .map((route) => ({
      pageUrl: absoluteUrl(route.path),
      imageUrl: absoluteUrl(route.image || "/assets/logo-readable.webp"),
      title: route.title
    }));
}

export function languageSitemapEntries() {
  return allSeoRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    alternates: {
      languages: {
        en: absoluteUrl(route.path),
        "x-default": absoluteUrl(route.path)
      }
    }
  }));
}
