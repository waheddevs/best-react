import type { NextConfig } from "next";

function getGraphqlUrl(baseUrl: string) {
  return `${baseUrl.replace(/\/graphql\/?$/, "").replace(/\/$/, "")}/graphql`;
}

const nextConfig: NextConfig = {
  devIndicators: false,
  experimental: {
    proxyTimeout: 2_700_000,
  },
  images: {
    formats: ["image/webp"],
    qualities: [75, 95],
  },
  async rewrites() {
    const apiUrl = process.env.BEST_API_INTERNAL_URL ?? "http://127.0.0.1:4000";
    return [
      {
        destination: getGraphqlUrl(apiUrl),
        source: "/best-api/graphql",
      },
    ];
  },
};

export default nextConfig;
