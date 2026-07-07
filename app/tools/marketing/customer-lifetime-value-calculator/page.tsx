import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CLVCalculatorUI from "@/tools/customer-lifetime-value-calculator/ui";
import { customerLifetimeValueCalculatorConfig as config } from "@/tools/customer-lifetime-value-calculator/config";

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

export default function CLVCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <CLVCalculatorUI />
    </ToolLayout>
  );
}
