import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DecibelCalculatorUI from "@/tools/decibel-db-calculator/ui";
import { decibelCalculatorConfig } from "@/tools/decibel-db-calculator/config";

export const metadata: Metadata = {
  title: decibelCalculatorConfig.seo.title,
  description: decibelCalculatorConfig.seo.description,
  keywords: decibelCalculatorConfig.seo.keywords,
  openGraph: {
    title: decibelCalculatorConfig.seo.og.title,
    description: decibelCalculatorConfig.seo.og.description,
    type: "website",
    url: decibelCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: decibelCalculatorConfig.seo.og.url,
  },
};

export default function DecibelCalculatorPage() {
  return (
    <ToolLayout
      title={decibelCalculatorConfig.name}
      description={decibelCalculatorConfig.description}
      icon={decibelCalculatorConfig.icon}
    >
      <DecibelCalculatorUI />
    </ToolLayout>
  );
}
