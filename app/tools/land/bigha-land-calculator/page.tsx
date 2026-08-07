import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import BighaLandCalculatorUI from "@/tools/bigha-land-calculator/ui";
import { bighaLandCalculatorConfig } from "@/tools/bigha-land-calculator/config";

export const metadata: Metadata = {
  title: bighaLandCalculatorConfig.seo.title,
  description: bighaLandCalculatorConfig.seo.description,
  keywords: bighaLandCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Bigha+Land+Calculator", width: 1200, height: 630, alt: "Bigha Land Calculator" }],
    title: bighaLandCalculatorConfig.seo.og.title,
    description: bighaLandCalculatorConfig.seo.og.description,
    type: "website",
    url: bighaLandCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: bighaLandCalculatorConfig.seo.og.title,
    description: bighaLandCalculatorConfig.seo.og.description,
    images: ["/og?title=Bigha+Land+Calculator"],
  },
  alternates: {
    canonical: bighaLandCalculatorConfig.seo.og.url,
  },
};

export default function BighaLandCalculatorPage() {
  return (
    <ToolLayout
      title={bighaLandCalculatorConfig.name}
      description={bighaLandCalculatorConfig.description}
      icon={bighaLandCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <BighaLandCalculatorUI />
    </ToolLayout>
  );
}
