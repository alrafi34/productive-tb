import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandAreaCalculatorSquareMeterUI from "@/tools/land-area-calculator-square-meter/ui";
import { landAreaCalculatorSquareMeterConfig } from "@/tools/land-area-calculator-square-meter/config";

export const metadata: Metadata = {
  title: landAreaCalculatorSquareMeterConfig.seo.title,
  description: landAreaCalculatorSquareMeterConfig.seo.description,
  keywords: landAreaCalculatorSquareMeterConfig.seo.keywords,
  openGraph: {
    title: landAreaCalculatorSquareMeterConfig.seo.og.title,
    description: landAreaCalculatorSquareMeterConfig.seo.og.description,
    type: "website",
    url: landAreaCalculatorSquareMeterConfig.seo.og.url,
  },
  alternates: {
    canonical: landAreaCalculatorSquareMeterConfig.seo.og.url,
  },
};

export default function LandAreaCalculatorSquareMeterPage() {
  return (
    <ToolLayout
      title={landAreaCalculatorSquareMeterConfig.name}
      description={landAreaCalculatorSquareMeterConfig.description}
      icon={landAreaCalculatorSquareMeterConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandAreaCalculatorSquareMeterUI />
    </ToolLayout>
  );
}
