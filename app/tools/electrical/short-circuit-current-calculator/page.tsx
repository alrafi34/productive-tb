import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import ShortCircuitCurrentCalculatorUI from "@/tools/short-circuit-current-calculator/ui";
import { shortCircuitCurrentCalculatorConfig } from "@/tools/short-circuit-current-calculator/config";

export const metadata: Metadata = {
  title: shortCircuitCurrentCalculatorConfig.seo.title,
  description: shortCircuitCurrentCalculatorConfig.seo.description,
  keywords: shortCircuitCurrentCalculatorConfig.seo.keywords,
  openGraph: {
    images: [{ url: "/og?title=Short+Circuit+Current+Calculator", width: 1200, height: 630, alt: "Short Circuit Current Calculator" }],
    title: shortCircuitCurrentCalculatorConfig.seo.og.title,
    description: shortCircuitCurrentCalculatorConfig.seo.og.description,
    url: shortCircuitCurrentCalculatorConfig.seo.og.url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: shortCircuitCurrentCalculatorConfig.seo.og.title,
    description: shortCircuitCurrentCalculatorConfig.seo.og.description,
    images: ["/og?title=Short+Circuit+Current+Calculator"],
  },
};

export default function ShortCircuitCurrentCalculatorPage() {
  return (
    <ToolLayout
      title={shortCircuitCurrentCalculatorConfig.name}
      description={shortCircuitCurrentCalculatorConfig.description}
      icon={shortCircuitCurrentCalculatorConfig.icon}
      category={{ slug: "electrical", name: "Electrical" }}
    >
      <ShortCircuitCurrentCalculatorUI />
    </ToolLayout>
  );
}