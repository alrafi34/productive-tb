import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FrequencyResponseCalculatorUI from "./ui";
import { frequencyResponseCalculatorConfig } from "./config";

export const metadata: Metadata = {
  title: frequencyResponseCalculatorConfig.seo.title,
  description: frequencyResponseCalculatorConfig.seo.description,
  keywords: frequencyResponseCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Frequency+Response+Calculator", width: 1200, height: 630, alt: "Frequency Response Calculator" }],
    title: frequencyResponseCalculatorConfig.seo.og.title,
    description: frequencyResponseCalculatorConfig.seo.og.description,
    url: frequencyResponseCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    images: ["/og?title=Frequency+Response+Calculator"],
    card: "summary_large_image",
    title: frequencyResponseCalculatorConfig.seo.og.title,
    description: frequencyResponseCalculatorConfig.seo.og.description,
  },
  alternates: {
    canonical: frequencyResponseCalculatorConfig.seo.og.url,
  },
};

export default function FrequencyResponseCalculatorPage() {
  return (
    <ToolLayout
      title={frequencyResponseCalculatorConfig.name}
      description={frequencyResponseCalculatorConfig.description}
      icon={frequencyResponseCalculatorConfig.icon}
    >
      <FrequencyResponseCalculatorUI />
    </ToolLayout>
  );
}