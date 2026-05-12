import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarInverterCalculatorUI from "@/tools/solar-inverter-calculator/ui";
import { solarInverterCalculatorConfig } from "@/tools/solar-inverter-calculator/config";

export const metadata: Metadata = {
  title: solarInverterCalculatorConfig.seo.title,
  description: solarInverterCalculatorConfig.seo.description,
  keywords: solarInverterCalculatorConfig.seo.keywords,
  openGraph: {
    title: solarInverterCalculatorConfig.seo.og.title,
    description: solarInverterCalculatorConfig.seo.og.description,
    type: "website",
    url: solarInverterCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: solarInverterCalculatorConfig.seo.og.url,
  },
};

export default function SolarInverterCalculatorPage() {
  return (
    <ToolLayout
      title={solarInverterCalculatorConfig.name}
      description={solarInverterCalculatorConfig.description}
      icon={solarInverterCalculatorConfig.icon}
    >
      <SolarInverterCalculatorUI />
    </ToolLayout>
  );
}
