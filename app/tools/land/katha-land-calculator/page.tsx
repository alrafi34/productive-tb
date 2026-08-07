import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import KathaLandCalculatorUI from "@/tools/katha-land-calculator/ui";
import { kathaLandCalculatorConfig } from "@/tools/katha-land-calculator/config";

export const metadata: Metadata = {
  title: kathaLandCalculatorConfig.seo.title,
  description: kathaLandCalculatorConfig.seo.description,
  keywords: kathaLandCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Katha+Land+Calculator", width: 1200, height: 630, alt: "Katha Land Calculator" }],
    title: kathaLandCalculatorConfig.seo.og.title,
    description: kathaLandCalculatorConfig.seo.og.description,
    type: "website",
    url: kathaLandCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: kathaLandCalculatorConfig.seo.og.title,
    description: kathaLandCalculatorConfig.seo.og.description,
    images: ["/og?title=Katha+Land+Calculator"],
  },
  alternates: {
    canonical: kathaLandCalculatorConfig.seo.og.url,
  },
};

export default function KathaLandCalculatorPage() {
  return (
    <ToolLayout
      title={kathaLandCalculatorConfig.name}
      description={kathaLandCalculatorConfig.description}
      icon={kathaLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <KathaLandCalculatorUI />
    </ToolLayout>
  );
}
