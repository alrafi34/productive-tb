import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LoanInterestCalculatorPropertyUI from "@/tools/loan-interest-calculator-property/ui";
import { loanInterestCalculatorPropertyConfig } from "@/tools/loan-interest-calculator-property/config";

export const metadata: Metadata = {
  title: loanInterestCalculatorPropertyConfig.seo.title,
  description: loanInterestCalculatorPropertyConfig.seo.description,
  keywords: loanInterestCalculatorPropertyConfig.seo.keywords,
  openGraph: {
    title: loanInterestCalculatorPropertyConfig.seo.og.title,
    description: loanInterestCalculatorPropertyConfig.seo.og.description,
    type: "website",
    url: loanInterestCalculatorPropertyConfig.seo.og.url,
  },
  alternates: {
    canonical: loanInterestCalculatorPropertyConfig.seo.og.url,
  },
};

export default function LoanInterestCalculatorPropertyPage() {
  return (
    <ToolLayout
      title={loanInterestCalculatorPropertyConfig.name}
      description={loanInterestCalculatorPropertyConfig.description}
      icon={loanInterestCalculatorPropertyConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <LoanInterestCalculatorPropertyUI />
    </ToolLayout>
  );
}
