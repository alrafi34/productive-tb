import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TrapezoidLandCalculatorUI from "@/tools/trapezoid-land-calculator/ui";
import { trapezoidLandCalculatorConfig } from "@/tools/trapezoid-land-calculator/config";

export const metadata: Metadata = {
  title: trapezoidLandCalculatorConfig.seo.title,
  description: trapezoidLandCalculatorConfig.seo.description,
  keywords: trapezoidLandCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Trapezoid+Land+Calculator", width: 1200, height: 630, alt: "Trapezoid Land Calculator" }],
    title: trapezoidLandCalculatorConfig.seo.og.title,
    description: trapezoidLandCalculatorConfig.seo.og.description,
    type: "website",
    url: trapezoidLandCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: trapezoidLandCalculatorConfig.seo.og.title,
    description: trapezoidLandCalculatorConfig.seo.og.description,
    images: ["/og?title=Trapezoid+Land+Calculator"],
  },
  alternates: {
    canonical: trapezoidLandCalculatorConfig.seo.og.url,
  },
};

export default function TrapezoidLandCalculatorPage() {
  return (
    <ToolLayout
      title={trapezoidLandCalculatorConfig.name}
      description={trapezoidLandCalculatorConfig.description}
      icon={trapezoidLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <TrapezoidLandCalculatorUI />
    </ToolLayout>
  );
}
