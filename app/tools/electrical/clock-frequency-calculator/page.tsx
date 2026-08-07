import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ClockFrequencyCalculatorUI from "@/tools/clock-frequency-calculator/ui";
import { clockFrequencyCalculatorConfig } from "@/tools/clock-frequency-calculator/config";

export const metadata: Metadata = {
  title: clockFrequencyCalculatorConfig.seo.title,
  description: clockFrequencyCalculatorConfig.seo.description,
  keywords: clockFrequencyCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Clock+Frequency+Calculator", width: 1200, height: 630, alt: "Clock Frequency Calculator" }],
    title: clockFrequencyCalculatorConfig.seo.og.title,
    description: clockFrequencyCalculatorConfig.seo.og.description,
    type: "website",
    url: clockFrequencyCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: clockFrequencyCalculatorConfig.seo.og.title,
    description: clockFrequencyCalculatorConfig.seo.og.description,
    images: ["/og?title=Clock+Frequency+Calculator"],
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
