import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ModelAccuracyCalculatorUI from "@/tools/model-accuracy-calculator/ui";
import { toolConfig } from "@/tools/model-accuracy-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Model+Accuracy+Calculator", width: 1200, height: 630, alt: "Model Accuracy Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Model+Accuracy+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function ModelAccuracyCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <ModelAccuracyCalculatorUI />
    </ToolLayout>
  );
}
