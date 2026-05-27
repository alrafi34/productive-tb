import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WallBoundaryCostCalculatorUI from "@/tools/wall-boundary-cost-calculator/ui";
import { wallBoundaryCostCalculatorConfig } from "@/tools/wall-boundary-cost-calculator/config";

export const metadata: Metadata = {
  title: wallBoundaryCostCalculatorConfig.seo.title,
  description: wallBoundaryCostCalculatorConfig.seo.description,
  keywords: wallBoundaryCostCalculatorConfig.seo.keywords,
  openGraph: {
    title: wallBoundaryCostCalculatorConfig.seo.og.title,
    description: wallBoundaryCostCalculatorConfig.seo.og.description,
    type: "website",
    url: wallBoundaryCostCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: wallBoundaryCostCalculatorConfig.seo.og.url,
  },
};

export default function WallBoundaryCostCalculatorPage() {
  return (
    <ToolLayout
      title={wallBoundaryCostCalculatorConfig.name}
      description={wallBoundaryCostCalculatorConfig.description}
      icon={wallBoundaryCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <WallBoundaryCostCalculatorUI />
    </ToolLayout>
  );
}
