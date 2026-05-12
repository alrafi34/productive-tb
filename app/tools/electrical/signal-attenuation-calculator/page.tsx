import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SignalAttenuationCalculatorUI from "@/tools/signal-attenuation-calculator/ui";
import { signalAttenuationCalculatorConfig } from "@/tools/signal-attenuation-calculator/config";

export const metadata: Metadata = {
  title: signalAttenuationCalculatorConfig.seo.title,
  description: signalAttenuationCalculatorConfig.seo.description,
  keywords: signalAttenuationCalculatorConfig.seo.keywords,
  openGraph: {
    title: signalAttenuationCalculatorConfig.seo.og.title,
    description: signalAttenuationCalculatorConfig.seo.og.description,
    type: "website",
    url: signalAttenuationCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: signalAttenuationCalculatorConfig.seo.og.url,
  },
};

export default function SignalAttenuationCalculatorPage() {
  return (
    <ToolLayout
      title={signalAttenuationCalculatorConfig.name}
      description={signalAttenuationCalculatorConfig.description}
      icon={signalAttenuationCalculatorConfig.icon}
    >
      <SignalAttenuationCalculatorUI />
    </ToolLayout>
  );
}
