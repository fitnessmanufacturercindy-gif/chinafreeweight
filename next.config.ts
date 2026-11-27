import type { NextConfig } from "next";
import { legacyRedirects } from "./lib/seo/legacy-redirects";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Resolve legacy slash variants before the general trailing-slash redirect.
  skipTrailingSlashRedirect: true,
  experimental: process.platform === "win32"
    ? {
        cpus: 1,
        webpackBuildWorker: false
      }
    : undefined,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()"
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      ...legacyRedirects.map(({ source, destination }) => ({
        source,
        has: [{ type: "host" as const, value: "chinafreeweight.com" }],
        destination: `https://www.chinafreeweight.com${destination}`,
        permanent: true
      })),
      ...legacyRedirects,
      {
        source: "/:path+/",
        destination: "/:path+",
        permanent: true
      },
      {
        source: "/manufacturer/rubber-hex-dumbbell-manufacturer",
        destination: "/manufacturer/rubber-hex-dumbbells-manufacturer",
        permanent: true
      },
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "chinafreeweight.com"
          }
        ],
        destination: "https://www.chinafreeweight.com/:path*",
        permanent: true
      }
    ];
  }
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

export default withNextIntl(nextConfig);
