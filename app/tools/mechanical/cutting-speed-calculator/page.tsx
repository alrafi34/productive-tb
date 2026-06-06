import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CuttingSpeedCalculatorUI from "@/tools/cutting-speed-calculator/ui";
import { cuttingSpeedCalculatorConfig } from "@/tools/cutting-speed-calculator/config";

export const metadata: Metadata = {
  title: cuttingSpeedCalculatorConfig.seo.title,
  description: cuttingSpeedCalculatorConfig.seo.description,
  keywords: cuttingSpeedCalculatorConfig.seo.keywords,
  openGraph: {
    title: cuttingSpeedCalculatorConfig.seo.og.title,
    description: cuttingSpeedCalculatorConfig.seo.og.description,
    type: "website",
    url: cuttingSpeedCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: cuttingSpeedCalculatorConfig.seo.og.url,
  },
};

export default function CuttingSpeedCalculatorPage() {
  return (
    <ToolLayout
      title={cuttingSpeedCalculatorConfig.name}
      description={cuttingSpeedCalculatorConfig.description}
      icon={cuttingSpeedCalculatorConfig.icon}
    >
      <CuttingSpeedCalculatorUI />
    </ToolLayout>
  );
}
