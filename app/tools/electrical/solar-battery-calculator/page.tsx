import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarBatteryCalculatorUI from "@/tools/solar-battery-calculator/ui";
import { solarBatteryCalculatorConfig } from "@/tools/solar-battery-calculator/config";

export const metadata: Metadata = {
  title: solarBatteryCalculatorConfig.seo.title,
  description: solarBatteryCalculatorConfig.seo.description,
  keywords: solarBatteryCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Solar+Battery+Calculator", width: 1200, height: 630, alt: "Solar Battery Calculator" }],
    title: solarBatteryCalculatorConfig.seo.og.title,
    description: solarBatteryCalculatorConfig.seo.og.description,
    type: "website",
    url: solarBatteryCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: solarBatteryCalculatorConfig.seo.og.title,
    description: solarBatteryCalculatorConfig.seo.og.description,
    images: ["/og?title=Solar+Battery+Calculator"],
  },
  alternates: {
    canonical: solarBatteryCalculatorConfig.seo.og.url,
  },
};

export default function SolarBatteryCalculatorPage() {
  return (
    <ToolLayout
      title={solarBatteryCalculatorConfig.name}
      description={solarBatteryCalculatorConfig.description}
      icon={solarBatteryCalculatorConfig.icon}
    >
      <SolarBatteryCalculatorUI />
    </ToolLayout>
  );
}
