import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000
  },
  async redirects() {
    return [
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
