import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import IdealGasLawCalculatorUI from "@/tools/ideal-gas-law-calculator/ui";
import { idealGasLawCalculatorConfig } from "@/tools/ideal-gas-law-calculator/config";

export const metadata: Metadata = {
  title: idealGasLawCalculatorConfig.seo.title,
  description: idealGasLawCalculatorConfig.seo.description,
  keywords: idealGasLawCalculatorConfig.seo.keywords,
  openGraph: {
    title: idealGasLawCalculatorConfig.seo.og.title,
    description: idealGasLawCalculatorConfig.seo.og.description,
    type: "website",
    url: idealGasLawCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: idealGasLawCalculatorConfig.seo.og.url,
  },
};

export default function IdealGasLawCalculatorPage() {
  return (
    <ToolLayout
      title={idealGasLawCalculatorConfig.name}
      description={idealGasLawCalculatorConfig.description}
      icon={idealGasLawCalculatorConfig.icon}
    >
      <IdealGasLawCalculatorUI />
    </ToolLayout>
  );
}
