import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RCTimeConstantCalculatorUI from "@/tools/rc-time-constant-calculator/ui";
import { rcTimeConstantCalculatorConfig } from "@/tools/rc-time-constant-calculator/config";

export const metadata: Metadata = {
  title: rcTimeConstantCalculatorConfig.seo.title,
  description: rcTimeConstantCalculatorConfig.seo.description,
  keywords: rcTimeConstantCalculatorConfig.seo.keywords,
  openGraph: {
    title: rcTimeConstantCalculatorConfig.seo.og.title,
    description: rcTimeConstantCalculatorConfig.seo.og.description,
    type: "website",
    url: rcTimeConstantCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: rcTimeConstantCalculatorConfig.seo.og.url,
  },
};

export default function RCTimeConstantCalculatorPage() {
  return (
    <ToolLayout
      title={rcTimeConstantCalculatorConfig.name}
      description={rcTimeConstantCalculatorConfig.description}
      icon={rcTimeConstantCalculatorConfig.icon}
    >
      <RCTimeConstantCalculatorUI />
    </ToolLayout>
  );
}
