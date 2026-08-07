import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PressureDropCalculatorUI from "@/tools/pressure-drop-calculator/ui";
import { pressureDropCalculatorConfig } from "@/tools/pressure-drop-calculator/config";

export const metadata: Metadata = {
  title: pressureDropCalculatorConfig.seo.title,
  description: pressureDropCalculatorConfig.seo.description,
  keywords: pressureDropCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Pressure+Drop+Calculator", width: 1200, height: 630, alt: "Pressure Drop Calculator" }],
    title: pressureDropCalculatorConfig.seo.og.title,
    description: pressureDropCalculatorConfig.seo.og.description,
    type: "website",
    url: pressureDropCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: pressureDropCalculatorConfig.seo.og.title,
    description: pressureDropCalculatorConfig.seo.og.description,
    images: ["/og?title=Pressure+Drop+Calculator"],
  },
  alternates: {
    canonical: pressureDropCalculatorConfig.seo.og.url,
  },
};

export default function PressureDropCalculatorPage() {
  return (
    <ToolLayout
      title={pressureDropCalculatorConfig.name}
      description={pressureDropCalculatorConfig.description}
      icon={pressureDropCalculatorConfig.icon}
    >
      <PressureDropCalculatorUI />
    </ToolLayout>
  );
}
