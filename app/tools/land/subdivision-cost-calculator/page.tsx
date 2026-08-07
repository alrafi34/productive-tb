import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SubdivisionCostCalculatorUI from "@/tools/subdivision-cost-calculator/ui";
import { subdivisionCostCalculatorConfig } from "@/tools/subdivision-cost-calculator/config";

export const metadata: Metadata = {
  title: subdivisionCostCalculatorConfig.seo.title,
  description: subdivisionCostCalculatorConfig.seo.description,
  keywords: subdivisionCostCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Subdivision+Cost+Calculator", width: 1200, height: 630, alt: "Subdivision Cost Calculator" }],
    title: subdivisionCostCalculatorConfig.seo.og.title,
    description: subdivisionCostCalculatorConfig.seo.og.description,
    type: "website",
    url: subdivisionCostCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: subdivisionCostCalculatorConfig.seo.og.title,
    description: subdivisionCostCalculatorConfig.seo.og.description,
    images: ["/og?title=Subdivision+Cost+Calculator"],
  },
  alternates: {
    canonical: subdivisionCostCalculatorConfig.seo.og.url,
  },
};

export default function SubdivisionCostCalculatorPage() {
  return (
    <ToolLayout
      title={subdivisionCostCalculatorConfig.name}
      description={subdivisionCostCalculatorConfig.description}
      icon={subdivisionCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <SubdivisionCostCalculatorUI />
    </ToolLayout>
  );
}
