import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CloudCostCalculatorUI from "@/tools/cloud-cost-calculator/ui";
import { toolConfig } from "@/tools/cloud-cost-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function CloudCostCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <CloudCostCalculatorUI />
    </ToolLayout>
  );
}
