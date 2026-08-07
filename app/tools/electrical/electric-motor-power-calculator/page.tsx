import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ElectricMotorPowerCalculatorUI from "@/tools/electric-motor-power-calculator/ui";
import { electricMotorPowerCalculatorConfig } from "@/tools/electric-motor-power-calculator/config";

export const metadata: Metadata = {
  title: electricMotorPowerCalculatorConfig.seo.title,
  description: electricMotorPowerCalculatorConfig.seo.description,
  keywords: electricMotorPowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Electric+Motor+Power+Calculator", width: 1200, height: 630, alt: "Electric Motor Power Calculator" }],
    title: electricMotorPowerCalculatorConfig.seo.og.title,
    description: electricMotorPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: electricMotorPowerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: electricMotorPowerCalculatorConfig.seo.og.title,
    description: electricMotorPowerCalculatorConfig.seo.og.description,
    images: ["/og?title=Electric+Motor+Power+Calculator"],
  },
  alternates: {
    canonical: electricMotorPowerCalculatorConfig.seo.og.url,
  },
};

export default function ElectricMotorPowerCalculatorPage() {
  return (
    <ToolLayout
      title={electricMotorPowerCalculatorConfig.name}
      description={electricMotorPowerCalculatorConfig.description}
      icon={electricMotorPowerCalculatorConfig.icon}
    >
      <ElectricMotorPowerCalculatorUI />
    </ToolLayout>
  );
}
