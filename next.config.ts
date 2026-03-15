import type { NextConfig } from "next";
import { copyLibFiles } from "@builder.io/partytown/utils";
import path from "path";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async headers() {
    return [
      {
        source: "/~partytown/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET" },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/gtm-proxy",
        destination: "https://www.googletagmanager.com/gtag/js",
      },
    ];
  },
};

// Copy Partytown library files to public/~partytown
copyLibFiles(path.join(process.cwd(), "public", "~partytown"));

export default nextConfig;
