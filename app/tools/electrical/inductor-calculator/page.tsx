import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import InductorCalculatorUI from "@/tools/inductor-calculator/ui";
import { inductorCalculatorConfig } from "@/tools/inductor-calculator/config";

export const metadata: Metadata = {
  title: inductorCalculatorConfig.seo.title,
  description: inductorCalculatorConfig.seo.description,
  keywords: inductorCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Inductor+Calculator", width: 1200, height: 630, alt: "Inductor Calculator" }],
    title: inductorCalculatorConfig.seo.og.title,
    description: inductorCalculatorConfig.seo.og.description,
    type: "website",
    url: inductorCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: inductorCalculatorConfig.seo.og.title,
    description: inductorCalculatorConfig.seo.og.description,
    images: ["/og?title=Inductor+Calculator"],
  },
};

export default function InductorCalculatorPage() {
  return (
    <ToolLayout
      title={inductorCalculatorConfig.name}
      description={inductorCalculatorConfig.description}
      icon={inductorCalculatorConfig.icon}
    >
      <InductorCalculatorUI />
    </ToolLayout>
  );
}
