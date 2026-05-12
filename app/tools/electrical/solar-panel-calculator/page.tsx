import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarPanelCalculatorUI from "@/tools/solar-panel-calculator/ui";
import { solarPanelCalculatorConfig } from "@/tools/solar-panel-calculator/config";

export const metadata: Metadata = {
  title: solarPanelCalculatorConfig.seo.title,
  description: solarPanelCalculatorConfig.seo.description,
  keywords: solarPanelCalculatorConfig.seo.keywords,
  openGraph: {
    title: solarPanelCalculatorConfig.seo.og.title,
    description: solarPanelCalculatorConfig.seo.og.description,
    type: "website",
    url: solarPanelCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: solarPanelCalculatorConfig.seo.og.url,
  },
};

export default function SolarPanelCalculatorPage() {
  return (
    <ToolLayout
      title={solarPanelCalculatorConfig.name}
      description={solarPanelCalculatorConfig.description}
      icon={solarPanelCalculatorConfig.icon}
    >
      <SolarPanelCalculatorUI />
    </ToolLayout>
  );
}
