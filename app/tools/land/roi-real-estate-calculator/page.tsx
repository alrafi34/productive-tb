import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RoiRealEstateCalculatorUI from "@/tools/roi-real-estate-calculator/ui";
import { roiRealEstateCalculatorConfig } from "@/tools/roi-real-estate-calculator/config";

export const metadata: Metadata = {
  title: roiRealEstateCalculatorConfig.seo.title,
  description: roiRealEstateCalculatorConfig.seo.description,
  keywords: roiRealEstateCalculatorConfig.seo.keywords,
  openGraph: {
    title: roiRealEstateCalculatorConfig.seo.og.title,
    description: roiRealEstateCalculatorConfig.seo.og.description,
    type: "website",
    url: roiRealEstateCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: roiRealEstateCalculatorConfig.seo.og.url,
  },
};

export default function RoiRealEstateCalculatorPage() {
  return (
    <ToolLayout
      title={roiRealEstateCalculatorConfig.name}
      description={roiRealEstateCalculatorConfig.description}
      icon={roiRealEstateCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <RoiRealEstateCalculatorUI />
    </ToolLayout>
  );
}
