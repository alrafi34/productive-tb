import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PowerSupplyCalculatorUI from "@/tools/power-supply-calculator/ui";
import { powerSupplyCalculatorConfig } from "@/tools/power-supply-calculator/config";

export const metadata: Metadata = {
  title: powerSupplyCalculatorConfig.seo.title,
  description: powerSupplyCalculatorConfig.seo.description,
  keywords: powerSupplyCalculatorConfig.seo.keywords,
  openGraph: {
    title: powerSupplyCalculatorConfig.seo.og.title,
    description: powerSupplyCalculatorConfig.seo.og.description,
    url: powerSupplyCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function PowerSupplyCalculatorPage() {
  return (
    <ToolLayout
      title={powerSupplyCalculatorConfig.name}
      description={powerSupplyCalculatorConfig.description}
      icon={powerSupplyCalculatorConfig.icon}
    >
      <PowerSupplyCalculatorUI />
    </ToolLayout>
  );
}