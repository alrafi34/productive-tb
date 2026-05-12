import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InductorCalculatorUI from "@/tools/inductor-calculator/ui";
import { inductorCalculatorConfig } from "@/tools/inductor-calculator/config";

export const metadata: Metadata = {
  title: inductorCalculatorConfig.seo.title,
  description: inductorCalculatorConfig.seo.description,
  keywords: inductorCalculatorConfig.seo.keywords,
  openGraph: {
    title: inductorCalculatorConfig.seo.og.title,
    description: inductorCalculatorConfig.seo.og.description,
    type: "website",
    url: inductorCalculatorConfig.seo.og.url,
  },
};

export default function InductorCalculatorPage() {
  return (
    <ToolLayout
      title={inductorCalculatorConfig.name}
      description={inductorCalculatorConfig.description}
      icon={inductorCalculatorConfig.icon}
    >
      <InductorCalculatorUI />
    </ToolLayout>
  );
}
