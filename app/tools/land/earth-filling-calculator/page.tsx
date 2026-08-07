import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import EarthFillingCalculatorUI from "@/tools/earth-filling-calculator/ui";
import { earthFillingCalculatorConfig } from "@/tools/earth-filling-calculator/config";

export const metadata: Metadata = {
  title: earthFillingCalculatorConfig.seo.title,
  description: earthFillingCalculatorConfig.seo.description,
  keywords: earthFillingCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Earth+Filling+Calculator", width: 1200, height: 630, alt: "Earth Filling Calculator" }],
    title: earthFillingCalculatorConfig.seo.og.title,
    description: earthFillingCalculatorConfig.seo.og.description,
    type: "website",
    url: earthFillingCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: earthFillingCalculatorConfig.seo.og.title,
    description: earthFillingCalculatorConfig.seo.og.description,
    images: ["/og?title=Earth+Filling+Calculator"],
  },
  alternates: {
    canonical: earthFillingCalculatorConfig.seo.og.url,
  },
};

export default function EarthFillingCalculatorPage() {
  return (
    <ToolLayout
      title={earthFillingCalculatorConfig.name}
      description={earthFillingCalculatorConfig.description}
      icon={earthFillingCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <EarthFillingCalculatorUI />
    </ToolLayout>
  );
}
