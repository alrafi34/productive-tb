import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import KineticEnergyCalculatorUI from "@/tools/kinetic-energy-calculator/ui";
import { kineticEnergyCalculatorConfig } from "@/tools/kinetic-energy-calculator/config";

export const metadata: Metadata = {
  title: kineticEnergyCalculatorConfig.seo.title,
  description: kineticEnergyCalculatorConfig.seo.description,
  keywords: kineticEnergyCalculatorConfig.seo.keywords,
  openGraph: {
    title: kineticEnergyCalculatorConfig.seo.og.title,
    description: kineticEnergyCalculatorConfig.seo.og.description,
    type: "website",
    url: kineticEnergyCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: kineticEnergyCalculatorConfig.seo.og.url,
  },
};

export default function KineticEnergyCalculatorPage() {
  return (
    <ToolLayout
      title={kineticEnergyCalculatorConfig.name}
      description={kineticEnergyCalculatorConfig.description}
      icon={kineticEnergyCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <KineticEnergyCalculatorUI />
    </ToolLayout>
  );
}
