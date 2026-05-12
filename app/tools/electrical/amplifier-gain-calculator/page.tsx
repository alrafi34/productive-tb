import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AmplifierGainCalculatorUI from "@/tools/amplifier-gain-calculator/ui";
import { amplifierGainCalculatorConfig } from "@/tools/amplifier-gain-calculator/config";

export const metadata: Metadata = {
  title: amplifierGainCalculatorConfig.seo.title,
  description: amplifierGainCalculatorConfig.seo.description,
  keywords: amplifierGainCalculatorConfig.seo.keywords,
  openGraph: {
    title: amplifierGainCalculatorConfig.seo.og.title,
    description: amplifierGainCalculatorConfig.seo.og.description,
    type: "website",
    url: amplifierGainCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: amplifierGainCalculatorConfig.seo.og.url,
  },
};

export default function AmplifierGainCalculatorPage() {
  return (
    <ToolLayout
      title={amplifierGainCalculatorConfig.name}
      description={amplifierGainCalculatorConfig.description}
      icon={amplifierGainCalculatorConfig.icon}
    >
      <AmplifierGainCalculatorUI />
    </ToolLayout>
  );
}
