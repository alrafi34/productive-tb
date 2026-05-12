import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HouseWiringLoadCalculatorUI from "@/tools/house-wiring-load-calculator/ui";
import { houseWiringLoadCalculatorConfig } from "@/tools/house-wiring-load-calculator/config";

export const metadata: Metadata = {
  title: houseWiringLoadCalculatorConfig.seo.title,
  description: houseWiringLoadCalculatorConfig.seo.description,
  keywords: houseWiringLoadCalculatorConfig.seo.keywords,
  openGraph: {
    title: houseWiringLoadCalculatorConfig.seo.og.title,
    description: houseWiringLoadCalculatorConfig.seo.og.description,
    type: "website",
    url: houseWiringLoadCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: houseWiringLoadCalculatorConfig.seo.og.url,
  },
};

export default function HouseWiringLoadCalculatorPage() {
  return (
    <ToolLayout
      title={houseWiringLoadCalculatorConfig.name}
      description={houseWiringLoadCalculatorConfig.description}
      icon={houseWiringLoadCalculatorConfig.icon}
    >
      <HouseWiringLoadCalculatorUI />
    </ToolLayout>
  );
}
