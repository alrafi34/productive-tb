import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FuseRatingCalculatorUI from "@/tools/fuse-rating-calculator/ui";
import { fuseRatingCalculatorConfig } from "@/tools/fuse-rating-calculator/config";

export const metadata: Metadata = {
  title: fuseRatingCalculatorConfig.seo.title,
  description: fuseRatingCalculatorConfig.seo.description,
  keywords: fuseRatingCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Fuse+Rating+Calculator", width: 1200, height: 630, alt: "Fuse Rating Calculator" }],
    title: fuseRatingCalculatorConfig.seo.og.title,
    description: fuseRatingCalculatorConfig.seo.og.description,
    type: "website",
    url: fuseRatingCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: fuseRatingCalculatorConfig.seo.og.title,
    description: fuseRatingCalculatorConfig.seo.og.description,
    images: ["/og?title=Fuse+Rating+Calculator"],
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
