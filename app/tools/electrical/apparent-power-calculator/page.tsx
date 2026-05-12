import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ApparentPowerCalculatorUI from "@/tools/apparent-power-calculator/ui";
import { apparentPowerCalculatorConfig } from "@/tools/apparent-power-calculator/config";

export const metadata: Metadata = {
  title: apparentPowerCalculatorConfig.seo.title,
  description: apparentPowerCalculatorConfig.seo.description,
  keywords: apparentPowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: apparentPowerCalculatorConfig.seo.og.title,
    description: apparentPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: apparentPowerCalculatorConfig.seo.og.url,
  },
};

export default function ApparentPowerCalculatorPage() {
  return (
    <ToolLayout
      title={apparentPowerCalculatorConfig.name}
      description={apparentPowerCalculatorConfig.description}
      icon={apparentPowerCalculatorConfig.icon}
    >
      <ApparentPowerCalculatorUI />
    </ToolLayout>
  );
}
