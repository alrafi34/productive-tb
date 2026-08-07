import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandDevelopmentCostCalculatorUI from "@/tools/land-development-cost-calculator/ui";
import { landDevelopmentCostCalculatorConfig } from "@/tools/land-development-cost-calculator/config";

export const metadata: Metadata = {
  title: landDevelopmentCostCalculatorConfig.seo.title,
  description: landDevelopmentCostCalculatorConfig.seo.description,
  keywords: landDevelopmentCostCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Land+Development+Cost+Calculator", width: 1200, height: 630, alt: "Land Development Cost Calculator" }],
    title: landDevelopmentCostCalculatorConfig.seo.og.title,
    description: landDevelopmentCostCalculatorConfig.seo.og.description,
    type: "website",
    url: landDevelopmentCostCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: landDevelopmentCostCalculatorConfig.seo.og.title,
    description: landDevelopmentCostCalculatorConfig.seo.og.description,
    images: ["/og?title=Land+Development+Cost+Calculator"],
  },
  alternates: {
    canonical: landDevelopmentCostCalculatorConfig.seo.og.url,
  },
};

export default function LandDevelopmentCostCalculatorPage() {
  return (
    <ToolLayout
      title={landDevelopmentCostCalculatorConfig.name}
      description={landDevelopmentCostCalculatorConfig.description}
      icon={landDevelopmentCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandDevelopmentCostCalculatorUI />
    </ToolLayout>
  );
}
