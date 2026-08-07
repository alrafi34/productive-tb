import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DragForceCalculatorUI from "@/tools/drag-force-calculator/ui";
import { dragForceCalculatorConfig } from "@/tools/drag-force-calculator/config";

export const metadata: Metadata = {
  title: dragForceCalculatorConfig.seo.title,
  description: dragForceCalculatorConfig.seo.description,
  keywords: dragForceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Drag+Force+Calculator", width: 1200, height: 630, alt: "Drag Force Calculator" }],
    title: dragForceCalculatorConfig.seo.og.title,
    description: dragForceCalculatorConfig.seo.og.description,
    type: "website",
    url: dragForceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: dragForceCalculatorConfig.seo.og.title,
    description: dragForceCalculatorConfig.seo.og.description,
    images: ["/og?title=Drag+Force+Calculator"],
  },
  alternates: {
    canonical: dragForceCalculatorConfig.seo.og.url,
  },
};

export default function DragForceCalculatorPage() {
  return (
    <ToolLayout
      title={dragForceCalculatorConfig.name}
      description={dragForceCalculatorConfig.description}
      icon={dragForceCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <DragForceCalculatorUI />
    </ToolLayout>
  );
}
