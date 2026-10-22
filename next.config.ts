import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        host: "*",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;