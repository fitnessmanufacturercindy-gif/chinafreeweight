/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
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

export default nextConfig;
