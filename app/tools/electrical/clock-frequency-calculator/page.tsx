import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ClockFrequencyCalculatorUI from "@/tools/clock-frequency-calculator/ui";
import { clockFrequencyCalculatorConfig } from "@/tools/clock-frequency-calculator/config";

export const metadata: Metadata = {
  title: clockFrequencyCalculatorConfig.seo.title,
  description: clockFrequencyCalculatorConfig.seo.description,
  keywords: clockFrequencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: clockFrequencyCalculatorConfig.seo.og.title,
    description: clockFrequencyCalculatorConfig.seo.og.description,
    type: "website",
    url: clockFrequencyCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: clockFrequencyCalculatorConfig.seo.og.url,
  },
};

export default function ClockFrequencyCalculatorPage() {
  return (
    <ToolLayout
      title={clockFrequencyCalculatorConfig.name}
      description={clockFrequencyCalculatorConfig.description}
      icon={clockFrequencyCalculatorConfig.icon}
    >
      <ClockFrequencyCalculatorUI />
    </ToolLayout>
  );
}
