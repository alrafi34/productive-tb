import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import SpringForceCalculatorUI from "@/tools/spring-force-calculator/ui";
import { springForceCalculatorConfig } from "@/tools/spring-force-calculator/config";

export const metadata: Metadata = {
  title: springForceCalculatorConfig.seo.title,
  description: springForceCalculatorConfig.seo.description,
  keywords: springForceCalculatorConfig.seo.keywords,
  openGraph: {
    title: springForceCalculatorConfig.seo.og.title,
    description: springForceCalculatorConfig.seo.og.description,
    type: "website",
    url: springForceCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: springForceCalculatorConfig.seo.og.url,
  },
};

export default function SpringForceCalculatorPage() {
  return (
    <ToolLayout
      title={springForceCalculatorConfig.name}
      description={springForceCalculatorConfig.description}
      icon={springForceCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <SpringForceCalculatorUI />
    </ToolLayout>
  );
}
