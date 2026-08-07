import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import KineticEnergyCalculatorUI from "@/tools/kinetic-energy-calculator/ui";
import { kineticEnergyCalculatorConfig } from "@/tools/kinetic-energy-calculator/config";

export const metadata: Metadata = {
  title: kineticEnergyCalculatorConfig.seo.title,
  description: kineticEnergyCalculatorConfig.seo.description,
  keywords: kineticEnergyCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Kinetic+Energy+Calculator", width: 1200, height: 630, alt: "Kinetic Energy Calculator" }],
    title: kineticEnergyCalculatorConfig.seo.og.title,
    description: kineticEnergyCalculatorConfig.seo.og.description,
    type: "website",
    url: kineticEnergyCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: kineticEnergyCalculatorConfig.seo.og.title,
    description: kineticEnergyCalculatorConfig.seo.og.description,
    images: ["/og?title=Kinetic+Energy+Calculator"],
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
