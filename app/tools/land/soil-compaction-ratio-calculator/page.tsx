import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SoilCompactionRatioCalculatorUI from "@/tools/soil-compaction-ratio-calculator/ui";
import { soilCompactionRatioCalculatorConfig } from "@/tools/soil-compaction-ratio-calculator/config";

export const metadata: Metadata = {
  title: soilCompactionRatioCalculatorConfig.seo.title,
  description: soilCompactionRatioCalculatorConfig.seo.description,
  keywords: soilCompactionRatioCalculatorConfig.seo.keywords,
  openGraph: {
    title: soilCompactionRatioCalculatorConfig.seo.og.title,
    description: soilCompactionRatioCalculatorConfig.seo.og.description,
    type: "website",
    url: soilCompactionRatioCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: soilCompactionRatioCalculatorConfig.seo.og.url,
  },
};

export default function SoilCompactionRatioCalculatorPage() {
  return (
    <ToolLayout
      title={soilCompactionRatioCalculatorConfig.name}
      description={soilCompactionRatioCalculatorConfig.description}
      icon={soilCompactionRatioCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <SoilCompactionRatioCalculatorUI />
    </ToolLayout>
  );
}
