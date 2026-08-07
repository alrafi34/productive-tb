import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WireSizeCalculatorUI from "@/tools/wire-size-calculator/ui";
import { wireSizeCalculatorConfig } from "@/tools/wire-size-calculator/config";

export const metadata: Metadata = {
  title: wireSizeCalculatorConfig.seo.title,
  description: wireSizeCalculatorConfig.seo.description,
  keywords: wireSizeCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Wire+Size+Calculator", width: 1200, height: 630, alt: "Wire Size Calculator" }],
    title: wireSizeCalculatorConfig.seo.og.title,
    description: wireSizeCalculatorConfig.seo.og.description,
    type: "website",
    url: wireSizeCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: wireSizeCalculatorConfig.seo.og.title,
    description: wireSizeCalculatorConfig.seo.og.description,
    images: ["/og?title=Wire+Size+Calculator"],
  },
  alternates: {
    canonical: wireSizeCalculatorConfig.seo.og.url,
  },
};

export default function WireSizeCalculatorPage() {
  return (
    <ToolLayout
      title={wireSizeCalculatorConfig.name}
      description={wireSizeCalculatorConfig.description}
      icon={wireSizeCalculatorConfig.icon}
    >
      <WireSizeCalculatorUI />
    </ToolLayout>
  );
}
