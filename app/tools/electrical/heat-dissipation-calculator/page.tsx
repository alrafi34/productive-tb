import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatDissipationCalculatorUI from "@/tools/heat-dissipation-calculator/ui";
import { heatDissipationCalculatorConfig } from "@/tools/heat-dissipation-calculator/config";

export const metadata: Metadata = {
  title: heatDissipationCalculatorConfig.seo.title,
  description: heatDissipationCalculatorConfig.seo.description,
  keywords: heatDissipationCalculatorConfig.seo.keywords,
  openGraph: {
    title: heatDissipationCalculatorConfig.seo.og.title,
    description: heatDissipationCalculatorConfig.seo.og.description,
    url: heatDissipationCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function HeatDissipationCalculatorPage() {
  return (
    <ToolLayout
      title={heatDissipationCalculatorConfig.name}
      description={heatDissipationCalculatorConfig.description}
      icon={heatDissipationCalculatorConfig.icon}
    >
      <HeatDissipationCalculatorUI />
    </ToolLayout>
  );
}