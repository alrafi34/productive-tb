import { notFound, permanentRedirect } from "next/navigation";
import { tools } from "@/config/tools";

/*
 * Every tool has its own static route, app/tools/<category>/<slug>/page.tsx
 * (#3, #14), which Next matches before this one. What reaches this route is a
 * tool URL under the wrong category (an old or mistyped link): it redirects
 * to the tool's canonical URL, as the former shared tool route did, and
 * anything else is a 404.
 */

function canonicalCategory(slug: string): string | undefined {
  return tools.find((t) => t.slug === slug)?.category;
}

export default async function WrongCategoryRedirect({
  params,
}: {
  params: Promise<{ tool: string; subtool: string }>;
}) {
  const { tool: category, subtool: slug } = await params;
  const canonical = canonicalCategory(slug);
  if (!canonical || canonical === category) notFound();
  permanentRedirect(`/tools/${canonical}/${slug}`);
}
