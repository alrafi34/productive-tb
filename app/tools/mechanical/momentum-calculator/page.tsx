import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MomentumCalculatorUI from "@/tools/momentum-calculator/ui";
import { momentumCalculatorConfig } from "@/tools/momentum-calculator/config";

export const metadata: Metadata = {
  title: momentumCalculatorConfig.seo.title,
  description: momentumCalculatorConfig.seo.description,
  keywords: momentumCalculatorConfig.seo.keywords,
  openGraph: {
    title: momentumCalculatorConfig.seo.og.title,
    description: momentumCalculatorConfig.seo.og.description,
    type: "website",
    url: momentumCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: momentumCalculatorConfig.seo.og.url,
  },
};

export default function MomentumCalculatorPage() {
  return (
    <ToolLayout
      title={momentumCalculatorConfig.name}
      description={momentumCalculatorConfig.description}
      icon={momentumCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <MomentumCalculatorUI />
    </ToolLayout>
  );
}
