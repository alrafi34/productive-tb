import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import KeywordDensityCalculatorUI from "@/tools/keyword-density-calculator-seo/ui";
import { keywordDensityCalculatorSeoConfig as config } from "@/tools/keyword-density-calculator-seo/config";

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

export default function KeywordDensityCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <KeywordDensityCalculatorUI />
    </ToolLayout>
  );
}
