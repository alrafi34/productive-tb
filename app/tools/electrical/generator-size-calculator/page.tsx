import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GeneratorSizeCalculatorUI from "@/tools/generator-size-calculator/ui";
import { generatorSizeCalculatorConfig } from "@/tools/generator-size-calculator/config";

export const metadata: Metadata = {
  title: generatorSizeCalculatorConfig.seo.title,
  description: generatorSizeCalculatorConfig.seo.description,
  keywords: generatorSizeCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Generator+Size+Calculator", width: 1200, height: 630, alt: "Generator Size Calculator" }],
    title: generatorSizeCalculatorConfig.seo.og.title,
    description: generatorSizeCalculatorConfig.seo.og.description,
    type: "website",
    url: generatorSizeCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: generatorSizeCalculatorConfig.seo.og.title,
    description: generatorSizeCalculatorConfig.seo.og.description,
    images: ["/og?title=Generator+Size+Calculator"],
  },
  alternates: {
    canonical: generatorSizeCalculatorConfig.seo.og.url,
  },
};

export default function GeneratorSizeCalculatorPage() {
  return (
    <ToolLayout
      title={generatorSizeCalculatorConfig.name}
      description={generatorSizeCalculatorConfig.description}
      icon={generatorSizeCalculatorConfig.icon}
    >
      <GeneratorSizeCalculatorUI />
    </ToolLayout>
  );
}
