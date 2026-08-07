import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AmplifierGainCalculatorUI from "@/tools/amplifier-gain-calculator/ui";
import { amplifierGainCalculatorConfig } from "@/tools/amplifier-gain-calculator/config";

export const metadata: Metadata = {
  title: amplifierGainCalculatorConfig.seo.title,
  description: amplifierGainCalculatorConfig.seo.description,
  keywords: amplifierGainCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Amplifier+Gain+Calculator", width: 1200, height: 630, alt: "Amplifier Gain Calculator" }],
    title: amplifierGainCalculatorConfig.seo.og.title,
    description: amplifierGainCalculatorConfig.seo.og.description,
    type: "website",
    url: amplifierGainCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: amplifierGainCalculatorConfig.seo.og.title,
    description: amplifierGainCalculatorConfig.seo.og.description,
    images: ["/og?title=Amplifier+Gain+Calculator"],
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
