import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ColumnBucklingCalculatorUI from "@/tools/column-buckling-calculator/ui";
import { columnBucklingCalculatorConfig } from "@/tools/column-buckling-calculator/config";

export const metadata: Metadata = {
  title: columnBucklingCalculatorConfig.seo.title,
  description: columnBucklingCalculatorConfig.seo.description,
  keywords: columnBucklingCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Column+Buckling+Calculator", width: 1200, height: 630, alt: "Column Buckling Calculator" }],
    title: columnBucklingCalculatorConfig.seo.og.title,
    description: columnBucklingCalculatorConfig.seo.og.description,
    type: "website",
    url: columnBucklingCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: columnBucklingCalculatorConfig.seo.og.title,
    description: columnBucklingCalculatorConfig.seo.og.description,
    images: ["/og?title=Column+Buckling+Calculator"],
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
