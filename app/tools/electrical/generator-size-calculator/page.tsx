import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GeneratorSizeCalculatorUI from "@/tools/generator-size-calculator/ui";
import { generatorSizeCalculatorConfig } from "@/tools/generator-size-calculator/config";

export const metadata: Metadata = {
  title: generatorSizeCalculatorConfig.seo.title,
  description: generatorSizeCalculatorConfig.seo.description,
  keywords: generatorSizeCalculatorConfig.seo.keywords,
  openGraph: {
    title: generatorSizeCalculatorConfig.seo.og.title,
    description: generatorSizeCalculatorConfig.seo.og.description,
    type: "website",
    url: generatorSizeCalculatorConfig.seo.og.url,
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
