import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import NaturalFrequencyCalculatorUI from "@/tools/natural-frequency-calculator/ui";
import { naturalFrequencyCalculatorConfig } from "@/tools/natural-frequency-calculator/config";

export const metadata: Metadata = {
  title: naturalFrequencyCalculatorConfig.seo.title,
  description: naturalFrequencyCalculatorConfig.seo.description,
  keywords: naturalFrequencyCalculatorConfig.seo.keywords,
  openGraph: {
    title: naturalFrequencyCalculatorConfig.seo.og.title,
    description: naturalFrequencyCalculatorConfig.seo.og.description,
    type: "website",
    url: naturalFrequencyCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: naturalFrequencyCalculatorConfig.seo.og.url,
  },
};

export default function NaturalFrequencyCalculatorPage() {
  return (
    <ToolLayout
      title={naturalFrequencyCalculatorConfig.name}
      description={naturalFrequencyCalculatorConfig.description}
      icon={naturalFrequencyCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <NaturalFrequencyCalculatorUI />
    </ToolLayout>
  );
}
