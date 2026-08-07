import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ReynoldsNumberCalculatorUI from "@/tools/reynolds-number-calculator/ui";
import { reynoldsNumberCalculatorConfig } from "@/tools/reynolds-number-calculator/config";

export const metadata: Metadata = {
  title: reynoldsNumberCalculatorConfig.seo.title,
  description: reynoldsNumberCalculatorConfig.seo.description,
  keywords: reynoldsNumberCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Reynolds+Number+Calculator", width: 1200, height: 630, alt: "Reynolds Number Calculator" }],
    title: reynoldsNumberCalculatorConfig.seo.og.title,
    description: reynoldsNumberCalculatorConfig.seo.og.description,
    type: "website",
    url: reynoldsNumberCalculatorConfig.seo.og.url,
  },
  twitter: {
    card: "summary_large_image",
    title: reynoldsNumberCalculatorConfig.seo.og.title,
    description: reynoldsNumberCalculatorConfig.seo.og.description,
    images: ["/og?title=Reynolds+Number+Calculator"],
  },
  alternates: {
    canonical: reynoldsNumberCalculatorConfig.seo.og.url,
  },
};

export default function ReynoldsNumberCalculatorPage() {
  return (
    <ToolLayout
      title={reynoldsNumberCalculatorConfig.name}
      description={reynoldsNumberCalculatorConfig.description}
      icon={reynoldsNumberCalculatorConfig.icon}
    >
      <ReynoldsNumberCalculatorUI />
    </ToolLayout>
  );
}
