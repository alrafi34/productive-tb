import ToolFaq from "@/components/ToolFaq";
import { modelAccuracyCalculatorConfig } from "./config";

export default function ModelAccuracyCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = modelAccuracyCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
