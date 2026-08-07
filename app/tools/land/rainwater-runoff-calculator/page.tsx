import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import RainwaterRunoffCalculatorUI from "@/tools/rainwater-runoff-calculator/ui";
import { rainwaterRunoffCalculatorConfig } from "@/tools/rainwater-runoff-calculator/config";

export const metadata: Metadata = {
  title: rainwaterRunoffCalculatorConfig.seo.title,
  description: rainwaterRunoffCalculatorConfig.seo.description,
  keywords: rainwaterRunoffCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Rainwater+Runoff+Calculator", width: 1200, height: 630, alt: "Rainwater Runoff Calculator" }],
    title: rainwaterRunoffCalculatorConfig.seo.og.title,
    description: rainwaterRunoffCalculatorConfig.seo.og.description,
    type: "website",
    url: rainwaterRunoffCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: rainwaterRunoffCalculatorConfig.seo.og.title,
    description: rainwaterRunoffCalculatorConfig.seo.og.description,
    images: ["/og?title=Rainwater+Runoff+Calculator"],
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
