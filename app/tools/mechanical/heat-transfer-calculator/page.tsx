import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatTransferCalculatorUI from "@/tools/heat-transfer-calculator/ui";
import { heatTransferCalculatorConfig } from "@/tools/heat-transfer-calculator/config";

export const metadata: Metadata = {
  title: heatTransferCalculatorConfig.seo.title,
  description: heatTransferCalculatorConfig.seo.description,
  keywords: heatTransferCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Heat+Transfer+Calculator", width: 1200, height: 630, alt: "Heat Transfer Calculator" }],
    title: heatTransferCalculatorConfig.seo.og.title,
    description: heatTransferCalculatorConfig.seo.og.description,
    type: "website",
    url: heatTransferCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: heatTransferCalculatorConfig.seo.og.title,
    description: heatTransferCalculatorConfig.seo.og.description,
    images: ["/og?title=Heat+Transfer+Calculator"],
  },
  alternates: {
    canonical: heatTransferCalculatorConfig.seo.og.url,
  },
};

export default function HeatTransferCalculatorPage() {
  return (
    <ToolLayout
      title={heatTransferCalculatorConfig.name}
      description={heatTransferCalculatorConfig.description}
      icon={heatTransferCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <HeatTransferCalculatorUI />
    </ToolLayout>
  );
}
