import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ElectricMotorPowerCalculatorUI from "@/tools/electric-motor-power-calculator/ui";
import { electricMotorPowerCalculatorConfig } from "@/tools/electric-motor-power-calculator/config";

export const metadata: Metadata = {
  title: electricMotorPowerCalculatorConfig.seo.title,
  description: electricMotorPowerCalculatorConfig.seo.description,
  keywords: electricMotorPowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: electricMotorPowerCalculatorConfig.seo.og.title,
    description: electricMotorPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: electricMotorPowerCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: electricMotorPowerCalculatorConfig.seo.og.url,
  },
};

export default function ElectricMotorPowerCalculatorPage() {
  return (
    <ToolLayout
      title={electricMotorPowerCalculatorConfig.name}
      description={electricMotorPowerCalculatorConfig.description}
      icon={electricMotorPowerCalculatorConfig.icon}
    >
      <ElectricMotorPowerCalculatorUI />
    </ToolLayout>
  );
}
