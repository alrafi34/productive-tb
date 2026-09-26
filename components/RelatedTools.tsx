"use client";

import Link from "next/link";
import { useToolNav } from "@/components/ToolNavContext";

/* The related-tools grid at the foot of every tool page. The list itself is
   built on the server (lib/tool-nav.ts) from the tool's family, the
   hand-picked links in config/related-picks.ts and its category, and reaches
   this client component through ToolNavContext — so tool UIs no longer ship
   the tool registry to the browser. */
export default function RelatedTools() {
  const nav = useToolNav();
  if (!nav || nav.related.length === 0) return null;

  const { related, category } = nav;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {related.map((tool) => (
          <Link
            key={tool.slug}
            href={tool.href}
            className="group flex items-start gap-3 bg-white rounded-xl border border-gray-200 p-4 hover:border-primary hover:shadow-md transition-all duration-200"
          >
            {tool.icon && (
              <span className="text-2xl leading-none flex-shrink-0" aria-hidden="true">
                {tool.icon}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="text-[15px] font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="mt-1 text-[13px] text-gray-500 line-clamp-2">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
      {category && (
        <Link
          href={`/tools/${category.slug}`}
          className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Browse all {category.count} {category.name} →
        </Link>
      )}
    </div>
  );
}
