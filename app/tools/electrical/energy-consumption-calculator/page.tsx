import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import EnergyConsumptionCalculatorUI from "@/tools/energy-consumption-calculator/ui";
import { energyConsumptionCalculatorConfig } from "@/tools/energy-consumption-calculator/config";

export const metadata: Metadata = {
  title: energyConsumptionCalculatorConfig.seo.title,
  description: energyConsumptionCalculatorConfig.seo.description,
  keywords: energyConsumptionCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Energy+Consumption+Calculator", width: 1200, height: 630, alt: "Energy Consumption Calculator" }],
    title: energyConsumptionCalculatorConfig.seo.og.title,
    description: energyConsumptionCalculatorConfig.seo.og.description,
    type: "website",
    url: energyConsumptionCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: energyConsumptionCalculatorConfig.seo.og.title,
    description: energyConsumptionCalculatorConfig.seo.og.description,
    images: ["/og?title=Energy+Consumption+Calculator"],
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
