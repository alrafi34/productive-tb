import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import EarthFillingCalculatorUI from "@/tools/earth-filling-calculator/ui";
import { earthFillingCalculatorConfig } from "@/tools/earth-filling-calculator/config";

export const metadata: Metadata = {
  title: earthFillingCalculatorConfig.seo.title,
  description: earthFillingCalculatorConfig.seo.description,
  keywords: earthFillingCalculatorConfig.seo.keywords,
  openGraph: {
    title: earthFillingCalculatorConfig.seo.og.title,
    description: earthFillingCalculatorConfig.seo.og.description,
    type: "website",
    url: earthFillingCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: earthFillingCalculatorConfig.seo.og.url,
  },
};

export default function EarthFillingCalculatorPage() {
  return (
    <ToolLayout
      title={earthFillingCalculatorConfig.name}
      description={earthFillingCalculatorConfig.description}
      icon={earthFillingCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <EarthFillingCalculatorUI />
    </ToolLayout>
  );
}
