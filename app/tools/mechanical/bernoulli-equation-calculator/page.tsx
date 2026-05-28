import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BernoulliEquationCalculatorUI from "@/tools/bernoulli-equation-calculator/ui";
import { bernoulliEquationCalculatorConfig } from "@/tools/bernoulli-equation-calculator/config";

export const metadata: Metadata = {
  title: bernoulliEquationCalculatorConfig.seo.title,
  description: bernoulliEquationCalculatorConfig.seo.description,
  keywords: bernoulliEquationCalculatorConfig.seo.keywords,
  openGraph: {
    title: bernoulliEquationCalculatorConfig.seo.og.title,
    description: bernoulliEquationCalculatorConfig.seo.og.description,
    type: "website",
    url: bernoulliEquationCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: bernoulliEquationCalculatorConfig.seo.og.url,
  },
};

export default function BernoulliEquationCalculatorPage() {
  return (
    <ToolLayout
      title={bernoulliEquationCalculatorConfig.name}
      description={bernoulliEquationCalculatorConfig.description}
      icon={bernoulliEquationCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <BernoulliEquationCalculatorUI />
    </ToolLayout>
  );
}
