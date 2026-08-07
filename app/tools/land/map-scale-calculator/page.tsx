import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MapScaleCalculatorUI from "@/tools/map-scale-calculator/ui";
import { mapScaleCalculatorConfig } from "@/tools/map-scale-calculator/config";

export const metadata: Metadata = {
  title: mapScaleCalculatorConfig.seo.title,
  description: mapScaleCalculatorConfig.seo.description,
  keywords: mapScaleCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Map+Scale+Calculator", width: 1200, height: 630, alt: "Map Scale Calculator" }],
    title: mapScaleCalculatorConfig.seo.og.title,
    description: mapScaleCalculatorConfig.seo.og.description,
    type: "website",
    url: mapScaleCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: mapScaleCalculatorConfig.seo.og.title,
    description: mapScaleCalculatorConfig.seo.og.description,
    images: ["/og?title=Map+Scale+Calculator"],
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
