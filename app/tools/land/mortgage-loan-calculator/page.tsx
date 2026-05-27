import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MortgageLoanCalculatorUI from "@/tools/mortgage-loan-calculator/ui";
import { mortgageLoanCalculatorConfig } from "@/tools/mortgage-loan-calculator/config";

export const metadata: Metadata = {
  title: mortgageLoanCalculatorConfig.seo.title,
  description: mortgageLoanCalculatorConfig.seo.description,
  keywords: mortgageLoanCalculatorConfig.seo.keywords,
  openGraph: {
    title: mortgageLoanCalculatorConfig.seo.og.title,
    description: mortgageLoanCalculatorConfig.seo.og.description,
    type: "website",
    url: mortgageLoanCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: mortgageLoanCalculatorConfig.seo.og.url,
  },
};

export default function MortgageLoanCalculatorPage() {
  return (
    <ToolLayout
      title={mortgageLoanCalculatorConfig.name}
      description={mortgageLoanCalculatorConfig.description}
      icon={mortgageLoanCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <MortgageLoanCalculatorUI />
    </ToolLayout>
  );
}
