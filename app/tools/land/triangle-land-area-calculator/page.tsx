import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TriangleLandAreaCalculatorUI from "@/tools/triangle-land-area-calculator/ui";
import { triangleLandAreaCalculatorConfig } from "@/tools/triangle-land-area-calculator/config";

export const metadata: Metadata = {
  title: triangleLandAreaCalculatorConfig.seo.title,
  description: triangleLandAreaCalculatorConfig.seo.description,
  keywords: triangleLandAreaCalculatorConfig.seo.keywords,
  openGraph: {
    title: triangleLandAreaCalculatorConfig.seo.og.title,
    description: triangleLandAreaCalculatorConfig.seo.og.description,
    type: "website",
    url: triangleLandAreaCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: triangleLandAreaCalculatorConfig.seo.og.url,
  },
};

export default function TriangleLandAreaCalculatorPage() {
  return (
    <ToolLayout
      title={triangleLandAreaCalculatorConfig.name}
      description={triangleLandAreaCalculatorConfig.description}
      icon={triangleLandAreaCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <TriangleLandAreaCalculatorUI />
    </ToolLayout>
  );
}
