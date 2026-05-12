import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RFPowerCalculatorUI from "@/tools/rf-power-calculator/ui";
import { rfPowerCalculatorConfig } from "@/tools/rf-power-calculator/config";

export const metadata: Metadata = {
  title: rfPowerCalculatorConfig.seo.title,
  description: rfPowerCalculatorConfig.seo.description,
  keywords: rfPowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: rfPowerCalculatorConfig.seo.og.title,
    description: rfPowerCalculatorConfig.seo.og.description,
    url: rfPowerCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function RFPowerCalculatorPage() {
  return (
    <ToolLayout
      title={rfPowerCalculatorConfig.name}
      description={rfPowerCalculatorConfig.description}
      icon={rfPowerCalculatorConfig.icon}
    >
      <RFPowerCalculatorUI />
    </ToolLayout>
  );
}
