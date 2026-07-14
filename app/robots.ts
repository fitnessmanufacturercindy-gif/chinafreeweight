import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

const disallow = [
  "/api/",
  "/admin/",
  "/login",
  "/cart",
  "/checkout",
  "/search",
  "/*?*s=",
  "/*?*search=",
  "/*?*query=",
  "/*?*utm_",
  "/*?*fbclid=",
  "/tmp/",
  "/temporary/",
  "/test-results/",
  "/playwright-report/"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-Video",
          "Bingbot",
          "YandexBot",
          "YandexImages",
          "Applebot",
          "GPTBot",
          "ClaudeBot",
          "PerplexityBot",
          "facebookexternalhit",
          "LinkedInBot",
          "Twitterbot"
        ],
        allow: "/",
        disallow
      },
      {
        userAgent: "*",
        allow: "/",
        disallow
      }
    ],
    sitemap: [
      `${siteUrl}/sitemap.xml`,
      `${siteUrl}/sitemap-index.xml`,
      `${siteUrl}/sitemaps/products.xml`,
      `${siteUrl}/sitemaps/blogs.xml`,
      `${siteUrl}/sitemaps/images.xml`,
      `${siteUrl}/sitemaps/videos.xml`,
      `${siteUrl}/sitemaps/languages.xml`
    ]
  };
}
