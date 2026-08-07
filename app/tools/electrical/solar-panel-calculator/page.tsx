import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarPanelCalculatorUI from "@/tools/solar-panel-calculator/ui";
import { solarPanelCalculatorConfig } from "@/tools/solar-panel-calculator/config";

export const metadata: Metadata = {
  title: solarPanelCalculatorConfig.seo.title,
  description: solarPanelCalculatorConfig.seo.description,
  keywords: solarPanelCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Solar+Panel+Calculator", width: 1200, height: 630, alt: "Solar Panel Calculator" }],
    title: solarPanelCalculatorConfig.seo.og.title,
    description: solarPanelCalculatorConfig.seo.og.description,
    type: "website",
    url: solarPanelCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: solarPanelCalculatorConfig.seo.og.title,
    description: solarPanelCalculatorConfig.seo.og.description,
    images: ["/og?title=Solar+Panel+Calculator"],
  },
  alternates: {
    canonical: solarPanelCalculatorConfig.seo.og.url,
  },
};

export default function SolarPanelCalculatorPage() {
  return (
    <ToolLayout
      title={solarPanelCalculatorConfig.name}
      description={solarPanelCalculatorConfig.description}
      icon={solarPanelCalculatorConfig.icon}
    >
      <SolarPanelCalculatorUI />
    </ToolLayout>
  );
}
