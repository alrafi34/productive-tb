import Link from 'next/link';
import { tools } from '@/config/tools';

/* Resolved from `config/tools` on purpose. This component is imported by
   `"use client"` tool UIs, so anything it imports ships to the browser —
   pulling in `lib/tools-registry` dragged all ~280 full tool configs
   (keywords, FAQs, howToSteps, long-form SEO copy) into every tool page's
   JS bundle. `config/tools` carries the slug, name, description, icon and
   category, which is everything the cards below need. */
const TOOLS_BY_SLUG = new Map(tools.map((t) => [t.slug, t]));

interface RelatedToolsProps {
  currentTool: string;
  tools: string[];
  title?: string;
}

export default function RelatedTools({ currentTool, tools: slugs, title = "Related Tools" }: RelatedToolsProps) {
  const relatedTools = slugs
    .map((slug) => {
      const tool = TOOLS_BY_SLUG.get(slug);
      if (!tool || tool.slug === currentTool) return null;
      return tool;
    })
    .filter((t) => t !== null);

  if (process.env.NODE_ENV !== 'production') {
    const unresolved = slugs.filter((s) => s !== currentTool && !TOOLS_BY_SLUG.has(s));
    if (unresolved.length > 0) {
      // Surface missing slugs instead of silently dropping the card.
      console.warn(`[RelatedTools] unresolved slugs on "${currentTool}":`, unresolved);
    }
  }

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedTools.map((tool) => {
          const href = `/tools/${tool.category}/${tool.slug}`;

          return (
            <Link
              key={tool.slug}
              href={href}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-[#058554] hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                {tool.icon && (
                  <div className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#058554] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {tool.description}
                  </p>
                  <div className="mt-3 inline-flex items-center text-sm font-medium text-[#058554] group-hover:gap-2 transition-all">
                    Try it now
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
