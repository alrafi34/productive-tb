import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PowerSupplyCalculatorUI from "@/tools/power-supply-calculator/ui";
import { powerSupplyCalculatorConfig } from "@/tools/power-supply-calculator/config";

export const metadata: Metadata = {
  title: powerSupplyCalculatorConfig.seo.title,
  description: powerSupplyCalculatorConfig.seo.description,
  keywords: powerSupplyCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Power+Supply+Calculator", width: 1200, height: 630, alt: "Power Supply Calculator" }],
    title: powerSupplyCalculatorConfig.seo.og.title,
    description: powerSupplyCalculatorConfig.seo.og.description,
    url: powerSupplyCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: powerSupplyCalculatorConfig.seo.og.title,
    description: powerSupplyCalculatorConfig.seo.og.description,
    images: ["/og?title=Power+Supply+Calculator"],
  },
};

export default function PowerSupplyCalculatorPage() {
  return (
    <ToolLayout
      title={powerSupplyCalculatorConfig.name}
      description={powerSupplyCalculatorConfig.description}
      icon={powerSupplyCalculatorConfig.icon}
    >
      <PowerSupplyCalculatorUI />
    </ToolLayout>
  );
}