import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PowerFactorCalculatorUI from "@/tools/power-factor-calculator/ui";
import { toolConfig } from "@/tools/power-factor-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Power+Factor+Calculator", width: 1200, height: 630, alt: "Power Factor Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Power+Factor+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function PowerFactorCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <PowerFactorCalculatorUI />
    </ToolLayout>
  );
}
