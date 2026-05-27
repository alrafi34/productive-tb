import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TrapezoidLandCalculatorUI from "@/tools/trapezoid-land-calculator/ui";
import { trapezoidLandCalculatorConfig } from "@/tools/trapezoid-land-calculator/config";

export const metadata: Metadata = {
  title: trapezoidLandCalculatorConfig.seo.title,
  description: trapezoidLandCalculatorConfig.seo.description,
  keywords: trapezoidLandCalculatorConfig.seo.keywords,
  openGraph: {
    title: trapezoidLandCalculatorConfig.seo.og.title,
    description: trapezoidLandCalculatorConfig.seo.og.description,
    type: "website",
    url: trapezoidLandCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: trapezoidLandCalculatorConfig.seo.og.url,
  },
};

export default function TrapezoidLandCalculatorPage() {
  return (
    <ToolLayout
      title={trapezoidLandCalculatorConfig.name}
      description={trapezoidLandCalculatorConfig.description}
      icon={trapezoidLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <TrapezoidLandCalculatorUI />
    </ToolLayout>
  );
}
