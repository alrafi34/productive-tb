import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DACOutputCalculatorUI from "@/tools/dac-output-calculator/ui";
import { dacOutputCalculatorConfig } from "@/tools/dac-output-calculator/config";

export const metadata: Metadata = {
  title: dacOutputCalculatorConfig.seo.title,
  description: dacOutputCalculatorConfig.seo.description,
  keywords: dacOutputCalculatorConfig.seo.keywords,
  openGraph: {
    title: dacOutputCalculatorConfig.seo.og.title,
    description: dacOutputCalculatorConfig.seo.og.description,
    type: "website",
    url: dacOutputCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: dacOutputCalculatorConfig.seo.og.url,
  },
};

export default function DACOutputCalculatorPage() {
  return (
    <ToolLayout
      title={dacOutputCalculatorConfig.name}
      description={dacOutputCalculatorConfig.description}
      icon={dacOutputCalculatorConfig.icon}
    >
      <DACOutputCalculatorUI />
    </ToolLayout>
  );
}
