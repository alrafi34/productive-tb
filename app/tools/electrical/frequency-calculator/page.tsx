import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FrequencyCalculatorUI from "@/tools/frequency-calculator/ui";
import { frequencyCalculatorConfig } from "@/tools/frequency-calculator/config";

export const metadata: Metadata = {
  title: frequencyCalculatorConfig.seo.title,
  description: frequencyCalculatorConfig.seo.description,
  keywords: frequencyCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Frequency+Calculator", width: 1200, height: 630, alt: "Frequency Calculator" }],
    title: frequencyCalculatorConfig.seo.og.title,
    description: frequencyCalculatorConfig.seo.og.description,
    type: "website",
    url: frequencyCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: frequencyCalculatorConfig.seo.og.title,
    description: frequencyCalculatorConfig.seo.og.description,
    images: ["/og?title=Frequency+Calculator"],
  },
  alternates: {
    canonical: frequencyCalculatorConfig.seo.og.url,
  },
};

export default function FrequencyCalculatorPage() {
  return (
    <ToolLayout
      title={frequencyCalculatorConfig.name}
      description={frequencyCalculatorConfig.description}
      icon={frequencyCalculatorConfig.icon}
    >
      <FrequencyCalculatorUI />
    </ToolLayout>
  );
}
