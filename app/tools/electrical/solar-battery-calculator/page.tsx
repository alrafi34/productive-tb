import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarBatteryCalculatorUI from "@/tools/solar-battery-calculator/ui";
import { solarBatteryCalculatorConfig } from "@/tools/solar-battery-calculator/config";

export const metadata: Metadata = {
  title: solarBatteryCalculatorConfig.seo.title,
  description: solarBatteryCalculatorConfig.seo.description,
  keywords: solarBatteryCalculatorConfig.seo.keywords,
  openGraph: {
    title: solarBatteryCalculatorConfig.seo.og.title,
    description: solarBatteryCalculatorConfig.seo.og.description,
    type: "website",
    url: solarBatteryCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: solarBatteryCalculatorConfig.seo.og.url,
  },
};

export default function SolarBatteryCalculatorPage() {
  return (
    <ToolLayout
      title={solarBatteryCalculatorConfig.name}
      description={solarBatteryCalculatorConfig.description}
      icon={solarBatteryCalculatorConfig.icon}
    >
      <SolarBatteryCalculatorUI />
    </ToolLayout>
  );
}
