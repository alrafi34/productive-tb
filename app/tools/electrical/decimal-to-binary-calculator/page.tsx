import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DecimalToBinaryCalculatorUI from "@/tools/decimal-to-binary-calculator/ui";
import { decimalToBinaryCalculatorConfig } from "@/tools/decimal-to-binary-calculator/config";

export const metadata: Metadata = {
  title: decimalToBinaryCalculatorConfig.seo.title,
  description: decimalToBinaryCalculatorConfig.seo.description,
  keywords: decimalToBinaryCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Decimal+to+Binary+Calculator", width: 1200, height: 630, alt: "Decimal to Binary Calculator" }],
    title: decimalToBinaryCalculatorConfig.seo.og.title,
    description: decimalToBinaryCalculatorConfig.seo.og.description,
    type: "website",
    url: decimalToBinaryCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: decimalToBinaryCalculatorConfig.seo.og.title,
    description: decimalToBinaryCalculatorConfig.seo.og.description,
    images: ["/og?title=Decimal+to+Binary+Calculator"],
  },
  alternates: {
    canonical: decimalToBinaryCalculatorConfig.seo.og.url,
  },
};

export default function DecimalToBinaryCalculatorPage() {
  return (
    <ToolLayout
      title={decimalToBinaryCalculatorConfig.name}
      description={decimalToBinaryCalculatorConfig.description}
      icon={decimalToBinaryCalculatorConfig.icon}
    >
      <DecimalToBinaryCalculatorUI />
    </ToolLayout>
  );
}
