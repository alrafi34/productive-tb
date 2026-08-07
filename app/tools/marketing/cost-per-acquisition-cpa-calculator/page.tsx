import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CPACalculatorUI from "@/tools/cost-per-acquisition-cpa-calculator/ui";
import { costPerAcquisitionCpaCalculatorConfig as config } from "@/tools/cost-per-acquisition-cpa-calculator/config";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Cost+Per+Acquisition+(CPA)+Calculator", width: 1200, height: 630, alt: "Cost Per Acquisition (CPA) Calculator" }],
    ...config.seo.openGraph,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Cost+Per+Acquisition+(CPA)+Calculator"],
  },
  alternates: {
    canonical: config.seo.openGraph.url,
  },
};

export default function CPACalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <CPACalculatorUI />
    </ToolLayout>
  );
}
