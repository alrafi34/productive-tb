import ToolFaq from "@/components/ToolFaq";
import { latencyCalculatorConfig } from "./config";

export default function LatencyCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = latencyCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
