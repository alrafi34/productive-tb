import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CapacitiveReactanceCalculatorUI from "@/tools/capacitive-reactance-calculator/ui";
import { capacitiveReactanceCalculatorConfig } from "@/tools/capacitive-reactance-calculator/config";

export const metadata: Metadata = {
  title: capacitiveReactanceCalculatorConfig.seo.title,
  description: capacitiveReactanceCalculatorConfig.seo.description,
  keywords: capacitiveReactanceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Capacitive+Reactance+Calculator", width: 1200, height: 630, alt: "Capacitive Reactance Calculator" }],
    title: capacitiveReactanceCalculatorConfig.seo.og.title,
    description: capacitiveReactanceCalculatorConfig.seo.og.description,
    type: "website",
    url: capacitiveReactanceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: capacitiveReactanceCalculatorConfig.seo.og.title,
    description: capacitiveReactanceCalculatorConfig.seo.og.description,
    images: ["/og?title=Capacitive+Reactance+Calculator"],
  },
};

export default function CapacitiveReactanceCalculatorPage() {
  return (
    <ToolLayout
      title={capacitiveReactanceCalculatorConfig.name}
      description={capacitiveReactanceCalculatorConfig.description}
      icon={capacitiveReactanceCalculatorConfig.icon}
    >
      <CapacitiveReactanceCalculatorUI />
    </ToolLayout>
  );
}
