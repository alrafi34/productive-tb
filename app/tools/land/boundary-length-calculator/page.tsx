import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BoundaryLengthCalculatorUI from "@/tools/boundary-length-calculator/ui";
import { boundaryLengthCalculatorConfig } from "@/tools/boundary-length-calculator/config";

export const metadata: Metadata = {
  title: boundaryLengthCalculatorConfig.seo.title,
  description: boundaryLengthCalculatorConfig.seo.description,
  keywords: boundaryLengthCalculatorConfig.seo.keywords,
  openGraph: {
    title: boundaryLengthCalculatorConfig.seo.og.title,
    description: boundaryLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: boundaryLengthCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: boundaryLengthCalculatorConfig.seo.og.url,
  },
};

export default function BoundaryLengthCalculatorPage() {
  return (
    <ToolLayout
      title={boundaryLengthCalculatorConfig.name}
      description={boundaryLengthCalculatorConfig.description}
      icon={boundaryLengthCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <BoundaryLengthCalculatorUI />
    </ToolLayout>
  );
}
