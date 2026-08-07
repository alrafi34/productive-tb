import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import StressCalculatorUI from "@/tools/stress-calculator/ui";
import { stressCalculatorConfig } from "@/tools/stress-calculator/config";

export const metadata: Metadata = {
  title: stressCalculatorConfig.seo.title,
  description: stressCalculatorConfig.seo.description,
  keywords: stressCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Stress+Calculator", width: 1200, height: 630, alt: "Stress Calculator" }],
    title: stressCalculatorConfig.seo.og.title,
    description: stressCalculatorConfig.seo.og.description,
    type: "website",
    url: stressCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: stressCalculatorConfig.seo.og.title,
    description: stressCalculatorConfig.seo.og.description,
    images: ["/og?title=Stress+Calculator"],
  },
  alternates: {
    canonical: stressCalculatorConfig.seo.og.url,
  },
};

export default function StressCalculatorPage() {
  return (
    <ToolLayout
      title={stressCalculatorConfig.name}
      description={stressCalculatorConfig.description}
      icon={stressCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <StressCalculatorUI />
    </ToolLayout>
  );
}
