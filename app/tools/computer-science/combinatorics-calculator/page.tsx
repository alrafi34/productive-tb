import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CombinatoricsCalculatorUI from "@/tools/combinatorics-calculator/ui";
import { toolConfig } from "@/tools/combinatorics-calculator/config";

export const metadata: Metadata = {
  title: toolConfig.seo.title,
  description: toolConfig.seo.description,
  keywords: toolConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Combinatorics+Calculator", width: 1200, height: 630, alt: "Combinatorics Calculator" }],
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    type: "website",
    url: toolConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: toolConfig.seo.og.title,
    description: toolConfig.seo.og.description,
    images: ["/og?title=Combinatorics+Calculator"],
  },
  alternates: {
    canonical: toolConfig.seo.og.url,
  },
};

export default function CombinatoricsCalculatorPage() {
  return (
    <ToolLayout
      title={toolConfig.name}
      description={toolConfig.description}
      icon={toolConfig.icon}
    >
      <CombinatoricsCalculatorUI />
    </ToolLayout>
  );
}
