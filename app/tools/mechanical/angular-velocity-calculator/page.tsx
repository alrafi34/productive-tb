import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AngularVelocityCalculatorUI from "@/tools/angular-velocity-calculator/ui";
import { angularVelocityCalculatorConfig } from "@/tools/angular-velocity-calculator/config";

export const metadata: Metadata = {
  title: angularVelocityCalculatorConfig.seo.title,
  description: angularVelocityCalculatorConfig.seo.description,
  keywords: angularVelocityCalculatorConfig.seo.keywords,
  openGraph: {
    title: angularVelocityCalculatorConfig.seo.og.title,
    description: angularVelocityCalculatorConfig.seo.og.description,
    type: "website",
    url: angularVelocityCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: angularVelocityCalculatorConfig.seo.og.url,
  },
};

export default function AngularVelocityCalculatorPage() {
  return (
    <ToolLayout
      title={angularVelocityCalculatorConfig.name}
      description={angularVelocityCalculatorConfig.description}
      icon={angularVelocityCalculatorConfig.icon}
    >
      <AngularVelocityCalculatorUI />
    </ToolLayout>
  );
}
