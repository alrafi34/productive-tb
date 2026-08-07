import type { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CLVCalculatorUI from "@/tools/customer-lifetime-value-calculator/ui";
import { customerLifetimeValueCalculatorConfig as config } from "@/tools/customer-lifetime-value-calculator/config";

export const metadata: Metadata = {
  title: config.seo.title,
  description: config.seo.description,
  keywords: config.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Customer+Lifetime+Value+Calculator", width: 1200, height: 630, alt: "Customer Lifetime Value Calculator" }],
    ...config.seo.openGraph,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=Customer+Lifetime+Value+Calculator"],
  },
  alternates: {
    canonical: config.seo.openGraph.url,
  },
};

export default function CLVCalculatorPage() {
  return (
    <ToolLayout
      title={config.name}
      description={config.description}
      icon={config.icon}
      category={{ slug: "marketing", name: "Marketing" }}
    >
      <CLVCalculatorUI />
    </ToolLayout>
  );
}
