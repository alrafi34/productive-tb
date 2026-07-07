import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BreakEvenCalculatorUI from "@/tools/break-even-calculator/ui";
import { breakEvenCalculatorConfig as config } from "@/tools/break-even-calculator/config";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    ...config.seo.openGraph,
    type: "website",
  },
  alternates: {
    canonical: config.seo.openGraph.url,
  },
};

export default function BreakEvenCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <BreakEvenCalculatorUI />
    </ToolLayout>
  );
}
