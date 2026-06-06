import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import FeedRateCalculatorUI from "@/tools/feed-rate-calculator/ui";
import { feedRateCalculatorConfig } from "@/tools/feed-rate-calculator/config";

export const metadata: Metadata = {
  title: feedRateCalculatorConfig.seo.title,
  description: feedRateCalculatorConfig.seo.description,
  keywords: feedRateCalculatorConfig.seo.keywords,
  openGraph: {
    title: feedRateCalculatorConfig.seo.og.title,
    description: feedRateCalculatorConfig.seo.og.description,
    type: "website",
    url: feedRateCalculatorConfig.seo.og.url,
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
