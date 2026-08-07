import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SolarInverterCalculatorUI from "@/tools/solar-inverter-calculator/ui";
import { solarInverterCalculatorConfig } from "@/tools/solar-inverter-calculator/config";

export const metadata: Metadata = {
  title: solarInverterCalculatorConfig.seo.title,
  description: solarInverterCalculatorConfig.seo.description,
  keywords: solarInverterCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Solar+Inverter+Calculator", width: 1200, height: 630, alt: "Solar Inverter Calculator" }],
    title: solarInverterCalculatorConfig.seo.og.title,
    description: solarInverterCalculatorConfig.seo.og.description,
    type: "website",
    url: solarInverterCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: solarInverterCalculatorConfig.seo.og.title,
    description: solarInverterCalculatorConfig.seo.og.description,
    images: ["/og?title=Solar+Inverter+Calculator"],
  },
  alternates: {
    canonical: solarInverterCalculatorConfig.seo.og.url,
  },
};

export default function SolarInverterCalculatorPage() {
  return (
    <ToolLayout
      title={solarInverterCalculatorConfig.name}
      description={solarInverterCalculatorConfig.description}
      icon={solarInverterCalculatorConfig.icon}
    >
      <SolarInverterCalculatorUI />
    </ToolLayout>
  );
}
