import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PricePerSquareFeetCalculatorUI from "@/tools/price-per-square-feet-calculator/ui";
import { pricePerSquareFeetCalculatorConfig } from "@/tools/price-per-square-feet-calculator/config";

export const metadata: Metadata = {
  title: pricePerSquareFeetCalculatorConfig.seo.title,
  description: pricePerSquareFeetCalculatorConfig.seo.description,
  keywords: pricePerSquareFeetCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Price+per+Square+Feet+Calculator", width: 1200, height: 630, alt: "Price per Square Feet Calculator" }],
    title: pricePerSquareFeetCalculatorConfig.seo.og.title,
    description: pricePerSquareFeetCalculatorConfig.seo.og.description,
    type: "website",
    url: pricePerSquareFeetCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: pricePerSquareFeetCalculatorConfig.seo.og.title,
    description: pricePerSquareFeetCalculatorConfig.seo.og.description,
    images: ["/og?title=Price+per+Square+Feet+Calculator"],
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
