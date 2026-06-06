import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ColumnBucklingCalculatorUI from "@/tools/column-buckling-calculator/ui";
import { columnBucklingCalculatorConfig } from "@/tools/column-buckling-calculator/config";

export const metadata: Metadata = {
  title: columnBucklingCalculatorConfig.seo.title,
  description: columnBucklingCalculatorConfig.seo.description,
  keywords: columnBucklingCalculatorConfig.seo.keywords,
  openGraph: {
    title: columnBucklingCalculatorConfig.seo.og.title,
    description: columnBucklingCalculatorConfig.seo.og.description,
    type: "website",
    url: columnBucklingCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: columnBucklingCalculatorConfig.seo.og.url,
  },
};

export default function ColumnBucklingCalculatorPage() {
  return (
    <ToolLayout
      title={columnBucklingCalculatorConfig.name}
      description={columnBucklingCalculatorConfig.description}
      icon={columnBucklingCalculatorConfig.icon}
    >
      <ColumnBucklingCalculatorUI />
    </ToolLayout>
  );
}
