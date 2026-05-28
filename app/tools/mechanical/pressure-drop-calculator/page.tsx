import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import PressureDropCalculatorUI from "@/tools/pressure-drop-calculator/ui";
import { pressureDropCalculatorConfig } from "@/tools/pressure-drop-calculator/config";

export const metadata: Metadata = {
  title: pressureDropCalculatorConfig.seo.title,
  description: pressureDropCalculatorConfig.seo.description,
  keywords: pressureDropCalculatorConfig.seo.keywords,
  openGraph: {
    title: pressureDropCalculatorConfig.seo.og.title,
    description: pressureDropCalculatorConfig.seo.og.description,
    type: "website",
    url: pressureDropCalculatorConfig.seo.og.url,
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
