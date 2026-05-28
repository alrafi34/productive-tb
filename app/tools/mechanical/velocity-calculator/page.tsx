import { Metadata } from "next";
import { Suspense } from "react";
import ToolLayout from "@/components/ToolLayout";
import VelocityCalculatorUI from "@/tools/velocity-calculator/ui";
import { velocityCalculatorConfig } from "@/tools/velocity-calculator/config";

export const metadata: Metadata = {
  title: velocityCalculatorConfig.seo.title,
  description: velocityCalculatorConfig.seo.description,
  keywords: velocityCalculatorConfig.seo.keywords,
  openGraph: {
    title: velocityCalculatorConfig.seo.og.title,
    description: velocityCalculatorConfig.seo.og.description,
    type: "website",
    url: velocityCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: velocityCalculatorConfig.seo.og.url,
  },
};

export default function VelocityCalculatorPage() {
  return (
    <ToolLayout
      title={velocityCalculatorConfig.name}
      description={velocityCalculatorConfig.description}
      icon={velocityCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <Suspense>
        <VelocityCalculatorUI />
      </Suspense>
    </ToolLayout>
  );
}
