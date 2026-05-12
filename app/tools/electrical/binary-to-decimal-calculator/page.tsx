import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BinaryToDecimalCalculatorUI from "@/tools/binary-to-decimal-calculator/ui";
import { binaryToDecimalCalculatorConfig } from "@/tools/binary-to-decimal-calculator/config";

export const metadata: Metadata = {
  title: binaryToDecimalCalculatorConfig.seo.title,
  description: binaryToDecimalCalculatorConfig.seo.description,
  keywords: binaryToDecimalCalculatorConfig.seo.keywords,
  openGraph: {
    title: binaryToDecimalCalculatorConfig.seo.og.title,
    description: binaryToDecimalCalculatorConfig.seo.og.description,
    type: "website",
    url: binaryToDecimalCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: binaryToDecimalCalculatorConfig.seo.og.url,
  },
};

export default function BinaryToDecimalCalculatorPage() {
  return (
    <ToolLayout
      title={binaryToDecimalCalculatorConfig.name}
      description={binaryToDecimalCalculatorConfig.description}
      icon={binaryToDecimalCalculatorConfig.icon}
    >
      <BinaryToDecimalCalculatorUI />
    </ToolLayout>
  );
}
