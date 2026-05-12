import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InductiveReactanceCalculatorUI from "@/tools/inductive-reactance-calculator/ui";
import { inductiveReactanceCalculatorConfig } from "@/tools/inductive-reactance-calculator/config";

export const metadata: Metadata = {
  title: inductiveReactanceCalculatorConfig.seo.title,
  description: inductiveReactanceCalculatorConfig.seo.description,
  keywords: inductiveReactanceCalculatorConfig.seo.keywords,
  openGraph: {
    title: inductiveReactanceCalculatorConfig.seo.og.title,
    description: inductiveReactanceCalculatorConfig.seo.og.description,
    type: "website",
    url: inductiveReactanceCalculatorConfig.seo.og.url,
  },
};

export default function InductiveReactanceCalculatorPage() {
  return (
    <ToolLayout
      title={inductiveReactanceCalculatorConfig.name}
      description={inductiveReactanceCalculatorConfig.description}
      icon={inductiveReactanceCalculatorConfig.icon}
    >
      <InductiveReactanceCalculatorUI />
    </ToolLayout>
  );
}
