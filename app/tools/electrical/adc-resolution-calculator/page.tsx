import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ADCResolutionCalculatorUI from "@/tools/adc-resolution-calculator/ui";
import { adcResolutionCalculatorConfig } from "@/tools/adc-resolution-calculator/config";

export const metadata: Metadata = {
  title: adcResolutionCalculatorConfig.seo.title,
  description: adcResolutionCalculatorConfig.seo.description,
  keywords: adcResolutionCalculatorConfig.seo.keywords,
  openGraph: {
    title: adcResolutionCalculatorConfig.seo.og.title,
    description: adcResolutionCalculatorConfig.seo.og.description,
    type: "website",
    url: adcResolutionCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: adcResolutionCalculatorConfig.seo.og.url,
  },
};

export default function ADCResolutionCalculatorPage() {
  return (
    <ToolLayout
      title={adcResolutionCalculatorConfig.name}
      description={adcResolutionCalculatorConfig.description}
      icon={adcResolutionCalculatorConfig.icon}
    >
      <ADCResolutionCalculatorUI />
    </ToolLayout>
  );
}
