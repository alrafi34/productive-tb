import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import F1ScoreCalculatorUI from "@/tools/f1-score-calculator/ui";
import { toolConfig } from "@/tools/f1-score-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=F1+Score+Calculator", width: 1200, height: 630, alt: "F1 Score Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=F1+Score+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function F1ScoreCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <F1ScoreCalculatorUI />
    </ToolLayout>
  );
}
