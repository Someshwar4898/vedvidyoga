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
};

export default nextConfig;
