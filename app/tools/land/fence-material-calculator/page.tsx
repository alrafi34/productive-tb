import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FenceMaterialCalculatorUI from "@/tools/fence-material-calculator/ui";
import { fenceMaterialCalculatorConfig } from "@/tools/fence-material-calculator/config";

export const metadata: Metadata = {
  title: fenceMaterialCalculatorConfig.seo.title,
  description: fenceMaterialCalculatorConfig.seo.description,
  keywords: fenceMaterialCalculatorConfig.seo.keywords,
  openGraph: {
    title: fenceMaterialCalculatorConfig.seo.og.title,
    description: fenceMaterialCalculatorConfig.seo.og.description,
    type: "website",
    url: fenceMaterialCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: fenceMaterialCalculatorConfig.seo.og.url,
  },
};

export default function FenceMaterialCalculatorPage() {
  return (
    <ToolLayout
      title={fenceMaterialCalculatorConfig.name}
      description={fenceMaterialCalculatorConfig.description}
      icon={fenceMaterialCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <FenceMaterialCalculatorUI />
    </ToolLayout>
  );
}
