import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import VoltageDividerCalculatorUI from "@/tools/voltage-divider-calculator/ui";
import { voltageDividerCalculatorConfig } from "@/tools/voltage-divider-calculator/config";

export const metadata: Metadata = {
  title: voltageDividerCalculatorConfig.seo.title,
  description: voltageDividerCalculatorConfig.seo.description,
  keywords: voltageDividerCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Voltage+Divider+Calculator", width: 1200, height: 630, alt: "Voltage Divider Calculator" }],
    title: voltageDividerCalculatorConfig.seo.og.title,
    description: voltageDividerCalculatorConfig.seo.og.description,
    type: "website",
    url: voltageDividerCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: voltageDividerCalculatorConfig.seo.og.title,
    description: voltageDividerCalculatorConfig.seo.og.description,
    images: ["/og?title=Voltage+Divider+Calculator"],
  },
};

export default function VoltageDividerCalculatorPage() {
  return (
    <ToolLayout
      title={voltageDividerCalculatorConfig.name}
      description={voltageDividerCalculatorConfig.description}
      icon={voltageDividerCalculatorConfig.icon}
    >
      <VoltageDividerCalculatorUI />
    </ToolLayout>
  );
}
