import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ReynoldsNumberCalculatorUI from "@/tools/reynolds-number-calculator/ui";
import { reynoldsNumberCalculatorConfig } from "@/tools/reynolds-number-calculator/config";

export const metadata: Metadata = {
  title: reynoldsNumberCalculatorConfig.seo.title,
  description: reynoldsNumberCalculatorConfig.seo.description,
  keywords: reynoldsNumberCalculatorConfig.seo.keywords,
  openGraph: {
    title: reynoldsNumberCalculatorConfig.seo.og.title,
    description: reynoldsNumberCalculatorConfig.seo.og.description,
    type: "website",
    url: reynoldsNumberCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: reynoldsNumberCalculatorConfig.seo.og.url,
  },
};

export default function ReynoldsNumberCalculatorPage() {
  return (
    <ToolLayout
      title={reynoldsNumberCalculatorConfig.name}
      description={reynoldsNumberCalculatorConfig.description}
      icon={reynoldsNumberCalculatorConfig.icon}
    >
      <ReynoldsNumberCalculatorUI />
    </ToolLayout>
  );
}
