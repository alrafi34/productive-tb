import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RLTimeConstantCalculatorUI from "@/tools/rl-time-constant-calculator/ui";
import { rlTimeConstantCalculatorConfig } from "@/tools/rl-time-constant-calculator/config";

export const metadata: Metadata = {
  title: rlTimeConstantCalculatorConfig.seo.title,
  description: rlTimeConstantCalculatorConfig.seo.description,
  keywords: rlTimeConstantCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=RL+Time+Constant+Calculator", width: 1200, height: 630, alt: "RL Time Constant Calculator" }],
    title: rlTimeConstantCalculatorConfig.seo.og.title,
    description: rlTimeConstantCalculatorConfig.seo.og.description,
    type: "website",
    url: rlTimeConstantCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: rlTimeConstantCalculatorConfig.seo.og.title,
    description: rlTimeConstantCalculatorConfig.seo.og.description,
    images: ["/og?title=RL+Time+Constant+Calculator"],
  },
  alternates: {
    canonical: rlTimeConstantCalculatorConfig.seo.og.url,
  },
};

export default function RLTimeConstantCalculatorPage() {
  return (
    <ToolLayout
      title={rlTimeConstantCalculatorConfig.name}
      description={rlTimeConstantCalculatorConfig.description}
      icon={rlTimeConstantCalculatorConfig.icon}
    >
      <RLTimeConstantCalculatorUI />
    </ToolLayout>
  );
}
