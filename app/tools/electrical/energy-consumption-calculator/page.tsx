import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import EnergyConsumptionCalculatorUI from "@/tools/energy-consumption-calculator/ui";
import { energyConsumptionCalculatorConfig } from "@/tools/energy-consumption-calculator/config";

export const metadata: Metadata = {
  title: energyConsumptionCalculatorConfig.seo.title,
  description: energyConsumptionCalculatorConfig.seo.description,
  keywords: energyConsumptionCalculatorConfig.seo.keywords,
  openGraph: {
    title: energyConsumptionCalculatorConfig.seo.og.title,
    description: energyConsumptionCalculatorConfig.seo.og.description,
    type: "website",
    url: energyConsumptionCalculatorConfig.seo.og.url,
  },
};

export default function EnergyConsumptionCalculatorPage() {
  return (
    <ToolLayout
      title={energyConsumptionCalculatorConfig.name}
      description={energyConsumptionCalculatorConfig.description}
      icon={energyConsumptionCalculatorConfig.icon}
    >
      <EnergyConsumptionCalculatorUI />
    </ToolLayout>
  );
}
