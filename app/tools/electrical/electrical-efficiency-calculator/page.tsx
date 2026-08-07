import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ElectricalEfficiencyCalculatorUI from "@/tools/electrical-efficiency-calculator/ui";
import { electricalEfficiencyCalculatorConfig } from "@/tools/electrical-efficiency-calculator/config";

export const metadata: Metadata = {
  title: electricalEfficiencyCalculatorConfig.seo.title,
  description: electricalEfficiencyCalculatorConfig.seo.description,
  keywords: electricalEfficiencyCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Electrical+Efficiency+Calculator", width: 1200, height: 630, alt: "Electrical Efficiency Calculator" }],
    title: electricalEfficiencyCalculatorConfig.seo.og.title,
    description: electricalEfficiencyCalculatorConfig.seo.og.description,
    url: electricalEfficiencyCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: electricalEfficiencyCalculatorConfig.seo.og.title,
    description: electricalEfficiencyCalculatorConfig.seo.og.description,
    images: ["/og?title=Electrical+Efficiency+Calculator"],
  },
};

export default function ElectricalEfficiencyCalculatorPage() {
  return (
    <ToolLayout
      title={electricalEfficiencyCalculatorConfig.name}
      description={electricalEfficiencyCalculatorConfig.description}
      icon={electricalEfficiencyCalculatorConfig.icon}
      category={{ slug: "electrical", name: "Electrical" }}
    >
      <ElectricalEfficiencyCalculatorUI />
    </ToolLayout>
  );
}