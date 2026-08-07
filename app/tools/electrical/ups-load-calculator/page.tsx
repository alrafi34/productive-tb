import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import UPSLoadCalculatorUI from "@/tools/ups-load-calculator/ui";
import { upsLoadCalculatorConfig } from "@/tools/ups-load-calculator/config";

export const metadata: Metadata = {
  title: upsLoadCalculatorConfig.seo.title,
  description: upsLoadCalculatorConfig.seo.description,
  keywords: upsLoadCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=UPS+Load+Calculator", width: 1200, height: 630, alt: "UPS Load Calculator" }],
    title: upsLoadCalculatorConfig.seo.og.title,
    description: upsLoadCalculatorConfig.seo.og.description,
    url: upsLoadCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: upsLoadCalculatorConfig.seo.og.title,
    description: upsLoadCalculatorConfig.seo.og.description,
    images: ["/og?title=UPS+Load+Calculator"],
  },
};

export default function UPSLoadCalculatorPage() {
  return (
    <ToolLayout
      title={upsLoadCalculatorConfig.name}
      description={upsLoadCalculatorConfig.description}
      icon={upsLoadCalculatorConfig.icon}
    >
      <UPSLoadCalculatorUI />
    </ToolLayout>
  );
}
