import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RLCResonanceCalculatorUI from "@/tools/rlc-resonance-calculator/ui";
import { rlcResonanceCalculatorConfig } from "@/tools/rlc-resonance-calculator/config";

export const metadata: Metadata = {
  title: rlcResonanceCalculatorConfig.seo.title,
  description: rlcResonanceCalculatorConfig.seo.description,
  keywords: rlcResonanceCalculatorConfig.seo.keywords,
  openGraph: {
    title: rlcResonanceCalculatorConfig.seo.og.title,
    description: rlcResonanceCalculatorConfig.seo.og.description,
    type: "website",
    url: rlcResonanceCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: rlcResonanceCalculatorConfig.seo.og.url,
  },
};

export default function RLCResonanceCalculatorPage() {
  return (
    <ToolLayout
      title={rlcResonanceCalculatorConfig.name}
      description={rlcResonanceCalculatorConfig.description}
      icon={rlcResonanceCalculatorConfig.icon}
    >
      <RLCResonanceCalculatorUI />
    </ToolLayout>
  );
}
