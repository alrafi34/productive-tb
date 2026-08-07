import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BatteryChargingTimeCalculatorUI from "@/tools/battery-charging-time-calculator/ui";
import { toolConfig } from "@/tools/battery-charging-time-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Battery+Charging+Time+Calculator", width: 1200, height: 630, alt: "Battery Charging Time Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Battery+Charging+Time+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function BatteryChargingTimeCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <BatteryChargingTimeCalculatorUI />
    </ToolLayout>
  );
}
