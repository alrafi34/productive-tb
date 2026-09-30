import ToolFaq from "@/components/ToolFaq";
import { confusionMatrixCalculatorConfig } from "./config";

export default function ConfusionMatrixCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = confusionMatrixCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
