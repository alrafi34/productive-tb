import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SEOScoreCalculatorUI from "@/tools/seo-score-calculator/ui";
import { seoScoreCalculatorConfig as config } from "@/tools/seo-score-calculator/config";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    ...config.seo.openGraph,
    type: "website",
  },
  alternates: {
    canonical: config.seo.openGraph.url,
  },
};

export default function SEOScoreCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <SEOScoreCalculatorUI />
    </ToolLayout>
  );
}
