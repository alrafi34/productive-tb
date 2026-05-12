import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SlipCalculatorUI from "@/tools/slip-calculator/ui";
import { slipCalculatorConfig } from "@/tools/slip-calculator/config";

export const metadata: Metadata = {
  title: slipCalculatorConfig.seo.title,
  description: slipCalculatorConfig.seo.description,
  keywords: slipCalculatorConfig.seo.keywords,
  openGraph: {
    title: slipCalculatorConfig.seo.og.title,
    description: slipCalculatorConfig.seo.og.description,
    type: "website",
    url: slipCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: slipCalculatorConfig.seo.og.url,
  },
};

export default function SlipCalculatorPage() {
  return (
    <ToolLayout
      title={slipCalculatorConfig.name}
      description={slipCalculatorConfig.description}
      icon={slipCalculatorConfig.icon}
    >
      <SlipCalculatorUI />
    </ToolLayout>
  );
}
