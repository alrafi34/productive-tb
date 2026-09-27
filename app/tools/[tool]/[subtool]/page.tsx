import { notFound, permanentRedirect } from "next/navigation";
import { tools } from "@/config/tools";
import { tipCalculatorConfig } from "@/tools/tip-calculator/config";
import { toolConfig as romanNumeralConverterConfig } from "@/tools/roman-numeral-converter/config";
import { roiCalculatorMarketingConfig } from "@/tools/roi-calculator-marketing/config";

/*
 * Every tool has its own static route, app/tools/<category>/<slug>/page.tsx
 * (#3, #14), which Next matches before this one. What reaches this route is a
 * tool URL under the wrong category (an old or mistyped link): it redirects
 * to the tool's canonical URL, as the former shared tool route did, and
 * anything else is a 404.
 */

// Live but unregistered (ALLOW_UNREGISTERED in scripts/check-tools.mjs)
const UNREGISTERED = [tipCalculatorConfig, romanNumeralConverterConfig, roiCalculatorMarketingConfig];

function canonicalCategory(slug: string): string | undefined {
  return (
    tools.find((t) => t.slug === slug)?.category ??
    UNREGISTERED.find((c) => c.slug === slug)?.category
  );
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
