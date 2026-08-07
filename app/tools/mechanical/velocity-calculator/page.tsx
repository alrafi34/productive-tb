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
    images: [{ url: "/og?title=Velocity+Calculator", width: 1200, height: 630, alt: "Velocity Calculator" }],
    title: velocityCalculatorConfig.seo.og.title,
    description: velocityCalculatorConfig.seo.og.description,
    type: "website",
    url: velocityCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: velocityCalculatorConfig.seo.og.title,
    description: velocityCalculatorConfig.seo.og.description,
    images: ["/og?title=Velocity+Calculator"],
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
