import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PolygonAreaCalculatorUI from "@/tools/polygon-area-calculator/ui";
import { polygonAreaCalculatorConfig } from "@/tools/polygon-area-calculator/config";

export const metadata: Metadata = {
  title: polygonAreaCalculatorConfig.seo.title,
  description: polygonAreaCalculatorConfig.seo.description,
  keywords: polygonAreaCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Polygon+Area+Calculator", width: 1200, height: 630, alt: "Polygon Area Calculator" }],
    title: polygonAreaCalculatorConfig.seo.og.title,
    description: polygonAreaCalculatorConfig.seo.og.description,
    type: "website",
    url: polygonAreaCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: polygonAreaCalculatorConfig.seo.og.title,
    description: polygonAreaCalculatorConfig.seo.og.description,
    images: ["/og?title=Polygon+Area+Calculator"],
  },
  alternates: {
    canonical: polygonAreaCalculatorConfig.seo.og.url,
  },
};

export default function PolygonAreaCalculatorPage() {
  return (
    <ToolLayout
      title={polygonAreaCalculatorConfig.name}
      description={polygonAreaCalculatorConfig.description}
      icon={polygonAreaCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <PolygonAreaCalculatorUI />
    </ToolLayout>
  );
}
