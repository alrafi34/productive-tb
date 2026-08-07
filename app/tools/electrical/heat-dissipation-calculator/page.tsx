import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatDissipationCalculatorUI from "@/tools/heat-dissipation-calculator/ui";
import { heatDissipationCalculatorConfig } from "@/tools/heat-dissipation-calculator/config";

export const metadata: Metadata = {
  title: heatDissipationCalculatorConfig.seo.title,
  description: heatDissipationCalculatorConfig.seo.description,
  keywords: heatDissipationCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Heat+Dissipation+Calculator", width: 1200, height: 630, alt: "Heat Dissipation Calculator" }],
    title: heatDissipationCalculatorConfig.seo.og.title,
    description: heatDissipationCalculatorConfig.seo.og.description,
    url: heatDissipationCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: heatDissipationCalculatorConfig.seo.og.title,
    description: heatDissipationCalculatorConfig.seo.og.description,
    images: ["/og?title=Heat+Dissipation+Calculator"],
  },
};

export default function HeatDissipationCalculatorPage() {
  return (
    <ToolLayout
      title={heatDissipationCalculatorConfig.name}
      description={heatDissipationCalculatorConfig.description}
      icon={heatDissipationCalculatorConfig.icon}
    >
      <HeatDissipationCalculatorUI />
    </ToolLayout>
  );
}