import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LightningProtectionCalculatorUI from "@/tools/lightning-protection-calculator/ui";
import { lightningProtectionCalculatorConfig } from "@/tools/lightning-protection-calculator/config";

export const metadata: Metadata = {
  title: lightningProtectionCalculatorConfig.seo.title,
  description: lightningProtectionCalculatorConfig.seo.description,
  keywords: lightningProtectionCalculatorConfig.seo.keywords,
  openGraph: {
    title: lightningProtectionCalculatorConfig.seo.og.title,
    description: lightningProtectionCalculatorConfig.seo.og.description,
    url: lightningProtectionCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function LightningProtectionCalculatorPage() {
  return (
    <ToolLayout
      title={lightningProtectionCalculatorConfig.name}
      description={lightningProtectionCalculatorConfig.description}
      icon={lightningProtectionCalculatorConfig.icon}
    >
      <LightningProtectionCalculatorUI />
    </ToolLayout>
  );
}
