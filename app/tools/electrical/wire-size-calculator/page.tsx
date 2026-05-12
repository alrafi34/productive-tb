import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import WireSizeCalculatorUI from "@/tools/wire-size-calculator/ui";
import { wireSizeCalculatorConfig } from "@/tools/wire-size-calculator/config";

export const metadata: Metadata = {
  title: wireSizeCalculatorConfig.seo.title,
  description: wireSizeCalculatorConfig.seo.description,
  keywords: wireSizeCalculatorConfig.seo.keywords,
  openGraph: {
    title: wireSizeCalculatorConfig.seo.og.title,
    description: wireSizeCalculatorConfig.seo.og.description,
    type: "website",
    url: wireSizeCalculatorConfig.seo.og.url,
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
