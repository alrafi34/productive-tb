import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ForceCalculatorUI from "@/tools/force-calculator/ui";
import { forceCalculatorConfig } from "@/tools/force-calculator/config";

export const metadata: Metadata = {
  title: forceCalculatorConfig.seo.title,
  description: forceCalculatorConfig.seo.description,
  keywords: forceCalculatorConfig.seo.keywords,
  openGraph: {
    title: forceCalculatorConfig.seo.og.title,
    description: forceCalculatorConfig.seo.og.description,
    type: "website",
    url: forceCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: forceCalculatorConfig.seo.og.url,
  },
};

export default function ForceCalculatorPage() {
  return (
    <ToolLayout
      title={forceCalculatorConfig.name}
      description={forceCalculatorConfig.description}
      icon={forceCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <ForceCalculatorUI />
    </ToolLayout>
  );
}
