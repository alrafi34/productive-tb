import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MortgageLoanCalculatorUI from "@/tools/mortgage-loan-calculator/ui";
import { mortgageLoanCalculatorConfig } from "@/tools/mortgage-loan-calculator/config";

export const metadata: Metadata = {
  title: mortgageLoanCalculatorConfig.seo.title,
  description: mortgageLoanCalculatorConfig.seo.description,
  keywords: mortgageLoanCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Mortgage+Loan+Calculator", width: 1200, height: 630, alt: "Mortgage Loan Calculator" }],
    title: mortgageLoanCalculatorConfig.seo.og.title,
    description: mortgageLoanCalculatorConfig.seo.og.description,
    type: "website",
    url: mortgageLoanCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: mortgageLoanCalculatorConfig.seo.og.title,
    description: mortgageLoanCalculatorConfig.seo.og.description,
    images: ["/og?title=Mortgage+Loan+Calculator"],
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
