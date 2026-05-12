import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MotorEfficiencyCalculatorUI from "@/tools/motor-efficiency-calculator/ui";
import { motorEfficiencyCalculatorConfig } from "@/tools/motor-efficiency-calculator/config";

export const metadata: Metadata = {
  title: motorEfficiencyCalculatorConfig.seo.title,
  description: motorEfficiencyCalculatorConfig.seo.description,
  keywords: motorEfficiencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: motorEfficiencyCalculatorConfig.seo.og.title,
    description: motorEfficiencyCalculatorConfig.seo.og.description,
    type: "website",
    url: motorEfficiencyCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: motorEfficiencyCalculatorConfig.seo.og.url,
  },
};

export default function MotorEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title={motorEfficiencyCalculatorConfig.name}
      description={motorEfficiencyCalculatorConfig.description}
      icon={motorEfficiencyCalculatorConfig.icon}
    >
      <MotorEfficiencyCalculatorUI />
    </ToolLayout>
  );
}
