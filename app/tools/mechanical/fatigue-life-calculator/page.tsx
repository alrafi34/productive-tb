import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FatigueLifeCalculatorUI from "@/tools/fatigue-life-calculator/ui";
import { fatigueLifeCalculatorConfig } from "@/tools/fatigue-life-calculator/config";

export const metadata: Metadata = {
  title: fatigueLifeCalculatorConfig.seo.title,
  description: fatigueLifeCalculatorConfig.seo.description,
  keywords: fatigueLifeCalculatorConfig.seo.keywords,
  openGraph: {
    title: fatigueLifeCalculatorConfig.seo.og.title,
    description: fatigueLifeCalculatorConfig.seo.og.description,
    type: "website",
    url: fatigueLifeCalculatorConfig.seo.og.url,
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
