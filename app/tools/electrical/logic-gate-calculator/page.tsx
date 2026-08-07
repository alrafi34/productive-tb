import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LogicGateCalculatorUI from "@/tools/logic-gate-calculator/ui";
import { logicGateCalculatorConfig } from "@/tools/logic-gate-calculator/config";

export const metadata: Metadata = {
  title: logicGateCalculatorConfig.seo.title,
  description: logicGateCalculatorConfig.seo.description,
  keywords: logicGateCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Logic+Gate+Calculator", width: 1200, height: 630, alt: "Logic Gate Calculator" }],
    title: logicGateCalculatorConfig.seo.og.title,
    description: logicGateCalculatorConfig.seo.og.description,
    type: "website",
    url: logicGateCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: logicGateCalculatorConfig.seo.og.title,
    description: logicGateCalculatorConfig.seo.og.description,
    images: ["/og?title=Logic+Gate+Calculator"],
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
