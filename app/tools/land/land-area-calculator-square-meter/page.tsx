import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandAreaCalculatorSquareMeterUI from "@/tools/land-area-calculator-square-meter/ui";
import { landAreaCalculatorSquareMeterConfig } from "@/tools/land-area-calculator-square-meter/config";

export const metadata: Metadata = {
  title: landAreaCalculatorSquareMeterConfig.seo.title,
  description: landAreaCalculatorSquareMeterConfig.seo.description,
  keywords: landAreaCalculatorSquareMeterConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Land+Area+Calculator+(Square+Meter)", width: 1200, height: 630, alt: "Land Area Calculator (Square Meter)" }],
    title: landAreaCalculatorSquareMeterConfig.seo.og.title,
    description: landAreaCalculatorSquareMeterConfig.seo.og.description,
    type: "website",
    url: landAreaCalculatorSquareMeterConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: landAreaCalculatorSquareMeterConfig.seo.og.title,
    description: landAreaCalculatorSquareMeterConfig.seo.og.description,
    images: ["/og?title=Land+Area+Calculator+(Square+Meter)"],
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
