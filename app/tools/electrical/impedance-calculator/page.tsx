import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImpedanceCalculatorUI from "@/tools/impedance-calculator/ui";
import { impedanceCalculatorConfig } from "@/tools/impedance-calculator/config";

export const metadata: Metadata = {
  title: impedanceCalculatorConfig.seo.title,
  description: impedanceCalculatorConfig.seo.description,
  keywords: impedanceCalculatorConfig.seo.keywords,
  openGraph: {
    title: impedanceCalculatorConfig.seo.og.title,
    description: impedanceCalculatorConfig.seo.og.description,
    type: "website",
    url: impedanceCalculatorConfig.seo.og.url,
  },
};

export default function ImpedanceCalculatorPage() {
  return (
    <ToolLayout
      title={impedanceCalculatorConfig.name}
      description={impedanceCalculatorConfig.description}
      icon={impedanceCalculatorConfig.icon}
    >
      <ImpedanceCalculatorUI />
    </ToolLayout>
  );
}
