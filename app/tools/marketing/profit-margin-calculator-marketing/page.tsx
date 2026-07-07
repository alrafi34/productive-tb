import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ProfitMarginCalculatorUI from "@/tools/profit-margin-calculator-marketing/ui";
import { profitMarginCalculatorMarketingConfig as config } from "@/tools/profit-margin-calculator-marketing/config";

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

export default function ProfitMarginCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <ProfitMarginCalculatorUI />
    </ToolLayout>
  );
}
