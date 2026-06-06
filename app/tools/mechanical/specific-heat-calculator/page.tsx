import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SpecificHeatCalculatorUI from "@/tools/specific-heat-calculator/ui";
import { specificHeatCalculatorConfig } from "@/tools/specific-heat-calculator/config";

export const metadata: Metadata = {
  title: specificHeatCalculatorConfig.seo.title,
  description: specificHeatCalculatorConfig.seo.description,
  keywords: specificHeatCalculatorConfig.seo.keywords,
  openGraph: {
    title: specificHeatCalculatorConfig.seo.og.title,
    description: specificHeatCalculatorConfig.seo.og.description,
    type: "website",
    url: specificHeatCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: specificHeatCalculatorConfig.seo.og.url,
  },
};

export default function SpecificHeatCalculatorPage() {
  return (
    <ToolLayout
      title={specificHeatCalculatorConfig.name}
      description={specificHeatCalculatorConfig.description}
      icon={specificHeatCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <SpecificHeatCalculatorUI />
    </ToolLayout>
  );
}
