import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ExcavationCostCalculatorUI from "@/tools/excavation-cost-calculator/ui";
import { excavationCostCalculatorConfig } from "@/tools/excavation-cost-calculator/config";

export const metadata: Metadata = {
  title: excavationCostCalculatorConfig.seo.title,
  description: excavationCostCalculatorConfig.seo.description,
  keywords: excavationCostCalculatorConfig.seo.keywords,
  openGraph: {
    title: excavationCostCalculatorConfig.seo.og.title,
    description: excavationCostCalculatorConfig.seo.og.description,
    type: "website",
    url: excavationCostCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: excavationCostCalculatorConfig.seo.og.url,
  },
};

export default function ExcavationCostCalculatorPage() {
  return (
    <ToolLayout
      title={excavationCostCalculatorConfig.name}
      description={excavationCostCalculatorConfig.description}
      icon={excavationCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <ExcavationCostCalculatorUI />
    </ToolLayout>
  );
}
