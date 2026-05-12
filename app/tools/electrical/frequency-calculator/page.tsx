import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FrequencyCalculatorUI from "@/tools/frequency-calculator/ui";
import { frequencyCalculatorConfig } from "@/tools/frequency-calculator/config";

export const metadata: Metadata = {
  title: frequencyCalculatorConfig.seo.title,
  description: frequencyCalculatorConfig.seo.description,
  keywords: frequencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: frequencyCalculatorConfig.seo.og.title,
    description: frequencyCalculatorConfig.seo.og.description,
    type: "website",
    url: frequencyCalculatorConfig.seo.og.url,
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
