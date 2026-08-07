import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BernoulliEquationCalculatorUI from "@/tools/bernoulli-equation-calculator/ui";
import { bernoulliEquationCalculatorConfig } from "@/tools/bernoulli-equation-calculator/config";

export const metadata: Metadata = {
  title: bernoulliEquationCalculatorConfig.seo.title,
  description: bernoulliEquationCalculatorConfig.seo.description,
  keywords: bernoulliEquationCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Bernoulli+Equation+Calculator", width: 1200, height: 630, alt: "Bernoulli Equation Calculator" }],
    title: bernoulliEquationCalculatorConfig.seo.og.title,
    description: bernoulliEquationCalculatorConfig.seo.og.description,
    type: "website",
    url: bernoulliEquationCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: bernoulliEquationCalculatorConfig.seo.og.title,
    description: bernoulliEquationCalculatorConfig.seo.og.description,
    images: ["/og?title=Bernoulli+Equation+Calculator"],
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
