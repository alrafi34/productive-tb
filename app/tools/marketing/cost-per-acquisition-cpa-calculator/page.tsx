import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CPACalculatorUI from "@/tools/cost-per-acquisition-cpa-calculator/ui";
import { costPerAcquisitionCpaCalculatorConfig as config } from "@/tools/cost-per-acquisition-cpa-calculator/config";

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

export default function CPACalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <CPACalculatorUI />
    </ToolLayout>
  );
}
