import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SoilCompactionRatioCalculatorUI from "@/tools/soil-compaction-ratio-calculator/ui";
import { soilCompactionRatioCalculatorConfig } from "@/tools/soil-compaction-ratio-calculator/config";

export const metadata: Metadata = {
  title: soilCompactionRatioCalculatorConfig.seo.title,
  description: soilCompactionRatioCalculatorConfig.seo.description,
  keywords: soilCompactionRatioCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Soil+Compaction+Ratio+Calculator", width: 1200, height: 630, alt: "Soil Compaction Ratio Calculator" }],
    title: soilCompactionRatioCalculatorConfig.seo.og.title,
    description: soilCompactionRatioCalculatorConfig.seo.og.description,
    type: "website",
    url: soilCompactionRatioCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: soilCompactionRatioCalculatorConfig.seo.og.title,
    description: soilCompactionRatioCalculatorConfig.seo.og.description,
    images: ["/og?title=Soil+Compaction+Ratio+Calculator"],
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
