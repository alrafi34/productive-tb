import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RainwaterRunoffCalculatorUI from "@/tools/rainwater-runoff-calculator/ui";
import { rainwaterRunoffCalculatorConfig } from "@/tools/rainwater-runoff-calculator/config";

export const metadata: Metadata = {
  title: rainwaterRunoffCalculatorConfig.seo.title,
  description: rainwaterRunoffCalculatorConfig.seo.description,
  keywords: rainwaterRunoffCalculatorConfig.seo.keywords,
  openGraph: {
    title: rainwaterRunoffCalculatorConfig.seo.og.title,
    description: rainwaterRunoffCalculatorConfig.seo.og.description,
    type: "website",
    url: rainwaterRunoffCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: rainwaterRunoffCalculatorConfig.seo.og.url,
  },
};

export default function RainwaterRunoffCalculatorPage() {
  return (
    <ToolLayout
      title={rainwaterRunoffCalculatorConfig.name}
      description={rainwaterRunoffCalculatorConfig.description}
      icon={rainwaterRunoffCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <RainwaterRunoffCalculatorUI />
    </ToolLayout>
  );
}
