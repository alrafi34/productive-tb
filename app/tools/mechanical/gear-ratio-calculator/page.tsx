import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GearRatioCalculatorUI from "@/tools/gear-ratio-calculator/ui";
import { gearRatioCalculatorConfig } from "@/tools/gear-ratio-calculator/config";

export const metadata: Metadata = {
  title: gearRatioCalculatorConfig.seo.title,
  description: gearRatioCalculatorConfig.seo.description,
  keywords: gearRatioCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Gear+Ratio+Calculator", width: 1200, height: 630, alt: "Gear Ratio Calculator" }],
    title: gearRatioCalculatorConfig.seo.og.title,
    description: gearRatioCalculatorConfig.seo.og.description,
    type: "website",
    url: gearRatioCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: gearRatioCalculatorConfig.seo.og.title,
    description: gearRatioCalculatorConfig.seo.og.description,
    images: ["/og?title=Gear+Ratio+Calculator"],
  },
  alternates: {
    canonical: gearRatioCalculatorConfig.seo.og.url,
  },
};

export default function GearRatioCalculatorPage() {
  return (
    <ToolLayout
      title={gearRatioCalculatorConfig.name}
      description={gearRatioCalculatorConfig.description}
      icon={gearRatioCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <GearRatioCalculatorUI />
    </ToolLayout>
  );
}
