import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DecimalLandCalculatorUI from "@/tools/decimal-land-calculator/ui";
import { decimalLandCalculatorConfig } from "@/tools/decimal-land-calculator/config";

export const metadata: Metadata = {
  title: decimalLandCalculatorConfig.seo.title,
  description: decimalLandCalculatorConfig.seo.description,
  keywords: decimalLandCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Decimal+Land+Calculator", width: 1200, height: 630, alt: "Decimal Land Calculator" }],
    title: decimalLandCalculatorConfig.seo.og.title,
    description: decimalLandCalculatorConfig.seo.og.description,
    type: "website",
    url: decimalLandCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: decimalLandCalculatorConfig.seo.og.title,
    description: decimalLandCalculatorConfig.seo.og.description,
    images: ["/og?title=Decimal+Land+Calculator"],
  },
  alternates: {
    canonical: decimalLandCalculatorConfig.seo.og.url,
  },
};

export default function DecimalLandCalculatorPage() {
  return (
    <ToolLayout
      title={decimalLandCalculatorConfig.name}
      description={decimalLandCalculatorConfig.description}
      icon={decimalLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <DecimalLandCalculatorUI />
    </ToolLayout>
  );
}
