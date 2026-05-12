import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LogicGateCalculatorUI from "@/tools/logic-gate-calculator/ui";
import { logicGateCalculatorConfig } from "@/tools/logic-gate-calculator/config";

export const metadata: Metadata = {
  title: logicGateCalculatorConfig.seo.title,
  description: logicGateCalculatorConfig.seo.description,
  keywords: logicGateCalculatorConfig.seo.keywords,
  openGraph: {
    title: logicGateCalculatorConfig.seo.og.title,
    description: logicGateCalculatorConfig.seo.og.description,
    type: "website",
    url: logicGateCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: logicGateCalculatorConfig.seo.og.url,
  },
};

export default function LogicGateCalculatorPage() {
  return (
    <ToolLayout
      title={logicGateCalculatorConfig.name}
      description={logicGateCalculatorConfig.description}
      icon={logicGateCalculatorConfig.icon}
    >
      <LogicGateCalculatorUI />
    </ToolLayout>
  );
}
