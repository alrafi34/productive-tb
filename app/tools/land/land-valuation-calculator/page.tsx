import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandValuationCalculatorUI from "@/tools/land-valuation-calculator/ui";
import { landValuationCalculatorConfig } from "@/tools/land-valuation-calculator/config";

export const metadata: Metadata = {
  title: landValuationCalculatorConfig.seo.title,
  description: landValuationCalculatorConfig.seo.description,
  keywords: landValuationCalculatorConfig.seo.keywords,
  openGraph: {
    title: landValuationCalculatorConfig.seo.og.title,
    description: landValuationCalculatorConfig.seo.og.description,
    type: "website",
    url: landValuationCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: landValuationCalculatorConfig.seo.og.url,
  },
};

export default function LandValuationCalculatorPage() {
  return (
    <ToolLayout
      title={landValuationCalculatorConfig.name}
      description={landValuationCalculatorConfig.description}
      icon={landValuationCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandValuationCalculatorUI />
    </ToolLayout>
  );
}
