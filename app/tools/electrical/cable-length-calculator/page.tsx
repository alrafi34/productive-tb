import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CableLengthCalculatorUI from "@/tools/cable-length-calculator/ui";
import { cableLengthCalculatorConfig } from "@/tools/cable-length-calculator/config";

export const metadata: Metadata = {
  title: cableLengthCalculatorConfig.seo.title,
  description: cableLengthCalculatorConfig.seo.description,
  keywords: cableLengthCalculatorConfig.seo.keywords,
  openGraph: {
    title: cableLengthCalculatorConfig.seo.og.title,
    description: cableLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: cableLengthCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: cableLengthCalculatorConfig.seo.og.url,
  },
};

export default function CableLengthCalculatorPage() {
  return (
    <ToolLayout
      title={cableLengthCalculatorConfig.name}
      description={cableLengthCalculatorConfig.description}
      icon={cableLengthCalculatorConfig.icon}
    >
      <CableLengthCalculatorUI />
    </ToolLayout>
  );
}
