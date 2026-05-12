import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SeriesResistorCalculatorUI from "@/tools/series-resistor-calculator/ui";
import { seriesResistorCalculatorConfig } from "@/tools/series-resistor-calculator/config";

export const metadata: Metadata = {
  title: seriesResistorCalculatorConfig.seo.title,
  description: seriesResistorCalculatorConfig.seo.description,
  keywords: seriesResistorCalculatorConfig.seo.keywords,
  openGraph: {
    title: seriesResistorCalculatorConfig.seo.og.title,
    description: seriesResistorCalculatorConfig.seo.og.description,
    type: "website",
    url: seriesResistorCalculatorConfig.seo.og.url,
  },
};

export default function SeriesResistorCalculatorPage() {
  return (
    <ToolLayout
      title={seriesResistorCalculatorConfig.name}
      description={seriesResistorCalculatorConfig.description}
      icon={seriesResistorCalculatorConfig.icon}
    >
      <SeriesResistorCalculatorUI />
    </ToolLayout>
  );
}
