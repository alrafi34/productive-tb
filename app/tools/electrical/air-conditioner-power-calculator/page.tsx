import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AirConditionerPowerCalculatorUI from "@/tools/air-conditioner-power-calculator/ui";
import { airConditionerPowerCalculatorConfig } from "@/tools/air-conditioner-power-calculator/config";

export const metadata: Metadata = {
  title: airConditionerPowerCalculatorConfig.seo.title,
  description: airConditionerPowerCalculatorConfig.seo.description,
  keywords: airConditionerPowerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Air+Conditioner+Power+Calculator", width: 1200, height: 630, alt: "Air Conditioner Power Calculator" }],
    title: airConditionerPowerCalculatorConfig.seo.og.title,
    description: airConditionerPowerCalculatorConfig.seo.og.description,
    type: "website",
    url: airConditionerPowerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: airConditionerPowerCalculatorConfig.seo.og.title,
    description: airConditionerPowerCalculatorConfig.seo.og.description,
    images: ["/og?title=Air+Conditioner+Power+Calculator"],
  },
  alternates: {
    canonical: airConditionerPowerCalculatorConfig.seo.og.url,
  },
};

export default function AirConditionerPowerCalculatorPage() {
  return (
    <ToolLayout
      title={airConditionerPowerCalculatorConfig.name}
      description={airConditionerPowerCalculatorConfig.description}
      icon={airConditionerPowerCalculatorConfig.icon}
    >
      <AirConditionerPowerCalculatorUI />
    </ToolLayout>
  );
}
