import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ThermalExpansionCalculatorUI from "@/tools/thermal-expansion-calculator/ui";
import { thermalExpansionCalculatorConfig } from "@/tools/thermal-expansion-calculator/config";

export const metadata: Metadata = {
  title: thermalExpansionCalculatorConfig.seo.title,
  description: thermalExpansionCalculatorConfig.seo.description,
  keywords: thermalExpansionCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Thermal+Expansion+Calculator", width: 1200, height: 630, alt: "Thermal Expansion Calculator" }],
    title: thermalExpansionCalculatorConfig.seo.og.title,
    description: thermalExpansionCalculatorConfig.seo.og.description,
    type: "website",
    url: thermalExpansionCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: thermalExpansionCalculatorConfig.seo.og.title,
    description: thermalExpansionCalculatorConfig.seo.og.description,
    images: ["/og?title=Thermal+Expansion+Calculator"],
  },
  alternates: {
    canonical: thermalExpansionCalculatorConfig.seo.og.url,
  },
};

export default function ThermalExpansionCalculatorPage() {
  return (
    <ToolLayout
      title={thermalExpansionCalculatorConfig.name}
      description={thermalExpansionCalculatorConfig.description}
      icon={thermalExpansionCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <ThermalExpansionCalculatorUI />
    </ToolLayout>
  );
}
