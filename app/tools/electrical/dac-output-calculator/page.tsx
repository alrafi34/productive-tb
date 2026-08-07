import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DACOutputCalculatorUI from "@/tools/dac-output-calculator/ui";
import { dacOutputCalculatorConfig } from "@/tools/dac-output-calculator/config";

export const metadata: Metadata = {
  title: dacOutputCalculatorConfig.seo.title,
  description: dacOutputCalculatorConfig.seo.description,
  keywords: dacOutputCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=DAC+Output+Calculator", width: 1200, height: 630, alt: "DAC Output Calculator" }],
    title: dacOutputCalculatorConfig.seo.og.title,
    description: dacOutputCalculatorConfig.seo.og.description,
    type: "website",
    url: dacOutputCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: dacOutputCalculatorConfig.seo.og.title,
    description: dacOutputCalculatorConfig.seo.og.description,
    images: ["/og?title=DAC+Output+Calculator"],
  },
  alternates: {
    canonical: dacOutputCalculatorConfig.seo.og.url,
  },
};

export default function DACOutputCalculatorPage() {
  return (
    <ToolLayout
      title={dacOutputCalculatorConfig.name}
      description={dacOutputCalculatorConfig.description}
      icon={dacOutputCalculatorConfig.icon}
    >
      <DACOutputCalculatorUI />
    </ToolLayout>
  );
}
