import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VoltageRegulationCalculatorUI from "./ui";
import { voltageRegulationCalculatorConfig } from "./config";

export const metadata: Metadata = {
  title: voltageRegulationCalculatorConfig.seo.title,
  description: voltageRegulationCalculatorConfig.seo.description,
  keywords: voltageRegulationCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Voltage+Regulation+Calculator", width: 1200, height: 630, alt: "Voltage Regulation Calculator" }],
    title: voltageRegulationCalculatorConfig.seo.og.title,
    description: voltageRegulationCalculatorConfig.seo.og.description,
    url: voltageRegulationCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    images: ["/og?title=Voltage+Regulation+Calculator"],
    card: "summary_large_image",
    title: voltageRegulationCalculatorConfig.seo.og.title,
    description: voltageRegulationCalculatorConfig.seo.og.description,
  },
  alternates: {
    canonical: voltageRegulationCalculatorConfig.seo.og.url,
  },
};

export default function VoltageRegulationCalculatorPage() {
  return (
    <ToolLayout
      title={voltageRegulationCalculatorConfig.name}
      description={voltageRegulationCalculatorConfig.description}
      icon={voltageRegulationCalculatorConfig.icon}
    >
      <VoltageRegulationCalculatorUI />
    </ToolLayout>
  );
}