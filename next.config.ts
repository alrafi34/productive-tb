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

  /* Tools merged into an earning sibling (#22 triage, GSC export 2026-09-24).
     Each source had zero impressions in six months; its target covers the same
     calculation and earns clicks. Any category segment is matched, so old and
     wrong-category URLs land on the target in one hop. `permanent` sends 308,
     which Google treats as a 301. */
  async redirects() {
    const merged: Record<string, string> = {
      "f1-score-calculator-analytics": "/tools/computer-science/f1-score-calculator",
      "precision-calculator": "/tools/computer-science/precision-recall-calculator",
      "recall-calculator": "/tools/computer-science/precision-recall-calculator",
      "confusion-matrix-analyzer": "/tools/computer-science/confusion-matrix-calculator",
      "profit-margin-calculator": "/tools/marketing/profit-margin-calculator-marketing",
      // #65: one mortgage page instead of three competing for the same query
      "mortgage-loan-calculator": "/tools/calculator/mortgage-calculator",
      "home-loan-emi-calculator": "/tools/calculator/mortgage-calculator",
      // #65: "loan calculator" is the global search term; EMI is regional
      "loan-emi-calculator": "/tools/calculator/loan-calculator",
    };
    return Object.entries(merged).flatMap(([slug, destination]) => [
      { source: `/tools/:category/${slug}`, destination, permanent: true },
      { source: `/tools/${slug}`, destination, permanent: true },
    ]);
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
