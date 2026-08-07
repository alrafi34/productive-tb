import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BoundaryLengthCalculatorUI from "@/tools/boundary-length-calculator/ui";
import { boundaryLengthCalculatorConfig } from "@/tools/boundary-length-calculator/config";

export const metadata: Metadata = {
  title: boundaryLengthCalculatorConfig.seo.title,
  description: boundaryLengthCalculatorConfig.seo.description,
  keywords: boundaryLengthCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Boundary+Length+Calculator", width: 1200, height: 630, alt: "Boundary Length Calculator" }],
    title: boundaryLengthCalculatorConfig.seo.og.title,
    description: boundaryLengthCalculatorConfig.seo.og.description,
    type: "website",
    url: boundaryLengthCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: boundaryLengthCalculatorConfig.seo.og.title,
    description: boundaryLengthCalculatorConfig.seo.og.description,
    images: ["/og?title=Boundary+Length+Calculator"],
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
