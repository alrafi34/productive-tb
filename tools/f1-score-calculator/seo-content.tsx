import ToolFaq from "@/components/ToolFaq";
import { f1ScoreCalculatorConfig } from "./config";

export default function F1ScoreCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = f1ScoreCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
