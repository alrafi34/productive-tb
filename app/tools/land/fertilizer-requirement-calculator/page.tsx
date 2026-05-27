import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FertilizerRequirementCalculatorUI from "@/tools/fertilizer-requirement-calculator/ui";
import { fertilizerRequirementCalculatorConfig } from "@/tools/fertilizer-requirement-calculator/config";

export const metadata: Metadata = {
  title: fertilizerRequirementCalculatorConfig.seo.title,
  description: fertilizerRequirementCalculatorConfig.seo.description,
  keywords: fertilizerRequirementCalculatorConfig.seo.keywords,
  openGraph: {
    title: fertilizerRequirementCalculatorConfig.seo.og.title,
    description: fertilizerRequirementCalculatorConfig.seo.og.description,
    type: "website",
    url: fertilizerRequirementCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: fertilizerRequirementCalculatorConfig.seo.og.url,
  },
};

export default function FertilizerRequirementCalculatorPage() {
  return (
    <ToolLayout
      title={fertilizerRequirementCalculatorConfig.name}
      description={fertilizerRequirementCalculatorConfig.description}
      icon={fertilizerRequirementCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <FertilizerRequirementCalculatorUI />
    </ToolLayout>
  );
}
