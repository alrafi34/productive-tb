import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SustainabilityIndexCalculatorUI from "@/tools/sustainability-index-calculator/ui";
import { sustainabilityIndexCalculatorConfig } from "@/tools/sustainability-index-calculator/config";

export const metadata: Metadata = {
  title: sustainabilityIndexCalculatorConfig.seo.title,
  description: sustainabilityIndexCalculatorConfig.seo.description,
  keywords: sustainabilityIndexCalculatorConfig.seo.keywords,
  openGraph: {
    title: sustainabilityIndexCalculatorConfig.seo.og.title,
    description: sustainabilityIndexCalculatorConfig.seo.og.description,
    type: "website",
    url: sustainabilityIndexCalculatorConfig.seo.og.url,
  },
};

export default function SustainabilityIndexCalculatorPage() {
  return (
    <ToolLayout
      title={sustainabilityIndexCalculatorConfig.name}
      description={sustainabilityIndexCalculatorConfig.description}
      icon={sustainabilityIndexCalculatorConfig.icon}
    >
      <SustainabilityIndexCalculatorUI />
    </ToolLayout>
  );
}
