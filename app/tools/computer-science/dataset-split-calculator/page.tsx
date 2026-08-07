import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DatasetSplitCalculatorUI from "@/tools/dataset-split-calculator/ui";
import { toolConfig } from "@/tools/dataset-split-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Dataset+Split+Calculator", width: 1200, height: 630, alt: "Dataset Split Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Dataset+Split+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function DatasetSplitCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <DatasetSplitCalculatorUI />
    </ToolLayout>
  );
}
