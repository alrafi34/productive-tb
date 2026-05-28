import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CentripetalForceCalculatorUI from "@/tools/centripetal-force-calculator/ui";
import { centripetalForceCalculatorConfig } from "@/tools/centripetal-force-calculator/config";

export const metadata: Metadata = {
  title: centripetalForceCalculatorConfig.seo.title,
  description: centripetalForceCalculatorConfig.seo.description,
  keywords: centripetalForceCalculatorConfig.seo.keywords,
  openGraph: {
    title: centripetalForceCalculatorConfig.seo.og.title,
    description: centripetalForceCalculatorConfig.seo.og.description,
    type: "website",
    url: centripetalForceCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: centripetalForceCalculatorConfig.seo.og.url,
  },
};

export default function CentripetalForceCalculatorPage() {
  return (
    <ToolLayout
      title={centripetalForceCalculatorConfig.name}
      description={centripetalForceCalculatorConfig.description}
      icon={centripetalForceCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <CentripetalForceCalculatorUI />
    </ToolLayout>
  );
}
