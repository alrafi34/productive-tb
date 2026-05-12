import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CapacitorChargeTimeCalculatorUI from "@/tools/capacitor-charge-time-calculator/ui";
import { capacitorChargeTimeCalculatorConfig } from "@/tools/capacitor-charge-time-calculator/config";

export const metadata: Metadata = {
  title: capacitorChargeTimeCalculatorConfig.seo.title,
  description: capacitorChargeTimeCalculatorConfig.seo.description,
  keywords: capacitorChargeTimeCalculatorConfig.seo.keywords,
  openGraph: {
    title: capacitorChargeTimeCalculatorConfig.seo.og.title,
    description: capacitorChargeTimeCalculatorConfig.seo.og.description,
    type: "website",
    url: capacitorChargeTimeCalculatorConfig.seo.og.url,
  },
};

export default function CapacitorChargeTimeCalculatorPage() {
  return (
    <ToolLayout
      title={capacitorChargeTimeCalculatorConfig.name}
      description={capacitorChargeTimeCalculatorConfig.description}
      icon={capacitorChargeTimeCalculatorConfig.icon}
    >
      <CapacitorChargeTimeCalculatorUI />
    </ToolLayout>
  );
}
