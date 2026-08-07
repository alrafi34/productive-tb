import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InductiveReactanceCalculatorUI from "@/tools/inductive-reactance-calculator/ui";
import { inductiveReactanceCalculatorConfig } from "@/tools/inductive-reactance-calculator/config";

export const metadata: Metadata = {
  title: inductiveReactanceCalculatorConfig.seo.title,
  description: inductiveReactanceCalculatorConfig.seo.description,
  keywords: inductiveReactanceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Inductive+Reactance+Calculator", width: 1200, height: 630, alt: "Inductive Reactance Calculator" }],
    title: inductiveReactanceCalculatorConfig.seo.og.title,
    description: inductiveReactanceCalculatorConfig.seo.og.description,
    type: "website",
    url: inductiveReactanceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: inductiveReactanceCalculatorConfig.seo.og.title,
    description: inductiveReactanceCalculatorConfig.seo.og.description,
    images: ["/og?title=Inductive+Reactance+Calculator"],
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
