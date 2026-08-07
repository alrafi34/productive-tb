import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import IdealGasLawCalculatorUI from "@/tools/ideal-gas-law-calculator/ui";
import { idealGasLawCalculatorConfig } from "@/tools/ideal-gas-law-calculator/config";

export const metadata: Metadata = {
  title: idealGasLawCalculatorConfig.seo.title,
  description: idealGasLawCalculatorConfig.seo.description,
  keywords: idealGasLawCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Ideal+Gas+Law+Calculator", width: 1200, height: 630, alt: "Ideal Gas Law Calculator" }],
    title: idealGasLawCalculatorConfig.seo.og.title,
    description: idealGasLawCalculatorConfig.seo.og.description,
    type: "website",
    url: idealGasLawCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: idealGasLawCalculatorConfig.seo.og.title,
    description: idealGasLawCalculatorConfig.seo.og.description,
    images: ["/og?title=Ideal+Gas+Law+Calculator"],
  },
  alternates: {
    canonical: idealGasLawCalculatorConfig.seo.og.url,
  },
};

export default function IdealGasLawCalculatorPage() {
  return (
    <ToolLayout
      title={idealGasLawCalculatorConfig.name}
      description={idealGasLawCalculatorConfig.description}
      icon={idealGasLawCalculatorConfig.icon}
    >
      <IdealGasLawCalculatorUI />
    </ToolLayout>
  );
}
