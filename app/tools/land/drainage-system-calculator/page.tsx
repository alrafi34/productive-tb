import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import DrainageSystemCalculatorUI from "@/tools/drainage-system-calculator/ui";
import { drainageSystemCalculatorConfig } from "@/tools/drainage-system-calculator/config";

export const metadata: Metadata = {
  title: drainageSystemCalculatorConfig.seo.title,
  description: drainageSystemCalculatorConfig.seo.description,
  keywords: drainageSystemCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Drainage+System+Calculator", width: 1200, height: 630, alt: "Drainage System Calculator" }],
    title: drainageSystemCalculatorConfig.seo.og.title,
    description: drainageSystemCalculatorConfig.seo.og.description,
    type: "website",
    url: drainageSystemCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: drainageSystemCalculatorConfig.seo.og.title,
    description: drainageSystemCalculatorConfig.seo.og.description,
    images: ["/og?title=Drainage+System+Calculator"],
  },
  alternates: {
    canonical: drainageSystemCalculatorConfig.seo.og.url,
  },
};

export default function DrainageSystemCalculatorPage() {
  return (
    <ToolLayout
      title={drainageSystemCalculatorConfig.name}
      description={drainageSystemCalculatorConfig.description}
      icon={drainageSystemCalculatorConfig.icon}
      category={{ slug: "land", name: "Land & Surveying" }}
    >
      <DrainageSystemCalculatorUI />
    </ToolLayout>
  );
}
