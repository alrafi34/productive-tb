import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PricePerSquareFeetCalculatorUI from "@/tools/price-per-square-feet-calculator/ui";
import { pricePerSquareFeetCalculatorConfig } from "@/tools/price-per-square-feet-calculator/config";

export const metadata: Metadata = {
  title: pricePerSquareFeetCalculatorConfig.seo.title,
  description: pricePerSquareFeetCalculatorConfig.seo.description,
  keywords: pricePerSquareFeetCalculatorConfig.seo.keywords,
  openGraph: {
    title: pricePerSquareFeetCalculatorConfig.seo.og.title,
    description: pricePerSquareFeetCalculatorConfig.seo.og.description,
    type: "website",
    url: pricePerSquareFeetCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: pricePerSquareFeetCalculatorConfig.seo.og.url,
  },
};

export default function PricePerSquareFeetCalculatorPage() {
  return (
    <ToolLayout
      title={pricePerSquareFeetCalculatorConfig.name}
      description={pricePerSquareFeetCalculatorConfig.description}
      icon={pricePerSquareFeetCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <PricePerSquareFeetCalculatorUI />
    </ToolLayout>
  );
}
