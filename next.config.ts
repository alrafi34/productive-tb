import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    /* Strip console.log/warn from production bundles. console.error stays so
       failures in the tools' catch blocks remain visible when debugging. This
       is AST-based: `console.log` inside strings (the sample code several
       tools display) is left untouched. */
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false,
  },

  /* Correct-by-default for when real images land; public/ holds only
     favicons today. */
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
  },

  experimental: {
    /* Deliberately not paired with `modularizeImports` for lucide-react:
       optimizePackageImports is its modern replacement, and running both can
       conflict. reactStrictMode is also left unset — it is already the
       default in Next 16. */
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
