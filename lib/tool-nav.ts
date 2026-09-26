import { tools, categories, type Tool } from "@/config/tools";
import { NOINDEX_TOOLS } from "@/config/noindex";
import { RELATED_PICKS } from "@/config/related-picks";
import { TOOL_FAMILIES, NEXT_STEPS, POPULAR_TOOLS, POPULAR_POOL, WIDE_TOOLS } from "@/config/tool-nav";

/* Everything a tool page links to besides its own content: the family strip
   above the tool, the next-step and related chips under it, the side rail and
   the related grid at the bottom. Computed on the server by ToolLayout and
   handed to the client parts through ToolNavContext, so tool UIs ship only
   the dozen links they show rather than the whole registry. */

export type NavLink = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  href: string;
};

export type ToolNav = {
  slug: string;
  /* The whole family in order, current tool included; empty when the tool
     has fewer than two indexable siblings. */
  family: NavLink[];
  next: NavLink[];
  related: NavLink[];
  popular: NavLink[];
  category?: { slug: string; name: string; count: number };
  /* No side rail: the tool needs the full width. */
  wide: boolean;
};

const RELATED_COUNT = 12;
const POPULAR_COUNT = 7;

const TOOLS_BY_SLUG = new Map(tools.map((t) => [t.slug, t]));
const CATEGORY_BY_SLUG = new Map(categories.map((c) => [c.slug, c]));
const FAMILY_OF = new Map<string, readonly string[]>();
for (const family of TOOL_FAMILIES) for (const slug of family) FAMILY_OF.set(slug, family);

/* Where to look once a category runs out of siblings. Ordered by how likely a
   visitor of the first category is to want the second. Anything not reached
   here is still picked up by the final any-category pass. */
const NEIGHBOUR_CATEGORIES: Record<string, string[]> = {
  architecture: ["land", "electrical", "mechanical"],
  land: ["architecture", "calculator"],
  electrical: ["mechanical", "architecture", "computer-science"],
  mechanical: ["electrical", "architecture"],
  "computer-science": ["developer", "data-analytics"],
  "data-analytics": ["computer-science", "math", "marketing"],
  marketing: ["data-analytics", "writing"],
  writing: ["creator", "marketing"],
  image: ["design", "multimedia"],
  design: ["image", "developer"],
  security: ["developer", "computer-science"],
  developer: ["computer-science", "security"],
  calculator: ["math", "health"],
  math: ["calculator", "data-analytics"],
  health: ["calculator"],
  creator: ["writing", "design"],
  visualization: ["data-analytics", "design"],
  productivity: ["calculator", "writing"],
  multimedia: ["image", "creator"],
};

/* Words every other slug shares; matching on them says nothing. */
const STOP_WORDS = new Set([
  "calculator", "converter", "generator", "tool", "checker", "estimator",
  "maker", "finder", "online", "free", "to", "and", "of", "the", "a", "per",
]);

const KEYWORDS = new Map(tools.map((t) => [t.slug, t.slug.split("-").filter((w) => !STOP_WORDS.has(w))]));
const POSITION = new Map(tools.map((t, i) => [t.slug, i]));

/* Candidates in `pool`, best first: most shared slug keywords, then the tools
   that follow `current` in registry order (wrapping around). Walking forward
   from the current tool, rather than always taking the category's first few,
   spreads inbound links across the whole category. Deterministic. */
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

const toLink = (t: Tool): NavLink => ({
  slug: t.slug,
  name: t.name,
  description: t.description,
  icon: t.icon,
  href: `/tools/${t.category}/${t.slug}`,
});

/* Noindexed tools earned no search demand; links go to pages that do. */
const linkable = (slug: string) => TOOLS_BY_SLUG.has(slug) && !NOINDEX_TOOLS.has(slug);

/* A small stable hash (FNV-1a) of a slug, for picking rotating links. */
function hashSlug(slug: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const resolve = (slugs: readonly string[]) =>
  slugs.map((s) => TOOLS_BY_SLUG.get(s)).filter((t): t is Tool => t !== undefined);

export function getToolNav(slug: string): ToolNav {
  const current = TOOLS_BY_SLUG.get(slug);
  const familySlugs = FAMILY_OF.get(slug) ?? [];
  const picks = RELATED_PICKS[slug] ?? [];

  /* Related: family, then hand-picked, then category and its neighbours. */
  const related: Tool[] = [];
  const seen = new Set([slug]);
  const add = (list: Tool[]) => {
    for (const tool of list) {
      if (related.length >= RELATED_COUNT) return;
      if (seen.has(tool.slug) || !linkable(tool.slug)) continue;
      seen.add(tool.slug);
      related.push(tool);
    }
  };
  add(resolve(familySlugs));
  add(resolve(picks));

  /* Tools missing from the registry have no category of their own, so borrow
     the one their related links point at. */
  const categorySlug = current?.category ?? related[0]?.category;
  const fallbacks = categorySlug ? [categorySlug, ...(NEIGHBOUR_CATEGORIES[categorySlug] ?? [])] : [];
  for (const c of fallbacks) {
    if (related.length >= RELATED_COUNT) break;
    add(rank(tools.filter((t) => t.category === c), current));
  }
  if (related.length < RELATED_COUNT) add(rank(tools, current));

  const family = resolve(familySlugs).filter((t) => t.slug === slug || linkable(t.slug));
  const next = resolve(NEXT_STEPS[slug] ?? []).filter((t) => linkable(t.slug));

  const railSlugs = new Set(related.slice(0, 8).map((t) => t.slug));
  const popularOk = (t: Tool) => t.slug !== slug && !railSlugs.has(t.slug) && linkable(t.slug);
  const fixed = resolve(POPULAR_TOOLS).filter(popularOk);
  // Rotate through the pool from a point that depends on the page, so each
  // pool tool appears on a share of all pages (and the same ones every build)
  const pool = resolve(POPULAR_POOL).filter((t) => popularOk(t) && !fixed.includes(t));
  const start = pool.length ? hashSlug(slug) % pool.length : 0;
  const rotated = [...pool.slice(start), ...pool.slice(0, start)];
  const popular = [...fixed, ...rotated].slice(0, POPULAR_COUNT);

  const category = categorySlug ? CATEGORY_BY_SLUG.get(categorySlug) : undefined;

  return {
    slug,
    family: family.length > 2 ? family.map(toLink) : [],
    next: next.map(toLink),
    related: related.map(toLink),
    popular: popular.map(toLink),
    category: category && {
      slug: category.slug,
      name: category.name,
      count: tools.filter((t) => t.category === category.slug).length,
    },
    wide: WIDE_TOOLS.has(slug),
  };
}
