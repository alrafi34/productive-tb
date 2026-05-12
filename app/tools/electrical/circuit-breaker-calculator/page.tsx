import { Metadata } from "next";
import ToolLayout from "@/components/ToolLayout";
import CircuitBreakerCalculatorUI from "@/tools/circuit-breaker-calculator/ui";
import { circuitBreakerCalculatorConfig } from "@/tools/circuit-breaker-calculator/config";

export const metadata: Metadata = {
  title: circuitBreakerCalculatorConfig.seo.title,
  description: circuitBreakerCalculatorConfig.seo.description,
  keywords: circuitBreakerCalculatorConfig.seo.keywords,
  openGraph: {
    title: circuitBreakerCalculatorConfig.seo.og.title,
    description: circuitBreakerCalculatorConfig.seo.og.description,
    type: "website",
    url: circuitBreakerCalculatorConfig.seo.og.url,
  },
  alternates: {
    canonical: circuitBreakerCalculatorConfig.seo.og.url,
  },
};

export default function CircuitBreakerCalculatorPage() {
  return (
    <ToolLayout
      title={circuitBreakerCalculatorConfig.name}
      description={circuitBreakerCalculatorConfig.description}
      icon={circuitBreakerCalculatorConfig.icon}
    >
      <CircuitBreakerCalculatorUI />
    </ToolLayout>
  );
}
