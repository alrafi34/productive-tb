import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DataRateCalculatorUI from "@/tools/data-rate-calculator/ui";
import { dataRateCalculatorConfig } from "@/tools/data-rate-calculator/config";

export const metadata: Metadata = {
  title: dataRateCalculatorConfig.seo.title,
  description: dataRateCalculatorConfig.seo.description,
  keywords: dataRateCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Data+Rate+Calculator", width: 1200, height: 630, alt: "Data Rate Calculator" }],
    title: dataRateCalculatorConfig.seo.og.title,
    description: dataRateCalculatorConfig.seo.og.description,
    type: "website",
    url: dataRateCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: dataRateCalculatorConfig.seo.og.title,
    description: dataRateCalculatorConfig.seo.og.description,
    images: ["/og?title=Data+Rate+Calculator"],
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
