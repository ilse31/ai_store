import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "picsum.photos" },
      { hostname: "upload.wikimedia.org" },
      { hostname: "toko-homeai.pro" },
    ],
  },
};

export default nextConfig;
