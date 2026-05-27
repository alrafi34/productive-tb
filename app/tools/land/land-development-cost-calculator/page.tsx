import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandDevelopmentCostCalculatorUI from "@/tools/land-development-cost-calculator/ui";
import { landDevelopmentCostCalculatorConfig } from "@/tools/land-development-cost-calculator/config";

export const metadata: Metadata = {
  title: landDevelopmentCostCalculatorConfig.seo.title,
  description: landDevelopmentCostCalculatorConfig.seo.description,
  keywords: landDevelopmentCostCalculatorConfig.seo.keywords,
  openGraph: {
    title: landDevelopmentCostCalculatorConfig.seo.og.title,
    description: landDevelopmentCostCalculatorConfig.seo.og.description,
    type: "website",
    url: landDevelopmentCostCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: landDevelopmentCostCalculatorConfig.seo.og.url,
  },
};

export default function LandDevelopmentCostCalculatorPage() {
  return (
    <ToolLayout
      title={landDevelopmentCostCalculatorConfig.name}
      description={landDevelopmentCostCalculatorConfig.description}
      icon={landDevelopmentCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandDevelopmentCostCalculatorUI />
    </ToolLayout>
  );
}
