import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MachNumberCalculatorUI from "@/tools/mach-number-calculator/ui";
import { machNumberCalculatorConfig } from "@/tools/mach-number-calculator/config";

export const metadata: Metadata = {
  title: machNumberCalculatorConfig.seo.title,
  description: machNumberCalculatorConfig.seo.description,
  keywords: machNumberCalculatorConfig.seo.keywords,
  openGraph: {
    title: machNumberCalculatorConfig.seo.og.title,
    description: machNumberCalculatorConfig.seo.og.description,
    type: "website",
    url: machNumberCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: machNumberCalculatorConfig.seo.og.url,
  },
};

export default function MachNumberCalculatorPage() {
  return (
    <ToolLayout
      title={machNumberCalculatorConfig.name}
      description={machNumberCalculatorConfig.description}
      icon={machNumberCalculatorConfig.icon}
    >
      <MachNumberCalculatorUI />
    </ToolLayout>
  );
}
