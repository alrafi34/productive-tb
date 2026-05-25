import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SMPSCalculatorUI from "@/tools/smps-calculator/ui";
import { smpsCalculatorConfig } from "@/tools/smps-calculator/config";

export const metadata: Metadata = {
  title: smpsCalculatorConfig.seo.title,
  description: smpsCalculatorConfig.seo.description,
  keywords: smpsCalculatorConfig.seo.keywords,
  openGraph: {
    title: smpsCalculatorConfig.seo.og.title,
    description: smpsCalculatorConfig.seo.og.description,
    url: smpsCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function SMPSCalculatorPage() {
  return (
    <ToolLayout
      title={smpsCalculatorConfig.name}
      description={smpsCalculatorConfig.description}
      icon={smpsCalculatorConfig.icon}
    >
      <SMPSCalculatorUI />
    </ToolLayout>
  );
}