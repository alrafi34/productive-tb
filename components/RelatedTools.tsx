import Link from 'next/link';
import { tools, categories, type Tool } from '@/config/tools';

/* Resolved from `config/tools` on purpose. This component is imported by
   `"use client"` tool UIs, so anything it imports ships to the browser —
   pulling in `lib/tools-registry` dragged all ~280 full tool configs
   (keywords, FAQs, howToSteps, long-form SEO copy) into every tool page's
   JS bundle. `config/tools` carries the slug, name, description, icon and
   category, which is everything the cards below need. */
const TOOLS_BY_SLUG = new Map(tools.map((t) => [t.slug, t]));
const CATEGORY_BY_SLUG = new Map(categories.map((c) => [c.slug, c]));

const TARGET_COUNT = 12;

/* Where to look once a category runs out of siblings. Ordered by how likely a
   visitor of the first category is to want the second. Anything not reached
   here is still picked up by the final any-category pass. */
const NEIGHBOUR_CATEGORIES: Record<string, string[]> = {
  architecture: ['land', 'electrical', 'mechanical'],
  land: ['architecture', 'calculator'],
  electrical: ['mechanical', 'architecture', 'computer-science'],
  mechanical: ['electrical', 'architecture'],
  'computer-science': ['developer', 'data-analytics'],
  'data-analytics': ['computer-science', 'math', 'marketing'],
  marketing: ['data-analytics', 'writing'],
  writing: ['creator', 'marketing'],
  image: ['design', 'multimedia'],
  design: ['image', 'developer'],
  security: ['developer', 'computer-science'],
  developer: ['computer-science', 'security'],
  calculator: ['math', 'health'],
  math: ['calculator', 'data-analytics'],
  health: ['calculator'],
  creator: ['writing', 'design'],
  visualization: ['data-analytics', 'design'],
  productivity: ['calculator', 'writing'],
  multimedia: ['image', 'creator'],
};

/* Words every other slug shares; matching on them says nothing. */
const STOP_WORDS = new Set([
  'calculator', 'converter', 'generator', 'tool', 'checker', 'estimator',
  'maker', 'finder', 'online', 'free', 'to', 'and', 'of', 'the', 'a', 'per',
]);

const KEYWORDS = new Map(tools.map((t) => [t.slug, t.slug.split('-').filter((w) => !STOP_WORDS.has(w))]));
const POSITION = new Map(tools.map((t, i) => [t.slug, i]));

/* Candidates in `pool`, best first: most shared slug keywords, then the tools
   that follow `current` in registry order (wrapping around). Walking forward
   from the current tool, rather than always taking the category's first few,
   spreads inbound links across the whole category. Deterministic, so the
   server and client renders agree. */
function rank(pool: Tool[], current: Tool | undefined): Tool[] {
  const words = new Set(current ? KEYWORDS.get(current.slug) : []);
  const start = current ? POSITION.get(current.slug)! : 0;
  return pool
    .map((tool) => ({
      tool,
      shared: KEYWORDS.get(tool.slug)!.filter((w) => words.has(w)).length,
      distance: (POSITION.get(tool.slug)! - start + tools.length) % tools.length,
    }))
    .sort((a, b) => b.shared - a.shared || a.distance - b.distance)
    .map((c) => c.tool);
}

interface RelatedToolsProps {
  currentTool: string;
  /* Hand-picked slugs. They come first; the rest is filled automatically. */
  tools?: string[];
  title?: string;
}

export default function RelatedTools({ currentTool, tools: slugs = [], title = "Related Tools" }: RelatedToolsProps) {
  const picked: Tool[] = [];
  const seen = new Set([currentTool]);
  const add = (list: Tool[]) => {
    for (const tool of list) {
      if (picked.length >= TARGET_COUNT) return;
      if (seen.has(tool.slug)) continue;
      seen.add(tool.slug);
      picked.push(tool);
    }
  };

  add(slugs.map((slug) => TOOLS_BY_SLUG.get(slug)).filter((t): t is Tool => t !== undefined));

  if (process.env.NODE_ENV !== 'production') {
    const unresolved = slugs.filter((s) => s !== currentTool && !TOOLS_BY_SLUG.has(s));
    if (unresolved.length > 0) {
      // Surface missing slugs instead of silently dropping the card.
      console.warn(`[RelatedTools] unresolved slugs on "${currentTool}":`, unresolved);
    }
  }

  /* Tools missing from the registry have no category of their own, so borrow
     the one their hand-picked links point at. */
  const current = TOOLS_BY_SLUG.get(currentTool);
  const categorySlug = current?.category ?? picked[0]?.category;

  const fallbacks = categorySlug ? [categorySlug, ...(NEIGHBOUR_CATEGORIES[categorySlug] ?? [])] : [];
  for (const slug of fallbacks) {
    if (picked.length >= TARGET_COUNT) break;
    add(rank(tools.filter((t) => t.category === slug), current));
  }
  if (picked.length < TARGET_COUNT) add(rank(tools, current));

  if (picked.length === 0) return null;

  const category = categorySlug ? CATEGORY_BY_SLUG.get(categorySlug) : undefined;
  const categoryCount = category ? tools.filter((t) => t.category === category.slug).length : 0;

  return (
    <div className="mt-16 pt-12 border-t border-gray-200">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {picked.map((tool) => {
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
      {category && (
        <Link
          href={`/tools/${category.slug}`}
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-[#058554] hover:underline"
        >
          Browse all {categoryCount} {category.name} →
        </Link>
      )}
    </div>
  );
}
