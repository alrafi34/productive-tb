import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import HeatsinkCalculatorUI from "@/tools/heatsink-calculator/ui";
import { heatsinkCalculatorConfig } from "@/tools/heatsink-calculator/config";

export const metadata: Metadata = {
  title: heatsinkCalculatorConfig.seo.title,
  description: heatsinkCalculatorConfig.seo.description,
  keywords: heatsinkCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Heatsink+Calculator", width: 1200, height: 630, alt: "Heatsink Calculator" }],
    title: heatsinkCalculatorConfig.seo.og.title,
    description: heatsinkCalculatorConfig.seo.og.description,
    url: heatsinkCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: heatsinkCalculatorConfig.seo.og.title,
    description: heatsinkCalculatorConfig.seo.og.description,
    images: ["/og?title=Heatsink+Calculator"],
  },
};

export default function HeatsinkCalculatorPage() {
  return (
    <ToolLayout
      title={heatsinkCalculatorConfig.name}
      description={heatsinkCalculatorConfig.description}
      icon={heatsinkCalculatorConfig.icon}
    >
      <HeatsinkCalculatorUI />
    </ToolLayout>
  );
}