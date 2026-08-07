import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ZenerDiodeCalculatorUI from "@/tools/zener-diode-calculator/ui";
import { toolConfig } from "@/tools/zener-diode-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Zener+Diode+Calculator", width: 1200, height: 630, alt: "Zener Diode Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Zener+Diode+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function ZenerDiodeCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <ZenerDiodeCalculatorUI />
    </ToolLayout>
  );
}
