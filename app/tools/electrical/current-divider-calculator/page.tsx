import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CurrentDividerCalculatorUI from "@/tools/current-divider-calculator/ui";
import { currentDividerCalculatorConfig } from "@/tools/current-divider-calculator/config";

export const metadata: Metadata = {
  title: currentDividerCalculatorConfig.seo.title,
  description: currentDividerCalculatorConfig.seo.description,
  keywords: currentDividerCalculatorConfig.seo.keywords,
  openGraph: {
    title: currentDividerCalculatorConfig.seo.og.title,
    description: currentDividerCalculatorConfig.seo.og.description,
    url: currentDividerCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function CurrentDividerCalculatorPage() {
  return (
    <ToolLayout
      title={currentDividerCalculatorConfig.name}
      description={currentDividerCalculatorConfig.description}
      icon={currentDividerCalculatorConfig.icon}
      category={{ slug: "electrical", name: "Electrical" }}
    >
      <CurrentDividerCalculatorUI />
    </ToolLayout>
  );
}