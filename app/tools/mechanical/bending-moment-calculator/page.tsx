import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BendingMomentCalculatorUI from "@/tools/bending-moment-calculator/ui";
import { bendingMomentCalculatorConfig } from "@/tools/bending-moment-calculator/config";

export const metadata: Metadata = {
  title: bendingMomentCalculatorConfig.seo.title,
  description: bendingMomentCalculatorConfig.seo.description,
  keywords: bendingMomentCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Bending+Moment+Calculator", width: 1200, height: 630, alt: "Bending Moment Calculator" }],
    title: bendingMomentCalculatorConfig.seo.og.title,
    description: bendingMomentCalculatorConfig.seo.og.description,
    type: "website",
    url: bendingMomentCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: bendingMomentCalculatorConfig.seo.og.title,
    description: bendingMomentCalculatorConfig.seo.og.description,
    images: ["/og?title=Bending+Moment+Calculator"],
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
