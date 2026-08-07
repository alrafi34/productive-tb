import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BeamDeflectionCalculatorUI from "@/tools/beam-deflection-calculator/ui";
import { toolConfig } from "@/tools/beam-deflection-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Beam+Deflection+Calculator", width: 1200, height: 630, alt: "Beam Deflection Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Beam+Deflection+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function BeamDeflectionCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical" }}
    >
      <BeamDeflectionCalculatorUI />
    </ToolLayout>
  );
}
