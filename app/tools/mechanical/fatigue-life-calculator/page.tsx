import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FatigueLifeCalculatorUI from "@/tools/fatigue-life-calculator/ui";
import { fatigueLifeCalculatorConfig } from "@/tools/fatigue-life-calculator/config";

export const metadata: Metadata = {
  title: fatigueLifeCalculatorConfig.seo.title,
  description: fatigueLifeCalculatorConfig.seo.description,
  keywords: fatigueLifeCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Fatigue+Life+Calculator", width: 1200, height: 630, alt: "Fatigue Life Calculator" }],
    title: fatigueLifeCalculatorConfig.seo.og.title,
    description: fatigueLifeCalculatorConfig.seo.og.description,
    type: "website",
    url: fatigueLifeCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: fatigueLifeCalculatorConfig.seo.og.title,
    description: fatigueLifeCalculatorConfig.seo.og.description,
    images: ["/og?title=Fatigue+Life+Calculator"],
  },
  alternates: {
    canonical: fatigueLifeCalculatorConfig.seo.og.url,
  },
};

export default function FatigueLifeCalculatorPage() {
  return (
    <ToolLayout
      title={fatigueLifeCalculatorConfig.name}
      description={fatigueLifeCalculatorConfig.description}
      icon={fatigueLifeCalculatorConfig.icon}
      category={{ slug: "mechanical", name: "Mechanical Engineering" }}
    >
      <FatigueLifeCalculatorUI />
    </ToolLayout>
  );
}
