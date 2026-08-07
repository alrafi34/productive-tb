import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ExcavationCostCalculatorUI from "@/tools/excavation-cost-calculator/ui";
import { excavationCostCalculatorConfig } from "@/tools/excavation-cost-calculator/config";

export const metadata: Metadata = {
  title: excavationCostCalculatorConfig.seo.title,
  description: excavationCostCalculatorConfig.seo.description,
  keywords: excavationCostCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Excavation+Cost+Calculator", width: 1200, height: 630, alt: "Excavation Cost Calculator" }],
    title: excavationCostCalculatorConfig.seo.og.title,
    description: excavationCostCalculatorConfig.seo.og.description,
    type: "website",
    url: excavationCostCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: excavationCostCalculatorConfig.seo.og.title,
    description: excavationCostCalculatorConfig.seo.og.description,
    images: ["/og?title=Excavation+Cost+Calculator"],
  },
  alternates: {
    canonical: excavationCostCalculatorConfig.seo.og.url,
  },
};

export default function ExcavationCostCalculatorPage() {
  return (
    <ToolLayout
      title={excavationCostCalculatorConfig.name}
      description={excavationCostCalculatorConfig.description}
      icon={excavationCostCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <ExcavationCostCalculatorUI />
    </ToolLayout>
  );
}
