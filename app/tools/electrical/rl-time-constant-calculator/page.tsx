import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RLTimeConstantCalculatorUI from "@/tools/rl-time-constant-calculator/ui";
import { rlTimeConstantCalculatorConfig } from "@/tools/rl-time-constant-calculator/config";

export const metadata: Metadata = {
  title: rlTimeConstantCalculatorConfig.seo.title,
  description: rlTimeConstantCalculatorConfig.seo.description,
  keywords: rlTimeConstantCalculatorConfig.seo.keywords,
  openGraph: {
    title: rlTimeConstantCalculatorConfig.seo.og.title,
    description: rlTimeConstantCalculatorConfig.seo.og.description,
    type: "website",
    url: rlTimeConstantCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: rlTimeConstantCalculatorConfig.seo.og.url,
  },
};

export default function RLTimeConstantCalculatorPage() {
  return (
    <ToolLayout
      title={rlTimeConstantCalculatorConfig.name}
      description={rlTimeConstantCalculatorConfig.description}
      icon={rlTimeConstantCalculatorConfig.icon}
    >
      <RLTimeConstantCalculatorUI />
    </ToolLayout>
  );
}
