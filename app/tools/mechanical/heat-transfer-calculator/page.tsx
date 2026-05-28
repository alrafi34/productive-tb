import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatTransferCalculatorUI from "@/tools/heat-transfer-calculator/ui";
import { heatTransferCalculatorConfig } from "@/tools/heat-transfer-calculator/config";

export const metadata: Metadata = {
  title: heatTransferCalculatorConfig.seo.title,
  description: heatTransferCalculatorConfig.seo.description,
  keywords: heatTransferCalculatorConfig.seo.keywords,
  openGraph: {
    title: heatTransferCalculatorConfig.seo.og.title,
    description: heatTransferCalculatorConfig.seo.og.description,
    type: "website",
    url: heatTransferCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: heatTransferCalculatorConfig.seo.og.url,
  },
};

export default function HeatTransferCalculatorPage() {
  return (
    <ToolLayout
      title={heatTransferCalculatorConfig.name}
      description={heatTransferCalculatorConfig.description}
      icon={heatTransferCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <HeatTransferCalculatorUI />
    </ToolLayout>
  );
}
