import ToolFaq from "@/components/ToolFaq";
import { combinatoricsCalculatorConfig } from "./config";

export default function CombinatoricsCalculatorSEO() {
  // Same questions as the FAQPage schema
  const { faq } = combinatoricsCalculatorConfig.seo;
  return (
    <ToolFaq items={faq} />
  );
}
