import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VoltageDropCalculatorUI from "@/tools/voltage-drop-calculator/ui";
import { voltageDropCalculatorConfig } from "@/tools/voltage-drop-calculator/config";

export const metadata: Metadata = {
  title: voltageDropCalculatorConfig.seo.title,
  description: voltageDropCalculatorConfig.seo.description,
  keywords: voltageDropCalculatorConfig.seo.keywords,
  openGraph: {
    title: voltageDropCalculatorConfig.seo.og.title,
    description: voltageDropCalculatorConfig.seo.og.description,
    type: "website",
    url: voltageDropCalculatorConfig.seo.og.url,
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
