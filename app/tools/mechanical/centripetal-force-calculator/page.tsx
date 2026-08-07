import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CentripetalForceCalculatorUI from "@/tools/centripetal-force-calculator/ui";
import { centripetalForceCalculatorConfig } from "@/tools/centripetal-force-calculator/config";

export const metadata: Metadata = {
  title: centripetalForceCalculatorConfig.seo.title,
  description: centripetalForceCalculatorConfig.seo.description,
  keywords: centripetalForceCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Centripetal+Force+Calculator", width: 1200, height: 630, alt: "Centripetal Force Calculator" }],
    title: centripetalForceCalculatorConfig.seo.og.title,
    description: centripetalForceCalculatorConfig.seo.og.description,
    type: "website",
    url: centripetalForceCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: centripetalForceCalculatorConfig.seo.og.title,
    description: centripetalForceCalculatorConfig.seo.og.description,
    images: ["/og?title=Centripetal+Force+Calculator"],
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
