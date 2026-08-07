import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SeriesResistorCalculatorUI from "@/tools/series-resistor-calculator/ui";
import { seriesResistorCalculatorConfig } from "@/tools/series-resistor-calculator/config";

export const metadata: Metadata = {
  title: seriesResistorCalculatorConfig.seo.title,
  description: seriesResistorCalculatorConfig.seo.description,
  keywords: seriesResistorCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Series+Resistor+Calculator", width: 1200, height: 630, alt: "Series Resistor Calculator" }],
    title: seriesResistorCalculatorConfig.seo.og.title,
    description: seriesResistorCalculatorConfig.seo.og.description,
    type: "website",
    url: seriesResistorCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: seriesResistorCalculatorConfig.seo.og.title,
    description: seriesResistorCalculatorConfig.seo.og.description,
    images: ["/og?title=Series+Resistor+Calculator"],
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
