import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RealPowerCalculatorUI from "@/tools/real-power-calculator/ui";
import { realPowerCalculatorConfig } from "@/tools/real-power-calculator/config";

export const metadata: Metadata = {
  title: realPowerCalculatorConfig.seo.title,
  description: realPowerCalculatorConfig.seo.description,
  keywords: realPowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: realPowerCalculatorConfig.seo.og.title,
    description: realPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: realPowerCalculatorConfig.seo.og.url,
  },
};

export default function RealPowerCalculatorPage() {
  return (
    <ToolLayout
      title={realPowerCalculatorConfig.name}
      description={realPowerCalculatorConfig.description}
      icon={realPowerCalculatorConfig.icon}
    >
      <RealPowerCalculatorUI />
    </ToolLayout>
  );
}
