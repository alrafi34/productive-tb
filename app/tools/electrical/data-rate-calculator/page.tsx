import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DataRateCalculatorUI from "@/tools/data-rate-calculator/ui";
import { dataRateCalculatorConfig } from "@/tools/data-rate-calculator/config";

export const metadata: Metadata = {
  title: dataRateCalculatorConfig.seo.title,
  description: dataRateCalculatorConfig.seo.description,
  keywords: dataRateCalculatorConfig.seo.keywords,
  openGraph: {
    title: dataRateCalculatorConfig.seo.og.title,
    description: dataRateCalculatorConfig.seo.og.description,
    type: "website",
    url: dataRateCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: dataRateCalculatorConfig.seo.og.url,
  },
};

export default function DataRateCalculatorPage() {
  return (
    <ToolLayout
      title={dataRateCalculatorConfig.name}
      description={dataRateCalculatorConfig.description}
      icon={dataRateCalculatorConfig.icon}
    >
      <DataRateCalculatorUI />
    </ToolLayout>
  );
}
