import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ApparentPowerCalculatorUI from "@/tools/apparent-power-calculator/ui";
import { apparentPowerCalculatorConfig } from "@/tools/apparent-power-calculator/config";

export const metadata: Metadata = {
  title: apparentPowerCalculatorConfig.seo.title,
  description: apparentPowerCalculatorConfig.seo.description,
  keywords: apparentPowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Apparent+Power+Calculator", width: 1200, height: 630, alt: "Apparent Power Calculator" }],
    title: apparentPowerCalculatorConfig.seo.og.title,
    description: apparentPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: apparentPowerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: apparentPowerCalculatorConfig.seo.og.title,
    description: apparentPowerCalculatorConfig.seo.og.description,
    images: ["/og?title=Apparent+Power+Calculator"],
  },
};

export default function ApparentPowerCalculatorPage() {
  return (
    <ToolLayout
      title={apparentPowerCalculatorConfig.name}
      description={apparentPowerCalculatorConfig.description}
      icon={apparentPowerCalculatorConfig.icon}
    >
      <ApparentPowerCalculatorUI />
    </ToolLayout>
  );
}
