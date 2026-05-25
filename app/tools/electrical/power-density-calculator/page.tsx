import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PowerDensityCalculatorUI from "@/tools/power-density-calculator/ui";
import { powerDensityCalculatorConfig } from "@/tools/power-density-calculator/config";

export const metadata: Metadata = {
  title: powerDensityCalculatorConfig.seo.title,
  description: powerDensityCalculatorConfig.seo.description,
  keywords: powerDensityCalculatorConfig.seo.keywords,
  openGraph: {
    title: powerDensityCalculatorConfig.seo.og.title,
    description: powerDensityCalculatorConfig.seo.og.description,
    url: powerDensityCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function PowerDensityCalculatorPage() {
  return (
    <ToolLayout
      title={powerDensityCalculatorConfig.name}
      description={powerDensityCalculatorConfig.description}
      icon={powerDensityCalculatorConfig.icon}
      category={{ slug: "electrical", name: "Electrical" }}
    >
      <PowerDensityCalculatorUI />
    </ToolLayout>
  );
}