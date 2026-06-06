import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DragForceCalculatorUI from "@/tools/drag-force-calculator/ui";
import { dragForceCalculatorConfig } from "@/tools/drag-force-calculator/config";

export const metadata: Metadata = {
  title: dragForceCalculatorConfig.seo.title,
  description: dragForceCalculatorConfig.seo.description,
  keywords: dragForceCalculatorConfig.seo.keywords,
  openGraph: {
    title: dragForceCalculatorConfig.seo.og.title,
    description: dragForceCalculatorConfig.seo.og.description,
    type: "website",
    url: dragForceCalculatorConfig.seo.og.url,
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
