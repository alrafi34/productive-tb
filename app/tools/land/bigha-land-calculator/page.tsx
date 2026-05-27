import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BighaLandCalculatorUI from "@/tools/bigha-land-calculator/ui";
import { bighaLandCalculatorConfig } from "@/tools/bigha-land-calculator/config";

export const metadata: Metadata = {
  title: bighaLandCalculatorConfig.seo.title,
  description: bighaLandCalculatorConfig.seo.description,
  keywords: bighaLandCalculatorConfig.seo.keywords,
  openGraph: {
    title: bighaLandCalculatorConfig.seo.og.title,
    description: bighaLandCalculatorConfig.seo.og.description,
    type: "website",
    url: bighaLandCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: bighaLandCalculatorConfig.seo.og.url,
  },
};

export default function BighaLandCalculatorPage() {
  return (
    <ToolLayout
      title={bighaLandCalculatorConfig.name}
      description={bighaLandCalculatorConfig.description}
      icon={bighaLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <BighaLandCalculatorUI />
    </ToolLayout>
  );
}
