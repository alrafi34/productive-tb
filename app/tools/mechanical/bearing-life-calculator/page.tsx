import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BearingLifeCalculatorUI from "@/tools/bearing-life-calculator/ui";
import { bearingLifeCalculatorConfig } from "@/tools/bearing-life-calculator/config";

export const metadata: Metadata = {
  title: bearingLifeCalculatorConfig.seo.title,
  description: bearingLifeCalculatorConfig.seo.description,
  keywords: bearingLifeCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Bearing+Life+Calculator", width: 1200, height: 630, alt: "Bearing Life Calculator" }],
    title: bearingLifeCalculatorConfig.seo.og.title,
    description: bearingLifeCalculatorConfig.seo.og.description,
    type: "website",
    url: bearingLifeCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: bearingLifeCalculatorConfig.seo.og.title,
    description: bearingLifeCalculatorConfig.seo.og.description,
    images: ["/og?title=Bearing+Life+Calculator"],
  },
  alternates: {
    canonical: bearingLifeCalculatorConfig.seo.og.url,
  },
};

export default function BearingLifeCalculatorPage() {
  return (
    <ToolLayout
      title={bearingLifeCalculatorConfig.name}
      description={bearingLifeCalculatorConfig.description}
      icon={bearingLifeCalculatorConfig.icon}
    >
      <BearingLifeCalculatorUI />
    </ToolLayout>
  );
}
