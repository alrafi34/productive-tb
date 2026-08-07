import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FrictionForceCalculatorUI from "@/tools/friction-force-calculator/ui";
import { frictionForceCalculatorConfig } from "@/tools/friction-force-calculator/config";

export const metadata: Metadata = {
  title: frictionForceCalculatorConfig.seo.title,
  description: frictionForceCalculatorConfig.seo.description,
  keywords: frictionForceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Friction+Force+Calculator", width: 1200, height: 630, alt: "Friction Force Calculator" }],
    title: frictionForceCalculatorConfig.seo.og.title,
    description: frictionForceCalculatorConfig.seo.og.description,
    type: "website",
    url: frictionForceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: frictionForceCalculatorConfig.seo.og.title,
    description: frictionForceCalculatorConfig.seo.og.description,
    images: ["/og?title=Friction+Force+Calculator"],
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
