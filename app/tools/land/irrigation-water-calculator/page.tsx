import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import IrrigationWaterCalculatorUI from "@/tools/irrigation-water-calculator/ui";
import { irrigationWaterCalculatorConfig } from "@/tools/irrigation-water-calculator/config";

export const metadata: Metadata = {
  title: irrigationWaterCalculatorConfig.seo.title,
  description: irrigationWaterCalculatorConfig.seo.description,
  keywords: irrigationWaterCalculatorConfig.seo.keywords,
  openGraph: {
    title: irrigationWaterCalculatorConfig.seo.og.title,
    description: irrigationWaterCalculatorConfig.seo.og.description,
    type: "website",
    url: irrigationWaterCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: irrigationWaterCalculatorConfig.seo.og.url,
  },
};

export default function IrrigationWaterCalculatorPage() {
  return (
    <ToolLayout
      title={irrigationWaterCalculatorConfig.name}
      description={irrigationWaterCalculatorConfig.description}
      icon={irrigationWaterCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <IrrigationWaterCalculatorUI />
    </ToolLayout>
  );
}
