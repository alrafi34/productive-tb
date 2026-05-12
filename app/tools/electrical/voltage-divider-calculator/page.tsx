import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VoltageDividerCalculatorUI from "@/tools/voltage-divider-calculator/ui";
import { voltageDividerCalculatorConfig } from "@/tools/voltage-divider-calculator/config";

export const metadata: Metadata = {
  title: voltageDividerCalculatorConfig.seo.title,
  description: voltageDividerCalculatorConfig.seo.description,
  keywords: voltageDividerCalculatorConfig.seo.keywords,
  openGraph: {
    title: voltageDividerCalculatorConfig.seo.og.title,
    description: voltageDividerCalculatorConfig.seo.og.description,
    type: "website",
    url: voltageDividerCalculatorConfig.seo.og.url,
  },
};

export default function VoltageDividerCalculatorPage() {
  return (
    <ToolLayout
      title={voltageDividerCalculatorConfig.name}
      description={voltageDividerCalculatorConfig.description}
      icon={voltageDividerCalculatorConfig.icon}
    >
      <VoltageDividerCalculatorUI />
    </ToolLayout>
  );
}
