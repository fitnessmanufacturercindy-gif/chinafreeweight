import { legacyAssetRedirects, legacyRedirects } from "./lib/seo/legacy-redirects.mjs";
import createNextIntlPlugin from "next-intl/plugin";

const redirects = [...legacyRedirects, ...legacyAssetRedirects];

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    globalNotFound: true,
    cpus: 1,
    webpackBuildWorker: false,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 50
  },
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
      ...redirects.map(({ source, destination }) => ({
        source,
        has: [{ type: "host", value: "chinafreeweight.com" }],
        destination: `https://www.chinafreeweight.com${destination}`,
        permanent: true
      })),
      ...redirects,
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
