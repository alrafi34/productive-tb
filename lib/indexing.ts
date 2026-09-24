import type { Metadata } from "next";
import { NOINDEX_TOOLS } from "@/config/noindex";

/* Spread into a tool route's metadata. Indexed tools get nothing, so they keep
   inheriting the root layout's robots — including googleBot's
   max-image-preview:large and max-snippet:-1, which a bare { index, follow }
   here would silently drop (Next replaces the robots object, never merges). */
export function toolRobots(slug: string): Pick<Metadata, "robots"> {
  return NOINDEX_TOOLS.has(slug) ? { robots: { index: false, follow: true } } : {};
}
