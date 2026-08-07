import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SMPSCalculatorUI from "@/tools/smps-calculator/ui";
import { smpsCalculatorConfig } from "@/tools/smps-calculator/config";

export const metadata: Metadata = {
  title: smpsCalculatorConfig.seo.title,
  description: smpsCalculatorConfig.seo.description,
  keywords: smpsCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=SMPS+Calculator", width: 1200, height: 630, alt: "SMPS Calculator" }],
    title: smpsCalculatorConfig.seo.og.title,
    description: smpsCalculatorConfig.seo.og.description,
    url: smpsCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: smpsCalculatorConfig.seo.og.title,
    description: smpsCalculatorConfig.seo.og.description,
    images: ["/og?title=SMPS+Calculator"],
  },
};

export default function SMPSCalculatorPage() {
  return (
    <ToolLayout
      title={smpsCalculatorConfig.name}
      description={smpsCalculatorConfig.description}
      icon={smpsCalculatorConfig.icon}
    >
      <SMPSCalculatorUI />
    </ToolLayout>
  );
}