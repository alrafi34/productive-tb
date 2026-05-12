import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import OpAmpCalculatorUI from "@/tools/op-amp-calculator/ui";
import { opAmpCalculatorConfig } from "@/tools/op-amp-calculator/config";

export const metadata: Metadata = {
  title: opAmpCalculatorConfig.seo.title,
  description: opAmpCalculatorConfig.seo.description,
  keywords: opAmpCalculatorConfig.seo.keywords,
  openGraph: {
    title: opAmpCalculatorConfig.seo.og.title,
    description: opAmpCalculatorConfig.seo.og.description,
    type: "website",
    url: opAmpCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: opAmpCalculatorConfig.seo.og.url,
  },
};

export default function OpAmpCalculatorPage() {
  return (
    <ToolLayout
      title={opAmpCalculatorConfig.name}
      description={opAmpCalculatorConfig.description}
      icon={opAmpCalculatorConfig.icon}
    >
      <OpAmpCalculatorUI />
    </ToolLayout>
  );
}
