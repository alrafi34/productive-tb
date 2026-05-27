import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DecimalLandCalculatorUI from "@/tools/decimal-land-calculator/ui";
import { decimalLandCalculatorConfig } from "@/tools/decimal-land-calculator/config";

export const metadata: Metadata = {
  title: decimalLandCalculatorConfig.seo.title,
  description: decimalLandCalculatorConfig.seo.description,
  keywords: decimalLandCalculatorConfig.seo.keywords,
  openGraph: {
    title: decimalLandCalculatorConfig.seo.og.title,
    description: decimalLandCalculatorConfig.seo.og.description,
    type: "website",
    url: decimalLandCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: decimalLandCalculatorConfig.seo.og.url,
  },
};

export default function DecimalLandCalculatorPage() {
  return (
    <ToolLayout
      title={decimalLandCalculatorConfig.name}
      description={decimalLandCalculatorConfig.description}
      icon={decimalLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <DecimalLandCalculatorUI />
    </ToolLayout>
  );
}
