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
    images: [{ url: "/og?title=Acceleration+Calculator", width: 1200, height: 630, alt: "Acceleration Calculator" }],
    title: accelerationCalculatorConfig.seo.og.title,
    description: accelerationCalculatorConfig.seo.og.description,
    type: "website",
    url: accelerationCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: accelerationCalculatorConfig.seo.og.title,
    description: accelerationCalculatorConfig.seo.og.description,
    images: ["/og?title=Acceleration+Calculator"],
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
