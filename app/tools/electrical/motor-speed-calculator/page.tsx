import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MotorSpeedCalculatorUI from "@/tools/motor-speed-calculator/ui";
import { motorSpeedCalculatorConfig } from "@/tools/motor-speed-calculator/config";

export const metadata: Metadata = {
  title: motorSpeedCalculatorConfig.seo.title,
  description: motorSpeedCalculatorConfig.seo.description,
  keywords: motorSpeedCalculatorConfig.seo.keywords,
  openGraph: {
    title: motorSpeedCalculatorConfig.seo.og.title,
    description: motorSpeedCalculatorConfig.seo.og.description,
    type: "website",
    url: motorSpeedCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: motorSpeedCalculatorConfig.seo.og.url,
  },
};

export default function MotorSpeedCalculatorPage() {
  return (
    <ToolLayout
      title={motorSpeedCalculatorConfig.name}
      description={motorSpeedCalculatorConfig.description}
      icon={motorSpeedCalculatorConfig.icon}
    >
      <MotorSpeedCalculatorUI />
    </ToolLayout>
  );
}
