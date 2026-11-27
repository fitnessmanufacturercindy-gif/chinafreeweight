import type { MetadataRoute } from "next";
import { siteUrl } from "./site";

const disallow = [
  "/api/",
  "/admin/",
  "/login",
  "/cart",
  "/checkout",
  "/search",
  "/*?s=",
  "/*?dpl=",
  "/*?search=",
  "/*?query=",
  "/*?utm_",
  "/*?fbclid=",
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
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Bravebot",
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
      `${siteUrl}/sitemaps/images.xml`,
      `${siteUrl}/sitemaps/videos.xml`
    ]
  };
}
