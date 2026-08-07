import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CapacitorChargeTimeCalculatorUI from "@/tools/capacitor-charge-time-calculator/ui";
import { capacitorChargeTimeCalculatorConfig } from "@/tools/capacitor-charge-time-calculator/config";

export const metadata: Metadata = {
  title: capacitorChargeTimeCalculatorConfig.seo.title,
  description: capacitorChargeTimeCalculatorConfig.seo.description,
  keywords: capacitorChargeTimeCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Capacitor+Charge+Time+Calculator", width: 1200, height: 630, alt: "Capacitor Charge Time Calculator" }],
    title: capacitorChargeTimeCalculatorConfig.seo.og.title,
    description: capacitorChargeTimeCalculatorConfig.seo.og.description,
    type: "website",
    url: capacitorChargeTimeCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: capacitorChargeTimeCalculatorConfig.seo.og.title,
    description: capacitorChargeTimeCalculatorConfig.seo.og.description,
    images: ["/og?title=Capacitor+Charge+Time+Calculator"],
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
