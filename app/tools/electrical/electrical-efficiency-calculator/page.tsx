import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ElectricalEfficiencyCalculatorUI from "@/tools/electrical-efficiency-calculator/ui";
import { electricalEfficiencyCalculatorConfig } from "@/tools/electrical-efficiency-calculator/config";

export const metadata: Metadata = {
  title: electricalEfficiencyCalculatorConfig.seo.title,
  description: electricalEfficiencyCalculatorConfig.seo.description,
  keywords: electricalEfficiencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: electricalEfficiencyCalculatorConfig.seo.og.title,
    description: electricalEfficiencyCalculatorConfig.seo.og.description,
    url: electricalEfficiencyCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function ElectricalEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title={electricalEfficiencyCalculatorConfig.name}
      description={electricalEfficiencyCalculatorConfig.description}
      icon={electricalEfficiencyCalculatorConfig.icon}
      category={{ slug: "electrical", name: "Electrical" }}
    >
      <ElectricalEfficiencyCalculatorUI />
    </ToolLayout>
  );
}