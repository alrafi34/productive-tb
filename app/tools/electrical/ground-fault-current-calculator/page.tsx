import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GroundFaultCurrentCalculatorUI from "@/tools/ground-fault-current-calculator/ui";
import { groundFaultCurrentCalculatorConfig } from "@/tools/ground-fault-current-calculator/config";

export const metadata: Metadata = {
  title: groundFaultCurrentCalculatorConfig.seo.title,
  description: groundFaultCurrentCalculatorConfig.seo.description,
  keywords: groundFaultCurrentCalculatorConfig.seo.keywords,
  openGraph: {
    title: groundFaultCurrentCalculatorConfig.seo.og.title,
    description: groundFaultCurrentCalculatorConfig.seo.og.description,
    url: groundFaultCurrentCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function GroundFaultCurrentCalculatorPage() {
  return (
    <ToolLayout
      title={groundFaultCurrentCalculatorConfig.name}
      description={groundFaultCurrentCalculatorConfig.description}
      icon={groundFaultCurrentCalculatorConfig.icon}
    >
      <GroundFaultCurrentCalculatorUI />
    </ToolLayout>
  );
}