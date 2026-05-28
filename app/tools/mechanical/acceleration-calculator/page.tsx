import { Metadata } from "next";
import { Suspense } from "react";
import ToolLayout from "@/components/ToolLayout";
import AccelerationCalculatorUI from "@/tools/acceleration-calculator/ui";
import { accelerationCalculatorConfig } from "@/tools/acceleration-calculator/config";

export const metadata: Metadata = {
  title: accelerationCalculatorConfig.seo.title,
  description: accelerationCalculatorConfig.seo.description,
  keywords: accelerationCalculatorConfig.seo.keywords,
  openGraph: {
    title: accelerationCalculatorConfig.seo.og.title,
    description: accelerationCalculatorConfig.seo.og.description,
    type: "website",
    url: accelerationCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: accelerationCalculatorConfig.seo.og.url,
  },
};

export default function AccelerationCalculatorPage() {
  return (
    <ToolLayout
      title={accelerationCalculatorConfig.name}
      description={accelerationCalculatorConfig.description}
      icon={accelerationCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <Suspense>
        <AccelerationCalculatorUI />
      </Suspense>
    </ToolLayout>
  );
}
