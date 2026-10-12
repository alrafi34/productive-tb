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

  /* Keep non-page files out of Google's index. The Open Graph image endpoint
     (/og?title=…) and the self-hosted font files were being crawled and
     listed under "Crawled – currently not indexed". X-Robots-Tag keeps them
     fetchable (social cards still render) but tells search engines not to
     index them; robots.txt would block the social crawlers too. */
  async headers() {
    return [
      { source: "/og", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
      { source: "/_next/static/media/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] },
    ];
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
      // #22: held unregistered duplicates, merged into the registered tool
      "roi-calculator-marketing": "/tools/calculator/investment-return-calculator",
      "binary-to-decimal-calculator": "/tools/math/binary-hex-decimal-converter",
      "decimal-to-binary-calculator": "/tools/math/binary-hex-decimal-converter",
      // Three pages competed for "electricity bill / power consumption calculator";
      // this one had no impressions and no currency choice. Its query is about
      // usage, which the energy consumption calculator answers.
      "power-consumption-calculator": "/tools/electrical/energy-consumption-calculator",
      // Tools from the site before this codebase that Search Console still
      // reports as 404 (export 2026-10-12), sent to the tool that does the same job
      "unix-timestamp-converter": "/tools/calculator/timestamp-unix-converter",
      "regex-tester-calculator": "/tools/developer/regex-tester",
      "sql-query-formatter": "/tools/developer/sql-formatter",
      "time-zone-converter-cs": "/tools/productivity/time-zone-converter",
      "hash-function-calculator": "/tools/security/hash-generator",
      "hex-to-binary-calculator": "/tools/math/binary-hex-decimal-converter",
      "binary-to-hex-calculator": "/tools/math/binary-hex-decimal-converter",
      "octal-to-decimal-calculator": "/tools/math/binary-hex-decimal-converter",
      "checksum-calculator-cs": "/tools/computer-science/checksum-calculator",
      "space-complexity-calculator": "/tools/computer-science/time-complexity-calculator",
      "algorithm-efficiency-calculator": "/tools/computer-science/time-complexity-calculator",
      "password-entropy-calculator": "/tools/security/password-strength-meter",
      "password-entropy-calculator-cs": "/tools/security/password-strength-meter",
      "image-metadata-exif-viewer": "/tools/image/exif-remover",
      "shaft-torque-calculator": "/tools/mechanical/torque-calculator",
      "inverter-load-calculator": "/tools/electrical/solar-inverter-calculator",
      "gps-land-area-calculator": "/tools/land/polygon-area-calculator",
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
