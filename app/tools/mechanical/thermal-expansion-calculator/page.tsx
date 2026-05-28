import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ThermalExpansionCalculatorUI from "@/tools/thermal-expansion-calculator/ui";
import { thermalExpansionCalculatorConfig } from "@/tools/thermal-expansion-calculator/config";

export const metadata: Metadata = {
  title: thermalExpansionCalculatorConfig.seo.title,
  description: thermalExpansionCalculatorConfig.seo.description,
  keywords: thermalExpansionCalculatorConfig.seo.keywords,
  openGraph: {
    title: thermalExpansionCalculatorConfig.seo.og.title,
    description: thermalExpansionCalculatorConfig.seo.og.description,
    type: "website",
    url: thermalExpansionCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: thermalExpansionCalculatorConfig.seo.og.url,
  },
};

export default function ThermalExpansionCalculatorPage() {
  return (
    <ToolLayout
      title={thermalExpansionCalculatorConfig.name}
      description={thermalExpansionCalculatorConfig.description}
      icon={thermalExpansionCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <ThermalExpansionCalculatorUI />
    </ToolLayout>
  );
}
