import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FlowRateCalculatorUI from "@/tools/flow-rate-calculator/ui";
import { flowRateCalculatorConfig } from "@/tools/flow-rate-calculator/config";

export const metadata: Metadata = {
  title: flowRateCalculatorConfig.seo.title,
  description: flowRateCalculatorConfig.seo.description,
  keywords: flowRateCalculatorConfig.seo.keywords,
  openGraph: {
    title: flowRateCalculatorConfig.seo.og.title,
    description: flowRateCalculatorConfig.seo.og.description,
    type: "website",
    url: flowRateCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: flowRateCalculatorConfig.seo.og.url,
  },
};

export default function FlowRateCalculatorPage() {
  return (
    <ToolLayout
      title={flowRateCalculatorConfig.name}
      description={flowRateCalculatorConfig.description}
      icon={flowRateCalculatorConfig.icon}
    >
      <FlowRateCalculatorUI />
    </ToolLayout>
  );
}
