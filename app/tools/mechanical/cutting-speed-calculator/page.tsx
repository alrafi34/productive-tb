import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CuttingSpeedCalculatorUI from "@/tools/cutting-speed-calculator/ui";
import { cuttingSpeedCalculatorConfig } from "@/tools/cutting-speed-calculator/config";

export const metadata: Metadata = {
  title: cuttingSpeedCalculatorConfig.seo.title,
  description: cuttingSpeedCalculatorConfig.seo.description,
  keywords: cuttingSpeedCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Cutting+Speed+Calculator", width: 1200, height: 630, alt: "Cutting Speed Calculator" }],
    title: cuttingSpeedCalculatorConfig.seo.og.title,
    description: cuttingSpeedCalculatorConfig.seo.og.description,
    type: "website",
    url: cuttingSpeedCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: cuttingSpeedCalculatorConfig.seo.og.title,
    description: cuttingSpeedCalculatorConfig.seo.og.description,
    images: ["/og?title=Cutting+Speed+Calculator"],
  },
  alternates: {
    canonical: cuttingSpeedCalculatorConfig.seo.og.url,
  },
};

export default function CuttingSpeedCalculatorPage() {
  return (
    <ToolLayout
      title={cuttingSpeedCalculatorConfig.name}
      description={cuttingSpeedCalculatorConfig.description}
      icon={cuttingSpeedCalculatorConfig.icon}
    >
      <CuttingSpeedCalculatorUI />
    </ToolLayout>
  );
}
