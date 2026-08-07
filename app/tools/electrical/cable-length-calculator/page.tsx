import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CableLengthCalculatorUI from "@/tools/cable-length-calculator/ui";
import { cableLengthCalculatorConfig } from "@/tools/cable-length-calculator/config";

export const metadata: Metadata = {
  title: cableLengthCalculatorConfig.seo.title,
  description: cableLengthCalculatorConfig.seo.description,
  keywords: cableLengthCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Cable+Length+Calculator", width: 1200, height: 630, alt: "Cable Length Calculator" }],
    title: cableLengthCalculatorConfig.seo.og.title,
    description: cableLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: cableLengthCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: cableLengthCalculatorConfig.seo.og.title,
    description: cableLengthCalculatorConfig.seo.og.description,
    images: ["/og?title=Cable+Length+Calculator"],
  },
  alternates: {
    canonical: cableLengthCalculatorConfig.seo.og.url,
  },
};

export default function CableLengthCalculatorPage() {
  return (
    <ToolLayout
      title={cableLengthCalculatorConfig.name}
      description={cableLengthCalculatorConfig.description}
      icon={cableLengthCalculatorConfig.icon}
    >
      <CableLengthCalculatorUI />
    </ToolLayout>
  );
}
