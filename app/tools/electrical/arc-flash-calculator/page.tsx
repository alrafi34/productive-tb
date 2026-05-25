import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ArcFlashCalculatorUI from "@/tools/arc-flash-calculator/ui";
import { arcFlashCalculatorConfig } from "@/tools/arc-flash-calculator/config";

export const metadata: Metadata = {
  title: arcFlashCalculatorConfig.seo.title,
  description: arcFlashCalculatorConfig.seo.description,
  keywords: arcFlashCalculatorConfig.seo.keywords,
  openGraph: {
    title: arcFlashCalculatorConfig.seo.og.title,
    description: arcFlashCalculatorConfig.seo.og.description,
    url: arcFlashCalculatorConfig.seo.og.url,
    type: "website",
  },
};

export default function ArcFlashCalculatorPage() {
  return (
    <ToolLayout
      title={arcFlashCalculatorConfig.name}
      description={arcFlashCalculatorConfig.description}
      icon={arcFlashCalculatorConfig.icon}
    >
      <ArcFlashCalculatorUI />
    </ToolLayout>
  );
}