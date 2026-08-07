import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import TorqueCalculatorUI from "@/tools/torque-calculator/ui";
import { torqueCalculatorConfig } from "@/tools/torque-calculator/config";

export const metadata: Metadata = {
  title: torqueCalculatorConfig.seo.title,
  description: torqueCalculatorConfig.seo.description,
  keywords: torqueCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Torque+Calculator", width: 1200, height: 630, alt: "Torque Calculator" }],
    title: torqueCalculatorConfig.seo.og.title,
    description: torqueCalculatorConfig.seo.og.description,
    type: "website",
    url: torqueCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: torqueCalculatorConfig.seo.og.title,
    description: torqueCalculatorConfig.seo.og.description,
    images: ["/og?title=Torque+Calculator"],
  },
  alternates: {
    canonical: torqueCalculatorConfig.seo.og.url,
  },
};

export default function TorqueCalculatorPage() {
  return (
    <ToolLayout
      title={torqueCalculatorConfig.name}
      description={torqueCalculatorConfig.description}
      icon={torqueCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <TorqueCalculatorUI />
    </ToolLayout>
  );
}
