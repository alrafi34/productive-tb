import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PowerLossCalculatorUI from "@/tools/power-loss-calculator/ui";
import { powerLossCalculatorConfig } from "@/tools/power-loss-calculator/config";

export const metadata: Metadata = {
  title: powerLossCalculatorConfig.seo.title,
  description: powerLossCalculatorConfig.seo.description,
  keywords: powerLossCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Power+Loss+Calculator", width: 1200, height: 630, alt: "Power Loss Calculator" }],
    title: powerLossCalculatorConfig.seo.og.title,
    description: powerLossCalculatorConfig.seo.og.description,
    url: powerLossCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: powerLossCalculatorConfig.seo.og.title,
    description: powerLossCalculatorConfig.seo.og.description,
    images: ["/og?title=Power+Loss+Calculator"],
  },
};

export default function PowerLossCalculatorPage() {
  return (
    <ToolLayout
      title={powerLossCalculatorConfig.name}
      description={powerLossCalculatorConfig.description}
      icon={powerLossCalculatorConfig.icon}
    >
      <PowerLossCalculatorUI />
    </ToolLayout>
  );
}
