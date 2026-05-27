import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandLevelingCalculatorUI from "@/tools/land-leveling-calculator/ui";
import { landLevelingCalculatorConfig } from "@/tools/land-leveling-calculator/config";

export const metadata: Metadata = {
  title: landLevelingCalculatorConfig.seo.title,
  description: landLevelingCalculatorConfig.seo.description,
  keywords: landLevelingCalculatorConfig.seo.keywords,
  openGraph: {
    title: landLevelingCalculatorConfig.seo.og.title,
    description: landLevelingCalculatorConfig.seo.og.description,
    type: "website",
    url: landLevelingCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: landLevelingCalculatorConfig.seo.og.url,
  },
};

export default function LandLevelingCalculatorPage() {
  return (
    <ToolLayout
      title={landLevelingCalculatorConfig.name}
      description={landLevelingCalculatorConfig.description}
      icon={landLevelingCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandLevelingCalculatorUI />
    </ToolLayout>
  );
}
