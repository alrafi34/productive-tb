import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ThreePhasePowerCalculatorUI from "@/tools/three-phase-power-calculator/ui";
import { toolConfig } from "@/tools/three-phase-power-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Three+Phase+Power+Calculator", width: 1200, height: 630, alt: "Three Phase Power Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Three+Phase+Power+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function ThreePhasePowerCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <ThreePhasePowerCalculatorUI />
    </ToolLayout>
  );
}
