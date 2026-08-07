import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ImpedanceCalculatorUI from "@/tools/impedance-calculator/ui";
import { impedanceCalculatorConfig } from "@/tools/impedance-calculator/config";

export const metadata: Metadata = {
  title: impedanceCalculatorConfig.seo.title,
  description: impedanceCalculatorConfig.seo.description,
  keywords: impedanceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Impedance+Calculator", width: 1200, height: 630, alt: "Impedance Calculator" }],
    title: impedanceCalculatorConfig.seo.og.title,
    description: impedanceCalculatorConfig.seo.og.description,
    type: "website",
    url: impedanceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: impedanceCalculatorConfig.seo.og.title,
    description: impedanceCalculatorConfig.seo.og.description,
    images: ["/og?title=Impedance+Calculator"],
  },
};

export default function ImpedanceCalculatorPage() {
  return (
    <ToolLayout
      title={impedanceCalculatorConfig.name}
      description={impedanceCalculatorConfig.description}
      icon={impedanceCalculatorConfig.icon}
    >
      <ImpedanceCalculatorUI />
    </ToolLayout>
  );
}
