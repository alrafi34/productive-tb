import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import AngularVelocityCalculatorUI from "@/tools/angular-velocity-calculator/ui";
import { angularVelocityCalculatorConfig } from "@/tools/angular-velocity-calculator/config";

export const metadata: Metadata = {
  title: angularVelocityCalculatorConfig.seo.title,
  description: angularVelocityCalculatorConfig.seo.description,
  keywords: angularVelocityCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Angular+Velocity+Calculator", width: 1200, height: 630, alt: "Angular Velocity Calculator" }],
    title: angularVelocityCalculatorConfig.seo.og.title,
    description: angularVelocityCalculatorConfig.seo.og.description,
    type: "website",
    url: angularVelocityCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: angularVelocityCalculatorConfig.seo.og.title,
    description: angularVelocityCalculatorConfig.seo.og.description,
    images: ["/og?title=Angular+Velocity+Calculator"],
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
