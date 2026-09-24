import { tools, categories } from "@/config/tools";
import HeaderClient, { type HeaderCategory } from "@/components/HeaderClient";

/* Server wrapper: the category menu needs names and counts from the catalogue,
   but the header renders on every page. Resolving them here sends 19 small
   objects as props instead of shipping the whole catalogue to the browser.
   Only server components import this file — keep it that way. */
const countByCategory = tools.reduce<Record<string, number>>((acc, t) => {
  acc[t.category] = (acc[t.category] ?? 0) + 1;
  return acc;
}, {});

/* Biggest first, matching the footer. */
const HEADER_CATEGORIES: HeaderCategory[] = categories
  .map(c => ({ slug: c.slug, name: c.name, icon: c.icon, count: countByCategory[c.slug] ?? 0 }))
  .sort((a, b) => b.count - a.count);

export default function Header() {
  return <HeaderClient categories={HEADER_CATEGORIES} totalTools={tools.length} />;
}
