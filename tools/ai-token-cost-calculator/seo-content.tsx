import ToolFaq from "@/components/ToolFaq";
import { aiTokenCostCalculatorConfig } from "./config";

export default function AITokenCostCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = aiTokenCostCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
