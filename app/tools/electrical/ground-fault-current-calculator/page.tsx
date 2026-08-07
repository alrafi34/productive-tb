import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import GroundFaultCurrentCalculatorUI from "@/tools/ground-fault-current-calculator/ui";
import { groundFaultCurrentCalculatorConfig } from "@/tools/ground-fault-current-calculator/config";

export const metadata: Metadata = {
  title: groundFaultCurrentCalculatorConfig.seo.title,
  description: groundFaultCurrentCalculatorConfig.seo.description,
  keywords: groundFaultCurrentCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Ground+Fault+Current+Calculator", width: 1200, height: 630, alt: "Ground Fault Current Calculator" }],
    title: groundFaultCurrentCalculatorConfig.seo.og.title,
    description: groundFaultCurrentCalculatorConfig.seo.og.description,
    url: groundFaultCurrentCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: groundFaultCurrentCalculatorConfig.seo.og.title,
    description: groundFaultCurrentCalculatorConfig.seo.og.description,
    images: ["/og?title=Ground+Fault+Current+Calculator"],
  },
};

export default function GroundFaultCurrentCalculatorPage() {
  return (
    <ToolLayout
      title={groundFaultCurrentCalculatorConfig.name}
      description={groundFaultCurrentCalculatorConfig.description}
      icon={groundFaultCurrentCalculatorConfig.icon}
    >
      <GroundFaultCurrentCalculatorUI />
    </ToolLayout>
  );
}