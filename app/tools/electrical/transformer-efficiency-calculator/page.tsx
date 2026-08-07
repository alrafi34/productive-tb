import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TransformerEfficiencyCalculatorUI from "@/tools/transformer-efficiency-calculator/ui";
import { toolConfig } from "@/tools/transformer-efficiency-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Transformer+Efficiency+Calculator", width: 1200, height: 630, alt: "Transformer Efficiency Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Transformer+Efficiency+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function TransformerEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <TransformerEfficiencyCalculatorUI />
    </ToolLayout>
  );
}
