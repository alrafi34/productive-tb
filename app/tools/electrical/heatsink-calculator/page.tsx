import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatsinkCalculatorUI from "@/tools/heatsink-calculator/ui";
import { heatsinkCalculatorConfig } from "@/tools/heatsink-calculator/config";

export const metadata: Metadata = {
  title: heatsinkCalculatorConfig.seo.title,
  description: heatsinkCalculatorConfig.seo.description,
  keywords: heatsinkCalculatorConfig.seo.keywords,
  openGraph: {
    title: heatsinkCalculatorConfig.seo.og.title,
    description: heatsinkCalculatorConfig.seo.og.description,
    url: heatsinkCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function HeatsinkCalculatorPage() {
  return (
    <ToolLayout
      title={heatsinkCalculatorConfig.name}
      description={heatsinkCalculatorConfig.description}
      icon={heatsinkCalculatorConfig.icon}
    >
      <HeatsinkCalculatorUI />
    </ToolLayout>
  );
}