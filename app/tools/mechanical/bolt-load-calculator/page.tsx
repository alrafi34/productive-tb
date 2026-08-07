import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BoltLoadCalculatorUI from "@/tools/bolt-load-calculator/ui";
import { boltLoadCalculatorConfig } from "@/tools/bolt-load-calculator/config";

export const metadata: Metadata = {
  title: boltLoadCalculatorConfig.seo.title,
  description: boltLoadCalculatorConfig.seo.description,
  keywords: boltLoadCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Bolt+Load+Calculator", width: 1200, height: 630, alt: "Bolt Load Calculator" }],
    title: boltLoadCalculatorConfig.seo.og.title,
    description: boltLoadCalculatorConfig.seo.og.description,
    type: "website",
    url: boltLoadCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: boltLoadCalculatorConfig.seo.og.title,
    description: boltLoadCalculatorConfig.seo.og.description,
    images: ["/og?title=Bolt+Load+Calculator"],
  },
  alternates: {
    canonical: boltLoadCalculatorConfig.seo.og.url,
  },
};

export default function BoltLoadCalculatorPage() {
  return (
    <ToolLayout
      title={boltLoadCalculatorConfig.name}
      description={boltLoadCalculatorConfig.description}
      icon={boltLoadCalculatorConfig.icon}
    >
      <BoltLoadCalculatorUI />
    </ToolLayout>
  );
}
