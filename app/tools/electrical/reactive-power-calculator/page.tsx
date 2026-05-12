import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ReactivePowerCalculatorUI from "@/tools/reactive-power-calculator/ui";
import { reactivePowerCalculatorConfig } from "@/tools/reactive-power-calculator/config";

export const metadata: Metadata = {
  title: reactivePowerCalculatorConfig.seo.title,
  description: reactivePowerCalculatorConfig.seo.description,
  keywords: reactivePowerCalculatorConfig.seo.keywords,
  openGraph: {
    title: reactivePowerCalculatorConfig.seo.og.title,
    description: reactivePowerCalculatorConfig.seo.og.description,
    type: "website",
    url: reactivePowerCalculatorConfig.seo.og.url,
  },
};

export default function ReactivePowerCalculatorPage() {
  return (
    <ToolLayout
      title={reactivePowerCalculatorConfig.name}
      description={reactivePowerCalculatorConfig.description}
      icon={reactivePowerCalculatorConfig.icon}
    >
      <ReactivePowerCalculatorUI />
    </ToolLayout>
  );
}
