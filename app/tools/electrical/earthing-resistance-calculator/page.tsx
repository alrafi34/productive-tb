import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import EarthingResistanceCalculatorUI from "@/tools/earthing-resistance-calculator/ui";
import { earthingResistanceCalculatorConfig } from "@/tools/earthing-resistance-calculator/config";

export const metadata: Metadata = {
  title: earthingResistanceCalculatorConfig.seo.title,
  description: earthingResistanceCalculatorConfig.seo.description,
  keywords: earthingResistanceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Earthing+Resistance+Calculator", width: 1200, height: 630, alt: "Earthing Resistance Calculator" }],
    title: earthingResistanceCalculatorConfig.seo.og.title,
    description: earthingResistanceCalculatorConfig.seo.og.description,
    type: "website",
    url: earthingResistanceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: earthingResistanceCalculatorConfig.seo.og.title,
    description: earthingResistanceCalculatorConfig.seo.og.description,
    images: ["/og?title=Earthing+Resistance+Calculator"],
  },
  alternates: {
    canonical: earthingResistanceCalculatorConfig.seo.og.url,
  },
};

export default function EarthingResistanceCalculatorPage() {
  return (
    <ToolLayout
      title={earthingResistanceCalculatorConfig.name}
      description={earthingResistanceCalculatorConfig.description}
      icon={earthingResistanceCalculatorConfig.icon}
    >
      <EarthingResistanceCalculatorUI />
    </ToolLayout>
  );
}
