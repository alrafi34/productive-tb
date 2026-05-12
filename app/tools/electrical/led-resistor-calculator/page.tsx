import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LEDResistorCalculatorUI from "@/tools/led-resistor-calculator/ui";
import { toolConfig } from "@/tools/led-resistor-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function LEDResistorCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <LEDResistorCalculatorUI />
    </ToolLayout>
  );
}
