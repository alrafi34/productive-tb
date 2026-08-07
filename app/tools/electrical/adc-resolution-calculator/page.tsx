import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ADCResolutionCalculatorUI from "@/tools/adc-resolution-calculator/ui";
import { adcResolutionCalculatorConfig } from "@/tools/adc-resolution-calculator/config";

export const metadata: Metadata = {
  title: adcResolutionCalculatorConfig.seo.title,
  description: adcResolutionCalculatorConfig.seo.description,
  keywords: adcResolutionCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=ADC+Resolution+Calculator", width: 1200, height: 630, alt: "ADC Resolution Calculator" }],
    title: adcResolutionCalculatorConfig.seo.og.title,
    description: adcResolutionCalculatorConfig.seo.og.description,
    type: "website",
    url: adcResolutionCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: adcResolutionCalculatorConfig.seo.og.title,
    description: adcResolutionCalculatorConfig.seo.og.description,
    images: ["/og?title=ADC+Resolution+Calculator"],
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
