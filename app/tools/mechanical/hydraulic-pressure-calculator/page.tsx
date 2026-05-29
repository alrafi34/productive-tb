import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HydraulicPressureCalculatorUI from "@/tools/hydraulic-pressure-calculator/ui";
import { hydraulicPressureCalculatorConfig } from "@/tools/hydraulic-pressure-calculator/config";

export const metadata: Metadata = {
  title: hydraulicPressureCalculatorConfig.seo.title,
  description: hydraulicPressureCalculatorConfig.seo.description,
  keywords: hydraulicPressureCalculatorConfig.seo.keywords,
  openGraph: {
    title: hydraulicPressureCalculatorConfig.seo.og.title,
    description: hydraulicPressureCalculatorConfig.seo.og.description,
    type: "website",
    url: hydraulicPressureCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: hydraulicPressureCalculatorConfig.seo.og.url,
  },
};

export default function HydraulicPressureCalculatorPage() {
  return (
    <ToolLayout
      title={hydraulicPressureCalculatorConfig.name}
      description={hydraulicPressureCalculatorConfig.description}
      icon={hydraulicPressureCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <HydraulicPressureCalculatorUI />
    </ToolLayout>
  );
}
