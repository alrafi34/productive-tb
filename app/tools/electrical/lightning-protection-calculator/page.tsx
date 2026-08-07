import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LightningProtectionCalculatorUI from "@/tools/lightning-protection-calculator/ui";
import { lightningProtectionCalculatorConfig } from "@/tools/lightning-protection-calculator/config";

export const metadata: Metadata = {
  title: lightningProtectionCalculatorConfig.seo.title,
  description: lightningProtectionCalculatorConfig.seo.description,
  keywords: lightningProtectionCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Lightning+Protection+Calculator", width: 1200, height: 630, alt: "Lightning Protection Calculator" }],
    title: lightningProtectionCalculatorConfig.seo.og.title,
    description: lightningProtectionCalculatorConfig.seo.og.description,
    url: lightningProtectionCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: lightningProtectionCalculatorConfig.seo.og.title,
    description: lightningProtectionCalculatorConfig.seo.og.description,
    images: ["/og?title=Lightning+Protection+Calculator"],
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
