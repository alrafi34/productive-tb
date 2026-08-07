import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MomentOfInertiaCalculatorUI from "@/tools/moment-of-inertia-calculator/ui";
import { momentOfInertiaCalculatorConfig } from "@/tools/moment-of-inertia-calculator/config";

export const metadata: Metadata = {
  title: momentOfInertiaCalculatorConfig.seo.title,
  description: momentOfInertiaCalculatorConfig.seo.description,
  keywords: momentOfInertiaCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Moment+of+Inertia+Calculator", width: 1200, height: 630, alt: "Moment of Inertia Calculator" }],
    title: momentOfInertiaCalculatorConfig.seo.og.title,
    description: momentOfInertiaCalculatorConfig.seo.og.description,
    type: "website",
    url: momentOfInertiaCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: momentOfInertiaCalculatorConfig.seo.og.title,
    description: momentOfInertiaCalculatorConfig.seo.og.description,
    images: ["/og?title=Moment+of+Inertia+Calculator"],
  },
  alternates: {
    canonical: momentOfInertiaCalculatorConfig.seo.og.url,
  },
};

export default function MomentOfInertiaCalculatorPage() {
  return (
    <ToolLayout
      title={momentOfInertiaCalculatorConfig.name}
      description={momentOfInertiaCalculatorConfig.description}
      icon={momentOfInertiaCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <MomentOfInertiaCalculatorUI />
    </ToolLayout>
  );
}
