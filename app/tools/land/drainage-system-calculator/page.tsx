import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DrainageSystemCalculatorUI from "@/tools/drainage-system-calculator/ui";
import { drainageSystemCalculatorConfig } from "@/tools/drainage-system-calculator/config";

export const metadata: Metadata = {
  title: drainageSystemCalculatorConfig.seo.title,
  description: drainageSystemCalculatorConfig.seo.description,
  keywords: drainageSystemCalculatorConfig.seo.keywords,
  openGraph: {
    title: drainageSystemCalculatorConfig.seo.og.title,
    description: drainageSystemCalculatorConfig.seo.og.description,
    type: "website",
    url: drainageSystemCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: drainageSystemCalculatorConfig.seo.og.url,
  },
};

export default function DrainageSystemCalculatorPage() {
  return (
    <ToolLayout
      title={drainageSystemCalculatorConfig.name}
      description={drainageSystemCalculatorConfig.description}
      icon={drainageSystemCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <DrainageSystemCalculatorUI />
    </ToolLayout>
  );
}
