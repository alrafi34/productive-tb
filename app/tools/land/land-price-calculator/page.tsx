import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LandPriceCalculatorUI from "@/tools/land-price-calculator/ui";
import { landPriceCalculatorConfig } from "@/tools/land-price-calculator/config";

export const metadata: Metadata = {
  title: landPriceCalculatorConfig.seo.title,
  description: landPriceCalculatorConfig.seo.description,
  keywords: landPriceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Land+Price+Calculator", width: 1200, height: 630, alt: "Land Price Calculator" }],
    title: landPriceCalculatorConfig.seo.og.title,
    description: landPriceCalculatorConfig.seo.og.description,
    type: "website",
    url: landPriceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: landPriceCalculatorConfig.seo.og.title,
    description: landPriceCalculatorConfig.seo.og.description,
    images: ["/og?title=Land+Price+Calculator"],
  },
  alternates: {
    canonical: landPriceCalculatorConfig.seo.og.url,
  },
};

export default function LandPriceCalculatorPage() {
  return (
    <ToolLayout
      title={landPriceCalculatorConfig.name}
      description={landPriceCalculatorConfig.description}
      icon={landPriceCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LandPriceCalculatorUI />
    </ToolLayout>
  );
}
