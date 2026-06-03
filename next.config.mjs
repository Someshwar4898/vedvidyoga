/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.vedvidyoga.com",
      },
    ],
  },

  async redirects() {
    return [
      // Remove ?v query param from all paths
      {
        source: "/:path*",
        has: [
          {
            type: "query",
            key: "v",
          },
        ],
        destination: "/:path*",
        permanent: true,
      },
      // Block /lander routes entirely
      {
        source: "/lander/:path*",
        destination: "/",
        permanent: true,
      },
      {
        source: "/lander",
        destination: "/",
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      // Block indexing of API and admin routes with noindex header
      {
        source: "/wp-admin/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/wp-json/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
