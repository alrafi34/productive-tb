import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SoilVolumeCalculatorUI from "@/tools/soil-volume-calculator/ui";
import { soilVolumeCalculatorConfig } from "@/tools/soil-volume-calculator/config";

export const metadata: Metadata = {
  title: soilVolumeCalculatorConfig.seo.title,
  description: soilVolumeCalculatorConfig.seo.description,
  keywords: soilVolumeCalculatorConfig.seo.keywords,
  openGraph: {
    title: soilVolumeCalculatorConfig.seo.og.title,
    description: soilVolumeCalculatorConfig.seo.og.description,
    type: "website",
    url: soilVolumeCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: soilVolumeCalculatorConfig.seo.og.url,
  },
};

export default function SoilVolumeCalculatorPage() {
  return (
    <ToolLayout
      title={soilVolumeCalculatorConfig.name}
      description={soilVolumeCalculatorConfig.description}
      icon={soilVolumeCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <SoilVolumeCalculatorUI />
    </ToolLayout>
  );
}
