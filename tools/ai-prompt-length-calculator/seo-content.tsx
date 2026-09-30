import ToolFaq from "@/components/ToolFaq";
import { aiPromptLengthCalculatorConfig } from "./config";

export default function AIPromptLengthCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = aiPromptLengthCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
