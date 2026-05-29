import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FrictionForceCalculatorUI from "@/tools/friction-force-calculator/ui";
import { frictionForceCalculatorConfig } from "@/tools/friction-force-calculator/config";

export const metadata: Metadata = {
  title: frictionForceCalculatorConfig.seo.title,
  description: frictionForceCalculatorConfig.seo.description,
  keywords: frictionForceCalculatorConfig.seo.keywords,
  openGraph: {
    title: frictionForceCalculatorConfig.seo.og.title,
    description: frictionForceCalculatorConfig.seo.og.description,
    type: "website",
    url: frictionForceCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: frictionForceCalculatorConfig.seo.og.url,
  },
};

export default function FrictionForceCalculatorPage() {
  return (
    <ToolLayout
      title={frictionForceCalculatorConfig.name}
      description={frictionForceCalculatorConfig.description}
      icon={frictionForceCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <FrictionForceCalculatorUI />
    </ToolLayout>
  );
}
