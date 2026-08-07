import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import LoanInterestCalculatorPropertyUI from "@/tools/loan-interest-calculator-property/ui";
import { loanInterestCalculatorPropertyConfig } from "@/tools/loan-interest-calculator-property/config";

export const metadata: Metadata = {
  title: loanInterestCalculatorPropertyConfig.seo.title,
  description: loanInterestCalculatorPropertyConfig.seo.description,
  keywords: loanInterestCalculatorPropertyConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Loan+Interest+Calculator+(Property)", width: 1200, height: 630, alt: "Loan Interest Calculator (Property)" }],
    title: loanInterestCalculatorPropertyConfig.seo.og.title,
    description: loanInterestCalculatorPropertyConfig.seo.og.description,
    type: "website",
    url: loanInterestCalculatorPropertyConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: loanInterestCalculatorPropertyConfig.seo.og.title,
    description: loanInterestCalculatorPropertyConfig.seo.og.description,
    images: ["/og?title=Loan+Interest+Calculator+(Property)"],
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
