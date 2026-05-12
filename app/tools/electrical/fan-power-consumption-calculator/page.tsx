import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FanPowerConsumptionCalculatorUI from "@/tools/fan-power-consumption-calculator/ui";
import { fanPowerConsumptionCalculatorConfig } from "@/tools/fan-power-consumption-calculator/config";

export const metadata: Metadata = {
  title: fanPowerConsumptionCalculatorConfig.seo.title,
  description: fanPowerConsumptionCalculatorConfig.seo.description,
  keywords: fanPowerConsumptionCalculatorConfig.seo.keywords,
  openGraph: {
    title: fanPowerConsumptionCalculatorConfig.seo.og.title,
    description: fanPowerConsumptionCalculatorConfig.seo.og.description,
    type: "website",
    url: fanPowerConsumptionCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: fanPowerConsumptionCalculatorConfig.seo.og.url,
  },
};

export default function FanPowerConsumptionCalculatorPage() {
  return (
    <ToolLayout
      title={fanPowerConsumptionCalculatorConfig.name}
      description={fanPowerConsumptionCalculatorConfig.description}
      icon={fanPowerConsumptionCalculatorConfig.icon}
    >
      <FanPowerConsumptionCalculatorUI />
    </ToolLayout>
  );
}
