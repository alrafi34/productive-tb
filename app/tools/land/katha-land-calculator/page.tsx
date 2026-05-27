import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import KathaLandCalculatorUI from "@/tools/katha-land-calculator/ui";
import { kathaLandCalculatorConfig } from "@/tools/katha-land-calculator/config";

export const metadata: Metadata = {
  title: kathaLandCalculatorConfig.seo.title,
  description: kathaLandCalculatorConfig.seo.description,
  keywords: kathaLandCalculatorConfig.seo.keywords,
  openGraph: {
    title: kathaLandCalculatorConfig.seo.og.title,
    description: kathaLandCalculatorConfig.seo.og.description,
    type: "website",
    url: kathaLandCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: kathaLandCalculatorConfig.seo.og.url,
  },
};

export default function KathaLandCalculatorPage() {
  return (
    <ToolLayout
      title={kathaLandCalculatorConfig.name}
      description={kathaLandCalculatorConfig.description}
      icon={kathaLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <KathaLandCalculatorUI />
    </ToolLayout>
  );
}
