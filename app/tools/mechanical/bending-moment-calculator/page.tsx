import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BendingMomentCalculatorUI from "@/tools/bending-moment-calculator/ui";
import { bendingMomentCalculatorConfig } from "@/tools/bending-moment-calculator/config";

export const metadata: Metadata = {
  title: bendingMomentCalculatorConfig.seo.title,
  description: bendingMomentCalculatorConfig.seo.description,
  keywords: bendingMomentCalculatorConfig.seo.keywords,
  openGraph: {
    title: bendingMomentCalculatorConfig.seo.og.title,
    description: bendingMomentCalculatorConfig.seo.og.description,
    type: "website",
    url: bendingMomentCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: bendingMomentCalculatorConfig.seo.og.url,
  },
};

export default function BendingMomentCalculatorPage() {
  return (
    <ToolLayout
      title={bendingMomentCalculatorConfig.name}
      description={bendingMomentCalculatorConfig.description}
      icon={bendingMomentCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <BendingMomentCalculatorUI />
    </ToolLayout>
  );
}
