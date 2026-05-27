import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MapScaleCalculatorUI from "@/tools/map-scale-calculator/ui";
import { mapScaleCalculatorConfig } from "@/tools/map-scale-calculator/config";

export const metadata: Metadata = {
  title: mapScaleCalculatorConfig.seo.title,
  description: mapScaleCalculatorConfig.seo.description,
  keywords: mapScaleCalculatorConfig.seo.keywords,
  openGraph: {
    title: mapScaleCalculatorConfig.seo.og.title,
    description: mapScaleCalculatorConfig.seo.og.description,
    type: "website",
    url: mapScaleCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: mapScaleCalculatorConfig.seo.og.url,
  },
};

export default function MapScaleCalculatorPage() {
  return (
    <ToolLayout
      title={mapScaleCalculatorConfig.name}
      description={mapScaleCalculatorConfig.description}
      icon={mapScaleCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <MapScaleCalculatorUI />
    </ToolLayout>
  );
}
