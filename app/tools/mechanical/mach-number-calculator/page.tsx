import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MachNumberCalculatorUI from "@/tools/mach-number-calculator/ui";
import { machNumberCalculatorConfig } from "@/tools/mach-number-calculator/config";

export const metadata: Metadata = {
  title: machNumberCalculatorConfig.seo.title,
  description: machNumberCalculatorConfig.seo.description,
  keywords: machNumberCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Mach+Number+Calculator", width: 1200, height: 630, alt: "Mach Number Calculator" }],
    title: machNumberCalculatorConfig.seo.og.title,
    description: machNumberCalculatorConfig.seo.og.description,
    type: "website",
    url: machNumberCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: machNumberCalculatorConfig.seo.og.title,
    description: machNumberCalculatorConfig.seo.og.description,
    images: ["/og?title=Mach+Number+Calculator"],
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
