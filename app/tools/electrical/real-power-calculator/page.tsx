import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RealPowerCalculatorUI from "@/tools/real-power-calculator/ui";
import { realPowerCalculatorConfig } from "@/tools/real-power-calculator/config";

export const metadata: Metadata = {
  title: realPowerCalculatorConfig.seo.title,
  description: realPowerCalculatorConfig.seo.description,
  keywords: realPowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Real+Power+Calculator", width: 1200, height: 630, alt: "Real Power Calculator" }],
    title: realPowerCalculatorConfig.seo.og.title,
    description: realPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: realPowerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: realPowerCalculatorConfig.seo.og.title,
    description: realPowerCalculatorConfig.seo.og.description,
    images: ["/og?title=Real+Power+Calculator"],
  },
};

export default function RealPowerCalculatorPage() {
  return (
    <ToolLayout
      title={realPowerCalculatorConfig.name}
      description={realPowerCalculatorConfig.description}
      icon={realPowerCalculatorConfig.icon}
    >
      <RealPowerCalculatorUI />
    </ToolLayout>
  );
}
