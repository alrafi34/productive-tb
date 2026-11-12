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
      // Same relative-compaction calculator in two categories with the same title
      "soil-compaction-ratio-calculator": "/tools/architecture/soil-compaction-calculator",
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
      // Crawled – not indexed (2026-11): both pages of each pair were rejected
      // as near-duplicates; the target now carries the merged features
      "slab-concrete-calculator": "/tools/architecture/concrete-volume-calculator",
      "keyword-density-calculator-seo": "/tools/writing/keyword-density-checker",
      // Catalogue cut, batch 1 (GSC 3-month export, 2026-11-08): 26 specialist
      // tools with no impressions were removed and now 404. This one has a
      // direct equivalent, so it redirects instead.
      "live-load-calculator": "/tools/architecture/structural-load-calculator",
      // Catalogue cut, batch 2: 57 specialist tools with no clicks in three
      // months were removed. These ten have a close kept equivalent; the
      // other 47 now 404.
      "beam-load-calculator": "/tools/architecture/structural-load-calculator",
      "excavation-volume-calculator": "/tools/land/soil-volume-calculator",
      "3d-volume-calculator-architecture": "/tools/architecture/room-volume-calculator",
      "loan-interest-calculator-property": "/tools/calculator/mortgage-calculator",
      "roi-real-estate-calculator": "/tools/calculator/investment-return-calculator",
      "wall-boundary-cost-calculator": "/tools/land/fence-material-calculator",
      "hvac-load-calculator": "/tools/architecture/cooling-load-calculator-architecture",
      "electrical-load-calculator-building": "/tools/electrical/house-wiring-load-calculator",
      "drainage-flow-calculator": "/tools/land/rainwater-runoff-calculator",
      "bigha-land-calculator": "/tools/land/decimal-land-calculator",
      // Catalogue cut, batch 3: 25 specialist tools with one or two clicks in
      // three months. Each with a close kept equivalent redirects (15); the other
      // ten (air change, fire load, exit width, project timeline, heat
      // dissipation, heatsink, impedance, inductor, power density, angular
      // velocity) now 404.
      "elevation-design-calculator": "/tools/architecture/facade-area-calculator",
      "interior-space-optimization-calculator": "/tools/architecture/furniture-layout-calculator",
      "lighting-load-calculator": "/tools/electrical/room-lighting-calculator",
      "skirting-material-calculator": "/tools/architecture/floor-finish-calculator",
      "slope-stability-calculator": "/tools/architecture/retaining-wall-calculator",
      "water-flow-rate-calculator": "/tools/architecture/plumbing-pipe-size-calculator",
      "cable-length-calculator": "/tools/electrical/voltage-drop-calculator",
      "capacitor-charge-time-calculator": "/tools/electrical/capacitor-calculator",
      "op-amp-calculator": "/tools/electrical/amplifier-gain-calculator",
      "real-power-calculator": "/tools/electrical/phase-angle-calculator",
      "reactive-power-calculator": "/tools/electrical/phase-angle-calculator",
      "short-circuit-current-calculator": "/tools/electrical/circuit-breaker-calculator",
      "transformer-current-calculator": "/tools/electrical/transformer-efficiency-calculator",
      "heat-transfer-calculator": "/tools/architecture/insulation-thickness-calculator",
      "spring-force-calculator": "/tools/mechanical/force-calculator",
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
