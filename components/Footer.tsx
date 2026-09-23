import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools, categories } from "@/config/tools";

/* Derived once at module scope. Footer is a server component with no
   "use client", so importing the catalogue here costs the browser nothing —
   only the rendered markup ships. Do not convert this file to a client
   component without re-checking that. */
const TOTAL_TOOLS = tools.length;

const countByCategory = tools.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});

/* Every category, biggest first. Previously four were hard-coded here —
   writing, image, math and creator — which between them hold ~45 tools,
   while electrical, architecture, data-analytics, calculator, mechanical
   and land got no footer link at all. The footer renders on every page, so
   it is the site's largest internal-link surface; deriving the list from
   `categories` keeps it from drifting again. */
const FOOTER_CATEGORIES = [...categories].sort(
  (a, b) => (countByCategory[b.slug] ?? 0) - (countByCategory[a.slug] ?? 0)
);

const COMPANY_LINKS: [string, string][] = [
  ["About", "/about"],
  ["Contact", "/contact"],
  ["Privacy Policy", "/privacy"],
  ["Terms of Use", "/terms"],
];

const LEGAL_LINKS: [string, string][] = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Contact", "/contact"],
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Brand + company */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 pb-10">
          <div className="sm:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white font-bold text-lg mb-3"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              <Image src="/favicon.svg" alt="" width={28} height={28} className="w-7 h-7" />
              {siteConfig.name}
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              {TOTAL_TOOLS} free calculators and tools for engineering, construction, land
              and everyday work. They run in your browser — no sign-up, no paywalls.
            </p>
            <Link
              href="/tools"
              className="inline-block mt-4 text-sm font-semibold text-primary hover:underline"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Browse all {TOTAL_TOOLS} tools →
            </Link>
          </div>

          <div>
            <p
              className="text-white text-sm font-semibold mb-4"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Company
            </p>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-500 hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Every category — the site's main internal-link surface */}
        <div className="border-t border-gray-800 pt-10 pb-10">
          <p
            className="text-white text-sm font-semibold mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            All categories
          </p>
          {/* Names are long ("Architecture & Construction"), so this is plain
              inline text rather than a flex row — a flex child needs min-w-0
              before `truncate` will shrink it, and without that the longest
              names overflowed the grid column on narrow screens. Letting the
              text wrap instead removes the failure mode entirely. */}
          <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
            {FOOTER_CATEGORIES.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/tools/${cat.slug}`}
                  className="group text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  {cat.name}
                  <span className="ml-1.5 text-[11px] font-semibold text-gray-700 group-hover:text-primary/70 tabular-nums">
                    {countByCategory[cat.slug] ?? 0}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {LEGAL_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs text-gray-600 hover:text-primary transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
