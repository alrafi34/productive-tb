import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HomeLoanEmiCalculatorUI from "@/tools/home-loan-emi-calculator/ui";
import { homeLoanEmiCalculatorConfig } from "@/tools/home-loan-emi-calculator/config";

export const metadata: Metadata = {
  title: homeLoanEmiCalculatorConfig.seo.title,
  description: homeLoanEmiCalculatorConfig.seo.description,
  keywords: homeLoanEmiCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Home+Loan+EMI+Calculator", width: 1200, height: 630, alt: "Home Loan EMI Calculator" }],
    title: homeLoanEmiCalculatorConfig.seo.og.title,
    description: homeLoanEmiCalculatorConfig.seo.og.description,
    type: "website",
    url: homeLoanEmiCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: homeLoanEmiCalculatorConfig.seo.og.title,
    description: homeLoanEmiCalculatorConfig.seo.og.description,
    images: ["/og?title=Home+Loan+EMI+Calculator"],
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
