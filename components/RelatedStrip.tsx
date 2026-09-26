"use client";

import Link from "next/link";
import { useToolNav } from "@/components/ToolNavContext";

const CHIP_COUNT = 8;

/* Sits right under the tool, above its explanation: the "next step" links
   for tools that have an obvious one, and the related-tools chips for
   screens too narrow for the side rail (or tools too wide to have one). */
export default function RelatedStrip() {
  const nav = useToolNav();
  if (!nav) return null;

  const chips = nav.related.slice(0, CHIP_COUNT);
  if (nav.next.length === 0 && chips.length === 0) return null;

  return (
    <div className="mt-8 space-y-5">
      {nav.next.length > 0 && (
        <section aria-label="Next step" className="rounded-2xl border border-primary/20 bg-primary/5 p-4 sm:p-5">
          <p className="text-sm font-semibold text-emerald-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Next step
          </p>
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible [scrollbar-width:none]">
            {nav.next.map((t) => (
              <Link
                key={t.slug}
                href={t.href}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-primary/20 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 hover:border-primary hover:text-primary transition-colors"
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.name}
                <span aria-hidden="true" className="text-primary">→</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {chips.length > 0 && (
        <section aria-label="Related tools" className={nav.wide ? undefined : "xl:hidden"}>
          <p className="text-sm font-semibold text-gray-900 mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Related tools
          </p>
          <div className="flex gap-2 overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible [scrollbar-width:none]">
            {chips.map((t) => (
              <Link
                key={t.slug}
                href={t.href}
                className="shrink-0 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors"
              >
                <span aria-hidden="true">{t.icon}</span>
                {t.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
