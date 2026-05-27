import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HomeLoanEmiCalculatorUI from "@/tools/home-loan-emi-calculator/ui";
import { homeLoanEmiCalculatorConfig } from "@/tools/home-loan-emi-calculator/config";

export const metadata: Metadata = {
  title: homeLoanEmiCalculatorConfig.seo.title,
  description: homeLoanEmiCalculatorConfig.seo.description,
  keywords: homeLoanEmiCalculatorConfig.seo.keywords,
  openGraph: {
    title: homeLoanEmiCalculatorConfig.seo.og.title,
    description: homeLoanEmiCalculatorConfig.seo.og.description,
    type: "website",
    url: homeLoanEmiCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: homeLoanEmiCalculatorConfig.seo.og.url,
  },
};

export default function HomeLoanEmiCalculatorPage() {
  return (
    <ToolLayout
      title={homeLoanEmiCalculatorConfig.name}
      description={homeLoanEmiCalculatorConfig.description}
      icon={homeLoanEmiCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <HomeLoanEmiCalculatorUI />
    </ToolLayout>
  );
}
