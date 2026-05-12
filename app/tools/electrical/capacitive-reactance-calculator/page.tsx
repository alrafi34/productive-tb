import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CapacitiveReactanceCalculatorUI from "@/tools/capacitive-reactance-calculator/ui";
import { capacitiveReactanceCalculatorConfig } from "@/tools/capacitive-reactance-calculator/config";

export const metadata: Metadata = {
  title: capacitiveReactanceCalculatorConfig.seo.title,
  description: capacitiveReactanceCalculatorConfig.seo.description,
  keywords: capacitiveReactanceCalculatorConfig.seo.keywords,
  openGraph: {
    title: capacitiveReactanceCalculatorConfig.seo.og.title,
    description: capacitiveReactanceCalculatorConfig.seo.og.description,
    type: "website",
    url: capacitiveReactanceCalculatorConfig.seo.og.url,
  },
};

export default function CapacitiveReactanceCalculatorPage() {
  return (
    <ToolLayout
      title={capacitiveReactanceCalculatorConfig.name}
      description={capacitiveReactanceCalculatorConfig.description}
      icon={capacitiveReactanceCalculatorConfig.icon}
    >
      <CapacitiveReactanceCalculatorUI />
    </ToolLayout>
  );
}
