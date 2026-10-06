import type { Tool } from "@/config/tools";

export type Catalogue = { tools: Tool[]; categoryName: Map<string, string> };

/* The full tool list (~100 KB) for the search boxes, loaded when a search is
   first used rather than with the page. A static import would ship it with
   every page that renders a search box. Kept at module scope so the homepage
   hero and the header dialog share one fetch. */
let cataloguePromise: Promise<Catalogue> | null = null;
export function loadCatalogue(): Promise<Catalogue> {
  cataloguePromise ??= import("@/config/tools").then(({ tools, categories }) => ({
    tools,
    categoryName: new Map(categories.map(c => [c.slug, c.name])),
  }));
  return cataloguePromise;
}
