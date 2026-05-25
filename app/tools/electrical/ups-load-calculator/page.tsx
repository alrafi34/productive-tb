import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UPSLoadCalculatorUI from "@/tools/ups-load-calculator/ui";
import { upsLoadCalculatorConfig } from "@/tools/ups-load-calculator/config";

export const metadata: Metadata = {
  title: upsLoadCalculatorConfig.seo.title,
  description: upsLoadCalculatorConfig.seo.description,
  keywords: upsLoadCalculatorConfig.seo.keywords,
  openGraph: {
    title: upsLoadCalculatorConfig.seo.og.title,
    description: upsLoadCalculatorConfig.seo.og.description,
    url: upsLoadCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function UPSLoadCalculatorPage() {
  return (
    <ToolLayout
      title={upsLoadCalculatorConfig.name}
      description={upsLoadCalculatorConfig.description}
      icon={upsLoadCalculatorConfig.icon}
    >
      <UPSLoadCalculatorUI />
    </ToolLayout>
  );
}
