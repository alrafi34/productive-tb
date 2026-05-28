import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import MomentOfInertiaCalculatorUI from "@/tools/moment-of-inertia-calculator/ui";
import { momentOfInertiaCalculatorConfig } from "@/tools/moment-of-inertia-calculator/config";

export const metadata: Metadata = {
  title: momentOfInertiaCalculatorConfig.seo.title,
  description: momentOfInertiaCalculatorConfig.seo.description,
  keywords: momentOfInertiaCalculatorConfig.seo.keywords,
  openGraph: {
    title: momentOfInertiaCalculatorConfig.seo.og.title,
    description: momentOfInertiaCalculatorConfig.seo.og.description,
    type: "website",
    url: momentOfInertiaCalculatorConfig.seo.og.url,
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
