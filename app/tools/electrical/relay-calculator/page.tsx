import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RelayCalculatorUI from "@/tools/relay-calculator/ui";
import { relayCalculatorConfig } from "@/tools/relay-calculator/config";

export const metadata: Metadata = {
  title: relayCalculatorConfig.seo.title,
  description: relayCalculatorConfig.seo.description,
  keywords: relayCalculatorConfig.seo.keywords,
  openGraph: {
    title: relayCalculatorConfig.seo.og.title,
    description: relayCalculatorConfig.seo.og.description,
    type: "website",
    url: relayCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: relayCalculatorConfig.seo.og.url,
  },
};

export default function RelayCalculatorPage() {
  return (
    <ToolLayout
      title={relayCalculatorConfig.name}
      description={relayCalculatorConfig.description}
      icon={relayCalculatorConfig.icon}
    >
      <RelayCalculatorUI />
    </ToolLayout>
  );
}
