import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AirConditionerPowerCalculatorUI from "@/tools/air-conditioner-power-calculator/ui";
import { airConditionerPowerCalculatorConfig } from "@/tools/air-conditioner-power-calculator/config";

export const metadata: Metadata = {
  title: airConditionerPowerCalculatorConfig.seo.title,
  description: airConditionerPowerCalculatorConfig.seo.description,
  keywords: airConditionerPowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: airConditionerPowerCalculatorConfig.seo.og.title,
    description: airConditionerPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: airConditionerPowerCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: airConditionerPowerCalculatorConfig.seo.og.url,
  },
};

export default function AirConditionerPowerCalculatorPage() {
  return (
    <ToolLayout
      title={airConditionerPowerCalculatorConfig.name}
      description={airConditionerPowerCalculatorConfig.description}
      icon={airConditionerPowerCalculatorConfig.icon}
    >
      <AirConditionerPowerCalculatorUI />
    </ToolLayout>
  );
}
