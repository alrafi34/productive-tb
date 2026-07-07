import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RevenueGrowthCalculatorUI from "@/tools/revenue-growth-calculator/ui";
import { revenueGrowthCalculatorConfig as config } from "@/tools/revenue-growth-calculator/config";

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

export default function RevenueGrowthCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <RevenueGrowthCalculatorUI />
    </ToolLayout>
  );
}
