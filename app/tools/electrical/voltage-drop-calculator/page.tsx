import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VoltageDropCalculatorUI from "@/tools/voltage-drop-calculator/ui";
import { voltageDropCalculatorConfig } from "@/tools/voltage-drop-calculator/config";

export const metadata: Metadata = {
  title: voltageDropCalculatorConfig.seo.title,
  description: voltageDropCalculatorConfig.seo.description,
  keywords: voltageDropCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Voltage+Drop+Calculator", width: 1200, height: 630, alt: "Voltage Drop Calculator" }],
    title: voltageDropCalculatorConfig.seo.og.title,
    description: voltageDropCalculatorConfig.seo.og.description,
    type: "website",
    url: voltageDropCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: voltageDropCalculatorConfig.seo.og.title,
    description: voltageDropCalculatorConfig.seo.og.description,
    images: ["/og?title=Voltage+Drop+Calculator"],
  },
  alternates: {
    canonical: voltageDropCalculatorConfig.seo.og.url,
  },
};

export default function VoltageDropCalculatorPage() {
  return (
    <ToolLayout
      title={voltageDropCalculatorConfig.name}
      description={voltageDropCalculatorConfig.description}
      icon={voltageDropCalculatorConfig.icon}
    >
      <VoltageDropCalculatorUI />
    </ToolLayout>
  );
}
