import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SpecificHeatCalculatorUI from "@/tools/specific-heat-calculator/ui";
import { specificHeatCalculatorConfig } from "@/tools/specific-heat-calculator/config";

export const metadata: Metadata = {
  title: specificHeatCalculatorConfig.seo.title,
  description: specificHeatCalculatorConfig.seo.description,
  keywords: specificHeatCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Specific+Heat+Calculator", width: 1200, height: 630, alt: "Specific Heat Calculator" }],
    title: specificHeatCalculatorConfig.seo.og.title,
    description: specificHeatCalculatorConfig.seo.og.description,
    type: "website",
    url: specificHeatCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: specificHeatCalculatorConfig.seo.og.title,
    description: specificHeatCalculatorConfig.seo.og.description,
    images: ["/og?title=Specific+Heat+Calculator"],
  },
  alternates: {
    canonical: specificHeatCalculatorConfig.seo.og.url,
  },
};

export default function SpecificHeatCalculatorPage() {
  return (
    <ToolLayout
      title={specificHeatCalculatorConfig.name}
      description={specificHeatCalculatorConfig.description}
      icon={specificHeatCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <SpecificHeatCalculatorUI />
    </ToolLayout>
  );
}
