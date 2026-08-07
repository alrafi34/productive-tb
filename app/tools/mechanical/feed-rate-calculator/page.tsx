import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FeedRateCalculatorUI from "@/tools/feed-rate-calculator/ui";
import { feedRateCalculatorConfig } from "@/tools/feed-rate-calculator/config";

export const metadata: Metadata = {
  title: feedRateCalculatorConfig.seo.title,
  description: feedRateCalculatorConfig.seo.description,
  keywords: feedRateCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Feed+Rate+Calculator", width: 1200, height: 630, alt: "Feed Rate Calculator" }],
    title: feedRateCalculatorConfig.seo.og.title,
    description: feedRateCalculatorConfig.seo.og.description,
    type: "website",
    url: feedRateCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: feedRateCalculatorConfig.seo.og.title,
    description: feedRateCalculatorConfig.seo.og.description,
    images: ["/og?title=Feed+Rate+Calculator"],
  },
  alternates: {
    canonical: feedRateCalculatorConfig.seo.og.url,
  },
};

export default function FeedRateCalculatorPage() {
  return (
    <ToolLayout
      title={feedRateCalculatorConfig.name}
      description={feedRateCalculatorConfig.description}
      icon={feedRateCalculatorConfig.icon}
    >
      <FeedRateCalculatorUI />
    </ToolLayout>
  );
}
