import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DownPaymentCalculatorUI from "@/tools/down-payment-calculator/ui";
import { downPaymentCalculatorConfig } from "@/tools/down-payment-calculator/config";

export const metadata: Metadata = {
  title: downPaymentCalculatorConfig.seo.title,
  description: downPaymentCalculatorConfig.seo.description,
  keywords: downPaymentCalculatorConfig.seo.keywords,
  openGraph: {
    title: downPaymentCalculatorConfig.seo.og.title,
    description: downPaymentCalculatorConfig.seo.og.description,
    type: "website",
    url: downPaymentCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: downPaymentCalculatorConfig.seo.og.url,
  },
};

export default function DownPaymentCalculatorPage() {
  return (
    <ToolLayout
      title={downPaymentCalculatorConfig.name}
      description={downPaymentCalculatorConfig.description}
      icon={downPaymentCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <DownPaymentCalculatorUI />
    </ToolLayout>
  );
}
