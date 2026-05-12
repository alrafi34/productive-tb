import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FuseRatingCalculatorUI from "@/tools/fuse-rating-calculator/ui";
import { fuseRatingCalculatorConfig } from "@/tools/fuse-rating-calculator/config";

export const metadata: Metadata = {
  title: fuseRatingCalculatorConfig.seo.title,
  description: fuseRatingCalculatorConfig.seo.description,
  keywords: fuseRatingCalculatorConfig.seo.keywords,
  openGraph: {
    title: fuseRatingCalculatorConfig.seo.og.title,
    description: fuseRatingCalculatorConfig.seo.og.description,
    type: "website",
    url: fuseRatingCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: fuseRatingCalculatorConfig.seo.og.url,
  },
};

export default function FuseRatingCalculatorPage() {
  return (
    <ToolLayout
      title={fuseRatingCalculatorConfig.name}
      description={fuseRatingCalculatorConfig.description}
      icon={fuseRatingCalculatorConfig.icon}
    >
      <FuseRatingCalculatorUI />
    </ToolLayout>
  );
}
