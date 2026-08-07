import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RFPowerCalculatorUI from "@/tools/rf-power-calculator/ui";
import { rfPowerCalculatorConfig } from "@/tools/rf-power-calculator/config";

export const metadata: Metadata = {
  title: rfPowerCalculatorConfig.seo.title,
  description: rfPowerCalculatorConfig.seo.description,
  keywords: rfPowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=RF+Power+Calculator", width: 1200, height: 630, alt: "RF Power Calculator" }],
    title: rfPowerCalculatorConfig.seo.og.title,
    description: rfPowerCalculatorConfig.seo.og.description,
    url: rfPowerCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: rfPowerCalculatorConfig.seo.og.title,
    description: rfPowerCalculatorConfig.seo.og.description,
    images: ["/og?title=RF+Power+Calculator"],
  },
};

export default function RFPowerCalculatorPage() {
  return (
    <ToolLayout
      title={rfPowerCalculatorConfig.name}
      description={rfPowerCalculatorConfig.description}
      icon={rfPowerCalculatorConfig.icon}
    >
      <RFPowerCalculatorUI />
    </ToolLayout>
  );
}
