import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RoiRealEstateCalculatorUI from "@/tools/roi-real-estate-calculator/ui";
import { roiRealEstateCalculatorConfig } from "@/tools/roi-real-estate-calculator/config";

export const metadata: Metadata = {
  title: roiRealEstateCalculatorConfig.seo.title,
  description: roiRealEstateCalculatorConfig.seo.description,
  keywords: roiRealEstateCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=ROI+Real+Estate+Calculator", width: 1200, height: 630, alt: "ROI Real Estate Calculator" }],
    title: roiRealEstateCalculatorConfig.seo.og.title,
    description: roiRealEstateCalculatorConfig.seo.og.description,
    type: "website",
    url: roiRealEstateCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: roiRealEstateCalculatorConfig.seo.og.title,
    description: roiRealEstateCalculatorConfig.seo.og.description,
    images: ["/og?title=ROI+Real+Estate+Calculator"],
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
