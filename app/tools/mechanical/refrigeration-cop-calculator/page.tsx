import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RefrigerationCOPCalculatorUI from "@/tools/refrigeration-cop-calculator/ui";
import { toolConfig } from "@/tools/refrigeration-cop-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function RefrigerationCOPCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <RefrigerationCOPCalculatorUI />
    </ToolLayout>
  );
}
