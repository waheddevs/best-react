import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    formats: ["image/webp"],
    qualities: [75, 95],
  },
};

export default nextConfig;
