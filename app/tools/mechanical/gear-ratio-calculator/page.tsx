import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GearRatioCalculatorUI from "@/tools/gear-ratio-calculator/ui";
import { gearRatioCalculatorConfig } from "@/tools/gear-ratio-calculator/config";

export const metadata: Metadata = {
  title: gearRatioCalculatorConfig.seo.title,
  description: gearRatioCalculatorConfig.seo.description,
  keywords: gearRatioCalculatorConfig.seo.keywords,
  openGraph: {
    title: gearRatioCalculatorConfig.seo.og.title,
    description: gearRatioCalculatorConfig.seo.og.description,
    type: "website",
    url: gearRatioCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: gearRatioCalculatorConfig.seo.og.url,
  },
};

export default function GearRatioCalculatorPage() {
  return (
    <ToolLayout
      title={gearRatioCalculatorConfig.name}
      description={gearRatioCalculatorConfig.description}
      icon={gearRatioCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <GearRatioCalculatorUI />
    </ToolLayout>
  );
}
