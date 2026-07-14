import type { MetadataRoute } from "next";
import { absoluteUrl, getAllSeoRoutes } from "./seo-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return getAllSeoRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
