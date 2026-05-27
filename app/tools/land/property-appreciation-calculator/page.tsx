import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PropertyAppreciationCalculatorUI from "@/tools/property-appreciation-calculator/ui";
import { propertyAppreciationCalculatorConfig } from "@/tools/property-appreciation-calculator/config";

export const metadata: Metadata = {
  title: propertyAppreciationCalculatorConfig.seo.title,
  description: propertyAppreciationCalculatorConfig.seo.description,
  keywords: propertyAppreciationCalculatorConfig.seo.keywords,
  openGraph: {
    title: propertyAppreciationCalculatorConfig.seo.og.title,
    description: propertyAppreciationCalculatorConfig.seo.og.description,
    type: "website",
    url: propertyAppreciationCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: propertyAppreciationCalculatorConfig.seo.og.url,
  },
};

export default function PropertyAppreciationCalculatorPage() {
  return (
    <ToolLayout
      title={propertyAppreciationCalculatorConfig.name}
      description={propertyAppreciationCalculatorConfig.description}
      icon={propertyAppreciationCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <PropertyAppreciationCalculatorUI />
    </ToolLayout>
  );
}
