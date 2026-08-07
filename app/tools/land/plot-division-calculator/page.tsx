import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PlotDivisionCalculatorUI from "@/tools/plot-division-calculator/ui";
import { plotDivisionCalculatorConfig } from "@/tools/plot-division-calculator/config";

export const metadata: Metadata = {
  title: plotDivisionCalculatorConfig.seo.title,
  description: plotDivisionCalculatorConfig.seo.description,
  keywords: plotDivisionCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Plot+Division+Calculator", width: 1200, height: 630, alt: "Plot Division Calculator" }],
    title: plotDivisionCalculatorConfig.seo.og.title,
    description: plotDivisionCalculatorConfig.seo.og.description,
    type: "website",
    url: plotDivisionCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: plotDivisionCalculatorConfig.seo.og.title,
    description: plotDivisionCalculatorConfig.seo.og.description,
    images: ["/og?title=Plot+Division+Calculator"],
  },
  alternates: {
    canonical: plotDivisionCalculatorConfig.seo.og.url,
  },
};

export default function PlotDivisionCalculatorPage() {
  return (
    <ToolLayout
      title={plotDivisionCalculatorConfig.name}
      description={plotDivisionCalculatorConfig.description}
      icon={plotDivisionCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <PlotDivisionCalculatorUI />
    </ToolLayout>
  );
}
