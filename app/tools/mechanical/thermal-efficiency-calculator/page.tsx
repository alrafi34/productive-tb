import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ThermalEfficiencyCalculatorUI from "@/tools/thermal-efficiency-calculator/ui";
import { thermalEfficiencyCalculatorConfig } from "@/tools/thermal-efficiency-calculator/config";

export const metadata: Metadata = {
  title: thermalEfficiencyCalculatorConfig.seo.title,
  description: thermalEfficiencyCalculatorConfig.seo.description,
  keywords: thermalEfficiencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: thermalEfficiencyCalculatorConfig.seo.og.title,
    description: thermalEfficiencyCalculatorConfig.seo.og.description,
    type: "website",
    url: thermalEfficiencyCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: thermalEfficiencyCalculatorConfig.seo.og.url,
  },
};

export default function ThermalEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title={thermalEfficiencyCalculatorConfig.name}
      description={thermalEfficiencyCalculatorConfig.description}
      icon={thermalEfficiencyCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <ThermalEfficiencyCalculatorUI />
    </ToolLayout>
  );
}
