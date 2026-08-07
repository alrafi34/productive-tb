import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FertilizerRequirementCalculatorUI from "@/tools/fertilizer-requirement-calculator/ui";
import { fertilizerRequirementCalculatorConfig } from "@/tools/fertilizer-requirement-calculator/config";

export const metadata: Metadata = {
  title: fertilizerRequirementCalculatorConfig.seo.title,
  description: fertilizerRequirementCalculatorConfig.seo.description,
  keywords: fertilizerRequirementCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Fertilizer+Requirement+Calculator", width: 1200, height: 630, alt: "Fertilizer Requirement Calculator" }],
    title: fertilizerRequirementCalculatorConfig.seo.og.title,
    description: fertilizerRequirementCalculatorConfig.seo.og.description,
    type: "website",
    url: fertilizerRequirementCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: fertilizerRequirementCalculatorConfig.seo.og.title,
    description: fertilizerRequirementCalculatorConfig.seo.og.description,
    images: ["/og?title=Fertilizer+Requirement+Calculator"],
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
